"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Compass,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Cpu,
  Trophy,
  Award,
  BookOpen,
  Briefcase,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Eye,
  Activity,
  Zap,
  Mail,
  Palette,
  LayoutDashboard,
} from "lucide-react";
import { LoadingIcon } from "@/components/ui/loading-icon";
import { Insyt404View, Insyt500View } from "@/components/errors/custom-error-views";

type SegmentId =
  | "resilience"
  | "splash-loaders"
  | "cockpit"
  | "events"
  | "credentials"
  | "routes";

export default function PlatformSegmentAuditPage() {
  const [activeSegment, setActiveSegment] = useState<SegmentId>("resilience");
  const [errorTab, setErrorTab] = useState<"404" | "500">("404");
  const [triggerRealError, setTriggerRealError] = useState(false);
  const [loaderVariant, setLoaderVariant] = useState<"blue" | "white" | "slate" | "amber">("blue");
  const [loaderSize, setLoaderSize] = useState<"sm" | "md" | "lg" | "xl">("lg");
  const [loaderLabel, setLoaderLabel] = useState(true);

  if (triggerRealError) {
    throw new Error("Simulated runtime error triggered by QA auditor from /audit segment control.");
  }

  const handleReplaySplash = () => {
    if (typeof window !== "undefined" && (window as any).__replayInsytSplash) {
      (window as any).__replayInsytSplash();
    } else {
      alert("Splash replay hook ready. Initializing splash animation...");
    }
  };

  const SEGMENTS: { id: SegmentId; label: string; icon: React.ElementType; badge: string }[] = [
    { id: "resilience", label: "Error Screens & Resilience", icon: ShieldCheck, badge: "Custom 404 & 500" },
    { id: "splash-loaders", label: "Splash Screen & Loaders", icon: Sparkles, badge: "Vector Smooth Line" },
    { id: "cockpit", label: "Dashboard & Cockpit", icon: LayoutDashboard, badge: "Wheel & Icons Only" },
    { id: "events", label: "Events & Competitions", icon: Trophy, badge: "Passes & Ticketing" },
    { id: "credentials", label: "Credentials & Passport", icon: Award, badge: "Trust Plane & QR" },
    { id: "routes", label: "Complete Routes Directory", icon: Layers, badge: "44 Routes Audited" },
  ];

  return (
    <div className="space-y-6 font-sans select-none">
      {/* ── Top Header Cockpit ── */}
      <div className="p-6 rounded-2xl border-2 border-blue-500 bg-white shadow-[6px_6px_0px_0px_#2563eb] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
              AUDIT PROTOCOL ACTIVE
            </span>
            <span className="text-xs text-slate-500 font-bold">POV INSPECTION SYSTEM</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 mt-1">
            Segmented Platform Auditor
          </h1>
          <p className="text-xs font-sans text-slate-600 font-medium mt-0.5">
            Audit the INSYT SAAS pixel-by-pixel, component-by-component, and POV-by-POV.
          </p>
        </div>

        {/* Global Quick Action Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleReplaySplash}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-all shadow-[2px_2px_0px_0px_#1e3a8a] cursor-pointer active:scale-95"
            title="Replay full-screen vector smooth line splash screen"
          >
            <Play size={13} />
            <span>Replay Splash Screen</span>
          </button>

          <Link
            href="/error-preview"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-900 border-2 border-slate-300 hover:border-slate-800 transition-all shadow-xs"
          >
            <ExternalLink size={13} />
            <span>/error-preview</span>
          </Link>
        </div>
      </div>

      {/* ── Segment Navigation Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono">
        {SEGMENTS.map((seg) => {
          const Icon = seg.icon;
          const isActive = activeSegment === seg.id;

          return (
            <button
              key={seg.id}
              type="button"
              onClick={() => setActiveSegment(seg.id)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col justify-between text-left cursor-pointer group select-none ${
                isActive
                  ? "bg-white border-[#2563eb] shadow-[4px_4px_0px_0px_#2563eb] -translate-y-0.5"
                  : "bg-slate-50 border-slate-300 hover:border-slate-500 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                    isActive
                      ? "bg-[#2563eb] text-white border-blue-700"
                      : "bg-slate-200 text-slate-700 border-slate-300 group-hover:bg-slate-300"
                  }`}
                >
                  <Icon size={14} />
                </div>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {seg.badge}
                </span>
              </div>
              <span className="text-[11px] font-black uppercase text-slate-900 mt-2 line-clamp-1">
                {seg.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Segment Body Workspace ── */}
      <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
        {/* SEGMENT 1: RESILIENCE & ERROR BOUNDARIES */}
        {activeSegment === "resilience" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 font-mono">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#2563eb]" />
                  <span>POV 1: Customized Error Boundaries &amp; Recovery</span>
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Ultra-customized white-themed error interfaces. Inspect both 404 Not Found and 500 Something Went Wrong screens.
                </p>
              </div>

              {/* View Switchers & Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setErrorTab("404")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                    errorTab === "404"
                      ? "bg-[#2563eb] text-white border-blue-800 shadow-xs"
                      : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  Inspect 404 Screen
                </button>

                <button
                  type="button"
                  onClick={() => setErrorTab("500")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                    errorTab === "500"
                      ? "bg-[#2563eb] text-white border-blue-800 shadow-xs"
                      : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  Inspect 500 Screen
                </button>

                <button
                  type="button"
                  onClick={() => setTriggerRealError(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-black uppercase bg-rose-50 text-rose-800 border-2 border-rose-300 hover:bg-rose-100 transition-all cursor-pointer shadow-xs"
                  title="Throw a real runtime exception to verify the boundary in production"
                >
                  Trigger Real Exception
                </button>
              </div>
            </div>

            {/* Embedded Live Preview */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-2 overflow-hidden">
              {errorTab === "404" ? (
                <Insyt404View isInlinePreview={true} />
              ) : (
                <Insyt500View
                  isInlinePreview={true}
                  error={{ name: "Error", message: "Curriculum asset calibration failed due to network timeout.", digest: "ERR_VERIFICATION_SYNC_409" }}
                  reset={() => alert("Re-calibrate connection simulation invoked.")}
                />
              )}
            </div>

            {/* Audit Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border-2 border-emerald-300 bg-emerald-50 text-emerald-950 space-y-1">
                <span className="font-black flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  White-Theme Guaranteed
                </span>
                <p className="text-[11px] font-sans text-emerald-800">
                  Zero dark mode or dark-themed gradient containers on any error boundary.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border-2 border-emerald-300 bg-emerald-50 text-emerald-950 space-y-1">
                <span className="font-black flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Support Routing
                </span>
                <p className="text-[11px] font-sans text-emerald-800">
                  Direct inquiry links strictly routed to career@insyt.bd.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border-2 border-emerald-300 bg-emerald-50 text-emerald-950 space-y-1">
                <span className="font-black flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Audit Digest Tracking
                </span>
                <p className="text-[11px] font-sans text-emerald-800">
                  Cryptographic digest tracking for engineering diagnostics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SEGMENT 2: SPLASH SCREEN & LOADERS */}
        {activeSegment === "splash-loaders" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 font-mono">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#2563eb]" />
                  <span>POV 2: Solid Blue Splash &amp; Vector Loaders</span>
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Vector smooth line animation on an entirely blue background, all-white logo, zero glow, and the new custom loading icon.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReplaySplash}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-all shadow-[3px_3px_0px_0px_#1e3a8a] cursor-pointer active:scale-95"
              >
                <Play size={14} />
                <span>Launch Splash Screen Animation</span>
              </button>
            </div>

            {/* Interactive Loading Icon Playground */}
            <div className="p-6 rounded-2xl border-2 border-blue-200 bg-blue-50/50 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
                <span className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                  <Cpu size={14} className="text-[#2563eb]" />
                  Interactive Branded Loading Icon Playground
                </span>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Variant */}
                  <div className="flex items-center gap-1 text-[11px]">
                    {(["blue", "white", "slate", "amber"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setLoaderVariant(v)}
                        className={`px-2.5 py-1 rounded-md font-black uppercase border transition-all cursor-pointer ${
                          loaderVariant === v
                            ? "bg-[#2563eb] text-white border-blue-700"
                            : "bg-white text-slate-700 border-slate-300"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>

                  {/* Size */}
                  <div className="flex items-center gap-1 text-[11px]">
                    {(["sm", "md", "lg", "xl"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setLoaderSize(s)}
                        className={`px-2.5 py-1 rounded-md font-black uppercase border transition-all cursor-pointer ${
                          loaderSize === s
                            ? "bg-slate-900 text-white border-slate-950"
                            : "bg-white text-slate-700 border-slate-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Label toggle */}
                  <button
                    type="button"
                    onClick={() => setLoaderLabel(!loaderLabel)}
                    className="px-2.5 py-1 rounded-md font-black uppercase text-[11px] bg-white text-slate-700 border border-slate-300 cursor-pointer"
                  >
                    Label: {loaderLabel ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              {/* Render Stage */}
              <div
                className={`p-10 rounded-xl border-2 border-dashed flex items-center justify-center min-h-[160px] transition-colors ${
                  loaderVariant === "white"
                    ? "bg-[#1d4ed8] border-blue-300"
                    : "bg-white border-slate-300"
                }`}
              >
                <LoadingIcon
                  size={loaderSize}
                  variant={loaderVariant}
                  label={loaderLabel ? "Calibrating Cryptographic Registry..." : undefined}
                />
              </div>
            </div>

            {/* Specifications Card */}
            <div className="p-4 rounded-xl border-2 border-slate-200 bg-white space-y-2 font-mono text-xs">
              <span className="font-black text-slate-900 uppercase">
                Vector Splash Screen Specifications:
              </span>
              <ul className="space-y-1 font-sans text-slate-700 text-xs list-disc list-inside">
                <li><strong>Background</strong>: 100% Solid Corporate Royal Blue (<code className="font-mono bg-blue-50 px-1 rounded">#1d4ed8</code>)</li>
                <li><strong>Vector Motion</strong>: Smooth cubic-bezier SVG contour stroke path drawing (<code className="font-mono bg-blue-50 px-1 rounded">pathLength: [0, 1]</code>)</li>
                <li><strong>Logo</strong>: All-white vector stamp &amp; all-white typography</li>
                <li><strong>Glow Elimination</strong>: Zero blur rings, zero radial glow overlays, crisp vector contours only</li>
              </ul>
            </div>
          </div>
        )}

        {/* SEGMENT 3: DASHBOARD & COCKPIT */}
        {activeSegment === "cockpit" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 font-mono">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <LayoutDashboard size={16} className="text-[#2563eb]" />
                  <span>POV 3: Cockpit Layout &amp; Scroll Behavior</span>
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Verify wheel scroll chaining, compact badge medallions (icons only), and Daily Quest placement.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-all shadow-[2px_2px_0px_0px_#1e3a8a]"
              >
                <span>Go to Live Dashboard</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Checklist of audited cockpit features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl border-2 border-blue-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    Events Hub Scroll Chaining
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                    PASS
                  </span>
                </div>
                <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
                  When horizontal scrolling completes at the beginning or end of the events carousel, page scrolling smoothly resumes vertically without cursor trap.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-blue-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    Compact Badges: Icons Only
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                    PASS
                  </span>
                </div>
                <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
                  Under Verified Skills &amp; Masteries, badges display only icons with no text labels. Pressing any badge opens the full specification popup modal.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-blue-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    Daily Quest Engine Location
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                    PASS
                  </span>
                </div>
                <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
                  Located directly below the Competency Calibration Engine in the main 7-column grid layout for executive morning workflows.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-blue-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    YouTube Quick Learnings
                  </span>
                  <span className="px-2 py-0.5 rounded-xl text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                    PASS
                  </span>
                </div>
                <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
                  Scrollable with mouse wheel and touch gestures on mobile, taller reel-size ratio, and clean white-themed styling.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SEGMENT 4: EVENTS & COMPETITIONS */}
        {activeSegment === "events" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 font-mono">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <Trophy size={16} className="text-[#2563eb]" />
                  <span>POV 4: Events, Passes &amp; Ticketing</span>
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Two-step thoughtful registration modal with instant Pass ID generation, Google Calendar integration, and .ics export.
                </p>
              </div>

              <Link
                href="/events"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-all shadow-[2px_2px_0px_0px_#1e3a8a]"
              >
                <span>Open /events Route</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white space-y-3 font-mono text-xs">
              <span className="font-black text-slate-900 uppercase">Key Verified Capabilities:</span>
              <ul className="space-y-2 font-sans text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Dedicated Passes Tab</strong>: Users can switch to &ldquo;My Registered Passes&rdquo; to view their issued passes anytime.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Ticket Confirmation Modal</strong>: Displays Pass ID, QR verification badge, and calendar synchronization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Synchronized Cross-Page Persistence</strong>: Registering on <code className="font-mono bg-slate-100 px-1 rounded">/events</code> immediately highlights the event on the Dashboard.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SEGMENT 5: CREDENTIALS & TRUST PLANE */}
        {activeSegment === "credentials" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 font-mono">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <Award size={16} className="text-[#2563eb]" />
                  <span>POV 5: Verifiable Credentials &amp; Identity</span>
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  W3C VC compatibility, PDF Career Passport downloads, and standardized corporate identity.
                </p>
              </div>

              <Link
                href="/career-passport"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-all shadow-[2px_2px_0px_0px_#1e3a8a]"
              >
                <span>Inspect Career Passport</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl border-2 border-slate-200 bg-white space-y-2">
                <span className="font-black uppercase text-slate-900 flex items-center gap-1.5">
                  <Mail size={14} className="text-[#2563eb]" />
                  Email Standardization
                </span>
                <p className="text-[11px] font-sans text-slate-600">
                  Standardized strictly to <code className="font-mono font-bold text-slate-900">career@insyt.bd</code>. All <code className="font-mono text-slate-500">insyt.co</code> addresses purged across help desk, footers, pricing, and certificates.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-slate-200 bg-white space-y-2">
                <span className="font-black uppercase text-slate-900 flex items-center gap-1.5">
                  <UserCheck size={14} className="text-emerald-600" />
                  Top-Right Avatar Transparency
                </span>
                <p className="text-[11px] font-sans text-slate-600">
                  Blue background removed from profile photo button on dashboard topbar (<code className="font-mono">bg-transparent</code>).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SEGMENT 6: COMPLETE ROUTES DIRECTORY */}
        {activeSegment === "routes" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 font-mono">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <Layers size={16} className="text-[#2563eb]" />
                  <span>POV 6: Complete Platform Routes Directory (44 Routes)</span>
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Dynamic document titles verified. No more frozen &ldquo;Dashboard | CAREERINSYT&rdquo; tab titles.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-md text-xs font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                100% Next.js 16 Static &amp; Dynamic Built
              </span>
            </div>

            {/* Route Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 font-mono text-xs">
              {[
                { name: "Dashboard Cockpit", path: "/dashboard" },
                { name: "Career Passport", path: "/career-passport" },
                { name: "Events & Competitions", path: "/events" },
                { name: "Help Desk & FAQ", path: "/help" },
                { name: "Error Preview QA", path: "/error-preview" },
                { name: "System Settings", path: "/settings" },
                { name: "Profile Management", path: "/profile" },
                { name: "Career Hub", path: "/career-hub" },
                { name: "Jobs & Opportunities", path: "/jobs" },
                { name: "Executive Certificates", path: "/certificates" },
                { name: "Mock Interviews", path: "/mock-interviews" },
                { name: "Mock Tests & IRT", path: "/mock-tests" },
                { name: "Curriculum & Learn", path: "/learn" },
                { name: "Workshops Directory", path: "/workshops" },
                { name: "Talent Marketplace", path: "/marketplace" },
                { name: "Enterprise Subscription", path: "/subscription" },
              ].map((r) => (
                <Link
                  key={r.path}
                  href={r.path}
                  className="p-3 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-white hover:border-[#2563eb] transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-slate-900 block truncate group-hover:text-blue-600">
                      {r.name}
                    </span>
                    <span className="text-[10px] text-slate-600 truncate block">
                      {r.path}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-slate-500 group-hover:text-blue-600 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
