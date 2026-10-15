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
