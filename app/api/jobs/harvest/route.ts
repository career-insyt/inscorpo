import { NextResponse } from "next/server";
import { runFullHarvestPipeline } from "@/lib/jobs/harvester-service";
import { canonicalJobStore } from "@/lib/jobs/job-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const summary = await runFullHarvestPipeline();
    const stats = canonicalJobStore.getStats();

    return NextResponse.json({
      success: true,
      message: "Autonomous live harvest pipeline completed successfully",
      summary,
      stats,
    });
  } catch (error: any) {
    console.error("[POST /api/jobs/harvest] Harvest execution failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Autonomous harvest pipeline failed",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST({} as Request);
}
