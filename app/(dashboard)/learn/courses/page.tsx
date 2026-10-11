"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Search, Filter, ArrowRight, Clock,
  Users, Star, Play, Sparkles, Trophy, Brain,
  ChevronDown, CheckCircle2, SlidersHorizontal, Zap,
  Check, UserCheck, Flame, Layers, ShieldCheck, Tag, Award,
  Video, FileSpreadsheet, Presentation, Bot, GraduationCap
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { ALL_PATHS, CourseItem } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

// Distinctive brand color themes per flagship course
function getCourseTheme(slug: string, pathSlug: string) {
  if (pathSlug === "video-ai-production" || slug.includes("capcut") || slug.includes("gemini") || slug.includes("higgsfield") || slug.includes("after-effects")) {
    return {
      gradient: "from-[#2e1065] via-[#581c87] to-[#0f172a]",
      badgeBg: "bg-[#8b5cf6] text-white",
      badgeText: "text-white",
      accentText: "text-[#8b5cf6]",
      border: "border-purple-500",
      cardShadow: "shadow-[5px_5px_0px_0px_#7e22ce] hover:shadow-[7px_7px_0px_0px_#4c1d95]",
      btnStyle: "bg-[#8b5cf6] hover:bg-purple-500 text-white shadow-[3px_3px_0px_0px_#4c1d95] border-2 border-purple-300",
    };
  }
  if (pathSlug === "presentation-engineering" || slug.includes("gamma") || slug.includes("canva") || slug.includes("powerpoint")) {
    return {
      gradient: "from-[#78350f] via-[#d97706] to-[#f59e0b]",
      badgeBg: "bg-[#f59e0b] text-amber-950",
      badgeText: "text-amber-950",
      accentText: "text-[#f59e0b]",
      border: "border-[#f59e0b]",
      cardShadow: "shadow-[5px_5px_0px_0px_#f59e0b] hover:shadow-[7px_7px_0px_0px_#78350f]",
      btnStyle: "bg-[#f59e0b] hover:bg-amber-400 text-amber-950 shadow-[3px_3px_0px_0px_#78350f] border-2 border-amber-300",
    };
  }
  if (pathSlug === "ai-for-work" || slug.includes("ai") || slug.includes("wsci") || slug.includes("notebooklm")) {
    return {
      gradient: "from-[#164e63] via-[#0891b2] to-[#06b6d4]",
      badgeBg: "bg-[#06b6d4] text-cyan-950",
      badgeText: "text-cyan-950",
      accentText: "text-[#06b6d4]",
      border: "border-[#06b6d4]",
      cardShadow: "shadow-[5px_5px_0px_0px_#06b6d4] hover:shadow-[7px_7px_0px_0px_#164e63]",
      btnStyle: "bg-[#06b6d4] hover:bg-cyan-400 text-cyan-950 shadow-[3px_3px_0px_0px_#164e63] border-2 border-cyan-300",
    };
  }
  // Default / GRE
  return {
    gradient: "from-[#9f1239] via-[#be123c] to-[#e11d48]",
    badgeBg: "bg-[#e11d48] text-white",
    badgeText: "text-white",
    accentText: "text-[#e11d48]",
    border: "border-[#e11d48]",
    cardShadow: "shadow-[5px_5px_0px_0px_#e11d48] hover:shadow-[7px_7px_0px_0px_#881337]",
    btnStyle: "bg-[#e11d48] hover:bg-rose-600 text-white shadow-[3px_3px_0px_0px_#881337] border-2 border-rose-300",
  };
}

const flagshipPathsOnly = [
  ALL_PATHS["video-ai-production"],
  ALL_PATHS["presentation-engineering"],
  ALL_PATHS["ai-for-work"],
  ALL_PATHS["gre-preparation"],
].filter(Boolean);

// Flatten all stages into master list
const datacampStyleCourses = flagshipPathsOnly.flatMap((path) =>
  path.courses.map((course) => ({
    ...course,
    pathTitle: path.title,
    category: path.category,
    theme: getCourseTheme(course.slug, course.pathSlug),
    instructor: {
      name: course.pathSlug === "video-ai-production" ? "Farhan Kabir" :
            course.pathSlug === "presentation-engineering" ? "Anika Rahman" :
            course.pathSlug === "ai-for-work" ? "Nusrat Jahan" : "Lead GRE Faculty",
      role: course.pathSlug === "video-ai-production" ? "Lead Creative Director" :
            course.pathSlug === "presentation-engineering" ? "Executive Presentations Director" :
            course.pathSlug === "ai-for-work" ? "Principal AI Architect" : "Senior Quantitative Specialist",
      icon: course.pathSlug === "video-ai-production" ? Video :
            course.pathSlug === "presentation-engineering" ? Presentation :
            course.pathSlug === "ai-for-work" ? Bot : GraduationCap,
    },
    skillLevel: course.hours >= 20 ? "Advanced" : course.hours >= 8 ? "Intermediate" : "Foundational",
  }))
);

