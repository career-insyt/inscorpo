"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, User, Sparkles, Check, Flame, AlertCircle, RefreshCw,
  Presentation, Ticket, ArrowRight, Award
} from "lucide-react";
import { fetchWorkshops, fetchUserWorkshopBookings } from "@/lib/db";
import { useAuth } from "@/components/providers/auth-provider";
import { WorkshopDetail, normalizeWorkshopId } from "@/lib/data/workshops";
import { WorkshopRegistrationModal } from "@/components/workshops/workshop-registration-modal";
import Link from "next/link";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function mapDbWorkshop(w: any): WorkshopDetail {
  return {
    id: w.$id || w.id || w.workshopId || "",
    title: w.title || "Live Workshop",
    tagline: w.description || w.tagline || "",
    category: w.category || "Career & Skills",
    level: (w.level as any) || "Intermediate",
    date: w.date || "Upcoming",
    time: w.time || "TBD",
    duration: w.duration || "2.0 Hours",
    status: w.status || "upcoming",
    spotsRemaining: typeof w.spots === "number" ? w.spots : (w.spotsRemaining ?? 50),
    totalCapacity: w.totalCapacity || 100,
    xpReward: w.xpReward || 150,
    examXpReward: w.examXpReward || 200,
    hostOrg: w.host || w.hostOrg || "INSYT Live",
    registrationUrl: w.registrationUrl || "",
    instructor: {
      name: w.instructorName || w.instructor?.name || w.host || "Instructor",
      role: w.instructorRole || w.instructor?.role || "Mentor",
      company: w.instructorCompany || w.instructor?.company || "INSYT",
      avatar: w.instructorAvatar || w.instructor?.avatar || "",
      bio: w.instructorBio || w.instructor?.bio || "",
    },
    venue: w.venue || "Online Live Session",
    description: w.description || "",
    agenda: Array.isArray(w.agenda) ? w.agenda : [],
    learningOutcomes: Array.isArray(w.learningOutcomes) ? w.learningOutcomes : [],
    credentialName: w.credentialName || (w.title ? `${w.title} Certificate` : "Workshop Credential"),
    examQuestions: Array.isArray(w.examQuestions) ? w.examQuestions : [],
  };
}

