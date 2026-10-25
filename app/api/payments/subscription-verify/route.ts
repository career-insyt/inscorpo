import { NextRequest, NextResponse } from "next/server";
import { verifyAndEnrollSubscription } from "@/lib/payments/bkash-ledger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      userName,
      userId,
      planId,
      planName,
      period = "monthly",
      senderNumber,
      trxId,
      accountHolderName,
      amount,
    } = body;

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required (e.g. single_course, flagship_path, pro)." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Account email is required to associate your subscription license." },
        { status: 400 }
      );
    }

    const result = await verifyAndEnrollSubscription({
      email,
      userName,
      userId,
      planId,
      planName,
      period,
      senderNumber,
      trxId,
      accountHolderName,
      amount,
    });

    return NextResponse.json({
      success: result.success,
      pending: Boolean((result as any).pending),
      message: result.message,
      subscription: result.subscription,
      subscriptionTier: result.subscriptionTier,
      verificationType: result.verificationType,
    });
  } catch (error: any) {
    console.error("[Subscription bKash Verify API] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify bKash payment for subscription. Please check transaction details." },
      { status: 400 }
    );
  }
}
