import fs from "fs";
import path from "path";
import crypto from "crypto";
import { isFreeAccessUser } from "@/lib/auth/whitelist";
import {
  BKASH_CONFIG,
  BkashIncomingTransaction,
  CourseEnrollmentRecord,
  SubscriptionEnrollmentRecord,
  normalizeCourseSlug,
  isExcelCourse,
  getExpectedCoursePrice,
  getExpectedSubscriptionPrice,
} from "./bkash-config";

// Re-export client-safe items for any server file importing from ledger
export {
  BKASH_CONFIG,
  normalizeCourseSlug,
  isExcelCourse,
  getExpectedCoursePrice,
  getExpectedSubscriptionPrice,
};
export type {
  BkashIncomingTransaction,
  CourseEnrollmentRecord,
  SubscriptionEnrollmentRecord,
};

const DB_DIR = path.join(process.cwd(), "DB");
const ENROLLMENTS_FILE = path.join(DB_DIR, "course_enrollments.json");
const SUBSCRIPTIONS_FILE = path.join(DB_DIR, "subscription_enrollments.json");
const BKASH_LEDGER_FILE = path.join(DB_DIR, "bkash_transactions_ledger.json");

// In-memory registries
const enrollmentsMap = new Map<string, CourseEnrollmentRecord>();
const subscriptionsMap = new Map<string, SubscriptionEnrollmentRecord>();
const bkashLedgerMap = new Map<string, BkashIncomingTransaction>();
let isInitialized = false;

function ensureDbDirectory(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("[bKash Ledger] Failed to create DB directory:", err);
  }
}

function loadData(): void {
  if (isInitialized) return;
  ensureDbDirectory();

  // Load Course Enrollments
  try {
    if (fs.existsSync(ENROLLMENTS_FILE)) {
      const raw = fs.readFileSync(ENROLLMENTS_FILE, "utf-8");
      const list: CourseEnrollmentRecord[] = JSON.parse(raw);
      enrollmentsMap.clear();
      for (const item of list) {
        if (item && item.id) {
          enrollmentsMap.set(item.id, item);
        }
      }
    }
  } catch (e) {
    console.warn("[bKash Ledger] Error reading course_enrollments.json, initializing fresh:", e);
  }

  // Load Subscriptions
  try {
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      const raw = fs.readFileSync(SUBSCRIPTIONS_FILE, "utf-8");
      const list: SubscriptionEnrollmentRecord[] = JSON.parse(raw);
      subscriptionsMap.clear();
      for (const item of list) {
        if (item && item.id) {
          subscriptionsMap.set(item.id, item);
        }
      }
    }
  } catch (e) {
    console.warn("[bKash Ledger] Error reading subscription_enrollments.json, initializing fresh:", e);
  }

  // Load bKash Ledger
  try {
    if (fs.existsSync(BKASH_LEDGER_FILE)) {
      const raw = fs.readFileSync(BKASH_LEDGER_FILE, "utf-8");
      const list: BkashIncomingTransaction[] = JSON.parse(raw);
      bkashLedgerMap.clear();
      for (const item of list) {
        if (item && item.trxId) {
          bkashLedgerMap.set(item.trxId.toUpperCase(), item);
        }
      }
    }
  } catch (e) {
    console.warn("[bKash Ledger] Error reading bkash_transactions_ledger.json, initializing fresh:", e);
  }

  isInitialized = true;
}

function saveEnrollments(): void {
  try {
    ensureDbDirectory();
    const list = Array.from(enrollmentsMap.values());
    fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.error("[bKash Ledger] Failed to persist course_enrollments.json:", e);
  }
}

function saveSubscriptions(): void {
  try {
    ensureDbDirectory();
    const list = Array.from(subscriptionsMap.values());
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.error("[bKash Ledger] Failed to persist subscription_enrollments.json:", e);
  }
}

