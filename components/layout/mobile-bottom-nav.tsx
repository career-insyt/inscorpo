"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, ClipboardList, FileText, Briefcase,
  X, Award, Settings, HelpCircle, LogOut, Mic, Zap, Target, Layers,
  Bell, User, CheckCheck, Trash2, AlertCircle, Sparkles, ChevronRight
} from "lucide-react";
import { useUser } from "@/components/providers/user-context";
import { useAuth } from "@/components/providers/auth-provider";
import { Notification } from "@/lib/state/types";

const FIRE_EMOJI_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp";

// 5 Canonical Pillars per Section 2 of the Supermassive Implementation Plan
const primaryTabs = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen,        label: "Learn",     href: "/learn" },
  { icon: ClipboardList,   label: "Evaluate",  href: "/evaluate" },
  { icon: FileText,        label: "Passport",  href: "/passport" },
  { icon: Briefcase,       label: "Jobs",      href: "/opportunities" },
];

function buildMobileCommandSections() {
  return [
    {
      label: "Applied Practice & Tools",
      items: [
        { icon: Mic,    label: "AI Mock Interviews",  href: "/mock-interviews" },
        { icon: Target, label: "Career Strategy Hub", href: "/career-hub" },
        { icon: Zap,    label: "Case Challenges",     href: "/challenges" },
        { icon: Award,  label: "Verified Credentials", href: "/certificates" },
      ],
    },
  ];
}

const utilityItems = [
  { icon: HelpCircle, label: "Help Center", href: "/help" },
];

