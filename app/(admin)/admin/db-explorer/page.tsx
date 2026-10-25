"use client";

import { useState, useEffect } from "react";
import {
  Database, RefreshCw, FileText, CheckCircle2,
  Building2, Layers, Cpu, Award
} from "lucide-react";
import { getGovJobStats, getGovOrganizations, getSkillTaxonomy, getUnifiedDB } from "@/lib/data/gov-jobs-db";

export default function DBExplorerPage() {
  const [stats, setStats] = useState<any>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [taxonomy, setTaxonomy] = useState<any>(null);
  const [unifiedDbData, setUnifiedDbData] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<"overview" | "organizations" | "taxonomy" | "raw">("overview");
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; message: string | null }>({
    loading: false,
    message: null,
  });

  useEffect(() => {
    const s = getGovJobStats();
    const orgs = getGovOrganizations();
    const tax = getSkillTaxonomy();
    const uni = getUnifiedDB();

    setStats(s);
    setOrganizations(orgs);
    setTaxonomy(tax);
    setUnifiedDbData(uni);
  }, []);

  const triggerSync = async () => {
    setSyncStatus({ loading: true, message: "Syncing JSON DB collections..." });
    try {
      const res = await fetch("/api/db/gov-jobs");
      const data = await res.json();
      if (data.success) {
        setSyncStatus({
          loading: false,
          message: `Successfully verified and cached ${data.totalCount} jobs across ${data.organizations.length} organizations!`,
        });
      } else {
        setSyncStatus({ loading: false, message: `Sync warning: ${data.error}` });
      }
    } catch (e: any) {
      setSyncStatus({ loading: false, message: `Sync failed: ${e.message}` });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-900 p-6 md:p-10 space-y-8 font-mono">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border-2 border-blue-400 shadow-[4px_4px_0px_0px_#2563eb]">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-xl bg-blue-50 border-2 border-blue-300 text-[#2563eb]">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase">
                INSYT SAAS Database Explorer
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1e3a8a] text-xs font-black border border-blue-300 uppercase">
                JSON DB Master
              </span>
            </div>
            <p className="text-xs font-sans font-semibold text-slate-600 mt-1">
              Location: <code className="text-[#2563eb] font-mono font-bold">DB/jobs_unified.json</code> | 126 Normalized Jobs | 6 Research Institutes
            </p>
          </div>
        </div>

        <button
          onClick={triggerSync}
          disabled={syncStatus.loading}
          className="px-5 py-2.5 rounded-xl text-xs font-black uppercase text-white bg-[#2563eb] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 border-2 border-blue-900 shadow-[2px_2px_0px_0px_#1e3a8a] cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncStatus.loading ? "animate-spin" : ""}`} />
          {syncStatus.loading ? "Verifying DB..." : "Verify & Sync DB"}
        </button>
      </div>

      {syncStatus.message && (
        <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {syncStatus.message}
        </div>
      )}

      {/* Metrics Row */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border-2 border-slate-200 shadow-xs">
            <div className="text-xs text-slate-600 flex items-center justify-between mb-2 font-bold uppercase">
              <span>Organizations</span>
              <Building2 className="w-4 h-4 text-[#2563eb]" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.totalOrganizations}</div>
            <div className="text-[11px] text-[#2563eb] mt-1 font-bold">BARI, BINA, BJRI, BRRI, BTRI, BSRI</div>
          </div>

          <div className="p-5 rounded-xl bg-white border-2 border-slate-200 shadow-xs">
            <div className="text-xs text-slate-600 flex items-center justify-between mb-2 font-bold uppercase">
              <span>Normalized Jobs</span>
              <Layers className="w-4 h-4 text-[#2563eb]" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.totalJobs}</div>
            <div className="text-[11px] text-[#2563eb] mt-1 font-bold">Grade 9 to Grade 16</div>
          </div>

          <div className="p-5 rounded-xl bg-white border-2 border-slate-200 shadow-xs">
            <div className="text-xs text-slate-600 flex items-center justify-between mb-2 font-bold uppercase">
              <span>Total Vacancies</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.totalVacancies}</div>
            <div className="text-[11px] text-amber-700 mt-1 font-bold">Recruitment Circulars Batch 01</div>
          </div>

          <div className="p-5 rounded-xl bg-white border-2 border-slate-200 shadow-xs">
            <div className="text-xs text-slate-600 flex items-center justify-between mb-2 font-bold uppercase">
              <span>Taxonomy Tiers</span>
              <Cpu className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">4 Tiers</div>
            <div className="text-[11px] text-purple-700 mt-1 font-bold">26 Skill Bundles Mapped</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2 flex-wrap">
        <button
          onClick={() => setSelectedTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
            selectedTab === "overview"
              ? "bg-blue-100 text-[#1e3a8a] border-2 border-blue-400"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Overview & Schema
        </button>
        <button
          onClick={() => setSelectedTab("organizations")}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
            selectedTab === "organizations"
              ? "bg-blue-100 text-[#1e3a8a] border-2 border-blue-400"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Organizations & Circulars
        </button>
        <button
          onClick={() => setSelectedTab("taxonomy")}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
            selectedTab === "taxonomy"
              ? "bg-blue-100 text-[#1e3a8a] border-2 border-blue-400"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Skill Taxonomy (Tier 1-4)
        </button>
        <button
          onClick={() => setSelectedTab("raw")}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
            selectedTab === "raw"
              ? "bg-blue-100 text-[#1e3a8a] border-2 border-blue-400"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Raw JSON Inspection
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === "overview" && stats && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2563eb]" />
              Database Scope & Governance Principles
            </h2>
            <p className="text-xs font-sans font-medium text-slate-700 leading-relaxed">
              This dataset is constructed from official Bangladesh Government Research Organization recruitment circulars (BARI, BINA, BJRI, BRRI, BTRI, BSRI). Salary scales represent National Pay Scale 2015 basic salary. Pre-joining skills represent mandatory circular requirements, while post-joining skills represent inferred operational competencies required for research advancement.
            </p>
          </div>

          {/* Org Breakdown Table */}
          <div className="rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b-2 border-slate-200 font-black text-sm uppercase text-slate-900 bg-slate-50">
              Government Research Institutes Breakdown
            </div>
            <div className="divide-y divide-slate-200">
              {stats.orgStats.map((o: any) => (
                <div key={o.acronym} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#2563eb] text-sm">{o.acronym}</span>
                      <span className="text-slate-900 font-bold">{o.name}</span>
                    </div>
                    <div className="text-slate-600 text-[11px] mt-0.5">
                      Deadline: {o.deadline} | INSYT Priority: <strong className="text-slate-900">{o.insytPriority}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">{o.jobsCount} Jobs</div>
                      <div className="text-[11px] text-slate-500 font-bold">{o.vacanciesCount} Total Vacancies</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "organizations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {organizations.map((org) => (
            <div key={org.acronym} className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-blue-100 text-[#1e3a8a] border border-blue-300">
                  {org.acronym}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                  {org.latest_supplied_recruitment?.total_vacancies || 0} Vacancies
                </span>
              </div>

              <h3 className="font-black text-slate-900 text-sm uppercase">{org.organization}</h3>
              <p className="text-xs font-sans text-slate-600 font-medium">
                {org.type} • {org.ministry} ({org.headquarters})
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div>
                  <strong className="text-slate-900">Circular Ref:</strong> {org.latest_supplied_recruitment?.circular_date || "Reference Database"}
                </div>
                <div>
                  <strong className="text-slate-900">Selection Mode:</strong> {org.latest_supplied_recruitment?.selection || "Written + Practical + Viva"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === "taxonomy" && taxonomy && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-black uppercase text-[#2563eb]">Tier 1: Core Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {taxonomy.tier_1_core.map((s: string) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1e3a8a] border border-blue-200 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-black uppercase text-[#2563eb]">Tier 2: High Value Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {taxonomy.tier_2_high_value.map((s: string) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1e3a8a] border border-blue-200 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-black uppercase text-purple-700">Tier 3: Specialized Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {taxonomy.tier_3_specialized.map((s: string) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-xs font-black uppercase text-amber-700">Tier 4: Operational Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {taxonomy.tier_4_operational.map((s: string) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "raw" && unifiedDbData && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[500px] shadow-inner">
          <pre>{JSON.stringify(unifiedDbData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
