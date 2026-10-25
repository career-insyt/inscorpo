"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Search, CheckCircle2, ChevronRight, ChevronLeft,
  TrendingUp, Award, Building, MapPin, DollarSign, Calendar, ArrowUpRight,
  ShieldCheck, Clock, Sparkles, Building2, X, FileText, Tag, Send,
  RotateCcw, AlertCircle, Eye, GraduationCap, ChevronDown, SlidersHorizontal,
  ArrowUpDown, Wrench, Microscope, Layers, Landmark, ClipboardList,
  RefreshCw, Globe, Check, AlertTriangle, Archive, ExternalLink, Filter
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { useAuth } from "@/components/providers/auth-provider";
import {
  fetchUserJobApplications, updateApplicationStatus,
  type JobApplicationDoc
} from "@/lib/db";
import type { CanonicalJob } from "@/lib/jobs/canonical-job-schema";
import type { CandidatePassport } from "@/lib/jobs/candidate-matcher";
import { CanonicalJobCard } from "@/components/jobs/canonical-job-card";
import { CanonicalJobDrawer } from "@/components/jobs/canonical-job-drawer";

// ─── Kanban columns config ─────────────────────────────────────────────────────
const COLUMNS: { id: JobApplicationDoc["status"]; label: string; color: string; bg: string }[] = [
  { id: "applied", label: "Applied", color: "#2563EB", bg: "rgba(37,99,235,0.08)" },
  { id: "reviewing", label: "Under Review", color: "#D97706", bg: "rgba(217,119,6,0.08)" },
  { id: "interviewing", label: "Interviewing", color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
  { id: "offered", label: "Offered / Placement", color: "#059669", bg: "rgba(5,150,105,0.08)" },
];

const OPPORTUNITY_TYPE_OPTIONS = [
  { id: "ALL", label: "All Opportunity Types" },
  { id: "FULL_TIME_JOB", label: "Full-Time Jobs & Requisitions" },
  { id: "INTERNSHIP_PLACEMENT", label: "Internships & Industrial Placements" },
  { id: "FELLOWSHIP", label: "Fellowships — Leadership & Research" },
  { id: "SCHOLARSHIP_STUDY_ABROAD", label: "Scholarships & Study-Abroad" },
  { id: "GRANT_RESEARCH_FUNDING", label: "Grants & Research Funding" },
  { id: "BUSINESS_COMPETITION_HACKATHON", label: "Competitions & Hackathons" },
  { id: "STARTUP_INCUBATOR_ACCELERATOR", label: "Incubators & Accelerators" },
  { id: "ENTREPRENEURSHIP_SEED_FUNDING", label: "Startup Grants & Seed Calls (৳10L+)" },
  { id: "CONFERENCE_YOUTH_SUMMIT", label: "Youth Summits & Conferences" },
  { id: "EXCHANGE_PROGRAM", label: "Exchange Programs & Fellowships" },
  { id: "VOLUNTEER_NGO", label: "Volunteer & NGO Opportunities" },
  { id: "FREELANCE_GIG", label: "Freelance & Project Gigs" },
  { id: "STARTUP_COFOUNDER_COLLAB", label: "Startup Co-founder Calls" },
  { id: "AWARD_RECOGNITION", label: "Awards & Recognition Programs" },
  { id: "TRAINING_BOOTCAMP", label: "Training & Tech Bootcamps" },
  { id: "INTERNATIONAL_DEVELOPMENT", label: "International Development (UN / WB)" },
];

export default function JobsPage() {
  const { state, addNotification } = useUser();
  const { user } = useAuth();

  // Canonical Opportunities State
  const [canonicalJobs, setCanonicalJobs] = useState<CanonicalJob[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);

  // Filters
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [selectedOpportunityType, setSelectedOpportunityType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");
  const [onlyLiveVerified, setOnlyLiveVerified] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "salary_desc" | "deadline">("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  // Drawer / Modal State
  const [selectedJob, setSelectedJob] = useState<CanonicalJob | null>(null);
  const [showTracker, setShowTracker] = useState(false);

  // Application Tracker State
  const [dbApplications, setDbApplications] = useState<any[]>([]);
  const [movingId, setMovingId] = useState<string | null>(null);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSector, selectedOpportunityType, searchQuery, selectedLocation, onlyLiveVerified, sortBy]);

  // Build Calibrated Candidate Passport from User State
  const candidatePassport: CandidatePassport = useMemo(() => {
    const profile = state.passportProfile;
    const evidence: Record<string, { tier: 0 | 1 | 2 | 3; credentialHash?: string }> = {};

    if (profile?.verifiedSkillDetails) {
      Object.entries(profile.verifiedSkillDetails).forEach(([skillName, detail]) => {
        if (detail.verified) {
          evidence[skillName.toLowerCase().replace(/\s+/g, "-")] = {
            tier: 3,
            credentialHash: detail.hash,
          };
        }
      });
    }

    evidence["ts-react-nextjs"] = { tier: 2 };
    evidence["distributed-systems"] = { tier: 1 };
    evidence["kafka-streams"] = { tier: 2 };

    const degLower = (profile?.degree || "").toLowerCase();
    let discipline = "COMPUTER_SCIENCE_ENGINEERING";
    if (degLower.includes("bba") || degLower.includes("finance") || degLower.includes("business")) {
      discipline = "BUSINESS_ADMINISTRATION_FINANCE_ACCOUNTING";
    } else if (degLower.includes("agri") || degLower.includes("agronomy")) {
      discipline = "AGRICULTURE_AGRONOMY";
    } else if (degLower.includes("civil")) {
      discipline = "CIVIL_ENGINEERING";
    } else if (degLower.includes("mech")) {
      discipline = "MECHANICAL_ENGINEERING";
    } else if (degLower.includes("law")) {
      discipline = "LAW_LEGAL_STUDIES";
    }

    return {
      id: user?.$id || "candidate-default",
      birthDate: "1998-05-15",
      permanentHomeDistrict: "Dhaka",
      isOrphanOrPhysicallyDisabled: false,
      hasFreedomFighterOrEthnicQuota: false,
      highestDegreeLevel: "BACHELORS_HONOURS",
      academicDiscipline: discipline,
      cgpaOn4Scale: 3.65,
      hasAnyThirdDivisionOrClass: false,
      competencyEvidence: evidence,
    };
  }, [state.passportProfile, user]);

  // 1. Fetch Canonical Opportunities from API
  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.jobs)) {
          setCanonicalJobs(data.jobs);
        }
      }
    } catch (err: any) {
      console.error("[JobsPage] Error fetching canonical jobs:", err.message);
    } finally {
      setLoadingJobs(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // 2. Trigger Real-time Ingestion Radar
  const handleRunHarvest = async () => {
    setIsHarvesting(true);
    addNotification({
      type: "system",
      title: "Real-Time Radar Ingesting",
      message: "Querying RemoteOK, Greenhouse, 346 BD enterprise directories, and DeepSeek AI harvester...",
    });

    try {
      const res = await fetch("/api/jobs/harvest", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchJobs();
        addNotification({
          type: "achievement",
          title: "Ingestion Radar Complete",
          message: `Ingested ${data.summary?.viableRecordsIngested || 0} viable canonical requisitions across ${data.summary?.sourcesQueried?.length || 0} sources.`,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      addNotification({
        type: "alert",
        title: "Ingestion Error",
        message: err.message || "Failed to trigger live harvest radar.",
      });
    } finally {
      setIsHarvesting(false);
    }
  };

  // 3. Trigger Link Health Sweeper
  const handleRunSweep = async () => {
    setIsSweeping(true);
    addNotification({
      type: "system",
      title: "Link Health Sweeper Active",
      message: "Probing live upstream government portals, ATS systems, and Wayback Machine fallback caches...",
    });

    try {
      const res = await fetch("/api/jobs/sweep", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchJobs();
        addNotification({
          type: "achievement",
          title: "Link Sweep Verified",
          message: `Probed ${data.summary?.totalProbed || 0} requisitions. Live: ${data.summary?.liveVerified || 0}, Wayback Preserved: ${data.summary?.waybackArchived || 0}.`,
        });
      }
    } catch (err: any) {
      addNotification({
        type: "alert",
        title: "Link Sweep Failed",
        message: err.message || "Upstream sweep could not complete.",
      });
    } finally {
      setIsSweeping(false);
    }
  };

  // 4. Load Application Tracker
  const loadApplications = useCallback(async () => {
    let dbDocs: any[] = [];
    if (user) {
      try {
        dbDocs = await fetchUserJobApplications(user.$id);
      } catch (err) {
        console.error("Error fetching DB applications:", err);
      }
    }

    let localDocs: any[] = [];
    try {
      const raw = localStorage.getItem("insyt_job_applications");
      if (raw) localDocs = JSON.parse(raw);
    } catch {
      /* ignore */
    }

    const mergedMap = new Map<string, any>();
    localDocs.forEach((d) => mergedMap.set(d.jobId, d));
    dbDocs.forEach((d) => mergedMap.set(d.jobId, d));

    setDbApplications(Array.from(mergedMap.values()));
  }, [user]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleMoveStatus = async (docId: string, newStatus: JobApplicationDoc["status"]) => {
    setMovingId(docId);

    setDbApplications((prev) => {
      const updated = prev.map((app) =>
        app.$id === docId || app.jobId === docId ? { ...app, status: newStatus } : app
      );
      try {
        localStorage.setItem("insyt_job_applications", JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });

    if (!docId.startsWith("app_local_") && !docId.startsWith("app_")) {
      await updateApplicationStatus(docId, newStatus);
    }

    const col = COLUMNS.find((c) => c.id === newStatus);
    addNotification({
      type: "system",
      title: "Application Status Updated",
      message: `Requisition moved to: ${col?.label || newStatus}`,
    });

    setMovingId(null);
  };

  const handleTrackJob = (job: CanonicalJob) => {
    const existing = dbApplications.find((a) => a.jobId === job.id);
    if (existing) {
      addNotification({
        type: "system",
        title: "Requisition Already Tracked",
        message: `'${job.title}' is already in your application pipeline.`,
      });
      setShowTracker(true);
      return;
    }

    const newApp = {
      $id: `app_local_${job.id}`,
      jobId: job.id,
      userId: user?.$id || "guest",
      jobTitle: job.title,
      company: job.organizationAcronym || job.organizationName,
      status: "applied" as const,
      appliedAt: new Date().toISOString(),
      notes: `Applied via official portal: ${job.officialPortalUrl}`,
    };

    const updated = [newApp, ...dbApplications];
    setDbApplications(updated);
    try {
      localStorage.setItem("insyt_job_applications", JSON.stringify(updated));
    } catch {
      /* ignore */
    }

    addNotification({
      type: "achievement",
      title: "Requisition Tracked",
      message: `Added '${job.title}' to your Application Tracker Kanban.`,
    });
    setShowTracker(true);
  };

  // 5. Filtering & Sorting
  const filteredJobs = useMemo(() => {
    let result = [...canonicalJobs];

    if (selectedSector !== "ALL") {
      result = result.filter((j) => j.sector === selectedSector);
    }

    if (selectedOpportunityType !== "ALL") {
      result = result.filter((j) => j.opportunityType === selectedOpportunityType);
    }

    if (onlyLiveVerified) {
      result = result.filter((j) => j.archiveStatus === "LIVE_VERIFIED" && !j.isExpired);
    }

    if (selectedLocation !== "ALL") {
      result = result.filter((j) =>
        j.divisionLocation.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.organizationName.toLowerCase().includes(q) ||
          (j.organizationAcronym && j.organizationAcronym.toLowerCase().includes(q)) ||
          j.summaryPlainText.toLowerCase().includes(q) ||
          j.competencies.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (sortBy === "salary_desc") {
      result.sort((a, b) => b.normalizedMonthlyBdtRange.maxBdt - a.normalizedMonthlyBdtRange.maxBdt);
    } else if (sortBy === "deadline") {
      result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return result;
  }, [canonicalJobs, selectedSector, selectedOpportunityType, onlyLiveVerified, selectedLocation, searchQuery, sortBy]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, currentPage]);

  // Aggregate Stats
  const stats = useMemo(() => {
    const total = canonicalJobs.length;
    const govt = canonicalJobs.filter((j) => j.sector === "GOVERNMENT").length;
    const banking = canonicalJobs.filter((j) => j.sector === "BANKING").length;
    const corporate = canonicalJobs.filter((j) => j.sector === "CORPORATE_MNC").length;
    const ngo = canonicalJobs.filter((j) => j.sector === "DEVELOPMENT_NGO").length;
    const startup = canonicalJobs.filter((j) => j.sector === "STARTUP").length;
    const academic = canonicalJobs.filter((j) => j.sector === "ACADEMIC_RESEARCH").length;
    const remote = canonicalJobs.filter((j) => j.sector === "GLOBAL_REMOTE").length;
    const liveCount = canonicalJobs.filter((j) => j.archiveStatus === "LIVE_VERIFIED").length;
    return { total, govt, banking, corporate, ngo, startup, academic, remote, liveCount };
  }, [canonicalJobs]);

  const appliedJobIds = useMemo(() => new Set(dbApplications.map((a) => a.jobId)), [dbApplications]);

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#1A1D2E] p-4 sm:p-8 space-y-8 font-sans">
      {/* ─── 1. TOP HEADER & TELEMETRY BAR ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Project AURA · Autonomous Labor Pipeline (1,000+ Opportunities)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Opportunities Radar & Requisitions
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Real-time canonical labor intelligence. 1,000+ verified opportunities covering Bangladesh Civil Service gazettes, Corporate MNCs, Internships, Fellowships, Scholarships, Research Grants, Incubators, Hackathons, and Global Remote (USD) requisitions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRunHarvest}
            disabled={isHarvesting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isHarvesting ? "animate-spin" : ""}`} />
            <span>{isHarvesting ? "Ingesting APIs..." : "Sync Live Pipeline"}</span>
          </button>

          <button
            onClick={handleRunSweep}
            disabled={isSweeping}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            <ShieldCheck className={`w-3.5 h-3.5 text-emerald-600 ${isSweeping ? "animate-pulse" : ""}`} />
            <span>{isSweeping ? "Probing Links..." : "Probe Health"}</span>
          </button>

          <button
            onClick={() => setShowTracker(!showTracker)}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-xs border shadow-xs transition-colors cursor-pointer ${
              showTracker
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Tracker ({dbApplications.length})</span>
          </button>
        </div>
      </div>

      {/* ─── 2. STATS KPI OVERVIEW ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            All Opportunities
          </span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block font-mono">
            {stats.total.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" /> Live Ingested
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Government (NPS 9-20)
          </span>
          <span className="text-2xl font-extrabold text-blue-700 mt-1 block font-mono">
            {stats.govt}
          </span>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            BPSC · BARI · BRRI
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Corporate MNCs (BD)
          </span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block font-mono">
            {stats.corporate}
          </span>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            Square · ACI · bKash
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Dev & NGOs (UN / BRAC)
          </span>
          <span className="text-2xl font-extrabold text-teal-700 mt-1 block font-mono">
            {stats.ngo}
          </span>
          <span className="text-[10px] text-teal-600 font-mono mt-1 block">
            Fellowships · Grants
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Startups & Grants
          </span>
          <span className="text-2xl font-extrabold text-violet-700 mt-1 block font-mono">
            {stats.startup}
          </span>
          <span className="text-[10px] text-violet-600 font-mono mt-1 block">
            Incubators · ৳10L Calls
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Scholarships & Research
          </span>
          <span className="text-2xl font-extrabold text-amber-700 mt-1 block font-mono">
            {stats.academic}
          </span>
          <span className="text-[10px] text-amber-600 font-mono mt-1 block">
            Study-Abroad · Bootcamps
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Global Remote (USD)
          </span>
          <span className="text-2xl font-extrabold text-indigo-700 mt-1 block font-mono">
            {stats.remote}
          </span>
          <span className="text-[10px] text-indigo-600 font-mono mt-1 block">
            GitLab · RemoteOK
          </span>
        </div>
      </div>

      {/* ─── 3. APPLICATION TRACKER KANBAN (COLLAPSIBLE) ─── */}
      <AnimatePresence>
        {showTracker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-blue-600" />
                <span>Your Application Tracker Pipeline</span>
              </h2>
              <button
                onClick={() => setShowTracker(false)}
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
              >
                Hide Tracker
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COLUMNS.map((col) => {
                const items = dbApplications.filter((a) => a.status === col.id);
                return (
                  <div
                    key={col.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col min-h-[160px]"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: col.color }}>
                        {col.label}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700">
                        {items.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 flex-1 overflow-y-auto">
                      {items.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-400 font-mono">
                          No requisitions
                        </div>
                      ) : (
                        items.map((item) => (
                          <div
                            key={item.$id || item.jobId}
                            className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-xs space-y-2 shadow-xs"
                          >
                            <div>
                              <span className="font-bold text-slate-900 block truncate">{item.jobTitle}</span>
                              <span className="text-slate-500 text-[11px] block">{item.company}</span>
                            </div>

                            {/* Status changer buttons */}
                            <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-200/60">
                              {COLUMNS.map((target) => (
                                <button
                                  key={target.id}
                                  onClick={() => handleMoveStatus(item.$id, target.id)}
                                  disabled={target.id === col.id || movingId === item.$id}
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                                    target.id === col.id
                                      ? "bg-slate-200 text-slate-500 border-transparent cursor-default"
                                      : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200 cursor-pointer"
                                  }`}
                                >
                                  {target.label.split(" ")[0]}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 4. SECTOR TABS & SEARCH / FILTER CONTROLS ─── */}
      <div className="space-y-4">
        {/* Sector Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {[
            { id: "ALL", label: "All Opportunities", count: stats.total },
            { id: "GOVERNMENT", label: "Government & Research", count: stats.govt },
            { id: "CORPORATE_MNC", label: "Corporate MNCs (BD)", count: stats.corporate },
            { id: "DEVELOPMENT_NGO", label: "Dev & NGOs (UN/BRAC)", count: stats.ngo },
            { id: "STARTUP", label: "Startups, Grants & Incubators", count: stats.startup },
            { id: "ACADEMIC_RESEARCH", label: "Academic & Scholarships", count: stats.academic },
            { id: "GLOBAL_REMOTE", label: "Global Remote (USD)", count: stats.remote },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSector(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSector === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedSector === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 1,000+ opportunities by title, organization, or competency..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* 15 Opportunity Types Dropdown */}
            <select
              value={selectedOpportunityType}
              onChange={(e) => setSelectedOpportunityType(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 font-semibold focus:outline-none max-w-[220px]"
            >
              {OPPORTUNITY_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Division Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Locations</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Remote">Remote</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="salary_desc">Highest Funding / Salary</option>
              <option value="deadline">Closing Soonest</option>
            </select>

            {/* Live Only Toggle */}
            <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyLiveVerified}
                onChange={(e) => setOnlyLiveVerified(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="hidden sm:inline">Live Only</span>
            </label>
          </div>
        </div>

        {/* Results Info Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono">
          <div>
            Showing <span className="font-bold text-slate-800">{paginatedJobs.length}</span> of{" "}
            <span className="font-bold text-slate-800">{filteredJobs.length.toLocaleString()}</span> opportunities
            {selectedOpportunityType !== "ALL" && (
              <span className="ml-1 text-purple-700 font-semibold">
                (Filter: {OPPORTUNITY_TYPE_OPTIONS.find((o) => o.id === selectedOpportunityType)?.label})
              </span>
            )}
          </div>
          <div>Page {currentPage} of {totalPages}</div>
        </div>
      </div>

      {/* ─── 5. REQUISITION GRID ─── */}
      {loadingJobs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-white border border-slate-200 p-5 animate-pulse space-y-4"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                </div>
              </div>
              <div className="h-16 bg-slate-100 rounded-xl" />
              <div className="h-8 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No opportunities match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, sector selection, or opportunity type filter.
          </p>
          <button
            onClick={() => {
              setSelectedSector("ALL");
              setSelectedOpportunityType("ALL");
              setSearchQuery("");
              setSelectedLocation("ALL");
              setOnlyLiveVerified(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedJobs.map((job) => (
              <CanonicalJobCard
                key={job.id}
                job={job}
                onSelect={(j) => setSelectedJob(j)}
                onApplyTracker={(j) => handleTrackJob(j)}
                isApplied={appliedJobIds.has(job.id)}
                candidatePassport={candidatePassport}
              />
            ))}
          </div>

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-xs font-mono text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                  let pageNum = currentPage - 2 + idx;
                  if (pageNum < 1) pageNum = idx + 1;
                  if (pageNum > totalPages) pageNum = totalPages - 4 + idx;
                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-xl font-bold transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white shadow-xs"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── 6. SPLIT-SCREEN SPECIMEN DRAWER ─── */}
      <CanonicalJobDrawer
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApplyTracker={(j) => handleTrackJob(j)}
        candidatePassport={candidatePassport}
      />
    </div>
  );
}
