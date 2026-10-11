"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, ClipboardList, FileText, Briefcase,
  X, Award, Settings, HelpCircle, LogOut, Mic, Zap, Target, Layers
} from "lucide-react";
import { useUser } from "@/components/providers/user-context";
import { useAuth } from "@/components/providers/auth-provider";

const FIRE_EMOJI_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp";

// 5 Canonical Pillars per Section 2 of the Supermassive Implementation Plan
const primaryTabs = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen,        label: "Learn",     href: "/learn" },
  { icon: ClipboardList,   label: "Evaluate",  href: "/evaluate" },
  { icon: FileText,        label: "Passport",  href: "/passport" },
  { icon: Briefcase,       label: "Jobs",      href: "/opportunities" },
];

function buildMobileCommandSections() {
  return [
    {
      label: "Applied Practice & Tools",
      items: [
        { icon: Mic,    label: "AI Mock Interviews",  href: "/mock-interviews" },
        { icon: Target, label: "Career Strategy Hub", href: "/career-hub" },
        { icon: Zap,    label: "Case Challenges",     href: "/challenges" },
        { icon: Award,  label: "Verified Credentials", href: "/certificates" },
      ],
    },
  ];
}

const utilityItems = [
  { icon: HelpCircle, label: "Help Center", href: "/help" },
];

export function MobileBottomNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { state } = useUser();
  const { logout } = useAuth();

  const commandSections = useMemo(() => buildMobileCommandSections(), []);

  const isActive = (href: string) => {
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
  };

  return (
    <>
      {/* ─── Bottom Navigation Bar (Mobile Only) ─── */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 font-mono border-t-2 select-none"
        style={{
          background: "var(--corp-surface)",
          borderColor: "var(--corp-border)",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.12)",
        }}
        aria-label="Mobile Navigation"
      >
        <div
          className="flex items-center justify-around px-1"
          style={{
            height: "calc(3.75rem + env(safe-area-inset-bottom, 0px))",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {/* 5 Canonical Navigation Tabs */}
          {primaryTabs.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full text-[9px] font-black uppercase transition-all min-h-[44px] ${
                  active ? "text-[#2563eb]" : "text-corp-text-tertiary"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                    active ? "bg-[#2563eb] text-white border border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]" : ""
                  }`}
                >
                  <Icon size={16} style={{ color: active ? "#fff" : "inherit" }} />
                </div>
                <span className="text-[8.5px] font-black mt-0.5 tracking-tight truncate max-w-[58px]">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Contextual Drawer Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center w-10 h-full text-[9px] font-black uppercase transition-all min-h-[44px] ${
              drawerOpen ? "text-[#2563eb]" : "text-corp-text-tertiary"
            }`}
            aria-label="Open More Menu"
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                drawerOpen ? "bg-[#2563eb] text-white border border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]" : ""
              }`}
            >
              <Layers size={16} />
            </div>
            <span className="text-[8.5px] font-black mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* ─── Command Center Drawer ─── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-0 z-[60]"
              style={{ background: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(6px)" }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Bottom Drawer Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="md:hidden fixed inset-x-0 bottom-0 z-[70] flex flex-col overflow-hidden font-mono border-t-2 border-corp-border"
              style={{
                background: "var(--corp-surface)",
                maxHeight: "88dvh",
                borderRadius: "24px 24px 0 0",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Drag Handle & Header */}
              <div className="flex-shrink-0 pt-3 pb-2 px-5 bg-corp-bg-secondary border-b-2 border-corp-border">
                <div className="w-12 h-1 rounded-full mx-auto mb-3 bg-corp-border" />
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase text-corp-text flex items-center gap-2">
                    <Layers size={16} className="text-[#2563eb]" /> Secondary Practice &amp; Account
                  </h2>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 rounded-xl bg-corp-surface hover:bg-corp-bg-secondary text-corp-text-secondary border border-corp-border min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* User Profile Summary Card inside Drawer */}
              <div
                className="mx-4 mt-4 p-4 rounded-2xl border-2 flex items-center justify-between shadow-sm bg-corp-bg-secondary"
                style={{ borderColor: "var(--corp-border)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 border-2 border-blue-400 bg-[#2563eb] overflow-hidden"
                  >
                    {state.passportProfile?.photoUrl ? (
                      <img
                        src={state.passportProfile.photoUrl}
                        alt={state.name || "Candidate"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      state.name ? state.name.substring(0, 2).toUpperCase() : "EX"
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase text-corp-text truncate">
                      {state.name || "Executive Candidate"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                        Corporate Scholar
                      </span>
                    </div>
                  </div>
                </div>

                {state.streak > 0 && (
                  <div className="px-2.5 py-1 rounded-lg text-xs font-black bg-rose-500/15 text-rose-500 border border-rose-500/30 flex items-center gap-1 flex-shrink-0">
                    <img src={FIRE_EMOJI_URL} alt="🔥" width={14} height={14} className="object-contain" />
                    <span>{state.streak}d</span>
                  </div>
                )}
              </div>

              {/* Scrollable Command Sections */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 space-y-5 pt-4">
                {commandSections.map((section) => (
                  <div key={section.label} className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-corp-text-tertiary px-1">
                      {section.label}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {section.items.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setDrawerOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase transition-all border-2 active:scale-95 min-h-[44px] ${
                              active
                                ? "bg-[#2563eb] text-white border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]"
                                : "bg-corp-bg-secondary text-corp-text border-corp-border hover:bg-corp-surface"
                            }`}
                          >
                            <Icon size={15} className={active ? "text-white" : "text-[#2563eb]"} />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Preferences & Utilities */}
                <div className="space-y-2 pt-2 border-t-2 border-corp-border">
                  <p className="text-[10px] font-black uppercase tracking-wider text-corp-text-tertiary px-1">
                    Preferences &amp; Account
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {utilityItems.map((item) => {
                      const active = isActive(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase transition-all border-2 active:scale-95 min-h-[44px] ${
                            active
                              ? "bg-[#2563eb] text-white border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]"
                              : "bg-corp-bg-secondary text-corp-text border-corp-border hover:bg-corp-surface"
                          }`}
                        >
                          <Icon size={15} className={active ? "text-white" : "text-corp-text-secondary"} />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                    <button
                      onClick={() => { setDrawerOpen(false); logout(); }}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase transition-all border-2 border-rose-500/40 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 active:scale-95 min-h-[44px] cursor-pointer"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                <div style={{ height: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
