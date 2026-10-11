"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Shield, FileDown, Share2, QrCode, Sparkles, Check, CheckCircle2,
  Trophy, BookOpen, Star, Mail, MapPin, Briefcase, GraduationCap, Link2,
  Phone, Edit3, Plus, Trash2, X, Save, User, Building2,
  Calendar, ExternalLink, RefreshCw, ShieldCheck, Camera, Upload, Image as ImageIcon,
  BrainCircuit, AlertCircle
} from "lucide-react";
import { useUser } from "@/components/providers/user-context";
import { PassportExperience, PassportProfile } from "@/lib/state/types";
import { cn } from "@/lib/utils";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { ResumeUploadModal } from "@/components/passport/resume-upload-modal";
import { ProUpgradeModal } from "@/components/pro-upgrade-modal";
import { getRankInfo, RankBadge, getContrastColor } from "@/components/ui/rank-badge";
import { SkillCombobox } from "@/components/ui/skill-combobox";
import { AiSkillAssessmentModal } from "@/components/passport/ai-skill-assessment-modal";
import { PlatformBadge } from "@/components/ui/platform-badge";
import { PLATFORM_BADGES } from "@/lib/data/platform-badges";
import { ImageCropModal } from "@/components/passport/image-crop-modal";

function EditableField({
  value, placeholder, onSave, multiline = false, className = ""
}: {
  value: string; placeholder: string; onSave: (v: string) => void; multiline?: boolean; className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  const commit = () => { onSave(draft); setEditing(false); };

  if (editing) {
    return multiline ? (
      <div className="relative w-full">
        <textarea
          ref={ref as any}
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setEditing(false);
          }}
          rows={4}
          className="w-full rounded-xl px-3 py-2 text-xs md:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-corp-accent/40"
          style={{ background: "var(--corp-bg-secondary)", border: "1px solid var(--corp-border)", color: "var(--corp-text)" }}
          placeholder={placeholder}
        />
        <div className="flex gap-2 mt-1.5 justify-end">
          <button onClick={() => setEditing(false)} className="px-3 py-1 text-xs font-semibold rounded-lg" style={{ background: "var(--corp-bg-secondary)", color: "var(--corp-text-secondary)" }}>Cancel</button>
          <button onClick={commit} className="px-3 py-1 text-xs font-semibold text-white rounded-lg bg-corp-accent">Save Bio</button>
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <input
          ref={ref as any}
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className={`flex-1 rounded-lg px-2.5 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-corp-accent/40 min-w-0 ${className}`}
          style={{ background: "var(--corp-bg-secondary)", border: "1px solid var(--corp-border)", color: "var(--corp-text)" }}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
        />
        <button onClick={commit} className="p-1 rounded-lg text-white bg-corp-accent flex-shrink-0"><Save size={12} /></button>
        <button onClick={() => setEditing(false)} className="p-1 rounded-lg flex-shrink-0" style={{ background: "var(--corp-bg-secondary)", color: "var(--corp-text-secondary)" }}><X size={12} /></button>
      </div>
    );
  }

  return (
    <button
      onClick={() => { setDraft(value); setEditing(true); }}
      className={`group flex items-center gap-1 text-left hover:opacity-80 transition-opacity ${className}`}
    >
      <span className={value ? "" : "italic opacity-50"}>{value || placeholder}</span>
      <Edit3 size={11} className="opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
    </button>
  );
}

