"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Trophy,
  Check, Sparkles, ShieldCheck,
  TrendingUp, Users, Calendar, ArrowRight, CheckCircle2, Award
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";

import { LinkedInProfileHeader } from "@/components/dashboard/linkedin-profile-header";
import { LinkedInExperienceCard } from "@/components/dashboard/linkedin-experience-card";
import { LinkedInSkillsCard } from "@/components/dashboard/linkedin-skills-card";
import { WeeklyVelocityChart } from "@/components/dashboard/weekly-velocity-chart";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { DailyQuestEngine } from "@/components/dashboard/daily-quest-engine";
import { DashboardRegisteredWorkshopsWidget } from "@/components/dashboard/dashboard-registered-workshops-widget";
import { StreakExplainerModal } from "@/components/dashboard/streak-explainer-modal";

import { CockpitCommandCenter } from "@/components/dashboard/cockpit-command-center";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Animated Noto emoji URLs
const FIRE_EMOJI_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp";

export default function LinkedInDashboardPage() {
  const { state } = useUser();
  const [streakModalOpen, setStreakModalOpen] = useState(false);

  const totalWeeklyMinutes = state.weeklyActivity.reduce((a, b) => a + b, 0);
  const dailyAverageMins = Math.round(totalWeeklyMinutes / 7);

  const totalDaysInGrid = 168;
  const today = new Date();

  const heatmapGrid = Array.from({ length: totalDaysInGrid }).map((_, idx) => {
    const dayOffset = totalDaysInGrid - 1 - idx;
    const d = new Date(today);
    d.setDate(d.getDate() - dayOffset);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const dayOfWeek = d.getDay() === 0 ? 6 : d.getDay() - 1;
    const isRecentWeek = dayOffset < 7;
    const weeklyMins = isRecentWeek ? (state.weeklyActivity[dayOfWeek] || 0) : 0;
    let activityLevel = 0;
    if (weeklyMins >= 45) activityLevel = 3;
    else if (weeklyMins >= 20) activityLevel = 2;
    else if (weeklyMins > 0) activityLevel = 1;
    return { dateStr, level: activityLevel, totalXp: 0, mins: weeklyMins };
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6 pb-20 font-sans"
    >
      {/* ── 0. Candidate Profile Header (Restored) ── */}
      <LinkedInProfileHeader state={state} />

      {/* ── 1. Career Command Center & Readiness Index ── */}
      <CockpitCommandCenter state={state} />

      {/* ── 2. Live Workshops & Event Pass Widget ── */}
      <DashboardRegisteredWorkshopsWidget />


      {/* ── 3. Main 2-Column Profile Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── LEFT COLUMN (8 Columns) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Enrolled Tracks */}
          <LinkedInExperienceCard state={state} />

          {/* Activity Heatmap */}
          <ActivityHeatmap heatmapGrid={heatmapGrid} totalLogsCount={0} />

          {/* Weekly Learning Velocity Chart */}
          <WeeklyVelocityChart
            weeklyActivity={state.weeklyActivity}
            totalWeeklyMinutes={totalWeeklyMinutes}
            dailyAverageMins={dailyAverageMins}
            days={days}
          />
        </div>

        {/* ── RIGHT SIDEBAR (4 Columns) ── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Daily Quests Engine Widget (1 Enrolled Task) */}
          <DailyQuestEngine />

          {/* Upcoming Masterclasses Widget */}
          <motion.div
            variants={item}
            className="rounded-xl border-2 border-corp-border p-5 space-y-3 font-sans"
            style={{ background: "var(--corp-surface)" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold font-mono uppercase tracking-wider text-corp-text flex items-center gap-2">
                <Calendar size={14} className="text-[#2563eb]" /> Corporate Events
              </h3>
              <Link href="/events" className="text-[11px] font-mono font-extrabold text-[#2563eb] hover:underline">
                All Events →
              </Link>
            </div>
            <div className="p-3 rounded-lg border-2 border-corp-border bg-corp-bg-secondary/60 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-extrabold bg-[#2563eb] text-white">
                  AUG 15
                </span>
                <span className="text-xs font-bold text-corp-text truncate">
                  CV Writing &amp; LinkedIn Hacks
                </span>
              </div>
              <p className="text-[10px] text-corp-text-tertiary font-medium">
                Live with Niaz Ahmed (Founder &amp; CEO, Corporate Ask)
              </p>
            </div>
          </motion.div>

          {/* Verified Skills & Masteries (Placed under Corporate Events) */}
          <LinkedInSkillsCard state={state} />

        </div>
      </div>

      {/* ── Streak Modal ── */}
      <StreakExplainerModal isOpen={streakModalOpen} onClose={() => setStreakModalOpen(false)} state={state} />
    </motion.div>
  );
}
