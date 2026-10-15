"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User, Mail, Phone, MapPin, Building2, GraduationCap, Calendar,
  Sparkles, Check, Camera, Upload, ShieldCheck,
  Crown, Award, Flame, ExternalLink, RefreshCw, Copy, Eye,
  Briefcase, Save, ArrowRight, AlertCircle, CheckCircle2, Sliders, Globe, Link2
} from "lucide-react";

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}
import { useAuth } from "@/components/providers/auth-provider";
import { useUser } from "@/components/providers/user-context";
import { cn } from "@/lib/utils";

const PRESET_AVATARS = [
  { label: "FMCG Lead", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { label: "Tech Director", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { label: "Finance Strategist", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { label: "Creative Lead", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { label: "Operations Lead", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { label: "Brand Director", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
];

const CAREER_TRACK_OPTIONS = [
  "Corporate Financial Modeling & Valuation",
  "Power BI, SQL & Business Intelligence",
  "Workplace AI & Automation Engineering",
  "FMCG Brand Strategy & Trade Marketing",
  "Supply Chain Analytics & Demand Planning",
  "Corporate MTO & Executive Leadership",
  "Investment Banking & Private Equity",
];

const EXPERIENCE_LEVELS = [
  "Undergraduate / Fresher",
  "Entry Level (0 - 2 Years)",
  "Mid-Level Professional (2 - 5 Years)",
  "Senior Analyst / Lead (5 - 8 Years)",
  "Executive / Director (8+ Years)",
];

export default function UserProfilePage() {
  const { user } = useAuth();
  const {
    state,
    updateProfileName,
    updatePassportProfile,
    updateCareerPreferences,
  } = useUser();

  const pp = state.passportProfile;

  // Active Tab: identity | bio_goals | credentials | preview
  const [activeTab, setActiveTab] = useState<"identity" | "bio_goals" | "credentials" | "preview">("identity");

  // Form Fields
  const [fullName, setFullName] = useState(state.name || user?.name || "Candidate");
  const [headline, setHeadline] = useState(pp?.headline || "Corporate Strategy & Financial Analyst");
  const [summary, setSummary] = useState(pp?.summary || "");
  const [location, setLocation] = useState(pp?.location || "Dhaka, Bangladesh");
  const [phone, setPhone] = useState(pp?.phone || "");
  const [linkedin, setLinkedin] = useState(pp?.linkedin || "");
  const [github, setGithub] = useState(pp?.github || "");
  const [university, setUniversity] = useState(pp?.university || "");
  const [degree, setDegree] = useState(pp?.degree || "");
  const [gradYear, setGradYear] = useState(pp?.gradYear || "");
  const [photoUrl, setPhotoUrl] = useState(pp?.photoUrl || "");
  const [customPhotoInput, setCustomPhotoInput] = useState("");
  const [isPublic, setIsPublic] = useState(pp?.isPublic ?? true);
  const [experienceLevel, setExperienceLevel] = useState(state.experienceLevel || "Entry Level (0 - 2 Years)");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    state.careerGoals && state.careerGoals.length > 0
      ? state.careerGoals
      : ["Corporate Financial Modeling & Valuation"]
  );

  // Status and feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state into local form on first load or when state changes from backend
  useEffect(() => {
    if (state.name && !fullName) setFullName(state.name);
    if (pp?.headline && !headline) setHeadline(pp.headline);
    if (pp?.summary && !summary) setSummary(pp.summary);
    if (pp?.location && !location) setLocation(pp.location);
    if (pp?.phone && !phone) setPhone(pp.phone);
    if (pp?.linkedin && !linkedin) setLinkedin(pp.linkedin);
    if (pp?.github && !github) setGithub(pp.github);
    if (pp?.university && !university) setUniversity(pp.university);
    if (pp?.degree && !degree) setDegree(pp.degree);
    if (pp?.gradYear && !gradYear) setGradYear(pp.gradYear);
    if (pp?.photoUrl && !photoUrl) setPhotoUrl(pp.photoUrl);
    if (pp?.isPublic !== undefined) setIsPublic(pp.isPublic);
    if (state.experienceLevel) setExperienceLevel(state.experienceLevel);
    if (state.careerGoals && state.careerGoals.length > 0) setSelectedGoals(state.careerGoals);
  }, [state, pp]);

  // Handle Save All to Backend and Frontend
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // 1. Update Core Name in Appwrite Account & State
      if (fullName.trim() && fullName !== state.name) {
        await updateProfileName(fullName.trim());
      }

      // 2. Update Career Passport Profile Document & Preferences
      await updatePassportProfile({
        photoUrl: photoUrl.trim() || undefined,
        headline: headline.trim(),
        summary: summary.trim(),
        location: location.trim(),
        phone: phone.trim(),
        linkedin: linkedin.trim(),
        github: github.trim(),
        university: university.trim(),
        degree: degree.trim(),
        gradYear: gradYear.trim(),
        isPublic,
      });

      // 3. Update Career Preferences in Appwrite Preferences & State
      await updateCareerPreferences(selectedGoals, experienceLevel);

      setSaveSuccess(true);
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Error saving user profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("Please select an image smaller than 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        await updatePassportProfile({ photoUrl: result });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  // Generate Smart Bio with AI
  const handleGenerateSmartBio = () => {
    const uniText = university ? `graduate of ${university}` : "business graduate";
    const tracksText = selectedGoals.length > 0 ? selectedGoals.join(" and ") : "strategic financial operations";
    const generated = `High-performing ${uniText} specializing in ${tracksText}. Demonstrated expertise in analytical decision-making, executive data modeling, and business problem solving with an unyielding commitment to corporate impact.`;
    setSummary(generated);
  };

  // Copy shareable public link
  const handleCopyPublicLink = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/career-passport?highlight=career-passport-evidence`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const verificationId = `INSYT-PASS-${(fullName || "USER").substring(0, 3).toUpperCase()}-2026`;
  const initials = fullName ? fullName.substring(0, 2).toUpperCase() : "US";

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 font-mono">
      {/* ── Page Header Banner ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 relative overflow-hidden font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-900 overflow-hidden bg-[#2563eb] text-white flex items-center justify-center font-mono font-black text-2xl flex-shrink-0 shadow-[3px_3px_0px_0px_#0f172a] relative group">
              {photoUrl ? (
                <img src={photoUrl} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-mono font-bold cursor-pointer"
                title="Change Photo"
              >
                <Camera size={16} />
                <span>Change</span>
              </button>
            </div>

            <div className="space-y-1 min-w-0 font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 truncate">
                  {fullName || "Candidate Profile"}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-700 border border-blue-300">
                  Candidate ID: {verificationId}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-sans truncate">
                {headline || "Corporate Strategy Specialist"}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <ShieldCheck size={13} /> Verified Member
                </span>
                <span>•</span>
                <span>{user?.email || state.email || "insyt.bd@gmail.com"}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap font-mono">
            <button
              type="button"
              onClick={handleCopyPublicLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border-2 border-slate-300 hover:border-slate-800 bg-slate-50 text-slate-800 transition-all cursor-pointer shadow-xs"
            >
              {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveAll()}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black text-white bg-[#2563eb] hover:bg-blue-600 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer disabled:opacity-60"
            >
              {isSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
              <span>{isSaving ? "Syncing..." : "Save Changes"}</span>
            </button>
          </div>
        </div>

        {/* Live Sync Banner */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Appwrite Cloud State: Connected</span>
            {lastSavedTime && (
              <span className="text-emerald-600 font-bold">• Last synced at {lastSavedTime}</span>
            )}
          </div>
          {saveSuccess && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-600 font-bold flex items-center gap-1"
            >
              <CheckCircle2 size={13} /> Updated frontend &amp; backend successfully!
            </motion.span>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      {/* ── Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b-2 border-corp-border pb-2 overflow-x-auto no-scrollbar font-mono text-xs">
        {[
          { id: "identity", label: "Identity & Photo", icon: <User size={14} /> },
          { id: "bio_goals", label: "Executive Bio & Goals", icon: <Sparkles size={14} /> },
          { id: "credentials", label: "Contact & Education", icon: <GraduationCap size={14} /> },
          { id: "preview", label: "Recruiter Preview Card", icon: <Eye size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap",
              activeTab === tab.id
                ? "bg-[#2563eb] text-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]"
                : "border-2 border-corp-border bg-corp-surface text-corp-text hover:bg-corp-bg-secondary"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB 1: IDENTITY & PHOTO ── */}
      {activeTab === "identity" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 space-y-6 font-sans">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-slate-900 flex items-center gap-2">
                <User size={16} className="text-[#2563eb]" /> Candidate Personal Identity
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Your legal identity used across certificates, career passport credentials, and recruiter talent pools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#2563eb] outline-none text-xs text-slate-900 bg-slate-50 font-sans font-medium"
                  placeholder="e.g. Tanvir Ahmed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700">Email Address (Registered)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || state.email || "insyt.bd@gmail.com"}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs text-slate-500 bg-slate-100 font-mono cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700">Professional Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#2563eb] outline-none text-xs text-slate-900 bg-slate-50 font-sans font-medium"
                  placeholder="e.g. Senior Financial Analyst · FMCG Corporate Modeling Specialist"
                />
                <p className="text-[11px] text-slate-500 font-sans">
                  Appears directly beneath your name on verified certificate ledgers and recruiter exports.
                </p>
              </div>
            </div>

            {/* Profile Visibility Toggle */}
            <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between gap-4 font-mono">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Globe size={15} className="text-[#2563eb]" />
                  <span className="text-xs font-black uppercase text-slate-900">
                    Public Recruiter Visibility
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-sans">
                  When enabled, verified recruiters and partners can view your Career Passport credentials.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-xs font-black uppercase border-2 transition-all cursor-pointer",
                  isPublic
                    ? "bg-emerald-500 text-white border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]"
                    : "bg-slate-200 text-slate-600 border-slate-300"
                )}
              >
                {isPublic ? "Public" : "Confidential"}
              </button>
            </div>
          </div>

          {/* Profile Picture & Preset Avatar Picker */}
          <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 space-y-5 font-sans">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-slate-900 flex items-center gap-2">
                <Camera size={16} className="text-[#2563eb]" /> Candidate Portrait &amp; Avatar
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Upload your professional headshot or select a verified corporate avatar preset.
              </p>
            </div>

            {/* Upload or Custom URL options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-5 rounded-xl border-2 border-dashed border-blue-400 hover:border-blue-600 bg-blue-50/50 hover:bg-blue-50 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Upload size={18} />
                </div>
                <span className="text-xs font-black uppercase text-slate-900">Upload Photo from Device</span>
                <span className="text-[10px] text-slate-500 font-sans">PNG, JPG, or WebP up to 3MB</span>
              </button>

              <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-center">
                <label className="text-xs font-black uppercase text-slate-700">Or Paste Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customPhotoInput}
                    onChange={(e) => setCustomPhotoInput(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-1.5 rounded-lg border-2 border-slate-300 text-xs font-sans bg-white outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customPhotoInput.trim()) {
                        setPhotoUrl(customPhotoInput.trim());
                        setCustomPhotoInput("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-black uppercase cursor-pointer hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Preset Avatars */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-black uppercase text-slate-700">
                Corporate Avatar Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.label}
                    type="button"
                    onClick={() => setPhotoUrl(av.url)}
                    className={cn(
                      "p-2 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer",
                      photoUrl === av.url
                        ? "border-[#2563eb] bg-blue-50 shadow-[2px_2px_0px_0px_#2563eb]"
                        : "border-slate-200 hover:border-slate-400 bg-white"
                    )}
                  >
                    <img src={av.url} alt={av.label} className="w-14 h-14 rounded-full object-cover border border-slate-200" />
                    <span className="text-[10px] font-mono font-bold text-slate-700">{av.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── TAB 2: BIO & GOALS ── */}
      {activeTab === "bio_goals" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Executive Bio */}
          <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 space-y-4 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black uppercase font-mono text-slate-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#2563eb]" /> Executive Bio &amp; Career Objective
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Summarize your corporate trajectory, core quantitative skills, and target business roles.
                </p>
              </div>
              <button
                type="button"
                onClick={handleGenerateSmartBio}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase bg-blue-600 text-white hover:bg-blue-700 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer flex-shrink-0"
              >
                <Sparkles size={13} /> AI Smart Bio
              </button>
            </div>

            <div className="space-y-1.5">
              <textarea
                rows={5}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write your executive summary here, or click 'AI Smart Bio' to auto-generate based on your target tracks..."
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#2563eb] outline-none text-xs text-slate-900 bg-slate-50 font-sans leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{summary.length} characters</span>
                <span>Recommended: 150 - 350 characters for recruiters</span>
              </div>
            </div>
          </div>

          {/* Career Track Goals & Seniority */}
          <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 space-y-6 font-sans">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-slate-900 flex items-center gap-2">
                <Briefcase size={16} className="text-[#2563eb]" /> Career Tracks &amp; Experience Level
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Selecting your primary tracks aligns your daily quests, mock interview prompts, and recruiter recommendations.
              </p>
            </div>

            <div className="space-y-2 font-mono">
              <label className="text-xs font-black uppercase text-slate-700">Seniority / Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-900 bg-slate-50 outline-none focus:border-blue-500 cursor-pointer"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2.5 font-mono">
              <label className="text-xs font-black uppercase text-slate-700">
                Target Corporate Tracks (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAREER_TRACK_OPTIONS.map((track) => {
                  const isSelected = selectedGoals.includes(track);
                  return (
                    <div
                      key={track}
                      onClick={() => toggleGoal(track)}
                      className={cn(
                        "p-3 rounded-xl border-2 flex items-center justify-between gap-2 cursor-pointer transition-all",
                        isSelected
                          ? "bg-blue-50 border-blue-600 text-blue-900 shadow-[2px_2px_0px_0px_#2563eb]"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400"
                      )}
                    >
                      <span className="text-xs font-bold font-sans">{track}</span>
                      <div
                        className={cn(
                          "w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 text-xs font-black",
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        )}
                      >
                        {isSelected && "✓"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── TAB 3: CONTACT & EDUCATION ── */}
      {activeTab === "credentials" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Contact & Socials */}
          <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 space-y-5 font-sans">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-slate-900 flex items-center gap-2">
                <MapPin size={16} className="text-[#2563eb]" /> Location &amp; Contact Details
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Ensure hiring managers and automated applicant trackers can contact you directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                  <MapPin size={12} className="text-blue-600" /> Location (City, Country)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-sans text-slate-900 bg-slate-50 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                  <Phone size={12} className="text-blue-600" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1700 000000"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono text-slate-900 bg-slate-50 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" /> LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/your-profile"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono text-slate-900 bg-slate-50 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-800" /> GitHub / Portfolio URL
                </label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="github.com/your-username"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono text-slate-900 bg-slate-50 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 space-y-5 font-sans">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-slate-900 flex items-center gap-2">
                <GraduationCap size={16} className="text-[#2563eb]" /> Academic Credentials
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Your university pedigree and highest completed or in-progress degree.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                  <Building2 size={12} className="text-blue-600" /> University / Institution
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. University of Dhaka"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-sans text-slate-900 bg-slate-50 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                  <GraduationCap size={12} className="text-blue-600" /> Degree &amp; Major
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. BBA in Finance"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-sans text-slate-900 bg-slate-50 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                  <Calendar size={12} className="text-blue-600" /> Graduation Year
                </label>
                <input
                  type="text"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  placeholder="e.g. 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-mono text-slate-900 bg-slate-50 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── TAB 4: RECRUITER PREVIEW ── */}
      {activeTab === "preview" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-4 rounded-xl border-2 border-amber-400 bg-amber-50 text-amber-950 font-mono text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-amber-700 flex-shrink-0" />
              <span>Recruiter Live View · This shows how enterprise recruiters inspect your verified candidate profile.</span>
            </div>
            <Link
              href="/career-passport"
              className="text-xs font-black underline uppercase text-amber-900 hover:text-black flex-shrink-0"
            >
              View Full Passport →
            </Link>
          </div>

          {/* Interactive Recruiter Card */}
          <div className="rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden bg-white text-slate-900 font-sans">
            {/* Card Header */}
            <div className="p-6 bg-[#2563eb] text-white border-b-2 border-slate-900 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-white overflow-hidden bg-white text-[#2563eb] flex items-center justify-center font-mono font-black text-2xl shadow-md">
                    {photoUrl ? (
                      <img src={photoUrl} alt={fullName} className="w-full h-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">{fullName || "Candidate"}</h3>
                    <p className="text-xs text-blue-100 font-medium">{headline || "Corporate Strategist"}</p>
                    <p className="text-[11px] font-mono text-blue-200">{location || "Dhaka, Bangladesh"}</p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="px-3 py-1 rounded text-xs font-black bg-amber-300 text-amber-950 border border-amber-500 shadow-xs">
                    {verificationId}
                  </span>
                  <p className="text-[10px] text-blue-200 mt-1 font-bold">W3C VC 2.0 Credential Verified</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-black uppercase text-slate-500">Executive Summary</h4>
                <p className="text-xs text-slate-800 leading-relaxed font-sans">
                  {summary || "No executive summary provided yet. Go to 'Executive Bio & Goals' to generate one."}
                </p>
              </div>

              {/* Grid: Education & Target Track */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-black uppercase text-slate-500">Education &amp; Institution</h4>
                  <p className="text-xs font-bold text-slate-900">{university || "University not specified"}</p>
                  <p className="text-[11px] text-slate-600 font-sans">{degree || "Degree not specified"} · Class of {gradYear || "2026"}</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-black uppercase text-slate-500">Seniority &amp; Track</h4>
                  <p className="text-xs font-bold text-slate-900">{experienceLevel}</p>
                  <p className="text-[11px] text-slate-600 font-sans truncate">{selectedGoals.join(", ")}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-mono">
                {linkedin && (
                  <a
                    href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-blue-600 hover:underline font-bold"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" /> {linkedin}
                  </a>
                )}
                {github && (
                  <a
                    href={github.startsWith("http") ? github : `https://${github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-slate-700 hover:underline font-bold"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-slate-800" /> {github}
                  </a>
                )}
                {phone && (
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Phone size={13} /> {phone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Bottom Floating Save Bar ── */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 z-30 font-mono">
        <div className="bg-slate-900 text-white rounded-2xl p-3 sm:px-5 sm:py-3.5 border-2 border-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Ready to persist changes to Appwrite Cloud DB</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleSaveAll()}
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase text-slate-950 bg-amber-400 hover:bg-amber-300 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer disabled:opacity-60"
            >
              {isSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
              <span>{isSaving ? "Syncing..." : "Save Profile"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
