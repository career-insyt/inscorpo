import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  X,
  LucideIcon,
} from "lucide-react";
import { PlatformBadgeDefinition, BadgeTier } from "@/lib/data/platform-badges";

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

const TIER_STYLES: Record<
  BadgeTier,
  {
    badgeBg: string;
    border: string;
    glow: string;
    textColor: string;
    tagBg: string;
    tagText: string;
    haloGradient: string;
  }
> = {
  diamond: {
    badgeBg: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%)",
    border: "#10b981",
    glow: "0 0 24px rgba(16, 185, 129, 0.45), 0 0 10px rgba(52, 211, 153, 0.3)",
    textColor: "#a7f3d0",
    tagBg: "rgba(16, 185, 129, 0.2)",
    tagText: "#34d399",
    haloGradient: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
  },
  obsidian: {
    badgeBg: "linear-gradient(135deg, #1e1035 0%, #2e1065 50%, #4c1d95 100%)",
    border: "#a855f7",
    glow: "0 0 24px rgba(168, 85, 247, 0.45), 0 0 10px rgba(192, 132, 252, 0.3)",
    textColor: "#e9d5ff",
    tagBg: "rgba(168, 85, 247, 0.2)",
    tagText: "#c084fc",
    haloGradient: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
  },
  platinum: {
    badgeBg: "linear-gradient(135deg, #0b1e3b 0%, #172554 50%, #1e40af 100%)",
    border: "#3b82f6",
    glow: "0 0 24px rgba(59, 130, 246, 0.45), 0 0 10px rgba(96, 165, 250, 0.3)",
    textColor: "#bfdbfe",
    tagBg: "rgba(59, 130, 246, 0.2)",
    tagText: "#60a5fa",
    haloGradient: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
  },
  gold: {
    badgeBg: "linear-gradient(135deg, #2e1e05 0%, #451a03 50%, #78350f 100%)",
    border: "#f59e0b",
    glow: "0 0 24px rgba(245, 158, 11, 0.45), 0 0 10px rgba(251, 191, 36, 0.3)",
    textColor: "#fef3c7",
    tagBg: "rgba(245, 158, 11, 0.2)",
    tagText: "#fbbf24",
    haloGradient: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)",
  },
  emerald: {
    badgeBg: "linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%)",
    border: "#06b6d4",
    glow: "0 0 24px rgba(6, 182, 212, 0.45), 0 0 10px rgba(34, 211, 238, 0.3)",
    textColor: "#cffafe",
    tagBg: "rgba(6, 182, 212, 0.2)",
    tagText: "#22d3ee",
    haloGradient: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
  },
  ruby: {
    badgeBg: "linear-gradient(135deg, #370614 0%, #4c0519 50%, #881337 100%)",
    border: "#f43f5e",
    glow: "0 0 24px rgba(244, 63, 94, 0.45), 0 0 10px rgba(251, 113, 133, 0.3)",
    textColor: "#ffe4e6",
    tagBg: "rgba(244, 63, 94, 0.2)",
    tagText: "#fb7185",
    haloGradient: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)",
  },
};

interface PlatformBadgeProps {
  badge: PlatformBadgeDefinition;
  size?: "sm" | "md" | "lg";
  unlocked?: boolean;
  earnedDate?: string;
  onClick?: () => void;
}

