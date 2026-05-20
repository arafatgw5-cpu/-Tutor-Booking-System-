// src/app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (pass) => {
    const errs = [];
    if (pass.length < 6) errs.push("At least 6 characters required");
    if (!/[A-Z]/.test(pass)) errs.push("One uppercase letter required");
    if (!/[a-z]/.test(pass)) errs.push("One lowercase letter required");
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors({ password: passwordErrors });
      toast.error("Password does not meet requirements");
      return;
    }

    if (!formData.name.trim()) {
      setErrors({ name: "Name is required" });
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          photoUrl: formData.photoUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    toast.error("Google sign-up coming soon");
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
              Join Our<br />Community.
            </h1>
            <p className="mt-6 text-teal-100/80 text-sm leading-relaxed max-w-sm">
              Create an account to book expert tutors, manage your sessions, and continue your learning journey.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              "Book tutors instantly",
              "Manage your schedule",
              "Learn from experts",
              "Get affordable tutoring",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                <span className="text-teal-50 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Form Panel) */}
        <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative bg-white">
          {/* Mobile heading */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className={`text-4xl text-teal-800 ${playfair.className}`}>Create Account</h1>
            <p className="mt-3 text-sm text-gray-500">Join us today</p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-teal-600 font-medium">Student Registration</span>
            <h2 className={`mt-3 text-3xl text-gray-900 ${playfair.className}`}>Create Account</h2>
            <p className="mt-3 text-sm text-gray-500">Register to start booking tutors</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">Full Name</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">Email Address</label>
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
              />
            </div>

            {/* PHOTO URL */}
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">Photo URL (Optional)</label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
              />
              {errors.password && (
                <ul className="text-red-500 text-sm mt-2 space-y-1">
                  {errors.password.map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-teal-600 transition-colors hover:text-teal-700 underline-offset-4 hover:underline"
            >
              Login
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
