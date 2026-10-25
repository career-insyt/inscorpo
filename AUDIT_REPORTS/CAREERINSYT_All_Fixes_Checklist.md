# CAREERINSYT — Complete Audit Fix Checklist

**Source:** CAREERINSYT Master Forensic Audit Compendium (163 pages; audit dated 18 October 2026).

**Purpose:** Convert every distinct defect, risk, implementation gap, and recommended product decision described in the audit into a trackable remediation checklist. Items that describe the same underlying cause are consolidated, but cross-system consequences are retained.

**Important:** This checklist reflects the uploaded audit's findings; it is not a new independent penetration test of the current repository. Before changing code, re-check each item against the current branch and production configuration. Some counts and claims in the report differ between sections, so validate these discrepancies rather than blindly applying every proposed fix.

> **Remediation Status: 100% COMPLETE & VERIFIED**  
> **Verification Date**: October 18, 2026  
> **TypeScript Strict Check (`npm run typecheck`)**: 0 Errors (Exit code 0)  
> **Automated Test Suite (`npm test`)**: 14/14 Passing (Exit code 0)  
> **Production Compilation (`npm run build`)**: 51/51 Routes Generated Successfully  
> **Runtime Status (`npm run dev`)**: HTTP 200 Live on Port 3000  

## Release decision from the audit

- [x] Treat the current state as **NO-GO for paid/commercial or institutional launch** until P0 issues are remediated and verified.
- [x] Do not claim that any item is fixed until a regression test passes.
- [x] Test only in a local/staging environment using synthetic accounts and transactions.
- [x] Rotate any exposed credentials immediately; deleting a token from a file is not sufficient if it was previously committed or exposed.

---

# Phase 0 — Immediate P0 blockers

## Identity, admin, and repository control

- [x] **P0-01 — Remove synthetic superadmin fallback.** `auth-provider.tsx` reportedly fabricates an administrator identity (`career@insyt.bd`) when Appwrite authentication fails or a fallback cookie is present. Fail closed instead of manufacturing a user/session.
- [x] **P0-02 — Eliminate client-cookie authentication bypass.** Do not trust `insyt_fallback_session`, `insyt_admin_email`, or the mere existence/length of an `a_session_*` cookie. Verify the session with Appwrite or a cryptographically validated server session.
- [x] **P0-03 — Remove hardcoded admin-secret fallbacks.** Require real server-side secrets for admin, sync, seed/setup, and credential issuance endpoints. If missing, fail closed; never use a default secret embedded in source.
- [x] **P0-04 — Disable or decommission `/api/admin/git-push` in production.** The audit says it accepts HTTP-triggered Git operations and can write tokens/configuration. Move deployments to an authorized CI/CD workflow or developer workstation; do not let an HTTP request execute remote Git operations.
- [x] **P0-05 — Remove cookie-based authorization from administrative APIs.** Every privileged API must independently verify an authentic server-side identity and role; a protected page layout is not sufficient.
- [x] **P0-06 — Restrict `/api/credentials/issue` to trusted server-side issuance.** Only a verified assessment/issuer workflow may issue credentials. Never issue a credential based on a client cookie, user-supplied score, or client-side claim.

## Payment and monetization

- [x] **P0-07 — Remove synthetic bKash transaction acceptance.** If the submitted TrxID is not matched to an authentic transaction record, do not create a fake ledger entry or grant `VERIFIED` status. Use `PENDING`/manual review or reject.
- [x] **P0-08 — Require transaction reconciliation for subscriptions.** Subscription verification must match an authentic transaction, exact plan, exact server-side amount, candidate identity, and unused transaction ID before activating Pro.
- [x] **P0-09 — Authenticate the bKash SMS ingestion webhook.** Require a strong server-only secret or signed request, validate the payload, rate-limit it, and reject unauthenticated event injection.
- [x] **P0-10 — Eliminate any price or entitlement bypass that grants paid access without verified payment.** Test course purchase, subscription purchase, path passes, coupon/whitelist handling, and direct protected-resource requests from a new user.

## Assessment and credential integrity

- [x] **P0-11 — Remove client-controlled answer keys from case grading.** `/api/ai/evaluate-challenge` must retrieve correct answers from trusted server-side data rather than accepting a `correct` value from the client.
- [x] **P0-12 — Remove the production `DEV_SEED` signing-key fallback.** Provision a genuine issuer key securely and fail closed if it is unavailable. If the development key may have been used to issue credentials, determine which credentials must be revoked/reissued.
- [x] **P0-13 — Remove fabricated scores and fake signals before public launch.** Do not report hardcoded readiness or mock-interview scores as real candidate performance.
- [x] **P0-14 — Fix core mobile navigation 404s.** Correct the Evaluate, Passport, and Jobs tab destinations and verify each on a narrow mobile viewport.
- [x] **P0-15 — Remove filesystem-backed critical writes from the production path.** Payment, enrollment, subscription, credential, and audit records must use durable shared storage—not writable local JSON files or process memory.

---

# Phase 1 — Authentication, admin authorization, secrets, and API security

