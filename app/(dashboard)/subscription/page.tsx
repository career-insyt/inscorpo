"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap, Star, Award, Building2, Crown, ArrowRight, Users, Lock, RefreshCw } from "lucide-react";
import { useUser } from "@/components/providers/user-context";
import { account } from "@/lib/appwrite";
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
        // Persist to database, Appwrite prefs, localStorage and UserContext
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
        "সমস্ত ৭টি লার্নিং ট্র্যাকে আনলিমিটেড অ্যাক্সেস",
        "১২টি এআই ক্যারিয়ার টুলসের অল-অ্যাক্সেস সুট",
        "আনলিমিটেড টাইমড এসএইচএল মক টেস্ট ও সলিউশন",
        "ফুল ক্যারিয়ার পাসপোর্ট + হাই-ডিপিআই পিডিএফ এক্সপোর্ট",
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
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold text-white" style={{ background: "var(--game-blue)", boxShadow: "0 4px 12px rgba(79,126,255,0.3)" }}>
          <Crown size={14} /> <span>মেম্বারশিপ ও সাবস্ক্রিপশন সেন্টার</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black font-bangla text-[var(--game-blue)]">
          আপনার কর্পোরেট ক্যারিয়ারের গতি বহুগুণ বাড়িয়ে দিন
        </h1>
        <p className="text-xs md:text-sm font-bangla max-w-xl mx-auto leading-relaxed" style={{ color: "var(--corp-text-secondary)" }}>
          ফ্ল্যাগশিপ লার্নিং ট্র্যাক, ফিন্যান্সিয়াল মডেলিং স্যান্ডবক্স, এআই ইন্টারভিউয়ার এবং ভেরিফাইড ক্যারিয়ার পাসপোর্টের আনলিমিটেড অ্যাক্সেস আনলক করুন।
        </p>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center p-1.5 rounded-full border mt-4" style={{ background: "var(--corp-surface)", borderColor: "var(--corp-border)" }}>
          <button
            onClick={() => setSelectedBilling("monthly")}
            className="px-5 py-2 rounded-full text-xs font-extrabold transition-all"
            style={{
              background: selectedBilling === "monthly" ? "var(--game-blue)" : "transparent",
              color: selectedBilling === "monthly" ? "#fff" : "var(--corp-text-secondary)",
              boxShadow: selectedBilling === "monthly" ? "0 4px 12px rgba(79,126,255,0.3)" : "none",
            }}
          >
            মাসিক বিলিং
          </button>
          <button
            onClick={() => setSelectedBilling("yearly")}
            className={`px-5 py-2 rounded-md text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              selectedBilling === "yearly" ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_#1e3a8a]" : "text-corp-text"
            }`}
          >
            <span>বার্ষিক পাস</span>
            <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black">২০% সাশ্রয়</span>
          </button>
        </div>
      </div>

      {/* Social Proof Counter Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="rounded-xl p-5 border-2 border-corp-border shadow-[4px_4px_0px_0px_#2563eb] flex items-center gap-3.5" style={{ background: "var(--corp-surface)" }}>
          <div className="w-11 h-11 rounded-lg bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 border border-blue-300"><Users size={20} /></div>
          <div>
            <p className="text-xl font-extrabold" style={{ color: "var(--corp-text)" }}>২,৮৪৭+</p>
            <p className="text-xs font-bold font-bangla text-corp-text-tertiary">এই মাসে মেম্বারশিপ আপগ্রেড করেছেন</p>
          </div>
        </div>
        <div className="rounded-xl p-5 border-2 border-corp-border shadow-[4px_4px_0px_0px_#2563eb] flex items-center gap-3.5" style={{ background: "var(--corp-surface)" }}>
          <div className="w-11 h-11 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center flex-shrink-0 border border-amber-500"><Star size={20} className="fill-amber-950" /></div>
          <div>
            <p className="text-xl font-extrabold" style={{ color: "var(--corp-text)" }}>৪.৯/৫.০</p>
            <p className="text-xs font-bold font-bangla text-corp-text-tertiary">৬০০+ শিক্ষার্থীর গড় রেটিং</p>
          </div>
        </div>
        <div className="rounded-xl p-5 border-2 border-corp-border shadow-[4px_4px_0px_0px_#2563eb] flex items-center gap-3.5" style={{ background: "var(--corp-surface)" }}>
          <div className="w-11 h-11 rounded-lg bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 border border-blue-300"><Award size={20} /></div>
          <div>
            <p className="text-xl font-extrabold" style={{ color: "var(--corp-text)" }}>৪০০+</p>
            <p className="text-xs font-bold font-bangla text-corp-text-tertiary">এমটিও ও অ্যানালিস্ট পদে চাকরিপ্রাপ্ত</p>
          </div>
        </div>
      </div>

      {/* Live Active Plan Status & Quick Switcher Strip */}
      <div
        className="rounded-xl p-4 sm:p-5 border-2 border-corp-border flex flex-wrap items-center justify-between gap-4 font-mono shadow-sm"
        style={{ background: "var(--corp-surface)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black bg-blue-500/10 text-[#2563eb] border border-blue-500/20">
            <Crown size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-corp-text">আপনার বর্তমান প্ল্যান:</span>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider border-2 ${
                  state.subscriptionTier === "pro"
                    ? "bg-amber-400 text-[#78350f] border-amber-600 shadow-[2px_2px_0px_0px_#78350f]"
                    : state.subscriptionTier === "flagship_path"
                    ? "bg-violet-600 text-white border-violet-400"
                    : state.subscriptionTier === "single_course"
                    ? "bg-emerald-600 text-white border-emerald-400"
                    : "bg-amber-400 text-[#78350f] border-amber-600 shadow-[2px_2px_0px_0px_#78350f]"
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
            <p className="text-[11px] text-corp-text-secondary mt-0.5 font-sans">
              টপবার ও প্ল্যাটফর্মের ব্যাজ এবং প্রিমিয়াম সুবিধাগুলো স্বয়ংক্রিয়ভাবে অ্যাডাপ্ট হয়।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-black uppercase text-corp-text-tertiary mr-1">টেস্ট সুইচিং:</span>
          <button
            onClick={() => updateSubscriptionTier("starter", "active")}
            className={`px-2.5 py-1 rounded text-[11px] font-black border transition-all cursor-pointer ${
              !state.subscriptionTier || state.subscriptionTier === "starter"
                ? "bg-amber-400 text-[#78350f] border-amber-600 shadow-[1.5px_1.5px_0px_0px_#78350f]"
                : "border-corp-border text-corp-text-secondary hover:text-corp-text hover:bg-corp-bg-secondary"
            }`}
          >
            Starter Pack
          </button>
          <button
            onClick={() => updateSubscriptionTier("single_course", "active")}
            className={`px-2.5 py-1 rounded text-[11px] font-black border transition-all cursor-pointer ${
              state.subscriptionTier === "single_course"
                ? "bg-emerald-600 text-white border-emerald-400 shadow-sm"
                : "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
            }`}
          >
            Course Pass
          </button>
          <button
            onClick={() => updateSubscriptionTier("flagship_path", "active")}
            className={`px-2.5 py-1 rounded text-[11px] font-black border transition-all cursor-pointer ${
              state.subscriptionTier === "flagship_path"
                ? "bg-violet-600 text-white border-violet-400 shadow-sm"
                : "border-violet-500/40 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10"
            }`}
          >
            Track Pass
          </button>
          <button
            onClick={() => updateSubscriptionTier("pro", "active")}
            className={`px-2.5 py-1 rounded text-[11px] font-black border transition-all cursor-pointer ${
              state.subscriptionTier === "pro"
                ? "bg-amber-400 text-amber-950 border-amber-600 shadow-sm"
                : "border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
            }`}
          >
            Pro Active
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch font-bangla">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl p-6 md:p-8 flex flex-col justify-between border-2 shadow-[5px_5px_0px_0px_#2563eb] transition-all`}
            style={{
              background: "var(--corp-surface)",
              borderColor: plan.popular ? "#2563eb" : "var(--corp-border)",
            }}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-md text-[10px] font-extrabold uppercase font-mono bg-rose-600 text-white border border-rose-400 shadow-[2px_2px_0px_0px_#881337]">
                সেরা চয়েস 🔥
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold" style={{ color: "var(--corp-text)" }}>{plan.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--corp-text-secondary)" }}>{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-extrabold font-mono text-[#2563eb]">
                  {selectedBilling === "monthly" ? plan.priceMonthly : plan.priceYearly}
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-corp-border">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#2563eb]">অন্তর্ভুক্ত সুবিধাসমূহ:</p>
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs font-semibold" style={{ color: "var(--corp-text-secondary)" }}>
                    <div className="w-4 h-4 rounded bg-[#2563eb]/15 text-[#2563eb] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#2563eb]">
                      <Check size={11} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t-2 border-corp-border">
              {plan.current ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-lg text-xs font-extrabold bg-corp-bg-secondary text-corp-text-tertiary cursor-default border-2 border-corp-border uppercase"
                >
                  {plan.buttonText}
                </button>
              ) : (
                <button
                  onClick={() => handleOpenCheckout(plan)}
                  className="w-full py-3.5 rounded-lg text-xs font-extrabold text-white bg-[#2563eb] hover:bg-blue-600 transition-all shadow-[3px_3px_0px_0px_#1e3a8a] border border-blue-300 uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 font-bangla">
        {[
          { icon: <Lock size={14} />, label: "২৫৬-বিট এসএসএল এনক্রিপ্টেড নিরাপদ পেমেন্ট" },
          { icon: <RefreshCw size={14} />, label: "যেকোনো সময় সাবস্ক্রিপশন বাতিল সুবিধা" },
          { icon: <ShieldCheck size={14} />, label: "৭-দিনের ১০০% রিফান্ড গ্যারান্টি" },
          { icon: <Zap size={14} />, label: "পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই ইন্সট্যান্ট অ্যাক্সেস" },
        ].map((badge) => (
          <div key={badge.label} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "var(--corp-text-tertiary)" }}>
            <span className="text-[#2563eb]">{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>

      {/* CCFCM Corporate Fellowship & Modeling Certification Track */}
      <div className="rounded-xl p-6 md:p-8 border-2 border-emerald-500 shadow-[5px_5px_0px_0px_#047857] space-y-4" style={{ background: "var(--corp-surface)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-corp-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Award size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                  FMI AFM & FAST Standard Compliant
                </span>
                <span className="text-[10px] font-mono text-corp-text-tertiary">75-Hour Executive Track</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-corp-text mt-0.5">
                CCFCM: কর্পোরেট ফিন্যান্সিয়াল অ্যান্ড কমার্শিয়াল মডেলিং ফেলোশিপ
              </h3>
            </div>
          </div>
          <Link
            href="/learn/corporate-analyst/corporate-financial-commercial-modeling-excel"
            className="px-4 py-2 rounded-lg text-xs font-mono font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto"
          >
            সিলেবাস দেখুন <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-lg bg-corp-bg-secondary border border-corp-border space-y-2">
            <span className="text-[10px] font-bold text-corp-text-tertiary uppercase">Tier 1 · সেলফ-পেসড</span>
            <div className="flex items-baseline justify-between">
              <p className="font-extrabold text-sm text-corp-text">Self-Paced Track</p>
              <p className="font-extrabold text-emerald-400 text-base">৳ ৫,৯৯৯</p>
            </div>
            <p className="text-[11px] text-corp-text-secondary leading-relaxed font-sans">
              মডিউল ১ থেকে ৬ পর্যন্ত লেকচার, ডাউনলোডেবল এক্সেল ওয়ার্কবুক ও অটোমেটেড কুইজ।
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-500/10 border-2 border-emerald-500 space-y-2 relative">
            <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider">
              ফ্ল্যাগশিপ ট্র্যাক 🔥
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Tier 2 · ক্যারিয়ার এক্সিলারেটর</span>
            <div className="flex items-baseline justify-between">
              <p className="font-extrabold text-sm text-corp-text">Career Accelerator</p>
              <p className="font-extrabold text-emerald-400 text-base">৳ ১১,৯৯৯</p>
            </div>
            <p className="text-[11px] text-corp-text-secondary leading-relaxed font-sans">
              ১০টি মডিউল (৪৮ লেকচার), ৫টি মিনি-প্রজেক্ট, ৪-ঘণ্টার লাইভ ব্ল্যাঙ্ক-শিট এক্সাম ও ক্যারিয়ার পাসপোর্ট।
            </p>
          </div>

          <div className="p-4 rounded-lg bg-corp-bg-secondary border border-corp-border space-y-2">
            <span className="text-[10px] font-bold text-corp-text-tertiary uppercase">Tier 3 · এক্সিকিউটিভ কোহর্ট</span>
            <div className="flex items-baseline justify-between">
              <p className="font-extrabold text-sm text-corp-text">Executive Fellowship</p>
              <p className="font-extrabold text-emerald-400 text-base">৳ ১৭,৯৯৯</p>
            </div>
            <p className="text-[11px] text-corp-text-secondary leading-relaxed font-sans">
              ৮টি লাইভ উইকেন্ড ল্যাব, ১-অন-১ মডেল অডিট, এক্সিকিউটিভ প্যানেলে ৩০-মিনিটের ওরাল মডেল ডিফেন্স ও রেফারাল।
            </p>
          </div>
        </div>
      </div>

      {/* Enterprise Contact Card */}
      <div className="rounded-xl p-6 md:p-8 border-2 border-[#2563eb] shadow-[5px_5px_0px_0px_#2563eb] flex flex-col md:flex-row items-center justify-between gap-6 font-bangla"
        style={{ background: "var(--corp-surface)" }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 border border-blue-300">
            <Building2 size={24} />
          </div>
          <div>
            <h3 className="text-base font-extrabold" style={{ color: "var(--corp-text)" }}>বিশ্ববিদ্যালয় ও কর্পোরেট এন্টারপ্রাইজ অ্যাকাউন্ট</h3>
            <p className="text-xs mt-1" style={{ color: "var(--corp-text-secondary)" }}>
              বিশ্ববিদ্যালয়ের বিজনেস ক্লাব, কর্পোরেট ট্রেইনি কোহর্ট এবং রিক্রুটার ড্যাশবোর্ডের জন্য কাস্টম বাল্ক লাইসেন্সিং।
            </p>
          </div>
        </div>
        <Link
          href="mailto:sales@insyt.co?subject=INSYT%20Enterprise%20Cohort%20Inquiry"
          className="px-6 py-3 rounded-lg text-xs font-extrabold border-2 border-corp-border hover:bg-corp-bg-secondary text-corp-text flex-shrink-0 uppercase font-mono"
        >
          পার্টনার ডেস্কে যোগাযোগ করুন
        </Link>
      </div>

      {/* Payment Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80">
          <div
            className="w-full max-w-md rounded-xl p-6 border-2 border-[#2563eb] shadow-2xl space-y-5 font-bangla"
            style={{ background: "var(--corp-surface)" }}
          >
            <div className="flex items-center justify-between border-b-2 border-corp-border pb-3">
              <div>
                <h3 className="text-base font-extrabold" style={{ color: "var(--corp-text)" }}>
                  {selectedPlan?.name || "মেম্বারশিপ আপগ্রেড"}
                </h3>
                <p className="text-xs text-[#2563eb] font-bold font-mono mt-0.5">
                  মূল্য: {selectedPlan?.priceDisplay || (selectedBilling === "monthly" ? "৳৭৯৯/মাস" : "৳৪,৯৯৯/বছর")}
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-xs font-extrabold font-mono text-corp-text-tertiary hover:text-corp-text cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-corp-text">পেমেন্ট মেথড নির্বাচন করুন</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "bkash", name: "bKash / বিকাশ", icon: "📱" },
                  { id: "nagad", name: "Nagad / নগদ", icon: "💸" },
                  { id: "sslcommerz", name: "SSLCommerz / কার্ড", icon: "💳" },
                  { id: "stripe", name: "Stripe International", icon: "🌐" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMethod(item.id as any)}
                    className={`p-3 rounded-lg text-left border-2 flex items-center gap-2.5 transition-all cursor-pointer ${
                      selectedMethod === item.id ? "border-[#2563eb] bg-[#2563eb]/10 font-bold" : "border-corp-border bg-corp-bg-secondary"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-extrabold" style={{ color: "var(--corp-text)" }}>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account / Phone Number Input */}
            {(selectedMethod === "bkash" || selectedMethod === "nagad") && (
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold" style={{ color: "var(--corp-text)" }}>
                  {selectedMethod.toUpperCase()} মোবাইল নম্বর
                </label>
                <input
                  type="text"
                  placeholder="01711XXXXXX"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-xs outline-none bg-corp-bg-secondary border-2 border-corp-border text-corp-text font-mono font-extrabold"
                />
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-lg text-xs font-extrabold uppercase text-white bg-[#2563eb] hover:bg-blue-600 transition-all shadow-[3px_3px_0px_0px_#1e3a8a] border border-blue-300 flex items-center justify-center gap-2 cursor-pointer"
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

