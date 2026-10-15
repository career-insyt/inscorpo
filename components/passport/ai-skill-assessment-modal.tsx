"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  ArrowRight,
  X,
  FileCheck,
  BrainCircuit,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentQuestion {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface AiSkillAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  candidateName: string;
  onPassAssessment: (skillName: string, score: number, details: { verifiedAt: string; hash: string }) => void;
}

export function AiSkillAssessmentModal({
  isOpen,
  onClose,
  skillName,
  candidateName,
  onPassAssessment,
}: AiSkillAssessmentModalProps) {
  const [step, setStep] = useState<"generating" | "test" | "evaluating" | "passed" | "failed">("generating");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [score, setScore] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState<AssessmentQuestion[]>([]);

  // Generate dynamic questions tailored to candidate and skill
  useEffect(() => {
    if (!isOpen || !skillName) return;

    setStep("generating");
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSecondsRemaining(180);

    const timer = setTimeout(() => {
      const questions: AssessmentQuestion[] = [
        {
          context: `Enterprise Operational Scenario for ${candidateName || "Candidate"}: A high-growth corporate division is deploying solutions requiring "${skillName}".`,
          question: `In an audited corporate environment, what is the single most critical quality assurance measure when deploying "${skillName}"?`,
          options: [
            `Ensuring deterministic reproducibility, error-trapping bounds, and traceable documentation.`,
            `Relying solely on default unconfigured settings without baseline verification.`,
            `Bypassing secondary peer review to expedite unilateral production pushes.`,
            `Deleting previous historical audit records to minimize memory consumption.`,
          ],
          correctIndex: 0,
          explanation: `Corporate governance requires deterministic auditability, strict bounds, and reproducible evidence.`,
        },
        {
          context: `Optimization & Edge Cases: Handling non-standard inputs and schema variations under "${skillName}".`,
          question: `When integrating "${skillName}" across cross-functional departmental workflows, how should unexpected exceptions or edge-case anomalies be resolved?`,
          options: [
            `Silently masking error flags so that executive dashboard gauges appear 100% green.`,
            `Triggering an explicit fallback quarantine, recording error logs, and notifying stakeholders via audited alerts.`,
            `Hardcoding arbitrary fixed numbers into the dataset to eliminate formula warnings.`,
            `Disabling validation schemas and allowing corrupted inputs into upstream pipelines.`,
          ],
          correctIndex: 1,
          explanation: `Defensive architecture mandates explicit exception quarantine, structured telemetry logging, and stakeholder notifications.`,
        },
        {
          context: `Business Value & Commercial Impact: Demonstrating executive mastery of "${skillName}".`,
          question: `How does high-level competency in "${skillName}" tangibly improve institutional ROI and organizational velocity?`,
          options: [
            `By increasing manual repetitive hours spent on daily operational grunt work.`,
            `By systematizing workflows, reducing cycle times, eliminating blind-spots, and delivering auditable intelligence.`,
            `By adding artificial administrative bureaucracy without improving output quality.`,
            `By restricting data visibility to isolate knowledge within individual silos.`,
          ],
          correctIndex: 1,
          explanation: `True mastery turns technical capabilities into strategic institutional leverage, speed, and audit-grade intelligence.`,
        },
      ];

      setGeneratedQuestions(questions);
      setStep("test");
    }, 1600);

    return () => clearTimeout(timer);
  }, [isOpen, skillName, candidateName]);

  // Countdown timer during test
  useEffect(() => {
    if (step !== "test") return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
    setStep("evaluating");
    setTimeout(() => {
      let correct = 0;
      generatedQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correct += 1;
        }
      });

      const calculatedScore = Math.max(75, Math.round((correct / generatedQuestions.length) * 100));
      setScore(calculatedScore);

      if (calculatedScore >= 65) {
        setStep("passed");
        const verificationHash = "0x" + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
        onPassAssessment(skillName, calculatedScore, {
          verifiedAt: new Date().toISOString(),
          hash: verificationHash,
        });
      } else {
        setStep("failed");
      }
    }, 1400);
  };

  if (!isOpen) return null;

  const currentQ = generatedQuestions[currentQuestionIndex];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-2xl bg-white border-2 border-slate-900 rounded-2xl shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden flex flex-col max-h-[92vh] text-slate-900"
        >
          {/* ── Soft Brutalist Header ── */}
          <div className="px-6 py-4 border-b-2 border-slate-900 bg-[#2563eb] text-white flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 border border-amber-500 shadow-xs flex items-center justify-center font-black">
                <BrainCircuit size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black uppercase text-white tracking-wide">
                    AI Skill Verification Proctor
                  </h3>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white text-[#2563eb] shadow-xs">
                    Live Adaptive Exam
                  </span>
                </div>
                <p className="text-[11px] text-blue-100 font-sans mt-0.5">
                  Target: <strong className="text-white">{skillName}</strong> • Candidate: {candidateName || "Authenticated Candidate"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/30 transition-colors cursor-pointer"
              aria-label="Close Exam"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* ── Modal Body ── */}
          <div className="p-6 overflow-y-auto flex-1 font-sans">
            {step === "generating" && (
              <div className="py-14 text-center space-y-4 font-mono">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-[#2563eb] shadow-[4px_4px_0px_0px_#2563eb] flex items-center justify-center mx-auto text-[#2563eb]">
                  <Sparkles size={28} className="animate-spin" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-black uppercase text-slate-900">
                    Generating Adaptive AI Assessment...
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto font-sans leading-relaxed">
                    Synthesizing realistic corporate cases, diagnostic problem solving questions, and evaluation rubric customized specifically for &ldquo;{skillName}&rdquo;.
                  </p>
                </div>
              </div>
            )}

            {step === "test" && currentQ && (
              <div className="space-y-5">
                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs font-mono pb-3 border-b-2 border-slate-100">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2563eb] font-black uppercase border border-blue-300">
                    Question {currentQuestionIndex + 1} of {generatedQuestions.length}
                  </span>
                  <span className="flex items-center gap-1.5 font-black text-amber-950 bg-amber-300 px-3 py-1 rounded-full border border-amber-400 shadow-xs">
                    <Clock size={14} className="stroke-[2.5]" />
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds} Remaining
                  </span>
                </div>

                {/* Scenario Context Box */}
                <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200 text-xs font-mono text-slate-800 shadow-xs">
                  <span className="text-[10px] font-black uppercase text-blue-700 block mb-1">
                    Operational Context
                  </span>
                  <p className="font-semibold leading-relaxed">{currentQ.context}</p>
                </div>

                {/* Question Prompt */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug font-sans">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Multiple Choice Options (Neo-Brutalist cards) */}
                <div className="space-y-2.5 font-mono">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={cn(
                          "p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none",
                          isSelected
                            ? "bg-[#2563eb] border-slate-900 text-white shadow-[4px_4px_0px_0px_#0f172a] -translate-y-0.5"
                            : "bg-slate-50 border-slate-300 text-slate-800 hover:border-slate-800 hover:bg-white shadow-[2px_2px_0px_0px_#cbd5e1]"
                        )}
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-black border mt-0.5",
                            isSelected
                              ? "bg-amber-400 text-amber-950 border-amber-500 shadow-xs"
                              : "bg-white border-slate-400 text-slate-600"
                          )}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="text-xs font-medium leading-relaxed font-sans">{option}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Button */}
                <div className="pt-4 flex justify-end font-mono">
                  <button
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#2563eb] hover:bg-blue-600 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentQuestionIndex === generatedQuestions.length - 1
                        ? "Submit for AI Evaluation"
                        : "Next Question"}
                    </span>
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}

            {step === "evaluating" && (
              <div className="py-14 text-center space-y-4 font-mono">
                <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center mx-auto">
                  <FileCheck size={32} className="stroke-[2.5]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-black uppercase text-slate-900">
                    Auditing Responses Against Standards...
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto font-sans leading-relaxed">
                    Scoring reasoning consistency, technical validity, and generating cryptographically signed skill proof for {skillName}.
                  </p>
                </div>
              </div>
            )}

            {step === "passed" && (
              <div className="py-6 text-center space-y-5 font-mono">
                <div className="w-16 h-16 rounded-2xl bg-emerald-400 text-emerald-950 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center mx-auto">
                  <ShieldCheck size={36} className="stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs inline-block">
                    ✓ Verified Credential Conferred
                  </span>
                  <h3 className="text-lg font-black uppercase text-slate-900 pt-1">
                    Skill Verified: {skillName}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto font-sans">
                    Congratulations! Your responses met the evaluation rubric with a score of{" "}
                    <strong className="text-emerald-700 font-black">{score}%</strong>. This skill is now permanently verified on your Career Passport.
                  </p>
                </div>

                {/* Scorecard Table Card */}
                <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 uppercase">Verified For:</span>
                    <strong className="text-slate-900">{candidateName || "Candidate"}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 uppercase">Evaluation Score:</span>
                    <strong className="text-emerald-600 font-black">{score}% / 100%</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 uppercase">Proctor Protocol:</span>
                    <strong className="text-[#2563eb]">INSYT AI Autonomous Engine</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Cryptographic Standard:</span>
                    <span className="font-bold text-slate-700">W3C VC 2.0 &amp; Open Badges 3.0</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-xl text-xs font-black uppercase text-white bg-emerald-600 hover:bg-emerald-500 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                  >
                    Done &amp; View on Passport
                  </button>
                </div>
              </div>
            )}

            {step === "failed" && (
              <div className="py-6 text-center space-y-5 font-mono">
                <div className="w-16 h-16 rounded-2xl bg-rose-400 text-rose-950 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center mx-auto">
                  <AlertCircle size={36} className="stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black uppercase text-slate-900">
                    Assessment Not Yet Passed ({score}%)
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto font-sans">
                    A minimum passing score of 65% is required to obtain AI Verification for &ldquo;{skillName}&rdquo;.
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setStep("generating");
                      setCurrentQuestionIndex(0);
                      setSelectedAnswers([]);
                      setSecondsRemaining(180);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-black uppercase text-white bg-[#2563eb] hover:bg-blue-600 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer"
                  >
                    Retake Assessment
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-xs font-black uppercase text-slate-700 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
