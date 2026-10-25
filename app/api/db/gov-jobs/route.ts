import { NextResponse } from "next/server";
import {
  getAllGovJobs, getGovOrganizations, getGovJobStats, getSkillBundles,
  getSkillTaxonomy, getGovJobsByOrg
} from "@/lib/data/gov-jobs-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const org = searchParams.get("org");
    const query = searchParams.get("q");

    let jobs = org ? getGovJobsByOrg(org) : getAllGovJobs();

    if (query) {
      const qLower = query.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(qLower) ||
          j.family.toLowerCase().includes(qLower) ||
          j.requirements.toLowerCase().includes(qLower) ||
          j.organizationAcronym.toLowerCase().includes(qLower)
      );
    }

    const stats = getGovJobStats();
    const organizations = getGovOrganizations();
    const skillBundles = getSkillBundles();
    const skillTaxonomy = getSkillTaxonomy();

    return NextResponse.json({
      success: true,
      stats,
      organizations,
      skillBundles,
      skillTaxonomy,
      totalCount: jobs.length,
      jobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch government research database" },
      { status: 500 }
    );
  }
}
