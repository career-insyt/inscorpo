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
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { ALL_PATHS, CourseItem } from "@/lib/data/courses";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export function DailyQuestEngine() {
  const { state, claimDailyCheckIn, addNotification } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const todayStr = getTodayKey();
    if (typeof window !== "undefined") {
      const isDoneLocally = localStorage.getItem(`insyt_daily_mission_done_${todayStr}`) === "true";
      setLocalCompleted(isDoneLocally);
    }
  }, []);

  const todayStr = getTodayKey();

  // ─── Resolve the User's Real Enrolled Track & Next Lesson ───
  const { enrolledPath, enrolledCourse, nextLesson, hasEnrolledTrack } = useMemo(() => {
    // ONLY consider courses the user has actually enrolled in
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

      // If all lessons completed, show first lesson or capstone review
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

  // Check if mission is done today
  const isMissionDone = useMemo(() => {
    if (localCompleted) return true;
    if (state.lastCheckInDate === todayStr) return true;

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
    return false;
  }, [localCompleted, state.lastCheckInDate, todayStr, nextLesson, isClient, state.courseProgress, enrolledCourse]);

  const handleMarkCompleted = () => {
    claimDailyCheckIn();
    setLocalCompleted(true);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`insyt_daily_mission_done_${todayStr}`, "true");
      } catch {}
    }

    addNotification({
      type: "achievement",
      title: "Daily Mission Accomplished",
      message: `You completed today's study quest for ${enrolledCourse?.title || "your enrolled track"}.`,
    });
  };

  const lessonUrl =
    enrolledPath && enrolledCourse && nextLesson
      ? `/learn/${enrolledPath.slug}/${enrolledCourse.slug}/${nextLesson.slug}`
      : enrolledPath
      ? `/learn/${enrolledPath.slug}`
      : `/learn`;

  return (
    <div
      className="rounded-xl border-2 border-blue-600 bg-white p-5 space-y-4 font-sans shadow-[4px_4px_0px_0px_#1e3a8a]"
    >
      {/* ── Top Header Bar ── */}
      <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          {/* Bright Yellow Box with Brown Icon */}
          <div className="w-7 h-7 rounded-lg bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm">
            <Target size={14} className="text-amber-950" strokeWidth={2.4} />
          </div>
          <div>
            <h2 className="text-xs font-black font-mono uppercase tracking-wider text-slate-900 leading-tight">
              Daily Quest
            </h2>
            <p className="text-[10px] font-mono text-slate-500">
              Today&apos;s Core Mission
            </p>
          </div>
        </div>

        {/* Right Badge: 1 Mission */}
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
          {isMissionDone ? "COMPLETED" : "1 MISSION"}
        </span>
      </div>

      {/* ── Case 1: User has not enrolled in any course yet ── */}
      {!hasEnrolledTrack && (
        <div className="p-4 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 text-center space-y-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 mx-auto">
            <Compass size={16} className="text-amber-950" />
          </div>
          <h3 className="text-xs font-extrabold text-slate-900">
            No Enrolled Track Selected
          </h3>
          <p className="text-[11px] text-slate-600">
            Choose your flagship career track to unlock tailored daily curriculum missions.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all border border-blue-700 shadow-sm"
          >
            <span>Browse Flagship Tracks</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* ── Case 2: User has an active enrolled course (Exactly 1 Mission) ── */}
      {hasEnrolledTrack && enrolledCourse && (
        <div className="space-y-3">
          {/* Mission Card */}
          <div
            className={`p-4 rounded-xl border-2 transition-all space-y-3 ${
              isMissionDone
                ? "border-blue-500 bg-blue-50/70 shadow-sm"
                : "border-slate-200 bg-[#F8FAFC] hover:border-blue-400"
            }`}
          >
            {/* Track Name & Module Label */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                {enrolledPath?.title || enrolledCourse.title}
              </span>
              {nextLesson?.duration && (
                <span className="text-[10px] font-mono font-semibold text-slate-500">
                  {nextLesson.duration}
                </span>
              )}
            </div>

            {/* Task Content */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isMissionDone
                      ? "bg-amber-400 border-amber-500 text-amber-950 shadow-sm"
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  <Check size={11} strokeWidth={3} className={isMissionDone ? "text-amber-950" : "text-transparent"} />
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

            {/* Status Feedback when Completed */}
            {isMissionDone ? (
              <div className="pt-2 border-t border-blue-200 flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold text-blue-800 flex items-center gap-1">
                  <ShieldCheck size={13} className="text-amber-600" /> Mission Complete for Today
                </span>
                <Link
                  href={lessonUrl}
                  className="font-mono font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5"
                >
                  Review Lesson <ChevronRight size={12} />
                </Link>
              </div>
            ) : (
              /* Action CTA Buttons */
              <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                <Link
                  href={lessonUrl}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all border-2 border-blue-700 shadow-[3px_3px_0px_0px_#1e3a8a] flex items-center justify-center gap-1.5"
                >
                  <BookOpen size={13} />
                  <span>Start Lesson</span>
                  <ArrowRight size={13} />
                </Link>

                <button
                  type="button"
                  onClick={handleMarkCompleted}
                  title="Mark lesson as done for today"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 border-2 border-slate-300 transition-all shadow-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
