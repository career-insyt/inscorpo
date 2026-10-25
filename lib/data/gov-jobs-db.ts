import unifiedDb from "@/DB/jobs_unified.json";

export interface GovJob {
  id: string;
  title: string;
  family: string;
  vacancy: number;
  grade: number;
  salary_scale_bdt: string;
  requirements: string;
  before_skills: string[];
  after_skills_inferred: string[];
  experience: string;
  source_confidence: string;
  // Attached organization metadata
  organizationAcronym: string;
  organizationName: string;
  ministry: string;
  applicationDeadline: string;
  applicationStart?: string;
  applicationMode?: string;
  applicationFee?: string;
  selectionProcess?: string;
  sourceLink?: string;
  isExpired?: boolean;
  isArchived?: boolean;
  archiveNotice?: string;
  portalUrl?: string;
}

export interface GovOrganization {
  organization: string;
  acronym: string;
  type: string;
  ministry: string;
  headquarters: string;
  is_archived?: boolean;
  archive_notice?: string;
  latest_supplied_recruitment: {
    circular_date: string;
    published: string;
    vacancy_categories: number;
    total_vacancies: number;
    application_start: string;
    application_deadline: string;
    age: string;
    application_mode: string;
    application_fee: string;
    selection: string;
    source: string;
    portal_url?: string;
    is_expired?: boolean;
    is_archived?: boolean;
    archive_notice?: string;
  };
  institutional_career_intelligence: {
    high_value_degree_domains: string[];
    insyt_priority: string;
    why: string;
  };
  jobs: GovJob[];
}

export interface SkillTaxonomy {
  tier_1_core: string[];
  tier_2_high_value: string[];
  tier_3_specialized: string[];
  tier_4_operational: string[];
}

export interface EligibilityResult {
  isEligible: boolean;
  degreeMatch: boolean;
  status: "HIGHLY_RECOMMENDED" | "POTENTIALLY_ELIGIBLE" | "NEEDS_CHECK";
  matchedDegrees: string[];
  notes: string;
}

export interface SkillGapResult {
  matchedBeforeSkills: string[];
  missingBeforeSkills: string[];
  postJoiningCompetencies: string[];
  readinessPercentage: number;
}

// ─── Data Access API ─────────────────────────────────────────────────────────

export function getUnifiedDB() {
  return unifiedDb;
}

export function getGovOrganizations(): GovOrganization[] {
  return (unifiedDb.organizations || []) as GovOrganization[];
}

export function getAllGovJobs(): GovJob[] {
  const orgs = getGovOrganizations();
  const allJobs: GovJob[] = [];

  orgs.forEach((org) => {
    const isExpired = org.acronym === "BRRI" || org.acronym === "BINA" || !!org.latest_supplied_recruitment?.is_expired;
    const isArchived = isExpired || org.acronym === "BTRI" || org.acronym === "BSRI" || !!org.is_archived;
    const archiveNotice = org.latest_supplied_recruitment?.archive_notice || org.archive_notice;
    const portalUrl = org.latest_supplied_recruitment?.portal_url || `http://${org.acronym.toLowerCase()}.teletalk.com.bd`;

    if (Array.isArray(org.jobs)) {
      org.jobs.forEach((job) => {
        allJobs.push({
          ...job,
          organizationAcronym: org.acronym,
          organizationName: org.organization,
          ministry: org.ministry,
          applicationDeadline: org.latest_supplied_recruitment?.application_deadline || (isArchived ? "Archived Circular" : "See Circular"),
          applicationStart: org.latest_supplied_recruitment?.application_start || "",
          applicationMode: org.latest_supplied_recruitment?.application_mode || "Online via Teletalk",
          applicationFee: org.latest_supplied_recruitment?.application_fee || "",
          selectionProcess: org.latest_supplied_recruitment?.selection || "",
          sourceLink: org.latest_supplied_recruitment?.source || "",
          isExpired,
          isArchived,
          archiveNotice,
          portalUrl,
        });
      });
    }
  });

  return allJobs;
}

