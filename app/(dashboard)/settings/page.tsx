"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, User, Shield, Bell, Volume2, VolumeX,
  GitBranch, GitCommit, GitPullRequest, RefreshCw,
  CheckCircle2, AlertTriangle, Key, Terminal, ArrowUpRight,
  Save, Eye, EyeOff, Sparkles, Server, Check, Lock
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useUser } from "@/components/providers/user-context";

interface GitStatusData {
  branch?: string;
  lastCommit?: string;
  uncommittedCount?: number;
  uncommittedFiles?: string[];
  commitsAhead?: number;
  hasSavedToken?: boolean;
  repoUrl?: string;
  error?: string;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { state, updateProfileName } = useUser();

  // Determine owner privileges: Strictly restricted to z65gt9@gmail.com
  const userEmail = (user?.email || state.email || "").toLowerCase().trim();
  const isOwner = userEmail === "z65gt9@gmail.com";

  // Profile Form State
  const [fullName, setFullName] = useState(state.name || user?.name || "Candidate");
  const [careerGoal, setCareerGoal] = useState("Finance & Analytics Specialist");
  const [soundEffects, setSoundEffects] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [profileSaved, setProfileSaved] = useState(false);

  // DevOps Git Push State (Owner only)
  const [gitStatus, setGitStatus] = useState<GitStatusData | null>(null);
  const [loadingGitStatus, setLoadingGitStatus] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [commitMessage, setCommitMessage] = useState("feat(platform): updates pushed by admin via settings");
  const [isPushing, setIsPushing] = useState(false);
  const [pushLogs, setPushLogs] = useState<string[]>([]);
  const [pushSuccess, setPushSuccess] = useState<boolean | null>(null);
  const [autoPushActive, setAutoPushActive] = useState(false);

  // Load Git status if owner
  const fetchGitStatus = async () => {
    if (!isOwner) return;
    setLoadingGitStatus(true);
    try {
      const res = await fetch("/api/admin/git-push", {
        headers: { "x-user-email": userEmail },
      });
      const data = await res.json();
      if (res.ok) {
        setGitStatus(data);
      } else {
        setGitStatus({ error: data.error });
      }
    } catch (err: any) {
      setGitStatus({ error: err.message || "Failed to reach git API" });
    } finally {
      setLoadingGitStatus(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchGitStatus();
    }
  }, [isOwner, userEmail]);

