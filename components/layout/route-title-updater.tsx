"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Career Command Center",
  "/events": "Corporate Events & Competitions",
  "/learn": "Learning Paths & Masterclasses",
  "/learn/courses": "Individual Courses",
  "/learn/capcut-master-academy": "CapCut Master Academy",
  "/mock-tests": "Competency Diagnostic Tests",
  "/mock-interviews": "AI Mock Interviews & Voice Simulator",
  "/career-passport": "Career Passport & Trust Plane",
  "/passport": "Career Passport & Proof-of-Work",
  "/jobs": "Corporate Circulars & Job Board",
  "/opportunities": "Curated Opportunities & Jobs",
  "/certificates": "Verified Credentials Archive",
  "/challenges": "Case Challenges & Simulations",
  "/career-hub": "Career Strategy Hub",
  "/workshops": "Live Masterclasses & Workshops",
  "/profile": "Professional Profile",
  "/settings": "Account Settings",
  "/help": "Help & Support Center",
  "/marketplace": "Executive Talent Marketplace",
  "/subscription": "Membership & Passes",
  "/audit": "Platform Segment Auditor",
  "/error-preview": "Error Screen Inspector",
};

export function RouteTitleUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    let pageTitle = ROUTE_TITLES[pathname];

    if (!pageTitle) {
      if (pathname.startsWith("/learn/") && pathname.split("/").length >= 5) {
        pageTitle = "Interactive Lesson Player";
      } else if (pathname.startsWith("/learn/") && pathname.split("/").length === 4) {
        pageTitle = "Course Module Detail";
      } else if (pathname.startsWith("/learn/")) {
        pageTitle = "Learning Track Curriculum";
      } else if (pathname.startsWith("/mock-tests/")) {
        pageTitle = "Competency Assessment Drill";
      } else if (pathname.startsWith("/mock-interviews/")) {
        pageTitle = "Live AI Mock Interview";
      } else if (pathname.startsWith("/challenges/")) {
        pageTitle = "Corporate Case Simulation";
      } else if (pathname.startsWith("/jobs/")) {
        pageTitle = "Government & Corporate Job Circular";
      } else if (pathname.startsWith("/workshops/")) {
        pageTitle = "Workshop Pass & Exam Center";
      } else if (pathname.startsWith("/passport/")) {
        pageTitle = "Public Career Passport Verification";
      } else {
        pageTitle = "Career OS";
      }
    }

    document.title = `${pageTitle} | CAREERINSYT`;
  }, [pathname]);

  return null;
}
