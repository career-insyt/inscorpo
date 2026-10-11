"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, BookOpen, Brain, Briefcase, Trophy, ChevronRight,
  Sparkles, Award, Compass, ArrowRight, CornerDownLeft, Clock, Zap
} from "lucide-react";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: "Courses" | "Practice Tests" | "AI Tools" | "Jobs" | "Navigation";
  url: string;
  tags?: string[];
  badge?: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  // Flagship Tracks & Courses
  {
    id: "course-enterprise-automation",
    title: "Applied Workplace AI: Enterprise Workflow Automation with n8n & Power Automate",
    description: "Master n8n workflow orchestration, Power Automate Cloud, Power Automate Desktop RPA, Microsoft Dataverse, and bounded Document AI for corporate digital transformation.",
    category: "Courses",
    url: "/learn/applied-ai-automation/applied-workplace-ai-enterprise-workflow-automation",
    tags: ["n8n", "Power Automate", "Power Platform", "Dataverse", "RPA", "Workflow Automation", "Document AI", "REST APIs", "Webhooks", "CEAS", "Nexus Global Logistics"],
    badge: "Flagship Academy",
  },
  {
    id: "course-enterprise-python",
    title: "Enterprise Python for Corporate Analytics & Process Automation",
    description: "Turn messy business data into automated reports, reliable data pipelines, and actionable corporate intelligence with Python 3.12, pandas, openpyxl, DuckDB & SQL.",
    category: "Courses",
    url: "/learn/corporate-analyst/enterprise-python-corporate-analytics-process-automation",
    tags: ["Python", "pandas", "openpyxl", "DuckDB", "SQLAlchemy", "Automation", "ETL", "FMCG Capstone", "Recruiter Simulation"],
    badge: "New Flagship",
  },
  {
    id: "course-ccfcm",
    title: "Corporate Financial Modeler & Commercial Finance (CCFCM)",
    description: "10-module, 48-lesson executive track covering PVM decomposition, 3-statement models, working capital, and DCF valuation.",
    category: "Courses",
    url: "/learn/corporate-financial-modeler",
    tags: ["Financial Modeling", "PVM", "DCF", "Excel", "WACC", "Valuation", "M&A"],
    badge: "Flagship",
  },
  {
    id: "course-cba",
    title: "Corporate Business Analyst & Commercial Strategy",
    description: "End-to-end business analysis, SQL analytics, KPI dashboards, and corporate presentation decks.",
    category: "Courses",
    url: "/learn/business-analyst",
    tags: ["Business Analysis", "Power BI", "SQL", "Requirements", "FMCG"],
    badge: "Popular",
  },
  {
    id: "course-powerbi-sql",
    title: "Enterprise Business Intelligence: Power BI & SQL for Corporate Analysts",
    description: "12-Week, 120-Hour Enterprise BI Apprenticeship: PostgreSQL, DuckDB, Power Query ETL, Kimball Star Schema, Advanced DAX & Apex Consumer Goods Capstone.",
    category: "Courses",
    url: "/learn/corporate-analyst/enterprise-business-intelligence-power-bi-sql-corporate-analysts",
    tags: ["Enterprise BI", "Power BI", "DAX", "SQL", "PostgreSQL", "Star Schema", "ETL", "Apex Capstone", "PL-300"],
    badge: "120-Hr Flagship",
  },
  {
    id: "course-mto-prep",
    title: "Management Trainee (MTO) Fast-Track Program",
    description: "Aptitude mastery, STAR behavioral interviews, assessment center case studies, and business acumen.",
    category: "Courses",
    url: "/learn/mto-prep",
    tags: ["MTO", "Aptitude", "Assessment Center", "FMCG", "Telecom", "Banking"],
    badge: "Career Track",
  },
  {
    id: "course-supply-chain",
    title: "Supply Chain & Operational Analytics",
    description: "Forecasting, inventory turnover, logistics optimization, and procurement cost modeling.",
    category: "Courses",
    url: "/learn/supply-chain",
    tags: ["Supply Chain", "Operations", "Logistics", "Inventory"],
  },
  {
    id: "course-executive-presentation",
    title: "Executive Presentation & Corporate Storytelling",
    description: "Pyramid Principle slide logic, executive chart hygiene, and persuasive board-level communication.",
    category: "Courses",
    url: "/learn/presentation-mastery",
    tags: ["PowerPoint", "Pyramid Principle", "Storytelling", "Slides"],
  },
  {
    id: "course-individual-catalog",
    title: "Individual Skills & Modular Courses Catalog",
    description: "Browse 35+ targeted individual modules in financial formulas, SQL queries, DAX patterns, and STAR interview drills.",
    category: "Courses",
    url: "/learn/courses",
    tags: ["Courses", "Modules", "Lessons", "Skills"],
  },

  // Practice Tests / Diagnostics
  {
    id: "test-mto-aptitude",
    title: "MTO Standardized Cognitive Aptitude Assessment",
    description: "Diagnostic benchmark measuring Quantitative Reasoning, Verbal Logic, and Data Interpretation.",
    category: "Practice Tests",
    url: "/mock-tests/mto-cognitive-aptitude",
    tags: ["Cognitive", "Quant", "Logic", "Verbal", "Aptitude"],
    badge: "Diagnostic",
  },
  {
    id: "test-excel-modeling",
    title: "Excel Commercial Modeling Benchmark",
    description: "Real-world timed modeling assessment covering dynamic INDEX/MATCH, sensitivity tables, and revenue forecasting.",
    category: "Practice Tests",
    url: "/mock-tests/excel-commercial-modeling",
    tags: ["Excel", "Formulas", "Financial Modeling", "INDEX/MATCH"],
    badge: "Timed Test",
  },
  {
    id: "test-sql-analytics",
    title: "SQL Analytics & Business Logic Drill",
    description: "Multi-table joins, subqueries, CTEs, and window functions on real retail and banking schemas.",
    category: "Practice Tests",
    url: "/mock-tests/sql-analytics",
    tags: ["SQL", "Queries", "Database", "Window Functions"],
  },
  {
    id: "test-star-competency",
    title: "STAR Behavioral Competency Diagnostic",
    description: "Assess STAR structure precision, leadership impact quantification, and stakeholder objection handling.",
    category: "Practice Tests",
    url: "/mock-tests/star-competency",
    tags: ["STAR", "Behavioral", "Interview", "Leadership"],
  },
  {
    id: "test-case-profitability",
    title: "Corporate Case Profitability Issue Trees",
    description: "MECE issue tree structuring, revenue vs cost decomposition, and root cause diagnosis for consulting interviews.",
    category: "Practice Tests",
    url: "/mock-tests/case-profitability",
    tags: ["MECE", "Issue Tree", "Profitability", "Case Study"],
  },
  {
    id: "test-catalog-all",
    title: "All Practice & Mock Tests Catalog",
    description: "Explore the full suite of psychometric, numerical, analytical, and situational corporate tests.",
    category: "Practice Tests",
    url: "/mock-tests",
    tags: ["Practice Tests", "Mock Tests", "Diagnostic"],
  },

  // Career Tools & AI
  {
    id: "tool-ai-mock-interviews",
    title: "AI Mock Interviewer (STAR Methodology)",
    description: "Interactive voice and text interview simulator evaluating STAR methodology, speech clarity, and executive readiness.",
    category: "AI Tools",
    url: "/mock-interviews",
    tags: ["AI Interview", "Voice Simulator", "STAR", "Evaluation"],
    badge: "AI Powered",
  },
  {
    id: "tool-star-storyteller",
    title: "STAR Behavioral Storytelling Coach",
    description: "Transform raw bullet points into compelling, quantified interview answers using corporate STAR rubrics.",
    category: "AI Tools",
    url: "/career-hub",
    tags: ["STAR", "Storyteller", "AI Coach", "Resume"],
    badge: "AI Tool",
  },
  {
    id: "tool-issue-tree-solver",
    title: "Case Profitability Issue Tree Solver",
    description: "Interactive issue tree engine with MECE validation for profit-and-loss consulting cases.",
    category: "AI Tools",
    url: "/career-hub",
    tags: ["Issue Tree", "MECE", "Consulting", "Problem Solving"],
  },
  {
    id: "tool-salary-benchmark",
    title: "Corporate Salary Benchmark 2026",
    description: "Verified compensation data across FMCG, Telecom, FinTech, and Banking sectors for 2026 graduates and professionals.",
    category: "AI Tools",
    url: "/career-hub",
    tags: ["Salary", "Compensation", "FMCG", "Benchmark"],
  },
  {
    id: "tool-career-passport",
    title: "Career Passport Cryptographic Evidence Ledger",
    description: "W3C-compliant, ED25519 digitally-signed skill passports with verifiable recruiter proof.",
    category: "AI Tools",
    url: "/career-passport",
    tags: ["Passport", "Credentials", "ED25519", "Verification", "Recruiter Proof"],
    badge: "Trust Plane",
  },
  {
    id: "tool-skill-gap-audit",
    title: "Skill Gap Audit & Readiness Diagnostic",
    description: "Inspect verified strengths and priority gap remediations calibrated against top corporate benchmarks.",
    category: "AI Tools",
    url: "/dashboard?highlight=skill-gap-audit",
    tags: ["Skill Gap", "Strengths", "Remediations", "Audit"],
  },

  // Jobs & Opportunities
  {
    id: "job-unilever-mflp",
    title: "Unilever Future Leaders Programme (MFLP 2026)",
    description: "Management Trainee track across Supply Chain, Commercial Finance, and Customer Development.",
    category: "Jobs",
    url: "/jobs",
    tags: ["Unilever", "MTO", "FMCG", "Finance", "Marketing"],
    badge: "Recruiting",
  },
  {
    id: "job-bat-ggp",
    title: "BAT Global Graduate Programme 2026",
    description: "Fast-track 12-month leadership program into executive commercial and operations roles.",
    category: "Jobs",
    url: "/jobs",
    tags: ["BAT", "GGP", "Management Trainee", "Commercial"],
    badge: "Recruiting",
  },
  {
    id: "job-scb-ig",
    title: "Standard Chartered International Graduate (IG)",
    description: "Corporate banking, financial markets, and transaction banking global graduate track.",
    category: "Jobs",
    url: "/jobs",
    tags: ["Standard Chartered", "Banking", "Finance", "Treasury"],
  },
  {
    id: "job-apex-fa",
    title: "Apex Holdings Corporate Finance & Commercial Analyst",
    description: "FP&A, budget variance modeling, working capital control, and business partner support.",
    category: "Jobs",
    url: "/jobs",
    tags: ["Apex Holdings", "Financial Analyst", "FP&A", "Commercial"],
  },
  {
    id: "job-all-circulars",
    title: "All Corporate Jobs & Trainee Circulars",
    description: "Live verified recruitment listings with 1-click Career Passport application.",
    category: "Jobs",
    url: "/jobs",
    tags: ["Jobs", "Circulars", "Hiring", "Applications"],
  },

  // Navigation & Core Hubs
  {
    id: "nav-dashboard",
    title: "Dashboard Command Center",
    description: "Personalized corporate readiness index, daily velocity streak, and recent performance stats.",
    category: "Navigation",
    url: "/dashboard",
    tags: ["Dashboard", "Home", "Readiness", "Streak"],
  },
  {
    id: "nav-workshops",
    title: "Live Corporate Masterclasses & Workshops",
    description: "Interactive masterclasses led by corporate CFOs, McKinsey alumni, and FMCG Directors.",
    category: "Navigation",
    url: "/workshops",
    tags: ["Workshops", "Live Classes", "Masterclass", "Events"],
  },
  {
    id: "nav-challenges",
    title: "Skill Challenges & Business Hackathons",
    description: "Compete in live corporate case sprints, financial modeling cups, and analytics challenges.",
    category: "Navigation",
    url: "/challenges",
    tags: ["Challenges", "Hackathons", "Prizes"],
  },
  {
    id: "nav-marketplace",
    title: "Skill Marketplace & Corporate Vouchers",
    description: "Redeem XP points for professional tool subscriptions, voucher discounts, and premium modules.",
    category: "Navigation",
    url: "/marketplace",
    tags: ["Marketplace", "Vouchers", "Rewards", "XP Store"],
  },
  {
    id: "nav-help-center",
    title: "Help Center & Candidate Support",
    description: "Knowledge base, syllabus downloads, troubleshooting, and enterprise verification support.",
    category: "Navigation",
    url: "/help",
    tags: ["Help", "Support", "FAQ", "Contact"],
  },
  {
    id: "nav-subscription",
    title: "Subscription & Membership Upgrade",
    description: "Manage your active plan, unlock full course access, AI interview tokens, and Career Passport exports.",
    category: "Navigation",
    url: "/subscription",
    tags: ["Pricing", "Pro", "Upgrade", "Billing", "Membership"],
  },
];