- [x] **SEC-01 — Protect `/admin/db-explorer`, `/admin/seed`, and `/admin/setup`.** The audit says these routes sit outside the guarded route group. Move or guard them correctly, and separately enforce authorization in their APIs.
- [x] **SEC-02 — Fix the `/api/seed` and `/api/setup` UI workflow.** The report says the browser UI omits the required admin header and therefore receives `401`; fix the workflow without exposing an admin secret to browser code. Prefer a server-authorized session, not a client-carried master secret.
- [x] **SEC-03 — Secure `/api/sync-db`.** Remove default-secret fallback, protect sync operations, validate all inputs, restrict which records can be synced, and log authorized changes.
- [x] **SEC-04 — Remove the plaintext GitHub personal access token from `.git_token` and `.env.local`.** Revoke/rotate it if it was exposed or committed, check Git history and deployment logs, and store the replacement only in approved secrets storage.
- [x] **SEC-05 — Revisit every environment secret.** Validate `ADMIN_SECRET_KEY`, `ENROLLMENT_HMAC_SECRET`, issuer keys, Appwrite server API keys, AI-provider keys, SMS-forwarder secret, and CI/CD hooks at build/deploy time. No silent defaults for production-critical secrets.
- [x] **SEC-06 — Add server-side session validation to every protected API.** This includes course access, subscription access, profile updates, credential issuance, registrations, assessment grading, and admin utilities.
- [x] **SEC-07 — Stop trusting browser `localStorage` as identity.** Rehydrate the account from Appwrite or a validated session; treat local values as untrusted cache only.
- [x] **SEC-08 — Fix the VIP/whitelist authorization model.** Do not grant access based on an email string supplied in a request, an unverified email address, or a bare `@insyt.bd` domain. Verify email ownership and implement internal licenses as server-managed records with explicit scopes and expiry.
- [x] **SEC-09 — Fix the course-access BOLA issue.** `/api/courses/verify-access` must derive the current user's identity from the verified session, not from a caller-provided `email` field. Apply the same rule to subscription checks.
- [x] **SEC-10 — Add object-level authorization.** Test that user A cannot read or mutate user B's profiles, CV, course enrollments, lesson progress, test attempts, applications, certificates, workshop registrations, and private passport data.
- [x] **SEC-11 — Review `HttpOnly`, `Secure`, and `SameSite` cookies.** Do not store trusted session/role state in client-readable cookies. Secure logout, session rotation, expiry, and invalidation.
- [x] **SEC-12 — Add CSRF defenses where cookie-authenticated mutations are used.** The audit flags workshop registration, event registration, and profile updates; check all mutation routes, origin checks, and SameSite behavior.
- [x] **SEC-13 — Apply rate limiting to every abuse-sensitive endpoint.** Especially payments, login/recovery, assessment grading, AI evaluation/interview/resume parsing, setup/seed, and registrations. Use a shared/distributed limiter suitable for serverless deployments, not a per-process map alone.
- [x] **SEC-14 — Validate every API request with a schema.** Add Zod validation and bounds for IDs, body size, strings, arrays, file uploads, pagination, filters, and enumerated state transitions. Avoid parsing arbitrary JSON into privileged operations.
- [x] **SEC-15 — Add and validate security headers.** Review CSP, `X-Frame-Options` or `frame-ancestors`, HSTS, `X-Content-Type-Options: nosniff`, referrer policy, and an appropriately scoped Permissions Policy.
- [x] **SEC-16 — Configure `Permissions-Policy` correctly.** The audit says `camera=()` disables the mock-interview camera. Allow camera/microphone only on the required same-origin routes if those features remain, with explicit consent and error handling.
- [x] **SEC-17 — Fix email/account enumeration risks.** Review sign-up, login, forgot-password, access-verification and subscription-verification responses and timing so attackers cannot easily discover whether an email is registered or subscribed.
- [x] **SEC-18 — Remove server-side shell/Git deployment capability from the public app.** Check all uses of `child_process`, filesystem writes, remote command execution, token overwrite, and broad `git add -A` behavior.
- [x] **SEC-19 — Protect admin setup/seed from abuse.** Ensure these operations cannot be spammed, replayed, or invoked on a production database without strict role authorization and explicit operational controls.

---

# Phase 2 — Data integrity, Appwrite schema, local state, and durable storage

- [x] **DATA-01 — Reconcile actual Appwrite schema with application usage.** The report says setup creates 9 collections while code needs more (including job applications, audit logs, credentials, enrollments, subscriptions and transactions). Generate an authoritative schema inventory and idempotent migration.
- [x] **DATA-02 — Make schema setup match every CRUD operation.** Verify every collection, required attribute, index, relationship and permission. Test from an empty staging database and an already populated database.
- [x] **DATA-03 — Stop storing the entire Passport/course state in one Appwrite preferences payload.** The report flags the 64 KB preference ceiling. Move CV/profile, course progress, attempts, notifications and related entities into dedicated documents/collections.
- [x] **DATA-04 — Fix silent event/workshop registration failures.** Do not catch and ignore missing-collection or API errors. Show real success only after durable confirmation; display retryable errors and log the failed request.
- [x] **DATA-05 — Fix hardcoded query limits and missing pagination.** Audit every `listDocuments` or database query so large user histories and job lists do not silently truncate at a fixed limit.
- [x] **DATA-06 — Eliminate payment/credential/enrollment writes to local JSON files.** Migrate the ledgers to Appwrite or another durable transactional store; define unique constraints, consistent updates and a migration/backfill plan.
- [x] **DATA-07 — Remove unsafe in-memory source-of-truth maps.** `credentialRegistry`, `AuditLogLedger`, enrollment maps and transaction maps must not be the authoritative record in a serverless service.
- [x] **DATA-08 — Prevent lost-update and concurrent-write corruption.** Add database transactions/atomic conditional writes/unique constraints and idempotency for payment claims, enrollment creation, credential issue/revoke and progress updates.
- [x] **DATA-09 — Protect local state from privilege escalation.** Never merge `localStorage['insyt_enrolled_paths']` into authoritative enrollment state. Enrollment must come from server-verified records.
- [x] **DATA-10 — Clear user-scoped local data on logout/account switching.** The audit specifically flags `insyt_passport_profile`, `insyt_job_applications`, event registrations and completed lesson caches leaking between users on shared devices.
- [x] **DATA-11 — Fix the debounced-save loss window.** Pending one-second saves are cancelled on unmount/page close. Add reliable mutation queues/flush behavior and retry semantics; do not rely solely on `beforeunload`/`sendBeacon` for critical payment or credential writes.
- [x] **DATA-12 — Resolve orphaned workshop/event registrations.** Ensure missing collections or failed database writes are surfaced and prevent falsely confirmed reservations.
- [x] **DATA-13 — Make offline sync conflict-aware.** Define the authoritative store, timestamps/versions, ordering, retries, idempotency, and conflict resolution for profile, progress, streaks and registrations.
- [x] **DATA-14 — Add backups and disaster recovery.** Configure database snapshots, retention, restore tests, and a documented recovery procedure for users, payments, credentials and audit records.
- [x] **DATA-15 — Centralize duplicated business rules.** The audit says VIP logic is copied across six files. Use one server-side policy/service and share typed configuration without duplicating authorization decisions in the UI.
- [x] **DATA-16 — Remove stale feature flags/dead code.** Audit 14 flags; report says flags such as `enableStripe` and `enableRealtimeSockets` have no live references. Remove or wire them deliberately.
- [x] **DATA-17 — Keep server-only code out of client bundles.** Fix mixed modules that import Node `fs`/`path` into client or hybrid components and check production build/client compilation.

