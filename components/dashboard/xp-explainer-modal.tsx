"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Award, BookOpen, ClipboardList, Flame, CheckCircle2 } from "lucide-react";
import { UserState } from "@/lib/state/types";

interface XpExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  state?: UserState;
}

export function XpExplainerModal({ isOpen, onClose, state }: XpExplainerModalProps) {
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
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border-4 border-slate-950 bg-white text-slate-950 p-6 sm:p-8 space-y-6 z-10 shadow-[10px_10px_0px_0px_#10b981]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-950 flex items-center justify-center border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000] font-black transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-400 text-emerald-950 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
              <ShieldCheck size={14} /> PROOF-OF-WORK VERIFICATION
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-950">
              CANDIDATE STANDING
            </h2>
            <p className="text-xs font-sans font-bold text-slate-600">
              Evaluated on concrete project deliverables, daily practice consistency, and proctored technical evaluations.
            </p>
          </div>

          {/* Verification Status Card */}
          <div className="p-5 rounded-2xl border-3 border-slate-950 bg-slate-50 space-y-3 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-950">Verification Status</span>
              <span className="px-3 py-1 rounded-xl text-xs font-black uppercase bg-emerald-500 text-white border-2 border-slate-950 flex items-center gap-1">
                <CheckCircle2 size={13} /> Active
              </span>
            </div>
            <p className="text-xs font-sans text-slate-700">
              Candidate profile is actively indexed in the corporate hiring registry. Complete capstones and drills to elevate your recruiter match score.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-black text-xs uppercase text-white bg-slate-900 hover:bg-slate-800 transition-all border-3 border-slate-950 shadow-[4px_4px_0px_0px_#000] cursor-pointer"
          >
            GOT IT
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
