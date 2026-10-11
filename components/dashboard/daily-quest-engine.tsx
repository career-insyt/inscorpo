"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, BookOpen, ClipboardList, Briefcase,
  CheckCircle2, ChevronRight, Target, Flame, Check, ShieldCheck
} from "lucide-react";
import { useUser } from "@/components/providers/user-context";

type QuestId = "lesson" | "quiz" | "job";

interface Quest {
  id: QuestId;
  icon: React.ReactNode;
  label: string;
  description: string;
  xp: number;
  href: string;
}

const QUESTS: Quest[] = [
  {
    id: "lesson",
    icon: <BookOpen size={14} />,
    label: "Watch a Lesson",
    description: "Complete any lesson in your active track",
    xp: 50,
    href: "/learn",
  },
  {
    id: "quiz",
    icon: <ClipboardList size={14} />,
    label: "Score on a Practice Test",
    description: "Score 60%+ on any quiz or mock test",
    xp: 75,
    href: "/mock-tests",
  },
  {
    id: "job",
    icon: <Briefcase size={14} />,
    label: "Explore an Opportunity",
    description: "View a job listing or join a challenge",
    xp: 25,
    href: "/jobs",
  },
];

const STORAGE_KEY = "insyt_daily_quest_completed";
const FIRE_EMOJI_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function loadCompletedQuests(): Set<QuestId> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: { date: string; completed: QuestId[] } = JSON.parse(raw);
    if (parsed.date === getTodayKey()) return new Set(parsed.completed);
  } catch {
    /* ignore */
  }
  return new Set();
}

function saveCompletedQuests(completed: Set<QuestId>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayKey(), completed: Array.from(completed) })
    );
  } catch {
    /* ignore */
  }
}

