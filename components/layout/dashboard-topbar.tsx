"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, Bell, ChevronRight, X,
  BookOpen, Award, LogOut, Crown, User, Building2, Flame,
  CheckCheck, Trash2, AlertCircle, Sparkles, Zap, ArrowRight, Settings, Layers, HelpCircle
} from "lucide-react";
import { useUser } from "@/components/providers/user-context";
import { useAuth } from "@/components/providers/auth-provider";
import { StreakExplainerModal } from "@/components/dashboard/streak-explainer-modal";
import { SearchCommandPalette } from "@/components/layout/search-command-palette";
import { Notification } from "@/lib/state/types";
import { cn } from "@/lib/utils";

const breadcrumbMap: Record<string, string> = {
  "/profile": "User Profile",
  "/dashboard": "Dashboard",
  "/learn": "Learn",
  "/mock-tests": "Practice Tests",
  "/career-passport": "Career Passport",
  "/career-hub": "Career Hub",
  "/certificates": "Certificates",
  "/workshops": "Live Workshops",
  "/events": "Events & Competitions",
  "/marketplace": "Marketplace",
  "/help": "Help & Support",
  "/mock-interviews": "AI Mock Interviews",
  "/challenges": "Skill Challenges",
  "/jobs": "Jobs & Circulars",
};

function resolveBreadcrumb(pathname: string): string {
  if (breadcrumbMap[pathname]) return breadcrumbMap[pathname];
  if (pathname.startsWith("/learn/") && pathname.split("/").length >= 5) return "Lesson Player";
  if (pathname.startsWith("/learn/") && pathname.split("/").length === 4) return "Course Detail";
  if (pathname.startsWith("/learn/") && pathname.split("/").length === 3) return "Learning Path";
  if (pathname.startsWith("/mock-tests/")) return "Mock Test";
  if (pathname.startsWith("/workshops/")) return "Workshop Detail";
  if (pathname.startsWith("/jobs/")) return "Job Detail";
  return "Dashboard";
}

