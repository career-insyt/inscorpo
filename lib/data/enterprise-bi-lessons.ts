import { LessonDetail } from "./lessons";

export const ENTERPRISE_BI_LESSONS: Record<string, LessonDetail> = {
  // ═══════════════════════════════════════════════════════════════
  // MODULE 01 — Corporate BI Blueprint & Modern Analytics
  // ═══════════════════════════════════════════════════════════════

  "bi-1-1-what-enterprise-bi-does": {
    slug: "bi-1-1-what-enterprise-bi-does",
    title: "1.1 What Enterprise Business Intelligence Actually Does",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### What Enterprise Business Intelligence Actually Does

#### Executive Context
In corporate enterprises, data collection is cheap, but commercial clarity is rare. Organizations spend millions capturing billions of point-of-sale transactions, ERP stock logs, and CRM interactions, yet leadership still struggles to answer basic strategic questions: *Which product categories actually generate operating cash flow? Why did gross volume rise 6% while EBITDA dropped 18%? Which distributors are gaming trade discounts?*

Business Intelligence (BI) is not about making visually pleasing bar charts. Enterprise BI is an auditable, mathematical pipeline that ingests messy operational data, enforces strict business definitions, calculates reliable metrics, and delivers actionable decision intelligence to corporate leaders.

#### The Analytics Hierarchy of Value
1. **Raw Data Ingestion**: Capturing transactions from PostgreSQL, SAP, Salesforce, or CSV dumps.
2. **Operational Reporting**: Historical tables showing *what happened* (e.g., "North Zone sold 450,000 units yesterday").
3. **Business Intelligence (Diagnostic)**: Multi-dimensional exploration explaining *why it happened* (e.g., "Margin collapsed because 72% of North Zone volume was sold under a 25% promotional discount with freight absorption").
4. **Commercial Decision Support**: Empowering executive leaders to test counter-measures, reallocate trade spend, and adjust distributor pricing tiers.

\`\`\`
THE ENTERPRISE BI VALUE CHAIN:
[ Raw Transaction Logs ] 
          │
          ▼ (SQL Extraction & Hygiene)
[ Normalized Analytical Tables ] 
          │
          ▼ (Power Query ETL & Star Schema)
[ Unified Semantic Data Model ] 
          │
          ▼ (DAX Business Measures)
[ Interactive Executive Cockpit ] 
          │
          ▼ (Variance Decomposition)
[ Strategic Boardroom Decision ]
\`\`\`

#### The Danger of Excel Hell
Without enterprise BI, different corporate departments create siloed spreadsheets with contradictory definitions:
* Finance calculates revenue *net of returns and discounts*.
* Sales calculates revenue *gross of incentives*.
* Supply Chain calculates revenue *based on warehouse dispatch timestamps*.
The executive board meeting wastes 45 minutes arguing over whose spreadsheet is right rather than making decisions. Enterprise BI establishes a **Single Source of Truth (SSOT)**.

#### Guided Exercise & Deliverable
* **Business Scenario**: Apex Consumer Goods observed a 6% volume spike in Q3, but operating profit fell by $1.4M.
* **Task**: Formulate the 5 investigative questions required to diagnose whether the profit collapse was driven by pricing, product mix, distributor penalties, or freight surcharges.
* **Output**: Executive BI Diagnostic Brief mapping required data tables to commercial hypotheses.`,
    quiz: {
      question: "What is the primary objective of an Enterprise Business Intelligence semantic model compared to isolated departmental spreadsheets?",
      options: [
        "To convert all numbers into 3D pie charts for social media",
        "To establish a unified, single source of truth with standardized metric definitions that eliminate contradictory departmental reporting",
        "To replace the corporate database with an Excel macro workbook",
        "To eliminate the need for financial accounting standards"
      ],
      correctIdx: 1,
      explanation: "Enterprise BI creates a governed semantic model where business metrics (such as Net Revenue and Gross Margin) are calculated with identical, audited logic across the entire enterprise, eliminating spreadsheet conflict."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-1-2-analytics-pipeline": {
    slug: "bi-1-2-analytics-pipeline",
    title: "1.2 The Modern Corporate Analytics Pipeline",
    xpReward: 80,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Modern Corporate Analytics Pipeline

#### Executive Context
A senior BI analyst understands the division of labor across the analytical tech stack. Attempting to clean data in DAX, perform complex string regex in Power BI visual filters, or build multi-million-row joins inside Excel desktop memory will cause catastrophic performance failures. Modern enterprise BI adheres to Roche's Maxim of Data Transformation: **"Transform data as far upstream as possible, and as far downstream as necessary."**

#### The Six Stages of the Enterprise BI Pipeline
1. **Relational Database (PostgreSQL / DuckDB)**:
   - Enforces referential integrity, indexes, and primary keys.
   - Ideal for: Heavy aggregations, multi-table joins, CTE-based transaction deduplication, and window functions.
2. **Power Query (M Engine / ETL Layer)**:
   - Connects to database views, cloud APIs, and supplementary flat files.
   - Ideal for: Type coercion, unpivoting monthly matrices, removing null columns, and merging slow-moving dimension tables.
3. **Dimensional Data Model (VertiPaq Engine)**:
   - High-speed columnar in-memory database compressing millions of rows.
   - Ideal for: Kimball Star Schemas, 1-to-many relationship cardinality, and surrogate keys.
4. **DAX (Data Analysis Expressions)**:
   - Dynamic calculation engine evaluating formulas at visual query time.
   - Ideal for: Measures responding to user slicers (YTD revenue, target variances, market share %).
5. **Visual Reporting Layer (Power BI Desktop)**:
   - Human-computer interface designed for visual ergonomics and cognitive clarity.
   - Ideal for: Executive summary KPI cards, diagnostic drill-through, and variance charts.
6. **Executive Synthesis (Management Memos)**:
   - Translating interactive analytical findings into board-level action recommendations.

\`\`\`
ROCHE'S MAXIM OF DATA TRANSFORMATION:
[ Database / SQL Layer ]    ──► Heavy Filtering, Joins, Aggregation (Push-Down)
          │
[ Power Query (M) Layer ]  ──► Data Typing, Unpivoting, Schema Standardization
          │
[ Star Schema Model ]       ──► 1-to-Many Relationships, VertiPaq Columnar Compression
          │
[ DAX Measure Engine ]      ──► Dynamic Filter Context, Time Intelligence, Ratios
          │
[ Power BI Visual Layer ]   ──► Executive Hierarchy, Drill-Through, Actionable Signals
\`\`\`

#### Common Architectural Traps
* **Trapped in DAX**: Writing a 200-line DAX calculated column to clean trailing whitespace or parse dates. This inflates model size and kills refresh speed. Do it in SQL or Power Query!
* **The Wide Flat Table Myth**: Ingesting a single 150-column denormalized flat CSV directly into Power BI. This defeats the VertiPaq columnar engine's dictionary compression and results in sluggish reporting.

#### Guided Exercise & Deliverable
* **Task**: Map an incoming multi-source procurement problem (supplier invoices, ERP shipments, and currency exchange rates) to the exact tool in the pipeline where each transformation belongs.
* **Output**: End-to-End Pipeline Architecture Diagram with documented transformation boundaries.`,
    quiz: {
      question: "According to Roche's Maxim of Data Transformation in enterprise BI architecture, where should heavy data cleaning and relational joins be performed?",
      options: [
        "Inside Power BI visual formatting options",
        "As far upstream as possible (in the database SQL layer or Power Query ETL), before loading into the reporting semantic model",
        "Exclusively inside DAX calculated tables",
        "Manually in Excel after exporting visual tables"
      ],
      correctIdx: 1,
      explanation: "Transforming data upstream (in SQL or Power Query) maximizes database query folding, reduces memory consumption in the VertiPaq model, and keeps DAX measures simple and fast."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-1-3-kpi-metric-trees": {
    slug: "bi-1-3-kpi-metric-trees",
    title: "1.3 Business Questions, KPI Definitions & Metric Trees",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Business Questions, KPI Definitions & Metric Trees

#### Executive Context
Before writing a single \`SELECT\` query or designing a Power BI canvas, an enterprise analyst deconstructs business performance into an explicit **Metric Driver Tree**. If a Chief Commercial Officer says, *"Our operating margin dropped from 14% to 11%,"* an analyst does not simply plot a line chart of margin over time. They break the metric down into its mathematical parent-child drivers to isolate the exact operational root causes.

#### Anatomy of a DuPont-Style Metric Tree
A Metric Driver Tree establishes mathematical equality between high-level executive KPIs and operational frontline levers:

$$\\text{Operating Margin} = \\frac{\\text{Gross Profit} - \\text{OPEX}}{\\text{Net Revenue}}$$

$$\\text{Net Revenue} = \\text{Gross Revenue} - \\text{Trade Discounts} - \\text{Returns & Allowances}$$

$$\\text{Gross Revenue} = \\sum (\\text{Volume Sold} \\times \\text{Base Selling Price})$$

$$\\text{COGS} = \\sum (\\text{Volume Sold} \\times \\text{Unit Cost}) + \\text{Freight Inbound} + \\text{Packaging}$$

\`\`\`
COMMERCIAL METRIC DRIVER TREE:
                    ┌── Gross Revenue (Units Sold × Price)
        ┌── Net Revenue ──┤
        │           └── (-) Trade Discounts & Distributor Rebates
EBITDA ─┤
        │           ┌── (-) Cost of Goods Sold (Raw Materials + Factory Labor)
        └── Gross Profit ─┤
                    └── (-) Commercial OPEX (Freight Surcharges + Marketing)
\`\`\`

#### Deconstructing Business Questions into Measurable Grains
Every KPI requires an unambiguous definition across 4 technical dimensions:
1. **Mathematical Formula**: Clear numerator, denominator, and edge-case handling (e.g., divide-by-zero protection).
2. **Aggregation Grain**: The atomic level at which the metric is measured (e.g., *Daily per SKU per Distributor Branch* vs *Monthly Regional Total*).
3. **Unit of Measure**: Currency (USD/BDT), Percentage (%), Ratio, or Discrete Count.
4. **Directional Polarity**: Is higher better (e.g., Gross Margin %) or is lower better (e.g., Trade Spend as % of Gross Sales)?

#### Guided Exercise & Deliverable
* **Business Scenario**: Apex Consumer Goods wants to measure Distributor Performance. Sales managers want a single composite score.
* **Task**: Build an auditable Metric Tree for Distributor Health incorporating 4 sub-drivers: Sales Target Achievement %, Return Rate %, On-Time Payment Days (DSO), and Premium Product Mix %.
* **Output**: Documented KPI Specification Matrix with formal mathematical definitions and aggregation grains.`,
    quiz: {
      question: "Why must an enterprise analyst build a Metric Driver Tree before writing SQL queries or building Power BI dashboards?",
      options: [
        "To choose the background gradient colors for visual charts",
        "To deconstruct high-level business KPIs into their underlying mathematical drivers, ensuring that every calculated measure directly traces to operational root causes",
        "To bypass the need for relational database indexes",
        "Because Microsoft Power BI requires Metric Trees to install"
      ],
      correctIdx: 1,
      explanation: "Metric Trees establish the mathematical relationship between executive outcomes (like EBITDA) and operational drivers (like pricing, volume, and discounts), guiding the exact tables and aggregations needed."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-1-4-local-environment-setup": {
    slug: "bi-1-4-local-environment-setup",
    title: "1.4 Local Analytics Environment, PostgreSQL & Project Architecture",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Local Analytics Environment, PostgreSQL & Project Architecture

#### Executive Context
Professional data analysts do not work with messy desktop folders containing files named \`Final_v2_updated_FINAL.pbix\`. Enterprise corporate analytics requires a standardized, reproducible folder architecture, version control with Git, and configured connections across local database engines (PostgreSQL and DuckDB) and Microsoft Power BI Desktop.

#### The Professional Analytics Workspace Structure
Every client engagement or enterprise project adheres to this standard workspace layout:
\`\`\`
project_root/
├── 01_data_raw/              # Immutable raw CSV/Parquet dumps (Read-Only)
├── 02_data_staging/          # Cleaned, standardized intermediate extracts
├── 03_sql_scripts/           # DDL schemas, extraction views, validation queries
│   ├── 01_schema_ddl.sql
│   ├── 02_analytical_views.sql
│   └── 03_data_quality_checks.sql
├── 04_power_query_m/         # Exported M scripts for version control
├── 05_dax_measures/          # Documented DAX measure repository (.dax / .md)
├── 06_powerbi_models/        # Power BI Desktop workbooks (.pbix / .pbit)
├── 07_executive_memos/       # Management memos, briefings, and slide decks
└── README.md                 # Project metadata, data dictionary & setup guide
\`\`\`

#### PostgreSQL & DuckDB: The Dual Engine Strategy
* **PostgreSQL**: The production-standard client-server relational database. Handles ACID transactions, user permissions, relational foreign keys, and multi-user team queries via pgAdmin 4.
* **DuckDB**: An embedded, columnar analytical SQL database running directly in process memory. Can query 10-million-row Parquet or CSV files in milliseconds without requiring database server installation.

#### Connecting Power BI to PostgreSQL
1. Install the 64-bit Npgsql driver or native PostgreSQL client.
2. In Power BI Desktop: **Get Data** -> **PostgreSQL database**.
3. Server: \`localhost:5432\` | Database: \`apex_fmcg_db\`.
4. Data Connectivity mode: Select **Import** (loads data into the VertiPaq engine for sub-second DAX execution).

#### Guided Exercise & Deliverable
* **Task**: Initialize a clean local repository structure, verify PostgreSQL server connection using pgAdmin 4, execute a test heartbeat query (\`SELECT version();\`), and connect Power BI Desktop to the practice database.
* **Output**: Verified Development Environment Log with active PostgreSQL connection string and reproducible project directory structure.`,
    quiz: {
      question: "Why is 'Import Mode' generally preferred over 'DirectQuery Mode' when connecting Power BI Desktop to a PostgreSQL operational database for analytical dashboards?",
      options: [
        "Because DirectQuery does not support numbers",
        "Because Import Mode loads columnar data into Power BI's VertiPaq in-memory engine, enabling sub-second DAX calculations and offline analytical exploration without taxing the live operational database",
        "Because Import Mode automatically deletes the source database after loading",
        "Because DirectQuery only works with Microsoft Excel files"
      ],
      correctIdx: 1,
      explanation: "Import Mode compresses data into the in-memory VertiPaq engine, delivering lightning-fast DAX measure evaluation and freeing the operational database from continuous interactive query load."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 02 — Enterprise SQL Foundations
  // ═══════════════════════════════════════════════════════════════

  "bi-2-1-tables-query-execution": {
    slug: "bi-2-1-tables-query-execution",
    title: "2.1 Relational Tables & SQL Query Execution Order",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Relational Tables & SQL Query Execution Order

#### Executive Context
SQL is the foundational query language of enterprise analytics. However, most spreadsheet users fail at SQL because they do not understand that **SQL is executed in a completely different order from how it is written**. Writing a \`SELECT\` statement first does not mean the database processes the \`SELECT\` clause first. Understanding the true engine execution order is the secret to avoiding syntax errors and writing performant analytical queries.

#### Syntax Order vs Execution Order
\`\`\`
WRITTEN SYNTAX ORDER:                 INTERNAL ENGINE EXECUTION ORDER:
1. SELECT column1, SUM(column2)       1. FROM & JOIN     (Identify tables & joins)
2. FROM sales_transactions            2. WHERE           (Filter row-by-row before grouping)
3. WHERE order_status = 'COMPLETED'   3. GROUP BY        (Aggregate into summary buckets)
4. GROUP BY column1                   4. HAVING          (Filter aggregated groups)
5. HAVING SUM(column2) > 10000        5. SELECT          (Evaluate expressions & aliases)
6. ORDER BY 2 DESC                    6. DISTINCT        (Remove duplicate output rows)
7. LIMIT 50                           7. ORDER BY        (Sort final record set)
                                      8. LIMIT / OFFSET  (Slice pagination window)
\`\`\`

#### Why Execution Order Matters to Analysts
* **Why You Cannot Use a Column Alias in the \`WHERE\` Clause**:
  \`\`\`sql
  -- THIS WILL FAIL WITH A SYNTAX ERROR:
  SELECT unit_price * quantity AS gross_revenue
  FROM order_details
  WHERE gross_revenue > 5000;
  \`\`\`
  *Reason*: \`WHERE\` executes at Step 2, while the alias \`gross_revenue\` is created in \`SELECT\` at Step 5! The database engine has no idea what \`gross_revenue\` means when filtering rows.
* **The Correct Approach**:
  \`\`\`sql
  -- VALID: Use the raw expression in WHERE
  SELECT unit_price * quantity AS gross_revenue
  FROM order_details
  WHERE (unit_price * quantity) > 5000;
  \`\`\`

#### Relational Integrity: Primary Keys vs Foreign Keys
* **Primary Key (PK)**: A column (or set of columns) that uniquely identifies every individual row in a table (e.g., \`order_id\` in \`orders\`). PKs cannot contain NULL values.
* **Foreign Key (FK)**: A column in one table that references the Primary Key in another table (e.g., \`customer_id\` in \`orders\` referencing \`customer_id\` in \`customers\`). This forms the backbone of relational modeling.

#### Guided Exercise & Deliverable
* **Dataset**: Retail Sales Transactions Database (1.2M rows).
* **Task**: Write a base extraction query querying orders, calculating line item value, ordering by transaction timestamp descending, and limiting the output to the top 25 transactions.
* **Output**: Verified SQL script with annotated execution step commentary.`,
    quiz: {
      question: "In what order does a SQL database engine evaluate the WHERE clause relative to the SELECT and GROUP BY clauses?",
      options: [
        "SELECT evaluates first, then WHERE, then GROUP BY",
        "WHERE evaluates first, then GROUP BY, then SELECT",
        "GROUP BY evaluates first, then WHERE, then SELECT",
        "All clauses evaluate simultaneously at compile time"
      ],
      correctIdx: 1,
      explanation: "The engine first filters individual records via WHERE, then groups the surviving records via GROUP BY, and finally computes the projected columns and expressions in SELECT."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-2-2-filtering-conditional-logic": {
    slug: "bi-2-2-filtering-conditional-logic",
    title: "2.2 Filtering, Null Handling & Conditional Business Logic",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Filtering, Null Handling & Conditional Business Logic

#### Executive Context
Corporate data is rife with dirty records: cancelled transactions, returned deliveries, missing distributor codes, and negative adjustment quantities. Filtering is not just about writing \`WHERE status = 'Active'\`; it requires mastering **Three-Valued Logic (True, False, Unknown)**, handling NULLs defensively, and categorizing business transactions dynamically with \`CASE WHEN\` statements.

#### Three-Valued Logic & The NULL Trap
In SQL, \`NULL\` represents missing or unknown data. It is never equal to anything—not even another NULL!
\`\`\`sql
-- THE CRITICAL TRAP:
SELECT * FROM distributors WHERE tax_id = NULL;      -- RETURNS 0 ROWS!
SELECT * FROM distributors WHERE tax_id != NULL;     -- RETURNS 0 ROWS!

-- THE CORRECT ANSI SQL SYNTAX:
SELECT * FROM distributors WHERE tax_id IS NULL;     -- Correct
SELECT * FROM distributors WHERE tax_id IS NOT NULL; -- Correct
\`\`\`

#### Safe Null Replacement: \`COALESCE()\`
Use \`COALESCE(val1, val2, ...)\` to return the first non-null expression:
\`\`\`sql
SELECT 
  order_id,
  order_total,
  COALESCE(discount_amount, 0.00) AS safe_discount,
  order_total - COALESCE(discount_amount, 0.00) AS net_order_amount
FROM sales_orders;
\`\`\`
If you do not coalesce \`discount_amount\`, any row where discount is NULL evaluates the entire subtraction to NULL (\`100 - NULL = NULL\`), silently wiping out revenue numbers!

#### Conditional Categorization with \`CASE WHEN\`
\`\`\`sql
SELECT 
  order_id,
  order_amount,
  CASE 
    WHEN order_amount >= 25000 THEN 'Tier 1: Enterprise Account'
    WHEN order_amount >= 5000  THEN 'Tier 2: Commercial Mid-Market'
    WHEN order_amount > 0      THEN 'Tier 3: Small Retailer'
    ELSE 'Negative / Adjustment Record'
  END AS customer_tier
FROM sales_orders
WHERE order_status NOT IN ('CANCELLED', 'VOID', 'FRAUD_FLAGGED');
\`\`\`

#### Guided Exercise & Deliverable
* **Business Scenario**: The finance team needs an audit extract of all completed orders from the last 2 quarters where trade discount was either missing or exceeded 15% of the base price.
* **Task**: Write a defensive SQL query using \`COALESCE\`, \`BETWEEN\`, and \`CASE WHEN\` to classify discount compliance across 250,000 transaction rows.
* **Output**: Production-grade SQL script returning sanitized compliance classifications with zero null-multiplication errors.`,
    quiz: {
      question: "What is the result of the SQL expression: SELECT 500 + NULL;",
      options: [
        "500",
        "0",
        "NULL",
        "A database syntax error"
      ],
      correctIdx: 2,
      explanation: "In SQL three-valued logic, any mathematical operation with NULL yields NULL. That is why COALESCE(discount, 0) is mandatory to prevent silent data loss in arithmetic calculations."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-2-3-aggregation-business-kpis": {
    slug: "bi-2-3-aggregation-business-kpis",
    title: "2.3 Aggregations, GROUP BY & Commercial KPI Formulation",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Aggregations, GROUP BY & Commercial KPI Formulation

#### Executive Context
Executive leadership views the business through aggregates: Total Net Revenue by Region, Average Order Value by Channel, and Gross Margin % by Brand. An analyst must master SQL aggregate functions (\`SUM\`, \`AVG\`, \`COUNT\`, \`COUNT(DISTINCT)\`), understand how \`GROUP BY\` defines the aggregation grain, and enforce group-level filtering using \`HAVING\`.

#### The Golden Rule of \`GROUP BY\`
Every non-aggregated column appearing in the \`SELECT\` list **MUST** appear in the \`GROUP BY\` clause!
\`\`\`sql
-- SYNTAX ERROR:
SELECT region, brand, SUM(revenue)
FROM sales_fact
GROUP BY region; -- Fails! 'brand' is neither aggregated nor grouped!

-- VALID GROUPING:
SELECT region, brand, SUM(revenue) AS total_revenue
FROM sales_fact
GROUP BY region, brand;
\`\`\`

#### Aggregation Functions & Commercial KPI Formulas
\`\`\`sql
SELECT 
  territory_name,
  -- Total Transaction Volume
  COUNT(*) AS total_orders_placed,
  -- Unique Purchasing Accounts
  COUNT(DISTINCT distributor_id) AS active_distributors,
  -- Gross Commercial Revenue
  SUM(units_sold * unit_price) AS gross_sales,
  -- Average Order Value (AOV)
  ROUND(AVG(units_sold * unit_price), 2) AS average_order_value,
  -- Gross Margin % (Safe Division)
  ROUND(
    SUM(units_sold * (unit_price - unit_cost)) / 
    NULLIF(SUM(units_sold * unit_price), 0) * 100, 
    2
  ) AS gross_margin_pct
FROM sales_transactions
WHERE transaction_date >= '2026-01-01'
GROUP BY territory_name
HAVING SUM(units_sold * unit_price) >= 500000
ORDER BY gross_sales DESC;
\`\`\`

#### \`WHERE\` vs \`HAVING\`: The Critical Distinction
* **\`WHERE\`**: Filters individual rows *before* aggregation occurs (e.g., exclude cancelled orders).
* **\`HAVING\`**: Filters aggregated summary groups *after* grouping occurs (e.g., show only territories where total gross sales exceed $500,000).

#### Defending Against Divide-by-Zero with \`NULLIF()\`
If a territory has zero sales, standard division throws a fatal \`division by zero\` error.
Wrap the denominator in \`NULLIF(denominator, 0)\`: if the value is zero, it converts to NULL, causing the entire ratio to evaluate safely to NULL instead of crashing the query!

#### Guided Exercise & Deliverable
* **Task**: Query the retail sales database to produce a commercial KPI summary by Regional Zone showing: Total Units, Total Gross Revenue, Active Distributor Count, and Gross Profit Margin %.
* **Output**: Auditable SQL query script with zero divide-by-zero risks and verified group-level totals.`,
    quiz: {
      question: "When should an analyst use the HAVING clause instead of the WHERE clause in a SQL query?",
      options: [
        "To filter raw rows before the database reads them",
        "To filter aggregated summary groups based on aggregate function results (e.g., HAVING SUM(sales) > 100000)",
        "Only when querying date columns",
        "To sort the final results in descending order"
      ],
      correctIdx: 1,
      explanation: "WHERE filters raw individual records before grouping occurs. HAVING filters aggregated group metrics (like SUM or COUNT) after the GROUP BY operation has completed."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-2-4-query-validation-interpretation": {
    slug: "bi-2-4-query-validation-interpretation",
    title: "2.4 Query Result Validation, Control Totals & Commercial Translation",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Query Result Validation, Control Totals & Commercial Translation

#### Executive Context
Writing a query that executes without a syntax error is only 20% of the job. In enterprise BI, the real question is: **Are the numbers accurate?** Presenting a revenue report with duplicated invoice rows or dropped credit memos can lead to catastrophic business decisions and loss of credibility. Professional BI analysts validate result sets against **Financial Control Totals** and translate numbers into clear commercial prose.

#### The 4-Step Query Validation Framework
1. **Row Count Sanity Check**:
   - Compare the output row count against known master counts. If a customer table has 450 rows, but your joined customer query returns 780 rows, a Cartesian multiplication has occurred!
2. **Financial Control Total Reconciliation**:
   - Verify that the sum of segmented query outputs matches the total database control total:
     $$\\sum \\text{Regional Revenue} == \\text{Total Company Revenue}$$
3. **Boundary Value & Null Audits**:
   - Assert that margin percentages fall between -100% and +100%. If a query yields 4,200% gross margin, unit price and cost columns were inverted!
4. **Duplicate Natural Key Detection**:
   \`\`\`sql
   -- Audit: Asserting zero duplicate orders exist in the extract
   SELECT order_id, COUNT(*)
   FROM analytical_sales_extract
   GROUP BY order_id
   HAVING COUNT(*) > 1;
   \`\`\`

#### Translating SQL Results into Commercial Recommendations
Executives do not read SQL terminal logs; they read commercial summaries:
* *Weak Analyst*: "Here is the table showing region, count, and sum of gross revenue."
* *Enterprise Corporate Analyst*: "Chittagong Zone delivered 38% of total Q3 volume but only 22% of gross profit. This margin deterioration was driven by an average trade discount of 18.4%—nearly double the national benchmark of 9.5%."

#### Guided Exercise & Deliverable
* **Problem Set 2 Task**: Complete the 15-task SQL Query Benchmark testing aggregations, date slicing, null handling, and control total reconciliation across the 1.2M row retail sales dataset.
* **Output**: Validated SQL script repository with written executive variance summary reconciling to the official company control total ($14,850,210.00).`,
    quiz: {
      question: "What is a 'Financial Control Total' in query validation, and why must an analyst reconcile against it before sharing data with executives?",
      options: [
        "A hardware limit on database CPU usage",
        "An independently verified master total (such as total monthly bank deposits or ERP general ledger revenue) used to prove that query filters or joins have not accidentally duplicated or dropped transactions",
        "The total number of characters in a SQL script",
        "A password used to unlock Power BI Desktop"
      ],
      correctIdx: 1,
      explanation: "A control total is an authoritative benchmark figure. Reconciling query aggregates against this known benchmark guarantees that joins haven't multiplied rows and filters haven't omitted revenue."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 03 — Advanced SQL for Corporate Analysts
  // ═══════════════════════════════════════════════════════════════

  "bi-3-1-joins-relational-analysis": {
    slug: "bi-3-1-joins-relational-analysis",
    title: "3.1 Multi-Table Joins, Cartesian Traps & Row Multiplication",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Multi-Table Joins, Cartesian Traps & Row Multiplication

#### Executive Context
Real-world enterprise data is distributed across multiple normalized tables: customer demographics, product catalogs, distributor territories, and invoice line items. To analyze performance, an analyst must join these tables. However, joins are the #1 source of corrupted financial reports: joining on non-unique keys multiplies rows, artificially doubling or tripling reported revenue numbers.

#### Relational Join Taxonomy
* **\`INNER JOIN\`**: Returns only records where the join key matches in **both** tables. Records without matches in either table are discarded.
* **\`LEFT JOIN\` (The Analyst's Workhorse)**: Returns **all** records from the left table, plus matched records from the right table. If no match exists, right-side columns populate with NULL. Essential for finding orphan records or preserving all sales even if customer details are missing.
* **\`FULL OUTER JOIN\`**: Returns all records from both tables, filling mismatches with NULL. Used for complex ledger-to-bank reconciliations.

\`\`\`
RELATIONAL JOIN COMPARISON:
Table A (Orders) ──── INNER JOIN ────► Table B (Customers): Only matched orders kept
Table A (Orders) ──── LEFT JOIN  ────► Table B (Customers): ALL orders kept (Missing customer = NULL)
Table A (Ledger) ──── FULL JOIN  ────► Table B (Bank):     Exposes unmatched breaks on both sides
\`\`\`

#### The Deadly Cartesian Row Multiplication Hazard
Consider an order with 2 line items joined to a shipping table with 3 partial delivery tracking rows:
\`\`\`sql
-- DANGER: Joining a 1-to-many relationship to another 1-to-many relationship
SELECT o.order_id, o.order_total, s.tracking_number, d.item_sku
FROM orders o
JOIN order_shipments s ON o.order_id = s.order_id   -- 1 order has 3 shipments
JOIN order_details d   ON o.order_id = d.order_id;  -- 1 order has 2 line items
\`\`\`
*Result*: $3 \\times 2 = 6$ rows are emitted for a single order! If you execute \`SUM(o.order_total)\`, the order revenue is multiplied by 6x!
*Defense*: Always aggregate the child tables to the common parent key **before** joining, or join exclusively through star schema dimensional relationships.

#### Guided Exercise & Deliverable
* **Dataset**: Synthetic Fintech Transaction Ledger (3.5M rows).
* **Task**: Perform a 4-table relational join connecting transactions, customers, branch territories, and fee schedules. Validate that the post-join transaction count strictly equals the pre-join header count.
* **Output**: Auditable SQL join script with row-count preservation assertion tests.`,
    quiz: {
      question: "What happens when you join an 'Orders' table to a 'Shipments' table on order_id where a single order has 3 separate shipment records?",
      options: [
        "The query deletes the order automatically",
        "The order row is duplicated 3 times in the output, which will cause SUM(order_total) to report 3x the actual revenue unless properly aggregated or deduplicated",
        "The database throws a syntax error",
        "Power BI converts the order into an Excel spreadsheet"
      ],
      correctIdx: 1,
      explanation: "Joining on a 1-to-many relationship replicates the 1-side row for every matching record on the many-side. Summing order totals across this joined set inflates revenue by the number of shipments."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-3-2-subqueries-ctes": {
    slug: "bi-3-2-subqueries-ctes",
    title: "3.2 Subqueries, Common Table Expressions (CTEs) & Staging Logic",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Subqueries, Common Table Expressions (CTEs) & Staging Logic

#### Executive Context
Monolithic SQL queries with 5 levels of deeply nested subqueries are unreadable, impossible to debug, and prone to maintenance failure. Professional corporate analysts write modular, multi-stage analytical pipelines using **Common Table Expressions (CTEs)**. The \`WITH\` clause allows you to break complex transformations into sequential, human-readable staging blocks that execute with top-down clarity.

#### Nested Subqueries vs Modular CTEs
\`\`\`sql
-- UNREADABLE NESTED SUBQUERY (ANTIPATTERN):
SELECT customer_name, total_spent
FROM (
  SELECT c.customer_name, SUM(o.amount) AS total_spent
  FROM customers c JOIN orders o ON c.id = o.customer_id
  GROUP BY c.customer_name
) sub
WHERE sub.total_spent > (
  SELECT AVG(total) FROM (SELECT SUM(amount) AS total FROM orders GROUP BY customer_id) s2
);

-- CLEAN ENTERPRISE CTE PIPELINE (THE PROFESSIONAL STANDARD):
WITH customer_revenue AS (
  SELECT 
    c.customer_id,
    c.customer_name,
    SUM(o.amount) AS total_spent
  FROM customers c
  JOIN orders o ON c.customer_id = o.customer_id
  WHERE o.status = 'COMPLETED'
  GROUP BY c.customer_id, c.customer_name
),
benchmark_metric AS (
  SELECT AVG(total_spent) AS avg_customer_spend
  FROM customer_revenue
)
SELECT 
  cr.customer_id,
  cr.customer_name,
  cr.total_spent,
  ROUND(cr.total_spent - bm.avg_customer_spend, 2) AS variance_from_average
FROM customer_revenue cr
CROSS JOIN benchmark_metric bm
WHERE cr.total_spent > bm.avg_customer_spend
ORDER BY cr.total_spent DESC;
\`\`\`

#### Key Benefits of CTE Pipelines
1. **Readability**: Code reads top-to-bottom like a sequential recipe.
2. **Reusability**: A staging CTE can be referenced multiple times downstream in the same query.
3. **Debugging Isolation**: You can inspect intermediate CTE outputs by simply commenting out downstream clauses and executing \`SELECT * FROM intermediate_cte;\`.

#### Guided Exercise & Deliverable
* **Task**: Build a 3-stage CTE pipeline querying commercial accounts:
  1. \`distributor_monthly_sales\`: Aggregate volume and gross sales per distributor per month.
  2. \`national_benchmarks\`: Compute national monthly average sales across all distributors.
  3. \`variance_summary\`: Compare each distributor's revenue against the national benchmark, flagging underperforming partners.
* **Output**: Production-grade CTE SQL script with clear stage documentation.`,
    quiz: {
      question: "What is the primary architectural advantage of Common Table Expressions (WITH clauses) over deeply nested subqueries in corporate SQL pipelines?",
      options: [
        "CTEs allow queries to run without requiring a database password",
        "CTEs modularize complex analytical logic into named, sequential staging steps that improve readability, simplify debugging, and enable reusability",
        "CTEs automatically delete unneeded tables from the hard drive",
        "CTEs can only be used on mobile devices"
      ],
      correctIdx: 1,
      explanation: "CTEs break complex data problems into logical, sequential staging tables with readable names, making code significantly easier to maintain, audit, and troubleshoot."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-3-3-sql-window-functions": {
    slug: "bi-3-3-sql-window-functions",
    title: "3.3 SQL Window Functions: Ranking, Running Totals & Period Lags",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### SQL Window Functions: Ranking, Running Totals & Period Lags

#### Executive Context
Traditional \`GROUP BY\` queries collapse rows into summary totals, losing the underlying transactional grain. **Window Functions** perform advanced mathematical calculations across a set of table rows while **retaining every individual row's unique identity**. For corporate analysts, window functions are the definitive tool for calculating running totals, customer repeat-purchase lag intervals, distributor rankings, and year-over-year momentum.

#### The \`OVER()\` Clause Anatomy
$$\\text{FUNCTION()} \\text{ OVER } (\\text{PARTITION BY } [\\text{col}] \\text{ ORDER BY } [\\text{col}])$$

* **\`PARTITION BY\`**: Divides rows into independent calculation partitions (similar to a localized \`GROUP BY\`).
* **\`ORDER BY\`**: Establishes the sequential sorting direction within each partition (vital for running totals and chronological lags).

#### Core Analytical Window Functions
\`\`\`sql
SELECT 
  distributor_name,
  region,
  sale_month,
  monthly_revenue,
  
  -- 1. Deduplication & Order Ranking
  ROW_NUMBER() OVER(PARTITION BY region ORDER BY monthly_revenue DESC) AS rank_in_region,
  
  -- 2. Running Cumulative Total YTD
  SUM(monthly_revenue) OVER(
    PARTITION BY distributor_name 
    ORDER BY sale_month 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_ytd_revenue,
  
  -- 3. Prior Month Revenue (LAG)
  LAG(monthly_revenue, 1) OVER(
    PARTITION BY distributor_name 
    ORDER BY sale_month
  ) AS prior_month_revenue,
  
  -- 4. Month-over-Month Revenue Growth %
  ROUND(
    (monthly_revenue - LAG(monthly_revenue, 1) OVER(PARTITION BY distributor_name ORDER BY sale_month)) /
    NULLIF(LAG(monthly_revenue, 1) OVER(PARTITION BY distributor_name ORDER BY sale_month), 0) * 100, 
    2
  ) AS mom_growth_pct

FROM distributor_monthly_performance;
\`\`\`

#### \`ROW_NUMBER()\` vs \`RANK()\` vs \`DENSE_RANK()\`
* **\`ROW_NUMBER()\`**: Guaranteed unique sequential integers (1, 2, 3, 4). Always used for transaction deduplication.
* **\`RANK()\`**: Leaves gaps upon ties (1, 2, 2, 4).
* **\`DENSE_RANK()\`**: Does not leave gaps upon ties (1, 2, 2, 3). Essential for commercial distributor tier rankings.

#### Guided Exercise & Deliverable
* **Task**: Write a SQL script utilizing \`LAG()\` and \`DENSE_RANK()\` to rank the top 5 distributors in each territory and compute month-over-month growth pacing across 3.5 million fintech transaction rows.
* **Output**: Advanced SQL query repository with verified window function output assertions.`,
    quiz: {
      question: "What is the critical difference between a traditional GROUP BY aggregation and a SQL Window Function with an OVER() clause?",
      options: [
        "Window functions can only run on weekends",
        "GROUP BY collapses multiple rows into a single summary row, whereas a Window Function calculates values across partitions while preserving every individual original row",
        "Window functions delete rows with negative values",
        "GROUP BY cannot be used with date columns"
      ],
      correctIdx: 1,
      explanation: "A Window Function computes calculations across a defined window of records while preserving the underlying row-level grain, enabling running totals, rankings, and row-to-row comparisons."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-3-4-analytical-queries-views": {
    slug: "bi-3-4-analytical-queries-views",
    title: "3.4 Analytical Views, Query Profiling & Timed SQL Practical Benchmark",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Analytical Views, Query Profiling & Timed SQL Practical Benchmark

#### Executive Context
Corporate BI dashboards should never execute raw, ad-hoc 500-line SQL scripts during live user refreshes. An enterprise BI specialist encapsulates complex joins, cleaning logic, and window functions inside permanent, version-controlled **Database Views** (\`CREATE VIEW\`). Furthermore, analysts understand basic query profiling using \`EXPLAIN ANALYZE\` to ensure that database indexes are utilized and query execution completes in seconds.

#### Encapsulating Logic in Analytical Views
\`\`\`sql
CREATE OR REPLACE VIEW vw_commercial_sales_mart AS
WITH cleaned_orders AS (
  SELECT 
    order_id,
    customer_id,
    order_date,
    COALESCE(discount_amount, 0) AS safe_discount,
    order_total - COALESCE(discount_amount, 0) AS net_revenue
  FROM sales_orders
  WHERE order_status = 'COMPLETED'
)
SELECT 
  o.order_id,
  o.order_date,
  c.customer_name,
  c.region,
  c.customer_tier,
  o.net_revenue,
  AVG(o.net_revenue) OVER(PARTITION BY c.region) AS regional_avg_net_revenue
FROM cleaned_orders o
JOIN dim_customers c ON o.customer_id = c.customer_id;
\`\`\`

#### Query Profiling with \`EXPLAIN ANALYZE\`
Before pointing Power BI to a database view, inspect its execution plan in PostgreSQL:
\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM vw_commercial_sales_mart WHERE order_date >= '2026-01-01';
\`\`\`
* Look for **Sequential Scan (Seq Scan)** vs **Index Scan**: A sequential scan reads every single row off the disk. If querying by \`order_date\`, ensure a B-tree index exists on \`order_date\` to transform execution from 45 seconds to 12 milliseconds!

#### Major Practical Assessment 1: 90-Minute SQL Benchmark
* **Format**: Timed practical benchmark querying the 3.5M row fintech database.
* **Tasks**:
  1. Multi-table joins with strict row-multiplication controls.
  2. 3-stage CTE pipeline isolating high-risk agent accounts.
  3. Window functions computing 30-day rolling transaction volume.
  4. Encapsulation into an auditable database view with \`EXPLAIN ANALYZE\` validation.
* **Passing Standard**: 80% accuracy against automated test fixtures.`,
    quiz: {
      question: "Why should an enterprise BI analyst encapsulate complex multi-table SQL extraction logic inside a permanent Database View (CREATE VIEW) rather than connecting Power BI directly to ad-hoc SQL snippets?",
      options: [
        "Because Power BI will refuse to open if you do not use views",
        "Views centralize data logic in the database, enable database administrators to index and optimize query plans, and allow multiple reporting tools to reuse identical business definitions",
        "Views automatically encrypt the entire computer operating system",
        "Views convert relational data into unstructured audio files"
      ],
      correctIdx: 1,
      explanation: "Database Views encapsulate complex transformation logic in the data warehouse, enabling query plan optimization, central governance, security permissions, and clean consumption by Power BI."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 04 — Power Query & Enterprise ETL Pipelines
  // ═══════════════════════════════════════════════════════════════

  "bi-4-1-power-query-profiling": {
    slug: "bi-4-1-power-query-profiling",
    title: "4.1 Power Query Ingestion, Applied Steps & Data Profiling",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Power Query Ingestion, Applied Steps & Data Profiling

#### Executive Context
Power Query is Microsoft's graphical ETL (Extract, Transform, Load) engine embedded inside Power BI Desktop and Excel. Driven by the functional **M Formula Language**, Power Query records every data transformation as a sequential, deterministic series of **Applied Steps**. Before importing raw files, an analyst uses Power Query's built-in **Data Profiling tools** to inspect column quality, detect anomalies, and enforce strict data types.

#### The Applied Steps Pipeline & The M Engine
Every click in the Power Query UI generates an underlying M expression:
\`\`\`fsharp
let
    Source = Csv.Document(File.Contents("C:\\Data\\distributor_inventory.csv"), [Delimiter=",", Columns=6, Encoding=65001]),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{
        {"Inventory_ID", Int64.Type}, 
        {"SKU_Code", type text}, 
        {"Snapshot_Date", type date}, 
        {"Quantity_On_Hand", Int64.Type}, 
        {"Unit_Cost_BDT", type number}
    }),
    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each [Quantity_On_Hand] >= 0)
in
    #"Filtered Rows"
\`\`\`

#### Professional Data Profiling Tools
In the Power Query ribbon under **View**, enable all three profiling toggles:
1. **Column Quality**: Displays the % of *Valid*, *Error*, and *Empty (Null)* records across the column.
2. **Column Distribution**: Exposes the distinct value count and identifies potential duplicate keys.
3. **Column Profile**: Displays statistical distributions: Min, Max, Average, Standard Deviation, and Odd/Even counts.
*Crucial Setting*: By default, Power Query profiles only the top 1,000 rows! In the bottom-left status bar, change this to **"Column profiling based on entire dataset"** to catch data corruption hidden deeper in large files.

#### Strict Data Typing Rules
* Never leave columns typed as \`any\` (the ABC 123 icon). Untyped columns consume massive memory in the VertiPaq engine.
* Always enforce explicit types: \`type date\` (not datetime if timestamps are irrelevant), \`Int64.Type\` for whole numbers, and \`type number\` for decimals.

#### Guided Exercise & Deliverable
* **Dataset**: Messy Distributor Inventory Files (CSV & Excel feeds).
* **Task**: Ingest raw inventory extracts, profile the top 5 data-quality defects using column quality metrics, promote headers, and enforce strict 64-bit integer and decimal data types.
* **Output**: Power Query transformation query with documented Applied Steps and zero untyped columns.`,
    quiz: {
      question: "Why should a Power BI analyst switch the column profiling setting from 'top 1,000 rows' to 'entire dataset' when inspecting messy enterprise data in Power Query?",
      options: [
        "To make the computer screen brighter",
        "Because data anomalies, type mismatches, and null spikes frequently occur beyond row 1,000 in multi-million-row corporate extracts and would otherwise be missed",
        "Because Power Query will delete files if left on top 1,000 rows",
        "To convert the data model into a Python script"
      ],
      correctIdx: 1,
      explanation: "Profiling only the first 1,000 rows gives a false sense of clean data. Null values, format changes, and corrupted records often appear deeper in large operational datasets."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-4-2-cleaning-merging-reshaping": {
    slug: "bi-4-2-cleaning-merging-reshaping",
    title: "4.2 Cleaning, Unpivoting Matrices & Reshaping Relational Tables",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Cleaning, Unpivoting Matrices & Reshaping Relational Tables

#### Executive Context
Corporate finance and sales departments love creating "wide" reporting spreadsheets where months (Jan-26, Feb-26, Mar-26) stretch across 12 horizontal columns. While convenient for human eye scanning, horizontal matrices are completely unusable for relational BI modeling! A database engine requires **tall, normalized tables** where dates exist in a single vertical column. An analyst must master **Unpivoting**, **Table Merges**, and **Table Appends**.

#### Unpivoting: Converting Wide Matrices into Tall Datasets
\`\`\`
INPUT (WIDE HUMAN SPREADSHEET):
Distributor | Product | Jan-26 | Feb-26 | Mar-26
Apex East   | SKU-101 | 50,000 | 55,000 | 62,000

OUTPUT (TALL RELATIONAL FACT TABLE):
Distributor | Product | Date       | Revenue
Apex East   | SKU-101 | 2026-01-01 | 50,000
Apex East   | SKU-101 | 2026-02-01 | 55,000
Apex East   | SKU-101 | 2026-03-01 | 62,000
\`\`\`
*Power Query Action*: Select the fixed descriptive columns (\`Distributor\`, \`Product\`), right-click, and select **"Unpivot Other Columns"**. This guarantees that as new future months are added to the source sheet, Power Query automatically unpivots them without breaking Applied Steps!

#### Merge Queries vs Append Queries
* **Append Queries (Vertical Concatenation)**:
  - Stacks tables on top of each other (like SQL \`UNION ALL\`).
  - *Use Case*: Combining monthly sales sheets (\`Sales_Jan.csv\`, \`Sales_Feb.csv\`, \`Sales_Mar.csv\`) into a single master transaction table.
* **Merge Queries (Horizontal Relational Join)**:
  - Joins columns side-by-side based on a shared key (like SQL \`LEFT JOIN\`).
  - *Use Case*: Joining a Product Category dimension table onto a Sales fact table to look up category names.

#### Guided Exercise & Deliverable
* **Task**: Ingest a 12-month distributor sales budget spreadsheet formatted as a wide cross-tab matrix. Unpivot the date columns, clean currency formatting characters, and append historical actuals.
* **Output**: Normalized, tall Power Query table ready for Star Schema relationship modeling.`,
    quiz: {
      question: "When reshaping a horizontal monthly budget spreadsheet in Power Query, why should an analyst select the key columns and click 'Unpivot Other Columns' rather than selecting the months and clicking 'Unpivot Columns'?",
      options: [
        "To reduce computer energy consumption",
        "Because 'Unpivot Other Columns' is dynamic: when new future months (e.g., Apr-26, May-26) are added to the source file, they are automatically unpivoted without breaking the query",
        "Because Unpivot Columns is deprecated in Power BI",
        "To force the file to save as a PDF"
      ],
      correctIdx: 1,
      explanation: "'Unpivot Other Columns' establishes a resilient ETL rule: all columns except the selected keys are unpivoted dynamically, accommodating future new month columns seamlessly."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-4-3-query-folding-efficiency": {
    slug: "bi-4-3-query-folding-efficiency",
    title: "4.3 Query Folding Mechanics, M Optimization & Performance Audits",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Query Folding Mechanics, M Optimization & Performance Audits

#### Executive Context
When connecting Power BI to an enterprise relational database (like PostgreSQL or SQL Server), you do not want Power BI to download 50 million raw rows across the network and filter them locally on your laptop. **Query Folding** is Power Query's ability to translate your visual Applied Steps into a single, optimized SQL query and push the heavy lifting directly to the source database server.

#### How Query Folding Works
When you filter rows, remove columns, or group by dimensions in Power Query against a relational source, the Mashup engine translates those M steps into native SQL:
\`\`\`sql
-- Native SQL Generated by Power Query Query Folding:
SELECT "customer_id", "region", SUM("order_total") AS "revenue"
FROM "public"."orders"
WHERE "order_date" >= '2026-01-01' AND "status" = 'COMPLETED'
GROUP BY "customer_id", "region";
\`\`\`
The database executes the aggregation in 200 milliseconds and transmits only the final 5,000 summary rows over the network!

#### What Breaks Query Folding?
If an Applied Step cannot be translated into native SQL, query folding **breaks** at that step. All subsequent steps are executed locally in desktop memory, requiring Power BI to download millions of raw rows!
* **Steps That Support Folding**:
  - Filtering rows (\`Table.SelectRows\`).
  - Removing columns (\`Table.SelectColumns\`).
  - Merging with tables in the same database (\`Table.NestedJoin\`).
  - Grouping and aggregating (\`Table.Group\`).
* **Steps That Break Folding**:
  - Unpivoting columns (\`Table.UnpivotOtherColumns\`) on PostgreSQL/ODBC connectors (unpivoting forces local memory evaluation; push unpivoting down into SQL views via \`CROSS JOIN LATERAL\` or \`UNION ALL\` before ingestion).
  - Merging data from two different data sources (e.g., PostgreSQL table joined to a local Excel sheet).
  - Changing a type using localized culture parameters.
  - Adding an index column (\`Table.AddIndexColumn\`).
  - Complex custom M functions or non-standard string manipulation.

#### Enterprise M Architecture: Connection Parameterization
In production CI/CD pipelines, hardcoding database endpoints (like \`"corp-dw.insyt.internal"\`) in M-code is an anti-pattern. Always parameterize:
\`\`\`powerquery
// Parameterized Source Connection in Power Query:
let
    Source = PostgreSQL.Database(#"ServerEndpoint", #"DatabaseName", [CreateNavigationProperties=false]),
    fmcg_orders = Source{[Schema="public", Item="fmcg_orders_detail"]}[Data],
    FilteredDelivered = Table.SelectRows(fmcg_orders, each [order_status] = "DELIVERED")
in
    FilteredDelivered
\`\`\`
This allows Power BI Service Deployment Pipelines to repoint models from Development to Production environments without touching M code.

#### How to Inspect Query Folding
Right-click any Applied Step in the query settings panel:
* If **"View Native Query"** is clickable: Query folding is active! You can inspect the generated SQL.
* If **"View Native Query"** is greyed out: Folding has broken at or before this step.

#### Guided Exercise & Deliverable
* **Task**: Audit a 6-step Power Query transformation connecting to PostgreSQL. Identify the exact step that broke query folding, reorder the applied steps to push filters upstream, and restore complete native query folding.
* **Output**: Verified M script with active native query folding verified via the View Native Query inspector.`,
    quiz: {
      question: "What is 'Query Folding' in Power Query, and why is it vital for enterprise dataset refresh performance?",
      options: [
        "A feature that physically folds the computer monitor in half",
        "The automatic translation of Power Query transformation steps into native SQL executed directly on the source database server, minimizing network data transfer and memory usage",
        "A tool that converts Power BI files into zip archives",
        "A protocol that encrypts passwords on the local network"
      ],
      correctIdx: 1,
      explanation: "Query folding pushes transformations upstream to the database engine as optimized SQL, drastically accelerating scheduled dataset refreshes and saving client memory."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-4-4-repeatable-etl-pipeline": {
    slug: "bi-4-4-repeatable-etl-pipeline",
    title: "4.4 Building a Repeatable Enterprise ETL Pipeline & Data Quality Checks",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Building a Repeatable Enterprise ETL Pipeline & Data Quality Checks

#### Executive Context
An enterprise ETL pipeline must run unattended every morning at 06:00 AM without human intervention. If a source file has an extra blank row, an altered column header, or a missing currency code, an unshielded pipeline will crash, leaving corporate executives with blank dashboards. Professional analysts build **Repeatable ETL Pipelines** with built-in schema validation, automated error traps, and audit reconciliation queries.

#### The Architecture of an Unattended ETL Pipeline
1. **Parameterized Connections**:
   - Never hardcode file paths (\`C:\\Users\\Hasan\\...\`) or server names. Use **Power Query Parameters** (\`pServerName\`, \`pDataFolder\`) so environments can be switched between Dev and Prod with one click.
2. **Defensive Column Renaming**:
   - Use M's \`MissingField.Ignore\` or explicit schema validation functions to prevent missing header crashes.
3. **Automated Error Logging Table**:
   - Create a secondary query in Power Query that isolates rejected records (\`Table.SelectRowsWithErrors\`) and routes them to an auditable exception table.
4. **Disabling Query Load for Staging Tables**:
   - Right-click intermediate staging queries and uncheck **"Enable load"**. Staging queries remain active for transformation logic but are not loaded into the final data model, saving millions of bytes of memory!

\`\`\`
POWER QUERY PIPELINE ORCHESTRATION:
[ Raw ERP View ] ──► (Staging Query: Load Disabled) ──┐
                                                      ├──► [ Merged Clean Fact Table ] ──► (Loaded into Model)
[ Flat CSV Feed ] ──► (Staging Query: Load Disabled) ──┘
\`\`\`

#### Guided Exercise & Deliverable
* **Problem Set 4 Deliverable**: Build a complete, repeatable Power Query ETL pipeline ingesting multi-source distributor inventory and sales records.
* **Requirements**:
  - Parameterized connection strings.
  - Zero duplicate records on natural primary keys.
  - Intermediate staging queries set to "Enable Load = False".
  - Documented Applied Steps sequence and query folding verification audit.
* **Output**: Production-ready Power BI template (.pbit) with verified ETL pipeline architecture.`,
    quiz: {
      question: "Why should intermediate staging queries in Power Query have 'Enable Load' unchecked before publishing a model?",
      options: [
        "Because Power BI will delete the query permanently",
        "To prevent intermediate transformation steps from consuming unnecessary memory and cluttering the final reporting semantic model, while keeping them active for transformation logic",
        "Because staging queries only work in Excel",
        "To stop the computer from connecting to the internet"
      ],
      correctIdx: 1,
      explanation: "Disabling load keeps staging queries available in the Power Query pipeline while preventing them from loading redundant tables into the VertiPaq model, saving memory and keeping the field list clean."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 05 — Dimensional Modeling & Star Schemas
  // ═══════════════════════════════════════════════════════════════

  "bi-5-1-grain-fact-dimension-tables": {
    slug: "bi-5-1-grain-fact-dimension-tables",
    title: "5.1 Transaction Grain, Fact Tables & Dimension Table Architecture",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Transaction Grain, Fact Tables & Dimension Table Architecture

#### Executive Context
Ralph Kimball's dimensional modeling methodology remains the gold standard for enterprise data warehousing and business intelligence. Before drawing a single relationship line in Power BI, an analyst must establish the **Atomic Grain** of the business process. A model that conflates monthly target budgets with daily transaction lines in the same table produces corrupted aggregations and meaningless DAX calculations.

#### Facts vs Dimensions: The Core Distinction
* **Fact Tables (The "What Happened" Numerical Measurements)**:
  - Contain quantitative numerical metrics (e.g., \`units_sold\`, \`gross_revenue\`, \`freight_cost\`).
  - Contain foreign keys linking to dimensions.
  - Tall, deep tables containing millions or billions of transactional rows.
  - Examples: \`fact_sales_transactions\`, \`fact_inventory_snapshots\`, \`fact_gl_balances\`.
* **Dimension Tables (The "Who, What, Where, When" Context)**:
  - Contain descriptive textual attributes used for filtering, grouping, and slicing (e.g., \`customer_name\`, \`brand\`, \`territory\`, \`fiscal_quarter\`).
  - Contain a unique Primary Key.
  - Wide, shallow tables containing hundreds or thousands of rows.
  - Examples: \`dim_customers\`, \`dim_products\`, \`dim_distributors\`, \`dim_date\`.

\`\`\`
KIMBALL DIMENSIONAL TAXONOMY:
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│ DIMENSION: dim_products         │       │ FACT: fact_sales_transactions   │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ • product_key (PK)              │◄──────┤ • order_id                      │
│ • product_name                  │   1:N │ • product_key (FK)              │
│ • brand                         │       │ • customer_key (FK)             │
│ • category                      │       │ • order_date                    │
│ • unit_cost                     │       │ • units_sold (Metric)           │
└─────────────────────────────────┘       │ • revenue (Metric)              │
                                          └─────────────────────────────────┘
\`\`\`

#### The 4-Step Dimensional Design Process
1. **Select the Business Process**: (e.g., Retail Sales Invoicing).
2. **Declare the Atomic Grain**: *"One row represents an individual line item on a completed customer invoice."*
3. **Identify the Dimensions**: Date, Product, Distributor, Territory, Payment Channel.
4. **Identify the Numeric Facts**: Quantity, Unit Price, Extended Price, Discount Amount, Net Sales.

#### Guided Exercise & Deliverable
* **Task**: Deconstruct a messy 35-column distributor sales extract into an auditable dimensional schema: separate descriptive product and customer attributes into dimension tables and retain numerical metrics in a central fact table.
* **Output**: Dimensional Design Matrix specifying Table Name, Classification (Fact vs Dim), Primary Key, and Declared Atomic Grain.`,
    quiz: {
      question: "What is the 'Atomic Grain' of a fact table, and why must it be explicitly declared before building a Power BI model?",
      options: [
        "The physical size of the hard drive in gigabytes",
        "The exact real-world business event represented by a single row in the table (e.g., one line item on an invoice), ensuring aggregations do not inadvertently double-count revenue",
        "The font size used on dashboard cards",
        "The number of users logged into the Power BI workspace"
      ],
      correctIdx: 1,
      explanation: "Declaring the atomic grain defines what an individual row represents. Without an explicit grain, analysts link tables at conflicting levels of detail, leading to duplicated metrics."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-5-2-star-schemas-cardinality": {
    slug: "bi-5-2-star-schemas-cardinality",
    title: "5.2 Star Schemas, Relationship Cardinality & Filter Propagation",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Star Schemas, Relationship Cardinality & Filter Propagation

#### Executive Context
In Power BI Desktop, the visual model view is not just an ER diagram; it dictates the exact paths along which DAX filters flow. A **Star Schema**—where a central fact table is surrounded by independent dimension tables—is mathematically proven to deliver optimal compression, lightning-fast queries, and intuitive DAX calculations. Departing from a Star Schema into complex Snowflake schemas or bidirectional Many-to-Many webs leads to ambiguous filter paths and incorrect totals.

#### The Golden Rules of Power BI Relationships
1. **Strict 1-to-Many (1:N) Cardinality**:
   - The "1" side is **always** the Dimension table (unique Primary Key).
   - The "Many (*)" side is **always** the Fact table (Foreign Key).
2. **Single-Direction Filter Propagation**:
   - Filter arrows must flow **from the Dimension table down into the Fact table**.
   - Filtering by \`dim_products[brand] = 'Apex'\` automatically filters \`fact_sales\`.
   - The Fact table does **NOT** filter the Dimension table!
3. **Avoid Bidirectional Cross-Filtering (Both Directions)**:
   - Setting relationships to "Both" creates circular, ambiguous filter loops where slicing by product can unexpectedly filter customer tables in unpredictable ways. Keep filter direction **Single**!

\`\`\`
THE STAR SCHEMA ARCHITECTURE:
        [ dim_customers ]          [ dim_products ]
                │ (1)                      │ (1)
                │                          │
                ▼ (*)                      ▼ (*)
          ┌──────────────────────────────────────┐
          │      fact_sales_transactions         │
          └──────────────────────────────────────┘
                ▲ (*)                      ▲ (*)
                │                          │
                │ (1)                      │ (1)
         [ dim_regions ]             [ dim_date ]
\`\`\`

#### Target Fact Grain Mismatch & Cartesian Inflation Prevention
When incorporating budgets or sales targets (\`dim_monthly_targets\`), the target table is almost always at a higher/coarser grain than transactional sales:
* \`fmcg_orders_detail\`: Atomic line item grain (Order ID, SKU, Date, Distributor).
* \`dim_monthly_targets\`: Summary regional grain (Region ID, Year, Month).
* **The Pitfall**: If a report visual slices by \`distributor_name\` or \`sku_code\`, a naive target sum repeats the monthly regional target for every single distributor row, inflating the visual grand total by 20x to 100x!
* **The Solution (Kimball Multi-Star Schema & DAX Grain Guards)**:
  1. Do NOT merge monthly targets into the transactional sales cube. Keep them as separate fact tables, both linked to shared conforming dimensions (\`dim_regions\`, \`dim_calendar\`).
  2. Write grain-safe DAX measures using \`ISINSCOPE()\`:
  \`\`\`dax
  Regional Target BDT = 
  IF(
      ISINSCOPE(dim_products[sku_code]) || ISINSCOPE(dim_distributors[distributor_name]),
      BLANK(), -- Suppress target evaluation at grains where target does not exist
      SUM(dim_monthly_targets[target_revenue_bdt])
  )
  \`\`\`
  This guarantees mathematical integrity and prevents accidental Cartesian target multiplication!

#### Guided Exercise & Deliverable
* **Task**: Audit a corrupted Power BI model containing 3 bidirectional relationships and a Many-to-Many link between Sales and Budgets. Redesign the architecture into a clean Star Schema using a shared Date and Product dimension with single-direction filter propagation.
* **Output**: Auditable Star Schema Model Diagram with verified 1:N cardinality and single-direction filter arrows.`,
    quiz: {
      question: "Why should an enterprise Power BI modeler strictly enforce Single-Direction filter propagation (from Dimension to Fact) rather than setting relationships to 'Both' (Bidirectional)?",
      options: [
        "Because single-direction relationships use less ink when printed",
        "Because bidirectional cross-filtering introduces ambiguous filter paths, unpredictable DAX measure evaluations, and severe query performance degradation",
        "Because Power BI Desktop cannot open files with bidirectional relationships",
        "To prevent users from changing visual chart colors"
      ],
      correctIdx: 1,
      explanation: "Bidirectional relationships cause filters to flow unpredictably across the entire model graph, creating ambiguous paths and non-deterministic DAX results while significantly slowing down engine performance."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-5-3-surrogate-keys-date-tables": {
    slug: "bi-5-3-surrogate-keys-date-tables",
    title: "5.3 Surrogate Keys, Dedicated Date Tables & Fiscal Calendars",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Surrogate Keys, Dedicated Date Tables & Fiscal Calendars

#### Executive Context
Two technical foundations distinguish an amateur Power BI report from an enterprise-grade semantic model: **Surrogate Integer Keys** and a **Dedicated, Contiguous Date Dimension Table**. Relying on text strings (like customer names or product descriptions) as relationship keys bloats memory usage, while failing to mark a formal Date Table completely breaks DAX Time Intelligence functions like \`TOTALYTD\` and \`SAMEPERIODLASTYEAR\`.

#### Natural Keys vs Surrogate Keys
* **Natural Key (Operational Key)**: The real-world business identifier (e.g., SKU \`"BEV-COLA-500ML-CAN"\`, Tax ID \`"BIN-99014-X"\`). Often long text strings with dashes and spaces.
* **Surrogate Key (Warehouse Key)**: A synthetic, sequential 64-bit integer assigned in the data warehouse or Power Query (e.g., \`1042\`, \`1043\`).
* *Why Surrogate Integer Keys Win*:
  - VertiPaq dictionary compression encodes integers in CPU registers at near-zero memory cost.
  - Integer relationship joins evaluate 5x to 10x faster than string comparisons.
  - Immune to business renaming (e.g., if a customer changes their legal trading name, the surrogate key \`4018\` remains unchanged).

#### The Mandatory Requirements for a Date Table (\`dim_date\`)
To support DAX Time Intelligence, your Date dimension **MUST** fulfill 4 non-negotiable rules:
1. It must contain a column of data type **\`Date\`** (or \`DateTime\`).
2. The dates must be **contiguous** (every single calendar day with zero gaps from Start to End).
3. It must cover the entire date range of all related fact tables.
4. It must be explicitly marked as a Date Table: Right-click table -> **Mark as Date Table**.

\`\`\`dax
// Enterprise DAX Calendar Table Generation:
dim_date = 
VAR MinYear = 2024
VAR MaxYear = 2027
RETURN
ADDCOLUMNS(
  CALENDAR(DATE(MinYear, 1, 1), DATE(MaxYear, 12, 31)),
  "Year", YEAR([Date]),
  "Quarter", "Q" & FORMAT([Date], "Q"),
  "MonthNum", MONTH([Date]),
  "MonthName", FORMAT([Date], "mmm"),
  "YearMonth", FORMAT([Date], "yyyy-mm"),
  "FiscalYear", "FY" & IF(MONTH([Date]) >= 7, YEAR([Date]) + 1, YEAR([Date])),
  "FiscalQuarter", "FQ" & IF(MONTH([Date]) >= 7, FORMAT([Date], "Q") - 2, FORMAT([Date], "Q") + 2),
  "DayOfWeek", FORMAT([Date], "dddd"),
  "IsWeekday", IF(WEEKDAY([Date], 2) <= 5, TRUE, FALSE)
)
\`\`\`

#### Role-Playing Date Dimensions: Order Date vs Ship Date
In enterprise supply chains and FMCG, orders are placed on one date and delivered/shipped on a subsequent date.
* **Architecture Pattern 1: Inactive Relationship with \`USERELATIONSHIP()\` (Recommended)**:
  - Establish an **Active** relationship between \`fmcg_orders_header[order_date]\` and \`dim_calendar[date_key]\`.
  - Establish a secondary **Inactive** relationship between \`fmcg_orders_header[ship_date]\` and \`dim_calendar[date_key]\`.
  - In DAX, activate the ship-date relationship on demand:
  \`\`\`dax
  Sales by Ship Date = 
  CALCULATE(
      [Total Gross Sales],
      USERELATIONSHIP(fmcg_orders_header[ship_date], dim_calendar[date_key])
  )
  \`\`\`
* **Architecture Pattern 2: Dual Role-Playing Dimension Tables**:
  - Clone \`dim_order_calendar\` and \`dim_ship_calendar\` in Power Query or DAX when users must slice simultaneously by Order Year AND Delivery Month in matrix visuals.

#### Guided Exercise & Deliverable
* **Task**: Author an enterprise DAX Date Dimension table supporting a July–June Fiscal Year calendar, establish relationships to sales and target fact tables, and configure month name sorting using the \`MonthNum\` column.
* **Output**: Marked Date Dimension table with verified fiscal calendar attributes and zero chronological sorting errors.`,
    quiz: {
      question: "Which of the following is a non-negotiable prerequisite for a Date dimension table to support native DAX Time Intelligence functions in Power BI?",
      options: [
        "It must be created in Microsoft Excel",
        "It must contain a contiguous range of dates with zero missing calendar days and be marked as a Date Table",
        "It must only contain dates falling on weekdays",
        "It must have more than 100,000 rows"
      ],
      correctIdx: 1,
      explanation: "DAX time intelligence functions rely on contiguous, unbroken date sequences. If a single weekend or holiday date is missing, functions like SAMEPERIODLASTYEAR and DATESYTD return incorrect results."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-5-4-model-validation-integrity": {
    slug: "bi-5-4-model-validation-integrity",
    title: "5.4 Model Validation, Aggregation Integrity & Practical Star Schema Benchmark",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Model Validation, Aggregation Integrity & Practical Star Schema Benchmark

#### Executive Context
Before a BI analyst presents a dashboard to the board, they conduct a rigorous **Model Validation Audit**. A semantic model can have relationships that look visually clean but produce subtle, catastrophic calculation errors: duplicate dimension keys creating blank visual rows, orphan fact records dropping revenue, or monthly target tables linked at the wrong granularity causing target numbers to be multiplied by 30x!

#### The 5 Deadly Modeling Defects
1. **The Many-to-Many Target Grain Trap**:
   - Monthly sales targets exist at the *Monthly Regional Grain*.
   - Sales transactions exist at the *Daily SKU Grain*.
   - If you link targets directly to the daily sales fact table, Power BI replicates monthly targets for every daily transaction row, inflating regional targets by 30x!
   - *Fix*: Keep targets in a separate Fact Table linked to \`dim_regions\` and \`dim_date\` (at the Month level).
2. **Orphan Records in Fact Tables**:
   - A new retail product was sold, but its SKU was never added to the master product catalog.
   - When sliced by Product Category, the revenue appears under a **Blank** visual line item.
3. **Inactive Relationships**:
   - A sales order has two dates: \`OrderDate\` and \`ShipDate\`.
   - Power BI permits only **one active relationship** between two tables. The secondary relationship to \`ShipDate\` is created as inactive (dotted line) and must be invoked dynamically using the DAX \`USERELATIONSHIP()\` function!

\`\`\`
ROLE-PLAYING DATES & INACTIVE RELATIONSHIPS:
[ dim_date ] ────── Active Relationship (Solid Line: OrderDate) ────► [ fact_sales ]
      │
      └──────────── Inactive Relationship (Dotted Line: ShipDate) ───► [ fact_sales ]
                   Invoked via DAX: USERELATIONSHIP(dim_date[Date], fact_sales[ShipDate])
\`\`\`

#### Major Practical Assessment 2: Star Schema Build
* **Format**: Independent modeling benchmark transforming an 8-table normalized supply chain database into an enterprise Power BI Star Schema.
* **Evaluation Criteria**:
  - Elimination of snowflake structures into clean star dimensions.
  - Strict 1:N relationship cardinality and single-direction filter propagation.
  - Dedicated, marked fiscal date table.
  - Proper integration of monthly targets without grain duplication.
  - Zero orphan records or unhandled blank dimension categories.
* **Passing Standard**: 80% score based on automated structural validation.`,
    quiz: {
      question: "How should an analyst model a situation where an order fact table contains both an 'OrderDate' and a 'ShipDate', both needing to relate to the Date dimension?",
      options: [
        "Delete the ShipDate column from the database",
        "Create an active relationship on OrderDate and an inactive relationship on ShipDate, activating the secondary relationship dynamically in DAX measures via USERELATIONSHIP()",
        "Duplicate the entire database 365 times",
        "Force bidirectional cross-filtering on all tables"
      ],
      correctIdx: 1,
      explanation: "Power BI allows only one active relationship between two tables to prevent ambiguity. Inactive relationships are created for secondary role-playing dates and activated via USERELATIONSHIP in specific measures."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 06 — Core DAX Engineering & Filter Context
  // ═══════════════════════════════════════════════════════════════

  "bi-6-1-measures-calculated-columns": {
    slug: "bi-6-1-measures-calculated-columns",
    title: "6.1 Measures, Calculated Columns & Evaluation Context Foundations",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Measures, Calculated Columns & Evaluation Context Foundations

#### Executive Context
Data Analysis Expressions (DAX) is the functional, context-driven formula language of Power BI. The single most common point of failure for transitioning Excel users is confusing **Calculated Columns** with **Measures**. Calculated columns evaluate once at data refresh and consume permanent disk and RAM storage. Measures evaluate dynamically at query time in response to whatever slicers and visual filters are active on the canvas.

#### Calculated Columns vs Measures Comparison
| Architectural Dimension | Calculated Column | Explicit DAX Measure |
| :--- | :--- | :--- |
| **Evaluation Time** | During data refresh / model load | Real-time visual query execution |
| **Memory Footprint** | Stored in RAM / VertiPaq file | Consumes ZERO disk/RAM storage |
| **Context** | **Row Context** (current row values) | **Filter Context** (active slicers & filters) |
| **Use Case** | Slicers, axis labels, sorting attributes | Numerical KPIs, totals, ratios, variances |
| **Best Practice** | Use sparingly; push to SQL/PQ if possible | **Mandatory** for all financial and KPI metrics |

#### The Two Evaluation Contexts in DAX
1. **Row Context**:
   - The engine knows the values of the *current row*.
   - Exists automatically in Calculated Columns and inside iterator functions like \`SUMX\`.
   - Row context does **NOT** filter other tables!
2. **Filter Context**:
   - The active set of filters applied by visual coordinates, slicers, page filters, and report filters.
   - Tells the engine *which subset of rows are currently visible* for calculation.
   - Filter context propagates across 1-to-many relationships in your Star Schema.

\`\`\`
HOW FILTER CONTEXT PROPAGATES:
User selects Slicer: [ Region = 'Chittagong' ]
                 │
                 ▼ Filter Context applied to: dim_regions
[ dim_regions (Chittagong) ] ──(Propagates across 1:N)──► [ fact_sales (Filtered to 42,000 matching rows) ]
                 │
                 ▼ DAX Measure Evaluated:
[ Total Revenue = SUM(fact_sales[Revenue]) ] ──► Returns: $1,420,000 for Chittagong ONLY
\`\`\`

#### Why Implicit Measures Are Banned in Enterprise BI
Dragging a numeric column (like \`revenue\`) directly into a visual creates an "Implicit Measure" (\`Sum of revenue\`).
*Enterprise Rule*: **Always author Explicit DAX Measures** (\`[Total Revenue] = SUM(sales[revenue])\`). Explicit measures can be referenced by downstream calculations, formatted centrally, and governed through version control.

#### Guided Exercise & Deliverable
* **Task**: Convert an amateur Power BI workbook with 14 calculated columns and implicit drag-and-drop summaries into an auditable explicit DAX measure model, deleting unneeded calculated columns to reduce file size.
* **Output**: Cleaned Power BI model containing a dedicated \`_Measures\` table with documented explicit base measures.`,
    quiz: {
      question: "Why should an enterprise BI analyst avoid using Calculated Columns for financial totals like Revenue and Gross Profit?",
      options: [
        "Because calculated columns cannot perform addition",
        "Because calculated columns are pre-computed row-by-row and stored permanently in memory, consuming massive RAM and failing to respond dynamically to user visual filter selections",
        "Because Microsoft Power BI deletes calculated columns every 24 hours",
        "Because calculated columns can only be viewed in black and white"
      ],
      correctIdx: 1,
      explanation: "Calculated columns are computed during data refresh and stored in memory, bloating the model size. Dynamic measures consume zero storage and calculate dynamically based on active visual filters."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-6-2-fundamental-business-measures": {
    slug: "bi-6-2-fundamental-business-measures",
    title: "6.2 Fundamental Business Measures: SUM, DIVIDE & Safe Margin Calculations",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Fundamental Business Measures: SUM, DIVIDE & Safe Margin Calculations

#### Executive Context
Every enterprise reporting model begins with a core portfolio of **Base Measures**. Writing base measures correctly establishes the mathematical integrity of all downstream variance calculations and KPIs. An analyst must master defensive division using \`DIVIDE()\`, understand the role of \`DISTINCTCOUNT()\`, and author standard financial metrics including Gross Sales, Net Revenue, COGS, and Gross Margin %.

#### The Base Financial Measure Suite
\`\`\`dax
// 1. Total Volume Billed
Total Units Sold = SUM(fact_sales[units_sold])

// 2. Gross Commercial Sales
Gross Sales = SUM(fact_sales[gross_sales_amount])

// 3. Trade Spend & Discounts
Total Trade Discounts = SUM(fact_sales[discount_amount])

// 4. Net Revenue (The Top-Line Benchmark)
Net Revenue = [Gross Sales] - [Total Trade Discounts]

// 5. Cost of Goods Sold (COGS)
Total COGS = SUM(fact_sales[cogs_amount])

// 6. Gross Profit
Gross Profit = [Net Revenue] - [Total COGS]

// 7. Gross Margin % (Defensive Division)
Gross Margin % = 
DIVIDE(
  [Gross Profit], 
  [Net Revenue], 
  BLANK()
)
\`\`\`

#### Why \`DIVIDE()\` Is Mandatory Over the Slash (\`/\`) Operator
In DAX, using the traditional forward slash for division (\`[Gross Profit] / [Net Revenue]\`) causes two fatal bugs:
1. **Divide-by-Zero Exception**: If a newly onboarded distributor has zero revenue, the slash operator returns \`Infinity\` or crashes visual rendering.
2. **Visual Clutter**: Returning \`Infinity\` keeps empty distributor rows visible in tables instead of allowing visual matrix pruning.
\`DIVIDE(Numerator, Denominator, [AlternateResult])\` automatically catches divide-by-zero, returning \`BLANK()\` by default, which allows Power BI to prun empty rows cleanly.

#### Discrete Activity Metrics: \`COUNTROWS\` vs \`DISTINCTCOUNT\`
* \`Total Transactions = COUNTROWS(fact_sales)\`: Extremely fast metadata count of fact table rows.
* \`Active Buying Accounts = DISTINCTCOUNT(fact_sales[customer_key])\`: Counts unique customers who actually placed an order within the active filter context.

#### Guided Exercise & Deliverable
* **Task**: Implement the core 7-measure financial suite in a dedicated \`_Measures\` table, format percentages to 1 decimal place with currency symbols, and verify against database control totals.
* **Output**: Auditable DAX measure repository script (.dax) with documented measure descriptions.`,
    quiz: {
      question: "Why is the DAX function DIVIDE([Profit], [Revenue]) preferred over the standard division operator [Profit] / [Revenue]?",
      options: [
        "Because DIVIDE() works faster on wireless networks",
        "Because DIVIDE() handles division-by-zero safely without throwing errors, returning BLANK() by default to allow clean visual matrix table pruning",
        "Because the slash operator is not supported in modern versions of Power BI",
        "Because DIVIDE() automatically rounds all numbers to the nearest whole integer"
      ],
      correctIdx: 1,
      explanation: "The DIVIDE function has built-in divide-by-zero protection. When the denominator is zero, it returns BLANK() (or a specified alternate result), preventing visual errors and infinity values."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-6-3-calculate-filter-modification": {
    slug: "bi-6-3-calculate-filter-modification",
    title: "6.3 The CALCULATE Engine, Filter Modification & Context Transition",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The CALCULATE Engine, Filter Modification & Context Transition

#### Executive Context
\`CALCULATE()\` is the single most important, versatile, and powerful function in DAX. It is the **ONLY** function in the DAX language capable of modifying, overriding, adding to, or clearing the active Filter Context. Every advanced business calculation—market share %, budget comparisons, regional allocations, and time intelligence—is executed under the hood by \`CALCULATE()\`.

#### How \`CALCULATE()\` Works Internally
$$\\text{CALCULATE}(<\\text{Expression}>, <\\text{Filter1}>, <\\text{Filter2}>, ...)$$

1. \`CALCULATE\` takes a snapshot of the current incoming Filter Context from the visual.
2. It evaluates its filter arguments.
3. It merges or overrides the filter arguments onto the incoming filter context.
4. It evaluates the inner expression under this newly modified filter context.

#### Filter Modification Modifiers: \`ALL\` vs \`REMOVEFILTERS\`
* **\`REMOVEFILTERS()\` (The Modern Benchmark)**:
  - Clears filters from a specified table or column, allowing you to calculate grand totals:
  \`\`\`dax
  // Calculating Share of National Sales %
  National Revenue = 
  CALCULATE(
    [Net Revenue], 
    REMOVEFILTERS(dim_regions)
  )

  Regional Share of Sales % = 
  DIVIDE([Net Revenue], [National Revenue], BLANK())
  \`\`\`
* **\`ALL()\`**:
  - Similar to REMOVEFILTERS, but returns a table of distinct values when used as a table expression.

\`\`\`
HOW CALCULATE OVERRIDES FILTER CONTEXT:
Incoming Visual Context: [ Region = 'Sylhet' ]
                 │
                 ▼
CALCULATE([Net Revenue], REMOVEFILTERS(dim_regions))
                 │
                 ▼ Filter on dim_regions is REMOVED!
Calculates Revenue for ALL regions combined ($14.8M)
                 │
                 ▼ Slicer Ratio Computed:
Sylhet ($1.2M) / National ($14.8M) = 8.1% Share of Total!
\`\`\`

#### Context Transition: The Secret Power of \`CALCULATE\`
When \`CALCULATE()\` is invoked inside a Row Context (such as inside a calculated column or a \`SUMX\` iterator), it performs **Context Transition**: it automatically transforms the current row values into an equivalent Filter Context!

#### Overriding vs Intersecting Filters: \`KEEPFILTERS()\`
* **Default \`CALCULATE\` Filter Replacement**:
  - By default, filter arguments in \`CALCULATE([Sales], dim_products[category] = "Beverages")\` **overwrite** any incoming filter on \`category\`. If a user selected "Foods" in a visual row, the measure forcefully overrides it with "Beverages".
* **\`KEEPFILTERS()\` (Filter Intersection)**:
  - Wrapping the condition in \`KEEPFILTERS(dim_products[category] = "Beverages")\` converts filter replacement into **filter intersection** ($A \cap B$). If the outer visual filter is "Foods", the intersection evaluates to empty/BLANK, ensuring matrix visual totals never leak numbers into unrelated category rows.

#### Guided Exercise & Deliverable
* **Task**: Construct 3 market share measures utilizing \`CALCULATE\` and \`REMOVEFILTERS\`: Regional Share of Total Sales %, Brand Share of Category Sales %, and High-Discount Revenue (> 15% discount).
* **Output**: Verified DAX measure script displaying accurate visual row percentages and a grand total that correctly sums to 100.0%.`,
    quiz: {
      question: "What is the unique capability of the CALCULATE function in the DAX language that no other function possesses?",
      options: [
        "It can send emails to dashboard users automatically",
        "It is the only function capable of modifying, overriding, or clearing the active Filter Context during visual calculation",
        "It allows Power BI to run on Linux servers without an emulator",
        "It converts text columns into audio files"
      ],
      correctIdx: 1,
      explanation: "CALCULATE is the heart of DAX because it is the only function that can alter the active filter context, enabling calculations like share of total, target comparisons, and time intelligence."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-6-4-dax-debugging-validation": {
    slug: "bi-6-4-dax-debugging-validation",
    title: "6.4 DAX Debugging, Total Inconsistencies & Testing Visual Granularities",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### DAX Debugging, Total Inconsistencies & Testing Visual Granularities

#### Executive Context
A classic complaint from new Power BI developers is: *"My visual table shows the right numbers on individual rows, but the Total row at the bottom is completely wrong!"* In DAX, **the total row is NOT the sum of the rows above it!** The total row evaluates the exact same measure formula under an empty filter context across that dimension. Understanding this evaluation principle is vital for debugging complex measures and building auditable models.

#### Why the Total Row Differs from Visible Rows
Consider a measure calculating Average Daily Revenue:
* On Row "Monday": Computes average daily revenue for Mondays ($12,000).
* On Row "Tuesday": Computes average daily revenue for Tuesdays ($14,000).
* **On Total Row**: The filter on Day of Week is removed! The measure evaluates across the entire week, returning the overall daily average ($13,000)—**NOT** $26,000!
* If a business rule explicitly requires the total row to sum the visible rows, use an iterator like \`SUMX\`:
  \`\`\`dax
  Summed Visible Total = 
  SUMX(
    VALUES(dim_date[DayOfWeek]), 
    [Daily Average Revenue]
  )
  \`\`\`

#### The 4-Step DAX Debugging Protocol
1. **Test at Multiple Visual Granularities**:
   - Never test a measure on a single KPI card. Place it in a matrix with Category, Subcategory, and Date on the rows to observe behavior as filter context expands and contracts.
2. **Deconstruct with Table Variables (\`VAR\` / \`RETURN\`)**:
   - Break complex expressions into named variables and return intermediate scalars to pinpoint the exact failure point.
3. **Reconcile Against Validated SQL**:
   - Compare the measure's output against the corresponding SQL query executed directly against PostgreSQL. If the numbers differ, inspect relationships and filter propagation.
4. **Audit for Hidden Filters**:
   - Check if page-level filters, visual-level filters, or cross-highlighting from adjacent charts are silently skewing visual context.

#### Guided Exercise & Deliverable
* **Problem Set 6 Deliverable**: Core DAX Benchmark.
* **Requirements**:
  - Deliver 10 documented business measures: Net Revenue, Gross Margin, Gross Margin %, Trade Spend %, Share of Total %, Target Variance, and AOV.
  - Test measures across 3 visual granularities (National, Regional, and Distributor level).
  - Verify that visual table totals behave with mathematical integrity.
* **Output**: Verified DAX measure test workbook with documented reconciliation comparisons.`,
    quiz: {
      question: "Why does the 'Total' row at the bottom of a Power BI matrix visual sometimes display a number that does not equal the visual sum of the rows above it?",
      options: [
        "Because Power BI has a rounding bug that cannot be fixed",
        "Because the total row does not sum the cells above it; it evaluates the measure expression independently under a broader filter context where the row dimension filter is absent",
        "Because the computer ran out of temporary memory",
        "Because the table needs to be converted into an Excel spreadsheet"
      ],
      correctIdx: 1,
      explanation: "In DAX, total rows evaluate the measure formula in their own filter context (where the row dimension is unfiltered), rather than simply adding up the visual cells above."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 07 — Advanced DAX & Commercial Logic
  // ═══════════════════════════════════════════════════════════════

  "bi-7-1-variables-iterators-maintainability": {
    slug: "bi-7-1-variables-iterators-maintainability",
    title: "7.1 DAX Variables (VAR), Row Iterators (SUMX) & Maintainable Code",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### DAX Variables (VAR), Row Iterators (SUMX) & Maintainable Code

#### Executive Context
Writing high-performance, maintainable DAX requires moving beyond basic aggregators to **DAX Variables (\`VAR\` / \`RETURN\`)** and **Iterator Functions (\`SUMX\`, \`AVERAGEX\`, \`RANKX\`)**. Variables dramatically improve query performance by caching calculation results in memory rather than recalculating identical sub-expressions multiple times. Simultaneously, row iterators allow you to perform row-by-row arithmetic across related tables without creating expensive calculated columns.

#### The Performance Power of \`VAR\` / \`RETURN\`
\`\`\`dax
// SLOW ANTIPATTERN (Recalculates [Net Revenue] twice!):
Margin % = 
IF(
  [Net Revenue] > 0, 
  [Gross Profit] / [Net Revenue], 
  BLANK()
)

// OPTIMIZED ENTERPRISE PATTERN WITH VARIABLES:
Margin % = 
VAR CurrentRevenue = [Net Revenue]       // Evaluated once and cached in RAM!
VAR CurrentProfit  = [Gross Profit]
RETURN
IF(
  CurrentRevenue > 0, 
  DIVIDE(CurrentProfit, CurrentRevenue, BLANK()), 
  BLANK()
)
\`\`\`
*Key Insight*: DAX variables are evaluated at the exact point of declaration using the filter context present **at that moment**, and their resulting value remains immutable throughout the formula execution.

#### When to Use Row Iterators (\`X\` Functions)
Standard aggregate functions (like \`SUM\`) can only accept a single column reference (\`SUM(table[col])\`).
When your calculation requires row-by-row arithmetic (such as multiplying price by volume per transaction row), use an **Iterator Function**:
\`\`\`dax
// SUMX iterates over the table row-by-row with an active Row Context:
Total Extended Sales = 
SUMX(
  fact_sales,
  fact_sales[units_sold] * fact_sales[unit_price] * (1 - COALESCE(fact_sales[discount_rate], 0))
)
\`\`\`

#### Performance Warning: Avoid Iterating Large Fact Tables Unnecessarily!
Do not iterate a 50-million-row fact table with complex nested \`SUMX\` functions. Pre-calculate line totals in SQL during data ingestion whenever possible, reserving DAX iterators for dimension tables and aggregated summary sets.

#### Guided Exercise & Deliverable
* **Task**: Refactor 5 legacy corporate DAX measures: replace duplicate formula calculations with \`VAR\` caches, implement a safe \`SUMX\` revenue iterator, and format using official DAX formatting standards.
* **Output**: Production DAX repository demonstrating clean variable structure and verified formula execution speedup.`,
    quiz: {
      question: "What is the primary performance benefit of using DAX Variables (VAR / RETURN) in complex measures?",
      options: [
        "Variables allow measures to run without an active internet connection",
        "Variables evaluate an expression once, caching the result in memory, preventing the engine from recalculating the exact same formula multiple times within a measure",
        "Variables automatically convert DAX code into Python",
        "Variables eliminate the need for a Date dimension"
      ],
      correctIdx: 1,
      explanation: "Using VAR caches the calculation result in memory for that evaluation context. If that value is referenced multiple times (e.g. in an IF statement), it evaluates once rather than repeatedly."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-7-2-time-intelligence": {
    slug: "bi-7-2-time-intelligence",
    title: "7.2 Time Intelligence: YTD, Year-over-Year Growth & Rolling Windows",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Time Intelligence: YTD, Year-over-Year Growth & Rolling Windows

#### Executive Context
Corporate performance is evaluated over time: *Are sales growing compared to the same month last year? What is our Year-to-Date (YTD) trajectory against the annual budget? What is the 3-month rolling average trend?* Power BI's native **Time Intelligence Functions** calculate these complex temporal metrics effortlessly—provided the semantic model is built on top of a properly marked Date Dimension table.

#### Core Time Intelligence Patterns
\`\`\`dax
// 1. Year-to-Date Cumulative Revenue (Calendar Year)
Revenue YTD = 
TOTALYTD([Net Revenue], dim_date[Date])

// 2. Fiscal Year-to-Date (Fiscal Year starting July 1)
Revenue Fiscal YTD = 
TOTALYTD([Net Revenue], dim_date[Date], "06-30")

// 3. Same Period Last Year (SPLY)
Revenue SPLY = 
CALCULATE(
  [Net Revenue], 
  SAMEPERIODLASTYEAR(dim_date[Date])
)

// 4. Year-over-Year (YoY) Growth Dollar Variance
YoY Sales Growth $ = 
VAR CurrentSales = [Net Revenue]
VAR PriorSales   = [Revenue SPLY]
RETURN
IF(
  NOT ISBLANK(CurrentSales) && NOT ISBLANK(PriorSales),
  CurrentSales - PriorSales,
  BLANK()
)

// 5. Year-over-Year (YoY) Growth %
YoY Sales Growth % = 
DIVIDE([YoY Sales Growth $], [Revenue SPLY], BLANK())

// 6. 3-Month Rolling Average Revenue
Revenue 3M Rolling Avg = 
CALCULATE(
  AVERAGEX(VALUES(dim_date[YearMonth]), [Net Revenue]),
  DATESINPERIOD(dim_date[Date], MAX(dim_date[Date]), -3, MONTH)
)
\`\`\`

#### The "Future Dates" YTD Visual Trap
If your Date dimension extends to December 31, 2026, but actual sales data only exists through October 2026, standard YTD measures continue projecting flat lines through November and December on visual charts!
*Enterprise Fix*: Include an active sales date ceiling guard:
\`\`\`dax
Revenue YTD Clean = 
VAR MaxDataDate = MAX(fact_sales[order_date])
VAR CurrentDate = MAX(dim_date[Date])
RETURN
IF(CurrentDate <= MaxDataDate, TOTALYTD([Net Revenue], dim_date[Date]), BLANK())
\`\`\`

#### Guided Exercise & Deliverable
* **Dataset**: Retail Chain Sales & Cash-Balance Ledger.
* **Task**: Author a complete Time Intelligence suite: YTD, Fiscal YTD, SPLY, YoY Growth $, YoY Growth %, and a 30-day rolling daily revenue average.
* **Output**: Verified Time Intelligence test dashboard with active date ceiling guards and zero future date flatlining.`,
    quiz: {
      question: "Why must DAX Time Intelligence functions (like SAMEPERIODLASTYEAR or TOTALYTD) reference the date column in dim_date rather than the order_date column in the fact table?",
      options: [
        "Because fact table date columns are not supported by DAX",
        "Because Time Intelligence requires a contiguous, unbroken calendar sequence without missing days, which is guaranteed by dim_date but rarely true in transactional fact tables",
        "Because fact tables only contain numbers, not dates",
        "To make the dashboard look like a calendar"
      ],
      correctIdx: 1,
      explanation: "Transactional fact tables have missing dates (days with zero sales). Time intelligence algorithms require a continuous, unbroken date range provided by a dedicated Date dimension table."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-7-3-advanced-commercial-measures": {
    slug: "bi-7-3-advanced-commercial-measures",
    title: "7.3 Commercial Logic: Target Variance, PVM Decomposition & Semi-Additive Balances",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Commercial Logic: Target Variance, PVM Decomposition & Semi-Additive Balances

#### Executive Context
Executive analytics demands sophisticated commercial measures: tracking distributor target variances, identifying whether revenue growth was driven by volume expansion vs price increases (Price-Volume-Mix), and correctly handling **Semi-Additive Measures** (like bank cash balances and warehouse inventory levels) that cannot simply be summed over time.

#### Semi-Additive Measures: The Cash & Stock Balance Rule
If your warehouse has 10,000 units on Monday, 12,000 on Tuesday, and 9,000 on Wednesday, your total inventory for the week is **NOT** 31,000 units!
Inventory and bank balances are **Semi-Additive**: additive across dimensions like Product and Location, but **non-additive across Time**. Over time, you want the **Closing Balance** (the balance on the last recorded date):
\`\`\`dax
// Basic Closing Balance (assumes daily transactions exist)
Ending Inventory Balance (Basic) = 
CALCULATE(
  SUM(fact_inventory[units_on_hand]),
  LASTDATE(dim_date[Date])
)

// Production-Hardened Semi-Additive Pattern (handles weekends & inactive days)
Ending Cash Balance (Robust) = 
VAR LastVisibleDate = MAX(dim_calendar[date_key])
VAR LastActualTransactionDate = 
    CALCULATE(
        MAX(fact_bank_ledger[transaction_date]),
        dim_calendar[date_key] <= LastVisibleDate
    )
RETURN
CALCULATE(
    SUM(fact_bank_ledger[closing_balance_bdt]),
    dim_calendar[date_key] = LastActualTransactionDate
)

// Opening Balance (Balance at the start of period)
Opening Cash Balance = 
VAR FirstVisibleDate = MIN(dim_calendar[date_key])
VAR PriorTransactionDate = 
    CALCULATE(
        MAX(fact_bank_ledger[transaction_date]),
        dim_calendar[date_key] < FirstVisibleDate
    )
RETURN
CALCULATE(
    SUM(fact_bank_ledger[closing_balance_bdt]),
    dim_calendar[date_key] = PriorTransactionDate
)
\`\`\`

#### The Weighted Aggregate Margin Law: Never Average Percentages
A critical error made by junior analysts is writing \`AVERAGEX(dim_regions, [Operating Margin %])\` or averaging regional margin percentages.
* In North Zone: ৳ 163.5M Sales @ 14.2% Margin = ৳ 23.2M Margin.
* In Dhaka Metro: ৳ 116.2M Sales @ 34.9% Margin = ৳ 40.6M Margin.
* In Chittagong Port: ৳ 64.5M Sales @ 23.6% Margin = ৳ 15.2M Margin.
* In South/East Zone: ৳ 44.4M Sales @ 8.8% Margin = ৳ 3.9M Margin.
* Unweighted arithmetic mean: $(14.2 + 34.9 + 23.6 + 8.8) / 4 = 20.375\%$.
* **True Corporate Blended Margin**: Total Operating Margin (৳82.9M) / Total Sales (৳388.6M) = **21.33%**!
In DAX, always compute aggregate margins by dividing aggregate numerators by aggregate denominators:
\`\`\`dax
// Strict Weighted Business Margin
Operating Margin % = 
DIVIDE([Total Operating Margin BDT], [Total Gross Sales BDT], 0.00)
\`\`\`

#### Target Variance & Pacing Measures
\`\`\`dax
// Commercial Target Variance %
Sales Target Variance % = 
VAR Actuals = [Net Revenue]
VAR Targets = [Sales Budget Target]
RETURN
DIVIDE(Actuals - Targets, Targets, BLANK())

// Pacing Status Flag for Conditional Formatting
Target Pacing Status = 
VAR VariancePct = [Sales Target Variance %]
RETURN
SWITCH(
  TRUE(),
  VariancePct >= 0.05, "EXCEEDING_TARGET",
  VariancePct >= -0.05, "ON_TRACK",
  "CRITICAL_UNDERPERFORMANCE"
)
\`\`\`

#### Commercial Price-Volume-Mix (PVM) Logic in DAX
* **Price Effect**: $\\sum V_{1,i} \\times (P_{1,i} - P_{0,i})$.
* **Volume Effect**: $(Q_1 - Q_0) \\times \\bar{P}_0$.
* **Mix Effect**: $Q_1 \\sum (S_{1,i} - S_{0,i}) (P_{0,i} - \\bar{P}_0)$.

#### Guided Exercise & Deliverable
* **Task**: Construct semi-additive closing cash balances, commercial target variance measures, and a dynamic distributor ranking metric using \`RANKX\`.
* **Output**: Production commercial DAX suite supporting executive variance and distributor performance analysis.`,
    quiz: {
      question: "Why is a warehouse inventory balance or bank cash account considered a 'Semi-Additive' measure in enterprise dimensional modeling?",
      options: [
        "Because it can only be calculated using multiplication",
        "Because it can be summed across categories and locations, but cannot be summed across dates (weekly inventory is the ending balance on the last day, not the sum of daily balances)",
        "Because bank accounts are exempt from accounting audits",
        "Because it requires a Power Automate license to compute"
      ],
      correctIdx: 1,
      explanation: "Balances are snapshots in time. Summing daily bank balances or stock levels across a month produces an absurd, inflated number. The metric must evaluate as the closing balance on the last active date."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-7-4-dax-performance-context-audit": {
    slug: "bi-7-4-dax-performance-context-audit",
    title: "7.4 DAX Performance Profiling, DAX Studio & 2-Hour Practical Exam",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### DAX Performance Profiling, DAX Studio & 2-Hour Practical Exam

#### Executive Context
A dashboard that takes 15 seconds to load every time an executive clicks a slicer will be abandoned by corporate leadership. High-speed performance is a functional requirement. An enterprise BI analyst profiles query execution speed using **Power BI Performance Analyzer** and **DAX Studio**, optimizing formulas to run in under 500 milliseconds across multi-million-row models.

#### The Performance Triad in Power BI
Every visual query time breaks down into 3 components:
1. **DAX Query Time (Formula Engine & Storage Engine)**:
   - *Storage Engine (SE)*: VertiPaq multi-threaded columnar scan. Extremely fast (milliseconds).
   - *Formula Engine (FE)*: Single-threaded, complex logic processor. Slow!
   - *Goal*: Keep 85%+ of query processing inside the Storage Engine!
2. **Visual Display Time**: Rendering visual elements (bars, cards, tables) on screen.
3. **Other (Queue Wait Time)**: Waiting for background threads to become available.

\`\`\`
PERFORMANCE ANALYZER DIAGNOSTIC:
Visual: Executive Margin Matrix
├── DAX Query:     142 ms  (VertiPaq Storage Engine: 128ms | Formula Engine: 14ms) ✓ OPTIMAL
├── Visual Display: 68 ms
└── Other / Wait:   18 ms
Total Duration:    228 ms  (Under 500ms Enterprise SLA Threshold!)
\`\`\`

#### Major Practical Assessment 3: 2-Hour Advanced DAX Practical
* **Format**: Timed, proctored-standard practical examination on a retail sales & cash balance ledger.
* **Tasks**:
  1. Author 10 complex commercial measures under hidden visual filter contexts.
  2. Implement SPLY, YoY growth %, and rolling 3-month averages with date ceiling guards.
  3. Formulate semi-additive ending inventory balances.
  4. Optimize query execution time to under 500ms verified via Performance Analyzer.
* **Passing Standard**: 75% accuracy across automated filter context tests.`,
    quiz: {
      question: "When profiling a slow visual in DAX Studio, what is the significance of the ratio between Storage Engine (SE) and Formula Engine (FE) time?",
      options: [
        "It tells you the battery percentage of the computer",
        "The VertiPaq Storage Engine is multi-threaded and ultra-fast, while the Formula Engine is single-threaded; high Formula Engine time indicates inefficient DAX that forces complex row-by-row processing",
        "The Formula Engine is always faster than the Storage Engine",
        "It indicates how many people have viewed the report online"
      ],
      correctIdx: 1,
      explanation: "VertiPaq Storage Engine queries are executed in parallel across CPU cores with high efficiency. High Formula Engine time reveals complex or poorly written DAX that forces single-threaded evaluations."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 08 — Dashboard UX & Visual Ergonomics
  // ═══════════════════════════════════════════════════════════════

  "bi-8-1-cognitive-visual-hierarchy": {
    slug: "bi-8-1-cognitive-visual-hierarchy",
    title: "8.1 Cognitive Visual Hierarchy, Color Restraint & Executive Layouts",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Cognitive Visual Hierarchy, Color Restraint & Executive Layouts

#### Executive Context
Executive dashboards exist to accelerate human decision-making under high cognitive load. A dashboard cluttered with 15 neon colors, 3D pie charts, rainbow gauges, and unformatted numbers creates cognitive friction, leading executives to misinterpret metrics or revert to paper spreadsheets. Professional BI design adheres to **Cognitive Visual Hierarchy**, **Color Restraint**, and the **Gestalt Principles of Visual Perception**.

#### The Golden Rules of Executive Dashboard Ergonomics
1. **The F-Pattern / Z-Pattern Reading Flow**:
   - The human eye scans digital dashboards from top-left to bottom-right.
   - **Top Row**: High-level Executive KPI Headline Cards (Net Revenue, Gross Margin %, Target Variance).
   - **Middle Row**: Major Trends and Primary Dimensions (Monthly Sales Trend, Regional Contribution).
   - **Bottom Row**: Granular Diagnostic Detail and Ranked Tables (Distributor Leaderboard, Product Mix).
2. **Strict Color Restraint (The 90/10 Rule)**:
   - 90% of your dashboard should be composed of muted neutrals (soft greys, charcoal, white, slate).
   - Reserve bold accent colors **strictly** for meaningful data signals:
     - Emerald Green: Positive variance exceeding target (> +5%).
     - Crimson Red: Critical negative variance requiring operational intervention (< -5%).
     - Corporate Navy / Indigo: Selected category or primary trend line.
   - *Anti-Pattern*: Assigning a different random color to every single bar in a 12-bar regional chart!

\`\`\`
EXECUTIVE VISUAL HIERARCHY (THE F-PATTERN):
┌────────────────────────────────────────────────────────────────────────┐
│ TOP ROW: KPI HEADLINE CARDS                                            │
│ [ Net Revenue: $14.8M ]  [ Margin %: 28.4% ]  [ Target Var: -4.2% (▼) ]│
├────────────────────────────────────────────────────────────────────────┤
│ MIDDLE ROW: PRIMARY MACRO TRENDS & REGIONAL DRIVERS                    │
│ [ 12-Month Net Revenue vs SPLY Trend Line ]  [ Regional Margin Bar ]   │
├────────────────────────────────────────────────────────────────────────┤
│ BOTTOM ROW: DIAGNOSTIC DETAIL & DISTRIBUTOR LEADERBOARD                │
│ [ Ranked Distributor Performance Table with Inline Data Bars ]         │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

#### Avoiding Chart Junk
* **Banish 3D Charts**: 3D perspective distorts visual bar heights and distorts area comparisons.
* **Banish Unformatted Decimals**: Showing \`$14,829,104.2819\` on an executive KPI card is visual noise. Format as \`$14.8M\`.
* **Zero Decorative Clutter**: Every pixel on the screen must serve a specific analytical purpose.

#### Guided Exercise & Deliverable
* **Task**: Design an executive single-page commercial overview dashboard in Power BI Desktop adhering to the F-pattern hierarchy, utilizing muted neutral themes with semantic red/green alert indicators.
* **Output**: Executive dashboard layout wireframe with documented visual hierarchy justification.`,
    quiz: {
      question: "According to executive visual ergonomics and cognitive load theory, how should color be utilized on a commercial Power BI dashboard?",
      options: [
        "Every category should be assigned a distinct bright neon color to keep users entertained",
        "Use muted neutral tones across 90% of the canvas, reserving bold colors strictly as meaningful semantic signals (such as red for target deficits and green for surplus)",
        "Dashboards should always have a solid black background with yellow text",
        "Color should be completely prohibited on all corporate charts"
      ],
      correctIdx: 1,
      explanation: "Using color as an intentional data signal (semantic alerts) directs executive attention immediately to areas requiring intervention, whereas rainbow charts create visual clutter."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-8-2-operational-diagnostic-dashboards": {
    slug: "bi-8-2-operational-diagnostic-dashboards",
    title: "8.2 Operational vs Diagnostic Dashboards, Drill-Through & Tooltips",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Operational vs Diagnostic Dashboards, Drill-Through & Tooltips

#### Executive Context
A single dashboard page cannot satisfy both the CEO and the frontline inventory warehouse manager. Executive reporting requires high-level synthesis; operational reporting requires granular tracking; diagnostic reporting bridges the gap, allowing users to investigate *why* a specific metric breached thresholds. Power BI provides powerful diagnostic mechanisms: **Drill-Down**, **Cross-Report Drill-Through**, and **Custom Report Page Tooltips**.

#### The Three Tiers of Enterprise Reporting
1. **Tier 1: Strategic / Executive Cockpit**:
   - Monthly or quarterly cadence; focused on macro KPIs, target variances, and EBITDA drivers.
2. **Tier 2: Operational Monitoring Dashboard**:
   - Daily or real-time cadence; tracks frontline operations (orders waiting to ship, open credit holds, stock-out alerts).
3. **Tier 3: Diagnostic Drill-Through Workspace**:
   - Accessed on-demand when an executive right-clicks a regional underperformer on Tier 1 and selects **Drill-through -> Territory Deep-Dive**.

\`\`\`
DIAGNOSTIC DRILL-THROUGH WORKFLOW:
[ Executive Cockpit: Regional Overview ]
        │
        │ Right-click on "Chittagong Zone" (-18% Margin Drop)
        ▼ Click: Drill-through ──►
[ Diagnostic Territory Page: Chittagong Deep-Dive ]
  • Filter Context automatically passed: [ Region = 'Chittagong' ]
  • Displays: Distributor Discount Breakdown, SKU Margin Erosion, Demurrage Fees
\`\`\`

#### Interactive Report Page Tooltips
Instead of default rectangular text tooltips, Power BI allows you to design miniature custom report pages (e.g., 320px by 240px) that appear when hovering over data points:
* Hovering over a distributor's bar instantly renders an inline 6-month historical margin trend and top 3 purchased SKUs!
* Keeps the primary canvas clean while providing instant micro-context.

#### Guided Exercise & Deliverable
* **Task**: Build a 2-page diagnostic reporting architecture: Page 1 (National Commercial Cockpit) and Page 2 (Distributor Diagnostic Deep-Dive). Configure drill-through filters passing customer keys and construct an interactive mini-trend tooltip page.
* **Output**: Verified interactive Power BI workbook (.pbix) with functioning drill-through and custom tooltip interactions.`,
    quiz: {
      question: "In Power BI Desktop, what is the primary benefit of configuring a 'Drill-Through' page rather than cramming granular distributor transaction tables onto the main executive overview page?",
      options: [
        "Drill-through pages delete the database after viewing",
        "It preserves executive cognitive clarity on the primary overview while providing instant, targeted root-cause investigation on-demand when users right-click a specific anomaly",
        "Drill-through eliminates the need for DAX measures",
        "Drill-through only works when printed on paper"
      ],
      correctIdx: 1,
      explanation: "Drill-through maintains a clean executive overview free from visual clutter while giving users the power to inspect underlying operational drivers for any specific data point on demand."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-8-3-interactive-reporting-navigation": {
    slug: "bi-8-3-interactive-reporting-navigation",
    title: "8.3 Interactive Navigation, Bookmarks, Slicers & Dynamic Card Titles",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Interactive Navigation, Bookmarks, Slicers & Dynamic Card Titles

#### Executive Context
Enterprise decision-makers expect a seamless, web-application-like user experience inside their BI reports. Navigating between pages should feel intuitive, slicers should not consume 40% of the visual real estate, and visual titles should dynamically update to reflect the user's active selections (e.g., *"Monthly Revenue Analysis — Chittagong Zone (Q3-2026)"*). Analysts achieve this using **Bookmarks**, **Selection Panes**, and **DAX-Driven Dynamic Title Strings**.

#### Bookmarks & The Selection Pane
Bookmarks capture the exact state of a report page, including visual visibility, filter context, and spotlight focus:
1. **Collapsible Slicer Drawer (Clean Canvas Pattern)**:
   - Group all slicers inside a floating overlay container.
   - Use two bookmarks: \`OpenSlicers\` (shows container) and \`CloseSlicers\` (hides container).
   - Connect bookmarks to button icons (Filter icon / Close X icon). This reclaims 100% of canvas space for data visuals!
2. **View Toggles (Chart vs Table View)**:
   - Allow users to toggle between an executive trend chart and an audited tabular matrix using a 2-state bookmark button.

#### Dynamic DAX Titles: Eliminating Slicer Ambiguity
Never leave static titles like *"Regional Sales"*. When an executive exports a PDF to present to the board, a static title conceals which filters were active!
\`\`\`dax
// Dynamic Title DAX Measure:
Dynamic Title Regional Performance = 
VAR SelectedRegion = SELECTEDVALUE(dim_regions[region_name], "All National Territories")
VAR SelectedYear   = SELECTEDVALUE(dim_date[Year], "Multi-Year")
RETURN
"Commercial Net Revenue & Margin Performance — " & SelectedRegion & " (" & SelectedYear & ")"
\`\`\`
*Power BI Setup*: Select the visual -> **Format Visual** -> **General** -> **Title** -> click the **fx** conditional formatting button -> bind to \`[Dynamic Title Regional Performance]\`.

#### Guided Exercise & Deliverable
* **Task**: Construct an interactive executive report interface featuring a collapsible slicer drawer, page navigation buttons, chart/table view toggles via bookmarks, and DAX-driven dynamic visual titles.
* **Output**: Polished, application-grade Power BI dashboard (.pbix) with responsive navigation controls.`,
    quiz: {
      question: "Why should an enterprise BI developer bind visual chart titles to dynamic DAX measures (using the Title fx button) instead of typing static text titles?",
      options: [
        "Because static titles crash Power BI Desktop",
        "Because dynamic titles explicitly communicate active slicer filter selections directly in the heading, preventing misinterpretation when reports are exported or printed to PDF",
        "To translate titles into 100 languages automatically",
        "To increase the download speed of the Power BI file"
      ],
      correctIdx: 1,
      explanation: "Dynamic titles update automatically to reflect active slicer selections (e.g. displaying 'Sales — Sylhet Zone (2026)'), eliminating ambiguity when executives review exported slides or PDFs."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-8-4-dashboard-critique-redesign": {
    slug: "bi-8-4-dashboard-critique-redesign",
    title: "8.4 Dashboard Heuristic Critique & The Flawed Report Redesign Gym",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Dashboard Heuristic Critique & The Flawed Report Redesign Gym

#### Executive Context
Evaluating a dashboard requires rigorous heuristic auditing. Many corporate dashboards look dazzling at first glance with glowing gradients and animated gauges, yet fail completely upon inspection: dual Y-axes distorting scale, unformatted percentages, misleading truncated bar baselines, and missing baseline context. An enterprise analyst conducts structured **Heuristic Redesign Audits** to transform broken legacy dashboards into decision-grade instruments.

#### The 10-Point Dashboard Heuristic Audit Checklist
1. **[ ] Baseline Integrity**: Do bar charts strictly start at zero? (Truncating the baseline distorts proportional variance).
2. **[ ] Dual-Axis Elimination**: Are two conflicting metrics (like $ Revenue and % Margin) plotted on dual Y-axes? Dual axes lead to dangerous misinterpretations; use small multiples instead!
3. **[ ] Color Semantics**: Are colors restricted to data signals rather than decorative palettes?
4. **[ ] Number Formatting**: Are all metrics formatted with appropriate units ($M, $K, %) and decimal precision?
5. **[ ] Slicer Restraint**: Are slicers overwhelming the canvas? Reclaim space via collapsible drawers.
6. **[ ] Visual Form Matching**: Does the visual shape match the analytical question? (Trend = Line chart; Ranking = Horizontal Bar; Part-to-Whole = 100% Stacked Bar).
7. **[ ] Title Precision**: Do titles communicate the metric, unit, and scope?
8. **[ ] Margin Alignment & Spacing**: Is white space balanced with consistent 8px/16px padding?
9. **[ ] Accessibility & Contrast**: Does text meet WCAG AA contrast standards (minimum 4.5:1 ratio)?
10. **[ ] Actionability**: Does the visual answer a specific commercial question that enables management action?

\`\`\`
FLAWED LEGACY REPORT vs REDESIGNED COCKPIT:
FLAWED (ANTIPATTERN):                  REDESIGNED (ENTERPRISE STANDARD):
• 8 Neon Rainbow Colors                • Muted Neutral Slate Palette with Semantic Red/Green
• 3D Pie Chart with 14 Slices          • Clean Horizontal Bar Chart Ranked Descending
• Dual Y-Axis Distorting Trend         • Small Multiples (Revenue Bar + Margin Trend Line)
• Unformatted Decimals ($14,291,048)   • Executive Formatted ($14.3M)
• Zero Diagnostic Drill-Through        • Integrated Contextual Drill-Through & Mini-Tooltips
\`\`\`

#### Major Deliverable: Weekly Problem Set 8 Redesign Challenge
* **Task**: Audit a deliberately flawed corporate commercial dashboard containing 8 distinct design and mathematical errors. Document each defect, quantify its operational risk, and build a redesigned executive cockpit in Power BI Desktop.
* **Output**: Comprehensive Before/After Dashboard Critique Deck and completed .pbix redesign workbook.`,
    quiz: {
      question: "Why are dual-axis charts (combining Revenue on the left Y-axis and Margin % on the right Y-axis on the same visual) strongly discouraged in enterprise reporting?",
      options: [
        "Because dual-axis charts use double the computer memory",
        "Because the visual scales can be manipulated or misinterpreted, creating false visual correlations and misleading executives into believing trends cross or align when they do not",
        "Because Power BI does not support lines and bars on the same chart",
        "Because dual-axis charts are prohibited by the United Nations"
      ],
      correctIdx: 1,
      explanation: "Dual Y-axes distort relative scale and create visual illusions of correlation where none exist. Separating metrics into small multiples or paired charts provides clear, unambiguous comparison."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 09 — Executive Storytelling & Management Memos
  // ═══════════════════════════════════════════════════════════════

  "bi-9-1-analytical-story-structure": {
    slug: "bi-9-1-analytical-story-structure",
    title: "9.1 Analytical Storytelling, SCQA Framework & The Pyramid Principle",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Analytical Storytelling, SCQA Framework & The Pyramid Principle

#### Executive Context
Data without synthesis is overhead. The ultimate deliverable of an enterprise BI analyst is not a Power BI report file; it is the **Strategic Business Decision** resulting from the analysis. Executives do not have time to browse through 10 dashboard tabs to figure out what is wrong. Analysts must synthesize analytical findings using Barbara Minto's **Pyramid Principle** and the **SCQA Framework** (Situation, Complication, Question, Answer).

#### The SCQA Analytical Narrative Structure
1. **Situation (The Accepted Context)**:
   - Establish the baseline business status that all stakeholders agree upon.
   - *Example*: *"Apex Consumer Goods expanded distribution across all 4 regional zones in Q3, achieving 6% gross volume growth."*
2. **Complication (The Urgent Problem)**:
   - The unexpected catalyst or crisis disrupting business performance.
   - *Example*: *"Despite volume expansion, operating margin collapsed by 18% ($1.4M EBITDA shortfall), driven by unbudgeted trade discounts in North Zone."*
3. **Question (The Core Analytical Challenge)**:
   - The strategic question executive leadership must resolve.
   - *Example*: *"How can Apex restructure distributor trade terms to restore margins without sacrificing distribution footprint?"*
4. **Answer (The Data-Backed Recommendation)**:
   - The evidence-backed executive recommendation stated immediately up front!
   - *Example*: *"Cap North Zone promotional allowances at 8%, eliminate freight absorption on Tier-3 accounts, and tie rebates to payment timeliness, recovering $1.1M annually."*

\`\`\`
THE MINTO PYRAMID APPLIED TO BUSINESS INTELLIGENCE:
                    ┌────────────────────────────────────────────────────────┐
                    │ TOP OF PYRAMID: EXECUTIVE RECOMMENDATION               │
                    │ "Restructure trade spend to recover $1.1M in EBITDA"   │
                    └────────────────────────────────────────────────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────────┐
│ PILLAR 1: MARGIN EVIDENCE    │ │ PILLAR 2: ROOT CAUSE         │ │ PILLAR 3: IMPLEMENTATION     │
│ North Zone discounts at 18.4%│ │ 6 distributors gaming rebates│ │ 3-step phased rollout roadmap│
│ vs national 9.5% benchmark   │ │ without volume compliance    │ │ with 30-day monitoring KPIs  │
└──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
\`\`\`

#### Executive Communication Axiom
**Lead with the Answer**. In academic writing, you build up evidence and reveal your conclusion at the end. In corporate executive communication, you state the recommendation in the very first sentence, followed by the supporting evidence.

#### Guided Exercise & Deliverable
* **Task**: Structure an analytical findings brief for Apex Consumer Goods using the SCQA framework and Minto Pyramid hierarchy based on Q3 margin deterioration data.
* **Output**: Executive 1-page briefing outline ready for board-level presentation.`,
    quiz: {
      question: "According to the Minto Pyramid Principle of executive communication, where should an analyst place their core business recommendation in an analytical memo?",
      options: [
        "In a hidden appendix at the very end of a 50-page technical manual",
        "At the very top of the memo (the first sentence), immediately stating the answer before providing structured supporting evidence",
        "Only in an oral conversation without written documentation",
        "In the middle of the SQL query code block"
      ],
      correctIdx: 1,
      explanation: "Executives require top-down communication: leading with the core recommendation immediately respects executive time, allowing stakeholders to review supporting pillars in context."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-9-2-variance-decomposition-reasoning": {
    slug: "bi-9-2-variance-decomposition-reasoning",
    title: "9.2 Commercial Variance Decomposition & Price-Volume-Mix Analysis",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Commercial Variance Decomposition & Price-Volume-Mix Analysis

#### Executive Context
When quarterly performance deviates from budget, managers offer anecdotal excuses: *"The market was soft," "Competitors discounted heavily," "Supply chain delayed deliveries."* A senior BI analyst replaces subjective speculation with mathematical rigor using **Price-Volume-Mix (PVM) Variance Decomposition**. PVM analysis mathematically isolates exactly how much of a revenue variance was driven by price changes, volume shifts, or product mix tilts.

#### The Three Mathematical Variance Drivers
Corporate FP&A and top-tier management consulting standards require an **exact, zero-residual variance reconciliation**:
$$\\Delta \\text{Revenue} = \\text{Price Effect} + \\text{Volume Effect} + \\text{Mix Effect}$$

Let $V_{0,i}, P_{0,i}$ be Baseline (Budget / Prior Period) unit volume and net realized price for SKU $i$.
Let $V_{1,i}, P_{1,i}$ be Actual unit volume and net realized price for SKU $i$.
* Total Volume: $Q_0 = \\sum_i V_{0,i}$, and $Q_1 = \\sum_i V_{1,i}$.
* Portfolio Average Baseline Price: $\\bar{P}_0 = \\frac{\\sum_i V_{0,i} P_{0,i}}{Q_0}$.
* Volume Mix Share: $S_{0,i} = \\frac{V_{0,i}}{Q_0}$, and $S_{1,i} = \\frac{V_{1,i}}{Q_1}$.

##### 1. Price Effect (Realized Price / Discount Impact)
$$\\text{Price Effect} = \\sum_i V_{1,i} \\times (P_{1,i} - P_{0,i})$$
Evaluates the price movement on actual units sold. In commercial FMCG, unbudgeted trade discounts or freight absorption directly diminish realized price per unit, generating a negative price effect.

##### 2. Volume Effect (Portfolio Scale / Market Growth)
$$\\text{Volume Effect} = (Q_1 - Q_0) \\times \\bar{P}_0$$
Measures overall category expansion or contraction evaluated at the weighted-average baseline portfolio price $\\bar{P}_0$, holding product mix proportions constant.

##### 3. Mix Effect (Portfolio Tilting / Cannibalization)
$$\\text{Mix Effect} = Q_1 \\times \\sum_i (S_{1,i} - S_{0,i}) \\times (P_{0,i} - \\bar{P}_0)$$
Isolates the shift in customer basket composition. If sales shift from high-margin premium SKUs ($P_{0,i} > \\bar{P}_0$) toward low-margin economy SKUs ($P_{0,i} < \\bar{P}_0$), the mix effect is strictly negative.

##### Mathematical Proof of Zero-Residual Reconciliation:
Notice that:
$$\\text{Volume Effect} + \\text{Mix Effect} = \\sum_i (V_{1,i} - V_{0,i}) \\times P_{0,i}$$
Therefore:
$$\\text{Price Effect} + \\text{Volume Effect} + \\text{Mix Effect} = \\sum_i V_{1,i} P_{1,i} - \\sum_i V_{0,i} P_{0,i} = \\text{Actual Revenue} - \\text{Budget Revenue}$$
**The bridge reconciles with exactly 0.00 unexplained residual error!**

##### Note on 4-Way Decomposition (Cross-Product Interaction):
In academic discrete economics, an alternative 4-way decomposition uses baseline volume for price ($\\sum V_{0,i} \\Delta P_i$) and isolates a **Cross-Product Interaction Term** ($\\sum \\Delta V_i \\Delta P_i$). In executive corporate reporting, the 3-Way Reconciled Bridge is universally preferred by C-suite executives because it assigns actual realized pricing directly to the commercial team without leaving an ambiguous "interaction" bucket on the boardroom slide.

\`\`\`
WATERFALL VARIANCE BRIDGE (BDT MILLIONS):
Budgeted Net Revenue:    ৳ 410.0M ──┐
(+) Volume Effect:       +৳ 18.5M  │
(-) Price / Discount:    -৳ 32.4M  ├──► Actual Net Revenue: ৳ 388.6M (-৳ 21.4M Deficit!)
(-) Mix Shift Deficit:   -৳  7.5M  │
Actual Net Revenue:      ৳ 388.6M ──┘
\`\`\`

#### Production DAX Measure Pattern for PVM:
\`\`\`dax
// 1. Price Effect
Price Effect = 
SUMX(
    dim_products,
    [Actual Volume] * ([Actual Realized Price] - [Budget Realized Price])
)

// 2. Volume Effect (Category Scale)
Volume Effect = 
VAR TotalActualUnits = CALCULATE([Actual Volume], REMOVEFILTERS(dim_products))
VAR TotalBudgetUnits = CALCULATE([Budget Volume], REMOVEFILTERS(dim_products))
VAR BudgetPortfolioAvgPrice = 
    DIVIDE(
        CALCULATE([Budget Revenue], REMOVEFILTERS(dim_products)),
        TotalBudgetUnits,
        0
    )
RETURN
(TotalActualUnits - TotalBudgetUnits) * BudgetPortfolioAvgPrice

// 3. Mix Effect (Basket Tilt)
Mix Effect = 
VAR TotalActualUnits = CALCULATE([Actual Volume], REMOVEFILTERS(dim_products))
VAR TotalBudgetUnits = CALCULATE([Budget Volume], REMOVEFILTERS(dim_products))
VAR BudgetPortfolioAvgPrice = 
    DIVIDE(
        CALCULATE([Budget Revenue], REMOVEFILTERS(dim_products)),
        TotalBudgetUnits,
        0
    )
RETURN
SUMX(
    dim_products,
    TotalActualUnits * 
    (
        DIVIDE([Actual Volume], TotalActualUnits, 0) - 
        DIVIDE([Budget Volume], TotalBudgetUnits, 0)
    ) * ([Budget Realized Price] - BudgetPortfolioAvgPrice)
)
\`\`\`

#### Interpreting the Commercial Signal
* If Volume is **Positive** (+6%) but Price/Discount is **Severely Negative** (-18%), sales teams are "buying volume" by handing out unauthorized trade discounts to hit commission volume quotas at the expense of corporate profitability.
* If Volume is **Flat** but Mix is **Positive** (+12%), premiumization strategies are successfully lifting margins without requiring factory expansion.

#### Guided Exercise & Deliverable
* **Task**: Calculate the mathematical Price, Volume, and Mix effects for Apex Consumer Goods across 4 regional zones, isolating the exact dollar impact of promotional discounts in North Zone.
* **Output**: Excel / Power BI PVM Waterfall Bridge Decomposition with documented commercial variance commentary.`,
    quiz: {
      question: "In commercial Price-Volume-Mix (PVM) variance analysis, what does a 'Negative Mix Effect' signify?",
      options: [
        "That the database query failed to execute",
        "That overall customer purchasing shifted toward lower-margin or lower-priced products within the portfolio, diluting profitability even if total unit volume remained steady",
        "That selling prices increased across all products",
        "That currency exchange rates remained completely frozen"
      ],
      correctIdx: 1,
      explanation: "A negative mix effect indicates product basket cannibalization: customers or distributors purchased a higher proportion of low-margin goods, pulling down average profitability."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-9-3-management-memos-briefings": {
    slug: "bi-9-3-management-memos-briefings",
    title: "9.3 Authoring Boardroom Briefings & 2-Page Executive Management Memos",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Authoring Boardroom Briefings & 2-Page Executive Management Memos

#### Executive Context
Corporate board members and Chief Executive Officers do not interact with raw BI files. They consume executive intelligence through **2-Page Management Memos** and boardroom briefings. A management memo translates dashboard analytics into structured, persuasive business recommendations accompanied by risk mitigations, operational timelines, and monitoring KPIs.

#### The Anatomy of a 2-Page Executive Management Memo
* **Page 1: Executive Summary & Root Cause Synthesis**:
  1. *Executive Headline & Recommendation*: Single synthesized statement of action.
  2. *Performance Context Table*: 4 core metrics comparing Actuals vs Budget vs Prior Year.
  3. *Primary Analytical Findings*: 3 bulleted insights backed by specific data points.
  4. *Visual Artifact*: Single clean waterfall variance chart or regional margin bridge.
* **Page 2: Strategic Action Plan & Risk Matrix**:
  5. *Three Actionable Recommendations*: Concrete operational changes (e.g., renegotiate terms with top 6 distributors).
  6. *Expected Financial Impact*: Quantified EBITDA recovery timeline.
  7. *Risk & Mitigation Matrix*: Identifying trade-offs (e.g., risk of competitor volume poaching).
  8. *30-60-90 Day Implementation Roadmap*: Responsible owners and milestone deadlines.

\`\`\`
EXECUTIVE MANAGEMENT MEMO STRUCTURE:
┌────────────────────────────────────────────────────────────────────────┐
│ MEMORANDUM                                                             │
│ TO: Executive Committee & Chief Executive Officer                      │
│ FROM: Senior Corporate BI & Commercial Strategy Team                   │
│ DATE: October 9, 2026                                                  │
│ SUBJECT: Q3 Margin Deterioration Root-Cause Analysis & Action Plan     │
├────────────────────────────────────────────────────────────────────────┤
│ 1. EXECUTIVE RECOMMENDATION (Lead with the Action)                     │
│ 2. COMMERCIAL PERFORMANCE DASHBOARD SYNTHESIS                          │
│ 3. ROOT CAUSE VARIANCE DECOMPOSITION (PVM Breakdown)                   │
│ 4. THREE RECOMMENDED STRATEGIC INTERVENTIONS                           │
│ 5. RISK, UNCERTAINTY & MITIGATION MATRIX                               │
│ 6. 90-DAY ROLLOUT ROADMAP & MONITORING CONTROLS                        │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

#### Rules for Executive Writing Hygiene
* **Ban Jargon**: Never write "the DAX filter context removed the table join." Write "regional analysis excludes cancelled orders."
* **Every Claim Needs a Number**: Never write "discounts were high." Write "North Zone discounts reached 18.4% of gross sales ($820K above budget)."
* **Actionable Recommendations**: Recommendations must have an operational verb: *Cap, Eliminate, Restructure, Audit, Reallocate*.

#### Guided Exercise & Deliverable
* **Major Assessment 4 Deliverable**: Produce a formal 2-page Executive Briefing Memo interpreting the commercial performance dashboard of Apex Consumer Goods Ltd.
* **Evaluation Rubric**: Executive Clarity (25%), Mathematical Precision (25%), Variance Decomposition (25%), and Actionable Business Recommendations (25%).`,
    quiz: {
      question: "Which of the following statements represents the highest standard of executive writing in a corporate management memo?",
      options: [
        "Discounts were really high in some regions and we think managers should look into it when they have time.",
        "North Zone trade discounts averaged 18.4% of gross sales ($820K above budget), driven by 6 distributors; capping allowances at 8% will recover $1.1M in EBITDA with zero volume loss.",
        "The SQL query joined the fact table with the distributor table and emitted a table showing lower profit.",
        "Our Power BI dashboard has a really nice color theme that everyone in finance liked."
      ],
      correctIdx: 1,
      explanation: "Statement B exemplifies executive rigor: it provides quantified data, identifies specific root causes, states an operational intervention, and projects a defensible financial return."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-9-4-dashboard-to-decision": {
    slug: "bi-9-4-dashboard-to-decision",
    title: "9.4 From Dashboard to Decision: The Live Commercial Boardroom Simulation",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### From Dashboard to Decision: The Live Commercial Boardroom Simulation

#### Executive Context
An analyst's career trajectory is determined by how they perform when the Chief Financial Officer interrupts their presentation with a tough objection: *"Your model claims we are losing money on Distributor Apex-East, but their sales volume is up 25%. Why should I cut their discount and risk losing them to our competitor?"* An analyst must defend their model live, explain underlying assumptions, and navigate commercial trade-offs.

#### The 5 Classic Boardroom Executive Objections
1. **The Volume Bias Objection**:
   - *"Volume is growing, so we must be winning market share!"*
   - *Defense*: Demonstrate that volume growth at negative marginal contribution erodes working capital. Every additional box sold destroys $1.20 of enterprise value.
2. **The Data Integrity Challenge**:
   - *"Did your numbers include the Q3 freight rebate credit memo issued last Tuesday?"*
   - *Defense*: Explain the exact data pipeline cutoff timestamp, query validation reconciliation against bank deposits, and margin of error.
3. **The Competitor Risk Objection**:
   - *"If we eliminate discounts, won't our distributors switch to Unilever or Nestlé?"*
   - *Defense*: Show distributor dependence data: Apex products represent 65% of the distributor's revenue; switching carries higher switching costs for them than for Apex.
4. **The Causation vs Correlation Pushback**:
   - *"How do you know the discount caused the margin drop rather than raw material inflation?"*
   - *Defense*: Present the PVM waterfall bridge proving that unit cost inflation accounted for only $120K, whereas promotional discounts accounted for $820K.

\`\`\`
EXECUTIVE DEFENSE MATRIX:
Executive Objection ──► Deconstruct Premise ──► Reference Validated Metric ──► Reiterate Net Impact
\`\`\`

#### Guided Exercise & Deliverable
* **Task**: Participate in the live Boardroom Simulation for Apex Consumer Goods. Receive a pre-built commercial dashboard, identify the 3 operational drivers of margin collapse under pressure, and defend recommendations against executive objections.
* **Output**: Recorded 7-minute boardroom oral defense presentation and completed executive Q&A transcript.`,
    quiz: {
      question: "When an executive board member challenges an analyst by asserting that 'Sales volume grew 25%, so we must be performing well,' how should the analyst respond using commercial BI reasoning?",
      options: [
        "Apologize and immediately change the numbers on the dashboard",
        "Demonstrate via Price-Volume-Mix analysis that volume growth was subsidized by excessive trade discounts and freight absorption, resulting in negative marginal profit per box sold",
        "Argue that volume is an irrelevant metric that nobody should track",
        "Refer the executive to the PostgreSQL database administrator"
      ],
      correctIdx: 1,
      explanation: "A commercial analyst uses PVM decomposition to demonstrate that volume growth acquired through unprofitable discounts destroys enterprise value if marginal cost exceeds realized net price."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 10 — Governance, Security & Performance Tuning
  // ═══════════════════════════════════════════════════════════════

  "bi-10-1-powerbi-service-workspaces": {
    slug: "bi-10-1-powerbi-service-workspaces",
    title: "10.1 Power BI Service Architecture, Workspaces & Enterprise Deployment",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Power BI Service Architecture, Workspaces & Enterprise Deployment

#### Executive Context
Building a report in Power BI Desktop is only the authoring phase. In enterprise corporate environments, reports are published, secured, and consumed through the cloud-hosted **Power BI Service** (app.powerbi.com). An enterprise BI architect manages **App Workspaces**, separates the **Semantic Model Layer** from the **Visual Report Layer**, and configures deployment pipelines across Development, Test, and Production environments.

#### The Golden Architecture: Decoupling Datasets from Reports
* **The Amateur Antipattern**: Publishing 10 separate \`.pbix\` files, each containing its own duplicated data model and refresh schedule. This causes database overload, bloated storage, and inconsistent metric calculations!
* **The Enterprise Hub-and-Spoke Pattern**:
  1. Author a single **Core Semantic Model** workbook (\`Apex_Commercial_Model.pbix\`) containing the verified Star Schema, relationships, and certified DAX measures.
  2. Publish the Semantic Model to a dedicated Corporate Workspace.
  3. Author multiple thin, visual-only reporting workbooks connecting via **Power BI Live Connection** to the published semantic model!

\`\`\`
HUB-AND-SPOKE SEMANTIC MODEL DEPLOYMENT:
          ┌──────────────────────────────────────────────┐
          │ CERTIFIED CORPORATE SEMANTIC MODEL (Postgres)│
          │ • Star Schema · VertiPaq Engine · DAX Measures│
          └──────────────────────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼ (Live Connection)      ▼ (Live Connection)      ▼ (Live Connection)
┌───────────────────────┐┌───────────────────────┐┌───────────────────────┐
│ Executive Cockpit     ││ Regional Sales Portal ││ Supply Chain Audit   │
│ (Thin Visual Report)  ││ (Thin Visual Report)  ││ (Thin Visual Report)  │
└───────────────────────┘└───────────────────────┘└───────────────────────┘
\`\`\`

#### Workspace Access Roles in Power BI Service
* **Admin**: Complete control; can add/remove members and delete the workspace.
* **Member**: Can publish, edit, and share content; can manage deployment pipelines.
* **Contributor**: Can publish and edit reports; cannot modify workspace permissions.
* **Viewer**: Read-only access; can interact with visuals and view reports (ideal for end-user business stakeholders).

#### Guided Exercise & Deliverable
* **Task**: Structure an enterprise workspace deployment architecture separating the Core Semantic Model from departmental reports, defining role assignments across Admin, Member, Contributor, and Viewer tiers.
* **Output**: Power BI Service Governance Blueprint and Deployment Pipeline Specification.`,
    quiz: {
      question: "Why should an enterprise BI team separate the Core Semantic Model from visual reports using Power BI Live Connections instead of embedding a data model in every single .pbix file?",
      options: [
        "To allow reports to open without electricity",
        "To enforce a Single Source of Truth, eliminate redundant data refreshes, reduce storage costs, and allow multiple thin report files to share certified, governed DAX measures",
        "Because Microsoft Power BI only allows one .pbix file per company",
        "To convert the data model into a Word document"
      ],
      correctIdx: 1,
      explanation: "Decoupling the semantic model ensures that all departmental reports query identical, certified DAX measures while preventing multiple redundant datasets from hammering the database during refresh."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-10-2-row-level-security": {
    slug: "bi-10-2-row-level-security",
    title: "10.2 Row-Level Security (RLS): Static vs Dynamic Organizational Roles",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Row-Level Security (RLS): Static vs Dynamic Organizational Roles

#### Executive Context
In enterprise corporate reporting, data access must adhere to the **Principle of Least Privilege**. The Regional Sales Manager for Chittagong should only see Chittagong transactions; they must never see Dhaka data. However, maintaining 20 separate regional copies of a dashboard is an administrative nightmare. **Row-Level Security (RLS)** restricts data access at the row level within a single unified report based on the user's corporate identity.

#### Static RLS vs Dynamic RLS
1. **Static RLS (Low Maintenance / Few Roles)**:
   - Hardcoded rules created in Power BI Desktop under **Manage Roles**:
     \`\`\`dax
     // Role: Chittagong_Regional_Manager
     [region_name] = "Chittagong"
     \`\`\`
   - Users are manually assigned to roles in the Power BI Service security settings.
   - *Limitation*: Unmanageable when supporting hundreds of branch managers or retail distributors.
2. **Dynamic RLS (Enterprise Standard)**:
   - Uses the user's corporate login identity (\`USERPRINCIPALNAME()\`) to filter rows dynamically through a security entitlement table:
     \`\`\`dax
     // Dynamic RLS Expression on Security Mapping Table:
     [user_email] = USERPRINCIPALNAME()
     \`\`\`

\`\`\`
DYNAMIC ROW-LEVEL SECURITY DATA FLOW:
Logged-in User: farhana@apex.com (Regional Manager, Chittagong)
                 │
                 ▼ Captured via USERPRINCIPALNAME()
[ sec_user_permissions ] ──► Filters: [ region_key = 3 ] (Chittagong)
                 │
                 ▼ Filter propagates across 1:N relationship to Fact
[ fact_sales_transactions ] ──► Filtered to Chittagong rows ONLY!
                 │
                 ▼ Dashboard Canvas:
Farhana sees Chittagong metrics exclusively; Dhaka and Sylhet data is completely invisible!
\`\`\`

#### Validating RLS in Power BI Desktop
Before publishing, always test roles in Power BI Desktop:
* Ribbon -> **Modeling** -> **View as**.
* Select **Other user** -> Enter a test employee email (e.g., \`farhana@apex.com\`).
* The canvas immediately updates, displaying the exact filtered view that employee will experience.

#### Guided Exercise & Deliverable
* **Dataset**: Regional Branch-Banking Security Matrix.
* **Task**: Build an auditable Dynamic RLS architecture connecting a user entitlement table to the sales model, implement the \`USERPRINCIPALNAME()\` filter, and test views across 4 regional manager profiles.
* **Output**: Verified Power BI RLS security workbook with documented entitlement matrix.`,
    quiz: {
      question: "In Dynamic Row-Level Security (RLS), what is the function of USERPRINCIPALNAME()?",
      options: [
        "It changes the name of the Power BI workspace",
        "It dynamically retrieves the corporate email address or identity claim of the logged-in user viewing the report, enabling the model to filter rows based on a security entitlement table",
        "It creates a new user account in Microsoft Windows",
        "It resets the user's password automatically"
      ],
      correctIdx: 1,
      explanation: "USERPRINCIPALNAME() returns the authenticated email address of the active user. Comparing this to an entitlement mapping table restricts fact table rows to authorized records dynamically."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-10-3-refresh-gateways-access": {
    slug: "bi-10-3-refresh-gateways-access",
    title: "10.3 Scheduled Refresh, On-Premises Data Gateways & Network Firewalls",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Scheduled Refresh, On-Premises Data Gateways & Network Firewalls

#### Executive Context
A dashboard is only as good as its data currency. If the PostgreSQL database is hosted on an internal corporate datacenter behind an enterprise corporate firewall, how does the cloud-hosted Power BI Service securely reach into the corporate network to refresh data every morning? An enterprise BI engineer deploys and manages the **On-Premises Data Gateway**, configures outbound firewall ports, and establishes reliable scheduled refresh cadences.

#### How the On-Premises Data Gateway Traverses Firewalls
The Gateway acts as a secure reverse-proxy bridge between cloud Power BI Service and internal databases:
1. Power BI Service triggers a scheduled refresh job at 06:00 AM.
2. The Service encrypts the query and posts it to Azure Service Bus.
3. The on-premises Gateway client (installed inside the corporate network) opens an **outbound HTTPS connection (Port 443)** to Azure Service Bus to poll for pending jobs.
4. The Gateway receives the query, executes it locally against PostgreSQL over the internal LAN, encrypts the extracted dataset, and streams it back to Power BI Service.
*Key Security Advantage*: **Zero inbound firewall ports need to be opened!** All network communication is outbound over TLS 1.3.

\`\`\`
ON-PREMISES DATA GATEWAY ARCHITECTURE:
[ Power BI Service (Cloud) ] 
            │
            ▼ (Outbound HTTPS Poll on Port 443)
┌──────────────────────────────────────────────┐
│ CORPORATE FIREWALL BOUNDARY                  │
│                                              │
│  [ On-Premises Data Gateway Server ]         │
│             │                                │
│             ▼ (Internal LAN Connection)      │
│  [ PostgreSQL Operational Enterprise DB ]    │
└──────────────────────────────────────────────┘
\`\`\`

#### Standard Gateway vs Personal Gateway
* **Standard Gateway (Enterprise Standard)**:
  - Supports multiple concurrent users, shared data sources, scheduled refresh, and DirectQuery.
  - Installed on a dedicated, always-on corporate server.
* **Personal Gateway (Prohibited in Prod)**:
  - Runs under an individual user's login session on a personal laptop. If the laptop is shut or asleep, refreshes fail.

#### Troubleshooting Refresh Failures
* **Credential Expiry**: Database service account password expired.
* **Network Timeout**: Query exceeded the standard 2-hour dataset refresh limit. Push filtering upstream into SQL views!
* **Transient Connectivity Loss**: Gateway server restarted during execution.

#### Guided Exercise & Deliverable
* **Task**: Design an enterprise scheduled refresh runbook: configure connection strings, document Gateway server specifications, establish outbound firewall requirements, and define an automated email alert escalation flow for failed refresh jobs.
* **Output**: Production Data Refresh Runbook and Gateway Operational Manual.`,
    quiz: {
      question: "Why does the Microsoft On-Premises Data Gateway use outbound HTTPS connections (Port 443) rather than requiring corporate IT to open inbound firewall ports?",
      options: [
        "Because inbound ports are only available on Apple computers",
        "To maintain enterprise security posture: opening inbound firewall ports exposes the internal datacenter to outside internet attacks, whereas outbound polling over Port 443 is secure and standard",
        "Because outbound connections do not use any bandwidth",
        "Because Power BI Service cannot read IP addresses"
      ],
      correctIdx: 1,
      explanation: "Opening inbound firewall ports creates massive cybersecurity vulnerabilities. The Gateway polls out to Azure over standard outbound HTTPS (Port 443), preserving complete network perimeter security."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-10-4-performance-model-audit": {
    slug: "bi-10-4-performance-model-audit",
    title: "10.4 Model Size Auditing, Column Cardinality & Memory Optimization",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Model Size Auditing, Column Cardinality & Memory Optimization

#### Executive Context
In Power BI's columnar in-memory VertiPaq engine, **memory size is governed by column cardinality, not row count!** A table with 10 million rows and 3 low-cardinality columns (e.g., Status, Region, Year) compresses down to just 15 MB in memory. Conversely, adding a single high-cardinality column (like an unrounded millisecond timestamp or unique GUID) can explode model size to 3 GB! An enterprise BI specialist audits dictionary encoding using VertiPaq Analyzer to keep models lean and fast.

#### The VertiPaq Columnar Compression Engine
VertiPaq achieves 10x to 20x data compression through 3 sequential techniques:
1. **Value Encoding**: Subtracts a base minimum from numeric columns to store smaller integers.
2. **Hash / Dictionary Encoding**:
   - Replaces unique values with integer dictionary IDs.
   - If a column has 5 distinct values (e.g., regions), the dictionary is tiny (3 bits per row).
   - If a column has 5 million unique strings, the dictionary table is enormous!
3. **Run-Length Encoding (RLE)**: Compresses repeated consecutive values into count pairs.

\`\`\`
VERTIPAQ COMPRESSION IMPACT:
Column Type:                  Distinct Values (Cardinality):    Memory Footprint:
---------------------------------------------------------------------------------
[ Order_Status ]              4 Distinct Values                 0.8 MB  (Ultra-Compact!)
[ Order_Date ] (Date only)    1,095 Distinct Values             4.2 MB  (Compact)
[ Order_Timestamp ] (ms)      8,420,100 Distinct Values         890.0 MB (MODEL KILLER!)
\`\`\`

#### The Top 4 Model Optimization Best Practices
1. **Remove Unused Columns**: If a column is not used in a relationship, slicer, or visual, **delete it from the model**!
2. **Split Date and Time**: Never load combined \`DateTime\` columns. Split into a pure \`Date\` column (linking to \`dim_date\`) and a separate \`Time\` or Hour-of-Day integer column.
3. **Strip High-Cardinality GUIDs & Text Keys**: Primary keys in the fact table (like raw GUID transaction hashes) should be purged after deduplication.
4. **Use Whole Numbers**: Decimals with 6 decimal places have massive cardinality. Round or cast to fixed currency (\`Int64.Type\` or 2 decimal places).

#### Guided Exercise & Deliverable
* **Problem Set 10 Deliverable**: Perform a full VertiPaq performance audit on a bloated 1.8 GB Power BI model using DAX Studio / VertiPaq Analyzer.
* **Requirements**:
  - Identify the top 3 memory-hogging columns.
  - Split DateTime columns and remove unused foreign keys.
  - Reduce total model size by at least 65% while maintaining 100% calculation accuracy.
* **Output**: Model Memory Optimization Audit Report with documented before/after memory footprints.`,
    quiz: {
      question: "In Power BI's VertiPaq in-memory engine, which factor has the single largest impact on the memory size of a column?",
      options: [
        "The font used to display the numbers",
        "The column's cardinality (the number of unique, distinct values in the column)",
        "The color of the table icon in the model view",
        "Whether the computer has a wireless mouse"
      ],
      correctIdx: 1,
      explanation: "VertiPaq builds in-memory dictionaries for each column. High cardinality (millions of unique values, such as timestamps with seconds) prevents compression and inflates memory usage."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 11 — Applied AI Workflows in Enterprise BI
  // ═══════════════════════════════════════════════════════════════

  "bi-11-1-ai-assisted-sql": {
    slug: "bi-11-1-ai-assisted-sql",
    title: "11.1 AI-Assisted SQL Authoring, Query Explanation & Prompt Engineering",
    xpReward: 85,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### AI-Assisted SQL Authoring, Query Explanation & Prompt Engineering

#### Executive Context
Generative AI tools (ChatGPT, Claude, Microsoft Copilot) are transformative accelerators for data analysts. An analyst can draft complex SQL queries, generate test fixtures, and translate legacy stored procedures in seconds. However, LLMs are probabilistic text engines—they do not have a live database connection, do not know your table indexes, and frequently hallucinate columns that sound plausible but do not exist. Professional analysts use AI as a **Junior Drafting Assistant**, never as an unverified authority.

#### The Schema-Grounding Prompt Pattern
Never prompt an LLM with vague text like: *"Write a SQL query to find our best customers."*
Always ground the model in explicit schema DDL, declared grains, and expected output types:
\`\`\`
PROMPT ENGINEERING TEMPLATE FOR SQL:
You are an expert PostgreSQL analytics engineer.
Here is the exact schema DDL:
CREATE TABLE orders (order_id INT, customer_id INT, order_date DATE, amount NUMERIC(12,2), status VARCHAR(20));
CREATE TABLE customers (customer_id INT, customer_name VARCHAR(100), region VARCHAR(50));

BUSINESS QUESTION:
Calculate the Month-over-Month growth in Net Revenue per Region for completed orders in 2026.

STRICT CONSTRAINTS:
1. Use a CTE pipeline with clean naming.
2. Filter out non-completed orders in the WHERE clause.
3. Use the LAG() window function partitioned by region.
4. Handle divide-by-zero using NULLIF().
5. Output columns: region, order_month, net_revenue, prior_month_revenue, mom_growth_pct.
\`\`\`

#### Using AI to Explain & Optimize Legacy Queries
Paste complex, unformatted legacy queries into an LLM with the prompt:
> *"Deconstruct this SQL query into sequential business steps. Identify any potential Cartesian joins, unindexed full table scans, or divide-by-zero risks."*
This provides instant documentation and exposes potential calculation traps.

#### Guided Exercise & Deliverable
* **Task**: Use an AI assistant to draft a 3-table join query calculating distributor trade spend pacing. Perform an independent audit against the actual database schema, identify 2 hallucinated column names, and produce the corrected, validated query.
* **Output**: Documented AI Prompt, Raw Model Output, Verification Audit Log, and Corrected Executable SQL Script.`,
    quiz: {
      question: "Why must an analyst independently audit and validate SQL code generated by an AI assistant before running it against a corporate database?",
      options: [
        "Because AI code is legally copyrighted by the AI company",
        "Because LLMs are probabilistic models prone to hallucinating non-existent column names, writing Cartesian joins, and misinterpreting subtle business definitions",
        "Because databases reject all code written by an AI",
        "Because AI cannot write SELECT statements"
      ],
      correctIdx: 1,
      explanation: "LLMs frequently invent plausible-sounding column names, misunderstand aggregation grains, or generate Cartesian joins. Human verification against real schemas is mandatory."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-11-2-ai-assisted-dax-pq": {
    slug: "bi-11-2-ai-assisted-dax-pq",
    title: "11.2 AI-Assisted DAX, Power Query M & Pattern Translation",
    xpReward: 90,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### AI-Assisted DAX, Power Query M & Pattern Translation

#### Executive Context
Authoring complex DAX formulas and custom Power Query M functions can be intimidating. Generative AI excels at translating human business rules into DAX syntax (e.g., *"Write a measure for rolling 90-day margin excluding discontinued products"*). However, because DAX is deeply reliant on the underlying model's **invisible Star Schema relationships and active Filter Context**, AI-generated DAX is notorious for generating formulas that compile cleanly but produce completely wrong numbers!

#### Common AI DAX Hallucinations & Errors
1. **The Context Transition Hallucination**:
   - The AI writes a measure that uses \`EARLIER()\`. In modern DAX, \`EARLIER()\` is largely obsolete; clean code uses variables (\`VAR\`).
2. **Missing Date Table Binding**:
   - The AI writes \`SAMEPERIODLASTYEAR(sales[order_date])\` instead of referencing the dedicated, marked \`dim_date[Date]\` column, causing the measure to fail on weekends.
3. **Invented Functions**:
   - The AI hallucinates non-existent DAX functions (e.g., \`AVERAGEIF\`—which exists in Excel, but does NOT exist in DAX!). In DAX, conditional averages require \`CALCULATE(AVERAGE(...), ...)\` or \`AVERAGEX\`.

#### Effective Pattern: Using AI to Generate M Code for Unpivoting
AI is exceptionally reliable at drafting Power Query M transformation snippets for repetitive data cleaning:
\`\`\`fsharp
// AI Prompt: "Write an M formula to clean messy phone numbers by stripping all non-digit characters"
Text.Select([RawPhone], {"0".."9"})
\`\`\`

#### Guided Exercise & Deliverable
* **Task**: Prompt an AI assistant to generate a Price-Volume-Mix DAX measure. Audit the generated formula against your Star Schema, verify whether filter context was modified correctly, and correct any context transition defects.
* **Output**: Verified DAX measure script with documented AI error remediation notes.`,
    quiz: {
      question: "Which common error does an AI assistant frequently generate when asked to calculate conditional averages in DAX?",
      options: [
        "It tries to execute the code in Microsoft PowerPoint",
        "It hallucinates the Excel function AVERAGEIF(), which does not exist in the DAX language, where conditional averages require CALCULATE(AVERAGE(...)) or AVERAGEX",
        "It refuses to calculate numbers higher than 100",
        "It converts the measure into an image file"
      ],
      correctIdx: 1,
      explanation: "LLMs often confuse Excel formulas with DAX. Functions like AVERAGEIF, SUMIF, and VLOOKUP exist in Excel but are non-existent in DAX, requiring proper CALCULATE or iterator patterns."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-11-3-auditing-ai-analytics": {
    slug: "bi-11-3-auditing-ai-analytics",
    title: "11.3 Auditing AI Analytics: Filter Context Traps & Grain Hallucinations",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Auditing AI Analytics: Filter Context Traps & Grain Hallucinations

#### Executive Context
In high-stakes corporate finance and commercial operations, "the AI wrote it" is not an acceptable legal or professional defense when financial reports contain material errors. An enterprise analyst must act as a **Forensic Auditor of AI Outputs**. You must know how to construct automated validation tests that stress-test AI-authored SQL and DAX formulas against edge-cases, null values, and complex visual filter contexts.

#### The 5-Step AI Output Audit Protocol
1. **Schema Integrity Check**:
   - Do all referenced tables and columns exist in the active data dictionary?
   - Are data types respected (e.g., did the AI attempt string concatenation on a numeric currency column)?
2. **Grain Compatibility Test**:
   - Did the AI join tables at different grains without aggregation, causing Cartesian multiplication?
3. **Filter Context Stress-Test (DAX)**:
   - Place the AI measure in a matrix with Category, Brand, and Date.
   - Assert: Does the total row sum correctly? Does slicing by an unrelated dimension produce blank rows or unconstrained duplicates?
4. **Independent Benchmark Reconciliation**:
   - Calculate the expected result manually or via an independent SQL script on a known sample of 100 records.
   - Assert: Does the AI measure match the mathematical ground truth down to the exact cent?
5. **Security & Data Privacy Audit**:
   - Ensure zero proprietary customer PII or raw confidential numbers were leaked in the prompt.

\`\`\`
AI ANALYTICAL AUDITING WORKFLOW:
[ Business Question ] ──► [ Prompt AI Assistant ] ──► [ AI Generates SQL / DAX ]
                                                              │
                                                              ▼
                                               [ 5-STEP FORENSIC AUDIT GATE ]
                                                 • Schema Verification
                                                 • Grain Multiplicity Check
                                                 • Filter Context Stress-Test
                                                 • Independent Ground Truth Check
                                                              │
                                              ┌───────────────┴───────────────┐
                                          (Passed)                        (Failed)
                                              ▼                               ▼
                                     [ Deploy to Prod ]             [ Refactor & Remediate ]
\`\`\`

#### Guided Exercise & Deliverable
* **Problem Set 11 Deliverable**: Audit an AI-generated commercial analytics package containing 3 subtle mathematical defects (a missing \`NULLIF\`, an incorrect relationship traversal, and an invalid \`ALL\` filter removal).
* **Requirements**:
  - Document the root cause of all 3 defects.
  - Formulate test cases exposing the calculation errors.
  - Provide the corrected, production-ready implementation.
* **Output**: Forensic AI Audit Report and remediated SQL/DAX code repository.`,
    quiz: {
      question: "What is the primary responsibility of a corporate BI analyst when utilizing AI-generated DAX or SQL in enterprise production environments?",
      options: [
        "To copy and paste the AI code directly without reading it to maximize typing speed",
        "To serve as a rigorous forensic auditor: independently stress-testing the code against schema definitions, edge-case filter contexts, and mathematical control totals before deployment",
        "To delete all existing documentation and replace it with AI prompts",
        "To disable all database security firewalls"
      ],
      correctIdx: 1,
      explanation: "Analysts are legally and professionally accountable for report accuracy. Rigorous auditing and independent verification of AI code against ground truth benchmarks is mandatory."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-11-4-secure-reproducible-ai": {
    slug: "bi-11-4-secure-reproducible-ai",
    title: "11.4 Corporate Privacy, Data Governance & Secure AI Adoption",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Corporate Privacy, Data Governance & Secure AI Adoption

#### Executive Context
Pasting raw corporate spreadsheets containing real customer names, bank account numbers, employee salaries, or confidential trade margins into public, consumer-tier AI chatbots (like free ChatGPT) is an egregious violation of enterprise security policies, GDPR, and corporate confidentiality agreements. Public LLM providers may use unshielded prompt inputs to train future models, potentially leaking trade secrets to competitors. Professional analysts use **Sanitized Prompting**, **Enterprise Tier Agreements**, and **Reproducible AI Workflows**.

#### The Golden Rules of Corporate AI Privacy
1. **Never Expose Confidential Raw Data**:
   - Provide the AI with **metadata and schema structure only** (table names, column names, data types, and synthetic dummy samples), NEVER live customer data!
   - *Safe Prompt*: \`Table orders: customer_id (INT), order_total (NUMERIC). Example row: (101, 450.00)\`.
   - *Prohibited Prompt*: Pasting an export containing real customer transaction records.
2. **Enterprise AI Tenancy**:
   - Use enterprise-tier subscriptions (e.g., Azure OpenAI, Microsoft Copilot for M365) where contractual agreements guarantee that inputs are **NOT** stored, retained, or used for model training.
3. **Reproducibility & Audit Logging**:
   - Document the prompts used, model versions, and verification steps in the project repository.
   - Future auditors must be able to verify that automated changes followed governed procedures.

\`\`\`
SAFE PROMPTING ARCHITECTURE:
[ Confidential Production Database ] 
                │
                ▼ (Extract Metadata & Scrub All PII)
[ Sanitized Schema Skeleton: Column Names & Synthetic Types ONLY ]
                │
                ▼ (Sent to LLM)
[ AI Assistant Generates Code ] 
                │
                ▼ (Audited by Human Engineer)
[ Code Executed Safely on Internal Private Database ]
\`\`\`

#### Guided Exercise & Deliverable
* **Task**: Author an Enterprise AI Governance Standard Operating Procedure (SOP) for an analytics team, detailing data scrubbing protocols, allowed enterprise AI endpoints, and prompt logging templates.
* **Output**: Signed Corporate AI Governance SOP document and prompt scrubbing checklist.`,
    quiz: {
      question: "Why is pasting raw corporate sales or customer data into public consumer AI chatbots prohibited by enterprise IT security policies?",
      options: [
        "Because public chatbots will run out of memory",
        "Because public consumer models may store prompt inputs and use confidential corporate data for model training, exposing trade secrets and violating privacy regulations like GDPR",
        "Because AI chatbots can only process computer code, not numbers",
        "Because databases automatically disconnect when an AI is opened"
      ],
      correctIdx: 1,
      explanation: "Public consumer AI tools can ingest user prompts into future training datasets. Pasting confidential company numbers or customer PII violates corporate compliance, NDA contracts, and privacy laws."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 12 — Enterprise Capstone Execution & Defense
  // ═══════════════════════════════════════════════════════════════

  "bi-12-1-capstone-discovery-planning": {
    slug: "bi-12-1-capstone-discovery-planning",
    title: "12.1 Apex Consumer Goods Capstone: Commercial Brief & Discovery",
    xpReward: 95,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Apex Consumer Goods Capstone: Commercial Brief & Discovery

#### Executive Context
You are stepping into the role of Lead Enterprise BI Analyst at **Apex Consumer Goods Ltd.**, a major multinational fast-moving consumer goods (FMCG) enterprise operating across four major regional commercial zones. Executive leadership has declared a commercial crisis: over the last two quarters, gross sales volume increased by 6%, yet operating EBITDA profit collapsed by 18% ($1.4M shortfall).

The Chief Executive Officer suspects that trade promotion discounts, distributor penalties, and product mix shifts are destroying company profitability. Your mission is to investigate the root causes across 4.8 million transaction rows, construct an enterprise BI semantic model, and present actionable recommendations to the Board of Directors.

#### The Apex Consumer Goods Data Architecture
The practice database (\`apex_fmcg_db\`) contains 6 core tables:
* \`fmcg_orders_header\` (~1.4M rows): Order ID, Distributor ID, Order Date, Ship Date, Order Status, Payment Channel.
* \`fmcg_orders_detail\` (~4.8M rows): Line Item ID, Order ID, Product ID, Units Sold, Base Price, Trade Discount, Distributor Penalty, Unit Cost.
* \`dim_products\` (~1,200 rows): Product Key, SKU, Product Name, Brand, Category, Pack Size.
* \`dim_distributors\` (~450 rows): Distributor Key, Business Name, Territory, Credit Tier, Rating.
* \`dim_regions\` (4 rows): Region Key, Region Name (North, South, East, West), Regional Director.
* \`dim_monthly_targets\` (~192 rows): Monthly Target Key, Region Key, Target Month, Target Revenue, Target Gross Margin.

\`\`\`
CAPSTONE BUSINESS TRANSFORMATION PIPELINE:
[ 4.8M Raw FMCG Transaction Records ] 
                 │
                 ▼ (Stage 1: SQL Extraction & Grain Validation)
[ vw_fmcg_sales_detail & Clean Analytical Views ] 
                 │
                 ▼ (Stage 2: Power Query Ingestion & Fiscal Date Calendar)
[ Star Schema Semantic Model with Surrogate Keys ] 
                 │
                 ▼ (Stage 3: Advanced DAX Measures & Time Intelligence)
[ 3-Tier Executive Power BI Decision System ] 
                 │
                 ▼ (Stage 4 & 5: Executive Briefing Memo & 7-Minute Boardroom Defense)
[ Strategic Boardroom Decision Recovering $1.1M EBITDA ]
\`\`\`

#### Documented Data Quality Traps in the Scenario
As in real corporate life, the dataset contains deliberate operational defects:
1. **Cancelled & Void Orders**: 4.2% of orders were cancelled but remain in transaction logs.
2. **Duplicate Operational Keys**: Re-transmitted EDI invoices with duplicate lines.
3. **Mismatched Target Grain**: Monthly targets are at the regional level, not daily SKU level.
4. **Missing SKU References**: Newly launched promotional SKUs missing from the product table.

#### Guided Exercise & Deliverable
* **Task**: Perform initial discovery on the Apex dataset, formulate the Metric Driver Tree, document the declared grains, and establish the 6-stage project implementation timeline.
* **Output**: Capstone Discovery Document and Technical Implementation Plan.`,
    quiz: {
      question: "In the Apex Consumer Goods enterprise simulation, what is the central commercial crisis that executive leadership has hired you to investigate?",
      options: [
        "The company went completely bankrupt and closed all offices",
        "Gross sales volume increased by 6%, yet operating EBITDA margin collapsed by 18% ($1.4M deficit), requiring root-cause investigation across pricing, discounts, and mix shifts",
        "The computer network was infected with a virus that deleted all files",
        "Distributors refused to sell products because of packaging colors"
      ],
      correctIdx: 1,
      explanation: "The central challenge is margin erosion amidst volume expansion: sales increased by 6% while profit fell by 18%, requiring forensic analysis of pricing, trade spend, and mix cannibalization."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-12-2-database-to-model-implementation": {
    slug: "bi-12-2-database-to-model-implementation",
    title: "12.2 Capstone Implementation: SQL Views, Power Query ETL & Star Schema",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Capstone Implementation: SQL Views, Power Query ETL & Star Schema

#### Executive Context
With discovery complete, you execute Stages 1 and 2 of the Apex Consumer Goods transformation: writing production-style SQL views in PostgreSQL to clean raw data upstream, ingesting data into Power BI via Power Query, and constructing an auditable Star Schema with verified 1:N cardinality.

#### Stage 1: Production SQL Extraction Pipeline
Author the central analytical view filtering out voided transactions and reconciling line totals:
\`\`\`sql
CREATE OR REPLACE VIEW vw_fmcg_orders_analytical AS
SELECT 
  d.line_item_id,
  h.order_id,
  h.distributor_id,
  h.order_date,
  h.ship_date,
  d.product_id,
  d.units_sold,
  d.base_price,
  COALESCE(d.trade_discount, 0) AS trade_discount,
  COALESCE(d.distributor_penalty, 0) AS distributor_penalty,
  d.unit_cost,
  (d.units_sold * d.base_price) AS gross_sales,
  (d.units_sold * d.base_price) - COALESCE(d.trade_discount, 0) AS net_revenue,
  (d.units_sold * d.unit_cost) AS cogs_total
FROM fmcg_orders_header h
JOIN fmcg_orders_detail d ON h.order_id = d.order_id
WHERE h.order_status = 'DELIVERED';
\`\`\`

#### Stage 2: Power Query Ingestion & Star Schema Construction
1. Connect Power BI Desktop to PostgreSQL via \`vw_fmcg_orders_analytical\`.
2. Generate the contiguous Fiscal Date Dimension covering all order and shipment dates.
3. Link dimension tables to the central fact table:
   - \`dim_products[product_id]\` 1:N \`fact_sales[product_id]\`
   - \`dim_distributors[distributor_id]\` 1:N \`fact_sales[distributor_id]\`
   - \`dim_date[Date]\` 1:N \`fact_sales[order_date]\` (Active)
   - \`dim_date[Date]\` 1:N \`fact_sales[ship_date]\` (Inactive: USERELATIONSHIP)
4. Integrate \`dim_monthly_targets\` as a secondary fact table linked cleanly to \`dim_regions\` and \`dim_date\` (Month grain).

#### Guided Exercise & Deliverable
* **Deliverable 1 & 2**: Completed SQL transformation scripts and Power BI Star Schema data model file (.pbix) with verified relationships and zero orphan records.`,
    quiz: {
      question: "Why should cancelled and voided orders be filtered out in the upstream PostgreSQL database view rather than inside visual canvas filters in Power BI?",
      options: [
        "Because Power BI visual filters cannot filter text",
        "Filtering upstream in the database view reduces memory footprint in Power BI, guarantees query folding, and prevents cancelled transactions from inadvertently leaking into downstream DAX calculations",
        "Because cancelled orders delete the database automatically",
        "To prevent users from opening the report on mobile phones"
      ],
      correctIdx: 1,
      explanation: "Filtering invalid records upstream enforces Roche's Maxim: it purges dirty data before it reaches the in-memory engine, keeping the model lean and preventing calculation errors."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-12-3-dax-dashboard-deliverables": {
    slug: "bi-12-3-dax-dashboard-deliverables",
    title: "12.3 Capstone Implementation: Core DAX Repository & 3-Tier Dashboard",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Capstone Implementation: Core DAX Repository & 3-Tier Dashboard

#### Executive Context
With the semantic model active, you author the core DAX analytical repository and construct the 3-tiered executive reporting system for Apex Consumer Goods Ltd. The dashboard must balance high-level synthesis with forensic diagnostic capability.

#### Stage 3: Core Analytical DAX Suite
Implement and document the complete measure suite:
* \`[Net Revenue]\`, \`[Gross Margin]\`, \`[Gross Margin %]\`.
* \`[Trade Spend %]\`: \`DIVIDE([Total Trade Discounts], [Gross Sales], 0)\`.
* \`[Target Variance %]\`: Revenue and margin variance against \`dim_monthly_targets\`.
* \`[YoY Sales Growth %]\`: Time intelligence comparing against SPLY.
* \`[Distributor Regional Rank]\`: Using \`RANKX\` partitioned by region.

#### Stage 4: The 3-Tiered Report Architecture
1. **Page 1: Executive Overview**:
   - Headline KPI cards with semantic variance indicators.
   - 12-Month Net Revenue vs SPLY trend bridge.
   - Regional Margin % variance breakdown exposing North Zone deterioration.
2. **Page 2: Commercial Diagnostics**:
   - Interactive waterfall bridge decomposing margin drop into Price, Volume, and Mix.
   - Distributor scatter plot: Sales Volume vs Trade Spend % (isolating discount abusers).
   - Brand category contribution matrix.
3. **Page 3: SKU & Route Optimization**:
   - Diagnostic table showing SKU-level profitability and freight absorption penalties.
   - Drill-through target for distributor deep-dives.

#### Guided Exercise & Deliverable
* **Deliverable 3, 4 & 5**: Documented DAX measure repository (.dax) and production-grade 3-page Power BI executive decision system (.pbix) with responsive navigation and bookmarks.`,
    quiz: {
      question: "In the 3-tiered dashboard architecture for Apex Consumer Goods, what is the specific role of Page 2 (Commercial Diagnostics)?",
      options: [
        "To display employee holiday schedules",
        "To provide forensic variance decomposition (Price-Volume-Mix, trade spend %, distributor scatter plots) explaining WHY the margin collapse observed on Page 1 occurred",
        "To play background music during board presentations",
        "To convert the dashboard into a flat spreadsheet"
      ],
      correctIdx: 1,
      explanation: "Page 2 serves as the diagnostic bridge: while Page 1 shows that margin collapsed, Page 2 isolates the exact drivers (discount abuse, mix cannibalization) responsible for the loss."
    },
    hasSimulator: "bi-powerbi-sql"
  },

  "bi-12-4-final-exam-boardroom-defense": {
    slug: "bi-12-4-final-exam-boardroom-defense",
    title: "12.4 Technical Examination, Boardroom Defense & Career Passport Attestation",
    xpReward: 150,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Technical Examination, Boardroom Defense & Career Passport Attestation

#### Executive Context
The culmination of your 12-week enterprise BI journey is the formal technical evaluation and boardroom defense. You submit your 2-Page Executive Management Memo, present your 7-minute recorded boardroom defense, and complete the final technical examination. Upon verification by the INSYT Certification Board, your accomplishments are cryptographically anchored to your public **Career Passport** under the **INSYT Certified Enterprise Business Intelligence Analyst (CEBI)** designation.

#### The 6 Evaluated Capstone Deliverables
1. **Deliverable 1 — Production SQL Pipeline**: Tested PostgreSQL scripts creating clean analytical views with grain validation.
2. **Deliverable 2 — Power Query ETL Project**: Parameterized M code with query folding verification.
3. **Deliverable 3 — Dimensional Star Schema**: 1:N single-direction model with dedicated Date dimension and monthly target integration.
4. **Deliverable 4 — Core DAX Measure Repository**: Documented explicit measures evaluated across hidden filter contexts.
5. **Deliverable 5 — 3-Tier Executive Power BI Dashboard**: Boardroom-ready report (.pbix) with cognitive hierarchy and diagnostic drill-through.
6. **Deliverable 6 — Executive Memo & Boardroom Defense**: 2-page briefing memo and 7-minute recorded video defense recommending 3 concrete operational actions.

\`\`\`
CAREER PASSPORT VERIFICATION PLANE:
┌────────────────────────────────────────────────────────────────────────┐
│ INSYT CAREER PASSPORT — ENTERPRISE BI CREDENTIAL SUMMARY               │
│                                                                        │
│ • Candidate: [Verified Corporate Scholar]                              │
│ • Credential: INSYT Certified Enterprise Business Intelligence Analyst │
│ • Total Hours: 120 Hours (48 Lessons + 12 Problem Sets + Capstone)     │
│                                                                        │
│ [Artifact 1: Production SQL Pipeline]         ──► VERIFIED (Score: 96) │
│ [Artifact 2: Star Schema Semantic Model]      ──► VERIFIED (Score: 94) │
│ [Artifact 3: Advanced DAX Measure Repository] ──► VERIFIED (Score: 98) │
│ [Artifact 4: Executive Decision Dashboard]    ──► VERIFIED (Score: 95) │
│ [Artifact 5: 2-Page Executive Briefing Memo]  ──► VERIFIED (Score: 92) │
│ [Artifact 6: Recorded Boardroom Defense]      ──► VERIFIED (Score: 96) │
│                                                                        │
│ STATUS: CEBI CREDENTIAL CONFERRED — CRYPTOGRAPHICALLY ATTESTED         │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

#### Final Technical Examination Structure
* **Duration**: 90 minutes.
* **Coverage**: Relational joins, SQL window functions, query folding rules, Star Schema cardinality, CALCULATE evaluation contexts, Time Intelligence prerequisites, and visual hierarchy principles.
* **Passing Standard**: 75% score for official credential issuance.`,
    quiz: {
      question: "What distinguishes the INSYT Enterprise Business Intelligence Certified Analyst credential from conventional multiple-choice IT certificates?",
      options: [
        "It can be completed in 5 minutes without opening a computer",
        "It is backed by 6 evaluated, authentic technical portfolio artifacts in the Career Passport, proving full-lifecycle competency from SQL extraction to executive boardroom defense",
        "It requires a monthly subscription fee to stay valid",
        "It is only available to employees of social media companies"
      ],
      correctIdx: 1,
      explanation: "The CEBI credential is an evidence-based professional qualification. Candidates prove end-to-end competency by executing a real multi-million-row corporate transformation and defending it before leaders."
    },
    hasSimulator: "bi-powerbi-sql"
  }
};