export function getGovJobById(id: string): GovJob | null {
  const all = getAllGovJobs();
  return all.find((j) => j.id.toLowerCase() === id.toLowerCase()) || null;
}

export function getGovJobsByOrg(acronym: string): GovJob[] {
  const all = getAllGovJobs();
  return all.filter((j) => j.organizationAcronym.toLowerCase() === acronym.toLowerCase());
}

export function getSkillBundles(): Record<string, string> {
  return (unifiedDb.insyt_corporate_schema?.skill_bundles || {}) as Record<string, string>;
}

export function getSkillTaxonomy(): SkillTaxonomy {
  return (unifiedDb.skill_taxonomy || {
    tier_1_core: [],
    tier_2_high_value: [],
    tier_3_specialized: [],
    tier_4_operational: [],
  }) as SkillTaxonomy;
}

export function getGovJobStats() {
  const orgs = getGovOrganizations();
  const allJobs = getAllGovJobs();
  const totalVacancies = orgs.reduce(
    (acc, org) => acc + (org.latest_supplied_recruitment?.total_vacancies || 0),
    0
  );

  const orgStats = orgs.map((org) => ({
    acronym: org.acronym,
    name: org.organization,
    jobsCount: org.jobs ? org.jobs.length : 0,
    vacanciesCount: org.latest_supplied_recruitment?.total_vacancies || 0,
    deadline: org.latest_supplied_recruitment?.application_deadline || "Active",
    insytPriority: org.institutional_career_intelligence?.insyt_priority || "HIGH",
    degrees: org.institutional_career_intelligence?.high_value_degree_domains || [],
  }));

  return {
    totalOrganizations: orgs.length,
    totalJobs: allJobs.length,
    totalVacancies,
    orgStats,
  };
}

// ─── Smart Intelligence Engines ─────────────────────────────────────────────

const DEGREE_CANONICAL_DOMAINS: Record<string, string[]> = {
  "computer science": ["computer science", "cse", "cs", "software engineering", "information technology", "it", "computing"],
  "electrical engineering": ["electrical engineering", "eee", "electrical and electronic", "electrical"],
  "civil engineering": ["civil engineering", "civil", "ce"],
  "mechanical engineering": ["mechanical engineering", "mechanical", "me"],
  "agriculture": ["agriculture", "agricultural science", "agronomy", "crop science", "horticulture"],
  "agricultural economics": ["agricultural economics", "agri economics", "economics"],
  "agricultural engineering": ["agricultural engineering", "farm machinery", "irrigation"],
  "soil science": ["soil science", "soil and water", "soil chemistry"],
  "statistics": ["statistics", "applied statistics", "biostatistics", "data science"],
  "biotechnology": ["biotechnology", "genetic engineering", "biochemistry", "molecular biology"],
  "library science": ["library science", "information science", "library diploma"],
  "business": ["bba", "mba", "finance", "accounting", "marketing", "management"],
  "botany": ["botany", "plant science"],
  "entomology": ["entomology"],
  "plant pathology": ["plant pathology"],
};

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchesDegreeDomain(text: string, term: string): boolean {
  const t = text.toLowerCase();
  const target = term.toLowerCase().trim();
  if (!target || target.length < 2) return false;

  // Exact word boundary match
  const wordRegex = new RegExp(`(^|[^a-zA-Z0-9])${escapeRegex(target)}([^a-zA-Z0-9]|$)`, "i");
  if (wordRegex.test(t)) return true;

  // Domain equivalence
  for (const [canonical, aliases] of Object.entries(DEGREE_CANONICAL_DOMAINS)) {
    const isTargetInDomain = canonical === target || aliases.some((a) => a === target || target.includes(a));
    if (isTargetInDomain) {
      for (const alias of aliases) {
        const aliasRegex = new RegExp(`(^|[^a-zA-Z0-9])${escapeRegex(alias)}([^a-zA-Z0-9]|$)`, "i");
        if (aliasRegex.test(t)) return true;
      }
    }
  }

  return false;
}

/**
 * @deprecated Degree Eligibility Engine has been retired.
 */
