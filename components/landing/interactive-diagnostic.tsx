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

  // Calculate score & percentile
  const correctCount = DIAGNOSTIC_QUESTIONS.filter(
    q => selectedAnswers[q.id] !== undefined && q.options[selectedAnswers[q.id]].correct
  ).length;

  const scorePct = Math.round((correctCount / DIAGNOSTIC_QUESTIONS.length) * 100);
  const percentile = scorePct === 100 ? 94 : scorePct >= 66 ? 78 : scorePct >= 33 ? 48 : 22;

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto">
        {/* Step 1: Intro Hook */}
        {currentStep === 'intro' && (
          <div className="relative rounded-3xl p-8 md:p-12 border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3-Minute Psychometric Diagnostic (Free & Un-gated)</span>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
                Are You Ready for an FMCG or Corporate Analyst Role?
              </h2>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Take the 3-minute diagnostic test. Benchmark your commercial acumen, financial intuition, and spreadsheet modeling logic against successful candidates at Unilever, BAT, and top commercial banks.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 block">Questions</span>
                <span className="text-slate-200 font-bold text-sm">3 Scenarios</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 block">Time Needed</span>
                <span className="text-slate-200 font-bold text-sm">~180 Seconds</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 block">Output</span>
                <span className="text-emerald-400 font-bold text-sm">Instant Skill Radar</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setCurrentStep('quiz')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Start Free Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Live Quiz Flow */}
        {currentStep === 'quiz' && (
          <div className="relative rounded-3xl p-8 md:p-10 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-6">
            {/* Header / Progress */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  Question {questionIdx + 1} of {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-400">{activeQ.category}</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {Math.round(((questionIdx + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}% Complete
              </span>
            </div>

            {/* Question Body */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                <span className="text-slate-500 uppercase font-bold text-[10px] block mb-1">Corporate Scenario:</span>
                {activeQ.scenario}
              </div>

              <h3 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                {activeQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {activeQ.options.map((opt, i) => {
                  const isSelected = selectedAnswers[activeQ.id] === i;
                  let btnStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 text-slate-200';

                  if (showExplanation) {
                    if (opt.correct) {
                      btnStyle = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300';
                    } else if (isSelected && !opt.correct) {
                      btnStyle = 'border-rose-500/60 bg-rose-500/10 text-rose-300';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {opt.label}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Continue */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-slate-200 block mb-1">Rational Assessment:</span>
                    {activeQ.options[selectedAnswers[activeQ.id] ?? 0].explanation}
                  </div>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                  >
                    <span>{questionIdx < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Next Question' : 'View Full Skill Gap Analysis'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Instant Skill Radar & Gap Analysis */}
        {currentStep === 'results' && (
          <div className="relative rounded-3xl p-8 md:p-12 border border-slate-800 bg-gradient-to-b from-slate-900/95 to-slate-950/95 shadow-2xl space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Diagnostic Assessment Complete</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-100">
                Your Corporate Readiness Index
              </h3>
              <p className="text-xs text-slate-400">
                Benchmarked against 8,400+ candidate evaluations on the INSYT Trust Plane
              </p>
            </div>

            {/* Radar Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Score breakdown */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">Diagnostic Score</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{correctCount} / 3 Correct ({scorePct}%)</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>FMCG Commercial Acumen</span>
                      <span className="font-mono text-emerald-400">{selectedAnswers[1] === 1 ? 'Proficient' : 'Needs Practice'}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: selectedAnswers[1] === 1 ? '100%' : '30%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Dynamic Excel & Data Modeling</span>
                      <span className="font-mono text-emerald-400">{selectedAnswers[2] === 0 ? 'Proficient' : 'Needs Practice'}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: selectedAnswers[2] === 0 ? '100%' : '30%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Financial Valuation & Free Cash Flow</span>
                      <span className="font-mono text-emerald-400">{selectedAnswers[3] === 2 ? 'Proficient' : 'Needs Practice'}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: selectedAnswers[3] === 2 ? '100%' : '30%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Performance Percentile: Top {100 - percentile}%
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {scorePct === 100
                      ? 'Exceptional technical intuition. You are ready for proctored capstone evaluations.'
                      : 'You possess baseline concepts, but procedural modeling gaps exist that typically trigger rejections during technical screening tests.'}
                  </p>
                </div>
              </div>

              {/* Recommended Solution / Upsell */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/40 space-y-5 text-center flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-400 text-slate-950">
                    RECOMMENDED 5-DAY SPRINT
                  </span>
                  <h4 className="text-lg font-bold text-slate-100">
                    5-Day Corporate Excel & Job Test Sprint
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Close your diagnostic modeling gaps in 5 days (30 mins/day). Master XLOOKUP, dynamic arrays, and build an executive sales dashboard with zero hardcoding.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-slate-500 line-through text-xs font-mono">৳1,990</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">৳990</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">50% Diagnostic Discount</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Instant access via bKash / Nagad &bull; 100% Satisfaction Guarantee</span>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/signup"
                    className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <span>Claim Sprint Access (৳990)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retake Diagnostic</span>
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
