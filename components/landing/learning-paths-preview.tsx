"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileSpreadsheet, Code2, BarChart3, Workflow, Sparkles,
  Video, ArrowRight, BookOpen, Award, Clock, CheckCircle2, ChevronRight, Zap
} from "lucide-react";
import Link from "next/link";

interface CareerTrack {
  slug: string;
  pathSlug: string;
  href: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  category: "finance" | "analytics" | "ai" | "media";
  hours: number;
  lessons: number;
  credential: string;
  credentialFull: string;
  skills: string[];
  icon: any;
  color: string;
  tagBn: string;
  xpReward: string;
}

const CAREER_TRACKS: CareerTrack[] = [
  {
    slug: "corporate-financial-commercial-modeling-excel",
    pathSlug: "corporate-analyst",
    href: "/learn/corporate-analyst/corporate-financial-commercial-modeling-excel",
    titleBn: "করপোরেট ফিনান্সিয়াল ও কমার্শিয়াল মডেলিং (এক্সেল)",
    titleEn: "Corporate Financial & Commercial Modeling in Excel",
    subtitleBn: "৩-স্টেটমেন্ট মডেলিং, পিভিএম ভ্যারিয়েন্স ব্রিজেস এবং ডায়নামিক এক্সেল ক্যাশ ফ্লো ড্যাশবোর্ড মাস্টারক্লাস।",
    category: "finance",
    hours: 75,
    lessons: 53,
    credential: "CCFCM",
    credentialFull: "Certified Corporate Financial & Commercial Modeler",
    skills: ["3-Statement FAST Model", "PVM Variance Bridges", "Power Query ETL", "Debt Sweeps"],
    icon: FileSpreadsheet,
    color: "#059669",
    tagBn: "ফ্ল্যাগশিপ ফাইন্যান্স",
    xpReward: "+1,500 XP",
  },
  {
    slug: "enterprise-python-corporate-analytics-process-automation",
    pathSlug: "corporate-analyst",
    href: "/learn/corporate-analyst/enterprise-python-corporate-analytics-process-automation",
    titleBn: "এন্টারপ্রাইজ পাইথন ও করপোরেট প্রসেস অটোমেশন",
    titleEn: "Enterprise Python for Corporate Analytics & Process Automation",
    subtitleBn: "পান্ডাস, ওপেনপাইএক্সএল এবং ডাকডিবি দিয়ে জটিল স্প্রেডশিট অপারেশন ও রিপোর্টিং অটোমেশন করুন।",
    category: "analytics",
    hours: 80,
    lessons: 40,
    credential: "CCDAS",
    credentialFull: "Certified Corporate Data Automation Specialist",
    skills: ["Python 3.12", "pandas Wrangling", "openpyxl Automation", "DuckDB SQL"],
    icon: Code2,
    color: "#2563eb",
    tagBn: "ডাটা অটোমেশন",
    xpReward: "+1,400 XP",
  },
  {
    slug: "enterprise-business-intelligence-power-bi-sql-corporate-analysts",
    pathSlug: "business-intelligence-analyst",
    href: "/learn/business-intelligence-analyst/enterprise-business-intelligence-power-bi-sql-corporate-analysts",
    titleBn: "এন্টারপ্রাইজ বিজনেস ইন্টেলিজেন্স (পাওয়ার বিআই ও এসকিউএল)",
    titleEn: "Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts",
    subtitleBn: "কিম্বল স্টার স্কিমা মডেলিং, অ্যাডভান্সড ড্যাক্স এবং সি-স্যুট এক্সিকিউটিভ ড্যাশবোর্ড আর্কিটেকচার।",
    category: "analytics",
    hours: 120,
    lessons: 48,
    credential: "CEBI",
    credentialFull: "Certified Enterprise Business Intelligence Analyst",
    skills: ["PostgreSQL Window Functions", "Kimball Star Schemas", "Advanced DAX", "Row-Level Security"],
    icon: BarChart3,
    color: "#7c3aed",
    tagBn: "বিজনেস ইন্টেলিজেন্স",
    xpReward: "+1,800 XP",
  },
  {
    slug: "applied-workplace-ai-enterprise-workflow-automation",
    pathSlug: "applied-ai-automation",
    href: "/learn/applied-ai-automation/applied-workplace-ai-enterprise-workflow-automation",
    titleBn: "অ্যাপ্লায়েড ওয়ার্কপ্লেস এআই ও অটোমেশন (n8n ও পাওয়ার অটোমেট)",
    titleEn: "Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate",
    subtitleBn: "রিপিটেটিভ কাজ বন্ধ করে n8n এবং পাওয়ার অটোমেট ক্লাউড ও ডেস্কটপ আরপিএ দিয়ে অটোনোমাস ওয়ার্কফ্লো বানান।",
    category: "ai",
    hours: 120,
    lessons: 40,
    credential: "CEAS",
    credentialFull: "Certified Enterprise Automation Specialist",
    skills: ["n8n Orchestration", "Power Automate Desktop RPA", "Document AI", "Idempotency & DLQ"],
    icon: Workflow,
    color: "#d97706",
    tagBn: "এআই ওয়ার্কফ্লো",
    xpReward: "+1,600 XP",
  },
  {
    slug: "ai-powered-workplace-professional",
    pathSlug: "ai-workplace-professional",
    href: "/learn/ai-workplace-professional/ai-powered-workplace-professional",
    titleBn: "এআই-পাওয়ার্ড ওয়ার্কপ্লেস প্রফেশনাল",
    titleEn: "AI-Powered Workplace Professional",
    subtitleBn: "চ্যাটজিপিটি ৪ও, জেমিনাই ডিপ রিসার্চ, নোটবুকএলএম এবং এক্সিকিউটিভ বোর্ডরুম মেমো রাইটিং।",
    category: "ai",
    hours: 15,
    lessons: 8,
    credential: "CAP",
    credentialFull: "Certified AI Workplace Professional",
    skills: ["Prompt Engineering", "Gemini Deep Research", "NotebookLM Citations", "BLUF Boardroom Memos"],
    icon: Sparkles,
    color: "#0891b2",
    tagBn: "ওয়ার্কপ্লেস এআই",
    xpReward: "+800 XP",
  },
  {
    slug: "video-ai-production",
    pathSlug: "digital-media-production",
    href: "/learn/digital-media-production/video-ai-production",
    titleBn: "ডিজিটাল মিডিয়া ও ভিডিও প্রোডাকশন সিস্টেম (ক্যাপকাট ও এআই)",
    titleEn: "Digital Media & Video Production Systems (CapCut Desktop & AI)",
    subtitleBn: "হাই-প্যাক্ট সোশ্যাল ভিডিও এডিটিং, সাউন্ড ডিজাইন এবং জেনারেটিভ এআই প্রোডাকশন পাইপলাইন।",
    category: "media",
    hours: 34,
    lessons: 36,
    credential: "CVPS",
    credentialFull: "Certified Video & AI Production Specialist",
    skills: ["CapCut Desktop", "Keyframe Animation", "Voice Synthesis", "Commercial Pacing"],
    icon: Video,
    color: "#e11d48",
    tagBn: "ক্রিয়েটিভ মিডিয়া",
    xpReward: "+1,000 XP",
  },
];

