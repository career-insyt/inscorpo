export type Notification = {
  id: string;
  type: "achievement" | "course" | "community" | "system" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
};

export type CourseProgress = {
  id: string;
  title: string;
  progress: number; // 0-100
  lastAccessed: string;
  category: "finance" | "communication" | "analytics" | "strategy" | "tests" | "general";
  courseId?: string;
  totalLessons?: number;
  completedLessons?: string[];
  score?: number;
};


export type CommunityPost = {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  space: string;
  time: string;
  likes: number;
  comments: number;
  isLikedByMe: boolean;
  replies?: { author: string; text: string }[];
};

export type Task = {
  title: string;
  done: boolean;
};

export type Event = {
  title: string;
  date: string;
  time: string;
  type: string;
};

export type Badge = {
  name: string;
  icon: string;
};

export type PassportExperience = {
  id: string;
  title: string;
  company: string;
  duration: string;
  desc: string;
};

export type PassportProfile = {
  photoUrl?: string;
  headline: string;
  summary: string;
  location: string;
  phone: string;
  linkedin: string;
  github: string;
  university: string;
  degree: string;
  gradYear: string;
  experience: PassportExperience[];
  customSkills: string[];
  topSkills?: string[];
  verifiedSkillDetails?: Record<
    string,
    {
      verified: boolean;
      score: number;
      verifiedAt: string;
      hash?: string;
    }
  >;
  verificationHash?: string;
  isPublic?: boolean;
  unselectedBadgeIds?: string[];
};

export type UserState = {
  // Core Profile
  name: string;
  username: string;
  email: string;
  streak: number;
  
  // Weekly Activity (Minutes per day: Mon-Sun)
  weeklyActivity: number[];
  
  // Collections
  notifications: Notification[];
  courseProgress: CourseProgress[];
  communityPosts: CommunityPost[];
  todayTasks: Task[];
  upcomingEvents: Event[];
  recentBadges: Badge[];

  // Career & Onboarding Preferences
  careerGoals?: string[];
  experienceLevel?: string;

  // Subscription & Monetization Architecture
  subscriptionTier?: "starter" | "single_course" | "flagship_path" | "pro" | "enterprise";
  subscriptionStatus?: "active" | "inactive" | "trialing";

  // Career Passport CV data
  passportProfile?: PassportProfile;

  // Enrollment
  enrolledPathSlugs: string[];
  lastCheckInDate?: string;
  lastNameChangeDate?: string;
  streakFreezes?: number;
  redeemedVouchers: string[];
  completedChallengeIds: string[];
  completedDeliverableIds?: string[];
  completedMockTests?: string[];
  purchasedItemIds: string[];
  completedChecklistTaskIds?: string[];
};
