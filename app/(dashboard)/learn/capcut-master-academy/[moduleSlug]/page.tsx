"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Play, CheckCircle2, ChevronLeft, ChevronRight, Download,
  MessageSquare, FileText, Award, HelpCircle, Sparkles, Clock,
  Flame, Check, Edit3, ExternalLink, ThumbsUp, Send, ShieldCheck,
  AlertCircle, ArrowRight, CornerDownRight, Sliders, Lock
} from "lucide-react";
import {
  CAPCUT_MODULES,
  CAPCUT_STAGES,
  getCapCutModuleBySlug,
  CapCutModule,
  DownloadableResource
} from "@/lib/data/capcut-master-academy";
import { useCapCutCourse } from "@/lib/state/capcut-submissions";
import { triggerResourceDownload } from "@/lib/utils/download-helper";

interface PageProps {
  params: Promise<{ moduleSlug: string }>;
}

export default function CapCutModulePlayerPage(props: PageProps) {
  const router = useRouter();
  const params = use(props.params);
  const moduleSlug = params?.moduleSlug;
  const currentModule = getCapCutModuleBySlug(moduleSlug);

  if (!currentModule) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 font-mono text-[var(--corp-text)]"
        style={{ background: "var(--corp-bg)" }}
      >
        <p className="text-rose-600 font-bold">মডিউলটি খুঁজে পাওয়া যায়নি: {moduleSlug}</p>
        <Link
          href={`/learn/capcut-master-academy/${CAPCUT_MODULES[0].slug}`}
          className="px-4 py-2 rounded-lg bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white font-bold text-xs shadow-xs font-bangla"
        >
          প্রথম মডিউলে ফিরে যান (Return to Module 01)
        </Link>
      </div>
    );
  }

  const {
    state,
    metrics,
    toggleModuleComplete,
    setCustomVideoUrl,
    submitProject,
    submitQuiz,
    addComment,
    likeComment,
  } = useCapCutCourse();

  // Active Content Tabs
  const [activeTab, setActiveTab] = useState<"guide" | "resources" | "submission" | "discussion" | "quiz">("guide");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Video URL Switcher Modal
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  // Project Submission Form State
  const projectKey = currentModule.projectDeliverable?.id || `module-${currentModule.id}-exercise`;
  const existingSubmission = state.submissions[projectKey];
  const [subVideoUrl, setSubVideoUrl] = useState(existingSubmission?.videoUrl || "");
  const [subFileUrl, setSubFileUrl] = useState(existingSubmission?.projectFileUrl || "");
  const [subNotes, setSubNotes] = useState(existingSubmission?.notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState("");

  // Quiz State
  const existingQuiz = state.quizScores[currentModule.id];
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(Boolean(existingQuiz));
  const [quizResult, setQuizResult] = useState<boolean | null>(existingQuiz ? existingQuiz.passed : null);

  // Comments State
  const [commentInput, setCommentInput] = useState("");
  const [studentName, setStudentName] = useState(state.studentName || "Zubair");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Previous & Next navigation
  const currentIndex = CAPCUT_MODULES.findIndex((m) => m.id === currentModule.id);
  const prevModule = currentIndex > 0 ? CAPCUT_MODULES[currentIndex - 1] : null;
  const nextModule = currentIndex < CAPCUT_MODULES.length - 1 ? CAPCUT_MODULES[currentIndex + 1] : null;

  const isCompleted = state.completedModuleIds.includes(currentModule.id);

  // Resolve YouTube Embed ID (Custom URL overrides default)
  const currentVideoId = useMemo(() => {
    const custom = state.customVideoUrls[currentModule.id];
    if (custom) {
      const match = custom.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      return match ? match[1] : custom;
    }
    return currentModule.youtubeId;
  }, [state.customVideoUrls, currentModule.id, currentModule.youtubeId]);

  // Handle URL change
  const handleSaveVideoUrl = () => {
    if (inputUrl.trim()) {
      setCustomVideoUrl(currentModule.id, inputUrl);
    }
    setUrlModalOpen(false);
    setInputUrl("");
  };

  // Handle Resource Download
  const handleDownload = (res: DownloadableResource) => {
    setDownloadingId(res.id);
    triggerResourceDownload(res);
    setTimeout(() => setDownloadingId(null), 800);
  };

  // Handle Project Deliverable Submit
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subVideoUrl.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitProject(
        currentModule.id,
        projectKey,
        currentModule.projectDeliverable?.title || `${currentModule.title} Deliverable`,
        subVideoUrl,
        subFileUrl,
        subNotes
      );
      setIsSubmitting(false);
      setSubmissionSuccessMsg("প্রজেক্ট সফলভাবে জমা দেওয়া হয়েছে এবং ফ্যাকাল্টি দ্বারা মূল্যায়িত হয়েছে!");
      setTimeout(() => setSubmissionSuccessMsg(""), 5000);
    }, 800);
  };

  // Handle Quiz Verification
  const handleVerifyQuiz = () => {
    if (selectedQuizIdx === null) return;
    const isCorrect = submitQuiz(currentModule.id, selectedQuizIdx, currentModule.quiz.correctIdx);
    setQuizResult(isCorrect);
    setQuizSubmitted(true);
  };

  // Handle Comment Submission
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(currentModule.id, studentName, commentInput);
    setCommentInput("");
  };

  // Combined comments (default module comments + user comments)
  const moduleUserComments = state.userComments.filter((c) => c.moduleId === currentModule.id);
  const combinedComments = [...moduleUserComments, ...currentModule.comments];

  return (
    <div
      className="min-h-screen text-[var(--corp-text)] flex flex-col font-sans selection:bg-[#10b981] selection:text-slate-950"
      style={{ background: "var(--corp-bg)" }}
    >
      {/* ── TOP NAV BAR (Corporate Light Theme - Full Width) ── */}
      <header
        className="border-b bg-[var(--corp-surface)] sticky top-0 z-40 px-4 sm:px-8 py-3 shadow-xs"
        style={{ borderColor: "var(--corp-border)" }}
      >
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          {/* Back & Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              href="/learn/capcut-master-academy"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200 transition-colors"
              title="মাস্টার কারিকুলাম হাবে ফিরে যান"
            >
              <ChevronLeft size={16} />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-50 border border-blue-200 text-blue-900 font-bangla">
                  {currentModule.stageNumber} · {currentModule.stageTitle}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 font-bangla">
                  মডিউল {String(currentModule.id).padStart(2, "0")} / ৩৬
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 font-mono line-clamp-1 font-bangla">
                {currentModule.title}
              </h1>
            </div>
          </div>

          {/* Controls: Prev/Next, Mark Complete, Sidebar Toggle */}
          <div className="flex items-center gap-2">
            {/* Prev Module */}
            {prevModule && (
              <Link
                href={`/learn/capcut-master-academy/${prevModule.slug}`}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-all shadow-2xs font-bangla"
                title={prevModule.title}
              >
                <ChevronLeft size={14} />
                <span className="hidden sm:inline">পূর্ববর্তী</span>
              </Link>
            )}

            {/* Next Module */}
            {nextModule && (
              <Link
                href={`/learn/capcut-master-academy/${nextModule.slug}`}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-all shadow-2xs font-bangla"
                title={nextModule.title}
              >
                <span className="hidden sm:inline">পরবর্তী</span>
                <ChevronRight size={14} />
              </Link>
            )}

            {/* Mark Complete Button (No Black UI) */}
            <button
              onClick={() => toggleModuleComplete(currentModule.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all flex items-center gap-1.5 shadow-2xs font-bangla ${
                isCompleted
                  ? "bg-emerald-50 border-emerald-600 text-emerald-800"
                  : "bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white border-[#3B5BDB]"
              }`}
            >
              <Check size={14} />
              <span>{isCompleted ? "সম্পন্ন হয়েছে (Done)" : "সম্পন্ন মার্ক করুন"}</span>
            </button>

            {/* Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200 transition-colors"
              title="কারিকুলাম সাইডবার টগল করুন"
            >
              <Sliders size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN WORKSPACE (FULL WIDTH PLAYER + TABS + SIDEBAR) ── */}
      <div className="flex-1 w-full flex overflow-hidden">
        {/* Left Column: Player & Interactive Content Tabs */}
        <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* 16:9 Video Player Box */}
          <div className="space-y-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-950 shadow-md">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?rel=0&modestbranding=1&enablejsapi=1`}
                title={currentModule.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />

              {/* Edit Link Quick Overlay Button */}
              <button
                onClick={() => setUrlModalOpen(true)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 border border-slate-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md font-bangla"
              >
                <Edit3 size={13} className="text-[#3B5BDB]" />
                <span>ভিডিও লিংক পরিবর্তন</span>
              </button>
            </div>

            {/* Video Sub-bar (No XP mentions) */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600 pt-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-slate-800 font-bold font-bangla">
                  <Clock size={13} className="text-[#3B5BDB]" /> {currentModule.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-blue-900 font-bold font-bangla">
                  <Sparkles size={13} className="text-[#3B5BDB]" /> ভেরিফাইড কারিকুলাম
                </span>
                <span>•</span>
                <span className="text-slate-500 font-medium">YouTube ID: {currentVideoId}</span>
              </div>

              <button
                onClick={() => setUrlModalOpen(true)}
                className="text-xs text-[#3B5BDB] hover:underline flex items-center gap-1 font-semibold font-bangla"
              >
                <span>কাস্টম ইউটিউব ভিডিও লিংক ব্যবহার করুন</span>
                <ExternalLink size={11} />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Tabs (SAAS Color Scheme) */}
          <div className="border-b border-slate-200">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: "guide", label: "মাস্টার টেক্সট গাইড", icon: FileText },
                { id: "resources", label: `রিসোর্স ডাউনলোড (${currentModule.downloadableResources.length})`, icon: Download },
                { id: "submission", label: "প্রজেক্ট সাবমিশন ও রিভিউ", icon: Award, highlight: true },
                { id: "discussion", label: `ডিসকাশন ও প্রশ্ন (${combinedComments.length})`, icon: MessageSquare },
                { id: "quiz", label: "স্কিল কুইজ", icon: HelpCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all border font-bangla ${
                      isActive
                        ? "bg-[#3B5BDB] text-white border-[#3B5BDB] shadow-xs"
                        : tab.highlight
                        ? "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100"
                        : "bg-white border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 1: Master Text Guide */}
          {activeTab === "guide" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Objective Banner */}
              <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-mono font-black uppercase text-blue-800 tracking-wider">
                  মডিউল শিখন উদ্দেশ্য (Module Objective)
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed font-bangla">
                  {currentModule.objective}
                </p>
              </div>

              {/* 7-Part Master Pedagogical Framework */}
              <div className="space-y-5">
                <h3 className="text-base font-bold font-mono text-slate-950 flex items-center gap-2 pt-2">
                  <Sparkles size={17} className="text-emerald-600" />
                  <span>৭-ধাপের পাঠ্যক্রম কাঠামো (The 7-Part Master Framework)</span>
                </h3>

                {/* 1. Concept */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-800">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-black">
                      ১
                    </span>
                    <span>কনসেপ্ট ও সম্পাদনা দর্শন · CONCEPT (Why This Matters)</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-bangla">
                    {currentModule.textGuide.concept}
                  </p>
                </div>

                {/* 2. Demonstration */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-800">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-[10px] font-black">
                      ২
                    </span>
                    <span>টেকনিক্যাল ডেমোনস্ট্রেশন · DEMONSTRATION (Technical Walkthrough)</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-bangla">
                    {currentModule.textGuide.demonstration}
                  </p>
                </div>

                {/* 3. Guided Practice */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-[10px] font-black">
                      ৩
                    </span>
                    <span>গাইডেড প্র্যাকটিস · GUIDED PRACTICE (Follow Along With Instructor)</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-bangla">
                    {currentModule.textGuide.guidedPractice}
                  </p>
                </div>

                {/* 4. Independent Practice */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-black">
                      ৪
                    </span>
                    <span>স্বাধীন অনুশীলন · INDEPENDENT PRACTICE (Execute Without Templates)</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-bangla">
                    {currentModule.textGuide.independentPractice}
                  </p>
                </div>

                {/* 5. Critique Points */}
                <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/40 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-800">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-[10px] font-black">
                      ৫
                    </span>
                    <span>ক্রিটিক ও ভুলত্রুটি · CRITIQUE POINTS (What Separates Amateur from Pro)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside font-bangla">
                    {currentModule.textGuide.critiquePoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {/* 6. Pro Tip */}
                <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/70 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                      ৬
                    </span>
                    <span>প্রো টিপ ও এডিটোরিয়াল সিক্রেট · PRO TIP (Editorial Secret)</span>
                  </div>
                  <p className="text-sm text-emerald-950 leading-relaxed font-bangla font-semibold">
                    {currentModule.textGuide.proTip}
                  </p>
                </div>
              </div>

              {/* Lesson Topics Checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold font-mono text-slate-900">মডিউল পূর্ণাঙ্গ পাঠ্যসূচি (Full Curriculum Topics)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentModule.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs font-mono text-slate-800"
                    >
                      <span className="text-emerald-700 font-bold">#{idx + 1}</span>
                      <span className="font-bangla font-medium">{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial Rules & Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                {/* Rules */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold font-mono uppercase text-emerald-800 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>এডিটোরিয়াল গোল্ডেন রুলস (Golden Rules)</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-bangla">
                    {currentModule.editorialRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">›</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shortcuts */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold font-mono uppercase text-purple-800 flex items-center gap-2">
                    <Sliders size={14} className="text-purple-600" />
                    <span>কীবোর্ড শর্টকাটস (Keyboard Shortcuts)</span>
                  </h4>
                  <div className="space-y-2">
                    {currentModule.shortcuts.map((sc, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-medium">{sc.action}</span>
                        <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-slate-900 text-[11px] font-bold">
                          {sc.hotkey}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Downloadable Resources */}
          {activeTab === "resources" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-base font-bold font-mono text-slate-900">মডিউল ডাউনলোডযোগ্য রিসোর্স ও অ্যাসেটস</h3>
                <p className="text-xs text-slate-600 font-bangla">
                  যেকোনো কার্ডে ক্লিক করে প্র্যাকটিসের র ফুটেজ, সাউন্ড স্টেম, LUTs অথবা প্রজেক্ট ব্রিফ ফাইল সরাসরি আপনার কম্পিউটারে ডাউনলোড করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentModule.downloadableResources.map((res) => {
                  const isDownloading = downloadingId === res.id;
                  return (
                    <div
                      key={res.id}
                      className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all shadow-xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-50 text-blue-800 border border-blue-200">
                            {res.type}
                          </span>
                          <span className="text-xs font-mono text-slate-500 font-bold">{res.size}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-mono">{res.title}</h4>
                        <p className="text-xs text-slate-600 font-bangla">{res.description}</p>
                        <p className="text-[11px] font-mono text-slate-400">File: {res.filename}</p>
                      </div>

                      <button
                        onClick={() => handleDownload(res)}
                        disabled={isDownloading}
                        className="w-full py-2.5 px-3 rounded-lg text-xs font-mono font-bold bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white transition-all flex items-center justify-center gap-2 shadow-xs font-bangla"
                      >
                        <Download size={14} className={isDownloading ? "animate-bounce" : ""} />
                        <span>{isDownloading ? "ডাউনলোড হচ্ছে..." : "রিসোর্স ডাউনলোড করুন"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 3: Project Submission & Faculty Review System */}
          {activeTab === "submission" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Deliverable Header */}
              <div className="p-5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase bg-purple-100 text-purple-900 border border-purple-300">
                    {currentModule.projectDeliverable?.title || "মডিউল প্র্যাকটিক্যাল অ্যাসাইনমেন্ট"}
                  </span>
                  <span className="text-xs font-mono text-emerald-800 font-bold">
                    পাসিং বেঞ্চমার্ক: ৮০% রুব্রিক স্কোর
                  </span>
                </div>
                <h3 className="text-base font-bold font-mono text-slate-900">
                  {currentModule.projectDeliverable?.title || "ব্যবহারিক এডিটিং ডেলিভারেবল"}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-bangla">
                  {currentModule.projectDeliverable?.description || currentModule.exercise}
                </p>

                {currentModule.projectDeliverable?.requirements && (
                  <div className="pt-2 space-y-1">
                    <p className="text-[11px] font-mono uppercase text-slate-600 font-bold">ডেলিভারেবল রিকোয়ারমেন্টস:</p>
                    <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside font-bangla">
                      {currentModule.projectDeliverable.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Submission Form */}
              <form onSubmit={handleProjectSubmit} className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs">
                <h4 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
                  <Award size={16} className="text-emerald-600" />
                  <span>রুব্রিক মূল্যায়নের জন্য ভিডিও অ্যাসেট জমা দিন</span>
                </h4>

                <div className="space-y-3 text-xs font-mono">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      রেন্ডার করা ভিডিও ডেলিভারি লিংক <span className="text-rose-500">*</span> (YouTube / Vimeo / Google Drive / Loom)
                    </label>
                    <input
                      type="url"
                      required
                      value={subVideoUrl}
                      onChange={(e) => setSubVideoUrl(e.target.value)}
                      placeholder="https://youtu.be/your-finished-edit"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      প্রজেক্ট আর্কাইভ / CapCut ড্রাফট ফোল্ডার লিংক (ঐচ্ছিক)
                    </label>
                    <input
                      type="url"
                      value={subFileUrl}
                      onChange={(e) => setSubFileUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/your-capcut-project-files"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      এডিটোরিয়াল সিদ্ধান্ত ও নিজস্ব মূল্যায়নের নোট (Rationale &amp; Self-Assessment)
                    </label>
                    <textarea
                      rows={3}
                      value={subNotes}
                      onChange={(e) => setSubNotes(e.target.value)}
                      placeholder="আপনার পেসিং স্ট্র্যাটেজি, বি-রোল সিলেকশন, সাউন্ড ডিজাইনের যুক্তি এবং যেকোনো নির্দিষ্ট কাটের ফিডব্যাক ব্যাখ্যা করুন..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none font-bangla"
                    />
                  </div>
                </div>

                {submissionSuccessMsg && (
                  <p className="text-xs font-mono text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-300 font-bold flex items-center gap-1.5 font-bangla">
                    <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>{submissionSuccessMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-6 rounded-lg text-xs font-mono font-bold bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white transition-all flex items-center gap-2 shadow-xs font-bangla"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? "মূল্যায়ন প্রক্রিয়া চলছে..." : existingSubmission ? "রিভাইজড ডেলিভারেবল জমা দিন" : "রিভিউয়ের জন্য ডেলিভারেবল সাবমিট করুন"}</span>
                </button>
              </form>

              {/* Reviewed Evaluation Breakdown & Mentor Remarks */}
              {existingSubmission && existingSubmission.status === "reviewed" && (
                <div className="p-6 rounded-2xl border-2 border-emerald-400 bg-white space-y-6 shadow-sm">
                  {/* Top Score Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-700 tracking-wider font-bangla">
                        অফিসিয়াল ফ্যাকাল্টি মূল্যায়ন ফলাফল
                      </span>
                      <h4 className="text-lg font-bold font-mono text-slate-900 font-bangla">
                        {existingSubmission.projectTitle}
                      </h4>
                      <p className="text-xs text-slate-500 font-bangla">
                        মূল্যায়ন করেছেন {existingSubmission.mentorRemarks.leadReviewer} ({existingSubmission.mentorRemarks.reviewerRole})
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-mono uppercase text-slate-500 font-bold font-bangla">৭-ফ্যাক্টর ওয়েটেড স্কোর</p>
                      <p className="text-3xl font-black font-mono text-emerald-700">
                        {existingSubmission.weightedScore} / ১০০
                      </p>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 font-bangla">
                        {existingSubmission.mentorRemarks.verdict}
                      </span>
                    </div>
                  </div>

                  {/* 7-Factor Rubric Breakdown */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono font-extrabold uppercase text-slate-800 font-bangla">
                      ৭-ফ্যাক্টর রুব্রিক বিস্তারিত ব্রেকডাউন
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center font-mono">
                      {[
                        { label: "Technical", score: existingSubmission.rubric.technicalEditing, max: 20 },
                        { label: "Storytelling", score: existingSubmission.rubric.storytelling, max: 20 },
                        { label: "Pacing", score: existingSubmission.rubric.pacing, max: 15 },
                        { label: "Audio Mix", score: existingSubmission.rubric.audioDesign, max: 15 },
                        { label: "Visual Design", score: existingSubmission.rubric.visualDesign, max: 10 },
                        { label: "Color Grade", score: existingSubmission.rubric.colorGrading, max: 10 },
                        { label: "Delivery", score: existingSubmission.rubric.technicalDelivery, max: 10 },
                      ].map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                          <p className="text-[10px] text-slate-500 font-bold">{item.label}</p>
                          <p className="text-sm font-bold text-slate-900">
                            {item.score} <span className="text-[10px] text-slate-400">/{item.max}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Written General Commentary */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-sans">
                    <p className="text-xs font-mono uppercase text-emerald-800 font-bold font-bangla">ফ্যাকাল্টি সামগ্রিক পর্যবেক্ষণ</p>
                    <p className="text-xs text-slate-800 leading-relaxed font-bangla">
                      "{existingSubmission.mentorRemarks.generalComment}"
                    </p>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                      <p className="text-xs font-mono font-bold text-emerald-900 font-bangla">চিহ্নিত শক্তিশালী দিকসমূহ (Strengths)</p>
                      <ul className="space-y-1.5 text-xs text-slate-800 font-bangla">
                        {existingSubmission.mentorRemarks.strengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check size={13} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Areas for Improvement */}
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                      <p className="text-xs font-mono font-bold text-amber-900 font-bangla">উন্নতির ক্ষেত্রসমূহ (Revision Areas)</p>
                      <ul className="space-y-1.5 text-xs text-slate-800 font-bangla">
                        {existingSubmission.mentorRemarks.areasForImprovement.map((imp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <AlertCircle size={13} className="text-amber-700 flex-shrink-0 mt-0.5" />
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timestamped Timeline Feedback */}
                  {existingSubmission.mentorRemarks.timelineCritique.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-mono uppercase text-slate-600 font-bold">টাইমলাইন টাইমস্ট্যাম্প ক্রিটিক (Timestamp Critique)</p>
                      <div className="divide-y divide-slate-200 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
                        {existingSubmission.mentorRemarks.timelineCritique.map((tc, idx) => (
                          <div key={idx} className="p-3 flex items-start gap-3 text-xs">
                            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-900 font-mono font-bold text-[11px]">
                              {tc.timestamp}
                            </span>
                            <span className="text-slate-800 font-bangla">{tc.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Tab 4: Discussion & Community Comments */}
          {activeTab === "discussion" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-base font-bold font-mono text-slate-900">মডিউল ডিসকাশন ও মেন্টর ফোরাম</h3>
                <p className="text-xs text-slate-600 font-bangla">
                  যেকোনো কারিগরি প্রশ্ন করুন, টাইমলাইনের অগ্রগতি শেয়ার করুন এবং অভিজ্ঞ এডিটরদের থেকে পরামর্শ নিন।
                </p>
              </div>

              {/* New Comment Box */}
              <form onSubmit={handlePostComment} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center border border-slate-200">
                    {studentName.slice(0, 2).toUpperCase()}
                  </div>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="আপনার ডিসপ্লে নাম"
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs w-48 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  required
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="একটি টেকনিক শেয়ার করুন অথবা এই মডিউলের ওয়ার্কফ্লো সম্পর্কে প্রশ্ন লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bangla focus:bg-white focus:border-emerald-600 focus:outline-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs font-bangla"
                  >
                    <Send size={13} />
                    <span>মন্তব্য পোস্ট করুন</span>
                  </button>
                </div>
              </form>

              {/* Threaded Comments List */}
              <div className="space-y-4">
                {combinedComments.map((c) => {
                  const roleBadge = {
                    mentor: "bg-purple-100 text-purple-900 border-purple-200",
                    alumni: "bg-amber-100 text-amber-900 border-amber-200",
                    student: "bg-emerald-100 text-emerald-900 border-emerald-200",
                  }[c.role] || "bg-slate-100 text-slate-800";

                  return (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center border border-slate-200">
                            {c.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 font-mono">{c.author}</span>
                              <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-extrabold uppercase border ${roleBadge}`}>
                                {c.role}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{c.timeAgo}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => likeComment(c.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition-colors"
                        >
                          <ThumbsUp size={12} className={Boolean((c as any).likedByMe) ? "text-emerald-600" : ""} />
                          <span>{c.likes}</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-800 leading-relaxed font-bangla">{c.content}</p>

                      {/* Mentor Replies */}
                      {c.replies && c.replies.length > 0 && (
                        <div className="pl-6 pt-2 space-y-2 border-l-2 border-slate-200">
                          {c.replies.map((rep, rIdx) => (
                            <div key={rIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 font-mono">{rep.author}</span>
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-purple-100 text-purple-900 border border-purple-200">
                                  {rep.role}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">{rep.timeAgo}</span>
                              </div>
                              <p className="text-xs text-slate-700 leading-relaxed font-bangla">{rep.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 5: Technical Skill Quiz (No XP) */}
          {activeTab === "quiz" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white space-y-6 max-w-2xl shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-700 font-bangla flex items-center gap-1">
                    <Sparkles size={12} className="text-[#3B5BDB]" />
                    <span>মডিউল দক্ষতা যাচাই (Knowledge Check)</span>
                  </span>
                  <span className="text-xs font-mono text-blue-700 font-bold font-bangla">ভেরিফিকেশন টেস্ট</span>
                </div>
                <h3 className="text-base font-bold font-mono text-slate-900 font-bangla">
                  {currentModule.quiz.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentModule.quiz.options.map((opt, idx) => {
                  const isSelected = selectedQuizIdx === idx;
                  const isCorrect = idx === currentModule.quiz.correctIdx;
                  let cardStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300";

                  if (quizSubmitted) {
                    if (isCorrect) {
                      cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                    } else if (isSelected) {
                      cardStyle = "bg-rose-50 border-rose-500 text-rose-950 font-bold";
                    }
                  } else if (isSelected) {
                    cardStyle = "bg-blue-50 border-2 border-[#3B5BDB] text-blue-950 font-bold";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !quizSubmitted && setSelectedQuizIdx(idx)}
                      disabled={quizSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-xs font-mono font-medium transition-all flex items-center justify-between font-bangla ${cardStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <Check size={16} className="text-emerald-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation (No unicode icons) */}
              {quizSubmitted && (
                <div
                  className={`p-4 rounded-xl border space-y-1 text-xs font-mono ${
                    quizResult
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : "bg-rose-50 border-rose-300 text-rose-950"
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5 font-bangla">
                    {quizResult ? (
                      <>
                        <CheckCircle2 size={15} className="text-emerald-600" />
                        <span>সঠিক উত্তর!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={15} className="text-rose-600" />
                        <span>ভুল উত্তর, পুনরায় চেষ্টা করুন</span>
                      </>
                    )}
                  </p>
                  <p className="font-bangla text-slate-700">{currentModule.quiz.explanation}</p>
                </div>
              )}

              {/* Verify Button (SAAS Blue) */}
              {!quizSubmitted ? (
                <button
                  onClick={handleVerifyQuiz}
                  disabled={selectedQuizIdx === null}
                  className="w-full py-2.5 rounded-lg bg-[#3B5BDB] hover:bg-[#2F4AC0] disabled:opacity-50 text-white font-mono font-bold text-xs transition-all shadow-xs font-bangla"
                >
                  উত্তর যাচাই করুন
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedQuizIdx(null);
                  }}
                  className="w-full py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#3B5BDB] border border-blue-200 font-mono text-xs font-bold font-bangla"
                >
                  পুনরায় কুইজ দিন
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* ── RIGHT COLUMN: 36-MODULE SIDEBAR NAVIGATOR (Corporate Light Theme) ── */}
        {sidebarOpen && (
          <aside className="w-80 lg:w-96 border-l border-slate-200 bg-white flex flex-col h-[calc(100vh-60px)] sticky top-[57px] flex-shrink-0 shadow-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase text-slate-900 font-bangla">কোর্স কারিকুলাম</h3>
                <p className="text-[11px] font-mono text-slate-500 font-bangla">
                  {state.completedModuleIds.length} / ৩৬ মডিউল সম্পন্ন ({metrics.progressPercent}%)
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200 font-bangla">
                রুব্রিক {metrics.cumulativeScore}%
              </span>
            </div>

            {/* Modules List by Stages */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-3">
              {CAPCUT_STAGES.map((st) => {
                const stageMods = CAPCUT_MODULES.filter((m) => m.stageId === st.id);
                return (
                  <div key={st.id} className="pt-2 first:pt-0 space-y-1">
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] font-mono font-bold font-bangla">
                      <span style={{ color: st.color }}>{st.number} · {st.title}</span>
                      <span className="text-slate-400">{st.moduleRange}</span>
                    </div>

                    <div className="space-y-0.5">
                      {stageMods.map((m) => {
                        const isActive = m.id === currentModule.id;
                        const isDone = state.completedModuleIds.includes(m.id);
                        const hasProj = Boolean(m.projectDeliverable);

                        return (
                          <Link
                            key={m.id}
                            href={`/learn/capcut-master-academy/${m.slug}`}
                            className={`w-full p-2.5 rounded-lg flex items-center justify-between text-xs transition-all ${
                              isActive
                                ? "bg-blue-50 border-2 border-[#3B5BDB] text-slate-950 font-bold shadow-2xs"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 ${
                                  isDone
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                    : "bg-slate-100 text-slate-500 border border-slate-200"
                                }`}
                              >
                                {isDone ? <Check size={12} className="text-emerald-700" /> : m.id}
                              </span>

                              <div className="min-w-0">
                                <p className="font-mono text-xs truncate leading-tight font-bangla">
                                  {m.title.replace(/^Module \d+:\s*/, "")}
                                </p>
                                <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 font-bangla">
                                  <span>{m.duration}</span>
                                  {hasProj && (
                                    <span className="text-[#3B5BDB] font-bold flex items-center gap-0.5">
                                      <Sparkles size={10} /> প্রজেক্ট
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>

                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BDB] animate-pulse flex-shrink-0" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}
      </div>

      {/* ── REPLACE / PASTE YOUTUBE URL MODAL ── */}
      {urlModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-slate-300 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold font-mono text-slate-900 flex items-center gap-2 font-bangla">
                <Edit3 size={16} className="text-[#3B5BDB]" />
                <span>ভিডিও লিংক পরিবর্তন করুন</span>
              </h3>
              <p className="text-xs text-slate-600 font-bangla">
                যেকোনো ইউটিউব ভিডিও লিংক অথবা ভিডিও আইডি পেস্ট করুন। এটি সাথে সাথে এই প্লেয়ারে চালু হবে।
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-700 font-bold font-bangla">নতুন YouTube Video URL / ID:</label>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=wX-y4Tq3Jk0"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs focus:bg-white focus:border-[#3B5BDB] focus:outline-none"
              />
              <p className="text-[11px] font-mono text-slate-500 font-bangla">
                সাপোর্টেড ফরম্যাট: <code className="text-[#3B5BDB] font-bold">youtu.be/...</code>,{" "}
                <code className="text-[#3B5BDB] font-bold">youtube.com/watch?v=...</code>, অথবা ১১ অক্ষরের আইডি।
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setUrlModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold font-bangla"
              >
                বাতিল (Cancel)
              </button>
              <button
                onClick={handleSaveVideoUrl}
                className="px-4 py-2 rounded-lg bg-[#3B5BDB] hover:bg-[#2F4AC0] text-white font-mono font-bold text-xs font-bangla shadow-xs"
              >
                ভিডিও যুক্ত করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
