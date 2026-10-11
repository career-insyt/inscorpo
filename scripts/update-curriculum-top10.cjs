const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '../lib/data/courses.ts');
let content = fs.readFileSync(coursesPath, 'utf8');

// 1. Fix advertised counts
content = content.replace(
  /slug:\s*"corporate-financial-commercial-modeling-excel",\s*pathSlug:\s*"corporate-analyst",\s*title:\s*"Corporate Financial & Commercial Modeling in Excel",[\s\S]*?lessons:\s*48,/,
  (match) => match.replace('lessons: 48,', 'lessons: 53,')
);

content = content.replace(
  /slug:\s*"mto-recruitment-mastery",\s*pathSlug:\s*"mto-fast-track",\s*title:\s*"MTO Recruitment Mastery: Aptitude, Case Cracking & Assessment Centers",[\s\S]*?lessons:\s*30,/,
  (match) => match.replace('lessons: 30,', 'lessons: 6,')
);

// 2. Define the new course constants code
const newCoursesCode = `
export const AI_WORKPLACE_PROFESSIONAL_COURSE: CourseItem = {
  slug: "ai-powered-workplace-professional",
  pathSlug: "ai-workplace-professional",
  title: "AI-Powered Workplace Professional",
  subtitle: "ChatGPT, Gemini, Deep Research, Executive Document Writing & Daily Office AI",
  description: "Master applied generative AI for modern corporate operations. Deploy ChatGPT, Gemini, and Google NotebookLM to synthesize 150-page annual reports, draft boardroom memos, engineer assertion-evidence slide decks, extract meeting action matrices, and implement enterprise prompt redaction and governance.",
  lessons: 8,
  hours: 15,
  skills: ["ChatGPT 4o", "Google Gemini 1.5 Pro", "NotebookLM", "Prompt Engineering", "Executive Memo Drafting", "Meeting Extraction", "Assertion-Evidence Decks", "Enterprise AI Governance"],
  enrolledCount: 2340,
  rating: 4.98,
  modules: [
    {
      title: "Module 1: Prompt Engineering & Cognitive LLM Architecture",
      description: "Master the 5-part prompt framework, Chain-of-Thought (CoT) reasoning, and prompt chaining for multi-step executive tasks.",
      duration: "3h 30m",
      exercisesCount: 4,
      lessons: [
        { slug: "prompt-engineering-foundations", title: "1.1 Prompt Engineering Foundations & Cognitive LLM Architecture", duration: "30m", type: "simulation", xp: 60 },
        { slug: "chatgpt-advanced-reasoning", title: "1.2 Advanced Reasoning & Multi-Step Executive Problem Solving", duration: "35m", type: "assessment", xp: 70 }
      ]
    },
    {
      title: "Module 2: Grounded Enterprise Research with Gemini & NotebookLM",
      description: "Perform zero-hallucination audits of 150-page annual reports, earnings calls, and regulatory circulars using Gemini and NotebookLM.",
      duration: "3h 30m",
      exercisesCount: 4,
      lessons: [
        { slug: "gemini-deep-research-synthesis", title: "1.3 Gemini & Deep Research: Synthesizing Multi-Source Reports", duration: "35m", type: "video", xp: 65 },
        { slug: "notebooklm-document-forensics", title: "1.4 NotebookLM & Document Forensics: Zero-Hallucination Citations", duration: "30m", type: "simulation", xp: 70 }
      ]
    },
    {
      title: "Module 3: Executive Document Writing & Meeting Accountability",
      description: "Draft BLUF boardroom memos, 1-page briefing papers, and convert messy meeting transcripts into RACI-structured action item tables.",
      duration: "4h 00m",
      exercisesCount: 4,
      lessons: [
        { slug: "ai-document-writing-memos", title: "1.5 Executive Document Writing: Boardroom Memos & Briefing Papers", duration: "40m", type: "assessment", xp: 75 },
        { slug: "ai-meeting-notes-action-items", title: "1.6 Meeting Summaries & Automated Action Item Extraction", duration: "30m", type: "simulation", xp: 65 }
      ]
    },
    {
      title: "Module 4: Presentation Engineering & Enterprise AI Governance",
      description: "Engineer assertion-evidence slide structures, reduce cognitive load, and enforce PII redaction and enterprise data privacy standards.",
      duration: "4h 00m",
      exercisesCount: 4,
      lessons: [
        { slug: "ai-executive-presentation-deck", title: "1.7 Presentation Engineering: Rapid Deck Outlines & Visual Structures", duration: "40m", type: "video", xp: 80 },
        { slug: "ai-office-copilot-governance", title: "1.8 Enterprise AI Governance, Data Privacy & Prompt Redaction", duration: "35m", type: "assessment", xp: 85 }
      ]
    }
  ]
};

export const SQL_BUSINESS_DATA_ANALYTICS_COURSE: CourseItem = {
  slug: "sql-business-data-analytics",
  pathSlug: "enterprise-data-analyst",
  title: "SQL & Business Data Analytics",
  subtitle: "PostgreSQL, Relational Joins, Window Functions & Commercial Metrics",
  description: "Query and analyze relational enterprise data without corruption. Master query execution order, Cartesian fan-out prevention, defensive NULL handling, CTE pipelines, window functions, and financial aging bucket calculations.",
  lessons: 6,
  hours: 20,
  skills: ["PostgreSQL 16", "Relational Algebra", "Join Hygiene", "Window Functions", "CTEs", "NULLIF Defensive Shield", "Commercial Ledger Analysis"],
  enrolledCount: 1850,
  rating: 4.97,
  modules: [
    {
      title: "Module 1: Query Execution Order & Filtering Discipline",
      description: "Understand logical query processing, defensive NULL handling, and prevent Cartesian row multiplication in joins.",
      duration: "6h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "sql-business-query-foundations", title: "4.1 Relational SQL Foundations: SELECT, WHERE & Business Filters", duration: "35m", type: "video", xp: 60 },
        { slug: "sql-multi-table-joins-hygiene", title: "4.2 Relational Join Hygiene: Preventing Cartesian Duplication", duration: "40m", type: "simulation", xp: 70 }
      ]
    },
    {
      title: "Module 2: KPI Aggregations & Analytical Window Functions",
      description: "Calculate commercial margins with NULLIF shields, compute running YTD totals, and evaluate top-N performance with window functions.",
      duration: "7h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "sql-aggregations-grouping-kpis", title: "4.3 Aggregations & Business KPIs: GROUP BY, HAVING & Rolling Sums", duration: "40m", type: "assessment", xp: 65 },
        { slug: "sql-window-functions-analytics", title: "4.4 Window Functions for Commercial Analytics: PARTITION BY & RANK", duration: "45m", type: "simulation", xp: 80 }
      ]
    },
    {
      title: "Module 3: Modular CTE Pipelines & Real-World Data Extraction",
      description: "Structure complex transformations into auditable CTE pipelines and solve real-world commercial margin leakage cases.",
      duration: "7h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "sql-ctes-subqueries-pipeline", title: "4.5 Modular CTE Pipelines: Structuring Complex Transformations", duration: "40m", type: "video", xp: 75 },
        { slug: "sql-postgresql-data-extraction", title: "4.6 PostgreSQL Data Extraction & Business Problem Solving", duration: "45m", type: "assessment", xp: 85 }
      ]
    }
  ]
};

export const PROJECT_MANAGEMENT_OPERATIONS_COURSE: CourseItem = {
  slug: "project-management-business-operations",
  pathSlug: "corporate-career-accelerator",
  title: "Project Management & Business Operations",
  subtitle: "Project Planning, SOPs, BPMN Workflow Mapping, KPIs & Risk Mitigation",
  description: "Drive corporate initiatives from charter to operational execution. Master 1-page Project Charters, 100% WBS scoping, BPMN 2.0 cross-functional swimlanes, cascading OKRs, 5x5 Risk Registers, TARA response strategies, and Kaizen continuous improvement.",
  lessons: 6,
  hours: 18,
  skills: ["Project Charter", "WBS Scoping", "BPMN 2.0 Mapping", "SOP Documentation", "Cascading OKRs", "5x5 Risk Matrix", "TARA Strategies", "PDCA Kaizen"],
  enrolledCount: 1420,
  rating: 4.95,
  modules: [
    {
      title: "Module 1: Project Scoping, Charters & WBS Architecture",
      description: "Define project boundaries, prevent scope creep with the 100% rule, and map operational handoffs using BPMN swimlanes.",
      duration: "6h 00m",
      exercisesCount: 5,
      lessons: [
        { slug: "pm-charter-scoping-wbs", title: "7.1 Project Charter, Scoping & Work Breakdown Structure (WBS)", duration: "35m", type: "simulation", xp: 60 },
        { slug: "pm-sop-workflow-mapping", title: "7.2 Standard Operating Procedures (SOP) & BPMN Workflow Mapping", duration: "40m", type: "assessment", xp: 70 }
      ]
    },
    {
      title: "Module 2: Operational Governance, OKRs & Risk Mitigation",
      description: "Cascade company OKRs down to team SLAs and govern project threats using the 5x5 Risk Matrix and TARA framework.",
      duration: "6h 00m",
      exercisesCount: 5,
      lessons: [
        { slug: "pm-kpi-governance-okrs", title: "7.3 Operational KPI Governance, Cascading OKRs & SLA Tracking", duration: "35m", type: "video", xp: 65 },
        { slug: "pm-risk-matrix-mitigation", title: "7.4 Risk Matrix Modeling, Contingency & Mitigation Registers", duration: "40m", type: "simulation", xp: 70 }
      ]
    },
    {
      title: "Module 3: Agile Cross-Functional Execution & Kaizen Loops",
      description: "Lead 15-minute operational standups, clear organizational roadblocks, and eliminate process waste using Kaizen PDCA loops.",
      duration: "6h 00m",
      exercisesCount: 5,
      lessons: [
        { slug: "pm-cross-functional-execution", title: "7.5 Cross-Functional Project Execution, Standups & Milestones", duration: "35m", type: "video", xp: 75 },
        { slug: "pm-process-improvement-kaizen", title: "7.6 Continuous Process Improvement: Kaizen & Root Cause Loops", duration: "40m", type: "assessment", xp: 80 }
      ]
    }
  ]
};

export const CORPORATE_COMMUNICATION_COURSE: CourseItem = {
  slug: "corporate-communication-executive-presentation",
  pathSlug: "corporate-career-accelerator",
  title: "Corporate Communication & Executive Presentation",
  subtitle: "High-Impact Emails, The Pyramid Principle, PowerPoint Storytelling & Boardroom Defense",
  description: "Communicate with authority across corporate hierarchies. Master 30-second inbox email formulas, the Minto Pyramid Principle top-down memos, Edward Tufte's Data-Ink ratio, meeting facilitation with parking lots, managing up, and PREP boardroom Q&A defense.",
  lessons: 6,
  hours: 18,
  skills: ["Executive Email Formulas", "The Minto Pyramid Principle", "BLUF Structure", "Assertion-Evidence Slides", "Data-Ink Ratio", "Meeting Facilitation", "Nemawashi Pre-Wiring", "PREP Q&A Defense"],
  enrolledCount: 1980,
  rating: 4.96,
  modules: [
    {
      title: "Module 1: High-Impact Writing & Top-Down Executive Structure",
      description: "Write executive emails that get opened and acted on, and structure corporate memos using Barbara Minto's Pyramid Principle.",
      duration: "6h 00m",
      exercisesCount: 5,
      lessons: [
        { slug: "corp-comm-email-etiquette", title: "8.1 High-Impact Corporate Email: Clarity, Tone & Action Lines", duration: "30m", type: "simulation", xp: 60 },
        { slug: "corp-comm-pyramid-principle", title: "8.2 The Minto Pyramid Principle: Top-Down Business Writing", duration: "40m", type: "assessment", xp: 75 }
      ]
    },
    {
      title: "Module 2: PowerPoint Visual Storytelling & Meeting Facilitation",
      description: "Eliminate frankendecks with assertion-evidence slide structures, maximize data-ink ratios, and lead efficient meetings.",
      duration: "6h 00m",
      exercisesCount: 5,
      lessons: [
        { slug: "corp-comm-presentation-storytelling", title: "8.3 PowerPoint Storytelling: Cognitive Load & Layout Hierarchy", duration: "45m", type: "video", xp: 75 },
        { slug: "corp-comm-meeting-etiquette", title: "8.4 Corporate Meeting Etiquette: Agendas, Facilitation & Minutes", duration: "30m", type: "simulation", xp: 65 }
      ]
    },
    {
      title: "Module 3: Managing Up & Boardroom Defense",
      description: "Align with executive leadership through pre-wiring (Nemawashi) and defend technical proposals with the PREP framework.",
      duration: "6h 00m",
      exercisesCount: 5,
      lessons: [
        { slug: "corp-comm-stakeholder-alignment", title: "8.5 Managing Up & Cross-Functional Stakeholder Alignment", duration: "35m", type: "video", xp: 70 },
        { slug: "corp-comm-boardroom-defense", title: "8.6 Executive Presence, Objection Handling & High-Stakes Q&A", duration: "45m", type: "assessment", xp: 85 }
      ]
    }
  ]
};

export const BUSINESS_ANALYSIS_STRATEGY_COURSE: CourseItem = {
  slug: "business-analysis-strategy-case-solving",
  pathSlug: "corporate-career-accelerator",
  title: "Business Analysis, Strategy & Case Solving",
  subtitle: "Problem Structuring, MECE Issue Trees, Market Sizing, Margin Drivers & Case Cracking",
  description: "Deconstruct ambiguous enterprise challenges like top management consultants. Master MECE issue tree decomposition, Fermi market sizing, Porter's Five Forces in emerging markets, P&L margin cascades, Ishikawa 5-Whys forensics, and C-suite case interview presentations.",
  lessons: 6,
  hours: 20,
  skills: ["MECE Issue Trees", "Fermi Market Sizing", "Porter's 5 Forces", "P&L Margin Cascades", "EBITDA Deconstruction", "5-Whys & Fishbone", "Pareto 80/20", "Case Presentation"],
  enrolledCount: 1720,
  rating: 4.97,
  modules: [
    {
      title: "Module 1: Problem Structuring & Market Sizing",
      description: "Deconstruct complex business problems into MECE issue trees and perform Fermi market-sizing calculations under interview pressure.",
      duration: "6h 30m",
      exercisesCount: 5,
      lessons: [
        { slug: "ba-problem-structuring-mece", title: "9.1 Business Problem Structuring: MECE Frameworks & Trees", duration: "35m", type: "simulation", xp: 70 },
        { slug: "ba-market-sizing-fermi", title: "9.2 Market Sizing & Fermi Estimation for Corporate Strategy", duration: "40m", type: "assessment", xp: 75 }
      ]
    },
    {
      title: "Module 2: Industry Dynamics & P&L Margin Cascades",
      description: "Evaluate industry moats using Porter's Five Forces and trace enterprise revenue down through the full margin cascade to EBITDA.",
      duration: "6h 30m",
      exercisesCount: 5,
      lessons: [
        { slug: "ba-competitor-industry-forces", title: "9.3 Competitor Forensics & Porter's 5 Forces in Local Markets", duration: "35m", type: "video", xp: 70 },
        { slug: "ba-financial-drivers-margins", title: "9.4 Deconstructing P&L Drivers: Gross Margin, Contribution & EBITDA", duration: "45m", type: "simulation", xp: 80 }
      ]
    },
    {
      title: "Module 3: Root-Cause Forensics & Executive Case Defense",
      description: "Distinguish symptoms from causes using 5-Whys and Fishbone diagrams, and present decisive recommendations to C-suite panels.",
      duration: "7h 00m",
      exercisesCount: 5,
      lessons: [
        { slug: "ba-root-cause-fishbone", title: "9.5 Root-Cause Forensics: 5-Whys, Fishbone & Pareto Analysis", duration: "40m", type: "assessment", xp: 75 },
        { slug: "ba-case-interview-synthesis", title: "9.6 Case Cracking Synthesis: Structuring C-Suite Trainee Recommendations", duration: "45m", type: "simulation", xp: 90 }
      ]
    }
  ]
};
`;

