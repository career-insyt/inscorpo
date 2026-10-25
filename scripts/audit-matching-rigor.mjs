import { evaluateCandidateMatch } from "../lib/jobs/candidate-matcher.ts";

const sampleJob = {
  id: "JOB-AUDIT-001",
  fingerprintHash: "f".repeat(64),
  sector: "CORPORATE_MNC",
  workplaceType: "REMOTE",
  employmentType: "FULL_TIME",
  title: "Principal Infrastructure Engineer",
  organizationName: "Global Cloud Systems",
  organizationAcronym: "GCS",
  divisionLocation: "Remote (BST Viable)",
  countryCode: "BD",
  currency: "USD",
  salaryMin: 5000,
  salaryMax: 9000,
  salaryPeriod: "MONTHLY",
  normalizedMonthlyBdtRange: { minBdt: 600000, maxBdt: 1080000 },
  sourceUrl: "https://boards-api.greenhouse.io/v1/boards/sample/jobs",
  officialPortalUrl: "https://sample.careers/jobs/123",
  circularPdfSpecimenUrl: null,
  waybackSnapshotUrl: null,
  sourceAttributionNotice: null,
  governmentAttributes: null,
  corporateRemoteAttributes: {
    timeZoneOverlapHoursWithBST: 5,
    bstWorkingWindow: "14:00 - 22:00 BST",
    requiresNightShiftForBST: false,
    contractType: "B2B_CONTRACTOR_W8BEN",
    payoutMethodsSupported: ["Wise"],
    atsPlatformName: "GREENHOUSE",
  },
  qualifications: {
    minimumDegreeLevel: "BACHELORS_ENGINEERING",
    acceptedDisciplines: ["COMPUTER_SCIENCE_ENGINEERING"],
    strictDisciplineEnforcement: true,
    allowThirdDivisionOrClassInAcademicHistory: false,
    minimumCgpaOn4Scale: 3.2,
    minAgeYears: 22,
    maxAgeGeneralYears: 40,
    maxAgeQuotaOrDepartmentalYears: null,
    ageCalculationReferenceDate: "2026-10-01",
    allDistrictsEligible: true,
    eligibleDistricts: [],
    excludedDistricts: [],
  },
  competencies: [
    { competencyId: "k8s-arch", name: "Kubernetes Cluster Architecture", escoUri: null, onetSocCode: "15-1252.00", weightCategory: "MANDATORY_CORE", insytLearningModuleId: null },
    { competencyId: "ebpf-net", name: "eBPF Linux Kernel Tracing", escoUri: null, onetSocCode: "15-1252.00", weightCategory: "MANDATORY_CORE", insytLearningModuleId: null },
    { competencyId: "distributed-consensus", name: "Raft / Paxos Consensus", escoUri: null, onetSocCode: "15-1252.00", weightCategory: "MANDATORY_CORE", insytLearningModuleId: null },
  ],
  summaryPlainText: "High scale infrastructure role requiring deep systems engineering background.",
  responsibilitiesMarkdown: "Design multi-region Kubernetes clusters.",
  publishedAt: "2026-10-01T00:00:00+06:00",
  deadline: "2026-11-01T23:59:59+06:00",
  lastVerifiedLiveAt: "2026-10-18T12:00:00+06:00",
  httpHealthStatus: 200,
  isExpired: false,
  archiveStatus: "LIVE_VERIFIED",
  archiveNotice: null,
};

console.log("=== EXECUTING CANDIDATE MATCHING MATHEMATICAL RIGOR AUDIT ===");

// TEST 1: Age Disqualification
const candidateAgeDisqualified = {
  id: "CAND-AGE-FAIL",
  birthDate: "1980-01-01", // ~46 years old (limit is 40)
  permanentHomeDistrict: "Dhaka",
  isOrphanOrPhysicallyDisabled: false,
  hasFreedomFighterOrEthnicQuota: false,
  highestDegreeLevel: "BACHELORS_ENGINEERING",
  academicDiscipline: "COMPUTER_SCIENCE_ENGINEERING",
  cgpaOn4Scale: 3.8,
  hasAnyThirdDivisionOrClass: false,
  competencyEvidence: {
    "k8s-arch": { tier: 3 },
    "ebpf-net": { tier: 3 },
    "distributed-consensus": { tier: 3 },
  },
};
const res1 = evaluateCandidateMatch(candidateAgeDisqualified, sampleJob);
console.log("\n[Test 1] Candidate Disqualified by Age (>40y) with 3x Verified Skills:");
console.log(`- isStatutorilyEligible: ${res1.isStatutorilyEligible} (Expected: false)`);
console.log(`- alignmentScore: ${res1.alignmentScore} (Expected: 0)`);
console.log(`- unmetReasons:`, res1.unmetPrerequisiteReasons);

// TEST 2: 100% Unverified CV Keywords (Tier 1 Evidence Only)
const candidateTier1Only = {
  id: "CAND-TIER1-ONLY",
  birthDate: "1998-05-15",
  permanentHomeDistrict: "Dhaka",
  isOrphanOrPhysicallyDisabled: false,
  hasFreedomFighterOrEthnicQuota: false,
  highestDegreeLevel: "BACHELORS_ENGINEERING",
  academicDiscipline: "COMPUTER_SCIENCE_ENGINEERING",
  cgpaOn4Scale: 3.8,
  hasAnyThirdDivisionOrClass: false,
  competencyEvidence: {
    "k8s-arch": { tier: 1 },
    "ebpf-net": { tier: 1 },
    "distributed-consensus": { tier: 1 },
  },
};
const res2 = evaluateCandidateMatch(candidateTier1Only, sampleJob);
console.log("\n[Test 2] Candidate with 100% Keyword Matches on Unverified CV (Tier 1 Only):");
console.log(`- isStatutorilyEligible: ${res2.isStatutorilyEligible} (Expected: true)`);
console.log(`- alignmentScore: ${res2.alignmentScore}% (Expected: strictly <= 33.3%)`);
console.log(`- Score capped at 33.3% ceiling verified: ${res2.alignmentScore <= 33.3}`);

// TEST 3: Tier 3 Cryptographically Verified (Ed25519)
const candidateTier3Verified = {
  id: "CAND-TIER3-VERIFIED",
  birthDate: "1998-05-15",
  permanentHomeDistrict: "Dhaka",
  isOrphanOrPhysicallyDisabled: false,
  hasFreedomFighterOrEthnicQuota: false,
  highestDegreeLevel: "BACHELORS_ENGINEERING",
  academicDiscipline: "COMPUTER_SCIENCE_ENGINEERING",
  cgpaOn4Scale: 3.8,
  hasAnyThirdDivisionOrClass: false,
  competencyEvidence: {
    "k8s-arch": { tier: 3, credentialHash: "ed25519-k8s" },
    "ebpf-net": { tier: 3, credentialHash: "ed25519-ebpf" },
    "distributed-consensus": { tier: 3, credentialHash: "ed25519-raft" },
  },
};
const res3 = evaluateCandidateMatch(candidateTier3Verified, sampleJob);
console.log("\n[Test 3] Candidate with 100% W3C Tier 3 Verified Credentials:");
console.log(`- isStatutorilyEligible: ${res3.isStatutorilyEligible} (Expected: true)`);
console.log(`- alignmentScore: ${res3.alignmentScore}% (Expected: 100%)`);
