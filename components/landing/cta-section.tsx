"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-[#F0F7FF] border-b-2 border-slate-900 font-mono">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div 
          className="relative rounded-2xl border-2 border-slate-900 bg-[#2563eb] p-8 sm:p-14 text-center text-white overflow-hidden"
          style={{
            boxShadow: "8px 8px 0px 0px #0f172a",
          }}
        >
          {/* Subtle grid pattern inside CTA */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            {/* 20% Discount Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#0f172a]">
              <Flame size={14} className="text-slate-950 fill-amber-500" />
              <span>CLAIM 20% DISCOUNT ON YOUR FIRST COURSE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans leading-tight">
              Ready to Level Up <br />
              <span className="text-amber-300">Your Corporate Career?</span>
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-sans font-normal">
              Join thousands of corporate analysts, management trainees, and ambitious graduates leveling up on Bangladesh&apos;s leading career operating system.
            </p>

            {/* Brutalist Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-2 border-slate-900 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span>GET STARTED FREE</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust Checks */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100/90 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-amber-300" />
                No Credit Card Required
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
