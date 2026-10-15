"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, MapPin, Trophy, CheckCircle2,
  ArrowRight, ShieldCheck, Ticket, ChevronLeft, ChevronRight, Sparkles, Award
} from "lucide-react";
import Link from "next/link";
import { EVENTS_DATA, EventItem } from "@/lib/data/events";
import { fetchUserEventRegistrations } from "@/lib/db";
import { useAuth } from "@/components/providers/auth-provider";
import { useUser } from "@/components/providers/user-context";

export function DashboardEventsHub() {
  const { user } = useAuth();
  const { state } = useUser();
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const currentUserId = user?.$id || state.email || "guest_user";
        const dbRegs = await fetchUserEventRegistrations(currentUserId);
        const ids = new Set(dbRegs.map((r) => r.eventId));

        if (typeof window !== "undefined") {
          try {
            const general: string[] = JSON.parse(localStorage.getItem("insyt_all_event_registrations") || "[]");
            general.forEach((id) => ids.add(id));
          } catch {
            // Ignore storage errors
          }
        }
        setRegisteredIds(ids);
      } catch {
        // Fallback
      }
    };
    loadRegistrations();
  }, [user, state.email]);

  // Native wheel listener: horizontally scrolls the carousel, but naturally resumes parent page scroll when boundary is reached
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleNativeWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 0.5) return;

      const isScrollingLeft = delta < 0;
      const isScrollingRight = delta > 0;
      const isAtStart = el.scrollLeft <= 2;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;

      // When carousel is at boundary and scrolling further in that direction, let parent webpage scroll vertically!
      if ((isScrollingRight && isAtEnd) || (isScrollingLeft && isAtStart)) {
        return;
      }

      e.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleNativeWheel);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Sort: registered events first, then upcoming
  const sortedEvents = [...EVENTS_DATA].sort((a, b) => {
    const aReg = registeredIds.has(a.id) ? 1 : 0;
    const bReg = registeredIds.has(b.id) ? 1 : 0;
    return bReg - aReg;
  });

  const registeredCount = EVENTS_DATA.filter((e) => registeredIds.has(e.id)).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full rounded-2xl border-2 border-blue-500 bg-white shadow-[5px_5px_0px_0px_#2563eb] p-5 sm:p-6 space-y-4 font-sans select-none"
    >
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-blue-100 pb-3.5 font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center border border-blue-700 shadow-xs flex-shrink-0">
              <Trophy size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black uppercase text-slate-900 leading-tight">
                  Corporate Events &amp; Competitions
                </h3>
                {registeredCount > 0 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-400">
                    {registeredCount} Confirmed Pass{registeredCount > 1 ? "es" : ""}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-700 font-sans font-medium">
                National Case Championships, Summits, &amp; Executive Competitions
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="flex items-center gap-1 mr-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-lg border-2 border-slate-300 hover:border-blue-600 bg-slate-50 hover:bg-blue-50 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              title="Scroll Left"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-lg border-2 border-slate-300 hover:border-blue-600 bg-slate-50 hover:bg-blue-50 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              title="Scroll Right"
              aria-label="Scroll Right"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <Link
            href="/events"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_0px_#1e3a8a]"
          >
            <span>All Events</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── Continuous Horizontally Scrollable Box ── */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 no-scrollbar touch-pan-x"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {sortedEvents.map((evt) => {
          const isRegistered = registeredIds.has(evt.id);

          return (
            <div
              key={evt.id}
              className={`w-[320px] sm:w-[350px] flex-shrink-0 rounded-2xl border-2 p-4 flex flex-col justify-between gap-3.5 transition-all scroll-snap-align-start bg-white ${
                isRegistered
                  ? "border-[#2563eb] shadow-[4px_4px_0px_0px_#2563eb] ring-2 ring-blue-500/20"
                  : "border-slate-300 hover:border-blue-500 shadow-[3px_3px_0px_0px_#94a3b8] hover:shadow-[4px_4px_0px_0px_#2563eb]"
              }`}
            >
              <div className="space-y-2">
                {/* Status Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap font-mono">
                  {isRegistered ? (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-[#2563eb] text-white flex items-center gap-1.5 shadow-xs">
                      <CheckCircle2 size={12} className="stroke-[3]" />
                      <span>Ticket Confirmed</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-blue-100 text-[#1e3a8a] border border-blue-300">
                      {evt.category}
                    </span>
                  )}

                  {evt.prize && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-300 text-amber-950 border border-amber-500">
                      🏆 {evt.prize}
                    </span>
                  )}
                </div>

                {/* Event Title */}
                <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug line-clamp-2">
                  {evt.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-700 font-sans line-clamp-2 font-medium">
                  {evt.description}
                </p>

                {/* Meta details */}
                <div className="pt-1.5 space-y-1 font-sans text-xs text-slate-800 font-bold">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-[#2563eb] flex-shrink-0" />
                    <span>{evt.displayDate} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-[#2563eb] flex-shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={13} className="text-[#2563eb] flex-shrink-0" />
                    <span className="text-slate-800 truncate">Host: {evt.host}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between font-mono">
                <span className="text-[11px] font-black text-[#2563eb]">
                  +{evt.xpReward} XP Reward
                </span>
                <Link
                  href="/events"
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
                    isRegistered
                      ? "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                      : "bg-[#2563eb] hover:bg-blue-700 text-white shadow-[2px_2px_0px_0px_#1e3a8a]"
                  }`}
                >
                  <span>{isRegistered ? "Pass Info" : "Register"}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
