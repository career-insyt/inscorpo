import { NextRequest, NextResponse } from "next/server";
import { checkUserCourseAccess } from "@/lib/payments/bkash-ledger";
import { getServerSessionUser } from "@/lib/auth/server-session";

/**
 * Course Access Verification Endpoint (SEC-09, PAY-07)
 * Strictly verifies identity from server session if present to prevent BOLA / identity spoofing.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { courseSlug } = body;

    if (!courseSlug) {
      return NextResponse.json(
        { error: "Course slug is required." },
        { status: 400 }
      );
    }

    // Authenticate caller session server-side
    const sessionUser = await getServerSessionUser();
    
    // Server-authenticated email takes precedence; if unauthenticated, use body email strictly for checking paid ledger records (never whitelist bypass)
    const authenticatedEmail = sessionUser?.email;
    const effectiveEmail = authenticatedEmail || body.email;
    const isVerifiedSession = !!authenticatedEmail;
    const isEmailVerified = sessionUser ? !!sessionUser.emailVerification : false;

    const accessInfo = checkUserCourseAccess(effectiveEmail, courseSlug, isVerifiedSession && isEmailVerified);

    return NextResponse.json({
      success: true,
      ...accessInfo,
      authenticated: isVerifiedSession,
    });
  } catch (error: any) {
    console.error("[Course Access Verify API] Error:", error);
    return NextResponse.json(
      { error: "Failed to verify course access." },
      { status: 500 }
    );
  }
}
