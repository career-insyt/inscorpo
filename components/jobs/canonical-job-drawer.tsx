"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ExternalLink, ShieldCheck, Clock, Sparkles, Building2,
  DollarSign, Calendar, Award, FileText, CheckCircle2, AlertTriangle,
  GraduationCap, Briefcase, Globe, Archive, Percent, ChevronRight,
  Send, Landmark
} from "lucide-react";
import type { CanonicalJob } from "@/lib/jobs/canonical-job-schema";
import { evaluateCandidateMatch, CandidatePassport } from "@/lib/jobs/candidate-matcher";
import { CompanyLogo } from "./company-logo";

interface CanonicalJobDrawerProps {
  job: CanonicalJob | null;
  onClose: () => void;
  onApplyTracker?: (job: CanonicalJob) => void;
  candidatePassport?: CandidatePassport;
}

export function CanonicalJobDrawer({
  job,
  onClose,
  onApplyTracker,
  candidatePassport,
}: CanonicalJobDrawerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    isUrgent: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, isUrgent: false });

  // Real-time BST Countdown
  useEffect(() => {
    if (!job) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const deadlineTime = new Date(job.deadline).getTime();
      const diff = deadlineTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isUrgent: false });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const isUrgent = diff <= 48 * 3600 * 1000;

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false, isUrgent });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [job]);

  if (!job) return null;

  // Real Mathematical Candidate Match Calculation
  const matchResult = candidatePassport
    ? evaluateCandidateMatch(candidatePassport, job)
    : null;

  const isGovOrBanking = job.sector === "GOVERNMENT" || job.sector === "BANKING";
  const gov = job.governmentAttributes;
  const corp = job.corporateRemoteAttributes;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col font-sans"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <CompanyLogo
                company={job.organizationAcronym || job.organizationName}
                size={44}
                className="w-10 h-10 border border-slate-200 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {job.sector.replace(/_/g, " ")}
                  </span>
                  {job.opportunityType && (
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      {job.opportunityType.replace(/_/g, " ")}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium truncate max-w-[240px]">
                    {job.organizationName}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {job.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Split Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Pane: Specimen & Authoritative Verification (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-slate-50/40 space-y-6">
              {/* Ticking Live BST Countdown */}
              <div
                className={`p-4 rounded-xl border ${
                  timeLeft.isExpired
                    ? "bg-rose-50 border-rose-200 text-rose-800"
                    : timeLeft.isUrgent
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-blue-50 border-blue-200 text-blue-900"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {timeLeft.isExpired
                      ? "Official Requisition Terminated"
                      : timeLeft.isUrgent
                      ? "Critical Window (Under 48 Hours)"
                      : "Application Window (BST UTC+6)"}
                  </span>
                </div>
                {timeLeft.isExpired ? (
                  <p className="text-sm font-bold">This circular deadline has passed.</p>
                ) : (
                  <div className="font-mono text-xl font-bold tracking-tight">
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                  </div>
                )}
                <div className="text-[11px] text-slate-600 mt-1 font-mono">
                  Deadline: {new Date(job.deadline).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" })} BST
                </div>
              </div>

              {/* Upstream Health Status Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Portal Integrity Verification
                  </span>
                  {job.archiveStatus === "LIVE_VERIFIED" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      HTTP 200 LIVE
                    </span>
                  ) : job.archiveStatus === "EXPIRING_WITHIN_48H" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      <Clock className="w-3 h-3 text-amber-600" />
                      EXPIRING SOON
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      <Archive className="w-3 h-3 text-amber-700" />
                      WAYBACK PRESERVED
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1 font-mono">
                  <div className="truncate">
                    <span className="text-slate-400">Portal:</span>{" "}
                    <a
                      href={job.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {job.officialPortalUrl}
                    </a>
                  </div>
                  {job.waybackSnapshotUrl && (
                    <div className="truncate">
                      <span className="text-slate-400">Wayback:</span>{" "}
                      <a
                        href={job.waybackSnapshotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Internet Archive Snapshot
                      </a>
                    </div>
                  )}
                  {job.sourceAttributionNotice && (
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 italic">
                      {job.sourceAttributionNotice}
                    </div>
                  )}
                </div>
              </div>

              {/* Sector Specific Metadata (Left Pane) */}
              {gov && (
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                    <Landmark className="w-4 h-4 text-blue-700" />
                    <span>Statutory Gazette Parameters</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-white border border-blue-100">
                      <span className="text-slate-500 block text-[10px]">Ministry/Div</span>
                      <span className="font-bold text-slate-800">{gov.ministryOrDivision}</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-blue-100">
                      <span className="text-slate-500 block text-[10px]">Memo Number</span>
                      <span className="font-bold text-slate-800 truncate block" title={gov.memoNumber}>
                        {gov.memoNumber}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white border border-blue-100">
                      <span className="text-slate-500 block text-[10px]">Application Fee</span>
                      <span className="font-bold text-emerald-700">৳{gov.applicationFeeBdt} BDT</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-blue-100">
                      <span className="text-slate-500 block text-[10px]">Teletalk Code</span>
                      <span className="font-bold text-slate-800">{gov.teletalkPostCodeOrSlug || "Standard"}</span>
                    </div>
                  </div>
                  {gov.paymentSmsInstructions && (
                    <div className="p-2.5 rounded bg-blue-100/70 text-[11px] font-mono text-blue-950">
                      <span className="font-bold block">SMS Application Syntax:</span>
                      <code>{gov.paymentSmsInstructions}</code>
                    </div>
                  )}
                </div>
              )}

              {corp && (
                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    <Globe className="w-4 h-4 text-indigo-700" />
                    <span>Global Remote Logistics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-white border border-indigo-100">
                      <span className="text-slate-500 block text-[10px]">BST Overlap</span>
                      <span className="font-bold text-indigo-800">{corp.timeZoneOverlapHoursWithBST} Hours</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-indigo-100">
                      <span className="text-slate-500 block text-[10px]">Working Window</span>
                      <span className="font-bold text-slate-800">{corp.bstWorkingWindow}</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-indigo-100">
                      <span className="text-slate-500 block text-[10px]">Contract Model</span>
                      <span className="font-bold text-slate-800">{corp.contractType.replace(/_/g, " ")}</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-indigo-100">
                      <span className="text-slate-500 block text-[10px]">ATS Platform</span>
                      <span className="font-bold text-slate-800">{corp.atsPlatformName || "Direct"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={job.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Launch Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {onApplyTracker && (
                  <button
                    onClick={() => onApplyTracker(job)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Add to INSYT Application Tracker</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Pane: Compensation, SC Quotas, Competencies (7 cols) */}
            <div className="lg:col-span-7 p-6 space-y-6">
              {/* Compensation Box */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Compensation & Pay Scale
                  </span>
                  {gov && (
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-100 text-blue-800">
                      National Pay Scale Grade {gov.payScaleGrade}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {job.currency === "BDT" ? "৳" : "$"}
                    {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {job.currency} / {job.salaryPeriod.toLowerCase()}
                  </span>
                </div>

                {job.currency !== "BDT" && (
                  <div className="text-xs text-emerald-700 font-mono mt-1 font-semibold">
                    ≈ ৳{job.normalizedMonthlyBdtRange.minBdt.toLocaleString()} – ৳
                    {job.normalizedMonthlyBdtRange.maxBdt.toLocaleString()} BDT / month normalized
                  </div>
                )}

                {gov && (
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Basic Pay Range:</span>
                      <span className="font-bold text-slate-800">৳{gov.basicPayRangeBdt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimated Gross (inc. House + Medical):</span>
                      <span className="font-bold text-emerald-700">৳{gov.estimatedGrossSalaryBdt.toLocaleString()} BDT</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Statutory Quota Allocation (SC Ruling July 21, 2024) */}
              {gov && (
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Statutory Quota Distribution (Post-July 2024 SC Ruling)
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                      <span className="text-[10px] text-emerald-700 font-bold block">MERIT</span>
                      <span className="text-lg font-black text-emerald-900">
                        {gov.statutoryQuotaAllocation.meritPercentage}%
                      </span>
                    </div>
                    <div className="p-2 rounded bg-blue-50 border border-blue-200">
                      <span className="text-[10px] text-blue-700 font-bold block">FREEDOM FIGHTER</span>
                      <span className="text-lg font-black text-blue-900">
                        {gov.statutoryQuotaAllocation.freedomFighterChildPercentage}%
                      </span>
                    </div>
                    <div className="p-2 rounded bg-purple-50 border border-purple-200">
                      <span className="text-[10px] text-purple-700 font-bold block">ETHNIC</span>
                      <span className="text-lg font-black text-purple-900">
                        {gov.statutoryQuotaAllocation.ethnicMinoritiesPercentage}%
                      </span>
                    </div>
                    <div className="p-2 rounded bg-amber-50 border border-amber-200">
                      <span className="text-[10px] text-amber-700 font-bold block">DISABLED</span>
                      <span className="text-lg font-black text-amber-900">
                        {gov.statutoryQuotaAllocation.physicallyDisabledAndThirdGenderPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Qualifications & Statutory Cutoffs */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Eligibility & Qualification Requirements
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[10px]">Minimum Degree</span>
                    <span className="font-bold text-slate-800">
                      {job.qualifications.minimumDegreeLevel.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[10px]">Age Range</span>
                    <span className="font-bold text-slate-800">
                      {job.qualifications.minAgeYears} – {job.qualifications.maxAgeGeneralYears} Years
                      {job.qualifications.maxAgeQuotaOrDepartmentalYears &&
                        ` (${job.qualifications.maxAgeQuotaOrDepartmentalYears} Quota)`}
                    </span>
                  </div>
                  <div className="col-span-2 space-y-1 pt-1 border-t border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Accepted Academic Disciplines</span>
                    <div className="flex flex-wrap gap-1">
                      {job.qualifications.acceptedDisciplines.map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {d.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapped Competencies */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Core Competencies & O*NET SOC Codes
                </span>
                <div className="space-y-2">
                  {job.competencies.map((comp) => (
                    <div
                      key={comp.competencyId}
                      className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{comp.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          SOC: {comp.onetSocCode || "Standard"} · Weight: {comp.weightCategory.replace("_", " ")}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Mapped
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities & Description */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Role Overview
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {job.summaryPlainText}
                </p>
                {job.responsibilitiesMarkdown && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-mono whitespace-pre-wrap">
                    {job.responsibilitiesMarkdown}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
