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
    <section className="relative py-12 sm:py-14 overflow-hidden backdrop-blur-xl bg-white/60 border-y border-white/80 font-bangla">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm font-bold tracking-wide mb-6 text-slate-700"
        >
          দেশের শীর্ষস্থানীয় করপোরেট প্রতিষ্ঠান ও মাল্টিন্যাশনাল কোম্পানিতে ক্যারিয়ার গঠনের জন্য প্রস্তুতকৃত
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
                className="mx-2 flex-shrink-0 px-4 py-2 rounded-xl transition-all duration-200 hover:border-blue-400 hover:shadow-md cursor-default backdrop-blur-md bg-white/80 border border-white/90 shadow-xs"
              >
                <span className="text-xs sm:text-[13px] font-bold whitespace-nowrap text-slate-800">
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
