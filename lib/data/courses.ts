export interface CourseItem {
  slug: string;
  pathSlug: string;
  title: string;
  subtitle?: string;
  description: string;
  lessons: number;
  hours: number;
  lectureHours?: number;
  buildHours?: number;
  skills: string[];
  enrolledCount?: number;
  rating?: number;
  credential?: {
    designation: string;
    body: string;
    description: string;
    benchmark: string;
  };
  miniProjects?: {
    id: number;
    title: string;
    duration: string;
    description: string;
    deliverable: string;
  }[];
  capstoneOptions?: {
    id: number;
    title: string;
    industry: string;
    context: string;
    dataset: string;
    deliverables: string;
    careerAlignment: string;
  }[];
  pricingTiers?: {
    tier: string;
    name: string;
    target: string;
    priceBdt: number;
    priceUsd: number;
    features: string[];
  }[];
  assessmentTiers?: {
    tier: number;
    name: string;
    format: string;
    criteria: string;
  }[];
  capstoneProject?: {
    title: string;
    brief: string;
    deliverable: string;
    rubric: string[];
  };
  modules?: {
    title: string;
    pillar?: string;
    description: string;
    duration: string;
    exercisesCount: number;
    lessons: { slug: string; title: string; duration: string; type: "video" | "reading" | "simulation" | "assessment"; xp?: number }[];
  }[];
}

export interface LearningPathItem {
  slug: string;
  title: string;
  subtitle?: string;
  category: "analytics" | "career" | "tech" | "strategy" | "comm" | "finance" | "testprep" | "media";
  description: string;
  gradient: string;
  icon: string;
  students: number;
  rating: number;
  courses: CourseItem[];
  whatYouWillLearn?: string[];
  skills?: string[];
  capstoneDeliverable?: string;
  uniqueFeature?: string;
  uniqueFeatureDesc?: string;
  modules?: any[];
}

export const ENTERPRISE_PYTHON_COURSE: CourseItem = {
  slug: "enterprise-python-corporate-analytics-process-automation",
  pathSlug: "corporate-analyst",
  title: "Enterprise Python for Corporate Analytics & Process Automation",
  subtitle: "Turn messy business data into automated reports, reliable data pipelines, and actionable corporate intelligence.",
  description: "Turn messy business data into automated reports, reliable data pipelines, and actionable corporate intelligence. Master Python 3.12, pandas, openpyxl, SQLAlchemy, DuckDB, requests, and logging to automate repetitive spreadsheet operations, reconcile commercial data across ERP and APIs, and build unattended corporate reporting pipelines.",
  lessons: 40,
  hours: 80,
  lectureHours: 40,
  buildHours: 40,
  skills: [
    "Python 3.12+ Data Engineering",
    "pandas & NumPy Tabular Wrangling",
    "openpyxl & XlsxWriter Automation",
    "SQLAlchemy & Push-Down Queries",
    "DuckDB Local High-Speed Analytics",
    "REST APIs & JSON Normalization",
    "Defensive Processing & Exception Handling",
    "Enterprise Logging & Task Scheduling",
    "Financial Control Totals & Reconciliation",
    "Executive Management Memos"
  ],
  enrolledCount: 980,
  rating: 4.99,
  credential: {
    designation: "Certified Corporate Data Automation Specialist (CCDAS)",
    body: "INSYT Corporate Technical Accreditation",
    description: "Rigorous assessment-verified credential certifying production-grade Python data pipeline architecture, auditable reconciliation, and C-suite reporting automation.",
    benchmark: "W3C / Enterprise Data Governance & Automation Standard"
  },
  pricingTiers: [
    {
      tier: "Tier 1",
      name: "Self-Paced Track",
      target: "University Students & Self-Directed Learners",
      priceBdt: 8500,
      priceUsd: 72,
      features: [
        "Full access to all 10 modules and 40 instructional masterclasses",
        "Downloadable starter datasets (.csv, .xlsx, .db, .txt)",
        "Automated end-of-lesson knowledge checks & playground labs",
        "Standard Certificate of Completion"
      ]
    },
    {
      tier: "Tier 2",
      name: "Mentored Cohort Track (Recommended)",
      target: "Business Analysts, FP&A Specialists & Junior Data Engineers",
      priceBdt: 16500,
      priceUsd: 139,
      features: [
        "Everything in Self-Paced Track",
        "Weekly instructor-led practical code reviews & architecture clinics",
        "Automated grading across all 10 weekly labs & 5 mini-projects",
        "Verified Career Passport badge and GitHub repository audit",
        "Direct indexing in INSYT Corporate Hiring Partner Network"
      ]
    },
    {
      tier: "Tier 3",
      name: "Executive Career Track",
      target: "Senior Analysts, Commercial Managers & Department Leads",
      priceBdt: 32000,
      priceUsd: 270,
      features: [
        "Everything in Mentored Cohort Track",
        "3-Hour Proctored Recruiter Technical Assessment simulation with private rubric feedback",
        "1-on-1 personalized portfolio defense and executive memo coaching",
        "Private enterprise capstone defense before corporate analytics leaders",
        "Guaranteed interview referrals to MNCs, Commercial Banks & Conglomerates"
      ]
    }
  ],
  assessmentTiers: [
    { tier: 1, name: "Lesson Checks (80% Benchmark)", format: "Parsons code reconstruction, debugging challenges & scenario questions", criteria: "80% passing threshold with unlimited retakes and immediate diagnostic explanations" },
    { tier: 2, name: "Weekly Practical Assignments (Weeks 1-9)", format: "Applied script development evaluated against automated test suites", criteria: "75% output accuracy against hidden test suites (one 72-hour retake permitted)" },
    { tier: 3, name: "Script-Quality Audits (Weeks 2, 4, 6, 8)", format: "Automated PEP 8, logging standards, exception handling, and credential safety review", criteria: "80% score; mandatory resubmission if hardcoded credentials or unhandled crashes are present" },
    { tier: 4, name: "Industry Capstone Defense", format: "End-to-end pipeline deliverable, formatted Excel workbook, and executive memo", criteria: "Evaluated against 5-dimension enterprise rubric by senior corporate analytics practitioners" },
    { tier: 5, name: "Final 3-Hour Recruiter Simulation", format: "Live timed enterprise challenge: Ingestion, SQL/API join, and C-suite reporting under deadline", criteria: "75% composite score across ingestion (25%), reconciliation (20%), Excel (20%), logging (15%), memo (20%)" }
  ],
  miniProjects: [
    {
      id: 1,
      title: "Vendor Payment Normalization & Anomaly Filter",
      duration: "8 Hours",
      description: "Build a raw text parsing engine for raw_vendor_payments.txt with multi-delimiter splitting, vendor normalization, routing lookups, and control total reconciliation.",
      deliverable: "Production script producing cleared disbursements CSV and quarantined exception log."
    },
    {
      id: 2,
      title: "Distributed Quarterly File Discovery & Consolidation Engine",
      duration: "8 Hours",
      description: "Scan nested corporate folders across 48 quarterly CSVs using pathlib.glob(), detect missing depot reports, and build a unified reporting table.",
      deliverable: "Directory scanner script and consolidated multi-region CSV with validation metadata."
    },
    {
      id: 3,
      title: "Payroll & Workforce Data Hygiene Pipeline",
      duration: "8 Hours",
      description: "Normalize workforce_master.xlsx with multi-tier title banners, irregular headers, dirty date formats, and negative payroll adjustments.",
      deliverable: "Cleaned analytical dataframe and reconciliation audit report showing zero dropped value."
    },
    {
      id: 4,
      title: "Commercial Discount Reconciliation & Margin Leakage Engine",
      duration: "8 Hours",
      description: "Perform left joins on 250,000 commercial invoices against discount matrices, detect orphan keys and duplicate key multiplications, and isolate pricing leakage.",
      deliverable: "Automated relational audit pipeline with margin leakage report by region."
    },
    {
      id: 5,
      title: "Boardroom Variance & Financial Template Injection Engine",
      duration: "8 Hours",
      description: "Extract trial balances, compute period variances, and inject figures into pre-formatted Excel reporting templates using openpyxl without altering existing formulas.",
      deliverable: "Multi-tab board reporting workbook with accounting number formatting and frozen panes."
    }
  ],
  capstoneOptions: [
    {
      id: 1,
      title: "Capstone A: FMCG Distributor Performance & Incentive Automation",
      industry: "Fast-Moving Consumer Goods (MNC / Regional)",
      context: "A consumer-goods company receives primary billing from ERP and secondary sales spreadsheets from 30 distributor depots with irregular headers and missing codes.",
      dataset: "Primary billing CSV (180,000 rows), regional distributor workbooks, promotional discount matrix, SKU mapping table, distributor reference data.",
      deliverables: "End-to-end Python pipeline, styled Excel incentive workbook, exception audit report, execution log, and 2-page executive recommendation memo.",
      careerAlignment: "Commercial Finance Analyst, Sales Operations Specialist, FMCG Management Trainee (Unilever, Marico, BAT, Nestlé)"
    },
    {
      id: 2,
      title: "Capstone B: Multi-Entity FP&A Consolidation & Variance Engine",
      industry: "Diversified Conglomerate (HoldCo / Subsidiaries)",
      context: "A corporate holding company consolidates monthly ledger extracts from 4 subsidiaries with distinct legacy chart-of-accounts coding conventions.",
      dataset: "Four subsidiary Excel/CSV ledgers, annual budget model, corporate chart of accounts, cross-entity account mapping table.",
      deliverables: "Consolidation script, formatted multi-tab reporting workbook, unmapped account exception log, structured execution logs, and executive briefing memo.",
      careerAlignment: "FP&A Analyst, Group Financial Controller, Corporate Planning Associate (Square, Beximco, PRAN-RFL, Akij)"
    },
    {
      id: 3,
      title: "Capstone C: Retail Banking Multi-Channel Settlement & Break Audit",
      industry: "Commercial Banking & Mobile Financial Services (MFS)",
      context: "A banking operations team reconciles end-of-day settlements across core banking systems, digital payment gateways (bKash/Nagad), and clearing network records.",
      dataset: "Synthetic core settlement CSV (500,000 rows), payment gateway JSON feeds, clearing text extracts, merchant reference lookup tables.",
      deliverables: "Automated reconciliation script, audit-ready Excel break sheet, execution log, and risk mitigation executive memo.",
      careerAlignment: "Banking Operations Analyst, FinTech Settlement Specialist, Internal Audit Associate (BRAC Bank, bKash, Standard Chartered, City Bank)"
    }
  ],
  capstoneProject: {
    title: "Recruiter Job Simulation: 3-Hour Enterprise Analytics Practical",
    brief: "Management requires a same-day reconciliation of regional commercial sales across an ERP database, distributor workbooks, and a logistics API. You have 3 hours to ingest multi-source data, reconcile joins, generate a board-ready Excel workbook, write execution logs, and author an executive memo.",
    deliverable: "Production Python pipeline (.py), formatted Excel report (.xlsx), structured execution log (.log), and 2-page executive business memo (.md / .pdf).",
    rubric: [
      "Ingestion & Data Integrity (25%): Schema validation, missing value handling, control totals, zero silent loss.",
      "Relational Reconciliation (20%): Clean joins, orphan key detection, prevention of Cartesian row multiplication.",
      "Excel Formatting & Output Quality (20%): Professional styling, accounting number formats, frozen panes, zero cell errors.",
      "Script Engineering & Logging (15%): Modular functions, type hints, specific exception handling, structured timestamped logs.",
      "Executive Business Memo (20%): Clear answers to What happened, Why, Financial impact, and Actionable next steps."
    ]
  },
  modules: [
    {
      title: "Module 1: Python Foundations for Business Data",
      description: "Master useful Python fundamentals: string cleaning, vendor ID validation, dictionary mapping, and input-processing-output flow.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-1-1-corporate-productivity", title: "1.1 Python as a Corporate Productivity Tool", duration: "60m", type: "video", xp: 60 },
        { slug: "py-1-2-types-collections", title: "1.2 Types, Collections, and Transaction Records", duration: "60m", type: "simulation", xp: 65 },
        { slug: "py-1-3-cleaning-text", title: "1.3 Cleaning Inconsistent Business Text", duration: "60m", type: "reading", xp: 65 },
        { slug: "py-1-4-mapping-validation", title: "1.4 Dictionary Mapping and Payment Validation", duration: "60m", type: "assessment", xp: 75 }
      ]
    },
    {
      title: "Module 2: File Systems, Functions & Error Handling",
      description: "Build maintainable scripts that discover files across nested folders, process records cleanly, and handle file locks defensively.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-2-1-paths-pathlib", title: "2.1 Corporate File Systems and Reliable Paths", duration: "60m", type: "video", xp: 70 },
        { slug: "py-2-2-file-discovery", title: "2.2 Discovering and Consolidating Business Files", duration: "60m", type: "simulation", xp: 70 },
        { slug: "py-2-3-functions-documentation", title: "2.3 Functions, Documentation, and Reusable Logic", duration: "60m", type: "reading", xp: 70 },
        { slug: "py-2-4-defensive-processing", title: "2.4 Defensive File Processing", duration: "60m", type: "assessment", xp: 75 }
      ]
    },
    {
      title: "Module 3: Tabular Data Mastery with pandas",
      description: "Ingest messy ERP spreadsheets, clean multi-tier headers, standardize dirty dates, and enforce financial control totals.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-3-1-inspecting-files", title: "3.1 Inspecting Messy Corporate Files", duration: "60m", type: "video", xp: 70 },
        { slug: "py-3-2-types-dates-nulls", title: "3.2 Data Types, Dates, and Missing Values", duration: "60m", type: "simulation", xp: 70 },
        { slug: "py-3-3-cleaning-integrity", title: "3.3 Data Cleaning Without Corrupting Totals", duration: "60m", type: "reading", xp: 75 },
        { slug: "py-3-4-cleaning-pipeline", title: "3.4 A Repeatable Data-Cleaning Pipeline", duration: "60m", type: "assessment", xp: 80 }
      ]
    },
    {
      title: "Module 4: Relational Merges, Grouping & Reshaping",
      description: "Execute robust relational merges, detect duplicate key row multiplications, unpivot monthly matrices, and compute division KPIs.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-4-1-relational-joins", title: "4.1 Joins and Business Relationships", duration: "60m", type: "video", xp: 75 },
        { slug: "py-4-2-keys-multiplication", title: "4.2 Detecting Broken Keys and Merge Multiplication", duration: "60m", type: "simulation", xp: 75 },
        { slug: "py-4-3-grouped-analysis", title: "4.3 Grouped Analysis and Business KPIs", duration: "60m", type: "reading", xp: 75 },
        { slug: "py-4-4-pivoting-reshaping", title: "4.4 Pivoting, Reshaping, and Commercial Reconciliation", duration: "60m", type: "assessment", xp: 80 }
      ]
    },
    {
      title: "Module 5: Advanced Excel Automation",
      description: "Inject numbers into existing corporate reporting templates with openpyxl and build polished, styled workbooks with XlsxWriter.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-5-1-excel-delivery-layer", title: "5.1 Excel as the Corporate Delivery Layer", duration: "60m", type: "video", xp: 70 },
        { slug: "py-5-2-openpyxl-templates", title: "5.2 Updating Existing Templates with openpyxl", duration: "60m", type: "simulation", xp: 75 },
        { slug: "py-5-3-xlsxwriter-styling", title: "5.3 Generating Styled Workbooks with XlsxWriter", duration: "60m", type: "reading", xp: 80 },
        { slug: "py-5-4-financial-reporting-validation", title: "5.4 Financial Reporting and Output Validation", duration: "60m", type: "assessment", xp: 80 }
      ]
    },
    {
      title: "Module 6: Relational Databases & SQL Integration",
      description: "Query enterprise relational databases with SQLAlchemy and DuckDB, applying push-down aggregations and parameterized security.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-6-1-sql-vs-python", title: "6.1 SQL and Python Have Different Jobs", duration: "60m", type: "video", xp: 70 },
        { slug: "py-6-2-sql-extraction", title: "6.2 Extracting Corporate Data with SQL", duration: "60m", type: "simulation", xp: 75 },
        { slug: "py-6-3-sqlalchemy-pandas", title: "6.3 Connecting Python to a Database", duration: "60m", type: "reading", xp: 80 },
        { slug: "py-6-4-duckdb-local-analytics", title: "6.4 DuckDB and Efficient Local Analytics", duration: "60m", type: "assessment", xp: 80 }
      ]
    },
    {
      title: "Module 7: Consuming REST APIs & Cloud Feeds",
      description: "Retrieve cloud operational data via REST APIs, handle cursor pagination and rate limits, and flatten nested JSON into business tables.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-7-1-api-fundamentals", title: "7.1 API Fundamentals for Analysts", duration: "60m", type: "video", xp: 70 },
        { slug: "py-7-2-auth-security", title: "7.2 Authentication and Secure Requests", duration: "60m", type: "simulation", xp: 75 },
        { slug: "py-7-3-pagination-rate-limits", title: "7.3 Pagination, Rate Limits, and Resilient Retrieval", duration: "60m", type: "reading", xp: 80 },
        { slug: "py-7-4-flattening-json", title: "7.4 Flattening JSON into Business Tables", duration: "60m", type: "assessment", xp: 80 }
      ]
    },
    {
      title: "Module 8: Script Hardening, Logging & Scheduling",
      description: "Transition interactive scripts to unattended reporting jobs with structured logging, fail-fast schema checks, and scheduled triggers.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-8-1-enterprise-logging", title: "8.1 Logging Instead of Debugging with print Statements", duration: "60m", type: "video", xp: 70 },
        { slug: "py-8-2-config-credentials", title: "8.2 Configuration and Credential Management", duration: "60m", type: "simulation", xp: 75 },
        { slug: "py-8-3-validation-recovery", title: "8.3 Validation, Failures, and Recovery", duration: "60m", type: "reading", xp: 80 },
        { slug: "py-8-4-scheduling-monitoring", title: "8.4 Scheduling and Operational Monitoring", duration: "60m", type: "assessment", xp: 80 }
      ]
    },
    {
      title: "Module 9: Business Intelligence Integration",
      description: "Prepare high-performance data feeds for Power BI, define mathematically unambiguous KPI tables, and author executive memos.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-9-1-exploratory-analysis", title: "9.1 Exploratory Analysis Before Reporting", duration: "60m", type: "video", xp: 70 },
        { slug: "py-9-2-kpi-tables", title: "9.2 Building Business-Ready KPI Tables", duration: "60m", type: "simulation", xp: 75 },
        { slug: "py-9-3-bi-integration", title: "9.3 Python, Excel, and Power BI Integration", duration: "60m", type: "reading", xp: 80 },
        { slug: "py-9-4-management-recommendations", title: "9.4 From Analysis to Management Recommendations", duration: "60m", type: "assessment", xp: 85 }
      ]
    },
    {
      title: "Module 10: Job Simulation Capstone & Recruiter Test",
      description: "Execute the end-to-end recruiter simulation under deadline pressure: ingest multi-source data, build reports, and defend recommendations.",
      duration: "8h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "py-10-1-deconstructing-assignment", title: "10.1 Deconstructing an Enterprise Assignment", duration: "60m", type: "video", xp: 80 },
        { slug: "py-10-2-pipeline-design", title: "10.2 Designing the Pipeline", duration: "60m", type: "simulation", xp: 85 },
        { slug: "py-10-3-building-verifying", title: "10.3 Building and Verifying the Reporting Solution", duration: "60m", type: "reading", xp: 90 },
        { slug: "py-10-4-defending-analysis", title: "10.4 Defending the Analysis and Recommendation", duration: "60m", type: "assessment", xp: 100 }
      ]
    }
  ]
};