export function checkDegreeEligibility(job: GovJob, userDegree?: string): EligibilityResult {
  return {
    isEligible: true,
    degreeMatch: true,
    status: "HIGHLY_RECOMMENDED",
    matchedDegrees: userDegree ? [userDegree] : [],
    notes: "Direct circular eligibility.",
  };
}

export function calculateGovJobSkillGap(job: GovJob, userSkills: string[] = []): SkillGapResult {
  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase());
  const beforeSkills = job.before_skills || [];

  const matchedBefore = beforeSkills.filter((sk) =>
    normalizedUserSkills.some((us) => us.includes(sk.toLowerCase()) || sk.toLowerCase().includes(us))
  );

  const missingBefore = beforeSkills.filter(
    (sk) => !normalizedUserSkills.some((us) => us.includes(sk.toLowerCase()) || sk.toLowerCase().includes(us))
  );

  const readiness =
    beforeSkills.length > 0
      ? Math.round((matchedBefore.length / beforeSkills.length) * 100)
      : 100;

  return {
    matchedBeforeSkills: matchedBefore,
    missingBeforeSkills: missingBefore,
    postJoiningCompetencies: job.after_skills_inferred || [],
    readinessPercentage: readiness,
  };
}

// ─── Institute Intelligence Cards ────────────────────────────────────────────

export interface InstituteCard {
  acronym: string;
  name: string;
  type: string;
  ministry: string;
  headquarters: string;
  jobCount: number;
  totalVacancies: number;
  deadline: string;
  circularDate: string;
  selectionProcess: string;
  applicationFee: string;
  ageLimit: string;
  insytPriority: string;
  priorityReason: string;
  highValueDegrees: string[];
  topJobFamilies: string[];
  gradeRange: string;
  salaryRange: string;
}

export function getInstituteCard(acronym: string): InstituteCard | null {
  const org = getGovOrganizations().find((o) => o.acronym === acronym);
  if (!org) return null;

  const jobs = getGovJobsByOrg(acronym);
  const grades = jobs.map((j) => j.grade).filter(Boolean);
  const minGrade = grades.length > 0 ? Math.min(...grades) : 0;
  const maxGrade = grades.length > 0 ? Math.max(...grades) : 0;

  const salaries = jobs.map((j) => j.salary_scale_bdt).filter(Boolean);
  const minSalary = salaries.length > 0 ? salaries.sort()[0] : "";
  const maxSalary = salaries.length > 0 ? salaries.sort()[salaries.length - 1] : "";

  const familyCounts: Record<string, number> = {};
  jobs.forEach((j) => {
    familyCounts[j.family] = (familyCounts[j.family] || 0) + 1;
  });
  const topFamilies = Object.entries(familyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([f]) => f);

  return {
    acronym: org.acronym,
    name: org.organization,
    type: org.type,
    ministry: org.ministry,
    headquarters: org.headquarters,
    jobCount: jobs.length,
    totalVacancies: org.latest_supplied_recruitment?.total_vacancies || 0,
    deadline: org.latest_supplied_recruitment?.application_deadline || "Active",
    circularDate: org.latest_supplied_recruitment?.circular_date || "",
    selectionProcess: org.latest_supplied_recruitment?.selection || "Written & Viva",
    applicationFee: org.latest_supplied_recruitment?.application_fee || "",
    ageLimit: org.latest_supplied_recruitment?.age || "",
    insytPriority: org.institutional_career_intelligence?.insyt_priority || "HIGH",
    priorityReason: org.institutional_career_intelligence?.why || "",
    highValueDegrees: org.institutional_career_intelligence?.high_value_degree_domains || [],
    topJobFamilies: topFamilies,
    gradeRange: minGrade === maxGrade ? `Grade ${minGrade}` : `Grade ${minGrade}–${maxGrade}`,
    salaryRange: minSalary === maxSalary ? `৳${minSalary}` : `৳${minSalary} – ৳${maxSalary}`,
  };
}

