"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { account, OAuthProvider } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("insyt_remembered_email") || "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("insyt_remembered_email"));
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get("error");
      if (errorParam) {
        try {
          const parsed = JSON.parse(errorParam);
          if (parsed.type === "user_oauth2_provider_failure" || parsed.code === 424) {
            return "Google OAuth configuration mismatch. Please sign in with Email and Password below.";
          }
          const rawMsg = parsed.message || errorParam;
          return typeof rawMsg === "string" ? rawMsg.slice(0, 200) : "Authentication error occurred.";
        } catch {
          return errorParam.slice(0, 200);
        }
      }
    }
    return "";
  });

  const [targetUrl, setTargetUrl] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get("from");
      if (fromParam && fromParam.startsWith("/")) return fromParam;
    }
    return "/dashboard";
  });

  useEffect(() => {
    // Check if user has an active session
    const checkActiveSession = async () => {
      try {
        const user = await account.get();
        if (user) {
          router.push(targetUrl);
          return;
        }
      } catch {
        if (typeof window !== "undefined") {
          const localUser = localStorage.getItem("insyt_local_user");
          const cookies = document.cookie;
          if (localUser && cookies.includes("insyt_fallback_session=true")) {
            router.push(targetUrl);
          }
        }
      }
    };
    checkActiveSession();
  }, [targetUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (typeof window !== "undefined") {
      if (rememberMe) {
        localStorage.setItem("insyt_remembered_email", email);
      } else {
        localStorage.removeItem("insyt_remembered_email");
      }
    }

    const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
    const secureAttr = isHttps ? "; Secure" : "";

    const finishLogin = (userObj: any) => {
      document.cookie = `insyt_fallback_session=true; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
      if (userObj.email) {
        const isAdmin = ["career@insyt.bd", "insyt.bd@gmail.com"].includes(userObj.email.toLowerCase());
        if (isAdmin) {
          document.cookie = `insyt_admin_email=${encodeURIComponent(userObj.email)}; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
        }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("insyt_local_user", JSON.stringify(userObj));
      }
      window.location.href = targetUrl;
    };

    // 1. Try Appwrite Authentication
    try {
      try {
        await account.deleteSession("current");
      } catch {
        // Ignored
      }

      await account.createEmailPasswordSession(email, password);
      let sessionUser: any = null;
      try {
        sessionUser = await account.get();
      } catch {
        sessionUser = {
          $id: "user-" + Math.random().toString(36).substring(2, 9),
          name: email.split("@")[0],
          email: email,
        };
      }
      finishLogin(sessionUser);
      return;
    } catch (err: any) {
      if (err?.message?.includes("prohibited when a session is active") || err?.code === 409) {
        try {
          await account.deleteSession("current");
          await account.createEmailPasswordSession(email, password);
          const u = await account.get();
          finishLogin(u);
          return;
        } catch {}
      }

      // Handle invalid credentials or network errors strictly via server session
      if (err?.code === 401 || err?.message?.toLowerCase()?.includes("invalid credentials")) {
        setError("Invalid email or password. Please verify your credentials or register.");
        setIsLoading(false);
        return;
      }


      setError(
        err?.message ||
          "Unable to connect to authentication server. Please check your credentials and try again."
      );
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: OAuthProvider) => {
    try {
      try {
        await account.deleteSession("current");
      } catch {}
      const origin = window.location.origin.replace(/\/+$/, "");
      const cleanTarget = targetUrl.startsWith("/") ? targetUrl : `/${targetUrl}`;
      const successUrl = `${origin}${cleanTarget}`;
      const failureUrl = `${origin}/login`;

      account.createOAuth2Session(provider, successUrl, failureUrl);
    } catch (err: any) {
      console.error(err);
      setError(
        "Google OAuth redirect error. Ensure Appwrite callback is registered in Google Cloud Console."
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#F8FAFC]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl rounded-3xl border-2 border-blue-600 bg-white overflow-hidden shadow-[6px_6px_0px_0px_#1e3a8a] grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Left Column — Enterprise Executive Showcase (White / Blue Aesthetic) */}
        <div className="lg:col-span-5 p-8 lg:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-200 bg-gradient-to-b from-blue-50/60 via-white to-blue-50/30 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <Link href="/" className="inline-block" title="CAREERINSYT">
              <img
                src="/logo/logoTextDark.png"
                alt="CAREERINSYT"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-[11px] font-mono font-bold uppercase tracking-wider">
              <Sparkles size={12} className="text-amber-500 fill-amber-500" />
              Corporate Talent Operating System
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Welcome back to your Career Command Center.
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-2.5 leading-relaxed">
                Log in to accelerate your corporate learning roadmap, sync with recruitment rubrics, and access verified credentials.
              </p>
            </div>

            {/* Live Ecosystem Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl border-2 border-blue-200 bg-white shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-blue-700">
                  <Users size={16} />
                  <span className="text-[11px] font-mono font-bold uppercase">Aspirants</span>
                </div>
                <div className="text-lg font-black text-slate-900">12,500+</div>
                <div className="text-[10px] font-medium text-slate-700">Trained for MTO Intakes</div>
              </div>

              <div className="p-3.5 rounded-2xl border-2 border-blue-200 bg-white shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-blue-700">
                  <ShieldCheck size={16} />
                  <span className="text-[11px] font-mono font-bold uppercase">Placement</span>
                </div>
                <div className="text-lg font-black text-slate-900">94.2%</div>
                <div className="text-[10px] font-medium text-slate-700">Assessment Pass Rate</div>
              </div>
            </div>

            {/* Recruiter Network Preview */}
            <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase text-slate-900">
                <span>Calibrated Recruiter Rubrics</span>
                <span className="text-blue-700">MNC & Banking</span>
              </div>
              <p className="text-[11px] font-medium text-slate-700 leading-snug">
                Unilever • BAT Bangladesh • Standard Chartered • Grameenphone • BRAC Bank • bKash • Marico
              </p>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between text-[11px] font-mono font-medium text-slate-600">
            <span>© {new Date().getFullYear()} INSYT CORPORATE</span>
            <span className="text-blue-700 font-bold">career.insyt.bd</span>
          </div>
        </div>

        {/* Right Column — High Contrast Sign-In Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Candidate Sign In
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                PRO SEED
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1">
              New to CareerINSYT?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-800 font-black hover:underline"
              >
                Create a Candidate Profile →
              </Link>
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl border-2 border-red-300 bg-red-50 text-red-900 text-xs font-bold space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Authentication Notice</span>
              </div>
              <p className="font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Social Sign-in Button */}
          <div>
            <button
              type="button"
              onClick={() => handleOAuth(OAuthProvider.Google)}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-900 bg-white border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50/40 transition-all shadow-sm active:translate-y-[1px]"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google Account</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-0.5 bg-slate-200" />
            <span className="text-[11px] font-mono font-bold uppercase text-slate-600">
              or credentials
            </span>
            <div className="flex-1 h-0.5 bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                Official Email Address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="email"
                  inputMode="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@university.edu or corporate email"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900">
                  Password
                </label>
                <Link
                  href="/help"
                  className="text-[11px] font-mono font-bold text-blue-700 hover:underline"
                >
                  Need Help?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your confidential password"
                  className="w-full pl-10 pr-12 py-3 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm focus:ring-2 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800">
                  Keep me signed in on this workstation
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all border-2 border-blue-700 shadow-[4px_4px_0px_0px_#1e3a8a] flex items-center justify-center gap-2 disabled:opacity-70 active:translate-x-[2px] active:translate-y-[2px]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-amber-300" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Candidate Cockpit</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center gap-2.5 text-[11px] font-mono text-slate-700">
            <CheckCircle2 size={15} className="text-blue-700 flex-shrink-0" />
            <span>End-to-end encrypted session with Appwrite Corporate Auth &amp; Role-Based Access.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
