import { NextResponse } from "next/server";
import { canonicalJobStore } from "@/lib/jobs/job-store";
import { verifyJobLinkHealth, LinkVerificationResult } from "@/lib/jobs/link-health-runner";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const jobs = canonicalJobStore.getAllJobs();
    const results: LinkVerificationResult[] = [];
    let updatedCount = 0;

    // Run sweep across current jobs
    for (const job of jobs) {
      try {
        const result = await verifyJobLinkHealth(job);
        results.push(result);

        const isLive = result.isLive && !result.detectedSoft404OrClosed;
        let archiveStatus: "LIVE_VERIFIED" | "EXPIRING_WITHIN_48H" | "EXPIRED_ARCHIVED" | "SOFT_404_QUARANTINED" = "LIVE_VERIFIED";
        
        if (result.detectedSoft404OrClosed) {
          archiveStatus = "SOFT_404_QUARANTINED";
        } else if (!isLive) {
          archiveStatus = "EXPIRED_ARCHIVED";
        } else {
          const msUntilDeadline = new Date(job.deadline).getTime() - Date.now();
          if (msUntilDeadline > 0 && msUntilDeadline < 48 * 3600 * 1000) {
            archiveStatus = "EXPIRING_WITHIN_48H";
          } else {
            archiveStatus = "LIVE_VERIFIED";
          }
        }

        canonicalJobStore.updateJobHealth(job.id, {
          isExpired: !isLive,
          archiveStatus,
          httpHealthStatus: result.httpStatus,
          waybackSnapshotUrl: result.waybackSnapshotUrl,
          lastVerifiedLiveAt: result.verifiedAtIso,
          archiveNotice: result.closureReason,
        });

        updatedCount++;
      } catch (err: any) {
        console.warn(`[Link Health Sweep] Error probing job ${job.id}:`, err.message);
      }
    }

    const stats = canonicalJobStore.getStats();

    return NextResponse.json({
      success: true,
      message: `Link health sweep completed on ${results.length} canonical records`,
      updatedCount,
      summary: {
        totalProbed: results.length,
        liveVerified: results.filter((r) => r.isLive && !r.detectedSoft404OrClosed).length,
        soft404OrClosed: results.filter((r) => r.detectedSoft404OrClosed).length,
        waybackArchived: results.filter((r) => !r.isLive && !!r.waybackSnapshotUrl).length,
      },
      stats,
    });
  } catch (error: any) {
    console.error("[POST /api/jobs/sweep] Link sweep execution failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Link health sweep failed",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST({} as Request);
}
