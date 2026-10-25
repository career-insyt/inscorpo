"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Database, Play } from "lucide-react";

export default function SeedDatabasePage() {
  const [apiKey, setApiKey] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSeed = async () => {
    if (!adminSecret) {
      setError("Please provide the Admin Secret Key (ADMIN_SECRET_KEY).");
      return;
    }
    setLoading(true);
    setError("");
    setLogs(["Starting database seed process..."]);

    try {
      const response = await fetch("/api/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret.trim(),
        },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          projectId: "6a56075800013fce1aa1",
          endpoint: "https://sgp.cloud.appwrite.io/v1",
          databaseId: "InsytCorp",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to seed database.");
      } else {
        setLogs((prev) => [...prev, ...(data.results || []), "✅ Database successfully seeded!"]);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-900 p-6 md:p-12 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl bg-white border-2 border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-blue-600">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Appwrite Database Seeder</h1>
            <p className="text-xs font-semibold text-slate-500">Initialize collections and seed corporate curriculum data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-800 text-xs">
            <AlertCircle className="shrink-0 mt-0.5 text-amber-600" size={18} />
            <div className="leading-relaxed">
              <strong className="block mb-1 text-slate-900 font-bold">Important Operational Note:</strong>
              This will create missing collections (<code>paths</code>, <code>courses</code>, <code>profiles</code>, <code>tasks</code>, <code>events</code>) and seed records into Appwrite. 
              The server will prioritize environment credentials (<code>APPWRITE_API_KEY</code>, <code>ADMIN_SECRET_KEY</code>) to prevent credential leakage.
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Admin Secret Key (ADMIN_SECRET_KEY)
            </label>
            <input
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              placeholder="Enter server ADMIN_SECRET_KEY..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Appwrite Server API Key <span className="text-slate-400 font-normal">(Optional if set in server env)</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Optional override API key..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <button
            onClick={handleSeed}
            disabled={loading || !adminSecret}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Play size={18} /> Start Seeding Operations
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-xs font-semibold flex gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {logs.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mt-6">
            <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" /> Execution Logs
            </h3>
            <div className="space-y-1.5 h-64 overflow-y-auto font-mono text-[11px] text-slate-400">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                  <span className={log.includes("Failed") || log.includes("error") ? "text-rose-400 font-bold" : log.includes("✅") ? "text-emerald-400 font-bold" : ""}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
