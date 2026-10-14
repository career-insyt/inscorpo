/**
 * INSYT Background Auto-Sync Daemon
 * Automatically monitors repository changes and pushes updates to GitHub main.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO_URL = "https://github.com/insytbd-design/inscorpo.git";
const TOKEN_FILE = path.join(__dirname, "..", ".git_token");
const ENV_FILE = path.join(__dirname, "..", ".env.local");
const CHECK_INTERVAL_MS = 20000; // Check every 20 seconds

function getStoredToken() {
  if (process.env.GITHUB_TOKEN?.trim()) return process.env.GITHUB_TOKEN.trim();
  if (process.env.GITHUB_PAT?.trim()) return process.env.GITHUB_PAT.trim();

  if (fs.existsSync(TOKEN_FILE)) {
    try {
      const token = fs.readFileSync(TOKEN_FILE, "utf-8").trim();
      if (token) return token;
    } catch {}
  }

  if (fs.existsSync(ENV_FILE)) {
    try {
      const content = fs.readFileSync(ENV_FILE, "utf-8");
      const match = content.match(/GITHUB_TOKEN=["']?([^"'\r\n]+)["']?/);
      if (match && match[1]?.trim()) return match[1].trim();
    } catch {}
  }

  return "";
}

function runGit(cmd) {
  try {
    return execSync(cmd, { cwd: path.join(__dirname, ".."), stdio: "pipe" }).toString().trim();
  } catch (err) {
    return null;
  }
}

async function syncAndPush() {
  const status = runGit("git status --porcelain");
  let ahead = 0;
  try {
    const aheadStr = runGit("git rev-list --count origin/main..HEAD");
    ahead = parseInt(aheadStr, 10) || 0;
  } catch {}

  if (!status && ahead === 0) {
    return; // Nothing to sync
  }

  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] 🔄 Detected changes or unpushed commits (ahead: ${ahead}, changes: ${status ? status.split("\n").length : 0})`);

  if (status) {
    runGit("git add -A");
    const commitMsg = `auto(sync): continuous updates ${new Date().toISOString()}`;
    runGit(`git commit -m "${commitMsg}"`);
    console.log(`[${now}] 📝 Staged and committed changes.`);
  }

  const token = getStoredToken();
  const pushCmd = token
    ? `git push https://${token}@github.com/insytbd-design/inscorpo.git main`
    : `git push origin main`;

  try {
    console.log(`[${now}] 🚀 Pushing updates to origin main...`);
    const out = execSync(pushCmd, { cwd: path.join(__dirname, ".."), stdio: "pipe" }).toString();
    console.log(`[${now}] ✅ Successfully pushed to GitHub main!`);
  } catch (err) {
    const msg = err.stderr ? err.stderr.toString() : err.message;
    console.error(`[${now}] ⚠️ Auto-push failed:`, msg.trim());
  }
}

console.log("⚡ INSYT Auto-Push Daemon active. Monitoring workspace for changes...");
setInterval(syncAndPush, CHECK_INTERVAL_MS);
syncAndPush();
