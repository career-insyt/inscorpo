"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { UserState, Notification, CommunityPost, PassportProfile } from "@/lib/state/types";
import { INITIAL_USER_STATE } from "@/lib/state/initial-data";
import { useAuth } from "@/components/providers/auth-provider";
import { account } from "@/lib/appwrite";
import { syncUserProfile, fetchTasks, fetchEvents, fetchCommunityPosts } from "@/lib/db";
import { generateId } from "@/lib/id";

type UserContextType = {
  state: UserState;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void;
  addCommunityPost: (content: string, space: string) => void;
  togglePostLike: (id: string) => void;
  replyToPost: (id: string, text: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  updateProfileName: (name: string) => Promise<void>;
  updatePassportProfile: (data: Partial<PassportProfile>) => Promise<void>;
  enrollInPath: (slug: string, title: string) => void;
  claimDailyCheckIn: () => boolean;
  toggleTask: (taskTitle: string) => void;
  resetUserStats: () => Promise<void>;
  recordStudyMinutes: (minutes: number) => void;
  redeemVoucher: (code: string, reason: string) => boolean;
  completeChallenge: (challengeId: string, reason: string) => void;
  buyItem: (itemId: string, itemTitle: string, method: string) => void;
  buyStreakFreeze: () => boolean;
  completeChecklistTask: (taskId: string, title: string) => boolean;
  boostUserStats: (streakDays: number, reason: string) => void;
  completeMockTest: (testId: string, score: number, title?: string) => void;
  completeLesson: (courseId: string, lessonSlug: string, lessonTitle?: string, xp?: number) => void;
  updateSubscriptionTier: (
    tier: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise",
    status?: "active" | "inactive" | "trialing"
  ) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/** Returns the 0-indexed day of the week where 0=Monday, 6=Sunday */
function getTodayIndex(): number {
  const jsDay = new Date().getDay(); // 0=Sun, 1=Mon...6=Sat
  return jsDay === 0 ? 6 : jsDay - 1; // remap to Mon=0...Sun=6
}

const DEFAULT_INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-streak-checkin",
    title: "Daily Velocity Streak Active",
    message: "Keep your consecutive check-in streak alive to preserve your talent percentile ranking.",
    type: "achievement",
    time: "5m ago",
    read: false,
    link: "/dashboard?highlight=daily-streak",
  },
  {
    id: "notif-skill-gap",
    title: "Priority Gap: Power BI DAX & Star Schema",
    message: "Corporate diagnostic highlights modeling and DAX as high-priority target remediations.",
    type: "alert",
    time: "45m ago",
    read: false,
    link: "/dashboard?highlight=skill-gap-audit",
  },
  {
    id: "notif-passport-evidence",
    title: "Career Passport Evidence Ledger Ready",
    message: "Inspect your tamper-proof ED25519 cryptographic skill credentials and export for recruiters.",
    type: "system",
    time: "3h ago",
    read: false,
    link: "/career-passport?highlight=career-passport-evidence",
  },
  {
    id: "notif-ccfcm-course",
    title: "Corporate Financial Modeler Curriculum",
    message: "Practice Module 1: Corporate PVM Decomposition & Financial Fundamentals interactively.",
    type: "course",
    time: "1d ago",
    read: true,
    link: "/learn/corporate-financial-modeler?highlight=course-curriculum",
  },
];

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserState>({
    ...INITIAL_USER_STATE,
    notifications: DEFAULT_INITIAL_NOTIFICATIONS,
  });
  // `prefsLoaded` tracks if we've finished the async Appwrite prefs fetch.
  // We no longer block rendering on this — children mount immediately.
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const { user } = useAuth();
  // Prevent saving prefs on the initial mount before loading is done
  const isFirstSaveRef = useRef(true);
  const lastCheckInRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    lastCheckInRef.current = state.lastCheckInDate;
  }, [state.lastCheckInDate]);

  // ─── Instant LocalStorage Sync for Enrollment State & Subscription Tier ───
  useEffect(() => {
    try {
      const stored = localStorage.getItem("insyt_enrolled_paths");
      const storedTier = localStorage.getItem("insyt_subscription_tier");
      const clean = stored
        ? (JSON.parse(stored) as string[]).filter((s) => s && s !== "corporate-mto" && s !== "excel-corporate")
        : [];
      setState((prev) => ({
        ...prev,
        ...(clean.length ? { enrolledPathSlugs: Array.from(new Set([...prev.enrolledPathSlugs, ...clean])) } : {}),
        ...(storedTier ? { subscriptionTier: storedTier as any } : {}),
      }));
    } catch {
      // fallback
    }
  }, []);

  // ─── Load from Appwrite Preferences ───────────────────────────────────────

  useEffect(() => {
    if (!user) {
      setPrefsLoaded(true);
      return;
    }

    const loadAppwritePrefs = async () => {
      try {
        const results = await Promise.allSettled([
          account.getPrefs(),
          fetchTasks(),
          fetchEvents(),
          fetchCommunityPosts(),
        ]);

        const prefs: any = results[0].status === "fulfilled" ? results[0].value : {};
        const dbTasks: any[] = results[1].status === "fulfilled" ? results[1].value : [];
        const dbEvents: any[] = results[2].status === "fulfilled" ? results[2].value : [];
        const dbCommunityPosts: any[] = results[3].status === "fulfilled" ? results[3].value : [];

        const completedTasksList: string[] = prefs.completedTasks ?? [];
        const mappedTasks = dbTasks.map((t: any) => ({
          title: t.title,
          done: completedTasksList.includes(t.title),
        }));

        const cleanEnrolled = (prefs.enrolledPathSlugs ?? []).filter(
          (s: string) => s && s !== "corporate-mto" && s !== "excel-corporate"
        );

        if (prefs) {
          const todayStr = new Date().toISOString().split("T")[0];
          const hasCheckedInToday = prefs.lastCheckInDate === todayStr;
          const rawNotifications: Notification[] = prefs.notifications ?? [];
          const userNotifications: Notification[] = rawNotifications.length > 0 ? rawNotifications : [...DEFAULT_INITIAL_NOTIFICATIONS];

          if (!hasCheckedInToday && !userNotifications.some(n => n.title.includes("Streak"))) {
            userNotifications.unshift({
              id: generateId("streak_rem"),
              title: "Keep Your Streak Alive!",
              message: "You haven't completed your daily quests today. Complete them now to protect your streak.",
              type: "achievement",
              time: "Just now",
              read: false,
            });
          }

          // Ensure Excel course is completed for this account as mandated
          const defaultExcelCourse = INITIAL_USER_STATE.courseProgress[0];
          const rawCourseProgress = prefs.courseProgress ?? [];
          const hasExcelCourse = rawCourseProgress.some(
            (c: any) => c.courseId === "excel-modeling" || c.title?.toLowerCase().includes("excel")
          );
          const resolvedCourseProgress = hasExcelCourse
            ? rawCourseProgress.map((c: any) =>
                c.courseId === "excel-modeling" || c.title?.toLowerCase().includes("excel")
                  ? { ...c, progress: 100 }
                  : c
              )
            : [defaultExcelCourse, ...rawCourseProgress];

          const defaultBadge = INITIAL_USER_STATE.recentBadges[0];
          const rawBadges = (prefs.recentBadges ?? []).filter((b: any) => b.icon !== "🎓");
          const hasBadge = rawBadges.some((b: any) => b.name === defaultBadge.name);
          const resolvedBadges = hasBadge ? rawBadges : [defaultBadge, ...rawBadges];

          setState({
            ...INITIAL_USER_STATE,
            name: user.name || INITIAL_USER_STATE.name,
            email: user.email,
            streak: prefs.streak ?? 0,
            weeklyActivity: prefs.weeklyActivity ?? [0, 0, 0, 0, 0, 0, 0],
            courseProgress: resolvedCourseProgress,
            notifications: userNotifications,
            todayTasks: mappedTasks,
            upcomingEvents: dbEvents,
            recentBadges: resolvedBadges,
            communityPosts: dbCommunityPosts,
            passportProfile: prefs.passportProfile ?? (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("insyt_passport_profile") || "null") : undefined) ?? undefined,
            enrolledPathSlugs: cleanEnrolled.length ? cleanEnrolled : ["excel-modeling"],
            lastCheckInDate: prefs.lastCheckInDate ?? undefined,
            redeemedVouchers: prefs.redeemedVouchers ?? [],
            completedChallengeIds: prefs.completedChallengeIds ?? [],
            purchasedItemIds: prefs.purchasedItemIds ?? [],
            completedChecklistTaskIds: prefs.completedChecklistTaskIds ?? [],
            careerGoals: prefs.careerGoals ?? [],
            experienceLevel: prefs.experienceLevel ?? "",
            subscriptionTier: prefs.subscriptionTier || (typeof window !== "undefined" ? (localStorage.getItem("insyt_subscription_tier") as any) : null) || "starter",
            subscriptionStatus: prefs.subscriptionStatus ?? "active",
          });

        } else {
          // Fresh user — initialize defaults
          const freshState: UserState = {
            ...INITIAL_USER_STATE,
            name: user.name || INITIAL_USER_STATE.name,
            email: user.email,
            streak: 0,
            weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
            courseProgress: INITIAL_USER_STATE.courseProgress,
            notifications: [],
            todayTasks: mappedTasks,
            upcomingEvents: dbEvents,
            recentBadges: INITIAL_USER_STATE.recentBadges,
            communityPosts: dbCommunityPosts,
            enrolledPathSlugs: ["excel-modeling"],
            completedChecklistTaskIds: [],
            careerGoals: prefs.careerGoals ?? [],
            experienceLevel: prefs.experienceLevel ?? "",
            subscriptionTier: "starter",
            subscriptionStatus: "active",
          };
          setState(freshState);
          await account.updatePrefs({
            ...freshState,
            communityPosts: undefined, // don't store community posts in prefs
            upcomingEvents: undefined,
            todayTasks: undefined,
            completedTasks: [],
            completedChecklistTaskIds: [],
          });
          await syncUserProfile(user.$id, {
            name: freshState.name,
            streak: freshState.streak,
            email: freshState.email,
            passportProfile: freshState.passportProfile,
          });
        }
      } catch (err) {
        console.error("Failed to load Appwrite user preferences", err);
      } finally {
        setPrefsLoaded(true);
        isFirstSaveRef.current = false;
      }
    };

    loadAppwritePrefs();
  }, [user]);

  // ─── Save to Appwrite on state change (debounced 1s) ───────────────────────

  useEffect(() => {
    // Skip the very first render and the initial load
    if (!prefsLoaded || !user || isFirstSaveRef.current) return;

    const timer = setTimeout(() => {
      const savePrefs = async () => {
        try {
          await account.updatePrefs({
            streak: state.streak,
            weeklyActivity: state.weeklyActivity,
            courseProgress: state.courseProgress,
            notifications: state.notifications,
            recentBadges: state.recentBadges,
            completedTasks: state.todayTasks.filter((t) => t.done).map((t) => t.title),
            passportProfile: state.passportProfile ?? null,
            enrolledPathSlugs: state.enrolledPathSlugs.filter((s) => s && s !== "corporate-mto" && s !== "excel-corporate"),
            lastCheckInDate: state.lastCheckInDate ?? null,
            redeemedVouchers: state.redeemedVouchers,
            completedChallengeIds: state.completedChallengeIds,
            purchasedItemIds: state.purchasedItemIds,
            completedChecklistTaskIds: state.completedChecklistTaskIds ?? [],
            careerGoals: state.careerGoals ?? [],
            experienceLevel: state.experienceLevel ?? "",
            subscriptionTier: state.subscriptionTier ?? "starter",
            subscriptionStatus: state.subscriptionStatus ?? "active",
          });

          await syncUserProfile(user.$id, {
            name: state.name,
            streak: state.streak,
            email: state.email || user.email,
            passportProfile: state.passportProfile,
          });
        } catch (err) {
          console.error("Failed to save Appwrite user preferences", err);
        }
      };

      savePrefs();
    }, 1000); // 1-second debounce to prevent save storms

    return () => clearTimeout(timer);
  }, [state, prefsLoaded, user]);

  /**
   * Records minutes of study time for today in the weekly activity array.
   * Called whenever a lesson is completed or a significant study session ends.
   */
  const recordStudyMinutes = (minutes: number) => {
    const todayIdx = getTodayIndex();
    setState((prev) => {
      const newActivity = [...prev.weeklyActivity];
      newActivity[todayIdx] = (newActivity[todayIdx] || 0) + minutes;
      return { ...prev, weeklyActivity: newActivity };
    });
  };

  const markNotificationRead = (id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  const markAllNotificationsRead = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  };

  const deleteNotification = (id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  };

  const clearAllNotifications = () => {
    setState((prev) => ({
      ...prev,
      notifications: [],
    }));
  };

  const addNotification = (notif: Omit<Notification, "id" | "time" | "read">) => {
    setState((prev) => {
      const newNotif: Notification = {
        ...notif,
        id: generateId("notif"),
        time: "Just now",
        read: false,
      };
      return { ...prev, notifications: [newNotif, ...prev.notifications] };
    });
  };

  const addCommunityPost = (content: string, space: string) => {
    setState((prev) => {
      const newPost: CommunityPost = {
        id: generateId("post"),
        author: { name: prev.name, role: "Student", avatar: prev.name.substring(0, 2).toUpperCase() },
        content,
        space,
        time: "Just now",
        likes: 0,
        comments: 0,
        isLikedByMe: false,
        replies: [],
      };
      return { ...prev, communityPosts: [newPost, ...prev.communityPosts] };
    });
  };

  const togglePostLike = (id: string) => {
    setState((prev) => ({
      ...prev,
      communityPosts: prev.communityPosts.map((p) => {
        if (p.id === id) {
          return { ...p, isLikedByMe: !p.isLikedByMe, likes: p.isLikedByMe ? p.likes - 1 : p.likes + 1 };
        }
        return p;
      }),
    }));
  };

  const replyToPost = (id: string, text: string) => {
    setState((prev) => ({
      ...prev,
      communityPosts: prev.communityPosts.map((p) => {
        if (p.id === id) {
          const replies = p.replies || [];
          return {
            ...p,
            comments: p.comments + 1,
            replies: [...replies, { author: prev.name, text }],
          };
        }
        return p;
      }),
    }));
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    setState((prev) => {
      const course = prev.courseProgress.find((c) => c.id === courseId);
      const exists = !!course;

      let nextProgressList;
      let title = "";

      if (exists) {
        title = course.title;
        nextProgressList = prev.courseProgress.map((c) =>
          c.id === courseId ? { ...c, progress, lastAccessed: "Just now" } : c
        );
      } else {
        title = courseId
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        nextProgressList = [
          ...prev.courseProgress,
          { id: courseId, title, progress, lastAccessed: "Just now", category: "general" as const },
        ];
      }

      let nextNotifications = [...prev.notifications];
      let nextBadges = [...prev.recentBadges];
      const oldProgress = course ? course.progress : 0;

      if (oldProgress < 100 && progress === 100) {
        nextNotifications = [
          {
            id: generateId("notif"),
            type: "achievement" as const,
            title: "Course Completed",
            message: `You successfully finished ${title}.`,
            time: "Just now",
            read: false,
          },
          ...nextNotifications,
        ];

        if (!nextBadges.some((b) => b.name === "Course Graduate")) {
          nextBadges = [...nextBadges, { name: "Course Graduate", icon: "Award" }];
        }
      }

      return {
        ...prev,
        notifications: nextNotifications,
        recentBadges: nextBadges,
        courseProgress: nextProgressList,
      };
    });
  };

  const updateProfileName = async (name: string) => {
    try {
      if (user) {
        await account.updateName(name);
      }
      setState((prev) => ({ ...prev, name }));
    } catch (err) {
      console.error("Failed to update profile name in Appwrite:", err);
      throw err;
    }
  };

  const updatePassportProfile = async (data: Partial<PassportProfile>) => {
    let merged: PassportProfile = {
      headline: "",
      summary: "",
      location: "",
      phone: "",
      linkedin: "",
      github: "",
      university: "",
      degree: "",
      gradYear: "",
      experience: [],
      customSkills: [],
    };

    setState((prev) => {
      merged = {
        headline: "",
        summary: "",
        location: "",
        phone: "",
        linkedin: "",
        github: "",
        university: "",
        degree: "",
        gradYear: "",
        experience: [],
        customSkills: [],
        ...(prev.passportProfile ?? {}),
        ...data,
      };
      return { ...prev, passportProfile: merged };
    });

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("insyt_passport_profile", JSON.stringify(merged));
      } catch (e) {
        console.warn("Could not cache passport profile to localStorage:", e);
      }
    }

    if (user?.$id) {
      try {
        await account.updatePrefs({
          passportProfile: merged,
        });
        await syncUserProfile(user.$id, {
          passportProfile: merged,
        });
      } catch (err) {
        console.warn("Could not immediately sync passport profile to Appwrite:", err);
      }
    }
  };

  const enrollInPath = (slug: string, title: string) => {
    if (!slug || slug === "corporate-mto" || slug === "excel-corporate") return;
    setState((prev) => {
      if (prev.enrolledPathSlugs.includes(slug)) return prev; // already enrolled
      const nextSlugs = [...prev.enrolledPathSlugs, slug];
      try {
        localStorage.setItem("insyt_enrolled_paths", JSON.stringify(nextSlugs));
      } catch {
        // storage fallback
      }
      const newNotif = {
        id: generateId("notif"),
        type: "course" as const,
        title: "Enrolled Successfully",
        message: `You're now enrolled in "${title}". Start your first lesson!`,
        time: "Just now",
        read: false,
      };
      return {
        ...prev,
        enrolledPathSlugs: nextSlugs,
        notifications: [newNotif, ...prev.notifications],
      };
    });
  };

  const claimDailyCheckIn = (): boolean => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (lastCheckInRef.current === todayStr || state.lastCheckInDate === todayStr) {
      return false; // already claimed today
    }

    // Lock immediately against rapid sequential clicks
    lastCheckInRef.current = todayStr;

    setState((prev) => {
      if (prev.lastCheckInDate === todayStr) return prev;

      const newStreak = prev.streak + 1;
      const newNotif = {
        id: generateId("notif"),
        type: "achievement" as const,
        title: "Daily Check-in Complete",
        message: `Streak increased to ${newStreak} days!`,
        time: "Just now",
        read: false,
      };
      // Also record 5 minutes of activity so heatmap/velocity chart reflects check-in
      const todayIdx = getTodayIndex();
      const newActivity = [...prev.weeklyActivity];
      newActivity[todayIdx] = (newActivity[todayIdx] || 0) + 5;
      return {
        ...prev,
        streak: newStreak,
        lastCheckInDate: todayStr,
        weeklyActivity: newActivity,
        notifications: [newNotif, ...prev.notifications],
      };
    });
    return true;
  };

  const buyStreakFreeze = (): boolean => {
    setState((prev) => {
      const newFreezes = (prev.streakFreezes || 0) + 1;
      const newNotif: Notification = {
        id: generateId("sf_notif"),
        type: "achievement",
        title: "Streak Freeze Active",
        message: "Your learning streak is protected for 1 missed day.",
        time: "Just now",
        read: false,
      };

      return {
        ...prev,
        streakFreezes: newFreezes,
        notifications: [newNotif, ...prev.notifications],
      };
    });
    return true;
  };

  const completeChecklistTask = (taskId: string, title: string): boolean => {
    const currentTasks = state.completedChecklistTaskIds || [];
    if (currentTasks.includes(taskId)) return false;

    setState((prev) => {
      const prevTasks = prev.completedChecklistTaskIds || [];
      if (prevTasks.includes(taskId)) return prev;

      const newTasks = [...prevTasks, taskId];

      const newNotif: Notification = {
        id: generateId("chk_notif"),
        type: "achievement",
        title: `Task Completed: ${title}`,
        message: `Congratulations! You completed a getting started task.`,
        time: "Just now",
        read: false,
      };

      return {
        ...prev,
        completedChecklistTaskIds: newTasks,
        notifications: [newNotif, ...prev.notifications],
      };
    });
    return true;
  };

  const toggleTask = (taskTitle: string) => {
    setState((prev) => {
      const taskObj = prev.todayTasks.find((t) => t.title === taskTitle);
      if (!taskObj) return prev;

      const newDone = !taskObj.done;
      const updatedTasks = prev.todayTasks.map((t) =>
        t.title === taskTitle ? { ...t, done: newDone } : t
      );

      return {
        ...prev,
        todayTasks: updatedTasks,
      };
    });
  };

  const resetUserStats = async () => {
    const cleanState: UserState = {
      ...INITIAL_USER_STATE,
      name: state.name,
      email: state.email,
    };
    setState(cleanState);
    if (user) {
      try {
        await account.updatePrefs({
          streak: 0,
          weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
          courseProgress: [],
          notifications: [],
          recentBadges: [],
          completedTasks: [],
          completedChecklistTaskIds: [],
        });
        await syncUserProfile(user.$id, {
          name: cleanState.name,
          streak: 0,
          email: cleanState.email,
        });
      } catch (err) {
        console.error("Failed to reset prefs/profile in Appwrite:", err);
      }
    }
  };

  const redeemVoucher = (code: string, reason: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (state.redeemedVouchers.includes(cleanCode)) return false;

    setState((prev) => {
      const newNotif = {
        id: generateId("notif"),
        type: "achievement" as const,
        title: "Voucher Redeemed",
        message: `Successfully redeemed ${cleanCode}!`,
        time: "Just now",
        read: false,
      };
      return {
        ...prev,
        redeemedVouchers: [...prev.redeemedVouchers, cleanCode],
        notifications: [newNotif, ...prev.notifications],
      };
    });
    return true;
  };

  const completeChallenge = (challengeId: string, reason: string) => {
    setState((prev) => {
      if (prev.completedChallengeIds.includes(challengeId)) return prev;

      const newNotif = {
        id: generateId("notif"),
        type: "achievement" as const,
        title: "Challenge Completed",
        message: `You mastered "${reason}".`,
        time: "Just now",
        read: false,
      };
      return {
        ...prev,
        completedChallengeIds: [...prev.completedChallengeIds, challengeId],
        notifications: [newNotif, ...prev.notifications],
      };
    });
  };

  const buyItem = (itemId: string, itemTitle: string, method: string) => {
    setState((prev) => {
      if (prev.purchasedItemIds.includes(itemId)) return prev;

      const newNotif = {
        id: generateId("notif"),
        type: "achievement" as const,
        title: "Purchase Successful",
        message: `Unlocked "${itemTitle}" via ${method}.`,
        time: "Just now",
        read: false,
      };
      return {
        ...prev,
        purchasedItemIds: [...prev.purchasedItemIds, itemId],
        notifications: [newNotif, ...prev.notifications],
      };
    });
  };

  const boostUserStats = (streakDays: number, reason: string) => {
    setState((prev) => {
      const newStreak = prev.streak + streakDays;
      return {
        ...prev,
        streak: newStreak,
      };
    });
  };

  const completeMockTest = (testId: string, score: number, title?: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setState((prev) => {
      const existing = prev.completedMockTests || [];
      const nextCompleted = existing.includes(testId) ? existing : [...existing, testId];

      let updatedPassport = prev.passportProfile;
      if (score >= 60 && updatedPassport) {
        const skillName = title ? title.replace(/Assessment|Mock|Benchmark|Drill/gi, "").trim() : "Corporate Analytics";
        const currentVerified = updatedPassport.verifiedSkillDetails || {};
        updatedPassport = {
          ...updatedPassport,
          verifiedSkillDetails: {
            ...currentVerified,
            [skillName || "Commercial Modeling"]: {
              verified: true,
              score,
              verifiedAt: todayStr,
              hash: `INSYT-${testId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
            },
          },
        };
      }

      const newNotif: Notification = {
        id: generateId("notif"),
        type: "achievement",
        title: "Assessment Verified in Career Passport 🏆",
        message: `Scored ${score}% on ${title || testId}. Percentile benchmark indexed.`,
        time: "Just now",
        read: false,
      };

      return {
        ...prev,
        completedMockTests: nextCompleted,
        passportProfile: updatedPassport,
        notifications: [newNotif, ...prev.notifications],
      };
    });

    try {
      localStorage.setItem(`insyt_drill_done_${todayStr}`, "true");
      const raw = localStorage.getItem("insyt_mock_test_results") || "[]";
      const parsed = JSON.parse(raw);
      parsed.unshift({ testId, score, date: todayStr, timestamp: Date.now() });
      localStorage.setItem("insyt_mock_test_results", JSON.stringify(parsed));
    } catch {}
  };

  const completeLesson = (courseId: string, lessonSlug: string, lessonTitle?: string, xp: number = 50) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setState((prev) => {
      const course = prev.courseProgress.find((c) => c.id === courseId || c.courseId === courseId);
      const exists = !!course;
      const currentCompletedLessons = course?.completedLessons || [];
      const nextLessons = currentCompletedLessons.includes(lessonSlug)
        ? currentCompletedLessons
        : [...currentCompletedLessons, lessonSlug];

      const newProgress = exists ? Math.min(course.progress + 20, 100) : 20;

      const nextProgressList = exists
        ? prev.courseProgress.map((c) =>
            c.id === courseId || c.courseId === courseId
              ? { ...c, progress: newProgress, lastAccessed: todayStr, completedLessons: nextLessons }
              : c
          )
        : [
            ...prev.courseProgress,
            {
              id: courseId,
              courseId,
              title: courseId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
              progress: newProgress,
              lastAccessed: todayStr,
              category: "general" as const,
              completedLessons: [lessonSlug],
            },
          ];

      const newNotif: Notification = {
        id: generateId("notif"),
        type: "achievement",
        title: "Lesson Completed & Verified 🎉",
        message: `Finished ${lessonTitle || lessonSlug} in Career Passport (+${xp} XP).`,
        time: "Just now",
        read: false,
      };

      return {
        ...prev,
        courseProgress: nextProgressList,
        notifications: [newNotif, ...prev.notifications],
      };
    });

    try {
      localStorage.setItem(`insyt_daily_lesson_done_${todayStr}`, "true");
      const raw = localStorage.getItem("insyt_completed_lessons_list") || "[]";
      const parsed = JSON.parse(raw);
      if (!parsed.includes(lessonSlug)) parsed.push(lessonSlug);
      localStorage.setItem("insyt_completed_lessons_list", JSON.stringify(parsed));
    } catch {}
  };

  const updateSubscriptionTier = async (
    tier: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise",
    status: "active" | "inactive" | "trialing" = "active"
  ) => {
    const planNames: Record<string, string> = {
      single_course: "Single Course Pass",
      flagship_path: "Flagship Track Pass",
      pro: "INSYT Pro All-Access",
      enterprise: "Enterprise Corporate Pass",
      starter: "Starter Free Plan",
    };

    const planName = planNames[tier] || tier;

    // 1. Immediately update React state with notification
    setState((prev) => {
      const newNotif: Notification = {
        id: generateId("sub_notif"),
        type: "achievement",
        title: `Plan Upgraded: ${planName}`,
        message: `Your membership is now active with ${planName}. All perks and course materials for this tier are unlocked!`,
        time: "Just now",
        read: false,
      };

      const newBadge = tier === "pro" 
        ? { name: "Pro Executive", icon: "Award" }
        : tier === "flagship_path"
        ? { name: "Track Specialist", icon: "Sparkles" }
        : tier === "single_course"
        ? { name: "Course Scholar", icon: "ShieldCheck" }
        : null;

      const badges = newBadge && !prev.recentBadges.some(b => b.name === newBadge.name) 
        ? [...prev.recentBadges, newBadge]
        : prev.recentBadges;

      return {
        ...prev,
        subscriptionTier: tier,
        subscriptionStatus: status,
        recentBadges: badges,
        notifications: [newNotif, ...prev.notifications],
      };
    });

    // 2. Persist to localStorage synchronously for instant reactivity
    try {
      localStorage.setItem("insyt_subscription_tier", tier);
      localStorage.setItem("insyt_subscription_status", status);
    } catch {
      // storage fallback
    }

    // 3. Persist to Appwrite account preferences & database user collection
    try {
      if (user) {
        await account.updatePrefs({
          subscriptionTier: tier,
          subscriptionStatus: status,
        });
        await syncUserProfile(user.$id, {
          subscriptionTier: tier,
        });
      }
    } catch (err) {
      console.warn("Could not save subscription to Appwrite prefs/db:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        clearAllNotifications,
        addNotification,
        addCommunityPost,
        togglePostLike,
        replyToPost,
        updateCourseProgress,
        updateProfileName,
        updatePassportProfile,
        enrollInPath,
        claimDailyCheckIn,
        toggleTask,
        resetUserStats,
        recordStudyMinutes,
        redeemVoucher,
        completeChallenge,
        buyItem,
        buyStreakFreeze,
        completeChecklistTask,
        boostUserStats,
        completeMockTest,
        completeLesson,
        updateSubscriptionTier,
      }}
    >
      {/*
        Children render IMMEDIATELY — no more blocking on isLoaded.
        This eliminates the hydration mismatch that caused a full-page
        loading flash and React console warnings.
        Downstream components handle their own skeleton states.
      */}
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
