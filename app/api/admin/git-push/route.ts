import { NextRequest, NextResponse } from "next/server";
import { execFileSync, execSync } from "child_process";
import fs from "fs";
import path from "path";

const AUTHORIZED_OWNERS = ["career@insyt.bd", "insyt.bd@gmail.com"];
const REPO_URL = "https://github.com/career-insyt/inscorpo.git";

function getGitExecutable(): string {
  try {
    execFileSync("git", ["--version"], { stdio: "ignore" });
    return "git";
  } catch {
    const minGit = "C:\\Users\\Taba\\mingit\\cmd\\git.exe";
    if (fs.existsSync(minGit)) return minGit;
    return "git";
  }
}

function getStoredToken(): string {
  // 1. Process environment only — never plaintext disk files
  if (process.env.GITHUB_TOKEN?.trim()) return process.env.GITHUB_TOKEN.trim();
  if (process.env.GITHUB_PAT?.trim()) return process.env.GITHUB_PAT.trim();
  return "";
}

function verifyAuthorization(req: NextRequest): boolean {
  // 1. Block in production environments unless explicitly enabled
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_PROD_GIT_PUSH !== "true") {
    return false;
  }

  // 2. Strict secret header check — fail closed if ADMIN_SECRET_KEY is undefined
  const adminSecret = req.headers.get("x-admin-secret");
  const expectedSecret = process.env.ADMIN_SECRET_KEY;
  if (!expectedSecret || adminSecret !== expectedSecret) {
    return false;
  }

  return true;
}

// GET: Query repository status
export async function GET(req: NextRequest) {
  if (!verifyAuthorization(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Git repository control requires a valid x-admin-secret matching ADMIN_SECRET_KEY." },
      { status: 403 }
    );
  }

  const git = getGitExecutable();
  const cwd = process.cwd();

  try {
    const branch = execFileSync(git, ["rev-parse", "--abbrev-ref", "HEAD"], { cwd }).toString().trim();
    const lastCommit = execFileSync(git, ["log", "-1", "--oneline"], { cwd }).toString().trim();
    const statusRaw = execFileSync(git, ["status", "--porcelain"], { cwd }).toString().trim();
    const uncommittedFiles = statusRaw ? statusRaw.split("\n").map((f) => f.trim()) : [];

    let commitsAhead = 0;
    try {
      const aheadStr = execFileSync(git, ["rev-list", "--count", "origin/main..HEAD"], { cwd }).toString().trim();
      commitsAhead = parseInt(aheadStr, 10) || 0;
    } catch {
      commitsAhead = 0;
    }

    const hasSavedToken = Boolean(getStoredToken());

    return NextResponse.json({
      success: true,
      branch,
      lastCommit,
      uncommittedCount: uncommittedFiles.length,
      uncommittedFiles: uncommittedFiles.slice(0, 15),
      commitsAhead,
      hasSavedToken,
      repoUrl: REPO_URL,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to inspect git status",
    }, { status: 500 });
  }
}

// POST: Trigger git commit & push
export async function POST(req: NextRequest) {
  if (!verifyAuthorization(req)) {
    return NextResponse.json(
      { error: "Unauthorized. This endpoint is strictly restricted to account owner career@insyt.bd." },
      { status: 403 }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const git = getGitExecutable();
  const cwd = process.cwd();
  const logs: string[] = [];

  const activeToken = body.githubToken?.trim() || getStoredToken();

  try {
    logs.push("🔍 Checking working tree status...");
    const statusRaw = execFileSync(git, ["status", "--porcelain"], { cwd }).toString().trim();

    if (statusRaw) {
      logs.push(`📦 Found uncommitted changes (${statusRaw.split("\n").length} files). Staging...`);
      execFileSync(git, ["add", "-A"], { cwd });
      logs.push("✅ Staged all updates (git add -A)");

      const defaultMsg = `feat(auto-sync): updates pushed by admin ${new Date().toISOString()}`;
      // Sanitize commit message to prevent shell metacharacters and single-line constraint
      const rawMsg = typeof body.commitMessage === "string" ? body.commitMessage.trim() : "";
      const safeMsg = (rawMsg.replace(/[\r\n]+/g, " ").slice(0, 150)) || defaultMsg;

      try {
        const commitOut = execFileSync(git, ["commit", "-m", safeMsg], { cwd }).toString().trim();
        logs.push(`📝 Committed: ${commitOut.split("\n")[0]}`);
      } catch (commitErr: any) {
        logs.push(`ℹ️ No changes needed to commit: ${commitErr.message}`);
      }
    } else {
      logs.push("✨ Working tree clean. Checking for commits ahead of origin/main...");
    }

    // Configure user identity if not already set
    try {
      execFileSync(git, ["config", "user.name", "INSYT"], { cwd });
      execFileSync(git, ["config", "user.email", "career@insyt.bd"], { cwd });
    } catch {}

    // Push to GitHub
    logs.push("🚀 Pushing to GitHub remote (branch: main)...");
    let pushArgs = ["push", "origin", "main"];

    if (activeToken) {
      const authenticatedUrl = `https://${activeToken}@github.com/career-insyt/inscorpo.git`;
      pushArgs = ["push", authenticatedUrl, "main"];
      logs.push("🔑 Using authorized GitHub Personal Access Token...");
    } else {
      logs.push("🌐 Using configured Git credential manager...");
    }

    const pushOutput = execFileSync(git, pushArgs, { cwd, stdio: "pipe" }).toString().trim();
    logs.push("🎉 Push completed successfully!");
    if (pushOutput) logs.push(pushOutput);

    const latestCommit = execFileSync(git, ["log", "-1", "--oneline"], { cwd }).toString().trim();

    // Trigger Netlify deploy hook if configured
    const netlifyHook = process.env.NETLIFY_BUILD_HOOK || process.env.NETLIFY_DEPLOY_HOOK;
    if (netlifyHook) {
      try {
        await fetch(netlifyHook, { method: "POST" });
        logs.push("🌐 Netlify deploy hook pinged — live site deployment initiated!");
      } catch (nhErr: any) {
        logs.push(`⚠️ Netlify hook ping error: ${nhErr.message}`);
      }
    } else {
      logs.push("🚀 Netlify auto-deploy: GitHub webhook will automatically build and publish changes to insyt.bd!");
    }

    return NextResponse.json({
      success: true,
      message: "Successfully pushed all updates to git repository and triggered live deployment!",
      logs,
      latestCommit,
    });
  } catch (err: any) {
    const stderr = err.stderr ? err.stderr.toString() : "";
    const stdout = err.stdout ? err.stdout.toString() : "";
    const errorDetails = stderr || stdout || err.message || "Unknown git execution error";

    logs.push(`❌ Push failed: ${errorDetails}`);

    return NextResponse.json({
      success: false,
      error: errorDetails,
      logs,
      hint: errorDetails.includes("403")
        ? "GitHub denied access (403). Please provide a GitHub Personal Access Token (PAT) with 'repo' scope or ensure your GitHub account has write access to insytbd-design/inscorpo."
        : "Ensure git credentials and network connection are active.",
    }, { status: 400 });
  }
}
