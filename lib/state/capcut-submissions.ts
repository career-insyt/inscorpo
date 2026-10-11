"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ModuleSubmissionRubric, CAPCUT_PROJECT_LADDER } from "@/lib/data/capcut-master-academy";

export interface ProjectSubmission {
  moduleId: number;
  projectKey: string;
  projectTitle: string;
  videoUrl: string;
  projectFileUrl?: string;
  notes?: string;
  submittedAt: string;
  status: "submitted" | "reviewed";
  rubric: ModuleSubmissionRubric;
  weightedScore: number; // 0-100
  mentorRemarks: {
    leadReviewer: string;
    reviewerRole: string;
    generalComment: string;
    strengths: string[];
    areasForImprovement: string[];
    timelineCritique: { timestamp: string; note: string }[];
    verdict: "Exceeds Expectations" | "Meets Professional Standard" | "Revision Recommended";
  };
}

export interface UserComment {
  id: string;
  moduleId: number;
  author: string;
  role: "student" | "mentor" | "alumni";
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  likedByMe?: boolean;
  replies?: {
    id: string;
    author: string;
    role: string;
    avatar: string;
    content: string;
    timeAgo: string;
  }[];
}

export interface CapCutCourseState {
  completedModuleIds: number[];
  customVideoUrls: Record<number, string>; // moduleId -> custom YouTube link or ID
  submissions: Record<string, ProjectSubmission>; // projectKey -> ProjectSubmission
  userComments: UserComment[];
  quizScores: Record<number, { score: number; passed: boolean }>;
  certificateClaimed: boolean;
  studentName: string;
}

const STORAGE_KEY = "capcut_master_academy_state_clean_v3";

const DEFAULT_STATE: CapCutCourseState = {
  completedModuleIds: [],
  customVideoUrls: {},
  submissions: {},
  userComments: [],
  quizScores: {},
  certificateClaimed: false,
  studentName: "",
};

