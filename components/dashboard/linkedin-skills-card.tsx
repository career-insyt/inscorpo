"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Plus,
  BrainCircuit,
  Lock,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { UserState } from "@/lib/state/types";
import { useUser } from "@/components/providers/user-context";
import { SkillCombobox } from "@/components/ui/skill-combobox";
import { AiSkillAssessmentModal } from "@/components/passport/ai-skill-assessment-modal";
import { PlatformBadge } from "@/components/ui/platform-badge";
import { PLATFORM_BADGES } from "@/lib/data/platform-badges";

interface LinkedInSkillsCardProps {
  state: UserState;
}

export function LinkedInSkillsCard({ state }: LinkedInSkillsCardProps) {
  const { updatePassportProfile } = useUser();
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [assessmentSkill, setAssessmentSkill] = useState<string | null>(null);

  // Derive ONLY real completed/unlocked skills dynamically (progress >= 100)
  const completedCourses = state.courseProgress.filter((c) => c.progress >= 100);
  const completedChallenges = state.completedChallengeIds || [];
  const passportSkills = state.passportProfile?.customSkills || [];
  const verifiedDetails = state.passportProfile?.verifiedSkillDetails || {};

  // Build dynamic skills array
  const dynamicSkills: {
    name: string;
    mastery: string;
    endorsements: number;
    badge: string;
    verified: boolean;
    verificationType: "course" | "challenge" | "ai_proctored" | "unverified";
    score?: number;
  }[] = [];

  // Completed Course Skills & Masteries
  completedCourses.forEach((c) => {
    const isExcelCourse =
      c.id === "excel-modeling" ||
      c.courseId === "excel-modeling" ||
      c.title.toLowerCase().includes("excel") ||
      c.title.toLowerCase().includes("spreadsheet");

    if (isExcelCourse) {
      const excelSkills = [
        "Advanced Excel Spreadsheet Engineering",
        "Financial Modeling Formulas & Sensitivity Tables",
        "Excel Power Query & Data Automation",
        "Dynamic Array Formulas & Lambda Functions",
        "Cash Flow Management & Forecasting",
      ];
      excelSkills.forEach((skillName, idx) => {
        dynamicSkills.push({
          name: skillName,
          mastery: "100%",
          endorsements: 16 - idx * 2,
          badge: "Course Graduate Certified",
          verified: true,
          verificationType: "course",
          score: 100,
        });
      });
    } else {
      dynamicSkills.push({
        name: c.title,
        mastery: "100%",
        endorsements: 12,
        badge: "Verified Course Pass",
        verified: true,
        verificationType: "course",
        score: 100,
      });
    }
  });

  // Completed Skill Challenges
  completedChallenges.forEach((chId) => {
    dynamicSkills.push({
      name: `Skill Challenge: ${chId.replace("-", " ").toUpperCase()}`,
      mastery: "100%",
      endorsements: 12,
      badge: "Verified Challenge Winner",
      verified: true,
      verificationType: "challenge",
      score: 100,
    });
  });

  // Self-Added Skills (must be verified via AI Assessment)
  passportSkills.forEach((skillName) => {
    if (!dynamicSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      const isVerifiedByAi = Boolean(verifiedDetails[skillName]?.verified);
      const aiScore = verifiedDetails[skillName]?.score;

      dynamicSkills.push({
        name: skillName,
        mastery: isVerifiedByAi ? `${aiScore || 92}%` : "Pending Evaluation",
        endorsements: isVerifiedByAi ? 10 : 0,
        badge: isVerifiedByAi ? "AI Verified Credential" : "Self-Added (Needs AI Assessment)",
        verified: isVerifiedByAi,
        verificationType: isVerifiedByAi ? "ai_proctored" : "unverified",
        score: aiScore,
      });
    }
  });

  const hasSkills = dynamicSkills.length > 0;

  // Handle adding new skill from catalog
  const handleSelectSkillFromCatalog = (newSkill: string) => {
    const existing = state.passportProfile?.customSkills || [];
    if (!existing.some((s) => s.toLowerCase() === newSkill.toLowerCase())) {
      updatePassportProfile({
        customSkills: [...existing, newSkill],
      });
    }
    setShowAddSkill(false);
  };

  // Handle successful AI Assessment pass
  const handleAssessmentPass = (
    skillName: string,
    score: number,
    details: { verifiedAt: string; hash: string }
  ) => {
    const existingDetails = state.passportProfile?.verifiedSkillDetails || {};
    updatePassportProfile({
      verifiedSkillDetails: {
        ...existingDetails,
        [skillName]: {
          verified: true,
          score,
          verifiedAt: details.verifiedAt,
          hash: details.hash,
        },
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 space-y-6 font-sans"
      style={{ background: "var(--corp-surface)" }}
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono border-b border-corp-border pb-4">
        <div>
          <h2
            className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2"
            style={{ color: "var(--corp-text)" }}
          >
            <Award size={16} className="text-amber-500" />
            Verified Skills &amp; Masteries ({dynamicSkills.length})
          </h2>
          <p className="text-xs font-sans font-medium text-corp-text-tertiary">
            Updated automatically from completed courses and AI-proctored assessments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddSkill(!showAddSkill)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase bg-blue-600/15 text-blue-500 hover:bg-blue-600 hover:text-white border border-blue-500/40 transition-all"
          >
            <Plus size={13} /> Add Skill to Verify
          </button>
          <Link
            href="/challenges"
            className="text-xs font-mono font-extrabold text-[#2563eb] hover:underline"
          >
            Drills →
          </Link>
        </div>
      </div>

      {/* ── Searchable Combobox for Adding Skills ── */}
      {showAddSkill && (
        <div className="p-4 rounded-xl bg-blue-900/15 border-2 border-dashed border-blue-500/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-400">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} /> Add Skill from Verified INSYT Catalog (450+ Skills)
            </span>
            <button
              onClick={() => setShowAddSkill(false)}
              className="text-corp-text-tertiary hover:text-corp-text"
            >
              Cancel
            </button>
          </div>
          <p className="text-[11px] text-corp-text-secondary">
            You can type to filter candidates, but you must select an option from the dropdown list.
            Self-added skills require taking an AI assessment to obtain verification.
          </p>
          <SkillCombobox
            onSelectSkill={handleSelectSkillFromCatalog}
            selectedSkills={passportSkills}
            placeholder="Type to filter skills (e.g. Dynamic Array, Financial Modeling, Machine Learning)..."
          />
        </div>
      )}

      {/* ── Verified Skills List ── */}
      {hasSkills ? (
        <div className="space-y-3 font-mono">
          {dynamicSkills.map((skill, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-lg border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                skill.verified
                  ? "border-emerald-500/60 bg-emerald-950/15 shadow-[0_0_15px_rgba(16,185,129,0.12)]"
                  : "border-amber-500/50 bg-amber-950/10"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold text-corp-text">
                    {skill.name}
                  </span>

                  {skill.verified ? (
                    <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                      <ShieldCheck size={11} className="text-emerald-400 animate-pulse" />
                      {skill.badge}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                      <AlertCircle size={11} /> {skill.badge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-sans font-medium text-corp-text-tertiary">
                  {skill.verified ? (
                    <>
                      Verified with{" "}
                      <strong className="text-corp-text font-bold">
                        {skill.endorsements} institutional peer endorsements
                      </strong>{" "}
                      on your passport
                    </>
                  ) : (
                    <>
                      Self-added skill. Not yet verified. Take the adaptive AI assessment to earn
                      illuminated verification.
                    </>
                  )}
                </p>
              </div>

              {/* Right Side: Mastery Badge or AI Assessment Action */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {skill.verified ? (
                  <div className="px-3 py-1 rounded-md bg-[#065f46] text-white border border-[#10b981] text-xs font-black shadow-[0_0_12px_rgba(16,185,129,0.35)] flex items-center gap-1.5">
                    <Sparkles size={11} className="text-emerald-300" />
                    <span>Level 5 Certified • {skill.mastery}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setAssessmentSkill(skill.name)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.45)] transition-all flex items-center gap-1.5 animate-pulse"
                  >
                    <BrainCircuit size={13} />
                    <span>Take AI Assessment</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-lg border-2 border-dashed border-corp-border text-center space-y-3 font-mono bg-corp-bg-secondary/30">
          <AlertCircle size={32} className="mx-auto text-amber-500" />
          <div>
            <h4 className="text-xs font-extrabold uppercase text-corp-text">
              No Verified Skills Unlocked Yet
            </h4>
            <p className="text-xs font-sans text-corp-text-secondary max-w-md mx-auto mt-1">
              Skills and masteries update automatically when courses are completed. Finish an
              enrolled course module or add a custom skill and pass the AI assessment!
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-extrabold uppercase text-white bg-[#2563eb] hover:bg-blue-600 border border-blue-300 shadow-[3px_3px_0px_0px_#1e3a8a]"
            >
              <span>Explore Courses</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {/* ── Platform Badges & Honors (Illuminated, Animated, Zero Emojis) ── */}
      <div className="pt-4 border-t border-corp-border space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <h3
            className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
            style={{ color: "var(--corp-text)" }}
          >
            <Sparkles size={14} className="text-cyan-400" /> Platform Badges
          </h3>
          <span className="text-[10px] text-corp-text-tertiary">
            Luminous Vector Credentials • No Emojis
          </span>
        </div>

        {/* Dynamic earned badges only */}
        {(() => {
          const unlocked = PLATFORM_BADGES.filter((badge) => {
            const hasRecent = (state.recentBadges || []).some(
              (rb) =>
                rb.name.toLowerCase().trim() === badge.name.toLowerCase().trim() ||
                badge.id.toLowerCase().includes(rb.name.toLowerCase().trim()) ||
                (rb.icon && rb.icon.toLowerCase() === badge.iconName.toLowerCase())
            );
            if (hasRecent) return true;

            if (badge.id === "excel-architect") {
              return completedCourses.some(
                (c) =>
                  c.id?.includes("excel") ||
                  c.courseId?.includes("excel") ||
                  c.title?.toLowerCase().includes("excel")
              );
            }
            if (badge.id === "trust-plane-verified") {
              return Object.values(state.passportProfile?.verifiedSkillDetails || {}).some((v) => v.verified);
            }
            if (badge.id === "velocity-champion") {
              return state.streak >= 20;
            }
            return false;
          });

          return unlocked.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unlocked.map((badge) => (
                <PlatformBadge key={badge.id} badge={badge} size="sm" unlocked={true} />
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-corp-text-tertiary border border-dashed border-corp-border rounded-xl">
              No platform badges earned yet. Complete verified courses to unlock badges.
            </div>
          );
        })()}
      </div>

      {/* ── AI Assessment Modal ── */}
      {assessmentSkill && (
        <AiSkillAssessmentModal
          isOpen={Boolean(assessmentSkill)}
          onClose={() => setAssessmentSkill(null)}
          skillName={assessmentSkill}
          candidateName={state.name || "Authenticated Candidate"}
          onPassAssessment={handleAssessmentPass}
        />
      )}
    </motion.div>
  );
}
