"use client";

import { useState } from "react";
import Link from "next/link";
import { Database, CheckCircle2, AlertCircle, Loader2, Terminal, Key, Zap } from "lucide-react";

export default function SetupPage() {
  const [apiKey, setApiKey] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const runSetup = async () => {
    if (!adminSecret.trim()) return;
    setLoading(true);
    setResults([]);
    setStatus("idle");

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret.trim(),
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });
      const data = await res.json();
      setResults(data.results || [data.error || "Unknown error"]);
      setStatus(data.success ? "success" : "error");
    } catch (err: any) {
      setResults([err.message]);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-900 p-6 md:p-12 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 inline-flex items-center justify-center mb-4 text-[#2563eb] shadow-xs">
            <Database size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            INSYT Database Setup
          </h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Provisions Appwrite collections, schema attributes, and corporate catalog seed data
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          {/* Warning box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-900 text-xs leading-relaxed">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-slate-900 block mb-0.5">Admin Security Verification:</strong>
              Requires authentic <code>ADMIN_SECRET_KEY</code>. Server credentials (<code>APPWRITE_API_KEY</code>, <code>NEXT_PUBLIC_APPWRITE_PROJECT</code>) are securely read from server environment.
            </div>
          </div>

          {/* Collections Inventory */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Collections Provisioned:
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs text-slate-700">
              {[
                "15 Collections + Attributes",
                "Job Applications & CRM",
                "Trust Credentials & Audit Log",
                "Enrollments & Subscriptions",
                "Transactions & MFS Ledgers",
                "5 Learning Paths",
                "24 Courses & Studios",
                "8 Proctored Mock Tests",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Secret Key Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Key size={14} className="text-slate-500" />
              <span>Admin Secret Key (ADMIN_SECRET_KEY)</span>
            </label>
            <input
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              placeholder="Enter server ADMIN_SECRET_KEY..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Key size={14} className="text-slate-500" />
              <span>Appwrite Server API Key <span className="text-slate-400 font-normal">(Optional if set in server env)</span></span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Optional override API key..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          {/* Run Button */}
          <button
            onClick={runSetup}
            disabled={loading || !adminSecret.trim()}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Provisioning Schema & Seed Data (~30s)...</span>
              </>
            ) : (
              <>
                <Zap size={16} />
                <span>Run Full Schema & Catalog Setup</span>
              </>
            )}
          </button>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-3 pt-2">
              <div
                className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                  status === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-rose-50 border-rose-300 text-rose-800"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle size={18} className="text-rose-600 shrink-0" />
                )}
                <span>
                  {status === "success"
                    ? "Database setup complete! Collections and schema attributes provisioned."
                    : "Setup encountered errors. Inspect detailed execution log below."}
                </span>
              </div>

              {/* Log terminal */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center gap-2">
                  <Terminal size={14} className="text-blue-400" />
                  <span className="text-slate-300 font-mono text-xs font-bold">Execution Output</span>
                </div>
                <div className="p-4 max-h-72 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 space-y-1">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={
                        r.startsWith("✅")
                          ? "text-emerald-400 font-bold"
                          : r.startsWith("❌")
                          ? "text-rose-400 font-bold"
                          : r.startsWith("ℹ️")
                          ? "text-blue-400"
                          : r.startsWith("===")
                          ? "text-amber-400"
                          : "text-slate-400"
                      }
                    >
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              {status === "success" && (
                <div className="text-center pt-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <Zap size={14} />
                    <span>Proceed to Dashboard</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
