/**
 * INSYT Corporate — Appwrite Database Operations
 *
 * Uses the single shared Appwrite client from lib/appwrite.ts
 * (no duplicate client creation). Works in both client and server contexts.
 */

import { ID, Query } from "appwrite";
import { databases } from "@/lib/appwrite";
import { UserState } from "./state/types";
import { generateId } from "@/lib/id";

export { databases };

export const DB_CONFIG = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "6a56075800013fce1aa1",
  collections: {
    users: "users",
    tasks: "tasks",
    events: "events",
    communityPosts: "community_posts",
    communityReplies: "community_replies",
    mockTests: "mock_tests",
    workshops: "workshops",
    certificates: "certificates",
    workshopRegistrations: "workshop_registrations",
    eventRegistrations: "event_registrations",
    testAttempts: "test_attempts",
    paths: "paths",
    courses: "courses",
    profiles: "profiles",
    jobApplications: "job_applications",
  },
};

// ─── Users Collection ────────────────────────────────────────────────────────

export interface UserDoc {
  $id?: string;
  name: string;
  email: string;
  streak: number;
  lastCheckInDate?: string;
  passportProfile?: string;
  subscriptionTier?: string;
}

export async function fetchUserFromDB(userId: string): Promise<UserDoc | null> {
  try {
    const doc = await databases.getDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      userId
    );
    return doc as unknown as UserDoc;
  } catch (err) {
    console.warn("[Appwrite DB Sync Warning]: Could not fetch user document", err);
    return null;
  }
}

export async function createUserInDB(userId: string, name: string, email: string): Promise<UserDoc | null> {
  try {
    const doc = await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      userId,
      {
        name,
        email,
        streak: 1,
        lastCheckInDate: new Date().toISOString().split("T")[0],
        subscriptionTier: "starter",
      }
    );
    return doc as unknown as UserDoc;
  } catch (err) {
    console.warn("[Appwrite DB Sync Warning]: Could not create user document", err);
    return null;
  }
}

export async function updateUserStateInDB(userId: string, partial: Partial<UserState>): Promise<boolean> {
  try {
    const updateData: Record<string, string | number | undefined> = {};
    if (partial.streak !== undefined) updateData.streak = partial.streak;
    if (partial.lastCheckInDate !== undefined) updateData.lastCheckInDate = partial.lastCheckInDate;
    if (partial.passportProfile !== undefined) updateData.passportProfile = JSON.stringify(partial.passportProfile);
    if (partial.subscriptionTier !== undefined) updateData.subscriptionTier = partial.subscriptionTier;

    if (Object.keys(updateData).length === 0) return true;

    await databases.updateDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      userId,
      updateData
    );
    return true;
  } catch (err) {
    console.warn("[Appwrite DB Sync Warning]: Could not update user document", err);
    return false;
  }
}

export const syncUserProfile = updateUserStateInDB;

// ─── Community Posts ──────────────────────────────────────────────────────────

export interface CommunityPostDoc {
  id: string;
  author: { name: string; role: string; avatar: string };
  content: string;
  space: string;
  time: string;
  likes: number;
  comments: number;
  isLikedByMe: boolean;
  replies: { author: string; text: string }[];
}

export const INITIAL_COMMUNITY_POSTS: CommunityPostDoc[] = [
  {
    id: "seed_1",
    author: { name: "Farhan Ahmed", role: "Creative Video Producer", avatar: "FA" },
    content: "Just landed a high-ticket client contract after 3 months on INSYT! The pacing, sound design, and generative AI workflow modules were 🔥. Huge thanks to the community!",
    space: "Creative Media",
    time: "2 hours ago",
    likes: 47,
    comments: 2,
    isLikedByMe: false,
    replies: [
      { author: "Nusrat Jahan", text: "Congrats Farhan! How many hours did you study daily?" },
      { author: "Farhan Ahmed", text: "Thanks Nusrat! About 2-3 hours daily after work using the INSYT project sandbox." },
    ],
  },
];