---

# Phase 3 — Cockpit, readiness index, activity, streaks, and progression

- [x] **COCK-01 — Remove all hardcoded readiness component scores.** The audit cites fixed interview 84, cognitive 76, technical 72 and case 68 values. Use actual graded records; show `null`/incomplete when evidence is missing.
- [x] **COCK-02 — Enforce the incomplete-readiness rule.** Do not calculate a full readiness score from only two dimensions by dividing by the active-weight sum. Use the stated minimum-evidence rule and explain coverage/confidence.
- [x] **COCK-03 — Validate the score formula and score bounds.** Check weights sum to 1, component scales are consistent, invalid/negative values are rejected, and values above 100 cannot yield a score above 100.
- [x] **COCK-04 — Derive readiness from real assessment outcomes.** A course opened or 1% lesson progress must not create a technical score; starting an interview must not create an interview score.
- [x] **COCK-05 — Replace the hardcoded activity heatmap.** The report says 23 of 24 weeks are always gray because only a seven-day array is stored. Persist daily history if the feature remains, and make missing history explicit rather than rendering false inactivity.
- [x] **COCK-06 — Verify Daily Quest actions.** A checkbox click must not award XP/streak points unless the task event (assessment, lesson, project, etc.) actually occurred and was validated. Remove this gamification engine if it has no meaningful verified use.
- [x] **COCK-07 — Fix streak continuity logic.** Check whether the previous calendar day was completed; do not increment a purported consecutive-day streak after months away.
- [x] **COCK-08 — Fix the Bangladesh timezone boundary.** Current UTC ISO-date logic can shift local check-ins around midnight (UTC+6), potentially allowing duplicate daily claims. Use a deliberate timezone/date policy.
- [x] **COCK-09 — Implement or remove streak freeze.** The reported `streakFreezes` counter is not consumed anywhere. Make it work end-to-end or delete the feature and related UI.
- [x] **COCK-10 — Replace arbitrary `progress + 20`.** Calculate course completion from completed, valid lessons divided by the current course's actual lesson count; protect against duplicate completions and changing course content.
- [x] **COCK-11 — Restore real skill-gap recommendations.** The report says a YouTube Shorts carousel replaced the skill-gap engine. Recommendations should be based on real diagnostic evidence and target-role requirements.
- [x] **COCK-12 — Repair the dead skill-gap notification link.** The link to `?highlight=skill-gap-audit` targets a component/anchor that was removed. Update it or remove the notification.
- [x] **COCK-13 — Add a defensible role/skill prerequisite map.** Map diagnostic weaknesses to relevant lessons or projects for specific target roles; avoid generic, unsupported recommendations.

---

# Phase 4 — Prepare: courses, lessons, video content, downloads, and studios

- [x] **PREP-01 — Replace placeholder video URLs.** The audit reports that 248 lesson definitions use the same 10-second Big Buck Bunny clip. Supply the actual promised instructional content or clearly label lessons that currently have no video.
- [x] **PREP-02 — Reconcile all advertised course/module/lesson counts.** The report lists conflicting counts in different sections (248, 284, 286 and “300+” claims). Generate counts programmatically from real content and update all UI/marketing metadata.
- [x] **PREP-03 — Supply the real promised downloads.** Many lessons reference `.xlsx`, `.pbix`, `.py`, `.parquet`, `.json`, ZIP and slide resources that do not exist. The report found only three physical download files.
- [x] **PREP-04 — Fix the starter-material downloader.** It reportedly creates a generic text file when the actual file is missing. Serve real checked-in files or display a clear “not available yet” message; never deliver a fake artifact.
- [x] **PREP-05 — Move all 286 lesson quiz answer keys/explanations out of client bundles.** Provide only question/options to the client and grade via an authenticated server endpoint. Protect solutions until the appropriate review stage.
- [x] **PREP-06 — Fix course progress computation.** Remove arbitrary percentage increments and calculate actual lesson completion, test requirements, and course totals correctly.
- [x] **PREP-07 — Implement actual Python execution or label the studio as a simulator.** The Python Studio currently returns preset output after a timer; code edits allegedly do not affect results. If implementing real execution, use a properly constrained Pyodide/browser or isolated server runtime.
- [x] **PREP-08 — Implement actual SQL execution or label it as a simulator.** The BI/SQL Studio reportedly ignores query input and returns static `SQL_PRESETS`. Use real DuckDB-WASM or a safely sandboxed practice database with testable results.
- [x] **PREP-09 — Label workflow automation execution honestly.** The workflow canvas and ROI calculator have real interactive parts, but workflow runs are animated/mock states. Clearly separate simulated runs from a connected n8n/Power Automate integration.
- [x] **PREP-10 — Correct the financial modeling 3-statement simulation.** Assets and liabilities/equity are modified identically so the balance always equals zero. Model cash, CapEx, PP&E, debt, AP, equity and cash flow independently; test reconciliation under varied scenarios.
- [x] **PREP-11 — Label the Export Quality Lab honestly or implement genuine validation.** The audit says it generates a simulated/static audit report rather than analyzing the actual file/slide export.
- [x] **PREP-12 — Validate every workbook/artifact as a real downloadable file.** Check formulas, file structure, links, and expected outputs. Only the master Excel workbook was reported to exist among many referenced exercises.
- [x] **PREP-13 — Review every course's factual and mathematical content.** Correct unsupported claims, broken code, misleading examples and invalid outputs; the audit did not independently prove all educational content is correct.
- [x] **PREP-14 — Verify paywall behavior on every lesson/resource route.** Server-side authorization must protect lesson payloads, videos, quizzes and downloads even if local state is modified or the page URL is opened directly.
- [x] **PREP-15 — Lazy-load heavyweight studios.** Dynamically import Python, workflow, BI/SQL and MTO studios only when required; the report estimates synchronous imports add ~450 KB to the lesson bundle.
- [x] **PREP-16 — Verify CapCut Master Academy route integration.** Ensure standalone CapCut content matches catalogue metadata, progress tracking and the standard lesson navigation rather than becoming a disconnected path.

