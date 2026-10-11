# 🏛️ INSYT CORPORATE — SUPERMASSIVE IMPLEMENTATION PLAN & ARCHITECTURE MANIFESTO

> **Strategic Identity**: **INSYT Corporate = Employability Operating System**  
> **Core Loop**: `Goal → Diagnose → Prepare → Practice → Evaluate → Prove → Discover Opportunities`  
> INSYT Corporate explicitly discards the architecture of a generic course marketplace, academic Learning Management System (LMS), and standard job board. Corporate separates cleanly from Academy: Academy is foundational learning; Corporate is applied day-one operational talent readiness.

---

## 0. NON-NEGOTIABLE IMPLEMENTATION RULES

1. **Do not rebuild the application from scratch.**
2. **Do not throw away working features merely because the strategy changed.**
3. **Do not permanently delete legacy functionality before migration/redirect/feature-flag protection exists.**
4. **Do not create fake data, fake partners, fake recruiters, fake job outcomes, fake readiness scores, or fake learner statistics.**
5. **Do not turn the new design into a generic LMS.**
6. **Do not make every feature a top-level navigation item.**
7. **Do not make gamification the center of the experience.**
8. **Do not make AI the center of the experience.**
9. **Do not treat course completion as verified competence.**
10. **Do not introduce a complex recruiter ecosystem before candidate-side foundations work properly.**
11. **Every new feature must answer:**
    - What user problem does it solve?
    - What career outcome does it improve?
    - What evidence proves it works?
    - Why does it belong in Corporate rather than Academy?

---

## 1. TARGET PRODUCT ARCHITECTURE: THE 5 CANONICAL AREAS

| Canonical Pillar | Core Purpose | Canonical Route | Legacy Alias |
|---|---|---|---|
| **01 — Cockpit** | Career command center: target goal, weighted readiness index, next action, skill gaps | `/cockpit` | `/dashboard` |
| **02 — Prepare** | Applied learning paths, micro-lessons, hands-on drills, project work samples, templates | `/prepare` | `/learn` |
| **03 — Evaluate** | Aptitude, practical technical sandboxes (Excel/SQL/BI), case solving, proctored AI interviews | `/evaluate` | `/mock-tests` |
| **04 — Career Passport** | Cryptographic proof-of-work, verified skills, assessment percentiles, capstone artifacts | `/passport` | `/career-passport` |
| **05 — Opportunities** | Curated employer circulars, skill-match scores, manual application tracking | `/opportunities` | `/jobs` |

Secondary & Contextual Features:
- **Profile / Settings**: `/settings`
- **AI Interview Practice**: `/evaluate/interviews` (aliased from `/mock-interviews`)
- **Case Challenges**: Subordinate to Prepare/Evaluate (`/challenges`)
- **Verified Credentials**: Subordinate to Passport (`/certificates`)
- **Help & Methodology**: Subordinate to Account (`/help`)

---

## 2. NAVIGATION SHELL (DESKTOP & MOBILE)

### Desktop Sidebar
```text
INSYT Corporate OS
├── 01 Cockpit          (/cockpit)
├── 02 Prepare          (/prepare)
├── 03 Evaluate         (/evaluate)
├── 04 Career Passport  (/passport) [PRO]
└── 05 Opportunities    (/opportunities)

Contextual Practice
├── AI Mock Interviews  (/evaluate/interviews)
├── Career Strategy Hub (/career-hub)
├── Case Challenges     (/challenges)
└── Credentials Archive (/certificates)

Account & Support
├── Profile & Settings  (/settings)
└── Help & Methodology  (/help)
```

### Mobile Bottom Bar
```text
[Cockpit]   [Prepare]   [Evaluate]   [Passport]   [Jobs]   [More ▾]
```
Touch targets: `>= 44px` height and width for zero mis-taps.

---

## 3. READINESS INDEX ENGINE (`lib/assessment/readiness-index.ts`)

A weighted, evidence-based competency calculation:

$$\text{Readiness Index} = 0.25(\text{Cognitive}) + 0.25(\text{Technical}) + 0.20(\text{Case}) + 0.15(\text{Communication}) + 0.15(\text{Interview})$$

### State Requirements:
- `readiness_version`: string (e.g., `2026.1-PROD`)
- `component_scores`: `{ cognitive, technical, caseSolving, communication, interview }`
- `assessment_count`: number
- `project_count`: number
- `confidence`: `none` | `low` | `medium` | `high`
- **Rule**: If fewer than 2 dimensions are evaluated, status must strictly show:  
  **"Readiness assessment incomplete — complete diagnostics & capstones to calibrate"** rather than fabricating an arbitrary score.

---

## 4. CURRICULUM ARCHITECTURE & 10 LAUNCH COURSES

