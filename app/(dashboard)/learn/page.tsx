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
    id: "applied-automation",
    slug: "applied-ai-automation/applied-workplace-ai-enterprise-workflow-automation",
    title: "Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate",
    subtitle: "Design, build, secure, and measure enterprise workflows that eliminate repetitive work and deliver real business value.",
    positioning: "Transform manual corporate operations into auditable, automated pipelines. Master n8n orchestration, Power Automate Cloud, Power Automate Desktop (RPA), Microsoft Dataverse, and bounded Document AI.",
    stageCount: 3,
    totalHours: 120,
    totalModules: 10,
    pricePerStage: "৳12,500",
    fullCoursePass: "৳22,000",
    uniqueFeature: "Nexus Global Logistics Job Simulation",
    uniqueFeatureDesc: "Reconcile multi-source logistics invoices, terminal webhooks, and desktop dispatch systems across 150 documents",
    icon: Workflow,
    colorHex: "#4F46E5",
    darkHex: "#312E81",
    shadowHex: "#3730A3",
    borderClass: "border-indigo-500",
    gradientFrom: "#312E81",
    gradientTo: "#4F46E5",
    tools: ["n8n", "Power Automate Cloud", "Power Automate Desktop", "Dataverse", "Document AI", "REST APIs"],
    toolIcons: [Workflow, GitBranch, Bot],
    careerOutcomes: ["Enterprise Automation Specialist", "Business Process Engineer", "Operations Analytics Lead", "Digital Transformation Architect"],
    stages: [
      { num: 1, title: "Process Discovery, REST APIs & n8n Orchestration", desc: "SIPOC scoping, BPMN 2.0 mapping, OAuth 2.0 client credentials, and production n8n workflows with JavaScript code nodes", hours: 36, deliverable: "প্রসেস ডিসকভারি ব্লুপ্রিন্ট ও প্রোডাকশন n8n ইনজেশন পাইপলাইন", tools: "BPMN 2.0 + n8n + REST APIs" },
      { num: 2, title: "Power Platform, Desktop RPA & Bounded Document AI", desc: "Power Automate Cloud Flows, Dataverse CRUD, Teams Adaptive Cards, Desktop UI selectors, and schema-enforced Document AI", hours: 44, deliverable: "ক্লাউড-টু-ডেস্কটপ রিকনসিলিয়েশন ও ডক্যুমেন্ট এআই ইঞ্জিন", tools: "Power Automate + Dataverse + OCR" },
      { num: 3, title: "Fault-Tolerant Reliability, Governance & Nexus Job Simulation", desc: "Exponential backoff, idempotency keys, DLQ replay, DLP policies, ROI financial modeling, and 6-deliverable Nexus simulation", hours: 40, deliverable: "নেক্সাস গ্লোবাল লজিস্টিকস সিমুলেশন ও ফাইনাল টেকনিক্যাল ডিফেন্স", tools: "DLQ + DLP + ROI Models" },
    ],
    evidenceBasis: "W3C Enterprise Workflow Architecture Standards; Microsoft Power Platform Enterprise Governance; ISO/IEC 25010 Quality Model",
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
    pricePerStage: "৳990",
    fullCoursePass: "৳2,990",
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
    id: "mto-mastery",
    slug: "mto-fast-track/mto-recruitment-mastery",
    title: "MTO Recruitment Mastery: Aptitude, Case Cracking & Assessment Centers",
    subtitle: "Standardized Cognitive Tests, MECE Issue Trees & Assessment Center Simulations",
    positioning: "End-to-end MNC recruitment preparation engineered for Unilever, BAT, Marico, and top local conglomerates. Cognitive tests, business cases, and behavioral interview simulations.",
    stageCount: 3,
    totalHours: 25,
    totalModules: 20,
    pricePerStage: "৳990",
    fullCoursePass: "৳2,990",
    uniqueFeature: "MTO Assessment Center Engine",
    uniqueFeatureDesc: "Solve live business cases and simulate group assessment center evaluations",
    icon: Target,
    colorHex: "#2563eb",
    darkHex: "#1e3a8a",
    shadowHex: "#1d4ed8",
    borderClass: "border-blue-500",
    gradientFrom: "#2563eb",
    gradientTo: "#1d4ed8",
    tools: ["Issue Trees", "Profitability Cases", "Market Entry Frameworks", "STAR Method"],
    toolIcons: [Brain, Target, Users],
    careerOutcomes: ["Management Trainee Officer", "Corporate Strategy Trainee", "Commercial Trainee", "Operations Trainee"],
    stages: [
      { num: 1, title: "Cognitive Aptitude Speed Drills", desc: "কোয়ান্টিটেটিভ রিজনিং, ভার্বাল লজিক, ডাটা ইন্টারপ্রিটেশন ও সময় ব্যবস্থাপনা", hours: 7, deliverable: "পার্সেন্টাইল ক্যালিব্রেটেড অ্যাপটিটিউড ডায়াগনস্টিক রিপোর্ট", tools: "Standardized Drills" },
      { num: 2, title: "Case Cracking: MECE Issue Trees & Profitability", desc: "মার্কেট এন্ট্রি, প্রফিটেবিলিটি ড্রপ ও অপারেশনস বটলনেক কেস ডি-কনস্ট্রাকশন", hours: 9, deliverable: "কমপ্লিট স্ট্র্যাটেজিক কেস ইস্যু ট্রি ডেক", tools: "Issue Tree Workspaces" },
      { num: 3, title: "Assessment Center Simulations & Executive Defense", desc: "গ্রুপ ডিসকাশন ডায়নামিক্স, প্রায়োরিটাইজেশন টাস্ক ও বিহেভিয়ারাল STAR ইন্টারভিউ", hours: 9, deliverable: "MNC অ্যাসেসমেন্ট সেন্টার প্রেজেন্টেশন ও ডিফেন্স আর্টফ্যাক্ট", tools: "Proctored Simulation" },
    ],
    evidenceBasis: "Standardized Psychometric Benchmarks; Top Management Consulting Case Frameworks",
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
    id: "video-ai",
    slug: "digital-media-production/video-ai-production",
    title: "Digital Media & Video Production Systems",
    subtitle: "From CapCut Social Video to Generative AI Production Pipelines",
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
   Universal Lesson Template (Consensus across all 3 audits)
   ═══════════════════════════════════════════════════════════════ */
