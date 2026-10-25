# 🏛️ CAREERINSYT — FORENSIC AUDIT REPORT
## Artifact 02: Authentication, Identity, Session Lifecycles & Role-Based Access Control (RBAC)

---

### Audit Metadata
- **Artifact**: `02-auth-identity.md`
- **Scope**: Appwrite authentication hooks, `auth-provider.tsx`, session fallback mechanics, cookie flags, admin RBAC, and whitelist authorization.
- **Auditor Role**: Senior Application Security Engineer & Identity Systems Auditor
- **Status**: Complete Forensic Discovery

---

## 1. IDENTITY & AUTHENTICATION SUBSYSTEM ARCHITECTURE

CAREERINSYT implements a hybrid authentication model combining:
1. **Primary Provider**: Appwrite Cloud v1.6+ (`account.createEmailPasswordSession()`, `account.get()`).
2. **Client Fallback Cache**: `localStorage` key `insyt_local_user` and cookie `insyt_fallback_session`.
3. **Corporate Whitelist Engine**: `lib/auth/whitelist.ts` (`z65gt9@gmail.com` and `@insyt.bd` corporate domain).
4. **Role-Based Access Control (RBAC)**: Enforced via `app/(admin)/layout.tsx` and `proxy.ts`.

---

## 2. FORENSIC AUDIT FINDINGS: AUTHENTICATION & IDENTITY

---