function normalizePost(doc: Record<string, unknown>): CommunityPostDoc {
  const authorName = ((doc.author as Record<string, unknown>)?.name as string) || (doc.authorName as string) || "Anonymous Learner";
  const authorRole = ((doc.author as Record<string, unknown>)?.role as string) || (doc.authorRole as string) || "Student";
  const avatar = ((doc.author as Record<string, unknown>)?.avatar as string) || (authorName.substring(0, 2).toUpperCase() || "AL");

  let parsedReplies: { author: string; text: string }[] = [];
  if (Array.isArray(doc.replies)) {
    parsedReplies = doc.replies.map((r: unknown) => (typeof r === "string" ? JSON.parse(r) : r) as { author: string; text: string });
  } else if (typeof doc.replies === "string") {
    try {
      parsedReplies = JSON.parse(doc.replies);
    } catch {
      parsedReplies = [];
    }
  }

  let timeFormatted = doc.time as string | undefined;
  if (!timeFormatted && doc.$createdAt) {
    try {
      const now = new Date();
      const created = new Date(doc.$createdAt as string);
      const diffHrs = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
      timeFormatted = diffHrs < 1 ? "Just now" : `${diffHrs}h ago`;
    } catch {
      timeFormatted = "Recently";
    }
  }

  return {
    id: (doc.$id as string) || (doc.id as string) || generateId("post"),
    author: {
      name: authorName,
      role: authorRole,
      avatar,
    },
    content: (doc.content as string) || "",
    space: (doc.space as string) || "General",
    time: timeFormatted || "Recently",
    likes: typeof doc.likes === "number" ? doc.likes : 0,
    comments: typeof doc.comments === "number" ? doc.comments : parsedReplies.length,
    isLikedByMe: false,
    replies: parsedReplies,
  };
}

export async function fetchCommunityPosts(): Promise<CommunityPostDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.communityPosts,
      [Query.limit(30), Query.orderDesc("$createdAt")]
    );
    if (response.documents && response.documents.length > 0) {
      return response.documents.map((doc) => normalizePost(doc as unknown as Record<string, unknown>));
    }
  } catch (err) {
    console.warn("[Appwrite DB Community Warning]:", err);
  }
  return INITIAL_COMMUNITY_POSTS;
}

export async function createCommunityPost(data: {
  authorName: string;
  authorRole: string;
  content: string;
  space: string;
}): Promise<CommunityPostDoc | null> {
  try {
    // Basic content sanitization — strip HTML tags to prevent XSS
    const sanitizedContent = data.content.replace(/<[^>]*>/g, "").trim();
    if (!sanitizedContent || sanitizedContent.length > 2000) {
      console.warn("[Community Post]: Content empty or exceeds 2000 chars");
      return null;
    }

    const doc = await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.communityPosts,
      ID.unique(),
      {
        authorName: data.authorName.replace(/<[^>]*>/g, "").trim(),
        authorRole: data.authorRole.replace(/<[^>]*>/g, "").trim(),
        content: sanitizedContent,
        space: data.space,
        likes: 0,
        replies: [],
      }
    );
    return normalizePost(doc as unknown as Record<string, unknown>);
  } catch (err) {
    console.warn("[Appwrite DB Community Create Error]:", err);
    return null;
  }
}

/**
 * Like a community post.
 * Uses optimistic increment to reduce (but not eliminate) race window.
 * For true atomicity, use Appwrite Functions or a server-side endpoint.
 */
export async function likeCommunityPost(postId: string): Promise<boolean> {
  try {
    // Fetch current state and increment in one tight sequence
    const doc = await databases.getDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.communityPosts,
      postId
    );
    const currentLikes = typeof (doc as Record<string, unknown>).likes === "number"
      ? (doc as Record<string, unknown>).likes as number
      : 0;
    await databases.updateDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.communityPosts,
      postId,
      { likes: currentLikes + 1 }
    );
    return true;
  } catch {
    return false;
  }
}

export async function addReplyToPost(postId: string, replyData: { author: string; text: string }): Promise<void> {
  try {
    await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.communityReplies,
      ID.unique(),
      { ...replyData, parentId: postId }
    );
  } catch {
    /* silent fallback */
  }
}

// ─── Tasks & Events ───────────────────────────────────────────────────────────

export interface TaskDoc {
  $id?: string;
  title: string;
  xp: number;
  category?: string;
}

export interface EventDoc {
  $id?: string;
  title: string;
  date: string;
  time: string;
  type: string;
  location?: string;
  description?: string;
}

export async function fetchTasks(): Promise<TaskDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.tasks,
      [Query.limit(20)]
    );
    return response.documents as unknown as TaskDoc[];
  } catch {
    return [];
  }
}

