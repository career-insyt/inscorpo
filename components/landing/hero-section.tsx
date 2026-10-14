"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Sparkles, Award, 
  CheckCircle2, ShieldCheck, BookOpen, Activity, ChevronRight, Zap, Check, Flame
} from "lucide-react";
import Link from "next/link";
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
          const duration = 1500;
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
  const [stats, setStats] = useState({
    activeLearners: 14200,
    totalPaths: 5,
    totalCourses: 53,
    verifiedCredentials: 8900,
  });

  // Interactive Live Hero Quests Simulation
  const [completedQuests, setCompletedQuests] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
  });

  const toggleQuest = (idx: number) => {
    setCompletedQuests(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(completedQuests).filter(Boolean).length;
  const currentXp = 2700 + completedCount * 75;

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
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden bg-[#F0F7FF] font-bangla border-b-2 border-slate-900"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px"
      }}
    >
      {/* Brutalist Blue Ambient Accent Spotlights */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Gamified Brutalist Hero Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-7"
          >
            {/* Brutalist System Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-amber-300 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#0f172a]"
            >
              <Zap size={14} className="text-slate-950 fill-slate-950" />
              <span>// TALENT OPERATING SYSTEM · v2.4</span>
            </motion.div>

            {/* Main Headline with Brutalist Pop */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-black leading-[1.18] tracking-tight text-slate-950">
              কর্পোরেট ক্যারিয়ারে এগিয়ে যান <br className="hidden sm:inline" />
              <span className="text-white bg-[#2563eb] px-3 py-1 border-2 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] inline-block mt-2">
                গ্যামিফায়েড দক্ষতার সাথে।
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 max-w-2xl font-normal">
              শীর্ষস্থানীয় করপোরেট এমটিও ও বিজনেস অ্যানালিস্টদের মতো নিজেকে প্রস্তুত করুন। এক্সেল ফিনান্সিয়াল মডেলিং, পাইথন ডাটা অটোমেশন, পাওয়ার বিআই এবং এআই ওয়ার্কফ্লো—সবকিছুই হ্যান্ডস-অন প্রজেক্ট এবং ভেরিফায়েড ক্রেডেনশিয়ালের মাধ্যমে।
            </p>

            {/* Action Buttons: Hard Brutalist Drop-Shadows & Tactile Presses */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="#tracks"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-mono font-black text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl border-2 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all"
              >
                <BookOpen size={18} />
                <span>ক্যারিয়ার ট্র্যাক বাছাই করুন</span>
                <ArrowRight size={17} />
              </Link>
              
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-mono font-black text-slate-950 bg-white hover:bg-slate-50 rounded-xl border-2 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all"
              >
                <Activity size={18} className="text-[#2563eb]" />
                <span>লাইভ ড্যাশবোর্ড দেখুন</span>
              </Link>
            </div>

            {/* Brutalist Trust Highlights */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono font-bold text-slate-800">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                ক্লাউড ডাটাবেস-ব্যাকড
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <ShieldCheck size={15} className="text-[#2563eb] shrink-0" />
                W3C ED25519 ভেরিফায়েড
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <Sparkles size={15} className="text-amber-500 shrink-0" />
                ১০০% প্র্যাকটিক্যাল কেস স্টাডি
              </span>
            </div>
          </motion.div>

          {/* Right Column: Live Gamified Candidate Cockpit Preview (Brutalist Card) */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main Brutalist Cockpit Card */}
            <div className="relative rounded-2xl bg-white border-2 border-slate-900 p-6 sm:p-7 shadow-[8px_8px_0px_0px_#2563eb] space-y-5 font-mono">
              
              {/* Header: Level & Streak Badges */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] flex items-center gap-1">
                    <Award size={13} />
                    LEVEL 14 ANALYST
                  </span>
                </div>
                
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border-2 border-amber-500 shadow-[2px_2px_0px_0px_#d97706]">
                  <Flame size={14} className="text-amber-600 fill-amber-500" />
                  12-DAY STREAK
                </span>
              </div>

              {/* XP Gauge Meter */}
              <div className="space-y-1.5 p-3.5 rounded-xl border-2 border-slate-900 bg-slate-50">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-slate-900 font-black">
                    <Zap size={14} className="text-blue-600 fill-blue-600" />
                    EXPERIENCE POINTS
                  </span>
                  <span className="font-black text-[#2563eb]">{currentXp.toLocaleString()} / 3,000 XP</span>
                </div>
                <div className="h-3 w-full rounded-full border-2 border-slate-900 bg-slate-200 overflow-hidden p-0.5">
                  <motion.div 
                    className="h-full rounded-full bg-[#2563eb]"
                    initial={{ width: "70%" }}
                    animate={{ width: `${(currentXp / 3000) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Institutional Readiness Gauge */}
              <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#059669] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    COMPETENCY BENCHMARK
                  </span>
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-400">
                    HIGH CONFIDENCE
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <h3 className="text-xl font-black text-slate-950">
                    88<span className="text-xs text-slate-500">/100</span> READINESS
                  </h3>
                  <span className="text-xs font-black text-emerald-700">
                    TOP 3% PERCENTILE
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 pt-0.5">
                  FMCG MTO &amp; Corporate Commercial Banking Calibrated
                </p>
              </div>

              {/* Interactive Quest Engine Teaser */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#2563eb]" />
                    DAILY QUEST ENGINE ({completedCount}/3)
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    CLICK TO TOGGLE
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 0, title: "3-Statement FAST Model Drill", xp: "+75 XP", tag: "Finance" },
                    { id: 1, title: "Power BI Star Schema & DAX Bridge", xp: "+75 XP", tag: "BI" },
                    { id: 2, title: "STAR Proctored Mock Interview", xp: "+100 XP", tag: "Interview" },
                  ].map((q) => {
                    const done = completedQuests[q.id];
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => toggleQuest(q.id)}
                        className={`w-full p-2.5 rounded-lg border-2 border-slate-900 flex items-center justify-between text-left transition-all ${
                          done 
                            ? "bg-emerald-50 text-slate-900 shadow-[2px_2px_0px_0px_#059669]" 
                            : "bg-white text-slate-700 hover:bg-slate-50 shadow-[2px_2px_0px_0px_#0f172a]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 border-slate-900 flex items-center justify-center ${done ? "bg-emerald-500 text-white" : "bg-white"}`}>
                            {done && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className={`text-xs font-bold ${done ? "line-through text-slate-500" : "text-slate-900"}`}>
                            {q.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
                          {q.xp}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Launch Link */}
              <Link 
                href="/dashboard"
                className="w-full py-3 px-4 rounded-xl border-2 border-slate-900 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center justify-between shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span>ENTER FULL COMMAND CENTER</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Bottom Brutalist KPI Counters Bar */}
        <div className="mt-14 pt-8 border-t-2 border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#2563eb] space-y-1">
            <span className="text-[11px] font-mono font-black text-slate-500 uppercase block">ACTIVE CANDIDATES</span>
            <div className="flex items-baseline gap-1">
              <AnimatedCounter target={stats.activeLearners} suffix="+" />
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#d97706] space-y-1">
            <span className="text-[11px] font-mono font-black text-slate-500 uppercase block">CAREER TRACKS</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-black text-2xl sm:text-3xl text-[#2563eb]">৫টি ট্র্যাক</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#059669] space-y-1">
            <span className="text-[11px] font-mono font-black text-slate-500 uppercase block">PRACTICAL MODULES</span>
            <div className="flex items-baseline gap-1">
              <AnimatedCounter target={stats.totalCourses} suffix="+" />
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_#7c3aed] space-y-1">
            <span className="text-[11px] font-mono font-black text-slate-500 uppercase block">W3C CREDENTIALS</span>
            <div className="flex items-baseline gap-1">
              <AnimatedCounter target={stats.verifiedCredentials} suffix="+" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
