"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, X, ExternalLink } from "lucide-react";

interface ReelItem {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  tag: string;
}

const REELS: ReelItem[] = [
  {
    id: "reel-1",
    youtubeId: "gV3Xz3jGZS8",
    title: "Corporate Excel & Productivity Hacks",
    thumbnail: "https://img.youtube.com/vi/gV3Xz3jGZS8/hqdefault.jpg",
    tag: "Excel Magic",
  },
  {
    id: "reel-2",
    youtubeId: "jF3otNOUCug",
    title: "Executive Career & Interview Strategy",
    thumbnail: "https://img.youtube.com/vi/jF3otNOUCug/hqdefault.jpg",
    tag: "Career Hack",
  },
];

export function YouTubeShortsWidget() {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  return (
    <>
      <div className="rounded-2xl border-2 border-blue-500 bg-white shadow-[5px_5px_0px_0px_#2563eb] overflow-hidden flex flex-col font-sans max-h-[380px] h-[375px]">
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
                Tap any short to watch interactive micro-skills
              </p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-rose-100 text-rose-800 border border-rose-300">
            2 REELS
          </span>
        </div>

        {/* ── Just the Reels (No left-side descriptions) ── */}
        <div className="flex-1 p-3 bg-slate-950 grid grid-cols-2 gap-3 min-h-0 overflow-hidden">
          {REELS.map((reel) => (
            <motion.div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-xl overflow-hidden border-2 border-slate-700 hover:border-amber-400 bg-black cursor-pointer shadow-md flex flex-col justify-between transition-all"
            >
              {/* YouTube Thumbnail Background */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                  loading="lazy"
                />
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60 pointer-events-none" />
              </div>

              {/* Top Tag: Shorts Red Badge */}
              <div className="relative z-10 p-2.5 flex items-center justify-between">
                <div className="px-2 py-0.5 rounded-md bg-rose-600/90 text-white font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>SHORTS</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-black/60 text-white font-mono text-[9px] font-bold border border-white/20 backdrop-blur-xs">
                  {reel.tag}
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-11 h-11 rounded-full bg-white/90 text-slate-900 group-hover:bg-amber-400 group-hover:text-amber-950 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-115">
                  <Play size={18} className="fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Title Bar */}
              <div className="relative z-10 p-2.5 space-y-1">
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug drop-shadow-sm font-sans">
                  {reel.title}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-amber-300 font-mono font-bold">
                  <span>▶ Tap to play</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Interactive Popup Modal for Reel Playback ── */}
      <AnimatePresence>
        {activeReel && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveReel(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md h-[82vh] max-h-[720px] rounded-2xl bg-black border-2 border-slate-700 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="p-3 bg-slate-900/90 text-white flex items-center justify-between border-b border-slate-800 font-mono text-xs z-20">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-black uppercase">
                    SHORTS
                  </span>
                  <span className="truncate font-bold font-sans text-xs">
                    {activeReel.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveReel(null)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Close reel player"
                >
                  <X size={16} />
                </button>
              </div>

              {/* YouTube Shorts Embed Player */}
              <div className="flex-1 w-full h-full bg-black relative">
                <iframe
                  src={`https://www.youtube.com/embed/${activeReel.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={activeReel.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="p-2.5 bg-slate-900/90 text-slate-400 flex items-center justify-between text-[11px] font-mono border-t border-slate-800">
                <span>INSYT Corporate Micro-Learning</span>
                <a
                  href={`https://www.youtube.com/shorts/${activeReel.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1"
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