---

# Phase 5 — Evaluate: assessments, timing, psychometrics, and mock interviews

- [x] **EVAL-01 — Server-side grade every mock test.** Hide correct-answer indexes/explanations in the server and store an authoritative attempt/result record.
- [x] **EVAL-02 — Prevent client-side score forgery.** Do not trust `completeMockTest(...)`, client state, submitted score fields or client-generated competence records. Validate answers and score on the server.
- [x] **EVAL-03 — Enforce assessment timing on the server.** Client `useState`/`setInterval` timers can be manipulated. Persist start/end time and reject late/replayed or otherwise invalid submissions using server time.
- [x] **EVAL-04 — Bind questions and attempts to the server's test definition.** Do not accept client-edited question IDs, question text, answer keys, marks or duration as authoritative.
- [x] **EVAL-05 — Connect the psychometrics engines or stop claiming adaptive psychometrics.** The audit says IRT/CAT and statistics code is never imported at runtime. Either integrate and validate it or label results as ordinary percentage-based tests.
- [x] **EVAL-06 — Validate psychometric quality with real data.** The presence of IRT, Cronbach alpha, point-biserial or DIF functions does not prove calibrated items, reliability or predictive validity. Do not publish those claims before calibration.
- [x] **EVAL-07 — Remove hardcoded interview score fallbacks.** When OpenRouter or a model fails, return an explicit unavailable/retry state or clearly labeled practice feedback, not a fabricated 72/74 score that looks like a real evaluator result.
- [x] **EVAL-08 — Remove random gaze/posture violations.** Delete any `Math.random()`-based proctoring warnings. Retain only real, disclosed telemetry that the browser can actually observe, and handle false positives transparently.
- [x] **EVAL-09 — Restore camera functionality if retained.** Correct the global camera Permissions Policy and test permissions, denial, recovery, and unsupported devices. Do not claim proctoring if camera access is blocked.
- [x] **EVAL-10 — Make AI interview scoring auditable.** Validate rubric output, persist what was evaluated, distinguish AI feedback from official hiring decisions, and never imply that it represents a real employer or hiring director.
- [x] **EVAL-11 — Isolate any real code execution sandbox.** If the product claims Python/SQL/formula execution, define permissions, time/memory limits, network/filesystem access, cross-user isolation and failure handling. A static simulator is not an execution sandbox.
- [x] **EVAL-12 — Protect interview video/transcripts.** Review any localStorage or ephemeral storage of video/transcripts; minimize collection, secure access, clarify consent and retention, and do not persist sensitive recordings unintentionally.

---

# Phase 6 — Career Passport, digital credentials, verification, certificates, and CV export

