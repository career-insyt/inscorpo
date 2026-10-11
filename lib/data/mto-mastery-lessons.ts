import { LessonDetail } from "./lessons";

export const MTO_MASTERY_LESSONS: Record<string, LessonDetail> = {
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: COGNITIVE APTITUDE SPEED DRILLS
  // ═══════════════════════════════════════════════════════════════

  "quant-speed-foundations": {
    slug: "quant-speed-foundations",
    title: "1.1 Speed Math & Estimation Shortcuts for MNC Aptitude Tests",
    xpReward: 80,
    duration: "20m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Speed Math & Estimation Shortcuts for MNC Aptitude Tests

#### Executive Context
In recruitment tests for Unilever, BAT, Marico, and top local conglomerates, candidates face 30 to 50 quantitative questions in 25 to 35 minutes. Calculators are strictly prohibited or impractical. Success is not about high-school algebra; it is about **Mental Numerical Fluency**, **Percentage Base Shifts**, and **Order-of-Magnitude Estimation**.

#### 1. Crucial Fraction-to-Percentage Equivalents
Top performers commit these non-intuitive fractions to muscle memory:
* $1/6 \\approx 16.67\\%$ | $5/6 \\approx 83.33\\%$
* $1/7 \\approx 14.28\\%$ | $2/7 \\approx 28.57\\%$ | $3/7 \\approx 42.86\\%$
* $1/8 = 12.5\\%$ | $3/8 = 37.5\\%$ | $5/8 = 62.5\\%$ | $7/8 = 87.5\\%$
* $1/9 \\approx 11.11\\%$ | $1/11 \\approx 9.09\\%$ | $1/12 \\approx 8.33\\%$
* $1/16 = 6.25\\%$ | $1/15 \\approx 6.67\\%$

#### 2. The Percentage Base-Shift Law (Margin vs Markup)
When values change up and down, the base shifts:
* If Price drops by $20\\%$ ($1/5$), Volume must increase by **$25\\%$** ($1/4$) to maintain identical gross revenue.
* If Cost increases by $25\\%$ ($1/4$), Price must rise by **$25\\%$** to keep gross margin percentage stable, or unit margin collapses.
* **Markup vs Margin**:
  - $25\\%$ Markup on Cost $= 20\\%$ Gross Margin on Revenue.
  - $33.3\\%$ Markup on Cost $= 25\\%$ Gross Margin on Revenue.
  - $50\\%$ Markup on Cost $= 33.3\\%$ Gross Margin on Revenue.
  - $100\\%$ Markup on Cost $= 50\\%$ Gross Margin on Revenue.

\`\`\`
THE BASE SHIFT RULE:
Decrease of  1/N   requires Increase of  1/(N - 1)  to Break Even!
Decrease of 20% (1/5) ──► Increase of 25% (1/4)
Decrease of 25% (1/4) ──► Increase of 33.3% (1/3)
Decrease of 33% (1/3) ──► Increase of 50% (1/2)
\`\`\`

#### 3. CAGR Approximation Shortcut
When asked: *"Revenue grew from ৳ 40 Cr to ৳ 72 Cr in 4 years. What is the approximate CAGR?"*
Do **NOT** attempt $\\sqrt[4]{72/40} - 1$ by hand!
* Total Growth $= (72 - 40) / 40 = 32 / 40 = +80\\%$.
* Simple Annual Growth $= 80\\% / 4 = 20\\%$.
* Compound Adjustment Rule: Compound interest grows faster than simple interest. Therefore, actual CAGR is slightly below the simple annual average:
  - If simple is $20\\%$, true CAGR is approximately **$15.8\\% - 16.5\\%$**.
  - Formula: $\\text{CAGR} \\approx \\frac{\\text{Total Growth}}{n} \\times (1 - \\frac{n - 1}{2} \\times \\frac{\\text{Total Growth}}{n})$.

#### 4. Order-of-Magnitude Fermi Framework (Bangladesh Market Baseline)
Keep these verified national figures locked in memory for market sizing:
* **Population**: $\\approx 175$ Million.
* **Households**: $\\approx 42$ Million (Average household size $\\approx 4.1$ persons).
* **Urban vs Rural**: $\\approx 40\\%$ Urban ($\approx 70\\text{M}$) / $60\\%$ Rural ($\approx 105\\text{M}$).
* **Working Age (18–55)**: $\\approx 58\\%$ of population ($\approx 100\\text{M}$).
* **Smartphone Penetration**: $\\approx 55\\% - 60\\%$.

#### Guided Exercise & Deliverable
* **Task**: Solve 10 timed mental arithmetic problems involving retail trade margins, percentage base shifts, and 5-year CAGR estimations in under 3 minutes.
* **Output**: Quantitative speed benchmarking scorecard logged to Career Passport.`,
    quiz: {
      question: "If a company cuts retail product price by 25% to gain market share, by what percentage must total sales volume increase in order to keep total revenue unchanged?",
      options: [
        "25.0%",
        "33.33%",
        "50.0%",
        "20.0%"
      ],
      correctIdx: 1,
      explanation: "By the Base Shift Rule: a decrease of 1/N (here 25% = 1/4) requires an increase of 1/(N - 1) = 1/3 = 33.33% to maintain equal total revenue (0.75 * 1.3333 = 1.00)."
    },
    hasSimulator: "mto-recruitment"
  },

  "data-interpretation-drills": {
    slug: "data-interpretation-drills",
    title: "1.2 Complex Chart & Table Forensics under Timed Pressure",
    xpReward: 85,
    duration: "30m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Complex Chart & Table Forensics under Timed Pressure

#### Executive Context
Corporate aptitude tests rarely ask standalone math equations; they present multi-layered visual artifacts: dual-axis charts, stacked percentage bar charts, indexed tables, and financial balance sheets with missing cells. Candidates fail not from inability to compute, but from **Visual Overload**, **Misreading Scales**, or **Falling for Distractor Options**.

#### 1. The Dual-Axis Deception Trap
A common chart type plots Sales Volume on the left vertical axis (in Thousands of Units) and Operating Profit Margin % on the right vertical axis (0% to 40%).
* **The Cognitive Trap**: The profit line appears visually "higher" than the sales line in Q3, tempting candidates to conclude profit exceeded sales.
* **Rule**: Units and percentages can **NEVER** be compared by visual height. Always read each curve against its dedicated axis scale!

\`\`\`
DUAL-AXIS DECONSTRUCTION:
Left Axis (Volume - Units)                  Right Axis (Margin %)
100k ┌───────────────────────────┐ 40%
     │       ▲ Volume Line       │
 50k │───────┼───────────────────│ 20%
     │       │     ● Margin Line │
   0 └───────┴───────────────────┘ 0%
           Q1   Q2   Q3   Q4
* Always check: Does Left Axis start at ZERO or is it truncated?
\`\`\`

#### 2. Stacked Bar Chart Percentage vs Absolute Shift
When examining a stacked column chart showing market shares across 4 competitors:
* If Competitor A's bar segment shrinks from $35\\%$ to $28\\%$, did Competitor A lose sales volume?
* **Answer**: NOT NECESSARILY! If the total industry market expanded from ৳ 100 Cr to ৳ 150 Cr:
  - Year 1 Volume: $35\\% \\times 100\\text{ Cr} = ৳ 35\\text{ Cr}$.
  - Year 2 Volume: $28\\% \\times 150\\text{ Cr} = ৳ 42\\text{ Cr}$.
  - Competitor A's sales volume actually **grew by 20%**, despite losing percentage share!

#### 3. Table Forensics: The Row/Column Control-Total Check
When given an incomplete matrix table with blank cells:
1. Scan for the Grand Total row and Grand Total column.
2. Use arithmetic deduction ($A + B + C = \\text{Total}$) to solve missing values before reading the question options.
3. Check table footnotes: *"Figures in BDT Millions, rounded to nearest 0.1M unless otherwise noted."*

#### Guided Exercise & Deliverable
* **Task**: Analyze 4 complex corporate exhibits (telecom subscriber churn table, FMCG dual-axis price/volume chart, retail bank loan portfolio breakdown), extracting required ratios in under 60 seconds per question.
* **Output**: Verified Data Interpretation error log identifying trap patterns.`,
    quiz: {
      question: "In a corporate commercial exhibit, Brand X market share dropped from 40% to 30%, while total category sales expanded from ৳ 200 Million to ৳ 300 Million. What was the net change in Brand X absolute sales revenue?",
      options: [
        "Decreased by ৳ 10 Million (-12.5%)",
        "Increased by ৳ 10 Million (+12.5%)",
        "Remained completely unchanged at ৳ 80 Million",
        "Increased by ৳ 30 Million (+37.5%)"
      ],
      correctIdx: 1,
      explanation: "Initial sales: 40% of ৳200M = ৳80M. Final sales: 30% of ৳300M = ৳90M. Net change = +৳10M (a 12.5% increase in absolute revenue despite market share dilution)."
    },
    hasSimulator: "mto-recruitment"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: MANAGEMENT CONSULTING & CASE FRAMEWORKS
  // ═══════════════════════════════════════════════════════════════

  "issue-trees-mece": {
    slug: "issue-trees-mece",
    title: "2.1 Structuring Complex Business Problems with MECE Trees",
    xpReward: 90,
    duration: "28m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Structuring Complex Business Problems with MECE Trees

#### Executive Context
Management consulting firms (McKinsey, BCG, Bain) and multinational corporate leadership panels do not evaluate whether a candidate knows random industry facts. They evaluate whether you can take an unstructured, messy corporate crisis and break it down into clean, structured, non-overlapping analytical buckets. The universal gold standard for this is the **MECE Principle**.

#### What is MECE?
* **Mutually Exclusive (ME)**: Each branch of the tree must be distinct and non-overlapping. No double counting.
* **Collectively Exhaustive (CE)**: All branches together must cover $100\\%$ of all possible causes. Nothing falls through the cracks.

\`\`\`
THE MASTER PROFITABILITY ISSUE TREE:
                               ┌── Price per Unit (List Price, Discounts, Mix)
                ┌── Revenue ───┤
                │              └── Volume (Customer Count, Purchase Frequency)
   Profit ──────┤
   (EBITDA)     │              ┌── Variable Costs (Raw Materials, Packaging, Freight)
                └── Costs ─────┤
                               └── Fixed Costs (Plant Rent, SG&A, Depreciation)
\`\`\`

#### Mathematical vs Conceptual Issue Trees
1. **Mathematical Trees (Algebraic Rigor)**:
   - Starts with a mathematical equation: $\\text{Profit} = \\text{Revenue} - \\text{Cost}$.
   - Guaranteed to be MECE because mathematics is inherently mutually exclusive and collectively exhaustive.
2. **Process / Conceptual Trees**:
   - Follows a customer or operational journey:
     - *Customer Journey*: Awareness $\\rightarrow$ Consideration $\\rightarrow$ Conversion $\\rightarrow$ Retention $\\rightarrow$ Referral.
     - *Supply Chain*: Sourcing $\\rightarrow$ Manufacturing $\\rightarrow$ Warehousing $\\rightarrow$ Distribution $\\rightarrow$ Last Mile.

#### Hypothesis-Driven Prioritization
Do **NOT** try to analyze every branch equally. Senior analysts form an early **Hypothesis** based on initial problem symptoms and prune unlikely branches:
* Symptom: *"Industry sales volume grew 8%, but our company EBITDA dropped 24% while our physical units sold grew 10%."*
* Immediate Hypothesis: Since volume grew faster than the market (+10% vs +8%), the issue is **NOT** a volume deficit! The collapse is driven by either:
  1. Aggressive price cuts / promotional trade discount dilution (Revenue branch).
  2. Severe cost inflation or logistics freight absorption (Cost branch).
* Prune volume marketing campaigns; immediately inspect gross-to-net waterfall pricing!

#### Guided Exercise & Deliverable
* **Task**: Build an end-to-end MECE issue tree decomposing a 35% margin decline for a leading local consumer electronics distributor across online e-commerce vs offline dealer channels.
* **Output**: Formatted MECE diagram with prioritized investigative hypotheses.`,
    quiz: {
      question: "Which of the following cost breakdowns violates the 'Mutually Exclusive' (ME) requirement of the MECE framework?",
      options: [
        "Fixed Costs vs Variable Costs",
        "Direct Raw Material Costs vs Indirect SG&A Overheads",
        "Production Costs vs Marketing Costs vs High-Spending Customer Costs",
        "Domestic Sourcing Costs vs Imported Raw Material Costs"
      ],
      correctIdx: 2,
      explanation: "'High-Spending Customer Costs' overlaps with both Production and Marketing costs. It introduces non-mutually-exclusive double counting across functional cost categories."
    },
    hasSimulator: "mto-recruitment"
  },

  "profitability-cases": {
    slug: "profitability-cases",
    title: "2.2 Live Profitability Turnaround Simulation & Trade-Off Analysis",
    xpReward: 100,
    duration: "40m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Live Profitability Turnaround Simulation & Trade-Off Analysis

#### Executive Context
In Phase 2 of assessment centers and case interviews, candidates are presented with a live corporate problem statement: *"Apex Consumer Goods launched a nationwide promotional campaign for its premium beverage line. Unit sales volume surged by 18%, but quarterly operating profit collapsed from ৳ 45M to ৳ 18M (-60%). The Managing Director wants to know what went wrong and requires an immediate action plan."*

#### 1. The 5-Step Case Solving Architecture
1. **Clarify the Problem**: Re-state objectives, confirm timeline, and clarify scope (Is this company-specific or an industry-wide crisis?).
2. **Structure the Framework**: Lay down the MECE Profitability Tree before asking for data.
3. **Formulate & Prioritize Hypotheses**: State clearly which branch you will investigate first.
4. **Quantitative Deep-Dive**: Request exhibits, calculate unit economics, and isolate financial leakage.
5. **Synthesize Executive Recommendation (Pyramid Principle)**: Present the solution starting with the core decision, supported by 3 pillars and implementation risks.

\`\`\`
GROSS-TO-NET REVENUE DECONSTRUCTION EXHIBIT:
List Price:               ৳ 100.00 (100.0%)
(-) Trade Discount:       -৳  25.00 ( 25.0%)  <── 🚨 Promotional Leakage!
(-) Freight Absorption:   -৳   8.00 (  8.0%)  <── 🚨 Surcharge absorbed!
Net Realized Price:       ৳  67.00 ( 67.0%)
(-) COGS:                 -৳  48.00 ( 48.0%)
Operating Margin:         ৳  19.00 ( 19.0%) vs Base Margin of ৳ 38.00 (-50%!)
\`\`\`

#### 2. Trade-Off Analysis: The 3 Core Turnaround Interventions
* **Intervention A: Terminate Uncapped Promotional Discounts**:
  - Cap promotional allowances at $10\\%$ of list price.
  - Expected Impact: Volume may drop by $6\\%$, but net realized price rises by $15\\%$, driving a net $+৳ 22\\text{M}$ EBITDA recovery.
* **Intervention B: Pass Through Freight Surcharges to Distributors**:
  - Discontinue full freight absorption for remote territories (North Zone).
  - Enforce a minimum order quantity (MOQ) for free depot delivery.
* **Intervention C: SKU Rationalization & Premiumization Focus**:
  - Reallocate marketing spend away from discounted bulk packs toward high-margin single-serve formats.

#### 3. Boardroom Synthesis (Pyramid Principle)
* **Lead with the Action**: *"I recommend capping North Zone promotional trade discounts at 10% and introducing minimum order quantities for freight absorption, which will restore ৳ 24M in operating profit within 60 days while limiting volume contraction to under 5%."*
* **Three Supporting Pillars**:
  1. *Pricing Hygiene*: Trade discounts expanded from 12% to 25%, cannibalizing gross margin.
  2. *Logistics Leakage*: Freight absorption eroded another 8% of net price on remote dispatches.
  3. *Distributor Behavior*: Distributors hoarded discounted stock without passing savings to consumers.

#### Guided Exercise & Deliverable
* **Task**: Analyze the complete financial exhibit for Apex Consumer Goods, calculate the breakeven price adjustment, and draft a 90-second spoken executive turnaround defense.
* **Output**: Quantitative case worksheet with verified P&L sensitivity tables.`,
    quiz: {
      question: "In a corporate profitability turnaround case, when unit volume has increased by 18% but total operating profit has declined by 60%, what is the most statistically probable primary driver?",
      options: [
        "Factory electricity tariffs decreased by 2%",
        "Deep promotional trade discounts and unbudgeted freight absorption caused net realized price per unit to fall below marginal operating cost",
        "The accounting department changed font styles in the general ledger",
        "Customers switched from smartphones to desktop computers"
      ],
      correctIdx: 1,
      explanation: "Volume surges coupled with severe profit collapses are classic symptoms of 'buying volume' through excessive discounts, rebates, or freight absorption that destroy unit contribution margins."
    },
    hasSimulator: "mto-recruitment"
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: ASSESSMENT CENTER MECHANICS & DEFENSE
  // ═══════════════════════════════════════════════════════════════

  "assessment-center-mechanics": {
    slug: "assessment-center-mechanics",
    title: "3.1 Assessment Center Group Discussion & In-Basket Prioritization",
    xpReward: 85,
    duration: "25m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Assessment Center Group Discussion & In-Basket Prioritization

#### Executive Context
Only the top $3\\% - 5\\%$ of applicants reach the Assessment Center (AC) stage. At this level, individual academic credentials matter far less than **Group Dynamics**, **Influence Without Authority**, **Emotional Stability Under Pressure**, and **In-Basket Executive Prioritization**. MNC assessors sit silently taking notes; they do not look for the loudest voice, but the most effective commercial leader.

#### 1. The Four Group Discussion Archetypes
1. **The Bulldozer (High Egotism, Low Value)**:
   - Interrupts peers, talks $40\\%$ of the time, repeats points loudly.
   - *Assessor Verdict*: **Immediate Reject** (Toxic team culture liability).
2. **The Ghost (Low Contribution, Passive)**:
   - Nods, agrees with everyone, contributes no original frameworks.
   - *Assessor Verdict*: **Reject** (Lacks conviction and initiative).
3. **The Anchor / Timekeeper (Process Oriented)**:
   - Keeps team on schedule, reminds group of remaining deliverables.
   - *Assessor Verdict*: **Average Pass / Borderline**.
4. **The Synthesizer & Catalyst (The Gold Standard)**:
   - Listens actively, acknowledges peer points, resolves circular debates, structures unstructured ideas into frameworks, and builds consensus.
   - *Assessor Verdict*: **High Potential Hire (Fast Track)**.

\`\`\`
HOW TO INTERVENE PROFESSIONALLY IN CONFLICT:
❌ "You're completely wrong. Look at the numbers."
✔ "I see Farhan's point on immediate volume risk, and Anika's concern on margin erosion. Let's look at the data: what if we test Farhan's proposal in Dhaka Metro while adopting Anika's margin threshold for North Zone?"
\`\`\`

#### 2. The In-Basket Prioritization Exercise
Candidates receive 15 urgent emails, voicemails, and memos in their simulated corporate inbox with only 20 minutes to prioritize actions.
* Use the **Eisenhower Decision Matrix**:
  1. *Urgent & High Impact*: Immediate action (e.g., Media crisis, supply chain factory shutdown).
  2. *Not Urgent & High Impact*: Strategic scheduling (e.g., Annual business plan review, vendor contract renegotiation).
  3. *Urgent & Low Impact*: Delegate / Automated response (e.g., Routine administrative sign-offs).
  4. *Neither Urgent nor Impactful*: Discard / Ignore.

#### Guided Exercise & Deliverable
* **Task**: Prioritize 10 realistic corporate in-basket scenarios under a 10-minute timer, defending why critical supply chain safety issues take precedence over routine board slide formatting.
* **Output**: Formatted In-Basket Priority Matrix with documented operational trade-offs.`,
    quiz: {
      question: "During an Assessment Center group case discussion, what is the most effective behavioral strategy when two peers become locked in an aggressive circular argument?",
      options: [
        "Shout louder than both of them to assert your dominance as the team leader",
        "Stay completely silent and let the assessors see that your peers are failing",
        "Intervene constructively by summarizing both viewpoints, reframing the dispute against the core case objective, and proposing a data-driven consensus",
        "Vote with whoever has higher seniority"
      ],
      correctIdx: 2,
      explanation: "Top candidates act as synthesizers: acknowledging peer inputs, eliminating emotional deadlock, and refocusing the team on the strategic deliverable using data."
    },
    hasSimulator: "mto-recruitment"
  },

  "star-interview-mastery": {
    slug: "star-interview-mastery",
    title: "3.2 Behavioral STAR Interview Mastery & Boardroom Defense",
    xpReward: 95,
    duration: "35m",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    notes: `### Behavioral STAR Interview Mastery & Boardroom Defense

#### Executive Context
The final hurdle of executive recruitment is the Panel Interview with Business Directors, Functional Heads, and the Human Resources VP. They ask behavioral questions: *"Tell me about a time you led a team through a crisis," "Describe a situation where you had to challenge a superior's decision," "How did you handle a project failure?"* Candidates who tell rambling, unstructured stories fail. Candidates who deploy the **Calibrated STAR Framework** pass.

#### 1. The Calibrated STAR Framework & Time Allocation
Total response time should be **90 to 120 seconds**. Never speak for 5 minutes unbroken!
* **Situation ($10\\%$ of time - 10-15s)**:
  - Concise commercial context. Name the company, role, scale, and specific crisis.
* **Task ($10\\%$ of time - 10-15s)**:
  - Your exact ownership and mandate. What metric were you responsible for turning around?
* **Action ($60\\%$ of time - 50-60s) — THE CRITICAL CORE**:
  - The specific, sequential steps **YOU** took (Use "I", not "We"!).
  - How did you analyze the data? How did you influence stakeholders? What resistance did you overcome?
* **Result ($20\\%$ of time - 20-25s)**:
  - Quantified business outcome (Revenue, Margin, Time saved, Process automated).
  - Reflective learning: What would you do differently today?

\`\`\`
CALIBRATED STAR STORY ARCHITECTURE:
[ Situation: 15s ] ──► [ Task: 15s ] ──► [ Action: 60s ] ──► [ Result: 20s ]
"At XYZ Retail..."     "My mandate..."   "First, I audited...  "Profit recovered
                                          Then, I modeled...    +৳18M (+24%) with
                                          Finally, I aligned... zero customer churn."
\`\`\`

#### 2. The 5 Core MNC Competency Anchors
Every behavioral question maps to one of these 5 competencies:
1. **Bias for Action & Ownership**: Taking accountability when others hesitate.
2. **Influence Without Authority**: Persuading cross-functional peers who do not report to you.
3. **Data-Driven Decision Making**: Replacing intuition with statistical or financial evidence.
4. **Resilience & Growth Mindset**: Bouncing back from a public setback with documented learnings.
5. **Customer & Commercial Centricity**: Aligning internal operations with market profitability.

#### 3. Handling Tough Boardroom Pushback
When a panelist aggressively challenges your answer: *"Your volume estimation is completely unrealistic; that market is saturated."*
* **Do NOT get defensive or argue emotionally.**
* **The Executive Pivot**:
  1. *Validate*: "That is a valid challenge; in high-density urban territories, saturation is indeed a major constraint."
  2. *Defend the assumptions*: "Our model accounted for that by restricting growth to Tier-2 rural expansion where household penetration is currently under 18%."
  3. *Demonstrate sensitivity*: "However, if rural adoption lags at 8%, our sensitivity model shows the project still achieves a 14% IRR, keeping downside risk limited."

#### Guided Exercise & Deliverable
* **Task**: Structure and record 3 behavioral STAR stories targeting "Conflict with Stakeholder", "Failure & Recovery", and "Data-Driven Innovation", keeping each story strictly under 120 seconds.
* **Output**: Verified STAR narrative dossier with documented quantifiable business outcomes.`,
    quiz: {
      question: "In the STAR behavioral interview framework, what percentage of your total response time should be devoted to the 'Action' phase?",
      options: [
        "10% (Spend most time describing the background company situation)",
        "60% (Focus on your specific analytical steps, stakeholder leadership, and decisions)",
        "90% (Ignore the situation and result entirely)",
        "25% (Distribute time evenly across all four letters)"
      ],
      correctIdx: 1,
      explanation: "The Action section is what interviewers actually evaluate: your specific personal agency, problem-solving methodology, and stakeholder leadership (approx 60% of time)."
    },
    hasSimulator: "mto-recruitment"
  }
};
