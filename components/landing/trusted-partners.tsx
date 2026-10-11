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
    <section className="relative py-14 overflow-hidden bg-white border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] sm:text-[12px] font-mono font-bold uppercase tracking-[0.2em] mb-7 text-slate-500"
        >
          Trusted by professionals accelerating careers at top MNCs, Banks & Conglomerates
        </motion.p>

        {/* Marquee with smooth CSS alpha mask */}
        <div 
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner}-${i}`}
                className="mx-2.5 flex-shrink-0 px-4 py-2 rounded-xl transition-all duration-200 hover:border-blue-300 hover:shadow-sm cursor-default bg-slate-50 border border-slate-200/90"
              >
                <span className="text-[13px] font-semibold whitespace-nowrap text-slate-700">
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
