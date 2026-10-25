import test from "node:test";
import assert from "node:assert/strict";
import {
  CanonicalJobSchema,
  JobSectorEnum,
  AcademicDisciplineEnum,
} from "../lib/jobs/canonical-job-schema.ts";
import {
  assessRemoteViability,
  normalizeSalaryToMonthlyBdt,
} from "../lib/jobs/remote-harvester.ts";
import { evaluateCandidateMatch } from "../lib/jobs/candidate-matcher.ts";

test("CanonicalJobSchema Validation", async (t) => {
  await t.test("Validates complete Government Job with statutory attributes", () => {
    const validGovJob = {
      id: "GOV-BCIC-001",
      fingerprintHash: "a".repeat(64),
      sector: "GOVERNMENT",
      workplaceType: "ONSITE",
      employmentType: "FULL_TIME",
      title: "Assistant Engineer (Chemical)",
      organizationName: "Bangladesh Chemical Industries Corporation",
      organizationAcronym: "BCIC",
      divisionLocation: "Dhaka",
      countryCode: "BD",
      currency: "BDT",
      salaryMin: 22000,
      salaryMax: 53060,
      salaryPeriod: "MONTHLY",
      normalizedMonthlyBdtRange: { minBdt: 22000, maxBdt: 53060 },
      sourceUrl: "https://alljobs.teletalk.com.bd/jobs/government",
      officialPortalUrl: "http://bcic.teletalk.com.bd",
      circularPdfSpecimenUrl: "http://bcic.teletalk.com.bd/circular.pdf",
      waybackSnapshotUrl: "https://web.archive.org/web/20261018/bcic.pdf",
      sourceAttributionNotice: null,
      governmentAttributes: {
        ministryOrDivision: "Ministry of Industries",
        agencyName: "Bangladesh Chemical Industries Corporation",
        agencyAcronym: "BCIC",
        memoNumber: "36.091.018.00.00.1042.2026",
        payScaleGrade: 9,
        basicPayRangeBdt: "22000 - 53060",
        estimatedGrossSalaryBdt: 35600,
        teletalkPostCodeOrSlug: "AE_CHEM",
        applicationFeeBdt: 223,
        paymentSmsInstructions: "BCIC <space> UserID to 16222",
        statutoryQuotaAllocation: {
          meritPercentage: 93,
          freedomFighterChildPercentage: 5,
          ethnicMinoritiesPercentage: 1,
          physicallyDisabledAndThirdGenderPercentage: 1,
        },
      },
      corporateRemoteAttributes: null,
      qualifications: {
        minimumDegreeLevel: "BACHELORS_ENGINEERING",
        acceptedDisciplines: ["MECHANICAL_ENGINEERING"],
        strictDisciplineEnforcement: true,
        allowThirdDivisionOrClassInAcademicHistory: false,
        minimumCgpaOn4Scale: 3.0,
        minAgeYears: 18,
        maxAgeGeneralYears: 32,
        maxAgeQuotaOrDepartmentalYears: 32,
        ageCalculationReferenceDate: "2026-10-01",
        allDistrictsEligible: true,
        eligibleDistricts: [],
        excludedDistricts: [],
      },
      competencies: [
        {
          competencyId: "chem-process-design",
          name: "Chemical Process Simulation & Safety",
          escoUri: null,
          onetSocCode: "17-2041.00",
          weightCategory: "MANDATORY_CORE",
          insytLearningModuleId: "chem-eng-01",
        },
      ],
      summaryPlainText:
        "Official Government Class-I Gazetted Engineer circular for Bangladesh Chemical Industries Corporation.",
      responsibilitiesMarkdown: "Supervise fertilizer plant operations and chemical synthesis.",
      publishedAt: "2026-10-01T10:00:00+06:00",
      deadline: "2026-11-15T17:00:00+06:00",
      lastVerifiedLiveAt: "2026-10-18T12:00:00+06:00",
      httpHealthStatus: 200,
      isExpired: false,
      archiveStatus: "LIVE_VERIFIED",
      archiveNotice: null,
    };

    const parsed = CanonicalJobSchema.safeParse(validGovJob);
    assert.strictEqual(parsed.success, true);
  });

  await t.test("Rejects Government Job without governmentAttributes", () => {
    const invalidJob = {
      id: "GOV-BCIC-002",
      fingerprintHash: "b".repeat(64),
      sector: "GOVERNMENT",
      workplaceType: "ONSITE",
      employmentType: "FULL_TIME",
      title: "Assistant Engineer",
      organizationName: "BCIC",
      organizationAcronym: "BCIC",
      divisionLocation: "Dhaka",
      countryCode: "BD",
      currency: "BDT",
      salaryMin: 22000,
      salaryMax: 53060,
      salaryPeriod: "MONTHLY",
      normalizedMonthlyBdtRange: { minBdt: 22000, maxBdt: 53060 },
      sourceUrl: "https://bcic.gov.bd",
      officialPortalUrl: "http://bcic.teletalk.com.bd",
      circularPdfSpecimenUrl: null,
      waybackSnapshotUrl: null,
      sourceAttributionNotice: null,
      governmentAttributes: null, // VIOLATION
      corporateRemoteAttributes: null,
      qualifications: {
        minimumDegreeLevel: "BACHELORS_ENGINEERING",
        acceptedDisciplines: ["MECHANICAL_ENGINEERING"],
        strictDisciplineEnforcement: true,
        allowThirdDivisionOrClassInAcademicHistory: false,
        minimumCgpaOn4Scale: 3.0,
        minAgeYears: 18,
        maxAgeGeneralYears: 32,
        maxAgeQuotaOrDepartmentalYears: 32,
        ageCalculationReferenceDate: "2026-10-01",
        allDistrictsEligible: true,
        eligibleDistricts: [],
        excludedDistricts: [],
      },
      competencies: [
        {
          competencyId: "test-comp",
          name: "Test",
          escoUri: null,
          onetSocCode: "17-2041.00",
          weightCategory: "MANDATORY_CORE",
          insytLearningModuleId: null,
        },
      ],
      summaryPlainText: "Valid summary text that is more than thirty characters long.",
      responsibilitiesMarkdown: "None",
      publishedAt: "2026-10-01T10:00:00+06:00",
      deadline: "2026-11-15T17:00:00+06:00",
      lastVerifiedLiveAt: "2026-10-18T12:00:00+06:00",
      httpHealthStatus: 200,
      isExpired: false,
      archiveStatus: "LIVE_VERIFIED",
      archiveNotice: null,
    };

    const parsed = CanonicalJobSchema.safeParse(invalidJob);
    assert.strictEqual(parsed.success, false);
  });
});