export function MobileBottomNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<"all" | "unread" | "achievement" | "alert">("all");

  const pathname = usePathname();
  const router = useRouter();
  const {
    state,
    markNotificationRead,
    markAllNotificationsRead,
    clearAllNotifications,
  } = useUser();
  const { user, logout } = useAuth();

  const commandSections = useMemo(() => buildMobileCommandSections(), []);
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  // Listen to Topbar's "More" button trigger
  useEffect(() => {
    const handleOpenMore = () => setDrawerOpen(true);
    window.addEventListener("open-mobile-more-drawer", handleOpenMore);
    return () => window.removeEventListener("open-mobile-more-drawer", handleOpenMore);
  }, []);

  const isActive = (href: string) => {
    if (href === "/mock-interviews") {
      return pathname === "/mock-interviews" || pathname.startsWith("/mock-interviews/") || pathname === "/evaluate/interviews" || pathname.startsWith("/evaluate/interviews/");
    }
    if (href === "/cockpit" || href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/cockpit";
    }
    if (href === "/prepare" || href === "/learn") {
      return pathname === "/prepare" || pathname.startsWith("/prepare/") || pathname === "/learn" || pathname.startsWith("/learn/");
    }
    if (href === "/evaluate" || href === "/mock-tests") {
      if (pathname.startsWith("/mock-interviews") || pathname.startsWith("/evaluate/interviews")) {
        return false;
      }
      return pathname === "/evaluate" || pathname === "/mock-tests" || pathname.startsWith("/mock-tests/");
    }
    if (href === "/passport" || href === "/career-passport") {
      return pathname === "/passport" || pathname.startsWith("/passport/") || pathname === "/career-passport" || pathname.startsWith("/career-passport/");
    }
    if (href === "/opportunities" || href === "/jobs") {
      return pathname === "/opportunities" || pathname.startsWith("/opportunities/") || pathname === "/jobs" || pathname.startsWith("/jobs/");
    }
    if (href === "/profile") {
      return pathname === "/profile" || pathname.startsWith("/profile/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

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

  const userPhoto = state.passportProfile?.photoUrl;
  const userDisplayName = user?.name || state.name || "Candidate";
  const userInitial = userDisplayName.charAt(0).toUpperCase() || "U";

  return (
    <>
      {/* ─── Bottom Navigation Bar (Mobile Only) ─── */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 font-mono border-t-2 select-none"
        style={{
          background: "var(--corp-surface)",
          borderColor: "var(--corp-border)",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.12)",
        }}
        aria-label="Mobile Navigation"
      >
        <div
          className="flex items-center justify-between px-0.5"
          style={{
            height: "calc(3.75rem + env(safe-area-inset-bottom, 0px))",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {/* 5 Canonical Navigation Tabs */}
          {primaryTabs.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full text-[8.5px] font-black uppercase transition-all min-h-[44px] ${
                  active ? "text-[#2563eb]" : "text-corp-text-tertiary"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all ${
                    active ? "bg-[#2563eb] text-white border border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]" : ""
                  }`}
                >
                  <Icon size={15} style={{ color: active ? "#fff" : "inherit" }} />
                </div>
                <span className="text-[8px] font-black mt-0.5 tracking-tight truncate max-w-[50px]">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Notifications Tab (Swapped from Topbar) */}
          <button
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setDrawerOpen(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full text-[8.5px] font-black uppercase transition-all min-h-[44px] relative cursor-pointer ${
              notifOpen ? "text-[#2563eb]" : "text-corp-text-tertiary"
            }`}
            aria-label="Notifications"
          >
            <div
              className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all relative ${
                notifOpen ? "bg-[#2563eb] text-white border border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]" : ""
              }`}
            >
              <Bell size={15} style={{ color: notifOpen ? "#fff" : "inherit" }} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center text-[8px] font-mono font-black text-white bg-rose-600 border border-white px-0.5 min-w-[14px] h-[14px] rounded-full shadow-md leading-none z-10">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <span className="text-[8px] font-black mt-0.5 tracking-tight truncate max-w-[50px]">
              Alerts
            </span>
          </button>

          {/* User Profile Tab */}
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center flex-1 h-full text-[8.5px] font-black uppercase transition-all min-h-[44px] ${
              isActive("/profile") ? "text-[#2563eb]" : "text-corp-text-tertiary"
            }`}
            aria-label="User Profile"
          >
            <div
              className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all overflow-hidden ${
                isActive("/profile")
                  ? "bg-[#2563eb] text-white border border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]"
                  : "border border-corp-border/60"
              }`}
            >
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt={userDisplayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={15} style={{ color: isActive("/profile") ? "#fff" : "inherit" }} />
              )}
            </div>
            <span className="text-[8px] font-black mt-0.5 tracking-tight truncate max-w-[50px]">
              Profile
            </span>
          </Link>
        </div>
      </nav>

      {/* ─── Mobile Notifications Bottom Drawer ─── */}
      <AnimatePresence>
        {notifOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-0 z-[60]"
              style={{ background: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(6px)" }}
              onClick={() => setNotifOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="md:hidden fixed inset-x-0 bottom-0 z-[70] flex flex-col overflow-hidden font-mono border-t-2 border-corp-border"
              style={{
                background: "var(--corp-surface)",
                maxHeight: "85dvh",
                borderRadius: "24px 24px 0 0",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Drag Handle & Header */}
              <div className="flex-shrink-0 pt-3 pb-2.5 px-4 bg-corp-bg-secondary border-b-2 border-corp-border">
                <div className="w-12 h-1 rounded-full mx-auto mb-2.5 bg-corp-border" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-[#2563eb]" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-corp-text">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-md text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Mark all as read"
                      >
                        <CheckCheck size={12} /> Read all
                      </button>
                    )}
                    {state.notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Clear all"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="p-1 rounded-lg bg-corp-surface hover:bg-corp-bg-secondary text-corp-text-secondary border border-corp-border ml-1 cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 px-3 py-2 border-b border-corp-border bg-corp-bg-secondary font-mono text-[11px] overflow-x-auto no-scrollbar shrink-0">
                {(["all", "unread", "achievement", "alert"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setNotifFilter(tab)}
                    className={`px-3 py-1 rounded-md capitalize font-bold text-[10px] transition-all cursor-pointer whitespace-nowrap ${
                      notifFilter === tab
                        ? "bg-blue-600 text-white font-black shadow-xs"
                        : "text-corp-text-secondary hover:text-corp-text hover:bg-corp-surface"
                    }`}
                  >
                    {tab === "all" ? `All (${state.notifications.length})` : tab}
                  </button>
                ))}
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto overscroll-contain divide-y divide-corp-border/40 pb-6">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center space-y-2">
                    <Bell size={24} className="mx-auto text-corp-text-tertiary" />
                    <p className="text-xs font-bold text-corp-text-tertiary">
                      {notifFilter === "unread" ? "No unread notifications" : "No notifications yet"}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-blue-50/20 active:bg-blue-50/40 ${
                        !notif.read ? "bg-blue-500/5 font-semibold" : ""
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {notif.type === "achievement" ? (
                          <div className="w-7 h-7 rounded-md bg-amber-400 text-amber-950 flex items-center justify-center border border-amber-500">
                            <Sparkles size={14} />
                          </div>
                        ) : notif.type === "alert" ? (
                          <div className="w-7 h-7 rounded-md bg-rose-500 text-white flex items-center justify-center">
                            <AlertCircle size={14} />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-md bg-blue-500/10 text-[#2563eb] border border-blue-400/40 flex items-center justify-center">
                            <Bell size={14} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-black uppercase text-corp-text truncate">
                            {notif.title}
                          </p>
                          <span className="text-[9px] font-mono text-corp-text-tertiary shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] font-sans font-medium text-corp-text-secondary line-clamp-2 mt-0.5">
                          {notif.message}
                        </p>
                      </div>

                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))
                )}
              </div>

              <div style={{ height: "calc(1rem + env(safe-area-inset-bottom, 0px))" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Command Center Drawer (Triggered by Topbar "More" Button) ─── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-0 z-[60]"
              style={{ background: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(6px)" }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Bottom Drawer Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="md:hidden fixed inset-x-0 bottom-0 z-[70] flex flex-col overflow-hidden font-mono border-t-2 border-corp-border"
              style={{
                background: "var(--corp-surface)",
                maxHeight: "88dvh",
                borderRadius: "24px 24px 0 0",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Drag Handle & Header */}
              <div className="flex-shrink-0 pt-3 pb-2 px-5 bg-corp-bg-secondary border-b-2 border-corp-border">
                <div className="w-12 h-1 rounded-full mx-auto mb-3 bg-corp-border" />
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase text-corp-text flex items-center gap-2">
                    <Layers size={16} className="text-[#2563eb]" /> Secondary Practice &amp; Account
                  </h2>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 rounded-xl bg-corp-surface hover:bg-corp-bg-secondary text-corp-text-secondary border border-corp-border min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* User Profile Summary Card inside Drawer */}
              <div
                className="mx-4 mt-4 p-4 rounded-2xl border-2 flex items-center justify-between shadow-sm bg-corp-bg-secondary"
                style={{ borderColor: "var(--corp-border)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0 border-2 border-blue-400 bg-[#2563eb] overflow-hidden"
                  >
                    {state.passportProfile?.photoUrl ? (
                      <img
                        src={state.passportProfile.photoUrl}
                        alt={state.name || "Candidate"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      state.name ? state.name.substring(0, 2).toUpperCase() : "EX"
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase text-corp-text truncate">
                      {state.name || "Executive Candidate"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                        Corporate Scholar
                      </span>
                    </div>
                  </div>
                </div>

                {state.streak > 0 && (
                  <div className="px-2.5 py-1 rounded-lg text-xs font-black bg-rose-500/15 text-rose-500 border border-rose-500/30 flex items-center gap-1 flex-shrink-0">
                    <img src={FIRE_EMOJI_URL} alt="🔥" width={14} height={14} className="object-contain" />
                    <span>{state.streak}d</span>
                  </div>
                )}
              </div>

              {/* Scrollable Command Sections */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 space-y-5 pt-4">
                {commandSections.map((section) => (
                  <div key={section.label} className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-corp-text-tertiary px-1">
                      {section.label}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {section.items.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setDrawerOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase transition-all border-2 active:scale-95 min-h-[44px] ${
                              active
                                ? "bg-[#2563eb] text-white border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]"
                                : "bg-corp-bg-secondary text-corp-text border-corp-border hover:bg-corp-surface"
                            }`}
                          >
                            <Icon size={15} className={active ? "text-white" : "text-[#2563eb]"} />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Preferences & Utilities */}
                <div className="space-y-2 pt-2 border-t-2 border-corp-border">
                  <p className="text-[10px] font-black uppercase tracking-wider text-corp-text-tertiary px-1">
                    Preferences &amp; Account
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {utilityItems.map((item) => {
                      const active = isActive(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase transition-all border-2 active:scale-95 min-h-[44px] ${
                            active
                              ? "bg-[#2563eb] text-white border-blue-400 shadow-[2px_2px_0px_0px_#1e3a8a]"
                              : "bg-corp-bg-secondary text-corp-text border-corp-border hover:bg-corp-surface"
                          }`}
                        >
                          <Icon size={15} className={active ? "text-white" : "text-corp-text-secondary"} />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                    <button
                      onClick={() => { setDrawerOpen(false); logout(); }}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase transition-all border-2 border-rose-500/40 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 active:scale-95 min-h-[44px] cursor-pointer"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                <div style={{ height: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
