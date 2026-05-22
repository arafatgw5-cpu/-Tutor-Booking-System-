"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { MapPin, Clock, GraduationCap, Briefcase, Star, Lock, SearchX, Sparkles } from "lucide-react";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm flex flex-col">
    <div className="w-full h-56 bg-slate-100 animate-pulse relative">
      <div className="absolute top-4 left-4 w-20 h-6 bg-white/50 rounded-xl"></div>
    </div>
    <div className="p-6 flex-1 flex flex-col gap-4">
      <div>
        <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-3 animate-pulse"></div>
        <div className="h-5 bg-teal-50 rounded-md w-1/3 animate-pulse"></div>
      </div>
      <div className="space-y-3 border-b border-slate-100 pb-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-slate-50 shrink-0 animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded-md w-full animate-pulse"></div>
          </div>
        ))}
      </div>
      <div className="pt-2 flex justify-between items-center">
        <div className="h-6 bg-slate-200 rounded-md w-1/4 animate-pulse"></div>
        <div className="h-10 bg-slate-100 rounded-xl w-1/2 animate-pulse"></div>
      </div>
    </div>
  </div>
);

const Tutors = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession(); 
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (isPending) return;

    const fetchTutors = async () => {
      try {
        setLoading(true);
        setAuthError(false);
          
        const headers = {
          "Content-Type": "application/json",
        };
        
        const token = session?.token || session?.user?.token; 
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // 1. Determine the Base URL
        const baseUrl = process.env.NEXT_PUBLIC_URL || "";
        const targetUrl = `${baseUrl}/api/tutors?limit=4`;
        
        console.log("Attempting to fetch from:", targetUrl); // DEBUG LOG

        const response = await fetch(targetUrl, {
          method: "GET",
          headers,
        });

        if (response.status === 401) {
          console.warn("Unauthorized: Please log in to view tutors.");
          setAuthError(true);
          setTutors([]);
          return;
        }

        if (!response.ok) {
          throw new Error(`Server responded with Status: ${response.status} ${response.statusText}`);
        }

        // 2. Prevent the "Unexpected token < in JSON" HTML error
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textResponse = await response.text();
          console.error("Expected JSON but received HTML/Text:", textResponse.substring(0, 150) + "...");
          throw new Error("API did not return valid JSON. Check your API route path or server.");
        }

        const rawData = await response.json();
        
        let fetchedTutors = [];
        if (Array.isArray(rawData)) {
          fetchedTutors = rawData;
        } else if (rawData.data && Array.isArray(rawData.data)) {
          fetchedTutors = rawData.data;
        } else if (rawData.tutors && Array.isArray(rawData.tutors)) {
          fetchedTutors = rawData.tutors;
        }

        setTutors(fetchedTutors);
      } catch (error) {
        console.error("Detailed Fetch Error:", error.message || error);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [session, isPending]);

  const handleBookSession = (tutorId) => {
    router.push(`/tutors/${tutorId}`); 
  };

  return (
    <section className="bg-[#f8fafc] text-slate-800 selection:bg-teal-500/20 antialiased relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      
      {/* ── Decorative Background Glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] bg-teal-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── Header Section ── */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-600/90 flex items-center justify-center gap-2">
            <Sparkles size={14} />
            Discover Experts
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            Available Tutors
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto font-medium mt-2">
            Find experienced tutors matching your criteria and book a session to accelerate your learning journey.
          </p>
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(4)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        )}

        {/* ── Tutors Grid ── */}
        {!loading && tutors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200/70 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] hover:border-teal-500/20"
              >
                {/* Image & Badge */}
                <div className="h-56 overflow-hidden relative bg-slate-100">
                  <Image
                    src={
                      tutor.photo?.startsWith("http")
                        ? tutor.photo
                        : "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={tutor.name || "Tutor"}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-black/5" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/80 text-slate-800 text-[11px] font-bold rounded-xl shadow-sm uppercase tracking-wider border border-white/50 backdrop-blur-md">
                      {tutor.teachingMode || "Online"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  
                  {/* Name and Subject */}
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight leading-snug mb-2 group-hover:text-teal-600 transition-colors duration-300">
                      {tutor.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 border border-teal-100/70 text-teal-700">
                      <Star size={11} fill="currentColor" className="stroke-none" />
                      {tutor.subject}
                    </span>
                  </div>

                  {/* Data List (Location, Time, etc) */}
                  <div className="space-y-3 text-xs text-slate-600 flex-1 border-b border-slate-100 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 border border-slate-100">
                        <Clock size={14} className="text-slate-400" />
                      </div>
                      <span className="truncate font-medium text-slate-500">
                        <span className="text-slate-700 font-semibold">Avail:</span> {tutor.availableDays}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 border border-slate-100">
                        <GraduationCap size={14} className="text-slate-400" />
                      </div>
                      <span className="truncate font-medium text-slate-500">
                        <span className="text-slate-700 font-semibold">Edu:</span> {tutor.institution}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 border border-slate-100">
                        <Briefcase size={14} className="text-slate-400" />
                      </div>
                      <span className="truncate font-medium text-slate-500">
                        <span className="text-slate-700 font-semibold">Exp:</span> {tutor.experience}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 border border-slate-100">
                        <MapPin size={14} className="text-slate-400" />
                      </div>
                      <span className="truncate font-medium text-slate-500">
                         {tutor.location}
                      </span>
                    </div>
                  </div>

                  {/* Footer (Fee & Button) */}
                  <div className="pt-5 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Hourly Rate</p>
                      <p className="text-lg font-black text-slate-900">
                        ৳{tutor.hourlyFee}<span className="text-xs font-normal text-slate-400 ml-0.5">/hr</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleBookSession(tutor._id)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-600 to-emerald-600 transition-all duration-300 hover:opacity-95 shadow-[0_4px_15px_rgba(13,148,136,0.2)] hover:shadow-[0_4px_20px_rgba(13,148,136,0.35)] active:scale-[0.98]"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty / Error State ── */}
        {tutors.length === 0 && !loading && (
          <div className="relative flex flex-col items-center justify-center py-24 rounded-3xl border border-slate-200/80 text-center px-4 bg-white shadow-sm overflow-hidden max-w-2xl mx-auto mt-8">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
            
            <div className={`relative h-20 w-20 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${authError ? 'bg-rose-50/60 border-rose-100' : 'bg-slate-50/60 border-slate-100'}`}>
              {authError ? (
                <Lock className="h-8 w-8 text-rose-500/90" />
              ) : (
                <SearchX className="h-8 w-8 text-slate-400" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">
              {authError ? "Authentication Required" : "No Tutors Found"}
            </h3>
            <p className="text-slate-500 mb-8 max-w-sm text-sm leading-relaxed font-medium">
              {authError 
                ? "Please log in to your account to view our premium selection of available tutors." 
                : "We couldn't find any tutors matching your criteria right now. Check back later!"}
            </p>

            {authError && (
              <button
                onClick={() => router.push('/login')}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 transition-all duration-300 active:scale-[0.98] shadow-md"
              >
                Go to Login
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tutors;