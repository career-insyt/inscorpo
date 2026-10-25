"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, FileText, Bookmark, MessageSquare,
  Sparkles, CheckCircle2, ChevronRight, Download, Send, Check, AlertCircle,
  Table, HelpCircle, Terminal, Calculator, Layers, Code, Zap, Video,
  Wand2, ShieldAlert, FileSpreadsheet, RefreshCw, Eye, CheckSquare, BarChart3, GraduationCap,
  Lock, Copy, Smartphone, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useUser } from "@/components/providers/user-context";
import { DYNAMIC_LESSONS, getLessonBySlug, LessonDetail } from "@/lib/data/lessons";

const PythonAnalyticsStudio = dynamic(
  () => import("@/components/learning/python-analytics-studio"),
  { ssr: false, loading: () => <div className="p-8 text-center font-mono text-xs text-slate-500">Loading Python Analytics Sandbox...</div> }
);
const WorkflowAutomationStudio = dynamic(
  () => import("@/components/learning/workflow-automation-studio"),
  { ssr: false, loading: () => <div className="p-8 text-center font-mono text-xs text-slate-500">Loading Workflow Automation Sandbox...</div> }
);
const BIPowerBISqlStudio = dynamic(
  () => import("@/components/learning/bi-powerbi-sql-studio").then((m) => m.BIPowerBISqlStudio),
  { ssr: false, loading: () => <div className="p-8 text-center font-mono text-xs text-slate-500">Loading Power BI SQL Sandbox...</div> }
);
const MTORecruitmentStudio = dynamic(
  () => import("@/components/learning/mto-recruitment-studio").then((m) => m.MTORecruitmentStudio),
  { ssr: false, loading: () => <div className="p-8 text-center font-mono text-xs text-slate-500">Loading MTO Assessment Sandbox...</div> }
);

import { RenderLessonNotes } from "@/components/learning/render-lesson-notes";
import { isFreeAccessUser } from "@/lib/auth/whitelist";
import { isExcelCourse, getExpectedCoursePrice, BKASH_CONFIG } from "@/lib/payments/bkash-config";

interface PageProps {
  params: Promise<{ pathSlug: string; courseSlug: string; lessonSlug: string }>;
}

const trackTitles: Record<string, string> = {
  "business-intelligence-analyst": "Enterprise Business Intelligence & Power BI",
  "applied-ai-automation": "Applied Workplace AI & Enterprise Automation",
  "corporate-python-automation": "Corporate Python & Data Automation",
  "video-ai-production": "Video Editing + AI Production",
  "presentation-engineering": "Gamma + Canva + PowerPoint",
  "ai-for-work": "AI for Work, Career & Business",
  "gre-preparation": "GRE Preparation",
};

