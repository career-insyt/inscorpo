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
} from "lucide-react";
import { PLATFORM_BADGES, PlatformBadgeDefinition } from "@/lib/data/platform-badges";
import { UserState } from "@/lib/state/types";
import { PlatformBadge } from "@/components/ui/platform-badge";
import { cn } from "@/lib/utils";

interface AllBadgesShowcaseProps {
  state: UserState;
}

export function AllBadgesShowcase({ state }: AllBadgesShowcaseProps) {
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

    // 2. Excel course completion
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

    // 5. AI / Strategy
    if (state.subscriptionTier === "pro" || (state.courseProgress || []).some(c => c.progress >= 100)) {
      ids.add("ai-workflow-vanguard");
      ids.add("executive-case-strategist");
    }

    return ids;
  }, [state.recentBadges, state.courseProgress, state.enrolledPathSlugs, state.passportProfile, state.streak, state.subscriptionTier]);

  return (
    <div className="space-y-4 font-sans">
      {/* ── Section Title Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-corp-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
            <Award size={16} />
          </div>
          <div>
            <h2 className="text-sm font-black font-mono uppercase tracking-wider text-corp-text leading-tight flex items-center gap-1.5">
              <span>Executive Badge Ledger</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-100 text-[#2563eb] border border-blue-300">
                {unlockedBadgeIds.size} / {PLATFORM_BADGES.length} UNLOCKED
              </span>
            </h2>
            <p className="text-xs text-corp-text-secondary">
              Verifiable skill credentials earned through corporate audits, daily velocity, and capstone defenses. Click any badge to inspect criteria.
            </p>
          </div>
        </div>
      </div>

      {/* ── Badges Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {PLATFORM_BADGES.map((badge) => {
          const isUnlocked = unlockedBadgeIds.has(badge.id);

          return (
            <motion.div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.18 }}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden",
                isUnlocked
                  ? "bg-white text-slate-900 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a]"
                  : "bg-slate-50/80 text-slate-700 border-slate-300 hover:border-slate-500 opacity-75 hover:opacity-100"
              )}
            >
              <div className="space-y-3">
                {/* Header: Tier + Status */}
                <div className="flex items-center justify-between gap-1 font-mono text-[9px]">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded font-black uppercase border",
                      badge.tier === "diamond" && "bg-cyan-100 text-cyan-950 border-cyan-300",
                      badge.tier === "obsidian" && "bg-purple-100 text-purple-950 border-purple-300",
                      badge.tier === "emerald" && "bg-emerald-100 text-emerald-950 border-emerald-300",
                      badge.tier === "ruby" && "bg-rose-100 text-rose-950 border-rose-300",
                      badge.tier === "gold" && "bg-amber-100 text-amber-950 border-amber-300",
                      badge.tier === "platinum" && "bg-slate-100 text-slate-950 border-slate-300"
                    )}
                  >
                    {badge.tier}
                  </span>

                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded font-black uppercase flex items-center gap-1",
                      isUnlocked
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {isUnlocked ? "✓ Earned" : "🔒 Locked"}
                  </span>
                </div>

                {/* Badge Icon & Name */}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border-2",
                      isUnlocked
                        ? "bg-blue-50 border-blue-600 text-[#2563eb] shadow-xs"
                        : "bg-slate-200 border-slate-300 text-slate-400"
                    )}
                    style={{
                      boxShadow: isUnlocked ? `0 0 14px ${badge.glowColor}` : undefined,
                    }}
                  >
                    <PlatformBadge badge={badge} size="sm" unlocked={isUnlocked} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-black uppercase font-mono tracking-tight leading-snug line-clamp-2">
                      {badge.name}
                    </h3>
                    <p className="text-[10px] text-corp-text-tertiary font-mono">
                      {badge.category}
                    </p>
                  </div>
                </div>

                {/* Brief Explanation */}
                <p className="text-[11px] text-slate-600 font-sans leading-relaxed line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {/* Card Footer: Rarity & Click Prompt */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#2563eb] font-bold">
                  {badge.rarity}
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 inline-flex items-center gap-0.5 font-bold">
                  Inspect →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Badge Detail Popup Modal ── */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden text-slate-900"
            >
              {/* Modal Header */}
              <div
                className="p-5 text-white flex items-center justify-between border-b-2 border-slate-900 relative"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#2563eb] border-2 border-white flex items-center justify-center shadow-md">
                    <PlatformBadge badge={selectedBadge} size="md" unlocked={unlockedBadgeIds.has(selectedBadge.id)} />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase font-mono bg-amber-400 text-amber-950 border border-amber-500 shadow-xs">
                      {selectedBadge.tier} Tier
                    </span>
                    <h3 className="text-base font-black uppercase font-mono tracking-tight text-white mt-1">
                      {selectedBadge.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/30 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 font-mono text-xs">
                {/* Status Callout */}
                <div
                  className={cn(
                    "p-3 rounded-xl border-2 flex items-center justify-between gap-2",
                    unlockedBadgeIds.has(selectedBadge.id)
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                      : "bg-amber-50 border-amber-400 text-amber-950"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {unlockedBadgeIds.has(selectedBadge.id) ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <Lock size={16} className="text-amber-700" />
                    )}
                    <span className="font-black uppercase">
                      {unlockedBadgeIds.has(selectedBadge.id)
                        ? "Badge Earned & Verified on Ledger"
                        : "Badge Currently Locked"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold">
                    {selectedBadge.rarity}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase text-slate-500">
                    Badge Significance
                  </h4>
                  <p className="text-xs font-sans text-slate-700 leading-relaxed font-medium">
                    {selectedBadge.description}
                  </p>
                </div>

                {/* Criteria */}
                <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-[10px] font-black uppercase text-slate-500">
                    Earning Criteria
                  </h4>
                  <p className="text-xs font-sans text-slate-900 font-bold">
                    {selectedBadge.earnedCriteria}
                  </p>
                </div>

                {/* Verification & Category */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Category</span>
                    <span className="font-bold text-slate-800">{selectedBadge.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Trust Plane Status</span>
                    <span className="font-bold text-[#2563eb]">Ed25519 Cryptographic Proof</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t-2 border-slate-200 bg-slate-50 flex items-center justify-end font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedBadge(null)}
                  className="px-5 py-2 rounded-xl text-xs font-black uppercase text-white bg-[#2563eb] hover:bg-blue-600 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
