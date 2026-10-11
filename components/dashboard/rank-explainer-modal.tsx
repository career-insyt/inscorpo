"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, ShieldCheck, Crown, Star, Sparkles, Flame, CheckCircle2, Award, Briefcase } from "lucide-react";
import { UserState } from "@/lib/state/types";

interface RankExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  state?: UserState;
}

const TALENT_TIERS = [
  {
    name: "Tier 1: Registered Candidate",
    badgeBg: "bg-slate-300 text-slate-900",
    description: "Verified institutional credentials, enrolled in flagship employability tracks.",
    perk: "Access to Standard Practice Simulations & Career Hub.",
  },
  {
    name: "Tier 2: Proof-of-Work Scholar",
    badgeBg: "bg-amber-400 text-amber-950",
    description: "Submitted and validated production-grade capstones (CapCut / Excel / Presentation Engineering).",
    perk: "W3C Verified Credentials + Searchable in Talent Index.",
  },
  {
    name: "Tier 3: Proctored Executive",
    badgeBg: "bg-sky-400 text-sky-950",
    description: "Completed AI STAR behavioral interviews with 90%+ webcam & gaze proctoring integrity.",
    perk: "Verified Interview Transcripts attached to Career Passport.",
  },
  {
    name: "Tier 4: Recruiter Shortlist (Top 5%)",
    badgeBg: "bg-emerald-500 text-white",
    description: "Overall Employability Index above 90% across technical, communication, and analytical benchmarks.",
    perk: "Direct interview fast-track with partner FMCG, Telco, and Commercial Banks.",
  },
];

export function RankExplainerModal({ isOpen, onClose, state }: RankExplainerModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-mono">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-4 border-slate-950 bg-white text-slate-950 p-6 sm:p-8 space-y-6 z-10 shadow-[10px_10px_0px_0px_#2563eb]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] font-black transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-amber-400 text-amber-950 border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000]">
              <ShieldCheck size={16} /> TALENT INDEX & VERIFICATION ARCHITECTURE
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 flex items-center gap-2">
              <span>HOW CANDIDATES ARE VERIFIED</span>
            </h2>
            <p className="text-xs font-sans font-bold text-slate-700 leading-relaxed">
              INSYT Corporate replaces arbitrary gamification points with cryptographic proof-of-work, validated capstones, and proctored behavioral simulations.
            </p>
          </div>

          {/* Current Candidate Status Hero Card */}
          <div className="p-6 rounded-2xl border-4 border-slate-950 bg-blue-600 text-white space-y-4 shadow-[6px_6px_0px_0px_#1e3a8a] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-xl text-xs font-black uppercase bg-emerald-400 text-emerald-950 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
                  ACTIVE STANDING
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider flex items-center gap-2 pt-1 text-white">
                  <span>CORPORATE SCHOLAR</span>
                </h3>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-amber-300 text-amber-950 border-2 border-slate-950 font-black text-xs uppercase shadow-[3px_3px_0px_0px_#000] flex items-center gap-1.5">
                <Briefcase size={14} /> RECRUITER INDEX: 94%
              </div>
            </div>

            {/* Recruiter Readiness Gauge */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-black">
                <span>RECRUITER MATCH READINESS</span>
                <span>94%</span>
              </div>
              <div className="h-4 rounded-xl border-2 border-slate-950 bg-slate-900 p-0.5 overflow-hidden">
                <div className="h-full rounded-lg bg-emerald-400 w-[94%]" />
              </div>
              <p className="text-[11px] font-bold text-blue-100 text-right">
                High-priority recommendation in partner employer hiring pools.
              </p>
            </div>
          </div>

          {/* All Tiers Showcase Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-950 tracking-wider flex items-center gap-2">
              <Award size={16} className="text-blue-600" /> CANDIDATE VERIFICATION TIERS
            </h3>

            <div className="space-y-3">
              {TALENT_TIERS.map((tier, idx) => (
                <div
                  key={tier.name}
                  className="p-4 rounded-2xl border-2 border-slate-950 bg-slate-50 text-slate-900 shadow-[3px_3px_0px_0px_#000] space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 rounded-xl font-black text-[11px] uppercase border-2 border-slate-950 ${tier.badgeBg}`}>
                      {tier.name}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={13} /> W3C Standard
                    </span>
                  </div>
                  <p className="text-xs font-sans font-semibold text-slate-800 pt-1">
                    {tier.description}
                  </p>
                  <p className="text-[11px] font-mono font-bold text-blue-700">
                    Perk: {tier.perk}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-black text-xs uppercase text-white bg-blue-600 hover:bg-blue-700 transition-all border-4 border-slate-950 shadow-[6px_6px_0px_0px_#000] cursor-pointer"
          >
            CONTINUE PRACTICE &amp; CERTIFICATION
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
