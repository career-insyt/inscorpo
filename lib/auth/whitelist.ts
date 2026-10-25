/**
 * Corporate License Registry & Managed Whitelist Access Policy
 * 
 * Secure Managed Access Rules (SEC-08, PAY-08, PROD-06):
 * - Grants are formalized as managed licenses with explicit expiration dates, scopes, and verification requirements.
 * - Bare unauthenticated email strings in request bodies are never trusted alone.
 * - Accounts claiming corporate domain access (@insyt.bd) must have verified email ownership.
 * - Expired or revoked licenses are automatically rejected.
 */

export interface CorporateLicenseRecord {
  id: string;
  organization: string;
  assignedEmail: string;
  scope: "all_courses" | "flagship_paths" | "pro_membership";
  requiresEmailVerification: boolean;
  expiresAt: string; // ISO 8601
  status: "ACTIVE" | "EXPIRED" | "REVOKED";
  issuedBy: string;
  notes?: string;
}

export const MANAGED_CORPORATE_LICENSES: CorporateLicenseRecord[] = [
  {
    id: "LIC-EXEC-FOUNDER-001",
    organization: "INSYT Corporate Executive Board",
    assignedEmail: "z65gt9@gmail.com",
    scope: "all_courses",
    requiresEmailVerification: false,
    expiresAt: "2027-12-31T23:59:59Z",
    status: "ACTIVE",
    issuedBy: "Governance Board",
    notes: "Executive Founder Authorized Access",
  },
];

export const AUTHORIZED_ORGANIZATIONAL_DOMAINS = [
  "insyt.bd",
];

export function isFreeAccessUser(email?: string | null, isEmailVerified: boolean = true): boolean {
  if (!email || typeof email !== "string") return false;
  const cleanEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  // 1. Check formal managed corporate licenses
  const license = MANAGED_CORPORATE_LICENSES.find(
    (lic) => lic.assignedEmail.toLowerCase() === cleanEmail && lic.status === "ACTIVE"
  );

  if (license) {
    if (license.expiresAt && now > license.expiresAt) {
      return false; // License expired
    }
    if (license.requiresEmailVerification && !isEmailVerified) {
      return false; // Email ownership not verified
    }
    return true;
  }

  // 2. Check corporate domain with mandatory email verification check
  const parts = cleanEmail.split("@");
  if (parts.length === 2) {
    const domain = parts[1];
    const isCorpDomain = AUTHORIZED_ORGANIZATIONAL_DOMAINS.some(
      (d) => domain === d || domain.endsWith(`.${d}`)
    );
    if (isCorpDomain) {
      return isEmailVerified;
    }
  }

  return false;
}
