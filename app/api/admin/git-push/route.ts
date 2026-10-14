import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const AUTHORIZED_OWNER = "z65gt9@gmail.com";
const REPO_URL = "https://github.com/insytbd-design/inscorpo.git";
const TOKEN_FILE = path.join(process.cwd(), ".git_token");
const ENV_LOCAL_FILE = path.join(process.cwd(), ".env.local");

function getGitExecutable(): string {
  try {
    execSync("git --version", { stdio: "ignore" });
    return "git";
  } catch {
    const minGit = "C:\\Users\\Taba\\mingit\\cmd\\git.exe";
    if (fs.existsSync(minGit)) return minGit;
    return "git";
  }
}

function getStoredToken(): string {
  // 1. Process environment
  if (process.env.GITHUB_TOKEN?.trim()) return process.env.GITHUB_TOKEN.trim();
  if (process.env.GITHUB_PAT?.trim()) return process.env.GITHUB_PAT.trim();

  // 2. .git_token file (gitignored)
  if (fs.existsSync(TOKEN_FILE)) {
    try {
      const token = fs.readFileSync(TOKEN_FILE, "utf-8").trim();
      if (token) return token;
    } catch {}
  }

  // 3. .env.local file
  if (fs.existsSync(ENV_LOCAL_FILE)) {
    try {
      const content = fs.readFileSync(ENV_LOCAL_FILE, "utf-8");
      const match = content.match(/GITHUB_TOKEN=["']?([^"'\r\n]+)["']?/);
      if (match && match[1]?.trim()) return match[1].trim();
    } catch {}
  }

  return "";
}

function saveToken(token: string) {
  if (!token) return;
  try {
    fs.writeFileSync(TOKEN_FILE, token.trim(), "utf-8");
  } catch {}

  try {
    let envContent = "";
    if (fs.existsSync(ENV_LOCAL_FILE)) {
      envContent = fs.readFileSync(ENV_LOCAL_FILE, "utf-8");
    }
    if (envContent.includes("GITHUB_TOKEN=")) {
      envContent = envContent.replace(/GITHUB_TOKEN=.*(\r?\n|$)/g, `GITHUB_TOKEN="${token.trim()}"$1`);
    } else {
      envContent += `\nGITHUB_TOKEN="${token.trim()}"\n`;
    }
    fs.writeFileSync(ENV_LOCAL_FILE, envContent, "utf-8");
  } catch {}
}

function verifyAuthorization(req: NextRequest, bodyEmail?: string): boolean {
  // Check cookie
  const cookieEmail = req.cookies.get("insyt_admin_email")?.value;
  if (cookieEmail && decodeURIComponent(cookieEmail).toLowerCase().trim() === AUTHORIZED_OWNER) {
    return true;
  }

  // Check header
  const headerEmail = req.headers.get("x-user-email");
  if (headerEmail && headerEmail.toLowerCase().trim() === AUTHORIZED_OWNER) {
    return true;
  }

  // Check body email
  if (bodyEmail && bodyEmail.toLowerCase().trim() === AUTHORIZED_OWNER) {
    return true;
  }

  return false;
}

// GET: Query repository status
export async function GET(req: NextRequest) {
  if (!verifyAuthorization(req)) {
    return NextResponse.json(
      { error: "Unauthorized. This endpoint is strictly restricted to account owner z65gt9@gmail.com." },
      { status: 403 }
    );
  }

  const git = getGitExecutable();
  const cwd = process.cwd();

  try {
    const branch = execSync(`"${git}" rev-parse --abbrev-ref HEAD`, { cwd }).toString().trim();
    const lastCommit = execSync(`"${git}" log -1 --oneline`, { cwd }).toString().trim();
    const statusRaw = execSync(`"${git}" status --porcelain`, { cwd }).toString().trim();
    const uncommittedFiles = statusRaw ? statusRaw.split("\n").map((f) => f.trim()) : [];

    let commitsAhead = 0;
    try {
      const aheadStr = execSync(`"${git}" rev-list --count origin/main..HEAD`, { cwd }).toString().trim();
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
  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const userEmail = body.userEmail;
  if (!verifyAuthorization(req, userEmail)) {
    return NextResponse.json(
      { error: "Unauthorized. This endpoint is strictly restricted to account owner z65gt9@gmail.com." },
      { status: 403 }
    );
  }

  const git = getGitExecutable();
  const cwd = process.cwd();
  const logs: string[] = [];

  // If a new token is provided, store it
  if (body.githubToken?.trim()) {
    saveToken(body.githubToken.trim());
  }

  const activeToken = body.githubToken?.trim() || getStoredToken();

  try {
    logs.push("🔍 Checking working tree status...");
    const statusRaw = execSync(`"${git}" status --porcelain`, { cwd }).toString().trim();

    if (statusRaw) {
      logs.push(`📦 Found uncommitted changes (${statusRaw.split("\n").length} files). Staging...`);
      execSync(`"${git}" add -A`, { cwd });
      logs.push("✅ Staged all updates (git add -A)");

      const defaultMsg = `feat(auto-sync): updates pushed by admin ${new Date().toISOString()}`;
      const commitMsg = (body.commitMessage?.trim() || defaultMsg).replace(/"/g, '\\"');

      try {
        const commitOut = execSync(`"${git}" commit -m "${commitMsg}"`, { cwd }).toString().trim();
        logs.push(`📝 Committed: ${commitOut.split("\n")[0]}`);
      } catch (commitErr: any) {
        logs.push(`ℹ️ No changes needed to commit: ${commitErr.message}`);
      }
    } else {
      logs.push("✨ Working tree clean. Checking for commits ahead of origin/main...");
    }

    // Configure user identity if not already set
    try {
      execSync(`"${git}" config user.name "Zubair"`, { cwd });
      execSync(`"${git}" config user.email "z65gt9@gmail.com"`, { cwd });
    } catch {}

    // Push to GitHub
    logs.push("🚀 Pushing to GitHub remote (branch: main)...");
    let pushCommand = `"${git}" push origin main`;

    if (activeToken) {
      const authenticatedUrl = `https://${activeToken}@github.com/insytbd-design/inscorpo.git`;
      pushCommand = `"${git}" push "${authenticatedUrl}" main`;
      logs.push("🔑 Using authorized GitHub Personal Access Token...");
    } else {
      logs.push("🌐 Using configured Git credential manager...");
    }

    const pushOutput = execSync(pushCommand, { cwd, stdio: "pipe" }).toString().trim();
    logs.push("🎉 Push completed successfully!");
    if (pushOutput) logs.push(pushOutput);

    const latestCommit = execSync(`"${git}" log -1 --oneline`, { cwd }).toString().trim();

    return NextResponse.json({
      success: true,
      message: "Successfully pushed all updates to git repository!",
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
