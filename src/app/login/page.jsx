"use client";

import React, { useState } from "react";
import { 
  Card, 
  Separator, 
  Button, 
  Description, 
  FieldError, 
  Form, 
  Input, 
  Label, 
  TextField 
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 👈 নতুন লিংক কম্পোনেন্ট ইম্পোর্ট করা হয়েছে
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
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
        router.push('/');
        router.refresh();
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
      });
    } catch (err) {
      setServerError("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-slate-50/50 to-white px-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-3xl border border-slate-100 flex flex-col gap-6">
        
        {/* Title & Subtitle */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-800">
            Login
          </h1>
          <p className="text-sm text-slate-500 font-medium">
           Smart Tutor Booking<span className="text-cyan-600 font-bold">MediQueue</span>
          </p>
        </div>

        {/* Form Inner Error Message */}
        {serverError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-xs font-semibold text-center animate-fadeIn">
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
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">
              Email Address
            </Label>
            <Input 
              placeholder="john@example.com" 
              className="w-full rounded-xl"
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
            <div className="flex justify-between items-center mb-1">
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Password
              </Label>
              
              {/* 🎯 Forget Password Link */}
              <Link 
                href="/forgot-password" 
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            
            <Input 
              placeholder="••••••••" 
              className="w-full rounded-xl"
            />
            <FieldError className="text-xs font-medium text-rose-500 mt-1" />
          </TextField>

          {/* Login Button */}
          <Button 
            className="w-full mt-2 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all duration-200"
            type="submit"
            isLoading={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        {/* 🎯 Register Redirect Link */}
        <p className="text-center text-sm text-slate-500 font-medium -mt-2">
          Don&apos;t have an account?{" "}
          <Link 
            href="/signup" 
            className="text-cyan-600 font-bold hover:text-cyan-700 hover:underline transition-colors"
          >
            Register
          </Link>
        </p>

        {/* Divider Section */}
        <div className="flex items-center gap-3 my-1 w-full">
          <Separator className="flex-1 bg-slate-100" />
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
            Or continue with
          </span>
          <Separator className="flex-1 bg-slate-100" />
        </div>

        {/* Social Login Button */}
        <div>
          <Button
            onClick={handleGoogleSignin}
            className="w-full py-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm"
          >
            <FcGoogle size={22} /> Sign in with Google
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default LoginPage;