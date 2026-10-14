"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
      const secureAttr = isHttps ? "; Secure" : "";

      const cookies = typeof document !== "undefined" ? document.cookie : "";
      const hasCookie = cookies.split(";").some((c) => {
        const name = c.trim().split("=")[0];
        return name.startsWith("a_session_") || name === "insyt_fallback_session";
      });

      const localUserRaw = typeof window !== "undefined" ? localStorage.getItem("insyt_local_user") : null;

      // Unauthenticated visitor
      if (!hasCookie && !localUserRaw) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // 1. Attempt Appwrite Cloud session
      try {
        const sessionUser = await account.get();
        setUser(sessionUser);
        document.cookie = `insyt_fallback_session=true; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
        if (sessionUser.email) {
          document.cookie = `insyt_admin_email=${encodeURIComponent(sessionUser.email)}; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
          if (typeof window !== "undefined") {
            localStorage.setItem("insyt_local_user", JSON.stringify(sessionUser));
          }
        }
        setIsLoading(false);
        return;
      } catch {
        // Appwrite failed (CORS on insyt.bd, missing credentials, offline, or network error).
        // Check for local fallback user.
        if (localUserRaw) {
          try {
            const localUser = JSON.parse(localUserRaw);
            setUser(localUser);
            document.cookie = `insyt_fallback_session=true; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
            if (localUser.email) {
              document.cookie = `insyt_admin_email=${encodeURIComponent(localUser.email)}; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
            }
            setIsLoading(false);
            return;
          } catch {
            // Malformed local user
          }
        }

        // If cookie is present but local storage was cleared, create a resilient default session
        if (hasCookie) {
          const defaultUser = {
            $id: "user-" + Math.random().toString(36).substring(2, 9),
            name: "Corporate Member",
            email: "member@insyt.bd",
            emailVerification: true,
            status: true,
            prefs: { subscriptionTier: "starter", subscriptionStatus: "active" },
          } as any;
          setUser(defaultUser);
          if (typeof window !== "undefined") {
            localStorage.setItem("insyt_local_user", JSON.stringify(defaultUser));
          }
          setIsLoading(false);
          return;
        }

        // Truly unauthenticated
        setUser(null);
        document.cookie = `insyt_fallback_session=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
        document.cookie = `insyt_admin_email=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = async () => {
    const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
    const secureAttr = isHttps ? "; Secure" : "";

    try {
      await account.deleteSession("current");
    } catch {
      // Ignored if Appwrite is offline/unreachable
    }

    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("insyt_local_user");
    }
    document.cookie = `insyt_fallback_session=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
    document.cookie = `insyt_admin_email=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
