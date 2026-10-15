"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Flame, Zap, CheckCircle2, TrendingUp, BarChart2, Clock, Calendar } from "lucide-react";
import { useUser } from "@/components/providers/user-context";

interface WeeklyVelocityChartProps {
  weeklyActivity: number[];
  totalWeeklyMinutes: number;
  dailyAverageMins: number;
  days: string[];
}

export function WeeklyVelocityChart({
  weeklyActivity,
  totalWeeklyMinutes,
  dailyAverageMins,
  days,
}: WeeklyVelocityChartProps) {
  const { state } = useUser();
  const todayDayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(todayDayIdx);

  // Target: 30 mins/day, 210 mins weekly
  const weeklyTargetMins = 210;
  const progressPercent = Math.min(Math.round((totalWeeklyMinutes / weeklyTargetMins) * 100), 100);
  const maxActivity = Math.max(...weeklyActivity, 60);

  // Hardcore calculated velocity telemetry
  const completedLessonsThisWeek = state.completedDeliverableIds?.length || 0;
  const estimatedXpGenerated = totalWeeklyMinutes * 4 + completedLessonsThisWeek * 50;
  const consistencyScore = Math.round((weeklyActivity.filter((m) => m > 0).length / 7) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-5 sm:p-6 space-y-5 bg-white font-sans text-slate-900"
    >
      {/* ── Header: Title & Hardcore Velocity Stats ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-blue-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]">
              <Activity size={17} strokeWidth={2.5} />
            </div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950 font-mono">
              Weekly Learning Velocity
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-black uppercase border-2 flex items-center gap-1 ${
                totalWeeklyMinutes >= weeklyTargetMins
                  ? "bg-amber-300 text-amber-950 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]"
                  : totalWeeklyMinutes >= 90
                  ? "bg-blue-100 text-blue-900 border-blue-300"
                  : "bg-slate-100 text-slate-700 border-slate-300"
              }`}
            >
              <Zap size={11} className="fill-current" />
              {totalWeeklyMinutes >= weeklyTargetMins
                ? "Pace: Target Exceeded"
                : totalWeeklyMinutes >= 90
                ? "Pace: On Track"
                : "Pace: Accelerating"}
            </span>
          </div>

          <p className="text-xs font-mono text-slate-600 font-semibold">
            Daily Average: <span className="text-[#2563eb] font-black">{dailyAverageMins}m / day</span> · Target: 30m / day (210m weekly)
          </p>
        </div>

        {/* Weekly Completion Score Pill */}
        <div className="flex items-center gap-3 bg-blue-50/80 px-4 py-2 rounded-xl border-2 border-blue-200 shadow-sm self-start sm:self-auto font-mono">
          <div className="text-right">
            <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Weekly Target</span>
            <p className="text-xs font-black text-slate-900">{totalWeeklyMinutes} / {weeklyTargetMins}m</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-xs font-black">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* ── Secondary Telemetry Data Bar (Planned & Backend Connected) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
        <div className="p-2.5 rounded-xl border-2 border-blue-100 bg-slate-50 flex items-center gap-2">
          <Clock size={16} className="text-[#2563eb] flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase font-black block truncate">Time Invested</span>
            <span className="font-black text-slate-900">{totalWeeklyMinutes} Mins</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl border-2 border-blue-100 bg-slate-50 flex items-center gap-2">
          <Flame size={16} className="text-amber-500 fill-amber-500 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase font-black block truncate">Streak Multiplier</span>
            <span className="font-black text-slate-900">{state.streak} Days Active</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl border-2 border-blue-100 bg-slate-50 flex items-center gap-2">
          <TrendingUp size={16} className="text-emerald-600 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase font-black block truncate">Consistency</span>
            <span className="font-black text-slate-900">{consistencyScore}% Weekly</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl border-2 border-blue-100 bg-slate-50 flex items-center gap-2">
          <Zap size={16} className="text-[#2563eb] fill-[#2563eb] flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase font-black block truncate">XP Generated</span>
            <span className="font-black text-slate-900">+{estimatedXpGenerated} XP</span>
          </div>
        </div>
      </div>

      {/* ── Responsive Dynamic Bar Chart ── */}
      <div className="relative pt-4">
        {/* Dynamic 30m Target Dotted Line */}
        <div
          className="absolute left-0 right-0 border-b-2 border-dashed border-[#2563eb]/50 z-10 pointer-events-none flex justify-end"
          style={{
            bottom: `calc(2rem + ${Math.min((30 / maxActivity) * 100, 90)}% * 0.65)`,
          }}
        >
          <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded bg-blue-100 text-[#2563eb] border border-blue-300 -mt-2.5 uppercase">
            30m Standard Benchmark
          </span>
        </div>

        {/* 7-Day Velocity Bars */}
        <div className="flex items-end gap-2 sm:gap-3 h-36 pt-4 relative z-0">
          {weeklyActivity.map((mins, i) => {
            const isToday = i === todayDayIdx;
            const isPeak = mins > 0 && mins === Math.max(...weeklyActivity);
            const isSelected = selectedDayIdx === i;

            return (
              <div
                key={i}
                onClick={() => setSelectedDayIdx(i)}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
              >
                {/* Floating Tooltip */}
                <div
                  className={`absolute -top-8 text-[10px] font-mono font-black px-2 py-0.5 rounded-md transition-all shadow-md whitespace-nowrap z-20 ${
                    isSelected || isToday ? "opacity-100 scale-100" : "opacity-0 group-hover:opacity-100 scale-95"
                  } bg-slate-950 text-white border border-slate-700`}
                >
                  {days[i]}: {mins}m {isPeak ? "• Peak" : ""}
                </div>

                {/* Peak Indicator */}
                {isPeak && mins > 0 && (
                  <span className="absolute -top-3.5 text-amber-500 pointer-events-none animate-pulse">
                    <Flame size={13} className="fill-amber-500" />
                  </span>
                )}

                {/* Bar Box */}
                <div className="w-full flex-1 flex items-end justify-center rounded-xl bg-slate-100 p-1 border-2 border-slate-200 group-hover:border-blue-400 transition-colors">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: mins === 0 ? 6 : `${(mins / maxActivity) * 100}%` }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                    className={`w-full rounded-lg transition-all ${
                      isSelected ? "ring-2 ring-slate-950 shadow-sm" : ""
                    } ${
                      isToday
                        ? "bg-[#2563eb] border border-blue-600"
                        : mins >= 30
                        ? "bg-blue-600"
                        : mins > 0
                        ? "bg-blue-400"
                        : "bg-blue-200/50"
                    }`}
                  />
                </div>

                {/* Day Label */}
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    className={`text-xs font-mono font-black ${
                      isToday ? "text-[#2563eb]" : "text-slate-600"
                    }`}
                  >
                    {days[i]}
                  </span>
                  {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Selected Day Detailed Telemetry Box ── */}
      <div className="p-3.5 rounded-xl bg-blue-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs border-2 border-blue-200 font-mono font-black">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2563eb]" />
          <span className="text-slate-900">{days[selectedDayIdx]} Telemetry:</span>
          <span className="text-[#2563eb]">{weeklyActivity[selectedDayIdx]} Minutes Active</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-600">
          <span>
            Goal Completion:{" "}
            <strong className="text-slate-900">
              {Math.min(Math.round((weeklyActivity[selectedDayIdx] / 30) * 100), 100)}%
            </strong>
          </span>
          {selectedDayIdx === todayDayIdx && (
            <span className="px-2 py-0.5 rounded-md bg-[#2563eb] text-white font-mono text-[9px] uppercase tracking-wider">
              Current Session
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
