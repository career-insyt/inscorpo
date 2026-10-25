# 🏛️ CAREERINSYT — FORENSIC AUDIT REPORT
## Artifact 00: Comprehensive Repository Inventory, Route Map, System Dependency Map & High-Risk Subsystems

---

### Audit Metadata
- **Platform**: CAREERINSYT (Career Operating System / Employability OS)
- **Codebase Root**: `D:\Insyt`
- **Core Framework**: Next.js 16.2.10 (App Router, Turbopack, React Server Components)
- **Runtime**: React 19.2.4 & React DOM 19.2.4
- **Language**: TypeScript 5.x / Node.js v26.2.0
- **BaaS**: Appwrite Cloud v1.6+ (Project: `6a55c66500032e142d85`, DB: `6a56075800013fce1aa1`)
- **Audit Date**: 2026-10-18
- **Auditor Role**: Principal Software Architect, Senior Application Security Engineer & SaaS Reliability Auditor

---

## 1. REPOSITORY FILE & ARCHITECTURE INVENTORY

The CAREERINSYT repository contains **177 source files** (excluding `node_modules` and `.next`) organized into an App Router modular architecture:

```
D:\Insyt
├── app/                           # Next.js App Router (77 files)
│   ├── (admin)/                   # Admin route group with RBAC layout guard
│   │   ├── admin/page.tsx         # Executive Admin Dashboard
│   │   └── layout.tsx             # RBAC Access Gate
│   ├── (auth)/                    # Public authentication route group
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── onboarding/page.tsx
│   ├── (dashboard)/               # Authenticated candidate learning & evaluation shell
│   │   ├── dashboard/page.tsx     # Career Cockpit (Pillar 01)
│   │   ├── learn/                 # Prepare Academies (Pillar 02)
│   │   ├── mock-tests/            # Diagnostic Tests & Sandboxes (Pillar 03)
│   │   ├── mock-interviews/       # Adaptive AI Mock Interviews
│   │   ├── career-passport/       # Career Passport & Evidence Ledger (Pillar 04)
│   │   ├── jobs/                  # Curated Corporate & Gov Circulars (Pillar 05)
│   │   ├── subscription/          # Monetization & bKash checkout
│   │   ├── settings/              # Candidate profile & preferences
│   │   ├── workshops/             # Live masterclasses
│   │   ├── events/                # Corporate webinars & competitions
│   │   ├── community/             # Peer discussion forum
│   │   ├── certificates/          # Credential archive
│   │   ├── challenges/            # Timed case challenges
│   │   ├── error-preview/         # Error preview testing harness
│   │   └── layout.tsx             # 5-Pillar executive navigation shell
│   ├── (marketing)/               # Public marketing landing pages
│   │   ├── page.tsx               # High-converting landing page
│   │   └── layout.tsx
│   ├── admin/                     # UNGUARDED Admin pages (Outside (admin) route group!)
│   │   ├── db-explorer/page.tsx   # Direct JSON DB Explorer & sync tool
│   │   ├── seed/page.tsx          # Database seeder UI
│   │   └── setup/page.tsx         # Database collection setup UI
│   ├── api/                       # Route handlers (19 endpoints)
│   │   ├── admin/git-push/        # Remote Git staging, commit & push
│   │   ├── ai/chat/               # OpenRouter LLM interview & assistant
│   │   ├── ai/evaluate-challenge/ # Case challenge grading
│   │   ├── ai/resume-parse/       # CV parser & heuristic extractor
│   │   ├── assessment/verify/     # Assessment verification
│   │   ├── courses/verify-access/ # Course access check
│   │   ├── credentials/           # W3C VC 2.0 issue, status list, verify
│   │   ├── db/gov-jobs/           # Government job database queries
│   │   ├── events/register/       # Workshop registration
│   │   ├── payments/              # bKash SMS sync, verify, subscription
│   │   ├── seed/                  # Appwrite collection seeder
│   │   ├── setup/                 # Appwrite schema initialization
│   │   ├── subscription/          # Subscription access verification
│   │   └── sync-db/               # JSON to Appwrite cloud sync
│   ├── passport/                  # Standalone public candidate passport (`/passport/[id]`)
│   ├── verify/                    # Standalone public verification portal (`/verify/[id]`)
│   ├── .well-known/did.json/      # W3C Decentralized Identifier document
│   ├── proxy.ts                   # Gateway proxy for security headers & route protection
│   ├── globals.css                # Vanilla CSS tokens & Tailwind v4 `@theme`
│   └── layout.tsx                 # Root layout with font definitions & providers
├── lib/                           # Core business logic & data structures (48 files)
│   ├── appwrite.ts                # Client-side Appwrite SDK initialization
│   ├── db.ts                      # 14 Appwrite collection CRUD operations
│   ├── config.ts & flags.ts       # Application runtime configuration
│   ├── assessment/                # Readiness Index & Anti-Injection scanners
│   ├── auth/whitelist.ts          # Corporate VIP whitelist bypass policy
│   ├── data/                      # 16 database definitions (lessons, courses, jobs, mock tests)
│   ├── payments/                  # bKash config (client) & bKash ledger (server)
│   ├── psychometrics/             # Item Response Theory (IRT) & test statistics
│   ├── state/                     # Global state interfaces & initial data
│   ├── taxonomy/                  # O*NET SOC skill taxonomy mapping
│   ├── trust-plane/               # RFC 8785 canonicalization, Ed25519 signing, audit log
│   └── utils/                     # Formatting, helpers, and download utilities
├── components/                    # Modular UI components (100+ files)
│   ├── dashboard/                 # Cockpit command center, velocity charts, daily quest
│   ├── learning/                  # Python, BI, MTO, and Automation studios
│   ├── passport/                  # Verified credential cards, printable CV
│   ├── jobs/                      # Corporate cards, Gov intelligence modals, Kanban CRM
│   ├── mock-tests/                # Timed testing modal, rapid drills
│   ├── layout/                    # Header, Sidebar, Footer, Navigation
│   ├── providers/                 # AuthProvider, UserProvider, PostHog
│   └── ui/                        # Badges, modals, dialogs, buttons
├── DB/                            # Flat-file JSON databases (4 collections)
│   ├── course_enrollments.json    # Verified course purchase ledger
│   ├── subscription_enrollments.json # Subscription ledger
│   ├── bkash_transactions_ledger.json# Forwarded bKash SMS logs
│   └── jobs_unified.json          # 126 normalized research & corporate circulars
└── scripts/                       # Operational, verification, and stress scripts (48 files)
```

