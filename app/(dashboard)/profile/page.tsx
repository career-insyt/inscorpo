"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User, Mail, MapPin, Building2, Calendar,
  Sparkles, Check, Camera, Upload, ShieldCheck,
  Crown, Award, Flame, ExternalLink, RefreshCw, Copy, Eye,
  Briefcase, Save, ArrowRight, AlertCircle, CheckCircle2,
  Lock, Unlock, Bell, Key, LogOut, Download, Trash2, Edit2, ShieldAlert
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useUser } from "@/components/providers/user-context";
import { cn } from "@/lib/utils";

const PRESET_AVATARS = [
  { label: "Executive Lead", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { label: "Tech Director", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { label: "Finance Strategist", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { label: "Analyst", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { label: "Operations Lead", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { label: "Brand Strategist", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
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
  const { user, logout } = useAuth();
  const {
    state,
    updateProfileName,
    updatePassportProfile,
    updateCareerPreferences,
    addNotification,
  } = useUser();

  const pp = state.passportProfile;

  // Form Fields
  const [fullName, setFullName] = useState(state.name || user?.name || "Candidate");
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(state.name || user?.name || "Candidate");
  const [location, setLocation] = useState(pp?.location || "Dhaka, Bangladesh");
  const [photoUrl, setPhotoUrl] = useState(pp?.photoUrl || "");
  const [isPublic, setIsPublic] = useState(pp?.isPublic ?? true);
  const [experienceLevel, setExperienceLevel] = useState(state.experienceLevel || "Entry Level (0 - 2 Years)");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    state.careerGoals && state.careerGoals.length > 0
      ? state.careerGoals
      : ["Corporate Financial Modeling & Valuation"]
  );

  // Notification Preferences
  const [notifQuests, setNotifQuests] = useState(true);
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifJobs, setNotifJobs] = useState(true);

  // Status and feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [cooldownError, setCooldownError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate 30-day name cooldown
  const calculateCooldown = () => {
    const lastChange = state.lastNameChangeDate;
    if (!lastChange) return 0;
    try {
      const diffMs = Date.now() - new Date(lastChange).getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return diffDays < 30 ? 30 - diffDays : 0;
    } catch {
      return 0;
    }
  };

  const daysRemaining = calculateCooldown();

  useEffect(() => {
    if (state.name) {
      setFullName(state.name);
      setDraftName(state.name);
    }
    if (pp?.location) setLocation(pp.location);
    if (pp?.photoUrl) setPhotoUrl(pp.photoUrl);
    if (pp?.isPublic !== undefined) setIsPublic(pp.isPublic);
    if (state.experienceLevel) setExperienceLevel(state.experienceLevel);
    if (state.careerGoals && state.careerGoals.length > 0) setSelectedGoals(state.careerGoals);
  }, [state.name, state.experienceLevel, state.careerGoals, pp?.location, pp?.photoUrl, pp?.isPublic]);

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setCooldownError(null);

    try {
      if (draftName.trim() && draftName.trim() !== state.name) {
        if (daysRemaining > 0) {
          setCooldownError(`Name change locked: ${daysRemaining} days remaining.`);
          return;
        }
        await updateProfileName(draftName.trim());
        setFullName(draftName.trim());
        setIsEditingName(false);
      }

      await updatePassportProfile({
        photoUrl: photoUrl.trim() || undefined,
        location: location.trim(),
        isPublic,
      });

      await updateCareerPreferences(selectedGoals, experienceLevel);

      setSaveSuccess(true);
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setTimeout(() => setSaveSuccess(false), 4000);

      addNotification({
        type: "system",
        title: "Account Settings Saved",
        message: "Your profile preferences and account settings have been successfully synced.",
      });
    } catch (err) {
      console.error("Error saving user profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveInlineName = async () => {
    if (daysRemaining > 0) {
      setCooldownError(`Name changes are locked for ${daysRemaining} more days.`);
      return;
    }
    if (!draftName.trim() || draftName.trim() === state.name) {
      setIsEditingName(false);
      return;
    }
    try {
      setIsSaving(true);
      await updateProfileName(draftName.trim());
      setFullName(draftName.trim());
      setIsEditingName(false);
      setCooldownError(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setCooldownError("Failed to update name. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleExportData = () => {
    const exportData = {
      user: {
        name: fullName,
        email: state.email || user?.email,
        candidateId: `INSYT-PASS-${(fullName || "USER").substring(0, 3).toUpperCase()}-2026`,
        subscriptionTier: state.subscriptionTier || "starter",
        careerGoals: selectedGoals,
        experienceLevel,
        location,
        streak: state.streak,
        weeklyActivity: state.weeklyActivity,
      },
      passport: pp,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insyt_profile_${(fullName || "user").toLowerCase().replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const verificationId = `INSYT-PASS-${(fullName || "USER").substring(0, 3).toUpperCase()}-2026`;
  const initials = fullName ? fullName.substring(0, 2).toUpperCase() : "US";

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 font-sans">
      {/* ── 1. Page Header & Candidate Identity ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 relative overflow-hidden font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            {/* Clickable Profile Photo */}
            <div className="relative group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-blue-600 overflow-hidden bg-[#2563eb] text-white flex items-center justify-center font-mono font-black text-2xl shadow-[3px_3px_0px_0px_#1e3a8a]">
                {photoUrl ? (
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-blue-950/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-mono font-black cursor-pointer"
                title="Click to Change Photo"
              >
                <Camera size={18} />
                <span>Change</span>
              </button>
            </div>

            <div className="space-y-1.5 min-w-0 font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Inline Editable Name */}
                {isEditingName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      className="px-2.5 py-1 text-base sm:text-lg font-black border-2 border-blue-500 rounded-md bg-blue-50 text-slate-900 focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSaveInlineName}
                      disabled={isSaving}
                      className="p-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                      title="Save Name"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftName(fullName);
                        setIsEditingName(false);
                      }}
                      className="p-1.5 rounded-md bg-slate-200 text-slate-900 hover:bg-slate-300 transition-colors cursor-pointer"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 truncate">
                      {fullName || "Candidate Profile"}
                    </h1>
                    {daysRemaining === 0 ? (
                      <button
                        type="button"
                        onClick={() => setIsEditingName(true)}
                        className="p-1 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Name (Allowed once per 30 days)"
                      >
                        <Edit2 size={15} />
                      </button>
                    ) : (
                      <span
                        className="flex items-center gap-1 text-[10px] font-mono font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-400"
                        title="30-day cooldown policy active"
                      >
                        <Lock size={10} /> Name Locked ({daysRemaining}d left)
                      </span>
                    )}
                  </div>
                )}
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-[#1e3a8a] border border-blue-400">
                  {verificationId}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-800 font-sans flex-wrap font-semibold">
                <span className="flex items-center gap-1 font-black text-emerald-700">
                  <ShieldCheck size={14} /> Verified Candidate
                </span>
                <span>•</span>
                <span>{user?.email || state.email || "career@insyt.bd"}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-800">
                  <MapPin size={12} className="text-[#2563eb]" /> {location}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Top Actions */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap font-mono">
            <Link
              href="/career-passport"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border-2 border-slate-300 hover:border-blue-600 bg-slate-50 text-slate-900 transition-all cursor-pointer shadow-xs"
            >
              <Eye size={14} className="text-[#2563eb]" />
              <span>Career Passport</span>
              <ArrowRight size={12} />
            </Link>

            <button
              type="button"
              onClick={() => handleSaveAll()}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black text-white bg-[#2563eb] hover:bg-blue-700 border-2 border-blue-900 shadow-[3px_3px_0px_0px_#1e3a8a] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer disabled:opacity-60"
            >
              {isSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
              <span>{isSaving ? "Saving..." : "Save Settings"}</span>
            </button>
          </div>
        </div>

        {/* Cooldown Error Alert */}
        {cooldownError && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border-2 border-amber-500 text-amber-950 text-xs font-mono flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-700 flex-shrink-0" />
            <span className="font-bold">{cooldownError}</span>
          </div>
        )}

        {/* Live Sync Status */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Identity Status: Synced</span>
            {lastSavedTime && (
              <span className="text-emerald-700 font-black">• Last saved at {lastSavedTime}</span>
            )}
          </div>
          {saveSuccess && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-700 font-black flex items-center gap-1"
            >
              <CheckCircle2 size={14} /> Settings successfully updated!
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

      {/* ── 2. Account Identity & Name Cooldown Settings ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[4px_4px_0px_0px_#2563eb] p-6 bg-white space-y-5">
        <div>
          <h2 className="text-sm font-black uppercase font-mono text-slate-900 flex items-center gap-2">
            <User size={16} className="text-[#2563eb]" /> Candidate Identity &amp; Name Policy
          </h2>
          <p className="text-xs text-slate-700 mt-0.5 font-medium">
            Your verified candidate name appears on certified diplomas, live scoreboards, and official recruiter dossiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-slate-900">
                Official Full Name
              </label>
              {daysRemaining > 0 ? (
                <span className="text-[10px] text-amber-800 font-black flex items-center gap-1">
                  <Lock size={10} /> Cooldown: {daysRemaining} days remaining
                </span>
              ) : (
                <span className="text-[10px] text-emerald-700 font-black flex items-center gap-1">
                  <Unlock size={10} /> Name Change Available
                </span>
              )}
            </div>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              disabled={daysRemaining > 0}
              placeholder="e.g. Abrar Fahim"
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl border-2 text-xs font-bold transition-all focus:outline-none",
                daysRemaining > 0
                  ? "bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-inner"
              )}
            />
            <p className="text-[11px] text-slate-700 font-sans font-medium">
              {daysRemaining > 0
                ? "🔒 Next name change unlocks after 30 days to protect cryptographic credential integrity."
                : "ℹ️ You can change your name today. Once saved, a 30-day security lock applies."}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-slate-900">
              Primary Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Dhaka, Bangladesh"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-xs font-bold focus:border-blue-500 focus:outline-none shadow-inner"
            />
            <p className="text-[11px] text-slate-700 font-sans font-medium">Used to calculate regional salary benchmarks and local event invites.</p>
          </div>
        </div>

        {/* Preset Avatars Picker */}
        <div className="pt-2 border-t border-slate-200">
          <label className="text-xs font-black uppercase text-slate-900 block mb-2 font-mono">
            Or Select an Executive Avatar
          </label>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {PRESET_AVATARS.map((av, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPhotoUrl(av.url)}
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative",
                  photoUrl === av.url
                    ? "border-blue-600 ring-2 ring-blue-500/30 scale-105"
                    : "border-slate-300 hover:border-blue-500"
                )}
                title={av.label}
              >
                <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                {photoUrl === av.url && (
                  <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Career Preferences & Target Tracks ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[4px_4px_0px_0px_#2563eb] p-6 bg-white space-y-5">
        <div>
          <h2 className="text-sm font-black uppercase font-mono text-slate-900 flex items-center gap-2">
            <Briefcase size={16} className="text-[#2563eb]" /> Target Career Tracks &amp; Seniority Level
          </h2>
          <p className="text-xs text-slate-700 mt-0.5 font-medium">
            Configures AI job matching algorithms, weekly case challenge briefs, and recruiter headhunting visibility.
          </p>
        </div>

        {/* Seniority Dropdown */}
        <div className="space-y-1.5 font-mono max-w-md">
          <label className="text-xs font-black uppercase text-slate-900">
            Current Experience Bracket
          </label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-xs font-bold focus:border-blue-500 focus:outline-none"
          >
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Goal Chips */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-slate-900 font-mono">
            Target Focus Tracks (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {CAREER_TRACK_OPTIONS.map((track) => {
              const active = selectedGoals.includes(track);
              return (
                <button
                  key={track}
                  type="button"
                  onClick={() => toggleGoal(track)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 cursor-pointer flex items-center gap-1.5 font-mono",
                    active
                      ? "bg-[#2563eb] text-white border-blue-700 shadow-xs"
                      : "bg-slate-50 text-slate-900 border-slate-300 hover:border-blue-500"
                  )}
                >
                  {active && <Check size={12} />}
                  <span>{track}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recruiter Visibility Toggle */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-black uppercase text-slate-900 font-mono flex items-center gap-1.5">
              <Eye size={14} className="text-[#2563eb]" /> MNC Recruiter Talent Pool Visibility
            </span>
            <p className="text-xs text-slate-700 font-sans font-medium">
              Allow verified partner employers (Unilever, BAT, GP, Marico) to view your scored benchmark rank and contact you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPublic(!isPublic)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0",
              isPublic ? "bg-[#2563eb]" : "bg-slate-300"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform",
                isPublic ? "left-7" : "left-1"
              )}
            />
          </button>
        </div>
      </div>

      {/* ── 4. Subscription & Billing Tier ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[4px_4px_0px_0px_#2563eb] p-6 bg-white space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-sm font-black uppercase font-mono text-slate-900 flex items-center gap-2">
              <Crown size={16} className="text-amber-500" /> Subscription &amp; Membership
            </h2>
            <p className="text-xs text-slate-700 mt-0.5 font-sans font-medium">
              Manage your corporate platform access, AI mock interview quota, and flagship course curriculum.
            </p>
          </div>
          <Link
            href="/subscription"
            className="px-3.5 py-1.5 rounded-lg text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 font-mono transition-colors shadow-[2px_2px_0px_0px_#1e3a8a]"
          >
            Manage Billing →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-[10px] text-slate-700 uppercase font-bold block">Current Plan</span>
            <span className="text-base font-black text-[#1e3a8a] uppercase">
              {state.subscriptionTier?.replace("_", " ") || "Starter Tier"}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300">
            <span className="text-[10px] text-emerald-800 uppercase font-bold block">Status</span>
            <span className="text-base font-black text-emerald-800 uppercase flex items-center gap-1">
              <CheckCircle2 size={14} /> Active
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300">
            <span className="text-[10px] text-slate-700 uppercase font-bold block">Access Scope</span>
            <span className="text-xs font-bold text-slate-900">
              Full Mock Tests, Events &amp; Community
            </span>
          </div>
        </div>
      </div>

      {/* ── 5. Account Security & Authentication ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[4px_4px_0px_0px_#2563eb] p-6 bg-white space-y-4">
        <div>
          <h2 className="text-sm font-black uppercase font-mono text-slate-900 flex items-center gap-2">
            <Key size={16} className="text-[#2563eb]" /> Account Security &amp; Credentials
          </h2>
          <p className="text-xs text-slate-700 mt-0.5 font-sans font-medium">
            Authentication providers and session security for your INSYT Corporate account.
          </p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-[#2563eb]">
                <Mail size={16} />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">
                  {user?.email || state.email || "career@insyt.bd"}
                </span>
                <span className="text-[11px] text-emerald-700 font-black">
                  ✓ Verified Primary Email
                </span>
              </div>
            </div>
            <span className="text-[10px] font-black text-slate-700 uppercase">Primary</span>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-[#2563eb]">
                <Lock size={16} />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">
                  Account Password
                </span>
                <span className="text-[11px] text-slate-700 font-sans font-medium">
                  Configured via Appwrite Cloud Authentication
                </span>
              </div>
            </div>
            <Link
              href="/settings"
              className="px-3 py-1.5 rounded-lg text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              Update Password
            </Link>
          </div>
        </div>
      </div>

      {/* ── 6. Notification & Communication Preferences ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[4px_4px_0px_0px_#2563eb] p-6 bg-white space-y-4">
        <div>
          <h2 className="text-sm font-black uppercase font-mono text-slate-900 flex items-center gap-2">
            <Bell size={16} className="text-[#2563eb]" /> Communication &amp; Digest Preferences
          </h2>
          <p className="text-xs text-slate-700 mt-0.5 font-sans font-medium">
            Choose what alerts and daily notifications you receive.
          </p>
        </div>

        <div className="space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Daily Quests &amp; Streak Reminder</span>
              <span className="text-slate-700 text-[11px] font-medium">Receive in-app alerts to keep your consecutive check-in streak intact.</span>
            </div>
            <input
              type="checkbox"
              checked={notifQuests}
              onChange={(e) => setNotifQuests(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div>
              <span className="font-bold text-slate-900 block">Corporate Event &amp; Competition Invitations</span>
              <span className="text-slate-700 text-[11px] font-medium">Get notified when Deckathon, ACE, or new live workshops open for registration.</span>
            </div>
            <input
              type="checkbox"
              checked={notifEvents}
              onChange={(e) => setNotifEvents(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div>
              <span className="font-bold text-slate-900 block">Curated Job Recommendations</span>
              <span className="text-slate-700 text-[11px] font-medium">Receive tailored matches when your skill score aligns with partner MNC briefs.</span>
            </div>
            <input
              type="checkbox"
              checked={notifJobs}
              onChange={(e) => setNotifJobs(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ── 7. Data Portability & Account Management ── */}
      <div className="rounded-2xl border-2 border-blue-500 p-6 bg-white shadow-[4px_4px_0px_0px_#2563eb] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="font-black uppercase text-slate-900 block">Data Export &amp; Management</span>
          <span className="text-slate-700 font-sans text-xs font-medium">Download a full JSON archive of your career preferences, diagnostic metrics, and verification hashes.</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border-2 border-slate-300 bg-slate-50 hover:border-blue-600 transition-all cursor-pointer shadow-xs text-slate-900"
          >
            <Download size={13} />
            <span>Export Data</span>
          </button>
          <button
            type="button"
            onClick={() => logout()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border-2 border-rose-400 bg-rose-50 text-rose-800 hover:bg-rose-100 transition-all cursor-pointer shadow-xs"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
