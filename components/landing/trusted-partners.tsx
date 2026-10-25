"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const partners = [
  "Microsoft", "British Council", "IDP", "Sonali Bank", "Janata Bank",
  "Agrani Bank", "Rupali Bank", "IFIC Bank", "City Bank", "BRAC Bank",
  "EBL", "DBBL", "Standard Chartered", "HSBC", "McKinsey",
  "BCG", "Deloitte", "EY", "PwC", "KPMG",
];

export function TrustedPartners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const isTouching = useRef(false);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initialize with small offset to allow bidirectional infinite scrolling
    if (el.scrollLeft === 0) {
      el.scrollLeft = 20;
    }

    let animId: number;
    const speed = 1.8; // Fast, smooth movement

    const step = () => {
      if (!isManuallyPaused && !isTouching.current && el) {
        el.scrollLeft += speed;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += halfWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [isManuallyPaused]);

  // Touch and interaction handlers for Android/Mobile
  const handleTouchStart = () => {
    isTouching.current = true;
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const handleTouchEnd = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    // Smoothly resume 2.5s after user stops dragging on Android
    resumeTimer.current = setTimeout(() => {
      isTouching.current = false;
    }, 2500);
  };

  const toggleManualPause = () => {
    setIsManuallyPaused((prev) => !prev);
  };

  return (
    <section className="relative py-7 sm:py-9 overflow-hidden bg-white border-b-2 border-slate-900 font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header with Pause/Resume Toggle for Android & Desktop */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-[10px] sm:text-xs font-black uppercase text-slate-500 tracking-wider">
            PARTNER &amp; INSTITUTIONAL NETWORK
          </span>
          <button
            type="button"
            onClick={toggleManualPause}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border-2 border-slate-900 bg-amber-300 hover:bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            aria-label={isManuallyPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isManuallyPaused ? (
              <>
                <Play size={10} className="fill-slate-950" />
                <span>RESUME</span>
              </>
            ) : (
              <>
                <Pause size={10} className="fill-slate-950" />
                <span>PAUSE</span>
              </>
            )}
          </button>
        </div>

        {/* Scrollable & Stoppable Container for Android */}
        <div 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onMouseEnter={handleTouchStart}
          onMouseLeave={handleTouchEnd}
          className="relative flex overflow-x-auto no-scrollbar scrollbar-none touch-pan-x select-none py-1 cursor-grab active:cursor-grabbing"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "auto",
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div className="flex items-center whitespace-nowrap min-w-max">
            {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner}-${i}`}
                className="mx-2 flex-shrink-0 px-3.5 py-1.5 rounded-lg border-2 border-slate-900 bg-white shadow-[2px_2px_0px_0px_#0f172a] hover:shadow-[3px_3px_0px_0px_#2563eb] hover:-translate-y-0.5 active:bg-amber-50 transition-all"
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
