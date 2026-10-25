import { z } from "zod";

/**
 * 1. ENUMERATIONS & TAXONOMY CONSTANTS
 */
export const JobSectorEnum = z.enum([
  "GOVERNMENT",
  "BANKING",
  "CORPORATE_MNC",
  "LOCAL_CONGLOMERATE",
  "GLOBAL_REMOTE",
  "STARTUP",
  "DEVELOPMENT_NGO",
  "ACADEMIC_RESEARCH",
]);
export type JobSector = z.infer<typeof JobSectorEnum>;

export const OpportunityTypeEnum = z.enum([
  "FULL_TIME_JOB",
  "INTERNSHIP_PLACEMENT",
  "FELLOWSHIP",
  "SCHOLARSHIP_STUDY_ABROAD",
  "GRANT_RESEARCH_FUNDING",
  "BUSINESS_COMPETITION_HACKATHON",
  "STARTUP_INCUBATOR_ACCELERATOR",
  "ENTREPRENEURSHIP_SEED_FUNDING",
  "CONFERENCE_YOUTH_SUMMIT",
  "EXCHANGE_PROGRAM",
  "VOLUNTEER_NGO",
  "FREELANCE_GIG",
  "STARTUP_COFOUNDER_COLLAB",
  "AWARD_RECOGNITION",
  "TRAINING_BOOTCAMP",
  "INTERNATIONAL_DEVELOPMENT",
]);
export type OpportunityType = z.infer<typeof OpportunityTypeEnum>;

export const WorkplaceTypeEnum = z.enum(["REMOTE", "HYBRID", "ONSITE"]);
export type WorkplaceType = z.infer<typeof WorkplaceTypeEnum>;

export const EmploymentTypeEnum = z.enum([
  "FULL_TIME",
  "CONTRACT_B2B",
  "PART_TIME",
  "INTERNSHIP",
  "MTO_FELLOWSHIP",
]);
export type EmploymentType = z.infer<typeof EmploymentTypeEnum>;

export const DegreeLevelEnum = z.enum([
  "SSC_OR_EQUIVALENT",
  "HSC_OR_EQUIVALENT",
  "DIPLOMA_ENGINEERING",
  "BACHELORS_HONOURS",
  "BACHELORS_ENGINEERING",
  "MASTERS",
  "MBBS_BDS",
  "PHD",
  "CA_ACCA_CFA_PROFESSIONAL",
]);
export type DegreeLevel = z.infer<typeof DegreeLevelEnum>;

/**
 * Standardized Academic Discipline Taxonomy to prevent loose substring false positives.
 * "B.Sc. in Computer Science" will NEVER match "B.Sc. in Agricultural Science".
 */
export const AcademicDisciplineEnum = z.enum([
  "ANY_RECOGNIZED_DISCIPLINE",
  "COMPUTER_SCIENCE_ENGINEERING",
  "ELECTRICAL_ELECTRONIC_ENGINEERING",
  "CIVIL_ENGINEERING",
  "MECHANICAL_ENGINEERING",
  "AGRICULTURE_AGRONOMY",
  "SOIL_WATER_ENVIRONMENT",
  "AGRICULTURAL_ECONOMICS",
  "BUSINESS_ADMINISTRATION_FINANCE_ACCOUNTING",
  "ECONOMICS",
  "STATISTICS_DATA_SCIENCE",
  "LAW_LEGAL_STUDIES",
  "PHARMACY",
  "MEDICINE_SURGERY_MBBS",
  "GENERAL_SCIENCE",
  "HUMANITIES_SOCIAL_SCIENCES",
]);
export type AcademicDiscipline = z.infer<typeof AcademicDisciplineEnum>;

/**
 * 2. CONDITIONAL SECTOR PAYLOADS
 */
export const GovernmentAttributesSchema = z.object({
  ministryOrDivision: z.string().min(2),
  agencyName: z.string().min(2),
  agencyAcronym: z.string().min(2),
  memoNumber: z.string(),
  payScaleGrade: z.number().int().min(1).max(20), // 1 to 20
  basicPayRangeBdt: z.string().regex(/^\d{4,5}\s*-\s*\d{5,6}$/), // e.g. "22000 - 53060"
  estimatedGrossSalaryBdt: z.number().positive(),
  teletalkPostCodeOrSlug: z.string().nullable(),
  applicationFeeBdt: z.number().nonnegative(),
  paymentSmsInstructions: z.string().nullable(),
  statutoryQuotaAllocation: z.object({
    meritPercentage: z.number().default(93), // Post-July 2024 SC Ruling
    freedomFighterChildPercentage: z.number().default(5),
    ethnicMinoritiesPercentage: z.number().default(1),
    physicallyDisabledAndThirdGenderPercentage: z.number().default(1),
  }),
});
export type GovernmentAttributes = z.infer<typeof GovernmentAttributesSchema>;