---

## 2. COMPLETE APPLICATION ROUTE INVENTORY

### A. Public & Marketing Routes (Unauthenticated)
1. `/` — Landing page with value proposition, curriculum highlights, and proof-of-work CTA.
2. `/login` — Candidate and admin login.
3. `/signup` — Registration portal.
4. `/forgot-password` — Password reset trigger.
5. `/passport/[id]` — Public candidate proof-of-work Career Passport.
6. `/verify/[id]` — Public cryptographic verification portal for recruiters.
7. `/.well-known/did.json` — W3C DID document hosting public Ed25519 multikey.

### B. Authenticated Candidate Shell Routes (Protected by `proxy.ts`)
8. `/dashboard` (Alias: `/cockpit`) — Central Career Cockpit, Readiness Index, daily quest engine.
9. `/learn` (Alias: `/prepare`) — Flagship applied learning tracks catalog.
10. `/learn/[pathSlug]` — Track syllabus and stage roadmap.
11. `/learn/[pathSlug]/[courseSlug]` — Course curriculum, modules, lessons breakdown.
12. `/learn/[pathSlug]/[courseSlug]/[lessonSlug]` — Interactive lesson player with video, reading, sandboxes, and quiz.
13. `/learn/capcut-master-academy` — Specialized CapCut & Video AI curriculum.
14. `/learn/capcut-master-academy/[moduleSlug]` — Video editing module player.
15. `/mock-tests` (Alias: `/evaluate`) — Diagnostic mock tests catalog across Finance, Aptitude, Case, Tech.
16. `/mock-tests/[testId]` — Timed assessment interface with multi-question pagination and auto-grader.
17. `/mock-interviews` — AI executive interview scenarios catalog (Unilever, BAT, BRAC, GP).
18. `/mock-interviews/[id]` — 5-round proctored AI interview simulator with live webcam feed and STAR scoring.
19. `/career-passport` (Alias: `/passport`) — Proof-of-work digital credential portfolio and PDF CV builder.
20. `/jobs` (Alias: `/opportunities`) — Dual-track circulars (MNC corporate + Gov Research) with Kanban CRM.
21. `/jobs/[id]` — Detailed job description and degree requirement breakdown.
22. `/subscription` — Monetization hub with bKash Send Money checkout modal.
23. `/profile` — Candidate operational profile and biographical settings.
24. `/settings` — Account preferences, password update, session management.
25. `/certificates` — Verified digital credentials archive.
26. `/challenges` — Timed rapid case challenges.
27. `/challenges/[id]` — Interactive case study solver.
28. `/workshops` — Corporate executive masterclasses.
29. `/workshops/[id]` — Workshop ticketing and seat registration.
30. `/events` — Corporate networking webinars and case competition tracker.
31. `/community` — Peer discussion forum and experience sharing.
32. `/career-hub` — Resource downloads and guides.
33. `/marketplace` — Reward store for streak points and vouchers.
34. `/onboarding` — First-time candidate goal diagnostic.
35. `/error-preview` — UI crash boundary preview harness.