// Insert the new courses right before export const ALL_PATHS
if (!content.includes('AI_WORKPLACE_PROFESSIONAL_COURSE')) {
  content = content.replace('export const ALL_PATHS: Record<string, LearningPathItem> = {', newCoursesCode + '\nexport const ALL_PATHS: Record<string, LearningPathItem> = {');
}

// 3. Insert the 4 new Learning Paths into ALL_PATHS
const fourLearningPaths = `  // ═══════════════════════════════════════════════════════════════
  // INSYT CORPORATE 4 FLAGSHIP EMPLOYABILITY LEARNING PATHS
  // ═══════════════════════════════════════════════════════════════
  "ai-workplace-professional": {
    slug: "ai-workplace-professional",
    title: "AI Workplace Professional",
    subtitle: "ChatGPT, Gemini, Deep Research & Executive Corporate Communication",
    category: "tech",
    description: "Dual-pillar masterclass combining AI workplace productivity (ChatGPT, Gemini, NotebookLM) with high-impact corporate writing, executive presentation decks, and boardroom communication.",
    gradient: "linear-gradient(135deg, #083344 0%, #155e75 50%, #06b6d4 100%)",
    icon: "Bot",
    students: 2840,
    rating: 4.98,
    skills: ["ChatGPT 4o", "Google Gemini 1.5 Pro", "NotebookLM", "Prompt Engineering", "Executive Memos", "Pyramid Principle", "Assertion-Evidence Decks", "Corporate Email", "AI Governance"],
    capstoneDeliverable: "Executive Strategy Memo, Assertion-Evidence Deck & Multimodal AI Research Dossier",
    courses: [AI_WORKPLACE_PROFESSIONAL_COURSE, CORPORATE_COMMUNICATION_COURSE]
  },
  "enterprise-data-analyst": {
    slug: "enterprise-data-analyst",
    title: "Enterprise Data Analyst",
    subtitle: "Excel Financial Modeling, PostgreSQL, Power BI & Enterprise Python",
    category: "analytics",
    description: "The complete corporate data analyst operating system. Master FAST financial modeling in Excel, relational PostgreSQL analytics, Kimball Star Schema Power BI dashboards, and unattended Python automation pipelines.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #0284c7 50%, #059669 100%)",
    icon: "BarChart3",
    students: 3450,
    rating: 4.99,
    skills: ["Integrated 3-Statement Modeling", "PVM Variance Bridges", "PostgreSQL", "Power Query ETL", "Kimball Star Schema", "Advanced DAX", "Python 3.12", "pandas", "DuckDB"],
    capstoneDeliverable: "FMCG Commercial Performance Operating Model & Apex Enterprise BI Boardroom Defense",
    courses: [
      // Excel Financial Modeling is also exported in corporate-analyst
      ENTERPRISE_BI_COURSE,
      SQL_BUSINESS_DATA_ANALYTICS_COURSE,
      ENTERPRISE_PYTHON_COURSE
    ]
  },
  "business-automation-specialist": {
    slug: "business-automation-specialist",
    title: "Business Automation Specialist",
    subtitle: "Workplace AI, Relational SQL & Enterprise Workflow Automation with n8n",
    category: "tech",
    description: "Design, deploy, and govern fault-tolerant corporate automation systems. Orchestrate multi-system workflows with n8n and Power Automate, execute relational SQL queries, and deploy bounded Document AI.",
    gradient: "linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #4338ca 100%)",
    icon: "Workflow",
    students: 2190,
    rating: 4.98,
    skills: ["n8n Orchestration", "Power Automate RPA", "Document AI", "REST APIs", "Idempotency & DLQ", "SQL Querying", "ChatGPT Enterprise Copilots"],
    capstoneDeliverable: "Nexus Global Logistics Multi-System Automation & CEAS Production Defense",
    courses: [AI_WORKPLACE_PROFESSIONAL_COURSE, SQL_BUSINESS_DATA_ANALYTICS_COURSE, ENTERPRISE_AUTOMATION_COURSE]
  },
  "corporate-career-accelerator": {
    slug: "corporate-career-accelerator",
    title: "Corporate Career Accelerator",
    subtitle: "Project Management, Executive Communication, Strategy & MTO Recruitment Mastery",
    category: "career",
    description: "Comprehensive career launchpad engineered for final-year students, fresh graduates, and MTO applicants. Master project management, executive communication, MECE consulting cases, psychometric tests, and assessment center simulations.",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #2563eb 100%)",
    icon: "Target",
    students: 4120,
    rating: 4.97,
    skills: ["Project Charters & WBS", "BPMN 2.0 Mapping", "Pyramid Principle", "MECE Issue Trees", "Fermi Market Sizing", "Quantitative Speed Drills", "STAR Interviewing", "Assessment Centers"],
    capstoneDeliverable: "MNC Assessment Center Turnaround Case Defense & Proctored Interview Portfolio",
    courses: [
      PROJECT_MANAGEMENT_OPERATIONS_COURSE,
      CORPORATE_COMMUNICATION_COURSE,
      BUSINESS_ANALYSIS_STRATEGY_COURSE
    ]
  },
  "ai-for-work": {
    slug: "ai-for-work",
    title: "AI Workplace Professional (AI for Work)",
    subtitle: "ChatGPT, Gemini, Deep Research & Daily Corporate Workflows",
    category: "tech",
    description: "Master applied generative AI for modern corporate operations: ChatGPT, Gemini, NotebookLM, document drafting, presentation architecture, and enterprise AI governance.",
    gradient: "linear-gradient(135deg, #083344 0%, #155e75 50%, #06b6d4 100%)",
    icon: "Bot",
    students: 2840,
    rating: 4.98,
    skills: ["ChatGPT 4o", "Google Gemini 1.5 Pro", "NotebookLM", "Prompt Engineering", "Executive Memos", "Pyramid Principle", "Assertion-Evidence Decks", "Corporate Email", "AI Governance"],
    capstoneDeliverable: "Executive Strategy Memo, Assertion-Evidence Deck & Multimodal AI Research Dossier",
    courses: [AI_WORKPLACE_PROFESSIONAL_COURSE, CORPORATE_COMMUNICATION_COURSE]
  },
`;

