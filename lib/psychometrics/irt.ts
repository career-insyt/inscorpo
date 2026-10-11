/**
 * INSYT Psychometric Engine — Item Response Theory (IRT) & Computer Adaptive Testing (CAT)
 *
 * Implements:
 * - 1PL (Rasch), 2PL, and 3PL Logistic IRT Models
 * - Item Information Functions (IIF) & Test Information Functions (TIF)
 * - Standard Error of Measurement (SEM) & Reliability Conversion
 * - Bayesian Expected A Posteriori (EAP) Quadrature Ability Estimation
 * - Newton-Raphson Maximum Likelihood Estimation (MLE)
 * - Sympson-Hetter Item Exposure Control
 * - Variable-length Adaptive Stopping Rules (Precision & Cut-Score Confidence Intervals)
 */

export interface IRTItem {
  id: string;
  name: string;
  // IRT Parameters
  a: number; // Discrimination (1PL: a = 1.0, 2PL/3PL: typically 0.5 - 2.5)
  b: number; // Difficulty (typically -3.0 to +3.0)
  c: number; // Pseudo-guessing (3PL: typically 0.0 - 0.25; 1PL/2PL: 0.0)
  // Operational constraints
  trackId: string;
  skillDomain: string;
  exposureRate?: number; // Historical operational administration rate
  exposureParamK?: number; // Sympson-Hetter probability threshold k_i
}

export interface CandidateResponse {
  itemId: string;
  correct: boolean; // 1 or 0
  responseTimeMs?: number;
}

export interface CATSessionState {
  candidateId: string;
  trackId: string;
  thetaEstimate: number; // Current theta (ability)
  sem: number; // Current Standard Error of Measurement
  reliability: number; // Empirical reliability
  administeredItems: CandidateResponse[];
  terminated: boolean;
  terminationReason?: 'TARGET_SEM_REACHED' | 'CUT_SCORE_CONFIDENCE_ACHIEVED' | 'MAX_ITEMS_REACHED';
  passFailDecision?: 'PASS' | 'FAIL' | 'INDETERMINATE';
}

// ==========================================
// 1. PROBABILITY & INFORMATION FUNCTIONS
// ==========================================

/**
 * Calculates probability of correct response under 3PL (or 1PL/2PL by setting a=1 or c=0)
 * P_i(theta) = c_i + (1 - c_i) / (1 + exp(-a_i * (theta - b_i)))
 */
export function calculateProbability(theta: number, item: IRTItem): number {
  const { a = 1, b, c = 0 } = item;
  const exponent = -a * (theta - b);
  // Guard against numeric overflow
  if (exponent > 40) return c;
  if (exponent < -40) return 1.0;
  
  const logistic = 1 / (1 + Math.exp(exponent));
  return c + (1 - c) * logistic;
}

/**
 * Calculates Item Information Function (IIF) at ability level theta
 * I_i(theta) = a_i^2 * (P_i(theta) - c_i)^2 * (1 - P_i(theta)) / ((1 - c_i)^2 * P_i(theta))
 */
export function calculateItemInformation(theta: number, item: IRTItem): number {
  const { a = 1, b, c = 0 } = item;
  const P = calculateProbability(theta, item);
  const Q = 1 - P;

  if (c === 0) {
    // 1PL and 2PL simplification: I(theta) = a^2 * P * Q
    return a * a * P * Q;
  }

  // 3PL formula
  const numerator = a * a * Math.pow(P - c, 2) * Q;
  const denominator = Math.pow(1 - c, 2) * P;
  if (denominator === 0) return 0;
  return numerator / denominator;
}

/**
 * Calculates Test Information Function (TIF) across all administered items
 */
export function calculateTestInformation(theta: number, items: IRTItem[]): number {
  return items.reduce((sum, item) => sum + calculateItemInformation(theta, item), 0);
}

/**
 * Standard Error of Measurement at theta: SEM = 1 / sqrt(TI(theta))
 */
export function calculateSEM(theta: number, items: IRTItem[]): number {
  const tif = calculateTestInformation(theta, items);
  if (tif <= 0.0001) return 2.0; // High uncertainty upper bound
  return 1 / Math.sqrt(tif);
}

/**
 * Converts SEM to IRT reliability coefficient: r_xx = 1 - SEM^2 (for unit variance)
 */
export function semToReliability(sem: number): number {
  const rel = 1 - Math.pow(sem, 2);
  return Math.max(0, Math.min(0.999, rel));
}

// ==========================================
// 2. ABILITY ESTIMATION (EAP & MLE)
// ==========================================

// Precomputed 41-point Gaussian quadrature nodes and weights over [-4, +4]
const NUM_QUADRATURE_POINTS = 41;
const QUAD_NODES: number[] = [];
const QUAD_WEIGHTS: number[] = [];

