import { NextRequest, NextResponse } from "next/server";
import { checkUserSubscriptionAccess } from "@/lib/payments/bkash-ledger";
import { getServerSessionUser } from "@/lib/auth/server-session";

/**
 * Subscription Access Verification Endpoint (SEC-09, PAY-07)
 * Strictly verifies identity from server session if present to prevent BOLA / identity spoofing.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionUser = await getServerSessionUser();

    const authenticatedEmail = sessionUser?.email;
    const effectiveEmail = authenticatedEmail || body.email;
    const isVerifiedSession = !!authenticatedEmail;
    const isEmailVerified = sessionUser ? !!sessionUser.emailVerification : false;

    const accessInfo = checkUserSubscriptionAccess(effectiveEmail, isVerifiedSession && isEmailVerified);

    return NextResponse.json({
      success: true,
      ...accessInfo,
      authenticated: isVerifiedSession,
    });
  } catch (error: any) {
    console.error("[Subscription Access Verify API] Error:", error);
    return NextResponse.json(
      { error: "Failed to verify subscription access status." },
      { status: 500 }
    );
  }
}