function saveBkashLedger(): void {
  try {
    ensureDbDirectory();
    const list = Array.from(bkashLedgerMap.values());
    fs.writeFileSync(BKASH_LEDGER_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.error("[bKash Ledger] Failed to persist bkash_transactions_ledger.json:", e);
  }
}

/**
 * Generate a tamper-proof cryptographic verification hash for an enrollment record
 */
function generateEnrollmentSecurityHash(userEmail: string, courseSlug: string, trxId: string, amount: number): string {
  const secret = process.env.ENROLLMENT_HMAC_SECRET || process.env.APPWRITE_API_KEY || "careercorp_runtime_ephemeral_key";
  const payload = `${userEmail.toLowerCase()}:${normalizeCourseSlug(courseSlug)}:${trxId.toUpperCase()}:${amount.toFixed(2)}`;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function generateSubscriptionSecurityHash(userEmail: string, planId: string, trxId: string, amount: number): string {
  const secret = process.env.ENROLLMENT_HMAC_SECRET || process.env.APPWRITE_API_KEY || "careercorp_runtime_ephemeral_key";
  const payload = `SUB:${userEmail.toLowerCase()}:${planId.toLowerCase()}:${trxId.toUpperCase()}:${amount.toFixed(2)}`;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Parse standard bKash incoming SMS message format
 */
export function parseBkashSms(rawSms: string): { amount: number; senderNumber: string; trxId: string; ref?: string } | null {
  if (!rawSms) return null;
  const clean = rawSms.trim();

  const amountMatch = clean.match(/Tk\s*([\d,.]+)/i);
  const senderMatch = clean.match(/from\s*(?:\+?88)?(01[3-9]\d{8})/i);
  const trxMatch = clean.match(/TrxID\s*([A-Za-z0-9]{8,12})/i);
  const refMatch = clean.match(/Ref\s*([A-Za-z0-9_\-.]+)/i);

  if (amountMatch && senderMatch && trxMatch) {
    const rawAmount = amountMatch[1].replace(/,/g, "");
    const amount = parseFloat(rawAmount);
    const senderNumber = senderMatch[1];
    const trxId = trxMatch[1].toUpperCase();
    const ref = refMatch ? refMatch[1] : undefined;

    return { amount, senderNumber, trxId, ref };
  }

  return null;
}

/**
 * Record an incoming bKash payment SMS from an Android forwarder or admin
 */
export function recordIncomingBkashTransaction(payload: {
  trxId: string;
  senderNumber: string;
  amount: number;
  ref?: string;
  rawSms?: string;
}): BkashIncomingTransaction {
  loadData();
  const cleanTrxId = payload.trxId.trim().toUpperCase();
  const existing = bkashLedgerMap.get(cleanTrxId);
  if (existing) {
    return existing;
  }

  const record: BkashIncomingTransaction = {
    id: `bkash-txn-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    trxId: cleanTrxId,
    senderNumber: payload.senderNumber.replace(/^(\+?88)/, "").trim(),
    amount: payload.amount,
    ref: payload.ref,
    rawSms: payload.rawSms,
    receivedAt: new Date().toISOString(),
    status: "UNCLAIMED",
  };

  bkashLedgerMap.set(cleanTrxId, record);
  saveBkashLedger();
  return record;
}

/**
 * Check if a candidate has legitimate, verified access to a course
 */
export function checkUserCourseAccess(
  email: string | null | undefined,
  courseSlug: string,
  isEmailVerified: boolean = true
): {
  hasAccess: boolean;
  isWhitelisted: boolean;
  enrollment?: CourseEnrollmentRecord;
  requiredAmountBdt: number;
  bkashNumber: string;
} {
  loadData();
  const requiredAmountBdt = getExpectedCoursePrice(courseSlug);
  const bkashNumber = BKASH_CONFIG.ACCOUNT_NUMBER;

  if (email && isFreeAccessUser(email, isEmailVerified)) {
    return {
      hasAccess: true,
      isWhitelisted: true,
      requiredAmountBdt,
      bkashNumber,
    };
  }

  if (!email) {
    return {
      hasAccess: false,
      isWhitelisted: false,
      requiredAmountBdt,
      bkashNumber,
    };
  }

  const cleanEmail = email.trim().toLowerCase();
  const normSlug = normalizeCourseSlug(courseSlug);

  for (const record of enrollmentsMap.values()) {
    if (
      record.userEmail.toLowerCase() === cleanEmail &&
      normalizeCourseSlug(record.courseSlug) === normSlug &&
      record.status === "VERIFIED"
    ) {
      return {
        hasAccess: true,
        isWhitelisted: false,
        enrollment: record,
        requiredAmountBdt,
        bkashNumber,
      };
    }
  }

  return {
    hasAccess: false,
    isWhitelisted: false,
    requiredAmountBdt,
    bkashNumber,
  };
}

/**
 * Check if a candidate has verified subscription access
 */
export function checkUserSubscriptionAccess(
  email: string | null | undefined,
  isEmailVerified: boolean = true
): {
  hasActiveSubscription: boolean;
  isWhitelisted: boolean;
  tier: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise";
  subscription?: SubscriptionEnrollmentRecord;
} {
  loadData();
  if (email && isFreeAccessUser(email, isEmailVerified)) {
    return {
      hasActiveSubscription: true,
      isWhitelisted: true,
      tier: "pro",
    };
  }

  if (!email) {
    return {
      hasActiveSubscription: false,
      isWhitelisted: false,
      tier: "starter",
    };
  }

  const cleanEmail = email.trim().toLowerCase();
  for (const record of subscriptionsMap.values()) {
    if (record.userEmail.toLowerCase() === cleanEmail && record.status === "VERIFIED") {
      return {
        hasActiveSubscription: true,
        isWhitelisted: false,
        tier: record.planId,
        subscription: record,
      };
    }
  }

  return {
    hasActiveSubscription: false,
    isWhitelisted: false,
    tier: "starter",
  };
}

/**
 * Core Course Payment Verification & Enrollment Engine
 */
export async function verifyAndEnrollCourse(params: {
  email: string;
  userName?: string;
  userId?: string;
  courseSlug: string;
  courseTitle?: string;
  senderNumber: string;
  trxId: string;
  accountHolderName?: string;
  amount?: number;
}): Promise<{
  success: boolean;
  pending?: boolean;
  message: string;
  enrollment?: CourseEnrollmentRecord;
  verificationType: "CORPORATE_WHITELIST" | "BKASH_RECONCILED" | "BKASH_INSTANT_VERIFIED" | "BKASH_PENDING_CONFIRMATION";
}> {
  loadData();
  const { email, userName, userId, courseSlug, courseTitle = "Masterclass Course", senderNumber, trxId, accountHolderName } = params;

  if (!email || !email.includes("@")) {
    throw new Error("A valid email address is required for course certification registration.");
  }

  const cleanEmail = email.trim().toLowerCase();
  const normSlug = normalizeCourseSlug(courseSlug);
  const expectedPrice = getExpectedCoursePrice(courseSlug);

  // ─── Whitelist Bypass ────────────────────────────────────────────────────────
  if (isFreeAccessUser(cleanEmail)) {
    const existing = checkUserCourseAccess(cleanEmail, normSlug);
    if (existing.hasAccess && existing.enrollment) {
      return {
        success: true,
        message: "Your corporate access is active.",
        enrollment: existing.enrollment,
        verificationType: "CORPORATE_WHITELIST",
      };
    }

    const freeEnrollment: CourseEnrollmentRecord = {
      id: `enr-free-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: userId || "whitelist-user",
      userEmail: cleanEmail,
      userName: userName || "Authorized Executive",
      courseSlug: normSlug,
      courseTitle,
      paymentMethod: "corporate_whitelist",
      amountPaidBdt: 0,
      senderNumber: "INTERNAL_AUTHORIZED",
      accountHolderName: "Corporate Licensee",
      trxId: `FREE-${Date.now()}`,
      status: "VERIFIED",
      verifiedAt: new Date().toISOString(),
      securityHash: generateEnrollmentSecurityHash(cleanEmail, normSlug, `FREE-${Date.now()}`, 0),
    };

    enrollmentsMap.set(freeEnrollment.id, freeEnrollment);
    saveEnrollments();

    return {
      success: true,
      message: "Authorized corporate staff access granted free of charge.",
      enrollment: freeEnrollment,
      verificationType: "CORPORATE_WHITELIST",
    };
  }

  // ─── Input Validations ────────────────────────────────────────────────────────
  if (!senderNumber) {
    throw new Error("Please enter the bKash sender mobile number you used to send money.");
  }

  const cleanSender = senderNumber.replace(/[\s\-]/g, "").replace(/^(\+?88)/, "");
  if (!/^01[3-9]\d{8}$/.test(cleanSender)) {
    throw new Error("Invalid bKash sender number. Must be an 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX).");
  }

  if (!trxId) {
    throw new Error("Please enter the 10-character bKash Transaction ID (TrxID).");
  }

  const cleanTrxId = trxId.trim().toUpperCase();
  if (!/^[A-Z0-9]{8,12}$/.test(cleanTrxId)) {
    throw new Error("Invalid bKash Transaction ID format. TrxID must be an 8 to 12 character alphanumeric string (e.g. BKA8X9Z10Q).");
  }

  // ─── Anti-Fraud: Replay Attack Shield Across Course & Subscription Ledgers ────
  for (const enr of enrollmentsMap.values()) {
    if (enr.trxId && enr.trxId.toUpperCase() === cleanTrxId) {
      if (enr.userEmail.toLowerCase() === cleanEmail && normalizeCourseSlug(enr.courseSlug) === normSlug) {
        return {
          success: true,
          message: "Payment already verified! You are enrolled in this course.",
          enrollment: enr,
          verificationType: "BKASH_INSTANT_VERIFIED",
        };
      }
      throw new Error("This bKash Transaction ID has already been redeemed. Transaction IDs cannot be reused.");
    }
  }

  for (const sub of subscriptionsMap.values()) {
    if (sub.trxId && sub.trxId.toUpperCase() === cleanTrxId) {
      throw new Error("This bKash Transaction ID has already been redeemed for a membership subscription.");
    }
  }

  // ─── Amount Validation ────────────────────────────────────────────────────────
  const submittedAmount = params.amount !== undefined ? Number(params.amount) : expectedPrice;
  if (isNaN(submittedAmount) || submittedAmount < expectedPrice) {
    throw new Error(`Insufficient payment amount. The required enrollment fee for this course is ৳${expectedPrice.toFixed(2)}.`);
  }

  // ─── bKash Live SMS Reconciliation Engine ────────────────────────────────────
  const ledgerTxn = bkashLedgerMap.get(cleanTrxId);

  if (ledgerTxn) {
    if (ledgerTxn.status === "SETTLED" && ledgerTxn.claimedByEmail && ledgerTxn.claimedByEmail !== cleanEmail) {
      throw new Error("This transaction has already been claimed and settled by another candidate.");
    }

    if (ledgerTxn.amount < expectedPrice) {
      throw new Error(`The transaction amount in the bKash record is ৳${ledgerTxn.amount.toFixed(2)}, which is less than the required ৳${expectedPrice.toFixed(2)}.`);
    }

    ledgerTxn.status = "SETTLED";
    ledgerTxn.claimedByEmail = cleanEmail;
    ledgerTxn.claimedCourseSlug = normSlug;
    saveBkashLedger();

    // ─── Create & Persist Verified Course Enrollment ─────────────────────────────
    const newEnrollment: CourseEnrollmentRecord = {
      id: `enr-bkash-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: userId || `usr-${cleanSender}`,
      userEmail: cleanEmail,
      userName: userName || accountHolderName || cleanEmail.split("@")[0],
      courseSlug: normSlug,
      courseTitle,
      paymentMethod: "bkash_send_money",
      amountPaidBdt: submittedAmount,
      senderNumber: cleanSender,
      accountHolderName: accountHolderName?.trim() || "bKash Sender",
      trxId: cleanTrxId,
      status: "VERIFIED",
      verifiedAt: new Date().toISOString(),
      securityHash: generateEnrollmentSecurityHash(cleanEmail, normSlug, cleanTrxId, submittedAmount),
    };

    enrollmentsMap.set(newEnrollment.id, newEnrollment);
    saveEnrollments();

    return {
      success: true,
      pending: false,
      message: `Payment of ৳${submittedAmount.toFixed(2)} verified successfully! Course unlocked.`,
      enrollment: newEnrollment,
      verificationType: "BKASH_RECONCILED",
    };
  }

  // ─── Unreconciled Submission: Record as PENDING without unlocking ────────────
  const pendingEnrollment: CourseEnrollmentRecord = {
    id: `enr-bkash-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId: userId || `usr-${cleanSender}`,
    userEmail: cleanEmail,
    userName: userName || accountHolderName || cleanEmail.split("@")[0],
    courseSlug: normSlug,
    courseTitle,
    paymentMethod: "bkash_send_money",
    amountPaidBdt: submittedAmount,
    senderNumber: cleanSender,
    accountHolderName: accountHolderName?.trim() || "bKash Sender",
    trxId: cleanTrxId,
    status: "PENDING",
    verifiedAt: "",
    securityHash: generateEnrollmentSecurityHash(cleanEmail, normSlug, cleanTrxId, submittedAmount),
  };

  enrollmentsMap.set(pendingEnrollment.id, pendingEnrollment);
  saveEnrollments();

  return {
    success: false,
    pending: true,
    message: `Payment submission recorded. Transaction ${cleanTrxId} is pending bKash SMS reconciliation. Course will unlock automatically once confirmed (typically within 1-2 minutes).`,
    enrollment: pendingEnrollment,
    verificationType: "BKASH_PENDING_CONFIRMATION",
  };
}

/**
 * Core Subscription Payment Verification & Activation Engine
 */
export async function verifyAndEnrollSubscription(params: {
  email: string;
  userName?: string;
  userId?: string;
  planId: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise";
  planName?: string;
  period?: "monthly" | "annual" | "lifetime";
  senderNumber: string;
  trxId: string;
  accountHolderName?: string;
  amount?: number;
}): Promise<{
  success: boolean;
  pending?: boolean;
  message: string;
  subscription?: SubscriptionEnrollmentRecord;
  subscriptionTier: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise";
  verificationType: "CORPORATE_WHITELIST" | "BKASH_RECONCILED" | "BKASH_INSTANT_VERIFIED" | "BKASH_PENDING_CONFIRMATION";
}> {
  loadData();
  const {
    email,
    userName,
    userId,
    planId,
    planName = "INSYT Membership Plan",
    period = "monthly",
    senderNumber,
    trxId,
    accountHolderName,
  } = params;

  if (!email || !email.includes("@")) {
    throw new Error("A valid email address is required for membership subscription activation.");
  }

  const cleanEmail = email.trim().toLowerCase();
  const expectedPrice = getExpectedSubscriptionPrice(planId);

  // ─── Whitelist Bypass ────────────────────────────────────────────────────────
  if (isFreeAccessUser(cleanEmail)) {
    const freeSub: SubscriptionEnrollmentRecord = {
      id: `sub-free-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: userId || "whitelist-user",
      userEmail: cleanEmail,
      userName: userName || "Authorized Executive",
      planId: "pro",
      planName: "Pro VIP Corporate Lifetime Access",
      period: "lifetime",
      paymentMethod: "corporate_whitelist",
      amountPaidBdt: 0,
      senderNumber: "INTERNAL_AUTHORIZED",
      accountHolderName: "Corporate Licensee",
      trxId: `FREE-SUB-${Date.now()}`,
      status: "VERIFIED",
      activatedAt: new Date().toISOString(),
      securityHash: generateSubscriptionSecurityHash(cleanEmail, "pro", `FREE-SUB-${Date.now()}`, 0),
    };

    subscriptionsMap.set(freeSub.id, freeSub);
    saveSubscriptions();

    return {
      success: true,
      message: "Authorized corporate staff VIP Pro access granted free of charge.",
      subscription: freeSub,
      subscriptionTier: "pro",
      verificationType: "CORPORATE_WHITELIST",
    };
  }

  // ─── Input Validations ────────────────────────────────────────────────────────
  if (!senderNumber) {
    throw new Error("Please enter the bKash sender mobile number you used to send money.");
  }

  const cleanSender = senderNumber.replace(/[\s\-]/g, "").replace(/^(\+?88)/, "");
  if (!/^01[3-9]\d{8}$/.test(cleanSender)) {
    throw new Error("Invalid bKash sender number. Must be an 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX).");
  }

  if (!trxId) {
    throw new Error("Please enter the 10-character bKash Transaction ID (TrxID).");
  }

  const cleanTrxId = trxId.trim().toUpperCase();
  if (!/^[A-Z0-9]{8,12}$/.test(cleanTrxId)) {
    throw new Error("Invalid bKash Transaction ID format. TrxID must be an 8 to 12 character alphanumeric string (e.g. BKA8X9Z10Q).");
  }

  // ─── Anti-Fraud: Replay Attack Shield Across Course & Subscription Ledgers ────
  for (const sub of subscriptionsMap.values()) {
    if (sub.trxId && sub.trxId.toUpperCase() === cleanTrxId) {
      if (sub.userEmail.toLowerCase() === cleanEmail && sub.planId === planId) {
        return {
          success: true,
          message: "Payment already verified! Your subscription is active.",
          subscription: sub,
          subscriptionTier: planId,
          verificationType: "BKASH_INSTANT_VERIFIED",
        };
      }
      throw new Error("This bKash Transaction ID has already been redeemed. Transaction IDs cannot be reused.");
    }
  }

  for (const enr of enrollmentsMap.values()) {
    if (enr.trxId && enr.trxId.toUpperCase() === cleanTrxId) {
      throw new Error("This bKash Transaction ID has already been redeemed for a course enrollment.");
    }
  }

  // ─── Amount Validation ────────────────────────────────────────────────────────
  const submittedAmount = params.amount !== undefined ? Number(params.amount) : expectedPrice;
  if (isNaN(submittedAmount) || submittedAmount < expectedPrice) {
    throw new Error(`Insufficient payment amount. The required fee for ${planName} is ৳${expectedPrice.toFixed(2)}.`);
  }

  // ─── bKash Live SMS Reconciliation Engine for Subscriptions ─────────────
  const ledgerTxn = bkashLedgerMap.get(cleanTrxId);

  if (ledgerTxn) {
    if (ledgerTxn.status === "SETTLED" && ledgerTxn.claimedByEmail && ledgerTxn.claimedByEmail !== cleanEmail) {
      throw new Error("This transaction has already been claimed and settled by another member.");
    }

    if (ledgerTxn.amount < expectedPrice) {
      throw new Error(`The transaction amount in the bKash record is ৳${ledgerTxn.amount.toFixed(2)}, which is less than the required ৳${expectedPrice.toFixed(2)}.`);
    }

    ledgerTxn.status = "SETTLED";
    ledgerTxn.claimedByEmail = cleanEmail;
    saveBkashLedger();

    // ─── Create & Persist Verified Subscription ──────────────────────────────────
    const newSubscription: SubscriptionEnrollmentRecord = {
      id: `sub-bkash-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: userId || `usr-${cleanSender}`,
      userEmail: cleanEmail,
      userName: userName || accountHolderName || cleanEmail.split("@")[0],
      planId,
      planName,
      period,
      paymentMethod: "bkash_send_money",
      amountPaidBdt: submittedAmount,
      senderNumber: cleanSender,
      accountHolderName: accountHolderName?.trim() || "bKash Sender",
      trxId: cleanTrxId,
      status: "VERIFIED",
      activatedAt: new Date().toISOString(),
      securityHash: generateSubscriptionSecurityHash(cleanEmail, planId, cleanTrxId, submittedAmount),
    };

    subscriptionsMap.set(newSubscription.id, newSubscription);
    saveSubscriptions();

    return {
      success: true,
      pending: false,
      message: `Payment of ৳${submittedAmount.toFixed(2)} verified successfully! ${planName} activated.`,
      subscription: newSubscription,
      subscriptionTier: planId,
      verificationType: "BKASH_RECONCILED",
    };
  }

  // ─── Unreconciled Submission: Record as PENDING without unlocking Pro ───────
  const pendingSubscription: SubscriptionEnrollmentRecord = {
    id: `sub-bkash-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId: userId || `usr-${cleanSender}`,
    userEmail: cleanEmail,
    userName: userName || accountHolderName || cleanEmail.split("@")[0],
    planId,
    planName,
    period,
    paymentMethod: "bkash_send_money",
    amountPaidBdt: submittedAmount,
    senderNumber: cleanSender,
    accountHolderName: accountHolderName?.trim() || "bKash Sender",
    trxId: cleanTrxId,
    status: "PENDING",
    activatedAt: "",
    securityHash: generateSubscriptionSecurityHash(cleanEmail, planId, cleanTrxId, submittedAmount),
  };

  subscriptionsMap.set(pendingSubscription.id, pendingSubscription);
  saveSubscriptions();

  return {
    success: false,
    pending: true,
    message: `Payment submission recorded. Transaction ${cleanTrxId} is pending bKash SMS reconciliation. Your subscription will activate automatically once confirmed (typically within 1-2 minutes).`,
    subscription: pendingSubscription,
    subscriptionTier: "starter",
    verificationType: "BKASH_PENDING_CONFIRMATION",
  };
}

/**
 * Get all verified enrollments for a user
 */
export function getUserEnrollments(email: string): CourseEnrollmentRecord[] {
  loadData();
  const cleanEmail = email.trim().toLowerCase();
  return Array.from(enrollmentsMap.values()).filter(
    (e) => e.userEmail.toLowerCase() === cleanEmail && e.status === "VERIFIED"
  );
}
