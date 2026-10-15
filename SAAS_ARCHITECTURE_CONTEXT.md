# 🏛️ CAREERINSYT — SYSTEM ARCHITECTURE CONTEXT & OPERATING MANIFESTO
*(Formerly INSYT Corporate | Employability Operating System)*

> **Strategic Identity**: **CAREERINSYT = Employability Operating System (Career OS)**  
> **Core Operating Loop**: `Goal → Diagnose → Prepare → Practice → Evaluate → Prove → Discover Opportunities`  
> **Core Value Proposition**: Day-one operational capability verification for emerging corporate talent, Management Trainee Officers (MTOs), and corporate analysts across high-growth corporate sectors.

---

## 0. NON-NEGOTIABLE ARCHITECTURAL AXIOMS

1. **Employability Operating System, Not an Academic LMS**: CAREERINSYT explicitly rejects the low-impact architecture of generic video course libraries, commoditized tutorials, and passive completion certificates. Every learning artifact is an applied, verifiable work sample.
2. **Zero-Fabrication Policy (No Fake Signals)**: Do not create fake partner logos, fake recruiter endorsements, fake job circulars, fabricated readiness scores, or synthetic user completion badges. If fewer than 2 diagnostic dimensions are completed, state: *"Readiness assessment incomplete — complete diagnostics & capstones to calibrate"*.
3. **Evidence Over Completion**: Course completion (watching videos or reading text) does NOT equal verified competence. Credentials, designations, and badges must strictly depend on server-evaluated technical sandboxes, algorithmic grading, or cryptographically sealed work samples.
4. **Light Mode Corporate Purity**: The platform interface is strictly light-mode executive grade (`#F7F8FC` background, `#FFFFFF` surfaces, `#1A1D2E` primary text, `#3B5BDB` primary accent). No dark-mode toggle artifacts, no lingering `.dark` selectors, and no unreadable low-contrast text.
5. **Defense-in-Depth Security**: All administrative routes (`/admin/*`) and destructive actions (database seeding, schema migration, remote git execution) must be protected by authoritative, server-side cryptographic tokens or HttpOnly session validation—never by unauthenticated client-side cookies or headers.
6. **Mobile Touch & Accessibility**: All interactive elements maintain touch targets $\ge 44\text{px}$ in height and width. Analytical data tables support horizontal scroll with minimum width bounds (`min-w-[640px]`).

---

## 1. TARGET PRODUCT ARCHITECTURE: THE 5 CANONICAL PILLARS

| Canonical Pillar | Core Purpose | Canonical Route | Legacy / Compatibility Alias |
|---|---|---|---|
| **01 — Cockpit** | Career command center: target goal, weighted 5-dimension readiness index, priority skill gaps, and next action recommendations | `/cockpit` | `/dashboard` |
| **02 — Prepare** | Applied learning paths, 6-stage micro-lessons, hands-on drills, interactive technical studios, and template libraries | `/prepare` | `/learn` |
| **03 — Evaluate** | Diagnostic aptitude, practical technical sandboxes (Excel/SQL/Power BI/Python/n8n), case solving, and AI proctored interviews | `/evaluate` | `/mock-tests` |
| **04 — Career Passport** | Cryptographic proof-of-work identity, W3C VC 2.0 verifiable credentials, assessment percentiles, and high-DPI CV export | `/passport` | `/career-passport` |
| **05 — Opportunities** | Curated employer circulars, multi-factor skill-matching scores, and applicant pipeline tracking | `/opportunities` | `/jobs` |

### Secondary Contextual Modules & Tools
- **Public Verification Ledger**: `/verify/[id]` & `/passport/[id]` (Unauthenticated cryptographic verification)
- **AI Mock Interviews**: `/evaluate/interviews` (Aliased from `/mock-interviews`)
- **Interactive Case Challenges**: `/challenges` (Subordinate to Prepare/Evaluate)
- **Verified Credentials Archive**: `/certificates` (Subordinate to Passport)
- **Settings & Account Management**: `/settings`
- **Help Center & Methodology**: `/help`
- **System Administration & Database Explorer**: `/admin` & `/admin/db-explorer`

---

## 2. TECHNOLOGY STACK & CODEBASE RUNTIME

