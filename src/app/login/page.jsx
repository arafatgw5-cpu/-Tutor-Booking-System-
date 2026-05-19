// src/app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");

      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogle = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-10"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');
      `}</style>

      <div className="w-full max-w-6xl rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#0b1020] p-14 flex-col justify-between">

          {/* Glow */}
          <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-sky-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-cyan-400/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <span className="text-sky-400 text-sm tracking-[0.3em] uppercase">
              Tutor Booking Platform
            </span>

            <h1
              className="mt-6 text-5xl leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Find Your
              <br />
              Perfect Tutor.
            </h1>

            <p className="mt-6 text-white/50 text-sm leading-7 max-w-sm">
              Login to book expert tutors, manage your sessions,
              and continue your learning journey easily.
            </p>
          </div>

          <div className="relative z-10 space-y-5">
            {[
              "Book tutors instantly",
              "Google login support",
              "Manage booked sessions",
              "Fast & responsive learning platform",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-center">

          {/* Mobile heading */}
          <div className="lg:hidden mb-10 text-center">
            <h1
              className="text-4xl text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome Back
            </h1>

            <p className="mt-3 text-sm text-white/50">
              Login to continue learning
            </p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-sky-400">
              Student Access
            </span>

            <h2
              className="mt-3 text-3xl text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Login Now
            </h2>

            <p className="mt-3 text-sm text-white/50">
              Login to continue booking tutors
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="group flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.06] hover:border-white/20 disabled:opacity-50"
          >
            <GoogleIcon />

            <span>
              {loading ? "Loading..." : "Continue with Google Account"}
            </span>
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs uppercase tracking-[0.2em] text-white/30">
              Or
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Email Address
              </label>

              <input
                type="email"
                required
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-sky-400 focus:bg-white/[0.05]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Password
              </label>

              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-sky-400 focus:bg-white/[0.05]"
              />
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-sky-400/80 transition hover:text-sky-300"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-sky-400 py-3 text-sm font-semibold text-[#06111f] transition hover:bg-sky-300 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login Now"}
            </button>
          </form>

          {/* Bottom */}
          <p className="mt-8 text-center text-sm text-white/40">
            New to Tutors-Finder?{" "}
            <Link
              href="/register"
              className="text-sky-400 transition hover:text-sky-300"
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
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}