### Wave 1 Flagships (Active Implementation)
1. **C-01: Corporate Financial & Commercial Modeling in Excel**  
   *Foundations → Data Cleaning → Advanced Formulas → Dynamic Models → Power Query → Business Analysis → Financial Modeling → Scenario Analysis → Variance Analysis → Commercial Planning → Executive Reporting → Capstone (FMCG Distributor Commercial & Financial Model)*
2. **C-02: MTO Recruitment Mastery: Aptitude, Case Cracking & Assessment Centers**  
   *Quantitative Aptitude → Verbal Reasoning → Logical Reasoning → Data Interpretation → General Business Awareness → Situational Judgment → Issue Trees → Profitability Cases → Market Entry → Operations Cases → Assessment Center → Behavioral Interview → Mock MTO Simulation Engine*
3. **C-03: Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts**  
   *SQL Fundamentals → Joins → Aggregation → Subqueries → CTEs → Data Modeling → Power BI → Power Query → DAX → Star Schema → KPI Design → Executive Dashboards → Business Interpretation → Capstone (Enterprise Sales & Margin Intelligence Dashboard)*

### Wave 2 Flagships
4. **C-04: Executive Communication & Data Presentation for Corporate Leaders**
5. **C-05: Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate**
6. **C-06: Corporate Problem Solving: Advanced Case Frameworks & Strategy Execution**

### Wave 3 Flagships
7. **C-07: Commercial Banking & Corporate Credit Risk Analysis**
8. **C-08: Supply Chain Operations & Logistics Management in Practice**
9. **C-09: Enterprise Python for Corporate Analytics & Process Automation**
10. **C-10: Professional Business Writing & Workplace English Communication**

---

## 5. LESSON DESIGN SYSTEM & WORKSPACE PLAYER

Every serious lesson adheres to the 6-stage model:
```text
1. Explain      (One concept)
2. Demonstrate  (Realistic corporate environment)
3. Practice     (Active student command)
4. Apply        (Real-world business case)
5. Check        (Micro-assessment)
6. Reflect      (Professional relevance)
```

Player layout:
- **Theory**: Full-width executive reader.
- **Applied Skills**: Split-screen (Lesson instruction + Live Sandbox Workspace).

---

## 6. PRACTICAL TECHNICAL ASSESSMENTS & PORTFOLIO PROJECTS

Work samples are treated as **production-ready artifacts**, not academic homework:
- **Excel**: Messy data injection → data cleaning → formula modeling → automated validation.
- **SQL**: Database schema → query prompt → live execution against expected result set.
- **Power BI**: Data model + relationships + DAX + visual KPI selection audit.
- **Projects**:
  - Project 1: FMCG Financial/Commercial Model
  - Project 2: Banking Credit-Risk Memo
  - Project 3: Power BI Sales Intelligence Dashboard
  - Project 4: Corporate Strategy / Turnaround Presentation

---

## 7. CREDIBILITY HIERARCHY & CAREER PASSPORT

Evidence ladder:
```text
Learning Completion
        ↓
Course Certificate
        ↓
Practical Assessment (Percentile-ranked)
        ↓
Verified Skill
        ↓
Capstone Project Work Sample
        ↓
Career Passport Cryptographic Evidence (W3C DID & Ed25519)
```

Public verification URL: `/verify/[passportId]` or `/verify/[id]`.

---

## 8. FEATURE FLAGS (`lib/config/feature-flags.ts`)

| Flag | Active State | Purpose |
|---|---|---|
| `corporateV2` | `true` | Master switch for Employability OS |
| `readinessIndex` | `true` | 5-dimension weighted readiness engine |
| `newNavigation` | `true` | 5 canonical areas shell |
| `assessmentEngine` | `true` | Practical timed & sandboxed assessments |
| `projectSystem` | `true` | Production portfolio project rubrics |
| `passportV2` | `true` | W3C verified credential integration |
| `opportunitiesV2` | `true` | Curated circulars & skill matching |
| `academicTestPrep` | `false` | GRE/GMAT/MBA isolated from Corporate |
| `xpGamification` | `false` | Superficial XP/levels purged |
| `unverifiedSalaryAndReviews`| `false`| Premature crowdsourcing hidden |
| `recruiterBeta` | `false` | Candidate foundations built first |

---

## 9. DESIGN TOKENS & UX CONSTRAINTS

- **Theme Palette**: Deep slate navy (`#0f172a`, `#0d1b2a`), Corporate Blue (`#2563eb`), Amber Accent (`#f59e0b`), Emerald Verification (`#10b981`).
- **Touch Targets**: Minimum `44px` on interactive elements.
- **Typography**: Inter / Outfit for headings and body; JetBrains Mono for metrics and tables.
- **Visual Split**: 65% primary career activity, 35% supporting context. No cluttered widget noise.