export const CorporateRemoteAttributesSchema = z.object({
  timeZoneOverlapHoursWithBST: z.number().min(0).max(12),
  bstWorkingWindow: z.string(), // e.g., "14:00 - 22:00 BST (EMEA)"
  requiresNightShiftForBST: z.boolean(),
  contractType: z.enum(["DIRECT_EMPLOYEE", "B2B_CONTRACTOR_W8BEN", "EOR"]),
  payoutMethodsSupported: z.array(z.string()), // ["Wise", "Bank Wire (ERQ)", "Payoneer"]
  atsPlatformName: z
    .enum(["GREENHOUSE", "LEVER", "ASHBY", "WORKABLE", "WORKDAY", "OTHER"])
    .nullable(),
});
export type CorporateRemoteAttributes = z.infer<typeof CorporateRemoteAttributesSchema>;

/**
 * 3. STRUCTURED QUALIFICATIONS & COMPETENCIES
 */
export const QualificationRequirementSchema = z.object({
  minimumDegreeLevel: DegreeLevelEnum,
  acceptedDisciplines: z.array(AcademicDisciplineEnum).min(1),
  strictDisciplineEnforcement: z.boolean().default(true),
  allowThirdDivisionOrClassInAcademicHistory: z.boolean().default(false),
  minimumCgpaOn4Scale: z.number().min(2.0).max(4.0).nullable(),
  minAgeYears: z.number().min(18).max(60),
  maxAgeGeneralYears: z.number().min(18).max(65),
  maxAgeQuotaOrDepartmentalYears: z.number().min(18).max(65).nullable(),
  ageCalculationReferenceDate: z.string().nullable(), // ISO-8601 YYYY-MM-DD
  allDistrictsEligible: z.boolean().default(true),
  eligibleDistricts: z.array(z.string()).default([]),
  excludedDistricts: z.array(z.string()).default([]),
});
export type QualificationRequirement = z.infer<typeof QualificationRequirementSchema>;

export const CompetencyItemSchema = z.object({
  competencyId: z.string(),
  name: z.string(),
  escoUri: z.string().url().nullable(),
  onetSocCode: z
    .string()
    .regex(/^\d{2}-\d{4}\.\d{2}$/)
    .nullable(), // e.g., "15-1252.00"
  weightCategory: z.enum(["MANDATORY_CORE", "PREFERRED", "BONUS"]),
  insytLearningModuleId: z.string().nullable(),
});
export type CompetencyItem = z.infer<typeof CompetencyItemSchema>;

/**
 * 4. UNIVERSAL CANONICAL JOB SCHEMA
 */
export const CanonicalJobSchema = z
  .object({
    id: z.string().min(8),
    fingerprintHash: z.string().length(64), // SHA-256
    sector: JobSectorEnum,
    opportunityType: OpportunityTypeEnum.default("FULL_TIME_JOB"),
    workplaceType: WorkplaceTypeEnum,
    employmentType: EmploymentTypeEnum,
    title: z.string().min(2),
    organizationName: z.string().min(2),
    organizationAcronym: z.string().nullable(),
    divisionLocation: z.string(), // Dhaka, Chattogram, Remote, etc.
    countryCode: z.string().length(2).default("BD"),

    // Compensation Normalization
    currency: z.enum(["BDT", "USD", "EUR", "GBP"]),
    salaryMin: z.number().nonnegative(),
    salaryMax: z.number().nonnegative(),
    salaryPeriod: z.enum(["HOURLY", "MONTHLY", "ANNUAL"]),
    normalizedMonthlyBdtRange: z.object({
      minBdt: z.number().nonnegative(),
      maxBdt: z.number().nonnegative(),
    }),

    // Authoritative URIs & Provenance
    sourceUrl: z.string().url(),
    officialPortalUrl: z.string().url(),
    circularPdfSpecimenUrl: z.string().url().nullable(),
    waybackSnapshotUrl: z.string().url().nullable(),
    sourceAttributionNotice: z.string().nullable(),

    // Conditional Sector Payloads
    governmentAttributes: GovernmentAttributesSchema.nullable(),
    corporateRemoteAttributes: CorporateRemoteAttributesSchema.nullable(),

    // Structured Eligibility & Skills
    qualifications: QualificationRequirementSchema,
    competencies: z.array(CompetencyItemSchema).min(1),
    summaryPlainText: z.string().min(20),
    responsibilitiesMarkdown: z.string(),

    // Lifecycle & Timestamps
    publishedAt: z.string(),
    deadline: z.string(),
    lastVerifiedLiveAt: z.string(),
    httpHealthStatus: z.number().int().min(100).max(599).default(200),
    isExpired: z.boolean().default(false),
    archiveStatus: z.enum([
      "LIVE_VERIFIED",
      "EXPIRING_WITHIN_48H",
      "EXPIRED_ARCHIVED",
      "SOFT_404_QUARANTINED",
    ]),
    archiveNotice: z.string().nullable(),
  })
  .superRefine((job, ctx) => {
    if (job.sector === "GOVERNMENT" && !job.governmentAttributes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "GOVERNMENT sector jobs must populate governmentAttributes.",
        path: ["governmentAttributes"],
      });
    }
    if (job.sector === "GLOBAL_REMOTE" && !job.corporateRemoteAttributes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "GLOBAL_REMOTE jobs must populate corporateRemoteAttributes.",
        path: ["corporateRemoteAttributes"],
      });
    }
  });

export type CanonicalJob = z.infer<typeof CanonicalJobSchema>;
