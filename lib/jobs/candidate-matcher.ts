import type { CanonicalJob } from "./canonical-job-schema";

export interface CandidatePassport {
  id: string;
  birthDate: string; // YYYY-MM-DD
  permanentHomeDistrict: string;
  isOrphanOrPhysicallyDisabled: boolean;
  hasFreedomFighterOrEthnicQuota: boolean;
  highestDegreeLevel: string;
  academicDiscipline: string;
  cgpaOn4Scale: number;
  hasAnyThirdDivisionOrClass: boolean;
  competencyEvidence: Record<string, { tier: 0 | 1 | 2 | 3; credentialHash?: string }>;
}

export interface CandidateMatchResult {
  jobId: string;
  isStatutorilyEligible: boolean;
  statutoryGateFlags: {
    degreeDisciplineMet: boolean;
    cgpaMet: boolean;
    ageMet: boolean;
    districtMet: boolean;
  };
  alignmentScore: number; // 0 - 100
  unmetPrerequisiteReasons: string[];
  missingCompetenciesWithGain: {
    competencyId: string;
    label: string;
    currentTier: number;
    potentialScoreGain: number;
    actionableBridgeUrl: string;
  }[];
}

const DEGREE_LEVEL_HIERARCHY: Record<string, number> = {
  SSC_OR_EQUIVALENT: 1,
  HSC_OR_EQUIVALENT: 2,
  DIPLOMA_ENGINEERING: 3,
  BACHELORS_HONOURS: 4,
  BACHELORS_ENGINEERING: 5,
  MASTERS: 6,
  MBBS_BDS: 6,
  CA_ACCA_CFA_PROFESSIONAL: 7,
  PHD: 8,
};

export function evaluateCandidateMatch(
  candidate: CandidatePassport,
  job: CanonicalJob
): CandidateMatchResult {
  const unmetReasons: string[] = [];

  // 1. Degree & Discipline Gate
  const candidateDegRank = DEGREE_LEVEL_HIERARCHY[candidate.highestDegreeLevel] || 0;
  const requiredDegRank = DEGREE_LEVEL_HIERARCHY[job.qualifications.minimumDegreeLevel] || 0;
  const degreeLevelOk = candidateDegRank >= requiredDegRank;

  const disciplineOk =
    job.qualifications.acceptedDisciplines.includes("ANY_RECOGNIZED_DISCIPLINE") ||
    job.qualifications.acceptedDisciplines.includes(candidate.academicDiscipline as any);

  const thirdDivOk =
    job.qualifications.allowThirdDivisionOrClassInAcademicHistory ||
    !candidate.hasAnyThirdDivisionOrClass;

  const degreeDisciplineMet = degreeLevelOk && disciplineOk && thirdDivOk;
  if (!degreeLevelOk) unmetReasons.push(`Requires at least ${job.qualifications.minimumDegreeLevel}`);
  if (!disciplineOk) unmetReasons.push(`Academic discipline not accepted for this cadre`);
  if (!thirdDivOk) unmetReasons.push(`Third division/class barred across academic history`);

  // 2. CGPA Gate
  const cgpaMet =
    job.qualifications.minimumCgpaOn4Scale === null ||
    candidate.cgpaOn4Scale >= job.qualifications.minimumCgpaOn4Scale;
  if (!cgpaMet) unmetReasons.push(`Minimum CGPA requirement: ${job.qualifications.minimumCgpaOn4Scale}`);

  // 3. Age Gate
  const refDate = job.qualifications.ageCalculationReferenceDate
    ? new Date(job.qualifications.ageCalculationReferenceDate)
    : new Date();
  const birthDate = new Date(candidate.birthDate);
  const ageYears =
    (refDate.getTime() - birthDate.getTime()) / (365.25 * 24 * 3600 * 1000);

  const maxAllowedAge =
    candidate.hasFreedomFighterOrEthnicQuota && job.qualifications.maxAgeQuotaOrDepartmentalYears
      ? job.qualifications.maxAgeQuotaOrDepartmentalYears
      : job.qualifications.maxAgeGeneralYears;

  const ageMet =
    ageYears >= job.qualifications.minAgeYears && ageYears <= maxAllowedAge;
  if (!ageMet) unmetReasons.push(`Age (${ageYears.toFixed(1)}y) outside statutory range [${job.qualifications.minAgeYears}–${maxAllowedAge}y]`);

  // 4. District Gate
  const districtMet =
    job.qualifications.allDistrictsEligible ||
    candidate.isOrphanOrPhysicallyDisabled ||
    job.qualifications.eligibleDistricts.includes(candidate.permanentHomeDistrict) ||
    !job.qualifications.excludedDistricts.includes(candidate.permanentHomeDistrict);
  if (!districtMet) unmetReasons.push(`District ${candidate.permanentHomeDistrict} not eligible in circular quota table`);

  const isStatutorilyEligible = degreeDisciplineMet && cgpaMet && ageMet && districtMet;

  // 5. Competency Alignment Score & Gap Analysis
  const weights: Record<string, number> = {
    MANDATORY_CORE: 1.0,
    PREFERRED: 0.6,
    BONUS: 0.3,
  };

  let totalMaxWeight = 0;
  let candidateEarnedWeight = 0;
  const missingWithGain: CandidateMatchResult["missingCompetenciesWithGain"] = [];

  for (const comp of job.competencies) {
    const w = weights[comp.weightCategory] || 0.6;
    totalMaxWeight += w * 3.0; // Max tier multiplier is 3.0 (Verified)

    const evidence = candidate.competencyEvidence[comp.competencyId];
    const currentTier = evidence ? evidence.tier : 0;
    const tierMultiplier = currentTier === 3 ? 3.0 : currentTier === 2 ? 2.0 : currentTier === 1 ? 1.0 : 0.0;

    candidateEarnedWeight += w * tierMultiplier;

    if (tierMultiplier < 3.0) {
      const gainWeight = w * (3.0 - tierMultiplier);
      const potentialScoreGain = Math.round((gainWeight / (totalMaxWeight || 1)) * 100);
      missingWithGain.push({
        competencyId: comp.competencyId,
        label: comp.name,
        currentTier,
        potentialScoreGain,
        actionableBridgeUrl: comp.insytLearningModuleId
          ? `/learn/${comp.insytLearningModuleId}`
          : `/studio/challenges?skill=${encodeURIComponent(comp.competencyId)}`,
      });
    }
  }

  const rawScore = totalMaxWeight > 0 ? (candidateEarnedWeight / totalMaxWeight) * 100 : 0;
  const alignmentScore = isStatutorilyEligible ? Math.round(rawScore) : 0;

  missingWithGain.sort((a, b) => b.potentialScoreGain - a.potentialScoreGain);

  return {
    jobId: job.id,
    isStatutorilyEligible,
    statutoryGateFlags: {
      degreeDisciplineMet,
      cgpaMet,
      ageMet,
      districtMet,
    },
    alignmentScore,
    unmetPrerequisiteReasons: unmetReasons,
    missingCompetenciesWithGain: missingWithGain,
  };
}