export function DailyQuestEngine() {
  const { state, claimDailyCheckIn, addNotification } = useUser();
  const [completedQuests, setCompletedQuests] = useState<Set<QuestId>>(() => loadCompletedQuests());
  const [bonusClaimed, setBonusClaimed] = useState(false);

  const todayStr = getTodayKey();
  const completedCount = completedQuests.size;
  const allDone = completedCount >= QUESTS.length;
  const isStreakCountedToday = state.lastCheckInDate === todayStr;
  const circumference = 2 * Math.PI * 22;

  // When all daily tasks are completed, automatically secure and count the streak!
  useEffect(() => {
    if (allDone) {
      if (!isStreakCountedToday) {
        claimDailyCheckIn();
      }

      const bonusKey = `insyt_quest_bonus_${todayStr}`;
      if (typeof window !== "undefined" && !localStorage.getItem(bonusKey)) {
        localStorage.setItem(bonusKey, "1");
        setBonusClaimed(true);
        setTimeout(() => {
          addNotification({
            type: "achievement",
            title: "🔥 Daily Tasks Completed! Streak Advanced",
            message: `You completed all daily tasks! Your active streak is now ${state.streak} days.`,
          });
        }, 500);
      } else {
        setBonusClaimed(true);
      }
    }
  }, [allDone, isStreakCountedToday, todayStr, claimDailyCheckIn, addNotification, state.streak]);

  const handleCompleteQuest = useCallback(
    (quest: Quest) => {
      if (completedQuests.has(quest.id)) return;

      const next = new Set(completedQuests);
      next.add(quest.id);
      setCompletedQuests(next);
      saveCompletedQuests(next);

      addNotification({
        type: "achievement",
        title: `Task Complete: ${quest.label} ✅`,
        message: `"${quest.label}" done (+${quest.xp} XP). ${
          QUESTS.length - next.size > 0
            ? `${QUESTS.length - next.size} task${QUESTS.length - next.size !== 1 ? "s" : ""} remaining for today's streak.`
            : "All daily tasks completed! Streak secured!"
        }`,
      });
    },
    [completedQuests, addNotification]
  );

  return (
    <div className="space-y-3 font-sans">
      {/* Main Quest Card with Daily Attendance's Gold/Amber Aesthetic */}
      <div
        className="rounded-2xl border-2 overflow-hidden text-slate-900 transition-all"
        style={{
          background: "linear-gradient(135deg, #FEF08A 0%, #FACC15 60%, #F59E0B 100%)",
          borderColor: "#D97706",
          boxShadow: "5px 5px 0px 0px #92400E",
        }}
      >
        {/* Card Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b-2"
          style={{ borderColor: "#D97706" }}
        >
          <div className="flex items-center gap-3">
            {/* Progress Circle in Rich Amber */}
            <div className="relative w-12 h-12 flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="none"
                  strokeWidth="4"
                  stroke="rgba(146, 64, 14, 0.25)"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="#92400E"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{
                    strokeDashoffset: circumference * (1 - completedCount / QUESTS.length),
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {allDone ? (
                  <CheckCircle2 size={18} className="text-[#92400E]" />
                ) : (
                  <span className="text-[12px] font-black font-mono text-[#78350F]">
                    {completedCount}/{QUESTS.length}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-900/20 text-amber-950 border border-amber-800/30">
                  Daily Tasks &amp; Streak
                </span>
              </div>
              <h3 className="text-sm font-black uppercase font-mono mt-0.5 text-amber-950 tracking-tight flex items-center gap-1.5">
                <Target size={15} className="text-[#92400E]" /> Daily Quests
              </h3>
            </div>
          </div>

          {/* Streak Fire Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="px-2.5 py-1 rounded-lg text-xs font-mono font-black bg-amber-950/15 text-amber-950 border border-amber-900/30 flex items-center gap-1 shadow-sm">
              <img
                src={FIRE_EMOJI_URL}
                alt="fire"
                width={18}
                height={18}
                className="object-contain"
              />
              <span>{state.streak}d Streak</span>
            </div>
          </div>
        </div>

        {/* Informational Subtext: Streak Rules */}
        <div className="px-5 pt-3 pb-2 text-[11px] font-mono font-bold text-amber-950 leading-relaxed border-b border-amber-600/30">
          {allDone ? (
            <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold">
              <ShieldCheck size={14} className="text-emerald-800" />
              <span>All daily tasks complete! Today&apos;s streak is active &amp; secured.</span>
            </div>
          ) : (
            <p>
              Streak only advances when daily tasks are completed. Finish all {QUESTS.length} tasks today to keep your streak alive!
            </p>
          )}
        </div>

        {/* Quests List */}
        <div className="divide-y-2 divide-amber-600/30 p-2 space-y-1.5">
          {QUESTS.map((quest, i) => {
            const done = completedQuests.has(quest.id);
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl transition-all border ${
                  done
                    ? "bg-amber-100/70 border-emerald-600/30 opacity-75"
                    : "bg-white/80 hover:bg-white border-amber-600/40 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border-2 ${
                      done
                        ? "bg-[#10B981] text-white border-[#059669]"
                        : "bg-[#FEF3C7] text-amber-900 border-amber-500"
                    }`}
                  >
                    {done ? <CheckCircle2 size={15} /> : quest.icon}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-mono font-extrabold text-amber-950 ${
                        done ? "line-through opacity-70" : ""
                      }`}
                    >
                      {quest.label}
                    </p>
                    <p className="text-[10px] mt-0.5 font-medium text-amber-900/80">
                      {quest.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 font-mono">
                  <span className="text-[10px] font-black text-amber-950 flex items-center gap-0.5 bg-amber-400/50 px-2 py-0.5 rounded border border-amber-600/30">
                    <Zap size={11} className="fill-amber-900 text-amber-900" />+{quest.xp}
                  </span>
                  {done ? (
                    <div className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-600 text-white border border-emerald-700 shadow-sm flex items-center gap-1">
                      <Check size={11} /> Done
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCompleteQuest(quest)}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold text-white transition-all flex items-center gap-1 border-2"
                      style={{
                        background: "#92400E",
                        borderColor: "#78350F",
                        boxShadow: "2px 2px 0px 0px #451a03",
                      }}
                    >
                      Complete
                      <ChevronRight size={11} />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Summary / Streak Status Bar */}
        <div className="p-3 bg-amber-600/15 border-t-2 border-amber-600/40 flex items-center justify-between text-xs font-mono font-black text-amber-950">
          <span>
            {allDone
              ? "🎯 Daily Target Met: +200 XP Bonus Claimed"
              : `${QUESTS.length - completedCount} task${QUESTS.length - completedCount !== 1 ? "s" : ""} remaining to secure streak`}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-amber-900 font-bold">
            {allDone ? "Target Achieved 🎯" : "In Progress ⏳"}
          </span>
        </div>
      </div>
    </div>
  );
}