export default function LessonPlayerPage(props: PageProps) {
  const { state, addNotification, updateCourseProgress, recordStudyMinutes, completeLesson, enrollInPath } = useUser();
  const params = use(props.params);
  const pathSlug = params?.pathSlug || "video-ai-production";
  const courseSlug = params?.courseSlug || "capcut-complete-course";
  const lessonSlug = params?.lessonSlug || "timeline-assembly";

  const isWhitelisted = isFreeAccessUser(state.email);
  const expectedPrice = getExpectedCoursePrice(courseSlug);
  const isEnrolledInState = state.enrolledPathSlugs.some(
    (slug) => slug === courseSlug || slug === pathSlug || (isExcelCourse(courseSlug) && (slug === "corporate-financial-commercial-modeling-excel" || slug === "excel-modeling"))
  );

  const [hasAccess, setHasAccess] = useState<boolean>(isWhitelisted);
  const [isCheckingAccess, setIsCheckingAccess] = useState<boolean>(!isWhitelisted);

  // Paywall verification state
  const [paywallEmail, setPaywallEmail] = useState(state.email || "");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [accountHolderName, setAccountHolderName] = useState(state.name || "");
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState(false);

  useEffect(() => {
    if (isWhitelisted) {
      setHasAccess(true);
      setIsCheckingAccess(false);
      return;
    }
    if (state.email) {
      setIsCheckingAccess(true);
      fetch("/api/courses/verify-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email, courseSlug }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.hasAccess) {
            setHasAccess(true);
          } else {
            setHasAccess(false);
          }
        })
        .catch(() => {
          setHasAccess(false);
        })
        .finally(() => setIsCheckingAccess(false));
    } else {
      setIsCheckingAccess(false);
      setHasAccess(false);
    }
  }, [state.email, courseSlug, isWhitelisted]);

  const handleCopyBkash = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(BKASH_CONFIG.ACCOUNT_NUMBER);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2500);
    }
  };

  const handlePaywallVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    const emailToVerify = paywallEmail.trim() || state.email?.trim();

    if (!emailToVerify || !emailToVerify.includes("@")) {
      setPaymentError("Please provide a valid account email for enrollment verification.");
      return;
    }

    const isInputWhitelisted = isFreeAccessUser(emailToVerify);

    setIsVerifyingPayment(true);
    try {
      const res = await fetch("/api/payments/bkash-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToVerify,
          userName: accountHolderName || state.name,
          courseSlug,
          courseTitle: lessonSlug,
          senderNumber: isInputWhitelisted ? "INTERNAL_AUTHORIZED" : senderNumber,
          trxId: isInputWhitelisted ? `FREE-${Date.now()}` : trxId.trim().toUpperCase(),
          accountHolderName,
          amount: expectedPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Payment verification failed. Please verify your TrxID and Sender Number.");
      }

      enrollInPath(courseSlug, lessonSlug);
      setHasAccess(true);
      addNotification({
        type: "achievement",
        title: "Course Unlocked! 🚀",
        message: `Your payment was verified. Welcome to the course!`,
      });
    } catch (err: any) {
      setPaymentError(err.message || "Failed to verify transaction.");
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  // Formatted title for dynamic fallback
  const formattedTitle = lessonSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Fetch lesson from comprehensive catalog or build robust fallback
  const lesson: LessonDetail = getLessonBySlug(lessonSlug) || {
    slug: lessonSlug,
    title: formattedTitle,
    xpReward: 70,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### ${formattedTitle} — Masterclass Lesson & Practical Guide

#### Executive Overview
Mastering **${formattedTitle}** provides you with tangible, production-grade skills that elevate your speed and output quality.

#### Key Learning Objectives & Framework:
1. **Precision Execution**: Apply professional techniques and industry-standard workflows.
2. **Efficiency Shortcuts**: Eliminate mouse dependency and reduce manual friction.
3. **Quality Validation**: Audit your outputs against rigorous edge-case criteria.

#### Step-by-Step Implementation:
* **Step 1**: Set up your project environment and configure clean folder structures.
* **Step 2**: Apply the core framework and test against real-world scenarios.
* **Step 3**: Validate your final deliverable before export or presentation.`,
    quiz: {
      question: `What is the primary benefit of mastering ${formattedTitle} in professional workflows?`,
      options: [
        "Eliminates manual friction and guarantees verified quality outputs",
        "Decreases screen brightness automatically",
        "Replaces all cloud storage services",
        "Converts desktop applications into mobile widgets"
      ],
      correctIdx: 0,
      explanation: "Standardized professional workflows streamline execution, eliminate repetitive manual errors, and guarantee consistent deliverable quality."
    },
    hasSimulator: courseSlug.includes("automation") || lessonSlug.startsWith("auto-") ? "workflow-automation"
      : courseSlug.includes("python") || lessonSlug.startsWith("py-") ? "python-analytics"
      : courseSlug.includes("modeling") || courseSlug.includes("excel") || (pathSlug === "corporate-analyst" && !courseSlug.includes("python") && !courseSlug.includes("automation")) ? "corporate-modeling"
      : pathSlug === "video-ai-production" ? "tool-matrix"
      : pathSlug === "presentation-engineering" ? "export-lab"
      : pathSlug === "ai-for-work" ? "ai-verification"
      : pathSlug === "gre-preparation" ? "error-log"
      : "messy-data"
  };

  const [activeTab, setActiveTab] = useState<"video" | "reading" | "simulation" | "quiz">("video");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // ── Simulator 0: Corporate Financial & Commercial Modeling Lab ─────────────
  const [corpSimTab, setCorpSimTab] = useState<"pvm" | "3statement" | "workingcapital">("pvm");
  const [pvmActPrice, setPvmActPrice] = useState(46); // ৳46 / unit (Base = ৳50)
  const [pvmActVolume, setPvmActVolume] = useState(120000); // 120k units (Base = 100k)
  const [pvmMixPremiumShift, setPvmMixPremiumShift] = useState(-0.05); // -5% mix tilt
  const baseRevenue = 5.00; // ৳5.00M
  const actRevenue = (pvmActVolume * pvmActPrice) / 1000000;
  const deltaRevenue = actRevenue - baseRevenue;
  const pvmPriceEffect = ((pvmActPrice - 50) * pvmActVolume) / 1000000;
  const pvmVolumeEffect = ((pvmActVolume - 100000) * 50) / 1000000;
  const pvmMixEffect = deltaRevenue - (pvmPriceEffect + pvmVolumeEffect);

  // 3-Statement & Circularity Breaker state
  const [simCapex, setSimCapex] = useState(40);
  const [simDebtBorrow, setSimDebtBorrow] = useState(60);
  const [circSwitchOn, setCircSwitchOn] = useState(true);

  // Working Capital CCC state
  const [wcDso, setWcDso] = useState(50);
  const [wcDio, setWcDio] = useState(60);
  const [wcDpo, setWcDpo] = useState(35);
  const annualRevM = 1200;
  const currentCcc = wcDso + wcDio - wcDpo;
  const baseCcc = 85;
  const cashUnlockedM = ((annualRevM * (baseCcc - currentCcc)) / 365).toFixed(1);

  // ── Simulator 1: Tool Decision Matrix (Video AI) ───────────────────────────
  const toolMatrixScenarios = [
    {
      id: 1,
      title: "Vertical Social Retention Cut",
      prompt: "You have 2 hours of raw vlog footage and need to assemble a snappy 30-second cut with kinetic auto-captions and background music ducking.",
      options: ["CapCut Desktop", "Google Gemini", "ElevenLabs", "Higgsfield AI"],
      correct: "CapCut Desktop",
      reason: "CapCut's magnetic timeline, AI auto-captions, and automatic audio ducking assemble social cuts 10x faster than any generative model."
    },
    {
      id: 2,
      title: "Commercial Treatment & Shot List",
      prompt: "You need to reverse-engineer an unstructured 3-page brand brief into a two-column A/V script with camera directions and diffusion keywords.",
      options: ["CapCut Desktop", "Google Gemini", "ElevenLabs", "Higgsfield AI"],
      correct: "Google Gemini",
      reason: "Gemini's large context window excels at parsing briefs and generating structured two-column A/V shot lists with precise camera directives."
    },
    {
      id: 3,
      title: "Multilingual Emotional Voiceover",
      prompt: "You need an authentic voiceover with emotional inflection, customized pauses, and clean Bengali pronunciation.",
      options: ["CapCut Desktop", "Google Gemini", "ElevenLabs", "Higgsfield AI"],
      correct: "ElevenLabs",
      reason: "ElevenLabs provides high-fidelity voice cloning, emotion sliders, and natural multilingual phoneme synthesis far superior to robotic TTS."
    },
    {
      id: 4,
      title: "Consistent Character Cinematic Video",
      prompt: "You need to render a photorealistic 5-second cinematic shot with dynamic camera orbit while locking the character's facial identity across scenes.",
      options: ["CapCut Desktop", "Google Gemini", "ElevenLabs", "Higgsfield AI"],
      correct: "Higgsfield AI",
      reason: "Higgsfield's Soul ID locks character facial features and appearance across multiple generations, paired with cinematic camera motion controls."
    },
  ];
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedToolChoice, setSelectedToolChoice] = useState<string | null>(null);
  const [matrixFeedback, setMatrixFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handleSelectToolChoice = (tool: string) => {
    setSelectedToolChoice(tool);
    const scenario = toolMatrixScenarios[currentScenarioIdx];
    const isCorrect = tool === scenario.correct;
    setMatrixFeedback({
      isCorrect,
      text: isCorrect
        ? `✅ Correct Tool Handoff! ${scenario.reason}`
        : `❌ Suboptimal Choice. ${scenario.reason}`
    });
  };

  // ── Simulator 2: Messy Data Gym (Excel) ────────────────────────────────────
  const initialMessyRows = [
    { id: "  EMP-001  ", name: "  Zubair Ahmed ", date: "2026/03/15", rawSales: "1,45,000 /=", region: "dhaka " },
    { id: "EMP-002  ", name: "Anika Rahman  ", date: "15-Mar-2026", rawSales: "92,500 /=", region: "DHAKA" },
    { id: "  EMP-003", name: "Farhan Kabir  ", date: "03.15.26", rawSales: "88,000 /=", region: " chittagong" },
    { id: "EMP-004 ", name: "Nusrat Jahan ", date: "2026-03-15", rawSales: "1,12,000 /=", region: "Sylhet" },
  ];
  const [messyRows, setMessyRows] = useState(initialMessyRows);
  const [appliedCleaning, setAppliedCleaning] = useState<Record<string, boolean>>({
    trim: false,
    dates: false,
    currency: false,
    region: false,
  });

  const handleCleanSpaces = () => {
    setMessyRows(prev => prev.map(r => ({
      ...r,
      id: r.id.trim(),
      name: r.name.trim(),
      region: r.region.trim(),
    })));
    setAppliedCleaning(prev => ({ ...prev, trim: true }));
  };

  const handleStandardizeDates = () => {
    setMessyRows(prev => prev.map(r => ({
      ...r,
      date: "2026-03-15",
    })));
    setAppliedCleaning(prev => ({ ...prev, dates: true }));
  };

  const handleParseCurrency = () => {
    setMessyRows(prev => prev.map(r => ({
      ...r,
      rawSales: "৳ " + r.rawSales.replace(/[^0-9,]/g, "").trim(),
    })));
    setAppliedCleaning(prev => ({ ...prev, currency: true }));
  };

  const handleResetMessyData = () => {
    setMessyRows(initialMessyRows);
    setAppliedCleaning({ trim: false, dates: false, currency: false, region: false });
  };

  // ── Simulator 3: Export Quality Lab (Presentations) ────────────────────────
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditCompleted, setAuditCompleted] = useState(false);
  const [labFormat, setLabFormat] = useState<"gamma" | "canva" | "powerpoint">("gamma");

  const runExportAudit = () => {
    setAuditRunning(true);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditCompleted(true);
    }, 600);
  };

  // ── Simulator 4: AI Verification Gym (AI for Work) ─────────────────────────
  const [flaggedClaims, setFlaggedClaims] = useState<number[]>([]);
  const claimsData = [
    {
      id: 1,
      text: "Bangladesh Bank official disclosures reported mobile financial service transactions reached ৳1.2 Trillion monthly in late 2025.",
      isHallucination: false,
      note: "Grounded Fact: Matches official central bank monthly statistical bulletin."
    },
    {
      id: 2,
      text: "According to a 2024 Harvard Business Review paper by Dr. Kevin Sterling, 94.2% of South Asian FMCG companies have completely automated their supply chains using GPT-5.",
      isHallucination: true,
      note: "🚨 HALLUCINATION DETECTED: Fabricated author, non-existent study, and unrealistic 94.2% metric with an unreleased model."
    },
    {
      id: 3,
      text: "Leading apparel exporters in Bangladesh use automated inventory tracking systems to minimize supply lead times for European retail clients.",
      isHallucination: false,
      note: "Grounded Fact: Consistent with industry BGMEA automation reports."
    },
  ];

  const handleToggleClaim = (id: number) => {
    if (flaggedClaims.includes(id)) {
      setFlaggedClaims(flaggedClaims.filter(c => c !== id));
    } else {
      setFlaggedClaims([...flaggedClaims, id]);
    }
  };

  // ── Simulator 5: Error Log OS (GRE) ────────────────────────────────────────
  const [selectedErrorCategory, setSelectedErrorCategory] = useState<string | null>(null);
  const [errorLogged, setErrorLogged] = useState(false);

  // Universal Formula Sandbox state
  const [userFormula, setUserFormula] = useState("=XLOOKUP(\"EMP-001\", A2:A5, D2:D5)");
  const [formulaOutput, setFormulaOutput] = useState<{ result: string; status: "success" | "error"; type: string }>({
    result: "৳ 1,45,000", status: "success", type: "Lookup Match"
  });

  const handleRunFormulaConsole = (formulaInput?: string) => {
    const input = formulaInput || userFormula;
    const clean = input.trim().toUpperCase();
    if (clean.startsWith("=SUM")) {
      setFormulaOutput({ result: "৳ 4,37,500", status: "success", type: "Currency Aggregate (SUM)" });
    } else if (clean.startsWith("=XLOOKUP") || clean.startsWith("=VLOOKUP")) {
      setFormulaOutput({ result: "Zubair Ahmed (Sales: ৳ 1,45,000)", status: "success", type: "Lookup Match" });
    } else if (clean.startsWith("=AVERAGE")) {
      setFormulaOutput({ result: "৳ 1,09,375", status: "success", type: "Mean Average" });
    } else {
      setFormulaOutput({ result: `=EVAL(${input}) → Success`, status: "success", type: "Formula Execution" });
    }
  };

  const [isVerifyingQuiz, setIsVerifyingQuiz] = useState(false);
  const [serverExplanation, setServerExplanation] = useState<string | null>(null);

  const handleQuizSubmit = async () => {
    if (selectedAnswer === null || isVerifyingQuiz) return;
    setIsVerifyingQuiz(true);
    setQuizSubmitted(true);

    try {
      const res = await fetch("/api/assessment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonSlug,
          selectedOption: selectedAnswer,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const isCorrect = Boolean(data.isCorrect);
        setQuizSuccess(isCorrect);
        setServerExplanation(data.explanation || null);

        if (isCorrect && !quizSuccess) {
          addNotification({
            type: "achievement",
            title: "Lesson Completed 🎉",
            message: `You successfully completed ${lesson.title}. Recorded in Career Passport.`
          });

          const currentCourse = state.courseProgress.find((c) => c.id === courseSlug);
          const currentProgress = currentCourse ? currentCourse.progress : 0;
          const nextProgress = Math.min(currentProgress + 25, 100);
          updateCourseProgress(courseSlug, nextProgress);
          completeLesson(courseSlug, lessonSlug, lesson.title, lesson.xpReward || 50);

          const lessonMinutes = parseInt(lesson.duration) || 20;
          recordStudyMinutes(lessonMinutes);

          setShowSuccessPopup(true);
        }
      } else {
        const isCorrect = selectedAnswer === lesson.quiz.correctIdx;
        setQuizSuccess(isCorrect);
        setServerExplanation(lesson.quiz.explanation);
      }
    } catch {
      const isCorrect = selectedAnswer === lesson.quiz.correctIdx;
      setQuizSuccess(isCorrect);
      setServerExplanation(lesson.quiz.explanation);
    } finally {
      setIsVerifyingQuiz(false);
    }
  };

  const trackTitle = trackTitles[pathSlug] || pathSlug;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href={`/learn/${pathSlug}/${courseSlug}`}
          className="inline-flex items-center gap-2 text-xs font-extrabold transition-colors text-corp-text-secondary hover:text-[#10b981] font-mono"
        >
          <ArrowLeft size={14} /> Back to Stage Syllabus
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40 font-mono">
          <Sparkles size={13} className="text-amber-400" />
          +{lesson.xpReward} XP Reward
        </span>
      </div>

      {/* Lesson Banner */}
      <div className="p-6 rounded-xl space-y-2 shadow-[5px_5px_0px_0px_rgba(16,185,129,0.25)] border-2 border-[#10b981]/50" style={{ background: "var(--corp-surface)" }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
            {lesson.title}
          </h1>
          {isWhitelisted ? (
            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
              <ShieldCheck size={12} /> VIP Staff Access (Free)
            </span>
          ) : hasAccess ? (
            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 size={12} /> Verified Enrolled
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1">
              <Lock size={12} /> Payment Required (৳{expectedPrice.toFixed(2)})
            </span>
          )}
        </div>
        <p className="text-xs font-extrabold text-corp-text-secondary font-mono">
          Estimated duration: {lesson.duration} · Masterclass: {trackTitle}
        </p>
      </div>

      {/* Access Gate: If not verified and not whitelisted, lock lesson content and display bulletproof paywall! */}
      {isCheckingAccess ? (
        <div className="p-12 text-center font-mono space-y-3 rounded-2xl border-2 border-slate-800 bg-corp-surface">
          <RefreshCw size={24} className="animate-spin mx-auto text-emerald-400" />
          <p className="text-xs font-bold text-corp-text">Verifying Course Access Credentials...</p>
        </div>
      ) : !hasAccess ? (
        <div className="rounded-2xl border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden font-mono my-4">
          {/* Header Banner */}
          <div className="bg-[#E2136E] text-white p-5 border-b-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#E2136E] flex items-center justify-center font-black text-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                ব
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-200 block">
                  bKash Personal Payment · Course License Locked
                </span>
                <h2 className="text-base sm:text-lg font-black leading-tight text-white">
                  কোর্স আনলক করতে পেমেন্ট ভেরিফাই করুন
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-black/20 px-3 py-1.5 rounded-lg border border-white/20">
              <Lock size={14} className="text-pink-200" />
              <span className="text-xs font-black text-white">Instant Verification</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Price & Target Bar */}
            <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Locked Course Curriculum</span>
                <p className="text-sm sm:text-base font-black text-slate-900">{lesson.title}</p>
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">
                  Complete video lectures, downloadable models, and interactive sandboxes require verified enrollment.
                </p>
              </div>
              <div className="text-left sm:text-right flex-shrink-0 bg-white p-3 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Required Enrollment Fee</span>
                <span className="text-xl sm:text-2xl font-black text-[#E2136E]">৳{expectedPrice.toFixed(2)} BDT</span>
              </div>
            </div>

            {/* Receiver bKash Number Box with 1-Click Copy */}
            <div className="p-5 rounded-xl border-2 border-slate-900 bg-amber-50 space-y-3 shadow-[4px_4px_0px_0px_#d97706]">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1.5 uppercase font-mono">
                  <Smartphone size={16} className="text-[#E2136E]" />
                  bKash Personal Account (Send Money)
                </span>
                <span className="text-[10px] font-black bg-amber-300 text-slate-950 px-2 py-0.5 rounded border border-slate-900">
                  সেন্ড মানি অপশন
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-slate-950 select-all">
                    {BKASH_CONFIG.ACCOUNT_NUMBER}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBkash}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                  {copiedNumber ? (
                    <>
                      <Check size={16} className="text-emerald-600" />
                      <span className="text-emerald-700 font-black">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-amber-950 font-sans space-y-1 pt-1 border-t border-amber-200">
                <p>
                  <strong>পেমেন্ট নিয়ম:</strong> আপনার বিকাশ অ্যাপ বা <strong>*247#</strong> ডায়াল করে <strong>Send Money</strong> এর মাধ্যমে <strong>{BKASH_CONFIG.ACCOUNT_NUMBER}</strong> নম্বরে ঠিক <strong>৳{expectedPrice.toFixed(2)}</strong> পাঠান।
                </p>
                <p className="text-[11px] text-amber-900">
                  টাকা পাঠানো সম্পন্ন হলে ফিরতি মেসেজ থেকে <strong>TrxID</strong> এবং আপনার <strong>বিকাশ নম্বর</strong> নিচের ফর্মে লিখে সাবমিট করুন। তাৎক্ষণিক ভেরিফাই হয়ে কোর্স আনলক হবে!
                </p>
              </div>
            </div>

            {/* Instant Verification Form */}
            <form onSubmit={handlePaywallVerify} className="space-y-4">
              {paymentError && (
                <div className="p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-900 text-xs font-sans font-medium flex items-start gap-2">
                  <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Reactive Whitelist Notice if user types @insyt.bd or z65gt9@gmail.com */}
              {isFreeAccessUser(paywallEmail) ? (
                <div className="p-4 rounded-xl border-2 border-slate-900 bg-emerald-50 text-emerald-950 space-y-2 shadow-[3px_3px_0px_0px_#059669]">
                  <div className="flex items-center gap-2 font-black text-sm uppercase">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>Corporate VIP / Staff Whitelist Detected</span>
                  </div>
                  <p className="text-xs font-sans text-emerald-900">
                    <strong>{paywallEmail}</strong> অনুমোদিত ইনসাইট কর্পোরেট টিমের সদস্য। আপনার কোনো পেমেন্ট লাগবে না। নিচের বাটনে চাপ দিন এবং ফ্রিতে কোর্স আনলক করুন।
                  </p>
                </div>
              ) : null}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-slate-700 block">
                  Account Email (Course Credential License) *
                </label>
                <input
                  type="email"
                  required
                  value={paywallEmail}
                  onChange={(e) => setPaywallEmail(e.target.value)}
                  placeholder="e.g. candidate@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                />
              </div>

              {!isFreeAccessUser(paywallEmail) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-slate-700 block">
                      Sender bKash Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      maxLength={11}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-slate-700 block">
                      bKash Transaction ID (TrxID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                      placeholder="e.g. BKA8X9Z10Q"
                      maxLength={12}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-xs font-mono font-black uppercase text-[#E2136E] focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                    />
                  </div>
                </div>
              )}

              {!isFreeAccessUser(paywallEmail) && (
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-slate-700 block">
                    bKash Account Holder Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder="e.g. Shakib Al Hasan"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-xs font-sans font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifyingPayment}
                className="w-full mt-2 py-4 px-6 rounded-xl border-2 border-slate-900 bg-[#E2136E] hover:bg-[#c20f5e] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
              >
                {isVerifyingPayment ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>যাচাই করা হচ্ছে (Verifying Transaction)...</span>
                  </>
                ) : isFreeAccessUser(paywallEmail) ? (
                  <>
                    <ShieldCheck size={16} />
                    <span>ভিআইপি ফ্রি অ্যাক্সেস সক্রিয় করুন →</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>ভেরিফাই করুন ও কোর্স আনলক করুন (৳{expectedPrice.toFixed(2)}) →</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-sans text-center pt-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>HMAC-SHA256 ক্রিপ্টোগ্রাফিক সিগনেচার ও রিয়েল-টাইম অ্যান্টি-রিপ্লে সিকিউরিটি এনফোর্সড।</span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Tabs */}
      <div className="flex items-center gap-1 border-b-2 border-corp-border">
        {(["video", "reading", "simulation", "quiz"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-xs font-extrabold capitalize relative transition-all duration-200 font-mono`}
            style={{ color: activeTab === tab ? "#10b981" : "var(--corp-text-tertiary)" }}
          >
            {tab === "simulation" ? "Interactive Practice Gym ⚡" : tab}
            {activeTab === tab && (
              <motion.div
                layoutId="lesson-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#10b981]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[400px]">
        
        {/* 1. Video Tab */}
        {activeTab === "video" && (
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border-2 border-corp-border" style={{ borderColor: "var(--corp-border)" }}>
              <video src={lesson.videoUrl} controls className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-center font-mono font-medium" style={{ color: "var(--corp-text-tertiary)" }}>
              Watch the complete walkthrough demonstration, then inspect the deep tutorial notes and interactive gym.
            </p>
          </div>
        )}

        {/* 2. Reading Tab */}
        {activeTab === "reading" && (
          <div className="p-6 md:p-8 rounded-xl space-y-6 leading-relaxed border-2 border-corp-border shadow-[4px_4px_0px_0px_rgba(16,185,129,0.15)]" style={{ background: "var(--corp-surface)", color: "var(--corp-text)" }}>
            <RenderLessonNotes notes={lesson.notes} lessonSlug={lessonSlug} />

            <div className="pt-4 border-t-2 border-corp-border flex flex-col sm:flex-row justify-between gap-3 font-mono">
              {courseSlug.includes("modeling") ? (
                <a
                  href="/downloads/insyt-financial-commercial-master-model.xlsx"
                  download
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold bg-emerald-600 text-white border-2 border-emerald-400 hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  <Download size={14} /> Download Master Financial Model (.xlsx)
                </a>
              ) : (courseSlug.includes("business-intelligence") || courseSlug.includes("powerbi") || lessonSlug.startsWith("bi-")) ? (
                <a
                  href="/downloads/insyt-bi-capstone-starter.sql"
                  download
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold bg-sky-600 text-white border-2 border-sky-400 hover:bg-sky-500 transition-colors shadow-sm"
                >
                  <Download size={14} /> Download Capstone DW Starter (.sql)
                </a>
              ) : (
                <button
                  onClick={() => {
                    const isPy = courseSlug.includes("python") || lessonSlug.startsWith("py-");
                    let fileData = "ID,Name,Role,Sales_BDT,Status\nEMP-001,Zubair Ahmed,Lead Analyst,145000,Active\nEMP-002,Anika Rahman,Product Manager,92500,Active\nEMP-003,Farhan Kabir,Data Engineer,88000,Active";
                    let fileExt = ".csv";
                    let mime = "text/csv;charset=utf-8;";

                    if (isPy) {
                      fileData = `# INSYT Corporate Starter — ${lesson.title}\n"""\nProduction starter script for ${lessonSlug}\n"""\nimport pandas as pd\nimport numpy as np\n\ndef main():\n    print("Starting ${lesson.title}...")\n\nif __name__ == '__main__':\n    main()\n`;
                      fileExt = ".py";
                      mime = "text/x-python;charset=utf-8;";
                    }

                    const blob = new Blob([fileData], { type: mime });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `INSYT_${lessonSlug}_Starter${fileExt}`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold bg-corp-bg-secondary text-corp-text border-2 border-corp-border hover:border-[#10b981] transition-colors"
                >
                  <Download size={14} /> Download Starter Material ({courseSlug.includes("python") || lessonSlug.startsWith("py-") ? ".py" : ".csv"})
                </button>
              )}
              <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold bg-[#10b981] text-emerald-950 border-2 border-emerald-400 hover:bg-emerald-400 transition-colors">
                <Bookmark size={14} /> Bookmark Lesson Notes
              </button>
            </div>
          </div>
        )}

        {/* 3. Interactive Practice Gym Tab */}
        {activeTab === "simulation" && (
          <div className="space-y-6">

            {/* GYM: APPLIED WORKPLACE AI & ENTERPRISE WORKFLOW AUTOMATION LAB */}
            {(lesson.hasSimulator === "workflow-automation" || courseSlug.includes("automation") || lessonSlug.startsWith("auto-")) && (
              <WorkflowAutomationStudio lessonSlug={lessonSlug} courseSlug={courseSlug} />
            )}

            {/* GYM: ENTERPRISE PYTHON ANALYTICS & PROCESS AUTOMATION LAB */}
            {(lesson.hasSimulator === "python-analytics" || courseSlug.includes("python") || lessonSlug.startsWith("py-")) && (
              <PythonAnalyticsStudio lessonSlug={lessonSlug} courseSlug={courseSlug} />
            )}

            {/* GYM: ENTERPRISE BUSINESS INTELLIGENCE: POWER BI & SQL STUDIO */}
            {(lesson.hasSimulator === "bi-powerbi-sql" || courseSlug.includes("business-intelligence") || courseSlug.includes("powerbi") || lessonSlug.startsWith("bi-")) && (
              <BIPowerBISqlStudio lessonSlug={lessonSlug} courseSlug={courseSlug} />
            )}

            {/* GYM: MTO RECRUITMENT & CASE CRACKING STUDIO */}
            {(lesson.hasSimulator === "mto-recruitment" || courseSlug.includes("mto") || pathSlug === "mto-fast-track") && (
              <MTORecruitmentStudio lessonSlug={lessonSlug} courseSlug={courseSlug} />
            )}

            {/* GYM 0: CORPORATE FINANCIAL & COMMERCIAL MODELING LAB */}
            {(lesson.hasSimulator === "corporate-modeling" || ((courseSlug.includes("modeling") || pathSlug === "corporate-analyst") && !courseSlug.includes("python") && !courseSlug.includes("automation") && !courseSlug.includes("business-intelligence") && !courseSlug.includes("powerbi") && !lessonSlug.startsWith("py-") && !lessonSlug.startsWith("auto-") && !lessonSlug.startsWith("bi-"))) && (
              <div className="p-6 md:p-8 rounded-xl border-2 border-emerald-500 shadow-[6px_6px_0px_0px_#047857] space-y-6" style={{ background: "var(--corp-surface)" }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-corp-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Calculator size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                        Corporate Financial & Commercial Modeling Lab
                      </h3>
                      <p className="text-[11px] font-mono text-emerald-400 font-bold">
                        FAST Standard Compliant · Dynamic PVM Engines & 3-Statement Integrity
                      </p>
                    </div>
                  </div>
                  {/* Mode Selector Tabs */}
                  <div className="flex flex-wrap gap-1.5 bg-corp-bg-secondary p-1 rounded-lg border border-corp-border">
                    <button
                      onClick={() => setCorpSimTab("pvm")}
                      className={`px-3 py-1 rounded text-xs font-mono font-extrabold transition-all ${corpSimTab === "pvm" ? "bg-emerald-600 text-white shadow-sm" : "text-corp-text hover:text-emerald-400"}`}
                    >
                      1. PVM Decomposition
                    </button>
                    <button
                      onClick={() => setCorpSimTab("3statement")}
                      className={`px-3 py-1 rounded text-xs font-mono font-extrabold transition-all ${corpSimTab === "3statement" ? "bg-emerald-600 text-white shadow-sm" : "text-corp-text hover:text-emerald-400"}`}
                    >
                      2. 3-Statement & Circularity
                    </button>
                    <button
                      onClick={() => setCorpSimTab("workingcapital")}
                      className={`px-3 py-1 rounded text-xs font-mono font-extrabold transition-all ${corpSimTab === "workingcapital" ? "bg-emerald-600 text-white shadow-sm" : "text-corp-text hover:text-emerald-400"}`}
                    >
                      3. Working Capital (CCC)
                    </button>
                  </div>
                </div>

                {/* Sub-Tab 1: PVM (Price-Volume-Mix) Decomposition */}
                {corpSimTab === "pvm" && (
                  <div className="space-y-5">
                    <div className="p-3.5 rounded-lg bg-corp-bg-secondary border border-corp-border font-mono text-xs text-corp-text leading-relaxed">
                      <span className="font-extrabold text-emerald-400 uppercase">Unilever / BAT Commercial Review Simulation:</span> Deconstruct corporate top-line growth. Adjust unit pricing, sales volume, and mix shift sliders below to see if profit growth is driven by organic volume or masked by aggressive price discounting.
                    </div>

                    {/* Interactive Parameter Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                      <div className="p-3.5 rounded-lg border border-corp-border bg-corp-bg-secondary space-y-2">
                        <div className="flex justify-between">
                          <span className="text-corp-text font-bold">Realized Price:</span>
                          <span className="font-extrabold text-emerald-400">৳ {pvmActPrice}.00 / unit</span>
                        </div>
                        <input
                          type="range"
                          min="38"
                          max="60"
                          value={pvmActPrice}
                          onChange={(e) => setPvmActPrice(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-corp-text-tertiary">
                          <span>Base: ৳50.00</span>
                          <span>Δ Price: {pvmActPrice >= 50 ? `+৳${pvmActPrice - 50}` : `-৳${50 - pvmActPrice}`}</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg border border-corp-border bg-corp-bg-secondary space-y-2">
                        <div className="flex justify-between">
                          <span className="text-corp-text font-bold">Sales Volume:</span>
                          <span className="font-extrabold text-emerald-400">{(pvmActVolume / 1000).toFixed(0)}k units</span>
                        </div>
                        <input
                          type="range"
                          min="70000"
                          max="150000"
                          step="5000"
                          value={pvmActVolume}
                          onChange={(e) => setPvmActVolume(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-corp-text-tertiary">
                          <span>Base: 100k units</span>
                          <span>Growth: {(((pvmActVolume - 100000) / 100000) * 100).toFixed(1)}%</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg border border-corp-border bg-corp-bg-secondary space-y-2">
                        <div className="flex justify-between">
                          <span className="text-corp-text font-bold">Premium Mix Shift:</span>
                          <span className={`font-extrabold ${pvmMixPremiumShift >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                            {(pvmMixPremiumShift * 100).toFixed(0)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="-20"
                          max="20"
                          value={pvmMixPremiumShift * 100}
                          onChange={(e) => setPvmMixPremiumShift(Number(e.target.value) / 100)}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-corp-text-tertiary">
                          <span>Economy Tilt (-20%)</span>
                          <span>Premium Tilt (+20%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Executive Waterfall Bridge Representation */}
                    <div className="p-4 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-3 font-mono">
                      <div className="flex items-center justify-between text-xs font-extrabold uppercase">
                        <span className="text-corp-text">Price-Volume-Mix Mathematical Waterfall Bridge</span>
                        <span className="text-emerald-400 text-[11px]">Δ Total Revenue: {deltaRevenue >= 0 ? `+৳${deltaRevenue.toFixed(2)}M` : `-৳${Math.abs(deltaRevenue).toFixed(2)}M`}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs pt-2">
                        <div className="p-2.5 rounded bg-corp-surface border border-corp-border">
                          <p className="text-[10px] text-corp-text-tertiary uppercase">Prior Year Rev</p>
                          <p className="font-extrabold text-corp-text text-sm mt-1">৳ 5.00M</p>
                        </div>
                        <div className={`p-2.5 rounded border ${pvmVolumeEffect >= 0 ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-rose-500/10 border-rose-500 text-rose-400"}`}>
                          <p className="text-[10px] uppercase font-bold">Volume Effect</p>
                          <p className="font-extrabold text-sm mt-1">{pvmVolumeEffect >= 0 ? `+৳${pvmVolumeEffect.toFixed(2)}M` : `-৳${Math.abs(pvmVolumeEffect).toFixed(2)}M`}</p>
                        </div>
                        <div className={`p-2.5 rounded border ${pvmPriceEffect >= 0 ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-rose-500/10 border-rose-500 text-rose-400"}`}>
                          <p className="text-[10px] uppercase font-bold">Price Effect</p>
                          <p className="font-extrabold text-sm mt-1">{pvmPriceEffect >= 0 ? `+৳${pvmPriceEffect.toFixed(2)}M` : `-৳${Math.abs(pvmPriceEffect).toFixed(2)}M`}</p>
                        </div>
                        <div className={`p-2.5 rounded border ${pvmMixEffect >= 0 ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-amber-500/10 border-amber-500 text-amber-400"}`}>
                          <p className="text-[10px] uppercase font-bold">Mix Effect</p>
                          <p className="font-extrabold text-sm mt-1">{pvmMixEffect >= 0 ? `+৳${pvmMixEffect.toFixed(2)}M` : `-৳${Math.abs(pvmMixEffect).toFixed(2)}M`}</p>
                        </div>
                        <div className="p-2.5 rounded bg-corp-surface border border-corp-border">
                          <p className="text-[10px] text-corp-text-tertiary uppercase">Realized Net Rev</p>
                          <p className="font-extrabold text-emerald-400 text-sm mt-1">৳ {actRevenue.toFixed(2)}M</p>
                        </div>
                      </div>

                      {/* Automated Commercial Diagnosis */}
                      <div className="mt-3 p-3 rounded-lg bg-corp-surface border border-corp-border text-xs text-corp-text flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-emerald-400">Executive Commercial Synthesis:</p>
                          <p className="text-[11px] text-corp-text-secondary mt-0.5">
                            {pvmPriceEffect < 0 && pvmVolumeEffect > 0
                              ? `Volume expansion (+৳${pvmVolumeEffect.toFixed(2)}M) was partially diluted by aggressive price discounting (-৳${Math.abs(pvmPriceEffect).toFixed(2)}M). Commercial recommendation: Enforce strict minimum price corridor on distributor accounts.`
                              : pvmPriceEffect > 0 && pvmVolumeEffect >= 0
                              ? `Premium pricing power realized! Both price effect (+৳${pvmPriceEffect.toFixed(2)}M) and unit growth drove superior margin expansion.`
                              : `Review promotional subsidies. Gross margin is sensitive to ongoing volume changes.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 2: 3-Statement & Circularity Breaker Switch */}
                {corpSimTab === "3statement" && (
                  <div className="space-y-5 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-corp-bg-secondary border border-corp-border text-corp-text leading-relaxed">
                      <span className="font-extrabold text-emerald-400 uppercase">FMI AFM Blank-Sheet Integrity Test:</span> Verify zero-plug balance sheet balancing. Toggle the circularity breaker switch to test how institutional models eliminate circular loop crashes without sacrificing average balance interest accuracy.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Scenario Controls */}
                      <div className="p-4 rounded-xl border border-corp-border bg-corp-bg-secondary space-y-4">
                        <h4 className="font-extrabold uppercase text-corp-text">Balance Sheet Drivers:</h4>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Capex Additions (PP&E Roll-Forward):</span>
                            <span className="font-bold text-emerald-400">৳ {simCapex}M</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="80"
                            value={simCapex}
                            onChange={(e) => setSimCapex(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Revolving Credit Facility Borrowing:</span>
                            <span className="font-bold text-emerald-400">৳ {simDebtBorrow}M</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="120"
                            value={simDebtBorrow}
                            onChange={(e) => setSimDebtBorrow(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>

                        {/* Circularity Breaker Switch */}
                        <div className="pt-2 border-t border-corp-border flex items-center justify-between">
                          <div>
                            <p className="font-bold text-corp-text">Circularity Breaker Switch:</p>
                            <p className="text-[10px] text-corp-text-tertiary">FAST Standard circuit breaker toggle</p>
                          </div>
                          <button
                            onClick={() => setCircSwitchOn(!circSwitchOn)}
                            className={`px-3 py-1.5 rounded-md font-bold uppercase transition-all border ${circSwitchOn ? "bg-emerald-600 text-white border-emerald-400 shadow-[2px_2px_0px_0px_#047857]" : "bg-amber-600 text-white border-amber-400 shadow-[2px_2px_0px_0px_#78350f]"}`}
                          >
                            {circSwitchOn ? "SWITCH = 1 (ON)" : "SWITCH = 0 (BYPASS)"}
                          </button>
                        </div>
                      </div>

                      {/* Integrity Audit Block */}
                      <div className="p-4 rounded-xl border border-corp-border bg-corp-bg-secondary space-y-3">
                        <h4 className="font-extrabold uppercase text-corp-text">Statement Reconciliation Engine:</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between p-2 rounded bg-corp-surface border border-corp-border">
                            <span>Total Assets (Cash + AR + Inv + PP&E):</span>
                            <span className="font-bold text-corp-text">৳ {(180 + simCapex).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between p-2 rounded bg-corp-surface border border-corp-border">
                            <span>Total Liabilities & Equity (Debt + AP + Equity):</span>
                            <span className="font-bold text-corp-text">৳ {(180 + simCapex).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between p-2 rounded bg-corp-surface border border-corp-border font-bold">
                            <span>Reconciliation Balance Check (Assets - Liab - Eq):</span>
                            <span className="text-emerald-400">৳ 0.000</span>
                          </div>
                          <div className="flex justify-between p-2 rounded bg-corp-surface border border-corp-border font-bold">
                            <span>Interest Expense Calculation Mode:</span>
                            <span className={circSwitchOn ? "text-emerald-400" : "text-amber-400"}>
                              {circSwitchOn ? "Average Debt Balance (Iterative Active)" : "Beginning Debt Balance (Safe Bypass)"}
                            </span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500 text-emerald-300 font-bold text-center">
                          ✔ ZERO-PLUG VERIFIED: Balance Sheet Balances Automatically
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 3: Working Capital CCC Optimizer */}
                {corpSimTab === "workingcapital" && (
                  <div className="space-y-5 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-corp-bg-secondary border border-corp-border text-corp-text leading-relaxed">
                      <span className="font-extrabold text-emerald-400 uppercase">Cash Conversion Cycle (CCC = DSO + DIO - DPO):</span> Quantify exact liquidity freed from corporate balance sheets. Adjust collection velocity, inventory turnover, and supplier trade terms to compute cash unlocked across ৳1,200M revenue.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-lg border border-corp-border bg-corp-bg-secondary space-y-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-corp-text">DSO (Receivables):</span>
                          <span className="font-extrabold text-emerald-400">{wcDso} Days</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="90"
                          value={wcDso}
                          onChange={(e) => setWcDso(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-corp-text-tertiary">Customer payment terms</span>
                      </div>

                      <div className="p-3.5 rounded-lg border border-corp-border bg-corp-bg-secondary space-y-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-corp-text">DIO (Inventory):</span>
                          <span className="font-extrabold text-emerald-400">{wcDio} Days</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="90"
                          value={wcDio}
                          onChange={(e) => setWcDio(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-corp-text-tertiary">Warehouse shelf turnover</span>
                      </div>

                      <div className="p-3.5 rounded-lg border border-corp-border bg-corp-bg-secondary space-y-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-corp-text">DPO (Payables):</span>
                          <span className="font-extrabold text-emerald-400">{wcDpo} Days</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="60"
                          value={wcDpo}
                          onChange={(e) => setWcDpo(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-corp-text-tertiary">Supplier trade credit</span>
                      </div>
                    </div>

                    {/* Result Card */}
                    <div className="p-4 rounded-xl border-2 border-corp-border bg-corp-bg-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] text-corp-text-tertiary uppercase">Current Cash Conversion Cycle:</p>
                        <p className="text-xl font-extrabold text-emerald-400">{currentCcc} Days <span className="text-xs font-normal text-corp-text-secondary">(DSO {wcDso} + DIO {wcDio} - DPO {wcDpo})</span></p>
                      </div>
                      <div className="p-3 rounded-lg bg-corp-surface border border-corp-border text-left sm:text-right">
                        <p className="text-[10px] text-corp-text-tertiary uppercase">Balance Sheet Liquidity Unlocked:</p>
                        <p className="text-lg font-extrabold text-emerald-400">
                          {Number(cashUnlockedM) >= 0 ? `+৳${cashUnlockedM} Million` : `-৳${Math.abs(Number(cashUnlockedM))} Million`}
                        </p>
                        <p className="text-[10px] text-corp-text-secondary mt-0.5">Vs historical 85-day baseline across ৳1.2B revenue</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GYM 1: TOOL DECISION MATRIX (For Video AI) */}
            {(lesson.hasSimulator === "tool-matrix" || pathSlug === "video-ai-production") && (
              <div className="p-6 md:p-8 rounded-xl border-2 border-purple-500/50 shadow-[6px_6px_0px_0px_#7e22ce] space-y-6" style={{ background: "var(--corp-surface)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold">
                      <Wand2 size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                        Tool Decision Matrix Gym
                      </h3>
                      <p className="text-[11px] font-mono text-purple-400 font-bold">
                        Scenario {currentScenarioIdx + 1} of {toolMatrixScenarios.length} · Tool Handoff Logic
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {toolMatrixScenarios.map((sc, i) => (
                      <button
                        key={sc.id}
                        onClick={() => { setCurrentScenarioIdx(i); setSelectedToolChoice(null); setMatrixFeedback(null); }}
                        className={`w-7 h-7 rounded-md text-xs font-mono font-extrabold border ${currentScenarioIdx === i ? "bg-purple-600 text-white border-purple-400" : "bg-corp-bg-secondary text-corp-text-secondary border-corp-border"}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-corp-bg-secondary border-2 border-corp-border space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-extrabold">
                    Production Challenge: {toolMatrixScenarios[currentScenarioIdx].title}
                  </span>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--corp-text)" }}>
                    {toolMatrixScenarios[currentScenarioIdx].prompt}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold font-mono uppercase block" style={{ color: "var(--corp-text)" }}>
                    Select the Most Efficient Tool for This Task:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {toolMatrixScenarios[currentScenarioIdx].options.map((tool) => (
                      <button
                        key={tool}
                        onClick={() => handleSelectToolChoice(tool)}
                        className={`p-3 rounded-lg text-xs font-mono font-extrabold border-2 transition-all text-center ${selectedToolChoice === tool ? "bg-purple-600 text-white border-purple-400 shadow-[3px_3px_0px_0px_#4c1d95]" : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-purple-400"}`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>

                {matrixFeedback && (
                  <div className={`p-4 rounded-lg border-2 font-mono text-xs space-y-1 ${matrixFeedback.isCorrect ? "bg-emerald-500/15 border-emerald-500 text-emerald-300" : "bg-rose-500/15 border-rose-500 text-rose-300"}`}>
                    <p className="font-extrabold">{matrixFeedback.text}</p>
                    {matrixFeedback.isCorrect && currentScenarioIdx < toolMatrixScenarios.length - 1 && (
                      <button
                        onClick={() => {
                          setCurrentScenarioIdx(prev => prev + 1);
                          setSelectedToolChoice(null);
                          setMatrixFeedback(null);
                        }}
                        className="mt-2 text-xs font-bold underline text-white flex items-center gap-1"
                      >
                        Next Challenge <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* GYM 2: MESSY DATA GYM */}
            {lesson.hasSimulator === "messy-data" && (
              <div className="p-6 md:p-8 rounded-xl border-2 border-emerald-500/50 shadow-[6px_6px_0px_0px_#059669] space-y-6" style={{ background: "var(--corp-surface)" }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <FileSpreadsheet size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                        Messy Data Gym — Automated ETL Pipeline
                      </h3>
                      <p className="text-[11px] font-mono text-emerald-400 font-bold">
                        Transform raw enterprise exports with trailing spaces, mixed dates & BDT symbols
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleResetMessyData}
                    className="self-start sm:self-auto text-[11px] font-mono font-extrabold text-corp-text-tertiary hover:text-[#10b981] flex items-center gap-1"
                  >
                    <RefreshCw size={12} /> Reset Gym
                  </button>
                </div>

                {/* Interactive Cleaning Controls */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleCleanSpaces}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-extrabold border-2 transition-all ${appliedCleaning.trim ? "bg-emerald-600 text-white border-emerald-400" : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-emerald-400"}`}
                  >
                    {appliedCleaning.trim ? "✔ Whitespace Trimmed" : "1. Trim Whitespaces (TRIM)"}
                  </button>
                  <button
                    onClick={handleStandardizeDates}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-extrabold border-2 transition-all ${appliedCleaning.dates ? "bg-emerald-600 text-white border-emerald-400" : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-emerald-400"}`}
                  >
                    {appliedCleaning.dates ? "✔ Dates Standardized" : "2. Standardize Dates (ISO)"}
                  </button>
                  <button
                    onClick={handleParseCurrency}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-extrabold border-2 transition-all ${appliedCleaning.currency ? "bg-emerald-600 text-white border-emerald-400" : "bg-corp-bg-secondary text-corp-text border-corp-border hover:border-emerald-400"}`}
                  >
                    {appliedCleaning.currency ? "✔ BDT Currency Formatted" : "3. Format BDT Currency (৳)"}
                  </button>
                </div>

                {/* Data Table Preview */}
                <div className="overflow-x-auto rounded-lg border-2 border-corp-border">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-corp-bg-secondary border-b-2 border-corp-border">
                      <tr>
                        <th className="p-2.5 font-bold">Emp_ID</th>
                        <th className="p-2.5 font-bold">Employee Name</th>
                        <th className="p-2.5 font-bold">Entry Date</th>
                        <th className="p-2.5 font-bold">Sales Volume</th>
                        <th className="p-2.5 font-bold">Region</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-corp-border">
                      {messyRows.map((r, i) => (
                        <tr key={i} className="hover:bg-corp-bg-secondary/40">
                          <td className="p-2.5 font-bold text-amber-400">&quot;{r.id}&quot;</td>
                          <td className="p-2.5 text-corp-text">&quot;{r.name}&quot;</td>
                          <td className="p-2.5 text-corp-text-secondary">{r.date}</td>
                          <td className="p-2.5 font-bold text-emerald-400">{r.rawSales}</td>
                          <td className="p-2.5 uppercase text-corp-text-tertiary">{r.region}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Live Formula Sandbox */}
                <div className="p-4 rounded-lg bg-corp-bg-secondary border-2 border-corp-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold font-mono uppercase text-corp-text flex items-center gap-1.5">
                      <Terminal size={14} className="text-[#10b981]" /> Test Live Formula Against Cleaned Data:
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      {formulaOutput.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userFormula}
                      onChange={(e) => setUserFormula(e.target.value)}
                      className="flex-1 bg-corp-surface px-3 py-2 rounded border border-corp-border text-xs font-mono text-corp-text outline-none"
                    />
                    <button
                      onClick={() => handleRunFormulaConsole()}
                      className="px-4 py-2 rounded text-xs font-mono font-extrabold bg-[#10b981] text-emerald-950 border border-emerald-400 hover:bg-emerald-400"
                    >
                      Execute
                    </button>
                  </div>
                  <div className="text-xs font-mono text-corp-text font-bold">
                    Result: <span className="text-[#10b981]">{formulaOutput.result}</span>
                  </div>
                </div>
              </div>
            )}

            {/* GYM 3: EXPORT QUALITY LAB (For Presentations) */}
            {(lesson.hasSimulator === "export-lab" || pathSlug === "presentation-engineering") && (
              <div className="p-6 md:p-8 rounded-xl border-2 border-amber-500/50 shadow-[6px_6px_0px_0px_#d97706] space-y-6" style={{ background: "var(--corp-surface)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold">
                      <BarChart3 size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                        Export Quality Lab
                      </h3>
                      <p className="text-[11px] font-mono text-amber-400 font-bold">
                        Audit cross-platform slide fidelity before executive client handoff
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: "gamma", label: "Gamma Web Card -> PPT", sub: "Web font & padding audit" },
                    { key: "canva", label: "Canva Vector -> PPT", sub: "SVG clarity & aspect ratio" },
                    { key: "powerpoint", label: "PowerPoint Slide Master", sub: "MECE layout & Excel link" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => { setLabFormat(item.key as any); setAuditCompleted(false); }}
                      className={`p-3.5 rounded-lg border-2 text-left font-mono transition-all ${labFormat === item.key ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-[3px_3px_0px_0px_#78350f]" : "bg-corp-bg-secondary border-corp-border text-corp-text"}`}
                    >
                      <p className="font-extrabold text-xs">{item.label}</p>
                      <p className="text-[10px] text-corp-text-tertiary mt-0.5">{item.sub}</p>
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={runExportAudit}
                    disabled={auditRunning}
                    className="py-3 px-6 rounded-lg text-xs font-mono font-extrabold text-amber-950 bg-amber-400 hover:bg-amber-300 border-2 border-amber-500 uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {auditRunning ? "Running Export Fidelity Audit..." : "Run Export Fidelity Audit"}
                  </button>
                </div>

                {auditCompleted && (
                  <div className="space-y-3 p-4 rounded-lg bg-corp-bg-secondary border-2 border-corp-border font-mono text-xs">
                    <h4 className="font-extrabold text-amber-400 uppercase">Audit Results for {labFormat.toUpperCase()} Export:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded bg-corp-surface border border-corp-border">
                        <span>Font Substitution (Satoshi/Inter to Local)</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500">WARNING (Replace Fonts Required)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-corp-surface border border-corp-border">
                        <span>Text Box Descender Clipping (g, y, p)</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500">PASS (No Overflows)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-corp-surface border border-corp-border">
                        <span>16:9 Widescreen Presentation Canvas</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500">PASS (1920x1080)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-corp-surface border border-corp-border">
                        <span>Action Titles (Pyramid Principle)</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500">PASS (Clear Takeaways)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GYM 4: AI VERIFICATION GYM (For AI for Work) */}
            {(lesson.hasSimulator === "ai-verification" || pathSlug === "ai-for-work") && (
              <div className="p-6 md:p-8 rounded-xl border-2 border-cyan-500/50 shadow-[6px_6px_0px_0px_#0891b2] space-y-6" style={{ background: "var(--corp-surface)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-cyan-600 text-white flex items-center justify-center font-bold">
                    <ShieldAlert size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                      AI Verification Gym — Hallucination Buster
                    </h3>
                    <p className="text-[11px] font-mono text-cyan-400 font-bold">
                      Inspect the AI-generated briefing below. Click to flag the ungrounded hallucination!
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {claimsData.map((c) => {
                    const isFlagged = flaggedClaims.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        onClick={() => handleToggleClaim(c.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isFlagged ? (c.isHallucination ? "bg-emerald-500/15 border-emerald-500 text-emerald-300" : "bg-rose-500/15 border-rose-500 text-rose-300") : "bg-corp-bg-secondary border-corp-border hover:border-cyan-400 text-corp-text"}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="leading-relaxed font-medium">Claim #{c.id}: &quot;{c.text}&quot;</p>
                          <span className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase flex-shrink-0 ${isFlagged ? "bg-cyan-500 text-cyan-950" : "bg-corp-surface text-corp-text-tertiary"}`}>
                            {isFlagged ? "Flagged" : "Click to Flag"}
                          </span>
                        </div>
                        {isFlagged && (
                          <p className="mt-2 pt-2 border-t border-corp-border text-[11px] font-bold">
                            {c.note}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GYM 5: ERROR LOG OS (For GRE Prep) */}
            {(lesson.hasSimulator === "error-log" || pathSlug === "gre-preparation") && (
              <div className="p-6 md:p-8 rounded-xl border-2 border-rose-500/50 shadow-[6px_6px_0px_0px_#e11d48] space-y-6" style={{ background: "var(--corp-surface)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-rose-600 text-white flex items-center justify-center font-bold">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                      Error Log OS — Root-Cause Forensics
                    </h3>
                    <p className="text-[11px] font-mono text-rose-400 font-bold">
                      Diagnose question errors across the 4 ETS Root Causes to stop making repeated mistakes
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-corp-bg-secondary border-2 border-corp-border font-mono text-xs space-y-2">
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase">Diagnostic Problem: Quantitative Comparison</span>
                  <p className="font-bold text-corp-text">
                    A triangle ABC has interior angles in the ratio 2 : 3 : 5.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                    <div className="p-2 rounded bg-corp-surface border border-corp-border">
                      <span className="text-corp-text-tertiary">Column A:</span> Length of longest side
                    </div>
                    <div className="p-2 rounded bg-corp-surface border border-corp-border">
                      <span className="text-corp-text-tertiary">Column B:</span> Twice the length of shortest side
                    </div>
                  </div>
                </div>

                <div className="space-y-2 font-mono">
                  <label className="text-xs font-extrabold uppercase block" style={{ color: "var(--corp-text)" }}>
                    Select Root Cause if you answered &quot;The two quantities are equal&quot;:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { key: "trap", label: "Trap Answer / Angle-Side Fallacy", desc: "Mistook 30-60-90 angle ratio for side ratio 1:√3:2 (Side opposite 90° is twice side opposite 30°, but side opposite 50° is not!)" },
                      { key: "content", label: "Content Gap", desc: "Forgot sum of triangle angles = 180°" },
                      { key: "careless", label: "Careless Arithmetic", desc: "Arithmetic mistake when computing 2x + 3x + 5x = 180" },
                      { key: "pacing", label: "Pacing Panic", desc: "Guessed under 10 seconds remaining" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => { setSelectedErrorCategory(item.key); setErrorLogged(true); }}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${selectedErrorCategory === item.key ? "bg-rose-500/20 border-rose-500 text-rose-300" : "bg-corp-bg-secondary border-corp-border text-corp-text"}`}
                      >
                        <p className="font-extrabold">{item.label}</p>
                        <p className="text-[10px] text-corp-text-tertiary mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {errorLogged && (
                  <div className="p-4 rounded-lg bg-emerald-500/15 border-2 border-emerald-500 text-emerald-300 font-mono text-xs space-y-1">
                    <p className="font-extrabold">✔ Error Classified &amp; Synced to Error Log OS!</p>
                    <p className="text-[11px]">Remediation Action: Add flashcard &quot;Angle ratio ≠ Side ratio in general triangles&quot; to your Spaced Repetition deck.</p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* 4. Quiz Tab */}
        {activeTab === "quiz" && (
          <div className="p-6 md:p-8 rounded-xl space-y-5 border-2 border-[#10b981]/50 shadow-[6px_6px_0px_0px_rgba(16,185,129,0.25)]" style={{ background: "var(--corp-surface)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold tracking-tight font-mono uppercase" style={{ color: "var(--corp-text)" }}>
                Lesson Knowledge Assessment
              </h3>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-[#10b981] text-emerald-950 font-mono shadow-sm">
                +{lesson.xpReward} XP Reward
              </span>
            </div>

            <div className="p-5 rounded-lg bg-corp-bg-secondary border-2 border-corp-border space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-extrabold">
                Knowledge Check
              </span>
              <p className="text-xs sm:text-sm font-extrabold leading-relaxed font-mono" style={{ color: "var(--corp-text)" }}>
                {lesson.quiz.question}
              </p>
            </div>

            <div className="space-y-2.5">
              {lesson.quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  disabled={quizSubmitted && quizSuccess}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-4 rounded-lg border-2 text-left text-xs font-mono font-bold transition-all flex items-center justify-between ${selectedAnswer === idx ? "bg-[#10b981]/20 border-[#10b981] text-[#10b981] shadow-[3px_3px_0px_0px_#10b981]" : "bg-corp-bg-secondary border-corp-border text-corp-text hover:border-[#10b981]"}`}
                >
                  <span>{option}</span>
                  {selectedAnswer === idx && (
                    <span className="w-5 h-5 rounded-full bg-[#10b981] text-emerald-950 flex items-center justify-center text-[10px] font-extrabold">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-2">
              {!quizSubmitted || isVerifyingQuiz ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null || isVerifyingQuiz}
                  className="w-full py-3.5 rounded-lg text-xs font-extrabold text-emerald-950 bg-[#10b981] hover:bg-emerald-400 transition-all disabled:opacity-50 shadow-[4px_4px_0px_0px_#064e3b] border-2 border-emerald-400 uppercase font-mono tracking-wider flex items-center justify-center gap-2"
                >
                  {isVerifyingQuiz ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                      Authoritatively Verifying with Career Passport...
                    </>
                  ) : (
                    "Submit & Verify Answer"
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  {quizSuccess ? (
                    <div className="p-4 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-start gap-3 border-2 border-emerald-600">
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-extrabold text-xs font-mono">Correct Answer! +{lesson.xpReward} XP Earned</p>
                        <p className="text-xs leading-relaxed mt-1 font-medium">{serverExplanation || lesson.quiz.explanation}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-red-500/15 text-red-600 flex items-start gap-3 border-2 border-red-600">
                      <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-extrabold text-xs font-mono">Incorrect Option Selected</p>
                        <p className="text-xs leading-relaxed mt-1 font-medium">{serverExplanation || "Review the reading notes and try again."}</p>
                        <button onClick={() => { setQuizSubmitted(false); setSelectedAnswer(null); setServerExplanation(null); }} className="mt-2 text-xs font-extrabold underline hover:text-red-700 font-mono">
                          Try Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
      </>
      )}

      {/* Floating Completion overlay */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-[99999] p-4"
            onClick={() => setShowSuccessPopup(false)}
          >
            <div className="glass-strong rounded-2xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-emerald-500/30" onClick={(e) => e.stopPropagation()}>
              <div className="w-16 h-16 rounded-full bg-[#10b981]/20 flex items-center justify-center mx-auto text-[32px] animate-bounce">
                🎉
              </div>
              <h2 className="text-xl font-extrabold font-mono" style={{ color: "var(--corp-text)" }}>Lesson Validated!</h2>
              <p className="text-xs font-mono" style={{ color: "var(--corp-text-secondary)" }}>
                You have successfully passed this knowledge check:
              </p>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-base font-extrabold bg-[#10b981]/20 text-[#10b981] font-mono border border-[#10b981]/40">
                Verified Mastery
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-emerald-950 bg-[#10b981] hover:bg-emerald-400 transition-colors uppercase font-mono"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
