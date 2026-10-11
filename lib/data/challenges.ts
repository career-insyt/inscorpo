export interface DiagnosticQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface ChallengeDatasetRow {
  [key: string]: string | number;
}

export interface Challenge {
  id: string;
  title: string;
  hostEntity: string;
  category: "Data Science" | "Corporate Analytics" | "AI Engineering" | "Business Case" | "Automation" | "SQL & BI" | "Software Development" | "Strategy & Planning";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "Active" | "Finished";
  duration: string;
  prize: string;
  participants: number;
  description: string;
  tags: string[];
  teamSize: string;
  fee: string;
  location: string;
  ppoOffered?: boolean;
  daysLeft?: string;
  registeredCount: number;
  datasetHeaders?: string[];
  datasetRows?: ChallengeDatasetRow[];
  diagnosticQuestions?: DiagnosticQuestion[];
  casePrompt?: string;
  benchmarkSolution?: string;
  hints?: string[];
}

export const challengesData: Challenge[] = [];
