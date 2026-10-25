import { NextResponse } from "next/server";
import { canonicalJobStore } from "@/lib/jobs/job-store";
import { runFullHarvestPipeline } from "@/lib/jobs/harvester-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get("sector") || undefined;
    const opportunityType = searchParams.get("type") || searchParams.get("opportunityType") || undefined;
    const searchQuery = searchParams.get("q") || undefined;
    const currency = searchParams.get("currency") || undefined;
    const onlyLive = searchParams.get("live") === "true";
    const getStatsOnly = searchParams.get("stats") === "true";

    // Auto-seed on first request if empty
    if (canonicalJobStore.count() === 0) {
      await runFullHarvestPipeline();
    }

    if (getStatsOnly) {
      return NextResponse.json({
        success: true,
        stats: canonicalJobStore.getStats(),
      });
    }

    const jobs = canonicalJobStore.getAllJobs({
      sector,
      opportunityType,
      searchQuery,
      currency,
      onlyLiveVerified: onlyLive,
    });

    const stats = canonicalJobStore.getStats();

    return NextResponse.json({
      success: true,
      totalCount: jobs.length,
      stats,
      jobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve canonical jobs" },
      { status: 500 }
    );
  }
}
