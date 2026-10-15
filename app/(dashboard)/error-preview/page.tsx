"use client";

import React, { useState } from "react";
import { Insyt404View, Insyt500View } from "@/components/errors/custom-error-views";
import Link from "next/link";
import { AlertTriangle, Compass, ArrowLeft, Bug, ExternalLink } from "lucide-react";

export default function ErrorPreviewPage() {
  const [activeTab, setActiveTab] = useState<"404" | "500">("404");
  const [triggerRealError, setTriggerRealError] = useState(false);

  if (triggerRealError) {
    throw new Error("Simulated Runtime Error triggered from /error-preview test harness.");
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl border-2 border-slate-900 bg-white shadow-[5px_5px_0px_0px_#2563eb] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-900 border border-blue-300">
              DevOps &amp; QA Environment
            </span>
            <span className="text-xs text-slate-500 font-bold">ROUTE: /error-preview</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 mt-1">
            Error Screen Inspector &amp; Simulator
          </h1>
          <p className="text-xs font-sans text-slate-600 font-medium mt-0.5">
            Ultra-customized white-themed error boundaries designed for the CAREERINSYT platform.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab("404")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer border-2 ${
              activeTab === "404"
                ? "bg-[#2563eb] text-white border-blue-800 shadow-[2px_2px_0px_0px_#1e3a8a]"
                : "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
            }`}
          >
            <Compass size={14} />
            <span>Preview 404 (Not Found)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("500")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer border-2 ${
              activeTab === "500"
                ? "bg-[#2563eb] text-white border-blue-800 shadow-[2px_2px_0px_0px_#1e3a8a]"
                : "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
            }`}
          >
            <AlertTriangle size={14} />
            <span>Preview 500 (Exception)</span>
          </button>

          <button
            type="button"
            onClick={() => setTriggerRealError(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase bg-rose-50 text-rose-800 border-2 border-rose-300 hover:bg-rose-100 transition-all cursor-pointer shadow-xs"
            title="Throw a real JavaScript error to test Next.js error boundary"
          >
            <Bug size={14} className="text-rose-600" />
            <span>Trigger Real Error</span>
          </button>

          <Link
            href="/non-existent-sample-page-for-testing"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-800 border-2 border-slate-300 hover:bg-slate-200 transition-all shadow-xs"
            title="Navigate to a missing route to test actual Next.js 404"
          >
            <ExternalLink size={14} />
            <span>Test Real 404 Route</span>
          </Link>
        </div>
      </div>

      {/* Screen Render Box */}
      <div className="rounded-2xl border-2 border-slate-300 bg-white overflow-hidden shadow-sm">
        {activeTab === "404" ? (
          <Insyt404View isInlinePreview={true} />
        ) : (
          <Insyt500View
            isInlinePreview={true}
            error={{ name: "Error", message: "Database connection timed out while querying user certificates.", digest: "ERR_TIMEOUT_AUTH_092" }}
            reset={() => alert("Re-calibrate connection callback triggered successfully!")}
          />
        )}
      </div>
    </div>
  );
}