test("Global Remote Viability & BST Overlap Calculation", async (t) => {
  await t.test("Rejects US W-2 Only and Security Clearance restrictions", () => {
    const res = assessRemoteViability("Remote - US Citizens Only (W2 Only)", "Requires US DoD clearance");
    assert.strictEqual(res.isViableForBangladesh, false);
    assert.strictEqual(res.overlapHoursWithBst, 0);
  });

  await t.test("Approves Worldwide / APAC roles with high daytime BST overlap", () => {
    // 01:00 UTC to 09:00 UTC (APAC / Australia)
    const res = assessRemoteViability("Worldwide (Anywhere)", "Async-first engineering team", 1, 9);
    assert.strictEqual(res.isViableForBangladesh, true);
    assert.strictEqual(res.requiresNightShift, false);
    assert.ok(res.overlapHoursWithBst >= 6);
  });

  await t.test("Approves EMEA / London overlap with afternoon BST window", () => {
    // 09:00 UTC to 17:00 UTC (15:00 - 23:00 BST)
    const res = assessRemoteViability("Global Remote (EMEA / APAC)", "Full-time contractor", 9, 17);
    assert.strictEqual(res.isViableForBangladesh, true);
    assert.strictEqual(res.overlapHoursWithBst, 8);
    assert.strictEqual(res.requiresNightShift, false);
  });

  await t.test("Accurately normalizes USD/EUR to monthly BDT", () => {
    // $120,000/yr @ 121.5 BDT/USD = 10,000 USD/mo = 1,215,000 BDT/mo
    const bdtSalary = normalizeSalaryToMonthlyBdt(120000, "USD", "ANNUAL");
    assert.strictEqual(bdtSalary, 1215000);
  });
});

