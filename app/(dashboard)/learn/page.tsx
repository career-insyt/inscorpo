"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Clock, Star, Award, Users, CheckCircle2,
  Sparkles, Target, ChevronRight, Zap, BookOpen, TrendingUp,
  Video, BarChart3, Presentation, Brain, GraduationCap,
  Layers, Play, FileSpreadsheet, Wand2, Mic, Camera,
  Monitor, Palette, PieChart, Bot, Search as SearchIcon,
  MessageSquare, Shield, FileText, Lightbulb, Code, Terminal, Database,
  Workflow, GitBranch
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";

/* ═══════════════════════════════════════════════════════════════
   WAVE 1 FLAGSHIP CURRICULA — Blueprint Supermassive Implementation Plan
   ═══════════════════════════════════════════════════════════════ */

const flagshipCourses = [
  {
    id: "ai-workplace",
    slug: "ai-workplace-professional/ai-powered-workplace-professional",
    title: "AI-Powered Workplace Professional",
    subtitle: "ChatGPT, Gemini, Deep Research, Executive Document Writing & Daily Office AI",
    positioning: "Master applied generative AI for modern corporate operations. Deploy ChatGPT, Gemini, and Google NotebookLM to synthesize 150-page annual reports, draft boardroom memos, engineer assertion-evidence slide decks, extract meeting action matrices, and implement enterprise prompt redaction and governance.",
    stageCount: 3,
    totalHours: 15,
    totalModules: 4,
    pricePerStage: "৳990",
    fullCoursePass: "৳2,990",
    uniqueFeature: "Zero-Hallucination RAG & Executive Memo Engine",
    uniqueFeatureDesc: "Synthesize 150-page corporate annual reports with clickable inline citations and draft BLUF boardroom memos",
    icon: Bot,
    colorHex: "#06b6d4",
    darkHex: "#083344",
    shadowHex: "#0891b2",
    borderClass: "border-cyan-500",
    gradientFrom: "#083344",
    gradientTo: "#06b6d4",
    tools: ["ChatGPT 4o", "Google Gemini 1.5 Pro", "NotebookLM", "Prompt Engineering", "Office Copilots"],
    toolIcons: [Bot, Sparkles, FileText],
    careerOutcomes: ["Management Trainee Officer", "Executive", "Business Associate", "Operations Analyst"],
    stages: [
      { num: 1, title: "Prompt Engineering & Grounded Enterprise Research", desc: "Chain-of-Thought reasoning, few-shot demonstration, and Gemini deep research synthesis over multi-file annual reports", hours: 5, deliverable: "ভ্যালিডেটেড প্রম্পট চেইন লাইব্রেরি ও অ্যানুয়াল রিপোর্ট অডিট মেমো", tools: "ChatGPT 4o + Gemini 1.5 Pro" },
      { num: 2, title: "Executive Document Writing & Meeting Accountability", desc: "BLUF boardroom memos, 1-page briefing papers, and RACI action item matrices extracted from raw meeting transcripts", hours: 5, deliverable: "বোর্ডরুম এক্সিকিউটিভ ডিসিশন মেমো ও অ্যাকশন আইটেম রেজিস্টার", tools: "NotebookLM + BLUF Framework" },
      { num: 3, title: "Presentation Engineering & Enterprise AI Governance", desc: "Assertion-evidence slide outlines, data-ink ratio optimization, and PII anonymization to prevent corporate data leakage", hours: 5, deliverable: "অ্যাসারশন-এভিডেন্স স্লাইড ডেক ও এন্টারপ্রাইজ এআই গভর্নেন্স পলিসি", tools: "Assertion-Evidence + Redaction" },
    ],
    evidenceBasis: "Enterprise LLM Evaluation Protocols; W3C Data Quality Standards; Harvard Business Review Corporate Communication Guidelines",
  },
  {
    id: "python-automation",
    slug: "corporate-analyst/enterprise-python-corporate-analytics-process-automation",
    title: "Enterprise Python for Corporate Analytics & Process Automation",
    subtitle: "Turn messy business data into automated reports, reliable data pipelines, and actionable corporate intelligence.",
    positioning: "Turn messy business data into automated reports, reliable data pipelines, and actionable corporate intelligence. Master Python 3.12, pandas, openpyxl, SQLAlchemy, DuckDB, requests, and logging to automate repetitive spreadsheet operations.",
    stageCount: 3,
    totalHours: 80,
    totalModules: 10,
    pricePerStage: "৳8,500",
    fullCoursePass: "৳16,500",
    uniqueFeature: "3-Hour Recruiter Job Simulation",
    uniqueFeatureDesc: "Reconcile multi-source ERP, distributor spreadsheets, and APIs under deadline pressure",
    icon: Code,
    colorHex: "#2563eb",
    darkHex: "#1e3a8a",
    shadowHex: "#1d4ed8",
    borderClass: "border-blue-500",
    gradientFrom: "#1e3a8a",
    gradientTo: "#2563eb",
    tools: ["Python 3.12", "pandas", "openpyxl", "DuckDB", "SQLAlchemy", "Requests"],
    toolIcons: [Code, Terminal, Database],
    careerOutcomes: ["Corporate Data Analyst", "FP&A Automation Lead", "Commercial Intelligence Specialist", "Operations Analytics Lead"],
    stages: [
      { num: 1, title: "Python Foundations, File Systems & Defensive Processing", desc: "Data types, pathlib, raw text normalization, and defensive error handling without silent data corruption", hours: 24, deliverable: "ভেন্ডর পেমেন্ট ভ্যালিডেশন স্ক্রিপ্ট ও ডিরেক্টরি স্ক্যানার", tools: "Python 3.12 + pathlib" },
      { num: 2, title: "Tabular Mastery, Relational Joins & Excel Automation", desc: "pandas, Cartesian row multiplication audit, openpyxl template injection, and XlsxWriter styling", hours: 28, deliverable: "ওয়ার্কফোর্স হাইজিন পাইপলাইন ও অডিটেড এক্সেল রিপোর্ট", tools: "pandas + openpyxl + XlsxWriter" },
      { num: 3, title: "SQL Push-Down, Cloud APIs & Recruiter Capstone", desc: "SQLAlchemy, DuckDB, paginated REST APIs, enterprise logging, and 3-hour recruiter simulation", hours: 28, deliverable: "রিসেলার রিটেনশন পাইপলাইন ও ৩-ঘণ্টার এক্সিকিউটিভ কেস", tools: "DuckDB + APIs + Logging" },
    ],
    evidenceBasis: "Enterprise Python Data Governance; W3C Data Quality Framework; FMCG & Banking Settlement Best Practices",
  },
  {
    id: "excel-modeling",
    slug: "corporate-analyst/corporate-financial-commercial-modeling-excel",
    title: "Corporate Financial & Commercial Modeling in Excel",
    subtitle: "Auditable Operating Models, Working Capital Cycles & Executive Reporting",
    positioning: "Not simple formula memorization. Build production-grade corporate financial models, messy distributor datasets, dynamic P&L statements, and board-ready dashboards.",
    stageCount: 3,
    totalHours: 24,
    totalModules: 18,
    pricePerStage: "৳0.01",
    fullCoursePass: "৳0.01",
    uniqueFeature: "FMCG Commercial Capstone",
    uniqueFeatureDesc: "Build an auditable operating model with P&L, working capital and KPI dashboard",
    icon: FileSpreadsheet,
    colorHex: "#059669",
    darkHex: "#064e3b",
    shadowHex: "#065f46",
    borderClass: "border-emerald-500",
    gradientFrom: "#059669",
    gradientTo: "#047857",
    tools: ["Excel", "Power Query", "Financial Modeling", "Scenario Manager"],
    toolIcons: [FileSpreadsheet, BarChart3, Target],
    careerOutcomes: ["Corporate Financial Analyst", "Commercial Planning Lead", "FP&A Specialist", "Investment Analyst"],
    stages: [
      { num: 1, title: "Data Cleaning, Dynamic Arrays & Advanced Lookup", desc: "XLOOKUP, FILTER, UNIQUE, SORT এবং ERP র ডেটা স্যানিটাইজেশন আর্কিটেকচার", hours: 6, deliverable: "এরর-ফ্রি ডাইনামিক সেলস ও কমার্শিয়াল মডেল", tools: "Excel + Power Query" },
      { num: 2, title: "Commercial Working Capital & Operating Schedules", desc: "Accounts Receivable (DSO), Inventory (DIO) এবং ক্যাশ কনভার্শন সাইকেল", hours: 8, deliverable: "ইনভেন্টরি টার্নওভার ও ওয়ার্কিং ক্যাপিটাল সিডিউল", tools: "Excel Financial Models" },
      { num: 3, title: "Integrated 3-Statement & Executive Dashboard", desc: "ব্যালেন্স শিট, ক্যাশ ফ্লো, সিনারিও সেনসিটিভিটি এবং বোর্ডরুম ভ্যারিয়েন্স অ্যানালাইসিস", hours: 10, deliverable: "FMCG ডিস্ট্রিবিউটর কমার্শিয়াল ও ফাইনান্সিয়াল মডেল ক্যাপস্টোন", tools: "Scenario Manager + Dashboards" },
    ],
    evidenceBasis: "Corporate FP&A Best Practices; Harvard Business School Case Standards; PnL Auditing Rules",
  },
  {
    id: "bi-sql",
    slug: "corporate-analyst/enterprise-business-intelligence-power-bi-sql-corporate-analysts",
    title: "Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts",
    subtitle: "Transform Messy Enterprise Data into Scalable Semantic Models, Executive Dashboards, and Strategic Business Decisions.",
    positioning: "Master the full corporate business intelligence lifecycle across PostgreSQL, DuckDB, Power Query, Star Schema dimensional modeling, advanced DAX, and executive Power BI reporting. Deconstruct enterprise performance, build automated analytical data pipelines, reconcile commercial metrics, and deliver strategic boardroom decision memos.",
    stageCount: 4,
    totalHours: 120,
    totalModules: 12,
    pricePerStage: "৳5,500",
    fullCoursePass: "৳14,500",
    uniqueFeature: "Apex Consumer Goods Enterprise Simulation & 6-Hour Challenge",
    uniqueFeatureDesc: "Investigate 4.8M transaction records, deconstruct margin collapse, model 8-table star schema, and defend recommendations live",
    icon: BarChart3,
    colorHex: "#0284c7",
    darkHex: "#075985",
    shadowHex: "#0369a1",
    borderClass: "border-sky-500",
    gradientFrom: "#075985",
    gradientTo: "#0284c7",
    tools: ["PostgreSQL", "DuckDB", "Power Query", "Power BI Desktop", "DAX Studio", "Star Schema"],
    toolIcons: [Database, BarChart3, Layers],
    careerOutcomes: ["Enterprise BI Analyst", "Commercial Insights Specialist", "FP&A Business Partner", "Lead Analytics Architect"],
    stages: [
      { num: 1, title: "Enterprise SQL Foundations, Joins, CTEs & Window Functions", desc: "PostgreSQL querying, relational join hygiene, multi-stage CTEs, and window functions over 3.5M records", hours: 30, deliverable: "১৫-টাস্ক অটোমেটেড এসকিউএল কোয়েরি বেঞ্চমার্ক ও ভ্যালিডেশন স্ক্রিপ্ট", tools: "PostgreSQL 16 + DuckDB" },
      { num: 2, title: "Power Query Ingestion, Data Profiling & Star Schema Modeling", desc: "Column profiling, unpivoting budgets, query folding audit, surrogate keys, and Kimball 8-table star schema", hours: 30, deliverable: "রিপিটেবল পাওয়ার কোয়েরি ইটিএল পাইপলাইন ও স্টার স্কিমা মডেল ডায়াগ্রাম", tools: "Power Query + Kimball Modeling" },
      { num: 3, title: "Core & Advanced DAX Engineering, Time Intelligence & Auditing", desc: "Explicit measures, CALCULATE filter context transitions, iterator performance (SUMX, RANKX), and YTD pacing", hours: 30, deliverable: "প্রোডাকশন ড্যাক্স মেজার রিপোজিটরি ও ফিল্টার কনটেক্সট অডিট", tools: "DAX Studio + VertiPaq" },
      { num: 4, title: "Executive Dashboards, Strategic Memos & Apex Enterprise Capstone", desc: "Cognitive visual hierarchy, 3-tier report navigation, 2-page executive decision memo, and 6-hour practical defense", hours: 30, deliverable: "এপেক্স কনজিউমার গুডস এক্সিকিউটিভ ড্যাশবোর্ড ও ৭-মিনিটের বোর্ডরুম ডিফেন্স", tools: "Power BI Desktop + Executive Briefings" },
    ],
    evidenceBasis: "Kimball Group Dimensional Modeling; Microsoft PL-300 Domain Competencies; ANSI SQL Standards; Corporate FP&A Governance",
  },
  {
    id: "workflow-automation",
    slug: "applied-ai-automation/applied-workplace-ai-enterprise-workflow-automation",
    title: "Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate",
    subtitle: "Architect Fault-Tolerant Multi-System Integrations, Bounded AI Pipelines, and Enterprise Desktop RPA.",
    positioning: "Master production-grade enterprise automation across n8n orchestrations, Power Automate Cloud, Desktop RPA, Microsoft Dataverse, and secure webhook integrations. Implement dead-letter queues, exponential backoff, DLP policies, and ROI modeling.",
    stageCount: 4,
    totalHours: 120,
    totalModules: 10,
    pricePerStage: "৳12,500",
    fullCoursePass: "৳22,000",
    uniqueFeature: "Nexus Global Logistics Multi-System Automation Transformation",
    uniqueFeatureDesc: "Engineer automated pipelines across ERP, CRM, and logistics with live 1-on-1 capstone defense",
    icon: Workflow,
    colorHex: "#7c3aed",
    darkHex: "#4c1d95",
    shadowHex: "#5b21b6",
    borderClass: "border-purple-500",
    gradientFrom: "#4c1d95",
    gradientTo: "#7c3aed",
    tools: ["n8n", "Power Automate", "Microsoft Dataverse", "REST APIs", "Desktop RPA", "Document AI"],
    toolIcons: [Workflow, Bot, Database],
    careerOutcomes: ["Enterprise Automation Specialist", "Operations Automation Lead", "Process Optimization Architect", "Corporate Workflow Consultant"],
    stages: [
      { num: 1, title: "Process Architecture, REST APIs & Webhook Security", desc: "SIPOC diagrams, BPMN 2.0 notation, OAuth 2.0 authorization flows, and signed webhook ingestions", hours: 30, deliverable: "ভ্যালিডেটেড এন্টারপ্রাইজ ওয়েবহুক হ্যান্ডলার ও এপিআই অডিট ড্যাশবোর্ড", tools: "Postman + Webhooks" },
      { num: 2, title: "n8n Self-Hosted Orchestrations & Code Nodes", desc: "Data transformations, JavaScript/Python Code nodes, pagination handlers, and relational database persistence", hours: 30, deliverable: "মাল্টি-সোর্স ইনভয়েস ও লেজার রিকনসিলিয়েশন ওয়ার্কফ্লো পাইপলাইন", tools: "n8n + PostgreSQL" },
      { num: 3, title: "Power Platform, Dataverse & Desktop RPA Resilience", desc: "Cloud flows, adaptive cards, Dataverse business logic, desktop UI selectors, and self-healing error recovery", hours: 30, deliverable: "এন্ড-টু-এন্ড এমপ্লয়ি অনবোর্ডিং লাইফসাইকেল অটোমেশন ও আরপিএ বট", tools: "Power Automate + Dataverse" },
      { num: 4, title: "Failure Engineering, Enterprise Governance & Nexus Capstone", desc: "Dead-letter queues, exponential backoff jitter, DLP policy enforcement, and executive ROI board presentation", hours: 30, deliverable: "নেক্সাস গ্লোবাল লজিস্টিকস মাল্টি-সিস্টেম এন্টারপ্রাইজ ট্রান্সফর্মেশন ক্যাপস্টোন", tools: "n8n + Power Automate + Runbooks" },
    ],
    evidenceBasis: "W3C Enterprise Workflow Architecture; Microsoft Power Platform Enterprise Governance; ISO/IEC 25010 Quality Standards",
  },
  {
    id: "video-ai",
    slug: "digital-media-production/video-ai-production",
    title: "Digital Media & Video Production Systems (CapCut And After Effects)",
    subtitle: "From CapCut Social Video to Generative AI Production Pipelines & After Effects",
    positioning: "The complete pipeline from CapCut social video editing to generative AI production (Gemini + ElevenLabs) and professional brand motion graphics.",
    stageCount: 3,
    totalHours: 34,
    totalModules: 36,
    pricePerStage: "৳990",
    fullCoursePass: "৳2,990",
    uniqueFeature: "Production Launch Package",
    uniqueFeatureDesc: "Produce a 15-asset commercial campaign with AI voiceover and motion design",
    icon: Video,
    colorHex: "#8B5CF6",
    darkHex: "#5B21B6",
    shadowHex: "#4C1D95",
    borderClass: "border-violet-500",
    gradientFrom: "#8B5CF6",
    gradientTo: "#6D28D9",
    tools: ["CapCut", "Generative AI", "ElevenLabs", "Motion Graphics"],
    toolIcons: [Camera, Wand2, Layers],
    careerOutcomes: ["Content Creator", "Video Editor", "Motion Designer", "AI Media Specialist"],
    stages: [
      { num: 1, title: "CapCut Complete Course from Beginner to Advanced", desc: "৩৬টি মডিউল ও ৮টি স্টেজে সম্পূর্ণ ভিডিও এডিটিং মাস্টারক্লাস", hours: 18, deliverable: "১৫টি প্রজেক্ট ও ৭-অ্যাসেট ফাইনাল ক্যাম্পেইন", tools: "CapCut Desktop, Mobile & Web" },
      { num: 2, title: "AI Production Studio: Gemini & ElevenLabs Audio", desc: "জেনারেটিভ এআই স্ক্রিপ্টিং, ইলেভেনল্যাবস ভয়েস ক্লোনিং ও অডিও ইঞ্জিনিয়ারিং", hours: 8, deliverable: "সম্পূর্ণ এআই-জেনারেটেড কমার্শিয়াল স্পট", tools: "Gemini + ElevenLabs" },
      { num: 3, title: "Commercial Motion Graphics & Brand Launch Assets", desc: "প্রফেশনাল মোশন গ্রাফিক্স, লোগো অ্যানিমেশন ও সিনেমাটিক ট্রানজিশন", hours: 8, deliverable: "বোর্ডরুম-গ্রেড মোশন গ্রাফিক্স প্যাকেজ ও শোরিল", tools: "Motion Graphics Suite" },
    ],
    evidenceBasis: "Logeswari & G, 2024; Ferreira & Campos, 2025; Park & Choo, 2024",
  },
];


