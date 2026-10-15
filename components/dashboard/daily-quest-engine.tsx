"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Target,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  Compass,
  Lock,
  Flame,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { ALL_PATHS, CourseItem } from "@/lib/data/courses";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export function DailyQuestEngine() {
  const { state } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const todayStr = getTodayKey();

  // ─── Resolve the User's Real Enrolled Track & Next Lesson ───
  const { enrolledPath, enrolledCourse, nextLesson, hasEnrolledTrack } = useMemo(() => {
    const validSlugs = (state.enrolledPathSlugs || []).filter(
      (s) => s && s !== "corporate-mto" && s !== "excel-corporate" && Boolean(ALL_PATHS[s])
    );

    if (validSlugs.length === 0) {
      return {
        enrolledPath: null,
        enrolledCourse: null,
        nextLesson: null,
        hasEnrolledTrack: false,
      };
    }

    const primarySlug = validSlugs[0];
    const pathData = ALL_PATHS[primarySlug];
    const course: CourseItem | undefined = pathData?.courses?.[0];

    if (!course) {
      return {
        enrolledPath: pathData,
        enrolledCourse: null,
        nextLesson: null,
        hasEnrolledTrack: true,
      };
    }

    // Find progress record for this enrolled course
    const courseProgressRecord = state.courseProgress.find(
      (c) => c.id === course.slug || c.courseId === course.slug || c.id === primarySlug
    );
    const completedList = courseProgressRecord?.completedLessons || [];

    // Find first uncompleted lesson
    let resolvedLesson: { slug: string; title: string; duration?: string; moduleTitle?: string } | null = null;

    if (course.modules && course.modules.length > 0) {
      for (const mod of course.modules) {
        for (const les of mod.lessons) {
          if (!completedList.includes(les.slug)) {
            resolvedLesson = {
              slug: les.slug,
              title: les.title,
              duration: les.duration,
              moduleTitle: mod.title,
            };
            break;
          }
        }
        if (resolvedLesson) break;
      }

      // If all lessons completed, show first lesson for review
      if (!resolvedLesson && course.modules[0]?.lessons?.[0]) {
        const first = course.modules[0].lessons[0];
        resolvedLesson = {
          slug: first.slug,
          title: `${first.title} (Mastery Review)`,
          duration: first.duration,
          moduleTitle: course.modules[0].title,
        };
      }
    }

    return {
      enrolledPath: pathData,
      enrolledCourse: course,
      nextLesson: resolvedLesson,
      hasEnrolledTrack: true,
    };
  }, [state.enrolledPathSlugs, state.courseProgress]);

  // ─── Automated Platform Sensing (No manual cheat ticking allowed!) ───
  const isMissionDone = useMemo(() => {
    // 1. Check if user already claimed check-in today
    if (state.lastCheckInDate === todayStr) return true;

    // 2. Check if the active lesson has actually been completed in course progress
    if (nextLesson && isClient) {
      const courseRecord = state.courseProgress.find(
        (c) =>
          enrolledCourse &&
          (c.id === enrolledCourse.slug || c.courseId === enrolledCourse.slug)
      );
      if (courseRecord && (courseRecord.completedLessons || []).includes(nextLesson.slug)) {
        return true;
      }
    }

    // 3. Sensed if study minutes logged today in weeklyActivity
    const jsDay = new Date().getDay();
    const todayIdx = jsDay === 0 ? 6 : jsDay - 1;
    if (state.weeklyActivity && state.weeklyActivity[todayIdx] && state.weeklyActivity[todayIdx] >= 15) {
      return true;
    }

    return false;
  }, [state.lastCheckInDate, todayStr, nextLesson, isClient, state.courseProgress, enrolledCourse, state.weeklyActivity]);

  const lessonUrl =
    enrolledPath && enrolledCourse && nextLesson
      ? `/learn/${enrolledPath.slug}/${enrolledCourse.slug}/${nextLesson.slug}`
      : enrolledPath
      ? `/learn/${enrolledPath.slug}`
      : `/learn`;

  return (
    <div className="rounded-2xl border-2 border-[#b45309] bg-gradient-to-br from-amber-50 via-yellow-50/70 to-amber-100/50 p-5 space-y-4 font-sans shadow-[5px_5px_0px_0px_#78350f]">
      {/* ── Top Header Bar (Golden Theme) ── */}
      <div className="flex items-center justify-between border-b-2 border-amber-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-[#78350f] flex items-center justify-center text-[#78350f] flex-shrink-0 shadow-[2px_2px_0px_0px_#78350f]">
            <Target size={16} strokeWidth={2.6} className="text-[#78350f]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-black font-mono uppercase tracking-wider text-[#78350f] leading-tight">
                Daily Quest
              </h2>
              <Sparkles size={11} className="text-amber-600 fill-amber-500" />
            </div>
            <p className="text-[10px] font-mono font-bold text-amber-800">
              Gold Tier Velocity Mission
            </p>
          </div>
        </div>

        {/* Right Status Badge */}
        <span
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-black uppercase border-2 shadow-[2px_2px_0px_0px_#78350f] ${
            isMissionDone
              ? "bg-emerald-400 text-emerald-950 border-[#78350f]"
              : "bg-amber-300 text-[#78350f] border-[#78350f]"
          }`}
        >
          {isMissionDone ? "✓ SENSED DONE" : "1 MISSION ACTIVE"}
        </span>
      </div>

      {/* ── Case 1: User has not enrolled in any course yet ── */}
      {!hasEnrolledTrack && (
        <div className="p-4 rounded-xl border-2 border-dashed border-amber-400 bg-white/80 text-center space-y-2.5">
          <div className="w-9 h-9 rounded-full bg-amber-400 border-2 border-[#78350f] flex items-center justify-center text-[#78350f] mx-auto shadow-xs">
            <Compass size={17} strokeWidth={2.4} />
          </div>
          <h3 className="text-xs font-extrabold text-[#78350f]">
            No Career Track Enrolled
          </h3>
          <p className="text-[11px] text-amber-900 font-medium">
            Select a career track to activate automated daily curriculum missions.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-xs font-black uppercase text-amber-950 bg-amber-400 hover:bg-amber-300 transition-all border-2 border-[#78350f] shadow-[2px_2px_0px_0px_#78350f]"
          >
            <span>Browse Tracks</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* ── Case 2: User has an active enrolled course ── */}
      {hasEnrolledTrack && enrolledCourse && (
        <div className="space-y-3">
          <div
            className={`p-4 rounded-xl border-2 transition-all space-y-3 ${
              isMissionDone
                ? "border-emerald-600 bg-emerald-50/70 shadow-[3px_3px_0px_0px_#064e3b]"
                : "border-[#78350f] bg-white shadow-[3px_3px_0px_0px_#78350f]"
            }`}
          >
            {/* Track Name & Duration */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#78350f] bg-amber-200/90 px-2 py-0.5 rounded border border-amber-400">
                {enrolledPath?.title || enrolledCourse.title}
              </span>
              {nextLesson?.duration && (
                <span className="text-[10px] font-mono font-bold text-amber-900">
                  ⏱ {nextLesson.duration}
                </span>
              )}
            </div>

            {/* Task Content with Locked Tick Indicator */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                {/* Non-clickable Tick indicator: Platform senses it automatically! */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 pointer-events-none select-none transition-all shadow-xs ${
                    isMissionDone
                      ? "bg-emerald-400 border-emerald-800 text-emerald-950"
                      : "border-amber-300 bg-amber-50 text-amber-300"
                  }`}
                  title={isMissionDone ? "Sensed as completed by platform" : "Complete lesson to tick automatically"}
                >
                  <Check size={13} strokeWidth={3} className={isMissionDone ? "text-emerald-950" : "opacity-30"} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                    {nextLesson ? nextLesson.title : `Complete next module in ${enrolledCourse.title}`}
                  </h3>
                  {nextLesson?.moduleTitle && (
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                      {nextLesson.moduleTitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Automated Sensing State vs Action CTA */}
            {isMissionDone ? (
              <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-700" /> Platform Verified · Done for Today
                </span>
                <Link
                  href={lessonUrl}
                  className="font-bold text-emerald-800 hover:text-emerald-950 hover:underline inline-flex items-center gap-0.5"
                >
                  Review Lesson <ChevronRight size={12} />
                </Link>
              </div>
            ) : (
              <div className="pt-2.5 border-t border-amber-200/80 space-y-2">
                <Link
                  href={lessonUrl}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase text-amber-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 hover:from-amber-300 hover:to-yellow-300 transition-all border-2 border-[#78350f] shadow-[3px_3px_0px_0px_#78350f] flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <BookOpen size={14} className="text-[#78350f]" />
                  <span>Start Lesson to Auto-Complete</span>
                  <ArrowRight size={14} className="text-[#78350f]" />
                </Link>

                <p className="text-[10px] font-mono text-center text-amber-800 font-medium">
                  🔒 Automated Sensing: Platform automatically marks this completed when you finish the lesson.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