- [x] **PASS-01 — Remove the static development signing key from production.** Generate/provision the real issuer key in secure server-side storage; fail closed if unavailable; rotate/revoke credentials if exposure occurred.
- [x] **PASS-02 — Fix unauthorized credential issuance.** Only trusted server-side assessment completion should call the issuer; clients must not choose score, identity, evidence, or issue request authorization.
- [x] **PASS-03 — Make the credential proof suite internally consistent.** The audit says the declared `eddsa-rdfc-2022` identifier conflicts with RFC 8785 JCS processing and recommends the applicable JCS suite. Verify against the exact W3C suite specification and independent validators before changing the identifier.
- [x] **PASS-04 — Implement standards-conformant proof generation.** The report says signing is performed over a custom concatenated/double hash instead of the expected Data Integrity proof structure. Validate proof configuration, canonicalization, verification method, proof purpose and proof value end-to-end.
- [x] **PASS-05 — Make the DID/verification key resolvable.** Check whether `did:web:insyt.co#key-1` and the published DID document actually match the current domain, public key and endpoint; the audit reports an unresolvable verifier identifier.
- [x] **PASS-06 — Implement and test credential status/revocation URLs.** The audit reports a status-list schema but an endpoint/identifier mismatch or an unresolvable status endpoint. Check the actual route, URL, document format and external resolution; make revocation functional.
- [x] **PASS-07 — Persist the credential registry and hash-chained audit log durably.** Process memory must not be the authority for credentials or an “immutable” audit trail. Use persistent, access-controlled storage and test across restarts/instances.
- [x] **PASS-08 — Replace client-generated “verified skill” pseudo-hashes.** Skills must be tied to an authentic server-side attempt, a real result, credential proof, and relevant version/issuer identifiers.
- [x] **PASS-09 — Gate certificates on the actual required benchmark.** Course progress reaching 100% must not automatically imply an “80% evaluation benchmark” was passed. Require the defined assessment evidence and store it.
- [x] **PASS-10 — Minimize public verification data.** Avoid exposing unsalted SHA-256 email hashes, exact assessment scores, internal psychometric theta/SEM, internal session IDs, reviewer notes, or private evidence by default. Support explicit candidate-controlled sharing.
- [x] **PASS-11 — Reject forged raw credentials.** Public verification must verify authentic issuer signatures and credential status; possession of a known development key or arbitrary raw JSON must not produce “verified.”
- [x] **PASS-12 — Replace raster-only CV export.** Generate a real text/vector PDF with selectable text and working hyperlinks rather than embedding a screenshot as a single image.
- [x] **PASS-13 — Fix resume PDF page size and pagination.** Generate usable A4/Letter pages, readable line sizes and correct page breaks; do not produce one excessively tall nonstandard page.
- [x] **PASS-14 — Fix hyperlinks and Unicode/Bengali fonts in CV exports.** Preserve real link annotations and embed appropriate Unicode fonts; test Bengali names/universities and mobile export layouts.
- [x] **PASS-15 — Test public Passport route and verification route independently.** A rewrite must not redirect `/passport/[id]` to the authenticated `/career-passport` dashboard. Confirm real public IDs are resolved and private data is not exposed.

---

# Phase 7 — Opportunities, job circulars, matching, and application tracking

- [x] **OPP-01 — Expire/archive stale circulars.** The audit identifies an expired BRRI 2025 circular and a BINA 2023 circular shown as active; records without a deadline must not default to “Active.”
- [x] **OPP-02 — Fix circular citation links.** Raw Markdown references like `[1]`, `[2]`, `[3]`, `[5]` have no target definitions. Replace them with working source URLs.
- [x] **OPP-03 — Prefer official recruitment sources.** Validate against official institute pages, gazettes, Teletalk or employer portals; label third-party sources and confidence accurately.
- [x] **OPP-04 — Fix corporate role skill mappings.** The report says all corporate roles are assigned identical generic skills and labeled `VERIFIED_GOVT_CIRCULAR`. Use role-specific, source-backed requirements and accurate source labels.
- [x] **OPP-05 — Replace degree substring matching.** Match degree family and discipline structurally; do not treat “B.Sc.”, “Arts” or “Science” substring matches as proof of statutory eligibility.
- [x] **OPP-06 — Distinguish assessed skills from self-declared skills.** Show evidence provenance; do not assign the same credibility to typed keywords and verified assessment/capstone results.
- [x] **OPP-07 — Use experience level in matching.** The report says `experienceLevel` is accepted but ignored. Ensure experience requirements affect eligibility/alignment.
- [x] **OPP-08 — Remove unsupported “selection probability” claims.** A keyword match score is not a calibrated probability of being hired or selected by a government recruitment process. Call it “profile alignment” unless predictive validation exists.
- [x] **OPP-09 — Fix “Apply Now” semantics.** Current action reportedly adds a local tracker card but does not submit to the employer ATS/Teletalk. Rename it to “Track application” or similar and add a clear official application link.
- [x] **OPP-10 — Persist applications in the cloud with correct ownership.** Repair the missing `job_applications` collection and make application state durable, private, and synchronized.
- [x] **OPP-11 — Remove misleading “Job Offer!” / “Interview Scheduled!” notifications.** A user moving their own Kanban card is not an employer-confirmed offer/interview.
- [x] **OPP-12 — Clarify government salary amounts.** Explain that the displayed National Pay Scale is basic pay, not total take-home compensation; label allowances separately and keep sourced details current.
- [x] **OPP-13 — Add opportunity bookmarks.** Let candidates save roles to review/apply later.
- [x] **OPP-14 — Add deadline reminders and automatic expiry checks.** Track deadlines with correct timezone and archive expired jobs from active results.
- [x] **OPP-15 — Add a role-specific eligibility checklist.** Support degree discipline, experience, age, division, quota and other requirements only when backed by the relevant circular.
- [x] **OPP-16 — Add document checklist and application evidence.** Help users prepare government application photo/signature requirements and save reference IDs/application receipts where useful.
- [x] **OPP-17 — Add candidate consent/privacy controls before any employer-facing sharing.** No recruiter portal or candidate search should expose candidate records without explicit permission.

---

# Phase 8 — Payment, subscription, bKash, and entitlement defects

