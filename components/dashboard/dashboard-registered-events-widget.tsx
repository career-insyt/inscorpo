"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Trophy, CheckCircle2, ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";
import { EVENTS_DATA, EventItem } from "@/lib/data/events";
import { fetchUserEventRegistrations } from "@/lib/db";
import { useAuth } from "@/components/providers/auth-provider";
import { useUser } from "@/components/providers/user-context";

export function DashboardRegisteredEventsWidget() {
  const { user } = useAuth();
  const { state } = useUser();
  const [registeredEvents, setRegisteredEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserEvents = async () => {
      setLoading(true);
      try {
        const currentUserId = user?.$id || state.email || "guest_user";
        const dbRegs = await fetchUserEventRegistrations(currentUserId);
        const regIds = new Set(dbRegs.map((r) => r.eventId));

        // Also check localStorage
        if (typeof window !== "undefined") {
          try {
            const general: string[] = JSON.parse(localStorage.getItem("insyt_all_event_registrations") || "[]");
            general.forEach((id) => regIds.add(id));
          } catch {
            // Ignore
          }
        }

        const matched = EVENTS_DATA.filter((e) => regIds.has(e.id));
        setRegisteredEvents(matched);
      } catch {
        setRegisteredEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserEvents();
  }, [user, state.email]);

  if (loading || registeredEvents.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
          <Ticket size={14} className="text-[#2563eb]" />
          My Registered Corporate Events &amp; Competitions ({registeredEvents.length})
        </h3>
        <Link
          href="/events"
          className="text-[11px] font-bold text-[#2563eb] hover:underline flex items-center gap-1 font-mono uppercase"
        >
          View All Events <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {registeredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-4 rounded-xl border-2 border-blue-500 bg-white shadow-[4px_4px_0px_0px_#2563eb] flex flex-col justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-100 text-blue-900 border border-blue-400 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#2563eb]" /> TICKET CONFIRMED
                </span>
                <span className="text-[10px] font-extrabold uppercase text-amber-950 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {evt.category}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-1">
                {evt.title}
              </h4>
              <p className="text-xs text-slate-800 line-clamp-1 font-sans font-medium">
                {evt.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-800 font-sans">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-bold">
                  <Calendar size={12} className="text-[#2563eb]" /> {evt.displayDate}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-800 font-semibold">
                  <MapPin size={11} className="text-[#2563eb]" /> {evt.location.split(",")[0]}
                </span>
              </div>
              <Link
                href="/events"
                className="px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase bg-[#2563eb] text-white hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_0px_#1e3a8a]"
              >
                Pass Info
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
