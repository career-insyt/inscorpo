"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Workflow,
  Code,
  Bot,
  Video,
  Building2,
  Landmark,
  Cpu,
  Layers,
  GraduationCap,
  Award,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Zap,
  Check,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/user-context";
import { account } from "@/lib/appwrite";
import Link from "next/link";

interface FlagshipTrack {
  id: string;
  title: string;
  designation: string;
  roleTarget: string;
  pathSlug: string;
  courseTitle: string;
  courseSlug: string;
  skills: string[];
  description: string;
  icon: typeof TrendingUp;
}

const FLAGSHIP_TRACKS: FlagshipTrack[] = [
  {
    id: "ccfcm",
    title: "Corporate Financial & Commercial Modeling",
    designation: "CCFCM Designation",
    roleTarget: "FP&A Analyst · Commercial Finance Trainee",
    pathSlug: "corporate-analyst",
    courseTitle: "Corporate Financial & Commercial Modeling in Excel",
    courseSlug: "corporate-financial-commercial-modeling-excel",
    skills: ["FAST 3-Statement Modeling", "Price-Volume-Mix (PVM)", "Power Query ETL", "Working Capital Optimization"],
    description: "FAST-standard integrated financial models, PVM revenue variance bridges, and dynamic debt sweeps.",
    icon: TrendingUp,
  },
  {
    id: "cebi",
    title: "Enterprise Business Intelligence & Power BI",
    designation: "CEBI Designation",
    roleTarget: "BI Analyst · Analytics Associate",
    pathSlug: "business-intelligence-analyst",
    courseTitle: "Enterprise Business Intelligence & Power BI",
    courseSlug: "enterprise-business-intelligence-power-bi-sql-corporate-analysts",
    skills: ["Kimball Star Schema", "Advanced DAX", "PostgreSQL Pipelines", "Power BI Desktop"],
    description: "Relational SQL data pipelines, Kimball dimensional modeling, Advanced DAX, and executive decision dashboards.",
    icon: BarChart3,
  },
  {
    id: "ceas",
    title: "Applied Workplace AI & Enterprise Automation",
    designation: "CEAS Designation",
    roleTarget: "Process Automation Engineer · Digital Ops",
    pathSlug: "applied-ai-automation",
    courseTitle: "Applied Workplace AI & Enterprise Automation",
    courseSlug: "applied-workplace-ai-enterprise-workflow-automation",
    skills: ["n8n Orchestration", "Power Automate Desktop RPA", "Document AI", "REST APIs & Webhooks"],
    description: "Fault-tolerant enterprise automation with n8n, Power Automate RPA, Document AI, and auditable pipelines.",
    icon: Workflow,
  },
  {
    id: "ccdas",
    title: "Corporate Python & Data Automation",
    designation: "CCDAS Designation",
    roleTarget: "Commercial Data Analyst · FP&A Engineer",
    pathSlug: "corporate-python-automation",
    courseTitle: "Enterprise Python for Corporate Analytics & Process Automation",
    courseSlug: "enterprise-python-corporate-analytics-process-automation",
    skills: ["Python 3.12+", "pandas Wrangling", "openpyxl Automation", "DuckDB Push-Down Queries"],
    description: "Automate repetitive spreadsheets, reconcile ERP extracts with DuckDB, and build unattended Python pipelines.",
    icon: Code,
  },
  {
    id: "ai-work",
    title: "AI Workplace Professional & Executive Strategy",
    designation: "AI Executive Designation",
    roleTarget: "Management Trainee · Strategy Consultant",
    pathSlug: "ai-workplace-professional",
    courseTitle: "AI Workplace Professional & Executive Communication",
    courseSlug: "ai-powered-workplace-professional",
    skills: ["ChatGPT 4o & Gemini", "Pyramid Principle", "MECE Issue Trees", "Assertion-Evidence Decks"],
    description: "Applied generative AI, structured problem-solving, C-suite memos, and boardroom presentation architecture.",
    icon: Bot,
  },
  {
    id: "media",
    title: "Digital Media & Creative AI Video Production",
    designation: "Creative Media Producer",
    roleTarget: "Brand Video Editor · Creative Content Lead",
    pathSlug: "digital-media-production",
    courseTitle: "Digital Media & Generative Video AI Production",
    courseSlug: "video-ai-production",
    skills: ["CapCut Timeline Precision", "Generative AI Video", "ElevenLabs Audio", "Motion Graphics"],
    description: "Professional editing workflows, generative AI voiceover pipelines, dynamic captions, and 4K commercial packaging.",
    icon: Video,
  },
];

interface SectorTrack {
  id: string;
  name: string;
  companies: string;
  description: string;
  icon: typeof Building2;
}

