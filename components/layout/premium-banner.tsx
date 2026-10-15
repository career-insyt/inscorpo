"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";

const ROUTE_MESSAGES: { route: string; text: string }[] = [
  { route: "/mock-tests", text: "আনলিমিটেড প্র্যাকটিস টেস্ট ও রিয়েল-টাইম অ্যানালিটিক্স আনলক করুন" },
  { route: "/mock-interviews", text: "আনলিমিটেড এআই-চালিত মক ইন্টারভিউ ও প্রিসাইজ ফিডব্যাক পান" },
  { route: "/challenges", text: "রিয়েল-লাইফ কর্পোরেট কেস সমাধান ও এক্সক্লুসিভ চ্যাম্পিয়নশিপে অংশ নিন" },
  { route: "/certificates", text: "শীর্ষ নিয়োগকারী ও এমএনসি-স্বীকৃত ডিজিটাল ভেরিফাইড সার্টিফিকেট অর্জন করুন" },
  { route: "/career-passport", text: "এক ক্লিকেই এক্সিকিউটিভ এটিএস-অপ্টিমাইজড রেজ্যুমে এক্সপোর্ট করুন" },
  { route: "/passport", text: "এক ক্লিকেই এক্সিকিউটিভ এটিএস-অপ্টিমাইজড রেজ্যুমে এক্সপোর্ট করুন" },
  { route: "/learn", text: "সবগুলো ফ্ল্যাগশিপ মাস্টারক্লাস ও ইন্টারেক্টিভ প্র্যাকটিস জিম সম্পূর্ণ আনলক করুন" },
  { route: "/events", text: "সকল কর্পোরেট ফ্ল্যাগশিপ ইভেন্ট ও কম্পিটিশনে অগ্রাধিকারভিত্তিক অ্যাক্সেস পান" },
  { route: "/opportunities", text: "প্রিমিয়াম কর্পোরেট ও রিসার্চ রিক্রুটমেন্ট ট্র্যাকে সরাসরি অগ্রাধিকার পান" },
  { route: "/jobs", text: "প্রিমিয়াম কর্পোরেট ও রিসার্চ রিক্রুটমেন্ট ট্র্যাকে সরাসরি অগ্রাধিকার পান" },
];

const DEFAULT_MESSAGE = "সবগুলো ফ্ল্যাগশিপ মাস্টারক্লাস, প্র্যাকটিস জিম ও ভেরিফাইড ক্রেডেনশিয়াল আনলক করতে এখনই যোগ দিন";

export function PremiumBanner() {
  const pathname = usePathname();
  const { state } = useUser();

  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("insyt-premium-banner-dismissed") === "true";
    }
    return false;
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const isStarter = !state.subscriptionTier || state.subscriptionTier === "starter";
  if (!isStarter || dismissed || !mounted) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("insyt-premium-banner-dismissed", "true");
    }
  };

  const match = ROUTE_MESSAGES.find((item) => pathname.startsWith(item.route));
  const displayMessage = match ? match.text : DEFAULT_MESSAGE;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden flex-shrink-0 relative z-30 hidden sm:block"
        >
          <div
            className="relative flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 sm:py-3.5 overflow-hidden border-b-2 border-blue-400/40 shadow-sm"
            style={{
              background: "linear-gradient(90deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)",
            }}
          >
            {/* Glittering yellow shine animation sweep on an interval */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="w-56 h-full absolute top-0 -left-56 pointer-events-none opacity-90"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 0%, rgba(250, 204, 21, 0.18) 28%, rgba(254, 240, 138, 0.95) 50%, rgba(250, 204, 21, 0.18) 72%, transparent 100%)",
                  filter: "drop-shadow(0 0 16px rgba(250, 204, 21, 0.75))",
                  animation: "yellowGlint 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                }}
              />
            </div>

            {/* Left Content: Careerinsyt white PNG Logo + Bold Volte Bangla Message */}
            <div className="relative z-10 flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <Link href="/dashboard" className="flex items-center shrink-0 hover:opacity-90 transition-opacity" title="CAREERINSYT">
                <img
                  src="/logo/logoTextWhite.png"
                  alt="Career INSYT"
                  className="h-5 sm:h-6 w-auto object-contain select-none filter drop-shadow-sm"
                />
              </Link>

              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />

              <p className="font-bangla font-bold text-white text-xs sm:text-[14px] leading-tight truncate drop-shadow-sm">
                {displayMessage}
              </p>
            </div>

            {/* Right Actions: Brutalist Yellow Button + Dismiss */}
            <div className="relative z-10 flex items-center gap-2.5 shrink-0">
              <Link
                href="/subscription"
                className="px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-[13px] font-black font-bangla text-slate-950 bg-[#facc15] hover:bg-[#eab308] border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-1.5 cursor-pointer select-none"
              >
                <Zap size={13} className="fill-slate-950 text-slate-950 shrink-0" />
                <span>আপগ্রেড করুন</span>
                <ChevronRight size={13} className="text-slate-950 shrink-0" />
              </Link>

              <button
                onClick={handleDismiss}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/15 text-white/75 hover:text-white transition-colors shrink-0 active:scale-95 cursor-pointer"
                aria-label="Dismiss banner"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