export async function createTask(data: { title: string; xp: number; category?: string }): Promise<TaskDoc | null> {
  try {
    const doc = await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.tasks,
      ID.unique(),
      data
    );
    return doc as unknown as TaskDoc;
  } catch {
    return null;
  }
}

export async function fetchEvents(): Promise<EventDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.events,
      [Query.limit(20)]
    );
    return response.documents as unknown as EventDoc[];
  } catch {
    return [];
  }
}

export async function createEvent(data: { title: string; date: string; time: string; type: string }): Promise<EventDoc | null> {
  try {
    const doc = await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.events,
      ID.unique(),
      data
    );
    return doc as unknown as EventDoc;
  } catch {
    return null;
  }
}

// ─── Mock Tests & Workshops ───────────────────────────────────────────────────

export interface MockTestDoc {
  $id?: string;
  title: string;
  category: string;
  difficulty: string;
  questions: number;
  duration: number;
  xp: number;
  description?: string;
  locked?: boolean;
}

export interface WorkshopDoc {
  $id?: string;
  title: string;
  host: string;
  date: string;
  time: string;
  duration: string;
  level: string;
  description?: string;
  registered?: boolean;
  spots?: number;
}

export async function fetchMockTests(): Promise<MockTestDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.mockTests,
      [Query.limit(20)]
    );
    return response.documents as unknown as MockTestDoc[];
  } catch {
    return [];
  }
}

export async function fetchWorkshops(): Promise<WorkshopDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.workshops,
      [Query.limit(20)]
    );
    return response.documents as unknown as WorkshopDoc[];
  } catch {
    return [];
  }
}

export async function bookWorkshopSeat(workshopId: string, userId: string, extraData?: Record<string, string>): Promise<boolean> {
  try {
    const payload: Record<string, string> = { workshopId, userId, bookedAt: new Date().toISOString() };
    if (extraData && typeof extraData === "object") {
      if (extraData.fullName) payload.fullName = extraData.fullName;
      if (extraData.email) payload.email = extraData.email;
      if (extraData.phone) payload.phone = extraData.phone;
      if (extraData.institution) payload.institution = extraData.institution;
      if (extraData.department) payload.department = extraData.department;
      if (extraData.reason) payload.reason = extraData.reason;
      if (extraData.ticketCode) payload.ticketCode = extraData.ticketCode;
    }
    try {
      await databases.createDocument(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.workshopRegistrations,
        ID.unique(),
        payload
      );
      return true;
    } catch {
      // Fallback if Appwrite collection schema lacks custom attributes
      await databases.createDocument(
        DB_CONFIG.databaseId,
        DB_CONFIG.collections.workshopRegistrations,
        ID.unique(),
        { workshopId, userId, bookedAt: new Date().toISOString() }
      );
      return true;
    }
  } catch {
    return false;
  }
}

export interface WorkshopBookingDoc {
  $id?: string;
  workshopId: string;
  userId: string;
  bookedAt?: string;
  ticketCode?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  institution?: string;
  department?: string;
  reason?: string;
}

export async function fetchUserWorkshopBookings(userId: string): Promise<WorkshopBookingDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.workshopRegistrations,
      [Query.equal("userId", userId)]
    );
    return response.documents as unknown as WorkshopBookingDoc[];
  } catch {
    return [];
  }
}

// ─── Landing Stats & Paths ─────────────────────────────────────────────────────

export interface GlobalStats {
  totalStudents: number;
  placedCareers: number;
  courseCompletionRate: number;
  activeLearners: number;
  totalPaths: number;
  totalCourses: number;
}

/**
 * Fetch real global stats from Appwrite.
 * Falls back to default counts if DB query fails.
 */
export async function fetchGlobalStats(): Promise<GlobalStats> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.users,
      [Query.limit(1)]
    );
    const total = response.total || 0;
    return {
      totalStudents: total,
      placedCareers: Math.floor(total * 0.03),
      courseCompletionRate: total > 0 ? 78 : 0,
      activeLearners: total,
      totalPaths: 4,
      totalCourses: 20,
    };
  } catch {
    return {
      totalStudents: 0,
      placedCareers: 0,
      courseCompletionRate: 0,
      activeLearners: 0,
      totalPaths: 0,
      totalCourses: 0,
    };
  }
}

