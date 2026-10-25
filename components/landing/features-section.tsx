"use client";

import { motion } from "framer-motion";
import {
  BookOpen, Brain, Target, Cpu, ShoppingBag, Users,
  ArrowRight, BarChart3, Shield, Zap, Flame, Award
} from "lucide-react";

const features = [
  {
    title: "Adaptive Mock Test Engine",
    description: "Timed cognitive assessments with negative marking, adaptive difficulty curves, talent percentile rankings, and institutional error forensics.",
    icon: Target,
    tag: "MODULE // 01 · TESTING",
    shadow: "#2563eb",
    span: "md:col-span-2",
  },
  {
    title: "Cryptographic Career Passport",
    description: "Your verifiable talent ledger. Cryptographically signed skill credentials, tamper-proof project hashes, and recruiter-ready verified exports.",
    icon: Shield,
    tag: "MODULE // 02 · IDENTITY",
    shadow: "#059669",
    span: "",
  },
  {
    title: "Daily Practice & Streak Engine",
    description: "Every action drives momentum. Daily practice missions, consecutive consistency streaks, skill acceleration, and tiered talent promotions.",
    icon: Flame,
    tag: "MODULE // 03 · DISCIPLINE",
    shadow: "#d97706",
    span: "",
  },
  {
    title: "AI Executive Copilot Suite",
    description: "AI Resume Forensics, Socratic STAR Mock Interview Proctor, BLUF Boardroom Memo Drafter, and Institutional Skill Gap Radar.",
    icon: Brain,
    tag: "MODULE // 04 · INTELLIGENCE",
    shadow: "#7c3aed",
    span: "md:col-span-2",
  },
  {
    title: "Institutional Sandbox Capstones",
    description: "Real-world financial models, seeded FMCG sales data, PVM variance bridges, and Power BI dashboards built from audited corporate case studies.",
    icon: BookOpen,
    tag: "MODULE // 05 · SIMULATION",
    shadow: "#0891b2",
    span: "",
  },
  {
    title: "Career Vouchers & Certification Market",
    description: "Redeem career perks for professional exam vouchers, resume review passes, mock interview tokens, and Pro membership tiers.",
    icon: ShoppingBag,
    tag: "MODULE // 06 · CERTIFICATIONS",
    shadow: "#e11d48",
    span: "",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="hidden md:block relative py-20 sm:py-28 overflow-hidden bg-[#F0F7FF] border-b-2 border-slate-900 font-mono">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#0f172a]">
            <Zap size={14} className="text-slate-950 fill-slate-950" />
            <span>PLATFORM OPERATING CAPABILITIES</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
            Built for Elite Corporate Competency.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-sans font-normal leading-relaxed">
            A comprehensive talent operating system structured around high-stakes corporate execution, verified skill credentials, and daily accountability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl p-6 sm:p-7 border-2 border-slate-900 bg-white transition-all duration-200 hover:-translate-y-1 ${feature.span}`}
                style={{
                  boxShadow: `6px 6px 0px 0px ${feature.shadow}`,
                }}
              >
                <div className="space-y-4">
                  {/* Top Bar: Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 pt-1">
                    <div 
                      className="w-12 h-12 rounded-xl border-2 border-slate-900 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_#0f172a]"
                      style={{ backgroundColor: `${feature.shadow}20`, color: feature.shadow }}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-950 font-sans group-hover:text-[#2563eb] transition-colors">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
