import { NextRequest, NextResponse } from "next/server";
import { verifyAndEnrollCourse } from "@/lib/payments/bkash-ledger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      userName,
      userId,
      courseSlug,
      courseTitle,
      senderNumber,
      trxId,
      accountHolderName,
      amount,
    } = body;

    if (!courseSlug) {
      return NextResponse.json(
        { error: "Course slug is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Account email is required to associate your verified enrollment." },
        { status: 400 }
      );
    }

    const result = await verifyAndEnrollCourse({
      email,
      userName,
      userId,
      courseSlug,
      courseTitle,
      senderNumber,
      trxId,
      accountHolderName,
      amount,
    });

    return NextResponse.json({
      success: result.success,
      pending: Boolean((result as any).pending),
      message: result.message,
      enrollment: result.enrollment,
      verificationType: result.verificationType,
    });
  } catch (error: any) {
    console.error("[bKash Verify API] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify bKash payment. Please check your transaction details." },
      { status: 400 }
    );
  }
}