const PRESET_AVATARS = [
  { label: "FMCG Lead", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { label: "Tech Director", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { label: "Finance Strategist", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { label: "Creative Lead", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { label: "Operations Lead", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { label: "Brand Director", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
];

const EMPTY_EXP: Omit<PassportExperience, "id"> = { title: "", company: "", duration: "", desc: "" };

export default function CareerPassportPage() {
  const { state, updatePassportProfile } = useUser();
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [addingExp, setAddingExp] = useState(false);
  const [newExp, setNewExp] = useState<Omit<PassportExperience, "id">>(EMPTY_EXP);
  const [addingSkill, setAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [assessmentSkill, setAssessmentSkill] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageForCrop, setTempImageForCrop] = useState<string | null>(null);

  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type?: "error" | "warning" | "info" | "success" | "xp";
  }>({
    isOpen: false,
    message: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLDivElement>(null);
  const printCvRef = useRef<HTMLDivElement>(null);

  const pp = state.passportProfile;
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setAlertDialog({
        isOpen: true,
        title: "File Too Large",
        message: "Please choose an image file under 15MB.",
        type: "warning",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const rawData = evt.target?.result as string;
      if (!rawData) return;
      setTempImageForCrop(rawData);
      setCropModalOpen(true);
      setShowPhotoModal(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const save = useCallback(
    (data: Partial<PassportProfile>) => {
      updatePassportProfile(data);
    },
    [updatePassportProfile]
  );

  const handleShare = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://insyt.co";
    const shareUrl = `${origin}/passport/${verificationId}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${state.name || "Candidate"}'s Career Passport`,
          text: `Verify ${state.name || "Candidate"}'s digital executive credentials on INSYT Corporate.`,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled native share drawer — fallback to clipboard
      }
    }
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiGenerateSummary = () => {
    const degreeStr = pp?.degree || "Business Administration";
    const skillList = (pp?.customSkills ?? []).slice(0, 3).join(", ") || "financial modeling and business analytics";
    const generated = `Results-driven ${degreeStr} graduate specializing in ${skillList}. Proven track record of leveraging data-driven insights and executive presentation models to optimize corporate performance. Seeking high-leverage analyst or Management Trainee roles.`;
    save({ summary: generated });
  };

  // Only completed courses (progress >= 100) populate verified skills & masteries
  const completedCourses = state.courseProgress.filter((c) => c.progress >= 100);
  const courseSkills: { name: string; progress: number; mastery: string }[] = [];

  completedCourses.forEach((c) => {
    const isExcel =
      c.id === "excel-modeling" ||
      c.courseId === "excel-modeling" ||
      c.title.toLowerCase().includes("excel") ||
      c.title.toLowerCase().includes("spreadsheet");

    if (isExcel) {
      const excelSkills = [
        "Advanced Excel Spreadsheet Engineering",
        "Financial Modeling Formulas & Sensitivity Tables",
        "Excel Power Query & Data Automation",
        "Dynamic Array Formulas & Lambda Functions",
        "Cash Flow Management & Forecasting",
      ];
      excelSkills.forEach((skillName) => {
        courseSkills.push({ name: skillName, progress: 100, mastery: "Level 5 Certified" });
      });
    } else {
      courseSkills.push({ name: c.title, progress: 100, mastery: "Course Completed" });
    }
  });

  const handleAssessmentPass = (
    skillName: string,
    score: number,
    details: { verifiedAt: string; hash: string }
  ) => {
    const existing = pp?.verifiedSkillDetails || {};
    save({
      verifiedSkillDetails: {
        ...existing,
        [skillName]: {
          verified: true,
          score,
          verifiedAt: details.verifiedAt,
          hash: details.hash,
        },
      },
    });
  };

  const verificationId = `INSYT-PASS-${(state.name || "USER").substring(0, 3).toUpperCase()}-2026`;

  // Backend-backed earned badges check:
  // If user does not have it, remove it; if user has it, only then add it!
  const userUnlockedBadges = useMemo(() => {
    return PLATFORM_BADGES.filter((badge) => {
      // 1. Direct recentBadges in state (backend stored):
      const hasRecentBadge = (state.recentBadges || []).some(
        (rb) =>
          rb.name.toLowerCase().trim() === badge.name.toLowerCase().trim() ||
          badge.id.toLowerCase().includes(rb.name.toLowerCase().trim()) ||
          (rb.icon && rb.icon.toLowerCase() === badge.iconName.toLowerCase())
      );
      if (hasRecentBadge) return true;

      // 2. Course completion mapping (auto-verified from backend):
      if (badge.id === "excel-architect") {
        const hasExcelCompleted = (state.courseProgress || []).some(
          (c) =>
            (c.id?.includes("excel") ||
              c.courseId?.includes("excel") ||
              c.title?.toLowerCase().includes("excel")) &&
            (c.progress >= 100 || (c.completedLessons && c.totalLessons && c.completedLessons.length >= c.totalLessons))
        );
        if (hasExcelCompleted) return true;
      }

      if (badge.id === "ai-workflow-vanguard") {
        const hasAiCompleted = (state.courseProgress || []).some(
          (c) =>
            (c.id?.includes("automation") || c.id?.includes("ai") || c.title?.toLowerCase().includes("ai")) &&
            (c.progress >= 100 || (c.completedLessons && c.totalLessons && c.completedLessons.length >= c.totalLessons))
        );
        if (hasAiCompleted) return true;
      }

      if (badge.id === "data-synthesis-expert") {
        const hasBiCompleted = (state.courseProgress || []).some(
          (c) =>
            (c.id?.includes("power-bi") || c.title?.toLowerCase().includes("power bi") || c.title?.toLowerCase().includes("intelligence")) &&
            (c.progress >= 100 || (c.completedLessons && c.totalLessons && c.completedLessons.length >= c.totalLessons))
        );
        if (hasBiCompleted) return true;
      }

      // 3. Trust plane / credential verification:
      if (badge.id === "trust-plane-verified") {
        if (
          Object.values(pp?.verifiedSkillDetails || {}).some((v) => v.verified) ||
          (state.completedMockTests && state.completedMockTests.length > 0) ||
          (state.courseProgress || []).some((c) => c.progress >= 100)
        ) {
          return true;
        }
      }

      // 4. Operational streak / quest multiplier:
      if (badge.id === "velocity-champion") {
        if (state.streak >= 20 || (state.completedChallengeIds && state.completedChallengeIds.length >= 20)) {
          return true;
        }
      }

      return false;
    });
  }, [state.recentBadges, state.courseProgress, state.streak, state.completedChallengeIds, state.completedMockTests, pp?.verifiedSkillDetails]);

  const [showProModal, setShowProModal] = useState(false);

  // High-resolution vector/canvas PDF export with 300+ DPI rendering
  const handleDownloadPdf = useCallback(async () => {
    // Gate PDF export for Starter tier users
    const isStarter = !state.subscriptionTier || state.subscriptionTier === "starter";
    if (isStarter) {
      setShowProModal(true);
      return;
    }

    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = printCvRef.current;
      if (!el) return;

      // Temporarily unhide for rendering
      el.style.display = "block";

      const canvas = await html2canvas(el, {
        scale: 3, // High DPI
        useCORS: true,
        backgroundColor: "#0d1b2a",
        logging: false,
        allowTaint: true,
        windowWidth: 800,
      });

      el.style.display = "none";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width / 3, canvas.height / 3] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 3, canvas.height / 3);
      pdf.save(`${(state.name || "User").replace(/\s+/g, "_")}_Career_Passport.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      window.print();
    } finally {
      setDownloading(false);
    }
  }, [state.name, state.subscriptionTier]);

  const handlePopulateSample = () => {
    save({
      headline: "Creative Producer & Presentation Specialist",
      summary: "Results-driven specialist with strong foundation in digital production, presentation architecture, and executive storytelling. Seeking high-impact corporate and creative roles.",
      university: "Bangladesh Agricultural University (BAU)",
      degree: "Bachelor of Business Administration (BBA)",
      gradYear: "2026",
      location: "Dhaka, Bangladesh",
      phone: "+880 1700-000000",
      linkedin: "linkedin.com/in/executive-pro",
      github: "github.com/analyst-pro",
      photoUrl: PRESET_AVATARS[0].url,
      customSkills: ["Video Editing", "Presentation Design", "AI Automation", "GRE Prep", "Strategic Communications"],
      experience: [
        {
          id: `exp_sample_1`,
          title: "Business Analytics Trainee",
          company: "BAUBC Analytics Division",
          duration: "Jan 2025 – Present",
          desc: "Built executive revenue models, optimized inventory trackers, and conducted competitive strategy simulations."
        }
      ]
    });
  };

  const addExp = () => {
    if (!newExp.title || !newExp.company) return;
    const list = [...(pp?.experience ?? []), { ...newExp, id: `exp_${Date.now()}` }];
    save({ experience: list });
    setNewExp(EMPTY_EXP);
    setAddingExp(false);
  };

  const removeExp = (id: string) => {
    save({ experience: (pp?.experience ?? []).filter((e) => e.id !== id) });
  };

  const addCustomSkill = () => {
    if (!newSkill.trim()) return;
    save({ customSkills: [...(pp?.customSkills ?? []), newSkill.trim()] });
    setNewSkill("");
    setAddingSkill(false);
  };

  const removeCustomSkill = (skill: string) => {
    save({ customSkills: (pp?.customSkills ?? []).filter((s) => s !== skill) });
  };

  const initials = state.name ? state.name.substring(0, 2).toUpperCase() : "EX";
  const { current: rankInfo } = getRankInfo(0);
  const rankTextColor = getContrastColor(rankInfo.color);


  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* ── Action Topbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--corp-text)" }}>Digital Career Passport</h1>
          <p className="text-xs md:text-sm mt-0.5 font-medium" style={{ color: "var(--corp-text-secondary)" }}>
            Your verified executive credential &amp; CV identity — upload your photo and edit details live.
          </p>
        </div>
        {/* All 4 action buttons in one row - no wrapping */}
        <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
          <button onClick={() => setShowResumeModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-extrabold text-white transition-all hover:-translate-y-0.5 border border-blue-300 flex-shrink-0"
            style={{ background: "#2563eb", boxShadow: "3px 3px 0px 0px #1e3a8a" }}>
            <Sparkles size={12} /> Auto-fill
          </button>
          <button onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all flex-shrink-0"
            style={{ border: "1.5px solid var(--corp-border)", color: "var(--corp-text-secondary)", background: "var(--corp-surface)" }}>
            {copied ? <Check size={12} className="text-emerald-500" /> : <Share2 size={12} />}
            {copied ? "Copied!" : "Share"}
          </button>
          <button onClick={() => setShowQRModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all flex-shrink-0"
            style={{ border: "1.5px solid var(--corp-border)", color: "var(--corp-text-secondary)", background: "var(--corp-surface)" }}>
            <QrCode size={12} /> QR Code
          </button>
          <button onClick={handleDownloadPdf} disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-extrabold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 border border-blue-300 flex-shrink-0"
            style={{ background: "#2563eb", boxShadow: "3px 3px 0px 0px #1e3a8a" }}>
            <FileDown size={12} />{downloading ? "Rendering..." : "Download CV"}
          </button>
        </div>
      </div>

      {/* ── Interactive Passport Header ── */}
      <div ref={passportRef} className="space-y-6 font-sans">
        <div
          className="rounded-xl border-2 border-blue-400 p-6 sm:p-7 text-white relative overflow-hidden"
          style={{ background: "#2563eb", boxShadow: "5px 5px 0px 0px #1e3a8a" }}
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 space-y-4">
            {/* Top Row: Verification Badge + Rank Pill */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold uppercase bg-amber-400 text-amber-950 border border-amber-500 shadow-sm flex items-center gap-1.5">
                <ShieldCheck size={14} /> {verificationId}
              </span>

              {/* Corporate Credential Status Pill */}
              <div
                id="career-passport-evidence"
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold uppercase flex items-center gap-2 bg-emerald-400 text-emerald-950 border border-emerald-500 shadow-sm"
              >
                <ShieldCheck size={14} className="text-emerald-950" />
                <span>Corporate Credential · Recruiter Index: 94%</span>
              </div>
            </div>

            {/* Middle Row: Photo Avatar & Editable Headline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div
                onClick={() => setShowPhotoModal(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white text-[#2563eb] flex items-center justify-center text-3xl font-bold flex-shrink-0 relative cursor-pointer group overflow-hidden border-2 border-white shadow-md"
              >
                {pp?.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pp.photoUrl} alt={state.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono">{initials}</span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1">
                  <Camera size={18} />
                  <span>Upload</span>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <h2 className="text-2xl font-black text-white">{state.name || "Executive Analyst"}</h2>
                <div className="text-xs sm:text-sm font-semibold text-blue-100">
                  <EditableField
                    value={pp?.headline ?? ""}
                    placeholder="Click to add professional headline (e.g. Corporate Analyst at FMCG Corp)"
                    onSave={(v) => save({ headline: v })}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Contact Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono pt-3 border-t border-white/20 text-blue-100">
              <span className="flex items-center gap-1.5"><Mail size={12} />{state.email || "learner@insyt.co"}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} /><EditableField value={pp?.location ?? ""} placeholder="Location (e.g. Dhaka)" onSave={(v) => save({ location: v })} /></span>
              <span className="flex items-center gap-1.5"><Phone size={12} /><EditableField value={pp?.phone ?? ""} placeholder="Phone (+880...)" onSave={(v) => save({ phone: v })} /></span>
              <span className="flex items-center gap-1.5"><Link2 size={12} /><EditableField value={pp?.linkedin ?? ""} placeholder="linkedin.com/in/..." onSave={(v) => save({ linkedin: v })} /></span>
            </div>
          </div>
        </div>

        {/* Body 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-5">
            {/* Executive Bio */}
            <div className="p-5 rounded-2xl space-y-3 border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb]" style={{ background: "var(--corp-surface)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--corp-text)" }}>
                  <Sparkles size={15} className="text-corp-accent" /> Executive Bio
                </h3>
                <button
                  onClick={() => {
                    const tracksText = state.enrolledPathSlugs.length > 0 ? state.enrolledPathSlugs.join(", ") : "Professional Skills & Career Development";
                    const uniText = pp?.university ? `graduate of ${pp.university}` : "ambitious business professional";
                    const smartSummary = `High-performing ${uniText} specializing in ${tracksText}. Demonstrated expertise in financial modeling, XLOOKUP data pipelines, and executive storytelling with a focus on high-impact corporate performance.`;
                    save({ summary: smartSummary });
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-corp-accent hover:underline cursor-pointer"
                >
                  <Sparkles size={12} /> AI Generate Bio
                </button>
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "var(--corp-text-secondary)" }}>
                <EditableField
                  value={pp?.summary ?? ""}
                  placeholder="Click to write a 2-3 sentence executive bio detailing your career goals..."
                  onSave={(v) => save({ summary: v })}
                  multiline
                />
              </div>
            </div>

            {/* Education Credentials */}
            <div className="p-5 rounded-2xl space-y-3 border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb]" style={{ background: "var(--corp-surface)" }}>
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--corp-text)" }}>
                <GraduationCap size={15} className="text-corp-accent" /> Academic Education
              </h3>
              <div className="space-y-2 text-xs" style={{ color: "var(--corp-text-secondary)" }}>
                <div className="flex items-center gap-2">
                  <Building2 size={12} style={{ color: "var(--corp-text-tertiary)" }} />
                  <EditableField value={pp?.university ?? ""} placeholder="University / College" onSave={(v) => save({ university: v })} />
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={12} style={{ color: "var(--corp-text-tertiary)" }} />
                  <EditableField value={pp?.degree ?? ""} placeholder="Degree & Major" onSave={(v) => save({ degree: v })} />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={12} style={{ color: "var(--corp-text-tertiary)" }} />
                  <EditableField value={pp?.gradYear ?? ""} placeholder="Graduation Year" onSave={(v) => save({ gradYear: v })} />
                </div>
              </div>
            </div>

            {/* ── Platform Badges Box (Separate box under Academic Education) ── */}
            <div className="p-5 rounded-2xl space-y-4 border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb]" style={{ background: "var(--corp-surface)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--corp-text)" }}>
                  <Award size={15} className="text-corp-accent" /> Platform Badges
                </h3>
                <span className="text-[10px] font-mono font-bold text-corp-accent">
                  {userUnlockedBadges.length} Earned
                </span>
              </div>

              {userUnlockedBadges.length > 0 ? (
                <div className="space-y-3">
                  {userUnlockedBadges.map((badge) => (
                    <PlatformBadge key={badge.id} badge={badge} size="sm" unlocked={true} />
                  ))}
                </div>
              ) : (
                <div className="py-6 px-4 rounded-xl border border-dashed border-corp-border text-center space-y-1">
                  <p className="text-xs font-semibold text-corp-text-secondary">No platform badges earned yet</p>
                  <p className="text-[10px] text-corp-text-tertiary">Complete verified courses &amp; credentials to unlock and display your badges.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            {/* Experience */}
            <div className="p-5 rounded-2xl space-y-4 border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb]" style={{ background: "var(--corp-surface)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--corp-text)" }}>
                  <Briefcase size={15} className="text-corp-accent" /> Work & Leadership Experience
                </h3>
                <button onClick={() => setAddingExp(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-corp-accent-light text-corp-accent font-mono cursor-pointer">
                  <Plus size={12} /> Add Experience
                </button>
              </div>

              {addingExp && (
                <div className="p-4 rounded-2xl space-y-3 bg-corp-bg-secondary border-2 border-blue-400">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input value={newExp.title} onChange={(e) => setNewExp((p) => ({ ...p, title: e.target.value }))}
                      className="rounded-xl px-3 py-2 text-xs outline-none bg-corp-surface border-2 border-blue-400 text-corp-text font-mono" placeholder="Job Title" />
                    <input value={newExp.company} onChange={(e) => setNewExp((p) => ({ ...p, company: e.target.value }))}
                      className="rounded-xl px-3 py-2 text-xs outline-none bg-corp-surface border-2 border-blue-400 text-corp-text font-mono" placeholder="Company" />
                  </div>
                  <input value={newExp.duration} onChange={(e) => setNewExp((p) => ({ ...p, duration: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2 text-xs outline-none bg-corp-surface border-2 border-blue-400 text-corp-text font-mono" placeholder="Duration" />
                  <textarea value={newExp.desc} onChange={(e) => setNewExp((p) => ({ ...p, desc: e.target.value }))} rows={3}
                    className="w-full rounded-xl px-3 py-2 text-xs resize-none outline-none bg-corp-surface border-2 border-blue-400 text-corp-text font-mono" placeholder="Description..." />
                  <div className="flex gap-2 justify-end font-mono">
                    <button onClick={() => setAddingExp(false)} className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-corp-border text-corp-text-secondary cursor-pointer">Cancel</button>
                    <button onClick={addExp} className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-corp-accent cursor-pointer">Save</button>
                  </div>
                </div>
              )}

              {(pp?.experience ?? []).length > 0 ? (
                <div className="space-y-3 font-mono">
                  {(pp?.experience ?? []).map((exp) => (
                    <div key={exp.id} className="group p-4 rounded-2xl relative bg-corp-bg-secondary border-2 border-blue-400/50">
                      <button onClick={() => removeExp(exp.id)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-500/10 text-red-500 cursor-pointer">
                        <Trash2 size={13} />
                      </button>
                      <h4 className="text-sm font-bold" style={{ color: "var(--corp-text)" }}>{exp.title}</h4>
                      <p className="text-xs font-semibold text-[#2563eb] mt-0.5">{exp.company}</p>
                      <p className="text-[11px] text-corp-text-tertiary mt-0.5">{exp.duration}</p>
                      {exp.desc && <p className="text-xs mt-2 leading-relaxed font-sans" style={{ color: "var(--corp-text-secondary)" }}>{exp.desc}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs italic text-center py-4 text-corp-text-tertiary">No experience added yet.</p>
              )}
            </div>

            {/* Skills & Platform Badges */}
            <div id="evidence-ledger" className="p-5 rounded-2xl space-y-6 border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb]" style={{ background: "var(--corp-surface)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-corp-border pb-3">
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--corp-text)" }}>
                    <Shield size={15} className="text-corp-accent" /> Verified Skills &amp; Masteries ({courseSkills.length + (pp?.customSkills ?? []).length})
                  </h3>
                  <p className="text-xs font-sans text-corp-text-tertiary">
                    Auto-updated from course completions &amp; AI-proctored skill tests
                  </p>
                </div>
                <button
                  onClick={() => setAddingSkill(!addingSkill)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase bg-blue-600/15 text-blue-500 hover:bg-blue-600 hover:text-white border border-blue-500/40 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus size={12} /> Add Skill to Verify
                </button>
              </div>

              {addingSkill && (
                <div className="p-4 rounded-xl bg-blue-900/15 border-2 border-dashed border-blue-500/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} /> Select from 450+ Verified Catalog
                    </span>
                    <button onClick={() => setAddingSkill(false)} className="text-corp-text-tertiary hover:text-corp-text">
                      Cancel
                    </button>
                  </div>
                  <p className="text-[11px] text-corp-text-secondary font-mono">
                    You can type to filter candidates, but you must select an option from the dropdown list.
                  </p>
                  <SkillCombobox
                    onSelectSkill={(selectedSkill) => {
                      const existing = pp?.customSkills ?? [];
                      if (!existing.some((s) => s.toLowerCase() === selectedSkill.toLowerCase())) {
                        save({ customSkills: [...existing, selectedSkill] });
                      }
                      setAddingSkill(false);
                    }}
                    selectedSkills={pp?.customSkills ?? []}
                  />
                </div>
              )}

              {/* Verified Course Skills & Self-Added AI Verified Skills */}
              <div className="space-y-2 font-mono">
                {courseSkills.length === 0 && (pp?.customSkills ?? []).length === 0 && (
                  <p className="text-xs italic text-center py-4 text-corp-text-tertiary">
                    No verified skills unlocked yet. Complete courses to earn verified skills and masteries automatically!
                  </p>
                )}

                <div className="flex flex-wrap gap-2.5">
                  {/* Course Skills (Completed Courses) */}
                  {courseSkills.map((s) => (
                    <span
                      key={s.name}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-1.5"
                    >
                      <ShieldCheck size={13} className="text-emerald-400 animate-pulse" />
                      <span>{s.name}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded font-black bg-[#065f46] text-white border border-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                        Level 5 Certified
                      </span>
                    </span>
                  ))}

                  {/* Self-Added Skills (with AI Verification status & test action) */}
                  {(pp?.customSkills ?? []).map((s) => {
                    const isVerified = Boolean(pp?.verifiedSkillDetails?.[s]?.verified);
                    const verifiedScore = pp?.verifiedSkillDetails?.[s]?.score;

                    return (
                      <div
                        key={s}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border flex items-center gap-2 transition-all ${
                          isVerified
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]"
                            : "bg-amber-500/10 text-amber-300 border-amber-500/40"
                        }`}
                      >
                        {isVerified ? (
                          <ShieldCheck size={13} className="text-emerald-400" />
                        ) : (
                          <AlertCircle size={13} className="text-amber-400" />
                        )}

                        <span>{s}</span>

                        {isVerified ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-300">
                            AI Verified ({verifiedScore || 92}%)
                          </span>
                        ) : (
                          <button
                            onClick={() => setAssessmentSkill(s)}
                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 shadow-sm transition-all"
                          >
                            <BrainCircuit size={10} /> Verify via AI Test
                          </button>
                        )}

                        <button
                          onClick={() => removeCustomSkill(s)}
                          className="hover:text-red-400 text-corp-text-tertiary transition-colors ml-0.5"
                          title="Remove skill"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Printable CV Element (Used by html2canvas export) ── */}
      <div className="hidden">
        <div ref={printCvRef} style={{ width: "800px", padding: "40px", backgroundColor: "#0d1b2a", color: "#ffffff", fontFamily: "sans-serif" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #2563eb", paddingBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {pp?.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pp.photoUrl} alt="CV Avatar" style={{ width: "80px", height: "80px", borderRadius: "20px", objectFit: "cover" }} />
              )}
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#ffffff" }}>{state.name || "Executive Analyst"}</h1>
                <p style={{ fontSize: "14px", color: "#38bdf8", marginTop: "4px", margin: 0 }}>{pp?.headline || "Corporate Analyst Specialist"}</p>
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: "11px", color: "#94a3b8" }}>
              <p style={{ margin: 0, fontWeight: "bold", color: "#10b981" }}>Corporate Credential · 94% Index</p>
              <p style={{ margin: 0 }}>Verified ID: {verificationId}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", marginTop: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", backgroundColor: "#1e293b", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#38bdf8", marginTop: 0 }}>Executive Bio</h3>
                <p style={{ fontSize: "11px", lineHeight: "1.5", color: "#94a3b8", margin: 0 }}>{pp?.summary || "Results-driven business professional."}</p>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#1e293b", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#38bdf8", marginTop: 0 }}>Education</h3>
                <p style={{ fontSize: "12px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>{pp?.university || "BAU"}</p>
                <p style={{ fontSize: "11px", color: "#cbd5e1", margin: 0 }}>{pp?.degree || "BBA"}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", backgroundColor: "#1e293b", borderRadius: "14px" }}>
                <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#38bdf8", marginTop: 0 }}>Experience</h3>
                {(pp?.experience ?? []).map((exp) => (
                  <div key={exp.id} style={{ marginBottom: "10px" }}>
                    <p style={{ fontSize: "12px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>{exp.title}</p>
                    <p style={{ fontSize: "11px", color: "#38bdf8", margin: 0 }}>{exp.company}</p>
                    <p style={{ fontSize: "10px", color: "#cbd5e1", margin: 0 }}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo & Avatar Modal ── */}
      <AnimatePresence>
        {showPhotoModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPhotoModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="max-w-md w-full rounded-3xl p-6 space-y-6 shadow-2xl border max-h-[85vh] overflow-y-auto"
              style={{ background: "var(--corp-surface)", borderColor: "var(--corp-border)" }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--corp-border)" }}>
                <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--corp-text)" }}>
                  <Camera size={18} className="text-corp-accent" /> Profile Photo & Avatar Selector
                </h3>
                <button onClick={() => setShowPhotoModal(false)} className="p-1 rounded-full hover:bg-corp-bg-secondary cursor-pointer"><X size={16} /></button>
              </div>

              {/* Upload Custom File Input with Interactive Zoom & Crop */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-corp-text-tertiary">
                  Upload Image &amp; Interactive Zoom/Crop
                </label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 rounded-2xl border-2 border-dashed border-corp-accent/40 hover:bg-corp-accent/10 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-corp-accent cursor-pointer"
                >
                  <Upload size={16} /> Choose Image to Zoom &amp; Crop
                </button>
                {pp?.photoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setTempImageForCrop(pp.photoUrl || null);
                      setCropModalOpen(true);
                      setShowPhotoModal(false);
                    }}
                    className="w-full py-2.5 rounded-xl border border-blue-500/50 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Camera size={14} /> Adjust &amp; Crop Current Photo
                  </button>
                )}
              </div>

              {/* Direct Cloud Image URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-corp-text-tertiary">
                  Or Enter Direct Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://... direct image URL"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-corp-border bg-corp-bg text-corp-text focus:outline-none focus:border-corp-accent"
                  />
                  <button
                    onClick={() => {
                      if (customUrlInput.trim()) {
                        save({ photoUrl: customUrlInput.trim() });
                        setCustomUrlInput("");
                        setShowPhotoModal(false);
                      }
                    }}
                    disabled={!customUrlInput.trim()}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#2563eb] text-white disabled:opacity-40 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Remove Photo */}
              {pp?.photoUrl && (
                <div className="pt-2 border-t" style={{ borderColor: "var(--corp-border)" }}>
                  <button onClick={() => { save({ photoUrl: undefined }); setShowPhotoModal(false); }}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer">
                    Remove Photo &amp; Use Initials
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── QR Code Modal ── */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQRModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="max-w-xs w-full rounded-3xl p-6 text-center space-y-4 shadow-2xl border"
              style={{ background: "var(--corp-surface)", borderColor: "var(--corp-border)" }}
              onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base font-bold" style={{ color: "var(--corp-text)" }}>Verification QR Code</h3>
              <div className="p-4 rounded-2xl bg-white w-44 h-44 mx-auto flex items-center justify-center border shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent((typeof window !== "undefined" ? window.location.origin : "https://insyt.co") + "/passport/" + verificationId)}`} alt="QR Code" className="w-full h-full" />
              </div>
              <p className="text-xs font-mono font-bold text-corp-accent">{verificationId}</p>
              <button onClick={() => setShowQRModal(false)} className="w-full py-2 rounded-xl text-xs font-bold text-white bg-corp-accent">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeUploadModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />

      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        featureTitle="Executive PDF Resume Export"
        featureDescription="High-resolution ATS-optimized PDF exports are available exclusively on INSYT Pro. Upgrade to download your formatted CV."
      />

      {assessmentSkill && (
        <AiSkillAssessmentModal
          isOpen={Boolean(assessmentSkill)}
          onClose={() => setAssessmentSkill(null)}
          skillName={assessmentSkill}
          candidateName={state.name || "Authenticated Candidate"}
          onPassAssessment={handleAssessmentPass}
        />
      )}

      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={tempImageForCrop}
        onClose={() => setCropModalOpen(false)}
        onSaveCrop={(croppedUrl) => {
          save({ photoUrl: croppedUrl });
          setCropModalOpen(false);
        }}
        onPickNewFile={() => {
          setCropModalOpen(false);
          fileInputRef.current?.click();
        }}
      />

      <AlertDialog
        isOpen={alertDialog.isOpen}
        onClose={() => setAlertDialog((prev) => ({ ...prev, isOpen: false }))}
        title={alertDialog.title}
        message={alertDialog.message}
        type={alertDialog.type}
      />
    </div>
  );
}