const TARGET_SECTORS: SectorTrack[] = [
  {
    id: "fmcg",
    name: "FMCG & Multinational Corporations",
    companies: "Unilever, British American Tobacco, Marico, Nestlé, Reckitt",
    description: "Calibrates drills for brand commercial finance, distributor margin structures, and MTO assessment centers.",
    icon: Building2,
  },
  {
    id: "banking",
    name: "Commercial Banking & FinTech Leaders",
    companies: "Standard Chartered, BRAC Bank, bKash, City Bank, IDLC",
    description: "Focuses on institutional credit risk models, treasury FP&A, core transaction reconciliation, and data governance.",
    icon: Landmark,
  },
  {
    id: "tech_telco",
    name: "Telecommunications & Technology Scale-ups",
    companies: "Grameenphone, Banglalink, Robi Axiata, Pathao, Chaldal",
    description: "Focuses on customer lifecycle analytics, high-velocity data pipelines, and unattended operations automation.",
    icon: Cpu,
  },
  {
    id: "conglomerates",
    name: "Diversified Conglomerates & Manufacturing",
    companies: "Square, Beximco, PRAN-RFL, Akij, Meghna Group",
    description: "Emphasizes multi-entity ledger consolidation, manufacturing cost accounting, and operational control reporting.",
    icon: Layers,
  },
];

