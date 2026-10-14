'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  category: string;
  scenario: string;
  question: string;
  options: { label: string; text: string; correct: boolean; explanation: string }[];
}

const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Commercial Acumen (FMCG & Sales)',
    scenario: 'Your brand offers a 20% trade discount to modern trade retailers. Your baseline unit production cost is ৳40, and the retail list price is ৳100.',
    question: 'If retailers demand an additional 5% promotional discount on invoice price for a weekend festival campaign, what is your new gross contribution margin per unit?',
    options: [
      { label: 'A', text: '৳35 per unit (35% margin)', correct: false, explanation: 'Invoice price was ৳80. A 5% discount on ৳80 leaves ৳76. With ৳40 cost, margin is ৳36, not ৳35.' },
      { label: 'B', text: '৳36 per unit (47.4% margin on invoice)', correct: true, explanation: 'Correct! ৳100 - 20% = ৳80 invoice. Additional 5% off ৳80 = ৳4 discount → ৳76 invoice price. Gross margin = ৳76 - ৳40 = ৳36.' },
      { label: 'C', text: '৳40 per unit (50% margin)', correct: false, explanation: 'Incorrect. This neglects the compounded trade discount and promotional markdown.' },
      { label: 'D', text: '৳31 per unit (41% margin)', correct: false, explanation: 'Incorrect. A 5% discount on ৳80 is ৳4, not ৳9.' },
    ],
  },
  {
    id: 2,
    category: 'Excel & Data Modeling Logic',
    scenario: 'You are auditing a multi-period financial model. A junior analyst hardcoded `=SUM(C4:C9)` in cell C10, but subsequent months insert new expense categories in row 10.',
    question: 'Which Excel function or structural practice is the institutional standard to prevent formula reference omissions when expanding rows dynamically?',
    options: [
      { label: 'A', text: 'Use native Excel Tables (ListObject) with structured references like =SUM(DeptTable[Expense])', correct: true, explanation: 'Correct! Structured Table references dynamically expand automatically without manual formula range adjustments.' },
      { label: 'B', text: 'Lock formulas with absolute references like =$C$4:$C$9', correct: false, explanation: 'Absolute references fix cell coordinates but do not automatically include newly inserted rows outside the bounded range.' },
      { label: 'C', text: 'Use =OFFSET(C4, 0, 0, 6, 1)', correct: false, explanation: 'OFFSET is volatile, recalculates on every keystroke, and slows down large corporate workbooks.' },
      { label: 'D', text: 'Merge cells from C4 to C9', correct: false, explanation: 'Merging cells destroys sorting, filtering, and VBA automation; it is strictly prohibited in financial modeling.' },
    ],
  },
  {
    id: 3,
    category: 'Corporate Finance & Valuation Intuition',
    scenario: 'Company A and Company B both have identical EBITDA of ৳100M. Company A requires annual maintenance CapEx of ৳40M, while Company B requires CapEx of ৳10M.',
    question: 'Under institutional M&A valuation, which company deserves a higher Enterprise Value / EBITDA multiple, and why?',
    options: [
      { label: 'A', text: 'Company A, because higher CapEx proves rapid asset expansion', correct: false, explanation: 'Maintenance CapEx is a cash drain required merely to sustain current operations, reducing free cash flow.' },
      { label: 'B', text: 'Both deserve the same multiple since EV/EBITDA is calculated before CapEx', correct: false, explanation: 'While EV/EBITDA is calculated before CapEx, investors pay higher multiples for businesses that convert a larger share of EBITDA into Free Cash Flow.' },
      { label: 'C', text: 'Company B, because it generates significantly higher Free Cash Flow to Firm (FCFF)', correct: true, explanation: 'Correct! Company B generates ৳90M pre-tax operating cash flow vs ৳60M for Company A, commanding a premium multiple.' },
      { label: 'D', text: 'Cannot be determined without knowing debt ratios', correct: false, explanation: 'Enterprise Value is capital structure neutral; operating cash conversion directly governs baseline multiple expansion.' },
    ],
  },
];

