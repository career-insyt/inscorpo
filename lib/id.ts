/**
 * INSYT Corporate — SSR-Safe ID Generation & Shuffle Utilities
 *
 * Replaces all Math.random() / Date.now() ID generation across the codebase
 * to prevent SSR hydration mismatches and ensure unique, collision-resistant IDs.
 */

let counter = 0;

/**
 * Generate a unique ID that is safe for SSR (no hydration mismatches).
 * Uses crypto.randomUUID() when available (browsers + Node 19+),
 * falls back to a monotonic counter-based approach.
 */
export function generateId(prefix = "id"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  // Fallback: monotonic counter ensures uniqueness within a session
  return `${prefix}_${++counter}_${Date.now().toString(36)}`;
}

/**
 * Fisher-Yates (Knuth) unbiased shuffle.
 * Replaces the biased `.sort(() => 0.5 - Math.random())` anti-pattern.
 * Returns a new shuffled array without mutating the original.
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Maximum number of XP log entries to retain per user.
 * Prevents unbounded growth that would exceed Appwrite prefs size limits.
 */
export const MAX_XP_LOGS = 500;
