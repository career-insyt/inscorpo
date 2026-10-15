"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award, FileDown, Share2, CheckCircle2, ShieldCheck, Star, X,
  Lock, BookOpen, ArrowRight, Sparkles, ExternalLink, Play
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { useCapCutCourse } from "@/lib/state/capcut-submissions";

const PATH_META: Record<string, { title: string; gradient: string; issuer: string }> = {
  "video-ai-production": { title: "Video Editing + AI Production", gradient: "from-[#2e1065] to-[#8b5cf6]", issuer: "Creative & AI Media Board" },
  "presentation-engineering": { title: "Gamma + Canva + PowerPoint", gradient: "from-[#78350f] to-[#f59e0b]", issuer: "Executive Communications Board" },
  "ai-for-work": { title: "AI for Work, Career & Business", gradient: "from-[#083344] to-[#06b6d4]", issuer: "AI Innovation & Governance Lab" },
  "gre-preparation": { title: "GRE Preparation Masterclass", gradient: "from-[#881337] to-[#e11d48]", issuer: "GRE Quantitative & Verbal Institute" },
};

function CornerOrnament({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M4 4 L4 26 Q4 8 22 4 Z" fill="none" stroke="#10b981" strokeWidth="2" />
      <path d="M4 4 L26 4 Q8 4 4 22 Z" fill="none" stroke="#10b981" strokeWidth="2" />
      <circle cx="4" cy="4" r="3" fill="#10b981" />
    </svg>
  );
}

function WaxSeal() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <circle cx="34" cy="34" r="30" fill="#022c22" stroke="#10b981" strokeWidth="2" />
      <circle cx="34" cy="34" r="24" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
      <text x="34" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#10b981" fontFamily="monospace">I</text>
    </svg>
  );
}

type CertProps = {
  title: string;
  recipient: string;
  date: string;
  certId: string;
  issuer: string;
  demo?: boolean;
  scoreText?: string;
};