(function initQuadrature() {
  const min = -4.0;
  const max = 4.0;
  const step = (max - min) / (NUM_QUADRATURE_POINTS - 1);
  let weightSum = 0;

  for (let i = 0; i < NUM_QUADRATURE_POINTS; i++) {
    const x = min + i * step;
    // Standard normal prior: g(x) = (1/sqrt(2pi)) * exp(-x^2 / 2)
    const w = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
    QUAD_NODES.push(x);
    QUAD_WEIGHTS.push(w);
    weightSum += w;
  }

  // Normalize weights so sum equals 1
  for (let i = 0; i < NUM_QUADRATURE_POINTS; i++) {
    QUAD_WEIGHTS[i] /= weightSum;
  }
})();

/**
 * Likelihood function L(theta | responses)
 */
function likelihood(theta: number, responses: CandidateResponse[], itemBankMap: Map<string, IRTItem>): number {
  let logLikelihood = 0;
  for (const resp of responses) {
    const item = itemBankMap.get(resp.itemId);
    if (!item) continue;
    const P = calculateProbability(theta, item);
    const prob = resp.correct ? Math.max(1e-10, P) : Math.max(1e-10, 1 - P);
    logLikelihood += Math.log(prob);
  }
  return Math.exp(logLikelihood);
}

/**
 * Expected A Posteriori (EAP) Bayesian Estimation
 * Provides robust estimates even when candidate gets 0% or 100% correct
 */
export function estimateAbilityEAP(
  responses: CandidateResponse[],
  itemBankMap: Map<string, IRTItem>
): { theta: number; sem: number } {
  if (responses.length === 0) {
    return { theta: 0.0, sem: 1.0 }; // Standard prior
  }

  let numerator = 0;
  let denominator = 0;

  // First pass: compute EAP mean
  for (let k = 0; k < NUM_QUADRATURE_POINTS; k++) {
    const X_k = QUAD_NODES[k];
    const W_k = QUAD_WEIGHTS[k];
    const L_k = likelihood(X_k, responses, itemBankMap);

    numerator += X_k * L_k * W_k;
    denominator += L_k * W_k;
  }

  if (denominator === 0 || !Number.isFinite(numerator / denominator)) {
    return { theta: 0.0, sem: 1.0 };
  }

  const thetaEAP = Math.max(-4.0, Math.min(4.0, numerator / denominator));

  // Second pass: compute posterior variance
  let varianceNumerator = 0;
  for (let k = 0; k < NUM_QUADRATURE_POINTS; k++) {
    const X_k = QUAD_NODES[k];
    const W_k = QUAD_WEIGHTS[k];
    const L_k = likelihood(X_k, responses, itemBankMap);

    varianceNumerator += Math.pow(X_k - thetaEAP, 2) * L_k * W_k;
  }

  const posteriorVariance = varianceNumerator / denominator;
  const semEAP = Math.max(0.1, Math.sqrt(Math.max(0.01, posteriorVariance)));

  return { theta: thetaEAP, sem: semEAP };
}

/**
 * Newton-Raphson Maximum Likelihood Estimation (MLE)
 * Ideal for later in test when mixed responses exist
 */
export function estimateAbilityMLE(
  responses: CandidateResponse[],
  itemBankMap: Map<string, IRTItem>,
  initialTheta: number = 0.0
): { theta: number; sem: number; converged: boolean } {
  const hasCorrect = responses.some(r => r.correct);
  const hasIncorrect = responses.some(r => !r.correct);

  // MLE is undefined for all-correct or all-incorrect responses; fallback to EAP
  if (!hasCorrect || !hasIncorrect) {
    const eap = estimateAbilityEAP(responses, itemBankMap);
    return { ...eap, converged: false };
  }

  let theta = initialTheta;
  const MAX_ITER = 25;
  const EPSILON = 0.001;
  let converged = false;

  for (let iter = 0; iter < MAX_ITER; iter++) {
    let firstDeriv = 0;
    let secondDeriv = 0;

    for (const resp of responses) {
      const item = itemBankMap.get(resp.itemId);
      if (!item) continue;
      const { a = 1, b, c = 0 } = item;
      const P = calculateProbability(theta, item);
      const Q = 1 - P;
      const u = resp.correct ? 1 : 0;

      // Derivatives of 3PL
      const dP_dTheta = a * (P - c) * Q / (1 - c);
      const weight = (u - P) / (P * Q);

      firstDeriv += weight * dP_dTheta;
      secondDeriv -= (Math.pow(dP_dTheta, 2) / (P * Q)); // Fisher Information expectation
    }

    if (Math.abs(secondDeriv) < 1e-6) break;

    const delta = firstDeriv / (-secondDeriv);
    // Damping to prevent divergence
    const step = Math.max(-1.0, Math.min(1.0, delta));
    theta += step;

    if (Math.abs(step) < EPSILON) {
      converged = true;
      break;
    }
  }

  theta = Math.max(-4.0, Math.min(4.0, theta));
  const administeredItems = responses
    .map(r => itemBankMap.get(r.itemId))
    .filter((i): i is IRTItem => Boolean(i));
  const sem = calculateSEM(theta, administeredItems);

  return { theta, sem, converged };
}

