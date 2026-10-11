import { LessonDetail } from "./lessons";

export const CORPORATE_WORKPLACE_LESSONS: Record<string, LessonDetail> = {
  // ═══════════════════════════════════════════════════════════════
  // COURSE 01: AI-POWERED WORKPLACE PROFESSIONAL
  // ═══════════════════════════════════════════════════════════════
  "prompt-engineering-foundations": {
    slug: "prompt-engineering-foundations",
    title: "1.1 Prompt Engineering Foundations & Cognitive LLM Architecture",
    xpReward: 60,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Prompt Engineering Foundations & LLM Architecture

#### Executive Summary & Mental Model
Large Language Models (LLMs) like GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro are probabilistic token prediction engines. They do not "think" like humans; they calculate probability distributions conditioned on context. Treating an LLM as a search box results in generic, unverified hallucinations. Treating it as a cognitive reasoning co-pilot produces institutional-grade deliverables.

#### The 5-Part Enterprise Prompt Framework:
1. **Persona / Role**: "You are a Senior Strategic Planning Associate at an FMCG enterprise (Unilever/BAT standard)."
2. **Context & Constraints**: "We operate in a high-inflation environment with 12% retail margin compression. Avoid generic corporate buzzwords."
3. **Task Definition**: "Draft a 1-page situational appraisal evaluating distributor trade terms."
4. **Input Data**: Clearly delineate source facts with triple backticks (\`\`\`) or XML tags (\`<source_data>\`).
5. **Output Specification**: "Format as a structured executive memo with 3 bulleted key takeaways, a 4-row tabular comparison, and 2 concrete next steps."

#### Few-Shot Demonstration & Chain-of-Thought (CoT):
* **Zero-Shot Prompting**: Direct command without demonstration. Prone to variance.
* **Few-Shot Prompting**: Supplying 1-3 high-quality corporate examples before asking for the target output. Boosts output consistency by over 80%.
* **CoT (Chain-of-Thought)**: Instructing the model: *"Think step-by-step and write down your reasoning before presenting the final conclusion."* This forces the LLM to allocate inference tokens to intermediate logic.`,
    quiz: {
      question: "Which prompting technique forces an LLM to generate intermediate reasoning tokens, significantly reducing mathematical and logical hallucinations in corporate analysis?",
      options: [
        "Zero-Shot Prompting",
        "Chain-of-Thought (CoT) Prompting",
        "Temperature Maximization",
        "Top-P Truncation"
      ],
      correctIdx: 1,
      explanation: "Chain-of-Thought (CoT) prompting instructs the model to break down its reasoning into intermediate sequential steps before arriving at the final output, dramatically reducing logical errors."
    },
    hasSimulator: "ai-verification"
  },

  "chatgpt-advanced-reasoning": {
    slug: "chatgpt-advanced-reasoning",
    title: "1.2 Advanced Reasoning & Multi-Step Executive Problem Solving",
    xpReward: 70,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Advanced Reasoning & Multi-Step Problem Solving

#### Deconstructing Complex Corporate Tasks
Real office tasks are never single-turn questions. A request like "Analyze our competitor's launch and write an executive briefing" requires four discrete cognitive phases:
1. **Information Extraction**: Parsing the competitor's press releases, pricing announcements, and product specs.
2. **Strategic Synthesis**: Mapping findings against Porter's Five Forces and customer segment profiles.
3. **Trade-Off Evaluation**: Calculating financial impact on gross margin and distribution channel share.
4. **Executive Communication**: Drafting an action-oriented briefing deck for senior management.

#### Modular Prompt Chaining vs. Monolithic Prompts:
* **The Monolithic Failure**: Asking the model to do all 4 steps in a single prompt causes attention dilution and skipped details.
* **Prompt Chaining Strategy**: Break the workflow into linked prompts where Output A becomes the validated Input for Prompt B. Validate each step before advancing.`,
    quiz: {
      question: "Why is prompt chaining superior to a single massive prompt when solving complex multi-stage corporate tasks with AI?",
      options: [
        "It uses fewer total characters",
        "It prevents attention dilution and allows human verification of intermediate reasoning at each step",
        "It automatically translates output into multiple languages",
        "It bypasses all enterprise security firewalls"
      ],
      correctIdx: 1,
      explanation: "Prompt chaining breaks complex workflows into discrete, auditable steps, allowing human analysts to inspect, verify, and correct intermediate outputs before generating the final deliverable."
    },
    hasSimulator: "ai-verification"
  },

  "gemini-deep-research-synthesis": {
    slug: "gemini-deep-research-synthesis",
    title: "1.3 Gemini & Deep Research: Synthesizing Multi-Source Reports",
    xpReward: 65,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Gemini & Deep Research Synthesis

#### Large Context Window Mastery (1M+ Tokens)
Gemini's breakthrough capability is its million-token multimodal context window. Instead of summarizing snippets, analysts can upload:
* Complete 150-page annual reports (e.g., Square Pharmaceuticals, Grameenphone, BAT Bangladesh).
* 3 years of quarterly earnings call transcripts.
* Complete regulatory circulars from Bangladesh Bank and BSEC.

#### Cross-Document Triangulation:
Prompting pattern for multi-file audits:
\`\`\`text
Compare the foreign exchange risk disclosures in Document A (2024 Annual Report) with Document B (2025 Annual Report).
1. Identify any newly added risk factors regarding USD/BDT currency hedging.
2. Construct a side-by-side comparison table showing reported FX loss provisions.
3. Cite the exact page number and paragraph for every quantitative figure.
\`\`\``,
    quiz: {
      question: "When auditing multi-year annual corporate disclosures using large-context AI models like Gemini, what practice is mandatory to ensure factual auditability?",
      options: [
        "Relying entirely on model memory without source files",
        "Requiring explicit page and paragraph citations for every quantitative figure",
        "Setting model creativity to the highest possible value",
        "Summarizing without reading the numbers"
      ],
      correctIdx: 1,
      explanation: "Requiring explicit source document citations (page and paragraph) ensures that every data point can be independently audited against original regulatory disclosures."
    },
    hasSimulator: "ai-verification"
  },

  "notebooklm-document-forensics": {
    slug: "notebooklm-document-forensics",
    title: "1.4 NotebookLM & Document Forensics: Zero-Hallucination Citations",
    xpReward: 70,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### NotebookLM & Zero-Hallucination Document Forensics

#### Grounded RAG Architecture
Google NotebookLM creates a dedicated, sandboxed Retrieval-Augmented Generation (RAG) space for your project. Unlike public ChatGPT, NotebookLM:
* **Grounded Exclusively in Your Sources**: Does not pull unverified general knowledge from the open internet unless explicitly commanded.
* **Inline Citation Chips**: Every sentence generated by the model includes clickable citation numbers. Clicking a chip opens the source PDF directly to the highlighted sentence.
* **Source Guide & Briefing Doc**: Automatically generates table of contents, timeline summaries, and key concept taxonomies upon uploading corporate dossiers.`,
    quiz: {
      question: "What makes NotebookLM uniquely suited for legal contracts, policy manuals, and corporate audit dossiers compared to generic web chatbots?",
      options: [
        "It draws information from unverified social media blogs",
        "It restricts responses strictly to uploaded sources and provides direct clickable citation chips to exact text passages",
        "It writes unformatted text files without punctuation",
        "It automatically approves corporate expenses"
      ],
      correctIdx: 1,
      explanation: "NotebookLM's strict source grounding and clickable citation chips allow analysts to instantly verify facts against original legal or regulatory documents with zero hallucination."
    },
    hasSimulator: "ai-verification"
  },

  "ai-document-writing-memos": {
    slug: "ai-document-writing-memos",
    title: "1.5 Executive Document Writing: Boardroom Memos & Briefing Papers",
    xpReward: 75,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Executive Document Writing & Boardroom Memos

#### The Anatomy of a High-Impact Corporate Memo
Executive leadership in top corporations (Unilever, Marico, bKash) does not have time to read 15-page meandering essays. They read structured memos using the **BLUF (Bottom Line Up Front)** standard:
1. **BLUF / Executive Recommendation (2-3 sentences)**: What decision is required, why, and what is the net financial impact?
2. **Situational Context & Problem Statement**: The commercial reality triggering this decision.
3. **Strategic Alternatives Evaluated**: Option A (Status Quo), Option B (Recommended), Option C (Aggressive). Include pros, cons, and budget impact.
4. **Execution Roadmap & Governance**: Who owns implementation, 30-60-90 day milestones, and risk mitigation safeguards.

#### Drafting Workflow with AI:
* Provide the raw data points and core decision.
* Instruct AI to structure using BLUF and the Pyramid Principle.
* Strip all conversational fluff ("In today's fast-paced corporate world..."). Every sentence must convey operational substance.`,
    quiz: {
      question: "In the BLUF (Bottom Line Up Front) corporate memo framework, where must the core decision and expected business impact be placed?",
      options: [
        "In the concluding paragraph on the final page",
        "In a hidden appendix footnote",
        "At the very top of the document in the opening executive summary",
        "Only communicated orally in private"
      ],
      correctIdx: 2,
      explanation: "BLUF requires placing the core recommendation and financial impact right at the top so busy executive decision-makers immediately grasp the business bottom line."
    },
    hasSimulator: "email"
  },

  "ai-meeting-notes-action-items": {
    slug: "ai-meeting-notes-action-items",
    title: "1.6 Meeting Summaries & Automated Action Item Extraction",
    xpReward: 65,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Meeting Summaries & Action Item Extraction

#### Turning Messy Transcripts into Accountability
Raw meeting transcripts from Microsoft Teams, Zoom, or Google Meet are filled with colloquial conversation, false starts, and tangents. An effective Management Trainee or Executive extracts clarity and accountability.

#### The RACI-Structured Action Matrix:
When processing a transcript with AI, enforce this structured output format:
* **Meeting Objective**: 1 sentence defining the purpose.
* **Key Strategic Decisions Made**: Bulleted list of agreed policies or approvals.
* **Action Item Register (Table)**:
  * *Task*: Concrete deliverable with unambiguous definition of done.
  * *Owner*: Specific person responsible (not a department name).
  * *Deadline*: Specific date and time.
  * *Dependencies*: Pre-requisite deliverables required from other stakeholders.
  * *Status*: Open / In-Progress / Blocked.`,
    quiz: {
      question: "When summarizing cross-functional corporate meetings, what is the single biggest failure of amateur summaries?",
      options: [
        "Using bullet points instead of paragraphs",
        "Listing vague tasks without single accountable owners or concrete deadlines",
        "Including too many quantitative dates",
        "Formatting the output as an HTML table"
      ],
      correctIdx: 1,
      explanation: "Vague action items assigned to whole teams without clear individual ownership and firm deadlines lead to dropped balls and zero operational accountability."
    },
    hasSimulator: "email"
  },

  "ai-executive-presentation-deck": {
    slug: "ai-executive-presentation-deck",
    title: "1.7 Presentation Engineering: Rapid Deck Outlines & Visual Structures",
    xpReward: 80,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Presentation Engineering: Rapid Deck Outlines

#### The Assertion-Evidence Slide Structure
Traditional slides fail because they use topical headers ("Market Analysis") followed by 6 disconnected bullet points. World-class corporate decks use the **Assertion-Evidence Architecture**:
* **Slide Header (Assertion)**: A complete, assertive sentence stating the key business insight (e.g., *"North Zone distributor margins eroded 4.8% due to unauthorized secondary freight absorption"*).
* **Slide Body (Evidence)**: Visual evidence supporting that assertion (waterfall chart, comparison table, or structured process flow).

#### Using AI for Deck Construction:
1. Outline the narrative arc using the SCQA framework (Situation, Complication, Question, Answer).
2. Generate 1 slide assertion per message.
3. Define the exact visual layout (2-column contrast, 3-pillar breakdown, or metric callout card) before opening PowerPoint or Gamma.`,
    quiz: {
      question: "According to the Assertion-Evidence corporate presentation architecture, how should every executive slide headline be formatted?",
      options: [
        "A single generic noun topic (e.g., 'Overview' or 'Financials')",
        "A full assertive sentence communicating the core business insight or takeaway",
        "A humorous question to entertain the audience",
        "The company mission statement repeated on every slide"
      ],
      correctIdx: 1,
      explanation: "In the Assertion-Evidence model, the header is an active, assertive sentence stating the takeaway, which the body of the slide visually proves."
    },
    hasSimulator: "tool-matrix"
  },

  "ai-office-copilot-governance": {
    slug: "ai-office-copilot-governance",
    title: "1.8 Enterprise AI Governance, Data Privacy & Prompt Redaction",
    xpReward: 85,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Enterprise AI Governance, Data Privacy & Prompt Redaction

#### Corporate Liability & Data Leakage Prevention
Pasting confidential company data into consumer AI platforms is a major corporate compliance violation. Enterprise governance rules:
* **PII (Personally Identifiable Information)**: Never paste employee NID numbers, customer phone numbers, home addresses, or bank account numbers.
* **Proprietary Financials**: Anonymize unreleased financial numbers (e.g., transform BDT 450M into $100X indexed basis) before prompting.
* **Data Privacy Settings**: Verify whether your organization uses an Enterprise tenant with zero-data-retention agreements where prompts are not used to train foundational models.

#### Safe Tokenization & Redaction Protocol:
Replace sensitive entities with synthetic tokens:
* Replace \`Apex Consumer Goods\` with \`Company Alpha\`.
* Replace distributor names with \`Distributor 1, Distributor 2\`.
* Replace real product names with \`SKU A, SKU B\`.`,
    quiz: {
      question: "Before processing confidential corporate financial data with cloud AI tools, what anonymization technique protects proprietary metrics while maintaining mathematical relationships?",
      options: [
        "Indexing absolute monetary figures to a baseline multiplier (e.g., 100X) and replacing entity names with generic identifiers",
        "Deleting all numbers entirely",
        "Adding random punctuation to the end of prompts",
        "Translating the text into Latin"
      ],
      correctIdx: 0,
      explanation: "Indexing figures to a baseline (e.g. 100X) and using synthetic entity labels allows the AI to perform valid percentage and structural analysis without exposing real confidential numbers."
    },
    hasSimulator: "ai-verification"
  },

  // ═══════════════════════════════════════════════════════════════
  // COURSE 04: SQL & BUSINESS DATA ANALYTICS
  // ═══════════════════════════════════════════════════════════════
  "sql-business-query-foundations": {
    slug: "sql-business-query-foundations",
    title: "4.1 Relational SQL Foundations: SELECT, WHERE & Business Filters",
    xpReward: 60,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Relational SQL Query Foundations

#### Executive Summary & Query Execution Order
SQL (Structured Query Language) is the global lingua franca of enterprise databases. To write performant queries in PostgreSQL or cloud warehouses (Snowflake, BigQuery), analysts must understand the logical query processing sequence:
1. \`FROM\` & \`JOIN\`: Gather tables and cross-reference records.
2. \`WHERE\`: Filter rows at raw table grain before aggregation.
3. \`GROUP BY\`: Aggregate rows into distinct categorical buckets.
4. \`HAVING\`: Filter aggregated groups.
5. \`SELECT\`: Evaluate expressions and project output columns.
6. \`DISTINCT\`: Eliminate duplicates.
7. \`ORDER BY\`: Sort final result set.
8. \`LIMIT\` / \`OFFSET\`: Page final rows.

#### Business Filters & Defensive NULL Handling:
In business ledgers, NULL does not equal zero or empty string. NULL represents unknown data.
* \`WHERE discount_rate IS NOT NULL\` (Never \`discount_rate != NULL\`).
* Use \`COALESCE(freight_cost, 0)\` to replace NULLs with default operational values.`,
    quiz: {
      question: "In what logical sequence does a SQL database engine evaluate clauses during query execution?",
      options: [
        "SELECT -> FROM -> WHERE -> GROUP BY",
        "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
        "WHERE -> SELECT -> FROM -> ORDER BY",
        "ORDER BY -> LIMIT -> FROM -> SELECT"
      ],
      correctIdx: 1,
      explanation: "The database first identifies source tables (FROM/JOIN), filters rows (WHERE), groups records (GROUP BY), filters groups (HAVING), calculates outputs (SELECT), and finally sorts (ORDER BY)."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "sql-multi-table-joins-hygiene": {
    slug: "sql-multi-table-joins-hygiene",
    title: "4.2 Relational Join Hygiene: Preventing Cartesian Duplication",
    xpReward: 70,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Relational Join Hygiene & Duplication Prevention

#### The Silent Killer: Cartesian Fan-Out
When joining transactional sales facts with dimensional tables or secondary pricing ledgers, many analysts fall into the Many-to-Many trap. If table A has multiple rows for a key and table B also has multiple rows, the join multiplies rows ($M \\times N$).
* **Symptoms**: Total company revenue mysteriously doubles or quadruples.
* **Prevention**:
  1. Inspect join grain: Is the right-side table unique on the join key?
  2. Run a pre-join uniqueness check:
     \`\`\`sql
     SELECT distributor_id, COUNT(*)
     FROM dim_distributors
     GROUP BY distributor_id
     HAVING COUNT(*) > 1;
     \`\`\`
  3. Pre-aggregate the one-to-many relationship in a CTE before joining to transaction facts.`,
    quiz: {
      question: "What catastrophic error occurs when an analyst joins a sales fact table to a secondary table that is not unique on the join key?",
      options: [
        "The database deletes the primary key",
        "A Cartesian fan-out occurs where sales rows multiply, inflating reported revenue and volume",
        "The server CPU turns off automatically",
        "The query returns zero rows silently"
      ],
      correctIdx: 1,
      explanation: "A non-unique join produces a Cartesian product (fan-out), causing transaction rows to multiply and falsely inflating financial aggregations."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "sql-aggregations-grouping-kpis": {
    slug: "sql-aggregations-grouping-kpis",
    title: "4.3 Aggregations & Business KPIs: GROUP BY, HAVING & Rolling Sums",
    xpReward: 65,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Aggregations & Business KPIs

#### Calculating Commercial KPIs at Scale
Enterprise KPI calculation requires combining aggregations with conditional logic using \`CASE WHEN\`:
\`\`\`sql
SELECT 
    d.region_name,
    COUNT(DISTINCT s.order_id) AS total_orders,
    SUM(s.gross_sales_bdt) AS gross_revenue_bdt,
    SUM(s.trade_discount_bdt) AS total_trade_spend_bdt,
    ROUND(
        (SUM(s.trade_discount_bdt) / NULLIF(SUM(s.gross_sales_bdt), 0)) * 100, 
        2
    ) AS trade_spend_pct,
    SUM(CASE WHEN s.payment_status = 'OVERDUE' THEN s.net_sales_bdt ELSE 0 END) AS overdue_exposure_bdt
FROM fact_sales s
JOIN dim_distributors d ON s.distributor_key = d.distributor_key
GROUP BY d.region_name
HAVING SUM(s.gross_sales_bdt) > 5000000
ORDER BY gross_revenue_bdt DESC;
\`\`\`

#### NULLIF Defensive Shield:
Always wrap divisors in \`NULLIF(denominator, 0)\` to prevent query-killing \`division by zero\` crashes when calculating business margins.`,
    quiz: {
      question: "Why should corporate SQL queries always wrap calculation denominators in NULLIF(denominator, 0)?",
      options: [
        "To speed up hard drive access",
        "To prevent queries from crashing with division by zero errors when denominators are zero",
        "To format numbers with currency symbols",
        "To automatically generate bar charts"
      ],
      correctIdx: 1,
      explanation: "NULLIF returns NULL when the value equals 0, causing the division to safely evaluate to NULL rather than throwing a runtime 'division by zero' exception."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "sql-window-functions-analytics": {
    slug: "sql-window-functions-analytics",
    title: "4.4 Window Functions for Commercial Analytics: PARTITION BY & RANK",
    xpReward: 80,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Window Functions for Commercial Analytics

#### Performing Calculations Across Row Sets Without Collapsing
Standard \`GROUP BY\` collapses rows. **Window Functions** (\`OVER (PARTITION BY ... ORDER BY ...)\`) compute running totals, rankings, and period-over-period differences while preserving individual row granularity.

#### High-Yield Commercial Window Patterns:
1. **Running YTD Revenue Cumulative**:
   \`\`\`sql
   SUM(net_sales_bdt) OVER (
       PARTITION BY region_id, EXTRACT(YEAR FROM order_date) 
       ORDER BY order_date
       ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
   ) AS ytd_cumulative_revenue
   \`\`\`
2. **Top-N Distributor Ranking**:
   \`\`\`sql
   DENSE_RANK() OVER (
       PARTITION BY region_id 
       ORDER BY total_sales_bdt DESC
   ) AS regional_rank
   \`\`\`
3. **Month-over-Month Revenue Growth**:
   \`\`\`sql
   (monthly_sales - LAG(monthly_sales, 1) OVER (ORDER BY month_key)) 
   / NULLIF(LAG(monthly_sales, 1) OVER (ORDER BY month_key), 0) AS mom_growth_pct
   \`\`\``,
    quiz: {
      question: "What is the primary difference between DENSE_RANK() and RANK() when evaluating distributor performance ties?",
      options: [
        "DENSE_RANK() skips rank numbers after a tie (e.g., 1, 2, 2, 4)",
        "DENSE_RANK() leaves no gaps in rank sequences after ties (e.g., 1, 2, 2, 3)",
        "RANK() only works on text strings",
        "DENSE_RANK() can only run on weekends"
      ],
      correctIdx: 1,
      explanation: "DENSE_RANK() assigns consecutive integers without gaps after duplicate rank positions (1, 2, 2, 3), whereas RANK() skips values (1, 2, 2, 4)."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "sql-ctes-subqueries-pipeline": {
    slug: "sql-ctes-subqueries-pipeline",
    title: "4.5 Modular CTE Pipelines: Structuring Complex Transformations",
    xpReward: 75,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Modular CTE Pipelines in PostgreSQL

#### Readability, Maintainability & Reusability
Deeply nested subqueries (\`SELECT ... FROM (SELECT ... FROM (SELECT ...))\`) are unreadable and impossible to debug during corporate audits. **Common Table Expressions (CTEs)** structure queries into clean, linear pipelines using \`WITH\`:
\`\`\`sql
WITH monthly_regional_sales AS (
    SELECT 
        date_trunc('month', order_date) AS sales_month,
        region_id,
        SUM(net_sales_bdt) AS net_revenue
    FROM fact_sales
    GROUP BY 1, 2
),
regional_prior_month AS (
    SELECT 
        sales_month,
        region_id,
        net_revenue,
        LAG(net_revenue, 1) OVER (PARTITION BY region_id ORDER BY sales_month) AS prev_month_revenue
    FROM monthly_regional_sales
)
SELECT 
    sales_month,
    region_id,
    net_revenue,
    prev_month_revenue,
    ROUND(((net_revenue - prev_month_revenue) / NULLIF(prev_month_revenue, 0)) * 100, 2) AS mom_growth_pct
FROM regional_prior_month
WHERE sales_month >= '2025-01-01'
ORDER BY region_id, sales_month;
\`\`\``,
    quiz: {
      question: "Why do corporate data engineering teams mandate Common Table Expressions (CTEs) over deeply nested subqueries?",
      options: [
        "CTEs make queries read from top to bottom like sequential code, dramatically simplifying debugging and auditing",
        "CTEs automatically encrypt all database passwords",
        "CTEs convert SQL into Python scripts",
        "CTEs bypass all database storage costs"
      ],
      correctIdx: 0,
      explanation: "CTEs break complex data workflows into named, sequential stages that execute cleanly from top to bottom, making logic easy to read, audit, and maintain."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "sql-postgresql-data-extraction": {
    slug: "sql-postgresql-data-extraction",
    title: "4.6 PostgreSQL Data Extraction & Business Problem Solving",
    xpReward: 85,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### PostgreSQL Data Extraction & Business Problem Solving

#### Capstone Business Case: Commercial Leakage Investigation
You are provided with a corporate dataset containing 3.5M records. The CEO reports that while gross sales increased 18%, operating cash flow dropped 12%. You must extract actionable insights:
1. **Discount Depth Analysis**: Query the distribution of promotional trade discounts across distributor tiers.
2. **Returns & Damaged Goods Spike**: Isolate SKUs with return rates exceeding 3% of shipped volume.
3. **Payment Aging Breakdown**: Segment outstanding receivables into 0-30, 31-60, 61-90, and 90+ day aging buckets.
4. **Deliverable**: Export sanitized executive CSV data and compose a 3-point tactical remediation memo.`,
    quiz: {
      question: "When grouping outstanding accounts receivable into aging buckets in SQL (0-30 days, 31-60 days, etc.), which construct is standard?",
      options: [
        "Multiple independent tables with duplicate rows",
        "A single conditional CASE WHEN expression based on CURRENT_DATE - invoice_date",
        "Sorting by customer name alphabetically",
        "A RANDOM() sampling query"
      ],
      correctIdx: 1,
      explanation: "A CASE WHEN statement evaluating the day difference between the invoice date and current date categorizes each invoice into its appropriate aging bucket in a single pass."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // COURSE 07: PROJECT MANAGEMENT & BUSINESS OPERATIONS
  // ═══════════════════════════════════════════════════════════════
  "pm-charter-scoping-wbs": {
    slug: "pm-charter-scoping-wbs",
    title: "7.1 Project Charter, Scoping & Work Breakdown Structure (WBS)",
    xpReward: 60,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Project Charter, Scoping & Work Breakdown Structure

#### The Foundational Project Charter
Every successful corporate project begins with a 1-page Project Charter approved by the executive sponsor. It establishes:
* **Business Objective**: The strategic reason for undertaking the initiative.
* **Scope Boundary (In-Scope vs Out-of-Scope)**: What the project WILL deliver and explicitly what it will NOT deliver (preventing scope creep).
* **Key Stakeholders & Governance**: Sponsor, Project Lead, Steering Committee.
* **Success Criteria & KPIs**: Quantifiable business metrics (e.g. "Cut distributor invoice cycle time from 14 days to 4 days").

#### 100% Rule of Work Breakdown Structure (WBS):
The WBS decomposes the project into hierarchical deliverables:
* Level 1: Project Title
* Level 2: Core Phases / Workstreams
* Level 3: Work Packages (Concrete deliverables with assigned owners).
* *The 100% Rule*: The WBS must encompass 100% of the work defined by project scope and create zero extraneous work.`,
    quiz: {
      question: "According to standard project management governance (PMI standards), what is the '100% Rule' of a Work Breakdown Structure (WBS)?",
      options: [
        "Every project must achieve 100% profit in its first month",
        "The WBS must encompass exactly 100% of the scope defined by the project charter, with neither omissions nor extraneous work",
        "All team members must work 100 hours per week",
        "The project budget must be 100% spent on day one"
      ],
      correctIdx: 1,
      explanation: "The 100% rule states that the WBS must capture 100% of the project scope and deliverables, with the sum of children work packages equaling 100% of the parent deliverable."
    },
    hasSimulator: "workflow-automation"
  },

  "pm-sop-workflow-mapping": {
    slug: "pm-sop-workflow-mapping",
    title: "7.2 Standard Operating Procedures (SOP) & BPMN Workflow Mapping",
    xpReward: 70,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Standard Operating Procedures & BPMN Mapping

#### Institutionalizing Operational Repeatability
Organizations fail when operations depend on tribal knowledge in people's heads. When key employees leave, processes collapse. A **Standard Operating Procedure (SOP)** creates bulletproof institutional repeatability.

#### BPMN 2.0 Mapping Standards:
* **Pools & Swimlanes**: Represent distinct departments or actors (e.g., Sales, Finance, Warehouse, Distributor).
* **Events**: Start Event (Circle), Intermediate Event (Double Circle), End Event (Bold Circle).
* **Activities / Tasks**: Rounded rectangles representing discrete work steps.
* **Gateways**: Diamond shapes for decision branching (Exclusive XOR Gateway vs Parallel AND Gateway).
* **Handoff Friction Audits**: Every time a process crosses swimlanes, latency and errors increase. Streamlining handoffs is the core of process re-engineering.`,
    quiz: {
      question: "In BPMN 2.0 process mapping, what visual element is used to represent handoffs and responsibilities across distinct organizational departments?",
      options: [
        "Horizontal or vertical Swimlanes within a Pool",
        "Dotted lines connecting background colors",
        "Square text callouts with sticky notes",
        "Animated transition arrows"
      ],
      correctIdx: 0,
      explanation: "Swimlanes partition a process pool to clearly depict which department, role, or system is responsible for executing each task, highlighting cross-functional handoffs."
    },
    hasSimulator: "workflow-automation"
  },

  "pm-kpi-governance-okrs": {
    slug: "pm-kpi-governance-okrs",
    title: "7.3 Operational KPI Governance, Cascading OKRs & SLA Tracking",
    xpReward: 65,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Operational KPI Governance & Cascading OKRs

#### OKRs vs. KPIs: Strategic Vector vs. Operational Health
* **KPI (Key Performance Indicator)**: Measures the steady-state operational health of an ongoing process (e.g., *"Customer ticket first-response time < 2 hours"*).
* **OKR (Objective & Key Results)**: Measures an ambitious, time-bound transformation (e.g., *Objective: "Launch automated distributor claims portal by Q3"; Key Result: "Reduce claim processing cost by 40%"*).

#### Cascading OKR Alignment:
Corporate OKRs cascade from Executive Leadership down to Business Units and individual contributors. Each level's Key Result becomes the parent Objective of the team beneath it.`,
    quiz: {
      question: "What is the key distinction between a corporate KPI and an OKR in business operations?",
      options: [
        "KPIs are for finance only while OKRs are for marketing",
        "KPIs track ongoing steady-state operational health, whereas OKRs drive ambitious, time-bound strategic transformations",
        "KPIs are written in English while OKRs are written in code",
        "There is no difference; they are identical acronyms"
      ],
      correctIdx: 1,
      explanation: "KPIs monitor ongoing business health (the dashboard needles), while OKRs define targeted, ambitious change initiatives (the roadmap destinations)."
    },
    hasSimulator: "tool-matrix"
  },

  "pm-risk-matrix-mitigation": {
    slug: "pm-risk-matrix-mitigation",
    title: "7.4 Risk Matrix Modeling, Contingency & Mitigation Registers",
    xpReward: 70,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Risk Matrix Modeling & Mitigation Registers

#### Proactive Risk Governance vs Reactive Firefighting
Amateur managers wait for emergencies to occur; professional project managers maintain an active **Risk Register** throughout the project lifecycle.

#### The 5x5 Risk Matrix:
* **Risk Score = Probability (1 to 5) $\\times$ Impact (1 to 5)**.
* **Score 1-5 (Low)**: Accept and monitor.
* **Score 6-12 (Medium)**: Mitigate with standard operational controls.
* **Score 15-25 (Critical / Red)**: Requires formal executive sign-off and budgeted contingency reserves.

#### The 4 Risk Response Strategies (TARA):
1. **Transfer**: Pass risk to a third party (e.g., insurance, vendor SLA penalties).
2. **Avoid**: Alter project scope or technology to eliminate the risk factor entirely.
3. **Reduce / Mitigate**: Implement preventative safeguards and redundancy.
4. **Accept**: Acknowledge residual risk and allocate financial contingency reserves.`,
    quiz: {
      question: "Under the TARA corporate risk management framework, purchasing cargo transit insurance to protect against supply chain shipping damage is an example of which strategy?",
      options: [
        "Risk Avoidance",
        "Risk Transfer",
        "Risk Acceptance",
        "Risk Escalation"
      ],
      correctIdx: 1,
      explanation: "Purchasing insurance transfers the financial consequence of the risk to an external third-party provider."
    },
    hasSimulator: "workflow-automation"
  },

  "pm-cross-functional-execution": {
    slug: "pm-cross-functional-execution",
    title: "7.5 Cross-Functional Project Execution, Standups & Milestones",
    xpReward: 75,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Cross-Functional Execution & Agile Governance

#### Overcoming Corporate Silos
Enterprise projects touch multiple departments: IT, Commercial, Finance, Legal, and Supply Chain. The project manager leads without formal hierarchical authority.

#### The 15-Minute Daily Standup Protocol:
1. What deliverable did you complete yesterday that moved the project milestone forward?
2. What deliverable are you committed to completing today?
3. What blockers or organizational dependencies are impeding your progress?
* *Rule*: No problem-solving during standup. Identify the blocker, assign an owner, and take deep-dive discussions offline.`,
    quiz: {
      question: "What is the primary objective of a daily 15-minute operational standup in agile corporate execution?",
      options: [
        "To conduct multi-hour technical design debates",
        "To align on daily commitments and surface blockers that need immediate unblocking",
        "To negotiate annual salary increases",
        "To draft marketing press releases"
      ],
      correctIdx: 1,
      explanation: "Daily standups focus strictly on rapid alignment, milestone progress, and surfacing impediments that the project lead must clear."
    },
    hasSimulator: "workflow-automation"
  },

  "pm-process-improvement-kaizen": {
    slug: "pm-process-improvement-kaizen",
    title: "7.6 Continuous Process Improvement: Kaizen & Root Cause Loops",
    xpReward: 80,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Continuous Process Improvement & Kaizen Loops

#### Eliminating Operational Waste (Muda)
Operational excellence comes from continuous incremental refinement (**Kaizen**).
* **The 8 Forms of Corporate Waste (DOWNTIME)**: Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory excess, Motion, Extra-processing.
* **PDCA Cycle (Deming Loop)**: Plan -> Do -> Check -> Act.
* Institutionalize retrospective post-mortems after every project launch to capture lessons learned in the corporate knowledge base.`,
    quiz: {
      question: "What core methodology forms the foundation of continuous quality and operational improvement in Lean and Kaizen frameworks?",
      options: [
        "The PDCA (Plan-Do-Check-Act) Cycle",
        "Random task reassignment",
        "Quarterly budget cuts",
        "Eliminating all documentation"
      ],
      correctIdx: 0,
      explanation: "The PDCA (Plan-Do-Check-Act) Deming Cycle provides a structured, repeatable framework for testing, validating, and institutionalizing operational improvements."
    },
    hasSimulator: "workflow-automation"
  },

  // ═══════════════════════════════════════════════════════════════
  // COURSE 08: CORPORATE COMMUNICATION & EXECUTIVE PRESENTATION
  // ═══════════════════════════════════════════════════════════════
  "corp-comm-email-etiquette": {
    slug: "corp-comm-email-etiquette",
    title: "8.1 High-Impact Corporate Email: Clarity, Tone & Action Lines",
    xpReward: 60,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### High-Impact Corporate Email Communication

#### The 30-Second Inbox Rule
Executives receive 120+ emails per day. If your email is a wall of unbroken text with an ambiguous subject line like "Update", it will be ignored.

#### Professional Subject Line Formula:
\`[Action Required / FYI / Decision Needed] + [Project Name] + [Specific Topic] + [Due Date]\`
* Example: \`[Decision Needed] Q3 Distributor Margin Scheme Revisions — Due by 5 PM Thursday\`

#### Email Body Structure:
1. **Core Ask / Executive Summary**: State the exact decision or action needed in the first 2 sentences.
2. **Context & Key Facts**: 3-4 bullet points highlighting essential data.
3. **Clear Next Steps**: Who needs to do what by when.`,
    quiz: {
      question: "Which email subject line adheres to best-practice corporate communication standards for a time-sensitive approval?",
      options: [
        "Quick thought",
        "Important update please read ASAP!!",
        "[Action Required] Q3 Trade Spend Authorization — Due Thu 5 PM",
        "Hey everyone"
      ],
      correctIdx: 2,
      explanation: "Using bracketed intent, clear project context, and a specific deadline allows recipients to triage and act on the message immediately."
    },
    hasSimulator: "email"
  },

  "corp-comm-pyramid-principle": {
    slug: "corp-comm-pyramid-principle",
    title: "8.2 The Minto Pyramid Principle: Top-Down Business Writing",
    xpReward: 75,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Minto Pyramid Principle & Top-Down Writing

#### Barbara Minto's Classic McKinsey Framework
Novice analysts write chronologically: *"First we gathered data, then we cleaned it, then we noticed a trend, and therefore you should approve this budget."*
Executives demand the inverse: **The Pyramid Principle**:
1. **Apex (Conclusion / Answer)**: State your core recommendation first.
2. **Supporting Pillars (Arguments)**: 3 mutually exclusive, collectively exhaustive (MECE) reasons supporting the recommendation.
3. **Foundation (Data & Evidence)**: Specific numbers, customer quotes, and operational facts proving each argument.`,
    quiz: {
      question: "What is the primary governing rule of the Minto Pyramid Principle in executive business writing?",
      options: [
        "Start with your conclusion and recommendation first, followed by supporting arguments and granular data",
        "Build suspense by revealing the recommendation only at the end",
        "Use as many adjectives and metaphors as possible",
        "Never use numbers in corporate writing"
      ],
      correctIdx: 0,
      explanation: "The Pyramid Principle mandates presenting the top-level conclusion first, followed by logically structured supporting pillars and ground-level empirical evidence."
    },
    hasSimulator: "email"
  },

  "corp-comm-presentation-storytelling": {
    slug: "corp-comm-presentation-storytelling",
    title: "8.3 PowerPoint Storytelling: Cognitive Load & Layout Hierarchy",
    xpReward: 75,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### PowerPoint Storytelling & Cognitive Hierarchy

#### Eradicating "Frankendecks"
A great presentation is a visual argument, not a teleprompter for the speaker.
* **The 3-Second Test**: Can an executive glance at the slide and understand the takeaway in 3 seconds?
* **Color Discipline**: 90% neutral background/text (slate, white, charcoal), with ONE accent color (e.g. Navy Blue or Crimson) directing attention to the key data point.
* **Data-Ink Ratio**: Remove background grids, redundant 3D bevels, decorative icons, and excessive borders. Let the data speak.`,
    quiz: {
      question: "What does the 'Data-Ink Ratio' principle (originated by Edward Tufte) recommend for executive charts and slides?",
      options: [
        "Use as many colors, 3D effects, and decorative clipart as possible",
        "Maximize the proportion of ink/pixels devoted directly to displaying non-redundant business data while removing decorative clutter",
        "Print all slides on physical paper only",
        "Never show charts on slides"
      ],
      correctIdx: 1,
      explanation: "A high data-ink ratio ensures that visual elements directly communicate meaningful data, eliminating distracting decorative chart junk."
    },
    hasSimulator: "tool-matrix"
  },

  "corp-comm-meeting-etiquette": {
    slug: "corp-comm-meeting-etiquette",
    title: "8.4 Corporate Meeting Etiquette: Agendas, Facilitation & Minutes",
    xpReward: 65,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Corporate Meeting Etiquette & Facilitation

#### The Cost of Unprepared Meetings
A 1-hour meeting with 8 corporate leaders costs hundreds of dollars in executive time.
* **No Agenda, No Meeting**: Circulate the agenda and pre-read materials at least 24 hours in advance.
* **Meeting Facilitator Role**: Keep discussions on track. When a debate goes off on a tangent, park it in the **"Parking Lot"** for a dedicated breakout.
* **Minutes Distribution**: Publish decisions and action items within 2 hours of meeting conclusion while memory is fresh.`,
    quiz: {
      question: "What is the primary function of a meeting 'Parking Lot' during executive corporate facilitation?",
      options: [
        "To reserve vehicle parking spaces for visiting clients",
        "To capture important off-topic ideas or debate points for later discussion without derailing the active agenda",
        "To assign penalties to late attendees",
        "To delete meeting recordings"
      ],
      correctIdx: 1,
      explanation: "A parking lot records valuable tangential topics that arise during discussion, ensuring the current meeting stays focused while guaranteeing the off-topic item will be addressed later."
    },
    hasSimulator: "email"
  },

  "corp-comm-stakeholder-alignment": {
    slug: "corp-comm-stakeholder-alignment",
    title: "8.5 Managing Up & Cross-Functional Stakeholder Alignment",
    xpReward: 70,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Managing Up & Cross-Functional Alignment

#### The Psychology of Executive Stakeholders
Managing up is not flattery; it is understanding your manager's priorities, pressures, and communication preferences to deliver maximum value.
* **Know Their Pressures**: What metric is your manager held accountable for by the Board or Division Head? Align your work directly to that metric.
* **Bring Solutions, Not Just Problems**: When surfacing an operational crisis, present at least two viable mitigation options with your recommended choice.
* **Pre-Wiring (Nemawashi)**: Never surprise key stakeholders in a large boardroom meeting. Brief them 1-on-1 before the meeting to build consensus.`,
    quiz: {
      question: "What is the corporate practice of 'Pre-Wiring' (or Nemawashi) before a high-stakes board or committee presentation?",
      options: [
        "Installing electrical cords in the presentation room",
        "Holding 1-on-1 alignment discussions with key decision-makers prior to the formal meeting to address concerns and build consensus",
        "Cancelling the meeting at the last minute",
        "Writing anonymous critique letters"
      ],
      correctIdx: 1,
      explanation: "Pre-wiring involves previewing ideas with key stakeholders individually beforehand to resolve objections, ensuring the formal presentation runs smoothly without surprise opposition."
    },
    hasSimulator: "star"
  },

  "corp-comm-boardroom-defense": {
    slug: "corp-comm-boardroom-defense",
    title: "8.6 Executive Presence, Objection Handling & High-Stakes Q&A",
    xpReward: 85,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Executive Presence & High-Stakes Q&A Defense

#### Navigating Hostile or Probing Inquiries
In corporate boardrooms and assessment centers, executives deliberately ask challenging questions to test your poise, mathematical grounding, and composure.
* **The Pause**: Never answer reflexively. Take 2 full seconds to synthesize your thought.
* **The PREP Framework**:
  * **Point**: Clear headline response.
  * **Reason**: Underlying business rationale.
  * **Example / Evidence**: Supporting metric or benchmark.
  * **Point**: Restated takeaway.
* **Handling Unknowns**: Never fabricate an answer. Respond with confidence: *"We did not model that specific FX scenario in this run; I will rerun the sensitivity table and send the exact delta to the committee by 2 PM."*`,
    quiz: {
      question: "When faced with an unexpected technical question from a senior director where you do not have the exact number on hand, what is the professional response?",
      options: [
        "Guess an approximate number and hope they do not check",
        "Acknowledge the parameter clearly, state the methodology, and commit to delivering the precise audited figure by a specific time",
        "Blame your junior analyst for forgetting the data",
        "Refuse to answer"
      ],
      correctIdx: 1,
      explanation: "Executives respect analytical integrity. Acknowledging the gap and providing an audited figure by a committed time preserves credibility far better than guessing."
    },
    hasSimulator: "star"
  },

  // ═══════════════════════════════════════════════════════════════
  // COURSE 09: BUSINESS ANALYSIS, STRATEGY & CASE SOLVING
  // ═══════════════════════════════════════════════════════════════
  "ba-problem-structuring-mece": {
    slug: "ba-problem-structuring-mece",
    title: "9.1 Business Problem Structuring: MECE Frameworks & Trees",
    xpReward: 70,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Business Problem Structuring & MECE Frameworks

#### MECE: Mutually Exclusive, Collectively Exhaustive
When tackling ambiguous corporate dilemmas (e.g., *"Why did regional operating profit drop by 18% in Q2?"*), top consultants (McKinsey, BCG, Bain) decompose the problem into an **Issue Tree**:
* **Mutually Exclusive**: Branches do not overlap; each bucket isolates an independent variable.
* **Collectively Exhaustive**: All branches together cover 100% of the potential problem space without blind spots.

#### The Profitability Decomposition Tree:
$$\\Delta \\text{Profit} = \\Delta \\text{Revenue} - \\Delta \\text{Cost}$$
* Revenue branch divides into: $\\text{Volume} \\times \\text{Price} \\times \\text{Mix}$.
* Cost branch divides into: $\\text{Fixed Costs} + \\text{Variable Costs}$.`,
    quiz: {
      question: "What does the MECE principle guarantee when structuring business problems in consulting and management trainee case interviews?",
      options: [
        "That problems are solved in less than 5 minutes",
        "That problem branches are mutually exclusive (no overlap) and collectively exhaustive (no blind spots)",
        "That all revenue is converted to foreign currency",
        "That only marketing teams participate"
      ],
      correctIdx: 1,
      explanation: "MECE ensures that every possible factor is accounted for without gaps, and that analytical buckets do not redundantly double-count drivers."
    },
    hasSimulator: "mto-recruitment"
  },

  "ba-market-sizing-fermi": {
    slug: "ba-market-sizing-fermi",
    title: "9.2 Market Sizing & Fermi Estimation for Corporate Strategy",
    xpReward: 75,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Market Sizing & Fermi Estimation

#### Estimating Unknowable Numbers from Ground-Up Assumptions
Corporate strategists and MTO candidates are frequently asked market-sizing questions (e.g., *"Estimate the annual retail market size for bottled water in Dhaka"*). Interviewers evaluate logical structuring, benchmark reasoning, and mental arithmetic.

#### The Top-Down vs Bottom-Up Sizing Approaches:
* **Top-Down**: Total Population of Dhaka (22M) -> Filter by target age/income segment (40% = ~8.8M) -> Filter by purchase frequency (1 bottle every 3 days) -> Multiply by average retail price (BDT 25).
* **Sanity Checking**: Always calculate an order-of-magnitude reality check (e.g. daily factory truck capacity) to verify whether the final estimate is plausible.`,
    quiz: {
      question: "In management case interviews, what is the primary reason interviewers ask market-sizing questions with no exact known answer?",
      options: [
        "To test memorization of government statistical census reports",
        "To evaluate structured problem breakdown, sensible benchmark assumptions, and mental arithmetic under pressure",
        "To verify handwriting quality",
        "To see if candidates have memorized Wikipedia"
      ],
      correctIdx: 1,
      explanation: "Market-sizing questions test a candidate's structured problem breakdown, logical estimation proxies, and composure under ambiguity."
    },
    hasSimulator: "mto-recruitment"
  },

  "ba-competitor-industry-forces": {
    slug: "ba-competitor-industry-forces",
    title: "9.3 Competitor Forensics & Porter's 5 Forces in Local Markets",
    xpReward: 70,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Competitor Forensics & Porter's 5 Forces

#### Evaluating Industry Attractiveness & Competitive Moats
Porter's Five Forces framework assesses the underlying structural profit potential of an industry:
1. **Threat of New Entrants**: Capital intensity, distribution network barriers, regulatory licenses.
2. **Bargaining Power of Buyers**: Channel concentration (e.g., modern trade superstores vs traditional retail mom-and-pop stores).
3. **Bargaining Power of Suppliers**: Raw material scarcity, import dependence, and currency volatility.
4. **Threat of Substitutes**: Alternative product categories solving the same customer need.
5. **Rivalry Among Existing Competitors**: Price wars, marketing spend wars, brand loyalty barriers.`,
    quiz: {
      question: "When an industry features high capital requirements, complex proprietary distributor networks, and stringent government licensing, what Porter's Force is effectively minimized?",
      options: [
        "Threat of New Entrants",
        "Bargaining Power of Buyers",
        "Threat of Substitutes",
        "Internal Rivalry"
      ],
      correctIdx: 0,
      explanation: "High capital requirements, existing distribution dominance, and regulatory hurdles create high barriers to entry, neutralizing the threat of new entrants."
    },
    hasSimulator: "forces"
  },

  "ba-financial-drivers-margins": {
    slug: "ba-financial-drivers-margins",
    title: "9.4 Deconstructing P&L Drivers: Gross Margin, Contribution & EBITDA",
    xpReward: 80,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Deconstructing P&L Drivers & Margin Cascades

#### The Enterprise Margin Cascade
A business analyst must trace revenue down to net operating cash:
1. **Gross Sales**: Full list price $\\times$ volume shipped.
2. **Trade Discounts & Rebates**: Wholesale discounts, retailer display allowances.
3. **Net Sales**: Revenue recognized on corporate P&L.
4. **Cost of Goods Sold (COGS)**: Direct materials, direct labor, factory overheads.
5. **Gross Profit (Gross Margin %)**: $\\text{Net Sales} - \\text{COGS}$.
6. **Operating Expenses (OPEX)**: Sales & marketing, distribution freight, corporate G&A.
7. **EBITDA / Operating Profit**: Core operating profitability before financing and taxes.`,
    quiz: {
      question: "Why do corporate finance and commercial analysts prioritize EBITDA margin over Net Income when comparing operational performance across business units?",
      options: [
        "Because EBITDA completely ignores capital investments",
        "Because EBITDA isolates pure operating profitability before capital structure, debt interest, and country tax variations",
        "Because EBITDA is always higher than revenue",
        "Because EBITDA is mandated by local trade unions"
      ],
      correctIdx: 1,
      explanation: "EBITDA isolates core operational efficiency without distortions from debt financing structures, capital depreciation schedules, or corporate tax rates."
    },
    hasSimulator: "corporate-modeling"
  },

  "ba-root-cause-fishbone": {
    slug: "ba-root-cause-fishbone",
    title: "9.5 Root-Cause Forensics: 5-Whys, Fishbone & Pareto Analysis",
    xpReward: 75,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Root-Cause Forensics & Pareto Analysis

#### Distinguishing Symptoms from True Root Causes
Treating symptoms (e.g. giving larger discounts when sales drop) accelerates corporate decline. Analysts identify root causes using structured forensics:
* **The 5-Whys Technique**: Repeatedly interrogating the cause behind each observed failure until the foundational organizational breakdown is exposed.
* **Ishikawa (Fishbone) Diagram**: Categorizing causes across 6 Ms: Machine, Method, Material, Manpower, Measurement, Milieu (Environment).
* **Pareto 80/20 Rule**: 80% of defective shipments or customer complaints originate from 20% of SKUs or vendor routes. Focus intervention on the vital few.`,
    quiz: {
      question: "What does a Pareto 80/20 analysis identify in commercial inventory and quality defect investigations?",
      options: [
        "That all SKUs fail at exactly the same rate",
        "The vital few: approximately 80% of defects or losses originate from approximately 20% of root causes or SKUs",
        "That 80% of employees must be replaced",
        "That inventory must be discounted by 20%"
      ],
      correctIdx: 1,
      explanation: "The Pareto principle highlights that a small minority of drivers (the vital 20%) generate the vast majority (80%) of problems or results, focusing resources where impact is highest."
    },
    hasSimulator: "mto-recruitment"
  },

  "ba-case-interview-synthesis": {
    slug: "ba-case-interview-synthesis",
    title: "9.6 Case Cracking Synthesis: Structuring C-Suite Trainee Recommendations",
    xpReward: 90,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Case Cracking Synthesis for MTO & Trainee Panels

#### Delivering the Final Executive Recommendation
When presenting a business case solution before an interview panel (e.g. Unilever Future Leaders Program, BAT GBD, Marico IGNITE):
1. **Direct Recommendation**: State your strategic decision in the first 15 seconds.
2. **Financial Upside**: Quantify revenue gain, cost savings, and payback period.
3. **Execution Roadmap (3 Horizon Phases)**: Immediate (30 days), Expansion (90 days), Scale (Year 1).
4. **Key Risks & Contingency Safeguards**: Anticipate the panel's hardest pushback and present preemptive risk mitigations.`,
    quiz: {
      question: "When concluding a competitive corporate business case presentation before an executive judging panel, what should you lead with?",
      options: [
        "A recap of all the software formulas you typed",
        "A clear, definitive strategic recommendation followed by quantified financial impact and risk mitigation",
        "An apology for having limited data",
        "A 10-minute historical overview of the industry"
      ],
      correctIdx: 1,
      explanation: "Executive panels expect decisive leadership: state the core recommendation up front, back it with numbers, and address risks with concrete safeguards."
    },
    hasSimulator: "mto-recruitment"
  }
};
