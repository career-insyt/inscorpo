"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap, Star, Building2, Crown, ArrowRight, Users, Lock, RefreshCw } from "lucide-react";
import { useUser } from "@/components/providers/user-context";
import { AlertDialog } from "@/components/ui/alert-dialog";

export default function SubscriptionPage() {
  const { state, updateSubscriptionTier } = useUser();
  const [selectedBilling, setSelectedBilling] = useState<"monthly" | "yearly">("monthly");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<"bkash" | "nagad" | "sslcommerz" | "stripe">("bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type?: "error" | "warning" | "info" | "success" | "xp";
  }>({
    isOpen: false,
    message: "",
  });

  const handleOpenCheckout = (plan: any) => {
    setSelectedPlan(plan);
    setCheckoutModalOpen(true);
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    const planToCharge = selectedPlan?.id || "pro";
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: planToCharge === "pro" ? (selectedBilling === "monthly" ? "pro_monthly" : "pro_annual") : planToCharge,
          method: selectedMethod,
          accountNumber,
        }),
      });

      const data = await res.json();
      setIsProcessing(false);
      setCheckoutModalOpen(false);

      if (data.success) {
        await updateSubscriptionTier(planToCharge as any, "active");

        setAlertDialog({
          isOpen: true,
          title: "পেমেন্ট সফল হয়েছে! প্ল্যান সক্রিয় করা হয়েছে 🎉",
          message: `অভিনন্দন! আপনার ${selectedPlan?.name || "আপগ্রেড প্ল্যান"} সফলভাবে অ্যাক্টিভেট ও ডেটাবেজে সংরক্ষিত হয়েছে। টপবার ও ড্যাশবোর্ড নতুন ফিচারে সাজানো হয়েছে।`,
          type: "success",
        });
      } else {
        setAlertDialog({
          isOpen: true,
          title: "পেমেন্ট ব্যর্থ হয়েছে",
          message: data.error || "পেমেন্ট প্রসেস করতে সাময়িক সমস্যা হয়েছে। আবার চেষ্টা করুন।",
          type: "error",
        });
      }
    } catch {
      setIsProcessing(false);
      setCheckoutModalOpen(false);
      setAlertDialog({
        isOpen: true,
        title: "পেমেন্ট ত্রুটি",
        message: "নেটওয়ার্ক কানেকশনে ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        type: "error",
      });
    }
  };

  const plans = [
    {
      id: "single_course",
      name: "একক কোর্স পাস (Single Course Pass)",
      priceMonthly: "৳৪৯৯",
      priceYearly: "৳৪৯৯",
      priceDisplay: "৳৪৯৯",
      description: "নির্দিষ্ট যেকোনো ১টি কর্পোরেট মাস্টার কোর্সে আজীবন অ্যাক্সেস (যেমন: অ্যাডভান্সড কর্পোরেট এক্সেল বা ভিডিও প্রোডাকশন)।",
      features: [
        "নির্বাচিত ১টি মাস্টার কোর্সে আজীবন অ্যাক্সেস",
        "ইন্টারেক্টিভ ফর্মুলা স্যান্ডবক্স ও এক্সারসাইজ",
        "কোর্স সমাপ্তি ভেরিফাইড সার্টিফিকেট",
        "ডাউনলোডযোগ্য রিসোর্স ও প্রজেক্ট ফাইলসমূহ",
        "বিকাশ ও নগদ ১-ক্লিক মোবাইল পেমেন্ট",
      ],
      current: state.subscriptionTier === "single_course",
      popular: false,
      buttonText: state.subscriptionTier === "single_course" ? "আপনার সক্রিয় প্ল্যান (সক্রিয়)" : "একক কোর্স পাস কিনুন (৳৪৯৯)",
      buttonVariant: "secondary",
    },
    {
      id: "flagship_path",
      name: "ফ্ল্যাগশিপ ট্র্যাক পাস (Track Pass)",
      priceMonthly: "৳১,৯৯৯",
      priceYearly: "৳১,৯৯৯",
      priceDisplay: "৳১,৯৯৯",
      savings: "একবারই পরিশোধযোগ্য",
      description: "একটি সম্পূর্ণ ক্যারিয়ার ট্র্যাকের আজীবন অ্যাক্সেস (যেমন: বিজনেস অ্যানালিটিক্স বা ক্রিয়েটিভ প্রোডাকশন)।",
      features: [
        "সম্পূর্ণ ৪-কোর্স লার্নিং ট্র্যাকে আজীবন অ্যাক্সেস",
        "এসএইচএল ও কর্পোরেট অ্যাসেসমেন্ট কেস সলভার টেমপ্লেট",
        "ভেরিফাইড ক্যারিয়ার পাসপোর্ট স্পেশালিস্ট ব্যাজ",
        "ক্যাপস্টোন প্রজেক্টের এক্সপার্ট রিভিউ ও মূল্যায়ণ",
        "এআই রেজুমে অডিট ও মক ইন্টারভিউয়ার অ্যাক্সেস",
        "কর্পোরেট এইচআর রিক্রুটার ডাটাবেসে প্রোফাইল ইনডেক্স",
      ],
      current: state.subscriptionTier === "flagship_path",
      popular: true,
      buttonText: state.subscriptionTier === "flagship_path" ? "আপনার সক্রিয় প্ল্যান (সক্রিয়)" : "ফ্ল্যাগশিপ ট্র্যাক এনরোল করুন (৳১,৯৯৯)",
      buttonVariant: "primary",
    },
    {
      id: "pro",
      name: "প্রো অল-অ্যাক্সেস মেম্বারশিপ (INSYT Pro)",
      priceMonthly: "৳৭৯৯/মাস",
      priceYearly: "৳৪,৯৯৯/বছর",
      priceDisplay: selectedBilling === "monthly" ? "৳৭৯৯/মাস" : "৳৪,৯৯৯/বছর",
      savings: "৪৮% সাশ্রয়",
      description: "সবকটি লার্নিং ট্র্যাক, মাস্টার কোর্স এবং ১২টি এআই ক্যারিয়ার টুলের আনলিমিটেড অল-অ্যাক্সেস।",
      features: [
        "সমস্ত লার্নিং ট্র্যাকে আনলিমিটেড অ্যাক্সেস",
        "১২টি এআই ক্যারিয়ার টুলসের অল-অ্যাক্সেস সুট",
        "আনলিমিটেড টাইমড অ্যাসেসমেন্ট মক টেস্ট ও সলিউশন",
        "ফুল ক্যারিয়ার পাসপোর্ট + ভেরিফায়েবল পিডিএফ এক্সপোর্ট",
        "ভেরিফাইড অ্যালুমনাই ও ক্যান্ডিডেট ব্যাজ",
        "প্রাধিকারভিত্তিক প্রশ্ন-উত্তর ও প্রিমিয়াম সাপোর্ট",
      ],
      current: state.subscriptionTier === "pro",
      popular: false,
      buttonText: state.subscriptionTier === "pro" ? "আপনার সক্রিয় প্ল্যান (সক্রিয়)" : "প্রো অল-অ্যাক্সেসে আপগ্রেড করুন",
      buttonVariant: "primary",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 font-bangla">
      {/* Header - Soft Brutalist */}
      <div className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-[#2563eb] text-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
          <Crown size={15} className="text-white fill-white/20" /> <span>মেম্বারশিপ ও সাবস্ক্রিপশন সেন্টার</span>
        </div>
        
        <h1 className="text-2xl md:text-4xl font-black font-bangla text-slate-900 tracking-tight">
          আপনার কর্পোরেট ক্যারিয়ারের গতি বহুগুণ বাড়িয়ে দিন
        </h1>
        
        <p className="text-xs md:text-sm font-bangla max-w-xl mx-auto leading-relaxed text-slate-600 font-medium">
          ফ্ল্যাগশিপ লার্নিং ট্র্যাক, প্র্যাকটিক্যাল অ্যানালিটিক্স স্যান্ডবক্স, এআই ইন্টারভিউয়ার এবং ভেরিফাইড ক্যারিয়ার পাসপোর্টের আনলিমিটেড অ্যাক্সেস আনলক করুন।
        </p>

        {/* Billing Cycle Toggle - Soft Brutalist with light blue border */}
        <div className="inline-flex items-center p-1 rounded-full border-2 border-blue-200 bg-white shadow-[3px_3px_0px_0px_#bfdbfe] mt-2">
          <button
            onClick={() => setSelectedBilling("monthly")}
            className={`px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
              selectedBilling === "monthly"
                ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_#1e3a8a]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            মাসিক বিলিং
          </button>
          <button
            onClick={() => setSelectedBilling("yearly")}
            className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedBilling === "yearly"
                ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_#1e3a8a]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>বার্ষিক পাস</span>
            <span className="text-[10px] bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full font-black border border-amber-400">
              ২০% সাশ্রয়
            </span>
          </button>
        </div>
      </div>

      {/* Social Proof Counter Strip - Soft Brutalist with light blue border */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-bangla">
        <div className="rounded-2xl p-5 border-2 border-blue-200 shadow-[4px_4px_0px_0px_#bfdbfe] flex items-center gap-3.5 bg-white">
          <div className="w-11 h-11 rounded-xl bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 border-2 border-blue-300 shadow-[2px_2px_0px_0px_#1e3a8a]">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xl font-black font-mono text-slate-900">২,৮৪৭+</p>
            <p className="text-xs font-bold text-slate-600 font-bangla">এই মাসে মেম্বারশিপ আপগ্রেড করেছেন</p>
          </div>
        </div>

        <div className="rounded-2xl p-5 border-2 border-blue-200 shadow-[4px_4px_0px_0px_#bfdbfe] flex items-center gap-3.5 bg-white">
          <div className="w-11 h-11 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center flex-shrink-0 border-2 border-amber-500 shadow-[2px_2px_0px_0px_#78350f]">
            <Star size={20} className="fill-amber-950" />
          </div>
          <div>
            <p className="text-xl font-black font-mono text-slate-900">৪.৯/৫.০</p>
            <p className="text-xs font-bold text-slate-600 font-bangla">৬০০+ শিক্ষার্থীর গড় রেটিং</p>
          </div>
        </div>

        <div className="rounded-2xl p-5 border-2 border-blue-200 shadow-[4px_4px_0px_0px_#bfdbfe] flex items-center gap-3.5 bg-white">
          <div className="w-11 h-11 rounded-xl bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 border-2 border-blue-300 shadow-[2px_2px_0px_0px_#1e3a8a]">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-xl font-black font-mono text-slate-900">৪০০+</p>
            <p className="text-xs font-bold text-slate-600 font-bangla">এমটিও ও অ্যানালিস্ট পদে চাকরিপ্রাপ্ত</p>
          </div>
        </div>
      </div>

      {/* Live Active Plan Status Strip - Soft Brutalist with light blue border */}
      <div className="rounded-2xl p-4 sm:p-5 border-2 border-blue-200 shadow-[4px_4px_0px_0px_#bfdbfe] flex flex-wrap items-center justify-between gap-4 font-bangla bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black bg-blue-50 text-[#2563eb] border-2 border-blue-200 shadow-[2px_2px_0px_0px_#93c5fd]">
            <Crown size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-slate-900">আপনার বর্তমান প্ল্যান:</span>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider border-2 ${
                  state.subscriptionTier === "pro"
                    ? "bg-amber-300 text-amber-950 border-amber-500 shadow-[2px_2px_0px_0px_#78350f]"
                    : state.subscriptionTier === "flagship_path"
                    ? "bg-violet-600 text-white border-violet-400 shadow-[2px_2px_0px_0px_#4c1d95]"
                    : state.subscriptionTier === "single_course"
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-[2px_2px_0px_0px_#064e3b]"
                    : "bg-blue-100 text-blue-900 border-blue-300 shadow-[2px_2px_0px_0px_#2563eb]"
                }`}
              >
                {state.subscriptionTier === "pro"
                  ? "PRO ALL-ACCESS"
                  : state.subscriptionTier === "flagship_path"
                  ? "TRACK PASS"
                  : state.subscriptionTier === "single_course"
                  ? "COURSE PASS"
                  : "STARTER PACK (FREE)"}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 font-bangla">
              টপবার ও প্ল্যাটফর্মের ব্যাজ এবং প্রিমিয়াম সুবিধাগুলো স্বয়ংক্রিয়ভাবে অ্যাক্টিভেট হয়।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-black uppercase text-slate-500 mr-1 font-mono">টেস্ট সুইচিং:</span>
          <button
            onClick={() => updateSubscriptionTier("starter", "active")}
            className={`px-3 py-1 rounded-full text-[11px] font-black border-2 transition-all cursor-pointer ${
              !state.subscriptionTier || state.subscriptionTier === "starter"
                ? "bg-blue-600 text-white border-blue-700 shadow-[2px_2px_0px_0px_#1e3a8a]"
                : "border-blue-200 text-slate-600 hover:text-slate-900 hover:bg-blue-50"
            }`}
          >
            Starter
          </button>
          <button
            onClick={() => updateSubscriptionTier("single_course", "active")}
            className={`px-3 py-1 rounded-full text-[11px] font-black border-2 transition-all cursor-pointer ${
              state.subscriptionTier === "single_course"
                ? "bg-emerald-600 text-white border-emerald-500 shadow-[2px_2px_0px_0px_#064e3b]"
                : "border-blue-200 text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            Course Pass
          </button>
          <button
            onClick={() => updateSubscriptionTier("flagship_path", "active")}
            className={`px-3 py-1 rounded-full text-[11px] font-black border-2 transition-all cursor-pointer ${
              state.subscriptionTier === "flagship_path"
                ? "bg-violet-600 text-white border-violet-500 shadow-[2px_2px_0px_0px_#4c1d95]"
                : "border-blue-200 text-violet-700 hover:bg-violet-50"
            }`}
          >
            Track Pass
          </button>
          <button
            onClick={() => updateSubscriptionTier("pro", "active")}
            className={`px-3 py-1 rounded-full text-[11px] font-black border-2 transition-all cursor-pointer ${
              state.subscriptionTier === "pro"
                ? "bg-amber-400 text-amber-950 border-amber-600 shadow-[2px_2px_0px_0px_#78350f]"
                : "border-blue-200 text-amber-700 hover:bg-amber-50"
            }`}
          >
            Pro Active
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid - Soft Brutalist with light blue borders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch font-bangla">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 md:p-8 flex flex-col justify-between border-2 bg-white transition-all ${
              plan.popular
                ? "border-blue-500 shadow-[6px_6px_0px_0px_#2563eb]"
                : "border-blue-200 shadow-[5px_5px_0px_0px_#bfdbfe] hover:border-blue-300"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[10px] font-black uppercase font-mono bg-blue-600 text-white border-2 border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]">
                সেরা পছন্দ 🔥
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                <p className="text-xs leading-relaxed text-slate-600 font-medium">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-black font-mono text-[#2563eb]">
                  {selectedBilling === "monthly" ? plan.priceMonthly : plan.priceYearly}
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-blue-100">
                <p className="text-xs font-black uppercase tracking-wider text-[#2563eb]">অন্তর্ভুক্ত সুবিধাসমূহ:</p>
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                    <div className="w-4 h-4 rounded-md bg-blue-100 text-[#2563eb] flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-300">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t-2 border-blue-100">
              {plan.current ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl text-xs font-black bg-blue-50 text-blue-400 cursor-default border-2 border-blue-200 uppercase"
                >
                  {plan.buttonText}
                </button>
              ) : (
                <button
                  onClick={() => handleOpenCheckout(plan)}
                  className="w-full py-3.5 rounded-xl text-xs font-black text-white bg-[#2563eb] hover:bg-blue-600 transition-all shadow-[3px_3px_0px_0px_#1e3a8a] border-2 border-blue-400 uppercase flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges - Light blue border */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 font-bangla">
        {[
          { icon: <Lock size={14} />, label: "২৫৬-বিট নিরাপদ মোবাইল পেমেন্ট" },
          { icon: <RefreshCw size={14} />, label: "যেকোনো সময় প্ল্যান আপগ্রেড সুবিধা" },
          { icon: <ShieldCheck size={14} />, label: "৭-দিনের ১০০% রিফান্ড নিশ্চয়তা" },
          { icon: <Zap size={14} />, label: "পেমেন্টের সাথে সাথেই স্বয়ংক্রিয় অ্যাক্টিভেশন" },
        ].map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-blue-50/70 border border-blue-200 px-3 py-1.5 rounded-full shadow-[2px_2px_0px_0px_#bfdbfe]">
            <span className="text-[#2563eb]">{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>

      {/* Enterprise Contact Card - Soft Brutalist with light blue border & insyt.bd@gmail.com */}
      <div className="rounded-2xl p-6 md:p-8 border-2 border-blue-200 shadow-[5px_5px_0px_0px_#bfdbfe] flex flex-col md:flex-row items-center justify-between gap-6 font-bangla bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 border-2 border-blue-300 shadow-[2px_2px_0px_0px_#1e3a8a]">
            <Building2 size={24} />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">বিশ্ববিদ্যালয় ও কর্পোরেট এন্টারপ্রাইজ অ্যাকাউন্ট</h3>
            <p className="text-xs mt-1 text-slate-600 font-medium">
              বিশ্ববিদ্যালয়ের বিজনেস ক্লাব, কর্পোরেট ট্রেইনি কোহর্ট এবং রিক্রুটার ড্যাশবোর্ডের জন্য কাস্টম বাল্ক লাইসেন্সিং।
            </p>
          </div>
        </div>
        <Link
          href="mailto:insyt.bd@gmail.com?subject=INSYT%20Enterprise%20Cohort%20Inquiry"
          className="px-6 py-3 rounded-xl text-xs font-black border-2 border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-900 flex-shrink-0 uppercase font-bangla shadow-[3px_3px_0px_0px_#93c5fd] transition-all"
        >
          পার্টনার ডেস্কে যোগাযোগ করুন
        </Link>
      </div>

      {/* Payment Checkout Modal - Soft Brutalist with light blue border */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-bangla">
          <div className="w-full max-w-md rounded-2xl p-6 border-2 border-blue-300 shadow-[8px_8px_0px_0px_#2563eb] space-y-5 bg-white text-slate-900">
            <div className="flex items-center justify-between border-b-2 border-blue-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {selectedPlan?.name || "মেম্বারশিপ আপগ্রেড"}
                </h3>
                <p className="text-xs text-[#2563eb] font-black font-mono mt-0.5">
                  মূল্য: {selectedPlan?.priceDisplay || (selectedBilling === "monthly" ? "৳৭৯৯/মাস" : "৳৪,৯৯৯/বছর")}
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="w-8 h-8 rounded-full border-2 border-blue-200 bg-blue-50 text-blue-700 font-black flex items-center justify-center text-xs hover:bg-blue-100 cursor-pointer shadow-[2px_2px_0px_0px_#bfdbfe]"
              >
                ✕
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800">পেমেন্ট মেথড নির্বাচন করুন</label>
              <div className="grid grid-cols-2 gap-2 font-mono">
                {[
                  { id: "bkash", name: "bKash / বিকাশ", icon: "📱" },
                  { id: "nagad", name: "Nagad / নগদ", icon: "💸" },
                  { id: "sslcommerz", name: "SSLCommerz / কার্ড", icon: "💳" },
                  { id: "stripe", name: "Stripe International", icon: "🌐" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMethod(item.id as any)}
                    className={`p-3 rounded-xl text-left border-2 flex items-center gap-2.5 transition-all cursor-pointer font-bangla ${
                      selectedMethod === item.id
                        ? "border-[#2563eb] bg-blue-50 font-black shadow-[2px_2px_0px_0px_#2563eb]"
                        : "border-blue-200 bg-slate-50 hover:bg-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-black text-slate-900">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account / Phone Number Input */}
            {(selectedMethod === "bkash" || selectedMethod === "nagad") && (
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-800">
                  {selectedMethod.toUpperCase()} মোবাইল নম্বর
                </label>
                <input
                  type="text"
                  placeholder="01711XXXXXX"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs outline-none bg-blue-50/50 border-2 border-blue-200 text-slate-900 font-mono font-black focus:border-[#2563eb]"
                />
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl text-xs font-black uppercase text-white bg-[#2563eb] hover:bg-blue-600 transition-all shadow-[4px_4px_0px_0px_#1e3a8a] border-2 border-blue-400 flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              {isProcessing ? (
                <span>প্রসেসিং হচ্ছে...</span>
              ) : (
                <>
                  <span>
                    পেমেন্ট সম্পন্ন করুন ({selectedPlan?.priceDisplay || (selectedBilling === "monthly" ? "৳৭৯৯" : "৳৪,৯৯৯")}) এবং অ্যাক্টিভ করুন
                  </span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <AlertDialog
        isOpen={alertDialog.isOpen}
        onClose={() => setAlertDialog((prev) => ({ ...prev, isOpen: false }))}
        title={alertDialog.title}
        message={alertDialog.message}
        type={alertDialog.type}
      />
    </div>
  );
}