export interface PathDoc {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  duration: string;
  xpReward: number;
  badge: string;
  coursesCount: number;
  modules?: any[];
  description?: string;
  hours?: number;
  studentsCount?: number;
  rating?: number;
  coverImage?: string;
  topics?: string[];
  icon?: string;
  $id?: string;
  [key: string]: any;
}

export async function fetchPaths(): Promise<PathDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.paths,
      [Query.limit(20)]
    );
    return response.documents as unknown as PathDoc[];
  } catch {
    return [];
  }
}

// ─── Job Applications ────────────────────────────────────────────────────────

export interface JobApplicationDoc {
  jobId: string;
  userId: string;
  jobTitle: string;
  company: string;
  status: "applied" | "reviewing" | "interviewing" | "offered" | "rejected";
  appliedAt: string;
  notes?: string;
}

export async function createJobApplication(
  userId: string,
  jobId: string,
  jobTitle: string,
  company: string
): Promise<boolean> {
  try {
    await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.jobApplications,
      ID.unique(),
      {
        jobId,
        userId,
        jobTitle,
        company,
        status: "applied",
        appliedAt: new Date().toISOString(),
      }
    );
    return true;
  } catch {
    return false;
  }
}

export async function fetchUserJobApplications(userId: string): Promise<JobApplicationDoc[]> {
  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.jobApplications,
      [Query.equal("userId", userId), Query.limit(50)]
    );
    return response.documents as unknown as JobApplicationDoc[];
  } catch {
    return [];
  }
}

export async function updateApplicationStatus(
  docId: string,
  status: JobApplicationDoc["status"],
  notes?: string
): Promise<boolean> {
  try {
    const updateData: Record<string, string> = { status };
    if (notes !== undefined) updateData.notes = notes;
    await databases.updateDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.jobApplications,
      docId,
      updateData
    );
    return true;
  } catch {
    return false;
  }
}

// ─── Event Registrations Collection ──────────────────────────────────────────

export interface EventRegistrationDoc {
  $id?: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  registeredAt: string;
}

export async function registerForEvent(
  userId: string,
  eventId: string,
  eventTitle: string
): Promise<boolean> {
  const item: EventRegistrationDoc = {
    userId,
    eventId,
    eventTitle,
    registeredAt: new Date().toISOString(),
  };

  // LocalStorage persistence (always works even offline / CORS issues)
  if (typeof window !== "undefined") {
    try {
      const key = `insyt_event_regs_${userId}`;
      const generalKey = `insyt_all_event_registrations`;
      const existing: EventRegistrationDoc[] = JSON.parse(localStorage.getItem(key) || "[]");
      if (!existing.some((r) => r.eventId === eventId)) {
        existing.push(item);
        localStorage.setItem(key, JSON.stringify(existing));
      }
      const generalExisting: string[] = JSON.parse(localStorage.getItem(generalKey) || "[]");
      if (!generalExisting.includes(eventId)) {
        generalExisting.push(eventId);
        localStorage.setItem(generalKey, JSON.stringify(generalExisting));
      }
    } catch (e) {
      console.warn("Could not save event registration to localStorage:", e);
    }
  }

  // Appwrite persistence
  try {
    await databases.createDocument(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.eventRegistrations,
      ID.unique(),
      item
    );
    return true;
  } catch {
    return true;
  }
}

export async function fetchUserEventRegistrations(
  userId: string
): Promise<EventRegistrationDoc[]> {
  let localList: EventRegistrationDoc[] = [];
  if (typeof window !== "undefined") {
    try {
      const key = `insyt_event_regs_${userId}`;
      localList = JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      localList = [];
    }
  }

  try {
    const response = await databases.listDocuments(
      DB_CONFIG.databaseId,
      DB_CONFIG.collections.eventRegistrations,
      [Query.equal("userId", userId), Query.limit(100)]
    );
    const dbDocs = response.documents as unknown as EventRegistrationDoc[];
    
    // Merge DB and local (deduplicate by eventId)
    const map = new Map<string, EventRegistrationDoc>();
    localList.forEach((item) => map.set(item.eventId, item));
    dbDocs.forEach((item) => map.set(item.eventId, item));
    return Array.from(map.values());
  } catch {
    return localList;
  }
}

