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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-slate-200/40 py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          {/* Brand Logo: Clean text-only typeface on white/light background */}
          <Link href="/" className="flex items-center group py-0.5" title="CAREERINSYT">
            <img src="/logo/logoTextDark.png" alt="CAREERINSYT" className="h-7 sm:h-8 w-auto object-contain transition-opacity hover:opacity-90" />
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-[14px] font-semibold rounded-full transition-colors duration-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 text-[13px] font-bold rounded-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] border border-blue-600 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 mx-4 rounded-2xl bg-white border border-slate-200 shadow-xl p-6 md:hidden flex flex-col gap-3"
          >
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 text-[14px] font-semibold rounded-xl text-center transition-colors text-slate-700 hover:bg-slate-100"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 text-[14px] font-bold rounded-xl text-center text-white bg-[#2563eb] hover:bg-[#1d4ed8] shadow-sm"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