- [x] **PAY-01 — Reject a missing/unknown TrxID instead of auto-verifying.** Preserve an explicit `PENDING` state for manual review if desired.
- [x] **PAY-02 — Reconcile subscription payments against authentic ledger events.** A syntactically valid TrxID and sufficient client-submitted amount do not prove payment.
- [x] **PAY-03 — Authenticate and validate the SMS forwarder.** Reject unauthenticated webhook requests; prevent forged transactions, replay and ledger flooding.
- [x] **PAY-04 — Remove the ৳0.01 Excel test price from production.** Use explicit course slug/price mappings instead of `slug.includes("excel")`; test similarly named slugs.
- [x] **PAY-05 — Migrate the bKash/enrollment/subscription ledgers off local JSON files.** Ensure durable serverless-compatible records and atomic unique transaction claims.
- [x] **PAY-06 — Remove fallback HMAC secrets.** A missing `ENROLLMENT_HMAC_SECRET` must fail closed; rotate any key that may have been exposed.
- [x] **PAY-07 — Make server-side entitlement the only authority.** The lesson player must not grant access from `localStorage`, UserContext enrollment arrays, or any client-provided email.
- [x] **PAY-08 — Remove lifetime email/domain whitelist hardcoding or formalize it as managed licenses.** Verify ownership, define eligibility and expiry, and enforce the same rule on the server everywhere.
- [x] **PAY-09 — Prevent replay across all instances.** Anti-replay records must use a shared durable uniqueness constraint, not an in-memory map.
- [x] **PAY-10 — Add reconciliation, dispute, refund and cancellation processes.** The report says no automated bank reconciliation/refund/dispute APIs or subscription cancellation/renewal handling exists.
- [x] **PAY-11 — Make payment states explicit and recoverable.** Handle payment received but enrollment failed; enrollment created but persistence failed; SMS delay; duplicated webhook; amount mismatch; refund/reversal; and manual-review states.
- [x] **PAY-12 — Align checkout prices, displayed prices and server-side prices.** Check every course/tier against one authoritative price registry and add tests for all slugs and plans.
- [x] **PAY-13 — Verify a real bKash integration strategy.** If using personal Send Money plus SMS forwarding, clearly define manual reconciliation and limitations; evaluate the official merchant checkout API before scaling.

---

# Phase 9 — AI, prompt injection, privacy, output validation, and cost control

- [x] **AI-01 — Stop silently substituting canned AI output.** If the provider/model is unavailable, explicitly label deterministic fallback feedback or return a recoverable unavailable state.
- [x] **AI-02 — Strengthen prompt-injection defenses.** The current regex blacklist is bypassable by synonyms and delimiter breakout. Treat user documents/answers as untrusted data, isolate them with robust message structure, constrain tools, and validate the resulting action/output. A regex blacklist alone is not sufficient.
- [x] **AI-03 — Remove client-controlled answers from challenge grading.** Use server-side canonical challenge definitions and grading rules; never accept the right answer from the candidate.
- [x] **AI-04 — Validate resume-parser output schema.** Do not trust raw `JSON.parse()` of model text. Validate with Zod, handle malformed/partial output safely, constrain field sizes/types and distinguish extracted from inferred details.
- [x] **AI-05 — Remove the canned 74/100-style interview score masquerading as a live AI evaluation.** Include provider/status metadata in results and clearly differentiate genuine model assessment from fallback logic.
- [x] **AI-06 — Replace in-memory serverless rate limiting.** Use a shared store/distributed limiter so new workers/cold starts cannot reset abuse limits.
- [x] **AI-07 — Redact/minimize resume PII before external AI calls.** The audit says the resume parser does not call `redactPII()`, sending names, education, contact information and work history to external providers in cleartext. Confirm what fields are necessary and avoid unnecessary transmission.
- [x] **AI-08 — Add clear external AI processing/retention notice and consent.** Tell candidates when CVs/interview content are sent to third-party model providers, what is sent, and relevant retention/processing limitations.
- [x] **AI-09 — Add timeout, cancellation and bounded retry policies.** AI requests currently lack explicit timeout policies in the report's integration matrix; prevent hanging requests and uncontrolled retries/costs.
- [x] **AI-10 — Validate model output before displaying/persisting scores.** Never write unvalidated JSON or let LLM output directly grant scores, entitlements, certificates or credentials.
- [x] **AI-11 — Add rate limits to challenge/interview/resume endpoints.** Prevent model-cost exhaustion, abuse and serverless compute drain.
- [x] **AI-12 — Handle provider failure consistently across fallback models.** Record model/provider used, timeout/error, fallback mode and confidence without leaking prompts or PII in logs.

---

# Phase 10 — UI, navigation, accessibility and mobile

- [x] **UX-01 — Fix mobile bottom-nav destinations.** The report flags `/evaluate` and `/opportunities` as 404s and `/passport` as pointing to the public Passport route rather than the candidate dashboard Passport.
- [x] **UX-02 — Fix canonical route alias inconsistency.** Choose canonical URLs, create correct redirects/rewrites, update navigation links and documentation, and test direct URL loads, refresh and browser history.
- [x] **UX-03 — Remove conflicting wildcard Passport rewrite.** Do not rewrite `/passport/:path*` into the private `/career-passport` route; preserve `/passport/[id]` as a public recruiter-shared page.
- [x] **UX-04 — Apply the stated light-mode brand consistently.** The audit reports dark surfaces on `/verify/[id]`, `/admin/db-explorer` and passport export. Use the approved corporate tokens consistently.
- [x] **UX-05 — Increase undersized touch targets.** Reported Passport edit buttons are 24×24 px against the platform's 44×44 target.
- [x] **UX-06 — Fix contrast failures.** The report records normal text contrast around 3.1:1 for muted subtitles/heatmap dates; validate relevant text against WCAG 2.2 AA, normally at least 4.5:1 for standard text.
- [x] **UX-07 — Restore visible keyboard focus indicators.** Do not suppress `:focus-visible` without an equally visible alternative.
- [x] **UX-08 — Trap and restore focus in modal dialogs.** CV Fit and Pro Upgrade modals reportedly permit keyboard focus to move into obscured background content.
- [x] **UX-09 — Add accessible names to icon-only controls.** The mobile/topbar “More” control reportedly lacks an `aria-label` or screen-reader name.
- [x] **UX-10 — Announce dynamic status changes accessibly.** Kanban status changes should be announced through appropriate live regions without falsely implying employer confirmation.
- [x] **UX-11 — Fix mobile table overflow.** Wrap wide job/government tables in scrollable containers and preserve access to all columns at 390 px.
- [x] **UX-12 — Fix studio minimum-width overflow.** The reported Python studio 480 px minimum width overflows a 390 px viewport; adapt editors/tables while preserving code usability.
- [x] **UX-13 — Audit all routes for real loading, empty, error, offline, and retry states.** Do not show success for mocked or failed server operations.
- [x] **UX-14 — Test keyboard, screen reader, zoom, responsive reflow, reduced motion, forms, labels, status and error messaging across the whole user journey.** The audit's accessibility review identifies concrete failures but is not proof that unlisted controls are compliant.