export function getAllInstituteCards(): InstituteCard[] {
  const orgs = getGovOrganizations();
  return orgs.map((o) => getInstituteCard(o.acronym)).filter(Boolean) as InstituteCard[];
}


export function getJobsByGrade(grade: number): GovJob[] {
  return getAllGovJobs().filter((j) => j.grade === grade);
}

export function getUniqueGrades(): number[] {
  const grades = getAllGovJobs().map((j) => j.grade).filter(Boolean);
  return Array.from(new Set(grades)).sort((a, b) => a - b);
}

// ─── Grade Band Intelligence ──────────────────────────────────────────────────

export interface GradeBandGroup {
  id: string;
  label: string;
  gradeRange: string;
  payScaleRange: string;
  badgeColor: string;
  description: string;
  jobs: GovJob[];
  totalVacancies: number;
}

export function getJobsGroupedByGradeBand(): GradeBandGroup[] {
  const allJobs = getAllGovJobs();

  const bands: { id: string; label: string; gradeRange: string; payScaleRange: string; badgeColor: string; description: string; filter: (j: GovJob) => boolean }[] = [
    {
      id: "executive_research",
      label: "Class-I Executive & Scientific Officers",
      gradeRange: "Grade 9 – Grade 10",
      payScaleRange: "৳16,000 – ৳53,060/mo",
      badgeColor: "bg-emerald-500 text-emerald-950 border-emerald-600",
      description: "Cadre & Officer rank positions requiring Master's or 4-year Honours degrees. Includes Scientific Officers, Assistant Engineers, and Officers.",
      filter: (j) => j.grade >= 9 && j.grade <= 10,
    },
    {
      id: "technical_assistants",
      label: "Mid-Level Technical & Scientific Assistants",
      gradeRange: "Grade 11 – Grade 13",
      payScaleRange: "৳11,000 – ৳30,230/mo",
      badgeColor: "bg-blue-500 text-blue-950 border-blue-600",
      description: "Technical specialist roles including Sub-Assistant Engineers, Scientific Assistants, Senior Technicians, Librarians, and Overseers.",
      filter: (j) => j.grade >= 11 && j.grade <= 13,
    },
    {
      id: "operational_staff",
      label: "Operational, Support & Trade Staff",
      gradeRange: "Grade 14 – Grade 16",
      payScaleRange: "৳9,300 – ৳24,680/mo",
      badgeColor: "bg-amber-400 text-amber-950 border-amber-500",
      description: "Operational support, office administration, laboratory technicians, typists, drivers, and trade craftsmen.",
      filter: (j) => j.grade >= 14 && j.grade <= 16,
    },
  ];

  return bands.map((b) => {
    const bandJobs = allJobs.filter(b.filter);
    const totalVacancies = bandJobs.reduce((sum, j) => sum + (j.vacancy || 1), 0);
    return {
      id: b.id,
      label: b.label,
      gradeRange: b.gradeRange,
      payScaleRange: b.payScaleRange,
      badgeColor: b.badgeColor,
      description: b.description,
      jobs: bandJobs,
      totalVacancies,
    };
  });
}

// ─── Post Family / Role Grouping Intelligence ─────────────────────────────────

export interface PostFamilyGroup {
  familyKey: string;
  title: string;
  iconName: string;
  description: string;
  jobs: GovJob[];
  totalVacancies: number;
  participatingInstitutes: string[];
}