export default function WorkshopsPage() {
  const { user } = useAuth();
  const [workshops, setWorkshops] = useState<WorkshopDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());

  // Modal State
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tab filter: "all" vs "my_tickets"
  const [activeTab, setActiveTab] = useState<"all" | "my_tickets">("all");

  const loadData = async () => {
    setIsLoading(true);
    setFetchError(false);
    try {
      const [dbWorkshops, userBookings] = await Promise.all([
        fetchWorkshops(),
        user ? fetchUserWorkshopBookings(user.$id) : Promise.resolve([]),
      ]);

      const activeWorkshops: WorkshopDetail[] = (dbWorkshops || []).map(mapDbWorkshop);
      setWorkshops(activeWorkshops);

      // Extract and normalize all booking IDs
      const rawBookedSet = new Set<string>();
      (userBookings || []).forEach((b: any) => {
        if (b.workshopId) rawBookedSet.add(normalizeWorkshopId(b.workshopId));
      });
      try {
        const storedIds: string[] = JSON.parse(localStorage.getItem("insyt_booked_workshops") || "[]");
        storedIds.forEach((id: string) => rawBookedSet.add(normalizeWorkshopId(id)));
      } catch {
        /* fallback */
      }

      setBookedIds(rawBookedSet);
    } catch {
      setFetchError(true);
      setWorkshops([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleOpenRegistration = (w: WorkshopDetail, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedWorkshop(w);
    setIsModalOpen(true);
  };

  const displayedWorkshops = activeTab === "all"
    ? workshops
    : workshops.filter((w) => bookedIds.has(w.id));

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="max-w-5xl mx-auto space-y-6 font-sans pb-24 text-slate-900">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-extrabold uppercase bg-amber-400 text-amber-950 border border-amber-500 shadow-sm">
            <Award size={13} /> Verified Masterclasses &amp; Credentials
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-mono uppercase flex items-center gap-2 text-corp-text">
            <Presentation className="w-8 h-8 text-[#2563eb]" /> Live Workshops &amp; Credentials
          </h1>
          <p className="text-xs sm:text-sm font-medium text-corp-text-secondary">
            Register for live masterclasses, obtain digital event passes, and earn verified credentials.
          </p>
        </div>

        {/* Tab switcher — Blue Borders */}
        <div className="flex p-1.5 rounded-xl border-2 border-blue-400 bg-corp-surface font-mono text-xs font-extrabold self-start sm:self-auto shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_#1e3a8a]"
                : "text-corp-text-secondary hover:text-corp-text"
            }`}
          >
            All Workshops ({workshops.length})
          </button>
          <button
            onClick={() => setActiveTab("my_tickets")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "my_tickets"
                ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_#1e3a8a]"
                : "text-corp-text-secondary hover:text-corp-text"
            }`}
          >
            <Ticket size={13} />
            My Tickets ({bookedIds.size})
          </button>
        </div>
      </motion.div>

      {/* State: Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20 font-mono">
          <div className="text-xs font-extrabold text-corp-text-tertiary">Loading workshops from database...</div>
        </div>
      ) : fetchError ? (
        <motion.div variants={item} className="flex flex-col items-center gap-4 py-16 font-mono">
          <AlertCircle size={32} className="text-rose-500" />
          <p className="text-sm font-extrabold uppercase text-corp-text">Could not load workshops</p>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold font-mono bg-[#2563eb] text-white uppercase shadow-[3px_3px_0px_0px_#1e3a8a]"
          >
            <RefreshCw size={14} /> Retry
          </button>
        </motion.div>
      ) : (
        <motion.div variants={item} className="space-y-5 font-mono">
          {displayedWorkshops.length === 0 ? (
            <div className="py-20 text-center rounded-2xl border-2 border-dashed border-blue-400 bg-corp-surface p-8 space-y-3">
              <Presentation className="w-12 h-12 text-[#2563eb] mx-auto opacity-70" />
              <h3 className="text-base font-extrabold uppercase text-corp-text">
                {activeTab === "my_tickets"
                  ? "No Registered Tickets Yet"
                  : "No Live Workshops Scheduled"}
              </h3>
              <p className="text-xs font-medium text-corp-text-secondary max-w-md mx-auto">
                {activeTab === "my_tickets"
                  ? "You haven't registered for any live workshops yet. Check back when new workshops are announced in the database."
                  : "All workshops are loaded directly from the database in real time. Any newly scheduled workshops will automatically appear here."}
              </p>
            </div>
          ) : (
            displayedWorkshops.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] overflow-hidden bg-corp-surface group transition-all hover:-translate-y-0.5"
              >
                {/* Left: Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-amber-950 border border-amber-500">
                      {w.hostOrg}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-50 text-[#2563eb] border border-blue-300">
                      {w.category} • {w.level}
                    </span>
                    <span className="text-xs font-extrabold text-amber-500 flex items-center gap-1">
                      <Flame size={13} className="animate-pulse fill-amber-500" />
                      {w.spotsRemaining} Seats Left
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase text-corp-text group-hover:text-[#2563eb] transition-colors">
                      <Link href={`/workshops/${w.id}`}>{w.title}</Link>
                    </h3>
                    <p className="text-xs font-sans font-medium mt-1 leading-relaxed text-corp-text-secondary">
                      {w.tagline || w.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs font-bold text-corp-text-tertiary">
                    <span className="flex items-center gap-1.5"><Calendar size={13} className="text-[#2563eb]" /> {w.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} className="text-[#2563eb]" /> {w.time}</span>
                    <span className="flex items-center gap-1.5"><User size={13} className="text-[#2563eb]" /> {w.instructor?.name || "Lead Instructor"} ({w.instructor?.company || "INSYT"})</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div
                  className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-3 pt-4 md:pt-0 border-t-2 md:border-t-0 border-blue-400/40 flex-shrink-0"
                >
                  <div className="text-xs font-mono">
                    <p className="font-extrabold text-[#2563eb] flex items-center gap-1">
                      <Sparkles size={12} />
                      +{w.xpReward} XP Reward
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/workshops/${w.id}`}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono font-extrabold border-2 border-blue-400 hover:bg-corp-bg-secondary text-corp-text flex items-center gap-1 transition-all"
                    >
                      <span>Details &amp; Exam</span>
                      <ArrowRight size={13} />
                    </Link>

                    {bookedIds.has(w.id) ? (
                      <Link
                        href={`/workshops/${w.id}`}
                        className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500/15 text-emerald-600 border-2 border-emerald-500 uppercase flex items-center gap-1"
                      >
                        <Check size={13} />
                        Ticket Ready
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleOpenRegistration(w, e)}
                        className="px-5 py-2.5 rounded-xl text-xs font-mono font-extrabold uppercase text-amber-950 bg-amber-400 hover:bg-amber-300 transition-all border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] flex items-center gap-1.5 active:scale-95 cursor-pointer z-10"
                      >
                        <Ticket size={13} />
                        Book Seat
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}

      {/* Registration Modal Form */}
      <WorkshopRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workshop={selectedWorkshop}
        onSuccess={() => {
          if (selectedWorkshop) {
            setBookedIds((prev) => new Set([...prev, selectedWorkshop.id]));
          }
        }}
      />
    </motion.div>
  );
}
