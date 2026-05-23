"use client";

import React, { useState } from "react";
import { 
  Card, 
  Separator, 
  Button, 
  FieldError, 
  Form, 
  Input, 
  Label, 
  TextField 
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        // ফ্রেশ রিকোয়েস্ট পাঠিয়ে রিফ্রেশ ছাড়াই অন্য পেজে যাওয়া
        window.location.href = "/"; 
      }

      if (error) {
        setServerError(error.message || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setServerError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      setServerError("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-slate-50/50 to-white dark:from-gray-950 dark:to-slate-900 px-4 py-12 transition-colors duration-500 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (ঐচ্ছিক সৌন্দর্য বৃদ্ধির জন্য) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-900/20 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none z-0"></div>

      <Card className="w-full max-w-md p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(8,112,184,0.07)] hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col gap-7 z-10 relative">
        
        {/* Title & Subtitle */}
        <div className="text-center space-y-2.5 mt-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
            Smart Tutor Booking <span className="text-cyan-600 dark:text-cyan-400 font-bold">MediQueue</span>
          </p>
        </div>

        {/* Form Inner Error Message */}
        {serverError && (
          <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 px-4 py-3 rounded-xl text-sm font-semibold text-center animate-fadeIn transition-colors duration-300">
            {serverError}
          </div>
        )}

        {/* Credentials Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
          
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 block transition-colors duration-300">
              Email Address
            </Label>
            <Input 
              placeholder="john@example.com" 
              classNames={{
                inputWrapper: "w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors",
                input: "dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              }}
            />
            <FieldError className="text-xs font-medium text-rose-500 mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              return null;
            }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block transition-colors duration-300">
                Password
              </Label>
              
              {/* Forget Password Link */}
              <Link 
                href="/forgot-password" 
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            
            <Input 
              placeholder="••••••••" 
              classNames={{
                inputWrapper: "w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors",
                input: "dark:text-white tracking-widest placeholder:tracking-normal placeholder:text-slate-400 dark:placeholder:text-slate-500"
              }}
            />
            <FieldError className="text-xs font-medium text-rose-500 mt-1" />
          </TextField>

          {/* Login Button */}
          <Button 
            className="w-full mt-3 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 hover:from-cyan-600 hover:to-blue-700 dark:hover:from-cyan-500 dark:hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 dark:shadow-cyan-900/40 hover:shadow-cyan-500/40 dark:hover:shadow-cyan-900/60 transition-all duration-300 text-base"
            type="submit"
            isLoading={loading}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </Form>

        {/* Register Redirect Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 font-medium -mt-2 transition-colors duration-300">
          Don&apos;t have an account?{" "}
          <Link 
            href="/register" 
            className="text-cyan-600 dark:text-cyan-400 font-bold hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline transition-colors"
          >
            Create one
          </Link>
        </p>

        {/* Divider Section */}
        <div className="flex items-center gap-4 my-1 w-full">
          <Separator className="flex-1 bg-slate-200 dark:bg-slate-700/60" />
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest whitespace-nowrap">
            Or continue with
          </span>
          <Separator className="flex-1 bg-slate-200 dark:bg-slate-700/60" />
        </div>

        {/* Social Login Button */}
        <div className="mb-2">
          <Button
            onClick={handleGoogleSignin}
            className="w-full py-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-sm"
          >
            <FcGoogle size={24} /> Sign in with Google
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default LoginPage;