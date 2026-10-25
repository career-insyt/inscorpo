import { NextRequest, NextResponse } from "next/server";
import { gradeMockTest } from "@/lib/data/mock-tests-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testId, answers } = body;

    if (!testId || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid payload. testId and answers map are required." },
        { status: 400 }
      );
    }

    const result = gradeMockTest(testId, answers);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error("[Assessment Grade API] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to grade assessment." },
      { status: 500 }
    );
  }
}
