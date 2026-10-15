export interface DiagnosticQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface ChallengeDatasetRow {
  [key: string]: string | number;
}

export interface Challenge {
  id: string;
  title: string;
  hostEntity: string;
  category: "Data Science" | "Corporate Analytics" | "AI Engineering" | "Business Case" | "Automation" | "SQL & BI" | "Software Development" | "Strategy & Planning";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "Active" | "Finished";
  duration: string;
  prize: string;
  participants: number;
  description: string;
  tags: string[];
  teamSize: string;
  fee: string;
  location: string;
  ppoOffered?: boolean;
  daysLeft?: string;
  registeredCount: number;
  datasetHeaders?: string[];
  datasetRows?: ChallengeDatasetRow[];
  diagnosticQuestions?: DiagnosticQuestion[];
  casePrompt?: string;
  benchmarkSolution?: string;
  hints?: string[];
}

export const challengesData: Challenge[] = [
  {
    id: "fmcg-commercial-modeling-sprint",
    title: "National FMCG Commercial Financial Modeling & Dynamic Lambda Sprint",
    hostEntity: "Unilever & BAT Bangladesh Corporate Finance Cohort",
    category: "Corporate Analytics",
    difficulty: "Advanced",
    status: "Active",
    duration: "48 Hours Sprint",
    prize: "৳১,৫০,০০০ + Management Trainee (MTO) PPI Offer",
    participants: 1840,
    registeredCount: 1840,
    daysLeft: "12 Days Left",
    ppoOffered: true,
    teamSize: "1-2 Members",
    fee: "Free for Verified Students",
    location: "Online Simulation + Dhaka Finals",
    description: "Architect an audit-grade 3-statement commercial financial model in Excel. Utilize Dynamic Array Lambda functions, dynamic scenario matrices, and XLOOKUP working capital logic to project cash conversion cycles under 15% inflation pressure.",
    tags: ["Excel", "Financial Modeling", "Dynamic Arrays", "FMCG MTO", "Working Capital"],
    casePrompt: "A tier-1 multinational distributor network faces liquidity compression due to 60-day credit terms and FX import swings. Synthesize a 3-statement working capital schedule projecting cash conversion cycles and debt service coverage ratios (DSCR).",
    datasetHeaders: ["Distributor_ID", "Region", "Credit_Days", "Annual_Turnover_BDT", "Default_Risk_Score", "Working_Cap_Requirement"],
    datasetRows: [
      { Distributor_ID: "DIST-001", Region: "Dhaka North", Credit_Days: 45, Annual_Turnover_BDT: "৳85,000,000", Default_Risk_Score: "Low (0.04)", Working_Cap_Requirement: "৳12,500,000" },
      { Distributor_ID: "DIST-002", Region: "Chittagong Port", Credit_Days: 60, Annual_Turnover_BDT: "৳140,000,000", Default_Risk_Score: "Moderate (0.11)", Working_Cap_Requirement: "৳26,000,000" },
      { Distributor_ID: "DIST-003", Region: "Sylhet Division", Credit_Days: 30, Annual_Turnover_BDT: "৳42,000,000", Default_Risk_Score: "Very Low (0.02)", Working_Cap_Requirement: "৳4,800,000" },
      { Distributor_ID: "DIST-004", Region: "Rajshahi Division", Credit_Days: 75, Annual_Turnover_BDT: "৳68,000,000", Default_Risk_Score: "High (0.24)", Working_Cap_Requirement: "৳18,200,000" },
    ],
    diagnosticQuestions: [
      {
        id: 1,
        question: "When modeling dynamic circular debt balances in corporate Excel, what formula approach eliminates iterative calculation crashes?",
        options: [
          "LET() combined with custom LAMBDA recursion or average cash buffer capping",
          "Hardcoding past year interest expense into every future period",
          "Using nested IF statements without bounds checking",
          "Enabling unlimited circular iterations up to 10,000 steps"
        ],
        correct: "LET() combined with custom LAMBDA recursion or average cash buffer capping",
        explanation: "Dynamic LET/LAMBDA or explicit beginning-balance interest avoids unstable iterative circular references in corporate Excel models."
      },
      {
        id: 2,
        question: "How does an increase in Days Sales Outstanding (DSO) from 45 to 60 directly affect the cash conversion cycle (CCC)?",
        options: [
          "Increases CCC by 15 days, locking up more working capital in receivables",
          "Decreases CCC by 15 days, freeing up immediate liquid cash",
          "Has zero impact on cash flows because revenue is already recognized",
          "Reduces supplier days payable outstanding (DPO) automatically"
        ],
        correct: "Increases CCC by 15 days, locking up more working capital in receivables",
        explanation: "CCC = DSO + DIO - DPO. Higher DSO directly prolongs cash conversion and increases tied-up capital."
      }
    ],
    hints: [
      "Review the Dynamic Array course modules in Excel Modeling.",
      "Check sensitivity tables for 12%, 15%, and 18% cost-of-capital variants."
    ],
    benchmarkSolution: "Model must balance with zero balance-sheet variance (Check Cell = 0) and generate an automated executive sensitivity chart."
  },
  {
    id: "enterprise-ai-workflow-automation-hackathon",
    title: "Enterprise AI & Multi-Agent Workflow Automation Hackathon",
    hostEntity: "INSYT AI Systems & Automation Lab",
    category: "AI Engineering",
    difficulty: "Intermediate",
    status: "Active",
    duration: "72 Hours Online",
    prize: "৳১,০০,০০০ + Direct AI Operations Internship",
    participants: 1290,
    registeredCount: 1290,
    daysLeft: "9 Days Left",
    ppoOffered: true,
    teamSize: "1-3 Members",
    fee: "Free",
    location: "Virtual Code & Architecture Defense",
    description: "Design and implement a fault-tolerant autonomous enterprise pipeline using n8n, structured LLM JSON extraction, and bounded document verification for processing corporate vendor invoices and RFP legal agreements.",
    tags: ["AI Automation", "n8n", "LLM Pipelines", "JSON Schema", "Enterprise AI"],
    casePrompt: "Corporate procurement receives 500+ heterogeneous vendor invoices weekly in PDF and scanned image formats. Build an autonomous workflow that parses VAT numbers, audits math discrepancies, and routes exceptions to slack.",
    datasetHeaders: ["Invoice_No", "Vendor_Name", "Raw_Text_Extracted", "Tax_ID_Present", "Calculated_Sum", "Reported_Sum"],
    datasetRows: [
      { Invoice_No: "INV-9921", Vendor_Name: "Delta Logistics Ltd", Raw_Text_Extracted: "SUBTOTAL 45,000 BDT TAX 15% TOTAL 51,750", Tax_ID_Present: "True", Calculated_Sum: "৳51,750", Reported_Sum: "৳51,750" },
      { Invoice_No: "INV-9922", Vendor_Name: "Apex Packaging Inc", Raw_Text_Extracted: "SUBTOTAL 120,000 BDT TAX 7.5% TOTAL 130,000", Tax_ID_Present: "True", Calculated_Sum: "৳129,000", Reported_Sum: "৳130,000 [FLAG]" },
    ],
    diagnosticQuestions: [
      {
        id: 1,
        question: "When enforcing deterministic output from an LLM for enterprise database insertion, which technique is most robust?",
        options: [
          "Strict Pydantic / Zod JSON schema validation with fallback repair loop",
          "Asking the model kindly to 'please respond only in valid JSON'",
          "Increasing temperature to 1.2 to increase reasoning creativity",
          "Truncating the prompt to save token costs"
        ],
        correct: "Strict Pydantic / Zod JSON schema validation with fallback repair loop",
        explanation: "Structured schema constraints combined with bounded retries guarantee deterministic schema compliance."
      }
    ],
    hints: ["Use structured tool calling in LLMs to enforce valid parameter extraction."]
  },
  {
    id: "national-power-bi-fpa-cup",
    title: "National Corporate BI & FP&A Revenue Analytics Cup",
    hostEntity: "Telecom & Fintech Enterprise Data Summit",
    category: "SQL & BI",
    difficulty: "Advanced",
    status: "Active",
    duration: "5 Days Simulation",
    prize: "৳১,২০,০০০ + Fast-Track Data Analyst Assessment",
    participants: 2150,
    registeredCount: 2150,
    daysLeft: "15 Days Left",
    ppoOffered: true,
    teamSize: "1-2 Members",
    fee: "Free",
    location: "Virtual Dashboard Defense",
    description: "Synthesize 500,000+ subscriber transaction records into executive DAX time-intelligence metrics, cohort retention matrices, and interactive Power BI drill-through dashboards for C-suite decision making.",
    tags: ["Power BI", "DAX", "SQL", "Cohort Retention", "FP&A"],
    casePrompt: "A digital wallet provider noticed a 4.2% drop in 30-day active user frequency. Build a dynamic Star Schema model with DAX measures evaluating monthly customer acquisition costs (CAC) vs. customer lifetime value (LTV).",
    diagnosticQuestions: [
      {
        id: 1,
        question: "What is the primary architectural rule when designing high-performance Power BI models?",
        options: [
          "Strict Star Schema with clean Fact and Dimension tables",
          "Merging all data into one giant flat table with 100 columns",
          "Writing all measures in Excel and importing as static values",
          "Creating bidirectional cross-filtering across all tables"
        ],
        correct: "Strict Star Schema with clean Fact and Dimension tables",
        explanation: "Star Schema reduces memory footprint and optimizes VertiPaq compression engine performance."
      }
    ],
    hints: ["Avoid bidirectional relationships on high-cardinality foreign keys."]
  },
  {
    id: "strategic-case-mece-defense",
    title: "Strategic Market Entry & MECE Boardroom Defense Simulation",
    hostEntity: "Management Consulting & Private Equity Advisory Council",
    category: "Strategy & Planning",
    difficulty: "Advanced",
    status: "Active",
    duration: "36 Hours Case Sprint",
    prize: "৳৮০,০০০ + Executive Mentorship & Strategy Fast-Track",
    participants: 940,
    registeredCount: 940,
    daysLeft: "18 Days Left",
    ppoOffered: true,
    teamSize: "2-4 Members",
    fee: "Free",
    location: "Dhaka Boardroom Simulation",
    description: "Crack an ambiguous FMCG expansion dilemma in Southeast Asia. Deliver a MECE issue tree, BLUF executive memorandum, and 5-slide boardroom presentation deck with sensitivity risk matrices.",
    tags: ["Management Consulting", "MECE", "Minto Pyramid", "Case Interview", "Strategy"],
    casePrompt: "A diversified conglomerate must choose between acquiring a regional dairy processor or investing in organic cold-chain distribution. Quantify opportunity costs and structure a recommendation for the Board of Directors.",
    diagnosticQuestions: [
      {
        id: 1,
        question: "What does the BLUF executive communication principle dictate?",
        options: [
          "Bottom Line Up Front: State the core recommendation in the first sentence",
          "Bury Lowest Utility Factors: Hide bad financial news in appendices",
          "Build Long Unstructured Findings: Provide all data before conclusions",
          "Business Logistics Under Flow: Focus purely on supply chain"
        ],
        correct: "Bottom Line Up Front: State the core recommendation in the first sentence",
        explanation: "BLUF ensures busy executives immediately understand the actionable recommendation before delving into supporting evidence."
      }
    ],
    hints: ["Use Minto Pyramid structure: Governing Thought -> Key Line Arguments -> Supporting Data."]
  },
  {
    id: "capcut-creative-video-production-challenge",
    title: "Corporate Creative Video & AI Media Production Challenge",
    hostEntity: "Digital Creative Guild & FMCG Brand Council",
    category: "Corporate Analytics",
    difficulty: "Intermediate",
    status: "Active",
    duration: "4 Days Creative Sprint",
    prize: "৳৭৫,০০০ + Freelance Creative Retainer Contract",
    participants: 1680,
    registeredCount: 1680,
    daysLeft: "21 Days Left",
    ppoOffered: false,
    teamSize: "Individual",
    fee: "Free",
    location: "Online Video Showcase",
    description: "Produce a high-retention 60-second corporate commercial using pacing control, custom kinetic typography, AI voice cloning, and B-roll match-cutting designed for LinkedIn and TikTok corporate branding.",
    tags: ["Video Production", "CapCut", "AI Media", "Kinetic Typography", "Brand Storytelling"],
    diagnosticQuestions: [
      {
        id: 1,
        question: "In short-form mobile video pacing, what visual event frequency maximizes viewer retention in the first 3 seconds?",
        options: [
          "Dynamic visual hook, caption movement, or cut every 0.8 to 1.5 seconds",
          "A static company logo displayed for 10 seconds with classical music",
          "A person introducing themselves slowly with their full title",
          "A black screen with small white legal text"
        ],
        correct: "Dynamic visual hook, caption movement, or cut every 0.8 to 1.5 seconds",
        explanation: "Rapid micro-visual pacing in the first 3 seconds combats drop-off and hooks executive viewers."
      }
    ],
    hints: ["Ensure audio levels peak at -3dB to avoid clipping and compression distortion."]
  },
  {
    id: "python-algorithmic-reconciliation-challenge",
    title: "Automated Business Operations & Financial Python Pipelines",
    hostEntity: "Multinational Banking & Shared Services Technology Hub",
    category: "Automation",
    difficulty: "Intermediate",
    status: "Active",
    duration: "48 Hours Online",
    prize: "৳১,০০,০০০ + Technical Operations Analyst Interview",
    participants: 1120,
    registeredCount: 1120,
    daysLeft: "24 Days Left",
    ppoOffered: true,
    teamSize: "1-2 Members",
    fee: "Free",
    location: "Virtual Code Submission",
    description: "Build resilient Python scripts using Pandas, OpenPyXL, and automated email dispatch to reconcile daily bank statements and general ledger variances with zero human intervention.",
    tags: ["Python", "Pandas", "Automation", "Bank Reconciliation", "Data Pipelines"],
    diagnosticQuestions: [
      {
        id: 1,
        question: "When joining two financial transaction dataframes with potential fuzzy text descriptions, which Pandas merge technique prevents silent drops?",
        options: [
          "Outer merge with indicator=True followed by variance triage",
          "Inner merge that ignores unmatched records silently",
          "Concatenating rows without verifying transaction IDs",
          "Filling missing account numbers with 0"
        ],
        correct: "Outer merge with indicator=True followed by variance triage",
        explanation: "Outer merge with indicator=True flags discrepancies on both sides, ensuring no transaction variance is lost."
      }
    ],
    hints: ["Use fuzzywuzzy or difflib for matching transaction memo strings with slight spelling deviations."]
  }
];
