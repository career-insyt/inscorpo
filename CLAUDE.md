# CAREERINSYT Development Guide

@AGENTS.md

## Architectural Blueprint
Refer to `SAAS_ARCHITECTURE_CONTEXT.md` for complete system architecture, database schema, Trust Plane cryptography, and curriculum specifications.

## Essential CLI Commands
- `npm run dev`: Start Next.js development server with Turbopack
- `npx tsc --noEmit`: Strict TypeScript compiler audit
- `node scripts/verify-all-catalogue-integrity.js`: Audit 10 courses & 249 dynamic lesson payloads
- `node scripts/test-trust-plane.js`: Test W3C VC 2.0, Ed25519 signatures, IRT CAT engine & sanitizers
- `node scripts/verify-automation-course.js`: Audit Applied Workplace AI Automation curriculum
- `node scripts/verify-bi-course.js`: Audit Enterprise Power BI & SQL curriculum
- `node scripts/verify-python-course.js`: Audit Enterprise Python curriculum
- `node scripts/verify-phase1-fixes.js`: Audit financial formulas & PVM variance rules