const topicPills = [
  "All Stages", "Video & AI", "Presentations", "AI for Work", "GRE Prep"
];

export default function DataCampCoursesPage() {
  const { state } = useUser();
  const [selectedTopic, setSelectedTopic] = useState("All Stages");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredCourses = datacampStyleCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTopic =
      selectedTopic === "All Stages" ? true :
      selectedTopic === "Video & AI" ? course.pathSlug === "video-ai-production" :
      selectedTopic === "Presentations" ? course.pathSlug === "presentation-engineering" :
      selectedTopic === "AI for Work" ? course.pathSlug === "ai-for-work" :
      selectedTopic === "GRE Prep" ? course.pathSlug === "gre-preparation" : true;

    const matchesLevel = selectedLevel ? course.skillLevel === selectedLevel : true;

    return matchesSearch && matchesTopic && matchesLevel;
  });

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 pb-20">

      {/* ─── HERO HEADER ─── */}
      <div className="rounded-xl p-6 sm:p-10 text-white bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-2 border-blue-400 shadow-[6px_6px_0px_0px_#1e3a8a] relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold uppercase bg-amber-400 text-amber-950 border border-amber-500">
              <Sparkles size={13} className="inline mr-1" /> All Stages &amp; Modules
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400">
              {datacampStyleCourses.length} Total Stages
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase font-mono">
            Stage Curriculum &amp; Hands-on Labs
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-medium leading-relaxed font-sans">
            Explore every individual stage across the Flagship Masterclasses. Each stage contains dedicated modules, deep notes, interactive practice gyms, and practical deliverable projects.
          </p>
        </div>
      </div>

      {/* ─── SEARCH & FILTER BAR ─── */}
      <div className="space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-corp-text-tertiary" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stage by title, tool, or skill outcome..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-corp-border bg-corp-surface text-xs font-mono text-corp-text outline-none focus:border-[#3B5BDB]"
            />
          </div>
          <div className="flex gap-2">
            {["Foundational", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold border-2 transition-all ${selectedLevel === level ? "bg-[#3B5BDB] text-white border-blue-600" : "bg-corp-bg-secondary text-corp-text border-corp-border"}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-2">
          {topicPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setSelectedTopic(pill)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-extrabold uppercase border-2 transition-all ${selectedTopic === pill ? "bg-amber-400 text-amber-950 border-amber-500 shadow-[2px_2px_0px_0px_#78350f]" : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-amber-400"}`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* ─── COURSES GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const courseProgressObj = state.courseProgress.find((c) => c.id === course.slug);
          const progress = courseProgressObj ? courseProgressObj.progress : 0;
          const InstructorIcon = course.instructor.icon;

          return (
            <div
              key={course.slug}
              className={`rounded-xl border-2 ${course.theme.border} p-6 flex flex-col justify-between space-y-4 transition-all ${course.theme.cardShadow}`}
              style={{ background: "var(--corp-surface)" }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-extrabold uppercase ${course.theme.badgeBg}`}>
                    {course.pathTitle}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-corp-text-tertiary">
                    {course.hours}h Content
                  </span>
                </div>

                <h3 className="text-base font-extrabold" style={{ color: "var(--corp-text)" }}>
                  {course.title}
                </h3>

                <p className="text-xs text-corp-text-secondary leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.skills.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-corp-bg-secondary border border-corp-border text-corp-text font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t-2 border-corp-border">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-corp-text-tertiary font-bold flex items-center gap-1.5">
                    <InstructorIcon size={14} className="text-[#3B5BDB]" />
                    <span>{course.instructor.name}</span>
                  </span>
                  <span className="font-extrabold text-[#3B5BDB] flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-[#3B5BDB]" />
                    <span>ভেরিফাইড কোর্স</span>
                  </span>
                </div>

                <Link
                  href={`/learn/${course.pathSlug}/${course.slug}`}
                  className={`w-full py-2.5 rounded-lg text-xs font-mono font-extrabold uppercase flex items-center justify-center gap-1.5 transition-all ${course.theme.btnStyle}`}
                >
                  <Play size={13} fill="currentColor" />
                  <span>{progress > 0 ? "Continue Stage" : "Start Stage"}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
