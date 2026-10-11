export interface WorkshopQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface WorkshopDetail {
  id: string;
  title: string;
  tagline: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "live" | "concluded";
  spotsRemaining: number;
  totalCapacity: number;
  xpReward: number;
  examXpReward: number;
  hostOrg: string;
  registrationUrl?: string;
  instructor: {
    name: string;
    role: string;
    company: string;
    avatar: string;
    bio: string;
  };
  venue: string;
  description: string;
  agenda: { time: string; topic: string; details: string }[];
  learningOutcomes: string[];
  credentialName: string;
  examQuestions: WorkshopQuestion[];
}

// Pure database-backed: no hardcoded workshops. Any new workshops will be loaded dynamically from the database.
export const WORKSHOPS_DATA: WorkshopDetail[] = [];

export function normalizeWorkshopId(id: string): string {
  return id || "";
}

export function getWorkshopById(id: string): WorkshopDetail | undefined {
  return WORKSHOPS_DATA.find((w) => w.id === id);
}
