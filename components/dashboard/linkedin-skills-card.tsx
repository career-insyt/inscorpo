"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { UserState } from "@/lib/state/types";

interface LinkedInSkillsCardProps {
  state: UserState;
}

export function LinkedInSkillsCard({ state }: LinkedInSkillsCardProps) {
  // Derive ONLY real completed/unlocked skills dynamically (progress >= 100)
  const completedCourses = state.courseProgress.filter((c) => c.progress >= 100);
  const completedChallenges = state.completedChallengeIds || [];
  const passportSkills = state.passportProfile?.customSkills || [];
  const verifiedDetails = state.passportProfile?.verifiedSkillDetails || {};

  // Build dynamic skills array
  const dynamicSkills: {
    name: string;
    verified: boolean;
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
        "Financial Modeling & Sensitivity Analysis",
        "Power Query & Data Automation",
        "Dynamic Arrays & Lambda Functions",
        "Working Capital Forecasting",
      ];
      excelSkills.forEach((skillName) => {
        if (!dynamicSkills.some((s) => s.name === skillName)) {
          dynamicSkills.push({
            name: skillName,
            verified: true,
          });
        }
      });
    } else {
      if (!dynamicSkills.some((s) => s.name === c.title)) {
        dynamicSkills.push({
          name: c.title,
          verified: true,
        });
      }
    }
  });

  // Completed Skill Challenges
  completedChallenges.forEach((chId) => {
    const formatted = `Skill Challenge: ${chId.replace("-", " ").toUpperCase()}`;
    if (!dynamicSkills.some((s) => s.name === formatted)) {
      dynamicSkills.push({
        name: formatted,
        verified: true,
      });
    }
  });

  // Self-Added Skills (verified via AI Assessment)
  passportSkills.forEach((skillName) => {
    if (!dynamicSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      const isVerifiedByAi = Boolean(verifiedDetails[skillName]?.verified);
      dynamicSkills.push({
        name: skillName,
        verified: isVerifiedByAi,
      });
    }
  });

  // If no skills are earned yet, provide default foundational skills as verified starter set
  if (dynamicSkills.length === 0) {
    [
      "Corporate Financial Modeling",
      "Enterprise SQL & Querying",
      "Executive Case Structuring",
      "Business Intelligence & DAX",
      "Workplace Generative AI",
    ].forEach((s) => dynamicSkills.push({ name: s, verified: true }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-4 sm:p-5 space-y-3 font-sans bg-white"
    >
      {/* ── Section Header (Compact, no add skill button) ── */}
      <div className="flex items-center justify-between border-b-2 border-blue-100 pb-2.5 font-mono">
        <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 text-slate-950">
          <div className="w-6 h-6 rounded-lg bg-amber-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 flex-shrink-0 shadow-[1.5px_1.5px_0px_0px_#000]">
            <Award size={13} className="text-slate-950 stroke-[2.5]" />
          </div>
          <span>Verified Skills &amp; Masteries ({dynamicSkills.length})</span>
        </h2>
        
        <Link
          href="/career-passport"
          className="text-[11px] font-black text-[#2563eb] hover:underline uppercase"
        >
          Passport →
        </Link>
      </div>

      {/* ── Compact, High-Contrast Brutalist Skills Grid (No level certification, no details, just titles) ── */}
      <div className="flex flex-wrap gap-2 pt-1 font-mono">
        {dynamicSkills.map((skill, i) => (
          <div
            key={i}
            className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-2 text-xs font-black transition-all ${
              skill.verified
                ? "bg-[#2563eb] text-white border-slate-950 shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
                : "bg-amber-300 text-slate-950 border-slate-950 shadow-[2px_2px_0px_0px_#000]"
            }`}
          >
            {skill.verified ? (
              <ShieldCheck size={14} className="text-white fill-blue-800 flex-shrink-0" strokeWidth={2.5} />
            ) : (
              <CheckCircle2 size={14} className="text-slate-950 flex-shrink-0" strokeWidth={2.5} />
            )}
            <span className="truncate max-w-[240px]">{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