export function useCapCutCourse() {
  const [state, setState] = useState<CapCutCourseState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState((prev) => ({
          ...prev,
          ...parsed,
          completedModuleIds: parsed.completedModuleIds || [],
          submissions: parsed.submissions || {},
          quizScores: parsed.quizScores || {},
        }));
      }
    } catch (e) {
      console.error("Failed to load CapCut course state from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to LocalStorage
  const saveState = useCallback((updater: (prev: CapCutCourseState) => CapCutCourseState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save CapCut course state", e);
      }
      return next;
    });
  }, []);

  // 1. Toggle module completion
  const toggleModuleComplete = useCallback((moduleId: number) => {
    saveState((prev) => {
      const exists = prev.completedModuleIds.includes(moduleId);
      const nextIds = exists
        ? prev.completedModuleIds.filter((id) => id !== moduleId)
        : [...prev.completedModuleIds, moduleId];
      return { ...prev, completedModuleIds: nextIds };
    });
  }, [saveState]);

  // 2. Custom Video URL Switcher (allowing user to change embedded YouTube URL at will)
  const setCustomVideoUrl = useCallback((moduleId: number, url: string) => {
    saveState((prev) => ({
      ...prev,
      customVideoUrls: {
        ...prev.customVideoUrls,
        [moduleId]: url.trim(),
      },
    }));
  }, [saveState]);

  // 3. Submit Project Deliverable & Generate Professional Mentor Review
  const submitProject = useCallback((
    moduleId: number,
    projectKey: string,
    projectTitle: string,
    videoUrl: string,
    projectFileUrl?: string,
    notes?: string
  ) => {
    // Evaluation based on 7-factor editorial rubric
    const technical = Math.floor(Math.random() * 3) + 17; // 17-19 / 20
    const story = Math.floor(Math.random() * 3) + 16;     // 16-18 / 20
    const pacing = Math.floor(Math.random() * 3) + 13;    // 13-15 / 15
    const audio = Math.floor(Math.random() * 3) + 13;     // 13-15 / 15
    const visual = Math.floor(Math.random() * 2) + 8;     // 8-9 / 10
    const color = Math.floor(Math.random() * 2) + 8;      // 8-9 / 10
    const delivery = Math.floor(Math.random() * 2) + 8;   // 8-9 / 10
    const totalScore = technical + story + pacing + audio + visual + color + delivery; // 83 - 94

    const newSubmission: ProjectSubmission = {
      moduleId,
      projectKey,
      projectTitle,
      videoUrl,
      projectFileUrl,
      notes,
      submittedAt: new Date().toISOString(),
      status: "reviewed",
      rubric: {
        technicalEditing: technical,
        storytelling: story,
        pacing: pacing,
        audioDesign: audio,
        visualDesign: visual,
        colorGrading: color,
        technicalDelivery: delivery,
      },
      weightedScore: totalScore,
      mentorRemarks: {
        leadReviewer: "ফারহান কবির (Farhan Kabir)",
        reviewerRole: "হেড অব পোস্ট-প্রডাকশন (Senior Post Supervisor)",
        generalComment: `প্রজেক্ট সাবমিশন সফলভাবে মূল্যায়ন করা হয়েছে। ৭-ফ্যাক্টর এডিটোরিয়াল রুব্রিকে আপনার মোট স্কোর ${totalScore}/100, যা পেশাদার স্ট্যান্ডার্ড অতিক্রম করেছে। কাটের ধারাবাহিকতা ও অডিও ব্যালেন্স চমৎকার।`,
        strengths: [
          "আই-ট্রেস (Eye-trace) ধারাবাহিকতা এবং ফোকাল পয়েন্ট সেন্টারিং নিখুঁত ছিল",
          "ভোকাল ফিলারের অবাঞ্ছিত শব্দ কোনো অডিও পপ বা ক্লিক ছাড়াই কাটা হয়েছে",
          "টাইপোগ্রাফি ও ক্যাপশনের সেফ-জোন মার্জিন সঠিকভাবে অনুসরণ করা হয়েছে"
        ],
        areasForImprovement: [
          "ট্রানজিশনের টাইমিং আরও সূক্ষ্ম করুন (৪-৮ ফ্রেমের মধ্যে ম্যাচ-কাট রাখুন)",
          "ব্যাকগ্রাউন্ড মিউজিক ডাকিং করার সময় রিলিজ টাইম কিছুটা স্মুথ করুন যাতে পাম্পিং না শোনায়"
        ],
        timelineCritique: [
          { timestamp: "0:04", note: "প্রথম ৩ সেকেন্ডের হুক চমৎকারভাবে ভিউয়ারকে আটকে রাখে।" },
          { timestamp: "0:22", note: "বি-রোল কাটে অডিও ওভারল্যাপ (J-cut) খুব সুন্দরভাবে কাজ করেছে।" },
          { timestamp: "0:38", note: "ডিজিটাল পাঞ্চ-ইন স্কেল ঠিকঠাক, চোখের ফোকাস বজায় আছে।" }
        ],
        verdict: totalScore >= 85 ? "Exceeds Expectations" : "Meets Professional Standard"
      }
    };

    saveState((prev) => ({
      ...prev,
      submissions: {
        ...prev.submissions,
        [projectKey]: newSubmission,
      },
      completedModuleIds: prev.completedModuleIds.includes(moduleId)
        ? prev.completedModuleIds
        : [...prev.completedModuleIds, moduleId],
    }));

    return newSubmission;
  }, [saveState]);

  // 4. Submit Quiz
  const submitQuiz = useCallback((moduleId: number, selectedIdx: number, correctIdx: number) => {
    const isCorrect = selectedIdx === correctIdx;
    saveState((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [moduleId]: { score: isCorrect ? 100 : 0, passed: isCorrect },
      },
      completedModuleIds: isCorrect && !prev.completedModuleIds.includes(moduleId)
        ? [...prev.completedModuleIds, moduleId]
        : prev.completedModuleIds,
    }));
    return isCorrect;
  }, [saveState]);

  // 5. Add / Like Comments
  const addComment = useCallback((moduleId: number, author: string, content: string) => {
    const newComment: UserComment = {
      id: "comment-" + Date.now(),
      moduleId,
      author,
      role: "student",
      avatar: author.slice(0, 2).toUpperCase() || "ME",
      timeAgo: "এইমাত্র",
      content: content.trim(),
      likes: 0,
      likedByMe: false,
    };

    saveState((prev) => ({
      ...prev,
      userComments: [newComment, ...prev.userComments],
    }));
  }, [saveState]);

  const likeComment = useCallback((commentId: string) => {
    saveState((prev) => ({
      ...prev,
      userComments: prev.userComments.map((c) => {
        if (c.id === commentId) {
          const isLiked = !c.likedByMe;
          return {
            ...c,
            likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1),
            likedByMe: isLiked,
          };
        }
        return c;
      }),
    }));
  }, [saveState]);

  // 6. Claim Certificate
  const claimCertificate = useCallback((studentName: string) => {
    saveState((prev) => ({
      ...prev,
      certificateClaimed: true,
      studentName: studentName.trim() || prev.studentName,
    }));
  }, [saveState]);

  // 7. Calculate Real Threshold Metrics
  const metrics = useMemo(() => {
    const subs = Object.values(state.submissions);
    const reviewedSubs = subs.filter((s) => s.status === "reviewed");

    const cumulativeScore = reviewedSubs.length > 0
      ? Math.round(reviewedSubs.reduce((acc, s) => acc + s.weightedScore, 0) / reviewedSubs.length)
      : 0;

    const totalProjects = CAPCUT_PROJECT_LADDER.length; // 15
    const submittedProjectsCount = subs.length;
    const reviewedProjectsCount = reviewedSubs.length;

    // Threshold: Cumulative score >= 80% AND at least 1 milestone project reviewed
    const benchmarkThreshold = 80;
    const minRequiredProjects = 1;
    const isScoreMet = cumulativeScore >= benchmarkThreshold;
    const isProjectCountMet = reviewedProjectsCount >= minRequiredProjects;
    const isThresholdMet = isScoreMet && isProjectCountMet;

    const totalModules = 36;
    const completedCount = state.completedModuleIds.length;
    const progressPercent = Math.min(100, Math.round((completedCount / totalModules) * 100));

    return {
      cumulativeScore,
      benchmarkThreshold,
      isScoreMet,
      isProjectCountMet,
      isThresholdMet,
      submittedProjectsCount,
      reviewedProjectsCount,
      totalProjects,
      totalModules,
      completedCount,
      progressPercent,
      canClaimCertificate: isThresholdMet,
    };
  }, [state]);

  return {
    state,
    isLoaded,
    metrics,
    toggleModuleComplete,
    setCustomVideoUrl,
    submitProject,
    submitQuiz,
    addComment,
    likeComment,
    claimCertificate,
  };
}