### Finding AUTH-01: Critical Session Fallback Fabricates Superadmin Account (`career@insyt.bd`) for Unauthenticated Visitors
- **Severity**: **P0 — Critical**
- **Confidence**: Confirmed
- **Type**: Broken Authentication & Critical Privilege Escalation
- **Affected Route**: Global / All Authenticated Routes (`/dashboard`, `/admin`, etc.)
- **Exact File**: [`components/providers/auth-provider.tsx`](file:///d:/Insyt/components/providers/auth-provider.tsx#L72-L89)
  ```typescript
  // Lines 72-88 in auth-provider.tsx
  // If cookie is present but local storage was cleared, create a resilient default session
  if (hasCookie) {
    const defaultUser = {
      $id: "user-" + Math.random().toString(36).substring(2, 9),
      name: "Corporate Member",
      email: "career@insyt.bd", // <-- HARDCODED SUPERADMIN EMAIL!
      emailVerification: true,
      status: true,
      prefs: { subscriptionTier: "starter", subscriptionStatus: "active" },
    } as any;
    setUser(defaultUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("insyt_local_user", JSON.stringify(defaultUser));
    }
    setIsLoading(false);
    return;
  }
  ```
- **Intended Behavior**: When an Appwrite cloud session check fails or throws an exception, the system must treat the user as unauthenticated (`setUser(null)`), clear invalid cookies, and redirect to `/login`.
- **Actual Observed Behavior**: If any cookie starting with `a_session_` or named `insyt_fallback_session` exists (even an expired or dummy cookie), and Appwrite fails (e.g., when running offline, under network latency, or if the user creates a cookie manually), `auth-provider.tsx` synthesizes an in-memory user with `email: "career@insyt.bd"`.
  Because `"career@insyt.bd"` is the authoritative administrative owner hardcoded in `ALLOWED_ADMIN_EMAILS` across `proxy.ts`, `app/(admin)/layout.tsx`, and `app/api/admin/git-push/route.ts`, the visitor is immediately granted complete, unrestricted superadmin access across the entire platform!
- **Evidence**:
  1. `components/providers/auth-provider.tsx` lines 74–81 hardcodes `email: "career@insyt.bd"`.
  2. `components/providers/auth-provider.tsx` line 47 and line 63 sets:
     `document.cookie = "insyt_admin_email=" + encodeURIComponent(sessionUser.email)`.
  3. `app/(admin)/layout.tsx` lines 20–34 verifies admin privilege:
     `ADMIN_AUTHORIZED_EMAILS.includes(userEmail)`. Since `userEmail === "career@insyt.bd"`, access is granted!
- **Reproduction Steps**:
  1. Open Chrome in Incognito mode.
  2. Open DevTools Console and execute:
     ```javascript
     document.cookie = "insyt_fallback_session=true; path=/";
     location.reload();
     ```
  3. Notice the top-right profile avatar displays "Corporate Member" with email `career@insyt.bd`.
  4. Navigate to `/admin`.
  5. The administrative control center renders with full administrative privileges.
- **Likely Root Cause**: A developer implemented a mock fallback during local development to bypass Appwrite network timeouts, but hardcoded the primary production admin email instead of a guest placeholder.
- **User or Business Impact**: Catastrophic security breach. Any visitor can gain full administrative capabilities without entering a password.
- **Exploitability**: 100% reproducible and trivial to exploit.
- **Recommended Remediation**:
  1. Immediately delete the `defaultUser` fallback in `components/providers/auth-provider.tsx:72-88`.
  2. If `account.get()` fails and no valid Appwrite session exists, strictly set `setUser(null)`.
  3. Clear all session cookies on session failure.
- **Estimated Effort**: S (30 minutes).

---

### Finding AUTH-02: Unsanitized LocalStorage Deserialization Allows Client-Side Identity Spoofing
- **Severity**: **P1 — High**
- **Confidence**: Confirmed
- **Type**: Broken Authentication & Client-Side Identity Tampering
- **Affected Route**: Global Application State
- **Exact File**: [`components/providers/auth-provider.tsx`](file:///d:/Insyt/components/providers/auth-provider.tsx#L56-L70)
  ```typescript
  // Lines 56-70
  if (localUserRaw) {
    try {
      const localUser = JSON.parse(localUserRaw);
      setUser(localUser);
      document.cookie = `insyt_fallback_session=true; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
      if (localUser.email) {
        document.cookie = `insyt_admin_email=${encodeURIComponent(localUser.email)}; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
      }
      setIsLoading(false);
      return;
    } catch { ... }
  }
  ```
- **Intended Behavior**: The authenticated user identity must always be authenticated cryptographically by the server. Local caching should only store non-sensitive display preferences, never authoritative identity or role assignments.
- **Actual Observed Behavior**: When Appwrite fails or is unreachable, the application blindly deserializes `insyt_local_user` from `localStorage` without cryptographic signature verification (HMAC). Any user can write arbitrary claims into `localStorage` (such as `email: "career@insyt.bd"` or `labels: ["admin"]`), and `auth-provider.tsx` immediately trusts the payload and updates `document.cookie` with the spoofed email.
- **Reproduction Steps**:
  1. Open DevTools Console.
  2. Execute:
     ```javascript
     localStorage.setItem("insyt_local_user", JSON.stringify({
       $id: "attacker-1",
       name: "Executive Attacker",
       email: "career@insyt.bd",
       labels: ["admin"],
       prefs: { role: "admin" }
     }));
     location.reload();
     ```
  3. The application accepts the spoofed profile and updates admin cookies accordingly.
- **User or Business Impact**: Candidates can impersonate platform administrators or other users, unlocking paid content and administrative tools.
- **Exploitability**: High.
- **Recommended Remediation**: Remove the `localStorage` identity fallback. Require active Appwrite session validation. If offline capability is required, sign local cached session state with an HttpOnly session cookie or server-issued JWT.
- **Estimated Effort**: M (2–3 hours).

---

### Finding AUTH-03: Corporate Whitelist Bypass Validates Unauthenticated Request Body Strings
- **Severity**: **P1 — High**
- **Confidence**: Confirmed
- **Type**: Financial & Access Authorization Vulnerability
- **Affected Route**: `/api/courses/verify-access`, `/api/subscription/verify-access`
- **Exact Files**:
  - `lib/auth/whitelist.ts` (Lines 18–37)
  - `app/api/courses/verify-access/route.ts` (Lines 12–25)
  - `app/api/subscription/verify-access/route.ts` (Lines 12–25)
- **Intended Behavior**: Whitelist benefits (100% free lifetime access for `z65gt9@gmail.com` and `@insyt.bd`) must only be granted after confirming that the requesting client is authentically logged into that specific whitelisted account.
- **Actual Observed Behavior**: API routes accept an arbitrary `{ email: string }` payload in the JSON request body. The server calls `isFreeAccessUser(body.email)` without verifying if the caller's session matches the supplied email address:
  ```typescript
  // app/api/courses/verify-access/route.ts
  const { email, courseSlug } = await request.json();
  if (isFreeAccessUser(email)) {
    return NextResponse.json({ hasAccess: true, source: "whitelist" });
  }
  ```
  Any unauthenticated attacker or standard paying user can make a request passing `{"email": "z65gt9@gmail.com"}` or `{"email": "admin@insyt.bd"}` and receive `{ "hasAccess": true }`, bypassing course paywalls.
- **Evidence**: Inspected `app/api/courses/verify-access/route.ts:12-25`. The route does NOT inspect session headers or Appwrite session cookies; it trusts the untrusted JSON body parameter `email`.
- **Reproduction Steps**:
  1. Open terminal or curl.
  2. Send POST request:
     ```bash
     curl -X POST http://localhost:3000/api/courses/verify-access \
       -H "Content-Type: application/json" \
       -d '{"email":"z65gt9@gmail.com","courseSlug":"corporate-financial-commercial-modeling-excel"}'
     ```
  3. Observe response: `{"hasAccess": true, "source": "whitelist"}`.
- **User or Business Impact**: Total paywall bypass. Any user can unlock all 6 flagship courses and subscriptions for free by passing a whitelisted email in the network request.
- **Exploitability**: High.
- **Recommended Remediation**: Authenticate the caller's session on the server side via Appwrite session cookies (`node-appwrite`) before checking whitelist eligibility. Never trust an unverified email string in a POST payload.
- **Estimated Effort**: M (2–3 hours).

---

### Finding AUTH-04: Client-Side Cookie Storage Lacks `HttpOnly` Protection
- **Severity**: **P2 — Medium**
- **Confidence**: Confirmed
- **Type**: Security / Cookie Hardening Defect
- **Affected Files**: `components/providers/auth-provider.tsx` (Lines 45–48)
- **Intended Behavior**: Security-sensitive authentication and role cookies (`insyt_admin_email`, `insyt_fallback_session`) should be marked `HttpOnly` so they cannot be accessed or manipulated by client-side JavaScript or Cross-Site Scripting (XSS) payloads.
- **Actual Observed Behavior**: Cookies are written via client-side `document.cookie`:
  ```typescript
  document.cookie = `insyt_fallback_session=true; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
  document.cookie = `insyt_admin_email=${encodeURIComponent(sessionUser.email)}; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
  ```
  Because they are set via client JavaScript, they cannot have the `HttpOnly` flag. Any XSS vulnerability or malicious browser extension can read and modify these cookies directly.
- **User or Business Impact**: Amplifies the impact of any client-side script injection into full account and admin takeover.
- **Recommended Remediation**: Set administrative session cookies exclusively from server-side Route Handlers or Next.js Server Actions using `cookies().set({ httpOnly: true, secure: true, sameSite: 'lax' })`.
- **Estimated Effort**: S (1 hour).
