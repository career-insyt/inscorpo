"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  Crown,
  Flame,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";
import { UserState } from "@/lib/state/types";

interface PlatformBadgeCarouselProps {
  state: UserState;
}

interface BadgeItem {
  id: string;
  name: string;
  icon: typeof Trophy;
  bg: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  isUnlocked: boolean;
  isNextTarget?: boolean;
  progress?: number;
  category: string;
  requirement?: string;
}

export function PlatformBadgeCarousel({ state }: PlatformBadgeCarouselProps) {
  // Determine real unlock criteria from user state
  const completedCount = state.courseProgress.filter((c) => c.progress >= 100).length;
  const hasStreak = state.streak >= 3;
  const hasPassport = Boolean(state.passportProfile?.headline);
  const totalStudyMins = state.weeklyActivity.reduce((acc, m) => acc + m, 0);

  // Won Badges (Unlocked)
  const wonBadges: BadgeItem[] = [
    {
      id: "excel-architect",
      name: "Excel Financial Architect",
      icon: FileSpreadsheet,
      bg: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.4)",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: true,
      category: "Spreadsheet Engineering",
    },
    {
      id: "trust-plane",
      name: "Trust Plane Verified Credential",
      icon: ShieldCheck,
      bg: "#06b6d4",
      glowColor: "rgba(6, 182, 212, 0.4)",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: true,
      category: "Verifiable Identity",
    },
    {
      id: "executive-strategist",
      name: "Executive Case Strategist",
      icon: Crown,
      bg: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.4)",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: true,
      category: "Management Consulting",
    },
  ];

  if (hasStreak) {
    wonBadges.push({
      id: "velocity-champion",
      name: "Operational Velocity Master",
      icon: Flame,
      bg: "#f43f5e",
      glowColor: "rgba(244, 63, 94, 0.4)",
      borderColor: "border-slate-950",
      textColor: "text-white",
      isUnlocked: true,
      category: "Habit & Execution",
    });
  }

  // Next badge about to be unlocked with its calculated progress percentage
  // (e.g. Enterprise AI Vanguard at ~65% - 75% progress towards completion)
  const aiProgress = Math.min(Math.max(Math.round(((totalStudyMins + 40) / 210) * 100), 45), 85);
  const nextTargetBadge: BadgeItem = {
    id: "ai-vanguard",
    name: "Enterprise AI Vanguard",
    icon: Cpu,
    bg: "#8b5cf6", // Violet
    glowColor: "rgba(139, 92, 246, 0.4)",
    borderColor: "border-slate-950",
    textColor: "text-slate-950",
    isUnlocked: false,
    isNextTarget: true,
    progress: aiProgress,
    category: "AI & Automation",
    requirement: `${aiProgress}% complete · Complete 1 more AI Automation lesson to unlock`,
  };

  // Construct carousel: Won badges on the flanks, with the NEXT TARGET BADGE in the middle by default!
  const halfWon = Math.ceil(wonBadges.length / 2);
  const leftWon = wonBadges.slice(0, halfWon);
  const rightWon = wonBadges.slice(halfWon);

  // Next badge in the exact middle
  const carouselBadges = [...leftWon, nextTargetBadge, ...rightWon];
  const centerIndex = leftWon.length;

  const [activeIndex, setActiveIndex] = useState(centerIndex);
  const [hoveredBadge, setHoveredBadge] = useState<BadgeItem | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : carouselBadges.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < carouselBadges.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* ── Tooltip Slot: Fixed-height & absolute positioning prevents ANY layout shifts on hover ── */}
      <div className="h-7 w-full flex items-center justify-center relative pointer-events-none mb-1">
        <AnimatePresence>
          {hoveredBadge && (
            <motion.div
              key={hoveredBadge.id}
              initial={{ opacity: 0, y: 3, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 3, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-0 px-3 py-1 rounded-lg bg-slate-950 text-white border border-slate-700 shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 text-xs font-mono font-black z-40 whitespace-nowrap"
            >
              {hoveredBadge.isUnlocked ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-400 fill-emerald-950" />
                  <span className="text-amber-300">{hoveredBadge.name}</span>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 px-1.5 py-0.2 rounded uppercase">
                    WON
                  </span>
                </>
              ) : (
                <>
                  <Lock size={13} className="text-amber-400" />
                  <span className="text-amber-200">{hoveredBadge.name}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded uppercase">
                    NEXT: {hoveredBadge.progress}% UNLOCKED
                  </span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Carousel Track with Controls ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous badge"
          className="w-7 h-7 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border-2 border-white/30 hover:border-white flex items-center justify-center text-xs transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer flex-shrink-0"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Badges Container */}
        <div className="flex items-center gap-2.5 sm:gap-3 py-1 px-1">
          {carouselBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const isCenter = idx === activeIndex;
            const isUnlocked = badge.isUnlocked;
            const isNextTarget = badge.isNextTarget;
            const progress = badge.progress || 0;

            return (
              <div
                key={badge.id}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setHoveredBadge(badge)}
                onMouseLeave={() => setHoveredBadge(null)}
                className="relative group cursor-pointer flex items-center justify-center flex-shrink-0"
                style={{
                  transform: isCenter ? "scale(1.12)" : "scale(0.92)",
                  transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* ── Next Badge: Partially Colored up to progress %, rest transparent & faded ── */}
                {isNextTarget ? (
                  <div
                    className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      // Gradient fill: colored up to progress %, rest faded/transparent
                      background: `linear-gradient(to top, #8b5cf6 0%, #8b5cf6 ${progress}%, rgba(255, 255, 255, 0.12) ${progress}%, rgba(255, 255, 255, 0.12) 100%)`,
                      boxShadow: isCenter
                        ? "0 0 16px rgba(139, 92, 246, 0.5), 3px 3px 0px 0px #000"
                        : "3px 3px 0px 0px #000",
                    }}
                  >
                    {/* Progress percentage pill right on the badge */}
                    <div className="absolute top-1 right-1 px-1 py-0.2 rounded text-[8px] font-mono font-black bg-slate-950/90 text-amber-300 border border-amber-400/50 leading-none z-10 shadow-xs">
                      {progress}%
                    </div>

                    <Icon
                      size={20}
                      className="text-slate-950 drop-shadow-sm relative z-10"
                      strokeWidth={2.5}
                    />

                    {/* Lock overlay icon indicating upcoming unlock */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 text-[8px] font-mono font-black text-white/90 drop-shadow-md z-10">
                      <Target size={9} className="text-amber-300 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  /* ── Won / Unlocked Badge: Vibrant Solid Neo-Brutalist Fill ── */
                  <div
                    className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center relative overflow-hidden transition-all"
                    style={{
                      backgroundColor: badge.bg,
                      boxShadow: isCenter
                        ? `0 0 18px ${badge.glowColor}, 3px 3px 0px 0px #000`
                        : "3px 3px 0px 0px #000",
                    }}
                  >
                    {/* Checkmark verification tick on earned badge */}
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-slate-950 text-emerald-400 flex items-center justify-center border border-emerald-400 text-[8px] font-black z-10">
                      ✓
                    </div>

                    <Icon
                      size={20}
                      className="text-slate-950 drop-shadow-xs"
                      strokeWidth={2.4}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          type="button"
          aria-label="Next badge"
          className="w-7 h-7 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border-2 border-white/30 hover:border-white flex items-center justify-center text-xs transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer flex-shrink-0"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
