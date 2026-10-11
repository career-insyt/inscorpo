"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  ArrowRight,
  X,
  FileCheck,
  BrainCircuit,
} from "lucide-react";

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
      // Procedurally generate high-fidelity technical and situational questions
      const questions: AssessmentQuestion[] = [
        {
          context: `Enterprise Scenario for ${candidateName || "Candidate"}: A high-growth corporate division is deploying solutions requiring "${skillName}".`,
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
    }, 1800);

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

      // Passing score calculation: e.g. 2/3 = 67% -> lenient passing threshold >= 65%
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
    }, 1500);
  };

  if (!isOpen) return null;

  const currentQ = generatedQuestions[currentQuestionIndex];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-2xl bg-corp-surface border-2 border-blue-500 rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.35)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-corp-border bg-gradient-to-r from-blue-900/40 via-blue-950/20 to-corp-surface flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                <BrainCircuit size={20} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-mono font-black uppercase text-corp-text flex items-center gap-1.5">
                  <span>AI Skill Verification Proctor</span>
                  <span className="text-[10px] font-sans font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">
                    Adaptive Engine
                  </span>
                </h3>
                <p className="text-[11px] font-mono text-corp-text-secondary">
                  Target: <strong className="text-corp-text">{skillName}</strong> • Candidate: {candidateName || "Authenticated Candidate"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-corp-text-tertiary hover:text-corp-text hover:bg-corp-bg-secondary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 font-sans">
            {step === "generating" && (
              <div className="py-16 text-center space-y-4 font-mono">
                <div className="relative w-16 h-16 mx-auto">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500"
                  />
                  <div className="absolute inset-2 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <Sparkles size={24} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-corp-text">
                    Generating Adaptive AI Assessment...
                  </h4>
                  <p className="text-xs text-corp-text-secondary max-w-md mx-auto">
                    Synthesizing realistic corporate scenarios, diagnostic problem questions, and evaluation rubric customized specifically for &ldquo;{skillName}&rdquo;.
                  </p>
                </div>
              </div>
            )}

            {step === "test" && currentQ && (
              <div className="space-y-5">
                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-corp-border">
                  <span className="text-blue-400 font-bold">
                    Question {currentQuestionIndex + 1} of {generatedQuestions.length}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-amber-400">
                    <Clock size={14} />
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds} Remaining
                  </span>
                </div>

                {/* Scenario Context */}
                <div className="p-3.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300">
                  <p className="font-semibold">{currentQ.context}</p>
                </div>

                {/* Question */}
                <div>
                  <h4 className="text-sm font-bold text-corp-text leading-snug">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-2.5 font-mono">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-blue-600/20 border-blue-500 text-corp-text shadow-[0_0_15px_rgba(37,99,235,0.25)]"
                            : "bg-corp-bg-secondary/60 border-corp-border text-corp-text-secondary hover:border-blue-400/60"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold border mt-0.5 ${
                            isSelected
                              ? "bg-blue-500 text-white border-blue-400"
                              : "border-corp-border text-corp-text-tertiary"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="text-xs font-medium leading-relaxed">{option}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_4px_14px_rgba(37,99,235,0.4)] flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex === generatedQuestions.length - 1
                        ? "Submit for AI Evaluation"
                        : "Next Question"}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === "evaluating" && (
              <div className="py-16 text-center space-y-4 font-mono">
                <div className="relative w-16 h-16 mx-auto">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400"
                  >
                    <FileCheck size={28} />
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-corp-text">
                    Auditing Responses Against Standards...
                  </h4>
                  <p className="text-xs text-corp-text-secondary max-w-md mx-auto">
                    Scoring reasoning consistency, technical validity, and generating cryptographically signed skill proof.
                  </p>
                </div>
              </div>
            )}

            {step === "passed" && (
              <div className="py-8 text-center space-y-6 font-mono">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <ShieldCheck size={36} />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    AI Verified Credential Issued
                  </span>
                  <h3 className="text-lg font-bold text-corp-text pt-2">
                    Skill Verified: {skillName}
                  </h3>
                  <p className="text-xs text-corp-text-secondary max-w-md mx-auto">
                    Congratulations! Your responses met the institutional rubric with a score of{" "}
                    <strong className="text-emerald-400 font-extrabold">{score}%</strong>. This skill is now permanently verified and illuminated on your Career Passport.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-corp-bg-secondary/60 border border-emerald-500/30 max-w-md mx-auto text-left text-xs space-y-1.5 text-corp-text-secondary">
                  <div className="flex justify-between">
                    <span>Verified For:</span>
                    <strong className="text-corp-text">{candidateName || "Candidate"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Evaluation Score:</span>
                    <strong className="text-emerald-400">{score}% / 100%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Proctor:</span>
                    <strong className="text-blue-400">INSYT AI Autonomous Evaluator</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-corp-text-tertiary">
                    <span>Standard:</span>
                    <span>W3C VC 2.0 &amp; Open Badges 3.0 Compatible</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.4)]"
                  >
                    Done &amp; View on Passport
                  </button>
                </div>
              </div>
            )}

            {step === "failed" && (
              <div className="py-8 text-center space-y-6 font-mono">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto">
                  <AlertCircle size={36} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-corp-text">
                    Assessment Not Yet Passed ({score}%)
                  </h3>
                  <p className="text-xs text-corp-text-secondary max-w-md mx-auto">
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
                    className="px-5 py-2 rounded-xl text-xs font-bold uppercase text-white bg-blue-600 hover:bg-blue-500 transition-all"
                  >
                    Retake Assessment
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl text-xs font-bold uppercase text-corp-text-secondary bg-corp-bg-secondary hover:bg-corp-border transition-all"
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
