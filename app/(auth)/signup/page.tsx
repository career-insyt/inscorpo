"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Building2,
  Phone,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Loader2,
  Award,
  Check,
} from "lucide-react";
import { account, OAuthProvider } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    standing: "fresh_grad",
    password: "",
    confirmPassword: "",
    honorCode: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get("error");
      if (errorParam) {
        try {
          const parsed = JSON.parse(errorParam);
          setError(parsed.message || "Authentication error occurred.");
        } catch {
          setError(errorParam);
        }
      }
    }
  }, []);

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOAuth = (provider: OAuthProvider) => {
    try {
      const origin = window.location.origin.replace(/\/+$/, "");
      const successUrl = `${origin}/onboarding`;
      const failureUrl = `${origin}/signup`;

      account.createOAuth2Session(provider, successUrl, failureUrl);
    } catch (err: any) {
      console.error(err);
      setError("OAuth sign-in is not ready on this hostname. Please register with Email and Password below.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setError("Please provide your full legal name for verified credentials.");
      return;
    }
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid official email address.");
      return;
    }
    if (!formData.phone || formData.phone.trim().length < 8) {
      setError("Please provide an active mobile/WhatsApp contact number for assessment notifications.");
      return;
    }
    if (!formData.university.trim()) {
      setError("Please specify your current university, business school, or organization.");
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (!formData.honorCode) {
      setError("Please accept the Professional Honor Code to register.");
      return;
    }

    setIsLoading(true);
    const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
    const secureAttr = isHttps ? "; Secure" : "";

    const completeLocalSignup = (userId: string) => {
      const localUser = {
        $id: userId,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        emailVerification: true,
        status: true,
        prefs: {
          university: formData.university,
          major: formData.major,
          experienceLevel: formData.standing,
          subscriptionTier: "starter",
          subscriptionStatus: "active",
        },
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("insyt_local_user", JSON.stringify(localUser));
        try {
          // Pre-seed Career Passport profile with registered candidate info
          const passport = {
            fullName: formData.fullName,
            headline: `${formData.major ? formData.major + " · " : ""}${formData.university}`,
            university: formData.university,
            phone: formData.phone,
            location: "Dhaka, Bangladesh",
            standing: formData.standing,
          };
          localStorage.setItem("insyt_passport_profile", JSON.stringify(passport));

          const registeredUsers: any[] = JSON.parse(
            localStorage.getItem("insyt_registered_users") || "[]"
          );
          const filtered = registeredUsers.filter(
            (u) => u.email?.toLowerCase() !== formData.email.toLowerCase()
          );
          filtered.push({
            id: userId,
            email: formData.email,
            // SECURITY REMEDIATION: Passwords must never be stored in browser storage
            fullName: formData.fullName,
            phone: formData.phone,
            university: formData.university,
            major: formData.major,
            standing: formData.standing,
            prefs: localUser.prefs,
          });
          localStorage.setItem("insyt_registered_users", JSON.stringify(filtered));
        } catch {}
      }

      document.cookie = `insyt_fallback_session=true; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
      const isAdmin = ["career@insyt.bd", "insyt.bd@gmail.com"].includes(
        formData.email.toLowerCase()
      );
      if (isAdmin) {
        document.cookie = `insyt_admin_email=${encodeURIComponent(formData.email)}; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
      }

      // Directly route to the single, unified Flagship Track Onboarding
      window.location.href = "/onboarding";
    };

    try {
      const userId = ID.unique();
      await account.create(userId, formData.email, formData.password, formData.fullName);
      await account.createEmailPasswordSession(formData.email, formData.password);

      try {
        await account.updatePrefs({
          university: formData.university,
          major: formData.major,
          experienceLevel: formData.standing,
          phone: formData.phone,
          subscriptionTier: "starter",
          subscriptionStatus: "active",
        });
      } catch {}

      completeLocalSignup(userId);
    } catch (err: any) {
      if (err?.code === 409 || err?.message?.toLowerCase()?.includes("already exists")) {
        setError("An account with this email already exists. Please sign in instead.");
        setIsLoading(false);
        return;
      }

      // Fallback local registration
      const localId = "user-" + Math.random().toString(36).substring(2, 10);
      completeLocalSignup(localId);
    }
  };

  const getStandingLabel = (id: string) => {
    switch (id) {
      case "undergrad":
        return "University Undergraduate (Final Year / Pre-Placement)";
      case "fresh_grad":
        return "Fresh Graduate & MTO Applicant (0-1 Yr Post Grad)";
      case "working_prof":
        return "Corporate Analyst / Professional (1-3 Yrs)";
      default:
        return "MTO Candidate";
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#F8FAFC]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl rounded-3xl border-2 border-blue-600 bg-white overflow-hidden shadow-[6px_6px_0px_0px_#1e3a8a] grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Left Column — Live Career Passport Preview & Enterprise Proof (White / Blue Aesthetic) */}
        <div className="lg:col-span-5 p-8 lg:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-200 bg-gradient-to-b from-blue-50/70 via-white to-blue-50/40 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <Link href="/" className="inline-block" title="CAREERINSYT">
              <img
                src="/logo/logoTextDark.png"
                alt="CAREERINSYT"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                <Sparkles size={12} className="text-amber-500 fill-amber-500" />
                Live Candidate Passport Generation
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Establish Your Verified Corporate Identity.
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-2 leading-relaxed">
                Your registration automatically constructs your Career Passport CV, calibrated for top corporate recruiters and MTO assessment panels.
              </p>
            </div>

            {/* Dynamic Live Career Passport Preview Card */}
            <div className="rounded-2xl border-2 border-blue-500 bg-white p-5 shadow-[4px_4px_0px_0px_#2563eb] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-black uppercase text-blue-800 tracking-wider">
                    CAREER PASSPORT · PRE-INITIALIZED
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  +100 XP REWARD
                </span>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-lg border-2 border-blue-700 shadow-sm flex-shrink-0">
                  {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "C"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-black text-slate-900 truncate">
                      {formData.fullName || "Your Full Name"}
                    </span>
                    <CheckCircle2 size={15} className="text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-[11px] font-bold text-blue-700 truncate mt-0.5">
                    {formData.major
                      ? `${formData.major} · ${formData.university || "University"}`
                      : formData.university || "Institution / Business School"}
                  </p>
                  <p className="text-[10px] font-mono text-slate-700 mt-1">
                    Standing: {getStandingLabel(formData.standing)}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-700">
                  <span>Verified Credentials:</span>
                  <span className="font-bold text-blue-800">4 Track Competencies</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Contact Notification:</span>
                  <span className="font-bold text-slate-900">
                    {formData.phone || "WhatsApp Verification"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Recruiter Calibration:</span>
                  <span className="font-bold text-emerald-700">Ready for Track Selection</span>
                </div>
              </div>
            </div>

            {/* Recruiter Trust Seal */}
            <div className="p-3.5 rounded-2xl border-2 border-slate-200 bg-white space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-slate-900">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>Audited Corporate Competencies</span>
              </div>
              <p className="text-[11px] font-medium text-slate-700 leading-snug">
                Used by candidates competing for Unilever Sparks, BAT Battle of Minds, Standard Chartered Trainee, and national corporate case cups.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between text-[11px] font-mono font-medium text-slate-600">
            <span>© {new Date().getFullYear()} INSYT CORPORATE</span>
            <span className="text-blue-700 font-bold">career.insyt.bd</span>
          </div>
        </div>

        {/* Right Column — Candidate Extended Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Candidate Registration
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                STEP 1 OF 2
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1">
              Already registered?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-black hover:underline"
              >
                Sign in to your Cockpit →
              </Link>
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl border-2 border-red-300 bg-red-50 text-red-900 text-xs font-bold space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Registration Alert</span>
              </div>
              <p className="font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Social Sign-in Option */}
          <div>
            <button
              type="button"
              onClick={() => handleOAuth(OAuthProvider.Google)}
              className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-900 bg-white border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50/40 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
              <span>Instant Setup with Google</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-0.5 bg-slate-200" />
            <span className="text-[11px] font-mono font-bold uppercase text-slate-600">
              or complete candidate profile
            </span>
            <div className="flex-1 h-0.5 bg-slate-200" />
          </div>

          {/* Extended Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+880 1700 000000"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                Official Email Address *
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  inputMode="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="candidate@university.edu or your primary email"
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            {/* Institution / University & Major Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  University / Organization *
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => updateField("university", e.target.value)}
                    placeholder="e.g. IBA-DU, NSU, BUET, BUP"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  Major / Specialization
                </label>
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => updateField("major", e.target.value)}
                    placeholder="e.g. Finance, CSE, Analytics, Marketing"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Candidate Standing Selector */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                Current Candidate Standing *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "undergrad", label: "Undergraduate", desc: "Final Year / Pre-Grad" },
                  { id: "fresh_grad", label: "Fresh Graduate", desc: "MTO Intakes 2026" },
                  { id: "working_prof", label: "Professional", desc: "1-3 Years Experience" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateField("standing", item.id)}
                    className={`p-2.5 rounded-xl text-left border-2 transition-all ${
                      formData.standing === item.id
                        ? "border-blue-600 bg-blue-50/90 ring-1 ring-blue-500"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="text-xs font-extrabold text-slate-900">{item.label}</div>
                    <div className="text-[10px] font-mono text-slate-600 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Password & Confirm Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  Password (min 8 chars) *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Create secure password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 p-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border-2 border-slate-300 focus:border-blue-600 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Honor Code Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.honorCode}
                  onChange={(e) => updateField("honorCode", e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-2 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800 leading-snug">
                  I agree to the CareerINSYT Corporate Honor Code and certify that my educational details are authentic for verified assessment records.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all border-2 border-blue-700 shadow-[4px_4px_0px_0px_#1e3a8a] flex items-center justify-center gap-2 disabled:opacity-70 active:translate-x-[2px] active:translate-y-[2px]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-amber-300" />
                  <span>Creating Candidate Account...</span>
                </>
              ) : (
                <>
                  <span>Register &amp; Proceed to Track Selection</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center gap-2.5 text-[11px] font-mono text-slate-700">
            <CheckCircle2 size={15} className="text-blue-700 flex-shrink-0" />
            <span>Next: Tailor your Flagship Track (CCFCM, CEBI, CEAS) in the Candidate Calibration Wizard.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
