"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b-2 border-slate-900 py-3 shadow-[0_4px_0px_0px_rgba(15,23,42,0.06)]"
            : "bg-white/90 backdrop-blur-sm border-b-2 border-slate-900/60 py-3.5"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group py-0.5" title="CAREERINSYT">
            <img src="/logo/logoTextDark.png" alt="CAREERINSYT" className="h-7 sm:h-8 w-auto object-contain transition-opacity hover:opacity-90" />
            <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-300 border-2 border-slate-900 text-slate-950 rounded shadow-[1px_1px_0px_0px_#0f172a]">
              CAREER OS
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-800 hover:text-slate-950 border-2 border-transparent hover:border-slate-900 hover:bg-slate-100 hover:shadow-[2px_2px_0px_0px_#0f172a]"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2 text-xs font-black rounded-lg text-white bg-[#2563eb] hover:bg-[#1d4ed8] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Go to Dashboard →
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg border-2 border-slate-900 bg-white flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#0f172a] text-slate-900 active:translate-x-[1px] active:translate-y-[1px]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white border-b-2 border-slate-900 p-6 md:hidden shadow-[0_8px_0px_0px_#0f172a] font-mono space-y-3"
          >
            <Link
              href="#tracks"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-2.5 px-4 rounded-lg border-2 border-slate-900 bg-slate-50 text-slate-900 text-xs font-bold shadow-[2px_2px_0px_0px_#0f172a]"
            >
              Career Tracks
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-2.5 px-4 rounded-lg border-2 border-slate-900 bg-white text-slate-900 text-xs font-bold shadow-[2px_2px_0px_0px_#0f172a]"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-2.5 px-4 rounded-lg border-2 border-slate-900 bg-[#2563eb] text-white text-xs font-black shadow-[3px_3px_0px_0px_#0f172a]"
            >
              Go to Dashboard →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