interface ExperienceLevel {
  id: string;
  title: string;
  subtitle: string;
  impact: string;
  icon: typeof GraduationCap;
}

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: "undergrad",
    title: "University Undergraduate (Final Year / Junior)",
    subtitle: "Preparing for campus placements, national case competitions, and early corporate recruitment.",
    impact: "Initializes Career Passport with academic baseline and foundational skill drills.",
    icon: GraduationCap,
  },
  {
    id: "fresh_grad",
    title: "Fresh Graduate & MTO Applicant (0-1 Year)",
    subtitle: "Actively applying to Management Trainee Officer (MTO) intakes and corporate assessment centers.",
    impact: "Calibrates Readiness Index benchmark against entry-level corporate recruiter rubrics.",
    icon: Award,
  },
  {
    id: "mid_corp",
    title: "Corporate Analyst / Working Professional (1-3 Years)",
    subtitle: "Accelerating promotions, lateral sector transitions, and earning verified enterprise credentials.",
    impact: "Unlocks advanced enterprise capstones and fast-tracks verified skill attestations.",
    icon: Briefcase,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export default function OnboardingWizardPage() {
  const router = useRouter();
  const { enrollInPath, addNotification, updatePassportProfile } = useUser();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedTrackId, setSelectedTrackId] = useState("ccfcm");
  const [selectedSectorId, setSelectedSectorId] = useState("fmcg");
  const [selectedExpId, setSelectedExpId] = useState("fresh_grad");
  const [isFinishing, setIsFinishing] = useState(false);

  const currentTrack = FLAGSHIP_TRACKS.find((t) => t.id === selectedTrackId) || FLAGSHIP_TRACKS[0];
  const currentSector = TARGET_SECTORS.find((s) => s.id === selectedSectorId) || TARGET_SECTORS[0];
  const currentExp = EXPERIENCE_LEVELS.find((e) => e.id === selectedExpId) || EXPERIENCE_LEVELS[1];

  const handleNext = () => {
    if (step < 4) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleFinishOnboarding = async () => {
    setIsFinishing(true);

    const headline = `Aspiring ${currentTrack.roleTarget.split("·")[0].trim()} · ${currentSector.name}`;
    const summary = `Targeting ${currentSector.name} recruitment (${currentSector.companies.split(",").slice(0, 3).join(", ")}). Specializing in ${currentTrack.title} with verified competencies in ${currentTrack.skills.slice(0, 3).join(", ")}.`;

    // 1. Update Career Passport Profile
    try {
      await updatePassportProfile({
        headline,
        summary,
        customSkills: currentTrack.skills,
        location: "Dhaka, Bangladesh",
      });
    } catch (e) {
      console.warn("Could not sync passport profile:", e);
    }

    // 2. Persist to Appwrite User Preferences
    try {
      await account.updatePrefs({
        careerGoals: [currentTrack.pathSlug, currentSector.id],
        experienceLevel: selectedExpId,
        enrolledPathSlugs: [currentTrack.pathSlug],
      });
    } catch (e) {
      console.warn("Could not sync Appwrite prefs:", e);
    }

    // 3. LocalStorage persistence
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("insyt_onboarding_completed", "true");
        localStorage.setItem("insyt_primary_track", currentTrack.pathSlug);
        localStorage.setItem("insyt_primary_sector", currentSector.id);
      } catch {}
    }

    // 4. Concrete site enrollment
    enrollInPath(currentTrack.pathSlug, currentTrack.courseTitle);

    // 5. Tailored Welcome Notification
    addNotification({
      type: "achievement",
      title: `${currentTrack.designation} Track Activated`,
      message: `Your roadmap for "${currentTrack.courseTitle}" is active. Your Career Passport has been pre-seeded with 4 core skills.`,
      link: `/learn/${currentTrack.pathSlug}`,
    });

    setTimeout(() => {
      router.push("/dashboard");
    }, 900);
  };

  const stepTitles = [
    "Target Flagship Track",
    "Target Industry Sector",
    "Candidate Standing",
    "Roadmap Confirmation",
  ];

  return (
    <div className="min-h-screen w-full flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#F8FAFC]">
      <div
        className="w-full max-w-2xl mx-auto rounded-3xl border-2 border-blue-600 bg-white p-6 sm:p-8 space-y-6 relative overflow-hidden font-sans"
        style={{
          boxShadow: "6px 6px 0px 0px #1e3a8a",
        }}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between gap-4 pb-3 border-b-2 border-slate-100">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-sm font-black font-mono tracking-tight text-slate-900">
              INSYT <span className="text-blue-600">CORPORATE</span>
            </span>
          </Link>

          {/* Step Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-mono font-bold">
            <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-amber-950 flex-shrink-0">
              <Sparkles size={10} className="text-amber-950" />
            </div>
            <span>
              Step {step} of 4: {stepTitles[step - 1]}
            </span>
          </div>
        </div>

        {/* Progress Bar (Sky Blue) */}
        <div className="relative z-10 space-y-1">
          <div className="h-2 w-full rounded-full bg-blue-100 overflow-hidden border border-blue-200">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 rounded-full"
              initial={false}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Wizard Step Content */}
        <div className="relative z-10 min-h-[420px] flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={direction}>
            {/* STEP 1: Select Flagship Career Track */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm">
                      <TrendingUp size={18} className="text-amber-950" strokeWidth={2.4} />
                    </div>
                    Select Your Flagship Career Track
                  </h1>
                  <p className="text-xs sm:text-[13px] text-slate-600 mt-1">
                    Your choice determines your starter curriculum, auto-enrolled masterclass, and verified Career Passport credential.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {FLAGSHIP_TRACKS.map((track) => {
                    const isSelected = selectedTrackId === track.id;
                    const IconComponent = track.icon;

                    return (
                      <motion.button
                        key={track.id}
                        type="button"
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedTrackId(track.id)}
                        className={`w-full p-3.5 rounded-2xl text-left border-2 transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-sm"
                            : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30"
                        }`}
                      >
                        {/* Icon Box: Bright Yellow BG with Brown Icon */}
                        <div className="w-11 h-11 rounded-xl bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm mt-0.5">
                          <IconComponent size={21} className="text-amber-950" strokeWidth={2.2} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                              {track.title}
                            </h2>
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                              {track.designation}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                            {track.description}
                          </p>

                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              Target:
                            </span>
                            <span className="text-[10px] font-mono font-bold text-blue-700">
                              {track.roleTarget}
                            </span>
                          </div>
                        </div>

                        {/* Selected Checkmark */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 bg-slate-50 text-transparent"
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all border-2 border-blue-700 shadow-[4px_4px_0px_0px_#1e3a8a] flex items-center justify-center gap-2"
                  >
                    <span>Continue to Target Industry</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Select Target Industry Sector */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm">
                      <Building2 size={18} className="text-amber-950" strokeWidth={2.4} />
                    </div>
                    Target Industry & Employer Sector
                  </h1>
                  <p className="text-xs sm:text-[13px] text-slate-600 mt-1">
                    Calibrates your business case scenarios, recruiter benchmark tests, and company-specific talent filters.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {TARGET_SECTORS.map((sector) => {
                    const isSelected = selectedSectorId === sector.id;
                    const IconComponent = sector.icon;

                    return (
                      <motion.button
                        key={sector.id}
                        type="button"
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedSectorId(sector.id)}
                        className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-sm"
                            : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30"
                        }`}
                      >
                        {/* Icon Box: Bright Yellow BG with Brown Icon */}
                        <div className="w-11 h-11 rounded-xl bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm mt-0.5">
                          <IconComponent size={21} className="text-amber-950" strokeWidth={2.2} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h2 className="text-xs sm:text-sm font-extrabold text-slate-900">
                            {sector.name}
                          </h2>
                          <p className="text-[11px] font-mono font-bold text-blue-700 mt-0.5">
                            {sector.companies}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-1">
                            {sector.description}
                          </p>
                        </div>

                        {/* Selected Checkmark */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 bg-slate-50 text-transparent"
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-extrabold border-2 border-slate-300 hover:border-blue-500 bg-white text-slate-700 hover:text-blue-700 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <ChevronLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-4 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all border-2 border-blue-700 shadow-[4px_4px_0px_0px_#1e3a8a] flex items-center justify-center gap-2"
                  >
                    <span>Continue to Candidate Standing</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Select Candidate Experience Standing */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm">
                      <GraduationCap size={18} className="text-amber-950" strokeWidth={2.4} />
                    </div>
                    Current Academic & Professional Standing
                  </h1>
                  <p className="text-xs sm:text-[13px] text-slate-600 mt-1">
                    Calibrates your initial Readiness Index baseline and benchmarks your profile for recruiters.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-[340px] overflow-y-auto pr-1">
                  {EXPERIENCE_LEVELS.map((exp) => {
                    const isSelected = selectedExpId === exp.id;
                    const IconComponent = exp.icon;

                    return (
                      <motion.button
                        key={exp.id}
                        type="button"
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedExpId(exp.id)}
                        className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-sm"
                            : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30"
                        }`}
                      >
                        {/* Icon Box: Bright Yellow BG with Brown Icon */}
                        <div className="w-11 h-11 rounded-xl bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm mt-0.5">
                          <IconComponent size={21} className="text-amber-950" strokeWidth={2.2} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h2 className="text-xs sm:text-sm font-extrabold text-slate-900">
                            {exp.title}
                          </h2>
                          <p className="text-[11px] text-slate-600 mt-1">
                            {exp.subtitle}
                          </p>
                          <p className="text-[10px] font-mono font-bold text-blue-700 mt-1.5 flex items-center gap-1.5">
                            <Zap size={12} className="text-amber-950 fill-amber-950" />
                            {exp.impact}
                          </p>
                        </div>

                        {/* Selected Checkmark */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 bg-slate-50 text-transparent"
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-extrabold border-2 border-slate-300 hover:border-blue-500 bg-white text-slate-700 hover:text-blue-700 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <ChevronLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-4 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all border-2 border-blue-700 shadow-[4px_4px_0px_0px_#1e3a8a] flex items-center justify-center gap-2"
                  >
                    <span>Preview Personalized Roadmap</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Roadmap Preview & Activation */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm">
                      <ShieldCheck size={18} className="text-amber-950" strokeWidth={2.4} />
                    </div>
                    Your Tailored Career Blueprint
                  </h1>
                  <p className="text-xs sm:text-[13px] text-slate-600 mt-1">
                    Review your automated initializations before launching your candidate cockpit.
                  </p>
                </div>

                {/* Blueprint Card */}
                <div className="p-4 sm:p-5 rounded-2xl border-2 border-blue-500 bg-blue-50/50 space-y-4">
                  {/* Selected Track Pill */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0 shadow-sm">
                      <currentTrack.icon size={22} className="text-amber-950" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-black text-slate-900">
                          {currentTrack.courseTitle}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase bg-blue-600 text-white shadow-sm">
                          {currentTrack.designation}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {currentSector.name} Track · {currentExp.title}
                      </p>
                    </div>
                  </div>

                  {/* Impact Breakdown Table */}
                  <div className="pt-3 border-t-2 border-blue-200/70 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 flex items-center gap-2 font-medium">
                        <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0">
                          <Check size={10} strokeWidth={3} className="text-amber-950" />
                        </div>
                        Course Enrollment:
                      </span>
                      <span className="font-mono font-bold text-blue-700">
                        {currentTrack.pathSlug} (Module 1 Ready)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 flex items-center gap-2 font-medium">
                        <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0">
                          <Check size={10} strokeWidth={3} className="text-amber-950" />
                        </div>
                        Career Passport Headline:
                      </span>
                      <span className="font-mono font-bold text-slate-900 truncate max-w-[220px]">
                        {currentTrack.roleTarget.split("·")[0].trim()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 flex items-center gap-2 font-medium">
                        <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0">
                          <Check size={10} strokeWidth={3} className="text-amber-950" />
                        </div>
                        Verified Skills Pre-Seeded:
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        4 Track Competencies
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 flex items-center gap-2 font-medium">
                        <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-950 flex-shrink-0">
                          <Sparkles size={10} className="text-amber-950" />
                        </div>
                        Welcome Activation:
                      </span>
                      <span className="font-mono font-black text-amber-900">
                        +100 XP &amp; Day-1 Streak Unlocked
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {currentTrack.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border-2 border-blue-200 bg-white text-blue-800 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isFinishing}
                    className="py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-extrabold border-2 border-slate-300 hover:border-blue-500 bg-white text-slate-700 hover:text-blue-700 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishOnboarding}
                    disabled={isFinishing}
                    className="flex-1 py-4 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all border-2 border-blue-700 shadow-[4px_4px_0px_0px_#1e3a8a] flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-70"
                  >
                    {isFinishing ? (
                      <>
                        <Loader2 size={17} className="animate-spin text-amber-300" />
                        <span>Initializing Career OS...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={18} className="text-amber-300" />
                        <span>Confirm Blueprint &amp; Launch Cockpit</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
