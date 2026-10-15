"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, X, ExternalLink, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface ReelItem {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  tag: string;
  category: string;
}

const REELS: ReelItem[] = [
  {
    id: "reel-1",
    youtubeId: "gV3Xz3jGZS8",
    title: "Corporate Excel & Productivity Hacks",
    thumbnail: "https://img.youtube.com/vi/gV3Xz3jGZS8/hqdefault.jpg",
    tag: "Excel Magic",
    category: "Financial Modeling",
  },
  {
    id: "reel-2",
    youtubeId: "jF3otNOUCug",
    title: "Executive Career & Interview Strategy",
    thumbnail: "https://img.youtube.com/vi/jF3otNOUCug/hqdefault.jpg",
    tag: "Career Hack",
    category: "Management Trainee",
  },
];

export function YouTubeShortsWidget() {
  const [currentReelIdx, setCurrentReelIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReelIdx, setModalReelIdx] = useState(0);
  const isScrollingRef = useRef(false);

  const activeWidgetReel = REELS[currentReelIdx % REELS.length];
  const activeModalReel = REELS[modalReelIdx % REELS.length];

  // Infinite cycle forward/backward
  const nextReel = useCallback(() => {
    setCurrentReelIdx((prev) => (prev + 1) % REELS.length);
  }, []);

  const prevReel = useCallback(() => {
    setCurrentReelIdx((prev) => (prev - 1 + REELS.length) % REELS.length);
  }, []);

  const nextModalReel = useCallback(() => {
    setModalReelIdx((prev) => (prev + 1) % REELS.length);
  }, []);

  const prevModalReel = useCallback(() => {
    setModalReelIdx((prev) => (prev - 1 + REELS.length) % REELS.length);
  }, []);

  // Handle wheel scrolling on widget
  const handleWidgetWheel = (e: React.WheelEvent) => {
    if (isScrollingRef.current) return;
    if (Math.abs(e.deltaY) > 25) {
      isScrollingRef.current = true;
      if (e.deltaY > 0) {
        nextReel();
      } else {
        prevReel();
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 400);
    }
  };

  // Handle wheel scrolling inside popup modal
  const handleModalWheel = (e: React.WheelEvent) => {
    if (isScrollingRef.current) return;
    if (Math.abs(e.deltaY) > 25) {
      isScrollingRef.current = true;
      if (e.deltaY > 0) {
        nextModalReel();
      } else {
        prevModalReel();
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 450);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        nextModalReel();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        prevModalReel();
      } else if (e.key === "Escape") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, nextModalReel, prevModalReel]);

  const handleOpenModal = () => {
    setModalReelIdx(currentReelIdx);
    setModalOpen(true);
  };

  return (
    <>
      <div
        onWheel={handleWidgetWheel}
        className="rounded-2xl border-2 border-blue-500 bg-white shadow-[5px_5px_0px_0px_#2563eb] overflow-hidden flex flex-col font-sans max-h-[385px] h-[380px] select-none"
      >
        {/* ── Widget Header ── */}
        <div className="p-3 sm:px-4 border-b-2 border-blue-100 bg-blue-50/70 flex items-center justify-between flex-shrink-0 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center border border-blue-700 shadow-xs">
              <Film size={14} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-black uppercase text-slate-900 leading-tight">
                  Corporate Shorts &amp; Reels
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-500 font-sans">
                60s Micro-Skills • Reel {currentReelIdx + 1} of {REELS.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevReel}
              className="w-6 h-6 rounded-md bg-white border border-slate-300 hover:border-slate-800 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title="Previous Reel"
              aria-label="Previous Reel"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={nextReel}
              className="w-6 h-6 rounded-md bg-white border border-slate-300 hover:border-slate-800 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title="Next Reel"
              aria-label="Next Reel"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* ── Single Reel Viewer Stage (One Reel at a time) ── */}
        <div className="flex-1 p-3 bg-slate-950 flex flex-col min-h-0 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWidgetReel.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={handleOpenModal}
              className="group relative flex-1 w-full rounded-xl overflow-hidden border-2 border-slate-700 hover:border-amber-400 bg-black cursor-pointer shadow-lg flex flex-col justify-between"
            >
              {/* YouTube Thumbnail Background */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={activeWidgetReel.thumbnail}
                  alt={activeWidgetReel.title}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                  loading="lazy"
                />
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
              </div>

              {/* Top Tag: Shorts Red Badge */}
              <div className="relative z-10 p-3 flex items-center justify-between">
                <div className="px-2.5 py-1 rounded-md bg-rose-600/95 text-white font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>YOUTUBE SHORTS</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-black/70 text-amber-300 font-mono text-[9px] font-bold border border-white/20 backdrop-blur-xs">
                  {activeWidgetReel.tag}
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="w-12 h-12 rounded-full bg-white/95 text-slate-950 group-hover:bg-amber-400 group-hover:text-amber-950 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-115">
                  <Play size={20} className="fill-current ml-0.5" />
                </div>
                <span className="mt-2 text-[10px] font-mono font-bold text-white drop-shadow-md">
                  Tap to watch full reel
                </span>
              </div>

              {/* Bottom Title Bar */}
              <div className="relative z-10 p-3 space-y-1">
                <h4 className="text-sm font-black text-white leading-snug drop-shadow-sm font-sans line-clamp-2">
                  {activeWidgetReel.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-300 font-bold">
                    {activeWidgetReel.category}
                  </span>
                  <span className="text-slate-300">
                    Click to Pop Up ↗
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Animated Scroll for Reels Prompt Button ── */}
          <div className="pt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={nextReel}
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <span>Scroll for reels</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-amber-400 font-black inline-block"
              >
                ↓
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Interactive Popup Modal with Infinite Scroll Feed ── */}
      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={handleModalWheel}
              className="relative w-full max-w-sm sm:max-w-md h-[86vh] max-h-[740px] rounded-2xl bg-black border-2 border-slate-700 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="p-3 bg-slate-900/95 text-white flex items-center justify-between border-b border-slate-800 font-mono text-xs z-20">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-black uppercase">
                    REELS
                  </span>
                  <span className="truncate font-bold font-sans text-xs text-slate-100">
                    {activeModalReel.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {modalReelIdx + 1}/{REELS.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close reel player"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* YouTube Shorts Embed Player (Responsive vertical player) */}
              <div className="flex-1 w-full h-full bg-black relative">
                <iframe
                  key={activeModalReel.youtubeId}
                  src={`https://www.youtube.com/embed/${activeModalReel.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={activeModalReel.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Floating Infinite Scroll Controls (Overlay on the right side) */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={prevModalReel}
                    className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white border border-white/25 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer backdrop-blur-xs"
                    title="Previous Reel (Scroll Up)"
                    aria-label="Previous Reel"
                  >
                    <ChevronUp size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextModalReel}
                    className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white border border-white/25 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer backdrop-blur-xs"
                    title="Next Reel (Scroll Down)"
                    aria-label="Next Reel"
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Footer with Animated Scroll Cue */}
              <div className="p-3 bg-slate-900/95 text-slate-400 flex items-center justify-between text-[11px] font-mono border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <motion.span
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="font-black"
                  >
                    ↕
                  </motion.span>
                  <span className="text-[10px]">Scroll or use arrows for infinite reels</span>
                </div>

                <a
                  href={`https://www.youtube.com/shorts/${activeModalReel.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open in YouTube</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
