"use client";

import { motion } from "framer-motion";
import { Play, Award, BookOpen, Target, ShieldCheck, ArrowUpRight, Zap, Flame } from "lucide-react";
import Link from "next/link";
import { UserState } from "@/lib/state/types";
import { useLanguage } from "@/components/providers/language-context";
import { ALL_PATHS } from "@/lib/data/courses";

interface DashboardHeroProps {
  state: UserState;
  currentRank?: { name: string; color?: string; gradient?: string; shadowColor?: string };
  greeting: string;
  xpProgress?: number;
  prevLevelXp?: number;
  nextLevelXp?: number;
}

export function DashboardHero({
  state,
  greeting,
}: DashboardHeroProps) {
  const { t } = useLanguage();

  // Filter out any obsolete slugs and verify against active ALL_PATHS
  const enrolledSlugs = (state.enrolledPathSlugs || []).filter(
    (slug) => slug && slug !== "corporate-mto" && slug !== "excel-corporate" && Boolean(ALL_PATHS[slug])
  );
  const hasEnrolled = enrolledSlugs.length > 0;
  const activeSlug = hasEnrolled ? enrolledSlugs[0] : "";
  const courseData = activeSlug ? ALL_PATHS[activeSlug] : null;

  const activeCourse = state.courseProgress.find((c) => c.id === activeSlug);
  const progress = activeCourse?.progress ?? 0;
  const trackTitle = courseData?.title || "";
  const stageCount = courseData?.courses?.length || 4;
  const currentModuleNum = Math.min(Math.floor((progress / 100) * stageCount) + 1, stageCount);
  const nextModuleName = progress >= 100
    ? "Course Completed! Review Capstone Project"
    : progress > 50
    ? "Practical Drills & Scenario Simulations"
    : "Core Foundations & Tool Mastery";

  const firstName = state.name ? state.name.split(" ")[0] : "Learner";
  const completedCoursesCount = state.courseProgress.filter((c) => c.progress >= 100).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl p-6 md:p-8 text-white font-sans border-2 border-[#2563eb]"
      style={{
        background: "#0f172a",
        boxShadow: "6px 6px 0px 0px #1e3a8a",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div
                id="daily-streak"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-black uppercase font-mono border border-amber-400/40 text-amber-400 bg-amber-400/15"
              >
                <Flame size={15} className="fill-amber-400 text-amber-400" />
                <span>{state.streak}d</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white">
              {t("dashboard.welcome")}, <span style={{ color: "#F59E0B" }}>{firstName}</span>
            </h1>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
            <Link
              href={hasEnrolled ? `/learn/${activeSlug}` : "/learn"}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-extrabold text-white uppercase font-mono tracking-wide transition-all hover:-translate-y-0.5 border border-blue-300 cursor-pointer"
              style={{
                background: "#2563eb",
                boxShadow: "3px 3px 0px 0px #1e3a8a",
              }}
            >
              <Play size={13} fill="currentColor" />
              <span>{hasEnrolled ? "Resume Course" : "Explore Courses"}</span>
            </Link>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Left Bento Panel: Active Course or Clean Empty State */}
          <div
            className="lg:col-span-7 rounded-lg p-5 md:p-6 flex flex-col justify-between space-y-4 border-2 border-white/10"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {hasEnrolled && courseData ? (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white/60 flex items-center gap-2 font-mono">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center bg-[#2563eb]/40">
                        <BookOpen size={12} />
                      </div>
                      Current Enrolled Course
                    </span>
                    <span
                      className="text-sm font-extrabold px-3 py-1 rounded-md text-amber-300 font-mono border border-amber-500/40"
                      style={{ background: "rgba(245,158,11,0.15)" }}
                    >
                      {progress}% Done
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">{trackTitle}</h3>
                    <p className="text-sm text-white/60 mt-1 font-medium">
                      Next: <span className="text-white/90 font-bold">{nextModuleName}</span>
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "#2563eb" }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm font-bold text-white/70 font-mono">
                      <span>Stage {currentModuleNum} of {stageCount}</span>
                      <span style={{ color: "#F59E0B" }} className="font-extrabold">+150 XP on completion</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-white/60 font-medium">
                    <ShieldCheck size={14} style={{ color: "#F59E0B" }} />
                    <span>Career Passport Credential Included</span>
                  </div>
                  <Link
                    href={`/learn/${activeSlug}`}
                    className="text-sm font-extrabold flex items-center gap-1 transition-all hover:scale-105 font-mono cursor-pointer"
                    style={{ color: "#F59E0B" }}
                  >
                    <span>Continue</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white/60 flex items-center gap-2 font-mono">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center bg-[#2563eb]/40">
                        <BookOpen size={12} />
                      </div>
                      Current Enrolled Course
                    </span>
                    <span
                      className="text-xs font-extrabold px-2.5 py-0.5 rounded-md text-amber-300 font-mono border border-amber-500/40"
                      style={{ background: "rgba(245,158,11,0.15)" }}
                    >
                      Not Enrolled
                    </span>
                  </div>

                  <div className="py-2 space-y-1">
                    <h3 className="text-lg font-black text-white leading-tight">No Enrolled Courses Yet</h3>
                    <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                      You are not currently enrolled in any course. Choose a course from our catalogue to start mastering hands-on skills, completing deliverables, and unlocking verified credentials.
                    </p>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/60 font-medium">
                    <ShieldCheck size={14} style={{ color: "#F59E0B" }} />
                    <span>Verified W3C Certificate with Every Course</span>
                  </div>
                  <Link
                    href="/learn"
                    className="px-4 py-2 rounded-lg text-xs font-extrabold uppercase text-amber-950 bg-amber-400 hover:bg-amber-300 transition-all border border-amber-500 flex items-center gap-1 font-mono shadow-sm cursor-pointer"
                  >
                    <span>Browse Courses</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Right Bento Panel: Readiness Gauge & Streak */}
          <div
            className="lg:col-span-5 rounded-lg p-5 md:p-6 flex flex-col justify-between space-y-4 border-2 border-white/10"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div className="space-y-4">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-white/60 flex items-center gap-2 font-mono">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "rgba(245,158,11,0.25)" }}>
                    <Target size={12} />
                  </div>
                  Recruiter Readiness Index
                </span>
                <span
                  className="text-sm font-extrabold px-3 py-1 rounded-md text-emerald-400 font-mono border border-emerald-500/30"
                  style={{ background: "rgba(16,185,129,0.15)" }}
                >
                  Top 5% Talent
                </span>
              </div>

              {/* Readiness Gauge */}
              <div className="rounded-lg p-4 space-y-3 border-2 border-white/10" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white flex items-center gap-1.5">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    94% <span className="text-sm text-white/50 font-normal">Match</span>
                  </span>
                  <span className="text-sm font-extrabold font-mono text-emerald-400">
                    Corporate Ready
                  </span>
                </div>

                <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-emerald-400"
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-white/60 font-mono">
                  <span>W3C Verified Credentials</span>
                  <span>ATS Calibrated</span>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Streak Box */}
              <div
                className="rounded-lg p-3 flex items-center gap-3 border-2"
                style={{ background: "rgba(245,158,11,0.15)", borderColor: "rgba(245,158,11,0.4)" }}
              >
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <Flame size={24} className="fill-amber-400 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-bangla text-xs font-extrabold" style={{ color: "#FDE68A" }}>দৈনিক স্ট্রিক</p>
                  <p className="text-base font-black text-white leading-tight">{state.streak} Days</p>
                </div>
              </div>

              {/* Certificates Box */}
              <div
                className="rounded-lg p-3 flex items-center gap-3 border-2"
                style={{ background: "rgba(37,99,235,0.15)", borderColor: "rgba(37,99,235,0.4)" }}
              >
                <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 border border-blue-400/50" style={{ background: "#2563EB", color: "#fff" }}>
                  <Award size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-bangla text-xs font-extrabold" style={{ color: "#93C5FD" }}>সার্টিফিকেট</p>
                  <p className="text-base font-black text-white leading-tight">{completedCoursesCount} Unlocked</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
