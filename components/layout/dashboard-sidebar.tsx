"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, BookOpen, ClipboardList, FileText, Briefcase,
  Mic, Target, Zap, Award, Settings, HelpCircle,
  ChevronLeft, ChevronRight, Calendar, ShieldCheck
} from "lucide-react";
import { useUser } from "@/components/providers/user-context";
import { cn } from "@/lib/utils";

/* ─── 5-Pillar Canonical Product Architecture (Section 1 & 2) ─── */
function buildNavSections() {
  return {
    primaryPillars: [
      { icon: Rocket,        label: "Dashboard",       href: "/dashboard",     subLabel: "Career Command Center", color: "blue" },
      { icon: BookOpen,      label: "Learn",           href: "/learn",         subLabel: "Courses, Paths & Drills", color: "emerald" },
      { icon: ClipboardList, label: "Evaluate",        href: "/evaluate",      subLabel: "Assessments & Diagnostics", color: "red" },
      { icon: FileText,      label: "Career Passport", href: "/passport",      subLabel: "Proof-of-Work Identity", color: "blue", isNew: true },
      { icon: Briefcase,     label: "Opportunities",   href: "/opportunities", subLabel: "Curated Employer Matching", color: "rose" },
    ],
    contextualTools: {
      label: "Applied Practice & Tools",
      items: [
        { icon: Calendar, label: "Corporate Events", href: "/events", color: "blue" },
        { icon: Mic,    label: "AI Mock Interviews", href: "/mock-interviews", color: "indigo" },
        { icon: Target, label: "Career Strategy Hub", href: "/career-hub", color: "indigo" },
        { icon: Zap,    label: "Case Challenges",    href: "/challenges", color: "red" },
        { icon: Award,  label: "Credentials Archive", href: "/certificates", color: "blue" },
      ],
    },
    accountSection: {
      label: "System & Settings",
      items: [
        { icon: ShieldCheck, label: "Platform Auditor", href: "/audit", color: "blue", isNew: true },
        { icon: Settings,   label: "Settings",    href: "/settings", color: "slate" },
        { icon: HelpCircle, label: "Help Center", href: "/help",     color: "blue" },
      ],
    },
  };
}

const colorMap: Record<string, { bg: string; text: string; lightBg: string; border: string }> = {
  blue:    { bg: "#2563eb", text: "#ffffff", lightBg: "rgba(37,99,235,0.12)", border: "#1d4ed8" },
  indigo:  { bg: "#4f46e5", text: "#ffffff", lightBg: "rgba(79,70,229,0.12)", border: "#4338ca" },
  emerald: { bg: "#10b981", text: "#ffffff", lightBg: "rgba(16,185,129,0.12)", border: "#047857" },
  amber:   { bg: "#f59e0b", text: "#78350f", lightBg: "rgba(245,158,11,0.15)", border: "#b45309" },
  rose:    { bg: "#e11d48", text: "#ffffff", lightBg: "rgba(225,29,72,0.12)", border: "#9f1239" },
  red:     { bg: "#dc2626", text: "#ffffff", lightBg: "rgba(220,38,38,0.12)", border: "#991b1b" },
  slate:   { bg: "#64748b", text: "#ffffff", lightBg: "rgba(100,116,139,0.12)", border: "#334155" },
};

function isActive(href: string, pathname: string) {
  if (href === "/mock-interviews") {
    return pathname === "/mock-interviews" || pathname.startsWith("/mock-interviews/") || pathname === "/evaluate/interviews" || pathname.startsWith("/evaluate/interviews/");
  }
  if (href === "/cockpit" || href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/cockpit";
  }
  if (href === "/prepare" || href === "/learn") {
    return pathname === "/prepare" || pathname.startsWith("/prepare/") || pathname === "/learn" || pathname.startsWith("/learn/");
  }
  if (href === "/evaluate" || href === "/mock-tests") {
    // Explicitly exclude mock-interviews so Evaluate tab does NOT highlight when selecting AI Mock Interviews
    if (pathname.startsWith("/mock-interviews") || pathname.startsWith("/evaluate/interviews")) {
      return false;
    }
    return pathname === "/evaluate" || pathname === "/mock-tests" || pathname.startsWith("/mock-tests/");
  }
  if (href === "/passport" || href === "/career-passport") {
    return pathname === "/passport" || pathname.startsWith("/passport/") || pathname === "/career-passport" || pathname.startsWith("/career-passport/");
  }
  if (href === "/opportunities" || href === "/jobs") {
    return pathname === "/opportunities" || pathname.startsWith("/opportunities/") || pathname === "/jobs" || pathname.startsWith("/jobs/");
  }
  return pathname === href || pathname.startsWith(href + "/");
}