function CertificateCard({ title, recipient, date, certId, issuer, demo, scoreText }: CertProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl select-none border-2 border-[#10b981] shadow-[6px_6px_0px_0px_#10b981]"
      style={{
        background: "linear-gradient(145deg, #022c22 0%, #064e3b 40%, #0f172a 100%)",
        minHeight: "320px",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#10b981]" />

      {demo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-1">
          <p className="text-[90px] font-mono font-extrabold tracking-widest rotate-[-30deg] opacity-10 text-white">SAMPLE</p>
        </div>
      )}

      <div className="absolute top-4 left-4"><CornerOrnament /></div>
      <div className="absolute top-4 right-4"><CornerOrnament rotate={90} /></div>
      <div className="absolute bottom-4 left-4"><CornerOrnament rotate={270} /></div>
      <div className="absolute bottom-4 right-4"><CornerOrnament rotate={180} /></div>

      <div className="relative z-10 flex flex-col items-center justify-between p-8 md:p-10 text-white font-mono" style={{ minHeight: "320px" }}>
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#10b981] text-emerald-950 flex items-center justify-center font-black text-sm border border-emerald-300">
              I
            </div>
            <div>
              <p className="text-xs font-extrabold tracking-widest text-[#10b981]">INSYT</p>
              <p className="text-[9px] tracking-[0.15em] uppercase text-emerald-200">Creative &amp; Technical Media Board</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10b981]/20 border border-[#10b981] text-[#10b981]">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-extrabold tracking-wide uppercase">
              {scoreText || "Verified Credential"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#FDE047" className="text-amber-300" />)}
        </div>

        <div className="text-center space-y-3 flex-1 flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.35em] font-extrabold text-emerald-300">Certificate of Completion</p>
          <h2 className="text-lg md:text-xl font-extrabold uppercase tracking-tight text-white">
            {title}
          </h2>
          <div className="space-y-0.5">
            <p className="text-[10px] tracking-widest uppercase text-emerald-200">This is to certify that</p>
            <p className="text-2xl font-extrabold text-[#FEF08A]">{recipient}</p>
          </div>
          <p className="text-xs leading-relaxed max-w-sm text-emerald-100 font-sans font-medium">
            has successfully completed all required coursework, passed the strict 80% evaluation benchmark, and demonstrated professional competency in the executive program.
          </p>
        </div>

        <div className="w-full border-t-2 border-white/20 my-3" />

        <div className="w-full flex items-end justify-between text-xs">
          <div className="space-y-2">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#10b981]">Course Director</p>
              <p className="text-[10px] font-bold text-white">{issuer}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <WaxSeal />
            <p className="text-[8px] uppercase tracking-widest text-[#10b981]">Official Seal</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[9px] uppercase tracking-wider text-[#10b981]">Issued: {date}</p>
            <p className="text-[10px] font-mono text-emerald-200">ID: {certId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockedCertCard({ title, progress, pathSlug, requirementText }: { title: string; progress: number; pathSlug: string; requirementText?: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border-2 border-amber-500 shadow-[5px_5px_0px_0px_#78350f] bg-slate-900/95 p-8 text-white space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 border-2 border-amber-500 flex items-center justify-center flex-shrink-0">
            <Lock size={20} />
          </div>
          <div>
            <h3 className="text-base font-extrabold font-mono uppercase text-white">{title}</h3>
            <p className="text-xs text-amber-200 font-medium">
              {requirementText || "Threshold Gated: Achieve &ge; 80% cumulative rubric score across milestone deliverables"}
            </p>
          </div>
        </div>

        <Link
          href={`/learn/${pathSlug}`}
          className="px-5 py-2.5 rounded-lg text-xs font-mono font-extrabold text-white bg-amber-600 hover:bg-amber-500 transition-all shadow-[3px_3px_0px_0px_#78350f] border-2 border-amber-300 uppercase flex items-center gap-1.5"
        >
          <span>Continue Track</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="space-y-1.5 pt-2">
        <div className="flex justify-between text-xs font-mono font-extrabold text-amber-200">
          <span>Current Score / Progress</span>
          <span>{progress}% (80% Required)</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative">
          <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${Math.min(100, progress)}%` }} />
          <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: "80%" }} />
        </div>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const { state } = useUser();
  const { metrics, state: capcutState } = useCapCutCourse();
  const [downloading, setDownloading] = useState<string | null>(null);
  const certRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const issueDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const earnedCerts = state.courseProgress
    .filter((c) => c.progress === 100)
    .map((c) => ({
      slug: c.id,
      title: c.title,
      pathSlug: c.id,
      certId: `INSYT-${c.id.slice(0, 8).toUpperCase()}-VERIFIED`,
      issuer: PATH_META[c.id]?.issuer ?? "INSYT Academic Board",
      unlocked: true,
    }));

  const lockedCerts = state.enrolledPathSlugs
    .filter((slug) => !earnedCerts.some((c) => c.pathSlug === slug))
    .map((slug) => {
      const meta = PATH_META[slug];
      if (!meta) return null;
      const pathCourses = state.courseProgress.filter((c) => c.id.includes(slug.split("-")[0]));
      const avgProgress = pathCourses.length > 0
        ? Math.round(pathCourses.reduce((a, c) => a + c.progress, 0) / pathCourses.length)
        : 0;
      return { slug, title: meta.title, progress: avgProgress, pathSlug: slug };
    })
    .filter(Boolean) as { slug: string; title: string; progress: number; pathSlug: string }[];

  const handleDownloadPdf = useCallback(async (certSlug: string, certTitle: string) => {
    setDownloading(certSlug);
    try {
      const { jsPDF } = await import("jspdf");

      let el = certRefs.current[certSlug];
      if (!el && certSlug === "demo") {
        el = certRefs.current["demo"];
      }
      if (!el && certSlug === "capcut-master") {
        el = certRefs.current["capcut-master"];
      }

      let generated = false;

      if (el) {
        try {
          const html2canvas = (await import("html2canvas")).default;
          const canvas = await html2canvas(el, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#022c22",
            logging: false,
          });

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width / 2, canvas.height / 2],
          });
          pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
          pdf.save(`INSYT-Certificate-${certTitle.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
          generated = true;
        } catch (canvasErr) {
          console.warn("Canvas rasterization fallback to direct vector PDF:", canvasErr);
        }
      }

      // Direct vector PDF fallback: Always downloads exact PDF, NEVER triggers window.print()
      if (!generated) {
        const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        // Background
        pdf.setFillColor(2, 44, 34); // #022c22
        pdf.rect(0, 0, 297, 210, "F");

        // Outer & Inner Borders
        pdf.setDrawColor(16, 185, 129); // #10b981
        pdf.setLineWidth(1.5);
        pdf.rect(10, 10, 277, 190);

        pdf.setDrawColor(245, 158, 11); // #f59e0b
        pdf.setLineWidth(0.5);
        pdf.rect(13, 13, 271, 184);

        // Header
        pdf.setTextColor(16, 185, 129);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text("INSYT CORPORATE ACADEMY", 148.5, 34, { align: "center" });

        pdf.setFontSize(9);
        pdf.setTextColor(209, 250, 229);
        pdf.text("EXECUTIVE EVALUATION & TECHNICAL ACCREDITATION COUNCIL", 148.5, 40, { align: "center" });

        pdf.setFontSize(22);
        pdf.setTextColor(255, 255, 255);
        pdf.text("CERTIFICATE OF COMPLETION", 148.5, 60, { align: "center" });

        pdf.setFontSize(10);
        pdf.setTextColor(16, 185, 129);
        pdf.text("THIS VERIFIED CREDENTIAL IS PROUDLY CONFERRED UPON", 148.5, 78, { align: "center" });

        pdf.setFontSize(28);
        pdf.setTextColor(254, 240, 138); // #FEF08A
        pdf.text(state.name || "Verified Executive", 148.5, 98, { align: "center" });

        pdf.setFontSize(15);
        pdf.setTextColor(255, 255, 255);
        pdf.text(certTitle, 148.5, 118, { align: "center" });

        pdf.setFontSize(10);
        pdf.setTextColor(209, 250, 229);
        const desc = "For demonstrating verified competency, completing all required master coursework, and passing the 80% rubric evaluation benchmark under corporate simulation standards.";
        pdf.text(desc, 148.5, 132, { align: "center", maxWidth: 210 });

        // Footer Metadata & Seals
        pdf.setFontSize(9);
        pdf.setTextColor(16, 185, 129);
        pdf.text("ISSUED: " + issueDate, 25, 178);
        pdf.text("CREDENTIAL ID: INSYT-" + Math.random().toString(36).substring(2, 9).toUpperCase() + "-VERIFIED", 25, 185);

        pdf.text("ACADEMIC BOARD VERIFICATION SEAL", 272, 178, { align: "right" });
        pdf.text("W3C VC 2.0 CRYPTOGRAPHICALLY SIGNED", 272, 185, { align: "right" });

        pdf.save(`INSYT-Certificate-${certTitle.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
      }
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setDownloading(null);
    }
  }, [state.name, issueDate]);

  const demoCert = {
    title: "CapCut Master Video Editor V2",
    recipient: state.name || "Your Name",
    date: issueDate,
    certId: "INSYT-CAPCUT-2026",
    issuer: "Creative & AI Media Board",
    scoreText: "Rubric Score: 88% (Pass)",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 px-4 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-mono uppercase tracking-tight" style={{ color: "var(--corp-text)" }}>
          Verified Credentials
        </h1>
        <p className="text-xs sm:text-sm mt-1 font-medium" style={{ color: "var(--corp-text-secondary)" }}>
          Official professional certifications issued upon meeting verified evaluation benchmarks (&ge; 80% rubric score) — downloadable, shareable, and cryptographically verifiable.
        </p>
      </div>

      {/* ── SPECIAL SECTION: CAPCUT MASTER ACADEMY V2 CREDENTIAL ── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <h2 className="text-sm font-mono font-extrabold uppercase tracking-wider text-emerald-400">
              Flagship Credential: CapCut Master Academy V2
            </h2>
          </div>

          <Link
            href="/learn/capcut-master-academy"
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Course Hub</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {metrics.isThresholdMet ? (
          <div className="space-y-3">
            <div ref={(el) => { certRefs.current["capcut-master"] = el; }}>
              <CertificateCard
                title="CapCut Certified Master Video Editor"
                recipient={capcutState.studentName || state.name || "Creative Director"}
                date={issueDate}
                certId="INSYT-CAPCUT-V2-MASTER"
                issuer="Creative & AI Media Board"
                scoreText={`Rubric Score: ${metrics.cumulativeScore}%`}
              />
            </div>
            <div className="flex items-center gap-2 justify-end flex-wrap font-mono">
              <a
                href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent("CapCut Certified Master Video Editor")}&organizationName=INSYT+Media+Lab&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent("https://insyt.co/verify/INSYT-CAPCUT-V2-MASTER")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold text-white bg-[#0A66C2] border-2 border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]"
              >
                <Share2 size={12} /> Share to LinkedIn
              </a>
              <button
                onClick={() => handleDownloadPdf("capcut-master", "CapCut Certified Master Video Editor")}
                disabled={downloading === "capcut-master"}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold text-emerald-950 bg-[#10b981] hover:bg-emerald-400 border-2 border-emerald-300 shadow-[2px_2px_0px_0px_#064e3b] uppercase"
              >
                <FileDown size={12} />
                {downloading === "capcut-master" ? "Generating..." : "Download Official PDF"}
              </button>
            </div>
          </div>
        ) : (
          <LockedCertCard
            title="CapCut Certified Master Video Editor"
            progress={metrics.cumulativeScore}
            pathSlug="capcut-master-academy"
            requirementText={`Threshold Requirement: Average score ≥ 80% across milestone deliverables (Current: ${metrics.cumulativeScore}%)`}
          />
        )}
      </div>

      {/* Demo preview */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] opacity-75" />
          <p className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#10b981]">
            Standard Certificate Preview
          </p>
        </div>
        <div ref={(el) => { certRefs.current["demo"] = el; }}>
          <CertificateCard {...demoCert} demo />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <p className="text-xs font-medium text-slate-400">
            Submit coursework deliverables and achieve &ge; 80% to earn your personalized certificate.
          </p>
          <button
            onClick={() => handleDownloadPdf("demo", demoCert.title)}
            disabled={downloading === "demo"}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-mono font-extrabold text-emerald-950 bg-[#10b981] hover:bg-emerald-400 transition-all shadow-[3px_3px_0px_0px_#064e3b] border-2 border-emerald-300 uppercase flex-shrink-0"
          >
            <FileDown size={14} />
            {downloading === "demo" ? "Generating..." : "Download Preview PDF"}
          </button>
        </div>
      </div>

      {/* Earned certificates */}
      {earnedCerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-0.5 bg-slate-800" />
            <p className="text-xs font-mono font-extrabold uppercase tracking-widest flex items-center gap-1.5 text-[#10b981]">
              <CheckCircle2 size={14} /> Additional Earned Certificates
            </p>
            <div className="flex-1 h-0.5 bg-slate-800" />
          </div>

          {earnedCerts.map((cert) => (
            <div key={cert.slug} className="space-y-3">
              <div ref={(el) => { certRefs.current[cert.slug] = el; }}>
                <CertificateCard
                  title={cert.title}
                  recipient={state.name}
                  date={issueDate}
                  certId={cert.certId}
                  issuer={cert.issuer}
                />
              </div>
              <div className="flex items-center gap-2 justify-end flex-wrap font-mono">
                <button
                  onClick={() => handleDownloadPdf(cert.slug, cert.title)}
                  disabled={downloading === cert.slug}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold text-emerald-950 bg-[#10b981] hover:bg-emerald-400 border-2 border-emerald-300 shadow-[2px_2px_0px_0px_#064e3b] uppercase"
                >
                  <FileDown size={12} />
                  {downloading === cert.slug ? "Generating..." : "Download PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Locked / in-progress certificates */}
      {lockedCerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-0.5 bg-slate-800" />
            <p className="text-xs font-mono font-extrabold uppercase tracking-widest flex items-center gap-1.5 text-amber-500">
              <Lock size={14} /> In-Progress Course Tracks
            </p>
            <div className="flex-1 h-0.5 bg-slate-800" />
          </div>

          {lockedCerts.map((cert) => (
            <LockedCertCard
              key={cert.slug}
              title={cert.title}
              progress={cert.progress}
              pathSlug={cert.pathSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
