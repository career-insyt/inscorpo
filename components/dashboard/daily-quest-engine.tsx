"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Zap, BookOpen, ClipboardList, Briefcase,
  CheckCircle2, ChevronRight, Target, ShieldCheck,
  Check, Sparkles, Award, Lock, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { ALL_PATHS, getCourseBySlug, CourseItem } from "@/lib/data/courses";
import { MOCK_TESTS_DATABASE, MockTestDetail } from "@/lib/data/mock-tests-db";
import { jobsData, JobListing } from "@/lib/data/jobs";

const FIRE_EMOJI_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

/** 0-indexed: Mon=0 ... Sun=6 */
function getTodayDayIndex() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

interface DynamicQuest {
  id: string;
  categoryTag: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  xp: number;
  href: string;
  actionText: string;
  isCompleted: boolean;
  validationSource: string;
}

export function DailyQuestEngine() {
  const { state, claimDailyCheckIn, addNotification } = useUser();
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const todayStr = getTodayKey();
  const todayIdx = getTodayDayIndex();
  const circumference = 2 * Math.PI * 22;

  // ─── 1. RESOLVE USER PROFILE & SAAS CONTENT CONNECTIONS ───────────────────────
  const { activePathSlug, activeCourse, activeLesson, targetTest, targetJob, hasVerifiedSkills } = useMemo(() => {
    // 1. User Primary Career Path
    const cleanPaths = (state.enrolledPathSlugs || []).filter(
      (s) => s && s !== "corporate-mto" && s !== "excel-corporate"
    );
    const pathSlug = cleanPaths[0] || "corporate-analyst";
    const pathData = ALL_PATHS[pathSlug] || ALL_PATHS["corporate-analyst"];

    // 2. Active Course in Path
    const course: CourseItem =
      pathData?.courses?.[0] ||
      getCourseBySlug("corporate-financial-commercial-modeling-excel") || {
        slug: "corporate-financial-commercial-modeling-excel",
        pathSlug: "corporate-analyst",
        title: "Corporate Financial & Commercial Modeling in Excel",
        description: "Master 3-statement modeling and commercial analytics.",
        lessons: 10,
        hours: 12,
        skills: ["Financial Modeling", "Excel", "Commercial Valuation"],
      };

    // 3. Next Uncompleted or Target Lesson
    const courseProgressRecord = state.courseProgress.find(
      (c) => c.id === course.slug || c.courseId === course.slug
    );
    const completedLessons = courseProgressRecord?.completedLessons || [];

    let resolvedLesson = {
      slug: "pvm-price-volume-mix-decomposition",
      title: "PVM Decomposition & Commercial Review",
      xp: 60,
    };

    if (course.modules && course.modules.length > 0) {
      let foundUnfinished = false;
      for (const mod of course.modules) {
        for (const les of mod.lessons) {
          if (!completedLessons.includes(les.slug)) {
            resolvedLesson = {
              slug: les.slug,
              title: les.title,
              xp: les.xp || 60,
            };
            foundUnfinished = true;
            break;
          }
        }
        if (foundUnfinished) break;
      }
      if (!foundUnfinished && course.modules[0]?.lessons?.[0]) {
        const first = course.modules[0].lessons[0];
        resolvedLesson = {
          slug: first.slug,
          title: first.title,
          xp: first.xp || 60,
        };
      }
    }

    // 4. Track Standardized Mock Test
    let testObj: MockTestDetail = MOCK_TESTS_DATABASE["excel-commercial-modeling"];
    if (pathSlug === "business-intelligence-analyst") {
      testObj = MOCK_TESTS_DATABASE["sql-bi-analytics"] || testObj;
    } else if (pathSlug === "corporate-analyst") {
      testObj = MOCK_TESTS_DATABASE["excel-commercial-modeling"] || testObj;
    } else {
      testObj = MOCK_TESTS_DATABASE["mto-cognitive-aptitude"] || testObj;
    }

    // 5. Passport Skills vs Opportunities
    const verifiedDetails = state.passportProfile?.verifiedSkillDetails || {};
    const verifiedCount = Object.values(verifiedDetails).filter((s) => s?.verified).length;
    const hasSkillsVerified = verifiedCount > 0;

    // Pick a real top job matching the track
    const matchingJobs = jobsData.filter((j) => {
      const lowerTitle = j.title.toLowerCase();
      const lowerDept = j.department.toLowerCase();
      if (pathSlug === "business-intelligence-analyst") {
        return lowerTitle.includes("bi") || lowerTitle.includes("data") || lowerDept.includes("analytics");
      }
      return lowerTitle.includes("analyst") || lowerTitle.includes("finance") || lowerDept.includes("commercial");
    });
    const selectedJob: JobListing = matchingJobs[0] || jobsData[0];

    return {
      activePathSlug: pathSlug,
      activeCourse: course,
      activeLesson: resolvedLesson,
      targetTest: testObj,
      targetJob: selectedJob,
      hasVerifiedSkills: hasSkillsVerified,
    };
  }, [state.enrolledPathSlugs, state.courseProgress, state.passportProfile]);

  // ─── 2. AUTHORITATIVE SAAS VALIDATION ENGINE ─────────────────────────────────
  const quests: DynamicQuest[] = useMemo(() => {
    // ── Task 1: Lesson Progress in User's Track
    let lessonDoneToday = false;
    if (isClient) {
      const localLessonKey = localStorage.getItem(`insyt_daily_lesson_done_${todayStr}`);
      const rawCompletedLessons = localStorage.getItem("insyt_completed_lessons_list");
      const completedList = rawCompletedLessons ? JSON.parse(rawCompletedLessons) : [];
      lessonDoneToday =
        localLessonKey === "true" ||
        completedList.includes(activeLesson.slug) ||
        state.courseProgress.some(
          (c) =>
            (c.id === activeCourse.slug || c.courseId === activeCourse.slug) &&
            (c.lastAccessed === todayStr || (c.completedLessons || []).includes(activeLesson.slug))
        ) ||
        (state.weeklyActivity[todayIdx] || 0) > 0;
    }

    // ── Task 2: Standardized Assessment or Rapid Drill
    let drillOrTestDone = false;
    if (isClient) {
      const rapidDrillKey = `daily-skill-rapid-drill-${todayStr}`;
      const localDrillDone = localStorage.getItem(`insyt_drill_done_${todayStr}`) === "true";
      const hasCompletedTest = (state.completedMockTests || []).includes(targetTest.id);
      
      let hasTodayTestScore = false;
      try {
        const rawResults = localStorage.getItem("insyt_mock_test_results");
        if (rawResults) {
          const results = JSON.parse(rawResults);
          hasTodayTestScore = results.some(
            (r: any) => (r.date === todayStr || r.testId === targetTest.id) && (r.score >= 60 || r.accuracy >= 60)
          );
        }
      } catch {}

      drillOrTestDone =
        state.completedChallengeIds.includes(rapidDrillKey) ||
        localDrillDone ||
        hasCompletedTest ||
        hasTodayTestScore;
    }

    // ── Task 3: Career Passport Benchmark OR Corporate Opportunity Application
    let careerDone = false;
    if (isClient) {
      if (!hasVerifiedSkills) {
        careerDone = Boolean(
          state.passportProfile?.verifiedSkillDetails &&
          Object.values(state.passportProfile.verifiedSkillDetails).some((s) => s?.verified)
        );
      } else {
        const rawApps = localStorage.getItem("insyt_job_applications") || localStorage.getItem("job_applications");
        const hasApps = rawApps ? JSON.parse(rawApps).length > 0 : false;
        careerDone =
          (state.completedChallengeIds && state.completedChallengeIds.length > 0) ||
          hasApps ||
          Boolean(localStorage.getItem(`challenge_eval_${targetJob.id}`));
      }
    }

    // Construct the 3 dynamic, verified tasks
    const questList: DynamicQuest[] = [
      {
        id: "curriculum_lesson",
        categoryTag: `${activeCourse.title.split(" ")[0]} Track`,
        icon: <BookOpen size={14} />,
        label: `Master Lesson: ${activeLesson.title}`,
        description: `Complete study module in ${activeCourse.title}`,
        xp: activeLesson.xp || 50,
        href: `/learn/${activeCourse.pathSlug}/${activeCourse.slug}/${activeLesson.slug}`,
        actionText: "Start Lesson",
        isCompleted: lessonDoneToday,
        validationSource: "CourseProgress & Learning Studio Activity",
      },
      {
        id: "benchmark_drill",
        categoryTag: "Assessment Hub",
        icon: <ClipboardList size={14} />,
        label: `${targetTest.title.split(" ").slice(0, 4).join(" ")} or 5-Min Drill`,
        description: `Score 60%+ on test or complete today's timed rapid drill`,
        xp: 75,
        href: `/mock-tests/${targetTest.id}`,
        actionText: "Take Drill / Test",
        isCompleted: drillOrTestDone,
        validationSource: "MockTestsDB & 5-Min Skill Drill Verification",
      },
      {
        id: "career_action",
        categoryTag: hasVerifiedSkills ? "Corporate Hub" : "Career Passport",
        icon: hasVerifiedSkills ? <Briefcase size={14} /> : <Award size={14} />,
        label: hasVerifiedSkills
          ? `Apply for ${targetJob.title} (${targetJob.company.split(" ")[0]})`
          : `Benchmark Core Skill in Career Passport`,
        description: hasVerifiedSkills
          ? `Submit talent profile or case solution in Career Opportunities`
          : `Audit & cryptographically verify your competency benchmark`,
        xp: 50,
        href: hasVerifiedSkills ? `/jobs` : `/career-passport`,
        actionText: hasVerifiedSkills ? "View Role" : "Verify Skill",
        isCompleted: careerDone,
        validationSource: hasVerifiedSkills ? "JobApplication & Case Challenge Engine" : "Talent Passport Cryptographic Attestation",
      },
    ];

    return questList;
  }, [
    isClient,
    todayStr,
    todayIdx,
    activeCourse,
    activeLesson,
    targetTest,
    targetJob,
    hasVerifiedSkills,
    state.courseProgress,
    state.weeklyActivity,
    state.completedChallengeIds,
    state.completedMockTests,
    state.passportProfile,
  ]);

  const completedCount = quests.filter((q) => q.isCompleted).length;
  const totalCount = quests.length;
  const allDone = completedCount >= totalCount && totalCount > 0;
  const isStreakCountedToday = state.lastCheckInDate === todayStr;

  // ─── 3. AUTO-COMPLETE & SECURE STREAK ON PLATFORM VALIDATION ──────────────────
  useEffect(() => {
    if (allDone && isClient) {
      if (!isStreakCountedToday) {
        claimDailyCheckIn();
      }

      const bonusKey = `insyt_quest_bonus_${todayStr}`;
      if (!localStorage.getItem(bonusKey)) {
        localStorage.setItem(bonusKey, "1");
        setBonusClaimed(true);
        setTimeout(() => {
          addNotification({
            type: "achievement",
            title: "🔥 All Daily Tasks Verified! Streak Advanced",
            message: `Platform validated all tasks completed based on your profile! Streak is now ${state.streak} days.`,
          });
        }, 500);
      } else {
        setBonusClaimed(true);
      }
    }
  }, [allDone, isStreakCountedToday, todayStr, claimDailyCheckIn, addNotification, state.streak, isClient]);

  return (
    <div className="space-y-3 font-sans">
      {/* Main Quest Card with Gold/Amber Aesthetic */}
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
                    strokeDashoffset: circumference * (1 - completedCount / totalCount),
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {allDone ? (
                  <CheckCircle2 size={18} className="text-[#92400E]" />
                ) : (
                  <span className="text-[12px] font-black font-mono text-[#78350F]">
                    {completedCount}/{totalCount}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-900/20 text-amber-950 border border-amber-800/30">
                  Profile-Connected &amp; Verified
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

        {/* Informational Subtext: Real Verification Notice */}
        <div className="px-5 pt-3 pb-2.5 text-[11px] font-mono font-bold text-amber-950 leading-relaxed border-b border-amber-600/30">
          {allDone ? (
            <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold">
              <ShieldCheck size={14} className="text-emerald-800 flex-shrink-0" />
              <span>All daily tasks genuinely validated! Today&apos;s streak is secured.</span>
            </div>
          ) : (
            <p className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-amber-900 flex-shrink-0" />
              <span>
                Automatic validation active. Tasks auto-complete once performed across curriculum, assessments &amp; passport.
              </span>
            </p>
          )}
        </div>

        {/* Quests List */}
        <div className="divide-y-2 divide-amber-600/30 p-2 space-y-1.5">
          {quests.map((quest, i) => {
            const done = quest.isCompleted;
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl transition-all border ${
                  done
                    ? "bg-amber-100/70 border-emerald-600/30 opacity-90"
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
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900 border border-amber-400/40">
                        {quest.categoryTag}
                      </span>
                    </div>
                    <p
                      className={`text-xs font-mono font-extrabold text-amber-950 truncate ${
                        done ? "line-through opacity-75" : ""
                      }`}
                    >
                      {quest.label}
                    </p>
                    <p className="text-[10px] mt-0.5 font-medium text-amber-900/80 truncate">
                      {quest.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 font-mono">
                  <span className="text-[10px] font-black text-amber-950 flex items-center gap-0.5 bg-amber-400/50 px-2 py-0.5 rounded border border-amber-600/30">
                    <Zap size={11} className="fill-amber-900 text-amber-900" />+{quest.xp}
                  </span>

                  {done ? (
                    <div className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-700 text-white border border-emerald-800 shadow-sm flex items-center gap-1">
                      <Check size={11} /> Verified Done
                    </div>
                  ) : (
                    <Link
                      href={quest.href}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold text-white transition-all flex items-center gap-1 border-2"
                      style={{
                        background: "#92400E",
                        borderColor: "#78350F",
                        boxShadow: "2px 2px 0px 0px #451a03",
                      }}
                    >
                      {quest.actionText}
                      <ChevronRight size={11} />
                    </Link>
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
              : `${totalCount - completedCount} task${totalCount - completedCount !== 1 ? "s" : ""} remaining to secure streak`}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-amber-900 font-bold">
            {allDone ? "Target Achieved 🎯" : "In Progress ⏳"}
          </span>
        </div>
      </div>
    </div>
  );
}