const CATEGORIES = ["All", "Courses", "Practice Tests", "AI Tools", "Jobs", "Navigation"] as const;
type CategoryType = (typeof CATEGORIES)[number];

interface SearchCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommandPalette({ isOpen, onClose }: SearchCommandPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("insyt_recent_searches");
      if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5));
    } catch {
      // ignore
    }
  }, []);

  // Save query to recent searches
  const recordRecentSearch = (term: string) => {
    if (!term.trim()) return;
    try {
      const updated = [term.trim(), ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase().trim())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("insyt_recent_searches", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Filter items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_DATABASE.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // If query is empty, show all items in category (or top recommendations)
      if (!q) return true;

      // Text match
      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(q));
      return titleMatch || descMatch || catMatch || tagMatch;
    });
  }, [query, selectedCategory]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  const handleSelect = (item: SearchItem) => {
    if (query.trim()) {
      recordRecentSearch(query.trim());
    }
    onClose();
    router.push(item.url);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const getCategoryIcon = (cat: SearchItem["category"]) => {
    switch (cat) {
      case "Courses":
        return <BookOpen size={16} className="text-blue-500" />;
      case "Practice Tests":
        return <Brain size={16} className="text-emerald-500" />;
      case "AI Tools":
        return <Sparkles size={16} className="text-amber-500" />;
      case "Jobs":
        return <Briefcase size={16} className="text-purple-500" />;
      case "Navigation":
        return <Compass size={16} className="text-cyan-500" />;
      default:
        return <Zap size={16} className="text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Container - Pure White Mode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden font-sans border-2 border-blue-500 shadow-[8px_8px_0px_0px_#2563eb] bg-white text-slate-900 flex flex-col max-h-[85vh]"
          >
            {/* Top Search Input Bar */}
            <div className="p-3.5 sm:p-4 border-b-2 border-slate-200 bg-slate-50 flex items-center gap-3">
              <Search size={20} className="text-blue-600 flex-shrink-0 ml-1" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, mock tests, AI tools, jobs, or features..."
                className="w-full bg-transparent border-none outline-none text-slate-900 text-sm sm:text-base font-semibold placeholder:text-slate-400 placeholder:font-normal"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Clear input"
                >
                  <X size={16} />
                </button>
              )}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-white border border-slate-300 text-slate-600 shadow-sm">
                  ESC
                </kbd>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="px-3.5 sm:px-4 py-2 border-b border-slate-200 bg-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm font-black border border-blue-600"
                      : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recent Searches Pills (if query is empty) */}
            {!query && recentSearches.length > 0 && (
              <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 flex items-center gap-2 text-xs text-slate-600 overflow-x-auto no-scrollbar">
                <Clock size={12} className="flex-shrink-0 text-slate-400" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 flex-shrink-0">
                  Recent:
                </span>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer shadow-xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}

            {/* Results List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 sm:p-2.5 max-h-[50vh] bg-white">
              {filteredItems.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
                    <Search size={22} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">No results found for &ldquo;{query}&rdquo;</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try searching for keywords like &ldquo;Financial Modeling&rdquo;, &ldquo;Power BI&rdquo;, &ldquo;Python&rdquo;, &ldquo;MTO&rdquo;, or &ldquo;Passport&rdquo;.
                  </p>
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-blue-50/90 border-2 border-blue-500 shadow-sm"
                          : "hover:bg-slate-50 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border mt-0.5 ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-500"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {getCategoryIcon(item.category)}
                        </div>

                        <div className="min-w-0 space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-1">
                              {item.title}
                            </h4>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase bg-blue-100 text-blue-700 border border-blue-200">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
                            {item.description}
                          </p>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                              {item.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isSelected && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600 text-white">
                            Select <CornerDownLeft size={10} />
                          </span>
                        )}
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${
                            isSelected ? "text-blue-600 translate-x-0.5" : "text-slate-400"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Tip */}
            <div className="p-3 border-t-2 border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] font-mono text-slate-600">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-xs">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-xs">↵</kbd> Open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-slate-700 shadow-xs">esc</kbd> Dismiss
                </span>
              </div>
              <span className="text-[10px] text-blue-700 font-bold uppercase">
                {filteredItems.length} indexed results
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