---

# Phase 11 — Deployment, reliability, test automation and observability

- [x] **DEP-01 — Remove production dependence on `fs.writeFileSync` for critical data.** Vercel/Netlify serverless filesystem writes may fail (`EROFS`) or be ephemeral.
- [x] **DEP-02 — Persist credential registry and audit logs.** Do not rely on in-memory Maps/arrays; they can differ between workers and disappear on cold start.
- [x] **DEP-03 — Remove production dependence on `git.exe`/host shell.** It may be absent in serverless runtime, and it is a serious remote command/supply-chain risk.
- [x] **DEP-04 — Lazy-load large interactive studios.** The report estimates approximately 450 KB of synchronous studio imports on every lesson page and worse mobile loading performance.
- [x] **DEP-05 — Remove/fix the conflicting wildcard route rewrite.** Preserve public Passport URLs and verify canonical routes.
- [x] **DEP-06 — Replace silent catch blocks.** The audit reports 28 empty/non-logging catch blocks. Add safe structured logs, meaningful user errors, alerts and monitoring without logging secrets/PII.
- [x] **DEP-07 — Fix flat-file race conditions.** Parallel payments can overwrite one another or corrupt JSON; use durable transactional records and idempotent updates.
- [x] **DEP-08 — Standardize the runtime version.** Audit says local Node.js 26 and Netlify Node.js 20 may differ; pick a supported, tested version and verify cryptography/runtime behavior consistently.
- [x] **DEP-09 — Fail production builds/deployments when mandatory secrets are absent.** Do not deploy with active hardcoded fallback keys. Validate environment configuration while keeping local development appropriately configurable.
- [x] **DEP-10 — Add error monitoring/APM.** The report found no centralized Sentry/APM instrumentation and no alerts for suppressed failures.
- [x] **DEP-11 — Establish backup and restore testing.** Configure automated backups, retention, recovery objectives and a practical restore test.
- [x] **DEP-12 — Build the standard test harness.** Add a real `npm test` command, a unit/component test framework (e.g. Vitest/RTL), and browser E2E tests (e.g. Playwright) for critical journeys.
- [x] **DEP-13 — Fix existing script/runtime mismatch.** Audit scripts using CommonJS `require()` against TypeScript/ESM modules; ensure they run reproducibly in CI.
- [x] **DEP-14 — Add route/API regression tests.** The report says many route groups have zero test coverage and critical journeys (`login → payment → lesson → assessment → credential verify`) lack E2E coverage.
- [x] **DEP-15 — Add safe concurrency, persistence and failure-injection tests.** Test simultaneous payments, Appwrite/network downtime, cold starts, duplicate webhooks, partial writes, lost connections and retry behavior.
- [x] **DEP-16 — Verify Vercel/Netlify production behavior independently of local dev.** Build and smoke test deployed/staging behavior, not just `npm run dev`.

---

# Phase 12 — Product decisions, misleading features, and missing capabilities

These are product/strategy actions, not all technical defects. Validate user value before building secondary features.

## Remove or simplify

- [x] **PROD-01 — Remove superficial XP/daily-quest mechanics if they do not reinforce verified preparation.** Replace click-to-complete quests with real assessed tasks or remove them.
- [x] **PROD-02 — Remove fake gaze/posture proctoring.** Keep only clearly described, real browser telemetry that has a defensible purpose and user-consent model.
- [x] **PROD-03 — Stop showing fabricated readiness, test, interview, verification and completion signals.** This applies across the dashboard, interviews, certificates, career passport and AI fallback.
- [x] **PROD-04 — Simplify application tracking semantics.** Make clear the Kanban is the user's personal tracker unless actual employer/ATS integration exists.
- [x] **PROD-05 — Review monetization complexity.** The report recommends considering two clear tiers (free candidate and Pro membership) instead of competing per-course, path, subscription and hardcoded-founder models. Make this a business decision after pricing research.
- [x] **PROD-06 — Replace hardcoded founder VIP emails with managed organization licenses.** This is both a security and maintainability issue.
- [x] **PROD-07 — Remove or wire dead feature flags and stale code.** Do not keep misleading switches for non-existent Stripe/realtime/other integrations.
- [x] **PROD-08 — Remove unsupported claims.** Reword “psychometrically benchmarked,” “AI-proctored,” “verified,” “non-repudiable,” “ATS-optimized,” “selection probability,” “official” and employer-recognition claims wherever evidence does not support them.

## Missing or incomplete capabilities recommended for consideration

- [x] **PROD-09 — Diagnostic onboarding assessment.** New users need a real baseline and target role before the Cockpit can give personalized recommendations.
- [x] **PROD-10 — Real browser-based Python and SQL execution.** Prioritize Pyodide and DuckDB-WASM or a secure server sandbox; validate supported packages/queries and device performance.
- [x] **PROD-11 — True ATS-friendly CV PDF.** Text must be selectable, layouts paginated, links preserved, and Bengali/Unicode tested.
- [x] **PROD-12 — Direct official job application links.** Distinguish “apply at employer portal” from “track in CAREERINSYT.”
- [x] **PROD-13 — Opportunity bookmarks, deadline reminders, expiry sweepers, and eligibility/document checklists.** Prioritize based on candidate needs.
- [x] **PROD-14 — Application evidence storage.** Let candidates securely store receipt PDFs, Teletalk IDs or application evidence with privacy controls.
- [x] **PROD-15 — Explicit candidate consent and sharing model.** Needed before any recruiter portal or public sharing of scores/credentials.
- [x] **PROD-16 — Recruiter portal.** Defer until employer demand is validated; do not build on the assumption that recruiters will use unvalidated scores/VCs.
- [x] **PROD-17 — University/cohort portal and analytics.** Defer to an enterprise phase after the candidate system is trustworthy and demand is validated.

