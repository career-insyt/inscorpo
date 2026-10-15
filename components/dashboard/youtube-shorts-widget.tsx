"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, X, ExternalLink, ChevronDown, ChevronUp, Sparkles, Smartphone } from "lucide-react";

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
    title: "Corporate Excel & Financial Modeling Hacks",
    thumbnail: "https://img.youtube.com/vi/gV3Xz3jGZS8/hqdefault.jpg",
    tag: "Excel Magic",
    category: "Financial Modeling",
  },
  {
    id: "reel-2",
    youtubeId: "jF3otNOUCug",
    title: "Executive Career & STAR Interview Strategy",
    thumbnail: "https://img.youtube.com/vi/jF3otNOUCug/hqdefault.jpg",
    tag: "Career Hack",
    category: "Management Trainee",
  },
  {
    id: "reel-3",
    youtubeId: "kJQP7kiw5Fk",
    title: "Power BI DAX & Star Schema Modeling in 60s",
    thumbnail: "https://img.youtube.com/vi/gV3Xz3jGZS8/hqdefault.jpg",
    tag: "BI Mastery",
    category: "Business Intelligence",
  },
];

export function YouTubeShortsWidget() {
  const [currentReelIdx, setCurrentReelIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReelIdx, setModalReelIdx] = useState(0);
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

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

  // Native non-passive wheel listener on widget to strictly contain scroll and cycle reels without scrolling the page
  useEffect(() => {
    const el = widgetContainerRef.current;
    if (!el) return;

    const onWidgetWheel = (e: WheelEvent) => {
      // Prevent parent webpage from scrolling while cursor is over the reels
      e.preventDefault();
      e.stopPropagation();

      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) > 12) {
        isScrollingRef.current = true;
        if (e.deltaY > 0) {
          nextReel();
        } else {
          prevReel();
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 360);
      }
    };

    el.addEventListener("wheel", onWidgetWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWidgetWheel);
  }, [nextReel, prevReel]);

  // Native non-passive wheel listener inside popup modal
  useEffect(() => {
    if (!modalOpen) return;
    const el = modalContainerRef.current;
    if (!el) return;

    const onModalWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) > 12) {
        isScrollingRef.current = true;
        if (e.deltaY > 0) {
          nextModalReel();
        } else {
          prevModalReel();
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 380);
      }
    };

    el.addEventListener("wheel", onModalWheel, { passive: false });
    return () => el.removeEventListener("wheel", onModalWheel);
  }, [modalOpen, nextModalReel, prevModalReel]);

  // Handle touch swipe for Android and Mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartYRef.current - touchEndY;
    if (Math.abs(deltaY) > 30) {
      if (deltaY > 0) {
        nextReel(); // Swiped up -> next reel
      } else {
        prevReel(); // Swiped down -> previous reel
      }
    }
    touchStartYRef.current = null;
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
        ref={widgetContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="rounded-2xl border-2 border-blue-500 bg-white shadow-[5px_5px_0px_0px_#2563eb] overflow-hidden flex flex-col font-sans h-[520px] sm:h-[550px] select-none overscroll-contain"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* ── Widget Header ── */}
        <div className="p-3.5 sm:px-4 border-b-2 border-blue-100 bg-blue-50/70 flex items-center justify-between flex-shrink-0 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center border border-blue-700 shadow-xs">
              <Film size={15} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-black uppercase text-slate-900 leading-tight">
                  Quick Learnings
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-700 font-sans font-medium">
                60s Micro-Skills • Reel {currentReelIdx + 1} of {REELS.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevReel}
              className="w-7 h-7 rounded-lg bg-white border-2 border-slate-300 hover:border-blue-600 text-slate-900 flex items-center justify-center cursor-pointer transition-colors shadow-xs active:scale-95"
              title="Previous Reel"
              aria-label="Previous Reel"
            >
              <ChevronUp size={15} />
            </button>
            <button
              type="button"
              onClick={nextReel}
              className="w-7 h-7 rounded-lg bg-white border-2 border-slate-300 hover:border-blue-600 text-slate-900 flex items-center justify-center cursor-pointer transition-colors shadow-xs active:scale-95"
              title="Next Reel"
              aria-label="Next Reel"
            >
              <ChevronDown size={15} />
            </button>
          </div>
        </div>

        {/* ── Single Reel Viewer Stage (9:16 Tall Reel Proportions) ── */}
        <div className="flex-1 p-3.5 bg-slate-50 flex flex-col min-h-0 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWidgetReel.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={handleOpenModal}
              className="group relative flex-1 w-full rounded-xl overflow-hidden border-2 border-blue-400 hover:border-blue-600 bg-white cursor-pointer shadow-md flex flex-col justify-between"
            >
              {/* YouTube Thumbnail Background */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={activeWidgetReel.thumbnail}
                  alt={activeWidgetReel.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient Overlay for high-contrast crisp text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/60 pointer-events-none" />
              </div>

              {/* Top Tag: Shorts Red Badge */}
              <div className="relative z-10 p-3.5 flex items-center justify-between">
                <div className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>YOUTUBE REEL</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#2563eb] text-white font-mono text-[10px] font-black uppercase border border-blue-400 shadow-xs">
                  {activeWidgetReel.tag}
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="w-14 h-14 rounded-full bg-white text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 border-2 border-[#2563eb]">
                  <Play size={22} className="fill-current ml-0.5" />
                </div>
                <span className="mt-2.5 px-3 py-1 rounded-full bg-slate-950/80 text-white font-mono text-[10px] font-black uppercase tracking-wide border border-white/20">
                  Tap to watch full reel
                </span>
              </div>

              {/* Bottom Title Bar */}
              <div className="relative z-10 p-3.5 space-y-1.5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <h4 className="text-sm sm:text-base font-black text-white leading-snug drop-shadow-sm font-sans line-clamp-2">
                  {activeWidgetReel.title}
                </h4>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300 font-extrabold">
                    {activeWidgetReel.category}
                  </span>
                  <span className="text-blue-300 font-black">
                    Pop Up Reel ↗
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Scroll / Swipe Prompt ── */}
          <div className="pt-2.5 flex items-center justify-center">
            <button
              type="button"
              onClick={nextReel}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-50 border-2 border-blue-300 text-xs font-mono font-black text-slate-800 hover:text-blue-700 transition-all shadow-xs cursor-pointer"
            >
              <span>Scroll or swipe for reels</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#2563eb] font-black inline-block"
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
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans overscroll-contain"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              ref={modalContainerRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[400px] h-[720px] max-h-[90vh] rounded-2xl border-4 border-blue-500 bg-white overflow-hidden shadow-[8px_8px_0px_0px_#2563eb] flex flex-col overscroll-contain"
              style={{ overscrollBehavior: "contain" }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Modal Header */}
              <div className="p-3.5 border-b-2 border-blue-200 bg-blue-50/80 flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-black uppercase text-slate-900">
                    Reel {modalReelIdx + 1} of {REELS.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeModalReel.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-slate-700 hover:text-blue-600 transition-colors"
                    title="Open in YouTube"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="p-1 rounded-md text-slate-700 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* YouTube Shorts Embed Player */}
              <div className="flex-1 w-full bg-black relative">
                <iframe
                  src={`https://www.youtube.com/embed/${activeModalReel.youtubeId}?autoplay=1&loop=1&playlist=${activeModalReel.youtubeId}&modestbranding=1&rel=0`}
                  title={activeModalReel.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="p-3 bg-white border-t-2 border-blue-200 flex items-center justify-between font-mono text-xs">
                <button
                  type="button"
                  onClick={prevModalReel}
                  className="px-3 py-1.5 rounded-lg border-2 border-slate-300 hover:border-blue-600 text-slate-900 font-bold transition-all cursor-pointer"
                >
                  ↑ Previous
                </button>
                <span className="text-slate-700 font-bold text-[11px]">
                  Swipe or wheel to browse
                </span>
                <button
                  type="button"
                  onClick={nextModalReel}
                  className="px-3 py-1.5 rounded-lg border-2 border-blue-500 bg-[#2563eb] text-white font-bold hover:bg-blue-700 transition-all cursor-pointer"
                >
                  Next Reel ↓
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
