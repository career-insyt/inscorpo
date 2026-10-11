/**
 * INSYT Corporate — Readiness Index (RI) Engine
 *
 * Implements Section 5 ("READINESS INDEX ENGINE") of the Supermassive Implementation Plan.
 * Replaces superficial completion percentages with a rigorous 5-dimension weighted competency model.
 * 
 * Weights:
 * - Cognitive Readiness: 25% (Aptitude, quantitative, verbal, logical)
 * - Technical Readiness: 25% (Excel, SQL, Power BI, Python practical tests)
 * - Case Readiness: 20% (Structuring, profitability, market entry, issue trees)
 * - Communication Readiness: 15% (Data storytelling, executive writing, presentations)
 * - Interview Readiness: 15% (STAR behavioral, proctored mock interview transcripts)
 */

export interface ReadinessComponentScores {
  cognitive: number | null; // 0-100 or null if not evaluated
  technical: number | null; // 0-100 or null if not evaluated
  caseSolving: number | null; // 0-100 or null if not evaluated
  communication: number | null; // 0-100 or null if not evaluated
  interview: number | null; // 0-100 or null if not evaluated
}

export interface ReadinessWeights {
  cognitive: number;
  technical: number;
  caseSolving: number;
  communication: number;
  interview: number;
}

export const DEFAULT_READINESS_WEIGHTS: ReadinessWeights = {
  cognitive: 0.25,
  technical: 0.25,
  caseSolving: 0.20,
  communication: 0.15,
  interview: 0.15,
};

export interface ReadinessEvaluationResult {
  version: string;
  isComplete: boolean;
  score: number | null; // null if insufficient evidence
  statusLabel: string;
  confidence: "none" | "low" | "medium" | "high";
  assessmentCount: number;
  projectCount: number;
  componentScores: ReadinessComponentScores;
  weights: ReadinessWeights;
  breakdown: {
    dimension: string;
    weightPercent: number;
    score: number | null;
    status: "verified" | "needs_work" | "unevaluated";
  }[];
  strengths: string[];
  growthAreas: string[];
  lastUpdated: string;
}

/**
 * Computes the candidate's Readiness Index based on validated evidence.
 * If fewer than 2 dimensions have verified assessments, the status is strictly
 * marked as "Readiness assessment incomplete" rather than fabricating a score.
 */
export function calculateReadinessIndex(
  scores: ReadinessComponentScores,
  metadata: {
    assessmentCount: number;
    projectCount: number;
    weights?: Partial<ReadinessWeights>;
  }
): ReadinessEvaluationResult {
  const weights: ReadinessWeights = {
    ...DEFAULT_READINESS_WEIGHTS,
    ...(metadata.weights || {}),
  };

  const validDimensions: (keyof ReadinessComponentScores)[] = [];
  let weightedSum = 0;
  let activeWeightSum = 0;

  (Object.keys(scores) as (keyof ReadinessComponentScores)[]).forEach((dim) => {
    const val = scores[dim];
    if (typeof val === "number" && val >= 0) {
      validDimensions.push(dim);
      const w = weights[dim];
      weightedSum += val * w;
      activeWeightSum += w;
    }
  });

  const assessmentCount = metadata.assessmentCount || 0;
  const projectCount = metadata.projectCount || 0;

  // Threshold: At least 2 evaluated dimensions and at least 1 validated assessment/project
  const hasSufficientEvidence = validDimensions.length >= 2 && (assessmentCount > 0 || projectCount > 0);

  let confidence: ReadinessEvaluationResult["confidence"] = "none";
  if (validDimensions.length >= 4 && assessmentCount >= 3 && projectCount >= 1) {
    confidence = "high";
  } else if (validDimensions.length >= 3 && assessmentCount >= 2) {
    confidence = "medium";
  } else if (hasSufficientEvidence) {
    confidence = "low";
  }

  // Normalized score across active weights (if sufficient evidence)
  const normalizedScore = hasSufficientEvidence && activeWeightSum > 0
    ? Math.round(weightedSum / activeWeightSum)
    : null;

  const breakdown = [
    {
      dimension: "Quantitative & Cognitive Reasoning",
      weightPercent: Math.round(weights.cognitive * 100),
      score: scores.cognitive,
      status: scores.cognitive === null ? "unevaluated" : scores.cognitive >= 70 ? "verified" : "needs_work",
    },
    {
      dimension: "Technical Execution (Excel / SQL / BI)",
      weightPercent: Math.round(weights.technical * 100),
      score: scores.technical,
      status: scores.technical === null ? "unevaluated" : scores.technical >= 70 ? "verified" : "needs_work",
    },
    {
      dimension: "Corporate Case Problem Solving",
      weightPercent: Math.round(weights.caseSolving * 100),
      score: scores.caseSolving,
      status: scores.caseSolving === null ? "unevaluated" : scores.caseSolving >= 70 ? "verified" : "needs_work",
    },
    {
      dimension: "Executive Presentation & Writing",
      weightPercent: Math.round(weights.communication * 100),
      score: scores.communication,
      status: scores.communication === null ? "unevaluated" : scores.communication >= 70 ? "verified" : "needs_work",
    },
    {
      dimension: "STAR Behavioral Interview Mastery",
      weightPercent: Math.round(weights.interview * 100),
      score: scores.interview,
      status: scores.interview === null ? "unevaluated" : scores.interview >= 70 ? "verified" : "needs_work",
    },
  ] as ReadinessEvaluationResult["breakdown"];

  const strengths: string[] = [];
  const growthAreas: string[] = [];

  breakdown.forEach((item) => {
    if (item.score !== null && item.score >= 70) {
      strengths.push(item.dimension);
    } else if (item.score !== null && item.score < 70) {
      growthAreas.push(item.dimension);
    } else {
      growthAreas.push(`${item.dimension} (Assessment Pending)`);
    }
  });

  return {
    version: "2026.1-PROD",
    isComplete: hasSufficientEvidence && validDimensions.length === 5,
    score: normalizedScore,
    statusLabel: hasSufficientEvidence
      ? `${normalizedScore}/100 Readiness (${confidence.toUpperCase()} Confidence)`
      : "Readiness assessment incomplete — complete diagnostics & capstones to calibrate",
    confidence,
    assessmentCount,
    projectCount,
    componentScores: scores,
    weights,
    breakdown,
    strengths,
    growthAreas,
    lastUpdated: new Date().toISOString(),
  };
}
