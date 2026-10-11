"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileSpreadsheet, Code2, BarChart3, Workflow, Sparkles,
  Video, ArrowRight, BookOpen, Award, Clock, CheckCircle2, ChevronRight
} from "lucide-react";
import Link from "next/link";

interface CareerTrack {
  slug: string;
  pathSlug: string;
  href: string;
  title: string;
  subtitle: string;
  category: "finance" | "analytics" | "ai" | "media";
  hours: number;
  lessons: number;
  credential: string;
  credentialFull: string;
  skills: string[];
  icon: any;
  color: string;
  tag: string;
}

const CAREER_TRACKS: CareerTrack[] = [
  {
    slug: "corporate-financial-commercial-modeling-excel",
    pathSlug: "corporate-analyst",
    href: "/learn/corporate-analyst/corporate-financial-commercial-modeling-excel",
    title: "Corporate Financial & Commercial Modeling in Excel",
    subtitle: "The Complete Financial Analyst, FP&A, and Commercial Modeling Masterclass.",
    category: "finance",
    hours: 75,
    lessons: 53,
    credential: "CCFCM",
    credentialFull: "Certified Corporate Financial & Commercial Modeler",
    skills: ["3-Statement FAST Model", "PVM Variance Bridges", "Power Query ETL", "Debt Sweeps"],
    icon: FileSpreadsheet,
    color: "#059669",
    tag: "Flagship Finance",
  },
  {
    slug: "enterprise-python-corporate-analytics-process-automation",
    pathSlug: "corporate-analyst",
    href: "/learn/corporate-analyst/enterprise-python-corporate-analytics-process-automation",
    title: "Enterprise Python for Corporate Analytics & Process Automation",
    subtitle: "Turn messy business data into automated reports, reliable data pipelines, and actionable corporate intelligence.",
    category: "analytics",
    hours: 80,
    lessons: 40,
    credential: "CCDAS",
    credentialFull: "Certified Corporate Data Automation Specialist",
    skills: ["Python 3.12", "pandas Wrangling", "openpyxl Automation", "DuckDB SQL"],
    icon: Code2,
    color: "#2563eb",
    tag: "Data Automation",
  },
  {
    slug: "enterprise-business-intelligence-power-bi-sql-corporate-analysts",
    pathSlug: "business-intelligence-analyst",
    href: "/learn/business-intelligence-analyst/enterprise-business-intelligence-power-bi-sql-corporate-analysts",
    title: "Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts",
    subtitle: "Transform Messy Enterprise Data into Scalable Semantic Models, Executive Dashboards, and Boardroom Decisions.",
    category: "analytics",
    hours: 120,
    lessons: 48,
    credential: "CEBI",
    credentialFull: "Certified Enterprise Business Intelligence Analyst",
    skills: ["PostgreSQL Window Functions", "Kimball Star Schemas", "Advanced DAX", "Row-Level Security"],
    icon: BarChart3,
    color: "#7c3aed",
    tag: "Business Intelligence",
  },
  {
    slug: "applied-workplace-ai-enterprise-workflow-automation",
    pathSlug: "applied-ai-automation",
    href: "/learn/applied-ai-automation/applied-workplace-ai-enterprise-workflow-automation",
    title: "Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate",
    subtitle: "Design, build, secure, and measure enterprise workflows that eliminate repetitive work and deliver measurable ROI.",
    category: "ai",
    hours: 120,
    lessons: 40,
    credential: "CEAS",
    credentialFull: "Certified Enterprise Automation Specialist",
    skills: ["n8n Orchestration", "Power Automate Desktop RPA", "Document AI", "Idempotency & DLQ"],
    icon: Workflow,
    color: "#d97706",
    tag: "Workflow Automation",
  },
  {
    slug: "ai-powered-workplace-professional",
    pathSlug: "ai-workplace-professional",
    href: "/learn/ai-workplace-professional/ai-powered-workplace-professional",
    title: "AI-Powered Workplace Professional",
    subtitle: "ChatGPT 4o, Gemini 1.5 Pro, Deep Research, Executive Document Writing & Daily Office AI.",
    category: "ai",
    hours: 15,
    lessons: 8,
    credential: "CAP",
    credentialFull: "Certified AI Workplace Professional",
    skills: ["Prompt Engineering", "Gemini Deep Research", "NotebookLM Citations", "BLUF Boardroom Memos"],
    icon: Sparkles,
    color: "#0891b2",
    tag: "Workplace AI",
  },
  {
    slug: "video-ai-production",
    pathSlug: "digital-media-production",
    href: "/learn/digital-media-production/video-ai-production",
    title: "Digital Media & Video Production Systems (CapCut Desktop & AI)",
    subtitle: "From Social Video Editing to Generative AI Production Pipelines, Audio Normalization and Motion Graphics.",
    category: "media",
    hours: 34,
    lessons: 36,
    credential: "CVPS",
    credentialFull: "Certified Video & AI Production Specialist",
    skills: ["CapCut Desktop", "Keyframe Animation", "Voice Synthesis", "Commercial Pacing"],
    icon: Video,
    color: "#e11d48",
    tag: "Creative Media",
  },
];

export function LearningPathsPreview() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredTracks = activeTab === "all" 
    ? CAREER_TRACKS 
    : CAREER_TRACKS.filter((t) => t.category === activeTab);

  return (
    <section id="tracks" className="relative py-20 sm:py-28 overflow-hidden bg-[#F7F8FC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-[#2563eb] shadow-sm mb-4">
            <BookOpen size={14} />
            <span>EXECUTIVE CURRICULUM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Choose Your <span className="text-[#2563eb]">Career Track</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Deep-dive into rigorous, employer-endorsed career tracks. Fully synchronized with your interactive LMS sandbox and verifiable Career Passport.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: "all", label: "All Career Tracks" },
              { id: "finance", label: "Finance & Modeling" },
              { id: "analytics", label: "Python & Business Intelligence" },
              { id: "ai", label: "Workplace AI & Automation" },
              { id: "media", label: "Creative Media Systems" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: `${track.color}15`, color: track.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <span 
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{ background: `${track.color}10`, color: track.color, border: `1px solid ${track.color}30` }}
                    >
                      {track.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#2563eb] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2">
                    {track.subtitle}
                  </p>

                  {/* Hours & Lessons Stats */}
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pb-4 border-b border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#2563eb]" />
                      <strong>{track.hours}h</strong> Duration
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} className="text-[#2563eb]" />
                      <strong>{track.lessons}</strong> Lessons
                    </span>
                  </div>

                  {/* Skills Pill Grid */}
                  <div className="py-4 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Core Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700">
                    <Award size={14} className="text-amber-500 flex-shrink-0" />
                    <span>{track.credential}</span>
                  </div>

                  <Link
                    href={track.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] shadow-sm transition-all group-hover:translate-x-0.5"
                  >
                    <span>Start Track</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
