// src/app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // EMAIL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Better Auth ইমেইল সাইন-ইন
      const { data, error: authError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        dontRedirect: true, // কাস্টম টোস্ট এবং রিডাইরেক্ট হ্যান্ডেল করার জন্য এটি বাধ্যতামূলক
      });

      if (authError) {
        const errorMsg = authError.message || "Invalid email or password";
        setError(errorMsg);
        toast.error(errorMsg);
        return;
      }

      toast.success("Login successful!");
      
      // Next.js অপ্টিমাইজড রিডাইরেক্ট
      router.push("/");
      router.refresh(); 
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // গুগল লগইন শেষে এই রুটে ব্যাক করবে
      });
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-4 py-10 ${inter.className}`}>
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-xl grid lg:grid-cols-2 relative z-10">
        
        {/* LEFT SIDE (Branding Panel - Teal Background) */}
        <div className="hidden lg:flex relative overflow-hidden bg-teal-800 p-14 flex-col justify-between text-white">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/30 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-400/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <span className="text-teal-300 text-sm tracking-[0.3em] uppercase font-medium">
              Tutor Booking Platform
            </span>
            <h1 className={`mt-6 text-5xl leading-tight text-white ${playfair.className}`}>
              Find Your<br />Perfect Tutor.
            </h1>
            <p className="mt-6 text-teal-100/80 text-sm leading-relaxed max-w-sm">
              Login to book expert tutors, manage your sessions, and continue your learning journey easily.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              "Book tutors instantly",
              "Google login support",
              "Manage booked sessions",
              "Fast & responsive learning platform",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                <span className="text-teal-50 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Form Panel - White Background) */}
        <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative bg-white">
          {/* Mobile heading */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className={`text-4xl text-teal-800 ${playfair.className}`}>
              Welcome Back
            </h1>
            <p className="mt-3 text-sm text-gray-500">Login to continue learning</p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-teal-600 font-medium">
              Student Access
            </span>
            <h2 className={`mt-3 text-3xl text-gray-900 ${playfair.className}`}>
              Login Now
            </h2>
            <p className="mt-3 text-sm text-gray-500">Login to continue booking tutors</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 flex items-center gap-2 animate-in fade-in duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="group flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-700 font-medium transition-all hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <GoogleIcon />
            <span>{loading ? "Please wait..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Or</span>
            <div className="h-[1px] flex-1 bg-gray-200" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-teal-600 transition-colors hover:text-teal-700 underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {loading ? "Signing in..." : "Login Now"}
            </button>
          </form>

          {/* Bottom Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            New to Tutors-Finder?{" "}
            <Link
              href="/register"
              className="font-semibold text-teal-600 transition-colors hover:text-teal-700 underline-offset-4 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}