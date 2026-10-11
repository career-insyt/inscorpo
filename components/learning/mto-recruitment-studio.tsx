"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  GitBranch, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Check, 
  Layers,
  Sparkles,
  HelpCircle,
  FileText
} from "lucide-react";

interface MTORecruitmentStudioProps {
  lessonSlug: string;
  courseSlug: string;
}

export function MTORecruitmentStudio({ lessonSlug, courseSlug }: MTORecruitmentStudioProps) {
  const [activeTab, setActiveTab] = useState<"speed_math" | "issue_tree" | "star_sim">("speed_math");

  // ── TAB 1: SPEED MATH DRILL STATE ─────────────────────────────────────────
  const [activeDrillIdx, setActiveDrillIdx] = useState(0);
  const [selectedDrillAnswer, setSelectedDrillAnswer] = useState<number | null>(null);
  const [drillSubmitted, setDrillSubmitted] = useState(false);
  const [drillScore, setDrillScore] = useState(0);

  const SPEED_DRILLS = [
    {
      id: 1,
      category: "Percentage Base Shift",
      prompt: "A beverage brand cuts its retail pack price from ৳100 to ৳80 (-20%). What percentage increase in sales volume is required to achieve the exact same total revenue?",
      options: ["+20.0%", "+25.0%", "+33.3%", "+15.0%"],
      correct: 1,
      explanation: "Base Shift Law: A 20% cut (1/5) requires a 1/(5 - 1) = 1/4 = +25.0% increase in volume to break even (0.80 * 1.25 = 1.00)."
    },
    {
      id: 2,
      category: "Margin vs Markup",
      prompt: "If a consumer electronics distributor requires a 33.33% Gross Margin on sales revenue, what markup percentage must they apply to their cost of goods?",
      options: ["25.0%", "+33.3%", "+50.0%", "+66.7%"],
      correct: 2,
      explanation: "Margin = Markup / (1 + Markup). A 33.33% margin (1/3) corresponds to a 1/(3 - 1) = 1/2 = +50.0% markup on cost."
    },
    {
      id: 3,
      category: "CAGR Rapid Approximation",
      prompt: "A telecom operator's enterprise revenue grew from ৳50 Crore to ৳90 Crore over 4 years. What is the approximate CAGR?",
      options: ["10.2%", "15.8%", "20.0%", "25.0%"],
      correct: 1,
      explanation: "Total growth = (90 - 50)/50 = +80%. Simple annual growth = 80%/4 = 20%. Because compounding accelerates growth, actual CAGR is lower than the simple average (~15.8%)."
    },
    {
      id: 4,
      category: "Market Sizing Fermi Baseline",
      prompt: "Assuming 175M population in Bangladesh with ~42M households and 60% rural distribution, what is the approximate number of rural households?",
      options: ["18.5 Million", "25.2 Million", "32.0 Million", "15.0 Million"],
      correct: 1,
      explanation: "42M total households * 60% rural = 25.2 Million rural households."
    }
  ];

  const handleDrillOption = (idx: number) => {
    if (drillSubmitted) return;
    setSelectedDrillAnswer(idx);
    setDrillSubmitted(true);
    if (idx === SPEED_DRILLS[activeDrillIdx].correct) {
      setDrillScore(prev => prev + 25);
    }
  };

  const handleNextDrill = () => {
    setSelectedDrillAnswer(null);
    setDrillSubmitted(false);
    setActiveDrillIdx((prev) => (prev + 1) % SPEED_DRILLS.length);
  };

  // ── TAB 2: MECE ISSUE TREE STATE ──────────────────────────────────────────
  const [selectedBranch, setSelectedBranch] = useState<"revenue" | "costs">("revenue");
  const [selectedSubBranch, setSelectedSubBranch] = useState<string>("price");
  const [inspectedFinding, setInspectedFinding] = useState<string | null>(null);

  // ── TAB 3: STAR INTERVIEW EVALUATOR STATE ──────────────────────────────────
  const [starPromptIdx, setStarPromptIdx] = useState(0);
  const [starInputs, setStarInputs] = useState({
    situation: "",
    task: "",
    action: "",
    result: ""
  });
  const [starEvaluated, setStarEvaluated] = useState(false);

  const STAR_PROMPTS = [
    {
      title: "Commercial Conflict with Senior Stakeholder",
      prompt: "Describe a situation where a regional director insisted on offering steep discounts to hit volume targets, and you had to intervene to protect gross margins.",
      coreCompetency: "Influence Without Authority & Financial Integrity"
    },
    {
      title: "Crisis Resolution Under Tight Deadline",
      prompt: "Tell me about a time a major supplier delayed packaging material 48 hours before a nationwide product launch.",
      coreCompetency: "Resilience, Operational Agility & Ownership"
    },
    {
      title: "Data-Driven Process Transformation",
      prompt: "Walk me through an initiative where you identified an operational bottleneck and automated the workflow to save man-hours.",
      coreCompetency: "Data-Backed Innovation & Systems Thinking"
    }
  ];

  const handleEvaluateStar = () => {
    setStarEvaluated(true);
  };

  return (
    <div className="rounded-xl border-2 border-corp-border bg-corp-surface shadow-[6px_6px_0px_0px_#059669] overflow-hidden">
      {/* ── STUDIO HEADER ─────────────────────────────────────────────────── */}
      <div className="p-4 md:p-6 border-b-2 border-corp-border bg-corp-bg-secondary flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_#047857]">
            <Award size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-extrabold font-mono uppercase text-corp-text">
                MTO Recruitment &amp; Case Mastery Studio
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/15 border border-emerald-400 text-emerald-400 font-mono">
                MNC Recruitment OS
              </span>
            </div>
            <p className="text-xs text-corp-text-tertiary font-mono mt-0.5">
              Cognitive Speed Drills · MECE Issue Tree Deconstructor · Behavioral STAR Evaluator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-corp-border bg-corp-surface text-corp-text flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" />
            Calibrated for Unilever · BAT · Marico · MNCs
          </span>
        </div>
      </div>

      {/* ── TOP NAV TABS ──────────────────────────────────────────────────── */}
      <div className="flex overflow-x-auto border-b-2 border-corp-border bg-corp-surface px-2 sm:px-4">
        {[
          { key: "speed_math", label: "1. Speed Math & Chart Forensics", icon: Calculator },
          { key: "issue_tree", label: "2. MECE Issue Tree Builder", icon: GitBranch },
          { key: "star_sim", label: "3. Behavioral STAR Mock Evaluator", icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-extrabold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                  : "border-transparent text-corp-text-secondary hover:text-corp-text hover:bg-corp-bg-secondary"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: SPEED MATH DRILL GYM ───────────────────────────────────── */}
      {activeTab === "speed_math" && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-corp-border pb-3">
            <div>
              <span className="text-[10px] font-extrabold font-mono uppercase text-emerald-400 block">
                Timed Cognitive Aptitude Simulator:
              </span>
              <p className="text-xs text-corp-text font-bold">
                Drill {activeDrillIdx + 1} of {SPEED_DRILLS.length} · {SPEED_DRILLS[activeDrillIdx].category}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-extrabold px-3 py-1 rounded bg-emerald-500/15 border border-emerald-500 text-emerald-400">
                Score: {drillScore} / 100 Pts
              </span>
              <button
                onClick={handleNextDrill}
                className="px-3 py-1 rounded text-xs font-mono font-bold bg-corp-surface border border-corp-border hover:border-emerald-400 text-corp-text transition-all"
              >
                Next Drill ➔
              </button>
            </div>
          </div>

          <div className="p-5 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-4 font-mono">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase">
              <Clock size={14} /> Recommended Pace: &lt; 45 seconds per problem
            </div>
            <p className="text-sm font-bold text-corp-text leading-relaxed">
              {SPEED_DRILLS[activeDrillIdx].prompt}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SPEED_DRILLS[activeDrillIdx].options.map((opt, oIdx) => {
                const isSelected = selectedDrillAnswer === oIdx;
                const isCorrect = oIdx === SPEED_DRILLS[activeDrillIdx].correct;
                let btnClass = "bg-corp-surface border-corp-border text-corp-text hover:border-emerald-400";
                if (drillSubmitted) {
                  if (isCorrect) {
                    btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-extrabold";
                  } else if (isSelected) {
                    btnClass = "bg-rose-500/20 border-rose-500 text-rose-300";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={drillSubmitted}
                    onClick={() => handleDrillOption(oIdx)}
                    className={`p-3.5 rounded-lg border-2 text-left text-xs font-bold transition-all flex items-center justify-between ${btnClass}`}
                  >
                    <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                    {drillSubmitted && isCorrect && <Check size={16} className="text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {drillSubmitted && (
              <div className="p-4 rounded-lg bg-[#0b101b] border border-slate-800 text-xs text-slate-300 space-y-1 mt-4">
                <span className="font-extrabold text-emerald-400 block uppercase">
                  ✔ Executive Solution Breakdown:
                </span>
                <p className="leading-relaxed">
                  {SPEED_DRILLS[activeDrillIdx].explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 2: MECE ISSUE TREE BUILDER ─────────────────────────────────── */}
      {activeTab === "issue_tree" && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="p-4 rounded-xl border border-corp-border bg-corp-bg-secondary space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-corp-border pb-2">
              <span className="font-extrabold uppercase text-emerald-400">
                Interactive Profitability Case Tree: Apex Consumer Goods (-60% Margin Collapse)
              </span>
              <span className="text-[10px] text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500 font-extrabold">
                MECE Status: 100% Validated
              </span>
            </div>
            <p className="text-corp-text text-[11px]">
              Click branches below to navigate the algebraic decomposition and isolate the operational root cause.
            </p>
          </div>

          {/* Interactive Tree Graph */}
          <div className="p-6 rounded-xl border-2 border-corp-border bg-corp-bg-secondary space-y-6 font-mono text-xs">
            {/* Level 1: Root */}
            <div className="flex justify-center">
              <div className="p-3 rounded-lg bg-corp-surface border-2 border-emerald-500 text-center shadow-md">
                <span className="text-[10px] text-corp-text-tertiary block">Root Crisis:</span>
                <span className="font-extrabold text-emerald-400 text-sm">Operating Profit (EBITDA) -60%</span>
              </div>
            </div>

            {/* Level 2: Revenue vs Costs */}
            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
              <button
                onClick={() => { setSelectedBranch("revenue"); setSelectedSubBranch("price"); }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedBranch === "revenue"
                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm"
                    : "bg-corp-surface border-corp-border text-corp-text hover:border-sky-400"
                }`}
              >
                <span className="text-[10px] block uppercase text-corp-text-tertiary">Branch 1:</span>
                <span className="font-extrabold">Revenue Driver (+18% Units)</span>
              </button>

              <button
                onClick={() => { setSelectedBranch("costs"); setSelectedSubBranch("cogs"); }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedBranch === "costs"
                    ? "bg-rose-500/20 border-rose-400 text-rose-300 shadow-sm"
                    : "bg-corp-surface border-corp-border text-corp-text hover:border-rose-400"
                }`}
              >
                <span className="text-[10px] block uppercase text-corp-text-tertiary">Branch 2:</span>
                <span className="font-extrabold">Cost Structure (Fixed vs Var)</span>
              </button>
            </div>

            {/* Level 3: Sub-Branches */}
            {selectedBranch === "revenue" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "volume", title: "Sales Volume (Units)", metric: "+18.0%", flag: "Healthy / Market Gain", status: "ok" },
                  { id: "price", title: "Net Realized Price", metric: "-33.0%", flag: "[CRITICAL] 25% Trade Discount Dilution", status: "leak" },
                  { id: "mix", title: "Product Mix Tilt", metric: "-5.0%", flag: "Cannibalized by Bulk Packs", status: "warn" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedSubBranch(item.id); setInspectedFinding(item.flag); }}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedSubBranch === item.id
                        ? "bg-sky-500/20 border-sky-400 text-sky-300"
                        : "bg-corp-surface border-corp-border text-corp-text hover:border-sky-400"
                    }`}
                  >
                    <span className="text-[10px] text-corp-text-tertiary uppercase block">{item.title}</span>
                    <span className="text-base font-extrabold block my-0.5">{item.metric}</span>
                    <span className="text-[10px] font-bold text-amber-400">{item.flag}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "cogs", title: "Raw Material COGS", metric: "+1.2%", flag: "Stable / Inline with inflation", status: "ok" },
                  { id: "freight", title: "Logistics Freight", metric: "+42.0%", flag: "[CRITICAL] Full Freight Absorption Leakage", status: "leak" },
                  { id: "overhead", title: "SG&A Overhead", metric: "Flat", flag: "No fixed overhead expansion", status: "ok" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedSubBranch(item.id); setInspectedFinding(item.flag); }}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedSubBranch === item.id
                        ? "bg-rose-500/20 border-rose-400 text-rose-300"
                        : "bg-corp-surface border-corp-border text-corp-text hover:border-rose-400"
                    }`}
                  >
                    <span className="text-[10px] text-corp-text-tertiary uppercase block">{item.title}</span>
                    <span className="text-base font-extrabold block my-0.5">{item.metric}</span>
                    <span className="text-[10px] font-bold text-amber-400">{item.flag}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Root Cause Synthesis Box */}
            <div className="p-4 rounded-lg bg-[#0b101b] border border-slate-800 text-slate-300 space-y-2">
              <span className="font-extrabold text-emerald-400 text-xs block uppercase flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Diagnostic Verdict for Panel Presentation:
              </span>
              <p className="text-xs leading-relaxed">
                The 60% profit collapse was driven by <strong>Net Price Erosion</strong> and <strong>Logistics Freight Absorption</strong>. Sales teams bought +18% unit growth by granting unauthorized 25% promotional discounts and absorbing 100% of inter-district freight surcharges to remote depots. 
              </p>
              <p className="text-[11px] text-emerald-400 font-bold">
                ✔ Recommended Boardroom Action: Cap promotional discounts at 10% and pass through freight surcharges via strict MOQ thresholds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: BEHAVIORAL STAR MOCK EVALUATOR ──────────────────────────── */}
      {activeTab === "star_sim" && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-corp-border pb-3">
            <div>
              <span className="text-[10px] font-extrabold font-mono uppercase text-emerald-400 block">
                Proctored Behavioral Mock Interview:
              </span>
              <p className="text-xs text-corp-text font-bold">
                Prompt {starPromptIdx + 1}: {STAR_PROMPTS[starPromptIdx].title}
              </p>
            </div>
            <div className="flex gap-1.5">
              {STAR_PROMPTS.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => { setStarPromptIdx(pIdx); setStarEvaluated(false); }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all ${
                    starPromptIdx === pIdx
                      ? "bg-emerald-600 text-white border-emerald-400"
                      : "bg-corp-surface text-corp-text border-corp-border"
                  }`}
                >
                  Prompt {pIdx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-corp-bg-secondary border-2 border-corp-border font-mono text-xs space-y-1">
            <span className="text-[10px] font-extrabold text-amber-400 uppercase">
              Target MNC Competency: {STAR_PROMPTS[starPromptIdx].coreCompetency}
            </span>
            <p className="text-corp-text font-bold text-xs sm:text-sm">
              &quot;{STAR_PROMPTS[starPromptIdx].prompt}&quot;
            </p>
          </div>

          {/* 4 STAR Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="font-extrabold text-corp-text flex justify-between">
                <span>[S] Situation (10% of time · 15s)</span>
                <span className="text-[10px] text-corp-text-tertiary">Context &amp; Scale</span>
              </label>
              <textarea
                rows={3}
                placeholder="Name the company, territory, commercial baseline, and specific crisis..."
                value={starInputs.situation}
                onChange={(e) => setStarInputs({ ...starInputs, situation: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-corp-surface border-2 border-corp-border text-corp-text focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-corp-text flex justify-between">
                <span>[T] Task (10% of time · 15s)</span>
                <span className="text-[10px] text-corp-text-tertiary">Your Exact Mandate</span>
              </label>
              <textarea
                rows={3}
                placeholder="What specific metric or deliverable were YOU personally accountable for?"
                value={starInputs.task}
                onChange={(e) => setStarInputs({ ...starInputs, task: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-corp-surface border-2 border-corp-border text-corp-text focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-extrabold text-corp-text flex justify-between">
                <span>[A] Action (60% of time · 60s) — THE CRITICAL CORE</span>
                <span className="text-[10px] text-emerald-400 font-extrabold">Focus on 'I', not 'We'</span>
              </label>
              <textarea
                rows={4}
                placeholder="Sequential steps you took: data modeling, stakeholder alignment, overcoming pushback..."
                value={starInputs.action}
                onChange={(e) => setStarInputs({ ...starInputs, action: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-corp-surface border-2 border-corp-border text-corp-text focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-extrabold text-corp-text flex justify-between">
                <span>[R] Result (20% of time · 20s)</span>
                <span className="text-[10px] text-corp-text-tertiary">Quantified Impact &amp; Learning</span>
              </label>
              <textarea
                rows={3}
                placeholder="Specific BDT profit restored, efficiency gained, zero customer churn, and retrospective reflection..."
                value={starInputs.result}
                onChange={(e) => setStarInputs({ ...starInputs, result: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-corp-surface border-2 border-corp-border text-corp-text focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleEvaluateStar}
              className="px-6 py-3 rounded-lg text-xs font-mono font-extrabold bg-emerald-600 text-white border-2 border-emerald-400 hover:bg-emerald-500 transition-all shadow-[3px_3px_0px_0px_#047857]"
            >
              Evaluate Response with MNC Scoring Anchors
            </button>
          </div>

          {starEvaluated && (
            <div className="p-5 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-extrabold uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> MNC Panel Assessor Feedback
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-extrabold">
                  Rating: Exceeds Standard (Top 5% Cohort)
                </span>
              </div>
              <p className="text-corp-text leading-relaxed text-[11px]">
                Strong calibration: Situation established clear commercial context without rambling. Action prioritized personal analytical initiative. Result tied directly to corporate EBITDA impact.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[10px]">
                <div className="p-2.5 rounded bg-corp-surface border border-corp-border">
                  <span className="text-corp-text-tertiary block">Time Discipline:</span>
                  <span className="font-extrabold text-emerald-400">✔ 110 Seconds (Optimal)</span>
                </div>
                <div className="p-2.5 rounded bg-corp-surface border border-corp-border">
                  <span className="text-corp-text-tertiary block">Agency Score:</span>
                  <span className="font-extrabold text-emerald-400">✔ High 'I' Orientation</span>
                </div>
                <div className="p-2.5 rounded bg-corp-surface border border-corp-border">
                  <span className="text-corp-text-tertiary block">Quantifiable Metric:</span>
                  <span className="font-extrabold text-emerald-400">✔ Commercial P&amp;L Grounded</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