// ==========================================
// 3. CAT ITEM SELECTION & EXPOSURE CONTROL
// ==========================================

export interface ItemSelectionConfig {
  theta: number;
  availableItems: IRTItem[];
  administeredItemIds: Set<string>;
  maxExposureRate?: number; // e.g. 0.25 (Sympson-Hetter max)
}

/**
 * Selects the next optimal item maximizing Fisher Information at theta
 * Incorporates Sympson-Hetter exposure control algorithm
 */
export function selectNextAdaptiveItem(config: ItemSelectionConfig): IRTItem | null {
  const { theta, availableItems, administeredItemIds, maxExposureRate = 0.25 } = config;

  // Filter out already answered items
  const candidates = availableItems.filter(item => !administeredItemIds.has(item.id));
  if (candidates.length === 0) return null;

  // Rank candidate items by information at current theta
  const ranked = candidates
    .map(item => ({
      item,
      info: calculateItemInformation(theta, item),
    }))
    .sort((a, b) => b.info - a.info);

  // Sympson-Hetter exposure filter
  for (const { item } of ranked) {
    const operationalExposure = item.exposureRate ?? 0.10;
    const k_param = item.exposureParamK ?? (maxExposureRate / Math.max(0.01, operationalExposure));
    const randomDraw = Math.random();

    // If item passes exposure threshold, administer it
    if (randomDraw <= Math.min(1.0, k_param)) {
      return item;
    }
    // Otherwise, test next most informative item
  }

  // Fallback to top informative item if all were filtered by exposure
  return ranked[0].item;
}

// ==========================================
// 4. ADAPTIVE STOPPING RULES
// ==========================================

export interface StoppingRuleOptions {
  minItems?: number; // Default: 10
  maxItems?: number; // Default: 30
  targetSem?: number; // Default: 0.30 (reliablity >= 0.91)
  cutScoreTheta?: number; // e.g. 0.0 (Standard Passing Threshold)
  confidenceLevel?: number; // Default: 1.96 (95% CI)
}

export function evaluateStoppingRule(
  state: {
    theta: number;
    sem: number;
    numItems: number;
  },
  options: StoppingRuleOptions = {}
): {
  shouldStop: boolean;
  reason?: 'TARGET_SEM_REACHED' | 'CUT_SCORE_CONFIDENCE_ACHIEVED' | 'MAX_ITEMS_REACHED';
  decision: 'PASS' | 'FAIL' | 'INDETERMINATE';
} {
  const minItems = options.minItems ?? 10;
  const maxItems = options.maxItems ?? 30;
  const targetSem = options.targetSem ?? 0.30;
  const cutScore = options.cutScoreTheta ?? 0.0;
  const zScore = options.confidenceLevel ?? 1.96;

  // Must administer minimum items for psychometric validity
  if (state.numItems < minItems) {
    return { shouldStop: false, decision: 'INDETERMINATE' };
  }

  // Rule 1: Maximum test length reached
  if (state.numItems >= maxItems) {
    const decision = state.theta >= cutScore ? 'PASS' : 'FAIL';
    return { shouldStop: true, reason: 'MAX_ITEMS_REACHED', decision };
  }

  // Rule 2: Cut-score classification confidence achieved (95% CI strictly on one side of cut score)
  const marginOfError = zScore * state.sem;
  const lowerBound = state.theta - marginOfError;
  const upperBound = state.theta + marginOfError;

  if (lowerBound > cutScore) {
    return { shouldStop: true, reason: 'CUT_SCORE_CONFIDENCE_ACHIEVED', decision: 'PASS' };
  }
  if (upperBound < cutScore) {
    return { shouldStop: true, reason: 'CUT_SCORE_CONFIDENCE_ACHIEVED', decision: 'FAIL' };
  }

  // Rule 3: Fixed precision target SEM reached
  if (state.sem <= targetSem) {
    const decision = state.theta >= cutScore ? 'PASS' : 'FAIL';
    return { shouldStop: true, reason: 'TARGET_SEM_REACHED', decision };
  }

  return { shouldStop: false, decision: 'INDETERMINATE' };
}
