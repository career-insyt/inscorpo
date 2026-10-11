"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, Clock, Award, Play, CheckCircle2, ChevronRight, ArrowRight,
  BookOpenCheck, Compass, HelpCircle, FileText, Sparkles, Trophy, Check, X,
  Users, ChevronDown, Download, ShieldCheck, Star, Brain, CheckSquare, Layers,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/user-context";
import { ALL_PATHS, getCourseBySlug, CourseItem } from "@/lib/data/courses";
import { databases } from "@/lib/appwrite";
import { DB_CONFIG } from "@/lib/db";
import { Query } from "appwrite";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ pathSlug: string; courseSlug: string }>;
}

interface DynamicLesson {
  slug: string;
  title: string;
  duration: string;
  xp?: number;
  type: "video" | "reading" | "simulation" | "assessment";
}

interface DynamicModule {
  title: string;
  description: string;
  duration: string;
  exercisesCount: number;
  lessons: DynamicLesson[];
}

function getCourseCoverImage(slug: string, pathSlug: string): string {
  if (slug.includes("business-intelligence") || slug.includes("powerbi") || slug.includes("bi-")) return "/images/course_powerbi.svg";
  if (pathSlug === "video-ai-production" || slug.includes("video")) return "/images/course_career.svg";
  if (pathSlug === "presentation-engineering" || slug.includes("presentation")) return "/images/course_finance.svg";
  if (pathSlug === "ai-for-work" || slug.includes("ai")) return "/images/course_ai.svg";
  if (pathSlug === "gre-preparation" || slug.includes("gre")) return "/images/course_career.svg";
  return "/images/course_career.svg";
}