export function getJobsGroupedByPostFamily(): PostFamilyGroup[] {
  const allJobs = getAllGovJobs();
  const familyMap = new Map<string, GovJob[]>();

  allJobs.forEach((j) => {
    // Normalize family or role
    const fam = j.family || "General / Other";
    if (!familyMap.has(fam)) {
      familyMap.set(fam, []);
    }
    familyMap.get(fam)!.push(j);
  });

  const familyDescriptions: Record<string, string> = {
    "Research / Scientific": "Core scientific research, crop improvement, laboratory experiments, and field trials.",
    "Engineering / Maintenance": "Civil, electrical, mechanical engineering, infrastructure maintenance, and equipment operation.",
    "Data / Statistics": "Statistical analysis, data compilation, survey design, and mathematical modeling.",
    "Library / Information": "Cataloguing, digital library systems, scientific documentation, and information management.",
    "Computer / IT": "System administration, software operation, hardware maintenance, and ICT support.",
    "Admin / Secretarial": "Office administration, correspondence, typing, record keeping, and institutional management.",
    "Trade / Support": "Driver, mechanic, electrician, field worker, and operational support services.",
  };

  const results: PostFamilyGroup[] = [];

  familyMap.forEach((jobs, familyKey) => {
    const orgs = Array.from(new Set(jobs.map((j) => j.organizationAcronym)));
    const totalVacancies = jobs.reduce((sum, j) => sum + (j.vacancy || 1), 0);

    results.push({
      familyKey,
      title: familyKey,
      iconName: familyKey.toLowerCase().includes("engineer") ? "Wrench" : familyKey.toLowerCase().includes("research") ? "Microscope" : "Briefcase",
      description: familyDescriptions[familyKey] || `Standard positions under ${familyKey} across research institutes.`,
      jobs,
      totalVacancies,
      participatingInstitutes: orgs,
    });
  });

  // Sort groups by total vacancies descending
  return results.sort((a, b) => b.totalVacancies - a.totalVacancies);
}

// ─── Advanced Sorting Helper ──────────────────────────────────────────────────

export type GovJobSortOption = "grade_asc" | "grade_desc" | "vacancies_desc" | "title_asc" | "salary_desc";

export function sortGovJobs(jobs: GovJob[], sortBy: GovJobSortOption): GovJob[] {
  const sorted = [...jobs];
  switch (sortBy) {
    case "grade_asc":
      return sorted.sort((a, b) => a.grade - b.grade);
    case "grade_desc":
      return sorted.sort((a, b) => b.grade - a.grade);
    case "vacancies_desc":
      return sorted.sort((a, b) => b.vacancy - a.vacancy);
    case "title_asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "salary_desc":
      return sorted.sort((a, b) => {
        const numA = parseInt(a.salary_scale_bdt.replace(/[^0-9]/g, "")) || 0;
        const numB = parseInt(b.salary_scale_bdt.replace(/[^0-9]/g, "")) || 0;
        return numB - numA;
      });
    default:
      return sorted;
  }
}

// ─── Super Accurate CV Fit Engine ─────────────────────────────────────────────

export interface RecommendedCourse {
  title: string;
  slug: string;
  url: string;
  reason: string;
}

export interface CvFitResult {
  jobId: string;
  jobTitle: string;
  organizationAcronym: string;
  matchScore: number; // 0 - 100%
  degreeMatch: boolean;
  userDegree?: string;
  requiredDegreeSnippet: string;
  matchedSkills: string[];
  missingSkills: string[];
  missingProfileFields: ("degree" | "skills" | "experience")[];
  recommendedCourses: RecommendedCourse[];
  verdict: "HIGH_FIT" | "MODERATE_FIT" | "NEEDS_UPSKILLING";
  guidanceText: string;
}

