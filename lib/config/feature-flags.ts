/**
 * INSYT Corporate — Feature Flag Architecture
 *
 * Implements Section 39 ("Feature Flags") of the Supermassive Implementation Plan:
 * Allows controlled, phased rollouts and legacy route redirects without destructive edits.
 */

export interface FeatureFlags {
  /** Master switch for Corporate V2 Employability Operating System */
  corporateV2: boolean;
  /** Readiness Index Engine (weighted 5-dimension competency index) */
  readinessIndex: boolean;
  /** 5-Pillar Navigation: Cockpit, Prepare, Evaluate, Passport, Opportunities */
  newNavigation: boolean;
  /** Practical Assessment Engine (Timed, adaptive, sandboxed evaluations) */
  assessmentEngine: boolean;
  /** Production-grade Work Sample Project System with rubrics */
  projectSystem: boolean;
  /** Cryptographic & Evidence-linked Career Passport V2 */
  passportV2: boolean;
  /** Shared identity & prerequisite bridge to INSYT Academy */
  academyBridge: boolean;
  /** Contextual AI (in-situ feedback vs isolated chatbot) */
  newAI: boolean;
  /** Curated Opportunity Matching & Application Tracking */
  opportunitiesV2: boolean;
  /** Employer Recruiter Search & Direct Verification Portal */
  recruiterBeta: boolean;
  /** Structured 4-6 person peer learning & case pods */
  communityPods: boolean;

  // ── Legacy Safeguards & Isolation Toggles ──
  /** Academic test prep (GRE, GMAT, MBA) — flag OFF in Corporate, redirect to Academy */
  academicTestPrep: boolean;
  /** Superficial gamification (XP currency, levels, avatar store) — flag OFF */
  xpGamification: boolean;
  /** Crowdsourced unverified company reviews and salary data — flag OFF */
  unverifiedSalaryAndReviews: boolean;
}

export const FEATURE_FLAGS: FeatureFlags = {
  corporateV2: true,
  readinessIndex: true,
  newNavigation: true,
  assessmentEngine: true,
  projectSystem: true,
  passportV2: true,
  academyBridge: false,
  newAI: true,
  opportunitiesV2: true,
  recruiterBeta: false, // Per Section 48 & 53: candidate competency engine first
  communityPods: false,

  // Legacy isolated per Section 0, 31, 32
  academicTestPrep: false,
  xpGamification: false,
  unverifiedSalaryAndReviews: false,
};

/**
 * Helper to check feature flag with runtime or environment overrides.
 */
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  if (typeof process !== "undefined" && process.env) {
    const envKey = `NEXT_PUBLIC_FF_${flag.toUpperCase()}`;
    if (process.env[envKey] === "true") return true;
    if (process.env[envKey] === "false") return false;
  }
  return FEATURE_FLAGS[flag];
}
