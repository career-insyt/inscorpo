"use client";

import Link from "next/link";
import { Mail, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Learning Paths", href: "/learn" },
    { name: "Mock Test Engine", href: "/mock-tests" },
    { name: "Career Passport", href: "/career-passport" },
    { name: "AI Assistant Suite", href: "/ai" },
    { name: "XP Marketplace", href: "/marketplace" },
  ],
  programs: [
    { name: "Corporate Financial Modeler", href: "/learn/corporate-financial-modeler" },
    { name: "Executive Presentation", href: "/learn/presentation-engineering" },
    { name: "AI for Business & Work", href: "/learn/ai-for-work" },
    { name: "GRE / GMAT Prep", href: "/learn/gre-preparation" },
    { name: "Management Trainee Tracks", href: "/learn" },
  ],
  company: [
    { name: "About INSYT", href: "/about" },
    { name: "Job Board", href: "/jobs" },
    { name: "Community", href: "/community" },
    { name: "Pro Membership", href: "/subscription" },
    { name: "Privacy & Terms", href: "/help" },
  ],
};

export function FormalFooter() {
  return (
    <footer className="relative border-t border-blue-900/60 bg-gradient-to-b from-[#0e214d] via-[#0b1b40] to-[#07132e] text-white pt-10 pb-8 overflow-hidden">
      {/* Website Blue Ambient Top Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[1px] bg-gradient-to-r from-transparent via-[#3B5BDB] to-transparent" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Main Grid — Concise 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-blue-900/40">
          {/* Brand & Compact Overview */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="inline-flex flex-col group" title="CAREERINSYT">
              <img 
                src="/logo/logoTextWhite.png" 
                alt="CAREERINSYT" 
                className="h-7 w-auto object-contain group-hover:opacity-90 transition-opacity" 
              />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-blue-300/80 mt-1">
                Career OS
              </span>
            </Link>

            <p className="text-[13px] leading-relaxed text-blue-100/75 max-w-sm">
              The executive-grade Career Operating System for Bangladesh&apos;s corporate candidates, management trainees, and business leaders.
            </p>

            {/* Quick Contact & Status in one concise flex row */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-blue-200/80">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-blue-400" />
                Dhaka, Bangladesh
              </span>
              <a href="mailto:hello@insyt.co" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={13} className="text-blue-400" />
                hello@insyt.co
              </a>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-[11px] text-blue-200">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span>Operational</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-blue-200/90 mb-3">
              Platform
            </h3>
            <ul className="space-y-2 text-[13px]">
              {footerLinks.platform.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-blue-100/70 hover:text-white transition-colors duration-150">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-blue-200/90 mb-3">
              Programs
            </h3>
            <ul className="space-y-2 text-[13px]">
              {footerLinks.programs.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-blue-100/70 hover:text-white transition-colors duration-150">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-blue-200/90 mb-3">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-[13px]">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-blue-100/70 hover:text-white transition-colors duration-150">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar — Clean, concise metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-blue-300/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-blue-400" />
            <span>&copy; {new Date().getFullYear()} INSYT Corporate. All rights reserved.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-blue-200/75">
            <a 
              href="https://linkedin.com/company/insytcorporate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 text-[12px]"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={11} />
            </a>
            <a 
              href="https://facebook.com/insytcorporate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 text-[12px]"
            >
              <span>Facebook</span>
              <ArrowUpRight size={11} />
            </a>
            <a 
              href="https://youtube.com/@insytcorporate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 text-[12px]"
            >
              <span>YouTube</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
