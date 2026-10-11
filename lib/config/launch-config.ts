/**
 * INSYT Corporate — Launch & Feature Flag Configuration
 * 
 * Configures the platform to focus on the 2 Flagship Learning Paths for launch
 * while preserving all modular underlying routes, tools, and components for future scaling.
 */

export const LAUNCH_CONFIG = {
  /**
   * The 4 Flagship Learning Paths promoted as primary launch products.
   */
  flagshipPathSlugs: [
    "ai-workplace-professional",
    "enterprise-data-analyst",
    "business-automation-specialist",
    "corporate-career-accelerator",
    "video-ai-production",
  ] as const,

  /**
   * Primary launch tracks promoted on onboarding and hero spot.
   */
  primaryLaunchTrackNames: [
    "AI Workplace Professional (AI, Research & Executive Communication)",
    "Enterprise Data Analyst (Excel Modeling, SQL, Power BI & Python)",
    "Business Automation Specialist (Workplace AI, SQL & n8n)",
    "Corporate Career Accelerator (Project Management, Strategy & MTO Mastery)",
    "Video Editing + AI Production Systems",
  ],

  /**
   * When true, catalog spotlights the 2 flagship paths prominently.
   * Secondary paths remain accessible via direct routes `/learn/[pathSlug]`.
   */
  hideSecondaryPathsFromSpotlight: true,

  /**
   * Streamlined 4-category sidebar navigation to reduce choice paralysis.
   */
  simplifiedSidebarNav: true,

  /**
   * Enables adaptive dashboard experience based on enrollment state:
   * Mode 1: Single Course Buyer (Course Player Focus)
   * Mode 2: Learning Path Buyer (Roadmap Focus)
   * Mode 3: Pro Subscriber (Full Command Center)
   */
  enableAdaptiveDashboard: true,

  /**
   * Hybrid monetization settings: Single Course (৳499-৳999), Path Bundle (৳1,999), Pro Sub (৳799/mo).
   */
  hybridMonetization: {
    singleCourseEnabled: true,
    pathwayBundleEnabled: true,
    proSubscriptionEnabled: true,
  },
};