/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function LearnHubPage() {
  const { state } = useUser();

  const totalHours = flagshipCourses.reduce((sum, c) => sum + c.totalHours, 0);
  const totalStages = flagshipCourses.reduce((sum, c) => sum + c.stageCount, 0);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-6 space-y-10 pb-24 font-sans">

      {/* ═══════════ HERO HEADER ═══════════ */}
      <div
        className="rounded-xl p-6 sm:p-8 relative overflow-hidden font-mono text-white border-2 border-blue-400"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          boxShadow: "6px 6px 0px 0px #1e3a8a",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-mono">
              Corporate Learning Academies
            </h1>
          </div>

          {/* Stats strip */}
          <div className="flex gap-5 flex-shrink-0 bg-blue-950/50 p-4 rounded-lg border border-white/20">
            {[
              { value: "4", label: "Courses", icon: <BookOpen size={14} className="text-amber-300" /> },
              { value: `${totalStages}`, label: "Stages", icon: <Layers size={14} className="text-amber-300" /> },
              { value: `${totalHours}h+`, label: "Content", icon: <Clock size={14} className="text-emerald-300" /> },
              { value: "W3C", label: "Credential", icon: <Shield size={14} className="text-emerald-300" /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">{stat.icon}</div>
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-[9px] text-blue-200 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* ═══════════ FLAGSHIP COURSE CARDS ═══════════ */}
      <div className="space-y-5">
        <div className="border-b-2 border-corp-border pb-3">
          <h2 className="text-xl font-black uppercase tracking-tight text-corp-text font-mono">
            Flagship Courses & Staged Modules
          </h2>
          <p className="text-xs font-sans text-corp-text-secondary font-medium mt-1">
            Each course is a staged journey — buy individual stages (৳990) or unlock the full course pass at a discount. Every stage ends in a real portfolio artifact.
          </p>
        </div>

        <div className="space-y-8">
          {flagshipCourses.map((course, idx) => {
            const CourseIcon = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className={`rounded-xl border-2 ${course.borderClass} overflow-hidden bg-corp-surface`}
                style={{ boxShadow: `5px 5px 0px 0px ${course.shadowHex}` }}
              >
                {/* Course Header */}
                <div
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ background: `linear-gradient(135deg, ${course.gradientFrom}15, ${course.gradientTo}08)` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-white/20"
                      style={{ background: course.colorHex }}
                    >
                      <CourseIcon size={22} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase font-mono text-white"
                          style={{ background: course.colorHex }}
                        >
                          {course.stageCount} Stages · {course.totalHours}h
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-corp-text font-mono uppercase tracking-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs text-corp-text-secondary font-medium max-w-xl leading-relaxed">
                        {course.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] font-mono font-bold text-corp-text-tertiary uppercase">Per Stage</p>
                      <p className="text-lg font-black font-mono" style={{ color: course.colorHex }}>{course.pricePerStage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono font-bold text-corp-text-tertiary uppercase">Full Course</p>
                      <p className="text-sm font-extrabold font-mono text-corp-text">{course.fullCoursePass}</p>
                    </div>
                  </div>
                </div>

                {/* Positioning Statement */}
                <div className="px-5 sm:px-6 py-3 border-t border-b border-corp-border bg-corp-bg-secondary/50">
                  <p className="text-[11px] text-corp-text-secondary font-medium leading-relaxed italic flex items-center gap-1.5">
                    <Lightbulb size={13} className="text-amber-500 flex-shrink-0" />
                    <span>{course.positioning}</span>
                  </p>
                </div>

                {/* Stages Grid (Hidden in mobile view) */}
                <div className="p-5 sm:p-6 space-y-3 hidden sm:block">
                  <p className="text-[11px] font-extrabold uppercase font-mono tracking-wider" style={{ color: course.colorHex }}>
                    Stage-by-Stage Progression:
                  </p>
                  <div className={`grid grid-cols-1 ${course.stageCount >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : course.stageCount >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3`}>
                    {course.stages.map((stage) => (
                      <div
                        key={stage.num}
                        className="p-3 rounded-lg border-2 border-corp-border bg-corp-bg-secondary space-y-2 hover:border-opacity-60 transition-colors"
                        style={{ borderColor: `${course.colorHex}30` }}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="w-7 h-7 rounded-md font-mono text-xs font-black flex items-center justify-center text-white"
                            style={{ background: course.colorHex }}
                          >
                            {stage.num}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-corp-text-tertiary">{stage.hours}h</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-extrabold uppercase font-mono text-corp-text leading-snug font-bangla">{stage.title}</p>
                          <p className="text-[10px] font-medium text-corp-text-tertiary leading-tight mt-0.5 font-bangla">{stage.desc}</p>
                        </div>
                        <div className="pt-1.5 border-t border-corp-border">
                          <p className="text-[9px] font-mono uppercase font-bold text-corp-text-tertiary">Deliverable:</p>
                          <p className="text-[10px] font-bold text-corp-text leading-tight flex items-center gap-1 font-bangla">
                            <FileText size={12} className="text-[#3B5BDB] flex-shrink-0" />
                            <span>{stage.deliverable}</span>
                          </p>
                        </div>
                        <span className="inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-corp-bg border border-corp-border text-corp-text-tertiary">
                          {stage.tools}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Career Outcomes + CTA */}
                <div className="px-5 sm:px-6 py-4 border-t-2 border-corp-border bg-corp-bg-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-extrabold uppercase font-mono text-corp-text-tertiary">Career Outcomes:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {course.careerOutcomes.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono bg-corp-bg border border-corp-border text-corp-text-secondary"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/learn/${course.slug}`}
                    className="px-6 py-3 rounded-lg text-xs font-extrabold uppercase font-mono tracking-wider flex items-center gap-2 text-white transition-all hover:-translate-y-0.5 flex-shrink-0"
                    style={{ background: course.colorHex, boxShadow: `3px 3px 0px 0px ${course.darkHex}` }}
                  >
                    Explore Course <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