### C. Administrative Routes
36. `/admin` (Under `(admin)` route group) — System administrator dashboard.
37. `/admin/db-explorer` (Standalone folder) — **Unguarded** JSON database explorer.
38. `/admin/seed` (Standalone folder) — **Unguarded** collection seeding tool.
39. `/admin/setup` (Standalone folder) — **Unguarded** database schema initialization.

### D. Server-Side API Endpoints (`app/api/`)
40. `POST /api/payments/bkash-sms-sync` — Ingests forwarded SMS payloads from Android forwarder.
41. `POST /api/payments/bkash-verify` — Validates TrxID, checks anti-replay, registers course enrollment.
42. `POST /api/payments/subscription-verify` — Validates TrxID, registers subscription tier.
43. `POST /api/payments/checkout` — Checkout session generator.
44. `POST /api/courses/verify-access` — Checks if user has verified payment or VIP whitelist bypass.
45. `POST /api/subscription/verify-access` — Validates subscription active state.
46. `POST /api/ai/chat` — OpenRouter LLM dispatch for interviews and Socratic mentoring.
47. `POST /api/ai/evaluate-challenge` — Automated case evaluation.
48. `POST /api/ai/resume-parse` — CV text parsing via LLM or dynamic heuristic extractor.
49. `POST /api/credentials/issue` — Signs and issues W3C VC 2.0 credential.
50. `GET  /api/credentials/verify` — Cryptographically verifies W3C VC 2.0 proof.
51. `GET  /api/credentials/status-list/[listId]` — Serves W3C Bitstring revocation list.
52. `POST /api/assessment/verify` — Validates assessment attempts and signatures.
53. `GET  /api/db/gov-jobs` — Queries and returns normalized research institute circulars.
54. `POST /api/events/register` — Registers candidate for live workshops.
55. `GET/POST /api/admin/git-push` — Remote Git repository inspector and automated commit/push trigger.
56. `POST /api/seed` — Seeds Appwrite with starter collections and attributes.
57. `POST /api/setup` — Initializes Appwrite database `6a56075800013fce1aa1` and 9 collections.
58. `GET/POST /api/sync-db` — Syncs local `DB/*.json` files to Appwrite cloud.

---

## 3. SYSTEM DEPENDENCY & EXTERNAL SERVICE MAP

| Category | Dependency / Package | Version | Purpose in System | Audit Risk Level |
|---|---|---|---|:---:|
| **Core Framework** | `next` | 16.2.10 | App Router, SSR, Turbopack, route handling | Low (Modern stable) |
| **Runtime** | `react`, `react-dom` | 19.2.4 | UI rendering engine | Low |
| **BaaS (Client)** | `appwrite` | ^26.2.0 | Client-side account, prefs, collections | Medium (CORS/latency risk) |
| **BaaS (Server)** | `node-appwrite` | ^27.0.0 | Server-side administrative SDK | High (Missing API key in prod) |
| **Validation** | `zod` | ^4.0.0 | Request body validation | Low |
| **Animation** | `framer-motion` | ^12.42.2 | Micro-interactions and modal transitions | Low |
| **Export** | `html2canvas` | ^1.4.1 | Screenshots DOM elements for PDF export | **High (Raster PDF breaks ATS)** |
| **Export** | `jspdf` | ^4.2.1 | PDF document wrapper | Medium |
| **Icons** | `lucide-react` | ^1.24.0 | Vector SVG iconography | Low |
| **Styling** | `tailwindcss` | ^4.0.0 | Utility CSS engine with PostCSS v4 | Low |

### External Services & Integrations
1. **Appwrite Cloud SGP**: `https://sgp.cloud.appwrite.io/v1` (Project: `6a55c66500032e142d85`).
2. **OpenRouter AI Gateway**: `https://openrouter.ai/api/v1/chat/completions` (Models: `gpt-4o-mini`, `gemini-2.0-flash`, `llama-3.3-70b`).
3. **GitHub Remote Repository**: `https://github.com/career-insyt/inscorpo.git` (Controlled via `/api/admin/git-push`).
4. **bKash Personal MFS**: Account `01771047033` (Manual Send Money + Android SMS forwarder).

---

