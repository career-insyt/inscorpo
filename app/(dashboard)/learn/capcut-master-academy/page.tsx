"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Video, Play, CheckCircle2, Award, Clock, Star, Download,
  Layers, Sparkles, BookOpen, ArrowRight, ShieldCheck, Lock,
  ChevronDown, ChevronUp, FileText, Music, Sliders, ExternalLink,
  Flame, Check, AlertCircle, Share2, Eye
} from "lucide-react";
import {
  CAPCUT_STAGES,
  CAPCUT_MODULES,
  CAPCUT_PROJECT_LADDER,
  SPECIALIZATION_TRACKS,
  MASTER_SKILL_CATEGORIES,
  CapCutModule,
  DownloadableResource,
  getCapCutCourseStats,
  toBanglaDigits
} from "@/lib/data/capcut-master-academy";
import { useCapCutCourse } from "@/lib/state/capcut-submissions";
import { triggerResourceDownload } from "@/lib/utils/download-helper";

export default function CapCutMasterAcademyPage() {
  const { state, metrics, toggleModuleComplete, claimCertificate } = useCapCutCourse();
  const capcutStats = getCapCutCourseStats();
  const [activeTab, setActiveTab] = useState<"curriculum" | "projects" | "resources" | "specializations" | "skills" | "certificate">("curriculum");
  const [expandedStages, setExpandedStages] = useState<number[]>([0, 1]);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [studentNameInput, setStudentNameInput] = useState(state.studentName || "Zubair Pro Editor");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const toggleStage = (stageId: number) => {
    setExpandedStages((prev) =>
      prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]
    );
  };

  const handleDownload = (res: DownloadableResource) => {
    setDownloadingId(res.id);
    triggerResourceDownload(res);
    setTimeout(() => setDownloadingId(null), 800);
  };

  // Collect all unique downloadable resources across all modules
  const allVaultResources: { resource: DownloadableResource; moduleTitle: string; moduleId: number }[] = [];
  CAPCUT_MODULES.forEach((mod) => {
    mod.downloadableResources.forEach((r) => {
      if (!allVaultResources.some((item) => item.resource.id === r.id)) {
        allVaultResources.push({ resource: r, moduleTitle: mod.title, moduleId: mod.id });
      }
    });
  });

  return (
    <div className="min-h-screen text-[var(--corp-text)] pb-24 font-sans selection:bg-[#3B5BDB] selection:text-white" style={{ background: "var(--corp-bg)" }}>
      {/* ── TOP BREADCRUMB & THRESHOLD METER (Full Width) ── */}
      <div className="border-b bg-[var(--corp-surface)] px-4 sm:px-8 lg:px-12 py-3.5 sticky top-0 z-30 shadow-xs" style={{ borderColor: "var(--corp-border)" }}>
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <Link href="/learn" className="text-corp-text-secondary hover:text-[#3B5BDB] transition-colors flex items-center gap-1 font-bold">
              <span>Courses</span>
            </Link>
            <span className="text-corp-text-tertiary">/</span>
            <Link href="/learn/video-ai-production" className="text-corp-text-secondary hover:text-[#3B5BDB] transition-colors font-bold">
              Video Editing &amp; Production
            </Link>
            <span className="text-corp-text-tertiary">/</span>
            <span className="text-[#3B5BDB] font-black uppercase">CapCut Complete Course</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Real Threshold Score Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold border ${
              metrics.isThresholdMet
                ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                : "bg-blue-50 border-blue-200 text-blue-900"
            }`}>
              <ShieldCheck size={14} className={metrics.isThresholdMet ? "text-emerald-600" : "text-[#3B5BDB]"} />
              <span className="font-bangla">
                স্কোর: {toBanglaDigits(metrics.cumulativeScore)}% (পাসিং বেঞ্চমার্ক: ৮০%)
              </span>
            </div>

            <button
              onClick={() => setActiveTab("certificate")}
              className={`px-3 py-1 rounded-md text-xs font-mono font-extrabold transition-all border flex items-center gap-1.5 ${
                metrics.canClaimCertificate
                  ? "bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white border-[#3B5BDB] shadow-xs"
                  : "bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400"
              }`}
            >
              {metrics.canClaimCertificate ? <Award size={14} /> : <Lock size={13} />}
              <span className="font-bangla">{metrics.canClaimCertificate ? "সার্টিফিকেট আনলকড" : "সার্টিফিকেট লকড (৮০% প্রয়োজন)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO BANNER: SAAS Color Scheme Gradient with Borderless CapCut SVG (Full Width) ── */}
      <section className="px-4 sm:px-8 lg:px-12 pt-8 pb-10">
        <div className="w-full">
          <div
            className="group rounded-2xl p-6 sm:p-10 border border-blue-200/80 shadow-[0_4px_24px_rgba(59,91,219,0.08)] relative overflow-hidden space-y-6 bg-white"
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-black uppercase bg-blue-50 text-blue-900 border border-blue-200">
                    COURSE 1 OF 3 • MASTERCLASS
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-indigo-50 border border-indigo-200 text-indigo-900">
                    Beginner → Intermediate → Advanced → Professional
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-white/80 border border-slate-300 text-slate-800">
                    CapCut Desktop • Mobile • Web
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-slate-950 leading-tight uppercase">
                  CapCut Complete Course from Beginner to Advanced
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bangla font-semibold max-w-3xl">
                  টেম্পলেটের ওপর নির্ভর না করে প্রফেশনাল এডিটর হিসেবে যেকোনো ফুটেজ থেকে বিশ্বমানের সোশ্যাল ও কমার্শিয়াল ভিডিও তৈরি করুন। ৩৬টি পূর্ণাঙ্গ মডিউল, ৮টি প্রগ্রেসিভ স্টেজ এবং ১৫টি বাস্তবসম্মত প্রজেক্ট সমন্বিত দেশের সবচেয়ে কম্প্রিহেনসিভ ভিডিও এডিটিং মাস্টারক্লাস।
                </p>

                {/* 4 Core Pillars in Bangla with Volte Bangla Font */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-bangla">
                  {[
                    { label: "টেকনিক্যাল মাস্টারি", desc: "কোনো অনুমান নয়, নিখুঁত কাট", color: "bg-white/80 border-blue-100 text-slate-900" },
                    { label: "প্রফেশনাল মাইন্ডসেট", desc: "টুলসের আগে এডিটিং ব্যাকরণ", color: "bg-white/80 border-blue-100 text-slate-900" },
                    { label: "সোশ্যাল রিটেনশন", desc: "ভাইরাল পেসিং ও ভিজ্যুয়াল হুক", color: "bg-white/80 border-blue-100 text-slate-900" },
                    { label: "টেম্পলেট নির্ভরতা মুক্ত", desc: "স্বাধীনভাবে যেকোনো এডিট", color: "bg-white/80 border-blue-100 text-slate-900" },
                  ].map((p, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${p.color} shadow-xs space-y-0.5`}>
                      <p className="text-xs font-bold text-slate-950 font-bangla">{p.label}</p>
                      <p className="text-[11px] text-slate-600 font-medium font-bangla">{p.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Meta Highlights - Dynamic real derived values */}
                <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono font-bold text-slate-800 border-t border-blue-100 font-bangla">
                  <span className="flex items-center gap-1.5"><BookOpen size={15} className="text-[#3B5BDB]" /> {toBanglaDigits(capcutStats.totalModules)}টি মডিউল</span>
                  <span className="flex items-center gap-1.5"><Layers size={15} className="text-[#3B5BDB]" /> {toBanglaDigits(capcutStats.totalStages)}টি স্টেজ</span>
                  <span className="flex items-center gap-1.5"><Sparkles size={15} className="text-[#3B5BDB]" /> {toBanglaDigits(capcutStats.totalProjects)}টি প্রজেক্ট লেডার</span>
                  <span className="flex items-center gap-1.5"><Clock size={15} className="text-[#3B5BDB]" /> ~{toBanglaDigits(capcutStats.totalHours)} ঘণ্টা কারিকুলাম</span>
                  <span className="flex items-center gap-1.5 text-blue-900"><Award size={15} className="text-[#3B5BDB]" /> ৭-ফ্যাক্টর রুব্রিক ভেরিফিকেশন</span>
                </div>
              </div>

              {/* Real Evaluation Metrics Card */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-blue-200/80 bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black uppercase text-slate-950 tracking-wider">
                      Evaluation Progress
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200 font-bangla">
                      পাসিং বেঞ্চমার্ক: ৮০%
                    </span>
                  </div>

                  {/* Cumulative Score Meter */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline font-mono">
                      <span className="text-xs font-bold text-slate-700">Cumulative Rubric Score</span>
                      <span className="text-2xl font-black text-slate-950">
                        {metrics.cumulativeScore}%
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative border border-slate-300">
                      <div
                        className={`h-full transition-all duration-700 ${
                          metrics.isScoreMet ? "bg-[#3B5BDB]" : "bg-amber-500"
                        }`}
                        style={{ width: `${Math.min(100, metrics.cumulativeScore)}%` }}
                      />
                      <div className="absolute top-0 bottom-0 w-0.5 bg-slate-700 z-10" style={{ left: "80%" }} />
                    </div>

                    <div className="flex justify-between text-[11px] font-bangla text-slate-600">
                      <span>প্রয়োজনীয় স্কোর: ৮০%</span>
                      <span>
                        {metrics.isScoreMet ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 size={13} className="inline" /> বেঞ্চমার্ক অর্জিত</span>
                        ) : (
                          <span className="text-blue-900 font-bold">আরও {toBanglaDigits(80 - metrics.cumulativeScore)}% প্রয়োজন</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Clean Real Stats (Zero Fake Progress) */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-700">
                      <span>Evaluated Projects:</span>
                      <span className="font-bold text-slate-950">
                        {metrics.reviewedProjectsCount} / {metrics.totalProjects}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Completed Modules:</span>
                      <span className="font-bold text-[#3B5BDB]">
                        {metrics.completedCount} / {metrics.totalModules} ({metrics.progressPercent}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Certificate Status:</span>
                      <span className="font-bold text-slate-950">
                        {metrics.canClaimCertificate ? "Unlocked" : "Gated (Pass 80%)"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Link
                      href={`/learn/capcut-master-academy/${CAPCUT_MODULES[0].slug}`}
                      className="w-full py-3 px-4 rounded-xl bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white font-mono font-black text-xs tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 uppercase border border-[#3B5BDB]"
                    >
                      <Play size={15} fill="currentColor" className="text-white" />
                      <span className="font-bangla">মডিউল ০১ প্লেয়ার শুরু করুন</span>
                    </Link>

                    <button
                      onClick={() => setActiveTab("certificate")}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-mono font-bold text-xs border border-slate-300 transition-all flex items-center justify-center gap-2"
                    >
                      <Award size={14} className="text-[#3B5BDB]" />
                      <span className="font-bangla">সার্টিফিকেশন ভেরিফিকেশন গেটওয়ে</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION TABS (Full Width) ── */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-corp-border scrollbar-none">
          {[
            { id: "curriculum", label: "কারিকুলাম (৩৬টি মডিউল • ৮টি স্টেজ)", icon: BookOpen },
            { id: "projects", label: "১৫-প্রজেক্ট লেডার (Projects)", icon: Star },
            { id: "resources", label: "রিসোর্স ভল্ট ও ডাউনলোড", icon: Download },
            { id: "specializations", label: "৩টি স্পেশালাইজেশন ট্র্যাক", icon: Layers },
            { id: "skills", label: "মাস্টার স্কিল ডাটাবেস", icon: Sliders },
            { id: "certificate", label: "সার্টিফিকেট গেটওয়ে (৮০% বেঞ্চমার্ক)", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-[#3B5BDB] text-white border-[#3B5BDB] shadow-xs"
                    : "bg-white border-slate-200 text-slate-700 hover:text-[#3B5BDB] hover:border-slate-300"
                }`}
              >
                <Icon size={14} className={isActive ? "text-white" : "text-[#3B5BDB]"} />
                <span className="font-bangla">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN TAB CONTENT (Full Width) ── */}
      <main className="w-full px-4 sm:px-8 lg:px-12 pt-8">
        <AnimatePresence mode="wait">
          {/* TAB 1: CURRICULUM (8 STAGES & 36 MODULES) */}
          {activeTab === "curriculum" && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-mono text-slate-950">কারিকুলাম ও স্টেজ স্ট্রাকচার</h2>
                  <p className="text-xs text-corp-text-secondary font-bangla">
                    ৮টি ধাপে সাজানো ৩৬টি সম্পূর্ণ মডিউল। প্রতিটি মডিউলে রয়েছে ভিডিও প্লেয়ার, ভোল্টে বাংলা টেক্সট গাইড, প্র্যাকটিস রিসোর্স এবং কুইজ।
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedStages(CAPCUT_STAGES.map((s) => s.id))}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 shadow-xs"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setExpandedStages([])}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 shadow-xs"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Stage Accordion */}
              <div className="space-y-4">
                {CAPCUT_STAGES.map((stage) => {
                  const isExpanded = expandedStages.includes(stage.id);
                  const stageModules = CAPCUT_MODULES.filter((m) => m.stageId === stage.id);
                  const completedStageModules = stageModules.filter((m) =>
                    state.completedModuleIds.includes(m.id)
                  );

                  return (
                    <div
                      key={stage.id}
                      className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs hover:border-slate-300"
                    >
                      {/* Stage Header */}
                      <button
                        onClick={() => toggleStage(stage.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3B5BDB] flex items-center justify-center font-mono font-black text-sm flex-shrink-0 border border-blue-200">
                            {stage.id}
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-950">
                                {stage.number}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-xs font-mono text-slate-500 font-bold">{stage.moduleRange}</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-950 font-mono">{stage.title}</h3>
                            <p className="text-xs text-corp-text-secondary font-bangla line-clamp-1 max-w-2xl">{stage.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex flex-col items-end text-xs font-mono">
                            <span className="text-slate-950 font-bold">
                              {completedStageModules.length} / {stageModules.length} Done
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              {Math.round((completedStageModules.length / stageModules.length) * 100)}% Complete
                            </span>
                          </div>
                          <div className="p-1.5 rounded-md bg-slate-100 text-slate-700">
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </button>

                      {/* Stage Modules List */}
                      {isExpanded && (
                        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 divide-y divide-slate-100">
                          {stageModules.map((mod) => {
                            const isModComplete = state.completedModuleIds.includes(mod.id);
                            const hasProject = Boolean(mod.projectDeliverable);
                            const projectKey = mod.projectDeliverable?.id;
                            const submission = projectKey ? state.submissions[projectKey] : undefined;

                            return (
                              <div
                                key={mod.id}
                                className="py-4 first:pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                              >
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                                      MOD {String(mod.id).padStart(2, "0")}
                                    </span>
                                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1 font-bold">
                                      <Clock size={12} className="text-[#3B5BDB]" /> {mod.duration}
                                    </span>

                                    {hasProject && (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-purple-50 text-purple-900 border border-purple-200 flex items-center gap-1">
                                        <Sparkles size={11} className="text-purple-600" />
                                        <span>{mod.projectDeliverable?.title}</span>
                                      </span>
                                    )}

                                    {submission && (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-1">
                                        <CheckCircle2 size={11} className="text-emerald-600" />
                                        <span>স্কোর: {submission.weightedScore}% (মূল্যায়িত)</span>
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="text-sm font-bold text-slate-950 group-hover:text-[#3B5BDB] transition-colors">
                                    {mod.title}
                                  </h4>
                                  <p className="text-xs text-corp-text-secondary font-bangla line-clamp-1">{mod.objective}</p>

                                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-1 font-bold">
                                    <span>{mod.lessons.length} Lessons</span>
                                    <span>•</span>
                                    <span>{mod.downloadableResources.length} Resources</span>
                                    <span>•</span>
                                    <span>YouTube Tutorial Embedded</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  {/* Mark Complete Checkbox */}
                                  <button
                                    onClick={() => toggleModuleComplete(mod.id)}
                                    title={isModComplete ? "সম্পন্ন হিসেবে চিহ্নিত" : "সম্পন্ন করুন"}
                                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                                      isModComplete
                                        ? "bg-emerald-500 border-emerald-600 text-white shadow-xs"
                                        : "bg-white border-slate-300 text-slate-400 hover:border-slate-500 hover:text-slate-600"
                                    }`}
                                  >
                                    <Check size={16} />
                                  </button>

                                  {/* Launch Player */}
                                  <Link
                                    href={`/learn/capcut-master-academy/${mod.slug}`}
                                    className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white transition-all flex items-center gap-1.5 shadow-xs border border-[#3B5BDB]"
                                  >
                                    <Play size={13} fill="currentColor" className="text-white" />
                                    <span>Open Player</span>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 2: 15-PROJECT LADDER */}
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold font-mono text-slate-950">১৫টি মাইলস্টোন প্রজেক্ট লেডার</h2>
                <p className="text-xs text-corp-text-secondary font-bangla">
                  বাস্তব ক্লায়েন্ট ব্রিফ ও কমার্শিয়াল সিনারিও। প্রতিটি প্রজেক্ট আমাদের ৭-ফ্যাক্টর এডিটোরিয়াল রুব্রিকে মূল্যায়ন করা হয়। গড়ে ৮০% বা তার বেশি স্কোর পেলে অফিসিয়াল মাস্টার সার্টিফিকেট অর্জিত হয়।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CAPCUT_PROJECT_LADDER.map((proj) => {
                  const submission = state.submissions[proj.id];
                  const isReviewed = submission?.status === "reviewed";
                  const score = submission?.weightedScore || 0;
                  const isBenchmarkPassed = score >= 80;

                  const targetModule = CAPCUT_MODULES.find(
                    (m) => m.projectDeliverable?.id === proj.id
                  ) || CAPCUT_MODULES[0];

                  return (
                    <div
                      key={proj.id}
                      className={`p-5 rounded-xl border transition-all flex flex-col justify-between bg-white ${
                        isReviewed && isBenchmarkPassed
                          ? "border-emerald-500 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 shadow-xs"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-blue-50 text-blue-900 border border-blue-200">
                            {proj.projectNumber}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 font-bold">{proj.stage} • {proj.duration}</span>
                        </div>

                        <h3 className="text-base font-bold text-slate-950 font-mono">{proj.title}</h3>
                        <p className="text-xs text-corp-text-secondary font-bangla leading-relaxed">{proj.description}</p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.keySkills.map((sk, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                        {isReviewed ? (
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">মূল্যায়িত স্কোর</p>
                            <p className={`text-sm font-mono font-black flex items-center gap-1 ${isBenchmarkPassed ? "text-emerald-700" : "text-amber-700"}`}>
                              {score}/100 {isBenchmarkPassed ? <span className="flex items-center gap-1"><CheckCircle2 size={13} /> পাসড</span> : "রিভিশন প্রয়োজন"}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">পাসিং রিকোয়ারমেন্ট</p>
                            <p className="text-xs font-mono font-bold text-slate-700">৮০% বেঞ্চমার্ক</p>
                          </div>
                        )}

                        <Link
                          href={`/learn/capcut-master-academy/${targetModule.slug}`}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white transition-all flex items-center gap-1 shadow-xs border border-[#3B5BDB]"
                        >
                          <span className="font-bangla">{isReviewed ? "রিভিউ দেখুন" : "কাজ জমা দিন"}</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 3: RESOURCE VAULT & DOWNLOADS */}
          {activeTab === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold font-mono text-slate-950">প্রডাকশন রিসোর্স ভল্ট</h2>
                <p className="text-xs text-corp-text-secondary font-bangla">
                  এক ক্লিকে ডাউনলোড করুন 4K প্র্যাকটিস ফুটেজ প্যাক, Foley সাউন্ড ইফেক্ট, সিনেম্যাটিক ৩ডি LUT প্রোফাইল এবং ক্লায়েন্ট ব্রিফ।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allVaultResources.map(({ resource, moduleTitle, moduleId }) => {
                  const isDownloading = downloadingId === resource.id;

                  return (
                    <div
                      key={resource.id}
                      className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 shadow-xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase bg-slate-100 text-slate-800 border border-slate-300">
                            {resource.type}
                          </span>
                          <span className="text-[11px] font-mono text-slate-600 font-bold">{resource.size}</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-950 font-mono leading-snug">{resource.title}</h3>
                        <p className="text-xs text-corp-text-secondary font-bangla line-clamp-2">{resource.description}</p>
                        <p className="text-[10px] font-mono text-slate-500 font-bold">File: {resource.filename}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-500">মডিউল {String(moduleId).padStart(2, "0")}</span>
                        <button
                          onClick={() => handleDownload(resource)}
                          disabled={isDownloading}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white transition-all flex items-center gap-1.5 shadow-xs border border-[#3B5BDB]"
                        >
                          <Download size={13} className={isDownloading ? "animate-bounce" : ""} />
                          <span className="font-bangla">{isDownloading ? "ডাউনলোড হচ্ছে..." : "ডাউনলোড ফাইল"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 4: 3 SPECIALIZATION PATHS */}
          {activeTab === "specializations" && (
            <motion.div
              key="specializations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold font-mono text-slate-950">৩টি হাই-ভ্যালু ক্যারিয়ার পাথ</h2>
                <p className="text-xs text-corp-text-secondary font-bangla">
                  মূল এডিটিং শেখার পর আপনার পছন্দের মার্কেট লেনে স্পেশালাইজ করুন এবং হাই-টিকিট ক্লায়েন্ট ড্রাইভ করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {SPECIALIZATION_TRACKS.map((track) => (
                  <div
                    key={track.id}
                    className="p-6 rounded-2xl border border-slate-200 bg-white space-y-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase bg-blue-50 text-blue-900 border border-blue-200">
                          {track.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 font-mono">{track.title}</h3>
                      <p className="text-xs text-corp-text-secondary font-bangla leading-relaxed">{track.focus}</p>

                      <div className="space-y-1.5 pt-2">
                        <p className="text-[11px] font-mono uppercase text-slate-700 font-bold">টার্গেট রোলস:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {track.targetRoles.map((r, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <p className="text-[11px] font-mono uppercase text-slate-700 font-bold">মূল প্রজেক্টসমূহ:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {track.recommendedProjects.map((pKey) => {
                          const p = CAPCUT_PROJECT_LADDER.find((item) => item.id === pKey);
                          return (
                            <span key={pKey} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200">
                              {p?.projectNumber}: {p?.title}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: MASTER SKILL DATABASE */}
          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold font-mono text-slate-950">মাস্টার স্কিল ডাটাবেস</h2>
                <p className="text-xs text-corp-text-secondary font-bangla">
                  ৩৬টি মডিউল জুড়ে শেখানো প্রতিটি টেকনিক্যাল এডিটিং টুলস ও ক্রিয়েটিভ স্কিল।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MASTER_SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-950 font-mono flex items-center gap-2">
                      <Sliders size={14} className="text-[#3B5BDB]" />
                      <span>{cat.name}</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 6: CERTIFICATION GATEWAY */}
          {activeTab === "certificate" && (
            <motion.div
              key="certificate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="max-w-3xl mx-auto text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono font-bold">
                  <ShieldCheck size={14} className="text-[#3B5BDB]" />
                  <span>Evaluation Standard: Cumulative &ge; 80%</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-mono text-slate-950">
                  CapCut Certified Master Video Editor
                </h2>
                <p className="text-sm text-corp-text-secondary font-bangla max-w-xl mx-auto">
                  ক্যাপকাট মাস্টার সার্টিফিকেশন কোনো সাধারণ কোর্স ফিনিশ বাটন ক্লিক করলেই পাওয়া যায় না। প্রজেক্ট সাবমিশনে গড়ে ৮০% স্কোর অর্জন করলেই কেবল এই ভেরিফাইড সনদপত্র আনলক হয়।
                </p>
              </div>

              {/* Status Banner */}
              <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-blue-200/80 bg-white text-center space-y-4 shadow-xs">
                {metrics.isThresholdMet ? (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto">
                      <Award size={32} />
                    </div>
                    <h3 className="text-lg font-bold font-mono text-emerald-800 font-bangla">
                      অভিনন্দন! ৮০% পাসিং বেঞ্চমার্ক অর্জিত হয়েছে!
                    </h3>
                    <p className="text-xs text-slate-700 font-bangla leading-relaxed">
                      আপনার মূল্যায়িত প্রজেক্টে গড় স্কোর <span className="font-bold text-slate-950 text-sm">{metrics.cumulativeScore}%</span>, যা প্রয়োজনীয় ৮০% বেঞ্চমার্ক অতিক্রম করেছে।
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <input
                        type="text"
                        value={studentNameInput}
                        onChange={(e) => setStudentNameInput(e.target.value)}
                        placeholder="সার্টিফিকেটের জন্য আপনার পূর্ণ নাম লিখুন"
                        className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs w-full sm:w-64 focus:border-[#3B5BDB] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          claimCertificate(studentNameInput);
                          setCertModalOpen(true);
                        }}
                        className="px-5 py-2 rounded-lg bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white font-mono font-black text-xs transition-all shadow-xs w-full sm:w-auto font-bangla"
                      >
                        সার্টিফিকেট ক্লেইম ও প্রিভিউ করুন
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-300 text-[#3B5BDB] flex items-center justify-center mx-auto">
                      <Lock size={28} />
                    </div>
                    <h3 className="text-lg font-bold font-mono text-blue-900 font-bangla">
                      সার্টিফিকেশন গেটওয়ে বর্তমানে লকড
                    </h3>
                    <p className="text-xs text-slate-700 font-bangla leading-relaxed max-w-lg mx-auto">
                      বর্তমান স্কোর: <span className="font-bold text-slate-950">{metrics.cumulativeScore}%</span> • প্রয়োজনীয় স্কোর:{" "}
                      <span className="font-bold text-[#3B5BDB]">৮০%</span>। সার্টিফিকেট আনলক করতে মডিউল প্রজেক্ট (যেমন Project 01: The Clean Edit বা Project 06) সাবমিট করুন।
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/learn/capcut-master-academy/${CAPCUT_MODULES[5].slug}`}
                        className="px-5 py-2.5 rounded-lg bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white font-mono font-bold text-xs inline-flex items-center gap-2 shadow-xs"
                      >
                        <span className="font-bangla">মডিউল ০৬ এ যান (Project 01 Submission)</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Certificate Card - Light Ivory Diploma with SAAS Palette */}
              <div className="max-w-3xl mx-auto">
                <div
                  className="relative w-full overflow-hidden rounded-2xl select-none border-2 border-[#3B5BDB] shadow-[0_12px_40px_rgba(59,91,219,0.12)] p-8 sm:p-12 text-slate-900 font-mono"
                  style={{
                    background: "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 50%, #FFFFFF 100%)",
                    minHeight: "380px",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-blue-200/70 pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#3B5BDB] text-white flex items-center justify-center font-black text-base border border-blue-400">
                        I
                      </div>
                      <div>
                        <p className="text-xs font-black tracking-widest text-[#3B5BDB]">INSYT MEDIA LAB</p>
                        <p className="text-[9px] uppercase tracking-widest text-slate-500 font-sans">Creative Post-Production Board</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#3B5BDB] text-xs font-bold uppercase">
                      Official Master Credential
                    </div>
                  </div>

                  <div className="text-center space-y-4 py-4">
                    <p className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#3B5BDB]">
                      Certificate of Editorial Mastery
                    </p>
                    <h3 className="text-xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                      CapCut Certified Master Video Editor
                    </h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">This certifies that</p>
                    <p className="text-3xl font-extrabold text-[#3B5BDB] tracking-wide font-serif">
                      {studentNameInput || "Student Editor"}
                    </p>
                    <p className="text-xs leading-relaxed max-w-lg mx-auto text-slate-600 font-sans font-medium">
                      has demonstrated independent editorial proficiency across all 36 curriculum modules,
                      satisfying the 7-Factor Rubric benchmark with an evaluated score of{" "}
                      <span className="font-bold text-slate-950">{metrics.cumulativeScore}%</span>.
                    </p>
                  </div>

                  <div className="flex items-end justify-between pt-6 border-t border-blue-200/70 text-xs">
                    <div>
                      <p className="text-[9px] uppercase text-[#3B5BDB] font-bold">Course Director</p>
                      <p className="text-[11px] font-bold text-slate-900">Farhan Kabir</p>
                      <p className="text-[9px] text-slate-500 font-sans">Senior Post Supervisor</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full border-2 border-[#3B5BDB] bg-blue-50 flex items-center justify-center text-[#3B5BDB] font-black text-sm mx-auto shadow-xs">
                        SEAL
                      </div>
                      <p className="text-[8px] uppercase tracking-widest text-[#3B5BDB] mt-1 font-bold">Verified Credential</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase text-[#3B5BDB] font-bold">Credential ID</p>
                      <p className="text-[11px] font-mono text-slate-800 font-bold">INSYT-CAPCUT-V2-MASTER</p>
                      <p className="text-[9px] text-slate-500">Passing Benchmark: 80%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Claim Certificate Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-blue-200 rounded-2xl p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#3B5BDB] border border-blue-200 flex items-center justify-center mx-auto">
              <Award size={26} />
            </div>
            <h3 className="text-lg font-bold font-mono text-slate-950">Official Credential Claimed!</h3>
            <p className="text-xs text-slate-700 font-bangla leading-relaxed">
              আপনার ক্যাপকাট মাস্টার এডিটর সার্টিফিকেট আইডি{" "}
              <span className="font-mono text-slate-950 font-bold">INSYT-CAPCUT-V2-MASTER</span> এর অধীনে ইস্যু করা হয়েছে (স্কোর:{" "}
              <span className="font-bold text-[#3B5BDB]">{metrics.cumulativeScore}%</span>)।
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/certificates"
                className="w-full py-2.5 rounded-lg bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white font-mono font-bold text-xs shadow-xs"
              >
                Go to Master Certificates Vault
              </Link>
              <button
                onClick={() => setCertModalOpen(false)}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
