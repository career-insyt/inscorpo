import { LessonDetail } from "./lessons";

export const CORPORATE_MODELING_LESSONS: Record<string, LessonDetail> = {
  // ═══════════════════════════════════════════════════════════════
  // PILLAR 1: SPREADSHEET HYGIENE & DATA PIPELINES
  // MODULE 1: ADVANCED EXCEL ARCHITECTURE & FAST MODELING
  // ═══════════════════════════════════════════════════════════════
  "fast-standards-interface": {
    slug: "fast-standards-interface",
    title: "1.1 FAST Modeling Standards, Interface Architecture & Keyboard Efficiency",
    xpReward: 50,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### FAST Modeling Standard & Interface Architecture

#### Executive Summary & Global Standards
Financial models in corporate enterprises, multinational corporations (Unilever, BAT), and top advisory firms must withstand rigorous audits. The **FAST Modeling Standard** provides an internationally recognized framework based on four core pillars:
* **F - Flexible**: The model must adapt readily to new time periods, business units, and structural assumptions without requiring formula rewrites.
* **A - Appropriate**: The model must reflect enterprise reality without unnecessary complexity. Over-engineering with brittle formulas creates hidden liability.
* **S - Structured**: Consistent workbook layouts with dedicated sheets for **Inputs (Assumptions)**, **Calculations (Schedules)**, and **Outputs (Financial Statements & Dashboards)**.
* **T - Transparent**: Formulas must be simple, auditable, and human-readable.

#### Institutional Color-Coding Standard
* **Blue Font (\`#0000FF\` or RGB: 0, 0, 255)**: Hardcoded historical inputs, unit prices, and scenario assumption parameters.
* **Black Font (\`#000000\` or RGB: 0, 0, 0)**: Calculations, intermediate aggregations, and dynamic formulas on the active sheet.
* **Green Font (\`#008000\` or RGB: 0, 128, 0)**: Cross-sheet links, external workbooks, and referenced output totals.
* **Soft Red Fill / Red Text (\`#DC2626\`)**: Error alert flags, balance check variances, and debt covenant breach warnings.

#### Zero-Mouse Keyboard Navigation Palette
1. \`Ctrl + 1\`: Open Format Cells dialog box.
2. \`Alt + H + O + I\`: Auto-fit column width across selected cells.
3. \`Ctrl + [\`: Trace direct precedents (jump to source assumption cell).
4. \`F5 + Enter\`: Return cursor to original position after precedent audit.
5. \`Alt + W + V + G\`: Toggle gridlines visibility (hide gridlines on executive dashboards).

#### Deliverable & Practice Dataset
* **Practice File**: \`M01_L1_RawNavigation_Exercise.xlsx\`
* **Practical Task**: Re-architect an unstructured corporate trial balance into a FAST-compliant three-tier workbook layout using keyboard shortcuts only.`,
    quiz: {
      question: "According to the FAST Modeling Standard and global financial modeling conventions, what text font color is strictly mandated for hardcoded input parameters and historical figures?",
      options: [
        "Black font (RGB 0,0,0)",
        "Blue font (RGB 0,0,255)",
        "Green font (RGB 0,128,0)",
        "Purple font (RGB 128,0,128)"
      ],
      correctIdx: 1,
      explanation: "Blue font (RGB 0,0,255) universally designates hardcoded input parameters and historical numbers, allowing auditors to immediately verify that calculations are not hardcoded."
    },
    hasSimulator: "corporate-modeling"
  },

  "formula-referencing-hygiene": {
    slug: "formula-referencing-hygiene",
    title: "1.2 Referencing Discipline, Dynamic Lookups & Error Handling (XLOOKUP)",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Formula Referencing Hygiene & Modern Lookup Systems

#### The 'One Formula Per Row' Rule
In time-series corporate financial models, a calculation row across forecast columns (e.g. Month 1 through Month 60) must contain **identical formula logic**. 
* Never alter formula syntax midway through a forecast timeline.
* If a contract term changes after Year 2, model the transition dynamically using an \`IF\` condition or date switch, not by manually modifying formulas in Column G onward.

#### Referencing Anatomy ($ Locking)
* \`$A$1\`: Fully Absolute (locked row and column) — used for global assumptions (Tax Rate, Inflation Index).
* \`A$1\`: Row Absolute (row locked, column relative) — used when copying formulas across monthly timeline headers.
* \`$A1\`: Column Absolute (column locked, row relative) — used for SKU and product category descriptors.

#### Modern Lookup Architecture: XLOOKUP vs Legacy Functions
\`\`\`excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
\`\`\`
* Eliminates the column-count risk of legacy \`VLOOKUP\` when columns are inserted into ERP extracts.
* Provides native \`[if_not_found]\` error handling, replacing performance-draining \`IFERROR(VLOOKUP(...), 0)\` wrappers.
* Executes two-way lookups seamlessly when nested: \`=XLOOKUP(Target_SKU, SKU_List, XLOOKUP(Target_Period, Period_Headers, Matrix_Values))\`.

#### Deliverable & Practice Dataset
* **Practice File**: \`M01_L2_DynamicLookups_Master.xlsx\`
* **Practical Task**: Replace all fragile VLOOKUP and hardcoded offset formulas in an operational cost schedule with robust XLOOKUP and two-way INDEX/MATCH lookups.`,
    quiz: {
      question: "Why does the FAST Modeling Standard strictly enforce the 'One Formula per Row' discipline across financial forecast timelines?",
      options: [
        "To save hard drive storage space when saving workbooks",
        "Because altering formulas midway across timeline columns creates hidden, undetectable calculation errors during financial audits",
        "Because Excel cannot compute more than one formula per worksheet",
        "To force compatibility with 32-bit Excel versions"
      ],
      correctIdx: 1,
      explanation: "Varying formulas midway across timeline columns destroys auditability and conceals silent mathematical errors. Modelers must use date-driven logical switches within a single row formula."
    },
    hasSimulator: "corporate-modeling"
  },

  "dynamic-arrays-modern-logic": {
    slug: "dynamic-arrays-modern-logic",
    title: "1.3 Dynamic Arrays, Modern Logic & Formula Optimization (FILTER, UNIQUE, SORT)",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Dynamic Arrays & Modern Logic in Financial Analytics

#### The Dynamic Array Calculation Paradigm
Modern Excel (Office 365) calculates arrays natively without \`Ctrl + Shift + Enter\` CSE array brackets. Formulas that evaluate lists automatically spill results into adjacent empty cells.
* **The #SPILL! Error**: Occurs when an obstruction (such as non-empty text, merged cells, or hidden rows) blocks the dynamic array spill path.
* **The Spilled Range Operator (\`#\`)**: Referencing \`A2#\` dynamically references the entire spilled array regardless of how many rows it expands to.

#### Core Dynamic Array Functions for Corporate FP&A
1. **FILTER**: Extract records matching multi-criteria conditions:
   \`\`\`excel
   =FILTER(Sales_Table, (Sales_Table[Region]="Dhaka") * (Sales_Table[Margin] > 0.25), "No Records Found")
   \`\`\`
   *(Note: \`*\` evaluates AND logic; \`+\` evaluates OR logic in array matrices).*
2. **UNIQUE**: Generate clean master lists of active distributor accounts or product lines:
   \`\`\`excel
   =SORT(UNIQUE(Ledger[Distributor_Name]))
   \`\`\`
3. **SWITCH**: Eliminate convoluted nested IF statements:
   \`\`\`excel
   =SWITCH(Scenario_ID, 1, Base_Driver, 2, Downside_Driver, 3, Upside_Driver, Base_Driver)
   \`\`\`

#### Deliverable & Practice Dataset
* **Practice File**: \`M01_L3_DynamicArrays_Data.xlsx\`
* **Practical Task**: Construct a self-updating SKU profitability dashboard that dynamically expands as new product lines are added to the transaction database.`,
    quiz: {
      question: "In Excel dynamic array formulas, how is multi-criteria AND boolean logic evaluated inside the FILTER function?",
      options: [
        "By separating criteria arrays with commas: =FILTER(data, crit1, crit2)",
        "By multiplying condition arrays using the asterisk (*) operator: (Range1 = Condition1) * (Range2 = Condition2)",
        "By wrapping them in an AND() function: =FILTER(data, AND(crit1, crit2))",
        "By concatenating strings with the ampersand (&) operator"
      ],
      correctIdx: 1,
      explanation: "Standard AND() functions reduce entire arrays down to a single TRUE/FALSE scalar value. Inside dynamic array formulas, criteria arrays must be multiplied element-wise using (*) to execute row-by-row boolean evaluation."
    },
    hasSimulator: "corporate-modeling"
  },

  "two-way-matrix-lookups": {
    slug: "two-way-matrix-lookups",
    title: "1.4 Resilient Two-Way Matrix Retrieval & Formula Error Trapping",
    xpReward: 45,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Two-Way Matrix Retrieval & Resilient Error Trapping

#### Advanced Matrix Indexing
Corporate reporting often requires pulling data from two-dimensional tables (e.g. Rows = Product Line, Columns = Fiscal Months).
* **INDEX / MATCH / MATCH Mechanics**:
  \`\`\`excel
  =INDEX(Data_Matrix, MATCH(Target_SKU, SKU_List, 0), MATCH(Target_Month, Month_Headers, 0))
  \`\`\`
* This combination never fails when rows are inserted or reordered, guaranteeing 100% audit durability.

#### Defending Against Silent Modeling Failure
* **ISBLANK vs Empty String (\`\"\"\`)**: Differentiate between missing data entries and explicit zero valuations.
* **Wrap with Purpose**: Never blanket-wrap models in \`IFERROR\` until formulas are proven correct. Blanket \`IFERROR\` masks spelling errors and broken cell references.
* **Validation Flags**: Implement binary validation tests: \`=IF(ABS(Total_Assets - Total_Liabilities_Equity) > 0.01, \"BALANCE ERROR\", \"BALANCED\")\`.`,
    quiz: {
      question: "Why is blanket use of IFERROR() considered a dangerous practice during initial financial model construction?",
      options: [
        "It slows down computer processing by 500%",
        "It suppresses legitimate syntax errors, broken range links, and typo corruptions, making debugging impossible",
        "It prevents Excel from saving the file as .xlsx",
        "It converts decimal numbers to binary"
      ],
      correctIdx: 1,
      explanation: "Wrapping calculations prematurely in IFERROR hides broken references (#REF!), formula misspellings (#NAME?), and calculation errors, disguising model defects as valid zero or blank outputs."
    },
    hasSimulator: "corporate-modeling"
  },

  "mod1-practical-speed-drill": {
    slug: "mod1-practical-speed-drill",
    title: "1.5 Module 1 Practical Speed Drill: Blank-Sheet Template Architecture",
    xpReward: 75,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Module 1 Speed Drill & Institutional Setup

#### The Timed Blank-Sheet Build Drill
Corporate assessment centers at top MNCs (Unilever, BAT, Nestlé) frequently administer timed 15-to-30-minute Excel tests. Candidates who rely on mouse menus inevitably fail to complete the modeling brief.

#### Drill Requirements:
1. Initialize a blank workbook (\`Ctrl + N\`).
2. Construct three dedicated sheets: \`Assumptions\`, \`Calculations\`, \`Summary_Deck\` using \`Shift + F11\` and \`Alt + H + O + R\`.
3. Build a dynamic 60-month timeline header starting from \`2026-01-01\` using \`EDATE(start_date, 1)\` formatted as \`mmm-yy\`.
4. Apply standard color-coding: Blue inputs, Black formulas, Green inter-sheet links.
5. Create an automated integrity balance check cell with conditional formatting alert flags.`,
    quiz: {
      question: "Which keyboard shortcut sequence in Excel renames the active worksheet tab without using the mouse?",
      options: [
        "Alt + H + O + R",
        "Ctrl + Shift + R",
        "Alt + F4",
        "Ctrl + Tab"
      ],
      correctIdx: 0,
      explanation: "Alt + H + O + R opens the Rename Sheet edit field directly in the tab strip, enabling instant mouse-free renaming."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: DATA CLEANSING & POWER QUERY ETL
  // ═══════════════════════════════════════════════════════════════
  "power-query-fundamentals-etl": {
    slug: "power-query-fundamentals-etl",
    title: "2.1 Power Query Fundamentals & Data Ingestion Pipelines",
    xpReward: 50,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Power Query ETL Architecture for Corporate Finance

#### The Manual Copy-Paste Trap
Financial analysts in Bangladesh lose an estimated 12 to 18 hours per month manually copying, cleaning, and formatting SAP, Oracle, and Tally accounting exports. Power Query (Get & Transform) automates this pipeline into a single-click repeatable refresh.

#### The Three ETL Stages in Financial Workflows:
1. **Extract**: Connect directly to source CSVs, Excel files, SharePoint folders, or SQL endpoints without opening the raw data files.
2. **Transform**: Strip header text blocks, filter total rows, standardize data types (Currency, Date, Text), and replace null values.
3. **Load**: Load the clean data into the Excel Data Model or as a structured table ready for dynamic modeling.

#### Golden Rules of Power Query ETL:
* Never edit raw source files. The source is immutable truth.
* Assign explicit data types immediately after promotion of headers to prevent type mismatch errors.
* Use **Close & Load To... -> Only Create Connection + Add this data to the Data Model** for files larger than 100,000 rows.`,
    quiz: {
      question: "What is the primary advantage of loading large multi-period ERP extracts as 'Only Create Connection + Add to Data Model' rather than loading as a regular worksheet table?",
      options: [
        "It changes the language of Excel into English",
        "It avoids worksheet row limit bottlenecks (1,048,576 rows) and drastically reduces file size through columnar VertiPaq compression",
        "It eliminates the need for formulas completely",
        "It prevents unauthorized users from viewing the computer screen"
      ],
      correctIdx: 1,
      explanation: "Loading to the Data Model stores records inside an in-memory columnar database, handling millions of rows with minimal RAM usage while bypassing Excel's standard 1M-row worksheet boundary."
    },
    hasSimulator: "messy-data"
  },

  "unpivoting-date-standardization": {
    slug: "unpivoting-date-standardization",
    title: "2.2 Advanced Transformations: Unpivoting Matrix Budgets & Standardizing Dates",
    xpReward: 65,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Unpivoting Matrix Ledgers & Regional Date Standardization

#### Unpivoting: Converting Wide Reports into Tall Databases
ERP reports export data formatted for human eyes: Accounts down column A, and 12 monthly amounts spread across horizontal columns B through M.
* **Why Wide Data Fails**: You cannot build dynamic time-series formulas, write clean SUMIFS, or construct rolling models on wide cross-tabulated tables.
* **The Solution**: Select key descriptor columns (e.g., \`Account_Code\`, \`Cost_Center\`), right-click, and select **Unpivot Other Columns**.
* Power Query generates a normalized 3-column table: \`Account_Code\`, \`Month_Attribute\`, \`Amount\`.

#### Handling Corrupted Regional Dates (DD/MM/YYYY vs MM/DD/YYYY)
In South Asian corporate environments, operating systems frequently flip day and month numbers when opening foreign CSV files.
* Never use text replacement on dates.
* In Power Query, right-click the date column -> **Change Type with Locale** -> Select **Date** and Locale: **English (United Kingdom)** or **Bengali (Bangladesh)**. This locks day/month/year order permanently.`,
    quiz: {
      question: "Why is 'Unpivot Other Columns' superior to 'Unpivot Selected Columns' in Power Query when dealing with recurring monthly financial reports?",
      options: [
        "It sorts the resulting table by alphabetical order automatically",
        "When a new month column (e.g. 'Month 13') is added to next month's raw export, it is automatically unpivoted without breaking the query pipeline",
        "It deletes duplicate customer entries",
        "It requires zero computer memory"
      ],
      correctIdx: 1,
      explanation: "Selecting the fixed identifier columns and choosing 'Unpivot Other Columns' ensures dynamic resilience: any future period columns added to the right are captured automatically on refresh."
    },
    hasSimulator: "messy-data"
  },

  "m-code-custom-transformations": {
    slug: "m-code-custom-transformations",
    title: "2.3 Custom Conditional Columns & Power Query M-Code Best Practices",
    xpReward: 45,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Power Query M-Code & Custom Transformation Logic

#### The Power Query M Formula Language
Underneath Power Query's graphical user interface lies **M (Mashup Language)**. Understanding basic M syntax enables custom text splitting, account categorization, and dynamic file path ingestion.

#### Practical M Recipes:
1. **Conditional Account Grouping**:
   \`\`\`powerquery
   if Text.StartsWith([Account_Code], "4") then "Revenue"
   else if Text.StartsWith([Account_Code], "5") then "COGS"
   else if Text.StartsWith([Account_Code], "6") then "OPEX"
   else "Balance Sheet"
   \`\`\`
2. **Dynamic Date Extraction**:
   \`\`\`powerquery
   Date.EndOfMonth(Date.FromText([Period_String]))
   \`\`\`
3. **Query Optimization**: Remove redundant \`Changed Type\` steps that duplicate column conversions. Keep query steps lean to optimize refresh speed.`,
    quiz: {
      question: "Is Power Query M code case-sensitive?",
      options: [
        "No, M code ignores capitalization completely",
        "Yes, M code is strictly case-sensitive: 'Text.Select' will execute, but 'text.select' will throw a syntax error",
        "Only when executing on macOS computers",
        "Only when querying SQL databases"
      ],
      correctIdx: 1,
      explanation: "Power Query M language is strictly case-sensitive. All function names (e.g. Table.AddColumn, Text.Lower) and column references must match casing exactly."
    },
    hasSimulator: "messy-data"
  },

  "multi-file-ledger-consolidation": {
    slug: "multi-file-ledger-consolidation",
    title: "2.4 Consolidating 12 Monthly ERP Ledgers with One-Click Auto-Refresh",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Folder Ingestion & Automated Multi-Ledger Consolidation

#### Consolidated Folder Pipeline
Corporate accounting teams receive separate trial balance exports each month from regional branches or divisions (e.g. Chittagong, Dhaka, Sylhet).
1. Connect via **Data -> Get Data -> From File -> From Folder**.
2. Filter out temporary lock files (\`~*.*\`) to prevent corrupt query errors.
3. Combine and Transform: Power Query auto-generates a sample transform function applied across every file in the directory.
4. Add the file name as a period column to preserve monthly source attribution.
5. In Month 13, simply drop the new file into the folder and click **Refresh All** (\`Ctrl + Alt + F5\`). The entire model updates instantaneously.`,
    quiz: {
      question: "Why should you immediately filter out file names beginning with '~$' when consolidating an accounting folder in Power Query?",
      options: [
        "These are malicious virus files",
        "These are temporary lock files created by Excel when a workbook is currently open, which will crash the Power Query folder refresh",
        "They contain encrypted financial data",
        "They are required by the operating system"
      ],
      correctIdx: 1,
      explanation: "Whenever someone has an Excel file open in the folder, Windows generates a hidden lock file starting with '~$' that causes Power Query to throw an access error if not filtered out."
    },
    hasSimulator: "messy-data"
  },

  "mod2-data-transformation-challenge": {
    slug: "mod2-data-transformation-challenge",
    title: "2.5 Module 2 ERP Data Ingestion & Sanitization Challenge",
    xpReward: 75,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Module 2 Capstone Challenge: Dirty ERP Data Sanitization

#### The Challenge Scenario
You are handed an uncleaned multi-branch ERP trial balance extract containing:
* Merged title cells and redundant subtotal rows.
* Inconsistent trailing spaces and mixed currency formatting (e.g. \`1,25,000 /=\`).
* Horizontal quarterly columns spanning 3 fiscal years.

#### Target Output:
Deliver a clean, normalized Power Query pipeline that unpivots all periods into a standard \`[Date]\`, \`[Branch]\`, \`[GL_Account]\`, \`[Amount_BDT]\` schema and refreshes cleanly under 5 seconds.`,
    quiz: {
      question: "What is the recommended best practice for eliminating non-printable line breaks and irregular trailing whitespaces in Power Query?",
      options: [
        "Writing a custom VBA macro",
        "Applying 'Clean' followed by 'Trim' under the Transform -> Format ribbon menu",
        "Manually deleting spaces in Excel cell by cell",
        "Exporting to Notepad and re-importing"
      ],
      correctIdx: 1,
      explanation: "Using Transform -> Format -> Clean removes invisible ASCII non-printable characters, and Trim strips leading and trailing spaces across the selected columns in one step."
    },
    hasSimulator: "messy-data"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: OPERATIONAL DRIVERS & COST BEHAVIOR
  // ═══════════════════════════════════════════════════════════════
  "revenue-driver-architectures": {
    slug: "revenue-driver-architectures",
    title: "3.1 Revenue Driver Architectures: P×Q, Capacity Ceilings & Seasonality",
    xpReward: 55,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Operational Revenue Driver Architectures

#### The Superiority of Price × Quantity (P×Q) Builds
Amateur financial models forecast top-line revenue with an arbitrary growth rate (e.g. *"Revenue will grow by 12% per year"*). Corporate controllers and institutional investors reject this approach.
* **Operational Reality**: Revenue is the product of operational capacity, customer demand, and realized pricing:
  $$\\text{Revenue} = \\sum_{i} \\left( Q_i \\times P_i \\right)$$
* **Production Capacity Ceilings**: A factory running 2 shifts at 8 hours/day has a hard physical ceiling:
  $$\\text{Maximum Monthly Capacity} = \\text{Installed Capacity (Units/Hr)} \\times \\text{Operating Hours} \\times \\text{OEE (Overall Equipment Effectiveness)}$$
* Forecasting production volume beyond factory capacity without modeling corresponding capital expenditure additions creates an invalid financial model.

#### Modeling Monthly Seasonality Indices
Consumer goods and beverage businesses in Bangladesh experience dramatic seasonality (e.g. Eid festivals, monsoon quarters):
* **Seasonality Index ($S_m$)**: Base annual volume is weighted by monthly indices where $\\sum_{m=1}^{12} S_m = 12.0$.
* Forecast monthly volume = $\\left( \\frac{\\text{Annual Target}}{12} \\right) \\times S_m$.`,
    quiz: {
      question: "Why is forecasting corporate revenue with a simple annual percentage growth rate (e.g., +15% YoY) considered unacceptable in institutional financial modeling?",
      options: [
        "Because Excel cannot compute compound percentages",
        "Because it ignores physical factory capacity constraints, unit pricing realization, and product-level volume dynamics",
        "Because tax authorities require daily sales receipts",
        "Because it makes the model calculate too quickly"
      ],
      correctIdx: 1,
      explanation: "Top-line percentage assumptions disconnect revenue from operational capacity, customer demand, factory machine ceilings, and pricing power. Institutional models require bottom-up P×Q builds."
    },
    hasSimulator: "corporate-modeling"
  },

  "cost-behavior-operating-leverage": {
    slug: "cost-behavior-operating-leverage",
    title: "3.2 Cost Behavior, Operating Leverage & Cost of Goods Sold (COGS)",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Cost Behavior, Operating Leverage & COGS Linkages

#### Cost Classification Architecture
1. **Pure Variable Costs**: Vary directly and linearly with unit volume (Raw Materials, Primary Packaging, Direct Labor piece rates).
2. **Fixed Costs**: Incurred independently of production volume within the relevant range (Factory Rent, Plant Manager Salaries, Insurance).
3. **Semi-Variable / Step-Fixed Costs**: Remain fixed across a production band, but step upward once a new shift or machine line is added (Warehouse Supervisors, Quality Control Inspectors).

#### The Degree of Operating Leverage (DOL)
Operating leverage measures how sensitive operating profit (EBIT) is to changes in unit revenue:
$$\\text{DOL} = \\frac{\\% \\Delta \\text{EBIT}}{\\% \\Delta \\text{Revenue}} = \\frac{\\text{Contribution Margin}}{\\text{EBIT}}$$
* High fixed cost structures produce high DOL: during revenue growth, EBIT expands rapidly; during revenue contractions, EBIT collapses.`,
    quiz: {
      question: "What happens to a manufacturing company's Operating Profit Margin if it has high fixed costs and unit sales volume increases by 25%?",
      options: [
        "Operating profit margin contracts because overhead increases",
        "Operating profit margin expands significantly due to positive operating leverage as fixed costs are diluted across more units",
        "Operating profit margin remains strictly identical",
        "Operating profit falls to zero"
      ],
      correctIdx: 1,
      explanation: "With high fixed overheads, incremental units generate full contribution margin above variable cost. As fixed costs are spread over higher volume, operating margin expands (economies of scale)."
    },
    hasSimulator: "corporate-modeling"
  },

  "step-fixed-overhead-modeling": {
    slug: "step-fixed-overhead-modeling",
    title: "3.3 Step-Fixed Costs, Raw Material Inflation & Bill-of-Materials Linkages",
    xpReward: 45,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Step-Fixed Costs & Raw Material Inflation Linkages

#### Modeling Step-Fixed Costs in Excel
Step costs must trigger automatically when volume crosses discrete capacity thresholds:
\`\`\`excel
=Base_Supervisor_Salary * ROUNDUP(Total_Production_Units / Line_Capacity_Threshold, 0)
\`\`\`
Using \`ROUNDUP\` ensures that if production hits 10,001 units and line capacity is 10,000, the model immediately provisions a 2nd supervisor shift.

#### Raw Material Bill of Materials (BOM) Indexing
In volatile economies, raw materials (e.g. imported resins, wheat, chemicals) are exposed to foreign exchange fluctuations:
$$\\text{Unit COGS}_t = \\sum \\left( \\text{BOM Consumption}_i \\times \\text{Unit Price}_{i,0} \\times \\left(1 + \\text{FX Depreciation}\\right) \\times \\left(1 + \\text{Inflation}_t\\right) \\right)$$`,
    quiz: {
      question: "Which formula technique dynamically provisions additional factory shifts or supervisors when production volume exceeds machine line capacity?",
      options: [
        "=ROUNDUP(Production_Volume / Line_Capacity, 0) * Shift_Cost",
        "=SUM(Line_Capacity:Production_Volume)",
        "=IF(Volume > 0, 1, 0)",
        "=AVERAGE(Production_Volume)"
      ],
      correctIdx: 0,
      explanation: "ROUNDUP(Volume / Capacity, 0) guarantees that any fraction of volume crossing into an additional operating band immediately triggers full provisions for the next incremental shift cost."
    },
    hasSimulator: "corporate-modeling"
  },

  "headcount-payroll-rollforward": {
    slug: "headcount-payroll-rollforward",
    title: "3.4 Corporate Headcount & Payroll Roll-Forward Schedules",
    xpReward: 55,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Corporate Headcount & Payroll Roll-Forward

#### Corkscrew Modeling for Personnel
Payroll constitutes 20% to 45% of enterprise operating expenditure. Modeling payroll as a flat lump-sum percentage of revenue is unacceptable in FP&A.
* **Headcount Corkscrew**:
  $$\\text{Ending Headcount} = \\text{Beginning Headcount} + \\text{New Hires} - \\text{Departures / Attrition}$$
* **Fully-Burdened Employment Cost**:
  * Base Monthly Gross Salary
  * Festival Bonuses (e.g. 2 months base for Eid in Bangladesh)
  * Provident Fund & Gratuity Provisions (typically 8.33% to 10% of basic)
  * Medical & Life Insurance Burdens`,
    quiz: {
      question: "In corporate FP&A, why must payroll modeling account for 'Fully-Burdened' employment cost rather than basic salary alone?",
      options: [
        "Because tax inspectors only audit basic salary",
        "Because bonuses, gratuity, provident fund, and statutory benefits add 25% to 40% on top of base salary, which must be accurately accrued to avoid cash flow deficits",
        "Because basic salary is never paid in cash",
        "To make the income statement balance with equity"
      ],
      correctIdx: 1,
      explanation: "Statutory employee benefits, gratuity accruals, medical benefits, and festival bonuses represent real cash outflows that increase total cost to company (CTC) significantly above base salary."
    },
    hasSimulator: "corporate-modeling"
  },

  "mini-project-1-revenue-capacity": {
    slug: "mini-project-1-revenue-capacity",
    title: "3.5 Mini-Project 1: 5-Year Dynamic Operational Revenue & Capacity Forecast Model",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Mini-Project 1: Operational Revenue & Capacity Engine

#### Objective & Business Brief
Construct a 5-year monthly revenue and production schedule for an industrial consumer packaging manufacturer operating 3 automated production lines.
* **Key Inputs**:
  * Line 1 Capacity: 45,000 units/mo; Line 2: 60,000 units/mo; Line 3: 80,000 units/mo.
  * Historical utilization: 78%; Planned maintenance downtime: 4 days/quarter.
  * Price escalation: 4.5% annual index; Seasonal indices peaking in Q2 and Q4.
* **Deliverable**: A fully dynamic Excel workbook (\`M03_MiniProject1_RevenueCapacity.xlsx\`) featuring automated utilization alert flags if demand exceeds 100% capacity ceiling.`,
    quiz: {
      question: "In Mini-Project 1, what automated alert flag should trigger if projected demand in Month 18 exceeds the physical installed capacity ceiling of the production lines?",
      options: [
        "The model should automatically delete the extra sales rows",
        "The model should display a visual Red Flag warning indicating a capacity breach and unfulfilled demand, preventing false revenue overstatement",
        "The model should set unit price to zero",
        "Excel should shut down"
      ],
      correctIdx: 1,
      explanation: "Professional financial models implement automated integrity checks that flag capacity breaches, highlighting either unserved demand or the necessity for additional capital expenditure (CapEx)."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // PILLAR 2: CORPORATE FINANCIAL STATEMENT MODELING
  // MODULE 4: INTEGRATED 3-STATEMENT MODELING FROM SCRATCH
  // ═══════════════════════════════════════════════════════════════
  "income-statement-integration": {
    slug: "income-statement-integration",
    title: "4.1 Model Architecture & Income Statement Integration down to EBIT",
    xpReward: 60,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Income Statement Construction down to EBIT

#### Standard P&L Line Item Progression:
1. **Gross Revenue (GSV)**: Top-line volume multiplied by list price.
2. **Net Realized Revenue (NSV)**: Gross revenue less trade discounts, rebates, and distributor allowances.
3. **Cost of Goods Sold (COGS)**: Raw materials, direct factory labor, and manufacturing depreciation.
4. **Gross Profit**: NSV minus COGS.
5. **Operating Expenses (OPEX)**:
   * Selling, General & Administrative (SG&A)
   * Marketing & Advertising Investments
   * Logistics & Distribution Costs
6. **Operating Profit (EBITDA / EBIT)**: Core operating earnings before non-operating items.`,
    quiz: {
      question: "What is the key difference between Gross Sales Value (GSV) and Net Sales Value (NSV)?",
      options: [
        "NSV includes income tax while GSV does not",
        "NSV represents the actual revenue realized after deducting trade discounts, distributor commissions, and off-invoice allowances from GSV",
        "GSV is calculated after COGS is deducted",
        "There is no difference in corporate finance"
      ],
      correctIdx: 1,
      explanation: "In commercial FMCG finance, Gross Sales Value is the total sticker volume before discounts. Net Sales Value (or Net Revenue) is the actual cash-generative revenue retained after trade terms and rebates."
    },
    hasSimulator: "corporate-modeling"
  },

  "balance-sheet-cashflow-engine": {
    slug: "balance-sheet-cashflow-engine",
    title: "4.2 The Balance Sheet, Non-Cash Adjustments & the Indirect Cash Flow Engine",
    xpReward: 75,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Indirect Cash Flow Engine & Statement Integration

#### The Tripartite Connection
A financial model is not balanced by entering a plug number. The three statements are connected through accounting mathematics:
1. **Net Income** from the Income Statement flows into the top line of **Cash Flow from Operations (CFO)** and into **Retained Earnings** on the Balance Sheet.
2. **Non-Cash Expenses** (Depreciation & Amortization) are added back to CFO.
3. **Working Capital Changes** $(\\Delta \\text{WC})$ reflect cash absorbed or released by operating accounts:
   $$\\Delta \\text{Cash from Operating Assets} = -\\Delta \\text{AR} - \\Delta \\text{Inventory}$$
   $$\\Delta \\text{Cash from Operating Liabilities} = +\\Delta \\text{AP}$$
4. **Cash Flow from Investing (CFI)** captures Capex outflows, which roll forward into PP&E.
5. **Cash Flow from Financing (CFF)** reflects debt issuances, debt principal repayments, and equity dividends.
6. **Ending Cash Balance** = $\\text{Beginning Cash} + \\text{Net Cash Change (CFO + CFI + CFF)}$.
7. **Cash on Balance Sheet** links directly to Ending Cash on the Cash Flow Statement.`,
    quiz: {
      question: "If a company's Accounts Receivable increases by ৳25M from Year 1 to Year 2, what is the exact mechanical adjustment on the Indirect Cash Flow Statement?",
      options: [
        "Add ৳25M to Cash Flow from Financing",
        "Subtract ৳25M from Cash Flow from Operations (cash outflow)",
        "Add ৳25M to Cash Flow from Investing",
        "No adjustment is made"
      ],
      correctIdx: 1,
      explanation: "An increase in an operating asset represents cash tied up in customer credit that was recognized as revenue on the P&L but has not yet been collected in cash. Hence, it is deducted (-৳25M) in CFO."
    },
    hasSimulator: "corporate-modeling"
  },

  "zero-plug-balancing-test": {
    slug: "zero-plug-balancing-test",
    title: "4.3 Auditable Balancing: Eliminating Balancing Plugs and Circular Loops",
    xpReward: 65,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Zero-Plug Balancing Test

#### The Cardinal Sin of Financial Modeling: The Cash Plug
In amateur models, students and untrained analysts balance the Balance Sheet by typing:
\`=Total_Liabilities_and_Equity - Other_Assets\` into the Cash cell.
* **Why Plugs are Fatal**: A plug conceals mathematical and accounting errors. If inventory calculations are broken by ৳50M, a plug quietly adjusts cash to compensate, disguising bankruptcy as liquidity.

#### The Auditable Integrity Check Block
Every model must feature an auditable check formula:
\`\`\`excel
=Total_Assets - (Total_Liabilities + Total_Equity)
\`\`\`
* The check cell must display exact zero (within floating-point rounding tolerance $\\pm 0.001$).
* Pair with conditional formatting: Green "BALANCED" when zero; flashing Red "OUT OF BALANCE [Variance]" when non-zero.`,
    quiz: {
      question: "Why do institutional investors, credit rating agencies, and top MNC controllers strictly prohibit balancing plugs on the balance sheet?",
      options: [
        "Because plugs increase printing ink costs",
        "Because a plug forces the balance sheet to appear balanced even when underlying operational schedules, depreciation, or debt calculations are fundamentally broken",
        "Because plugs cause computer viruses",
        "Because Excel removes formulas containing plugs"
      ],
      correctIdx: 1,
      explanation: "A plug artificially masks internal formula errors, broken linkages, or cash deficits, destroying the model's reliability for executive decision-making and credit underwriting."
    },
    hasSimulator: "corporate-modeling"
  },

  "retained-earnings-equity-schedules": {
    slug: "retained-earnings-equity-schedules",
    title: "4.4 Retained Earnings, Dividends & Share Capital Roll-Forward",
    xpReward: 45,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Retained Earnings & Equity Roll-Forward

#### Corkscrew Formulation for Equity
Like all balance sheet accounts, Retained Earnings must follow a strict beginning-to-ending roll-forward corkscrew:
$$\\text{Ending Retained Earnings} = \\text{Beginning Retained Earnings} + \\text{Net Income} - \\text{Dividends Declared}$$
* **Dividend Payout Logic**: Model dividends as a dynamic policy (e.g. 40% payout ratio of positive net income, subject to minimum statutory liquidity constraints).
* Linking dividends to CFF closes the financing loop cleanly.`,
    quiz: {
      question: "If a company generates ৳40M Net Income in Year 2 and the Board declares a 30% dividend payout, what is the net change in ending Retained Earnings?",
      options: [
        "+৳40M",
        "+৳28M (৳40M Net Income minus ৳12M Dividend)",
        "-৳12M",
        "৳0"
      ],
      correctIdx: 1,
      explanation: "Retained Earnings increases by Net Income (৳40M) less Dividends distributed (30% of 40M = ৳12M), resulting in a net addition of ৳28M to equity."
    },
    hasSimulator: "corporate-modeling"
  },

  "mod4-blank-sheet-3statement-build": {
    slug: "mod4-blank-sheet-3statement-build",
    title: "4.5 Module 4 Blank-Sheet Integrated Model Balancing Challenge",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Module 4 Challenge: 3-Statement Blank Sheet Build

#### The Timed FMI AFM-Style Build
Starting from an empty Excel workbook:
1. Ingest 3 years of historical trial balances for a regional manufacturing enterprise.
2. Build 5 years of integrated projections (Income Statement, Balance Sheet, Indirect Cash Flow).
3. Connect Capex, working capital, debt repayment, and equity roll-forward schedules.
4. Verify that the Balance Sheet balances to zero in every forecast year without any balancing plug numbers.`,
    quiz: {
      question: "Which sequence represents the correct mechanical order of statement calculation in an integrated 3-statement model?",
      options: [
        "Balance Sheet -> Cash Flow -> Income Statement",
        "Income Statement (down to Net Income) -> Supporting Schedules (WC, Capex, Debt) -> Cash Flow Statement -> Balance Sheet (Assets & Liabilities) -> Cash link & Balance Check",
        "Cash Flow -> Balance Sheet -> Income Statement",
        "Guess numbers until Assets equal Liabilities"
      ],
      correctIdx: 1,
      explanation: "Net Income and operating revenues are computed first, supporting schedules drive non-cash/balance sheet changes, the Cash Flow Statement synthesizes cash, and the ending cash links to the Balance Sheet to achieve balance."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: WORKING CAPITAL & OPERATIONAL CASH FLOW
  // ═══════════════════════════════════════════════════════════════
  "working-capital-days-schedules": {
    slug: "working-capital-days-schedules",
    title: "5.1 Working Capital Days (DSO, DIO, DPO) & Balance Sheet Schedules",
    xpReward: 55,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Working Capital Days & Cash Conversion Dynamics

#### The Operational Turnover Formulas:
1. **Days Sales Outstanding (DSO)**: Measures how long it takes to collect cash from customers:
   $$\\text{DSO} = \\frac{\\text{Accounts Receivable}}{\\text{Annual Gross Revenue}} \\times 365$$
   $$\\text{Forecasted AR} = \\frac{\\text{Revenue} \\times \\text{DSO Assumption}}{365}$$
2. **Days Inventory Outstanding (DIO)**: Measures average days inventory sits in warehouses:
   $$\\text{DIO} = \\frac{\\text{Inventory}}{\\text{COGS}} \\times 365$$
   $$\\text{Forecasted Inventory} = \\frac{\\text{COGS} \\times \\text{DIO Assumption}}{365}$$
3. **Days Payable Outstanding (DPO)**: Measures how long the company takes to pay suppliers:
   $$\\text{DPO} = \\frac{\\text{Accounts Payable}}{\\text{COGS (or Raw Material Purchases)}} \\times 365$$
   $$\\text{Forecasted AP} = \\frac{\\text{COGS} \\times \\text{DPO Assumption}}{365}$$`,
    quiz: {
      question: "A company has Annual COGS of ৳365M and carries an average Inventory balance of ৳45M. What is its Days Inventory Outstanding (DIO)?",
      options: [
        "30 Days",
        "45 Days",
        "60 Days",
        "90 Days"
      ],
      correctIdx: 1,
      explanation: "DIO = (Inventory / COGS) * 365 = (৳45M / ৳365M) * 365 = 45 days. The company holds 45 days of inventory on average."
    },
    hasSimulator: "corporate-modeling"
  },

  "cash-conversion-cycle-optimization": {
    slug: "cash-conversion-cycle-optimization",
    title: "5.2 Cash Conversion Cycle (CCC) & Operational Liquidity Stress-Testing",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Cash Conversion Cycle (CCC) & Liquidity Stress

#### The Core Metric of Operating Efficiency
The Cash Conversion Cycle measures the net time elapsed between paying for raw materials and collecting cash from customer sales:
$$\\text{CCC} = \\text{DSO} + \\text{DIO} - \\text{DPO}$$
* **A Short or Negative CCC**: The enterprise is financed by supplier trade credit (e.g. Amazon, Walmart, or Unilever with modern retail).
* **A Lengthening CCC**: Indicates cash trapped in delinquent receivables or obsolete inventory, triggering dangerous reliance on bank overdrafts.`,
    quiz: {
      question: "If a company has DSO = 50 days, DIO = 60 days, and negotiates with suppliers to increase DPO from 30 days to 50 days, how does its Cash Conversion Cycle (CCC) change?",
      options: [
        "CCC increases by 20 days",
        "CCC improves (shortens) from 80 days to 60 days, releasing cash",
        "CCC remains unchanged at 110 days",
        "CCC becomes negative 50 days"
      ],
      correctIdx: 1,
      explanation: "Initial CCC = 50 + 60 - 30 = 80 days. New CCC = 50 + 60 - 50 = 60 days. Lengthening supplier payment terms delays cash outflow, improving liquidity by 20 days."
    },
    hasSimulator: "corporate-modeling"
  },

  "operating-cashflow-waterfall-bridge": {
    slug: "operating-cashflow-waterfall-bridge",
    title: "5.3 Cash Flow Bridging: Reconciling EBITDA to Operating Free Cash Flow",
    xpReward: 50,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### EBITDA to Operating Free Cash Flow Bridging

#### Why EBITDA is Not Cash
Executives frequently celebrate strong EBITDA while facing payroll cash crunches. The CFO must explain this discrepancy through a **Cash Flow Bridge**:
$$\\text{Operating Cash Flow} = \\text{EBITDA} - \\text{Cash Taxes} - \\Delta \\text{Working Capital} - \\text{Cash Capex}$$
* If revenue grows 40% but DSO balloons from 30 to 75 days, working capital will absorb more cash than EBITDA generates, causing negative operating cash flow.`,
    quiz: {
      question: "In what business scenario can a company exhibit positive, growing EBITDA while simultaneously suffering from negative Operating Cash Flow?",
      options: [
        "When the corporate tax rate is zero",
        "During rapid revenue expansion accompanied by ballooning customer receivables (high DSO) and massive inventory build-up",
        "When the company pays zero dividends",
        "When all sales are made in cash"
      ],
      correctIdx: 1,
      explanation: "Rapid revenue growth ties up enormous cash in Accounts Receivable and Inventory. If customer cash collections lag behind production expenses, working capital expansion absorbs all operating profits."
    },
    hasSimulator: "corporate-modeling"
  },

  "working-capital-terms-sensitivity": {
    slug: "working-capital-terms-sensitivity",
    title: "5.4 Customer Credit Terms & Supplier Optimization Sensitivity",
    xpReward: 55,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Sensitivity Modeling on Working Capital Terms

#### Quantifying Value Creation from Working Capital Optimization
How much liquidity is unlocked if credit controllers reduce DSO by 15 days?
$$\\text{Cash Unlocked} = \\text{Annual Revenue} \\times \\left( \\frac{\\Delta \\text{DSO}}{365} \\right)$$
* For a ৳1.2 Billion FMCG business, a 15-day reduction in DSO frees up:
  $$\\text{Cash Unlocked} = 1,200,000,000 \\times \\left( \\frac{15}{365} \\right) \\approx \\mathbf{৳ 49.3 \\text{ Million}}$$
* Freeing ৳49.3M reduces short-term bank overdraft borrowing, saving ৳4.9M in interest expense annually at a 10% borrowing rate.`,
    quiz: {
      question: "For a corporate enterprise generating ৳730M in annual revenue, what is the exact cash liquidity unlocked if DSO is reduced by 10 days?",
      options: [
        "৳7.3 Million",
        "৳20.0 Million",
        "৳36.5 Million",
        "৳73.0 Million"
      ],
      correctIdx: 1,
      explanation: "Cash Unlocked = (Annual Revenue * DSO Reduction) / 365 = (৳730M * 10) / 365 = ৳20.0 Million."
    },
    hasSimulator: "corporate-modeling"
  },

  "mini-project-3-working-capital-optimizer": {
    slug: "mini-project-3-working-capital-optimizer",
    title: "5.5 Mini-Project 3: Working Capital Cash Conversion Cycle Optimizer",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Mini-Project 3: Working Capital Cash Conversion Optimizer

#### Business Brief
You are the FP&A Lead for a leading consumer electronics distributor in Dhaka. The firm plans to expand store footprint by 40% next year, but bank credit lines are capped at ৳150M.
* **Task**:
  * Ingest 2 years of transactional ledger data (AR aging, inventory SKU turnover, AP payment terms).
  * Build a dynamic Working Capital schedule modeling 3 policy scenarios:
    1. Status Quo (DSO: 58, DIO: 72, DPO: 34)
    2. Conservative Optimization (DSO: 45, DIO: 60, DPO: 42)
    3. Aggressive Cash Release (DSO: 38, DIO: 50, DPO: 50)
  * Calculate total operating cash unlocked and evaluate if bank debt is minimized under rapid expansion.`,
    quiz: {
      question: "What is the primary strategic benefit of completing Mini-Project 3's working capital optimization schedule?",
      options: [
        "It eliminates the need to pay corporate income tax",
        "It proves whether an enterprise can fund aggressive revenue expansion organically through working capital cash release without taking on expensive bank debt",
        "It automates customer service phone calls",
        "It replaces the marketing department"
      ],
      correctIdx: 1,
      explanation: "Optimizing working capital days unlocks internal liquidity from the balance sheet, funding expansion without diluting equity or incurring high bank interest charges."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 6: CAPEX, DEPRECIATION & DEBT SCHEDULES
  // ═══════════════════════════════════════════════════════════════
  "capex-depreciation-corkscrews": {
    slug: "capex-depreciation-corkscrews",
    title: "6.1 Capex Roll-Forwards & Depreciation Corkscrews (Straight-Line & Declining)",
    xpReward: 55,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### PP&E Roll-Forwards & Depreciation Corkscrews

#### The Classical Asset Corkscrew Formula:
$$\\text{Ending Gross PP\\&E} = \\text{Beginning Gross PP\\&E} + \\text{Capex Additions} - \\text{Asset Disposals}$$
$$\\text{Ending Accum. Depr.} = \\text{Beginning Accum. Depr.} + \\text{Depreciation Expense} - \\text{Disposal Depr.}$$
$$\\text{Net Book Value (NBV)} = \\text{Ending Gross PP\\&E} - \\text{Ending Accumulated Depreciation}$$

#### Depreciation Methods:
* **Straight-Line (SL)**: Uniform expense over useful life: $\\frac{\\text{Asset Cost} - \\text{Salvage Value}}{\\text{Useful Life (Years)}}$.
* **Declining Balance / Accelerated**: Higher initial expense: $\\text{NBV} \\times \\text{Depreciation Rate}$.`,
    quiz: {
      question: "If a company purchases ৳50M of factory machinery with a 10-year useful life and zero salvage value using straight-line depreciation, what is the impact on Year 1 EBITDA vs Operating Profit (EBIT)?",
      options: [
        "Both EBITDA and EBIT decrease by ৳5M",
        "EBITDA is completely unaffected (৳0 impact) while EBIT decreases by ৳5M (depreciation expense)",
        "EBITDA decreases by ৳50M while EBIT is unaffected",
        "Net income increases by ৳5M"
      ],
      correctIdx: 1,
      explanation: "Depreciation is excluded from EBITDA (Earnings BEFORE Interest, Taxes, Depreciation, and Amortization). Therefore, EBITDA is unaffected, while EBIT bears the ৳5M non-cash depreciation expense."
    },
    hasSimulator: "corporate-modeling"
  },

  "tax-depreciation-timing-differences": {
    slug: "tax-depreciation-timing-differences",
    title: "6.2 Tax Timing Differences & Deferred Tax Asset/Liability Schedules",
    xpReward: 45,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Tax Timing Differences & Deferred Taxes

#### Book Depreciation vs Tax Depreciation
* **Book Accounting (IFRS / IAS 16)**: Uses straight-line depreciation reflecting economic useful life.
* **Tax Authorities (NBR in Bangladesh / IRS in US)**: Grants accelerated tax depreciation allowances (e.g. Third Schedule tax rates).
* **Temporary Timing Difference**:
  $$\\text{Timing Difference} = \\text{Tax Depreciation} - \\text{Book Depreciation}$$
  * When Tax Depreciation > Book Depreciation: Taxable income is lower than accounting profit $\\rightarrow$ **Deferred Tax Liability (DTL)** is created.
  * In later years when Tax Depreciation < Book Depreciation, the DTL reverses into cash tax payments.`,
    quiz: {
      question: "When tax depreciation allowed by tax authorities exceeds the book depreciation reported on the financial statements, what balance sheet account is created?",
      options: [
        "Deferred Tax Asset (DTA)",
        "Deferred Tax Liability (DTL)",
        "Goodwill",
        "Accounts Payable"
      ],
      correctIdx: 1,
      explanation: "Accelerated tax depreciation lowers current tax payments relative to accounting profit, creating a future tax obligation known as a Deferred Tax Liability (DTL)."
    },
    hasSimulator: "corporate-modeling"
  },

  "debt-amortization-revolvers-sweeps": {
    slug: "debt-amortization-revolvers-sweeps",
    title: "6.3 Debt Amortization, Revolving Credit Facilities & Dynamic Cash Sweeps",
    xpReward: 70,
    duration: "55m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Debt Schedules, Revolvers & Dynamic Cash Sweeps

#### The Capital Structure Hierarchy
1. **Term Loans (Senior Debt)**: Fixed amortizing principal repayments (e.g. ৳10M/quarter).
2. **Revolving Credit Facility (Revolver)**: Flexible credit line drawn when operational cash dips below the minimum operating cash threshold.
3. **Dynamic Cash Sweep Mechanics**:
   * When operations generate excess discretionary cash:
     $$\\text{Cash Available for Sweep} = \\text{Operating Cash Flow} - \\text{Mandatory Principal Repayments} - \\text{Minimum Cash Buffer}$$
   * The model automatically directs excess cash to prepay outstanding revolver and debt balances:
     $$\\text{Repayment} = \\text{MIN}\\left( \\text{Cash Available for Sweep}, \\text{Beginning Debt Balance} \\right)$$`,
    quiz: {
      question: "What is the primary function of a dynamic cash sweep in corporate debt modeling?",
      options: [
        "It pays executive bonuses automatically",
        "It automatically deploys excess cash generated by operations to prepay debt balances ahead of schedule, reducing corporate interest burden",
        "It converts debt into common stock at a discount",
        "It sweeps money into offshore accounts"
      ],
      correctIdx: 1,
      explanation: "A dynamic cash sweep evaluates post-operational cash flow and sweeps available excess liquidity directly toward reducing outstanding debt balances, de-leveraging the enterprise."
    },
    hasSimulator: "corporate-modeling"
  },

  "circularity-breakers-average-interest": {
    slug: "circularity-breakers-average-interest",
    title: "6.4 Resolving Circular Interest Calculations with Dedicated Breaker Switches",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Managing Model Circularity with Dedicated Breaker Switches

#### Why Circular References Occur in Debt Schedules:
1. Interest expense depends on **Average Debt Balance** (or Average Cash).
2. Ending cash/debt depends on **Net Income**.
3. Net Income depends on **Interest Expense**.
4. Loop: Interest $\\rightarrow$ Net Income $\\rightarrow$ Cash $\\rightarrow$ Debt $\\rightarrow$ Interest!

#### The FAST Standard Solution: Circularity Breaker Switch
Never rely blindly on Excel's "Enable Iterative Calculations" checkbox. If an accidental formula error occurs elsewhere in the sheet, iterative calculations hide the error and corrupt the workbook permanently.
* **The Dedicated Circuit Breaker Toggle**:
  \`\`\`excel
  =IF(Circularity_Switch=1, (Beg_Debt + End_Debt)/2 * Interest_Rate, Beg_Debt * Interest_Rate)
  \`\`\`
* Setting \`Circularity_Switch = 0\` immediately breaks the loop by calculating interest on beginning balance, restoring model stability instantly.`,
    quiz: {
      question: "Why does the FAST Modeling Standard strongly advise implementing an explicit On/Off circularity breaker switch instead of relying on Excel's 'Iterative Calculation' mode?",
      options: [
        "Iterative calculation consumes all internet bandwidth",
        "Iterative calculation masks legitimate circular reference errors across unrelated schedules, preventing auditors from diagnosing broken logic",
        "Because switches make files load slower",
        "Excel does not have an iterative calculation mode"
      ],
      correctIdx: 1,
      explanation: "Iterative calculation suppresses all circular reference warnings globally across the workbook. A dedicated circuit breaker switch allows modelers to isolate and safely clear circular calculation loops."
    },
    hasSimulator: "corporate-modeling"
  },

  "mini-project-4-capex-debt-engine": {
    slug: "mini-project-4-capex-debt-engine",
    title: "6.5 Mini-Project 4: PP&E Depreciation Corkscrew & Debt Sweep Engine",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Mini-Project 4: Capital Expenditure & Debt Financing Engine

#### Practical Scope & Deliverables
Construct an integrated multi-tier capital asset and debt financing schedule:
* **Assets**: Land, Plant & Machinery (15% declining balance), Vehicles (20% straight-line), IT Infrastructure (33.3% straight-line).
* **Financing**: ৳200M 5-year senior term loan (amortizing ৳10M quarterly) + ৳100M working capital revolver (10.5% interest rate).
* **Features**: Dynamic cash sweep algorithm paying down revolver balances when cash exceeds ৳25M, fully controlled by an on/off circularity breaker switch.`,
    quiz: {
      question: "In Mini-Project 4, what happens when the Circularity Breaker Switch is toggled from '1' (Active) to '0' (Bypass)?",
      options: [
        "All debt balances are erased to zero",
        "Interest expense switches from average-debt calculation to beginning-debt calculation, instantaneously breaking circular dependency loops for audit verification",
        "The model crashes",
        "The file is converted to a PDF"
      ],
      correctIdx: 1,
      explanation: "Toggling the breaker switch to '0' grounds the interest formula in the static beginning balance, instantly clearing any circular formula lock and stabilizing the workbook."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // PILLAR 3: COMMERCIAL FP&A, DECISION SUPPORT & VALUATION
  // MODULE 7: COMMERCIAL FINANCE & PRICE-VOLUME-MIX (PVM)
  // ═══════════════════════════════════════════════════════════════
  "mathematics-of-pvm-decomposition": {
    slug: "mathematics-of-pvm-decomposition",
    title: "7.1 The Mathematics of Price-Volume-Mix (PVM) Decomposition",
    xpReward: 60,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Mathematical Foundation of Price-Volume-Mix (PVM) Analysis

#### Executive Context: The Commercial Finance Imperative
In corporate FMCG and commercial enterprise reviews (Unilever, British American Tobacco, Nestlé, Marico), commercial directors often ask:
*"Total revenue rose 8%, but gross profit fell by 2%. Did we discount too aggressively, did unit volume stall, or did customers shift toward low-margin economy products?"*
Simple percentage variance formulas cannot answer this. You must perform **Price-Volume-Mix (PVM) Decomposition**.

#### The Mathematical Decomposition Framework:
$$\\Delta \\text{Revenue} = \\text{Price Effect} + \\text{Volume Effect} + \\text{Mix Effect}$$

1. **Price Effect (Pricing Power)**:
   $$\\text{Price Effect} = \\sum_{i} \\left( P_{i, \\text{Act}} - P_{i, \\text{Prior}} \\right) \\times Q_{i, \\text{Act}}$$
   * Measures the pure impact of price realization holding actual volume constant.

2. **Volume Effect (Pure Market Growth)**:
   $$\\text{Volume Effect} = \\left( \\sum Q_{\\text{Act}} - \\sum Q_{\\text{Prior}} \\right) \\times \\bar{P}_{\\text{Prior}}$$
   * Measures the impact of total unit volume change evaluated at the prior period average price across the entire portfolio.

3. **Mix Effect (Portfolio Shift)**:
   $$\\text{Mix Effect} = \\sum_{i} Q_{i, \\text{Act}} \\times \\left( P_{i, \\text{Prior}} - \\bar{P}_{\\text{Prior}} \\right) \\times \\Delta \\text{Share}_i$$
   * Isolates whether the customer purchased a higher or lower proportion of premium vs budget products.`,
    quiz: {
      question: "A company sells 100,000 units in Year 1 at an average price of ৳50. In Year 2, it sells 120,000 units at an average price of ৳45. Holding mix constant, what is the pure Price Effect?",
      options: [
        "+৳1,000,000",
        "-৳600,000 [ (৳45 - ৳50) * 120,000 units ]",
        "+৳500,000",
        "-৳200,000"
      ],
      correctIdx: 1,
      explanation: "Price Effect = (Actual Price - Prior Price) * Actual Volume = (৳45 - ৳50) * 120,000 = -৳600,000. Price cuts eroded ৳600k in top-line revenue."
    },
    hasSimulator: "corporate-modeling"
  },

  "sku-portfolio-mix-effects": {
    slug: "sku-portfolio-mix-effects",
    title: "7.2 Isolating SKU Portfolio Mix Shifts from Pure Volume Growth",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Isolating SKU Portfolio Mix Shifts

#### The Silent Killer: Margin-Dilutive Mix Shifts
Consider an enterprise selling two SKUs:
* **Premium SKU**: Sells for ৳100 with a 50% gross margin.
* **Value SKU**: Sells for ৳20 with a 15% gross margin.
If total unit sales increase by 30%, but 95% of that growth came from the Value SKU, overall gross margin percentage collapses.
* The **Mix Effect** mathematically identifies and flags this dilution, proving to sales leadership that high unit volume is destroying portfolio margin.`,
    quiz: {
      question: "How does a negative 'Mix Effect' manifest in an executive commercial finance review?",
      options: [
        "Total unit volume has dropped across every single product line",
        "Customer purchases shifted toward cheaper, lower-margin SKUs within the portfolio, diluting overall realized margins even if total unit volume grew",
        "Suppliers increased raw material costs",
        "Foreign currency exchange rates depreciated"
      ],
      correctIdx: 1,
      explanation: "A negative Mix Effect indicates a portfolio shift toward lower-priced or lower-margin SKUs, eroding overall profit margins despite overall unit growth."
    },
    hasSimulator: "corporate-modeling"
  },

  "commercial-waterfall-bridge-charts": {
    slug: "commercial-waterfall-bridge-charts",
    title: "7.3 Commercial Margin Waterfall Bridges & Executive Visual Storytelling",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Executive Margin Waterfall Bridges

#### Visualizing Variance Drivers for the C-Suite
Senior executives refuse to read dense 50-row variance tables. They require an **Executive Waterfall Bridge**:
* **Starting Bar**: Prior Year Gross Profit (e.g. ৳120M).
* **Positive Green Pillars**: +Volume Effect (+৳18M), +Price Effect (+৳12M).
* **Negative Red Pillars**: -Adverse Mix Shift (-৳6M), -Raw Material Inflation (-৳14M).
* **Ending Bar**: Current Year Gross Profit (৳130M).
* Every pillar ties out mathematically to the penny.`,
    quiz: {
      question: "In an executive gross margin waterfall bridge chart, what do the intermediate floating pillars represent?",
      options: [
        "Unpaid employee vacation days",
        "The isolated quantitative drivers (Price Effect, Volume Growth, Mix Shift, Cost Inflation) that explain the bridge between Prior Year and Current Year Profit",
        "Random statistical error distributions",
        "Future stock option valuations"
      ],
      correctIdx: 1,
      explanation: "The intermediate floating pillars isolate individual variance drivers, showing executive leadership exactly which operational components created or destroyed profit."
    },
    hasSimulator: "corporate-modeling"
  },

  "reconciling-margin-dilution-fmcg": {
    slug: "reconciling-margin-dilution-fmcg",
    title: "7.4 Case Study: Diagnosing Margin Contraction in Unilever / BAT Portfolios",
    xpReward: 50,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Case Study: Diagnosing Margin Dilution in FMCG Portfolios

#### The Authentic Corporate Challenge
You are given actual historical sales performance data for a multi-category personal care brand in Bangladesh.
* Revenue increased from ৳450M to ৳510M (+13.3%).
* Gross Margin dropped from 38.5% to 33.1% (-540 bps).
* **Your Analysis**: Perform PVM decomposition by SKU and channel to present recommendations to the Commercial Finance Director regarding SKU price corridors and discount rationalization.`,
    quiz: {
      question: "When presenting a commercial PVM diagnosis to an FMCG Leadership Team, what should be the primary strategic recommendation if analysis reveals a severe negative Mix Effect?",
      options: [
        "Immediately cease all manufacturing operations",
        "Rebalance promotional trade spend toward high-margin premium SKUs and enforce minimum price floors on dilutive economy SKUs",
        "Cut product quality to save money",
        "Fire the entire accounting team"
      ],
      correctIdx: 1,
      explanation: "A severe negative mix calls for targeted commercial interventions: curbing promotional subsidies on low-margin SKUs while re-allocating trade spend and marketing toward premium, margin-accretive products."
    },
    hasSimulator: "corporate-modeling"
  },

  "mini-project-2-pvm-variance-engine": {
    slug: "mini-project-2-pvm-variance-engine",
    title: "7.5 Mini-Project 2: Commercial PVM & Margin Waterfall Engine (25k+ Ledger Rows)",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Mini-Project 2: Commercial PVM Engine (25,000+ Rows)

#### Applied Enterprise Assignment
Using a 2-year transactional sales dataset containing 25,000+ rows across 45 SKUs and 3 distribution channels:
1. Ingest and aggregate the data using Power Query.
2. Build an automated PVM variance calculation engine.
3. Generate dynamic waterfall bridge charts by product category and geographic sales division.
4. Synthesize findings into a 1-page executive commercial briefing.`,
    quiz: {
      question: "What is the key deliverable evaluated in Mini-Project 2?",
      options: [
        "A written essay on the history of spreadsheets",
        "An automated Excel PVM calculation model that dynamically decomposes 25,000+ ledger rows into Price, Volume, and Mix variance bridges with linked waterfall charts",
        "A static screenshot of a PivotTable",
        "A handwritten ledger book"
      ],
      correctIdx: 1,
      explanation: "Mini-Project 2 requires building an auditable, automated PVM decomposition engine that processes raw enterprise sales ledgers and generates dynamic visual bridges for senior leadership."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 8: CUSTOMER ECONOMICS & SKU PROFITABILITY
  // ═══════════════════════════════════════════════════════════════
  "distributor-margin-waterfalls": {
    slug: "distributor-margin-waterfalls",
    title: "8.1 Distributor Margin Waterfalls & Trade Terms Economics (GSV down to NSV)",
    xpReward: 55,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Distributor Margin Waterfalls & Trade Terms Economics

#### The Trade Spend Waterfall:
* **Gross Sales Value (GSV)**: Sticker list price.
* **Less: On-Invoice Discounts**: Direct trade discounts given at invoicing (e.g. 5% cash settlement).
* **Less: Distributor Margins**: Standard wholesaler allowance (e.g. 6% to 8%).
* **Less: Off-Invoice Rebates**: Retrospective performance incentives, volume rebates, annual rebates.
* **Less: Promotional Allowances**: Co-op marketing subsidies, shelf-space rental in modern trade (e.g. Shwapno, Meena Bazar).
* **Equals: Net Sales Value (NSV)**: The actual realized top-line revenue of the manufacturer.`,
    quiz: {
      question: "In commercial FMCG trade terms, what distinguishes an 'On-Invoice Discount' from an 'Off-Invoice Rebate'?",
      options: [
        "On-invoice is deducted directly on the initial billing invoice, whereas off-invoice rebates are settled retrospectively based on volume milestones or performance targets",
        "Off-invoice rebates are illegal under tax law",
        "On-invoice discounts apply only to foreign currencies",
        "There is no distinction"
      ],
      correctIdx: 0,
      explanation: "On-invoice discounts reduce billing directly at checkout. Off-invoice rebates are accrued in balance sheet provisions and paid out quarterly or annually upon verifying distributor sales volume targets."
    },
    hasSimulator: "corporate-modeling"
  },

  "trade-spend-promotions-roi": {
    slug: "trade-spend-promotions-roi",
    title: "8.2 On-Invoice Discounts, Wholesale Rebates & Trade Promotion ROI Modeling",
    xpReward: 60,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Trade Promotion ROI Modeling

#### Measuring Promotion Effectiveness
Trade promotions absorb 12% to 20% of gross revenue in consumer goods. Modeling Return on Trade Investment (ROTI) ensures spend creates incremental volume rather than funding baseline pantry-loading:
$$\\text{ROTI} = \\frac{\\text{Incremental Gross Margin Generated} - \\text{Total Promotional Spend}}{\\text{Total Promotional Spend}}$$
* If an analyst discovers that a promotional discount subsidizes volume that consumers would have bought anyway (zero baseline elasticity), the promotion destroys economic profit.`,
    quiz: {
      question: "If a trade promotion costs ৳2.0M in discount allowances and generates ৳2.8M in incremental gross margin above baseline sales, what is the Return on Trade Investment (ROTI)?",
      options: [
        "28%",
        "40% [ (৳2.8M - ৳2.0M) / ৳2.0M ]",
        "140%",
        "-15%"
      ],
      correctIdx: 1,
      explanation: "ROTI = (Incremental Margin - Spend) / Spend = (৳2.8M - ৳2.0M) / ৳2.0M = ৳0.8M / ৳2.0M = 40% net return on trade investment."
    },
    hasSimulator: "corporate-modeling"
  },

  "sku-rationalization-contribution": {
    slug: "sku-rationalization-contribution",
    title: "8.3 SKU Rationalization, Direct Product Profitability (DPP) & 80/20 Pareto Rules",
    xpReward: 50,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### SKU Rationalization & Direct Product Profitability (DPP)

#### The Pareto 80/20 Law in Product Portfolios
In most diversified enterprises:
* **The Top 20% of SKUs** generate 80% of total revenue and 110% of operating profit!
* **The Bottom 30% of SKUs (The Long Tail)** destroy profit by consuming factory changeover time, warehouse space, and sales team bandwidth while generating negative contribution margins.
* **DPP Modeling**: Subtract direct freight, storage, and handling costs per SKU to calculate Direct Product Profitability and recommend portfolio pruning.`,
    quiz: {
      question: "Why should an enterprise rationalise and discontinue SKUs in the bottom 20% of its portfolio that have negative direct contribution margins?",
      options: [
        "To make the product catalogue look shorter",
        "Because keeping them consumes factory machine line-changeover time, warehouse working capital, and sales bandwidth while destroying cash",
        "Because Excel cannot track more than 10 SKUs",
        "To eliminate the need for distributors"
      ],
      correctIdx: 1,
      explanation: "Pruning negative-contribution SKUs frees up manufacturing line time for profitable core products, reduces working capital drag, and expands overall company EBITDA."
    },
    hasSimulator: "corporate-modeling"
  },

  "channel-profitability-modern-vs-traditional": {
    slug: "channel-profitability-modern-vs-traditional",
    title: "8.4 Channel Economics: Modern Trade vs Traditional Wholesale vs E-Commerce",
    xpReward: 55,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Channel Profitability & Distribution Economics

#### Comparative Channel Profiles:
1. **Traditional Trade (General Trade / Wholesale)**:
   * Higher gross margins, lower listing fees, but high credit risk and multi-tier distributor allowances.
2. **Modern Trade (Supermarkets & Hypermarkets)**:
   * Demands heavy listing fees, mandatory off-invoice rebates, and long credit terms (DSO 60–90 days), but offers high brand visibility and volume.
3. **E-Commerce Direct-to-Consumer (D2C)**:
   * High gross margin capture, but burdened by customer acquisition costs (CAC) and last-mile delivery expenses.`,
    quiz: {
      question: "Which distribution channel typically demands substantial listing fees (slotting allowances) and extended payment terms (60-90 days DSO)?",
      options: [
        "Traditional rural wholesale",
        "Modern Trade (Supermarket chains)",
        "Cash-on-delivery retail",
        "Direct employee sales"
      ],
      correctIdx: 1,
      explanation: "Modern trade chains leverage premium retail shelf space to negotiate aggressive payment terms, slotting allowances, and retrospective volume rebates."
    },
    hasSimulator: "corporate-modeling"
  },

  "mod8-commercial-deal-pricing-case": {
    slug: "mod8-commercial-deal-pricing-case",
    title: "8.5 Module 8 Commercial Deal Structuring & Discount Floor Evaluation",
    xpReward: 75,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Module 8 Challenge: Commercial Deal Pricing & Discount Floors

#### Scenario Brief
A major supermarket chain offers to purchase 50,000 cases of your flagship product, demanding a 15% discount off invoice and 75-day payment terms.
* **Your Task**: Model the net realized margin, evaluate the working capital financing cost of the 75-day credit extension, and determine the walk-away break-even price floor.`,
    quiz: {
      question: "In evaluating a commercial deal, why must the cost of working capital be incorporated into the deal margin evaluation?",
      options: [
        "Because extended payment terms require bank overdraft funding, which incurs interest expense that directly erodes the net profitability of the transaction",
        "Because customers do not like credit terms",
        "Because discounts are tax-deductible",
        "To comply with printer margin requirements"
      ],
      correctIdx: 0,
      explanation: "Granting extended credit terms (e.g. 75 days) forces the company to finance production using working capital lines. The interest carrying cost must be deducted from deal gross margin to measure true net return."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 9: CORPORATE FP&A: ROLLING FORECASTS & DASHBOARDS
  // ═══════════════════════════════════════════════════════════════
  "rolling-12-month-forecast-architecture": {
    slug: "rolling-12-month-forecast-architecture",
    title: "9.1 Rolling 12-Month Forecasts: Splicing YTD Actuals with Rest-of-Year Projections",
    xpReward: 60,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### The Rolling 12-Month FP&A Forecast Architecture

#### Moving Beyond Static Annual Budgets
Traditional corporate budgets expire the moment Q1 closes. Modern FP&A teams maintain continuous **Rolling 12-Month Forecasts**:
* **The Splicing Engine**:
  * Columns where $\\text{Period Date} \\le \\text{Cutoff Date}$: Populate automatically from **YTD Actuals**.
  * Columns where $\\text{Period Date} > \\text{Cutoff Date}$: Populate automatically with **Dynamic Projections (ROY - Rest of Year)**.
  \`\`\`excel
  =IF(Column_Date <= Cutoff_Date, Actual_Schedule, Forecast_Schedule)
  \`\`\`
* The projection horizon rolls forward by one month each time accounting closes, maintaining perpetual visibility into the next 4 to 6 quarters.`,
    quiz: {
      question: "What is the primary operational advantage of a Rolling 12-Month Forecast over a static annual budget?",
      options: [
        "It eliminates the need to record historical accounting data",
        "It perpetually updates future performance horizons by splicing actual results with forward projections, eliminating the year-end 'cliff' of static annual budgets",
        "It guarantees that company stock price will increase",
        "It reduces staff headcount by 50%"
      ],
      correctIdx: 1,
      explanation: "Rolling forecasts replace rigid static budgets with continuous 12-to-18-month visibility, allowing leadership to adapt operational plans dynamically as economic conditions evolve."
    },
    hasSimulator: "corporate-modeling"
  },

  "run-rate-seasonality-indices": {
    slug: "run-rate-seasonality-indices",
    title: "9.2 Trailing Run-Rates, Seasonality Indices & Operating Expense Forecasting",
    xpReward: 55,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Trailing Run-Rates & OPEX Forecasting

#### The Trailing Three-Month (T3M) Run-Rate
For operating expenses (utilities, travel, maintenance), a trailing moving average reflects recent inflation and operational run-rate better than last year's outdated budget:
$$\\text{T3M Run-Rate} = \\frac{\\text{Actual}_{t} + \\text{Actual}_{t-1} + \\text{Actual}_{t-2}}{3}$$
* Project forward using T3M multiplied by monthly seasonality adjustments.`,
    quiz: {
      question: "Why do FP&A analysts utilize Trailing Three-Month (T3M) run-rates when forecasting operating expenses during inflationary periods?",
      options: [
        "Because Excel cannot calculate 12-month averages",
        "Because T3M captures recent price inflation and operating cost realities much more accurately than 12-month-old historical averages",
        "Because T3M is mandated by commercial law",
        "To make numbers look smaller"
      ],
      correctIdx: 1,
      explanation: "T3M run-rates give greater weighting to recent operational realities, capturing recent vendor price increases, utility tariff hikes, and current expense velocity."
    },
    hasSimulator: "corporate-modeling"
  },

  "budget-vs-actual-variance-packs": {
    slug: "budget-vs-actual-variance-packs",
    title: "9.3 Plan-vs-Actual Variance Packs with Threshold Alert Flags",
    xpReward: 45,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Monthly Budget vs Actual (BvA) Variance Reporting

#### Variance Analysis Standards:
* **Absolute Variance**: $\\text{Actual} - \\text{Budget}$
* **Percentage Variance**: $\\frac{\\text{Actual} - \\text{Budget}}{\\text{Budget}}$
* **Threshold Highlighting**: Automatically apply conditional formatting to flag variances exceeding $\\pm 5\\%$ or ৳1.0 Million, drawing executive attention directly to material performance gaps.`,
    quiz: {
      question: "In corporate variance reporting, why is it critical to filter variance alerts using both percentage (e.g. > 10%) and absolute materiality thresholds (e.g. > ৳500k)?",
      options: [
        "To prevent minor immaterial line items (e.g. a 200% variance on a ৳1,000 stationery expense) from cluttering executive management attention",
        "Because percentages cannot be displayed on computer monitors",
        "To hide budget deficits from shareholders",
        "Because absolute variance is always zero"
      ],
      correctIdx: 0,
      explanation: "A dual threshold ensures executive management focuses on material risks. A 100% variance on a tiny expense is trivial, whereas a 3% variance on a ৳100M revenue line represents a ৳3M business risk."
    },
    hasSimulator: "corporate-modeling"
  },

  "executive-kpi-dashboard-architecture": {
    slug: "executive-kpi-dashboard-architecture",
    title: "9.4 Executive C-Suite Dashboard Design & Visual Hierarchy Standards",
    xpReward: 65,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Executive KPI Dashboard Design & Visual Hierarchy

#### The 5 Golden Rules of Executive Spreadsheet Design:
1. **Fit on One Screen**: Executives should never scroll horizontally or vertically to view core summary KPIs.
2. **No Visual Clutter**: Ban 3D charts, heavy gridline fills, and garish neon colors. Use clean muted palettes (Charcoal, Slate, Corporate Navy).
3. **Card-Based KPI Callouts**: Large bold metrics with comparative deltas vs Prior Year and Target.
4. **Sparklines for Trend Context**: Embed micro-trendlines alongside numbers without eating layout space.
5. **Dynamic Action Titles**: Use formula-driven headers: \`="Q3 Financial Review: Net Profit Up 14% on Strong FMCG Margin Expansion"\`.`,
    quiz: {
      question: "Which design principle is essential for an Excel executive dashboard presented to C-suite leadership?",
      options: [
        "Include as many 3D pie charts and blinking animations as possible",
        "Fit all key metrics and high-level summaries on a single, non-scrolling screen with clear visual hierarchy, muted professional palettes, and actionable headers",
        "Display raw data tables with 5,000 rows on the front page",
        "Use 8 different font styles"
      ],
      correctIdx: 1,
      explanation: "Executive dashboards must be concise, distraction-free, and legible at a glance on a single screen without scrolling, adhering to clean visual hierarchy and purposeful layout."
    },
    hasSimulator: "corporate-modeling"
  },

  "mini-project-5-rolling-forecast-dashboard": {
    slug: "mini-project-5-rolling-forecast-dashboard",
    title: "9.5 Mini-Project 5: Corporate FP&A Rolling Forecast & Executive Dashboard",
    xpReward: 100,
    duration: "60m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Mini-Project 5: Corporate FP&A Rolling Forecast & Dashboard

#### Applied Project Brief
Build a dynamic 12-month rolling forecast model for a consumer goods conglomerate:
* Ingest closed actuals for Month 1 through Month 6.
* Generate dynamic rest-of-year projections for Month 7 through Month 12 based on T3M run-rates and seasonal indices.
* Construct a 1-page executive C-suite dashboard summarizing Revenue, Gross Margin, EBITDA, Cash Conversion Cycle, and Bank Debt headroom.`,
    quiz: {
      question: "What is the primary deliverable evaluated in Mini-Project 5?",
      options: [
        "A PowerBI file",
        "An auditable Excel rolling forecast model that dynamically splices YTD actuals with forward-looking projections and presents a clean executive dashboard",
        "A handwritten memo",
        "A Python script"
      ],
      correctIdx: 1,
      explanation: "Mini-Project 5 requires an integrated rolling forecast engine in Excel that updates automatically as new monthly periods close, presented via a polished C-suite dashboard."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 10: DYNAMIC SCENARIOS, VALUATION & BUSINESS CASES
  // ═══════════════════════════════════════════════════════════════
  "multi-case-scenario-switch": {
    slug: "multi-case-scenario-switch",
    title: "10.1 Multi-Scenario Architecture: Base, Downside & Upside Toggles (CHOOSE / INDEX)",
    xpReward: 60,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Multi-Scenario Architecture & Centralized Switches

#### Centralized Scenario Control Cell
Never build three duplicate financial models for Base, Upside, and Downside cases! That creates a maintenance nightmare.
* **The Professional Pattern**: Build a **single integrated model** driven by a central **Scenario Control Cell** (e.g. Cell \`C4\` = 1 for Base, 2 for Downside, 3 for Upside).
* **Formula Mechanics**:
  \`\`\`excel
  =CHOOSE(Scenario_ID, Base_Assumption, Downside_Assumption, Upside_Assumption)
  \`\`\`
  Or using \`INDEX\`:
  \`\`\`excel
  =INDEX(Scenario_Assumption_Table, Scenario_ID, Variable_Index)
  \`\`\`
* Changing cell \`C4\` dynamically updates every revenue driver, margin assumption, and debt schedule across the entire 3-statement workbook in real time.`,
    quiz: {
      question: "Why is maintaining a single financial model with a centralized scenario switch (CHOOSE/INDEX) strictly preferred over creating separate Excel workbooks for Base, Bull, and Bear cases?",
      options: [
        "Because multiple workbooks triple maintenance overhead, risk formula desynchronization, and make audits nearly impossible",
        "Because Excel cannot open more than one file at a time",
        "Because hard drives cannot store multiple files",
        "Because scenario switches increase formula calculation speed by 1000%"
      ],
      correctIdx: 0,
      explanation: "Having separate workbooks means any formula fix must be manually replicated across three files, introducing massive audit risk and desynchronization. A single switch maintains formula integrity."
    },
    hasSimulator: "corporate-modeling"
  },

  "two-way-sensitivity-data-tables": {
    slug: "two-way-sensitivity-data-tables",
    title: "10.2 Two-Way Sensitivity Data Tables & Calculation Performance Optimization",
    xpReward: 65,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Two-Way Sensitivity Analysis via Excel Data Tables

#### The What-If Matrix
Board presentations require stress-testing outcomes across two simultaneous variables (e.g. What happens to EBITDA if unit price changes by $\\pm 5\\%$ and raw material inflation changes by $\\pm 10\\%$?).
* **Data Table Setup**:
  * Top-Left Corner Cell: References the output metric (\`=EBITDA_Year5\`).
  * Column Header Row: Range of Price Escalation values.
  * Leftmost Column: Range of Raw Material Inflation values.
  * Execute: **Data -> What-If Analysis -> Data Table**.
  * Row Input Cell = Price Assumption; Column Input Cell = Inflation Assumption.

#### Performance Optimization:
Set Excel calculation options to **Automatic except for Data Tables** (\`Alt + M + X + E\`) to prevent large sensitivity tables from freezing Excel during normal model edits.`,
    quiz: {
      question: "Why should corporate financial modelers configure calculation options to 'Automatic except for Data Tables' when working with large sensitivity matrices?",
      options: [
        "To prevent Data Tables from recalculating on every single keystroke, eliminating performance freezing across large workbooks",
        "Because Data Tables delete formulas if set to Automatic",
        "To reduce internet usage",
        "Because Data Tables only work in manual mode"
      ],
      correctIdx: 0,
      explanation: "Data Tables recalculate the entire workbook multiple times per cell. Setting calculation to 'Automatic except for Data Tables' keeps Excel fast while allowing manual updates on demand."
    },
    hasSimulator: "corporate-modeling"
  },

  "dcf-fcff-valuation-mechanics": {
    slug: "dcf-fcff-valuation-mechanics",
    title: "10.3 Unlevered Free Cash Flow (FCFF), WACC & Terminal Value Calculations",
    xpReward: 65,
    duration: "55m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### DCF Valuation & Free Cash Flow to Firm (FCFF)

#### Calculating Unlevered Free Cash Flow (FCFF):
$$\\text{FCFF} = \\text{EBIT} \\times \\left(1 - t\\right) + \\text{D\\&A} - \\text{Capex} - \\Delta \\text{Non-Cash Working Capital}$$

#### Weighted Average Cost of Capital (WACC):
$$\\text{WACC} = \\left( \\frac{E}{V} \\times K_e \\right) + \\left( \\frac{D}{V} \\times K_d \\times (1 - t) \\right)$$

#### Terminal Value (TV):
* **Gordon Growth Method**:
  $$\\text{Terminal Value} = \\frac{\\text{FCFF}_{n} \\times (1 + g)}{\\text{WACC} - g}$$
* **Enterprise Value to Equity Value Bridge**:
  $$\\text{Equity Value} = \\text{Enterprise Value (PV of Cash Flows + PV of TV)} + \\text{Cash} - \\text{Total Debt}$$`,
    quiz: {
      question: "When calculating Unlevered Free Cash Flow (FCFF), why is interest expense excluded from the calculation?",
      options: [
        "Because interest expense is not paid in cash",
        "Because FCFF represents cash flow available to ALL capital providers (both debt and equity holders) before any financing distributions are made",
        "Because interest expense is illegal under IFRS",
        "To make the valuation higher"
      ],
      correctIdx: 1,
      explanation: "FCFF measures the cash generated by core operations available to all capital providers. The cost of debt is captured in the discount rate (WACC) rather than subtracted from FCFF."
    },
    hasSimulator: "corporate-modeling"
  },

  "capital-budgeting-npv-irr-payback": {
    slug: "capital-budgeting-npv-irr-payback",
    title: "10.4 Capital Investment Appraisal: NPV, IRR, Payback & Facility Expansion",
    xpReward: 60,
    duration: "50m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Capital Budgeting: NPV, IRR & Payback Timelines

#### Evaluating Corporate Capital Expenditure:
1. **Net Present Value (NPV)**:
   $$\\text{NPV} = \\sum_{t=0}^{n} \\frac{\\text{CF}_t}{(1 + r)^t}$$
   * Decision Rule: Accept project if $\\text{NPV} > 0$.
2. **Internal Rate of Return (IRR)**: The discount rate that equates NPV to exactly zero.
   * Decision Rule: Accept if $\\text{IRR} > \\text{Hurdle Rate (WACC)}$.
3. **Discounted Payback Period**: The exact period when cumulative discounted cash flows recover initial Capex.`,
    quiz: {
      question: "If a proposed plant expansion project has an IRR of 18.5% and the company's cost of capital (hurdle rate) is 12.0%, what is the economic capital allocation verdict?",
      options: [
        "Reject the project because IRR is too high",
        "Accept the project because IRR exceeds the hurdle rate, generating economic surplus for shareholders (NPV > 0)",
        "Postpone indefinitely",
        "Cut product prices by 18.5%"
      ],
      correctIdx: 1,
      explanation: "When a project's Internal Rate of Return exceeds the corporate hurdle rate (cost of capital), the investment creates positive Net Present Value (NPV) and enhances shareholder equity."
    },
    hasSimulator: "corporate-modeling"
  },

  "tier-3-mid-program-challenge": {
    slug: "tier-3-mid-program-challenge",
    title: "10.5 Tier 3: 2-Hour Timed Modeling Challenge (Module 1-5 Comprehensive)",
    xpReward: 150,
    duration: "120m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Tier 3 Assessment: 2-Hour Timed Modeling Challenge

#### Purpose & Proctored Execution
Evaluates end-to-end modeling speed and formula hygiene halfway through the curriculum:
* You receive an unstructured narrative brief and unformatted historical accounts.
* You have exactly 120 minutes to clean the data in Power Query, construct operational P×Q schedules, build an integrated 3-statement forecast, and balance the balance sheet to zero without plugs.
* Passing benchmark: 75% scaled score graded by the automated test engine.`,
    quiz: {
      question: "What is the primary assessment objective of the 2-Hour Mid-Program Timed Challenge?",
      options: [
        "To test how many PowerPoint slides you can design",
        "To evaluate whether you can build a fully integrated, dynamically balanced 3-statement model from raw data under strict time constraints without using balancing plugs",
        "To test your typing speed in Microsoft Word",
        "To evaluate social media marketing"
      ],
      correctIdx: 1,
      explanation: "The mid-program challenge validates unassisted execution speed, formula hygiene, and accounting integrity under realistic assessment center pressure."
    },
    hasSimulator: "corporate-modeling"
  },

  "tier-4-afm-proctored-live-build": {
    slug: "tier-4-afm-proctored-live-build",
    title: "10.6 Tier 4: 4-Hour Proctored Live Blank-Sheet Build Exam",
    xpReward: 300,
    duration: "240m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Tier 4 Proctored Live Build Exam (FMI AFM Benchmark)

#### The Gold Standard of Financial Modeling Competence
Modeled directly on the Financial Modeling Institute's (FMI) **Advanced Financial Modeler (AFM)** proctored accreditation:
* **Format**: 4 Hours under virtual proctoring.
* **Starting State**: Blank Excel Workbook (\`Book1.xlsx\`).
* **Requirements**:
  * Clean layout separating Inputs, Calculations, Outputs.
  * Strict adherence to FAST standards and 'One Formula per Row' discipline.
  * Reconciled indirect Cash Flow Statement with working capital, Capex, and debt schedules.
  * Centralized scenario toggles (Base, Downside, Upside) and executive summary page formatted for 1-page PDF print.
  * Evaluated by senior corporate finance practitioners against an objective rubric.`,
    quiz: {
      question: "In the 4-Hour AFM-Style Live Build Exam, how are submitted candidate models evaluated?",
      options: [
        "Purely through automated multiple-choice tests",
        "By senior corporate finance modelers grading accounting integrity, FAST formula hygiene, dynamic scenario switching, and zero-plug balancing against institutional rubrics",
        "By how colorful the chart background fills are",
        "Based on student attendance records"
      ],
      correctIdx: 1,
      explanation: "Unlike superficial multiple-choice certifications, the live build exam is rigorously graded on model architecture, formula discipline, balance sheet reconciliation, and dynamic scenario integration."
    },
    hasSimulator: "corporate-modeling"
  },

  "tier-5-executive-model-defense": {
    slug: "tier-5-executive-model-defense",
    title: "10.7 Tier 5: 30-Minute Oral Capstone Model Defense Before Executive Panel",
    xpReward: 200,
    duration: "45m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Tier 5 Assessment: The Executive Oral Model Defense

#### Defending Your Financial Model Before the C-Suite
Upon completing your Enterprise Capstone, you present your model in a 30-minute live oral defense before a panel of corporate finance directors and hiring partners:

1. **Strategic Walkthrough (10 Minutes)**:
   * Present core business findings and defend revenue drivers, margin bridges, and liquidity forecasts using an executive slide pack.
2. **Live Stress-Testing & Q&A (15 Minutes)**:
   * The panel asks unexpected scenario challenges:
     *"The central bank increases interest rates by 300 bps and key raw materials inflate by 18%. Update your model live and explain the impact on our debt service coverage ratio."*
   * You must navigate the workbook using keyboard shortcuts, modify scenario parameters live, and explain the financial outcomes.
3. **Formula & Architecture Review (5 Minutes)**:
   * The panel audits formula hygiene, checking for hardcoded formulas, circular locks, and FAST compliance.`,
    quiz: {
      question: "During the 30-Minute Oral Model Defense, what is the candidate required to demonstrate when the panel asks for a live stress-test adjustment?",
      options: [
        "Explain that they cannot touch the model after submission",
        "Navigate the workbook live using keyboard shortcuts, adjust scenario drivers cleanly, and articulate the resulting balance sheet and cash flow implications to the panel",
        "Ask the panel to calculate the numbers themselves",
        "Restart the computer"
      ],
      correctIdx: 1,
      explanation: "The live defense proves that the candidate understands the mechanical and strategic workings of their model, proving day-one operational competence to executive employers."
    },
    hasSimulator: "corporate-modeling"
  },

  "ccfcm-career-passport-issuance": {
    slug: "ccfcm-career-passport-issuance",
    title: "10.8 CCFCM Designation Credentialing & Verified Career Passport Issuance",
    xpReward: 100,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Certified Corporate Financial & Commercial Modeler (CCFCM) Credential

#### The INSYT Career Passport
Candidates who successfully pass all 5 Assessment Tiers earn:
* **The CCFCM Designation**: Certified Corporate Financial & Commercial Modeler.
* **The INSYT Career Passport**: An auditable digital repository containing:
  * Your verified 4-Hour Live Build Excel workbook.
  * Your Capstone project repository and recorded Oral Defense transcript.
  * Your verified competency score across the 10 core corporate modeling dimensions.
* **Corporate Employer Indexing**: Direct profile access provided to corporate hiring partners across FMCG, Telecommunications, Commercial Banking, and Industrial Conglomerates.`,
    quiz: {
      question: "What makes the INSYT Career Passport and CCFCM designation significantly more valuable to corporate recruiters than a standard certificate of completion?",
      options: [
        "It comes printed on laminated gold paper",
        "It provides recruiters with an auditable portfolio containing verified workbook code, defense evaluations, and empirical competency proof rather than unverified course attendance",
        "It guarantees an automatic government job",
        "It can be used as a travel passport"
      ],
      correctIdx: 1,
      explanation: "The Career Passport provides verifiable, auditable proof of day-one modeling capability, including actual workbooks, proctored build grades, and recorded model defenses."
    },
    hasSimulator: "corporate-modeling"
  },

  // ═══════════════════════════════════════════════════════════════
  // LEGACY ALIASES FOR COMPATIBILITY WITH PREVIOUS ROUTE SLUGS
  // ═══════════════════════════════════════════════════════════════
  "formula-architecture": {
    slug: "formula-architecture",
    title: "Non-Breaking Formula Design Principles (FAST Standard)",
    xpReward: 60,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Non-Breaking Formula Architecture (FAST Standard)
Adhere to the 'One Formula per Row' discipline, isolate global assumptions with absolute referencing ($A$1), and ensure models never break upon timeline extension.`,
    quiz: {
      question: "What is the primary rule for non-breaking formula architecture across corporate forecast timelines?",
      options: [
        "Vary formulas across columns",
        "Maintain identical formula logic across all time-series forecast columns",
        "Hardcode growth numbers into cell formulas",
        "Hide rows containing errors"
      ],
      correctIdx: 1,
      explanation: "Identical formula logic across forecast columns ensures consistent auditability and prevents silent formula bugs."
    },
    hasSimulator: "corporate-modeling"
  },
  "dynamic-arrays": {
    slug: "dynamic-arrays",
    title: "Dynamic Arrays in Corporate Reporting",
    xpReward: 60,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Dynamic Arrays in Corporate Reporting
Harness FILTER, UNIQUE, SORT, and SEQUENCE to construct self-updating corporate reporting blocks.`,
    quiz: {
      question: "What does the spilled range operator (#) do in Excel dynamic array formulas?",
      options: [
        "Deletes the array",
        "Dynamically references the entire spilled range originating from the parent cell",
        "Converts numbers to text",
        "Calculates square roots"
      ],
      correctIdx: 1,
      explanation: "Referencing A2# captures the entire dynamic spill range produced by cell A2 automatically."
    },
    hasSimulator: "corporate-modeling"
  },
  "data-sanitization": {
    slug: "data-sanitization",
    title: "Sanitizing Corrupted ERP Exports with Power Query",
    xpReward: 70,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Sanitizing Corrupted ERP Exports with Power Query
Automate the ingestion and normalization of ERP exports, eliminating dirty dates and unpivoting cross-tabulated reports.`,
    quiz: {
      question: "Which Power Query feature transforms multi-month wide reports into tall database tables?",
      options: [
        "Merge Queries",
        "Unpivot Columns",
        "Transpose Data",
        "Group By"
      ],
      correctIdx: 1,
      explanation: "Unpivot Columns transforms wide presentation columns into normalized attribute/value pairs."
    },
    hasSimulator: "messy-data"
  },
  "working-capital-cycles": {
    slug: "working-capital-cycles",
    title: "Cash Conversion Cycle Modeling (DSO, DIO, DPO)",
    xpReward: 65,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Cash Conversion Cycle Modeling
Model Accounts Receivable, Inventory, and Accounts Payable turnover days to forecast operational liquidity.`,
    quiz: {
      question: "How is the Cash Conversion Cycle (CCC) calculated?",
      options: [
        "CCC = DSO + DIO + DPO",
        "CCC = DSO + DIO - DPO",
        "CCC = Revenue - COGS",
        "CCC = Net Income / Assets"
      ],
      correctIdx: 1,
      explanation: "CCC = DSO + DIO - DPO represents the net days cash is tied up in operating activities."
    },
    hasSimulator: "corporate-modeling"
  },
  "dso-dio-reconciliation": {
    slug: "dso-dio-reconciliation",
    title: "Aging Schedule & DSO Sensitivities",
    xpReward: 65,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Aging Schedules & DSO Sensitivities
Quantify cash unlocked by customer collection improvements and stress-test delinquent debtor risks.`,
    quiz: {
      question: "What is the cash impact of improving customer collection velocity by 10 days?",
      options: [
        "Cash is trapped in receivables",
        "Releases operating cash from the balance sheet equal to (Annual Revenue * 10 / 365)",
        "Increases bank debt",
        "Zero impact"
      ],
      correctIdx: 1,
      explanation: "Reducing DSO accelerates cash inflows and frees balance sheet capital."
    },
    hasSimulator: "corporate-modeling"
  },
  "3-statement-integration": {
    slug: "3-statement-integration",
    title: "Balancing the Balance Sheet Auditably Without Plugs",
    xpReward: 80,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Balancing the Balance Sheet Auditably
Integrate Income Statement, Balance Sheet, and Cash Flow Statement dynamically with zero circular plugs.`,
    quiz: {
      question: "How should an integrated 3-statement model achieve balance?",
      options: [
        "By plugging the difference into Cash",
        "Through dynamic indirect cash flow reconciliation linking net income, non-cash items, and balance sheet movements",
        "By overriding assets with total liabilities",
        "By ignoring the balance sheet"
      ],
      correctIdx: 1,
      explanation: "True balance is achieved through accounting linkage via the cash flow statement, never artificial plugs."
    },
    hasSimulator: "corporate-modeling"
  },
  "capstone-defense": {
    slug: "capstone-defense",
    title: "Executive Model Presentation & Defense",
    xpReward: 100,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Executive Model Defense & Live Stress-Testing
Present and defend financial model assumptions before corporate finance leaders and navigate live scenario stress-tests.`,
    quiz: {
      question: "What is the primary evaluation criteria during an executive model defense?",
      options: [
        "Reading slides word-for-word",
        "Demonstrating model auditability, explaining strategic drivers, and executing live keyboard scenario stress-tests",
        "Wearing a suit",
        "Finishing in under 2 minutes"
      ],
      correctIdx: 1,
      explanation: "The defense evaluates strategic synthesis, formula hygiene, and live scenario navigation under pressure."
    },
    hasSimulator: "corporate-modeling"
  }
};
