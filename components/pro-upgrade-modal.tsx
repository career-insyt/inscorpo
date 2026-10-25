"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BKASH_CONFIG } from "@/lib/payments/bkash-config";

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle?: string;
  featureDescription?: string;
}

const PRO_BENEFITS = [
  "Unlimited AI Mock Interviews & Executive Voice Analysis",
  "High-Resolution Vector ATS PDF Resumes with Selectable Text",
  "Access to all 8+ Executive Learning Paths & Certificates",
  "Unlimited Practice Assessments & Corporate Case Labs",
  "Verified Career Passport Credentials with W3C Cryptographic Proof",
];

export function ProUpgradeModal({
  isOpen,
  onClose,
  featureTitle = "Unlock INSYT Pro",
  featureDescription = "Upgrade your account to unlock this feature and supercharge your corporate career progression.",
}: ProUpgradeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and Escape listener (UX-08)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden z-10"
          style={{
            background: "linear-gradient(135deg, #0d1f3c 0%, #1a365d 60%, #1e3a5f 100%)",
            color: "#FFFFFF",
            border: "1px solid rgba(240, 208, 128, 0.3)",
          }}
        >
          {/* Shimmer Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.1) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F0D080] to-[#C9A84C] flex items-center justify-center text-[#0d1f3c] mb-4 shadow-lg">
            <Crown size={24} />
          </div>

          {/* Header */}
          <h2 id="pro-modal-title" className="text-xl font-extrabold tracking-tight text-white mb-1 flex items-center gap-2">
            {featureTitle} <Sparkles size={18} className="text-[#F0D080]" />
          </h2>
          <p className="text-xs text-white/70 mb-5 leading-relaxed">
            {featureDescription}
          </p>

          {/* Pro Benefits List */}
          <div className="space-y-2.5 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
            {PRO_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-white/90">
                <div className="w-4 h-4 rounded-full bg-[#F0D080]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={10} className="text-[#F0D080]" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2">
            <Link
              href="/subscription"
              onClick={onClose}
              className="w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-[#0d1f3c] flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity"
              style={{
                background: "linear-gradient(135deg, #F0D080, #C9A84C)",
              }}
            >
              <span>Upgrade to Pro — ৳{BKASH_CONFIG.SUBSCRIPTION_PRICES.pro}/mo</span>
              <ArrowRight size={14} />
            </Link>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
