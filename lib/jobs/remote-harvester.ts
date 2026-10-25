
export interface RemoteViabilityAssessment {
  isViableForBangladesh: boolean;
  overlapHoursWithBst: number;
  bstWindowString: string;
  requiresNightShift: boolean;
  rejectionReason: string | null;
}

const RESIDENCY_BLOCKLIST_REGEX =
  /\b(US Only|USA Only|United States Only|Must reside in the US|W-2 Only|W2 Only|EU Citizens Only|UK Only|Within the EU|Security Clearance Required|FedRAMP|ITAR)\b/i;

const GLOBAL_ALLOWLIST_REGEX =
  /\b(Worldwide|Anywhere|Global|APAC|Asia|South Asia|EMEA \/ APAC|GMT\+6|UTC\+6|Deel|Remote\.com|Oyster)\b/i;

/**
 * Evaluates whether a remote posting is viable for a professional in Bangladesh (BST = UTC+6).
 * Standard BST productive daylight/evening envelope: 09:00 to 23:00 BST = 03:00 to 17:00 UTC.
 */
export function assessRemoteViability(
  locationConstraint: string,
  descriptionText: string,
  clientUtcStartHour: number = 13, // Default ~09:00 EST / 14:00 CET
  clientUtcEndHour: number = 21   // Default ~17:00 EST / 22:00 CET
): RemoteViabilityAssessment {
  // 1. Residency Gate
  if (
    RESIDENCY_BLOCKLIST_REGEX.test(locationConstraint) &&
    !GLOBAL_ALLOWLIST_REGEX.test(locationConstraint)
  ) {
    return {
      isViableForBangladesh: false,
      overlapHoursWithBst: 0,
      bstWindowString: "Restricted",
      requiresNightShift: false,
      rejectionReason: "Restricted to domestic US/EU citizenship or state security clearance",
    };
  }

  // 2. Candidate BST Window in UTC: [03:00, 17:00] UTC
  const candUtcStart = 3;
  const candUtcEnd = 17;

  // Overlap calculation
  const overlapStart = Math.max(clientUtcStartHour, candUtcStart);
  const overlapEnd = Math.min(clientUtcEndHour, candUtcEnd);
  const overlapHours = Math.max(0, overlapEnd - overlapStart);

  const bstClientStart = (clientUtcStartHour + 6) % 24;
  const bstClientEnd = (clientUtcEndHour + 6) % 24;
  const bstWindowString = `${String(bstClientStart).padStart(2, "0")}:00 - ${String(bstClientEnd).padStart(2, "0")}:00 BST`;

  const requiresNightShift = overlapHours < 3.0 && !/asynchronous|async-first/i.test(descriptionText);

  if (overlapHours < 2.0 && requiresNightShift) {
    return {
      isViableForBangladesh: false,
      overlapHoursWithBst: overlapHours,
      bstWindowString,
      requiresNightShift: true,
      rejectionReason: "Insufficient timezone overlap with BST (< 2.0 hours synchronous overlap)",
    };
  }

  return {
    isViableForBangladesh: true,
    overlapHoursWithBst: overlapHours,
    bstWindowString,
    requiresNightShift,
    rejectionReason: null,
  };
}

/**
 * Currency Normalizer: converts USD/EUR/GBP to monthly BDT.
 * Uses official central bank baseline rates.
 */
const FX_RATES_TO_BDT: Record<string, number> = {
  USD: 121.5,
  EUR: 131.2,
  GBP: 153.8,
  BDT: 1.0,
};

export function normalizeSalaryToMonthlyBdt(
  amount: number,
  currency: "BDT" | "USD" | "EUR" | "GBP",
  period: "HOURLY" | "MONTHLY" | "ANNUAL"
): number {
  const rate = FX_RATES_TO_BDT[currency] || 1.0;
  let monthlyBase = amount;

  if (period === "HOURLY") {
    monthlyBase = amount * 160; // 40 hours/week * 4 weeks
  } else if (period === "ANNUAL") {
    monthlyBase = amount / 12;
  }

  return Math.round(monthlyBase * rate);
}
