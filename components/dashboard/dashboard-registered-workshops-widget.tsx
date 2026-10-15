"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Ticket, Calendar, Clock, ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Timer } from "lucide-react";
import Link from "next/link";
import { WORKSHOPS_DATA, WorkshopDetail, normalizeWorkshopId } from "@/lib/data/workshops";
import { fetchUserWorkshopBookings } from "@/lib/db";
import { useAuth } from "@/components/providers/auth-provider";

function parseEventTargetDate(dateStr: string, timeStr: string): Date {
  try {
    const cleanedDate = dateStr.replace(/^[A-Za-z]+,\s*/, "");
    const startTimeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (cleanedDate && startTimeMatch) {
      let hours = parseInt(startTimeMatch[1], 10);
      const minutes = parseInt(startTimeMatch[2], 10);
      const ampm = startTimeMatch[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;

      const parsed = new Date(`${cleanedDate} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`);
      if (!isNaN(parsed.getTime())) return parsed;
    }
  } catch {
    // fallback
  }
  return new Date("2026-08-15T19:30:00+06:00");
}

function calculateTimeLeft(targetDate: Date) {
  const diff = targetDate.getTime() - new Date().getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isLive: false };
}

export function DashboardRegisteredWorkshopsWidget() {
  const { user } = useAuth();
  const [registeredWorkshops, setRegisteredWorkshops] = useState<WorkshopDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });

  useEffect(() => {
    const loadUserBookings = async () => {
      setLoading(true);
      try {
        const storedIds: string[] = JSON.parse(localStorage.getItem("insyt_booked_workshops") || "[]");
        const dbBookings = user ? await fetchUserWorkshopBookings(user.$id) : [];

        const bookedSet = new Set<string>();
        dbBookings.forEach((b: any) => {
          if (b.workshopId) bookedSet.add(normalizeWorkshopId(b.workshopId));
        });
        storedIds.forEach((id: string) => {
          if (id) bookedSet.add(normalizeWorkshopId(id));
        });

        // Exact match against WORKSHOPS_DATA only
        const matched = WORKSHOPS_DATA.filter((w) => bookedSet.has(w.id));

        setRegisteredWorkshops(matched);
      } catch {
        setRegisteredWorkshops([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserBookings();
  }, [user]);

  useEffect(() => {
    if (registeredWorkshops.length === 0) return;

    const targetDate = parseEventTargetDate(registeredWorkshops[0].date, registeredWorkshops[0].time);
    setTimeLeft(calculateTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [registeredWorkshops]);

  if (loading || registeredWorkshops.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono select-none"
    >
      <div className="p-5 rounded-2xl border-2 border-emerald-500 shadow-[5px_5px_0px_0px_#047857] bg-white text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden relative">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} className="stroke-[3]" /> SEAT CONFIRMED &amp; REGISTERED
            </span>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-400">
              INSYT Live Workshop
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-wide truncate">
            🎟️ {registeredWorkshops[0].title}
          </h3>
          <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-800 font-sans">
            <span className="flex items-center gap-1"><Calendar size={13} className="text-[#2563eb]" /> {registeredWorkshops[0].date}</span>
            <span className="flex items-center gap-1"><Clock size={13} className="text-[#2563eb]" /> {registeredWorkshops[0].time}</span>
            <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-emerald-700" /> Verified Pass Issued</span>
          </div>
        </div>

        {/* Countdown Timer Block */}
        <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
            <Timer size={12} className="animate-pulse text-amber-600" /> Event Starts In
          </span>
          <div className="flex items-center gap-1 bg-slate-50 p-2 sm:p-2.5 rounded-xl border-2 border-emerald-500 shadow-[3px_3px_0px_0px_#047857]">
            <div className="flex flex-col items-center px-1.5 min-w-[34px]">
              <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[8px] font-black uppercase text-slate-700 mt-0.5">DAYS</span>
            </div>
            <span className="text-emerald-600 font-black text-sm pb-2">:</span>
            <div className="flex flex-col items-center px-1.5 min-w-[34px]">
              <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[8px] font-black uppercase text-slate-700 mt-0.5">HRS</span>
            </div>
            <span className="text-emerald-600 font-black text-sm pb-2">:</span>
            <div className="flex flex-col items-center px-1.5 min-w-[34px]">
              <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[8px] font-black uppercase text-slate-700 mt-0.5">MIN</span>
            </div>
            <span className="text-emerald-600 font-black text-sm pb-2">:</span>
            <div className="flex flex-col items-center px-1.5 min-w-[34px]">
              <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[8px] font-black uppercase text-slate-700 mt-0.5">SEC</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
