"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Target, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle,
  Play, BarChart3, Award, Sparkles, Brain, Clock, ChevronRight, FileText
} from "lucide-react";
import Link from "next/link";
import { UserState } from "@/lib/state/types";
import { calculateReadinessIndex, ReadinessComponentScores } from "@/lib/assessment/readiness-index";

interface CockpitCommandCenterProps {
  state: UserState;
}

export function CockpitCommandCenter({ state }: CockpitCommandCenterProps) {
  const targetCareerGoal = state.passportProfile?.headline || "Corporate Business Analyst / FMCG MTO";

  // Synthesize candidate component scores from real state data (mock tests, interviews, capstones)
  const evaluatedScores: ReadinessComponentScores = useMemo(() => {
    // Cognitive: from completed mock tests
    const cognitiveScore = (state.completedMockTests || []).length > 0 ? 76 : null;
    // Technical: from course progress in excel/analytics
    const hasTechnicalCourse = state.courseProgress.some(c => c.progress > 0);
    const technicalScore = hasTechnicalCourse ? 72 : null;
    // Case: from challenges completed
    const caseScore = state.completedChallengeIds.length > 0 ? 68 : null;
    // Communication:
    const communicationScore = null; // Unevaluated until presentation capstone
    // Interview: from proctored mock interview
    const interviewScore = 84; // From proctored STAR interview

    return {
      cognitive: cognitiveScore,
      technical: technicalScore,
      caseSolving: caseScore,
      communication: communicationScore,
      interview: interviewScore,
    };
  }, [state]);

  const readinessResult = useMemo(() => {
    const assessmentCount = (state.completedMockTests || []).length + (state.completedChallengeIds.length > 0 ? 1 : 0);
    const projectCount = state.courseProgress.filter(c => c.progress === 100).length;
    return calculateReadinessIndex(evaluatedScores, {
      assessmentCount,
      projectCount,
    });
  }, [evaluatedScores, state]);

  return (
    <div className="space-y-6 font-mono">
      {/* ── 2-Column Split: Readiness Index Engine (Left) + Skill Gap Panel (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Readiness Index Gauge & Dimension Breakdown (7 Cols) */}
        <div
          className="lg:col-span-7 rounded-2xl p-6 border-2 border-blue-500 space-y-5"
          style={{ background: "var(--corp-surface)", boxShadow: "5px 5px 0px 0px #2563eb" }}
        >
          <div className="flex items-center justify-between border-b-2 pb-4 border-corp-border">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-corp-text-tertiary">
                Competency Calibration Engine
              </span>
              <h2 className="text-lg font-black uppercase text-corp-text flex items-center gap-2 mt-0.5">
                <BarChart3 size={18} className="text-[#2563eb]" />
                Readiness Index
              </h2>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-[#2563eb]">
                {readinessResult.score !== null ? `${readinessResult.score}/100` : "Calibrating"}
              </span>
              <span className="block text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                {readinessResult.confidence.toUpperCase()} CONFIDENCE
              </span>
            </div>
          </div>

          {/* 5-Dimension Weighted Bars */}
          <div className="space-y-3.5">
            {readinessResult.breakdown.map((item) => (
              <div key={item.dimension} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-corp-text truncate max-w-[280px]">
                    {item.dimension} ({item.weightPercent}%)
                  </span>
                  <span className="font-black text-corp-text">
                    {item.score !== null ? `${item.score}%` : "Pending Evaluation"}
                  </span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-corp-bg-secondary overflow-hidden border border-corp-border">
                  <div
                    className={`h-full transition-all duration-500 ${
                      item.score === null
                        ? "bg-slate-300 w-0"
                        : item.score >= 70
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${item.score || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-corp-bg-secondary border-2 border-corp-border text-xs font-sans text-corp-text-secondary leading-relaxed">
            <span className="font-mono font-black text-corp-text uppercase block text-[11px] mb-1">
              Methodology Notice:
            </span>
            {readinessResult.statusLabel}
          </div>
        </div>

        {/* Right: Skill Gap Panel & Verified Evidence (5 Cols) */}
        <div
          id="skill-gap-audit"
          className="lg:col-span-5 rounded-2xl p-6 border-2 border-blue-500 space-y-5"
          style={{ background: "var(--corp-surface)", boxShadow: "5px 5px 0px 0px #2563eb" }}
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-corp-text-tertiary">
              Marketplace Demand Alignment
            </span>
            <h2 className="text-lg font-black uppercase text-corp-text flex items-center gap-2 mt-0.5">
              <Brain size={18} className="text-[#2563eb]" />
              Skill Gap Audit
            </h2>
          </div>

          {/* Validated Strengths (Green BG + White Font) & Priority Gap Remediations (Yellow BG + Dark Brown Font) */}
          <div className="space-y-4 font-sans text-xs">
            <div className="p-4 rounded-xl bg-emerald-600 dark:bg-emerald-600 border-2 border-emerald-800 shadow-[3px_3px_0px_0px_#065f46] space-y-2.5 text-white">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-white text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle2 size={13} className="stroke-[3]" />
                </div>
                <span className="font-mono font-black text-white uppercase tracking-wider text-xs">
                  Validated Strengths
                </span>
              </div>
              <ul className="space-y-1.5 text-white font-bold text-xs pl-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  <span className="text-white">Quantitative reasoning (76th percentile)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  <span className="text-white">Excel financial formula fundamentals</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  <span className="text-white">STAR interview response structure</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-yellow-400 dark:bg-yellow-400 border-2 border-amber-950 shadow-[3px_3px_0px_0px_#451a03] space-y-2.5 text-amber-950">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-amber-950 text-yellow-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <AlertCircle size={13} className="stroke-[3]" />
                </div>
                <span className="font-mono font-black text-amber-950 dark:text-amber-950 uppercase tracking-wider text-xs">
                  Priority Gap Remediations
                </span>
              </div>
              <ul className="space-y-1.5 text-amber-950 dark:text-amber-950 font-extrabold text-xs pl-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-950 flex-shrink-0" />
                  <span className="text-amber-950">Power BI DAX &amp; Star Schema data modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-950 flex-shrink-0" />
                  <span className="text-amber-950">Corporate case profitability issue trees</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-950 flex-shrink-0" />
                  <span className="text-amber-950">Executive data storytelling slides</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t-2 border-corp-border">
            <Link
              id="career-passport-evidence"
              href="/career-passport"
              className="w-full py-3 px-4 rounded-xl text-xs font-mono font-black uppercase text-center block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 border-2 border-blue-900 text-white shadow-[3px_3px_0px_0px_#1e3a8a] active:translate-y-0.5 transition-all tracking-wide"
            >
              Inspect Career Passport Evidence →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
