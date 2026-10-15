"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  X,
  Target,
  Flame,
  ArrowRight,
  ExternalLink,
  Crown,
  FileSpreadsheet,
  Cpu,
  Trophy,
  Zap,
  Workflow,
  LucideIcon,
  Star,
} from "lucide-react";
import { PLATFORM_BADGES, PlatformBadgeDefinition } from "@/lib/data/platform-badges";
import { UserState } from "@/lib/state/types";
import { cn } from "@/lib/utils";

interface AllBadgesShowcaseProps {
  state: UserState;
  compact?: boolean;
}

const BADGE_THEMES: Record<
  string,
  {
    bgGradient: string;
    cardBorder: string;
    cardShadow: string;
    medallionGradient: string;
    medallionBorder: string;
    medallionShadow: string;
    iconColor: string;
    tagBg: string;
    tagText: string;
    tagBorder: string;
    accentColor: string;
  }
> = {
  "excel-architect": {
    bgGradient: "from-emerald-50/80 via-teal-50/50 to-white",
    cardBorder: "border-emerald-300 hover:border-emerald-500",
    cardShadow: "shadow-[4px_4px_0px_0px_#059669]",
    medallionGradient: "from-emerald-400 via-teal-500 to-green-500",
    medallionBorder: "border-emerald-300",
    medallionShadow: "0 8px 24px -4px rgba(16, 185, 129, 0.4)",
    iconColor: "#ffffff",
    tagBg: "bg-emerald-100",
    tagText: "text-emerald-900",
    tagBorder: "border-emerald-300",
    accentColor: "#10b981",
  },
  "ai-workflow-vanguard": {
    bgGradient: "from-purple-50/80 via-violet-50/50 to-white",
    cardBorder: "border-purple-300 hover:border-purple-500",
    cardShadow: "shadow-[4px_4px_0px_0px_#7c3aed]",
    medallionGradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    medallionBorder: "border-purple-300",
    medallionShadow: "0 8px 24px -4px rgba(139, 92, 246, 0.4)",
    iconColor: "#ffffff",
    tagBg: "bg-purple-100",
    tagText: "text-purple-900",
    tagBorder: "border-purple-300",
    accentColor: "#8b5cf6",
  },
  "trust-plane-verified": {
    bgGradient: "from-cyan-50/80 via-sky-50/50 to-white",
    cardBorder: "border-cyan-300 hover:border-cyan-500",
    cardShadow: "shadow-[4px_4px_0px_0px_#0891b2]",
    medallionGradient: "from-cyan-400 via-sky-500 to-blue-500",
    medallionBorder: "border-cyan-300",
    medallionShadow: "0 8px 24px -4px rgba(6, 182, 212, 0.4)",
    iconColor: "#ffffff",
    tagBg: "bg-cyan-100",
    tagText: "text-cyan-900",
    tagBorder: "border-cyan-300",
    accentColor: "#06b6d4",
  },
  "executive-strategist": {
    bgGradient: "from-amber-50/80 via-yellow-50/50 to-white",
    cardBorder: "border-amber-300 hover:border-amber-500",
    cardShadow: "shadow-[4px_4px_0px_0px_#d97706]",
    medallionGradient: "from-amber-400 via-yellow-400 to-orange-400",
    medallionBorder: "border-amber-300",
    medallionShadow: "0 8px 24px -4px rgba(245, 158, 11, 0.4)",
    iconColor: "#451a03",
    tagBg: "bg-amber-100",
    tagText: "text-amber-950",
    tagBorder: "border-amber-300",
    accentColor: "#f59e0b",
  },
  "velocity-champion": {
    bgGradient: "from-rose-50/80 via-pink-50/50 to-white",
    cardBorder: "border-rose-300 hover:border-rose-500",
    cardShadow: "shadow-[4px_4px_0px_0px_#e11d48]",
    medallionGradient: "from-rose-400 via-pink-500 to-red-500",
    medallionBorder: "border-rose-300",
    medallionShadow: "0 8px 24px -4px rgba(244, 63, 94, 0.4)",
    iconColor: "#ffffff",
    tagBg: "bg-rose-100",
    tagText: "text-rose-900",
    tagBorder: "border-rose-300",
    accentColor: "#f43f5e",
  },
  "data-synthesis-expert": {
    bgGradient: "from-blue-50/80 via-indigo-50/50 to-white",
    cardBorder: "border-blue-300 hover:border-blue-500",
    cardShadow: "shadow-[4px_4px_0px_0px_#2563eb]",
    medallionGradient: "from-blue-500 via-indigo-500 to-sky-400",
    medallionBorder: "border-blue-300",
    medallionShadow: "0 8px 24px -4px rgba(59, 130, 246, 0.4)",
    iconColor: "#ffffff",
    tagBg: "bg-blue-100",
    tagText: "text-blue-900",
    tagBorder: "border-blue-300",
    accentColor: "#3b82f6",
  },
};