const lessonRhythm = [
  { step: "01", title: "Hook Scenario", desc: "Real business problem sets context", time: "2 min", icon: Lightbulb },
  { step: "02", title: "Concept Clip", desc: "Focused 3-5 minute video demonstration", time: "5 min", icon: Play },
  { step: "03", title: "Live Demo", desc: "Side-by-side walkthrough of technique", time: "5 min", icon: Monitor },
  { step: "04", title: "Guided Practice", desc: "Scaffolded task with error checking", time: "10 min", icon: Target },
  { step: "05", title: "Independent Challenge", desc: "Build your own artifact from scratch", time: "15 min", icon: Zap },
  { step: "06", title: "Auto-Feedback", desc: "Server-validated diagnostic with instant results", time: "3 min", icon: CheckCircle2 },
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

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-[10px] font-extrabold uppercase bg-amber-400 text-amber-950 border border-amber-500">
                <Sparkles size={11} className="inline mr-1" /> INSYT Corporate · Prepare
              </span>
              <span className="px-3 py-1 rounded-md text-[10px] font-extrabold uppercase bg-white/15 text-white border border-white/25">
                Wave 1 Flagship Curricula · {totalStages} Stages
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase leading-tight">
              Master Applied Workplace Capability.<br className="hidden sm:block" /> Not Theoretical Video Consumption.
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl leading-relaxed font-medium text-blue-100 font-sans">
              Engineered for day-one operational capability: staged progression, messy enterprise datasets,
              auditable financial models, SQL data modeling, and production-grade work samples verified in your Career Passport.
            </p>
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

      {/* ═══════════ 4 STRATEGIC EMPLOYABILITY LEARNING PATHS ═══════════ */}
      <div className="space-y-4">
        <div className="border-b-2 border-corp-border pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-corp-text font-mono flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600" />
              4 Strategic Learning Paths
            </h2>
            <p className="text-xs font-sans text-corp-text-secondary font-medium mt-0.5">
              Curated corporate employability tracks designed for final-year students, fresh graduates, and career accelerators.
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
            10 Core Courses · 4 Strategic Pathways
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              slug: "ai-workplace-professional",
              title: "AI Workplace Professional",
              coursesTag: "Courses 01 + 08",
              subtitle: "ChatGPT, Gemini, Deep Research, Executive Memos & Presentations",
              accent: "#06b6d4",
              border: "border-cyan-400",
              shadow: "#0891b2",
              jobs: "MTO, Executive, Business Associate",
              link: "/learn/ai-workplace-professional"
            },
            {
              slug: "enterprise-data-analyst",
              title: "Enterprise Data Analyst",
              coursesTag: "Courses 02 + 03 + 04 + 05",
              subtitle: "Advanced Excel, Power BI, SQL & Python for Business Analytics",
              accent: "#2563eb",
              border: "border-blue-400",
              shadow: "#1d4ed8",
              jobs: "Data Analyst, MIS Lead, FP&A",
              link: "/learn/enterprise-data-analyst"
            },
            {
              slug: "business-automation-specialist",
              title: "Business Automation Specialist",
              coursesTag: "Courses 01 + 04 + 06",
              subtitle: "Workplace AI, Relational SQL & n8n Enterprise Workflow Automation",
              accent: "#4f46e5",
              border: "border-indigo-400",
              shadow: "#3730a3",
              jobs: "Automation Lead, Operations Analyst",
              link: "/learn/business-automation-specialist"
            },
            {
              slug: "corporate-career-accelerator",
              title: "Corporate Career Accelerator",
              coursesTag: "Courses 07 + 08 + 09 + 10",
              subtitle: "Project Management, Communication, Strategy & MTO Assessment Centers",
              accent: "#059669",
              border: "border-emerald-400",
              shadow: "#047857",
              jobs: "Management Trainee, Graduate Trainee",
              link: "/learn/corporate-career-accelerator"
            }
          ].map((pathItem) => (
            <Link
              key={pathItem.slug}
              href={pathItem.link}
              className={`block p-4 rounded-xl border-2 ${pathItem.border} bg-corp-surface hover:-translate-y-0.5 transition-all text-left group`}
              style={{ boxShadow: `4px 4px 0px 0px ${pathItem.shadow}` }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded text-white" style={{ background: pathItem.accent }}>
                  {pathItem.coursesTag}
                </span>
                <span className="text-[11px] font-mono text-corp-text-tertiary group-hover:text-blue-600 flex items-center font-bold">
                  View Path <ChevronRight size={13} className="ml-0.5" />
                </span>
              </div>
              <h3 className="text-sm font-extrabold font-mono uppercase text-corp-text mb-1 group-hover:text-blue-600 transition-colors">
                {pathItem.title}
              </h3>
              <p className="text-[11px] text-corp-text-secondary line-clamp-2 mb-3 leading-relaxed">
                {pathItem.subtitle}
              </p>
              <div className="pt-2 border-t border-corp-border/60 flex items-center justify-between text-[10px] text-corp-text-tertiary font-mono">
                <span className="font-bold text-corp-text">Target:</span>
                <span className="truncate max-w-[150px]">{pathItem.jobs}</span>
              </div>
            </Link>
          ))}
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
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-amber-400/20 text-amber-700 border border-amber-400/40">
                          {course.uniqueFeature}
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

                {/* Stages Grid */}
                <div className="p-5 sm:p-6 space-y-3">
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

      {/* ═══════════ UNIVERSAL LESSON RHYTHM (Scientific Pedagogy) ═══════════ */}
      <div className="rounded-xl p-5 sm:p-6 border-2 border-amber-500 bg-amber-500/5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-amber-950">
              Evidence-Backed Pedagogy
            </span>
            <h3 className="text-sm sm:text-base font-black uppercase text-corp-text mt-1">
              Every Lesson Follows This Rhythm
            </h3>
            <p className="text-xs font-sans text-corp-text-secondary font-medium">
              Based on Sweller&apos;s Cognitive Load Theory, Ericsson&apos;s Deliberate Practice, and Bloom&apos;s Revised Taxonomy (Deng &amp; Gao, 2023; Fyfield et al., 2022):
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 font-mono flex-shrink-0">
            ~40 Min Active Learning / Session
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {lessonRhythm.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.step}
                className="p-2.5 rounded-lg border border-amber-500/30 bg-corp-surface space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black font-mono text-amber-600">{step.step}</span>
                  <StepIcon size={12} className="text-amber-500" />
                </div>
                <p className="text-[10px] font-black uppercase font-mono text-corp-text leading-tight">{step.title}</p>
                <p className="text-[9px] font-sans font-medium text-corp-text-tertiary leading-tight">{step.desc}</p>
                <p className="text-[9px] font-mono font-bold text-amber-600">{step.time}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════ WHAT MAKES INSYT DIFFERENT ═══════════ */}
      <div className="rounded-xl p-5 sm:p-6 border-2 border-blue-400 space-y-4 bg-blue-500/5">
        <h3 className="text-sm font-black uppercase text-corp-text font-mono">
          Why INSYT Courses Are Different
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Zap, title: "Tool Handoff Logic", desc: "Learn when to switch tools — not just how to use them", color: "#8B5CF6" },
            { icon: FileSpreadsheet, title: "Messy Real Data", desc: "Broken datasets, not clean exercise files", color: "#10B981" },
            { icon: Shield, title: "W3C Credentials", desc: "Cryptographically signed, recruiter-verifiable proof", color: "#2563EB" },
            { icon: Bot, title: "Socratic AI Tutor", desc: "Guides your thinking — never gives away answers", color: "#06B6D4" },
          ].map((d) => (
            <div key={d.title} className="p-3 rounded-lg border border-corp-border bg-corp-surface space-y-1.5">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: `${d.color}20` }}>
                <d.icon size={16} style={{ color: d.color }} />
              </div>
              <p className="text-[11px] font-extrabold uppercase font-mono text-corp-text">{d.title}</p>
              <p className="text-[10px] font-medium text-corp-text-tertiary">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ BROWSE INDIVIDUAL COURSES CTA ═══════════ */}
      <div
        className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden border-2 border-blue-400 font-mono text-white"
        style={{
          background: "#2563eb",
          boxShadow: "5px 5px 0px 0px #1e3a8a",
        }}
      >
        <div className="relative z-10">
          <h3 className="text-base font-extrabold uppercase text-white">
            Browse Individual Lessons & Modules
          </h3>
          <p className="text-xs mt-1 font-medium font-sans text-blue-100">
            Need a specific topic? Search across all {flagshipCourses.reduce((s, c) => s + c.totalModules, 0)}+ modules and jump directly into any lesson.
          </p>
        </div>
        <Link
          href="/learn/courses"
          className="px-5 py-2.5 rounded-lg text-xs font-extrabold uppercase font-mono tracking-wider flex items-center gap-2 flex-shrink-0 transition-all bg-amber-400 text-amber-950 border-2 border-amber-500 shadow-[3px_3px_0px_0px_#78350f]"
        >
          Browse All Modules
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