export function PlatformBadge({
  badge,
  size = "md",
  unlocked = true,
  earnedDate,
  onClick,
}: PlatformBadgeProps) {
  const [showModal, setShowModal] = useState(false);

  const normalizedKey = Object.keys(ICON_MAP).find(
    (k) => k.toLowerCase() === (badge.iconName || "").toLowerCase()
  );
  const IconComponent = (normalizedKey ? ICON_MAP[normalizedKey] : null) || ICON_MAP[badge.iconName] || Trophy;
  const style = TIER_STYLES[badge.tier] || TIER_STYLES.diamond;

  const sizeClasses = {
    sm: "p-3 gap-2.5",
    md: "p-4 gap-3.5",
    lg: "p-5 gap-4",
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    if (onClick) onClick();
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={handleBadgeClick}
        className={`relative rounded-xl border-2 flex items-start ${sizeClasses[size]} overflow-hidden cursor-pointer select-none`}
        style={{
          background: unlocked ? style.badgeBg : "var(--corp-surface)",
          borderColor: unlocked ? style.border : "var(--corp-border)",
          boxShadow: unlocked ? style.glow : "none",
          opacity: unlocked ? 1 : 0.65,
        }}
      >
        {/* Background radial halo illumination */}
        {unlocked && (
          <div
            className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none rounded-full blur-xl"
            style={{ background: style.haloGradient }}
          />
        )}

        {/* Animated glowing icon container */}
        <div className="relative flex-shrink-0">
          <motion.div
            animate={
              unlocked
                ? {
                    scale: [1, 1.08, 1],
                    filter: [
                      "drop-shadow(0 0 6px currentColor)",
                      "drop-shadow(0 0 14px currentColor)",
                      "drop-shadow(0 0 6px currentColor)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-11 h-11 rounded-lg flex items-center justify-center border"
            style={{
              background: unlocked ? "rgba(0,0,0,0.4)" : "rgba(100,100,100,0.1)",
              borderColor: unlocked ? style.border : "var(--corp-border)",
              color: unlocked ? style.textColor : "var(--corp-text-tertiary)",
            }}
          >
            <IconComponent size={iconSizes[size]} className="stroke-[2.2]" />
          </motion.div>

          {/* Small corner illumination pin */}
          {unlocked && (
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: style.border }}
            />
          )}
        </div>

        {/* Content info */}
        <div className="flex-1 min-w-0 space-y-1 font-sans">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span
              className="text-xs font-mono font-black uppercase tracking-tight truncate"
              style={{ color: unlocked ? style.textColor : "var(--corp-text)" }}
            >
              {badge.name}
            </span>
            <span
              className="text-[9px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded-full border"
              style={{
                backgroundColor: unlocked ? style.tagBg : "var(--corp-border)",
                color: unlocked ? style.tagText : "var(--corp-text-secondary)",
                borderColor: unlocked ? style.border : "var(--corp-border)",
              }}
            >
              {badge.tier}
            </span>
          </div>

          <p className="text-[11px] line-clamp-2 leading-relaxed text-slate-300 font-normal">
            {badge.description}
          </p>

          <div className="pt-1 flex items-center justify-between text-[10px] font-mono font-medium text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles size={11} style={{ color: style.border }} />
              {badge.rarity}
            </span>
            {earnedDate && (
              <span className="text-slate-400 font-semibold">{earnedDate}</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Regular interactive Badge Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl p-6 sm:p-7 border-2 shadow-2xl overflow-hidden font-sans space-y-5"
              style={{
                background: "var(--corp-surface)",
                borderColor: style.border,
                boxShadow: style.glow,
              }}
            >
              {/* Header Close */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: style.tagBg,
                    color: style.tagText,
                    borderColor: style.border,
                  }}
                >
                  {badge.tier} Tier • {badge.category}
                </span>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-full hover:bg-corp-bg-secondary text-corp-text-secondary cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Glowing Icon Stage */}
              <div className="relative flex flex-col items-center text-center pt-2 pb-1">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 mb-3 shadow-lg relative"
                  style={{
                    background: style.badgeBg,
                    borderColor: style.border,
                    color: style.textColor,
                    boxShadow: style.glow,
                  }}
                >
                  <IconComponent size={38} className="stroke-[2.2]" />
                  <span
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full animate-ping"
                    style={{ backgroundColor: style.border }}
                  />
                </div>

                <h3 className="text-lg font-black tracking-tight text-corp-text">
                  {badge.name}
                </h3>
                <p className="text-xs font-mono font-bold text-corp-accent mt-0.5 flex items-center gap-1 justify-center">
                  <Sparkles size={12} style={{ color: style.border }} />
                  {badge.rarity} • {badge.statsLabel}
                </p>
              </div>

              {/* Details & Criteria */}
              <div className="space-y-3 p-4 rounded-2xl bg-corp-bg-secondary border border-corp-border text-xs leading-relaxed">
                <div>
                  <span className="block text-[10px] font-mono font-bold uppercase text-corp-text-tertiary">
                    Achievement Specification
                  </span>
                  <p className="text-corp-text mt-0.5">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-corp-border/60">
                  <span className="block text-[10px] font-mono font-bold uppercase text-corp-text-tertiary">
                    Earned Verification Requirement
                  </span>
                  <p className="text-corp-text-secondary mt-0.5 font-medium">
                    {badge.earnedCriteria}
                  </p>
                </div>
              </div>

              {/* Tamper-Proof Trust Stamp */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono font-bold">
                <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
                <span>W3C VC 2.0 Tamper-Proof Verified by CAREERINSYT</span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-md"
              >
                Close Badge Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
