# 🏛️ CAREERINSYT — SYSTEM ARCHITECTURE CONTEXT & OPERATING MANIFESTO
*(Formerly INSYT Corporate | Employability Operating System)*

> **Strategic Identity**: **CAREERINSYT = Employability Operating System (Career OS)**  
> **Core Operating Loop**: `Goal → Diagnose → Prepare → Practice → Evaluate → Prove → Discover Opportunities`  
> **Core Value Proposition**: Day-one operational capability verification for emerging corporate talent, Management Trainee Officers (MTOs), and corporate analysts across high-growth corporate sectors.
> **Master Forensic Audit Status**: Comprehensive 16-Artifact Forensic Audit completed in [`AUDIT_REPORTS/`](file:///d:/Insyt/AUDIT_REPORTS/) (Composite Score: **48/100**, Launch Verdict: **NO-GO (CRITICAL BLOCKERS)**). See [`15-final-audit-synthesis.md`](file:///d:/Insyt/AUDIT_REPORTS/15-final-audit-synthesis.md).

---

## 0. NON-NEGOTIABLE ARCHITECTURAL AXIOMS

1. **Employability Operating System, Not an Academic LMS**: CAREERINSYT explicitly rejects the low-impact architecture of generic video course libraries, commoditized tutorials, and passive completion certificates. Every learning artifact is an applied, verifiable work sample.
2. **Zero-Fabrication Policy (No Fake Signals)**: Do not create fake partner logos, fake recruiter endorsements, fake job circulars, fabricated readiness scores, or synthetic user completion badges. If fewer than 2 diagnostic dimensions are completed, state: *"Readiness assessment incomplete — complete diagnostics & capstones to calibrate"*.
3. **Evidence Over Completion**: Course completion (watching videos or reading text) does NOT equal verified competence. Credentials, designations, and badges must strictly depend on server-evaluated technical sandboxes, algorithmic grading, or cryptographically sealed work samples.
4. **Light Mode Corporate Purity**: The platform interface is strictly light-mode executive grade (`#F7F8FC` background, `#FFFFFF` surfaces, `#1A1D2E` primary text, `#3B5BDB` primary accent, `#10B981` verification emerald). No dark-mode toggle artifacts, no lingering `.dark` selectors, and no unreadable low-contrast text.
5. **Defense-in-Depth Security**: All administrative routes (`/admin/*`) and destructive actions (database seeding, schema migration, remote git execution) must be protected by authoritative, server-side cryptographic tokens or HttpOnly session validation—never by unauthenticated client-side cookies or headers.
6. **Mobile Touch & Accessibility**: All interactive elements maintain touch targets $\ge 44\text{px}$ in height and width. Analytical data tables support horizontal scroll with minimum width bounds (`min-w-[640px]`). Swapped mobile navigation places the daily streak status in prominent access with clean drawer controls.

---

## 1. PRODUCT ARCHITECTURE: THE 5 CANONICAL PILLARS

| Canonical Pillar | Core Purpose | Canonical Route | Legacy / Compatibility Alias |
|---|---|---|---|
| **01 — Cockpit** | Career command center: target goal, weighted 5-dimension readiness index, priority skill gaps, weekly velocity heatmap, and actionable recommendations | `/cockpit` | `/dashboard` |
| **02 — Prepare** | Applied learning paths, 6-stage micro-lessons, hands-on drills, interactive technical studios, and production template libraries | `/prepare` | `/learn` |
| **03 — Evaluate** | Diagnostic aptitude, practical technical sandboxes (Excel/SQL/Power BI/Python/n8n), case solving, and AI proctored interviews | `/evaluate` | `/mock-tests` |
| **04 — Career Passport** | Cryptographic proof-of-work identity, W3C VC 2.0 verifiable credentials, assessment percentiles, and 1-click CV export | `/passport` | `/career-passport` |
| **05 — Opportunities** | Curated employer circulars (MNCs + Gov Research Institutes), multi-factor skill-matching scores, and Kanban applicant pipeline tracking | `/opportunities` | `/jobs` |

### Secondary Contextual Modules & Tools
- **Public Verification Ledger**: `/verify/[id]` & `/passport/[id]` (Unauthenticated cryptographic verification)
- **AI Mock Interviews**: `/mock-interviews` & `/mock-interviews/[id]` (Aliased under `/evaluate/interviews`)
- **Interactive Case Challenges**: `/challenges` (Subordinate to Prepare/Evaluate)
- **Verified Credentials Archive**: `/certificates` (Subordinate to Passport)
- **Subscription & Licensing Hub**: `/subscription` (bKash personal Send Money checkout, VIP whitelist bypass)
- **Settings & Account Management**: `/settings`
- **Help Center & Methodology**: `/help`
- **System Administration & Database Explorer**: `/admin` & `/admin/db-explorer`

---

## 2. TECHNOLOGY STACK & CODEBASE RUNTIME

- **Framework**: Next.js 16.2.10 (App Router, Turbopack, React Server Components)
- **Routing & Proxy Gateway**: `proxy.ts` (Next.js 16 convention replacing legacy `middleware.ts`)
- **Runtime**: React 19.2.4 & React DOM 19.2.4
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`, vanilla CSS custom design tokens in `app/globals.css`
- **Typography**: 
  - `Nevera`: Primary brand logo & title headings (`letter-spacing: 0.045em`, `tracking-wider`)
  - `Inter`: Executive UI typography & body text
  - `JetBrains Mono`: Tabular financial data, routing codes, code playgrounds, and cryptographic hashes
  - `Hind Siliguri`: Bengali localization for local payment flows and instructions
- **Backend as a Service (BaaS)**: Appwrite Cloud v1.6+ (`appwrite` ^26.2.0 client SDK, `node-appwrite` ^27.0.0 server SDK)
- **Schema Validation**: Zod (`zod` ^4.0.0)
- **Animation & Motion**: Framer Motion (`framer-motion` ^12.42.2)
- **Export & Rendering**: `html2canvas` (^1.4.1) & `jspdf` (^4.2.1)
- **Iconography**: Lucide React (`lucide-react` ^1.24.0)

---

## 3. DATABASE, STORAGE & STATE INTERCONNECTIVITY

### A. 14 Synchronized Appwrite Collections (`lib/db.ts`)
The platform synchronizes state between client state (`UserContext`), offline `localStorage` caches, and remote Appwrite databases under Database ID `6a56075800013fce1aa1`:

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

### B. Local JSON Ledger & Unified Datasets (`DB/`)
- `DB/course_enrollments.json`: Authoritative course payment verification ledger.
- `DB/subscription_enrollments.json`: Tiered subscription access ledger.
- `DB/bkash_transactions_ledger.json`: Ingested bKash SMS logs from automated forwarders.
- `DB/jobs_unified.json`: Unified dataset of Bangladesh research institute and corporate circulars.

### C. Synchronization & Debounce Mechanics
- **UserContext (`components/providers/user-context.tsx`)**: Central state container providing optimistic client-side updates.
- **Debounced Remote Persistence**: Whenever user profile, course progress, daily check-in, or badges mutate, updates are debounced by 1,000ms (`setTimeout(savePrefs, 1000)`) to prevent save storms against Appwrite.
- **Offline Fallback**: State changes are cached to `localStorage` under `insyt_enrolled_paths`, `insyt_subscription_tier`, and `insyt_passport_profile` to ensure seamless offline resilience.

---

## 4. PAYMENT ARCHITECTURE & MONETIZATION SUBSYSTEM

CAREERINSYT utilizes a localized, high-convenience payment engine designed specifically for Bangladesh's mobile financial services (MFS) ecosystem:

### 1. Configuration & Client/Server Separation
To strictly prevent Turbopack/Next.js build errors (`Can't resolve 'fs'`), payment logic is cleanly decoupled:
- **Client-Safe Module (`lib/payments/bkash-config.ts`)**: Contains pricing schedules, course slug normalization, and interface types with zero Node.js built-ins. Safe for `"use client"`.
- **Server Ledger (`lib/payments/bkash-ledger.ts`)**: Contains filesystem operations (`fs`), cryptographic HMAC generation (`crypto`), anti-replay validation, and SMS parsers. Strictly executed on the server.

### 2. Payment Details & Testing Pricing
- **bKash Receiver Number**: `01771047033` (Personal Account / Send Money option).
- **Excel Financial Modeling Course Price**: `0.01 BDT` (`৳0.01`) for instantaneous verification testing.
- **Standard Course Price**: `990.00 BDT` (`৳990.00`).
- **Subscription Tiers**: Starter (`৳0`), Pro Monthly (`৳799`), Flagship Path (`৳1,999`), Pro Annual (`৳4,999`).

### 3. Corporate Whitelist & VIP Free Bypass (`lib/auth/whitelist.ts`)
- **VIP Accounts**: `z65gt9@gmail.com` and any user with an `@insyt.bd` email domain receive **100% Free Lifetime VIP Access** across all courses, lessons, and subscription tiers without requiring bKash verification.
- **Enforcement**: Validated both on client UI modals and server-side verification endpoints (`/api/courses/verify-access`, `/api/payments/bkash-verify`, `/api/payments/subscription-verify`).

### 4. Verification & Anti-Replay Defense
- **Dual-Ingestion**:
  1. **Automated SMS Webhook (`/api/payments/bkash-sms-sync`)**: Ingests forwarded bKash SMS messages via Android forwarders or SIM gateways into `DB/bkash_transactions_ledger.json`.
  2. **Candidate Instant Verification (`/api/payments/bkash-verify` & `/api/payments/subscription-verify`)**: Validates TrxID format (8-12 alphanumeric characters), checks sender phone number, confirms amount matches expected fee, and verifies that the TrxID has not been claimed previously (anti-replay defense).
- **HMAC-SHA256 Signatures**: Each verified enrollment is sealed with an HMAC-SHA256 security hash (`generateEnrollmentSecurityHash`) linking user email, course slug, TrxID, and amount paid.

---

## 5. FLAGSHIP CURRICULUM ARCHITECTURE (THE 6 FLAGSHIPS)

CAREERINSYT maintains 10 courses across learning paths, featuring 249 fully authored dynamic lessons (`lib/data/lessons.ts`):

### 1. Corporate Financial & Commercial Modeling in Excel (`CCFCM`)
- **Path**: `corporate-analyst` | **Slug**: `corporate-financial-commercial-modeling-excel`
- **Lessons**: 53 Lessons across 10 Modules | **Designation**: Certified Corporate Financial & Commercial Modeler (`CCFCM`)
- **Testing Price**: `0.01 BDT`
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

## 6. EVALUATION, AI MOCK INTERVIEWS & PROCTORING

### 1. High-Stakes Adaptive Mock Interviews (`/mock-interviews`)
- **Company Scenarios**: Tailored dilemmas for Unilever Bangladesh, BAT Bangladesh, BRAC Bank, Standard Chartered, and Grameenphone.
- **5-Stage Escalation Loop**:
  1. *Round 1*: Strategic Framing & Root Cause Diagnostic
  2. *Round 2*: Quantitative Trade-offs & Unit Economics
  3. *Round 3*: Macro Shock Stress-Test (Inflation & FX Pressure)
  4. *Round 4*: Cross-Functional Conflict & Operational Pushback
  5. *Round 5*: Executive Board Defense & Strategic Synthesis
- **Proctoring Engine**:
  - Live browser WebCam feed with stream error recovery.
  - Native fullscreen lock with exit tracking.
  - Tab switch and external window blur detection (`visibilitychange` listener).
  - Gaze and posture simulation monitors.
- **STAR Rubric Scorecard**:
  - Granular scoring across Situation/Task (25), Action Specificity (25), Quantified Result (25), and Executive Presence (25).
  - Explicit extraction of `**Executive Critique:**` and `**Critical Flaw:**`.

### 2. Dual-Engine LLM Fallback & Sanitization (`/api/ai/chat`)
- **Primary Route**: OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`) routing to `gpt-4o-mini`, `gemini-2.0-flash`, or `llama-3.3-70b-instruct`.
- **Anti-Prompt-Injection Scanner (`lib/assessment/anti-injection.ts`)**: Pre-scans candidate inputs for delimiter manipulation, prompt overriding, and redacts PII before model ingestion.
- **Deterministic Smart Fallback**: If external API keys are unavailable or rate-limited, provides structured, scenario-relevant evaluations to guarantee zero UI crashes.

---

## 7. CAREER PASSPORT & TRUST PLANE (`lib/trust-plane/`)

The Trust Plane ensures verifiable, tamper-evident proof of candidate competence:

1. **RFC 8785 Canonicalization (`crypto.ts`)**: Normalized JSON serialization ensuring identical SHA-256 digests across diverse execution runtimes.
2. **Ed25519 Cryptographic Signatures & W3C VC 2.0**: Digital credentials signed using asynchronous Ed25519 keypairs, embedding W3C Data Integrity Proof 2022 standards.
3. **W3C Bitstring Status List v1.0**: High-efficiency credential revocation status lists encoded as Gzip-compressed Base64URL bitstreams.
4. **Append-Only Hash-Chained Audit Ledger (`audit-log.ts`)**: Every assessment event and state mutation is chained with `previousHash: SHA-256`, guaranteeing unalterable audit trails.
5. **Item Response Theory (IRT) & CAT Engine (`lib/psychometrics/irt.ts`)**: 1-Parameter Logistic (Rasch) Model calculating latent ability parameter $\theta$ with adaptive maximum Fisher Information item selection.
6. **Psychometric Reliability (`lib/psychometrics/statistics.ts`)**: Automated calculation of point-biserial discrimination ($r_{pbis} \ge 0.30$) and internal consistency reliability ($\text{Cronbach's } \alpha \ge 0.70$).
7. **Public Verification Ledger (`/verify/[id]`)**: Unauthenticated portal allowing employers to independently verify credential authenticity and SHA-256 hashes.
8. **Printable CV & Passport Export**: Client-side high-DPI export powered by `html2canvas` and `jspdf`.

---

## 8. OPPORTUNITIES & RECRUITMENT INTELLIGENCE (`/jobs`)

A unified dual-track recruitment board:

### Track A: Corporate MNC & Private Sector Opportunities
- Curated corporate analyst, business intelligence, and MTO circulars.
- Automated multi-factor skill matching calculated against candidate's verified Passport skills.
- Direct salary benchmarks and departmental segmentation.

### Track B: Bangladesh Government Research Intelligence (`lib/data/gov-jobs-db.ts`)
- Circulars for key agricultural and scientific research bodies:
  - **BARI**: Bangladesh Agricultural Research Institute
  - **BRRI**: Bangladesh Rice Research Institute
  - **BJRI**: Bangladesh Jute Research Institute
  - **BINA**: Bangladesh Institute of Nuclear Agriculture
  - **BTRI**: Bangladesh Tea Research Institute
  - **BSRI**: Bangladesh Sugarcrop Research Institute
- Mapped strictly under **National Pay Scale 2015** (Grades 9 to 16).
- Intelligence filter matching applicant degrees (B.Sc., M.Sc., Diploma) to official gazetted requirements.

### Integrated Kanban CRM
- 4-Column pipeline: `Applied` → `Under Review` → `Interviewing` → `Offered / Pre-Placement`.
- Local persistence in Appwrite collection `job_applications` with offline `localStorage` fallback.

---

## 9. READINESS INDEX ENGINE (`lib/assessment/readiness-index.ts`)

A weighted, evidence-based competency calculation:

$$\text{Readiness Index} = 0.25(\text{Cognitive}) + 0.25(\text{Technical}) + 0.20(\text{Case}) + 0.15(\text{Communication}) + 0.15(\text{Interview})$$

- **Readiness Version**: `2026.1-PROD`
- **Strict Incomplete Rule**: If fewer than 2 dimensions are evaluated, status displays:  
  *"Readiness assessment incomplete — complete diagnostics & capstones to calibrate"* rather than fabricating an arbitrary score.

---

## 10. DESIGN SYSTEM TOKENS & BRAND INTEGRITY

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

## 11. FEATURE FLAGS (`lib/config/feature-flags.ts`)

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

---

## 12. KNOWN ARCHITECTURAL DEBT & TECHNICAL UPGRADE ROADMAP

An objective audit of current technical limitations and their remediation paths:

| Subsystem | Current State / Weakness | Production Upgrade Roadmap |
|---|---|---|
| **Video Delivery** | All lesson `videoUrl` fields reference sample assets (`mov_bbb.mp4`). | Implement adaptive HLS/DASH streaming with DRM via Cloudflare Stream or Mux. |
| **Code Execution** | `PythonAnalyticsStudio` uses preset outputs via timer rather than running code. | Embed **Pyodide (Python in WebAssembly)** for client-side zero-cost isolated execution. |
| **CV Export** | `html2canvas` captures DOM screenshots, making exported PDFs raster images (fails ATS). | Migrate to `@react-pdf/renderer` or `pdfmake` for true selectable vector ATS text. |
| **Payment Ledger** | Uses local `DB/*.json` flat files via Node `fs` (incompatible with serverless Vercel). | Migrate transaction records to remote Appwrite database collections or Postgres. |
| **bKash Verification** | Relies on SMS forwarder webhook or regex syntax checks without live merchant PGW. | Integrate official bKash Merchant Checkout API (URL-based redirect or tokenized checkout). |
| **Mock Interview Input**| Text-based chat input eliminates the real-world pressure of spoken communication. | Implement browser SpeechRecognition (`webkitSpeechRecognition`) for spoken candidate answers. |
| **Two-Sided Hiring** | Kanban tracker is candidate-facing only; does not transmit candidate dossiers to HR ATS. | Build recruiter portal (`/recruiter`) with candidate search and direct applicant routing. |