interface NavItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  subLabel?: string;
  href: string;
  color: string;
  isNew?: boolean;
}

function NavLink({ item, collapsed, active }: { item: NavItem; collapsed: boolean; active: boolean }) {
  const col = colorMap[item.color] || colorMap.blue;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-180 font-mono font-extrabold select-none min-h-[44px]",
        collapsed ? "justify-center px-0" : "",
        active ? "border-2" : "border-2 border-transparent hover:bg-corp-bg-secondary"
      )}
      style={
        active
          ? {
              background: col.bg,
              color: col.text,
              borderColor: col.border,
              boxShadow: `3px 3px 0px 0px ${col.border}`,
            }
          : { color: "var(--corp-text-secondary)" }
      }
      title={collapsed ? item.label : undefined}
    >
      <div
        className="w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center transition-transform duration-180 group-hover:scale-110"
        style={
          active
            ? { background: "rgba(255,255,255,0.25)" }
            : { background: col.lightBg }
        }
      >
        <div style={{ color: active ? col.text : col.bg }}>
          <Icon size={15} />
        </div>
      </div>

      {!collapsed && (
        <>
          <div className="flex-1 min-w-0">
            <span className="block text-xs font-mono font-black tracking-tight leading-tight truncate">
              {item.label}
            </span>
          </div>
          {item.isNew && (
            <span
              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider"
              style={
                active
                  ? { background: "rgba(255,255,255,0.3)", color: "#fff" }
                  : { background: "#e11d48", color: "#fff" }
              }
            >
              PRO
            </span>
          )}
        </>
      )}
    </Link>
  );
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const nav = useMemo(() => buildNavSections(), []);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
      className="hidden md:flex relative flex-col h-full flex-shrink-0 z-30 font-sans border-r-2"
      style={{
        background: "var(--corp-surface)",
        borderColor: "var(--corp-border)",
      }}
    >
      {/* ── Brand Header ── */}
      <div className="flex items-center justify-between px-4 h-16 border-b-2 flex-shrink-0" style={{ borderColor: "var(--corp-border)" }}>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              <Link href="/dashboard" className="flex flex-col py-0.5 font-mono group" title="CAREERINSYT — Career OS">
                <img src="/logo/logoTextDark.png" alt="CAREERINSYT" className="h-5 w-auto object-contain group-hover:opacity-90" />
                <span className="text-[9px] font-black tracking-widest uppercase text-[#2563eb] mt-0.5">Career OS</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <Link href="/dashboard" className="mx-auto" title="Career INSYT">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#2563eb] overflow-hidden"
              style={{ boxShadow: "2px 2px 0px 0px #1e3a8a" }}
            >
              <img src="/logo/logo_white.png" alt="Career INSYT" className="w-full h-full object-contain p-1" />
            </div>
          </Link>
        )}
      </div>

      {/* ── Navigation List: 5 Canonical Pillars + Contextual Practice ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 font-mono scrollbar-none">
        {/* 5 Canonical Pillars */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-corp-text-tertiary">
              Core Architecture
            </p>
          )}
          {nav.primaryPillars.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              active={isActive(item.href, pathname)}
            />
          ))}
        </div>

        {/* Contextual Tools & Practice */}
        <div className="pt-3 border-t-2" style={{ borderColor: "var(--corp-border)" }}>
          {!collapsed && (
            <p className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-corp-text-tertiary">
              {nav.contextualTools.label}
            </p>
          )}
          <div className="space-y-1">
            {nav.contextualTools.items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                collapsed={collapsed}
                active={isActive(item.href, pathname)}
              />
            ))}
          </div>
        </div>

        {/* Account & Support Section */}
        <div className="pt-3 border-t-2" style={{ borderColor: "var(--corp-border)" }}>
          {!collapsed && (
            <p className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-corp-text-tertiary">
              {nav.accountSection.label}
            </p>
          )}
          <div className="space-y-1">
            {nav.accountSection.items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                collapsed={collapsed}
                active={isActive(item.href, pathname)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* ── Collapse Toggle Bar ── */}
      <div className="p-3 border-t-2 flex items-center justify-between" style={{ borderColor: "var(--corp-border)" }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full py-2.5 px-3 rounded-xl flex items-center justify-center text-xs font-mono font-black bg-amber-400 hover:bg-amber-300 text-[#78350f] border-2 border-amber-600 shadow-[2px_2px_0px_0px_#78350f] transition-all cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} className="text-[#78350f] stroke-[2.5]" /> : (
            <span className="flex items-center gap-1.5 text-[11px] font-black text-[#78350f] uppercase tracking-wider">
              <ChevronLeft size={14} className="text-[#78350f] stroke-[2.5]" /> Collapse
            </span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
