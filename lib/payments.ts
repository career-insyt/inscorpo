export type PaymentMethod = "bkash" | "nagad" | "sslcommerz" | "stripe";

export interface PaymentPlan {
  id: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise";
  name: string;
  priceBDT: number;
  priceUSD: number;
  period: "monthly" | "annual" | "lifetime";
  features: string[];
}

export const PLANS: Record<string, PaymentPlan> = {
  single_course: {
    id: "single_course",
    name: "একক কোর্স পাস (Single Course Pass)",
    priceBDT: 499,
    priceUSD: 5,
    period: "lifetime",
    features: [
      "নির্বাচিত ১টি মাস্টার কোর্সে আজীবন অ্যাক্সেস",
      "ইন্টারেক্টিভ ফর্মুলা স্যান্ডবক্স ও এক্সারসাইজ",
      "কোর্স সমাপ্তি ভেরিফাইড সার্টিফিকেট",
    ],
  },
  flagship_path: {
    id: "flagship_path",
    name: "ফ্ল্যাগশিপ ট্র্যাক পাস (Flagship Track Pass)",
    priceBDT: 1999,
    priceUSD: 19,
    period: "lifetime",
    features: [
      "সম্পূর্ণ ৪-কোর্স লার্নিং ট্র্যাকে আজীবন অ্যাক্সেস",
      "এসএইচএল ও কর্পোরেট অ্যাসেসমেন্ট কেস সলভার",
      "ভেরিফাইড ক্যারিয়ার পাসপোর্ট স্পেশালিস্ট ব্যাজ",
    ],
  },
  pro: {
    id: "pro",
    name: "প্রো অল-অ্যাক্সেস মেম্বারশিপ (INSYT Pro)",
    priceBDT: 799,
    priceUSD: 8,
    period: "monthly",
    features: [
      "সমস্ত লার্নিং ট্র্যাকে আনলিমিটেড অ্যাক্সেস",
      "১২টি এআই ক্যারিয়ার টুলসের অল-অ্যাক্সেস সুট",
      "আনলিমিটেড টাইমড মক টেস্ট ও সলিউশন",
    ],
  },
  pro_monthly: {
    id: "pro",
    name: "Pro Monthly",
    priceBDT: 799,
    priceUSD: 8,
    period: "monthly",
    features: [
      "সমস্ত লার্নিং ট্র্যাকে আনলিমিটেড অ্যাক্সেস",
      "১২টি এআই ক্যারিয়ার টুলসের অল-অ্যাক্সেস সুট",
      "আনলিমিটেড টাইমড মক টেস্ট ও সলিউশন",
    ],
  },
  pro_annual: {
    id: "pro",
    name: "Pro Annual (Save 48%)",
    priceBDT: 4999,
    priceUSD: 48,
    period: "annual",
    features: [
      "সমস্ত লার্নিং ট্র্যাকে আনলিমিটেড অ্যাক্সেস",
      "১২টি এআই ক্যারিয়ার টুলসের অল-অ্যাক্সেস সুট",
      "আনলিমিটেড টাইমড মক টেস্ট ও সলিউশন",
    ],
  },
};

export interface CheckoutResult {
  success: boolean;
  transactionId: string;
  method: PaymentMethod;
  amountBDT: number;
  planId: string;
  message: string;
}

export async function processCheckoutPayment({
  planId,
  method,
  accountNumber,
}: {
  planId: string;
  method: PaymentMethod;
  accountNumber?: string;
}): Promise<CheckoutResult> {
  const plan = PLANS[planId] || PLANS["pro_monthly"];
  const transactionId = `${method.toUpperCase()}-TXN-${Math.floor(100000 + Math.random() * 900000)}`;

  // Simulate network processing delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    transactionId,
    method,
    amountBDT: plan.priceBDT,
    planId: plan.id,
    message: `Payment of ৳${plan.priceBDT.toLocaleString()} processed successfully via ${method.toUpperCase()}! Transaction ID: ${transactionId}`,
  };
}