test("Candidate Matching Engine & Fail-Closed Gate", async (t) => {
  const sampleJob = {
    id: "JOB-TEST-001",
    fingerprintHash: "c".repeat(64),
    sector: "CORPORATE_MNC",
    workplaceType: "REMOTE",
    employmentType: "CONTRACT_B2B",
    title: "Senior Full Stack Engineer",
    organizationName: "Global FinTech Corp",
    organizationAcronym: "GFT",
    divisionLocation: "Remote (BST Viable)",
    countryCode: "BD",
    currency: "USD",
    salaryMin: 4000,
    salaryMax: 7000,
    salaryPeriod: "MONTHLY",
    normalizedMonthlyBdtRange: { minBdt: 486000, maxBdt: 850500 },
    sourceUrl: "https://remoteok.com/api",
    officialPortalUrl: "https://apply.workable.com/fintech/j/123",
    circularPdfSpecimenUrl: null,
    waybackSnapshotUrl: "https://web.archive.org/web/123",
    sourceAttributionNotice: "RemoteOK",
    governmentAttributes: null,
    corporateRemoteAttributes: {
      timeZoneOverlapHoursWithBST: 5,
      bstWorkingWindow: "15:00 - 21:00 BST",
      requiresNightShiftForBST: false,
      contractType: "B2B_CONTRACTOR_W8BEN",
      payoutMethodsSupported: ["Wise", "Bank Wire (ERQ)"],
      atsPlatformName: "WORKABLE",
    },
    qualifications: {
      minimumDegreeLevel: "BACHELORS_HONOURS",
      acceptedDisciplines: ["COMPUTER_SCIENCE_ENGINEERING", "STATISTICS_DATA_SCIENCE"],
      strictDisciplineEnforcement: true,
      allowThirdDivisionOrClassInAcademicHistory: false,
      minimumCgpaOn4Scale: 3.0,
      minAgeYears: 20,
      maxAgeGeneralYears: 45,
      maxAgeQuotaOrDepartmentalYears: null,
      ageCalculationReferenceDate: "2026-10-01",
      allDistrictsEligible: true,
      eligibleDistricts: [],
      excludedDistricts: [],
    },
    competencies: [
      {
        competencyId: "ts-react-nextjs",
        name: "TypeScript / Next.js Architecture",
        escoUri: null,
        onetSocCode: "15-1252.00",
        weightCategory: "MANDATORY_CORE", // 1.0 weight
        insytLearningModuleId: "nextjs-advanced",
      },
      {
        competencyId: "distributed-systems",
        name: "Distributed Idempotency & Queues",
        escoUri: null,
        onetSocCode: "15-1252.00",
        weightCategory: "MANDATORY_CORE", // 1.0 weight
        insytLearningModuleId: "distributed-systems-01",
      },
    ],
    summaryPlainText: "Senior full stack engineering opening with verified compensation and contractor rails.",
    responsibilitiesMarkdown: "Build high-scale distributed financial systems.",
    publishedAt: "2026-10-10T00:00:00+06:00",
    deadline: "2026-11-10T23:59:59+06:00",
    lastVerifiedLiveAt: "2026-10-18T10:00:00+06:00",
    httpHealthStatus: 200,
    isExpired: false,
    archiveStatus: "LIVE_VERIFIED",
    archiveNotice: null,
  };

  await t.test("Fails closed when candidate academic discipline does not match", () => {
    const candidateDisciplineFail = {
      id: "CAND-001",
      birthDate: "1998-05-15",
      permanentHomeDistrict: "Dhaka",
      isOrphanOrPhysicallyDisabled: false,
      hasFreedomFighterOrEthnicQuota: false,
      highestDegreeLevel: "BACHELORS_HONOURS",
      academicDiscipline: "LAW_LEGAL_STUDIES", // NOT ACCEPTED
      cgpaOn4Scale: 3.8,
      hasAnyThirdDivisionOrClass: false,
      competencyEvidence: {
        "ts-react-nextjs": { tier: 3 },
      },
    };

    const match = evaluateCandidateMatch(candidateDisciplineFail, sampleJob);
    assert.strictEqual(match.isStatutorilyEligible, false);
    assert.strictEqual(match.alignmentScore, 0);
    assert.ok(match.unmetPrerequisiteReasons.some((r) => r.includes("discipline not accepted")));
  });

  await t.test("Fails closed when candidate age is out of statutory bounds", () => {
    const candidateAgeFail = {
      id: "CAND-002",
      birthDate: "1970-01-01", // ~56 years old (max is 45)
      permanentHomeDistrict: "Dhaka",
      isOrphanOrPhysicallyDisabled: false,
      hasFreedomFighterOrEthnicQuota: false,
      highestDegreeLevel: "BACHELORS_HONOURS",
      academicDiscipline: "COMPUTER_SCIENCE_ENGINEERING",
      cgpaOn4Scale: 3.5,
      hasAnyThirdDivisionOrClass: false,
      competencyEvidence: {},
    };

    const match = evaluateCandidateMatch(candidateAgeFail, sampleJob);
    assert.strictEqual(match.isStatutorilyEligible, false);
    assert.strictEqual(match.alignmentScore, 0);
    assert.ok(match.unmetPrerequisiteReasons.some((r) => r.includes("outside statutory range")));
  });

  await t.test("Enforces 33.3% score cap on unverified self-declared CV keywords", () => {
    const candidateCvOnly = {
      id: "CAND-003",
      birthDate: "1998-05-15",
      permanentHomeDistrict: "Dhaka",
      isOrphanOrPhysicallyDisabled: false,
      hasFreedomFighterOrEthnicQuota: false,
      highestDegreeLevel: "BACHELORS_HONOURS",
      academicDiscipline: "COMPUTER_SCIENCE_ENGINEERING",
      cgpaOn4Scale: 3.5,
      hasAnyThirdDivisionOrClass: false,
      competencyEvidence: {
        "ts-react-nextjs": { tier: 1 }, // 1.0x multiplier
        "distributed-systems": { tier: 1 }, // 1.0x multiplier
      },
    };

    const match = evaluateCandidateMatch(candidateCvOnly, sampleJob);
    assert.strictEqual(match.isStatutorilyEligible, true);
    // (1.0*1 + 1.0*1) / (1.0*3 + 1.0*3) = 2 / 6 = 33.3% -> 33%
    assert.strictEqual(match.alignmentScore, 33);
  });

  await t.test("Awards 100% score to Tier 3 W3C Verified Credentials", () => {
    const candidateVerified = {
      id: "CAND-004",
      birthDate: "1998-05-15",
      permanentHomeDistrict: "Dhaka",
      isOrphanOrPhysicallyDisabled: false,
      hasFreedomFighterOrEthnicQuota: false,
      highestDegreeLevel: "BACHELORS_HONOURS",
      academicDiscipline: "COMPUTER_SCIENCE_ENGINEERING",
      cgpaOn4Scale: 3.9,
      hasAnyThirdDivisionOrClass: false,
      competencyEvidence: {
        "ts-react-nextjs": { tier: 3, credentialHash: "ed25519-abc" }, // 3.0x multiplier
        "distributed-systems": { tier: 3, credentialHash: "ed25519-def" }, // 3.0x multiplier
      },
    };

    const match = evaluateCandidateMatch(candidateVerified, sampleJob);
    assert.strictEqual(match.isStatutorilyEligible, true);
    // (1.0*3 + 1.0*3) / (1.0*3 + 1.0*3) = 6 / 6 = 100%
    assert.strictEqual(match.alignmentScore, 100);
    assert.strictEqual(match.missingCompetenciesWithGain.length, 0);
  });
});
