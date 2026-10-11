"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Sparkles, TrendingUp, Award, Users, 
  CheckCircle2, ShieldCheck, BookOpen, Activity, ChevronRight, Zap
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { fetchGlobalStats } from "@/lib/db";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-mono font-black text-2xl sm:text-3xl text-slate-900">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function HeroSection() {
  let user = null;
  try {
    const authCtx = useAuth();
    if (authCtx?.user) user = authCtx.user;
  } catch {}

  const [stats, setStats] = useState({
    activeLearners: 14200,
    totalPaths: 5,
    totalCourses: 53,
    verifiedCredentials: 8900,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await fetchGlobalStats();
      if (data && (data.activeLearners > 0 || data.totalPaths > 0)) {
        setStats({
          activeLearners: Math.max(data.activeLearners, 14200),
          totalPaths: 5,
          totalCourses: 53,
          verifiedCredentials: 8900,
        });
      }
    }
    loadStats();
  }, []);

  return (
    <section 
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden bg-[#F0F7FF] font-bangla"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px"
      }}
    >
      {/* Sky Blue Ambient Radial Spotlights */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-400/20 blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-400/15 blur-[120px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Bangla Hero Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-7"
          >
            {/* Glassmorphic Pill Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md bg-white/80 border border-white/90 text-[#2563eb] shadow-[0_4px_16px_rgba(37,99,235,0.08)]"
            >
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              <span>আপনার আধুনিক কর্পোরেট ক্যারিয়ার অপারেটিং সিস্টেম</span>
            </motion.div>

            {/* Main Headline in Bangla with Volte Bangla styling */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.2] tracking-tight text-slate-900">
              কর্পোরেট ক্যারিয়ারে এগিয়ে যান <br className="hidden sm:inline" />
              <span className="text-[#2563eb] drop-shadow-sm">
                রিয়েল-ওয়ার্ল্ড দক্ষতার সাথে।
              </span>
            </h1>

            {/* Subtitle in clean, accessible Bangla */}
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-700 max-w-2xl font-normal">
              শীর্ষস্থানীয় করপোরেট এমটিও ও বিজনেস অ্যানালিস্টদের মতো নিজেকে প্রস্তুত করুন। এক্সেল ফিনান্সিয়াল মডেলিং, পাইথন ডাটা অটোমেশন, পাওয়ার বিআই এবং এআই ওয়ার্কফ্লো—সবকিছুই হ্যান্ডস-অন প্রজেক্ট এবং ভেরিফায়েড ক্রেডেনশিয়ালের মাধ্যমে।
            </p>

            {/* Action Buttons: Heavy Glassmorphic & Mobile-First */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="#tracks"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/25 active:scale-[0.98] border border-blue-400/40"
              >
                <BookOpen size={18} />
                <span>ক্যারিয়ার ট্র্যাক বাছাই করুন</span>
                <ArrowRight size={17} />
              </Link>
              
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-slate-800 backdrop-blur-xl bg-white/80 hover:bg-white border border-white/90 rounded-2xl transition-all duration-200 shadow-md shadow-slate-200/60 active:scale-[0.98]"
              >
                <Activity size={18} className="text-[#2563eb]" />
                <span>ড্যাশবোর্ডে প্রবেশ করুন</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 font-semibold pt-1">
              <span className="flex items-center gap-1.5 backdrop-blur-md bg-white/60 px-3 py-1.5 rounded-xl border border-white/80 shadow-xs">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                ক্লাউড ডাটাবেস-ব্যাকড প্রগ্রেস
              </span>
              <span className="flex items-center gap-1.5 backdrop-blur-md bg-white/60 px-3 py-1.5 rounded-xl border border-white/80 shadow-xs">
                <ShieldCheck size={16} className="text-[#2563eb] shrink-0" />
                W3C ভেরিফায়েড ডিজিটাল সার্টিফিকেট
              </span>
              <span className="flex items-center gap-1.5 backdrop-blur-md bg-white/60 px-3 py-1.5 rounded-xl border border-white/80 shadow-xs">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                ১০০% প্র্যাকটিক্যাল কেস স্টাডি
              </span>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Showcase with Custom Vector Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Blur */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-sky-300/20 to-amber-300/15 rounded-3xl blur-2xl pointer-events-none" />

            {/* Heavy Glassmorphic Container Card */}
            <div className="relative rounded-3xl backdrop-blur-2xl bg-white/75 border border-white/90 p-5 sm:p-7 shadow-[0_16px_40px_rgba(37,99,235,0.09)] space-y-5">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-blue-100/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    LIVE TALENT OPERATING SYSTEM
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200">
                  CAREERINSYT
                </span>
              </div>

              {/* Vector Graphic: Rocket Launch Mind Illustration */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100/60 to-blue-50/40 p-4 border border-white/80 flex flex-col items-center justify-center">
                <img 
                  src="/illustrations/vector_rocket_mind.png" 
                  alt="Career Acceleration Vector Illustration" 
                  className="w-48 sm:w-56 h-auto object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
                
                <div className="mt-3 text-center">
                  <span className="text-sm font-extrabold text-slate-900 block">
                    ক্যারিয়ার এক্সিলারেশন ফ্রেমওয়ার্ক
                  </span>
                  <span className="text-xs text-slate-600">
                    সঠিক স্কিল সেটের মাধ্যমে নিশ্চিত করুন কর্পোরেট পদোন্নতি
                  </span>
                </div>
              </div>

              {/* Key Quantitative Stats in Frosted Glass Cards */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl backdrop-blur-md bg-white/80 border border-white/90 shadow-sm space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block">অ্যাক্টিভ লার্নার</span>
                  <div className="flex items-baseline gap-1">
                    <AnimatedCounter target={stats.activeLearners} suffix="+" />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl backdrop-blur-md bg-white/80 border border-white/90 shadow-sm space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block">ফ্ল্যাগশিপ ট্র্যাক</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-black text-2xl sm:text-3xl text-[#2563eb]">৫টি</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl backdrop-blur-md bg-white/80 border border-white/90 shadow-sm space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block">প্র্যাকটিক্যাল মডিউল</span>
                  <div className="flex items-baseline gap-1">
                    <AnimatedCounter target={stats.totalCourses} suffix="+" />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl backdrop-blur-md bg-white/80 border border-white/90 shadow-sm space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block">ক্রেডেনশিয়াল ইস্যু</span>
                  <div className="flex items-baseline gap-1">
                    <AnimatedCounter target={stats.verifiedCredentials} suffix="+" />
                  </div>
                </div>
              </div>

              {/* Instant Launch Link */}
              <Link 
                href="/dashboard"
                className="w-full py-3 px-4 rounded-xl backdrop-blur-md bg-blue-600/10 hover:bg-blue-600/15 border border-blue-400/30 text-blue-700 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors"
              >
                <span>ক্যারিয়ার পাসপোর্ট ও স্কিল ম্যাট্রিক্স দেখুন</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Ultra Mobile Bottom Floating Dock for Instant Action */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 backdrop-blur-xl bg-white/90 border border-white/90 rounded-2xl shadow-xl p-2.5 flex items-center gap-2">
        <Link 
          href="#tracks" 
          className="flex-1 py-3 text-center rounded-xl bg-[#2563eb] text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95"
        >
          ক্যারিয়ার ট্র্যাক দেখুন
        </Link>
        <Link 
          href="/dashboard" 
          className="flex-1 py-3 text-center rounded-xl bg-slate-100 text-slate-900 text-xs font-bold border border-slate-200 active:scale-95"
        >
          ড্যাশবোর্ড
        </Link>
      </div>
    </section>
  );
}
