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
import { DashboardRegisteredWorkshopsWidget } from "@/components/dashboard/dashboard-registered-workshops-widget";
import { DashboardEventsHub } from "@/components/dashboard/dashboard-events-hub";
import { StreakExplainerModal } from "@/components/dashboard/streak-explainer-modal";
import { CockpitCommandCenter } from "@/components/dashboard/cockpit-command-center";
import { AllBadgesShowcase } from "@/components/dashboard/all-badges-showcase";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function LinkedInDashboardPage() {
  const { state } = useUser();
  const [streakModalOpen, setStreakModalOpen] = useState(false);

  const totalWeeklyMinutes = state.weeklyActivity.reduce((a, b) => a + b, 0);
  const dailyAverageMins = Math.round(totalWeeklyMinutes / 7);

  const today = new Date();
  const todayDayOfWeek = (today.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
  const WEEKS = 24;

  const heatmapGrid = Array.from({ length: WEEKS * 7 }).map((_, idx) => {
    const w = Math.floor(idx / 7);
    const d = idx % 7;
    const daysAgo = (WEEKS - 1 - w) * 7 + (todayDayOfWeek - d);

    if (daysAgo < 0) {
      return null;
    }

    const date = new Date(today);
    date.setDate(today.getDate() - daysAgo);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    let weeklyMins = 0;
    if (daysAgo < 7) {
      const dayIdx = (date.getDay() + 6) % 7;
      weeklyMins = state.weeklyActivity[dayIdx] || 0;
    }

    let activityLevel = 0;
    if (weeklyMins >= 45) activityLevel = 3;
    else if (weeklyMins >= 20) activityLevel = 2;
    else if (weeklyMins > 0) activityLevel = 1;

    const totalXp = weeklyMins > 0 ? weeklyMins * 10 : 0;
    return { dateStr, level: activityLevel, totalXp, mins: weeklyMins };
  }).filter((c): c is { dateStr: string; level: number; totalXp: number; mins: number } => c !== null);

  const totalLogsCount = heatmapGrid.filter(c => c.level > 0).length || (state.streak > 0 ? state.streak : 1);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6 pb-20 font-sans"
    >
      {/* ── 0. Candidate Profile Header ── */}
      <LinkedInProfileHeader state={state} />

      {/* ── 1. Career Command Center (Readiness Index + Quick Learnings Reels) ── */}
      <CockpitCommandCenter state={state} />

      {/* ── 2. Live Workshops Pass & Continuous Corporate Events Carousel ── */}
      <DashboardRegisteredWorkshopsWidget />
      <DashboardEventsHub />

      {/* ── 3. Main 2-Column Profile Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── LEFT COLUMN (8 Columns) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Enrolled Tracks */}
          <LinkedInExperienceCard state={state} />

          {/* Activity Heatmap & Commit Graph (Blue Outline) */}
          <ActivityHeatmap heatmapGrid={heatmapGrid} totalLogsCount={totalLogsCount} />

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
          {/* Verified Skills & Masteries */}
          <LinkedInSkillsCard state={state} />

          {/* Executive Badge Ledger (Compact directly below Verified Skills & Masteries) */}
          <AllBadgesShowcase state={state} compact={true} />
        </div>
      </div>

      {/* ── Streak Modal ── */}
      <StreakExplainerModal isOpen={streakModalOpen} onClose={() => setStreakModalOpen(false)} state={state} />
    </motion.div>
  );
}