export function InteractiveDiagnostic() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const activeQ = DIAGNOSTIC_QUESTIONS[questionIdx];

  const handleSelectOption = (optIdx: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [activeQ.id]: optIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (questionIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
      setQuestionIdx(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setQuestionIdx(0);
    setShowExplanation(false);
    setCurrentStep('intro');
  };

  const correctCount = DIAGNOSTIC_QUESTIONS.filter(
    q => selectedAnswers[q.id] !== undefined && q.options[selectedAnswers[q.id]].correct
  ).length;

  const scorePct = Math.round((correctCount / DIAGNOSTIC_QUESTIONS.length) * 100);
  const percentile = scorePct === 100 ? 94 : scorePct >= 66 ? 78 : scorePct >= 33 ? 48 : 22;

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-[#F0F7FF] border-b-2 border-slate-900 font-mono">
      <div className="max-w-4xl mx-auto">
        
        {/* Step 1: Intro Hook */}
        {currentStep === 'intro' && (
          <div className="relative rounded-2xl p-6 sm:p-10 border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_#2563eb] text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#0f172a]">
              <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>INTERACTIVE RAPID DIAGNOSTIC (+150 XP)</span>
            </div>

            <div className="max-w-2xl mx-auto space-y-3 font-sans">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Are You Ready for an FMCG or Corporate Analyst Role?
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Take the 3-minute diagnostic test. Benchmark your commercial acumen, financial intuition, and spreadsheet modeling logic against successful candidates at Unilever, BAT, and top commercial banks.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] space-y-1">
                <span className="text-slate-500 uppercase font-black text-[10px] block">QUESTIONS</span>
                <span className="text-slate-950 font-black text-sm">3 Scenarios</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] space-y-1">
                <span className="text-slate-500 uppercase font-black text-[10px] block">TIME ESTIMATE</span>
                <span className="text-slate-950 font-black text-sm">~180 Seconds</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#059669] space-y-1">
                <span className="text-emerald-700 uppercase font-black text-[10px] block">REWARD</span>
                <span className="text-emerald-800 font-black text-sm">+150 XP &amp; Radar</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep('quiz')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black text-white bg-[#2563eb] hover:bg-[#1d4ed8] border-2 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
              >
                <span>START FREE DIAGNOSTIC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Live Quiz Flow */}
        {currentStep === 'quiz' && (
          <div className="relative rounded-2xl p-6 sm:p-8 border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_#2563eb] space-y-6">
            {/* Header / Progress */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
              <div className="flex items-center gap-2 text-xs font-black">
                <span className="px-2.5 py-1 rounded bg-amber-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                  QUESTION {questionIdx + 1} OF {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-700 uppercase tracking-wider">{activeQ.category}</span>
              </div>
              <span className="text-xs font-black text-[#2563eb]">
                {Math.round(((questionIdx + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}% COMPLETE
              </span>
            </div>

            {/* Question Body */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] text-xs text-slate-800 leading-relaxed font-sans">
                <span className="text-slate-500 uppercase font-black text-[10px] block font-mono mb-1">// CORPORATE SCENARIO:</span>
                {activeQ.scenario}
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug font-sans">
                {activeQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {activeQ.options.map((opt, i) => {
                  const isSelected = selectedAnswers[activeQ.id] === i;
                  let btnStyle = 'border-slate-900 bg-white text-slate-900 hover:bg-blue-50 shadow-[3px_3px_0px_0px_#0f172a]';

                  if (showExplanation) {
                    if (opt.correct) {
                      btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-[3px_3px_0px_0px_#059669]';
                    } else if (isSelected && !opt.correct) {
                      btnStyle = 'border-rose-600 bg-rose-50 text-rose-950 shadow-[3px_3px_0px_0px_#e11d48]';
                    }
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectOption(i)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-xl border-2 text-left text-xs font-bold transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded border-2 border-current flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">
                        {opt.label}
                      </span>
                      <span className="flex-1 leading-relaxed font-sans">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Continue */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-slate-950 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] space-y-3"
                >
                  <div className="text-xs text-slate-200 font-sans">
                    <span className="font-mono font-black text-amber-400 block mb-1 uppercase tracking-wider">// RATIONAL ANALYSIS:</span>
                    {activeQ.options[selectedAnswers[activeQ.id] ?? 0].explanation}
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#059669] transition-all"
                  >
                    <span>{questionIdx < DIAGNOSTIC_QUESTIONS.length - 1 ? 'NEXT QUESTION →' : 'VIEW SKILL RADAR RESULTS →'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Instant Skill Radar & Gap Analysis */}
        {currentStep === 'results' && (
          <div className="relative rounded-2xl p-6 sm:p-10 border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_#059669] space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-black bg-emerald-100 text-emerald-800 border-2 border-emerald-600 shadow-[2px_2px_0px_0px_#059669]">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>DIAGNOSTIC CALIBRATION COMPLETE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans">
                Your Institutional Readiness Index: {percentile}/100
              </h3>
              <p className="text-xs text-slate-600">
                Benchmarked against 8,400+ candidate evaluations on the INSYT Trust Plane
              </p>
            </div>

            {/* Radar Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Score breakdown */}
              <div className="p-5 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] space-y-3">
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                  <span className="text-xs font-bold text-slate-600">CORRECT SCENARIOS</span>
                  <span className="text-lg font-black text-[#2563eb]">{correctCount} / 3 ({scorePct}%)</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-700 mb-1 font-bold">
                      <span>Commercial Margin Math</span>
                      <span className="text-emerald-700">{selectedAnswers[1] === 1 ? '100% · Pro' : '40% · Needs Work'}</span>
                    </div>
                    <div className="h-2 rounded-full border border-slate-900 bg-slate-200 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: selectedAnswers[1] === 1 ? '100%' : '40%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-1 font-bold">
                      <span>Excel Structure &amp; Table Ranges</span>
                      <span className="text-blue-700">{selectedAnswers[2] === 0 ? '100% · Pro' : '30% · Needs Work'}</span>
                    </div>
                    <div className="h-2 rounded-full border border-slate-900 bg-slate-200 overflow-hidden">
                      <div className="h-full bg-[#2563eb]" style={{ width: selectedAnswers[2] === 0 ? '100%' : '30%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-1 font-bold">
                      <span>FCFF &amp; M&amp;A Valuation Logic</span>
                      <span className="text-purple-700">{selectedAnswers[3] === 2 ? '100% · Pro' : '35% · Needs Work'}</span>
                    </div>
                    <div className="h-2 rounded-full border border-slate-900 bg-slate-200 overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: selectedAnswers[3] === 2 ? '100%' : '35%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action recommendation */}
              <div className="p-5 rounded-xl border-2 border-slate-900 bg-amber-50 shadow-[4px_4px_0px_0px_#d97706] space-y-3 font-sans">
                <span className="text-[10px] font-mono font-black uppercase text-amber-800 tracking-wider block">
                  RECOMMENDED CAREER SPRINT
                </span>
                <h4 className="text-base font-black text-slate-950">
                  Corporate Financial &amp; Commercial Modeling (Excel)
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Master 3-statement models, PVM variance bridges, and dynamic dashboard architecture to bridge your identified skill gaps.
                </p>
                <div className="pt-1 flex items-center gap-3">
                  <Link
                    href="/learn/corporate-analyst/corporate-financial-commercial-modeling-excel"
                    className="flex-1 py-2.5 px-4 text-center rounded-lg border-2 border-slate-900 bg-[#2563eb] text-white font-mono font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    START THIS TRACK
                  </Link>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="p-2.5 rounded-lg border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a]"
                    title="Retake Diagnostic"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