export default function MasterCourseLandingPage(props: PageProps) {
  const router = useRouter();
  const { state, updateCourseProgress } = useUser();
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [dbCourseDoc, setDbCourseDoc] = useState<any>(null);

  const params = use(props.params);
  const pathSlug = params?.pathSlug || "video-ai-production";
  const courseSlug = params?.courseSlug || "video-editing-mastery";

  useEffect(() => {
    if (courseSlug === "capcut-complete-course" || courseSlug === "capcut-core-engine" || courseSlug.includes("capcut")) {
      router.replace("/learn/capcut-master-academy");
    } else if (
      courseSlug === "gemini-scripting-previz" ||
      courseSlug === "elevenlabs-audio-architecture" ||
      courseSlug === "higgsfield-cinema-studio" ||
      courseSlug === "video-editing-mastery" ||
      courseSlug === "ai-production-studio"
    ) {
      router.replace(`/learn/${pathSlug}/ai-video-production-studio`);
    }
  }, [courseSlug, pathSlug, router]);

  // Resolve course from master registry
  const registryCourse: CourseItem | null = getCourseBySlug(courseSlug) || {
    slug: courseSlug,
    pathSlug: pathSlug,
    title: courseSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Masterclass",
    description: `Comprehensive executive training for ${courseSlug} in corporate careers.`,
    lessons: 10,
    hours: 7,
    enrolledCount: 0,
    skills: ["Critical Thinking", "Problem Solving", "Analytical Modeling", "Business Intelligence"],
  };

  const coverImage = getCourseCoverImage(courseSlug, pathSlug);

  // ─── Fetch Real Course & Enrolled Data from Appwrite Databases ──────────────────
  useEffect(() => {
    let isMounted = true;

    async function loadAppwriteCourseAndProfiles() {
      try {
        const res = await databases.listDocuments(
          DB_CONFIG.databaseId,
          DB_CONFIG.collections.courses,
          [Query.equal("slug", courseSlug)]
        );

        if (isMounted && res.documents.length > 0) {
          setDbCourseDoc(res.documents[0]);
        }

        const profRes = await databases.listDocuments(
          DB_CONFIG.databaseId,
          DB_CONFIG.collections.profiles,
          [Query.limit(100)]
        );

        if (isMounted && profRes.total > 0) {
          setDbLearnerCount(profRes.total);
        }
      } catch (err) {
        console.warn("[Appwrite] Live learner count fetch active for:", courseSlug);
      }
    }

    loadAppwriteCourseAndProfiles();
    return () => { isMounted = false; };
  }, [courseSlug]);

  const [dbLearnerCount, setDbLearnerCount] = useState<number>(0);
  const [selectedCapstoneIdx, setSelectedCapstoneIdx] = useState<number>(0);

  const title = dbCourseDoc?.title || registryCourse.title;
  const description = dbCourseDoc?.description || registryCourse.description;
  const lessonsCount = dbCourseDoc?.lessons || registryCourse.lessons;
  const hoursCount = dbCourseDoc?.hours || registryCourse.hours;
  const enrolledCount = dbLearnerCount;
  const skillsList = dbCourseDoc?.skills || registryCourse.skills;

  // Generate dynamic curriculum modules for any course
  const dynamicModules: DynamicModule[] = registryCourse.modules || [
    {
      title: `Module 1: ${title} Foundations & Setup`,
      description: `Core principles, workspace setup, terminal configurations, and essential terminology.`,
      duration: `${Math.round(hoursCount * 0.35)}h 15m`,
      exercisesCount: 2,
      lessons: [
        { slug: `${courseSlug}-orientation`, title: `Course Orientation & Setup`, duration: "15m", xp: 30, type: "video" },
        { slug: `${courseSlug}-foundations`, title: "Core Executive Principles & Taxonomy", duration: "25m", xp: 40, type: "reading" },
        { slug: `${courseSlug}-workspace-tour`, title: "Workspace & Interactive Navigation Tour", duration: "25m", xp: 50, type: "simulation" },
      ],
    },
    {
      title: `Module 2: Applied ${title} Case Labs & Practice`,
      description: "Hands-on problem solving, data transformation pipelines, and scenario models.",
      duration: `${Math.round(hoursCount * 0.4)}h 20m`,
      exercisesCount: 3,
      lessons: [
        { slug: `${courseSlug}-practical-lab`, title: "Practical Case Lab & Scenario Simulation", duration: "30m", xp: 60, type: "simulation" },
        { slug: `${courseSlug}-advanced-formulas`, title: "Advanced Functions & Optimization", duration: "35m", xp: 70, type: "reading" },
        { slug: `${courseSlug}-case-breakdown`, title: "Corporate Problem Solving & Real-World Dataset", duration: "40m", xp: 80, type: "video" },
      ],
    },
    {
      title: `Module 3: Capstone Assessment & Certification`,
      description: "Final timed assessment test, capstone presentation deck, and verified credential issuance.",
      duration: `${Math.round(hoursCount * 0.25)}h 10m`,
      exercisesCount: 2,
      lessons: [
        { slug: `${courseSlug}-timed-assessment`, title: `${title} Executive Assessment Exam`, duration: "45m", xp: 90, type: "assessment" },
        { slug: `${courseSlug}-capstone-deck`, title: "Final Capstone Deliverable & Verification", duration: "50m", xp: 100, type: "assessment" },
      ],
    },
  ];

  const whatYouWillLearn = registryCourse.credential ? [
    `Total 75 Learning Hours (32h Masterclass Lectures + 43h Practical Build & Model Defense)`,
    "FAST Financial Modeling Standard Compliance & 'One Formula per Row' Architecture",
    "Dynamic Three-Statement Financial Modeling with Zero-Plug Balance Verification",
    "Power Query ETL Pipelines for Automated Multi-Period ERP Ledger Ingestion",
    "Price-Volume-Mix (PVM) Variance Decomposition & Executive Margin Waterfall Bridges",
    "Working Capital Cycles (DSO, DIO, DPO) & Cash Conversion Liquidity Optimization",
    "PP&E Depreciation Corkscrews, Debt Amortization, Revolvers & Dynamic Cash Sweeps",
    "Model Circularity Management with Dedicated Circuit Breaker Switches",
    "Rolling 12-Month FP&A Forecasting Engines Splicing Closed Actuals with Projections",
    "4-Hour Proctored Live Blank-Sheet Build Exam & 30-Min Oral Model Defense before Executives"
  ] : [
    `Duration of the Course - ${hoursCount} hours | Practical self-paced`,
    "Practical Hands-On Exercises and Downloadable CSV Datasets",
    "Case Study-Based Corporate Problem Solving",
    "AI Doubt-Clearing Copilot Support 24/7",
    "Unique Industry-Led Financial & Strategic Content",
    "Industry Recognized Digital Career Certificate"
  ];

  const courseProgressObj = state.courseProgress.find((c) => c.id === courseSlug);
  const courseProgress = courseProgressObj ? courseProgressObj.progress : 0;

  const toggleModule = (idx: number) => setOpenModuleIndex(openModuleIndex === idx ? null : idx);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 pb-16">

      {/* Back Link */}
      <div>
        <Link
          href={`/learn/${pathSlug}`}
          className="inline-flex items-center gap-2 text-xs font-extrabold transition-colors text-corp-text-secondary hover:text-[#3B5BDB]"
        >
          <ArrowLeft size={14} /> Back to Masterclass Stages
        </Link>
      </div>

      {/* ─── MASTER HERO BANNER SECTION (Full Width SAAS Theme) ─── */}
      <div
        className="rounded-xl p-6 md:p-10 text-white shadow-[6px_6px_0px_0px_#1e3a8a] relative overflow-hidden border-2 border-blue-400 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950"
      >
        {/* Background Cover Image with Gradient Overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-multiply">
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-blue-500 text-white border border-blue-400 font-mono shadow-xs">
                <Sparkles size={13} className="text-white inline mr-1" /> Masterclass Course
              </span>
              {registryCourse.credential ? (
                <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-emerald-400 text-emerald-950 border border-emerald-500 shadow-xs">
                  <ShieldCheck size={13} className="text-emerald-950 inline mr-1" /> {registryCourse.credential.benchmark}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-amber-400 text-amber-950 border border-amber-500 shadow-xs">
                  <ShieldCheck size={13} className="text-amber-950 inline mr-1" /> W3C Verified Curriculum
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight text-white uppercase font-mono">
              {title}
            </h1>

            {registryCourse.subtitle && (
              <p className="text-xs md:text-sm text-amber-300 font-mono font-bold">
                {registryCourse.subtitle}
              </p>
            )}

            <p className="text-xs md:text-sm text-blue-100 leading-relaxed max-w-2xl font-medium">
              {description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-md border border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">ZA</div>
                <div className="inline-block h-8 w-8 rounded-md border border-white bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">AR</div>
                <div className="inline-block h-8 w-8 rounded-md border border-white bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">FK</div>
              </div>
              <span className="text-xs font-bold text-blue-200 font-mono">
                <strong className="text-amber-300 text-sm">{dbLearnerCount > 0 ? `${dbLearnerCount} Active Learners` : "Corporate Curriculum"}</strong>
              </span>
            </div>
          </div>

          <div className="bg-blue-950/80 backdrop-blur-md p-6 rounded-xl border-2 border-blue-400 text-center space-y-4 shadow-[4px_4px_0px_0px_#1e3a8a]">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-blue-200 uppercase tracking-widest font-extrabold">Professional Designation</span>
              <p className="text-lg md:text-xl font-extrabold font-mono text-white">
                {registryCourse.credential ? (registryCourse.credential.designation.includes("CCDAS") ? "CCDAS Designation" : "CCFCM Designation") : "Verified Certificate"}
              </p>
              {registryCourse.credential && (
                <p className="text-[10px] font-mono text-emerald-300 font-bold leading-tight">
                  {registryCourse.credential.designation}
                </p>
              )}
            </div>

            <Link
              href={`/learn/${pathSlug}/${courseSlug}/${dynamicModules[0]?.lessons[0]?.slug || "lesson-1"}`}
              className="w-full py-4 px-6 rounded-lg text-xs font-extrabold text-white bg-[#3B5BDB] hover:bg-[#2F4AC0] transition-all shadow-[4px_4px_0px_0px_#1e3a8a] border-2 border-blue-400 flex items-center justify-center gap-2 uppercase tracking-wider font-mono"
            >
              <Play size={15} className="fill-current" />
              <span>{courseProgress > 0 ? "Continue Course" : "Start Course"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── QUICK METRICS GRID BAR ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl border-2 border-[#10b981]/50 text-center space-y-1 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
          <Layers size={22} className="mx-auto text-[#10b981] mb-1" />
          <p className="text-xl font-extrabold font-mono" style={{ color: "var(--corp-text)" }}>{dynamicModules.length}</p>
          <p className="text-[11px] font-extrabold uppercase font-mono text-corp-text-tertiary">Total Modules</p>
        </div>

        <div className="p-4 rounded-xl border-2 border-[#10b981]/50 text-center space-y-1 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
          <CheckSquare size={22} className="mx-auto text-amber-500 mb-1" />
          <p className="text-xl font-extrabold font-mono" style={{ color: "var(--corp-text)" }}>{lessonsCount}</p>
          <p className="text-[11px] font-extrabold uppercase font-mono text-corp-text-tertiary">Lectures & Builds</p>
        </div>

        <div className="p-4 rounded-xl border-2 border-[#10b981]/50 text-center space-y-1 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
          <Clock size={22} className="mx-auto text-emerald-500 mb-1" />
          <p className="text-xl font-extrabold font-mono" style={{ color: "var(--corp-text)" }}>{hoursCount}h</p>
          <p className="text-[11px] font-extrabold uppercase font-mono text-corp-text-tertiary">
            {registryCourse.lectureHours ? `${registryCourse.lectureHours}h Lec + ${registryCourse.buildHours}h Build` : "Hours Content"}
          </p>
        </div>

        <div className="p-4 rounded-xl border-2 border-[#10b981]/50 text-center space-y-1 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
          <Download size={22} className="mx-auto text-blue-500 mb-1" />
          <p className="text-xl font-extrabold font-mono" style={{ color: "var(--corp-text)" }}>
            {registryCourse.miniProjects ? `0${registryCourse.miniProjects.length}` : "04"}
          </p>
          <p className="text-[11px] font-extrabold uppercase font-mono text-corp-text-tertiary">
            {registryCourse.miniProjects ? "Mini-Projects" : "Datasets/Memos"}
          </p>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-xl border-2 border-[#10b981]/50 text-center space-y-1 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
          <Award size={22} className="mx-auto text-purple-500 mb-1" />
          <p className="text-xs font-extrabold text-emerald-500 mt-1 uppercase font-mono">
            {registryCourse.credential ? (registryCourse.credential.designation.includes("CCDAS") ? "CCDAS" : "CCFCM") : "Included"}
          </p>
          <p className="text-[11px] font-extrabold uppercase font-mono text-corp-text-tertiary">Designation</p>
        </div>
      </div>

      {/* ─── MAIN CONTENT GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* What You'll Master */}
          <div className="rounded-xl p-6 sm:p-8 border-2 border-[#10b981]/50 space-y-4 shadow-[5px_5px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
            <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
              <CheckCircle2 size={20} className="text-[#10b981]" /> What You'll Master
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {whatYouWillLearn.map((itemStr) => (
                <div key={itemStr} className="flex items-start gap-3 text-xs font-bold" style={{ color: "var(--corp-text-secondary)" }}>
                  <div className="w-5 h-5 rounded-md bg-[#10b981] text-emerald-950 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#10b981]">
                    <Check size={13} />
                  </div>
                  <span>{itemStr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Skill Outcomes */}
          <div className="rounded-xl p-6 sm:p-8 border-2 border-[#10b981]/50 space-y-4 shadow-[5px_5px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
            <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
              <Brain size={20} className="text-[#10b981]" /> Top Ranked Workplace Competencies
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {skillsList.map((skill: string) => (
                <span key={skill} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-extrabold bg-corp-bg-secondary border-2 border-corp-border text-corp-text uppercase font-mono">
                  <Check size={13} className="text-[#10b981]" /> {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ─── 5 ENTERPRISE MINI-PROJECTS SHOWCASE ─── */}
          {registryCourse.miniProjects && (
            <div className="rounded-xl p-6 sm:p-8 border-2 border-amber-500/50 space-y-4 shadow-[5px_5px_0px_0px_rgba(245,158,11,0.25)]" style={{ background: "var(--corp-surface)" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                  <Trophy size={20} className="text-amber-500" /> 5 Enterprise Mini-Projects
                </h2>
                <span className="text-xs font-mono font-bold text-amber-400">Practical Work Products</span>
              </div>
              <p className="text-xs text-corp-text-secondary leading-relaxed">
                Build 5 production-grade modeling files across the curriculum to prove practical unassisted capability before undertaking the live build examination.
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {registryCourse.miniProjects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-lg bg-corp-bg-secondary border border-corp-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-amber-400 uppercase">
                        Mini-Project {proj.id} · {proj.duration}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Auditable .xlsx
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold" style={{ color: "var(--corp-text)" }}>
                      {proj.title}
                    </h3>
                    <p className="text-xs text-corp-text-secondary leading-relaxed font-medium">
                      {proj.description}
                    </p>
                    <p className="text-[11px] font-mono text-corp-text-tertiary">
                      <strong className="text-corp-text font-bold">Deliverable:</strong> {proj.deliverable}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── 5 ENTERPRISE CAPSTONE INDUSTRY OPTIONS ─── */}
          {registryCourse.capstoneOptions && (
            <div className="rounded-xl p-6 sm:p-8 border-2 border-blue-500/50 space-y-5 shadow-[5px_5px_0px_0px_rgba(59,130,246,0.25)]" style={{ background: "var(--corp-surface)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                    <Briefcase size={20} className="text-blue-500" /> Choose Your Enterprise Capstone
                  </h2>
                  <p className="text-xs text-corp-text-secondary mt-1">Select one industry vertical aligned with your corporate career target</p>
                </div>
              </div>

              {/* Selector Tabs */}
              <div className="flex flex-wrap gap-2">
                {registryCourse.capstoneOptions.map((opt, idx) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCapstoneIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold border transition-all ${selectedCapstoneIdx === idx ? "bg-blue-600 text-white border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]" : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-blue-400"}`}
                  >
                    Track {opt.id}: {opt.industry.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Active Capstone Detail Card */}
              {(() => {
                const opt = registryCourse.capstoneOptions[selectedCapstoneIdx];
                return (
                  <div className="p-5 rounded-xl bg-corp-bg-secondary border-2 border-corp-border space-y-3 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-corp-border pb-2">
                      <h3 className="text-sm font-extrabold text-corp-text">{opt.title}</h3>
                      <span className="text-[11px] font-extrabold text-blue-400 uppercase">{opt.industry}</span>
                    </div>
                    <div className="space-y-2 text-corp-text-secondary leading-relaxed">
                      <p><strong className="text-corp-text">Business Context:</strong> {opt.context}</p>
                      <p><strong className="text-corp-text">Dataset Scope:</strong> {opt.dataset}</p>
                      <p><strong className="text-corp-text">Core Deliverables:</strong> {opt.deliverables}</p>
                      <p className="text-emerald-400 font-bold"><strong className="text-corp-text">Career Alignment:</strong> {opt.careerAlignment}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ─── 5-TIER ASSESSMENT & LIVE DEFENSE ARCHITECTURE ─── */}
          {registryCourse.assessmentTiers && (
            <div className="rounded-xl p-6 sm:p-8 border-2 border-purple-500/50 space-y-4 shadow-[5px_5px_0px_0px_rgba(168,85,247,0.25)]" style={{ background: "var(--corp-surface)" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                  <Award size={20} className="text-purple-400" /> 5-Tier Verification & Model Defense
                </h2>
                <span className="text-xs font-mono font-bold text-purple-400">Zero Unverified MCQs</span>
              </div>
              <p className="text-xs text-corp-text-secondary leading-relaxed">
                Replace unverified attendance certificates with documented, auditable proof of practical execution.
              </p>

              <div className="space-y-2.5 pt-2">
                {registryCourse.assessmentTiers.map((tier) => (
                  <div key={tier.tier} className="p-3.5 rounded-lg bg-corp-bg-secondary border border-corp-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-purple-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                          {tier.tier}
                        </span>
                        <span className="font-extrabold text-corp-text">{tier.name}</span>
                      </div>
                      <p className="text-[11px] text-corp-text-tertiary pl-7">{tier.format}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-extrabold bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0 self-start sm:self-center">
                      {tier.criteria}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Modules Curriculum Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>Course Modules & Detailed Syllabus</h2>
              <span className="text-xs font-mono font-extrabold text-corp-text-tertiary">
                {dynamicModules.length} Modules · {lessonsCount} Lectures
              </span>
            </div>

            <div className="space-y-4">
              {dynamicModules.map((mod, mIdx) => {
                const isOpen = openModuleIndex === mIdx;
                return (
                  <div key={mod.title} className="rounded-xl border-2 border-[#10b981]/50 overflow-hidden transition-all shadow-[4px_4px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
                    <button onClick={() => toggleModule(mIdx)} className="w-full p-5 flex items-center justify-between text-left hover:bg-corp-bg-secondary transition-colors">
                      <div className="space-y-1 pr-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-md bg-[#10b981] text-emerald-950 font-mono font-extrabold text-xs flex items-center justify-center border border-emerald-400">
                            {mIdx + 1}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold" style={{ color: "var(--corp-text)" }}>{mod.title}</h3>
                        </div>
                        <p className="text-xs text-corp-text-tertiary line-clamp-1 font-medium pl-9.5">{mod.description}</p>
                      </div>
                      <ChevronDown size={20} className={cn("transition-transform duration-200", isOpen ? "rotate-180 text-[#10b981]" : "text-corp-text-tertiary")} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="border-t-2 border-corp-border divide-y-2 divide-corp-border">
                          {mod.lessons.map((lesson) => (
                            <Link key={lesson.slug} href={`/learn/${pathSlug}/${courseSlug}/${lesson.slug}`} className="group flex items-center justify-between p-4 pl-8 hover:bg-corp-bg-secondary transition-colors">
                              <div className="flex items-center gap-3.5">
                                <div className="w-8 h-8 rounded-md bg-[#10b981] text-emerald-950 flex items-center justify-center border border-emerald-400">
                                  <Play size={14} className="fill-current" />
                                </div>
                                <div>
                                  <p className="text-xs font-extrabold group-hover:text-[#3B5BDB] transition-colors" style={{ color: "var(--corp-text)" }}>{lesson.title}</p>
                                  <span className="text-[10px] text-corp-text-tertiary font-mono font-bold flex items-center gap-1">
                                    <Clock size={11} className="text-[#3B5BDB]" />
                                    <span>{lesson.duration}</span>
                                    {lesson.type && <span className="uppercase text-[9px] px-1.5 py-0.2 rounded bg-corp-surface border border-corp-border ml-1">{lesson.type}</span>}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight size={16} className="text-corp-text-tertiary group-hover:text-[#3B5BDB] transition-colors" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Box */}
        <div className="space-y-6">
          {/* CCFCM Career Passport Card */}
          <div className="rounded-xl p-6 border-2 border-emerald-500/70 space-y-4 shadow-[5px_5px_0px_0px_rgba(16,185,129,0.25)] text-center" style={{ background: "var(--corp-surface)" }}>
            <Award size={36} className="mx-auto text-emerald-500" />
            <h3 className="text-base font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
              {registryCourse.credential ? "CCFCM Designation" : "Verified Digital Certificate"}
            </h3>
            <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--corp-text-secondary)" }}>
              {registryCourse.credential
                ? "Certified Corporate Financial & Commercial Modeler designation issued with the auditable INSYT Career Passport."
                : "Official cryptographic credential issued upon completing all course modules & capstone deliverables."}
            </p>
            <Link href={`/learn/${pathSlug}/${courseSlug}/${dynamicModules[0]?.lessons[0]?.slug || "lesson-1"}`} className="w-full py-3.5 rounded-lg text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[3px_3px_0px_0px_#047857] border-2 border-emerald-400 block uppercase font-mono tracking-wider">
              {courseProgress > 0 ? "Resume Masterclass" : "Enroll & Start Course"}
            </Link>
          </div>

          {/* Pricing Architecture Card */}
          {registryCourse.pricingTiers && (
            <div className="rounded-xl p-6 border-2 border-corp-border space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" style={{ background: "var(--corp-surface)" }}>
              <div className="text-left border-b border-corp-border pb-3">
                <span className="text-[10px] font-mono uppercase text-corp-text-tertiary font-extrabold">Commercial Enrollment</span>
                <h3 className="text-sm font-extrabold font-mono uppercase text-corp-text">Corporate Pricing Tiers</h3>
              </div>

              <div className="space-y-3 text-left font-mono text-xs">
                {registryCourse.pricingTiers.slice(0, 3).map((tier) => (
                  <div key={tier.tier} className="p-3 rounded-lg bg-corp-bg-secondary border border-corp-border space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-corp-text">{tier.name}</span>
                      <span className="font-extrabold text-emerald-400">৳ {tier.priceBdt.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-corp-text-tertiary">{tier.target}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/subscription"
                className="w-full py-2.5 px-4 rounded-lg text-xs font-mono font-bold text-corp-text bg-corp-bg-secondary border border-corp-border hover:border-emerald-400 block text-center uppercase tracking-wider"
              >
                View Full Subscription Packs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
