import { UserState } from "./types";

// Default empty state — all real data is loaded from Appwrite DB/Prefs in user-context.tsx
export const INITIAL_USER_STATE: UserState = {
  name: "",
  username: "",
  email: "",
  streak: 0,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0], // Mon–Sun minutes, loaded from prefs
  notifications: [],
  courseProgress: [
    {
      id: "excel-modeling",
      courseId: "excel-modeling",
      title: "Corporate Financial & Commercial Modeling in Excel",
      progress: 100,
      category: "analytics",
      completedLessons: [
        "excel-orientation",
        "excel-dynamic-arrays",
        "excel-working-capital",
        "excel-dashboard-capstone",
      ],
      totalLessons: 18,
      lastAccessed: new Date().toISOString(),
    },
  ],
  communityPosts: [],
  todayTasks: [],
  upcomingEvents: [],
  recentBadges: [
    {
      name: "Excel Financial Architect",
      icon: "FileSpreadsheet",
    },
  ],
  careerGoals: [],
  experienceLevel: "",
  subscriptionTier: "starter",
  subscriptionStatus: "active",
  enrolledPathSlugs: ["excel-modeling"],
  streakFreezes: 1,
  redeemedVouchers: [],
  completedChallengeIds: [],
  purchasedItemIds: [],
  completedChecklistTaskIds: [],
};
