"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play, ShieldCheck, Share2, MapPin, Building2, GraduationCap,
  Award, Sparkles, CheckCircle2, ArrowRight, Flame, Target, Zap, Trophy
} from "lucide-react";
import Link from "next/link";
import { UserState } from "@/lib/state/types";

interface LinkedInProfileHeaderProps {
  state: UserState;
  currentRank?: { name: string; color?: string; gradient?: string; shadowColor?: string };
  xpProgress?: number;
  nextLevelXp?: number;
}

export function LinkedInProfileHeader({
  state,
}: LinkedInProfileHeaderProps) {
  const firstName = state.name ? state.name.split(" ")[0] : "Learner";
  const initials = state.name ? state.name.substring(0, 2).toUpperCase() : "IN";
  const pp = state.passportProfile;

  const targetCareerGoal = pp?.headline || "Corporate Business Analyst / FMCG MTO";
  const university = pp?.university || "Bangladesh Agricultural University (BAU)";
  const location = pp?.location || "Dhaka, Bangladesh";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border-2 border-blue-400 p-5 sm:p-6 text-white font-sans relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
        boxShadow: "5px 5px 0px 0px #1e3a8a",
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left Side: Avatar + Merged Details */}
          <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-[#2563eb] flex items-center justify-center text-xl sm:text-2xl font-black flex-shrink-0 border-2 border-white shadow-md overflow-hidden">
              {pp?.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pp.photoUrl} alt={state.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-mono">{initials}</span>
              )}
            </div>

            {/* Main Text Content */}
            <div className="space-y-1.5 min-w-0 flex-1 font-mono">
              {/* Badges row: Greeting + Status pills */}
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-bangla text-white tracking-tight">
                  স্বাগতম, {firstName}
                </h1>

                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-extrabold bg-amber-400 text-amber-950 border border-amber-500 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-950 animate-pulse" />
                  Open to Opportunities
                </span>

                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-extrabold bg-blue-900/90 text-white border border-blue-300/40 flex items-center gap-1 shadow-sm">
                  <Target size={11} className="text-amber-400" />
                  Active Career Target
                </span>

                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-extrabold bg-emerald-400 text-emerald-950 border border-emerald-500 flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={11} />
                  W3C Standard Calibration
                </span>
              </div>

              {/* Target Role / Headline */}
              <div className="text-sm sm:text-base font-black text-white uppercase tracking-tight line-clamp-1">
                {targetCareerGoal}
              </div>

              {/* Benchmark Operational Readiness Statement */}
              <p className="text-xs font-sans font-medium text-blue-100 leading-relaxed max-w-3xl">
                Real-time operational readiness mapped against FMCG, commercial banking, and multinational conglomerate entry benchmarks.
              </p>

              {/* Meta Attributes */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-blue-200 pt-0.5">
                <span className="flex items-center gap-1 font-bold">
                  <MapPin size={12} className="text-amber-300" /> {location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold">
                  <GraduationCap size={12} className="text-amber-300" /> {university}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold text-white">
                  <Building2 size={12} className="text-amber-300" /> INSYT Corporate Scholar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