const ICON_MAP: Record<string, LucideIcon> = {
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  Trophy,
  Zap,
  Flame,
  Sparkles,
  Crown,
  Target,
  Award,
  CheckCircle2,
  Workflow,
};

export function AllBadgesShowcase({ state, compact = false }: AllBadgesShowcaseProps) {
  const [selectedBadge, setSelectedBadge] = useState<PlatformBadgeDefinition | null>(null);

  // Derive unlocked badges from user state
  const unlockedBadgeIds = useMemo(() => {
    const ids = new Set<string>();

    // 1. Direct recentBadges stored in user state
    (state.recentBadges || []).forEach((rb) => {
      PLATFORM_BADGES.forEach((b) => {
        if (
          b.name.toLowerCase().includes(rb.name.toLowerCase()) ||
          rb.name.toLowerCase().includes(b.name.toLowerCase())
        ) {
          ids.add(b.id);
        }
      });
    });

    // 2. Excel course completion or enrolled
    const hasExcel = (state.courseProgress || []).some(
      (c) =>
        (c.id?.includes("excel") || c.courseId?.includes("excel") || c.title?.toLowerCase().includes("excel")) &&
        c.progress >= 100
    );
    if (hasExcel || state.enrolledPathSlugs.includes("excel-modeling")) {
      ids.add("excel-architect");
    }

    // 3. Trust plane / Career Passport headline
    if (state.passportProfile?.headline || Object.values(state.passportProfile?.verifiedSkillDetails || {}).some(v => v.verified)) {
      ids.add("trust-plane-verified");
    }

    // 4. Streak
    if (state.streak >= 3) {
      ids.add("velocity-champion");
    }

    // 5. AI / Strategy / Pro
    if (state.subscriptionTier === "pro" || (state.courseProgress || []).some(c => c.progress >= 100)) {
      ids.add("ai-workflow-vanguard");
      ids.add("executive-strategist");
    }

    return ids;
  }, [state.recentBadges, state.courseProgress, state.enrolledPathSlugs, state.passportProfile, state.streak, state.subscriptionTier]);

  return (
    <div className="font-sans">
      {compact ? (
        /* ── Compact Executive Badge Ledger (Placed right under Verified Skills & Masteries) ── */
        <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-4 sm:p-5 space-y-3 font-sans bg-white select-none">
          <div className="flex items-center justify-between border-b-2 border-blue-100 pb-2.5 font-mono">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 text-slate-950">
              <div className="w-6 h-6 rounded-lg bg-amber-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 flex-shrink-0 shadow-[1.5px_1.5px_0px_0px_#000]">
                <Award size={13} className="text-slate-950 stroke-[2.5]" />
              </div>
              <span>Executive Badge Ledger</span>
            </h2>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
              {unlockedBadgeIds.size}/{PLATFORM_BADGES.length} Unlocked
            </span>
          </div>

          <p className="text-[11px] font-sans text-slate-700 font-medium leading-tight">
            Cryptographically anchored credentials. Tap any badge to inspect verification rubric.
          </p>

          {/* Badge Medallions: Icons Only, No Text - Press opens inspection modal */}
          <div className="grid grid-cols-6 gap-2 sm:gap-2.5 pt-1">
            {PLATFORM_BADGES.map((badge) => {
              const isUnlocked = unlockedBadgeIds.has(badge.id);
              const theme = BADGE_THEMES[badge.id] || BADGE_THEMES["excel-architect"];
              const IconComp = ICON_MAP[badge.iconName] || Trophy;

              return (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => setSelectedBadge(badge)}
                  className={cn(
                    "aspect-square w-full rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-center relative overflow-hidden group select-none active:scale-95 hover:scale-105",
                    isUnlocked
                      ? cn("bg-gradient-to-tr", theme.medallionGradient, theme.medallionBorder, "shadow-[3px_3px_0px_0px_#1e3a8a]")
                      : "bg-slate-100 border-slate-300 shadow-[2px_2px_0px_0px_#cbd5e1] hover:border-blue-400 opacity-80 hover:opacity-100"
                  )}
                  title={`${badge.name} (${badge.tier} Tier) - ${isUnlocked ? "Earned & Verified" : "In Progress"}. Tap to inspect specifications.`}
                  aria-label={`${badge.name} badge`}
                >
                  <IconComp
                    size={20}
                    className="stroke-[2.2] transition-transform group-hover:scale-110"
                    style={{ color: isUnlocked ? theme.iconColor : "#475569" }}
                  />

                  {/* Corner Status Indicator Icon Dot */}
                  <span
                    className={cn(
                      "absolute top-1 right-1 w-2.5 h-2.5 rounded-full border border-white flex items-center justify-center shadow-xs",
                      isUnlocked ? "bg-emerald-500" : "bg-slate-400"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Full Expanded Badges Showcase ── */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-corp-border pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-amber-950 flex items-center justify-center border-2 border-amber-600 shadow-[2px_2px_0px_0px_#78350f]">
                <Award size={18} className="stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-sm font-black font-mono uppercase tracking-wider text-corp-text leading-tight flex items-center gap-2">
                  <span>Executive Badge Ledger</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs flex items-center gap-1">
                    <Sparkles size={11} className="text-emerald-600 animate-spin" />
                    {unlockedBadgeIds.size} of {PLATFORM_BADGES.length} Unlocked
                  </span>
                </h2>
                <p className="text-xs text-corp-text-secondary mt-0.5">
                  Interactive career credentials verified through corporate simulations &amp; audits. Tap any badge for full specifications!
                </p>
              </div>
            </div>
          </div>

      {/* ── Badges Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {PLATFORM_BADGES.map((badge) => {
          const isUnlocked = unlockedBadgeIds.has(badge.id);
          const theme = BADGE_THEMES[badge.id] || BADGE_THEMES["excel-architect"];
          const IconComp = ICON_MAP[badge.iconName] || Trophy;

          return (
            <motion.div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn(
                "group relative rounded-2xl border-2 p-5 flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-all bg-gradient-to-br",
                theme.bgGradient,
                isUnlocked ? theme.cardBorder : "border-slate-300 hover:border-slate-400",
                isUnlocked ? theme.cardShadow : "shadow-[4px_4px_0px_0px_#cbd5e1]"
              )}
            >
              {/* Fun Top Glass Highlight Sheen */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/70 to-transparent pointer-events-none rounded-t-2xl" />

              <div>
                {/* Header: Tier Pill + Status Chip */}
                <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider border shadow-xs flex items-center gap-1",
                      theme.tagBg,
                      theme.tagText,
                      theme.tagBorder
                    )}
                  >
                    <Star size={10} className="fill-current" />
                    {badge.tier} Tier
                  </span>

                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wide border flex items-center gap-1",
                      isUnlocked
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-xs"
                        : "bg-slate-100 text-slate-600 border-slate-300"
                    )}
                  >
                    {isUnlocked ? (
                      <>
                        <CheckCircle2 size={11} className="stroke-[2.5]" /> Earned
                      </>
                    ) : (
                      <>
                        <Lock size={10} className="stroke-[2.5]" /> In Progress
                      </>
                    )}
                  </span>
                </div>

                {/* Badge Centerpiece: 3D Glossy Medallion */}
                <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border-2",
                      isUnlocked
                        ? cn("bg-gradient-to-tr", theme.medallionGradient, theme.medallionBorder)
                        : "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300 text-slate-400 shadow-inner"
                    )}
                    style={{
                      boxShadow: isUnlocked ? theme.medallionShadow : undefined,
                    }}
                  >
                    {/* Gloss shine reflection on medallion */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/35 rounded-t-xl pointer-events-none" />

                    <IconComp
                      size={28}
                      className="relative z-10 stroke-[2.2] drop-shadow-sm"
                      style={{ color: isUnlocked ? theme.iconColor : "#94a3b8" }}
                    />

                    {/* Small pulsing sparkle pin when unlocked */}
                    {isUnlocked && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border border-emerald-400 shadow-xs flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-black text-slate-900 leading-snug tracking-tight font-sans">
                      {badge.name}
                    </h3>
                    <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-tight mt-0.5">
                      {badge.category}
                    </p>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-2 mb-3 relative z-10">
                  {badge.description}
                </p>
              </div>

              {/* Card Footer: Rarity + Fun Action Prompt */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono relative z-10">
                <span className="font-extrabold flex items-center gap-1 text-slate-700">
                  <Sparkles size={12} style={{ color: theme.accentColor }} />
                  {badge.rarity}
                </span>

                <span
                  className="font-black inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  style={{ color: isUnlocked ? theme.accentColor : "#64748b" }}
                >
                  <span>View Details</span>
                  <ArrowRight size={12} className="stroke-[2.5]" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  )}

      {/* ── Badge Detail Popup Modal ── */}
      <AnimatePresence>
        {selectedBadge && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-sans overscroll-contain"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden text-slate-900"
            >
              {/* Modal Colorful Header */}
              {(() => {
                const isUnlocked = unlockedBadgeIds.has(selectedBadge.id);
                const theme = BADGE_THEMES[selectedBadge.id] || BADGE_THEMES["excel-architect"];
                const IconComp = ICON_MAP[selectedBadge.iconName] || Trophy;

                return (
                  <>
                    <div
                      className={cn(
                        "p-6 relative overflow-hidden border-b-2 border-slate-900 flex items-center justify-between bg-gradient-to-r",
                        isUnlocked
                          ? theme.medallionGradient
                          : "from-slate-200 via-slate-100 to-slate-200 text-slate-800"
                      )}
                    >
                      {/* Glass Sheen */}
                      <div className="absolute inset-0 bg-white/15 pointer-events-none" />

                      <div className="flex items-center gap-4 relative z-10">
                        {/* Big Glowing Medallion */}
                        <div
                          className="w-16 h-16 rounded-2xl bg-white/95 border-2 border-white shadow-xl flex items-center justify-center flex-shrink-0"
                          style={{ color: theme.accentColor }}
                        >
                          <IconComp size={34} className="stroke-[2.3]" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase font-mono bg-white/90 text-slate-900 border border-white shadow-xs">
                              {selectedBadge.tier} Tier
                            </span>
                            <span className="text-[10px] font-mono font-bold text-white/90 drop-shadow-xs">
                              {selectedBadge.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-black uppercase font-mono tracking-tight text-white drop-shadow-sm mt-1">
                            {selectedBadge.name}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedBadge(null)}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center border border-white/40 transition-colors cursor-pointer relative z-10"
                        aria-label="Close modal"
                      >
                        <X size={18} className="stroke-[2.5]" />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-4 font-sans text-xs">
                      {/* Status Callout Pill */}
                      <div
                        className={cn(
                          "p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 font-mono",
                          isUnlocked
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                            : "bg-amber-50 border-amber-300 text-amber-950"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {isUnlocked ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                              <CheckCircle2 size={15} className="stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                              <Lock size={14} className="stroke-[2.5]" />
                            </div>
                          )}
                          <span className="font-black uppercase text-xs">
                            {isUnlocked ? "Badge Earned & Verified on Ledger" : "Badge In Progress"}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-white border border-current">
                          {selectedBadge.rarity}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <h4 className="text-[10px] font-mono font-black uppercase text-slate-400">
                          Achievement Specification
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {selectedBadge.description}
                        </p>
                      </div>

                      {/* Earning Criteria */}
                      <div className="space-y-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="text-[10px] font-mono font-black uppercase text-slate-500">
                          Earning Criteria
                        </h4>
                        <p className="text-xs text-slate-900 font-bold leading-snug">
                          {selectedBadge.earnedCriteria}
                        </p>
                      </div>

                      {/* Cryptographic Trust Seal */}
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-[#2563eb] font-mono font-bold">
                        <ShieldCheck size={18} className="text-[#2563eb] flex-shrink-0" />
                        <span>W3C VC 2.0 Tamper-Proof Cryptographic Verification</span>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-4 border-t-2 border-slate-100 bg-slate-50 flex items-center justify-between font-mono">
                      <span className="text-[10px] text-slate-500 font-medium">
                        INSYT Executive Verification Protocol
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedBadge(null)}
                        className="px-5 py-2 rounded-xl text-xs font-black uppercase text-white bg-[#2563eb] hover:bg-blue-600 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer"
                      >
                        Close Inspection
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
