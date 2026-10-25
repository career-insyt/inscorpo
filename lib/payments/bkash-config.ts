/**
 * Client-Safe bKash Configuration & Course/Subscription Pricing Helpers
 * 
 * NOTE: This file is 100% safe to import in BOTH Client ("use client") and Server components.
 * It contains NO Node.js built-ins (no fs, no path, no crypto).
 */

export const BKASH_CONFIG = {
  ACCOUNT_NUMBER: "01771047033",
  ACCOUNT_TYPE: "Personal (Send Money)",
  LOGO_URL: "https://static.freepnglogo.com/images/all_img/1701670512bkash-icon.png",
  EXCEL_COURSE_SLUG: "corporate-financial-commercial-modeling-excel",
  EXCEL_PRICE_BDT: 990,
  DEFAULT_COURSE_PRICE_BDT: 990,
  SUBSCRIPTION_PRICES: {
    single_course: 499,
    flagship_path: 1999,
    pro: 799,
    pro_monthly: 799,
    pro_annual: 4999,
  } as Record<string, number>,
} as const;

export interface BkashIncomingTransaction {
  id: string;
  trxId: string;
  senderNumber: string;
  amount: number;
  ref?: string;
  rawSms?: string;
  receivedAt: string;
  status: "UNCLAIMED" | "SETTLED";
  claimedByEmail?: string;
  claimedCourseSlug?: string;
}

export interface CourseEnrollmentRecord {
  id: string;
  userId?: string;
  userEmail: string;
  userName?: string;
  courseSlug: string;
  courseTitle: string;
  paymentMethod: "bkash_send_money" | "corporate_whitelist" | "manual_admin";
  amountPaidBdt: number;
  senderNumber?: string;
  accountHolderName?: string;
  trxId?: string;
  status: "VERIFIED" | "PENDING" | "REJECTED";
  verifiedAt: string;
  securityHash: string;
}

export interface SubscriptionEnrollmentRecord {
  id: string;
  userId?: string;
  userEmail: string;
  userName?: string;
  planId: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise";
  planName: string;
  period: "monthly" | "annual" | "lifetime";
  paymentMethod: "bkash_send_money" | "corporate_whitelist" | "manual_admin";
  amountPaidBdt: number;
  senderNumber?: string;
  accountHolderName?: string;
  trxId?: string;
  status: "VERIFIED" | "PENDING" | "REJECTED";
  activatedAt: string;
  securityHash: string;
}

// Normalize course slug to prevent path bypass
export function normalizeCourseSlug(slug: string): string {
  if (!slug) return "";
  const parts = slug.trim().toLowerCase().split("/");
  return parts[parts.length - 1];
}

export function isExcelCourse(slug: string): boolean {
  const norm = normalizeCourseSlug(slug);
  return (
    norm === "corporate-financial-commercial-modeling-excel" ||
    norm === "excel-modeling"
  );
}

export function getExpectedCoursePrice(courseSlug: string): number {
  if (isExcelCourse(courseSlug)) {
    return BKASH_CONFIG.EXCEL_PRICE_BDT;
  }
  return BKASH_CONFIG.DEFAULT_COURSE_PRICE_BDT;
}

export function getExpectedSubscriptionPrice(planId: string): number {
  const cleanPlan = (planId || "pro_monthly").toLowerCase();
  return BKASH_CONFIG.SUBSCRIPTION_PRICES[cleanPlan] || 799;
}
