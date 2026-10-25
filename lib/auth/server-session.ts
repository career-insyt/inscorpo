import { Client, Account, Models } from "node-appwrite";
import { cookies } from "next/headers";

/**
 * Validates the caller's Appwrite session cookie against Appwrite Cloud.
 * Returns the verified Appwrite user object if authenticated, or null if unauthenticated.
 * Prevents BOLA / identity spoofing in Route Handlers.
 */
export async function getServerSessionUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const cookieStore = await cookies();
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";

    if (!projectId) return null;

    const allCookies = cookieStore.getAll();
    const sessionCookie = allCookies.find((c) => c.name.startsWith("a_session_"));
    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setSession(sessionCookie.value);

    const account = new Account(client);
    const user = await account.get();
    return user;
  } catch {
    return null;
  }
}