- **Framework**: Next.js 16.2.10 (App Router, Turbopack, React Server Components)
- **Routing & Proxy Gateway**: `proxy.ts` (Next.js 16 convention replacing legacy `middleware.ts`)
- **Runtime**: React 19.2.4 & React DOM 19.2.4
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`, vanilla CSS custom design tokens in `app/globals.css`
- **Typography**: `Nevera` font for primary brand logo & titles (`letter-spacing: 0.045em`), `Inter` for UI typography, `JetBrains Mono` for tabular metrics and code blocks, `Hind Siliguri` for Bengali localization
- **Backend as a Service (BaaS)**: Appwrite Cloud v1.6+ (`appwrite` ^26.2.0 client-side SDK, `node-appwrite` ^27.0.0 server-side SDK)
- **Schema Validation**: Zod (`zod` ^4.0.0)
- **Animation & Motion**: Framer Motion (`framer-motion` ^12.42.2)
- **Export & Rendering**: `html2canvas` (^1.4.1) & `jspdf` (^4.2.1)
- **Iconography**: Lucide React (`lucide-react` ^1.24.0)

---

## 3. DATABASE & STATE INTERCONNECTIVITY

### 14 Synchronized Appwrite Collections (`lib/db.ts`)
The platform synchronizes state between local client context (`UserContext`), offline `localStorage` caches, and remote Appwrite databases under Database ID `6a56075800013fce1aa1`:

1. `users`: Core profile document, streak counts, last check-in date, and subscription tier.
2. `tasks`: Daily operational checklist items and XP rewards.
3. `events`: Corporate workshops, networking webinars, and competition schedules.
4. `community_posts`: Peer discussion threads, comments, and sanitized updates.
5. `community_replies`: Threaded responses mapped to parent post IDs.
6. `mock_tests`: Diagnostic assessments, question counts, durations, and category taxonomies.
7. `workshops`: Masterclasses, instructor metadata, seat availability, and levels.
8. `certificates`: Earned credential records and issued designations.
9. `workshop_registrations`: Confirmed user seat reservations and ticketing payloads.
10. `test_attempts`: User diagnostic attempts, scores, and timestamps.
11. `paths`: Learning path metadata, syllabus outlines, and enrollment counts.
12. `courses`: Course definitions, modules, lesson counts, pricing tiers, and designations.
13. `profiles`: Extended candidate CV data, education history, and work experience.
14. `job_applications`: Candidate opportunity tracking (`applied`, `reviewing`, `interviewing`, `offered`, `rejected`).

### Synchronization & Debounce Mechanics
- **UserContext (`components/providers/user-context.tsx`)**: Central state container providing optimistic client-side updates.
- **Debounced Remote Persistence**: Whenever user profile, course progress, daily check-in, or badges mutate, updates are debounced by 1,000ms (`setTimeout(savePrefs, 1000)`) to prevent save storms against the Appwrite Preferences API and Document Collections.
- **Offline Fallback**: State changes are cached to `localStorage` under `insyt_enrolled_paths`, `insyt_subscription_tier`, and `insyt_passport_profile` to ensure seamless offline resilience under high latency.

---

## 4. FLAGSHIP CURRICULUM ARCHITECTURE (THE 6 FLAGSHIPS)

CAREERINSYT maintains 10 courses across learning paths, featuring 249 fully authored dynamic lessons (`lib/data/lessons.ts`):

### 1. Corporate Financial & Commercial Modeling in Excel (`CCFCM`)
- **Path**: `corporate-analyst` | **Slug**: `corporate-financial-commercial-modeling-excel`
- **Lessons**: 53 Lessons across 10 Modules | **Designation**: Certified Corporate Financial & Commercial Modeler (`CCFCM`)
- **Pedagogy**: FAST Standard modeling compliance, Price-Volume-Mix (PVM) variance algebra, indirect 3-statement cash flow reconciliation, working capital DSO/DIO cycles, and circularity breaker switches.
- **Studio & Artifacts**: `corporate-modeling-studio.tsx`, downloadable production workbook `insyt-financial-commercial-master-model.xlsx`.

### 2. Enterprise Python for Corporate Analytics & Process Automation (`CCDAS`)
- **Path**: `corporate-analyst` | **Slug**: `enterprise-python-corporate-analytics-process-automation`
- **Lessons**: 40 Lessons across 10 Modules | **Designation**: Certified Corporate Data Automation Specialist (`CCDAS`)
- **Pedagogy**: Python 3.12, pandas tabular hygiene (Cartesian product audits), openpyxl and XlsxWriter formatting, SQLAlchemy/DuckDB relational push-down queries, defensive logging, and 3-hour timed recruiter job simulation.
- **Studio**: `python-analytics-studio.tsx` with vendor payment normalization presets.

### 3. Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts (`CEBI`)
- **Path**: `corporate-analyst` | **Slug**: `enterprise-business-intelligence-power-bi-sql-corporate-analysts`
- **Lessons**: 48 Lessons across 12 Modules (120 learning hours) | **Designation**: Certified Enterprise Business Intelligence Analyst (`CEBI`)
- **Pedagogy**: ANSI SQL window functions/CTEs, Kimball 8-table star schemas, surrogate keys, CALCULATE filter context transitions, semi-additive measures, RLS, and executive decision memo writing.
- **Studio & Artifacts**: `bi-powerbi-sql-studio.tsx`, `insyt-bi-capstone-brief.md`, `insyt-bi-capstone-starter.sql`.

### 4. Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate (`CEAS`)
- **Path**: `applied-ai-automation` | **Slug**: `applied-workplace-ai-enterprise-workflow-automation`
- **Lessons**: 40 Lessons across 10 Modules (120 learning hours) | **Designation**: Certified Enterprise Automation Specialist (`CEAS`)
- **Pedagogy**: SIPOC & BPMN 2.0 mapping, OAuth 2.0 & webhooks, self-hosted n8n orchestrations, Power Automate Cloud & Desktop RPA selector drift, Microsoft Dataverse, Dead-Letter Queue (DLQ) retry patterns, and Nexus Global Logistics simulation.
- **Studio**: `workflow-automation-studio.tsx` with interactive node canvas and API request playground.

### 5. AI-Powered Workplace Professional
- **Path**: `ai-workplace-professional` | **Slug**: `ai-powered-workplace-professional`
- **Lessons**: 8 Lessons across 4 Modules
- **Pedagogy**: Few-shot Chain-of-Thought prompt engineering, Gemini Deep Research synthesis over 150-page annual reports, Google NotebookLM grounded citations, Bottom-Line-Up-Front (BLUF) boardroom memos, assertion-evidence slides, and enterprise PII redaction governance.

### 6. Digital Media & Video Production Systems (CapCut & Generative AI)
- **Path**: `digital-media-production` | **Slug**: `video-ai-production`
- **Lessons**: 36 Modules across 8 Stages
- **Pedagogy**: CapCut desktop multi-track precision editing, keyframing, motion tracking, sound design, ElevenLabs voice cloning, generative AI b-roll, and brand commercial launch package.

---

## 5. TRUST PLANE & CRYPTOGRAPHIC ENGINE (`lib/trust-plane/`)

The Trust Plane ensures verifiable, tamper-evident proof of candidate competence:

1. **RFC 8785 Canonicalization (`crypto.ts`)**: Normalized JSON serialization ensuring identical SHA-256 digests across diverse execution runtimes.
2. **Ed25519 Cryptographic Signatures & W3C VC 2.0**: Digital credentials signed using asynchronous Ed25519 keypairs, embedding W3C Data Integrity Proof 2022 standards.
3. **W3C Bitstring Status List v1.0**: High-efficiency credential revocation status lists encoded as Gzip-compressed Base64URL bitstreams.
4. **Append-Only Hash-Chained Audit Ledger (`audit-log.ts`)**: Every assessment event and state mutation is chained with `previousHash: SHA-256`, guaranteeing unalterable audit trails.
5. **Item Response Theory (IRT) & CAT Engine (`lib/psychometrics/irt.ts`)**: 1-Parameter Logistic (Rasch) Model calculating latent ability parameter $\theta$ with adaptive maximum Fisher Information item selection.
6. **Psychometric Reliability (`lib/psychometrics/statistics.ts`)**: Automated calculation of point-biserial discrimination ($r_{pbis} \ge 0.30$) and internal consistency reliability ($\text{Cronbach's } \alpha \ge 0.70$).
7. **Anti-Prompt-Injection & Delimiter Sanitizer (`lib/assessment/anti-injection.ts`)**: Dual-stage defense scanning for instruction overrides, score coercion, tag spoofing, and automatically redacting PII (emails, phone numbers, credit cards).
8. **Taxonomy Alignment (`lib/taxonomy/skills.ts`)**: Explicit cross-mapping of assessed skills to O*NET SOC 2019 occupational element codes.

---

## 6. READINESS INDEX ENGINE (`lib/assessment/readiness-index.ts`)

A weighted, evidence-based competency calculation:

$$\text{Readiness Index} = 0.25(\text{Cognitive}) + 0.25(\text{Technical}) + 0.20(\text{Case}) + 0.15(\text{Communication}) + 0.15(\text{Interview})$$

- **Readiness Version**: `2026.1-PROD`
- **Strict Incomplete Rule**: If fewer than 2 dimensions are evaluated, status displays:  
  *"Readiness assessment incomplete — complete diagnostics & capstones to calibrate"* rather than fabricating an arbitrary score.

---

## 7. DESIGN SYSTEM TOKENS & BRAND INTEGRITY

- **Background**: `#F7F8FC` (`--color-corp-bg`)
- **Surfaces**: `#FFFFFF` (`--color-corp-surface`)
- **Primary Text**: `#1A1D2E` (`--color-corp-text`)
- **Secondary Text**: `#4A4D63` (`--color-corp-text-secondary`)
- **Primary Accent**: `#3B5BDB` (`--color-corp-accent`)
- **Brand Typography**: `Nevera` with `letter-spacing: 0.045em` / `tracking-wider`
- **Border Radii**: Formal boxy styling (`--radius-sm: 4px`, `--radius-md: 4px`, `--radius-lg: 4px`)
- **Platform Badges (`components/ui/platform-badge.tsx`)**:
  - Container: Pure white (`#ffffff`) background with tier-specific border color.
  - Hover Micro-Animation: `scale-115 rotate-6` on icon container.
  - Tier Categories: Diamond (Emerald), Obsidian (Violet), Platinum (Royal Blue), Gold (Amber), Emerald (Cyan), Ruby (Rose).
  - Standard: Zero emoji characters; pure vector SVG iconography with W3C VC 2.0 verification stamps.

---

## 8. FEATURE FLAGS (`lib/config/feature-flags.ts`)

| Flag | State | Purpose |
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
