/**
 * INSYT Corporate — Appwrite Configuration
 *
 * All values MUST come from environment variables.
 * No hardcoded fallbacks to prevent accidental production connections.
 */

if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
  console.warn("[INSYT Config] NEXT_PUBLIC_APPWRITE_ENDPOINT is not set — Appwrite calls will fail.");
}
if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT) {
  console.warn("[INSYT Config] NEXT_PUBLIC_APPWRITE_PROJECT is not set — Appwrite calls will fail.");
}

export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "6a55c66500032e142d85",
};