const TABS = [
  { key: "all", labelBn: "সবগুলো ট্র্যাক" },
  { key: "finance", labelBn: "ফাইন্যান্স ও কমার্শিয়াল" },
  { key: "analytics", labelBn: "ডাটা ও বিআই" },
  { key: "ai", labelBn: "এআই ও অটোমেশন" },
  { key: "media", labelBn: "ডিজিটাল মিডিয়া" },
];

export function LearningPathsPreview() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredTracks = activeTab === "all" 
    ? CAREER_TRACKS 
    : CAREER_TRACKS.filter((t) => t.category === activeTab);

  return (
    <section 
      id="tracks" 
      className="relative py-20 sm:py-28 overflow-hidden bg-[#F0F7FF] font-bangla border-b-2 border-slate-900"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-amber-300 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#0f172a]">
            <Award size={14} className="text-slate-950" />
            <span>ভেরিফায়েড করপোরেট কারিকুলাম</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight font-sans">
            আপনার লক্ষ্য অনুযায়ী <br className="hidden sm:inline" />
            <span className="text-white bg-[#2563eb] px-3 py-0.5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] inline-block mt-1">
              ক্যারিয়ার ট্র্যাক বেছে নিন
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            কোনো তাত্ত্বিক লেকচার নয়। প্রতিটি ট্র্যাকে রয়েছে রিয়েল করপোরেট ডাটাবেস, বাস্তব ব্যবসায়িক সমস্যা এবং আন্তর্জাতিক মানসম্মত W3C ক্রেডেনশিয়াল।
          </p>

          {/* Brutalist Tabs */}
          <div className="pt-4 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 font-mono">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black border-2 border-slate-900 transition-all ${
                  activeTab === tab.key
                    ? "bg-[#2563eb] text-white shadow-[4px_4px_0px_0px_#0f172a] translate-x-[1px] translate-y-[1px]"
                    : "bg-white hover:bg-slate-50 text-slate-900 shadow-[3px_3px_0px_0px_#0f172a]"
                }`}
              >
                {tab.labelBn}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Flagship Tracks Grid (Gamified Brutalist Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {filteredTracks.map((track) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-2xl bg-white border-2 border-slate-900 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
                style={{
                  boxShadow: `6px 6px 0px 0px #0f172a`,
                }}
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon, Credential Stamp, and XP Bounty */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-xl border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]"
                      style={{ 
                        backgroundColor: `${track.color}20`, 
                        color: track.color
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded border-2 border-slate-900 bg-amber-300 text-slate-950 shadow-[1px_1px_0px_0px_#0f172a]">
                        {track.xpReward}
                      </span>
                      <span 
                        className="text-[11px] font-black px-2.5 py-0.5 rounded border-2 border-slate-900 text-white shadow-[2px_2px_0px_0px_#0f172a]"
                        style={{ backgroundColor: track.color }}
                      >
                        {track.credential}
                      </span>
                    </div>
                  </div>

                  {/* Title & English Sub-title */}
                  <div>
                    <h3 className="text-lg font-black text-slate-950 group-hover:text-[#2563eb] transition-colors leading-snug font-bangla">
                      {track.titleBn}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {track.titleEn}
                    </p>
                  </div>

                  {/* Description in Simple Bangla */}
                  <p className="text-xs text-slate-600 leading-relaxed font-bangla font-normal">
                    {track.subtitleBn}
                  </p>

                  {/* Duration & Lessons */}
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-1 border-t-2 border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#2563eb]" />
                      {track.hours} ঘণ্টা প্র্যাকটিস
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} className="text-[#2563eb]" />
                      {track.lessons}টি লেসন
                    </span>
                  </div>

                  {/* Core Practical Competencies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {track.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-50 border border-slate-300 text-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-6 mt-4 border-t-2 border-slate-100">
                  <Link
                    href={track.href}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-between border-2 border-slate-900 bg-slate-950 text-white group-hover:bg-[#2563eb] group-hover:border-[#2563eb] shadow-[3px_3px_0px_0px_#2563eb] transition-all"
                  >
                    <span className="font-bangla">কোর্স সিলেবাস দেখুন</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
