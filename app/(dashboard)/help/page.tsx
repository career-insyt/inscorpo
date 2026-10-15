"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  BookOpen,
  Zap,
  Shield,
  Send,
  CheckCircle2,
  Headphones,
  LifeBuoy,
  FileText,
  Mail,
  ExternalLink,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    category: "General",
    q: "How does the XP and Career Velocity system work?",
    a: "Every action earns XP — completing modules (40 XP), taking mock tests (100–200 XP), daily check-in streaks (25 XP), and community participation. XP drives your Career Rank (Bronze → Silver → Gold → Platinum → Diamond → Elite) and powers your Recruiter Index.",
  },
  {
    category: "Certificates",
    q: "What makes the Career Passport verifiable by MNC recruiters?",
    a: "Your Career Passport utilizes W3C VC 2.0 standards with Ed25519 cryptographic signatures. Every verified skill is tied to completed coursework or AI-proctored skill audits that recruiters can verify via QR code or direct URL verification.",
  },
  {
    category: "Testing",
    q: "How are the practice tests and mock interviews structured?",
    a: "Mock tests replicate actual candidate assessment criteria with negative marking, timed problem-solving, and percentile benchmarking. AI Mock Interviews simulate real FMCG, bank, and consulting panel interviews with STAR analysis.",
  },
  {
    category: "Subscription",
    q: "What is included with INSYT Pro Membership?",
    a: "Pro membership unlocks all flagship learning tracks (Excel, Power BI, AI Automation, Financial Modeling), unlimited practice exams, unlimited AI mock interviews, verified ATS CV export, and priority talent placement support.",
  },
  {
    category: "Subscription",
    q: "How can I manage or cancel my active subscription?",
    a: "You can upgrade, renew, or manage your membership anytime from the Membership Plan page or System Settings. Your active privileges remain accessible until the end of the current billing cycle.",
  },
  {
    category: "General",
    q: "How do I report technical issues or curriculum errors?",
    a: "You can submit a ticket using the Contact Support form below or message our engineering desk directly at career@insyt.bd. Corporate candidates receive response priority within 2 hours.",
  },
];

const QUICK_RESOURCES = [
  {
    icon: BookOpen,
    title: "Curriculum & Paths",
    desc: "Mastery progression, lesson players & capstones",
    link: "/learn",
    badge: "10 Tracks",
    bg: "bg-blue-600",
  },
  {
    icon: Shield,
    title: "Career Passport",
    desc: "Setup verified credentials & recruiter export",
    link: "/career-passport",
    badge: "ATS Ready",
    bg: "bg-emerald-600",
  },
  {
    icon: Zap,
    title: "Practice Tests",
    desc: "Diagnostic mocks, timer rules & percentile scoring",
    link: "/mock-tests",
    badge: "AI Proctored",
    bg: "bg-amber-500",
  },
  {
    icon: Award,
    title: "Membership Tiers",
    desc: "Compare starter, track pass, and Pro access",
    link: "/subscription",
    badge: "Pro Plan",
    bg: "bg-purple-600",
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [ticketSubject, setTicketSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ticketType, setTicketType] = useState("Technical");
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setMessage("");
    setTicketSubject("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 font-sans">
      {/* ── Corporate Hero Header Banner ── */}
      <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] p-6 bg-white text-slate-900 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] flex-shrink-0">
              <LifeBuoy size={28} />
            </div>
            <div className="space-y-1 font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900">
                  Help &amp; Candidate Support Desk
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  SLA: Active &lt; 2h
                </span>
              </div>
              <p className="text-xs text-slate-600 font-sans font-medium">
                Comprehensive platform documentation, curriculum specifications, and direct corporate ticketing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono flex-shrink-0">
            <a
              href="mailto:career@insyt.bd"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border-2 border-slate-300 hover:border-slate-800 bg-slate-50 text-slate-800 transition-all shadow-xs"
            >
              <Mail size={13} className="text-[#2563eb]" />
              <span>career@insyt.bd</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Quick Knowledge Navigation Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {QUICK_RESOURCES.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.link}
              className="p-4 sm:p-5 rounded-2xl border-2 border-slate-900 bg-white text-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl text-white flex items-center justify-center border-2 border-slate-900 shadow-xs",
                      item.bg
                    )}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[10px] font-bold text-[#2563eb] flex items-center justify-between">
                <span>Explore Guide</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── 2-Column: FAQ Accordion & Direct Ticket Submission ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: FAQ Section (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] bg-white p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-3 font-mono">
              <div className="flex items-center gap-2 flex-shrink-0">
                <HelpCircle size={17} className="text-[#2563eb]" />
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Frequently Answered Questions
                </h2>
              </div>

              {/* Category Pills: flex-wrap ensures clean layout without an ugly horizontal scrollbar */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                {(["All", "General", "Certificates", "Testing", "Subscription"] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg font-black transition-all cursor-pointer border whitespace-nowrap",
                        selectedCategory === cat
                          ? "bg-[#2563eb] text-white border-blue-700 shadow-xs"
                          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                      )}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Accordion List */}
            <div className="divide-y divide-slate-100 font-sans">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="py-2.5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-3 text-left py-1.5 transition-colors group cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {faq.q}
                      </span>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 border transition-all",
                          isOpen
                            ? "bg-blue-600 text-white border-blue-700"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        )}
                      >
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-slate-600 leading-relaxed pt-2 pb-1 font-medium">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Direct Corporate Ticket Submission (5 cols) */}
        <div className="lg:col-span-5 space-y-4 font-mono">
          <div className="rounded-2xl border-2 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] bg-white p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-400 border border-amber-500 text-amber-950 flex items-center justify-center shadow-xs">
                <MessageSquare size={14} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 leading-tight">
                  Open Support Ticket
                </h3>
                <p className="text-[10px] text-slate-500 font-sans">
                  Direct response from INSYT Engineering
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-sm font-black uppercase text-slate-900">Ticket Dispatched!</h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Ticket #INSYT-{(Date.now() % 100000).toString()} has been routed to our technical desk. An email confirmation has been logged.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
                  >
                    Send Another Ticket
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-700">Ticket Category</label>
                    <select
                      value={ticketType}
                      onChange={(e) => setTicketType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 text-xs bg-slate-50 outline-none focus:border-blue-600 cursor-pointer font-bold"
                    >
                      <option value="Technical">Platform &amp; Code Bug</option>
                      <option value="Curriculum">Lesson &amp; Exam Content</option>
                      <option value="Billing">Pro Billing &amp; Payment</option>
                      <option value="Passport">Career Passport ATS Export</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-700">Subject</label>
                    <input
                      type="text"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="Brief summary of your question"
                      required
                      className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 text-xs bg-slate-50 outline-none focus:border-blue-600 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-700">Detailed Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Explain what happened or what assistance you require..."
                      required
                      className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 text-xs bg-slate-50 outline-none focus:border-blue-600 font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase text-white bg-[#2563eb] hover:bg-blue-600 transition-all border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Submit Candidate Ticket</span>
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
