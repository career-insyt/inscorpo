"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";

const ROUTE_MESSAGES: { route: string; text: string; cta: string }[] = [
  { route: "/mock-tests", text: "Unlock unlimited practice tests & detailed analytics", cta: "Go Pro" },
  { route: "/mock-interviews", text: "Get unlimited AI-powered mock interview sessions", cta: "Go Pro" },
  { route: "/ai", text: "Access the full 12-tool AI Suite — the ultimate career arsenal", cta: "Go Pro" },
  { route: "/certificates", text: "Generate verified, employer-trusted digital certificates", cta: "Go Pro" },
  { route: "/career-passport", text: "Export ATS-optimized executive PDF resumes instantly", cta: "Go Pro" },
  { route: "/learn", text: "Unlock all 5 flagship masterclasses & interactive practice gyms", cta: "Go Pro" },
];

const DEFAULT = {
  text: "Upgrade to unlock all flagship masterclasses, practice gyms & verified credentials —",
  brand: "INSYT Pro",
  cta: "Upgrade Now",
};

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

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden flex-shrink-0 relative z-30 hidden sm:block"
        >
          <div
            className="relative flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 text-[11px] sm:text-[12px] font-medium overflow-hidden font-sans"
            style={{
              background: "linear-gradient(90deg, #006effff 0%, #0099ffff 35%, #006effff 70%, #0099ffff 100%)",
              color: "#0f172a",
              borderBottom: "1.5px solid #93c5fd",
            }}
          >
            {/* Animated shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite",
              }}
            />

            {/* Crown icon */}
            <Crown size={14} className="flex-shrink-0 relative z-10 text-amber-500 fill-amber-400 drop-shadow-sm" />

            {/* Message */}
            <span className="relative z-10 text-center max-w-[400px] sm:max-w-none leading-tight font-bold text-slate-800">
              {match ? (
                <>
                  <span className="text-slate-700">{match.text} — </span>
                  <span className="font-black text-[#1e40af]">INSYT Pro</span>
                </>
              ) : (
                <>
                  <span className="text-white">{DEFAULT.text} </span>
                  <span className="font-black text-[#0004ff]">{DEFAULT.brand}</span>
                </>
              )}
            </span>

            {/* CTA Button: Red background with white text, labeled 'Update Now' */}
            <Link
              href="/subscription"
              className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wide transition-all hover:brightness-110 hover:scale-105 active:scale-95 flex-shrink-0 ml-1 shadow-md cursor-pointer"
              style={{
                background: "#dc2626",
                color: "#ffffff",
                border: "1px solid #b91c1c",
                boxShadow: "0 2px 8px rgba(220,38,38,0.4)",
              }}
            >
              <Zap size={11} className="fill-white text-white" />
              <span>Update Now</span>
              <ChevronRight size={11} className="text-white" />
            </Link>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="relative z-10 w-7 h-7 rounded-md flex items-center justify-center hover:bg-black/5 transition-colors flex-shrink-0 ml-0.5 active:scale-95 text-slate-500 hover:text-slate-900"
              aria-label="Dismiss banner"
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
