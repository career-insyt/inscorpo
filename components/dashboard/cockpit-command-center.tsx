"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle,
  Play, BarChart3, Award, Sparkles, Brain, Clock, ChevronDown, ChevronUp, FileText
} from "lucide-react";
import Link from "next/link";
import { UserState } from "@/lib/state/types";
import { calculateReadinessIndex, ReadinessComponentScores } from "@/lib/assessment/readiness-index";
import { YouTubeShortsWidget } from "@/components/dashboard/youtube-shorts-widget";
import { DailyQuestEngine } from "@/components/dashboard/daily-quest-engine";

interface CockpitCommandCenterProps {
  state: UserState;
}

export function CockpitCommandCenter({ state }: CockpitCommandCenterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const targetCareerGoal = state.passportProfile?.headline || "Corporate Business Analyst / FMCG MTO";

  // Synthesize candidate component scores dynamically from verified assessments
  const evaluatedScores: ReadinessComponentScores = useMemo(() => {
    const verifiedDetails = state.passportProfile?.verifiedSkillDetails || {};
    const verifiedEntries = Object.entries(verifiedDetails).filter(([_, v]) => v.verified && typeof v.score === "number");

    // Helper to calculate average score for matching keywords
    const getDimensionScore = (keywords: string[]): number | null => {
      const matches = verifiedEntries.filter(([name]) =>
        keywords.some(kw => name.toLowerCase().includes(kw.toLowerCase()))
      );
      if (matches.length === 0) return null;
      const sum = matches.reduce((acc, [_, v]) => acc + v.score, 0);
      return Math.round(sum / matches.length);
    };

    // 1. Cognitive Readiness (Aptitude, quantitative, verbal, logical)
    let cognitive = getDimensionScore(["quantitative", "verbal", "cognitive", "logical", "aptitude", "gre"]);
    if (cognitive === null && (state.completedMockTests || []).length > 0) {
      try {
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("insyt_mock_test_results");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const sum = parsed.reduce((acc: number, item: any) => acc + (item.score || 0), 0);
              cognitive = Math.round(sum / parsed.length);
            }
          }
        }
      } catch {}
    }

    // 2. Technical Readiness (Excel, SQL, Power BI, Python, Modeling)
    const technical = getDimensionScore(["excel", "sql", "power bi", "python", "modeling", "commercial", "analytics"]);

    // 3. Case Readiness (Case Solving, Structuring)
    let caseSolving = getDimensionScore(["case", "structuring", "market entry", "profitability"]);
    if (caseSolving === null && state.completedChallengeIds.length > 0) {
      caseSolving = 70; // baseline pass for completed challenge
    }

    // 4. Communication Readiness (Presentations, Gamma, Executive Writing)
    const communication = getDimensionScore(["communication", "presentation", "deck", "storytelling", "gamma"]);

    // 5. Interview Readiness (STAR behavioral, mock interview transcripts)
    let interview: number | null = getDimensionScore(["interview", "behavioral", "viva"]);
    if (interview === null) {
      try {
        if (typeof window !== "undefined") {
          const rawInterview = localStorage.getItem("insyt_interview_scores");
          if (rawInterview) {
            const parsed = JSON.parse(rawInterview);
            if (Array.isArray(parsed) && parsed.length > 0) {
              interview = Math.round(parsed.reduce((a: number, b: any) => a + (b.score || 0), 0) / parsed.length);
            }
          }
        }
      } catch {}
    }

    return {
      cognitive,
      technical,
      caseSolving,
      communication,
      interview,
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
      {/* ── 2-Column Split: Competency Calibration Engine + Daily Quest (Left) + Quick Learnings Reels (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Competency Calibration Engine + Daily Quest Engine */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl p-5 sm:p-6 border-2 border-blue-500 bg-white space-y-4 shadow-[5px_5px_0px_0px_#2563eb]">
            <div className="flex items-center justify-between border-b-2 pb-4 border-blue-100 flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#2563eb]">
                  Competency Calibration Engine
                </span>
              <h2 className="text-base sm:text-lg font-black uppercase text-slate-900 flex items-center gap-2 mt-0.5">
                <BarChart3 size={18} className="text-[#2563eb]" />
                Readiness Index
              </h2>
            </div>

            <div className="text-right">
              {readinessResult.score !== null ? (
                <>
                  <span className="text-2xl font-black text-[#2563eb]">
                    {readinessResult.score}/100
                  </span>
                  <span className="block text-[10px] font-black uppercase text-emerald-700">
                    {readinessResult.confidence.toUpperCase()} CONFIDENCE
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs font-black text-amber-700 uppercase block">
                    Diagnostic Incomplete
                  </span>
                  <span className="block text-[10px] font-bold text-slate-500">
                    Complete ≥ 2 assessments to calibrate
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Compact Target Role Summary */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border-2 border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase text-slate-700 block">
                Target Role Benchmark
              </span>
              <span className="font-black text-slate-900 font-sans text-sm">
                {targetCareerGoal}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase text-[#2563eb] bg-white border-2 border-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-xs cursor-pointer self-start sm:self-center active:scale-95 flex-shrink-0"
            >
              <span>{isExpanded ? "Collapse Engine" : "Expand Breakdown"}</span>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Collapsible 5-Dimension Weighted Bars */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 pt-2 overflow-hidden"
              >
                <div className="space-y-3.5">
                  {readinessResult.breakdown.map((item) => (
                    <div key={item.dimension} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 truncate max-w-[280px]">
                          {item.dimension} ({item.weightPercent}%)
                        </span>
                        <span className="font-black text-slate-900">
                          {item.score !== null ? `${item.score}%` : "Pending Evaluation"}
                        </span>
                      </div>

                      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-300">
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

                <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-sans text-slate-800 leading-relaxed">
                  <span className="font-mono font-black text-slate-900 uppercase block text-[11px] mb-1">
                    Methodology Notice:
                  </span>
                  {readinessResult.statusLabel}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick link to Career Passport Evidence */}
          <div className="pt-2 border-t-2 border-blue-100">
            <Link
              href="/career-passport"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-black uppercase text-center block bg-[#2563eb] hover:bg-blue-700 border-2 border-blue-900 text-white shadow-[2px_2px_0px_0px_#1e3a8a] active:translate-y-0.5 transition-all tracking-wide"
            >
              Inspect Career Passport Evidence →
            </Link>
          </div>
        </div>

        {/* Daily Quests Engine Widget directly below Competency Calibration Engine */}
        <DailyQuestEngine />
      </div>

      {/* Right: Quick Learnings Reel Section (Replaces Skill Gap Audit) */}
      <div className="lg:col-span-5 w-full">
          <YouTubeShortsWidget />
        </div>

      </div>
    </div>
  );
}
