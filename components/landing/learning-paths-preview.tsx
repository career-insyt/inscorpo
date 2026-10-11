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
  },
];

const TABS = [
  { key: "all", labelBn: "সবগুলো ট্র্যাক" },
  { key: "finance", labelBn: "ফাইন্যান্স ও কমার্শিয়াল" },
  { key: "analytics", labelBn: "ডাটা ও বিআই অ্যানালিটিক্স" },
  { key: "ai", labelBn: "এআই ও ওয়ার্কফ্লো অটোমেশন" },
  { key: "media", labelBn: "ডিজিটাল মিডিয়া প্রোডাকশন" },
];

export function LearningPathsPreview() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredTracks = activeTab === "all" 
    ? CAREER_TRACKS 
    : CAREER_TRACKS.filter((t) => t.category === activeTab);

  return (
    <section 
      id="tracks" 
      className="relative py-20 sm:py-28 overflow-hidden bg-[#F0F7FF] font-bangla"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header in Pure Bangla */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md bg-white/80 border border-white/90 text-[#2563eb] shadow-sm">
            <Award size={14} />
            <span>ভেরিফায়েড করপোরেট কারিকুলাম</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            আপনার লক্ষ্য অনুযায়ী <br className="hidden sm:inline" />
            <span className="text-[#2563eb]">ক্যারিয়ার ট্র্যাক বেছে নিন</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            কোনো তাত্ত্বিক লেকচার নয়। প্রতিটি ট্র্যাকে রয়েছে রিয়েল করপোরেট ডাটাবেস, বাস্তব ব্যবসায়িক সমস্যা এবং আন্তর্জাতিক মানসম্মত W3C ক্রেডেনশিয়াল।
          </p>

          {/* Interactive Mobile-Friendly Tabs */}
          <div className="pt-4 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 backdrop-blur-md ${
                  activeTab === tab.key
                    ? "bg-[#2563eb] text-white shadow-md shadow-blue-500/20 border border-blue-500"
                    : "bg-white/70 hover:bg-white text-slate-700 border border-white/90 shadow-xs"
                }`}
              >
                {tab.labelBn}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Vector Spotlight Highlights (Genre Illustrated) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Spotlight 1: Financial & Commercial Modeling */}
          <div className="relative rounded-3xl backdrop-blur-2xl bg-white/75 border border-white/90 p-6 sm:p-8 shadow-[0_12px_36px_rgba(37,99,235,0.08)] flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
            <div className="w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 rounded-2xl bg-gradient-to-tr from-emerald-100/60 to-teal-50/50 p-2 border border-white/80 flex items-center justify-center">
              <img 
                src="/illustrations/vector_finance_mind.png" 
                alt="Finance & Modeling Vector" 
                className="w-full h-full object-contain filter drop-shadow-sm hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-2.5 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                কর্পোরেট ফিনান্সিয়াল অ্যানালিস্ট
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                ৩-স্টেটমেন্ট ফিনান্সিয়াল মডেলিং
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                ফাস্ট (FAST) স্ট্যান্ডার্ড মডেলিং, পিভিএম ব্রিজেস এবং ভ্যালুয়েশন মডেল তৈরি করুন যা টপ ব্যাংকার ও করপোরেট সিএফওরা সরাসরি ব্যবহার করেন।
              </p>
              <Link 
                href="/learn/corporate-analyst/corporate-financial-commercial-modeling-excel"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 pt-1"
              >
                <span>সিলেবাস ও প্রজেক্ট দেখুন</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Spotlight 2: AI & Process Automation */}
          <div className="relative rounded-3xl backdrop-blur-2xl bg-white/75 border border-white/90 p-6 sm:p-8 shadow-[0_12px_36px_rgba(37,99,235,0.08)] flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
            <div className="w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 rounded-2xl bg-gradient-to-tr from-blue-100/60 to-sky-50/50 p-2 border border-white/80 flex items-center justify-center">
              <img 
                src="/illustrations/vector_ai_automation.png" 
                alt="AI & Automation Vector" 
                className="w-full h-full object-contain filter drop-shadow-sm hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-2.5 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                এআই ও ওয়ার্কফ্লো ইঞ্জিনিয়ারিং
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                অটোনোমাস এন্টারপ্রাইজ অটোমেশন
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                দৈনন্দিন ম্যানুয়াল কাজগুলো n8n, পাওয়ার অটোমেট এবং পাইথন বট দিয়ে অটোমেট করুন। বাড়িয়ে নিন নিজের উৎপাদনশীলতা ১০ গুণ।
              </p>
              <Link 
                href="/learn/applied-ai-automation/applied-workplace-ai-enterprise-workflow-automation"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 pt-1"
              >
                <span>সিলেবাস ও প্রজেক্ট দেখুন</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* 6 Flagship Tracks Grid (Heavy Glassmorphism Cards) */}
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
                className="group relative rounded-3xl backdrop-blur-2xl bg-white/75 border border-white/90 p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs"
                      style={{ 
                        backgroundColor: `${track.color}15`, 
                        borderColor: `${track.color}30`,
                        color: track.color
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                        {track.tagBn}
                      </span>
                      <span 
                        className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md text-white shadow-xs"
                        style={{ backgroundColor: track.color }}
                      >
                        {track.credential}
                      </span>
                    </div>
                  </div>

                  {/* Title & English Sub-title */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors leading-snug">
                      {track.titleBn}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {track.titleEn}
                    </p>
                  </div>

                  {/* Description in Simple Bangla */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {track.subtitleBn}
                  </p>

                  {/* Duration & Lessons */}
                  <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-600" />
                      {track.hours} ঘণ্টা প্র্যাকটিস
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} className="text-blue-600" />
                      {track.lessons}টি লেসন
                    </span>
                  </div>

                  {/* Core Practical Competencies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {track.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/90 border border-slate-200 text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    href={track.href}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all duration-200 group-hover:bg-[#2563eb] group-hover:text-white bg-slate-100 text-slate-800 shadow-xs"
                  >
                    <span>কোর্স শুরু করুন</span>
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
