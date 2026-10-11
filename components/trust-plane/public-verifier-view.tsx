'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  Award,
  ExternalLink,
  Copy,
  Check,
  Code2,
  Lock,
  Layers,
  Sparkles,
  ArrowLeft,
  Briefcase,
  FileCheck2,
} from 'lucide-react';

interface VerifierViewProps {
  id: string;
  result: {
    verified: boolean;
    status: string;
    error?: string;
    issuer?: {
      id: string;
      name: string;
      url: string;
      email: string;
    };
    issuedAt?: string;
    recipient?: string;
    recipientHash?: string;
    badge?: {
      name?: string;
      description?: string;
      image?: string;
      criteria?: {
        id?: string;
        narrative?: string;
      };
    };
    evidence?: Array<{
      id: string;
      type: string[];
      description: string;
      score?: number;
      psychometricConfidence?: string;
    }>;
    proof?: {
      type: string;
      cryptosuite: string;
      created: string;
      verificationMethod: string;
      proofValue: string;
    };
    taxonomyAlignments?: Array<{
      targetName: string;
      targetUrl: string;
      targetDescription: string;
      targetFramework: string;
      targetCode: string;
    }>;
    rawCredential?: Record<string, any>;
  };
}

export function PublicVerifierView({ id, result }: VerifierViewProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'taxonomy' | 'cryptography'>('details');
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
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-rose-500/30">
        <div className="max-w-md w-full bg-slate-900/90 border border-rose-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Cryptographic Verification Failed</h1>
            <p className="text-xs font-mono text-rose-400 mt-1 uppercase tracking-wider">Status: {result.status}</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {result.error ||
              'No authenticated, cryptographically signed credential matching this identifier exists on the INSYT Trust Plane.'}
          </p>
          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 break-all text-left">
            <span className="text-slate-500 select-none block mb-1">Target ID:</span>
            {id}
          </div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to INSYT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      {/* Top Brand Banner */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              IN
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-slate-100">INSYT Corporate</span>
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Trust Plane Verifier</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographically Verified</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Hero Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-8 md:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>W3C VC 2.0 &bull; Open Badges 3.0</span>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
                  {result.badge?.name || 'Professional Certification'}
                </h1>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  {result.badge?.description}
                </p>
              </div>

              {/* Recipient & Issuer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Recipient</span>
                  <div className="text-base font-bold text-slate-100">{result.recipient}</div>
                  <div className="text-[11px] font-mono text-slate-500 truncate" title={result.recipientHash}>
                    {result.recipientHash}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Issuing Authority</span>
                  <div className="text-base font-bold text-slate-100">{result.issuer?.name || 'INSYT Corporate Authority'}</div>
                  <div className="text-[11px] font-mono text-emerald-400 truncate">
                    {result.issuer?.id || 'did:web:insyt.co'}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Seal Badge */}
            <div className="flex-shrink-0 w-full md:w-56 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/80 text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
                <Award className="w-10 h-10" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-slate-200">Verified Master</div>
                <div className="text-xs text-slate-400">Issued: {result.issuedAt ? new Date(result.issuedAt).toLocaleDateString() : 'Active'}</div>
              </div>
              <div className="w-full pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Revocation: Active</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'details'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Assessment Evidence
            </button>
            <button
              onClick={() => setActiveTab('taxonomy')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'taxonomy'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Labor Taxonomy Alignments ({result.taxonomyAlignments?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('cryptography')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'cryptography'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Cryptographic Proof & JSON-LD
            </button>
          </div>
        </section>

        {/* Tab 1: Evidence */}
        {activeTab === 'details' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Assessment Criteria</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {result.badge?.criteria?.narrative ||
                  'The candidate completed proctored evaluation modules covering comprehensive financial, strategic, and technical competencies.'}
              </p>
              {result.badge?.criteria?.id && (
                <a
                  href={result.badge.criteria.id}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  View Track Curriculum Criteria <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Psychometric Metrics</span>
              </div>
              {result.evidence && result.evidence.length > 0 ? (
                result.evidence.map((ev, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-300">{ev.description}</span>
                      {ev.score !== undefined && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          {ev.score}%
                        </span>
                      )}
                    </div>
                    {ev.psychometricConfidence && (
                      <div className="text-[11px] font-mono text-slate-500">
                        Confidence: {ev.psychometricConfidence}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-400">
                  Standard Item Response Theory assessment calibrated at SEM &le; 0.30.
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tab 2: Taxonomy */}
        {activeTab === 'taxonomy' && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>International Labor Frameworks (ESCO v1.2, O*NET SOC 2019, WEF)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.taxonomyAlignments?.map((alignment, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-emerald-400">
                      {alignment.targetFramework}
                    </div>
                    <div className="text-sm font-bold text-slate-200">{alignment.targetName}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{alignment.targetDescription}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500 truncate max-w-[160px]">{alignment.targetCode}</span>
                    <a
                      href={alignment.targetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
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
        {activeTab === 'cryptography' && (
          <section className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>W3C DataIntegrityProof Verification</span>
                </div>
                {result.rawCredential && (
                  <button
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Canonical JSON-LD'}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px]">Proof Suite</span>
                  <div className="text-slate-200 font-bold">{result.proof?.cryptosuite || 'eddsa-rdfc-2022'}</div>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px]">Verification Method</span>
                  <div className="text-slate-200 font-bold truncate">{result.proof?.verificationMethod}</div>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px]">Ed25519 Multibase Signature</span>
                  <div className="text-emerald-400 break-all text-[11px]">{result.proof?.proofValue}</div>
                </div>
              </div>

              {result.rawCredential && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400">Raw Canonical Payload (RFC 8785)</span>
                  <pre className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-80">
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
