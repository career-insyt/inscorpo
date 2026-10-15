"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, X, CheckCircle2, ShieldCheck, Zap, Calendar, SnowflakeIcon, Trophy } from "lucide-react";
import { UserState } from "@/lib/state/types";

interface StreakExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: UserState;
}

export function StreakExplainerModal({ isOpen, onClose, state }: StreakExplainerModalProps) {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split("T")[0];
  const isCheckedInToday = state.lastCheckInDate === todayStr;

  // Build 30-day interactive calendar array
  const today = new Date();
  const past30Days = Array.from({ length: 30 }).map((_, idx) => {
    const dayOffset = 29 - idx;
    const d = new Date(today);
    d.setDate(d.getDate() - dayOffset);
    const dateStr = d.toISOString().split("T")[0];
    const isToday = dayOffset === 0;
    const dayOfWeek = d.getDay() === 0 ? 6 : d.getDay() - 1;
    const isRecentWeek = dayOffset < 7;
    const isActive = isToday ? isCheckedInToday : isRecentWeek ? (state.weeklyActivity[dayOfWeek] || 0) > 0 : dayOffset < state.streak;
    return { dateStr, dayNum: d.getDate(), isActive, isToday };
  });

  const multiplier = state.streak >= 8 ? "1.5x LEGEND MULTIPLIER" : state.streak >= 4 ? "1.25x ACTIVE MULTIPLIER" : "1.0x BASE MULTIPLIER";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-mono">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border-4 border-slate-950 bg-white text-slate-950 p-6 sm:p-8 space-y-6 z-10 shadow-[10px_10px_0px_0px_#ef4444]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] font-black transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-rose-500 text-white border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000]">
              <Flame size={16} className="fill-white text-white" /> DAILY STREAK VELOCITY
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 flex items-center gap-2">
              <span>{state.streak}-DAY ACTIVE STREAK</span>
            </h2>
          </div>



          {/* 30-Day Monthly Calendar Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 flex items-center gap-2">
                <Calendar size={16} className="text-rose-500" /> 30-DAY STREAK CALENDAR
              </h3>
              <span className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                {isCheckedInToday ? "Checked in Today" : "Check-in Required"}
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
              {past30Days.map((day, idx) => (
                <div
                  key={idx}
                  className={`h-10 rounded-xl border-2 border-slate-950 flex items-center justify-center text-xs font-black transition-all ${
                    day.isActive
                      ? "bg-amber-400 text-amber-950 shadow-[2px_2px_0px_0px_#000]"
                      : day.isToday
                      ? "bg-rose-500 text-white animate-pulse shadow-[2px_2px_0px_0px_#000]"
                      : "bg-slate-100 text-slate-400"
                  }`}
                  title={`${day.dateStr}: ${day.isActive ? "Active" : "Inactive"}`}
                >
                  {day.isActive ? <CheckCircle2 size={16} /> : day.dayNum}
                </div>
              ))}
            </div>
          </div>

          {/* Economic Utility Perks (Consensus.md / Khaldi et al. 2023) */}
          <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50 text-emerald-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-emerald-900">
                <Trophy size={15} className="text-emerald-600" /> Economic Streak Rewards
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 border border-emerald-400">
                {state.streak >= 5 ? "Unlocked" : `${Math.max(1, 5 - state.streak)} Days to Unlock`}
              </span>
            </div>

            <p className="text-[11px] font-sans font-medium text-emerald-800 leading-snug">
              Consistent deliberate practice pays off. Reaching a 5-day streak unlocks an instant 20% discount voucher for all corporate 5-Day Sprints & Flagship Track Capstones.
            </p>

            <div className="flex items-center justify-between p-2.5 rounded-xl border-2 border-dashed border-emerald-600 bg-white">
              <div>
                <p className="text-[9px] font-mono uppercase text-emerald-700 font-bold">20% Sprint Discount Voucher</p>
                <p className="text-sm font-mono font-black text-emerald-900 tracking-wider">
                  {state.streak >= 5 ? "STREAK5PRO" : "LOCKED (Requires 5-Day Streak)"}
                </p>
              </div>
              {state.streak >= 5 && (
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText("STREAK5PRO");
                    alert("Coupon code STREAK5PRO copied to clipboard! Apply at sprint checkout.");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono font-black uppercase shadow-sm cursor-pointer"
                >
                  Copy Code
                </button>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-black text-xs uppercase text-white bg-rose-600 hover:bg-rose-700 transition-all border-4 border-slate-950 shadow-[6px_6px_0px_0px_#991b1b] cursor-pointer"
          >
            MAINTAIN STREAK
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