export function analyzeCvFit(
  job: GovJob,
  profile: {
    degree?: string;
    skills?: string[];
    experienceLevel?: string;
    verifiedSkills?: string[];
  }
): CvFitResult {
  const missingProfileFields: ("skills" | "experience")[] = [];

  if (!profile.skills || profile.skills.length === 0) {
    missingProfileFields.push("skills");
  }

  const userSkills = (profile.skills || []).map((s) => s.toLowerCase());
  const verifiedSkillsList = (profile.verifiedSkills || []).map((s) => s.toLowerCase());
  const beforeSkills = job.before_skills || [];

  // 1. Skill Match Check with 3x verification weighting
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  let totalWeightedMatchPoints = 0;
  let maxPossiblePoints = 0;

  beforeSkills.forEach((sk) => {
    const skLower = sk.toLowerCase().replace(/_/g, " ");
    const hasUnverified = userSkills.some((us) => matchesDegreeDomain(us, skLower) || matchesDegreeDomain(skLower, us));
    const isVerified = verifiedSkillsList.some((vs) => matchesDegreeDomain(vs, skLower) || matchesDegreeDomain(skLower, vs));

    const skillWeight = 3;
    maxPossiblePoints += skillWeight;

    if (isVerified) {
      matchedSkills.push(`${sk} (Verified)`);
      totalWeightedMatchPoints += 3; // 3x weight for verified assessments
    } else if (hasUnverified) {
      matchedSkills.push(sk);
      totalWeightedMatchPoints += 1; // 1x weight for self-claimed text
    } else {
      missingSkills.push(sk);
    }
  });

  // 2. Compute Score purely on verified competency weighting
  let score = 0;
  if (beforeSkills.length > 0 && maxPossiblePoints > 0) {
    score = Math.round((totalWeightedMatchPoints / maxPossiblePoints) * 100);
  } else {
    score = 80; // baseline for entry roles without specific skill prereqs
  }

  if (score > 100) score = 100;

  // 4. Determine Verdict & Honest Guidance Copy
  let verdict: "HIGH_FIT" | "MODERATE_FIT" | "NEEDS_UPSKILLING" = "NEEDS_UPSKILLING";
  let guidanceText = "";

  if (score >= 75) {
    verdict = "HIGH_FIT";
    guidanceText = `Strong candidate match for ${job.organizationAcronym}. Your background aligns well with circular prerequisites. Verified competencies in ${matchedSkills.join(", ")} establish technical readiness.`;
  } else if (score >= 45) {
    verdict = "MODERATE_FIT";
    guidanceText = `Moderate alignment for ${job.title}. Bridging verified competencies in ${missingSkills.join(", ")} will significantly boost your curriculum prerequisite alignment and technical readiness.`;
  } else {
    verdict = "NEEDS_UPSKILLING";
    guidanceText = `Prerequisite gaps detected for Grade ${job.grade} at ${job.organizationAcronym}. Complete the recommended internal training tracks below to prepare for written screening & viva voce examinations.`;
  }

  // 5. SAAS Internal Course Recommendations Mapping
  const recommendedCourses: RecommendedCourse[] = [];
  const missingStr = missingSkills.join(" ").toLowerCase();
  const jobTitleLower = job.title.toLowerCase();

  if (missingStr.includes("presentation") || missingStr.includes("data") || missingStr.includes("report")) {
    recommendedCourses.push({
      title: "Presentation Engineering (Gamma + Canva + PowerPoint)",
      slug: "presentation-engineering",
      url: "/learn/presentation-engineering",
      reason: "Master visual storytelling, executive reporting, and professional presentation decks.",
    });
  }

  if (jobTitleLower.includes("officer") || job.grade <= 10 || missingStr.includes("research")) {
    recommendedCourses.push({
      title: "GRE Preparation & Analytical Reasoning Masterclass",
      slug: "gre-preparation",
      url: "/learn/gre-preparation",
      reason: "Comprehensive quantitative reasoning, verbal aptitude, and analytical writing.",
    });
  }

  if (missingStr.includes("computer") || missingStr.includes("ai") || missingStr.includes("automation")) {
    recommendedCourses.push({
      title: "AI & Executive Prompt Engineering for Work",
      slug: "ai-automation",
      url: "/learn/ai-automation",
      reason: "Supercharge research workflow efficiency with AI tools and automation.",
    });
  }

  if (recommendedCourses.length === 0) {
    recommendedCourses.push({
      title: "Executive Business Communication & PPT",
      slug: "business-comm",
      url: "/learn/business-comm",
      reason: "Polish technical report writing and viva presentation confidence.",
    });
  }

  return {
    jobId: job.id,
    jobTitle: job.title,
    organizationAcronym: job.organizationAcronym,
    matchScore: score,
    degreeMatch: true,
    userDegree: profile.degree,
    requiredDegreeSnippet: job.requirements,
    matchedSkills,
    missingSkills,
    missingProfileFields,
    recommendedCourses,
    verdict,
    guidanceText,
  };
}



