"use client";

import { motion } from "framer-motion";
import {
  Briefcase, BookOpen, ArrowRight, CheckCircle2, ShieldCheck, Clock,
  Video, Presentation, Bot, GraduationCap, AlertCircle, TrendingUp, BarChart3, Workflow, Code
} from "lucide-react";
import Link from "next/link";
import { UserState } from "@/lib/state/types";
import { ALL_PATHS } from "@/lib/data/courses";

interface LinkedInExperienceCardProps {
  state: UserState;
}

const iconComponentMap: Record<string, React.ReactNode> = {
  "corporate-analyst": <TrendingUp size={22} className="text-[#2563eb]" />,
  "business-intelligence-analyst": <BarChart3 size={22} className="text-[#2563eb]" />,
  "applied-ai-automation": <Workflow size={22} className="text-[#2563eb]" />,
  "corporate-python-automation": <Code size={22} className="text-[#2563eb]" />,
  "ai-workplace-professional": <Bot size={22} className="text-[#2563eb]" />,
  "digital-media-production": <Video size={22} className="text-[#2563eb]" />,
  "video-ai-production": <Video size={22} className="text-[#2563eb]" />,
  "presentation-engineering": <Presentation size={22} className="text-[#2563eb]" />,
  "ai-for-work": <Bot size={22} className="text-[#2563eb]" />,
  "gre-preparation": <GraduationCap size={22} className="text-[#2563eb]" />,
};

export function LinkedInExperienceCard({ state }: LinkedInExperienceCardProps) {
  // Only valid, active courses from ALL_PATHS
  const enrolledSlugs = (state.enrolledPathSlugs || []).filter(
    (slug) => slug && slug !== "corporate-mto" && slug !== "excel-corporate" && Boolean(ALL_PATHS[slug])
  );
  const hasEnrolled = enrolledSlugs.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 space-y-6 font-sans"
      style={{ background: "var(--corp-surface)" }}
    >
      <div className="flex items-center justify-between font-mono">
        <h2 className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2" style={{ color: "var(--corp-text)" }}>
          <Briefcase size={16} className="text-[#2563eb]" /> Enrolled Courses ({enrolledSlugs.length})
        </h2>
        <Link href="/learn" className="text-xs font-mono font-extrabold text-[#2563eb] hover:underline">
          Browse All Courses →
        </Link>
      </div>

      {hasEnrolled ? (
        <div className="space-y-6 divide-y divide-corp-border">
          {enrolledSlugs.map((slug) => {
            const pathInfo = ALL_PATHS[slug];
            if (!pathInfo) return null;

            const icon = iconComponentMap[slug] || <BookOpen size={22} className="text-[#2563eb]" />;
            const courseMatch = state.courseProgress.find((c) => c.id === slug || c.id.includes(slug.split("-")[0]));
            const progress = courseMatch ? courseMatch.progress : 0;
            const moduleHighlights = pathInfo.whatYouWillLearn?.slice(0, 3) || [];

            return (
              <div key={slug} className="pt-6 pb-6 first:pt-0 last:pb-0 space-y-3 font-mono">
                <div className="flex items-start gap-4">
                  {/* Track Icon Logo Box */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    className="w-12 h-12 rounded-xl bg-corp-bg-secondary border-2 border-corp-border flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    {icon}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-base font-extrabold text-corp-text">
                        <Link href={`/learn/${slug}`} className="hover:text-[#2563eb] transition-colors">
                          {pathInfo.title}
                        </Link>
                      </h3>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#2563eb]/15 text-[#2563eb] border border-[#2563eb]/30">
                        {progress}% Progress
                      </span>
                    </div>

                    <p className="text-xs font-sans font-semibold text-corp-text-secondary mt-0.5">
                      {pathInfo.subtitle || "INSYT Professional Masterclass"}
                    </p>
                    <p className="text-[11px] text-corp-text-tertiary">
                      Enrolled Candidate · Verified Portfolio Credential
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1 my-3">
                      <div className="h-2 rounded-full overflow-hidden bg-corp-bg-secondary border border-corp-border">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-[#2563eb]"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-extrabold text-corp-text-tertiary">
                        <span>{progress >= 100 ? "Completed All Stages" : progress > 0 ? "In Progress" : "Not Started Yet"}</span>
                        <span className="text-[#3B5BDB]">Verified Credential on completion</span>
                      </div>
                    </div>

                    {/* Bullet points */}
                    {moduleHighlights.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-corp-text-secondary font-sans font-medium">
                        {moduleHighlights.map((m: string, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-[#2563eb] flex-shrink-0" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Start Course CTA Button with distinct top/bottom spacing away from dividing line */}
                    <div className="pt-4 mt-3">
                      <Link
                        href={`/learn/${slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-mono font-extrabold text-white bg-[#2563eb] hover:bg-blue-600 transition-all border border-blue-300 uppercase tracking-wider shadow-[3px_3px_0px_0px_#1e3a8a] cursor-pointer"
                      >
                        <span>{progress > 0 ? "Continue Course" : "Start Course"}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 rounded-lg border-2 border-dashed border-corp-border text-center space-y-3 font-mono bg-corp-bg-secondary/30">
          <AlertCircle size={28} className="mx-auto text-[#2563eb]" />
          <div>
            <h4 className="text-xs font-extrabold uppercase text-corp-text">No Enrolled Courses Yet</h4>
            <p className="text-xs font-sans text-corp-text-secondary max-w-md mx-auto mt-1">
              You are not currently enrolled in any course. Explore our verified courses to start building portfolio deliverables!
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-extrabold uppercase text-white bg-[#2563eb] hover:bg-blue-600 border border-blue-300 shadow-[3px_3px_0px_0px_#1e3a8a] cursor-pointer"
            >
              <span>Browse Courses</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
