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
  }
};
