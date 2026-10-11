export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: "Quant" | "Verbal" | "Analytical" | "Finance" | "General Knowledge";
}

export interface MockTestDetail {
  id: string;
  title: string;
  category: "Aptitude" | "Technical" | "Case" | "Finance" | "General";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  durationMins: number;
  negativeMarking: number;
  xpReward?: number; // legacy compatibility
  description: string;
  competencyPillar: "Cognitive" | "Technical" | "Case" | "Finance";
  questions: Question[];
}

export const MOCK_TESTS_DATABASE: Record<string, MockTestDetail> = {
  "mto-cognitive-aptitude": {
    id: "mto-cognitive-aptitude",
    title: "MTO Standardized Cognitive Aptitude Assessment",
    category: "Aptitude",
    competencyPillar: "Cognitive",
    difficulty: "Intermediate",
    durationMins: 25,
    negativeMarking: 0.25,
    description: "Standardized cognitive benchmark measuring Quantitative Reasoning, Verbal Logic, and Data Interpretation for corporate Management Trainee tracks.",
    questions: [
      {
        id: 1,
        question: "A manufacturing division produced 12,000 units in Q1 with a defective rate of 4.5%. After recalibrating automated tooling, Q2 production rose by 25% while defects dropped to 2.4%. What was the net change in total defective units produced?",
        options: [
          "Defects increased by 60 units",
          "Defects decreased by 180 units",
          "Defects decreased by 90 units",
          "Defects remained identical"
        ],
        correct: 1,
        explanation: "Q1 defects: 12,000 * 0.045 = 540 units. Q2 total production: 12,000 * 1.25 = 15,000 units. Q2 defects: 15,000 * 0.024 = 360 units. Net change: 360 - 540 = -180 units (decreased by 180).",
        category: "Quant"
      },
      {
        id: 2,
        question: "Statement: 'All high-margin consumer brands in our portfolio require direct-to-consumer distribution.' Fact: Brand Z operates exclusively through multi-tier wholesale distributors. Which logical conclusion is strictly valid?",
        options: [
          "Brand Z has negative operating margins.",
          "Brand Z is not a high-margin consumer brand in our portfolio.",
          "Brand Z will convert to direct-to-consumer next quarter.",
          "Wholesale distribution generates higher margins than direct-to-consumer."
        ],
        correct: 1,
        explanation: "By Modus Tollens: If High-Margin (P) implies Direct-to-Consumer (Q), then Not Q (not direct-to-consumer) strictly implies Not P (Brand Z is not a high-margin brand).",
        category: "Analytical"
      },
      {
        id: 3,
        question: "A company's gross revenue grew by 15% year-on-year, but its cost of goods sold (COGS) increased by 22%. If COGS was initially 60% of gross revenue, how did the gross profit margin change?",
        options: [
          "Gross margin contracted from 40.0% to 36.3%",
          "Gross margin remained constant at 40.0%",
          "Gross margin contracted from 40.0% to 32.5%",
          "Gross margin improved to 42.1%"
        ],
        correct: 0,
        explanation: "Assume Base Revenue = 100, Base COGS = 60, Base Gross Profit = 40 (Margin = 40%). New Revenue = 115. New COGS = 60 * 1.22 = 73.2. New Gross Profit = 115 - 73.2 = 41.8. New Margin = 41.8 / 115 ≈ 36.35%.",
        category: "Quant"
      },
      {
        id: 4,
        question: "Select the word pair that best expresses a relationship analogous to: ARBITRATION : DISPUTE",
        options: [
          "Negotiation : Agreement",
          "Adjudication : Contract",
          "Mediation : Conflict",
          "Litigation : Precedent"
        ],
        correct: 2,
        explanation: "Arbitration is a formalized process intended to resolve a dispute; mediation is a formalized process intended to resolve a conflict.",
        category: "Verbal"
      },
      {
        id: 5,
        question: "In a nationwide retail survey of 450 outlets, 60% carry Product A and 70% carry Product B. What is the minimum possible percentage of outlets that carry both products?",
        options: [
          "20%",
          "30%",
          "35%",
          "42%"
        ],
        correct: 1,
        explanation: "By set theory: P(A ∩ B) = P(A) + P(B) - P(A ∪ B). The minimum intersection occurs when the union is 100%: 60% + 70% - 100% = 30%.",
        category: "Analytical"
      }
    ]
  },
  "excel-commercial-modeling": {
    id: "excel-commercial-modeling",
    title: "Corporate Excel & Commercial Modeling Practical Test",
    category: "Technical",
    competencyPillar: "Technical",
    difficulty: "Advanced",
    durationMins: 30,
    negativeMarking: 0.25,
    description: "Evaluates production-grade formula architecture, working capital schedules, dynamic arrays, and auditable operating models.",
    questions: [
      {
        id: 1,
        question: "In financial modeling, why is XLOOKUP strictly preferred over legacy VLOOKUP for dynamic operating dashboards?",
        options: [
          "XLOOKUP calculates faster because it uses 16-bit integer indexing.",
          "XLOOKUP defaults to exact match and does not break when new columns are inserted between lookup and return arrays.",
          "VLOOKUP is deprecated in Excel 2021 and produces runtime errors.",
          "XLOOKUP automatically converts text values to financial currency."
        ],
        correct: 1,
        explanation: "XLOOKUP separates the lookup vector from the return vector, preventing silent formula corruption when columns are added or reordered, and defaults to exact match without requiring FALSE argument.",
        category: "Finance"
      },
      {
        id: 2,
        question: "A corporate retailer has Annual Revenue of ৳720M with 60 Days Sales Outstanding (DSO) based on a 360-day year. What is the expected ending Accounts Receivable balance?",
        options: [
          "৳120M",
          "৳60M",
          "৳90M",
          "৳144M"
        ],
        correct: 0,
        explanation: "DSO = (Accounts Receivable / Annual Revenue) * 360. Therefore: Accounts Receivable = (DSO * Annual Revenue) / 360 = (60 * 720M) / 360 = ৳120M.",
        category: "Finance"
      },
      {
        id: 3,
        question: "Which Excel dynamic array formula correctly returns a sorted list of unique corporate clients whose total annual invoice volume in column C exceeds ৳1,000,000 (Clients in column B)?",
        options: [
          "=SORT(UNIQUE(FILTER(B2:B100, C2:C100 > 1000000)))",
          "=FILTER(SORT(B2:B100), UNIQUE(C2:C100) > 1000000)",
          "=UNIQUE(INDEX(B2:B100, MATCH(1000000, C2:C100, 1)))",
          "=SORTBY(B2:B100, C2:C100 > 1000000)"
        ],
        correct: 0,
        explanation: "=SORT(UNIQUE(FILTER(B2:B100, C2:C100 > 1000000))) filters the candidate client range first by criterion, eliminates duplicates, and sorts alphabetically.",
        category: "Analytical"
      },
      {
        id: 4,
        question: "When structuring an auditable 3-statement financial model, which balance sheet line item directly connects to the bottom-line Cash flow from Financing in the cash flow statement?",
        options: [
          "Property, Plant & Equipment (PP&E)",
          "Retained Earnings",
          "Short-term and Long-term Debt Balances",
          "Accounts Payable"
        ],
        correct: 2,
        explanation: "Debt issuances and debt principal repayments are recorded under Cash Flow from Financing, which directly drives the ending Debt balance on the Balance Sheet.",
        category: "Finance"
      },
      {
        id: 5,
        question: "In commercial Price-Volume-Mix (PVM) variance analysis, which mathematical formula correctly isolates the pure 'Price Effect' on revenue across product lines?",
        options: [
          "Price Effect = ∑(Actual Price - Prior Price) * Actual Volume",
          "Price Effect = (Total Actual Volume - Total Prior Volume) * Prior Average Price",
          "Price Effect = Actual Revenue * Inflation Index",
          "Price Effect = (Actual Price / Prior Price) - 1"
        ],
        correct: 0,
        explanation: "Price Effect = ∑(P_act - P_prior) * Q_act isolates the pure monetary impact of realized price movements, evaluated across actual delivered unit volume.",
        category: "Finance"
      },
      {
        id: 6,
        question: "A company operates with DSO = 45 days, DIO = 55 days, and DPO = 30 days. If credit controllers successfully negotiate supplier payment terms to increase DPO to 45 days, what is the new Cash Conversion Cycle (CCC)?",
        options: [
          "70 Days",
          "55 Days",
          "85 Days",
          "40 Days"
        ],
        correct: 1,
        explanation: "Cash Conversion Cycle (CCC) = DSO + DIO - DPO = 45 + 55 - 45 = 55 days. Lengthening supplier terms reduces working capital financing requirements by 15 days.",
        category: "Finance"
      },
      {
        id: 7,
        question: "Under the international FAST Modeling Standard, why is the 'One Formula per Row' rule strictly mandated across time-series projection schedules?",
        options: [
          "To allow Excel files to fit onto USB flash drives",
          "Varying formulas midway across columns obscures logic and introduces silent, undetected calculation errors during model audits",
          "Because Excel macros crash if multiple formulas exist on one sheet",
          "To force compatibility with Google Sheets"
        ],
        correct: 1,
        explanation: "The FAST standard mandates that a single formula logic apply across all forecast periods in a row. Period-specific adjustments must be governed by dynamic date flags, not altered formulas.",
        category: "Finance"
      },
      {
        id: 8,
        question: "Why should a corporate financial model employ an explicit On/Off Circularity Breaker Switch rather than relying solely on Excel's 'Iterative Calculation' mode?",
        options: [
          "Iterative calculation mode suppresses legitimate circular references across unrelated sheets, making model corruption undetectable",
          "Iterative calculations are prohibited under corporate tax law",
          "Switches increase processor speed by 800%",
          "Iterative calculation rounds all decimal numbers to the nearest integer"
        ],
        correct: 0,
        explanation: "Iterative calculation hides all circular errors globally. A dedicated circuit breaker switch enables modelers to toggle between average-balance interest and static beginning-balance interest cleanly during audits.",
        category: "Finance"
      },
      {
        id: 9,
        question: "If an industrial conglomerate purchases ৳100M of automated manufacturing machinery with a 10-year useful life, how does the Year 1 straight-line depreciation impact EBITDA versus Operating Profit (EBIT)?",
        options: [
          "Both EBITDA and EBIT drop by ৳10M",
          "EBITDA is completely unaffected (৳0 impact) while EBIT decreases by ৳10M",
          "EBITDA drops by ৳100M while EBIT is unaffected",
          "Net Income increases by ৳10M"
        ],
        correct: 1,
        explanation: "Depreciation is excluded from EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization). Therefore, EBITDA is unaffected, while EBIT bears the ৳10M non-cash depreciation charge.",
        category: "Finance"
      },
      {
        id: 10,
        question: "When deriving Unlevered Free Cash Flow to Firm (FCFF) for DCF valuation, why is Net Interest Expense added back or excluded from operating cash flow?",
        options: [
          "Because interest is non-deductible",
          "FCFF measures the cash flow generated by core operations available to ALL capital providers (debt and equity holders) before any financing distributions",
          "Because bank interest is an intangible asset",
          "To inflate company enterprise value"
        ],
        correct: 1,
        explanation: "FCFF represents operating cash flow independent of the capital structure. The cost and tax shield of debt are incorporated into the discount rate (WACC) rather than deducted from FCFF.",
        category: "Finance"
      }
    ]
  },
  "sql-bi-analytics": {
    id: "sql-bi-analytics",
    title: "Enterprise SQL & Power BI Diagnostic Assessment",
    category: "Technical",
    competencyPillar: "Technical",
    difficulty: "Intermediate",
    durationMins: 25,
    negativeMarking: 0.25,
    description: "Evaluates SQL analytical joins, Common Table Expressions (CTEs), window ranking functions, and Power BI Star Schema data modeling.",
    questions: [
      {
        id: 1,
        question: "In enterprise analytics, what is the crucial operational difference between the window functions ROW_NUMBER() and DENSE_RANK() when ordering sales representatives by total gross revenue?",
        options: [
          "ROW_NUMBER() ignores NULL values whereas DENSE_RANK() raises a syntax error.",
          "ROW_NUMBER() guarantees unique consecutive integers even on ties, whereas DENSE_RANK() assigns identical ranks to ties without skipping subsequent rank numbers.",
          "DENSE_RANK() requires a PARTITION BY clause while ROW_NUMBER() does not.",
          "ROW_NUMBER() can only be computed over indexed primary keys."
        ],
        correct: 1,
        explanation: "If two reps tie at rank 1, ROW_NUMBER() produces 1 and 2 arbitrarily. DENSE_RANK() assigns both 1, and the next rep receives rank 2 (unlike RANK() which skips to 3).",
        category: "Analytical"
      },
      {
        id: 2,
        question: "Why should corporate data models in Power BI strictly adhere to a Star Schema with 1-to-many single-directional relationships rather than flat wide tables or bi-directional snowflake relationships?",
        options: [
          "Power BI's VertiPaq in-memory engine achieves optimal compression, faster DAX calculation pathways, and avoids ambiguous filter cross-propagation.",
          "Flat wide tables exceed the 100MB maximum file size limit in Power BI Desktop.",
          "Bi-directional relationships disable the ability to export data to Microsoft Excel.",
          "Star schemas prevent users from writing custom DAX measures."
        ],
        correct: 0,
        explanation: "The VertiPaq engine compresses columnar data drastically when dimension tables hold unique keys. Star schemas avoid circular filter contexts and maximize query engine cache efficiency.",
        category: "Analytical"
      },
      {
        id: 3,
        question: "Consider two tables: `orders` (10,000 rows, 100 distinct customer_ids) and `customers` (500 rows, 500 distinct customer_ids). Which query correctly returns customers who have NEVER placed an order?",
        options: [
          "SELECT c.id FROM customers c INNER JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL",
          "SELECT c.id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.customer_id IS NULL",
          "SELECT c.id FROM customers c FULL OUTER JOIN orders o ON c.id = o.customer_id WHERE c.id IS NULL",
          "SELECT customer_id FROM orders WHERE customer_id NOT IN (SELECT id FROM customers)"
        ],
        correct: 1,
        explanation: "A LEFT JOIN preserves all rows from `customers`. The `WHERE o.customer_id IS NULL` clause filters down specifically to rows where no matching order exists.",
        category: "Analytical"
      }
    ]
  },
  "corporate-case-structuring": {
    id: "corporate-case-structuring",
    title: "Corporate Case Structuring & Problem Solving Benchmark",
    category: "Case",
    competencyPillar: "Case",
    difficulty: "Advanced",
    durationMins: 30,
    negativeMarking: 0.0,
    description: "Evaluates MECE issue tree formulation, profitability root-cause diagnosis, market entry risk, and executive strategic synthesis.",
    questions: [
      {
        id: 1,
        question: "A national telecommunications provider experiences a 14% decline in quarterly operating profit despite subscriber volume increasing by 6%. Applying MECE decomposition, which branch represents the primary diagnostic hypothesis?",
        options: [
          "Brand awareness must have fallen across rural demographics.",
          "Average Revenue Per User (ARPU) contraction and/or expansion in network operating & customer acquisition costs (CAC).",
          "Competitor marketing expenditure has saturated digital channels.",
          "Internal customer service response times have lengthened."
        ],
        correct: 1,
        explanation: "Profit = (Subscribers * ARPU) - Total Costs. Since Subscribers rose (+6%) and Profit dropped (-14%), the mathematical root cause must reside in falling ARPU (price dilution, discounting) or rising unit operating costs/CAC.",
        category: "Analytical"
      },
      {
        id: 2,
        question: "When evaluating a market entry decision for an FMCG conglomerate considering organic manufacturing vs third-party toll packing, what is the primary economic trade-off?",
        options: [
          "High fixed CapEx with lower variable unit cost (organic) vs low CapEx with higher variable unit cost and operational flexibility (toll packing).",
          "Organic manufacturing eliminates VAT obligations whereas toll packing does not.",
          "Toll packing guarantees 100% intellectual property protection in commercial courts.",
          "Organic manufacturing has zero working capital inventory requirements."
        ],
        correct: 0,
        explanation: "Organic entry requires heavy upfront CapEx (factory, machinery) with high operating leverage and lower marginal unit cost. Toll packing minimizes CapEx, trading off unit margins for speed-to-market and demand risk protection.",
        category: "Finance"
      }
    ]
  },
  "banking-credit-risk": {
    id: "banking-credit-risk",
    title: "Commercial Banking & Corporate Credit Risk Evaluation",
    category: "Finance",
    competencyPillar: "Finance",
    difficulty: "Advanced",
    durationMins: 30,
    negativeMarking: 0.25,
    description: "Evaluates debt service coverage ratios (DSCR), working capital limit calculations, leverage covenants, and credit sanction risk mitigants.",
    questions: [
      {
        id: 1,
        question: "A corporate borrower requests a 5-year term loan of ৳200M. The company projects annual EBITDA of ৳60M, annual CapEx of ৳10M, and taxes of ৳8M. Annual term loan principal + interest debt service is ৳35M. What is the projected Debt Service Coverage Ratio (DSCR)?",
        options: [
          "1.71x",
          "1.20x",
          "1.48x",
          "0.92x"
        ],
        correct: 1,
        explanation: "Cash Flow Available for Debt Service (CFADS) = EBITDA - CapEx - Taxes = 60M - 10M - 8M = ৳42M. DSCR = CFADS / Debt Service = 42M / 35M = 1.20x.",
        category: "Finance"
      },
      {
        id: 2,
        question: "In credit appraisal under central bank guidelines, why is a high Current Ratio (e.g. 2.8x) not an absolute guarantee of healthy corporate liquidity?",
        options: [
          "Current liabilities do not include bank overdraft facilities.",
          "A large portion of current assets may consist of slow-moving/obsolete inventory or uncollectible receivables with high default risk.",
          "Current ratios are only valid for service companies without physical assets.",
          "Depreciation expenses are added back to current assets each fiscal year."
        ],
        correct: 1,
        explanation: "Current assets include Inventory and Accounts Receivable. If inventory cannot be liquidated or receivables are stalled with extended DSOs, the business faces acute liquidity crises despite a high headline ratio (hence Quick/Acid-Test Ratio is utilized).",
        category: "Finance"
      }
    ]
  },
  // Legacy fallback alias
  "bb-ad-full-mock": {
    id: "bb-ad-full-mock",
    title: "MTO Standardized Cognitive Aptitude Assessment",
    category: "Aptitude",
    competencyPillar: "Cognitive",
    difficulty: "Intermediate",
    durationMins: 25,
    negativeMarking: 0.25,
    description: "Standardized cognitive benchmark measuring Quantitative Reasoning, Verbal Logic, and Data Interpretation for corporate Management Trainee tracks.",
    questions: [
      {
        id: 1,
        question: "A manufacturing division produced 12,000 units in Q1 with a defective rate of 4.5%. After recalibrating automated tooling, Q2 production rose by 25% while defects dropped to 2.4%. What was the net change in total defective units produced?",
        options: [
          "Defects increased by 60 units",
          "Defects decreased by 180 units",
          "Defects decreased by 90 units",
          "Defects remained identical"
        ],
        correct: 1,
        explanation: "Q1 defects: 12,000 * 0.045 = 540 units. Q2 total production: 12,000 * 1.25 = 15,000 units. Q2 defects: 15,000 * 0.024 = 360 units. Net change: 360 - 540 = -180 units.",
        category: "Quant"
      }
    ]
  }
};
