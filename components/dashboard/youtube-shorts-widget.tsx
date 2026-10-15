"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Film,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Flame,
  Volume2,
} from "lucide-react";

interface ShortItem {
  id: string;
  youtubeId: string;
  title: string;
  category: "Excel" | "Finance" | "AI" | "Career";
  creator: string;
  tag: string;
}

const CORPORATE_SHORTS: ShortItem[] = [
  {
    id: "short_1",
    youtubeId: "2Xy6n-w9jI0", // Excel dynamic array formulas
    title: "Excel Magic: Dynamic Array XLOOKUP Trick",
    category: "Excel",
    creator: "INSYT Corporate Academy",
    tag: "Productivity Hack",
  },
  {
    id: "short_2",
    youtubeId: "rEwz_3b2gXo", // Power BI DAX shortcut
    title: "Power BI DAX: Calculate YTD Revenue in 30 Seconds",
    category: "Finance",
    creator: "Enterprise BI Team",
    tag: "Executive Analytics",
  },
  {
    id: "short_3",
    youtubeId: "fG7N1Wq9I2w", // AI automation workflow
    title: "Workplace AI: Automate Document Extraction with LLMs",
    category: "AI",
    creator: "Automation Lab",
    tag: "Workplace Automation",
  },
  {
    id: "short_4",
    youtubeId: "v8L2t8b7Z1M", // STAR technique corporate interview
    title: "The STAR Technique: FMCG MTO Interview Answer",
    category: "Career",
    creator: "Executive Coaching",
    tag: "Interview Mastery",
  },
];

export function YouTubeShortsWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredShorts =
    activeCategory === "All"
      ? CORPORATE_SHORTS
      : CORPORATE_SHORTS.filter((s) => s.category === activeCategory);

  const currentShort = filteredShorts[currentIndex % filteredShorts.length] || CORPORATE_SHORTS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredShorts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredShorts.length) % filteredShorts.length);
  };

  return (
    <div
      className="rounded-2xl border-2 border-blue-500 bg-white shadow-[5px_5px_0px_0px_#2563eb] overflow-hidden flex flex-col font-sans max-h-[380px] h-[375px]"
    >
      {/* ── Widget Header ── */}
      <div className="p-3 sm:px-4 border-b-2 border-blue-100 bg-blue-50/60 flex items-center justify-between flex-shrink-0 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center border border-blue-700 shadow-xs">
            <Film size={14} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-black uppercase text-slate-900 leading-tight">
                Corporate Shorts &amp; Reels
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-500 font-sans">
              60s Micro-Skills for High-Performance Analysts
            </p>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous reel"
            className="w-6 h-6 rounded-md border border-slate-300 hover:border-slate-800 bg-white flex items-center justify-center text-slate-700 hover:text-black transition-colors cursor-pointer"
          >
            <ChevronLeft size={13} />
          </button>
          <span className="text-[10px] font-bold text-slate-600 px-1">
            {(currentIndex % filteredShorts.length) + 1}/{filteredShorts.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next reel"
            className="w-6 h-6 rounded-md border border-slate-300 hover:border-slate-800 bg-white flex items-center justify-center text-slate-700 hover:text-black transition-colors cursor-pointer"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ── Main Embed + Info Container (Contained height) ── */}
      <div className="flex-1 flex gap-3 p-3 min-h-0 bg-slate-950 text-white overflow-hidden">
        {/* Left: YouTube Shorts Vertical Embed Player */}
        <div className="w-[145px] sm:w-[160px] h-full rounded-xl overflow-hidden border-2 border-slate-700 flex-shrink-0 bg-black relative shadow-inner">
          <iframe
            key={currentShort.youtubeId}
            src={`https://www.youtube.com/embed/${currentShort.youtubeId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
            title={currentShort.title}
            className="w-full h-full object-cover border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Right: Metadata, Category Pills, and Next Reel Trigger */}
        <div className="flex-1 flex flex-col justify-between min-w-0 font-mono py-0.5">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-amber-950 border border-amber-500 shadow-xs">
                {currentShort.category}
              </span>
              <span className="text-[9px] font-bold text-slate-400">
                {currentShort.tag}
              </span>
            </div>

            <h4 className="text-xs font-bold font-sans text-white leading-snug line-clamp-3">
              {currentShort.title}
            </h4>

            <p className="text-[10px] text-slate-400 font-sans truncate">
              By {currentShort.creator}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            {/* Category Selector Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {(["All", "Excel", "Finance", "AI"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Next Reel Action */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-1.5 px-2.5 rounded-lg text-[11px] font-black uppercase text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all border border-amber-500 shadow-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Next Reel</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
