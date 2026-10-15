import Link from "next/link";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Features", href: "/#features" },
    { label: "Learning Paths", href: "/learn" },
    { label: "Mock Tests", href: "/mock-tests" },
    { label: "Career Passport", href: "/career-passport" },
    { label: "AI Tools", href: "/ai" },
  ],
  Programs: [
    { label: "Financial Modeling", href: "/learn/corporate-financial-modeler" },
    { label: "Executive Presentation", href: "/learn/presentation-engineering" },
    { label: "AI for Business", href: "/learn/ai-for-work" },
    { label: "GRE / GMAT Prep", href: "/learn/gre-preparation" },
    { label: "Corporate Skills", href: "/learn" },
  ],
  Company: [
    { label: "About INSYT", href: "/about" },
    { label: "Careers & Jobs", href: "/jobs" },
    { label: "Community", href: "/community" },
    { label: "Pro Membership", href: "/subscription" },
    { label: "Help & Terms", href: "/help" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative border-t border-blue-900/60 bg-gradient-to-b from-[#0e214d] via-[#0b1b40] to-[#07132e] text-white">
      {/* Website Blue Ambient Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#3B5BDB] to-transparent" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 pb-8 border-b border-blue-900/40">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-flex flex-col group" title="CAREERINSYT">
              <img src="/logo/logoTextWhite.png" alt="CAREERINSYT" className="h-6 w-auto object-contain group-hover:opacity-90 transition-opacity" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-300/80 mt-1">
                Career OS
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-blue-100/75 max-w-sm">
              The Career Operating System. Level up your corporate career with structured learning, AI tools, and gamified growth.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-blue-200/80 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-blue-400" />
                Dhaka, Bangladesh
              </span>
              <a href="mailto:insyt.bd@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={13} className="text-blue-400" />
                insyt.bd@gmail.com
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-200/90 mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-blue-100/70 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-blue-300/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-blue-400" />
            <span>&copy; {new Date().getFullYear()} INSYT. All rights reserved. Crafted with excellence in Bangladesh.</span>
          </div>

          <div className="flex items-center gap-2">
            <a href="https://linkedin.com/company/insytcorporate" target="_blank" rel="noopener noreferrer"
              aria-label="INSYT LinkedIn"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-blue-950/60 border border-blue-800/50 text-blue-200 hover:text-white hover:bg-blue-800/40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://facebook.com/insytcorporate" target="_blank" rel="noopener noreferrer"
              aria-label="INSYT Facebook"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-blue-950/60 border border-blue-800/50 text-blue-200 hover:text-white hover:bg-blue-800/40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://youtube.com/@insytcorporate" target="_blank" rel="noopener noreferrer"
              aria-label="INSYT YouTube"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-blue-950/60 border border-blue-800/50 text-blue-200 hover:text-white hover:bg-blue-800/40"
            >
              <svg width="15" height="11" viewBox="0 0 24 17" fill="currentColor">
                <path d="M23.5 2.5s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.8 0 12 0 12 0S7.2 0 4.7.4c-.6.1-1.9.1-3 1.3C.8 2.5.5 4.5.5 4.5S.2 6.8.2 9v2.1c0 2.2.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7 19.8 12 19.8 12 19.8s4.8 0 7.3-.4c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5V9c0-2.2-.3-4.5-.3-4.5zM9.7 13V5.8l8.1 3.6-8.1 3.6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
