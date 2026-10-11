/**
 * INSYT Psychometric Quality Assurance & Statistical Calibration
 *
 * Implements:
 * - Classical Item Difficulty (p-value) & Discrimination (Point-Biserial r_pbis)
 * - Internal Consistency Reliability (Cronbach's Alpha)
 * - Inter-Rater Reliability (Cohen's Kappa)
 * - Demographic Neutrality & Bias: Mantel-Haenszel Differential Item Functioning (DIF)
 *   with Educational Testing Service (ETS) Classification (A, B, C)
 */

export interface ItemAnalysisResult {
  itemId: string;
  sampleSize: number;
  difficultyP: number; // 0.0 to 1.0
  discriminationRpbis: number; // Point-biserial correlation (-1.0 to +1.0)
  qualityStatus: 'EXCELLENT' | 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'DEFECTIVE';
  recommendation: string;
}

/**
 * Calculates classical item difficulty: p = correct / total
 */
export function calculateItemDifficulty(responses: boolean[]): number {
  if (responses.length === 0) return 0;
  const correctCount = responses.filter(Boolean).length;
  return correctCount / responses.length;
}

/**
 * Calculates point-biserial correlation r_pbis between item score (0/1) and total score
 * r_pbis = ((X_1_bar - X_0_bar) / s_X) * sqrt(p * (1 - p))
 */
export function calculatePointBiserial(itemScores: boolean[], totalScores: number[]): number {
  const n = itemScores.length;
  if (n < 5 || n !== totalScores.length) return 0;

  let sum0 = 0, count0 = 0;
  let sum1 = 0, count1 = 0;
  let totalSum = 0;
  let totalSqSum = 0;

  for (let i = 0; i < n; i++) {
    const score = totalScores[i];
    totalSum += score;
    totalSqSum += score * score;

    if (itemScores[i]) {
      sum1 += score;
      count1++;
    } else {
      sum0 += score;
      count0++;
    }
  }

  if (count0 === 0 || count1 === 0) return 0; // Degenerate variance

  const mean0 = sum0 / count0;
  const mean1 = sum1 / count1;
  const grandMean = totalSum / n;
  const sampleVariance = (totalSqSum - n * grandMean * grandMean) / (n - 1);

  if (sampleVariance <= 0) return 0;
  const sX = Math.sqrt(sampleVariance);

  const p = count1 / n;
  const q = 1 - p;

  const rPbis = ((mean1 - mean0) / sX) * Math.sqrt(p * q);
  return Math.max(-1.0, Math.min(1.0, rPbis));
}

/**
 * Assesses overall psychometric quality of an item
 */
export function assessItemQuality(p: number, rPbis: number): {
  status: 'EXCELLENT' | 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'DEFECTIVE';
  recommendation: string;
} {
  if (rPbis < 0) {
    return {
      status: 'DEFECTIVE',
      recommendation: 'Negative discrimination indicates miskeyed question, ambiguity, or confusing distractors. Quarantine immediately.',
    };
  }
  if (rPbis < 0.20) {
    return {
      status: 'NEEDS_REVIEW',
      recommendation: 'Low discrimination. Item poorly separates high from low performers.',
    };
  }
  if (p < 0.15 || p > 0.90) {
    return {
      status: 'ACCEPTABLE',
      recommendation: 'Extreme difficulty or ease. Retain only if needed for measurement at tail abilities.',
    };
  }
  return {
    status: 'EXCELLENT',
    recommendation: 'Item demonstrates high psychometric quality and robust discrimination.',
  };
}

/**
 * Calculates Cronbach's Alpha for internal consistency of a test
 * matrix: [candidateIndex][itemIndex] (0 or 1)
 */
export function calculateCronbachsAlpha(matrix: number[][]): number {
  const k = matrix[0]?.length ?? 0;
  const n = matrix.length;
  if (k <= 1 || n <= 2) return 0;

  // Compute variance for each item
  let sumItemVariances = 0;
  for (let j = 0; j < k; j++) {
    let itemSum = 0;
    let itemSqSum = 0;
    for (let i = 0; i < n; i++) {
      const val = matrix[i][j];
      itemSum += val;
      itemSqSum += val * val;
    }
    const itemMean = itemSum / n;
    const itemVariance = (itemSqSum - n * itemMean * itemMean) / (n - 1);
    sumItemVariances += itemVariance;
  }

  // Compute total scores variance
  const totalScores: number[] = [];
  let totalSum = 0;
  let totalSqSum = 0;
  for (let i = 0; i < n; i++) {
    const total = matrix[i].reduce((acc, curr) => acc + curr, 0);
    totalScores.push(total);
    totalSum += total;
    totalSqSum += total * total;
  }
  const totalMean = totalSum / n;
  const totalVariance = (totalSqSum - n * totalMean * totalMean) / (n - 1);

  if (totalVariance <= 0) return 0;

  const alpha = (k / (k - 1)) * (1 - sumItemVariances / totalVariance);
  return Math.max(0, Math.min(1.0, alpha));
}

/**
 * Calculates Cohen's Kappa for inter-rater agreement on performance rubrics
 */