  // Handle Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileName(fullName);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch {}
  };

  // Handle Git Push
  const handleGitPush = async () => {
    if (!isOwner || isPushing) return;
    setIsPushing(true);
    setPushSuccess(null);
    setPushLogs(["Initiating Git sync process...", "Sending request to /api/admin/git-push..."]);

    try {
      const res = await fetch("/api/admin/git-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": userEmail,
        },
        body: JSON.stringify({
          userEmail,
          commitMessage,
          githubToken: githubToken.trim() || undefined,
          saveToken: Boolean(githubToken.trim()),
        }),
      });

      const data = await res.json();
      if (data.logs && Array.isArray(data.logs)) {
        setPushLogs(data.logs);
      } else if (data.error) {
        setPushLogs((prev) => [...prev, `❌ Error: ${data.error}`]);
      }

      if (data.success) {
        setPushSuccess(true);
        fetchGitStatus();
      } else {
        setPushSuccess(false);
      }
    } catch (err: any) {
      setPushSuccess(false);
      setPushLogs((prev) => [...prev, `❌ Network failure: ${err.message}`]);
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-mono pb-16">
      {/* ── Page Header ── */}
      <div className="border-b-2 border-corp-border pb-5">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#2563eb] tracking-widest mb-1.5">
          <Settings size={14} className="stroke-[2.5]" />
          <span>SYSTEM PREFERENCES // CONFIGURATION</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-corp-text">
              Account & System Settings
            </h1>
            <p className="text-xs text-corp-text-secondary mt-1 font-sans font-medium">
              Manage your candidate identity, user preferences, security, and repository deployments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-sm border-2 border-corp-border bg-corp-surface text-[11px] font-black uppercase text-corp-text shadow-[2px_2px_0px_0px_var(--corp-border)]">
              {isOwner ? "👑 SYSTEM OWNER" : "👤 VERIFIED CANDIDATE"}
            </span>
          </div>
        </div>
      </div>

      {/* ── EXCLUSIVE: OWNER DEVOPS GIT PUSH PANEL (z65gt9@gmail.com only) ── */}
      {isOwner && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border-4 border-amber-500 bg-gradient-to-br from-amber-500/10 via-corp-surface to-blue-500/10 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#f59e0b] relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-amber-500/30 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 border-2 border-amber-600 shadow-[2px_2px_0px_0px_#78350f] flex items-center justify-center font-black">
                <GitBranch size={24} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-amber-950 border border-amber-600">
                    OWNER ACCESS EXCLUSIVE
                  </span>
                  <span className="text-[10px] text-corp-text-tertiary">z65gt9@gmail.com</span>
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-corp-text mt-0.5">
                  Git Repository DevOps & Auto-Push
                </h2>
              </div>
            </div>

            <button
              onClick={fetchGitStatus}
              disabled={loadingGitStatus}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-black uppercase bg-corp-surface hover:bg-corp-bg-secondary text-corp-text border-2 border-corp-border shadow-[2px_2px_0px_0px_var(--corp-border)] transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={loadingGitStatus ? "animate-spin" : ""} />
              <span>Refresh Status</span>
            </button>
          </div>

          {/* Repo Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg border-2 border-corp-border bg-corp-surface/80">
              <p className="text-[10px] font-black uppercase text-corp-text-tertiary">Active Branch</p>
              <p className="text-sm font-black text-corp-text mt-1 flex items-center gap-1.5">
                <GitBranch size={14} className="text-[#2563eb]" />
                {gitStatus?.branch || "main"}
              </p>
            </div>
            <div className="p-4 rounded-lg border-2 border-corp-border bg-corp-surface/80">
              <p className="text-[10px] font-black uppercase text-corp-text-tertiary">Remote Sync Status</p>
              <p className="text-sm font-black text-corp-text mt-1 flex items-center gap-1.5">
                {(gitStatus?.commitsAhead || 0) > 0 ? (
                  <span className="text-amber-600 flex items-center gap-1">
                    <ArrowUpRight size={14} /> {gitStatus?.commitsAhead} commit{(gitStatus?.commitsAhead || 0) > 1 ? "s" : ""} ahead of origin
                  </span>
                ) : (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Synchronized with origin
                  </span>
                )}
              </p>
            </div>
            <div className="p-4 rounded-lg border-2 border-corp-border bg-corp-surface/80">
              <p className="text-[10px] font-black uppercase text-corp-text-tertiary">Uncommitted Files</p>
              <p className="text-sm font-black text-corp-text mt-1">
                {(gitStatus?.uncommittedCount || 0) > 0 ? (
                  <span className="text-amber-600">{gitStatus?.uncommittedCount} modified file(s)</span>
                ) : (
                  <span className="text-emerald-600">Working tree clean</span>
                )}
              </p>
            </div>
          </div>

          {/* Last Commit details */}
          {gitStatus?.lastCommit && (
            <div className="p-3 rounded-lg border-2 border-corp-border/60 bg-corp-surface/40 text-xs mb-6 flex items-center gap-2 text-corp-text-secondary">
              <GitCommit size={15} className="text-[#2563eb] shrink-0" />
              <span className="font-bold">Latest commit:</span>
              <code className="text-[11px] font-mono text-corp-text bg-corp-bg-secondary px-2 py-0.5 rounded border border-corp-border">
                {gitStatus.lastCommit}
              </code>
            </div>
          )}

          {/* GitHub Token & Commit Message Inputs */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-black uppercase text-corp-text mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Key size={13} className="text-amber-500" />
                  GitHub Personal Access Token (PAT)
                </span>
                <span className="text-[10px] font-bold text-corp-text-tertiary">
                  {gitStatus?.hasSavedToken ? "✅ Token saved in environment" : "Optional (Required if Windows 403 occurs)"}
                </span>
              </label>
              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder={gitStatus?.hasSavedToken ? "•••••••••••••••••••••••••••••• (Saved)" : "ghp_xxxxxxxxxxxxxxxxxxxx"}
                  className="w-full px-3.5 py-2.5 rounded-lg border-2 border-corp-border bg-corp-surface text-xs font-mono text-corp-text placeholder:text-corp-text-tertiary pr-10 focus:outline-none focus:border-[#2563eb]"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-corp-text-tertiary hover:text-corp-text cursor-pointer"
                >
                  {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="text-[10px] text-corp-text-secondary mt-1 font-sans">
                Paste a GitHub token with <code className="font-mono text-[#2563eb]">repo</code> scope. It bypasses any local credential lockouts and ensures pushes always succeed.
              </p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-corp-text mb-1.5">
                Commit Message
              </label>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="Describe your updates..."
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-corp-border bg-corp-surface text-xs font-mono text-corp-text focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <button
              onClick={handleGitPush}
              disabled={isPushing}
              className="py-3 px-6 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-amber-950 border-3 border-amber-600 shadow-[4px_4px_0px_0px_#78350f] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPushing ? (
                <>
                  <RefreshCw size={16} className="animate-spin stroke-[2.5]" />
                  <span>Staging & Pushing to GitHub...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="stroke-[2.5]" />
                  <span>⚡ Push All Updates to Git Repo</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-corp-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoPushActive}
                  onChange={(e) => setAutoPushActive(e.target.checked)}
                  className="rounded border-corp-border text-[#2563eb] focus:ring-0 w-4 h-4"
                />
                <span>Auto-Push Daemon Active</span>
              </label>
            </div>
          </div>

          {/* Realtime Execution Output Log */}
          {pushLogs.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 text-slate-400 rounded-t-lg text-[10px] font-mono border-x-2 border-t-2 border-slate-700">
                <span className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-emerald-400" />
                  <span>DevOps Execution Log</span>
                </span>
                {pushSuccess === true && <span className="text-emerald-400 font-bold">SUCCESS (200)</span>}
                {pushSuccess === false && <span className="text-rose-400 font-bold">FAILED (ERROR)</span>}
              </div>
              <div className="p-3 bg-slate-950 rounded-b-lg border-2 border-slate-700 font-mono text-[11px] text-emerald-400 space-y-1 max-h-48 overflow-y-auto">
                {pushLogs.map((log, index) => (
                  <p key={index} className={log.startsWith("❌") ? "text-rose-400" : log.startsWith("⚠️") ? "text-amber-400" : ""}>
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ── Candidate Profile & Identity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border-2 border-corp-border bg-corp-surface p-6 shadow-[3px_3px_0px_0px_var(--corp-border)]">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-corp-text border-b-2 border-corp-border pb-3 mb-5">
            <User size={16} className="text-[#2563eb]" />
            <span>Candidate Profile Information</span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-corp-text mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-corp-border bg-corp-bg text-xs font-mono text-corp-text focus:outline-none focus:border-[#2563eb]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-corp-text mb-1">
                Primary Account Email
              </label>
              <input
                type="email"
                disabled
                value={userEmail || "member@insyt.bd"}
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-corp-border bg-corp-bg-secondary text-xs font-mono text-corp-text-secondary cursor-not-allowed"
              />
              <p className="text-[10px] text-corp-text-tertiary mt-1">
                Email address is verified and permanently linked to your verifiable career credentials.
              </p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-corp-text mb-1">
                Target Specialization
              </label>
              <select
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-corp-border bg-corp-bg text-xs font-mono text-corp-text focus:outline-none focus:border-[#2563eb]"
              >
                <option value="Finance & Analytics Specialist">Financial Modeling & Valuation</option>
                <option value="Video Producer & Creative AI">CapCut & Generative Video Production</option>
                <option value="Executive Management & Strategy">Management Trainee & Strategy</option>
                <option value="Business Intelligence & Power BI">Business Intelligence & Power BI</option>
              </select>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2563eb] hover:bg-blue-600 text-white border-2 border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>

              {profileSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 font-sans">
                  <Check size={14} /> Saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* ── Preferences & Notifications ── */}
        <div className="rounded-xl border-2 border-corp-border bg-corp-surface p-6 shadow-[3px_3px_0px_0px_var(--corp-border)] space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-corp-text border-b-2 border-corp-border pb-3">
            <Bell size={16} className="text-amber-500" />
            <span>Platform Preferences</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-corp-text">Interactive Audio / SFX</p>
                <p className="text-[11px] text-corp-text-secondary font-sans">Gamified click and level-up audio</p>
              </div>
              <button
                type="button"
                onClick={() => setSoundEffects(!soundEffects)}
                className={`p-2 rounded-lg border-2 transition-all cursor-pointer ${
                  soundEffects
                    ? "bg-amber-400 text-amber-950 border-amber-600"
                    : "bg-corp-bg-secondary text-corp-text-tertiary border-corp-border"
                }`}
              >
                {soundEffects ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-corp-border">
              <div>
                <p className="text-xs font-black text-corp-text">Job & Circular Alerts</p>
                <p className="text-[11px] text-corp-text-secondary font-sans">Daily executive matching digest</p>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border ${
                  emailAlerts ? "bg-[#2563eb] border-blue-400" : "bg-corp-bg-secondary border-corp-border"
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                    emailAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-corp-bg-secondary border border-corp-border text-xs text-corp-text-secondary">
              <span className="font-bold text-corp-text block mb-1">Host Domain:</span>
              <code className="text-[11px] font-mono text-[#2563eb]">
                {typeof window !== "undefined" ? window.location.host : "career.insyt.bd"}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
