# CAREERINSYT — Supermassive Architectural & Quality Audit Prompt

You can copy and run the prompt below in any AI agent, code review panel, or security audit workflow to perform a deep, exhaustive audit of the CAREERINSYT platform:

```markdown
# Role & Mandate
You are an Elite Enterprise Full-Stack Architect, Staff Principal Engineer, and Security & Compliance Auditor. You have been tasked with conducting an exhaustive, supermassive audit of CAREERINSYT (formerly INSYT Corporate) — a next-generation Career Operating System for emerging corporate talent, management trainees (MTOs), and corporate analysts.

Your mandate is to examine every layer of the platform across architecture, database interconnectivity, cryptographic security, state management, learning management engines, design system fidelity, and operational performance.

---

## 1. Database & State Interconnectivity Audit
1. **Schema Integrity & Appwrite Collections**:
   - Verify that all active user collections (`users`, `tasks`, `events`, `community_posts`, `community_replies`, `mock_tests`, `workshops`, `certificates`, `workshop_registrations`, `test_attempts`, `paths`, `courses`, `profiles`, `jobApplications`) have matching client-side TypeScript types and strict null-safety checks in `lib/db.ts` and `lib/state/types.ts`.
   - Audit the bidirectional synchronization between local client state (`UserContext`), localStorage offline fallback caches, and remote Appwrite account preferences / document collections.
   - Ensure that whenever a user updates their profile (bio, education, skills, avatar, experience), completes a course module, claims daily streak points, or redeems vouchers, the mutation is immediately persisted to the database with defensive debounce mechanisms.
2. **Offline-First & Resilience**:
   - Test race-condition handling when network requests fail or when users operate under high latency.
   - Verify that optimistic UI updates do not silently revert without user notification.
   - Confirm that sensitive auth tokens and credentials never leak into unencrypted localStorage keys.

---

## 2. Platform Badges & Credentialing Engine Audit
1. **Backend-Backed Badge Filtering**:
   - Ensure that platform badges rendered in the Career Passport and Dashboard are strictly backend-backed.
   - If an account has not met the exact completion criteria (e.g. course progress < 100%, unverified assessment, missing credential record), the badge must NEVER render as unlocked or earned.
   - Verify the credential metadata: Designation, Issuing Body, Benchmark standard, verification link, and W3C VC 2.0 cryptographic signature integrity.
2. **Visual & Interaction Standards**:
   - Confirm that badge cards render in pure white (`#ffffff`) background containers with crisp borders and high-contrast typography.
   - Verify that all badge icons are non-white, domain-colored (Emerald, Violet, Sapphire, Amber), and exhibit responsive micro-animations on hover (`scale-115 rotate-6`).

---

## 3. Learning Management System (LMS) Curriculum Audit
Audit each of the platform's flagship curriculums for complete pedagogical depth, module structure, and exercise interactivity:
1. **Corporate Financial & Commercial Modeling in Excel**:
   - Verify all 10 Modules (53 Lessons, 5 Mini-Projects, 5 Capstone Options, CCFCM designation).
   - Check FAST modeling compliance, Price-Volume-Mix (PVM) variance formulas, circularity breaker switches, and 3-statement indirect cash flow reconciliation.
2. **Enterprise Python for Corporate Analytics & Process Automation**:
   - Verify all 10 Modules (40 Lessons, CCDAS designation).
   - Check pandas tabular pipelines, openpyxl/XlsxWriter styling, SQLAlchemy/DuckDB push-down queries, exception logging, and the 3-hour timed recruiter simulation.
3. **Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts**:
   - Verify all 12 Modules (48 Lessons, CEBI designation).
   - Check Kimball Star Schema modeling, advanced DAX filter contexts, Price-Volume-Mix decomposition, and Row-Level Security (RLS).
4. **Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate**:
   - Verify all 10 Modules (40 Lessons, CEAS designation).
   - Check n8n orchestrations, Power Automate Cloud & Desktop RPA, Dataverse integrations, and Dead-Letter Queue (DLQ) retry patterns.
5. **AI-Powered Workplace Professional**:
   - Verify all 4 Modules (8 Lessons).
   - Check Prompt Engineering frameworks, Gemini Deep Research, NotebookLM citations, BLUF boardroom memos, and enterprise AI governance.
6. **Digital Media & Video Production Systems**:
   - Verify all 8 Stages (36 Modules, 36 Lessons).
   - Check CapCut desktop precision cuts, sound design, keyframing, motion tracking, and generative AI video production.

---

## 4. UI/UX, Typography & Brand Consistency Audit
1. **Light Mode Purity**:
   - Verify that dark mode has been completely excised from the platform: no theme toggle artifacts, no lingering `.dark` selectors, no unstyled dark text on dark backgrounds.
   - Verify that all surfaces utilize the curated light corporate design system (`#F7F8FC` background, `#FFFFFF` surfaces, `#1A1D2E` primary text, `#3B5BDB` primary accent).
2. **Typography & Logo Standards**:
   - Ensure the `CAREERINSYT` brand title uses the `Nevera` font with positive letter-spacing (`letter-spacing: 0.045em` / `tracking-wider`) for a clean, premium executive presence.
   - Audit the brand logo mark across Header, Sidebar, Footer, and Navigation: verify that double borders have been eliminated, leaving only the clean drop-shadow.
   - Verify that the browser tab icon (favicon) correctly renders `logo_white.png` across all browsers and devices.

---

## 5. Security, Access Control & Enterprise Governance
1. **Authentication & Authorization**:
   - Inspect Appwrite session handling, cookie flags (`HttpOnly`, `SameSite=Lax`, `Secure`), and CSRF prevention.
   - Verify that administrative routes (`/admin/*`) require explicit role-based access control (RBAC) and cannot be bypassed via client-side routing.
2. **Data Privacy & PII Protection**:
   - Check that user phone numbers, emails, and financial model uploads are sanitized and protected against public leakage.
   - Audit AI chat endpoints (`/api/ai/*`) to verify that prompt injection shields and PII redaction patterns are enforced before external LLM dispatch.

---

## 6. Output Format of Your Audit
Please structure your audit report with:
1. **Executive Summary & System Health Score (0 - 100)**
2. **Critical Issues (Blockers / Security / Data Loss Risks)**
3. **High-Priority Improvements (State Sync, Badges, LMS Validation)**
4. **UI & Brand Polish Observations**
5. **Actionable Remediation Code Diffs**
```
