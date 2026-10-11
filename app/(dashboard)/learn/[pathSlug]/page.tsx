"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, Clock, Users, Star, Award,
  CheckCircle2, Play, Lock, ChevronRight, TrendingUp,
  Landmark, BarChart3, Presentation, Briefcase, Brain, Languages, FileText,
  GraduationCap, Sparkles, Target, RotateCcw, Loader2, Check, ExternalLink,
  ShieldCheck, HelpCircle, FileCheck, Layers, Video, FileSpreadsheet, Bot
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { ALL_PATHS } from "@/lib/data/courses";
import { toBanglaDigits, getCapCutCourseStats } from "@/lib/data/capcut-master-academy";
import { databases } from "@/lib/appwrite";
import { DB_CONFIG } from "@/lib/db";
import { Query } from "appwrite";

import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ pathSlug: string }>;
}

const iconMap: Record<string, any> = {
  GraduationCap, Landmark, BarChart3, Presentation, Briefcase,
  Users, Brain, Languages, FileText, Award, Target, Video, FileSpreadsheet, Bot
};

const themeGradients: Record<string, { bg: string; border: string; shadow: string; btn: string }> = {
  "ai-workplace-professional": {
    bg: "from-[#083344] via-[#155e75] to-[#0f172a]",
    border: "border-cyan-400",
    shadow: "#0891b2",
    btn: "bg-[#06b6d4] hover:bg-cyan-400 text-cyan-950 shadow-[3px_3px_0px_0px_#164e63] border-2 border-cyan-300"
  },
  "enterprise-data-analyst": {
    bg: "from-[#1e3a8a] via-[#1e40af] to-[#0f172a]",
    border: "border-blue-400",
    shadow: "#2563eb",
    btn: "bg-[#2563eb] hover:bg-blue-600 text-white shadow-[3px_3px_0px_0px_#1e3a8a] border-2 border-blue-300"
  },
  "business-automation-specialist": {
    bg: "from-[#1e1b4b] via-[#312e81] to-[#0f172a]",
    border: "border-indigo-400",
    shadow: "#4338ca",
    btn: "bg-[#4f46e5] hover:bg-indigo-600 text-white shadow-[3px_3px_0px_0px_#312e81] border-2 border-indigo-300"
  },
  "corporate-career-accelerator": {
    bg: "from-[#064e3b] via-[#047857] to-[#0f172a]",
    border: "border-emerald-400",
    shadow: "#059669",
    btn: "bg-[#059669] hover:bg-emerald-600 text-white shadow-[3px_3px_0px_0px_#064e3b] border-2 border-emerald-300"
  },
  "corporate-analyst": {
    bg: "from-[#1e3a8a] via-[#1e40af] to-[#0f172a]",
    border: "border-blue-400",
    shadow: "#2563eb",
    btn: "bg-[#2563eb] hover:bg-blue-600 text-white shadow-[3px_3px_0px_0px_#1e3a8a] border-2 border-blue-300"
  },
  "mto-fast-track": {
    bg: "from-[#064e3b] via-[#047857] to-[#0f172a]",
    border: "border-emerald-400",
    shadow: "#059669",
    btn: "bg-[#059669] hover:bg-emerald-600 text-white shadow-[3px_3px_0px_0px_#064e3b] border-2 border-emerald-300"
  },
  "digital-media-production": {
    bg: "from-[#2e1065] via-[#581c87] to-[#0f172a]",
    border: "border-purple-400",
    shadow: "#7e22ce",
    btn: "bg-[#8b5cf6] hover:bg-purple-500 text-white shadow-[3px_3px_0px_0px_#4c1d95] border-2 border-purple-300"
  },
  "video-ai-production": {
    bg: "from-[#2e1065] via-[#581c87] to-[#0f172a]",
    border: "border-purple-400",
    shadow: "#7e22ce",
    btn: "bg-[#8b5cf6] hover:bg-purple-500 text-white shadow-[3px_3px_0px_0px_#4c1d95] border-2 border-purple-300"
  },
  "presentation-engineering": {
    bg: "from-[#451a03] via-[#78350f] to-[#0f172a]",
    border: "border-amber-400",
    shadow: "#d97706",
    btn: "bg-[#f59e0b] hover:bg-amber-400 text-amber-950 shadow-[3px_3px_0px_0px_#78350f] border-2 border-amber-300"
  },
  "ai-for-work": {
    bg: "from-[#083344] via-[#155e75] to-[#0f172a]",
    border: "border-cyan-400",
    shadow: "#0891b2",
    btn: "bg-[#06b6d4] hover:bg-cyan-400 text-cyan-950 shadow-[3px_3px_0px_0px_#164e63] border-2 border-cyan-300"
  },
  "gre-preparation": {
    bg: "from-[#4c0519] via-[#881337] to-[#0f172a]",
    border: "border-rose-400",
    shadow: "#e11d48",
    btn: "bg-[#e11d48] hover:bg-rose-600 text-white shadow-[3px_3px_0px_0px_#881337] border-2 border-rose-300"
  },
};