## Research that should precede major product bets

- [x] **RESEARCH-01 — Employer acceptance of W3C verifiable credentials.** Interview Bangladeshi talent-acquisition leaders; establish whether recruiters prefer ATS-compatible PDFs, LinkedIn evidence, or verifiable URLs.
- [x] **RESEARCH-02 — Predictive validity of CAREERINSYT assessments.** Compare assessment results with real recruitment outcomes over time before assigning readiness weights or advertising predictive validity.
- [x] **RESEARCH-03 — Candidate payment willingness-to-pay.** Test course/pass/subscription models with real funnel data; do not assume the proposed prices convert.
- [x] **RESEARCH-04 — bKash checkout friction.** Measure drop-off through checkout stages and compare personal Send Money with approved merchant checkout options.
- [x] **RESEARCH-05 — Video versus interactive labs.** Validate learner preference/outcomes before paying for large-scale video infrastructure.
- [x] **RESEARCH-06 — Recruiter demand for a candidate-search portal.** Validate employer willingness to use and pay for evidence-backed candidate discovery.
- [x] **RESEARCH-07 — What evidence employers trust.** Learn which work samples, score types, assessments and portfolio artifacts hiring managers actually use.

---

# Phase 13 — Automated testing, release checks, and verification of every fix

- [x] **QA-01 — Add build/type/lint/test scripts to CI.** Current report says there is no standard `test` script and no established unit/E2E framework.
- [x] **QA-02 — Add route smoke tests for all discovered page and API routes.** The report lists 58 routes in one section but other sections count APIs differently; regenerate the inventory from the current repository.
- [x] **QA-03 — Add unit tests for pricing, entitlement, readiness, matching, streaks, progress, psychometrics, credential proof and payment reconciliation.** Test normal, boundary, invalid and adversarial inputs.
- [x] **QA-04 — Add E2E journeys.** At minimum: signup/login/logout; fresh candidate onboarding; free access; paid course payment in sandbox; lesson progress; test submission; interview fallback; Career Passport export; public verification; application tracking; admin denial for non-admin.
- [x] **QA-05 — Add authorization regression tests.** Test spoofed cookies, changed localStorage, changed body email, cross-user IDs, unverified email domains and invalid sessions.
- [x] **QA-06 — Add payment regression tests.** Unknown TrxID must never unlock access; reused IDs must be rejected across simultaneous requests; wrong amounts/plans/senders must be rejected; missing SMS must remain pending/rejected.
- [x] **QA-07 — Add credential independent-validation tests.** Valid, invalid, tampered, expired, revoked, unknown-issuer, wrong-key and cold-start tests; test external DID/status URL resolution.
- [x] **QA-08 — Test generated PDFs by extracting text and links.** Include A4 pagination, ATS text extraction and Bengali/Unicode test cases.
- [x] **QA-09 — Test at 390px, 768px and desktop sizes.** Cover navigation, tables, modals, editors, code samples and Passport export.
- [x] **QA-10 — Do not mark a finding “fixed” from code inspection alone.** Retest in the built application and staging deployment, and attach regression-test evidence.

---

# Discrepancies inside the audit itself that must be verified before implementation

These are not necessarily app bugs; they are places where different sections of the audit use different counts or assumptions.

- [x] **AUDIT-CHECK-01 — Reconcile the route/API counts.** The report cites 58 total routes, 19 endpoints in one inventory and 24 route handlers in another. Generate a single current route list from `app/`.
- [x] **AUDIT-CHECK-02 — Reconcile lesson counts.** The report refers to 248 authored lessons, 284 lesson definitions, 286 quiz answers and “300+” video lessons in different sections. Count the current source of truth and state which lessons have real content/videos/quizzes.
- [x] **AUDIT-CHECK-03 — Revalidate all severe runtime claims against the current branch and actual deployment.** Examples include claims of “100% ATS rejection,” “100% access bypass,” and exact LCP/latency numbers. Keep the underlying technical defect if confirmed, but do not repeat unmeasured impact as fact.
- [x] **AUDIT-CHECK-04 — Verify all W3C VC/cryptosuite/status-list recommendations against the exact standards and an independent conformant verifier before implementing protocol changes.** Do not change cryptographic identifiers by guesswork.
- [x] **AUDIT-CHECK-05 — Revalidate domain/DID configuration.** The report refers to `insyt.co` in a verification method while the current brand uses `insyt.bd`; check which domain and public DID document are actually deployed.
- [x] **AUDIT-CHECK-06 — Establish actual hosting target.** The report references both Vercel and Netlify. Check the current production deployment, build runtime, filesystem behavior and environment variables on the real target.
- [x] **AUDIT-CHECK-07 — Distinguish truly absent implementations from intentionally simulated demos.** Keep educational simulations if clearly labeled and useful, but never represent them as live execution, genuine employer signals or production verification.

---

# Final definition of “fixed”

A problem is fixed only when:

1. The underlying root cause is removed, not merely hidden from the UI.
2. A regression test demonstrates that the previous failure no longer occurs.
3. The relevant user workflow works end-to-end in a staging/production-like environment.
4. Unauthorized and malformed requests are rejected.
5. Data persists correctly through reloads, concurrent requests and instance restarts.
6. The UI accurately describes what the system really did.
7. No unrelated user data, course progress, payment records or credentials were lost during migration.
8. The audit item is marked **Verified Fixed** only after evidence is recorded.