export const ENTERPRISE_AUTOMATION_COURSE: CourseItem = {
  slug: "applied-workplace-ai-enterprise-workflow-automation",
  pathSlug: "applied-ai-automation",
  title: "Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate",
  subtitle: "Design, build, secure, and measure enterprise workflows that eliminate repetitive work and deliver real business value.",
  description: "Transform manual business processes into resilient, automated enterprise workflows. Master n8n orchestration, Microsoft Power Automate Cloud, Power Automate Desktop (RPA), Microsoft Dataverse, and bounded Document AI to eliminate operational bottlenecks, handle errors gracefully, enforce governance, and defend measurable ROI.",
  lessons: 40,
  hours: 120,
  lectureHours: 50,
  buildHours: 70,
  skills: [
    "n8n Workflow Orchestration",
    "Power Automate Cloud Flows",
    "Power Automate Desktop RPA",
    "Microsoft Dataverse & Teams Approvals",
    "REST APIs, JSON & Webhook Security",
    "Document AI & Structured LLM Extraction",
    "Exponential Backoff & Dead-Letter Queues",
    "Enterprise DLP & Least-Privilege RBAC",
    "Automation ROI & Payback Financial Modeling",
    "Operational Runbooks & Incident Response"
  ],
  enrolledCount: 1240,
  rating: 4.98,
  credential: {
    designation: "CEAS",
    body: "INSYT Certified Enterprise Automation Specialist",
    description: "Proposed professional designation conferred upon successful verification of 6 Career Passport portfolio artifacts, 40 guided technical labs, and technical defense of the Nexus Global Logistics transformation.",
    benchmark: "W3C Enterprise Workflow Architecture Standards, Microsoft Power Platform Enterprise Governance, and ISO/IEC 25010 Software Quality Standards."
  },
  pricingTiers: [
    {
      tier: "tier_professional",
      name: "Professional Track",
      target: "Final-year students, operations analysts, and early-career automation specialists",
      priceBdt: 12500,
      priceUsd: 110,
      features: [
        "Complete 10-module curriculum (120 learning hours)",
        "40 guided hands-on lab exercises & diagnostic tasks",
        "Full access to interactive Workflow Canvas & API Playground",
        "Failure-driven debugging gym with 6 enterprise challenge categories",
        "Downloadable workflow JSON templates & synthetic datasets",
        "Cohort discussion community & peer code review"
      ]
    },
    {
      tier: "tier_immersion",
      name: "Career Immersion Track",
      target: "MTO candidates, senior process analysts, and automation consultants seeking CEAS credential",
      priceBdt: 22000,
      priceUsd: 195,
      features: [
        "Everything in Professional Track",
        "Comprehensive Nexus Global Logistics multi-week job simulation (150 synthetic documents)",
        "Faculty evaluation & verification of all 6 Career Passport portfolio artifacts",
        "Live 1-on-1 capstone oral technical defense panel with enterprise architects",
        "Official INSYT Certified Enterprise Automation Specialist (CEAS) digital credential",
        "Direct recruiter referral to multinational partner hiring pipelines"
      ]
    },
    {
      tier: "tier_enterprise",
      name: "Enterprise Team Cohort",
      target: "Corporate operations teams, shared service centers (SSC), and business transformation units",
      priceBdt: 180000,
      priceUsd: 1550,
      features: [
        "Dedicated cohort access for 8 to 12 corporate team members",
        "Customized enterprise use cases aligned with your corporate ERP and tenant infrastructure",
        "Private sandboxed tenant testing environment with tailored DLP policies",
        "Weekly live architecture reviews & custom runbook workshops",
        "Executive dashboard reporting on team skill competencies and ROI delivery"
      ]
    }
  ],
  assessmentTiers: [
    {
      tier: 1,
      name: "Lesson Checkpoint Drills",
      format: "Formative checks & interactive payload quizzes after each lesson",
      criteria: "80% passing threshold with detailed remediations and retake flow"
    },
    {
      tier: 2,
      name: "Guided Hands-On Labs",
      format: "40 scaffolded lab exercises across n8n, Power Automate, and API playgrounds",
      criteria: "Deterministic execution validation, payload matching, and edge-case verification"
    },
    {
      tier: 3,
      name: "Module Practical Deliverables",
      format: "10 substantive module assignments (SIPOC, workflow exports, JSON schemas, financial models)",
      criteria: "Rubric-based assessment evaluating rule determinism, schema integrity, and error handling"
    },
    {
      tier: 4,
      name: "Reliability & Security Code Review",
      format: "Audit of fault tolerance, idempotency keys, DLQ handling, and DLP boundaries",
      criteria: "Zero hardcoded secrets, verified exponential backoff, and non-duplicate side effects"
    },
    {
      tier: 5,
      name: "Nexus Job Simulation & Oral Defense",
      format: "Multi-week enterprise transformation capstone + 15-minute live technical defense panel",
      criteria: "Holistic evaluation across architecture, business outcome, security, failure recovery, and ROI defense"
    }
  ],
  capstoneOptions: [
    {
      id: 1,
      title: "Track A — Finance & Accounting: Multi-Source Invoice & Ledger Reconciliation Pipeline",
      industry: "Corporate Finance & Commercial Banking",
      context: "Finance clerks manually match emailed PDF invoices against purchase orders and bank statements, creating audit discrepancies and delayed closing cycles.",
      dataset: "Synthetic 3-way match packet: 80 multi-currency invoices, ERP purchase orders, and MT940 bank statement extracts.",
      deliverables: "BPMN process map, n8n webhook ingestion flow, bounded Document AI extractor, Teams variance approval flow, and reconciler runbook.",
      careerAlignment: "FP&A Automation Lead, Accounts Payable Specialist, Commercial Financial Analyst"
    },
    {
      id: 2,
      title: "Track B — Human Resources: Employee Onboarding Lifecycle Pipeline",
      industry: "Conglomerate HR & People Operations",
      context: "New-hire provisioning requires manual data entry across HRIS, Entra ID identity provisioning, IT service ticketing, and corporate communications.",
      dataset: "Synthetic candidate acceptance records, role-based hardware profiles, and department permission matrices.",
      deliverables: "Power Automate automated cloud flow, Dataverse candidate entity model, simulated IT ticket creation, and welcome notification engine.",
      careerAlignment: "HR Technology Specialist, People Operations Analyst, Digital Transformation Lead"
    },
    {
      id: 3,
      title: "Track C — Operations & Support: Critical Incident Triage & Escalation Engine",
      industry: "Telecommunications & Cloud Services",
      context: "Operations desk receives 1,200 unclassified support tickets daily, risking contractual SLA penalties for high-severity network incidents.",
      dataset: "Synthetic customer incident logs, SLA contract thresholds, and technician on-call schedule feeds.",
      deliverables: "Event-driven webhook listener, LLM ticket classification with strict JSON schema, P1 on-call pager escalation, and SLA breach dashboard.",
      careerAlignment: "Operations Manager, Incident Commander, Service Delivery Specialist"
    },
    {
      id: 4,
      title: "Track D — Revenue Operations: Inbound Lead Enrichment & CRM Synchronization Engine",
      industry: "B2B SaaS & Enterprise Technology",
      context: "Sales reps spend 15 hours weekly manually researching company firmographics, checking duplicates, and routing leads to account executives.",
      dataset: "Synthetic inbound lead stream, mock Clearbit/ZoomInfo enrichment API, and CRM account database.",
      deliverables: "Webhook ingestion flow, mock REST API enrichment pipeline, rule-based lead scoring model, duplicate detector, and CRM sync runner.",
      careerAlignment: "RevOps Analyst, Commercial Operations Lead, CRM Automation Specialist"
    }
  ],
  capstoneProject: {
    title: "Nexus Global Logistics: Multi-System Enterprise Automation Transformation",
    brief: "Act as the Lead Enterprise Automation Specialist at Nexus Global Logistics to eliminate manual friction, reduce $140,000 in quarterly demurrage penalties, and automate multi-source invoice reconciliation across Microsoft 365, internal PostgreSQL databases, and legacy Windows dispatch software.",
    deliverable: "6 comprehensive evaluated portfolio deliverables: Process Discovery Blueprint, n8n Ingestion Pipeline, Power Automate Reconciliation Flow, Document AI Extraction Engine, Operational Runbook, and Final Technical Defense.",
    rubric: [
      "Process Discovery: Complete SIPOC, As-Is/To-Be BPMN maps, and empirical baseline labor calculations",
      "Integration Engineering: Validated REST APIs, HMAC webhooks, and normalized JSON schemas without data loss",
      "Reliability & Fault Tolerance: Verified exponential backoff, idempotency keys, and dead-letter queue replay mechanisms",
      "Security & Governance: Strict DLP compliance, zero plaintext secrets, and least-privilege service principals",
      "Executive Financial Defense: Board-level ROI financial model, NPV sensitivity analysis, and recorded technical oral defense"
    ]
  },
  modules: [
    {
      title: "Module 1: Strategic Process Discovery & Business Value Mapping",
      description: "Diagnose business processes before selecting automation tools: master SIPOC scoping, BPMN 2.0 mapping, and calculate empirical baseline ROI models.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-1-1-automation-fundamentals", title: "1.1 Enterprise Automation Fundamentals & The Value Pipeline", duration: "60m", type: "video", xp: 80 },
        { slug: "auto-1-2-sipoc-discovery", title: "1.2 SIPOC Process Discovery & Boundary Definition", duration: "60m", type: "simulation", xp: 80 },
        { slug: "auto-1-3-bpmn-mapping", title: "1.3 BPMN 2.0 & As-Is vs To-Be Process Architecture", duration: "60m", type: "reading", xp: 85 },
        { slug: "auto-1-4-feasibility-roi", title: "1.4 Automation Feasibility Scoring & Baseline ROI Metrics", duration: "60m", type: "assessment", xp: 85 }
      ]
    },
    {
      title: "Module 2: Modern Integration Foundations: REST APIs, JSON & Webhooks",
      description: "Master the universal protocols of cloud integration: HTTP status codes, nested JSON schemas, OAuth 2.0 client credentials, and event-driven webhooks.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-2-1-rest-api-fundamentals", title: "2.1 HTTP & REST Architectural Fundamentals for Automation", duration: "60m", type: "video", xp: 85 },
        { slug: "auto-2-2-json-data-mapping", title: "2.2 JSON Schema, Objects, Arrays & Enterprise Data Mapping", duration: "60m", type: "simulation", xp: 85 },
        { slug: "auto-2-3-auth-credentials", title: "2.3 Authentication, Token Lifecycles & Credential Security", duration: "60m", type: "reading", xp: 90 },
        { slug: "auto-2-4-webhooks-pagination", title: "2.4 Event-Driven Webhooks, Polling & API Pagination Patterns", duration: "60m", type: "assessment", xp: 90 }
      ]
    },
    {
      title: "Module 3: Architectural Deep Dive: n8n Workflow Orchestration",
      description: "Build production-grade n8n pipelines: item-by-item data flow, advanced HTTP Request nodes, JavaScript Code transformations, and modular sub-workflows.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-3-1-n8n-canvas-architecture", title: "3.1 n8n Architecture, Nodes, Pins & Execution Data Flow", duration: "60m", type: "video", xp: 90 },
        { slug: "auto-3-2-n8n-triggers-http", title: "3.2 Webhook Triggers, Cron Schedules & Advanced HTTP Nodes", duration: "60m", type: "simulation", xp: 90 },
        { slug: "auto-3-3-n8n-data-transform-js", title: "3.3 Data Transformation, Code Nodes & Modern JavaScript in n8n", duration: "60m", type: "reading", xp: 95 },
        { slug: "auto-3-4-n8n-branching-subworkflows", title: "3.4 Branching Logic, Loops, Merging & Sub-workflow Orchestration", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 4: Power Automate Cloud Flows & Dataverse",
      description: "Automate corporate Microsoft 365 processes: standard vs premium connectors, in-memory Data Operations, Power Fx expressions, and Dataverse approvals.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-4-1-power-automate-architecture", title: "4.1 Power Platform Architecture, Environments & Cloud Flows", duration: "60m", type: "video", xp: 90 },
        { slug: "auto-4-2-connectors-data-ops", title: "4.2 Standard vs Premium Connectors & Data Operations in Power Automate", duration: "60m", type: "simulation", xp: 90 },
        { slug: "auto-4-3-power-fx-logic", title: "4.3 Power Fx Expressions, String Manipulation & Business Logic", duration: "60m", type: "reading", xp: 95 },
        { slug: "auto-4-4-dataverse-approvals-teams", title: "4.4 Microsoft Dataverse, Approvals & Microsoft Teams Adaptive Cards", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 5: Power Automate Desktop & Legacy-System RPA",
      description: "Bridge legacy software lacking APIs: UI automation selectors, anti-drift strategies, dynamic element parameters, and cloud-to-desktop machine groups.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-5-1-apis-vs-desktop-rpa", title: "5.1 APIs vs Desktop RPA: The Architectural Decision Framework", duration: "60m", type: "video", xp: 90 },
        { slug: "auto-5-2-power-automate-desktop-core", title: "5.2 Power Automate Desktop Fundamentals & UI Automation Canvas", duration: "60m", type: "simulation", xp: 90 },
        { slug: "auto-5-3-resilient-ui-selectors", title: "5.3 UI Selectors, Dynamic IDs, Modal Recovery & Anti-Drift Strategies", duration: "60m", type: "reading", xp: 95 },
        { slug: "auto-5-4-desktop-cloud-orchestration", title: "5.4 Orchestrating Cloud Flows, Gateways & Virtual Machine Groups", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 6: Applied Workplace AI: Structured Outputs, Document AI & Parsers",
      description: "Integrate LLMs safely into deterministic flows: document OCR, JSON Schema output enforcement, arithmetic cross-validation, and human-in-the-loop review.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-6-1-deterministic-vs-ai-agents", title: "6.1 Deterministic Automation, Bounded AI Steps & Agentic Systems", duration: "60m", type: "video", xp: 90 },
        { slug: "auto-6-2-document-ai-ocr", title: "6.2 Document AI, OCR Pipelines & Multimodal Document Processing", duration: "60m", type: "simulation", xp: 95 },
        { slug: "auto-6-3-structured-outputs-json-schema", title: "6.3 Enforcing Structured Outputs with JSON Schema & Parsers", duration: "60m", type: "reading", xp: 95 },
        { slug: "auto-6-4-confidence-privacy-approvals", title: "6.4 Confidence Scoring, PII Masking, Prompt Injection & Human Approval Gates", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 7: Enterprise Reliability: Retries, Idempotency & Dead-Letter Queues",
      description: "Design workflows that handle failure safely: exponential backoff with jitter, Try-Catch scopes in Power Automate, idempotency keys, and DLQ replay engines.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-7-1-enterprise-failure-modes", title: "7.1 Enterprise Failure Modes: Transient Outages vs Fatal Errors", duration: "60m", type: "video", xp: 90 },
        { slug: "auto-7-2-retry-policies-backoff", title: "7.2 Exponential Backoff, Jitter, Throttling & Avoiding Retry Storms", duration: "60m", type: "simulation", xp: 95 },
        { slug: "auto-7-3-try-catch-failure-routing", title: "7.3 Try-Catch Scopes, Error Trigger Sub-workflows & Diagnostic Alerts", duration: "60m", type: "reading", xp: 95 },
        { slug: "auto-7-4-idempotency-dead-letter-queues", title: "7.4 Idempotency Keys, Deduplication & Dead-Letter Queue Architectures", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 8: Governance, DLP, Identity & Security Controls",
      description: "Enforce enterprise security standards: service principal identities, Azure Key Vault integration, Power Platform DLP policies, and managed solution ALM.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-8-1-credentials-identity-rbac", title: "8.1 Service Principals, Key Vaults & Enterprise RBAC Governance", duration: "60m", type: "video", xp: 90 },
        { slug: "auto-8-2-dlp-data-privacy", title: "8.2 Data Loss Prevention (DLP) Policies, Connector Boundaries & Privacy", duration: "60m", type: "simulation", xp: 95 },
        { slug: "auto-8-3-environment-separation-alm", title: "8.3 Environment Separation, ALM & Solution Packaging", duration: "60m", type: "reading", xp: 95 },
        { slug: "auto-8-4-auditability-incident-response", title: "8.4 Audit Trails, Runbooks & Automation Incident Response", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 9: Automation ROI & Executive Business Cases",
      description: "Justify automation investments financially: time-and-motion studies, fully loaded labor rates, 3-year cash flow NPV, and Minto Pyramid executive proposals.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-9-1-operational-baselines", title: "9.1 Time-and-Motion Studies & Operational Baseline Metrics", duration: "60m", type: "video", xp: 90 },
        { slug: "auto-9-2-automation-financial-model", title: "9.2 Financial Modeling: Recovered Hours, Net Present Value & Payback", duration: "60m", type: "simulation", xp: 95 },
        { slug: "auto-9-3-workflow-telemetry-kpis", title: "9.3 Workflow Telemetry, SLA Monitoring & Power BI Operational Dashboards", duration: "60m", type: "reading", xp: 95 },
        { slug: "auto-9-4-executive-proposals", title: "9.4 Structuring Executive Proposals & Defending Automation Investments", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 10: Production Deployment, Enterprise Job Simulation & Defense",
      description: "Execute the complete transformation: production readiness review, staged canary deployment, the Nexus Global Logistics job simulation, and oral defense.",
      duration: "12h 00m",
      exercisesCount: 8,
      lessons: [
        { slug: "auto-10-1-production-runbooks", title: "10.1 Production Readiness Reviews & Operational Runbook Authoring", duration: "60m", type: "video", xp: 95 },
        { slug: "auto-10-2-deployment-monitoring", title: "10.2 Staged Rollout, Canary Deployment & Synthetic Monitoring", duration: "60m", type: "simulation", xp: 95 },
        { slug: "auto-10-3-nexus-job-simulation", title: "10.3 Nexus Global Logistics: Immersive Enterprise Job Simulation", duration: "60m", type: "reading", xp: 100 },
        { slug: "auto-10-4-technical-defense-passport", title: "10.4 Capstone Technical Defense & Career Passport Credentialing", duration: "60m", type: "assessment", xp: 100 }
      ]
    }
  ]
};

