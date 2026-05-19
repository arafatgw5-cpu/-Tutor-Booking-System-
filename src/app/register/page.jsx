// src/app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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

  // PASSWORD VALIDATION
  const validatePassword = (pass) => {
    const errs = [];

    if (pass.length < 6) {
      errs.push("At least 6 characters required");
    }

    if (!/[A-Z]/.test(pass)) {
      errs.push("One uppercase letter required");
    }

    if (!/[a-z]/.test(pass)) {
      errs.push("One lowercase letter required");
    }

    return errs;
  };

  // REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const passwordErrors = validatePassword(formData.password);

    if (passwordErrors.length > 0) {
      setErrors({ password: passwordErrors });

      toast.error("Please follow password rules");

      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoUrl || undefined,
      });

      if (error) {
        toast.error(error.message);
        setErrors({ general: error.message });
        return;
      }

      toast.success("Account created successfully!");

      router.push("/login");
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE REGISTER
  const handleGoogle = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);

      toast.error("Google signup failed");
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
          <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-sky-400/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <span className="text-cyan-400 text-sm tracking-[0.3em] uppercase">
              Tutor Booking Platform
            </span>

            <h1
              className="mt-6 text-5xl leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Start Your
              <br />
              Learning Journey.
            </h1>

            <p className="mt-6 text-white/50 text-sm leading-7 max-w-sm">
              Create your account to connect with expert tutors,
              book sessions, and improve your skills anytime.
            </p>
          </div>

          <div className="relative z-10 space-y-5">
            {[
              "Find expert tutors",
              "Book sessions instantly",
              "Google signup support",
              "Modern & secure platform",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />

                <span className="text-white/60 text-sm">
                  {item}
                </span>
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
              Create Account
            </h1>

            <p className="mt-3 text-sm text-white/50">
              Join the tutor booking platform
            </p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Student Registration
            </span>

            <h2
              className="mt-3 text-3xl text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Create Account
            </h2>

            <p className="mt-3 text-sm text-white/50">
              Register to start booking tutors
            </p>
          </div>

          {/* GENERAL ERROR */}
          {errors.general && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errors.general}
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
              {loading ? "Loading..." : "Continue with Google"}
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
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Full Name
              </label>

              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400 focus:bg-white/[0.05]"
              />
            </div>

            {/* EMAIL */}
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400 focus:bg-white/[0.05]"
              />
            </div>

            {/* PHOTO URL */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Photo URL
              </label>

              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    photoUrl: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400 focus:bg-white/[0.05]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Password
              </label>

              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });

                  setErrors((prev) => ({
                    ...prev,
                    password: validatePassword(
                      e.target.value
                    ),
                  }));
                }}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cyan-400 focus:bg-white/[0.05]"
              />

              {/* PASSWORD RULES */}
              {formData.password.length > 0 && (
                <div className="mt-3 space-y-1 text-xs">

                  <p
                    className={
                      formData.password.length >= 6
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    • At least 6 characters
                  </p>

                  <p
                    className={
                      /[A-Z]/.test(formData.password)
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    • One uppercase letter
                  </p>

                  <p
                    className={
                      /[a-z]/.test(formData.password)
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    • One lowercase letter
                  </p>
                </div>
              )}

              {/* PASSWORD ERRORS */}
              {errors.password?.length > 0 && (
                <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                  {errors.password.map((err, i) => (
                    <p key={i}>• {err}</p>
                  ))}
                </div>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-[#06111f] transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* BOTTOM */}
          <p className="mt-8 text-center text-sm text-white/40">
            Already have an account?{" "}

            <Link
              href="/login"
              className="text-cyan-400 transition hover:text-cyan-300"
            >
              Login Here
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