if (!content.includes('"ai-workplace-professional":')) {
  content = content.replace('export const ALL_PATHS: Record<string, LearningPathItem> = {', 'export const ALL_PATHS: Record<string, LearningPathItem> = {\n' + fourLearningPaths);
}

// 4. Update getCourseBySlug aliases
const updatedGetCourse = `export function getCourseBySlug(courseSlug: string): CourseItem | null {
  for (const pathKey in ALL_PATHS) {
    const path = ALL_PATHS[pathKey];
    const found = path.courses.find(
      (c) =>
        c.slug === courseSlug ||
        (courseSlug === "enterprise-business-intelligence-powerbi-sql" &&
          c.slug === "enterprise-business-intelligence-power-bi-sql-corporate-analysts") ||
        (courseSlug === "enterprise-business-intelligence-power-bi-sql-corporate-analysts" &&
          c.slug === "enterprise-business-intelligence-powerbi-sql") ||
        (courseSlug === "ai-for-work" && c.slug === "ai-powered-workplace-professional") ||
        (courseSlug === "excel-corporate" && c.slug === "corporate-financial-commercial-modeling-excel") ||
        (courseSlug === "corporate-mto" && c.slug === "mto-recruitment-mastery")
    );
    if (found) return found;
  }
  return null;
}`;

content = content.replace(/export function getCourseBySlug[\s\S]*?return null;\s*\}/, updatedGetCourse);

fs.writeFileSync(coursesPath, content, 'utf8');
console.log("[OK] Updated lib/data/courses.ts with Top 10 Curricula and 4 Flagship Learning Paths!");