export default function PathDetailPage(props: PageProps) {
  const router = useRouter();
  const { state, enrollInPath } = useUser();
  const params = use(props.params);
  const pathSlug = params?.pathSlug || "video-ai-production";

  useEffect(() => {
    if (!ALL_PATHS[pathSlug] || pathSlug === "excel-corporate" || pathSlug === "corporate-mto") {
      router.replace("/learn");
    }
  }, [pathSlug, router]);

  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  // Fallback data from static catalog if Appwrite is syncing
  const localPath = ALL_PATHS[pathSlug] || ALL_PATHS["video-ai-production"];
  const theme = themeGradients[pathSlug] || themeGradients["video-ai-production"];

  const [pathDoc, setPathDoc] = useState<any>(null);
  const [coursesDocs, setCoursesDocs] = useState<any[]>([]);
  const [realLearnerCount, setRealLearnerCount] = useState<number | null>(null);
  const capcutStats = getCapCutCourseStats();

  if (!ALL_PATHS[pathSlug] || pathSlug === "excel-corporate" || pathSlug === "corporate-mto") {
    return null;
  }

  useEffect(() => {
    let isMounted = true;
    async function loadAppwritePathAndCourses() {
      try {
        setLoading(true);
        // Real active registered learners from Appwrite profiles collection
        try {
          const profilesRes = await databases.listDocuments(
            DB_CONFIG.databaseId,
            DB_CONFIG.collections.profiles,
            [Query.limit(1)]
          );
          if (isMounted && profilesRes.total !== undefined) {
            setRealLearnerCount(profilesRes.total);
          }
        } catch {
          // ignore profile fetch error
        }

        const pathRes = await databases.listDocuments(
          DB_CONFIG.databaseId,
          DB_CONFIG.collections.paths,
          [Query.equal("slug", pathSlug)]
        );
        if (isMounted && pathRes.documents.length > 0) {
          setPathDoc(pathRes.documents[0]);
        }

        const coursesRes = await databases.listDocuments(
          DB_CONFIG.databaseId,
          DB_CONFIG.collections.courses,
          [Query.equal("pathSlug", pathSlug), Query.limit(50)]
        );
        if (isMounted && coursesRes.documents.length > 0) {
          setCoursesDocs(coursesRes.documents);
        }
      } catch (err) {
        console.warn("[Appwrite] Using local path catalog for:", pathSlug, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAppwritePathAndCourses();
    return () => { isMounted = false; };
  }, [pathSlug]);

  const isEnrolled = state.enrolledPathSlugs.includes(pathSlug);

  const title = pathDoc?.title || localPath.title;
  const description = pathDoc?.description || localPath.description;
  const iconName = pathDoc?.icon || localPath.icon || "Video";
  const Icon = iconMap[iconName] || Video;

  // For video-ai-production, always strictly use canonical 4-course masterclass sequence
  const activeCoursesList = pathSlug === "video-ai-production"
    ? (localPath.courses || [])
    : (coursesDocs.length > 0 ? coursesDocs : (localPath.courses || []));

  const dynamicCourses = activeCoursesList.map((c: any, index: number) => {
    const courseProgressObj = state.courseProgress.find((cp) => cp.id === c.slug);
    const progress = courseProgressObj ? courseProgressObj.progress : 0;
    const completed = progress === 100;
    const locked = !isEnrolled && index > 0;
    const isCapCut = c.slug === "capcut-complete-course" || (pathSlug === "video-ai-production" && index === 0);

    return {
      slug: c.slug,
      pathSlug: c.pathSlug || pathSlug,
      title: c.title,
      description: c.description,
      lessons: isCapCut ? capcutStats.totalModules : (c.lessons || 5),
      hours: isCapCut ? capcutStats.totalHours : (c.hours || 6),
      skills: c.skills || ["Skill Mastery", "Practical Execution"],
      completed,
      locked,
      progress
    };
  });

  const totalHours = dynamicCourses.reduce((acc, c) => acc + c.hours, 0) || capcutStats.totalHours;
  const totalLessons = dynamicCourses.reduce((acc, c) => acc + c.lessons, 0) || capcutStats.totalModules;
  const overallProgress = dynamicCourses.length > 0
    ? Math.round(dynamicCourses.reduce((acc, c) => acc + c.progress, 0) / dynamicCourses.length)
    : 0;

  const handleEnroll = () => {
    if (isEnrolled) return;
    setEnrolling(true);
    enrollInPath(pathSlug, title);
    setTimeout(() => {
      setEnrolling(false);
    }, 600);
  };

  const whatYouWillLearn = localPath.whatYouWillLearn || [
    "Master foundational principles, tools, and execution rhythm.",
    "Build tangible, production-grade artifacts and deliverables.",
    "Learn advanced shortcuts, professional standards, and precision workflows.",
    "Validate your work with rigorous real-world testing criteria."
  ];

  const skillsYouWillGain = localPath.skills || [
    "Hands-on Execution", "Tool Mastery", "Problem Solving", "Professional Workflow"
  ];

  const capstoneDeliverable = localPath.capstoneDeliverable || 
    "Throughout this masterclass, you will produce tangible portfolio assets and complete verified stage deliverables.";

  return (
    <div className="w-full space-y-10 pb-24 px-4 sm:px-8 lg:px-12">
      
      {/* ── BREADCRUMB & BACK LINK ── */}
      <div className="pt-4 flex items-center justify-between">
        <Link href="/learn" className="inline-flex items-center gap-2 text-xs font-extrabold font-mono text-corp-text-secondary hover:text-[#3B5BDB] transition-colors">
          <ArrowLeft size={14} /> Back to Courses
        </Link>
        <span className="text-xs font-mono font-extrabold text-corp-text-tertiary uppercase">
          Masterclass ID: {pathSlug}
        </span>
      </div>

      {/* ── HERO HEADER BANNER ── */}
      <div 
        className={`rounded-xl p-6 md:p-10 text-white bg-gradient-to-r ${theme.bg} border-2 ${theme.border} relative overflow-hidden`}
        style={{ boxShadow: `6px 6px 0px 0px ${theme.shadow}` }}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase font-mono tracking-wider bg-[#3B5BDB] text-white border border-blue-400 shadow-xs flex items-center gap-1">
                <Sparkles size={13} className="inline mr-1" /> Flagship Masterclass
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-blue-50 text-blue-900 border border-blue-200 shadow-xs flex items-center gap-1.5">
                <Users size={13} className="text-[#3B5BDB]" />
                <span>
                  {realLearnerCount !== null && realLearnerCount > 0
                    ? `${realLearnerCount} Active Learners`
                    : "Verified Curriculum"}
                </span>
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-xs flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>W3C Standard</span>
              </span>
              {localPath.uniqueFeature && (
                <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-white/20 text-white border border-white/30 shadow-xs flex items-center gap-1">
                  <Sparkles size={13} className="text-amber-300 inline mr-1" />
                  <span>{localPath.uniqueFeature}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white uppercase font-mono">
              {title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-2xl font-medium">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono font-extrabold text-slate-200">
              <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-amber-300" /> {dynamicCourses.length} Stages</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-amber-300" /> ~{totalHours} Hours</span>
              <span className="flex items-center gap-1.5"><Target size={14} className="text-amber-300" /> {totalLessons} Lessons</span>
              <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-300" /> Verified Credential</span>
            </div>
          </div>

          {/* Enrollment Card Widget */}
          <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-white/30 space-y-5 text-center shadow-md">
            {isEnrolled ? (
              <div className="space-y-4">
                <div className="px-3 py-1.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400 font-mono text-xs font-extrabold flex items-center justify-center gap-2 uppercase">
                  <CheckCircle2 size={16} /> Learner Status: Enrolled
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-extrabold text-white">
                    <span>Overall Progress</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                    <div className="h-full bg-[#3B5BDB] transition-all duration-500" style={{ width: `${overallProgress}%` }} />
                  </div>
                </div>
                {dynamicCourses.length > 0 && (
                  <Link
                    href={`/learn/${pathSlug}/${dynamicCourses[0].slug}`}
                    className="w-full py-3.5 px-6 rounded-lg text-xs font-extrabold text-white bg-[#3B5BDB] hover:bg-[#2F4AC0] transition-all shadow-xs border border-blue-400 flex items-center justify-center gap-2 uppercase font-mono tracking-wider"
                  >
                    <Play size={15} className="fill-current" />
                    <span>Continue Masterclass</span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest font-extrabold">Instant Access</span>
                  <p className="text-2xl font-extrabold font-mono text-white">100% Free Trial</p>
                  <p className="text-[11px] text-slate-300 font-medium">Verified Curriculum &amp; Portfolio Assessment</p>
                </div>
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-4 px-6 rounded-lg text-xs font-extrabold text-white bg-[#3B5BDB] hover:bg-[#2F4AC0] transition-all shadow-xs border border-blue-400 flex items-center justify-center gap-2 uppercase font-mono tracking-wider disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  <span>{enrolling ? "Enrolling Masterclass..." : "Enroll in Masterclass"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Syllabus & Learning Outcomes */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* What You'll Learn Box */}
          <div className="rounded-xl p-6 sm:p-8 border border-blue-200/80 space-y-4 shadow-xs" style={{ background: "var(--corp-surface)" }}>
            <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
              <CheckCircle2 size={20} className="text-[#3B5BDB]" /> What You'll Learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {whatYouWillLearn.map((itemStr: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-bold leading-relaxed" style={{ color: "var(--corp-text-secondary)" }}>
                  <div className="w-5 h-5 rounded-md bg-blue-50 text-[#3B5BDB] flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                    <Check size={13} />
                  </div>
                  <span>{itemStr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Tools You'll Gain */}
          <div className="rounded-xl p-6 sm:p-8 border border-blue-200/80 space-y-4 shadow-xs" style={{ background: "var(--corp-surface)" }}>
            <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
              <Brain size={20} className="text-[#3B5BDB]" /> Skills &amp; Competencies Gained
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {skillsYouWillGain.map((skill: string) => (
                <span key={skill} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-extrabold bg-corp-bg-secondary border border-corp-border text-corp-text uppercase font-mono">
                  <Check size={13} className="text-[#3B5BDB]" /> {skill}
                </span>
              ))}
            </div>
          </div>

          {/* STAGES BREAKDOWN */}
          <div id="course-curriculum" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                Masterclass Curriculum — {dynamicCourses.length} Comprehensive Courses
              </h2>
              <span className="text-xs font-mono font-extrabold text-corp-text-tertiary">
                ~{totalHours} Hours Total Curriculum
              </span>
            </div>

            <div className="space-y-4">
              {dynamicCourses.map((c, index) => {
                const isCapCutMaster = c.slug === "capcut-complete-course" || (pathSlug === "video-ai-production" && index === 0);

                if (isCapCutMaster && pathSlug === "video-ai-production") {
                  return (
                    <div
                      key={c.slug}
                      className="group rounded-2xl p-6 sm:p-8 border border-blue-200/80 transition-all shadow-[0_4px_24px_rgba(59,91,219,0.06)] hover:shadow-[0_8px_30px_rgba(59,91,219,0.12)] space-y-5 relative overflow-hidden bg-white"
                      style={{
                        background: "linear-gradient(135deg, #EEF2FF 0%, rgba(75, 148, 224, 0.12) 50%, #FFFFFF 100%)",
                      }}
                    >
                      {/* Borderless CapCut SVG Logo in the top right corner */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none opacity-90 transition-transform group-hover:scale-105">
                        <img
                          src="/images/capcut-icon-clean.svg"
                          alt="CapCut Logo"
                          className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                        <div className="space-y-2 flex-1 max-w-3xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-blue-50 text-blue-900 border border-blue-200">
                              COURSE 1 OF {dynamicCourses.length}
                            </span>
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase bg-indigo-50 text-indigo-900 border border-indigo-200">
                              {toBanglaDigits(capcutStats.totalModules)}টি মডিউল · {toBanglaDigits(capcutStats.totalStages)}টি স্টেজ · {toBanglaDigits(capcutStats.totalProjects)}টি প্রজেক্ট
                            </span>
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/80 text-slate-800 border border-slate-300">
                              ৮০% রুব্রিক বেঞ্চমার্ক
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black font-mono text-slate-950 uppercase tracking-tight">
                            {c.title}
                          </h3>
                          <p className="text-sm text-slate-700 leading-relaxed font-bangla font-medium">
                            {c.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-slate-800 pt-1">
                            <span className="flex items-center gap-1.5">
                              <Clock size={14} className="text-[#3B5BDB]" /> ~{toBanglaDigits(capcutStats.totalHours)} ঘণ্টা কারিকুলাম
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              <Target size={14} className="text-[#3B5BDB]" /> {toBanglaDigits(capcutStats.totalProjects)}টি মাইলস্টোন প্রজেক্ট
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              <Award size={14} className="text-[#3B5BDB]" /> অফিসিয়াল ভেরিফাইড সার্টিফিকেট
                            </span>
                          </div>
                        </div>

                        <div className="flex-shrink-0 pt-2 md:pt-0">
                          <Link
                            href="/learn/capcut-master-academy"
                            className="py-3 px-6 rounded-xl text-xs font-mono font-black bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white transition-all shadow-xs border border-[#3B5BDB] flex items-center gap-2 uppercase tracking-wider"
                          >
                            <Play size={15} fill="currentColor" className="text-white" />
                            <span className="font-bangla">কোর্স শুরু করুন (Launch Hub)</span>
                          </Link>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-blue-100 flex flex-wrap items-center justify-between text-xs font-mono font-bold text-slate-700 gap-2 relative z-10">
                        <span className="font-bangla">{toBanglaDigits(capcutStats.totalModules)}টি পূর্ণাঙ্গ লেকচার ও প্র্যাকটিক্যাল এক্সারসাইজ</span>
                        <span className="text-[#3B5BDB] font-bangla font-black">মাস্টার সার্টিফিকেশন ও ফাইনাল ক্যাপস্টোন</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={c.slug}
                    className="rounded-xl p-6 border border-blue-200/80 transition-all shadow-xs space-y-4"
                    style={{ background: "var(--corp-surface)" }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-md bg-[#3B5BDB] text-white font-mono font-extrabold text-xs flex items-center justify-center border border-blue-400">
                            {index + 1}
                          </span>
                          <span className="text-xs font-mono font-extrabold text-[#3B5BDB] uppercase">
                            Course {index + 1} of {dynamicCourses.length} • {c.hours} Hours
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold pt-1 font-mono" style={{ color: "var(--corp-text)" }}>
                          {c.title}
                        </h3>
                        <p className="text-xs text-corp-text-secondary leading-relaxed font-bangla font-medium">
                          {c.description}
                        </p>
                      </div>

                      {c.locked ? (
                        <div className="px-4 py-2.5 rounded-lg text-xs font-mono font-extrabold bg-corp-bg-secondary text-corp-text-tertiary border border-corp-border flex items-center gap-2 flex-shrink-0">
                          <Lock size={14} /> Enroll to Unlock
                        </div>
                      ) : (
                        <Link
                          href={`/learn/${pathSlug}/${c.slug}`}
                          className="px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 uppercase font-mono tracking-wider flex-shrink-0 bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white shadow-xs border border-[#3B5BDB]"
                        >
                          <Play size={13} fill="currentColor" />
                          <span>{c.progress > 0 ? "Continue Course" : "Start Course"}</span>
                        </Link>
                      )}
                    </div>

                    <div className="pt-3 border-t border-corp-border flex items-center justify-between text-xs font-mono font-bold text-corp-text-tertiary">
                      <span>{c.lessons} Lectures &amp; Practical Exercises</span>
                      <span className="text-[#3B5BDB]">Verified Skill Outcome</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Applied Learning Project Section */}
          <div className="rounded-xl p-6 sm:p-8 border border-blue-200/80 space-y-3 shadow-xs" style={{ background: "var(--corp-surface)" }}>
            <h2 className="text-lg font-extrabold flex items-center gap-2 tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
              <Layers size={20} className="text-[#3B5BDB]" /> Stage Deliverables &amp; Portfolio Artifacts
            </h2>
            <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--corp-text-secondary)" }}>
              {capstoneDeliverable}
            </p>
          </div>

        </div>

        {/* Right Sidebar: Certificate & Details */}
        <div className="space-y-6">
          <div className="rounded-xl p-6 border border-blue-200/80 space-y-4 shadow-xs text-center" style={{ background: "var(--corp-surface)" }}>
            <Award size={40} className="mx-auto text-[#3B5BDB]" />
            <h3 className="text-base font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>Verified Digital Credential</h3>
            <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--corp-text-secondary)" }}>
              Add this official skill credential to your LinkedIn profile, resume, or CV upon completing all staged modules and practical assessments.
            </p>
            <div className="p-3 rounded-lg bg-corp-bg-secondary border border-corp-border text-left space-y-1.5 text-xs font-mono">
              <p className="font-extrabold text-[#3B5BDB] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#3B5BDB]" /> Skill-Verified Certificate
              </p>
              <p className="font-extrabold text-[#3B5BDB] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#3B5BDB]" /> Cryptographically Verified
              </p>
              <p className="font-extrabold text-[#3B5BDB] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#3B5BDB]" /> Shareable on LinkedIn
              </p>
            </div>
          </div>

          {localPath.uniqueFeature && (
            <div className="rounded-xl p-6 border border-amber-400/60 space-y-3 shadow-xs bg-amber-50/20" style={{ background: "var(--corp-surface)" }}>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-extrabold bg-amber-100 text-amber-950 uppercase border border-amber-300">
                Included Gym
              </span>
              <h4 className="text-sm font-extrabold font-mono uppercase flex items-center gap-1.5" style={{ color: "var(--corp-text)" }}>
                <Sparkles size={14} className="text-amber-500" />
                <span>{localPath.uniqueFeature}</span>
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: "var(--corp-text-secondary)" }}>
                {localPath.uniqueFeatureDesc}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