export const ENTERPRISE_BI_COURSE: CourseItem = {
  slug: "enterprise-business-intelligence-power-bi-sql-corporate-analysts",
  pathSlug: "corporate-analyst",
  title: "Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts",
  subtitle: "Transform Messy Enterprise Data into Scalable Semantic Models, Executive Dashboards, and Strategic Business Decisions.",
  description: "Master the complete corporate business intelligence lifecycle across PostgreSQL, DuckDB, Power Query, Star Schema dimensional modeling, advanced DAX, and executive Power BI reporting. Deconstruct enterprise performance, build automated analytical data pipelines, reconcile commercial metrics, and deliver strategic boardroom decision memos.",
  lessons: 48,
  hours: 120,
  lectureHours: 36,
  buildHours: 84,
  skills: [
    "PostgreSQL & Analytical SQL (CTEs, Window Functions)",
    "DuckDB Local Analytical Processing",
    "Power Query ETL & M-Code (Query Folding)",
    "Kimball Dimensional Modeling & Star Schemas",
    "Advanced DAX Engineering & Filter Context",
    "Time Intelligence & Commercial Variance Analysis",
    "Executive Power BI Cockpits & Visual Hierarchy",
    "Management Memos & Variance Decomposition",
    "Row-Level Security (RLS) & Enterprise Governance",
    "AI-Assisted SQL & DAX Logic Auditing"
  ],
  enrolledCount: 1560,
  rating: 4.99,
  credential: {
    designation: "Certified Enterprise Business Intelligence Analyst (CEBI)",
    body: "INSYT Corporate Technical Accreditation & Assessment Board",
    description: "Rigorous assessment-verified credential certifying production-grade SQL extraction, Kimball Star Schema modeling, advanced DAX mathematical precision, and boardroom defense. Curriculur alignment with Microsoft PL-300 competencies.",
    benchmark: "Microsoft PL-300 Domain Alignment & Kimball Group Dimensional Standards"
  },
  pricingTiers: [
    {
      tier: "Tier 1",
      name: "INSYT Foundations",
      target: "Final-Year Students & Self-Directed Analysts",
      priceBdt: 5500,
      priceUsd: 48,
      features: [
        "Complete 12-Module curriculum (all 48 instructional lessons)",
        "12 Guided laboratory problem sets with automated SQL validation",
        "Downloadable starter datasets (.csv, .xlsx, .duckdb, .sql)",
        "Interactive DAX filter-context visualizer & Star Schema simulator",
        "Automated end-of-lesson diagnostic quizzes & knowledge checks",
        "Standard Certificate of Completion"
      ]
    },
    {
      tier: "Tier 2",
      name: "INSYT Corporate Fellow (Recommended)",
      target: "Commercial Analysts, FP&A Specialists & BI Practitioners",
      priceBdt: 14500,
      priceUsd: 125,
      features: [
        "Everything in INSYT Foundations",
        "12-Week structured cohort with 36 hours of live instruction & code reviews",
        "All 4 substantive corporate portfolio projects with faculty grading",
        "All 4 milestone practical examinations (SQL, Star Schema, DAX, Memo)",
        "Apex Consumer Goods enterprise simulation evaluation",
        "Official INSYT Enterprise Business Intelligence Certified Analyst (CEBI) credential",
        "Verified Career Passport evidence portfolio indexed for partner hiring"
      ]
    },
    {
      tier: "Tier 3",
      name: "INSYT Executive Fast-Track",
      target: "Senior Commercial Analysts, Operations Leads & BI Managers",
      priceBdt: 28000,
      priceUsd: 240,
      features: [
        "Everything in INSYT Corporate Fellow",
        "Timed 6-Hour Job-Ready Practical Challenge with private rubric audit",
        "1-on-1 personalized portfolio defense coaching with enterprise BI architects",
        "Private executive boardroom presentation evaluation & memo critique",
        "Executive interview preparation & direct recruiter referral to MNCs and banks"
      ]
    }
  ],
  assessmentTiers: [
    {
      tier: 1,
      name: "Weekly Formative Knowledge Checks",
      format: "Scenario-based MCQs, filter-context tracing, and SQL debugging",
      criteria: "80% passing threshold with detailed diagnostic explanations"
    },
    {
      tier: 2,
      name: "12 Weekly Applied Problem Sets",
      format: "Practical deliverables: Metric trees, SQL benchmarks, DAX formulas, and ETL audits",
      criteria: "80% passing standard evaluated against automated test cases"
    },
    {
      tier: 3,
      name: "4 Milestone Practical Assessments",
      format: "Week 3 SQL (90-min), Week 5 Star Schema, Week 7 DAX (2-hr), Week 9 Executive Memo",
      criteria: "Evaluated against enterprise rubrics (80% SQL / 75% DAX thresholds)"
    },
    {
      tier: 4,
      name: "Final 90-Minute Technical Examination",
      format: "Timed secure assessment: SQL, Kimball modeling, and DAX under evaluation contexts",
      criteria: "75% passing threshold required for CEBI credential qualification"
    },
    {
      tier: 5,
      name: "Apex Capstone & 6-Hour Job-Ready Challenge",
      format: "End-to-end enterprise simulation over 4.8M records, 3-tiered dashboard, 2-page memo, and 7-minute boardroom defense",
      criteria: "Scored across 5 equal-weight dimensions (SQL, Modeling, DAX, UX, Insight) on 100-point rubric"
    }
  ],
  miniProjects: [
    {
      id: 1,
      title: "FMCG Trade Spend & Distributor Pacing",
      duration: "10 Hours",
      description: "Query 1.8M sales transactions, validate trade spend % and distributor pacing, build star schema, design commercial cockpit, and write trade-marketing memo.",
      deliverable: "SQL repository, Star Schema model diagram, DAX measure suite, Power BI cockpit, and executive memo."
    },
    {
      id: 2,
      title: "Telecom Cohort Retention & ARPU Analysis",
      duration: "10 Hours",
      description: "Query 850k subscriber records, apply LAG/LEAD window functions, model subscription & time dimensions, compute ARPU and cohort retention curves.",
      deliverable: "SQL cohort queries, Dimensional model, DAX cohort retention measures, and churn dashboard."
    },
    {
      id: 3,
      title: "Mobile Financial Services Liquidity & Agent Risk",
      duration: "10 Hours",
      description: "Audit 3.2M transaction ledger, compute semi-additive daily balances, monitor float ratios and agent liquidity thresholds, and identify operational risk indicators.",
      deliverable: "SQL ledger reconciliation, DAX liquidity measure suite, Treasury dashboard, and liquidity risk memo."
    },
    {
      id: 4,
      title: "Retail Supply Chain Health & Working Capital",
      duration: "10 Hours",
      description: "Normalize 8 supply chain tables across purchase orders and inventory, detect stock-out and excess-stock risks, and evaluate working capital pressure.",
      deliverable: "SQL multi-table joins, Star schema, inventory turnover DAX, and procurement advisory memo."
    }
  ],
  capstoneOptions: [
    {
      id: 1,
      title: "Apex Consumer Goods Ltd. — Enterprise BI Simulation",
      industry: "Fast-Moving Consumer Goods (MNC / Regional)",
      context: "Gross sales volume increased 6% while operating margin collapsed 18% over the last two quarters. Deconstruct root drivers across trade spend, distributor penalties, and mix shifts over 4.8M records.",
      dataset: "fmcg_orders_header (1.4M), fmcg_orders_detail (4.8M), dim_products (1,200), dim_distributors (450), dim_regions (4), dim_monthly_targets (192).",
      deliverables: "SQL analytical views, Star schema model (.pbix), DAX measures, 3-tiered executive cockpit, 2-page investment memo, and 7-minute boardroom defense.",
      careerAlignment: "Commercial BI Analyst, FMCG Management Trainee, Revenue Growth Management Specialist"
    },
    {
      id: 2,
      title: "Omnichannel Retail Supply Chain & Working Capital Diagnostic",
      industry: "Omnichannel Retail & E-Commerce",
      context: "High sales growth accompanied by inventory stock-outs, soaring holding costs, and working capital cash trap.",
      dataset: "Purchase orders (800k), inventory snapshots (2.2M), supplier deliveries, and regional fulfillment centers.",
      deliverables: "SQL inventory staging views, inventory health model, stock-out forecast DAX, and executive inventory memo.",
      careerAlignment: "Supply Chain Analyst, Inventory Controller, Operations Finance Specialist"
    },
    {
      id: 3,
      title: "MFS Digital Banking Settlement & Liquidity Surveillance",
      industry: "FinTech & Digital Banking",
      context: "High transaction volume causing liquidity pinches in merchant settlement pools and agent cash reserves.",
      dataset: "3.2M transaction ledger records, agent master tables, settlement clearing logs.",
      deliverables: "SQL reconciliation scripts, treasury balance model, liquidity risk dashboard, and treasury memo.",
      careerAlignment: "Treasury Analyst, FinTech Operations Specialist, Risk & Compliance Analyst"
    }
  ],
  capstoneProject: {
    title: "Apex Consumer Goods Ltd. — Enterprise BI Simulation & 6-Hour Job-Ready Challenge",
    brief: "Executive leadership demands a comprehensive diagnostic of recent operating margin collapse (from 24% to 14%) despite a 6% sales volume increase. Within a 6-hour timed simulation, connect to the PostgreSQL practice database, extract clean analytical views, model an 8-table Kimball Star Schema, author explicit DAX measures, build a 3-tiered executive Power BI decision system, write a 2-page investment memo, and record your 7-minute boardroom defense.",
    deliverable: "SQL extract scripts (.sql), Power BI semantic model (.pbix), documented DAX measures, executive dashboard, 2-page C-suite memo (.pdf/.md), and 7-minute video defense.",
    rubric: [
      "Enterprise SQL Pipeline & Data Hygiene (20%): Grain validation, clean joins, absence of duplicate rows, and performant CTEs.",
      "Dimensional Architecture & Star Schema (20%): 1:N single-direction relationships, surrogate keys, contiguous date dimension, correct monthly target grain.",
      "DAX Mathematical Precision & Filter Context (20%): Explicit measures, correct CALCULATE filter transitions, Time Intelligence logic, safe divide handling.",
      "Visual Hierarchy & Report Usability (20%): Cognitive visual structure, 3-tier reporting architecture, dynamic slicers, drill-through diagnostics, accessible styling.",
      "Commercial Insight & Executive Framing (20%): Evidence-based root cause identification, variance decomposition, 3 concrete operational recommendations, executive presentation."
    ]
  },
  modules: [
    {
      title: "Module 1: Corporate BI Blueprint & Modern Analytics",
      description: "Deconstruct business problems into measurable metric driver trees, design the end-to-end analytical pipeline, and configure a reproducible local environment with PostgreSQL, DuckDB, and Power BI.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-1-1-what-enterprise-bi-does", title: "1.1 What Enterprise Business Intelligence Actually Does", duration: "60m", type: "video", xp: 80 },
        { slug: "bi-1-2-analytics-pipeline", title: "1.2 The Modern Corporate Analytics Pipeline", duration: "60m", type: "reading", xp: 80 },
        { slug: "bi-1-3-kpi-metric-trees", title: "1.3 Business Questions, KPI Definitions & Metric Trees", duration: "60m", type: "simulation", xp: 85 },
        { slug: "bi-1-4-local-environment-setup", title: "1.4 Local Analytics Environment & Project Structure", duration: "60m", type: "assessment", xp: 90 }
      ]
    },
    {
      title: "Module 2: Enterprise SQL Foundations",
      description: "Query normalized business tables with SELECT, WHERE, CASE WHEN, GROUP BY, and HAVING. Validate row counts, prevent duplicate aggregations, and compute commercial KPIs over 1.2M retail rows.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-2-1-tables-query-execution", title: "2.1 Relational Tables and Query Execution", duration: "60m", type: "video", xp: 80 },
        { slug: "bi-2-2-filtering-conditional-logic", title: "2.2 Filtering and Conditional Logic", duration: "60m", type: "reading", xp: 85 },
        { slug: "bi-2-3-aggregation-business-kpis", title: "2.3 Aggregation and Business KPIs", duration: "60m", type: "simulation", xp: 90 },
        { slug: "bi-2-4-query-validation-interpretation", title: "2.4 Query Validation and Commercial Interpretation", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 3: Advanced SQL for Corporate Analysts",
      description: "Build scalable analytical extracts across multi-table joins, Common Table Expressions (CTEs), and window functions (ROW_NUMBER, LAG, LEAD, running totals) over a 3.5M transaction fintech ledger.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-3-1-joins-relational-analysis", title: "3.1 Joins and Relational Analysis", duration: "60m", type: "video", xp: 85 },
        { slug: "bi-3-2-subqueries-ctes", title: "3.2 Subqueries and Common Table Expressions", duration: "60m", type: "reading", xp: 90 },
        { slug: "bi-3-3-sql-window-functions", title: "3.3 SQL Window Functions", duration: "60m", type: "simulation", xp: 95 },
        { slug: "bi-3-4-analytical-queries-views", title: "3.4 Advanced Analytical Queries and Reusable Views", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 4: Power Query & Enterprise ETL Pipelines",
      description: "Transform inconsistent source files into refreshable analytical inputs. Profile column distributions, clean dirty headers, unpivot irregular matrices, and audit query folding to maximize engine push-down.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-4-1-power-query-profiling", title: "4.1 Power Query Ingestion & Data Profiling", duration: "60m", type: "video", xp: 80 },
        { slug: "bi-4-2-cleaning-merging-reshaping", title: "4.2 Cleaning, Merging & Reshaping", duration: "60m", type: "reading", xp: 85 },
        { slug: "bi-4-3-query-folding-efficiency", title: "4.3 Query Folding and Efficient Transformations", duration: "60m", type: "simulation", xp: 90 },
        { slug: "bi-4-4-repeatable-etl-pipeline", title: "4.4 Building a Repeatable ETL Pipeline", duration: "60m", type: "assessment", xp: 95 }
      ]
    },
    {
      title: "Module 5: Dimensional Modeling & Star Schemas",
      description: "Design robust Kimball Star Schemas. Separate high-frequency facts from descriptive dimensions, enforce 1:N single-direction relationships, generate integer surrogate keys, and link monthly targets safely.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-5-1-grain-fact-dimension-tables", title: "5.1 Grain, Fact Tables & Dimension Tables", duration: "60m", type: "video", xp: 85 },
        { slug: "bi-5-2-star-schemas-cardinality", title: "5.2 Star Schemas and Relationship Cardinality", duration: "60m", type: "reading", xp: 90 },
        { slug: "bi-5-3-surrogate-keys-date-tables", title: "5.3 Surrogate Keys, Date Tables & Fiscal Calendars", duration: "60m", type: "simulation", xp: 95 },
        { slug: "bi-5-4-model-validation-integrity", title: "5.4 Model Validation and Aggregation Integrity", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 6: Core DAX Engineering & Filter Context",
      description: "Master explicit DAX measures, row context versus filter context, CALCULATE filter modification, ALL, REMOVEFILTERS, and diagnose unexpected grand totals and divide-by-zero errors.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-6-1-measures-calculated-columns", title: "6.1 Measures, Calculated Columns & Evaluation", duration: "60m", type: "video", xp: 85 },
        { slug: "bi-6-2-fundamental-business-measures", title: "6.2 Fundamental Business Measures", duration: "60m", type: "reading", xp: 90 },
        { slug: "bi-6-3-calculate-filter-modification", title: "6.3 CALCULATE and Filter Modification", duration: "60m", type: "simulation", xp: 95 },
        { slug: "bi-6-4-dax-debugging-validation", title: "6.4 DAX Debugging & Validation", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 7: Advanced DAX & Commercial Logic",
      description: "Build production-grade commercial measures: VAR/RETURN optimization, iterator performance (SUMX, RANKX), Time Intelligence (YTD, SAMEPERIODLASTYEAR), and semi-additive cash balances.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-7-1-variables-iterators-maintainability", title: "7.1 Variables, Iterators & Maintainable DAX", duration: "60m", type: "video", xp: 90 },
        { slug: "bi-7-2-time-intelligence", title: "7.2 Time Intelligence", duration: "60m", type: "reading", xp: 95 },
        { slug: "bi-7-3-advanced-commercial-measures", title: "7.3 Advanced Commercial Measures", duration: "60m", type: "simulation", xp: 100 },
        { slug: "bi-7-4-dax-performance-context-audit", title: "7.4 DAX Performance and Context Auditing", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 8: Dashboard UX & Visual Ergonomics",
      description: "Apply cognitive visual hierarchy to executive dashboards. Structure KPI cards, design diagnostic drill-through pathways, eliminate chartjunk, and audit flawed layouts for commercial clarity.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-8-1-cognitive-visual-hierarchy", title: "8.1 Cognitive Visual Hierarchy", duration: "60m", type: "video", xp: 85 },
        { slug: "bi-8-2-operational-diagnostic-dashboards", title: "8.2 Operational and Diagnostic Dashboards", duration: "60m", type: "reading", xp: 90 },
        { slug: "bi-8-3-interactive-reporting-navigation", title: "8.3 Interactive Reporting & Navigation", duration: "60m", type: "simulation", xp: 95 },
        { slug: "bi-8-4-dashboard-critique-redesign", title: "8.4 Dashboard Critique and Redesign", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 9: Executive Storytelling & Management Memos",
      description: "Transform technical analytical discoveries into high-impact C-suite communications. Master Price-Volume-Mix (PVM) variance decomposition, issue trees, and 2-page decision memos.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-9-1-analytical-story-structure", title: "9.1 Analytical Story Structure", duration: "60m", type: "video", xp: 85 },
        { slug: "bi-9-2-variance-decomposition-reasoning", title: "9.2 Variance Decomposition and Commercial Reasoning", duration: "60m", type: "reading", xp: 90 },
        { slug: "bi-9-3-management-memos-briefings", title: "9.3 Management Memos and Executive Briefings", duration: "60m", type: "simulation", xp: 95 },
        { slug: "bi-9-4-dashboard-to-decision", title: "9.4 From Dashboard to Decision", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 10: Governance, Security & Performance Tuning",
      description: "Deploy enterprise semantic models in Power BI Service. Configure dynamic Row-Level Security (RLS) with USERPRINCIPALNAME(), schedule on-premises data gateway refreshes, and benchmark VertiPaq memory.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-10-1-powerbi-service-workspaces", title: "10.1 Power BI Service and Workspace Management", duration: "60m", type: "video", xp: 85 },
        { slug: "bi-10-2-row-level-security", title: "10.2 Row-Level Security", duration: "60m", type: "reading", xp: 90 },
        { slug: "bi-10-3-refresh-gateways-access", title: "10.3 Refresh, Gateways and Data Access", duration: "60m", type: "simulation", xp: 95 },
        { slug: "bi-10-4-performance-model-audit", title: "10.4 Performance and Model Audit", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 11: Applied AI Workflows in Enterprise BI",
      description: "Leverage AI as a rigorous analytical accelerator. Draft complex SQL and DAX measures with structured prompts, detect subtle filter context hallucinations, and enforce data privacy standards.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-11-1-ai-assisted-sql", title: "11.1 AI-Assisted SQL Authoring", duration: "60m", type: "video", xp: 85 },
        { slug: "bi-11-2-ai-assisted-dax-pq", title: "11.2 AI-Assisted DAX and Power Query", duration: "60m", type: "reading", xp: 90 },
        { slug: "bi-11-3-auditing-ai-analytics", title: "11.3 Auditing AI-Generated Analytics", duration: "60m", type: "simulation", xp: 95 },
        { slug: "bi-11-4-secure-reproducible-ai", title: "11.4 Secure and Reproducible AI-Assisted Analysis", duration: "60m", type: "assessment", xp: 100 }
      ]
    },
    {
      title: "Module 12: Enterprise Capstone Execution & Defense",
      description: "Execute the Apex Consumer Goods enterprise simulation end-to-end: SQL views over 4.8M records, Star Schema modeling, advanced DAX, 3-tiered Power BI cockpit, 2-page executive memo, and boardroom oral defense.",
      duration: "10h 00m",
      exercisesCount: 6,
      lessons: [
        { slug: "bi-12-1-capstone-discovery-planning", title: "12.1 Capstone Discovery and Technical Planning", duration: "60m", type: "video", xp: 95 },
        { slug: "bi-12-2-database-to-model-implementation", title: "12.2 Database-to-Model Implementation", duration: "60m", type: "reading", xp: 95 },
        { slug: "bi-12-3-dax-dashboard-deliverables", title: "12.3 DAX, Dashboard and Executive Deliverables", duration: "60m", type: "simulation", xp: 100 },
        { slug: "bi-12-4-final-exam-boardroom-defense", title: "12.4 Final Technical Examination and Boardroom Defense", duration: "60m", type: "assessment", xp: 100 }
      ]
    }
  ]
};


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

