"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, MapPin, Users, Ticket, Trophy, Sparkles,
  Flame, CheckCircle2, AlertCircle, ArrowRight, X, Search, Filter,
  Share2, Shield, Gift, ExternalLink, Timer, ChevronRight, Grid3X3, List,
  BarChart3, Globe, Brain, Award, Download, Check
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-context";
import { useAuth } from "@/components/providers/auth-provider";
import { registerForEvent, fetchUserEventRegistrations } from "@/lib/db";
import { EVENTS_DATA, EventItem } from "@/lib/data/events";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl sm:text-2xl font-black font-mono text-white leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] font-mono font-black uppercase text-amber-300 mt-1">
        {label}
      </span>
    </div>
  );
}

function getEventIcon(iconName?: string) {
  switch (iconName) {
    case "globe":
      return <Globe size={22} className="text-[#2563eb]" />;
    case "chart":
      return <BarChart3 size={22} className="text-[#2563eb]" />;
    case "brain":
      return <Brain size={22} className="text-[#2563eb]" />;
    case "trophy":
    default:
      return <Trophy size={22} className="text-[#2563eb]" />;
  }
}

export default function EventsPage() {
  const { user } = useAuth();
  const { state, addNotification } = useUser();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());

  // Thoughtful Registration Modal State
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);
  const [registrationStep, setRegistrationStep] = useState<"form" | "confirmed">("form");
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [participationTrack, setParticipationTrack] = useState<"standard" | "executive">("standard");
  const [participationMode, setParticipationMode] = useState<"solo" | "team">("solo");
  const [generatedTicketId, setGeneratedTicketId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Restore persisted event registrations
  useEffect(() => {
    const currentUserId = user?.$id || state.email || "guest_user";
    fetchUserEventRegistrations(currentUserId).then((regs) => {
      const ids = new Set<string>();
      if (regs && regs.length > 0) {
        regs.forEach((r) => ids.add(r.eventId));
      }
      try {
        const stored: string[] = JSON.parse(localStorage.getItem("insyt_all_event_registrations") || "[]");
        stored.forEach((id) => ids.add(id));
      } catch {
        // Ignore storage errors
      }
      setRegisteredIds(ids);
    });
  }, [user?.$id, state.email]);

  // Set default attendee info from state
  useEffect(() => {
    if (state.name) setAttendeeName(state.name);
    if (state.email) setAttendeeEmail(state.email);
  }, [state.name, state.email]);

  // Countdown clock
  const [countdown, setCountdown] = useState({ days: 28, hours: 14, mins: 32, secs: 10 });
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const featuredEvent = EVENTS_DATA.find((e) => e.featured) || EVENTS_DATA[0];

  // Registered Events
  const registeredEvents = useMemo(() => {
    return EVENTS_DATA.filter((e) => registeredIds.has(e.id));
  }, [registeredIds]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((e) => {
      if (activeTab === "Registered") {
        return registeredIds.has(e.id);
      }
      const matchCat = activeTab === "All" || e.category === activeTab;
      const matchSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeTab, search, registeredIds]);

  // Start Thoughtful Registration
  const handleOpenRegistration = (event: EventItem) => {
    setRegisteringEvent(event);
    if (registeredIds.has(event.id)) {
      setGeneratedTicketId(`INSYT-${event.passportStamp}-${Math.abs(event.id.split("").reduce((a, b) => a + b.charCodeAt(0), 1000))}`);
      setRegistrationStep("confirmed");
    } else {
      setRegistrationStep("form");
      setGeneratedTicketId(`INSYT-${event.passportStamp}-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  };

  // Complete Registration
  const handleConfirmRegistration = async () => {
    if (!registeringEvent) return;

    const event = registeringEvent;
    const currentUserId = user?.$id || state.email || "guest_user";

    setRegisteredIds((prev) => new Set(prev).add(event.id));

    // Save to database & localStorage
    await registerForEvent(currentUserId, event.id, event.title);
    try {
      const stored: string[] = JSON.parse(localStorage.getItem("insyt_all_event_registrations") || "[]");
      if (!stored.includes(event.id)) {
        stored.push(event.id);
        localStorage.setItem("insyt_all_event_registrations", JSON.stringify(stored));
      }
    } catch {
      // Ignore storage errors
    }

    addNotification({
      type: "achievement",
      title: `Confirmed: ${event.title.split("—")[0].trim()}`,
      message: `Pass ID ${generatedTicketId} issued with +${event.xpReward} XP. Ticket confirmed!`,
    });

    setRegistrationStep("confirmed");
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = (event: EventItem) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nHost: ${event.host}\nTicket ID: ${generatedTicketId}`);
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Download iCal (.ics) file
  const handleDownloadICS = (event: EventItem) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//INSYT//Corporate Events//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} - Host: ${event.host} - Ticket: ${generatedTicketId}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.id}-ticket.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyTicketId = () => {
    if (generatedTicketId) {
      navigator.clipboard.writeText(generatedTicketId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6 font-sans pb-20 select-none"
    >
      {/* ── Featured Banner ── */}
      <motion.div variants={item}>
        <div
          className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-2 border-blue-400 font-mono shadow-[5px_5px_0px_0px_#1e3a8a]"
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
            <div className="space-y-3 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-extrabold uppercase bg-amber-400 text-amber-950 border border-amber-500 shadow-sm flex items-center gap-1">
                  <Flame size={13} className="inline fill-amber-950" /> Featured Event
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold uppercase bg-blue-900/80 text-white border border-blue-300">
                  {featuredEvent.category}
                </span>
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                  {featuredEvent.title}
                </h1>
                <p className="mt-2 text-xs text-blue-100 font-sans font-medium leading-relaxed">
                  {featuredEvent.description}
                </p>
              </div>

              {/* Date/Clock Meta Strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono font-bold text-blue-100">
                <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {featuredEvent.displayDate}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {featuredEvent.time}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {featuredEvent.location}</span>
              </div>

              {featuredEvent.prize && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400 text-amber-950 text-xs font-extrabold border border-amber-500 w-fit shadow-xs">
                  <Trophy size={14} className="fill-amber-950" />
                  <span>Prize: {featuredEvent.prize}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenRegistration(featuredEvent)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-extrabold uppercase text-amber-950 bg-amber-400 hover:bg-amber-300 transition-all border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Ticket size={14} />
                  <span>{registeredIds.has(featuredEvent.id) ? "View My Confirmed Pass ✓" : "Register For Event"}</span>
                </button>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="p-5 rounded-2xl border-2 border-white/40 bg-white/10 space-y-3 shadow-md flex-shrink-0 backdrop-blur-xs">
              <p className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-300 text-center">
                <Timer size={12} className="inline mr-1" /> Event Starts In
              </p>
              <div className="flex items-center gap-4">
                <CountdownBlock label="Days" value={countdown.days} />
                <span className="text-white/50 text-xl font-extrabold">:</span>
                <CountdownBlock label="Hrs" value={countdown.hours} />
                <span className="text-white/50 text-xl font-extrabold">:</span>
                <CountdownBlock label="Min" value={countdown.mins} />
                <span className="text-white/50 text-xl font-extrabold">:</span>
                <CountdownBlock label="Sec" value={countdown.secs} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Navigation Tabs & Search Filter ── */}
      <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono">
        {/* Category Tabs including Dedicated "My Registered Passes" */}
        <div className="flex flex-wrap items-center gap-2">
          {/* All Events */}
          <button
            type="button"
            onClick={() => setActiveTab("All")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase transition-all border-2 cursor-pointer ${
              activeTab === "All"
                ? "bg-[#2563eb] text-white border-blue-700 shadow-[3px_3px_0px_0px_#1e3a8a]"
                : "text-slate-800 border-slate-300 bg-white hover:border-blue-400"
            }`}
          >
            All Events ({EVENTS_DATA.length})
          </button>

          {/* Dedicated My Registered Passes Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("Registered")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase transition-all border-2 cursor-pointer flex items-center gap-2 ${
              activeTab === "Registered"
                ? "bg-emerald-600 text-white border-emerald-800 shadow-[3px_3px_0px_0px_#064e3b]"
                : "text-slate-800 border-slate-300 bg-white hover:border-emerald-500"
            }`}
          >
            <Ticket size={14} className={activeTab === "Registered" ? "text-white" : "text-emerald-600"} />
            <span>My Registered Passes</span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
              activeTab === "Registered" ? "bg-white text-emerald-900" : "bg-emerald-100 text-emerald-900 border border-emerald-300"
            }`}>
              {registeredEvents.length}
            </span>
          </button>

          {/* Category Filters */}
          {["Competition", "Workshop", "Summit"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase transition-all border-2 cursor-pointer ${
                activeTab === cat
                  ? "bg-[#2563eb] text-white border-blue-700 shadow-[3px_3px_0px_0px_#1e3a8a]"
                  : "text-slate-800 border-slate-300 bg-white hover:border-blue-400"
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2563eb]" />
          <input
            type="text"
            placeholder="Search events, topics, MNCs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-mono bg-white border-2 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#2563eb] shadow-xs"
          />
        </div>
      </motion.div>

      {/* ── Tab View 1: My Registered Passes (Special Detailed View) ── */}
      {activeTab === "Registered" ? (
        <motion.div variants={item} className="space-y-4 font-mono">
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border-2 border-emerald-500 bg-white shadow-[5px_5px_0px_0px_#047857] p-5 sm:p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Status Top Strip */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-400 flex items-center gap-1.5 shadow-xs">
                        <CheckCircle2 size={13} className="text-emerald-700 stroke-[3]" />
                        <span>Ticket Confirmed ✓</span>
                      </span>
                      <span className="text-[10px] font-black uppercase bg-blue-100 text-[#1e3a8a] border border-blue-300 px-2.5 py-0.5 rounded-md">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black uppercase text-slate-900 leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-700 font-sans font-medium line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Metadata */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 space-y-2 text-xs text-slate-800 font-bold font-sans">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#2563eb] flex-shrink-0" />
                        <span>{event.displayDate} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#2563eb] flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-[#2563eb] flex-shrink-0" />
                        <span>Host: {event.host}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pass Actions */}
                  <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-black text-[#2563eb] flex items-center gap-1">
                      <Sparkles size={13} /> +{event.xpReward} XP Credited
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadICS(event)}
                        className="px-3 py-1.5 rounded-lg text-xs font-black uppercase bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                        title="Download Calendar .ics file"
                      >
                        <Download size={13} /> .iCal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenRegistration(event)}
                        className="px-4 py-1.5 rounded-lg text-xs font-black uppercase bg-[#2563eb] hover:bg-blue-700 text-white border-2 border-blue-900 shadow-[2px_2px_0px_0px_#1e3a8a] flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Ticket size={13} /> View Pass
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-300 bg-white space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 text-[#2563eb] flex items-center justify-center mx-auto shadow-xs">
                <Ticket size={28} />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-black uppercase text-slate-900">
                  No Registered Event Passes Yet
                </h3>
                <p className="text-xs text-slate-700 font-sans font-medium">
                  Register for corporate competitions, live presentations, or industry summits to earn verifiable credentials on your Career Passport.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("All")}
                className="px-5 py-2.5 rounded-xl text-xs font-black uppercase bg-[#2563eb] hover:bg-blue-700 text-white border-2 border-blue-900 shadow-[2px_2px_0px_0px_#1e3a8a] cursor-pointer inline-flex items-center gap-2"
              >
                <span>Browse All Upcoming Events</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </motion.div>
      ) : (
        /* ── Tab View 2: All / Category Events Grid ── */
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const isRegistered = registeredIds.has(event.id);

            return (
              <div
                key={event.id}
                className={`rounded-2xl border-2 p-5 sm:p-6 space-y-4 font-mono flex flex-col justify-between transition-all bg-white ${
                  isRegistered
                    ? "border-emerald-500 shadow-[5px_5px_0px_0px_#047857]"
                    : "border-blue-500 shadow-[5px_5px_0px_0px_#2563eb]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center flex-shrink-0 border-2 border-blue-300 shadow-xs">
                      {getEventIcon(event.iconName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-100 text-[#1e3a8a] border border-blue-300">
                          {event.category}
                        </span>
                        {isRegistered && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-400 flex items-center gap-1">
                            <Check size={11} className="stroke-[3]" /> Pass Active
                          </span>
                        )}
                        {event.prize && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-300 text-amber-950 border border-amber-500">
                            🏆 {event.prize}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black uppercase leading-snug text-slate-900 line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-sans font-medium leading-relaxed text-slate-700 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-bold text-slate-800 font-sans pt-1">
                    <span className="flex items-center gap-1"><Calendar size={13} className="text-[#2563eb]" /> {event.displayDate}</span>
                    <span className="flex items-center gap-1"><Clock size={13} className="text-[#2563eb]" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} className="text-[#2563eb]" /> {event.location}</span>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-slate-200 font-mono">
                  <div className="text-xs font-black text-[#2563eb] flex items-center gap-1">
                    <Sparkles size={13} /> +{event.xpReward} XP
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenRegistration(event)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      isRegistered
                        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-[2px_2px_0px_0px_#000]"
                        : "bg-amber-400 text-amber-950 hover:bg-amber-300 border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000]"
                    }`}
                  >
                    <Ticket size={13} />
                    <span>{isRegistered ? "View Confirmed Pass ✓" : "Register Now"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* ── Thoughtful Multi-Step Registration & Ticket Modal ── */}
      <AnimatePresence>
        {registeringEvent && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-mono bg-slate-950/80 backdrop-blur-xs overscroll-contain"
            onClick={() => setRegisteringEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl border-4 border-blue-500 bg-white text-slate-900 p-6 space-y-5 z-10 shadow-[8px_8px_0px_0px_#1e3a8a] max-h-[90vh] overflow-y-auto overscroll-contain"
              style={{ overscrollBehavior: "contain" }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setRegisteringEvent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-300 cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>

              {registrationStep === "form" ? (
                /* ── STEP 1: Highly Thoughtful Registration Details ── */
                <div className="space-y-4">
                  {/* Event Summary Header */}
                  <div className="space-y-1.5 border-b-2 border-blue-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-[#1e3a8a] border border-blue-300">
                        {registeringEvent.category} Registration
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-300 text-amber-950">
                        +{registeringEvent.xpReward} XP Reward
                      </span>
                    </div>
                    <h2 className="text-lg font-black uppercase text-slate-900 leading-snug">
                      {registeringEvent.title}
                    </h2>
                    <p className="text-xs text-slate-700 font-sans font-medium">
                      Hosted by {registeringEvent.host} • {registeringEvent.location}
                    </p>
                  </div>

                  {/* Candidate Identification Fields */}
                  <div className="space-y-3 font-sans">
                    <span className="text-[11px] font-mono font-black uppercase text-slate-800 block">
                      1. Attendee Verification
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono font-black uppercase text-slate-700 block mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={attendeeName}
                          onChange={(e) => setAttendeeName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 rounded-lg text-xs font-mono bg-slate-50 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-[#2563eb]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono font-black uppercase text-slate-700 block mb-1">
                          Official Email
                        </label>
                        <input
                          type="email"
                          value={attendeeEmail}
                          onChange={(e) => setAttendeeEmail(e.target.value)}
                          placeholder="your.email@university.edu"
                          className="w-full px-3 py-2 rounded-lg text-xs font-mono bg-slate-50 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-[#2563eb]"
                        />
                      </div>
                    </div>

                    {/* Participation Mode */}
                    <div className="pt-1">
                      <label className="text-[10px] font-mono font-black uppercase text-slate-700 block mb-1">
                        2. Participation Stream
                      </label>
                      <div className="grid grid-cols-2 gap-2 font-mono">
                        <button
                          type="button"
                          onClick={() => setParticipationMode("solo")}
                          className={`p-2.5 rounded-xl border-2 text-left cursor-pointer transition-all ${
                            participationMode === "solo"
                              ? "bg-blue-50 border-[#2563eb] text-[#1e3a8a] shadow-xs"
                              : "bg-white border-slate-300 text-slate-700 hover:border-slate-400"
                          }`}
                        >
                          <span className="text-xs font-black block">Individual Delegate</span>
                          <span className="text-[10px] text-slate-600 block">Solo Entry &amp; Passport Stamp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setParticipationMode("team")}
                          className={`p-2.5 rounded-xl border-2 text-left cursor-pointer transition-all ${
                            participationMode === "team"
                              ? "bg-blue-50 border-[#2563eb] text-[#1e3a8a] shadow-xs"
                              : "bg-white border-slate-300 text-slate-700 hover:border-slate-400"
                          }`}
                        >
                          <span className="text-xs font-black block">Team Entry / Captain</span>
                          <span className="text-[10px] text-slate-600 block">Corporate Championship Track</span>
                        </button>
                      </div>
                    </div>

                    {/* Perks Guaranteed */}
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5 text-xs text-slate-800 font-mono">
                      <span className="text-[10px] font-black uppercase text-[#2563eb] block">
                        Included In Your Confirmed Ticket:
                      </span>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                        <span>Official W3C Stamp: <strong>{registeringEvent.passportStamp}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                        <span>Pre-Event MNC Case Brief &amp; Dataset Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                        <span>Calendar Invite Sync &amp; Recruiter Leaderboard Pass</span>
                      </div>
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleConfirmRegistration}
                      className="w-full py-3 rounded-xl text-xs font-mono font-extrabold uppercase text-amber-950 bg-amber-400 hover:bg-amber-300 transition-all border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Ticket size={15} />
                      <span>Confirm My Registration (+{registeringEvent.xpReward} XP)</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ── STEP 2: Confirmed Digital Boarding Ticket ── */
                <div className="space-y-4">
                  {/* Celebratory Banner */}
                  <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-1 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 size={22} className="stroke-[3]" />
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight">
                      Ticket Confirmed &amp; Pass Issued!
                    </h3>
                    <p className="text-xs font-sans font-medium text-emerald-800">
                      Your seat is secured for {registeringEvent.title.split("—")[0].trim()}.
                    </p>
                  </div>

                  {/* Digital Boarding Pass */}
                  <div className="p-4 rounded-xl border-2 border-dashed border-blue-500 bg-blue-50/50 space-y-3 font-mono">
                    <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                      <span className="text-[10px] font-black uppercase text-slate-600">INSYT DIGITAL PASS</span>
                      <span className="text-xs font-black text-[#2563eb]">#{generatedTicketId}</span>
                    </div>

                    <div className="space-y-1 font-sans">
                      <h4 className="text-sm font-black uppercase text-slate-900 leading-snug">
                        {registeringEvent.title}
                      </h4>
                      <p className="text-xs text-slate-700 font-bold">
                        {registeringEvent.displayDate} • {registeringEvent.time}
                      </p>
                      <p className="text-xs text-slate-600">
                        {registeringEvent.location}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-blue-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Ticket Holder</span>
                        <span className="font-black text-slate-900">{attendeeName || "Verified Delegate"}</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyTicketId}
                        className="px-2.5 py-1 rounded bg-white border border-slate-300 text-[10px] font-black text-slate-800 hover:bg-slate-100 cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        {isCopied ? "Copied ✓" : "Copy Pass ID"}
                      </button>
                    </div>
                  </div>

                  {/* Calendar Sync & Export Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <a
                      href={getGoogleCalendarUrl(registeringEvent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl text-xs font-mono font-black uppercase text-center bg-white hover:bg-slate-50 border-2 border-blue-500 text-[#2563eb] shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Calendar size={13} />
                      <span>Google Cal</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDownloadICS(registeringEvent)}
                      className="py-2.5 px-3 rounded-xl text-xs font-mono font-black uppercase text-center bg-white hover:bg-slate-50 border-2 border-blue-500 text-[#2563eb] shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download size={13} />
                      <span>Download .ics</span>
                    </button>
                  </div>

                  {/* Close and View in Tab */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRegisteringEvent(null);
                        setActiveTab("Registered");
                      }}
                      className="w-full py-3 rounded-xl text-xs font-mono font-extrabold uppercase text-white bg-[#2563eb] hover:bg-blue-700 transition-all border-2 border-blue-900 shadow-[3px_3px_0px_0px_#1e3a8a] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>View In My Registered Passes Tab</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
