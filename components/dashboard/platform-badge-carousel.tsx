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
  borderColor: string;
  textColor: string;
  isUnlocked: boolean;
  category: string;
}

export function PlatformBadgeCarousel({ state }: PlatformBadgeCarouselProps) {
  // Determine unlock state based on user state
  const completedCount = state.courseProgress.filter((c) => c.progress >= 100).length;
  const hasStreak = state.streak >= 3;
  const hasPassport = Boolean(state.passportProfile?.headline);

  // Complete list of platform badges
  const allBadges: BadgeItem[] = [
    {
      id: "excel-architect",
      name: "Excel Financial Architect",
      icon: FileSpreadsheet,
      bg: "bg-emerald-400",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: true, // Default unlocked for corporate modeler
      category: "Spreadsheet Engineering",
    },
    {
      id: "trust-plane",
      name: "Trust Plane Verified Credential",
      icon: ShieldCheck,
      bg: "bg-cyan-400",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: true, // Unlocked with Career Passport
      category: "Verifiable Identity",
    },
    {
      id: "executive-strategist",
      name: "Executive Case Strategist",
      icon: Crown,
      bg: "bg-amber-400",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: true,
      category: "Management Consulting",
    },
    {
      id: "ai-vanguard",
      name: "Enterprise AI Vanguard",
      icon: Cpu,
      bg: "bg-violet-400",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: completedCount >= 1 || state.subscriptionTier === "pro",
      category: "AI & Automation",
    },
    {
      id: "velocity-champion",
      name: "Operational Velocity Master",
      icon: Flame,
      bg: "bg-rose-500",
      borderColor: "border-slate-950",
      textColor: "text-white",
      isUnlocked: hasStreak,
      category: "Habit & Execution",
    },
    {
      id: "fpa-specialist",
      name: "Audited FP&A Specialist",
      icon: Trophy,
      bg: "bg-blue-400",
      borderColor: "border-slate-950",
      textColor: "text-slate-950",
      isUnlocked: completedCount >= 2,
      category: "Financial Analytics",
    },
  ];

  // Arrange badges so unlocked badges are clustered in the center
  const unlocked = allBadges.filter((b) => b.isUnlocked);
  const locked = allBadges.filter((b) => !b.isUnlocked);

  // Split locked across flanks (left and right) with unlocked in the middle
  const halfLocked = Math.ceil(locked.length / 2);
  const leftLocked = locked.slice(0, halfLocked);
  const rightLocked = locked.slice(halfLocked);

  const carouselBadges = [...leftLocked, ...unlocked, ...rightLocked];

  // Initial active index is the center badge (which is an unlocked badge)
  const initialCenterIndex = Math.floor(carouselBadges.length / 2);
  const [activeIndex, setActiveIndex] = useState(initialCenterIndex);
  const [hoveredBadge, setHoveredBadge] = useState<BadgeItem | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : carouselBadges.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < carouselBadges.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip on Hover (No static text underneath) */}
      <div className="h-6 flex items-center justify-center mb-1">
        <AnimatePresence>
          {hoveredBadge ? (
            <motion.div
              key={hoveredBadge.id}
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              className="px-3 py-1 rounded-lg bg-slate-950 text-white border border-slate-700 shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 text-xs font-mono font-black z-30 pointer-events-none whitespace-nowrap"
            >
              {hoveredBadge.isUnlocked ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-400 fill-emerald-950" />
                  <span className="text-amber-300">{hoveredBadge.name}</span>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 px-1.5 py-0.2 rounded uppercase">
                    UNLOCKED
                  </span>
                </>
              ) : (
                <>
                  <Lock size={13} className="text-slate-400" />
                  <span className="text-slate-300">{hoveredBadge.name}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.2 rounded uppercase">
                    LOCKED
                  </span>
                </>
              )}
            </motion.div>
          ) : (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
              Hover badge for credentials
            </span>
          )}
        </AnimatePresence>
      </div>

      {/* Carousel Track with Left/Right Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          aria-label="Previous badge"
          className="w-7 h-7 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border-2 border-white/30 hover:border-white flex items-center justify-center text-xs transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Badges Container */}
        <div className="flex items-center gap-2.5 sm:gap-3 py-1 px-1">
          {carouselBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const isCenter = idx === activeIndex;
            const isUnlocked = badge.isUnlocked;

            return (
              <motion.div
                key={badge.id}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setHoveredBadge(badge)}
                onMouseLeave={() => setHoveredBadge(null)}
                animate={{
                  scale: isCenter ? 1.15 : 0.88,
                  opacity: isUnlocked ? (isCenter ? 1 : 0.8) : 0.28,
                  filter: isUnlocked
                    ? "grayscale(0%)"
                    : "grayscale(100%)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`relative group cursor-pointer flex items-center justify-center`}
              >
                {/* Badge Shield / Brutalist Box */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-3 border-slate-950 flex items-center justify-center transition-all ${
                    badge.bg
                  } ${
                    isUnlocked
                      ? "shadow-[3px_3px_0px_0px_#000] group-hover:shadow-[5px_5px_0px_0px_#000] group-hover:-translate-y-1"
                      : "shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  <Icon
                    size={22}
                    className={`${badge.textColor} stroke-[2.5]`}
                  />

                  {/* Little lock badge if locked */}
                  {!isUnlocked && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center">
                      <Lock size={9} />
                    </div>
                  )}

                  {/* Sparkle if active and unlocked */}
                  {isCenter && isUnlocked && (
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-300 border-2 border-slate-950 text-slate-950 flex items-center justify-center shadow-xs"
                    >
                      <Sparkles size={11} className="fill-slate-950" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next badge"
          className="w-7 h-7 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border-2 border-white/30 hover:border-white flex items-center justify-center text-xs transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
