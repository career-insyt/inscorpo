"use client";

import { useState, useEffect } from "react";
import {
  Clock, MapPin, DollarSign, ShieldCheck, CheckCircle2,
  Archive, ExternalLink, Sparkles, ChevronRight, Landmark, Globe,
  Building2, AlertTriangle, Layers
} from "lucide-react";
import type { CanonicalJob } from "@/lib/jobs/canonical-job-schema";
import { evaluateCandidateMatch, CandidatePassport } from "@/lib/jobs/candidate-matcher";
import { CompanyLogo } from "./company-logo";

interface CanonicalJobCardProps {
  job: CanonicalJob;
  onSelect: (job: CanonicalJob) => void;
  onApplyTracker?: (job: CanonicalJob) => void;
  isApplied?: boolean;
  candidatePassport?: CandidatePassport;
}

export function CanonicalJobCard({
  job,
  onSelect,
  onApplyTracker,
  isApplied = false,
  candidatePassport,
}: CanonicalJobCardProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    isUrgent: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, isUrgent: false });

  // Live ticking BST Countdown
  useEffect(() => {
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
  }, [job.deadline]);

  // Real Mathematical Candidate Match Calculation
  const matchResult = candidatePassport
    ? evaluateCandidateMatch(candidatePassport, job)
    : null;

  const gov = job.governmentAttributes;
  const corp = job.corporateRemoteAttributes;

  const getSectorBadge = () => {
    switch (job.sector) {
      case "GOVERNMENT":
        return {
          label: `Govt ${gov?.payScaleGrade ? `Grade ${gov.payScaleGrade}` : "Gazetted"}`,
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Landmark className="w-3 h-3 text-blue-700" />,
        };
      case "BANKING":
        return {
          label: "Banking & Financial",
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <Landmark className="w-3 h-3 text-emerald-700" />,
        };
      case "GLOBAL_REMOTE":
        return {
          label: "Global Remote (USD)",
          bg: "bg-indigo-50 text-indigo-800 border-indigo-200",
          icon: <Globe className="w-3 h-3 text-indigo-700" />,
        };
      case "DEVELOPMENT_NGO":
        return {
          label: "Development / NGO",
          bg: "bg-teal-50 text-teal-800 border-teal-200",
          icon: <Globe className="w-3 h-3 text-teal-700" />,
        };
      case "STARTUP":
        return {
          label: "Startup / Grants",
          bg: "bg-violet-50 text-violet-800 border-violet-200",
          icon: <Sparkles className="w-3 h-3 text-violet-700" />,
        };
      case "ACADEMIC_RESEARCH":
        return {
          label: "Academic / Research",
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <Landmark className="w-3 h-3 text-amber-700" />,
        };
      case "CORPORATE_MNC":
      default:
        return {
          label: "Corporate MNC (BD)",
          bg: "bg-slate-100 text-slate-800 border-slate-200",
          icon: <Building2 className="w-3 h-3 text-slate-600" />,
        };
    }
  };

  const getOpportunityTypeLabel = () => {
    switch (job.opportunityType) {
      case "INTERNSHIP_PLACEMENT": return "Internship";
      case "FELLOWSHIP": return "Fellowship";
      case "SCHOLARSHIP_STUDY_ABROAD": return "Scholarship";
      case "GRANT_RESEARCH_FUNDING": return "Research Grant";
      case "BUSINESS_COMPETITION_HACKATHON": return "Hackathon / Competition";
      case "STARTUP_INCUBATOR_ACCELERATOR": return "Incubator / Accelerator";
      case "ENTREPRENEURSHIP_SEED_FUNDING": return "Seed Funding Call";
      case "CONFERENCE_YOUTH_SUMMIT": return "Youth Summit";
      case "EXCHANGE_PROGRAM": return "Exchange Program";
      case "VOLUNTEER_NGO": return "Volunteer Opportunity";
      case "FREELANCE_GIG": return "Freelance Project";
      case "STARTUP_COFOUNDER_COLLAB": return "Co-founder Call";
      case "AWARD_RECOGNITION": return "National Award";
      case "TRAINING_BOOTCAMP": return "Upskilling Bootcamp";
      case "INTERNATIONAL_DEVELOPMENT": return "International Dev";
      case "FULL_TIME_JOB":
      default:
        return "Full-Time Requisition";
    }
  };

  const sectorBadge = getSectorBadge();
  const opportunityLabel = getOpportunityTypeLabel();

  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 hover:border-blue-400 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Header: Logo, Org, Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <CompanyLogo
              company={job.organizationAcronym || job.organizationName}
              size={40}
              className="w-10 h-10 border border-slate-200 rounded-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  {job.organizationAcronym || job.organizationName}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${sectorBadge.bg}`}
                >
                  {sectorBadge.icon}
                  {sectorBadge.label}
                </span>
                {job.opportunityType && job.opportunityType !== "FULL_TIME_JOB" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    <Sparkles className="w-2.5 h-2.5" />
                    {opportunityLabel}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5 line-clamp-1">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Link Health Badge */}
          <div>
            {job.archiveStatus === "LIVE_VERIFIED" ? (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                title="Verified HTTP 200 directly from official portal"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                VERIFIED LIVE
              </span>
            ) : job.archiveStatus === "EXPIRING_WITHIN_48H" ? (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300 animate-pulse"
                title="Application window closes in less than 48 hours"
              >
                <Clock className="w-3 h-3 text-amber-600" />
                CLOSING SOON
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200"
                title="Preserved via Internet Archive Wayback Machine snapshot"
              >
                <Archive className="w-3 h-3 text-amber-700" />
                ARCHIVED
              </span>
            )}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[10px] block uppercase tracking-wider">Compensation</span>
            <span className="font-bold text-slate-900">
              {job.currency === "BDT" ? "৳" : "$"}
              {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] block uppercase tracking-wider">Location / Overlap</span>
            <span className="font-bold text-slate-700 truncate block">
              {corp ? `${corp.timeZoneOverlapHoursWithBST}h BST Overlap` : job.divisionLocation}
            </span>
          </div>
        </div>

        {/* Live BST Countdown Box */}
        <div
          className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between border ${
            timeLeft.isExpired
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : timeLeft.isUrgent
              ? "bg-amber-50 border-amber-300 text-amber-900 font-bold"
              : "bg-blue-50/60 border-blue-100 text-blue-900"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {timeLeft.isExpired
                ? "CLOSED"
                : timeLeft.isUrgent
                ? "CLOSES SOON:"
                : "REMAINING:"}
            </span>
          </div>
          <span className="font-bold tracking-tight">
            {timeLeft.isExpired
              ? "Requisition Ended"
              : `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </span>
        </div>

        {/* Real Candidate Mathematical Fit (if available) */}
        {matchResult && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-slate-700">INSYT Calibrated Fit:</span>
            </div>
            {!matchResult.isStatutorilyEligible ? (
              <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 truncate max-w-[180px]">
                DISQUALIFIED ({matchResult.unmetPrerequisiteReasons[0] || "Eligibility Gate"})
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {matchResult.alignmentScore}% Match
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(job)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm"
        >
          <span>Inspect Specimen</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={job.officialPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
          title="Open official portal"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {onApplyTracker && (
          <button
            onClick={() => onApplyTracker(job)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              isApplied
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
          >
            {isApplied ? "Tracked" : "Track"}
          </button>
        )}
      </div>
    </div>
  );
}
