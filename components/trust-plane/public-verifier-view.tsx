"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, ShieldAlert, Award, FileCheck2, ExternalLink,
  Code2, Copy, Check, ArrowLeft, Lock, Sparkles, Briefcase
} from "lucide-react";
import { VerificationResult } from "@/lib/trust-plane/types";

interface VerifierViewProps {
  id: string;
  result: VerificationResult;
}

export function PublicVerifierView({ id, result }: VerifierViewProps) {
  const [activeTab, setActiveTab] = useState<"details" | "taxonomy" | "cryptography">("details");
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    if (result.rawCredential) {
      navigator.clipboard.writeText(JSON.stringify(result.rawCredential, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result.verified) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] text-slate-900 flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white border-2 border-rose-300 rounded-2xl p-8 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">Cryptographic Verification Failed</h1>
            <p className="text-xs font-mono font-bold text-rose-600 mt-1 uppercase tracking-wider">Status: {result.status}</p>
          </div>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">
            {result.error ||
              "No authenticated, cryptographically signed credential matching this identifier exists on the INSYT Trust Plane."}
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 break-all text-left">
            <span className="text-slate-500 font-bold block mb-1">Target ID:</span>
            {id}
          </div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Return to INSYT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-900 font-sans">
      {/* Top Brand Banner */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              IN
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wide text-slate-900">INSYT Corporate</span>
              <span className="text-[10px] text-[#2563eb] font-mono font-bold tracking-widest uppercase">Trust Plane Verifier</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographically Verified</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Hero Card */}
        <section className="relative overflow-hidden rounded-3xl bg-white border-2 border-blue-400 p-8 md:p-10 shadow-[4px_4px_0px_0px_#2563eb]">
          <div className="relative flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-900">
                <Lock className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>W3C VC 2.0 &bull; Open Badges 3.0</span>
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-mono uppercase">
                  {result.badge?.name || "Professional Certification"}
                </h1>
                <p className="text-slate-600 mt-2 text-sm leading-relaxed font-medium">
                  {result.badge?.description}
                </p>
              </div>

              {/* Recipient & Issuer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Recipient</span>
                  <div className="text-base font-black text-slate-900">{result.recipient}</div>
                  <div className="text-[11px] font-mono text-slate-600 truncate" title={result.recipientHash}>
                    {result.recipientHash}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Issuing Authority</span>
                  <div className="text-base font-black text-slate-900">{result.issuer?.name || "INSYT Corporate Authority"}</div>
                  <div className="text-[11px] font-mono text-[#2563eb] truncate">
                    {result.issuer?.id || "did:web:career.insyt.bd"}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Seal Badge */}
            <div className="flex-shrink-0 w-full md:w-56 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border-2 border-blue-300 text-center space-y-3 font-mono">
              <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-[#2563eb] flex items-center justify-center text-[#2563eb] shadow-sm">
                <Award className="w-10 h-10" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-black text-slate-900">Verified Master</div>
                <div className="text-xs font-semibold text-slate-600">Issued: {result.issuedAt ? new Date(result.issuedAt).toLocaleDateString() : "Active"}</div>
              </div>
              <div className="w-full pt-2 border-t border-slate-200 text-[11px] font-bold text-emerald-700 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Revocation: Active</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-200 font-mono">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "details"
                  ? "bg-blue-100 text-[#1e3a8a] border-2 border-blue-400"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Assessment Evidence
            </button>
            <button
              onClick={() => setActiveTab("taxonomy")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "taxonomy"
                  ? "bg-blue-100 text-[#1e3a8a] border-2 border-blue-400"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Labor Taxonomy Alignments ({result.taxonomyAlignments?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("cryptography")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "cryptography"
                  ? "bg-blue-100 text-[#1e3a8a] border-2 border-blue-400"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Cryptographic Proof & JSON-LD
            </button>
          </div>
        </section>

        {/* Tab 1: Evidence */}
        {activeTab === "details" && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase">
                <FileCheck2 className="w-4 h-4 text-[#2563eb]" />
                <span>Assessment Criteria</span>
              </div>
              <p className="text-sm font-sans font-medium text-slate-700 leading-relaxed">
                {result.badge?.criteria?.narrative ||
                  "The candidate completed proctored evaluation modules covering comprehensive financial, strategic, and technical competencies."}
              </p>
              {result.badge?.criteria?.id && (
                <a
                  href={result.badge.criteria.id}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#2563eb] hover:underline font-bold"
                >
                  View Track Curriculum Criteria <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase">
                <Sparkles className="w-4 h-4 text-[#2563eb]" />
                <span>Psychometric Metrics</span>
              </div>
              {result.evidence && result.evidence.length > 0 ? (
                result.evidence.map((ev, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800">{ev.description}</span>
                      {ev.score !== undefined && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-black">
                          {ev.score}%
                        </span>
                      )}
                    </div>
                    {ev.psychometricConfidence && (
                      <div className="text-[11px] font-mono text-slate-600">
                        Confidence: {ev.psychometricConfidence}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-sm font-sans text-slate-600 font-medium">
                  Standard Item Response Theory assessment calibrated at SEM &le; 0.30.
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tab 2: Taxonomy */}
        {activeTab === "taxonomy" && (
          <section className="space-y-4 font-mono">
            <div className="flex items-center gap-2 text-slate-800 text-sm font-bold">
              <Briefcase className="w-4 h-4 text-[#2563eb]" />
              <span>International Labor Frameworks (ESCO v1.2, O*NET SOC 2019, WEF)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.taxonomyAlignments?.map((alignment, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border-2 border-slate-200 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-[#2563eb] border border-blue-200">
                      {alignment.targetFramework}
                    </div>
                    <div className="text-sm font-black text-slate-900">{alignment.targetName}</div>
                    <p className="text-xs font-sans text-slate-600 leading-relaxed font-medium">{alignment.targetDescription}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500 truncate max-w-[160px]">{alignment.targetCode}</span>
                    <a
                      href={alignment.targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#2563eb] hover:underline inline-flex items-center gap-1 font-bold"
                    >
                      Official Registry <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Cryptography */}
        {activeTab === "cryptography" && (
          <section className="space-y-6 font-mono">
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase">
                  <Code2 className="w-4 h-4 text-[#2563eb]" />
                  <span>W3C DataIntegrityProof Verification</span>
                </div>
                {result.rawCredential && (
                  <button
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Canonical JSON-LD"}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Proof Suite</span>
                  <div className="text-slate-900 font-bold">{result.proof?.cryptosuite || "eddsa-jcs-2022"}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Verification Method</span>
                  <div className="text-slate-900 font-bold truncate">{result.proof?.verificationMethod}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Ed25519 Multibase Signature</span>
                  <div className="text-[#2563eb] break-all text-[11px] font-bold">{result.proof?.proofValue}</div>
                </div>
              </div>

              {result.rawCredential && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700">Raw Canonical Payload (RFC 8785)</span>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-80 shadow-inner">
                    {JSON.stringify(result.rawCredential, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
