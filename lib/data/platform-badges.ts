// Planned & Curated Platform Badges System
// Standard: Zero text emojis. Top-notch SVGs, luminous illumination, animated radiance.

export type BadgeTier = "diamond" | "obsidian" | "platinum" | "gold" | "emerald" | "ruby";

export interface PlatformBadgeDefinition {
  id: string;
  name: string;
  tier: BadgeTier;
  category: string;
  iconName: "FileSpreadsheet" | "Cpu" | "ShieldCheck" | "Trophy" | "Zap" | "Flame" | "Sparkles" | "Crown" | "Target" | "Award" | "CheckCircle2" | "Workflow";
  description: string;
  earnedCriteria: string;
  glowColor: string;
  accentBorder: string;
  rarity: string;
  statsLabel: string;
}

export const PLATFORM_BADGES: PlatformBadgeDefinition[] = [
  {
    id: "excel-architect",
    name: "Excel Financial Architect",
    tier: "diamond",
    category: "Spreadsheet Engineering",
    iconName: "FileSpreadsheet",
    description: "Demonstrated zero-error commercial modeling, Dynamic Array Lambda logic, and 3-statement working capital synthesis.",
    earnedCriteria: "Corporate Financial & Commercial Modeling in Excel (100% Completion)",
    glowColor: "rgba(16, 185, 129, 0.45)", // Emerald / Cyan Diamond
    accentBorder: "#10b981",
    rarity: "Top 1% Elite",
    statsLabel: "Audit-Grade Model",
  },
  {
    id: "ai-workflow-vanguard",
    name: "Enterprise AI Vanguard",
    tier: "obsidian",
    category: "AI & Automation",
    iconName: "Cpu",
    description: "Architected fault-tolerant enterprise pipelines with n8n, bounded Document AI, and autonomous agent routing.",
    earnedCriteria: "Applied Workplace AI & Process Automation Capstone Defense",
    glowColor: "rgba(139, 92, 246, 0.45)", // Obsidian Violet
    accentBorder: "#8b5cf6",
    rarity: "Top 2% Pioneer",
    statsLabel: "Autonomous Orchestrator",
  },
  {
    id: "trust-plane-verified",
    name: "Trust Plane Verified Credential",
    tier: "emerald",
    category: "Verifiable Identity",
    iconName: "ShieldCheck",
    description: "Identity, skills portfolio, and assessment artifacts cryptographically signed with W3C VC 2.0 & Ed25519 tamper proofing.",
    earnedCriteria: "Career Passport Profile & Evidence Anchored on Verifiable Plane",
    glowColor: "rgba(6, 182, 212, 0.45)", // Cyan glow
    accentBorder: "#06b6d4",
    rarity: "W3C Standards Compliant",
    statsLabel: "Cryptographically Sealed",
  },
  {
    id: "executive-strategist",
    name: "Executive Case Strategist",
    tier: "gold",
    category: "Management Consulting",
    iconName: "Crown",
    description: "Cracked ambiguous commercial market-entry cases using MECE issue trees, BLUF boardroom memos, and sensitivity analyses.",
    earnedCriteria: "Management Consulting & Strategic Problem Solving Simulation",
    glowColor: "rgba(245, 158, 11, 0.45)", // Royal Amber/Gold
    accentBorder: "#f59e0b",
    rarity: "Top 5% Consultant",
    statsLabel: "Boardroom Ready",
  },
  {
    id: "velocity-champion",
    name: "Operational Velocity Master",
    tier: "ruby",
    category: "Habit & Execution",
    iconName: "Flame",
    description: "Consistent execution across daily missions and simulation sprints without breaking rhythm or missing targets.",
    earnedCriteria: "Maintained active operational streak and completed 20+ Daily Quest challenges",
    glowColor: "rgba(244, 63, 94, 0.45)", // Ruby Flame
    accentBorder: "#f43f5e",
    rarity: "Top 8% Consistent",
    statsLabel: "Streak Multiplier x2.0",
  },
  {
    id: "data-synthesis-expert",
    name: "Audited FP&A Specialist",
    tier: "platinum",
    category: "Financial Analytics",
    iconName: "Trophy",
    description: "Evaluated balance sheet schedules, cash conversion cycles, and NPV/IRR capital allocation frameworks.",
    earnedCriteria: "Commercial FP&A Simulation & Assessment Score > 95%",
    glowColor: "rgba(59, 130, 246, 0.45)", // Platinum Blue
    accentBorder: "#3b82f6",
    rarity: "Top 3% Certified",
    statsLabel: "Level 5 Mastery",
  },
];
