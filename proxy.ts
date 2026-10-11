import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16 Proxy handler for route protection and security headers.
 * (Renamed from middleware in Next.js 16)
 *
 * 1. Protects /dashboard/* and other member routes — redirects unauthenticated visitors to /login
 * 2. Protects /admin/* routes — validates admin session server-side
 * 3. Applies hardened security headers to ALL responses
 */

// ── Admin emails — server-side only, never shipped to client bundle ──
const ALLOWED_ADMIN_EMAILS = ["z65gt9@gmail.com", "zubaiirh@gmail.com"];

// ── Protected routes requiring an active session ──
const PROTECTED_PREFIXES = [
  "/cockpit",
  "/prepare",
  "/evaluate",
  "/passport",
  "/opportunities",
  "/dashboard",
  "/courses",
  "/career-passport",
  "/career-hub",
  "/certificates",
  "/challenges",
  "/community",
  "/events",
  "/help",
  "/jobs",
  "/learn",
  "/marketplace",
  "/mba-center",
  "/mock-tests",
  "/mock-interviews",
  "/subscription",
  "/workshops",
  "/simulations",
  "/rewards",
];

const AUTH_ROUTES = ["/login", "/signup"];

// ── Comprehensive security headers applied to every response ──
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-DNS-Prefetch-Control": "on",
  "Permissions-Policy": "camera=(), microphone=(self), geolocation=(), browsing-topics=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

function hasSessionCookie(request: NextRequest): boolean {
  return request.cookies.getAll().some(
    (c) => (c.name.startsWith("a_session_") || c.name === "insyt_fallback_session") && c.value.length > 0
  );
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = hasSessionCookie(request);

  // ── 1. Admin route protection ──
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("from", pathname);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }

    // Check admin email cookie (set during login for verified admin users)
    const adminEmail = request.cookies.get("insyt_admin_email")?.value;
    if (!adminEmail || !ALLOWED_ADMIN_EMAILS.includes(adminEmail.toLowerCase())) {
      // Redirect non-admin users to dashboard instead of showing admin panel
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";
      return applySecurityHeaders(NextResponse.redirect(dashboardUrl));
    }
  }

  // ── 2. Member routes protection ──
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  // ── 3. Redirect authenticated users away from auth pages ──
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  if (isAuthRoute && hasSession) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return applySecurityHeaders(NextResponse.redirect(dashboardUrl));
  }

  // ── 4. API route protection for admin endpoints ──
  if (pathname.startsWith("/api/seed") || pathname.startsWith("/api/setup") || pathname.startsWith("/api/sync-db")) {
    const adminSecret = request.headers.get("x-admin-secret");
    const expectedSecret = process.env.ADMIN_SECRET_KEY;

    if (!expectedSecret || adminSecret !== expectedSecret) {
      return applySecurityHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }
  }

  // ── 5. Standard response with security headers ──
  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|manifest\\.json|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
