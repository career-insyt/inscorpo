"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Compass,
  ArrowRight,
  RefreshCw,
  Home,
  Mail,
  ShieldAlert,
  Search,
  BookOpen,
  Trophy,
} from "lucide-react";

interface ErrorViewProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  isInlinePreview?: boolean;
}

export function Insyt404View({ isInlinePreview = false }: { isInlinePreview?: boolean }) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-6 sm:p-10 text-center font-sans select-none bg-white ${
        isInlinePreview ? "min-h-[500px]" : "min-h-[80vh]"
      }`}
    >
      <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_#2563eb] bg-white space-y-6 text-slate-900">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase bg-blue-50 text-blue-800 border-2 border-blue-200">
          <Compass size={13} className="text-[#2563eb] animate-spin" />
          <span>HTTP 404 // ROUTE_NOT_INDEXED</span>
        </div>

        {/* Big 404 Graphic */}
        <div className="relative py-2">
          <h1 className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-slate-950 flex items-center justify-center gap-2">
            <span>4</span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center text-slate-950 inline-flex">
              <Compass size={40} className="stroke-[2.5]" />
            </div>
            <span>4</span>
          </h1>
        </div>

        {/* Title & Copy */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">
            Ledger Route Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
            The corporate module, assessment rubric, or credential page you navigated to does not exist or has been relocated in the latest platform release.
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-all shadow-[3px_3px_0px_0px_#1e3a8a] active:scale-95"
          >
            <Home size={14} />
            <span>Return to Cockpit</span>
          </Link>

          <Link
            href="/learn"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-900 border-2 border-slate-300 hover:border-slate-800 hover:bg-white transition-all shadow-xs active:scale-95"
          >
            <BookOpen size={14} className="text-[#2563eb]" />
            <span>Learning Paths</span>
          </Link>

          <Link
            href="/events"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-900 border-2 border-slate-300 hover:border-slate-800 hover:bg-white transition-all shadow-xs active:scale-95"
          >
            <Trophy size={14} className="text-amber-600" />
            <span>Events Hub</span>
          </Link>
        </div>

        {/* Support Help Desk Link */}
        <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>Need assistance?</span>
          <a
            href="mailto:career@insyt.bd?subject=404%20Route%20Report"
            className="text-[#2563eb] font-bold hover:underline flex items-center gap-1"
          >
            <Mail size={12} />
            <span>career@insyt.bd</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Insyt500View({
  error,
  reset,
  isInlinePreview = false,
}: ErrorViewProps) {
  const digest = error?.digest || "ERR_RUNTIME_FAULT";

  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-6 sm:p-10 text-center font-sans select-none bg-white ${
        isInlinePreview ? "min-h-[500px]" : "min-h-[80vh]"
      }`}
    >
      <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl border-2 border-rose-500 shadow-[8px_8px_0px_0px_#e11d48] bg-white space-y-6 text-slate-900">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase bg-rose-50 text-rose-800 border-2 border-rose-200">
          <ShieldAlert size={13} className="text-rose-600" />
          <span>SYSTEM ERROR // 500 EXECUTION ANOMALY</span>
        </div>

        {/* Visual Icon Alert Box */}
        <div className="flex justify-center py-2">
          <div className="w-20 h-20 rounded-2xl bg-rose-100 border-2 border-rose-400 shadow-[4px_4px_0px_0px_#e11d48] flex items-center justify-center text-rose-600">
            <AlertTriangle size={42} className="stroke-[2.5]" />
          </div>
        </div>

        {/* Title & Copy */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">
            Something Went Wrong
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
            A temporary runtime exception occurred while synchronizing platform state. Your verifiable profile data and credentials remain cryptographically safe.
          </p>
          {digest && (
            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold text-slate-700">
                Audit Digest: {digest}
              </span>
            </div>
          )}
        </div>

        {/* Recovery Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono">
          {reset && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-all shadow-[3px_3px_0px_0px_#1e3a8a] active:scale-95 cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Re-calibrate Connection</span>
            </button>
          )}

          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-900 border-2 border-slate-300 hover:border-slate-800 hover:bg-white transition-all shadow-xs active:scale-95"
          >
            <Home size={14} />
            <span>Return to Dashboard</span>
          </Link>
        </div>

        {/* Support Link */}
        <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>Need immediate engineering support?</span>
          <a
            href="mailto:career@insyt.bd?subject=System%20Error%20Audit%20Report"
            className="text-[#2563eb] font-bold hover:underline flex items-center gap-1"
          >
            <Mail size={12} />
            <span>career@insyt.bd</span>
          </a>
        </div>
      </div>
    </div>
  );
}