export const ALL_PATHS: Record<string, LearningPathItem> = {
  // ═══════════════════════════════════════════════════════════════
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
    subtitle: "Project Management, Executive Communication, Strategy & Career Excellence",
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

  "applied-ai-automation": {
    slug: "applied-ai-automation",
    title: "Applied Workplace AI & Enterprise Automation",
    subtitle: "Orchestrate Enterprise Workflows with n8n, Power Automate & Structured AI",
    category: "tech",
    description: "End-to-end curriculum for operations managers, business process analysts, and automation engineers. Master workflow orchestration, REST integrations, Power Automate Desktop RPA, and auditable AI governance.",
    gradient: "linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #4338ca 100%)",
    icon: "Bot",
    students: 1140,
    rating: 4.98,
    skills: ["n8n Orchestration", "Power Automate Cloud", "Power Automate Desktop RPA", "Microsoft Dataverse", "Document AI", "REST APIs & Webhooks", "Idempotency & DLQ"],
    capstoneDeliverable: "Nexus Global Logistics Multi-System Automation & CEAS Defense",
    courses: [ENTERPRISE_AUTOMATION_COURSE]
  },
  "corporate-python-automation": {
    slug: "corporate-python-automation",
    title: "Corporate Python & Data Automation",
    subtitle: "Enterprise Data Pipelines, pandas Wrangling & Excel Reporting Engines",
    category: "analytics",
    description: "End-to-end curriculum for business analysts, FP&A professionals, and operations specialists. Master automated data pipelines, messy spreadsheet reconciliation, and unattended corporate reporting.",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
    icon: "Code",
    students: 980,
    rating: 4.99,
    skills: ["Python 3.12+", "pandas", "openpyxl", "DuckDB", "SQLAlchemy", "REST APIs", "Enterprise Logging"],
    capstoneDeliverable: "3-Hour Recruiter Job Simulation & Multi-Source Reconciliation Pipeline",
    courses: [ENTERPRISE_PYTHON_COURSE]
  },
  "corporate-analyst": {
    slug: "corporate-analyst",
    title: "Corporate Business Analyst",
    subtitle: "Financial Modeling, SQL Querying & Enterprise Power BI Dashboards",
    category: "analytics",
    description: "End-to-end curriculum for commercial finance, corporate FP&A, and business intelligence analysts. Master auditable Excel operating models and scalable relational dashboards.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    icon: "BarChart3",
    students: 1420,
    rating: 4.9,
    skills: ["Financial Modeling", "Power Query", "PostgreSQL", "Power BI", "DAX", "Working Capital Analysis"],
    capstoneDeliverable: "FMCG Distributor Commercial Model & Enterprise Margin Dashboard",
    courses: [
      ENTERPRISE_AUTOMATION_COURSE,
      ENTERPRISE_PYTHON_COURSE,
      {
        slug: "corporate-financial-commercial-modeling-excel",
        pathSlug: "corporate-analyst",
        title: "Corporate Financial & Commercial Modeling in Excel",
        subtitle: "The Complete Financial Analyst, FP&A, and Commercial Modeling Masterclass",
        description: "Benchmark yourself against global FMI AFM & FAST standards. Construct dynamic 3-statement corporate models, Price-Volume-Mix (PVM) revenue variance bridges, rolling FP&A forecasts, debt schedules with cash sweeps, and defend models live before corporate finance leaders.",
        lessons: 53,
        hours: 75,
        lectureHours: 32,
        buildHours: 43,
        skills: [
          "Integrated 3-Statement Modeling",
          "Price-Volume-Mix (PVM) Decomposition",
          "FAST Financial Modeling Standard",
          "Power Query ETL & M-Code",
          "Working Capital Cash Cycles (DSO/DIO/DPO)",
          "Debt Schedules & Cash Sweeps",
          "Circularity Breakers",
          "Rolling 12-Month FP&A Forecasting",
          "Two-Way Sensitivity Data Tables",
          "Executive Model Defense"
        ],
        enrolledCount: 1240,
        rating: 4.98,
        credential: {
          designation: "Certified Corporate Financial & Commercial Modeler (CCFCM)",
          body: "INSYT Corporate Accreditation Board",
          description: "Dual-evaluated designation benchmarked against the Financial Modeling Institute (FMI) AFM Body of Knowledge and the international FAST Modeling Standard.",
          benchmark: "FMI AFM & FAST Standard Compliant"
        },
        pricingTiers: [
          {
            tier: "Tier 1",
            name: "Self-Paced Track",
            target: "University Students & Self-Directed Learners",
            priceBdt: 0.01,
            priceUsd: 0.01,
            features: [
              "Access to Modules 1 through 6 recorded masterclasses",
              "Downloadable practice workbooks (.xlsx) & starter files",
              "Automated end-of-lesson knowledge checks",
              "Standard Certificate of Completion"
            ]
          },
          {
            tier: "Tier 2",
            name: "Career Accelerator (Flagship)",
            target: "Final-Year Students, MTO Applicants & Junior Analysts",
            priceBdt: 0.01,
            priceUsd: 0.01,
            features: [
              "Complete 10-Module curriculum (all 48 lessons)",
              "All 5 enterprise mini-project assignments with automated grading",
              "4-Hour Proctored Live Blank-Sheet Build Exam",
              "Verified INSYT Career Passport repository & badge",
              "Direct profile indexing for corporate hiring partners"
            ]
          },
          {
            tier: "Tier 3",
            name: "Executive Cohort Fellowship",
            target: "Early-Career Analysts, Finance Executives & Career Pivoters",
            priceBdt: 0.01,
            priceUsd: 0.01,
            features: [
              "Everything in Career Accelerator",
              "8 Live weekend masterclass labs with senior FP&A directors",
              "Personalized 1-on-1 model audits & code reviews",
              "30-Minute Oral Capstone Model Defense before executive panel",
              "Priority referrals to MNCs, Telcos, and Conglomerates"
            ]
          },
          {
            tier: "Tier 4",
            name: "Enterprise B2B Custom Cohorts",
            target: "Corporate FP&A Departments & Commercial Finance Teams",
            priceBdt: 350000,
            priceUsd: 2870,
            features: [
              "Custom 3-5 day intensive corporate workshop",
              "Models built on company-specific ERP extracts and chart of accounts",
              "Team-wide competency taxonomy benchmarking",
              "Dedicated corporate dashboard templates"
            ]
          }
        ],
        assessmentTiers: [
          { tier: 1, name: "Conceptual Lesson Checks", format: "3-5 Scenario MCQs after each lesson (Automated LMS)", criteria: "80% passing score (unlimited retakes)" },
          { tier: 2, name: "Practical Module Tasks", format: "Applied spreadsheet builds after each module (30-60 min)", criteria: "80% rubric benchmark (3 retakes permitted)" },
          { tier: 3, name: "Mid-Program Challenge", format: "2-Hour timed modeling challenge after Module 5", criteria: "75% scaled score (objective grading engine)" },
          { tier: 4, name: "Proctored Live Build Exam", format: "4-Hour AFM-style blank-sheet build from raw business brief", criteria: "70% scaled benchmark evaluated by senior practitioners" },
          { tier: 5, name: "Executive Model Defense", format: "30-Minute oral defense & live stress-test before executive panel", criteria: "70% defense score evaluated by corporate finance leaders" }
        ],
        miniProjects: [
          {
            id: 1,
            title: "Dynamic Operational Revenue and Capacity Forecast Model",
            duration: "6 Hours",
            description: "Construct a 5-year monthly revenue model for a multi-line manufacturing plant incorporating machine run-rate limits, seasonal demand factors, and price escalation curves.",
            deliverable: "Auditable Excel workbook (.xlsx) with dynamic capacity ceilings and automated volume checks."
          },
          {
            id: 2,
            title: "Commercial Price-Volume-Mix (PVM) and Margin Waterfall Engine",
            duration: "8 Hours",
            description: "Build an automated PVM variance decomposition engine using an uncleaned 2-year sales transaction ledger (25,000+ rows) to isolate price, volume, and portfolio mix drivers.",
            deliverable: "Dynamic PVM calculation model with dynamic gross margin waterfall bridge charts."
          },
          {
            id: 3,
            title: "Working Capital Cash Conversion Cycle Optimizer",
            duration: "7 Hours",
            description: "Model Accounts Receivable (DSO), Inventory (DIO), and Accounts Payable (DPO) schedules from raw ledger transactions to evaluate operational liquidity under rapid growth.",
            deliverable: "Working capital optimization workbook showing cash released from credit term improvements."
          },
          {
            id: 4,
            title: "Capital Expenditure Corkscrew and Debt Financing Engine",
            duration: "8 Hours",
            description: "Build a multi-tier PP&E roll-forward with straight-line and declining-balance depreciation, linked to a revolving credit facility with cash sweeps and circularity breaker switches.",
            deliverable: "Auditable debt and capital schedule balancing automatically without circular formula errors."
          },
          {
            id: 5,
            title: "Corporate FP&A Rolling Forecast and Executive Dashboard",
            duration: "8 Hours",
            description: "Build a rolling 12-month FP&A forecasting engine splicing closed YTD actuals with dynamic rest-of-year projections, presented through an executive C-suite KPI dashboard.",
            deliverable: "Executive dashboard workbook with sparklines, variance flags, and dynamic run-rate toggles."
          }
        ],
        capstoneOptions: [
          {
            id: 1,
            title: "FMCG Commercial Performance & Distributor Network Strategy",
            industry: "Consumer Goods (MNC)",
            context: "A consumer goods manufacturer evaluates a product launch alongside revisions to wholesale and modern trade distributor margins.",
            dataset: "Two years of monthly sales ledgers (50,000+ rows), trade discount terms, manufacturing capacity limits, and raw material inflation indices.",
            deliverables: "Automated Power Query pipeline, operational PxQ model, PVM variance bridge, integrated 3-statement forecast, and dynamic scenario toggles.",
            careerAlignment: "Commercial Finance Analyst, Brand Finance Partner, FMCG Management Trainee (Unilever, BAT, Nestlé, Marico)"
          },
          {
            id: 2,
            title: "Telecommunications & FinTech Unit Economics",
            industry: "Telco & Mobile Financial Services",
            context: "A mobile network operator and digital wallet provider models subscriber adoption, ARPU dilution, agent commissions, and 5G network expansion Capex.",
            dataset: "Unformatted subscriber records, ARPU metrics, agent commission tiers, and network infrastructure Capex deployment schedules.",
            deliverables: "Cohort retention models, LTV/CAC schedules, infrastructure depreciation corkscrews, and dynamic 3-statement liquidity projections.",
            careerAlignment: "FinTech Business Analyst, Telecom FP&A Specialist, Corporate Planning Executive (bKash, Grameenphone, Robi)"
          },
          {
            id: 3,
            title: "Industrial Conglomerate Manufacturing Plant Expansion",
            industry: "Diversified Heavy Manufacturing",
            context: "A diversified manufacturing conglomerate evaluates a BDT 1.2 Billion capital expenditure proposal for a new export-oriented production line.",
            dataset: "Three years of historical trial balances, equipment procurement quotations, project debt financing terms, and seasonal working capital requirements.",
            deliverables: "Historical statement normalization, PP&E corkscrews, debt amortization with cash sweeps, working capital forecasts, and DCF/NPV appraisal.",
            careerAlignment: "Corporate Finance Analyst, Manufacturing Controller, Commercial Banking Credit Analyst (Square, PRAN-RFL, Akij, IDLC)"
          },
          {
            id: 4,
            title: "Retail Chain Operational Restructuring & Liquidity Optimization",
            industry: "Multi-Store Retail & Superstores",
            context: "A 45-store retail chain faces margin erosion and cash shortfalls driven by aggressive store expansion and slow-moving inventory.",
            dataset: "Store-level monthly sales ledgers, lease commitments, inventory aging tables, supplier payment terms, and store operating cost allocations.",
            deliverables: "Store contribution margin models, inventory carrying cost analyses, 13-week cash forecasting schedule, and 3-statement turnaround model.",
            careerAlignment: "Retail FP&A Manager, Working Capital Specialist, Corporate Turnaround Associate (Shwapno, Meena Bazar, Unimart)"
          },
          {
            id: 5,
            title: "Cross-Border Digital Marketplace Scaling & Venture Valuation",
            industry: "E-Commerce & High-Growth Tech",
            context: "A high-growth marketplace platform prepares for institutional Series B equity funding to scale fulfillment logistics and merchant acquisition.",
            dataset: "GMV transaction ledgers, take-rate structures, CAC breakdowns, logistics fulfillment costs per order, and corporate overhead budgets.",
            deliverables: "Platform GMV/net revenue models, cohort retention schedules, headcount roll-forwards, integrated 3-statement model, and multi-method valuation.",
            careerAlignment: "Venture Capital Analyst, Corporate Development Associate, Startup Finance Lead (Daraz, Pathao, Chaldal)"
          }
        ],
        capstoneProject: {
          title: "FMCG Commercial Performance & Distributor Network Strategy (Flagship)",
          brief: "Build a production-grade 5-year operating model for a consumer goods manufacturer with automated Power Query data ingestion, dynamic PxQ capacity build-ups, Price-Volume-Mix (PVM) gross margin bridges, DSO/DIO working capital schedules, revolving debt sweeps, and executive scenario toggles.",
          deliverable: "Auditable Excel workbook (.xlsx) conforming to FAST modeling standards, accompanied by a 10-slide executive presentation and 30-minute oral defense.",
          rubric: [
            "Accounting Integrity (25%): 3-statement dynamic balance with zero plugs and reconciled indirect cash flow statement.",
            "Structural Design & FAST Standards (20%): Strict separation of Inputs/Calculations/Outputs, One Formula per Row rule, institutional color coding.",
            "Commercial Variance & PVM Decomposition (20%): Mathematical precision isolating Price, Volume, and Portfolio Mix effects on gross margins.",
            "Scenario Engines & Dynamic Sensitivity (15%): Centralized CHOOSE/INDEX toggles and automated two-way sensitivity Data Tables.",
            "Executive Presentation & Model Defense (20%): Live model navigation via keyboard, assumption defense, and real-time stress testing."
          ]
        },
        modules: [
          // ── PILLAR 1: SPREADSHEET HYGIENE & DATA PIPELINES ──
          {
            title: "Module 1: Advanced Excel Architecture, Dynamic Arrays & FAST Modeling Conventions",
            pillar: "Pillar 1: Spreadsheet Hygiene & Data Pipelines",
            description: "Establish institutional modeling standards, zero-mouse keyboard velocity, referencing discipline, and dynamic array calculations.",
            duration: "7h 30m",
            exercisesCount: 5,
            lessons: [
              { slug: "fast-standards-interface", title: "1.1 FAST Modeling Standards, Interface Architecture & Keyboard Efficiency", duration: "40m", type: "video", xp: 50 },
              { slug: "formula-referencing-hygiene", title: "1.2 Referencing Discipline, Dynamic Lookups & Error Handling (XLOOKUP)", duration: "45m", type: "simulation", xp: 60 },
              { slug: "dynamic-arrays-modern-logic", title: "1.3 Dynamic Arrays, Modern Logic & Formula Optimization (FILTER, UNIQUE, SORT)", duration: "45m", type: "simulation", xp: 60 },
              { slug: "two-way-matrix-lookups", title: "1.4 Resilient Two-Way Matrix Retrieval & Formula Error Trapping", duration: "40m", type: "reading", xp: 45 },
              { slug: "mod1-practical-speed-drill", title: "1.5 Module 1 Practical Speed Drill: Blank-Sheet Template Architecture", duration: "35m", type: "assessment", xp: 75 }
            ]
          },
          {
            title: "Module 2: Data Cleansing, Power Query ETL & Normalization for Financial Ledgers",
            pillar: "Pillar 1: Spreadsheet Hygiene & Data Pipelines",
            description: "Automate the transformation of messy ERP ledger exports into structured, analysis-ready tables using Power Query and M-code.",
            duration: "8h 00m",
            exercisesCount: 5,
            lessons: [
              { slug: "power-query-fundamentals-etl", title: "2.1 Power Query Fundamentals & Data Ingestion Pipelines", duration: "45m", type: "video", xp: 50 },
              { slug: "unpivoting-date-standardization", title: "2.2 Advanced Transformations: Unpivoting Matrix Budgets & Standardizing Dates", duration: "50m", type: "simulation", xp: 65 },
              { slug: "m-code-custom-transformations", title: "2.3 Custom Conditional Columns & Power Query M-Code Best Practices", duration: "40m", type: "reading", xp: 45 },
              { slug: "multi-file-ledger-consolidation", title: "2.4 Consolidating 12 Monthly ERP Ledgers with One-Click Auto-Refresh", duration: "45m", type: "simulation", xp: 60 },
              { slug: "mod2-data-transformation-challenge", title: "2.5 Module 2 ERP Data Ingestion & Sanitization Challenge", duration: "35m", type: "assessment", xp: 75 }
            ]
          },
          {
            title: "Module 3: Operational Drivers, Revenue Build-ups & Cost Behavior Modeling",
            pillar: "Pillar 1: Spreadsheet Hygiene & Data Pipelines",
            description: "Construct dynamic operational drivers for sales volumes, factory capacity limits, tiered pricing structures, and cost behaviors.",
            duration: "7h 45m",
            exercisesCount: 5,
            lessons: [
              { slug: "revenue-driver-architectures", title: "3.1 Revenue Driver Architectures: P×Q, Capacity Ceilings & Seasonality", duration: "50m", type: "video", xp: 55 },
              { slug: "cost-behavior-operating-leverage", title: "3.2 Cost Behavior, Operating Leverage & Cost of Goods Sold (COGS)", duration: "45m", type: "simulation", xp: 60 },
              { slug: "step-fixed-overhead-modeling", title: "3.3 Step-Fixed Costs, Raw Material Inflation & Bill-of-Materials Linkages", duration: "40m", type: "reading", xp: 45 },
              { slug: "headcount-payroll-rollforward", title: "3.4 Corporate Headcount & Payroll Roll-Forward Schedules", duration: "40m", type: "simulation", xp: 55 },
              { slug: "mini-project-1-revenue-capacity", title: "3.5 Mini-Project 1: 5-Year Dynamic Operational Revenue & Capacity Forecast Model", duration: "60m", type: "assessment", xp: 100 }
            ]
          },
          // ── PILLAR 2: CORPORATE FINANCIAL STATEMENT MODELING ──
          {
            title: "Module 4: Integrated Three-Statement Financial Modeling from Scratch",
            pillar: "Pillar 2: Corporate Financial Statement Modeling",
            description: "Construct a fully integrated, dynamic 3-statement model from an unformatted trial balance and corporate brief without balancing plugs.",
            duration: "9h 30m",
            exercisesCount: 5,
            lessons: [
              { slug: "income-statement-integration", title: "4.1 Model Architecture & Income Statement Integration down to EBIT", duration: "50m", type: "video", xp: 60 },
              { slug: "balance-sheet-cashflow-engine", title: "4.2 The Balance Sheet, Non-Cash Adjustments & the Indirect Cash Flow Engine", duration: "60m", type: "simulation", xp: 75 },
              { slug: "zero-plug-balancing-test", title: "4.3 Auditable Balancing: Eliminating Balancing Plugs and Circular Loops", duration: "45m", type: "simulation", xp: 65 },
              { slug: "retained-earnings-equity-schedules", title: "4.4 Retained Earnings, Dividends & Share Capital Roll-Forward", duration: "40m", type: "reading", xp: 45 },
              { slug: "mod4-blank-sheet-3statement-build", title: "4.5 Module 4 Blank-Sheet Integrated Model Balancing Challenge", duration: "60m", type: "assessment", xp: 100 }
            ]
          },
          {
            title: "Module 5: Working Capital & Operational Cash Flow Optimization",
            pillar: "Pillar 2: Corporate Financial Statement Modeling",
            description: "Model working capital cycles, forecast operational liquidity requirements, and assess cash conversion dynamics.",
            duration: "8h 15m",
            exercisesCount: 5,
            lessons: [
              { slug: "working-capital-days-schedules", title: "5.1 Working Capital Days (DSO, DIO, DPO) & Balance Sheet Schedules", duration: "45m", type: "video", xp: 55 },
              { slug: "cash-conversion-cycle-optimization", title: "5.2 Cash Conversion Cycle (CCC) & Operational Liquidity Stress-Testing", duration: "45m", type: "simulation", xp: 60 },
              { slug: "operating-cashflow-waterfall-bridge", title: "5.3 Cash Flow Bridging: Reconciling EBITDA to Operating Free Cash Flow", duration: "40m", type: "reading", xp: 50 },
              { slug: "working-capital-terms-sensitivity", title: "5.4 Customer Credit Terms & Supplier Optimization Sensitivity", duration: "40m", type: "simulation", xp: 55 },
              { slug: "mini-project-3-working-capital-optimizer", title: "5.5 Mini-Project 3: Working Capital Cash Conversion Cycle Optimizer", duration: "60m", type: "assessment", xp: 100 }
            ]
          },
          {
            title: "Module 6: Capex, Depreciation Corkscrews, Debt Schedules & Financing Sweeps",
            pillar: "Pillar 2: Corporate Financial Statement Modeling",
            description: "Build dynamic capital asset schedules, declining balance depreciation models, debt repayment structures, and cash sweeps.",
            duration: "9h 00m",
            exercisesCount: 5,
            lessons: [
              { slug: "capex-depreciation-corkscrews", title: "6.1 Capex Roll-Forwards & Depreciation Corkscrews (Straight-Line & Declining)", duration: "45m", type: "video", xp: 55 },
              { slug: "tax-depreciation-timing-differences", title: "6.2 Tax Timing Differences & Deferred Tax Asset/Liability Schedules", duration: "40m", type: "reading", xp: 45 },
              { slug: "debt-amortization-revolvers-sweeps", title: "6.3 Debt Amortization, Revolving Credit Facilities & Dynamic Cash Sweeps", duration: "55m", type: "simulation", xp: 70 },
              { slug: "circularity-breakers-average-interest", title: "6.4 Resolving Circular Interest Calculations with Dedicated Breaker Switches", duration: "45m", type: "simulation", xp: 60 },
              { slug: "mini-project-4-capex-debt-engine", title: "6.5 Mini-Project 4: PP&E Depreciation Corkscrew & Debt Sweep Engine", duration: "60m", type: "assessment", xp: 100 }
            ]
          },
          // ── PILLAR 3: COMMERCIAL FP&A, DECISION SUPPORT & VALUATION ──
          {
            title: "Module 7: Commercial Finance Analytics: Price-Volume-Mix (PVM) Variance Decomposition",
            pillar: "Pillar 3: Commercial FP&A, Decision Support & Valuation",
            description: "Dissect corporate revenue and gross margin variances mathematically using Price-Volume-Mix (PVM) decomposition.",
            duration: "8h 30m",
            exercisesCount: 5,
            lessons: [
              { slug: "mathematics-of-pvm-decomposition", title: "7.1 The Mathematics of Price-Volume-Mix (PVM) Decomposition", duration: "50m", type: "video", xp: 60 },
              { slug: "sku-portfolio-mix-effects", title: "7.2 Isolating SKU Portfolio Mix Shifts from Pure Volume Growth", duration: "45m", type: "simulation", xp: 60 },
              { slug: "commercial-waterfall-bridge-charts", title: "7.3 Commercial Margin Waterfall Bridges & Executive Visual Storytelling", duration: "45m", type: "simulation", xp: 60 },
              { slug: "reconciling-margin-dilution-fmcg", title: "7.4 Case Study: Diagnosing Margin Contraction in Unilever / BAT Portfolios", duration: "40m", type: "reading", xp: 50 },
              { slug: "mini-project-2-pvm-variance-engine", title: "7.5 Mini-Project 2: Commercial PVM & Margin Waterfall Engine (25k+ Ledger Rows)", duration: "60m", type: "assessment", xp: 100 }
            ]
          },
          {
            title: "Module 8: Customer Economics, Distributor Trade Terms & SKU Profitability",
            pillar: "Pillar 3: Commercial FP&A, Decision Support & Valuation",
            description: "Model profitability across commercial channels, distributor margin structures, promotional spend, and portfolio rationalization.",
            duration: "7h 45m",
            exercisesCount: 5,
            lessons: [
              { slug: "distributor-margin-waterfalls", title: "8.1 Distributor Margin Waterfalls & Trade Terms Economics (GSV down to NSV)", duration: "45m", type: "video", xp: 55 },
              { slug: "trade-spend-promotions-roi", title: "8.2 On-Invoice Discounts, Wholesale Rebates & Trade Promotion ROI Modeling", duration: "45m", type: "simulation", xp: 60 },
              { slug: "sku-rationalization-contribution", title: "8.3 SKU Rationalization, Direct Product Profitability (DPP) & 80/20 Pareto Rules", duration: "45m", type: "reading", xp: 50 },
              { slug: "channel-profitability-modern-vs-traditional", title: "8.4 Channel Economics: Modern Trade vs Traditional Wholesale vs E-Commerce", duration: "40m", type: "simulation", xp: 55 },
              { slug: "mod8-commercial-deal-pricing-case", title: "8.5 Module 8 Commercial Deal Structuring & Discount Floor Evaluation", duration: "40m", type: "assessment", xp: 75 }
            ]
          },
          {
            title: "Module 9: Corporate FP&A: Rolling Forecasts, Variance Bridges & Management Dashboards",
            pillar: "Pillar 3: Commercial FP&A, Decision Support & Valuation",
            description: "Build dynamic corporate FP&A models, rolling monthly forecasts, and executive management reporting packs.",
            duration: "8h 15m",
            exercisesCount: 5,
            lessons: [
              { slug: "rolling-12-month-forecast-architecture", title: "9.1 Rolling 12-Month Forecasts: Splicing YTD Actuals with Rest-of-Year Projections", duration: "50m", type: "video", xp: 60 },
              { slug: "run-rate-seasonality-indices", title: "9.2 Trailing Run-Rates, Seasonality Indices & Operating Expense Forecasting", duration: "45m", type: "simulation", xp: 55 },
              { slug: "budget-vs-actual-variance-packs", title: "9.3 Plan-vs-Actual Variance Packs with Threshold Alert Flags", duration: "40m", type: "reading", xp: 45 },
              { slug: "executive-kpi-dashboard-architecture", title: "9.4 Executive C-Suite Dashboard Design & Visual Hierarchy Standards", duration: "50m", type: "simulation", xp: 65 },
              { slug: "mini-project-5-rolling-forecast-dashboard", title: "9.5 Mini-Project 5: Corporate FP&A Rolling Forecast & Executive Dashboard", duration: "60m", type: "assessment", xp: 100 }
            ]
          },
          {
            title: "Module 10: Dynamic Scenario Engines, Valuation & Strategic Business Case Modeling",
            pillar: "Pillar 3: Commercial FP&A, Decision Support & Valuation",
            description: "Build flexible scenario engines, conduct two-way sensitivity analyses, model corporate valuations, and defend business cases before an executive panel.",
            duration: "11h 00m",
            exercisesCount: 8,
            lessons: [
              { slug: "multi-case-scenario-switch", title: "10.1 Multi-Scenario Architecture: Base, Downside & Upside Toggles (CHOOSE / INDEX)", duration: "50m", type: "video", xp: 60 },
              { slug: "two-way-sensitivity-data-tables", title: "10.2 Two-Way Sensitivity Data Tables & Calculation Performance Optimization", duration: "50m", type: "simulation", xp: 65 },
              { slug: "dcf-fcff-valuation-mechanics", title: "10.3 Unlevered Free Cash Flow (FCFF), WACC & Terminal Value Calculations", duration: "55m", type: "video", xp: 65 },
              { slug: "capital-budgeting-npv-irr-payback", title: "10.4 Capital Investment Appraisal: NPV, IRR, Payback & Facility Expansion", duration: "50m", type: "simulation", xp: 60 },
              { slug: "tier-3-mid-program-challenge", title: "10.5 Tier 3: 2-Hour Timed Modeling Challenge (Module 1-5 Comprehensive)", duration: "120m", type: "assessment", xp: 150 },
              { slug: "tier-4-afm-proctored-live-build", title: "10.6 Tier 4: 4-Hour Proctored Live Blank-Sheet Build Exam", duration: "240m", type: "assessment", xp: 300 },
              { slug: "tier-5-executive-model-defense", title: "10.7 Tier 5: 30-Minute Oral Capstone Model Defense Before Executive Panel", duration: "45m", type: "assessment", xp: 200 },
              { slug: "ccfcm-career-passport-issuance", title: "10.8 CCFCM Designation Credentialing & Verified Career Passport Issuance", duration: "30m", type: "reading", xp: 100 }
            ]
          }
        ]
      },
      ENTERPRISE_BI_COURSE
    ]
  },
  "digital-media-production": {
    slug: "digital-media-production",
    title: "Digital Media & Production Systems",
    subtitle: "From Social Video Editing to Generative AI Production Pipelines",
    category: "media",
    description: "Production-grade workflow covering CapCut social video editing, generative AI audio/visual production, and professional motion graphic assets.",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    icon: "Video",
    students: 1840,
    rating: 4.88,
    skills: ["CapCut Editing", "Generative AI Video", "ElevenLabs Audio", "Motion Graphics"],
    capstoneDeliverable: "15-Asset Brand Commercial & Motion Graphics Launch Package",
    courses: [
      {
        slug: "video-ai-production",
        pathSlug: "digital-media-production",
        title: "Video Editing + AI Production",
        description: "The complete pipeline from CapCut social video editing to generative AI production (Gemini + ElevenLabs) and professional motion graphics.",
        lessons: 36,
        hours: 34,
        skills: ["CapCut Desktop & Mobile", "Generative AI Scripting", "Voice Synthesis", "Commercial Pacing"],
        enrolledCount: 1120,
        rating: 4.9,
        capstoneProject: {
          title: "Brand Commercial & Motion Graphics Launch Package",
          brief: "Produce a high-retention 60-second product launch video with custom voice synthesis, dynamic captions, and motion-tracked graphics.",
          deliverable: "Final 4K video master (.mp4) and project timeline archive.",
          rubric: [
            "Pacing and retention hook within first 3 seconds",
            "Audio normalization and clean voiceover integration",
            "Consistent brand color grading and typography hierarchy",
            "Seamless multi-camera and B-roll transitions"
          ]
        },
        modules: [
          {
            title: "STAGE 0: Orientation",
            description: "Master orientation workflows: Teach editing before teaching software — master shot grammar, A-roll vs B-roll, pacing, rhythm, viewer attention, and what separates amateur cuts from...",
            duration: "4h 15m",
            exercisesCount: 3,
            lessons: [
              { slug: "module-01-understanding-video-editing", title: "Module 01: Understanding Video Editing", duration: "45m", type: "video", xp: 100 },
              { slug: "module-02-video-fundamentals", title: "Module 02: Video Fundamentals", duration: "40m", type: "video", xp: 100 },
              { slug: "module-03-the-capcut-ecosystem", title: "Module 03: The CapCut Ecosystem", duration: "50m", type: "simulation", xp: 100 },
            ]
          },
          {
            title: "STAGE 1: Editing Foundations",
            description: "Master editing foundations workflows: Master media bins, folder hierarchies, naming conventions, asset versioning, and non-destructive editable project structures....",
            duration: "4h 15m",
            exercisesCount: 6,
            lessons: [
              { slug: "module-04-media-management-project-organization", title: "Module 04: Media Management & Project Organization", duration: "45m", type: "assessment", xp: 120 },
              { slug: "module-05-timeline-mastery", title: "Module 05: Timeline Mastery", duration: "55m", type: "video", xp: 120 },
              { slug: "module-06-cutting-trimming-precision-editing", title: "Module 06: Cutting, Trimming & Precision Editing", duration: "1h 10m", type: "simulation", xp: 150 },
              { slug: "module-07-editing-grammar", title: "Module 07: Editing Grammar", duration: "50m", type: "video", xp: 120 },
              { slug: "module-08-transform-crop-framing", title: "Module 08: Transform, Crop & Framing", duration: "45m", type: "assessment", xp: 120 },
              { slug: "module-09-first-complete-video", title: "Module 09: First Complete Video", duration: "1h 15m", type: "simulation", xp: 180 },
            ]
          },
          {
            title: "STAGE 2: Visual & Audio Design",
            description: "Master visual & audio design workflows: Master audio waveforms, track hierarchy, gain staging, fade envelopes, volume normalization, and de-linking audio tracks....",
            duration: "4h 15m",
            exercisesCount: 7,
            lessons: [
              { slug: "module-10-audio-fundamentals", title: "Module 10: Audio Fundamentals", duration: "50m", type: "video", xp: 120 },
              { slug: "module-11-audio-cleanup-voice-processing", title: "Module 11: Audio Cleanup & Voice Processing", duration: "55m", type: "video", xp: 140 },
              { slug: "module-12-sound-design", title: "Module 12: Sound Design", duration: "1h 15m", type: "assessment", xp: 160 },
              { slug: "module-13-typography", title: "Module 13: Typography", duration: "45m", type: "video", xp: 120 },
              { slug: "module-14-captions-transcript-based-editing", title: "Module 14: Captions & Transcript-Based Editing", duration: "1h 10m", type: "video", xp: 160 },
              { slug: "module-15-transitions", title: "Module 15: Transitions", duration: "45m", type: "simulation", xp: 120 },
              { slug: "module-16-effects-filters-stickers-overlays", title: "Module 16: Effects, Filters, Stickers & Overlays", duration: "45m", type: "assessment", xp: 120 },
            ]
          },
          {
            title: "STAGE 3: Advanced Motion & Compositing",
            description: "Master advanced motion & compositing workflows: Master multi-layer timeline architecture, Picture-in-Picture (PiP), reaction layouts, Compound Clips, and execute PROJECT 04....",
            duration: "4h 15m",
            exercisesCount: 7,
            lessons: [
              { slug: "module-17-layers-pip-compositing", title: "Module 17: Layers, PiP & Compositing", duration: "1h 10m", type: "video", xp: 160 },
              { slug: "module-18-keyframe-animation", title: "Module 18: Keyframe Animation", duration: "1h 00m", type: "simulation", xp: 150 },
              { slug: "module-19-speed-control-speed-ramping", title: "Module 19: Speed Control & Speed Ramping", duration: "1h 10m", type: "video", xp: 160 },
              { slug: "module-20-masking", title: "Module 20: Masking", duration: "55m", type: "assessment", xp: 140 },
              { slug: "module-21-chroma-key-background-removal", title: "Module 21: Chroma Key & Background Removal", duration: "1h 10m", type: "simulation", xp: 160 },
              { slug: "module-22-motion-tracking", title: "Module 22: Motion Tracking", duration: "1h 10m", type: "video", xp: 160 },
              { slug: "module-23-stabilization-enhancement-relighting", title: "Module 23: Stabilization, Enhancement & Relighting", duration: "50m", type: "video", xp: 140 },
            ]
          },
          {
            title: "STAGE 4: Professional Post-Production",
            description: "Master professional post-production workflows: Master technical color correction: exposure balancing, contrast, highlights, shadows, white balance, tint, HSL sliders, and curve graphs....",
            duration: "4h 15m",
            exercisesCount: 5,
            lessons: [
              { slug: "module-24-color-correction", title: "Module 24: Color Correction", duration: "1h 00m", type: "assessment", xp: 150 },
              { slug: "module-25-color-grading", title: "Module 25: Color Grading", duration: "1h 10m", type: "video", xp: 160 },
              { slug: "module-26-advanced-audio-masterclass", title: "Module 26: Advanced Audio Masterclass", duration: "1h 00m", type: "video", xp: 150 },
              { slug: "module-27-advanced-text-motion-graphics", title: "Module 27: Advanced Text & Motion Graphics", duration: "1h 00m", type: "simulation", xp: 150 },
              { slug: "module-28-advanced-editorial-projects", title: "Module 28: Advanced Editorial Projects", duration: "1h 30m", type: "assessment", xp: 200 },
            ]
          },
          {
            title: "STAGE 5: AI & Modern CapCut",
            description: "Master ai & modern capcut workflows: Master CapCut AI tools: Text-to-Speech (TTS), AI auto-edit, AI background cutout, AI color matching, and human quality-control oversight....",
            duration: "4h 15m",
            exercisesCount: 3,
            lessons: [
              { slug: "module-29-capcut-ai-foundations", title: "Module 29: CapCut AI Foundations", duration: "45m", type: "video", xp: 130 },
              { slug: "module-30-generative-ai-content-workflows", title: "Module 30: Generative & AI Content Workflows", duration: "1h 10m", type: "simulation", xp: 160 },
              { slug: "module-31-ai-production-pipeline", title: "Module 31: AI Production Pipeline", duration: "1h 00m", type: "video", xp: 150 },
            ]
          },
          {
            title: "STAGE 6: Real-World Editing",
            description: "Master real-world editing workflows: Master platform-specific editing tracks: TikTok (trends/hooks), Instagram Reels (polish/branding), YouTube Shorts (retention/CTA), and execute PROJECT...",
            duration: "4h 15m",
            exercisesCount: 4,
            lessons: [
              { slug: "module-32-social-media-editing", title: "Module 32: Social Media Editing", duration: "1h 15m", type: "assessment", xp: 160 },
              { slug: "module-33-editing-specializations", title: "Module 33: Editing Specializations", duration: "1h 20m", type: "simulation", xp: 180 },
              { slug: "module-34-professional-workflow", title: "Module 34: Professional Workflow", duration: "55m", type: "video", xp: 140 },
              { slug: "module-35-troubleshooting-technical-mastery", title: "Module 35: Troubleshooting & Technical Mastery", duration: "50m", type: "video", xp: 130 },
            ]
          },
          {
            title: "STAGE 7: Mastery & Capstone",
            description: "Master mastery & capstone workflows: The Final Crucible: Receive unedited raw footage and a written client brief with NO tutorial recipes. Execute PROJECT 15 to earn your Master Certifica...",
            duration: "4h 15m",
            exercisesCount: 1,
            lessons: [
              { slug: "module-36-capcut-mastery-professional-capstone", title: "Module 36: CapCut Mastery & Professional Capstone", duration: "3h 00m", type: "assessment", xp: 500 },
            ]
          }
        ]
      }
    ]
  },
  "business-intelligence-analyst": {
    slug: "business-intelligence-analyst",
    title: "Enterprise Business Intelligence & Power BI",
    subtitle: "Enterprise SQL Pipelines, Kimball Dimensional Modeling & Advanced DAX",
    category: "analytics",
    description: "The complete 120-hour enterprise business intelligence apprenticeship. Master PostgreSQL, DuckDB, Power Query, Star Schemas, DAX filter contexts, and executive Power BI decision dashboards.",
    gradient: "linear-gradient(135deg, #0f172a 0%, #0369a1 50%, #0284c7 100%)",
    icon: "BarChart3",
    students: 1560,
    rating: 4.99,
    skills: ["PostgreSQL", "DuckDB", "Power Query", "Kimball Star Schema", "Advanced DAX", "Power BI Desktop", "Executive Storytelling"],
    capstoneDeliverable: "Apex Consumer Goods Enterprise BI Simulation & 6-Hour Practical Defense",
    courses: [ENTERPRISE_BI_COURSE]
  }
};

export function getCourseBySlug(courseSlug: string): CourseItem | null {
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
        (courseSlug === "excel-corporate" && c.slug === "corporate-financial-commercial-modeling-excel")
    );
    if (found) return found;
  }
  return null;
}
