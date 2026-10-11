import { NextRequest, NextResponse } from "next/server";
import { DYNAMIC_LESSONS } from "@/lib/data/lessons";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lessonSlug, selectedOption } = body;

    // Strict Input Validation
    if (!lessonSlug || typeof lessonSlug !== "string") {
      return NextResponse.json(
        { error: "Invalid request: lessonSlug is required and must be a string." },
        { status: 400 }
      );
    }

    if (typeof selectedOption !== "number" || !Number.isInteger(selectedOption) || selectedOption < 0) {
      return NextResponse.json(
        { error: "Invalid request: selectedOption must be a non-negative integer." },
        { status: 400 }
      );
    }

    // Authoritative Server-Side Lesson Retrieval
    const lesson = DYNAMIC_LESSONS[lessonSlug];
    if (!lesson || !lesson.quiz) {
      return NextResponse.json(
        { error: `Assessment not found for lesson '${lessonSlug}'.` },
        { status: 404 }
      );
    }

    if (selectedOption >= lesson.quiz.options.length) {
      return NextResponse.json(
        { error: "Invalid option index: out of bounds." },
        { status: 400 }
      );
    }

    // Server-Side Verification (Zero Exposure of correctIdx to Unauthorized Payloads)
    const isCorrect = selectedOption === lesson.quiz.correctIdx;

    return NextResponse.json({
      success: true,
      lessonSlug,
      isCorrect,
      xpReward: isCorrect ? (lesson.xpReward || 50) : 0,
      explanation: isCorrect 
        ? lesson.quiz.explanation 
        : "Incorrect option selected. Review the lesson reading notes and conceptual framework before retrying.",
      verifiedAt: new Date().toISOString()
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal server error during assessment verification." },
      { status: 500 }
    );
  }
}
