"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Sparkles, TrendingUp, Award, Users, 
  Flame, CheckCircle2, ShieldCheck, BookOpen, Activity, Check, ChevronRight
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
          const duration = 1800;
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-mono font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900">
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

  const dynamicStats = [
    { label: "Active Professionals", value: stats.activeLearners, suffix: "+", icon: Users },
    { label: "Flagship Career Tracks", value: stats.totalPaths, suffix: "", icon: Sparkles },
    { label: "Curriculum Masterclasses", value: stats.totalCourses, suffix: "+", icon: TrendingUp },
    { label: "Cryptographic Credentials", value: stats.verifiedCredentials, suffix: "+", icon: Award },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#F7F8FC]">
      {/* Light Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.45] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }} 
      />

      {/* Soft Blue Center Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-blue-400/10 blur-[130px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 sm:space-y-7"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase bg-white border border-slate-200 text-[#2563eb] shadow-sm"
            >
              <Sparkles size={13} className="text-[#2563eb]" />
              <span>THE ENTERPRISE CAREER OPERATING SYSTEM</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.12] tracking-tight text-slate-900">
              Master the Skills That <br className="hidden sm:inline" />
              <span className="text-[#2563eb]">
                Command Corporate Authority.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-xl font-normal">
              High-stakes executive training in Financial Modeling, Enterprise Python Automation, Power BI & SQL, Applied Workplace AI, and Media Production. Backed by tamper-proof W3C credentials and an interactive Career Passport.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 text-[15px] font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-[0.98]"
              >
                <span>Launch Dashboard</span>
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="#tracks"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 text-[15px] font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                <BookOpen size={16} className="text-[#2563eb]" />
                <span>Choose Career Track</span>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Database-Backed Progress
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                W3C VC 2.0 Cryptographic Proof
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#2563eb]" />
                Zero Hallucination Architecture
              </span>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Light UI Cockpit Shell */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Soft Ambient Shadow */}
            <div className="absolute -inset-2 bg-blue-500/10 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

            {/* Window Container */}
            <div className="relative rounded-2xl bg-white border-2 border-slate-200 shadow-xl overflow-hidden">
              
              {/* Window Header */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 font-semibold">careerinsyt.com/cockpit</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Activity size={10} />
                    LIVE TALENT NODE
                  </span>
                </div>
              </div>

              {/* Interface Body */}
              <div className="p-5 sm:p-6 space-y-4 bg-white">
                
                {/* Profile Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#2563eb] flex items-center justify-center font-black text-white shadow-sm flex-shrink-0">
                      {user ? "U" : "CA"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">Commercial Finance Lead</span>
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-blue-100 text-[#2563eb] border border-blue-200">
                          Verified
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">FAST Modeling &bull; Level 5 Certified</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-black flex-shrink-0">
                    <Flame size={13} className="text-amber-600 fill-amber-500" />
                    <span>5d</span>
                  </div>
                </div>

                {/* Active Completed Course Card */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        <Check size={15} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Corporate Financial & Commercial Modeling in Excel</h4>
                        <span className="text-[10px] font-mono text-emerald-700 font-semibold">100% Complete &bull; CCFCM Credential Issued</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      COMPLETED
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full w-full" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>53 Lessons Completed</span>
                    <span className="font-semibold text-slate-700">75 Hours Earned</span>
                  </div>
                </div>

                {/* Verified Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {[
                    "3-Statement FAST Model",
                    "PVM Variance Bridges",
                    "Power Query ETL",
                    "Debt Revolver Sweeps",
                    "Circularity Breakers",
                    "Executive C-Suite Memo"
                  ].map((skill) => (
                    <div 
                      key={skill}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono font-medium text-slate-700 flex items-center gap-1.5 truncate"
                    >
                      <CheckCircle2 size={11} className="text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Quick-Launch Bar */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Tamper-Proof W3C VC 2.0</span>
                <Link href="/career-passport" className="font-bold text-[#2563eb] hover:underline flex items-center gap-1">
                  <span>View Passport</span>
                  <ChevronRight size={13} />
                </Link>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Global Key Metrics Bar */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {dynamicStats.map((st, i) => (
              <div key={st.label} className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-semibold uppercase text-slate-500">
                  <st.icon size={14} className="text-[#2563eb]" />
                  <span>{st.label}</span>
                </div>
                <div>
                  <AnimatedCounter target={st.value} suffix={st.suffix} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