export function DashboardTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
    state,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearAllNotifications,
  } = useUser();

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<"all" | "unread" | "achievement" | "alert">("all");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [streakModalOpen, setStreakModalOpen] = useState(false);

  const currentPage = resolveBreadcrumb(pathname);
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const tier = (state.subscriptionTier || "starter") as "starter" | "single_course" | "flagship_path" | "pro" | "enterprise";

  const tierStyles = {
    pro: {
      name: "PRO ACTIVE",
      shortName: "PRO",
      icon: <Crown size={13} className="fill-amber-950 text-amber-950" />,
      badgeClass: "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 border-2 border-amber-600 shadow-[2px_2px_0px_0px_#78350f] hover:from-amber-300 hover:to-yellow-300",
      tagClass: "bg-amber-400 text-amber-950",
    },
    flagship_path: {
      name: "TRACK PASS",
      shortName: "TRACK",
      icon: <Award size={13} className="fill-white text-white" />,
      badgeClass: "bg-gradient-to-r from-violet-600 to-purple-600 text-white border-2 border-violet-400 shadow-[2px_2px_0px_0px_#4c1d95] hover:from-violet-500 hover:to-purple-500",
      tagClass: "bg-violet-600 text-white",
    },
    single_course: {
      name: "COURSE PASS",
      shortName: "COURSE",
      icon: <Award size={13} className="text-white" />,
      badgeClass: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-2 border-emerald-400 shadow-[2px_2px_0px_0px_#064e3b] hover:from-emerald-500 hover:to-teal-500",
      tagClass: "bg-emerald-600 text-white",
    },
    enterprise: {
      name: "ENTERPRISE",
      shortName: "CORP",
      icon: <Building2 size={13} className="text-white" />,
      badgeClass: "bg-gradient-to-r from-blue-700 to-indigo-800 text-white border-2 border-blue-400 shadow-[2px_2px_0px_0px_#1e1b4b] hover:from-blue-600 hover:to-indigo-700",
      tagClass: "bg-blue-700 text-white",
    },
    starter: {
      name: "Upgrade Pro",
      shortName: "PRO",
      icon: <Crown size={13} />,
      badgeClass: "text-white bg-[#2563eb] hover:bg-blue-600 border-2 border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]",
      tagClass: "bg-slate-700 text-slate-300",
    },
  };

  const currentTier = tierStyles[tier] || tierStyles.starter;

  const closeAllMenus = () => {
    setNotifOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleNotif = () => {
    setNotifOpen((prev) => {
      if (!prev) { setUserMenuOpen(false); setSearchOpen(false); }
      return !prev;
    });
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => {
      if (!prev) { setNotifOpen(false); setSearchOpen(false); }
      return !prev;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setNotifOpen(false);
        setUserMenuOpen(false);
      }
      if (e.key === "Escape") closeAllMenus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNotificationClick = (item: Notification) => {
    markNotificationRead(item.id);
    setNotifOpen(false);
    if (item.link) {
      router.push(item.link);
    } else if (item.title.toLowerCase().includes("streak")) {
      router.push("/dashboard?highlight=daily-streak");
    } else if (item.title.toLowerCase().includes("gap")) {
      router.push("/dashboard?highlight=skill-gap-audit");
    } else if (item.title.toLowerCase().includes("passport") || item.title.toLowerCase().includes("evidence")) {
      router.push("/career-passport?highlight=career-passport-evidence");
    } else {
      router.push("/dashboard");
    }
  };

  const filteredNotifications = state.notifications.filter((n) => {
    if (notifFilter === "unread") return !n.read;
    if (notifFilter === "achievement") return n.type === "achievement";
    if (notifFilter === "alert") return n.type === "alert" || n.type === "system";
    return true;
  });

  return (
    <header
      className="relative z-30 h-16 flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 flex-shrink-0 font-sans border-b-2 max-w-full"
      style={{
        background: "var(--corp-surface)",
        borderColor: "var(--corp-border)",
      }}
    >
      {/* Left: Brand + Breadcrumb */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs flex-shrink-0 font-mono min-w-0">
        <Link href="/dashboard" className="md:hidden flex items-center gap-2 flex-shrink-0">
          <img
            src="/logo/logo_main.png"
            alt="INSYT Logo"
            className="w-8 h-8 rounded-full object-contain border border-blue-400 shadow-sm"
          />
        </Link>
        <span className="hidden xl:inline font-extrabold uppercase text-corp-text-tertiary">INSYT</span>
        <ChevronRight size={12} className="hidden xl:inline text-corp-text-tertiary" />
        <span className="font-extrabold uppercase text-corp-text px-3 py-1 rounded-full bg-corp-bg-secondary border border-corp-border truncate max-w-[120px] sm:max-w-[180px]">
          {currentPage}
        </span>
      </div>

      {/* Middle: Quick Search Trigger Button (GOATED Command Palette Trigger) */}
      <div className="flex-1 max-w-[180px] lg:max-w-[240px] hidden md:flex justify-center font-mono">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center justify-between gap-2 px-4 py-1.5 rounded-full border-2 transition-all hover:border-[#2563eb] cursor-pointer"
          style={{
            background: "var(--corp-bg-secondary)",
            borderColor: "var(--corp-border)",
            color: "var(--corp-text-secondary)",
          }}
          aria-label="Search command palette"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search size={14} className="text-[#2563eb] flex-shrink-0" />
            <span className="text-xs font-extrabold truncate uppercase text-corp-text-tertiary">Search...</span>
          </div>
          <kbd
            className="px-2 py-0.5 rounded-full text-[9px] font-mono font-black border-2 flex-shrink-0 bg-corp-surface text-corp-text-secondary hidden lg:inline"
            style={{ borderColor: "var(--corp-border)" }}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Gamification Badges & Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 font-mono">

        {/* Mobile Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="w-8 h-8 sm:w-9 sm:h-9 md:hidden rounded-full flex items-center justify-center transition-all border-2 border-corp-border hover:bg-corp-bg-secondary flex-shrink-0 cursor-pointer"
          style={{ color: "var(--corp-text-secondary)" }}
          aria-label="Search"
        >
          <Search size={15} className="text-[#2563eb]" />
        </button>

        {/* Streak Pill — Strictly "{streak}d", Yellow colored with dark brown borders and animated fire on hover */}
        <div
          onClick={() => setStreakModalOpen(true)}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black cursor-pointer bg-amber-300 border-2 border-[#451a03] text-[#451a03] shadow-[2px_2px_0px_0px_#451a03] hover:scale-105 active:scale-95 transition-all flex-shrink-0"
          title="Daily Check-in Streak (Click to inspect)"
        >
          <Flame
            size={15}
            className="text-[#451a03] fill-amber-500 group-hover:scale-135 group-hover:rotate-12 group-hover:animate-bounce transition-transform duration-300 flex-shrink-0"
          />
          <span className="font-mono font-black">{state.streak || 1}d</span>
        </div>

        {/* Mobile More Option (Position swapped after Streak, icon-only) */}
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-mobile-more-drawer"));
          }}
          className="w-8 h-8 md:hidden rounded-full flex items-center justify-center bg-[#2563eb] text-white border-2 border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a] active:scale-95 transition-all cursor-pointer flex-shrink-0"
          aria-label="Open More Menu"
          title="More Options"
        >
          <Layers size={15} className="shrink-0" />
        </button>

        {/* Dynamic Plan / Upgrade Badge */}
        {tier !== "starter" ? (
          <Link
            href="/subscription"
            title={`Active Plan: ${currentTier.name} (Click to manage)`}
            className={cn(
              "hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase transition-all active:scale-95 flex-shrink-0 cursor-pointer",
              currentTier.badgeClass
            )}
          >
            {currentTier.icon}
            <span className="hidden lg:inline">{currentTier.name}</span>
            <span className="lg:hidden">{currentTier.shortName}</span>
          </Link>
        ) : (
          <Link
            href="/subscription"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase text-white bg-[#2563eb] hover:bg-blue-600 transition-all border-2 border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a] active:scale-95 flex-shrink-0 cursor-pointer"
          >
            <Crown size={13} />
            <span className="hidden lg:inline">Upgrade Pro</span>
            <span className="lg:hidden">Pro</span>
          </Link>
        )}

        {/* Notifications Dropdown Trigger (Desktop only - mobile has notifications at bottom nav) */}
        <div className="hidden md:block relative flex-shrink-0">
          <button
            onClick={toggleNotif}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all border-2 border-corp-border hover:bg-corp-bg-secondary active:scale-95 flex-shrink-0 cursor-pointer relative"
            style={{ color: "var(--corp-text-secondary)" }}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={15} className="text-[#2563eb]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center text-[9px] font-mono font-black text-white bg-rose-600 border border-white px-1 min-w-[16px] h-[16px] rounded-full shadow-md leading-none z-10">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-[1000]" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.7 }}
                  className="absolute right-0 top-11 w-80 sm:w-96 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[1001] overflow-hidden border-2 border-blue-500 bg-white text-slate-900 font-sans"
                >
                  {/* Popover Header */}
                  <div className="flex items-center justify-between p-3.5 border-b-2 border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-[#2563eb]" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-md text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="Mark all as read"
                        >
                          <CheckCheck size={13} /> Mark read
                        </button>
                      )}
                      {state.notifications.length > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Clear all notifications"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-1 px-3 py-1.5 border-b border-slate-200 bg-slate-100 font-mono text-[11px] overflow-x-auto no-scrollbar">
                    {(["all", "unread", "achievement", "alert"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setNotifFilter(tab)}
                        className={`px-2.5 py-1 rounded-md capitalize font-bold transition-all cursor-pointer whitespace-nowrap ${
                          notifFilter === tab
                            ? "bg-blue-600 text-white font-black shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                        }`}
                      >
                        {tab === "all" ? `All (${state.notifications.length})` : tab}
                      </button>
                    ))}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 bg-white">
                    {filteredNotifications.length === 0 ? (
                      <div className="py-10 px-4 text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 border border-slate-200">
                          <Bell size={18} />
                        </div>
                        <p className="text-xs font-bold text-slate-900">All caught up!</p>
                        <p className="text-[11px] text-slate-500">No notifications in this filter.</p>
                      </div>
                    ) : (
                      filteredNotifications.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleNotificationClick(item)}
                          className={`p-3.5 text-xs transition-all cursor-pointer group flex items-start gap-3 ${
                            !item.read
                              ? "bg-blue-50/70 hover:bg-blue-100/60"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          {/* Type Icon Badge */}
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-200 bg-slate-100 text-slate-900">
                            {item.type === "achievement" ? (
                              <Award size={15} className="text-amber-500" />
                            ) : item.type === "alert" ? (
                              <AlertCircle size={15} className="text-rose-500" />
                            ) : item.type === "course" ? (
                              <BookOpen size={15} className="text-blue-500" />
                            ) : (
                              <Sparkles size={15} className="text-purple-500" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="font-extrabold text-slate-900 leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </span>
                              {!item.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 font-normal leading-relaxed line-clamp-2">
                              {item.message}
                            </p>
                            <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
                              <span>{item.time}</span>
                              <span className="text-[#2563eb] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                Jump to section <ArrowRight size={10} />
                              </span>
                            </div>
                          </div>

                          {/* Delete Item Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(item.id);
                            }}
                            className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
                            title="Dismiss notification"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* USER PROFILE MENU TRIGGER (Desktop only - mobile has profile in bottom nav) */}
        <div className="hidden md:block relative flex-shrink-0">
          {(() => {
            const userPhoto = state.passportProfile?.photoUrl;
            const userDisplayName = user?.name || state.name || "Candidate";
            const userInitial = userDisplayName.charAt(0).toUpperCase() || "U";

            return (
              <>
                <button
                  onClick={toggleUserMenu}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all border-2 border-corp-border hover:bg-slate-100 active:scale-95 flex-shrink-0 cursor-pointer relative overflow-hidden bg-transparent text-slate-900 shadow-xs font-mono font-black text-xs"
                  aria-label="User menu"
                  title={`User menu (${userDisplayName})`}
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt={userDisplayName}
                      className="w-full h-full object-cover rounded-full bg-transparent"
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-900">
                      {userInitial}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-[1000]" onClick={() => setUserMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.7 }}
                        className="absolute right-0 top-11 w-64 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[1001] overflow-hidden border-2 border-corp-border"
                        style={{ background: "var(--corp-surface)" }}
                      >
                        <div 
                          className="p-4 border-b-2 border-corp-border bg-corp-bg-secondary space-y-3 font-mono"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-corp-border overflow-hidden bg-transparent text-slate-900 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs">
                              {userPhoto ? (
                                <img
                                  src={userPhoto}
                                  alt={userDisplayName}
                                  className="w-full h-full object-cover rounded-full bg-transparent"
                                />
                              ) : (
                                <span className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-900">
                                  {userInitial}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-black text-corp-text truncate">{userDisplayName}</p>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-blue-500/15 text-[#2563eb] border border-blue-400/30">
                                  Candidate
                                </span>
                              </div>
                              <p className="text-[10px] text-corp-text-tertiary truncate">{user?.email || state.email || "career@insyt.bd"}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-corp-border/60">
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              Corporate Candidate
                            </span>
                            <span className={cn("px-1.5 py-0.5 rounded font-black text-[9px] uppercase", currentTier.tagClass)}>
                              {currentTier.name}
                            </span>
                          </div>
                        </div>

                  <div className="p-2 space-y-1 font-mono text-xs">
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-corp-text hover:bg-corp-bg-secondary transition-colors cursor-pointer group"
                    >
                      <span className="flex items-center gap-2 font-black text-[#2563eb]">
                        <User size={14} className="text-[#2563eb]" /> User Profile
                      </span>
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Edit
                      </span>
                    </Link>

                    <Link
                      href="/subscription"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-corp-text hover:bg-corp-bg-secondary transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Crown size={14} className="text-amber-500" /> Membership Plan
                      </span>
                      <span className={cn("text-[9px] font-black uppercase px-1.5 py-0.5 rounded", currentTier.tagClass)}>
                        {currentTier.shortName}
                      </span>
                    </Link>

                    <Link
                      href="/career-passport"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-corp-text hover:bg-corp-bg-secondary transition-colors cursor-pointer"
                    >
                      <User size={14} className="text-[#2563eb]" /> Career Passport
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-corp-text hover:bg-corp-bg-secondary transition-colors cursor-pointer"
                    >
                      <Settings size={14} className="text-slate-500" /> Settings
                    </Link>

                    <Link
                      href="/help"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-corp-text hover:bg-corp-bg-secondary transition-colors cursor-pointer"
                    >
                      <HelpCircle size={14} className="text-[#2563eb]" /> Help & Support
                    </Link>

                    <div className="my-1 border-t border-corp-border/60" />

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-rose-600 hover:bg-rose-500/10 transition-colors font-bold cursor-pointer"
                    >
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </>
            );
          })()}
        </div>

      </div>

      {/* Streak Explainer Modal */}
      <StreakExplainerModal isOpen={streakModalOpen} onClose={() => setStreakModalOpen(false)} state={state} />

      {/* GOATED Search Command Palette */}
      <SearchCommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