export function calculateCohensKappa<T extends string | number>(
  raterA: T[],
  raterB: T[]
): { kappa: number; observedAgreement: number; interpretation: string } {
  const n = raterA.length;
  if (n === 0 || n !== raterB.length) {
    return { kappa: 0, observedAgreement: 0, interpretation: 'Insufficient data' };
  }

  // Find all unique categories
  const categories = Array.from(new Set([...raterA, ...raterB]));
  const catMap = new Map<T, number>();
  categories.forEach((cat, idx) => catMap.set(cat, idx));
  const numCats = categories.length;

  // Build confusion matrix
  const matrix: number[][] = Array.from({ length: numCats }, () => Array(numCats).fill(0));
  let observedMatches = 0;

  for (let i = 0; i < n; i++) {
    const idxA = catMap.get(raterA[i])!;
    const idxB = catMap.get(raterB[i])!;
    matrix[idxA][idxB]++;
    if (idxA === idxB) observedMatches++;
  }

  const pO = observedMatches / n;

  // Expected agreement by chance
  let pE = 0;
  for (let c = 0; c < numCats; c++) {
    let rowSum = 0;
    let colSum = 0;
    for (let j = 0; j < numCats; j++) rowSum += matrix[c][j];
    for (let i = 0; i < numCats; i++) colSum += matrix[i][c];
    pE += (rowSum / n) * (colSum / n);
  }

  if (pE === 1) return { kappa: 1.0, observedAgreement: pO, interpretation: 'Perfect Agreement' };
  const kappa = (pO - pE) / (1 - pE);

  let interpretation = 'Slight';
  if (kappa > 0.80) interpretation = 'Almost Perfect Agreement';
  else if (kappa > 0.60) interpretation = 'Substantial Agreement';
  else if (kappa > 0.40) interpretation = 'Moderate Agreement';
  else if (kappa > 0.20) interpretation = 'Fair Agreement';
  else if (kappa <= 0) interpretation = 'Poor (No better than chance)';

  return { kappa: Math.max(-1.0, Math.min(1.0, kappa)), observedAgreement: pO, interpretation };
}

/**
 * Mantel-Haenszel Differential Item Functioning (DIF) analysis
 * Tests whether candidates with the same total score perform differently across demographic groups.
 */
export interface DIFResult {
  alphaMH: number; // Common odds ratio
  deltaMH: number; // ETS Delta: -2.35 * ln(alphaMH)
  etsCategory: 'A' | 'B' | 'C';
  severity: 'NEGLIGIBLE' | 'MODERATE' | 'LARGE';
  favoringGroup: 'REFERENCE' | 'FOCAL' | 'EQUAL';
}

export function calculateMantelHaenszelDIF(
  referenceScores: boolean[],
  focalScores: boolean[],
  referenceStrata: number[],
  focalStrata: number[]
): DIFResult {
  // Collect all unique ability strata (total scores)
  const allStrata = Array.from(new Set([...referenceStrata, ...focalStrata])).sort((a, b) => a - b);

  let numeratorSum = 0;
  let denominatorSum = 0;

  for (const s of allStrata) {
    // 2x2 contingency table for stratum s:
    //               Correct (1)    Incorrect (0)    Total
    // Reference (R)     A_j             B_j          N_Rj
    // Focal (F)         C_j             D_j          N_Fj
    // Total             M_1j            M_0j         T_j

    let A_j = 0, B_j = 0;
    let C_j = 0, D_j = 0;

    for (let i = 0; i < referenceScores.length; i++) {
      if (referenceStrata[i] === s) {
        if (referenceScores[i]) A_j++;
        else B_j++;
      }
    }

    for (let i = 0; i < focalScores.length; i++) {
      if (focalStrata[i] === s) {
        if (focalScores[i]) C_j++;
        else D_j++;
      }
    }

    const T_j = A_j + B_j + C_j + D_j;
    if (T_j < 2) continue; // Stratum too sparse

    numeratorSum += (A_j * D_j) / T_j;
    denominatorSum += (B_j * C_j) / T_j;
  }

  // Safe odds ratio calculation
  const alphaMH = denominatorSum === 0 ? 1.0 : numeratorSum / Math.max(1e-6, denominatorSum);
  const deltaMH = -2.35 * Math.log(Math.max(1e-4, alphaMH));
  const absDelta = Math.abs(deltaMH);

  // ETS DIF Classification
  let etsCategory: 'A' | 'B' | 'C' = 'A';
  let severity: 'NEGLIGIBLE' | 'MODERATE' | 'LARGE' = 'NEGLIGIBLE';

  if (absDelta >= 1.5) {
    etsCategory = 'C';
    severity = 'LARGE';
  } else if (absDelta >= 1.0) {
    etsCategory = 'B';
    severity = 'MODERATE';
  } else {
    etsCategory = 'A';
    severity = 'NEGLIGIBLE';
  }

  let favoringGroup: 'REFERENCE' | 'FOCAL' | 'EQUAL' = 'EQUAL';
  if (deltaMH > 0.1) favoringGroup = 'FOCAL';
  else if (deltaMH < -0.1) favoringGroup = 'REFERENCE';

  return {
    alphaMH,
    deltaMH,
    etsCategory,
    severity,
    favoringGroup,
  };
}