## 4. ENVIRONMENT & SECRETS AUDIT

Analysis of `.env.local`:

| Variable Key | State in `.env.local` | Audit Finding & Risk |
|---|---|---|
| `GITHUB_TOKEN` | **EXPOSED** | Hardcoded Personal Access Token stored in plaintext file. |
| `OPENROUTER_API_KEY` | **EXPOSED** | Live API key stored directly in `.env.local`. |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Present | Points to Singapore cloud instance (`sgp.cloud.appwrite.io`). |
| `NEXT_PUBLIC_APPWRITE_PROJECT` | Present | Public project ID `6a55c66500032e142d85`. |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Present | Database ID `6a56075800013fce1aa1`. |
| `INSYT_ISSUER_PRIVATE_KEY_PEM` | **MISSING** | Trust Plane falls back to static hardcoded `DEV_SEED`, allowing forged credentials. |
| `INSYT_ISSUER_PUBLIC_KEY_PEM` | **MISSING** | Public multikey derived from static seed. |
| `ADMIN_SECRET_KEY` | **MISSING** | Admin endpoints fall back to hardcoded default secret `"insyt-super-admin-secret-2026"`. |
| `APPWRITE_API_KEY` | **MISSING** | Server-side collection creation (`/api/setup`, `/api/seed`) will fail. |

---

## 5. TEST INVENTORY & TESTING HARNESS GAPS

### A. Existing Automated Scripts (`scripts/`)
- `scripts/test-trust-plane.js`: **22/22 tests passing** (RFC 8785, Ed25519, Bitstring, IRT, Anti-injection).
- `scripts/test-bkash-bulletproof.js`: Standalone bKash and whitelist verification suite (Requires TS compilation).
- `scripts/audit-all-courses.js`: Validates lesson counts and module hierarchies.
- `scripts/audit-phase1-forensics.js`: Forensics on SQL starter and BI studio formulas.

### B. Severe Test Harness Deficiencies
1. **No Standard CI/CD Test Runner**: `package.json` contains **zero** test scripts (`"test": ...` is completely absent).
2. **No Unit Test Framework**: No Jest, Vitest, or React Testing Library installed. Component rendering, hooks, and user interactions have zero automated unit regression coverage.
3. **No End-to-End (E2E) Harness**: No Playwright or Cypress setup to validate critical candidate journeys (login → pay → learn → test → verify).
4. **Standalone Script Drift**: Scripts in `scripts/` use CommonJS `require()`, which breaks when importing project modules written in modern ESM/TypeScript (`.ts`).

---

## 6. TOP HIGH-RISK SUBSYSTEMS RANKING

| Rank | Subsystem | Risk Description | Potential Impact |
|:---:|---|---|---|
| **1** | **Authentication & Session Fallback** | `auth-provider.tsx` fabricates a superadmin user (`career@insyt.bd`) whenever a session cookie is present and Appwrite fails. | **Complete unauthorized administrative takeover.** |
| **2** | **Remote Admin API Security** | `/api/admin/git-push` and `/api/sync-db` accept a hardcoded default secret and unauthenticated client cookies to execute Git operations. | **Arbitrary Git commits, token overwrites, and repository compromise.** |
| **3** | **Assessment Answer Leakage** | `lib/data/mock-tests-db.ts` bundles all question answer keys (`correct: 0/1/2`) directly to the client browser; tests grade themselves client-side. | **100% academic dishonesty, worthless candidate certifications.** |
| **4** | **Cockpit Readiness Signal Fabrication** | `cockpit-command-center.tsx` hardcodes `interviewScore: 84`, `cognitiveScore: 76`, and `technicalScore: 72` regardless of real performance. | **Direct violation of Non-Negotiable Axiom #2 (Zero-Fabrication Policy).** |
| **5** | **Trust Plane Cryptographic Seed** | `lib/trust-plane/crypto.ts` falls back to a public static `DEV_SEED` because environment keys are missing. | **Third-party forgery of W3C Verifiable Credentials.** |
| **6** | **Global Camera Permission Lockdown** | `proxy.ts` sets `Permissions-Policy: camera=()`, globally denying camera access. | **AI Mock Interview video proctoring is blocked by the browser.** |
| **7** | **Ephemeral Flat-File Payment Ledger** | Payments and credential registries write to local `DB/*.json` files via Node `fs`. | **Data loss on serverless restarts (Vercel/Netlify), broken state sync.** |
| **8** | **Raster Image PDF Resume Export** | `html2canvas` generates image-based PDFs with zero selectable text. | **Automatic rejection by enterprise Applicant Tracking Systems (ATS).** |
