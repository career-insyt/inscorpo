"use client";

import { motion } from "framer-motion";

const partners = [
  "Microsoft", "British Council", "IDP", "Sonali Bank", "Janata Bank",
  "Agrani Bank", "Rupali Bank", "IFIC Bank", "City Bank", "BRAC Bank",
  "EBL", "DBBL", "Standard Chartered", "HSBC", "McKinsey",
  "BCG", "Deloitte", "EY", "PwC", "KPMG",
];

export function TrustedPartners() {
  return (
    <section className="relative py-8 sm:py-10 overflow-hidden bg-white border-b-2 border-slate-900 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] sm:text-xs font-black uppercase tracking-wider mb-5 text-slate-700"
        >
          // RECRUITER TALENT NETWORK · MNC, TIER-1 COMMERCIAL BANKS &amp; TOP CONGLOMERATES
        </motion.p>

        {/* Marquee with smooth CSS alpha mask */}
        <div 
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap py-1">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner}-${i}`}
                className="mx-2 flex-shrink-0 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-white shadow-[2px_2px_0px_0px_#0f172a] hover:shadow-[3px_3px_0px_0px_#2563eb] hover:-translate-y-0.5 transition-all cursor-default"
              >
                <span className="text-xs font-black text-slate-900">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
