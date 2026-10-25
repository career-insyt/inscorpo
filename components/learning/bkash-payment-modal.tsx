"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Check, ShieldCheck, AlertCircle, X, Sparkles, ArrowRight,
  Smartphone, Lock, RefreshCw, Zap, Award
} from "lucide-react";
import { isFreeAccessUser } from "@/lib/auth/whitelist";
import { BKASH_CONFIG, isExcelCourse, getExpectedCoursePrice } from "@/lib/payments/bkash-config";

interface BkashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseSlug: string;
  courseTitle: string;
  userEmail?: string;
  userName?: string;
  onSuccess: (enrollment: any) => void;
}

export function BkashPaymentModal({
  isOpen,
  onClose,
  courseSlug,
  courseTitle,
  userEmail = "",
  userName = "",
  onSuccess,
}: BkashPaymentModalProps) {
  const [candidateEmail, setCandidateEmail] = useState(userEmail || "");
  const [copied, setCopied] = useState(false);
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [accountHolderName, setAccountHolderName] = useState(userName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  const effectiveEmail = candidateEmail.trim();
  const priceBdt = getExpectedCoursePrice(courseSlug);
  const isExcel = isExcelCourse(courseSlug);
  const isWhitelisted = isFreeAccessUser(effectiveEmail);

  const handleCopyNumber = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(BKASH_CONFIG.ACCOUNT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!effectiveEmail || !effectiveEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address for course certification & access.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/payments/bkash-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: effectiveEmail,
          userName: userName || accountHolderName,
          courseSlug,
          courseTitle,
          senderNumber: isWhitelisted ? "INTERNAL_AUTHORIZED" : senderNumber,
          trxId: isWhitelisted ? `FREE-${Date.now()}` : trxId.trim().toUpperCase(),
          accountHolderName,
          amount: priceBdt,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Verification failed. Please check your transaction details.");
      }

      setSuccessData(data.enrollment);
      setTimeout(() => {
        onSuccess(data.enrollment);
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden my-8"
        >
          {/* Header Banner */}
          <div className="bg-[#E2136E] text-white p-5 border-b-2 border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0 overflow-hidden">
                <img
                  src={BKASH_CONFIG.LOGO_URL}
                  alt="bKash Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-200 block">
                  bKash Personal Payment
                </span>
                <h3 className="text-base sm:text-lg font-black leading-tight">
                  কোর্স এনরোলমেন্ট ও ভেরিফিকেশন
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-950 flex items-center justify-center border-2 border-slate-900 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Success Overlay View */}
            {successData ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 border-2 border-slate-900 text-emerald-600 flex items-center justify-center shadow-[4px_4px_0px_0px_#059669]">
                  <Check size={32} strokeWidth={3} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-950">পেমেন্ট ভেরিফাইড ও সফল!</h4>
                  <p className="text-xs text-slate-600 font-sans">
                    আপনার কোর্স আনলক করা হয়েছে। এখনই ক্লাস শুরু হচ্ছে...
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-900 text-xs space-y-1 text-left font-sans">
                  <p><strong>Course:</strong> {courseTitle}</p>
                  <p><strong>TrxID:</strong> <span className="font-mono font-bold text-[#E2136E]">{successData.trxId}</span></p>
                  <p><strong>Amount:</strong> ৳{successData.amountPaidBdt?.toFixed(2)} BDT</p>
                </div>
              </div>
            ) : isWhitelisted ? (
              /* Whitelisted Corporate User View */
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-xl border-2 border-slate-900 bg-emerald-50 text-emerald-950 space-y-2 shadow-[3px_3px_0px_0px_#059669]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-600" />
                    <span className="font-black text-sm uppercase">Corporate Staff / VIP Access</span>
                  </div>
                  <p className="text-xs font-sans text-emerald-900 leading-relaxed">
                    আপনার অ্যাকাউন্ট <strong>{userEmail}</strong> অনুমোদিত ভিআইপি ও ইনসাইট টিমের অন্তর্ভুক্ত। আপনি কোনো পেমেন্ট ছাড়াই এই কোর্সটি ১০০% ফ্রিতে অ্যাক্সেস করতে পারবেন।
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl border-2 border-slate-900 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>এনরোল সক্রিয় হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>ফ্রি অ্যাক্সেস চালু করুন →</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Standard Payment & Verification View */
              <>
                {/* Course Target & Price Pill */}
                <div className="p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50 flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block truncate">
                      Selected Course
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-950 block truncate">
                      {courseTitle}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      Payable Fee
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#E2136E] font-mono">
                      ৳{priceBdt.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Receiver bKash Number Box with 1-Click Copy */}
                <div className="p-4 rounded-xl border-2 border-slate-900 bg-amber-50 space-y-2 shadow-[3px_3px_0px_0px_#d97706]">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1.5 uppercase font-mono">
                      <Smartphone size={14} className="text-[#E2136E]" />
                      bKash Personal (Send Money)
                    </span>
                    <span className="text-[10px] font-black bg-amber-300 text-slate-950 px-2 py-0.5 rounded border border-slate-900">
                      সেন্ড মানি
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-slate-950 select-all">
                      {BKASH_CONFIG.ACCOUNT_NUMBER}
                    </span>

                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-950 font-sans leading-tight">
                    বিকাশ অ্যাপ বা *247# থেকে <strong>Send Money</strong> অপশন ব্যবহার করে ঠিক <strong>৳{priceBdt.toFixed(2)}</strong> পাঠান।
                  </p>
                </div>

                {/* Verification Form */}
                <form onSubmit={handleVerify} className="space-y-3.5">
                  {errorMessage && (
                    <div className="p-3 rounded-lg border-2 border-rose-500 bg-rose-50 text-rose-800 text-xs font-sans font-medium flex items-start gap-2">
                      <AlertCircle size={15} className="text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Account Email Field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-slate-700 block">
                      Account Email (for Course License & Access) *
                    </label>
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="e.g. yourname@domain.com"
                      className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-slate-700 block">
                        Sender Mobile Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        placeholder="017XXXXXXXX"
                        maxLength={11}
                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase text-slate-700 block">
                        bKash TrxID *
                      </label>
                      <input
                        type="text"
                        required
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                        placeholder="e.g. BKA8X9Z10Q"
                        maxLength={12}
                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 text-xs font-mono font-black uppercase text-[#E2136E] focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-slate-700 block">
                      bKash Account Holder Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="e.g. Shakib Al Hasan"
                      className="w-full px-3 py-2 rounded-lg border-2 border-slate-900 text-xs font-sans font-bold focus:outline-none focus:ring-2 focus:ring-[#E2136E]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-4 rounded-xl border-2 border-slate-900 bg-[#E2136E] hover:bg-[#c20f5e] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>ভেরিফাই করা হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        <span>ভেরিফাই করুন ও কোর্স আনলক করুন →</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-sans text-center pt-1">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>অটোমেটেড ইনস্ট্যান্ট ট্রানজ্যাকশন ভেরিফিকেশন ইঞ্জিন সক্রিয়।</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
