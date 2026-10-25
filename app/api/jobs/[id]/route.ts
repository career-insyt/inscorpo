import { NextResponse } from "next/server";
import { canonicalJobStore } from "@/lib/jobs/job-store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = canonicalJobStore.getJobById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: `Job with ID '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve canonical job" },
      { status: 500 }
    );
  }
}
