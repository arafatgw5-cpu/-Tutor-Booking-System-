"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client"; 
import { Plus, Edit2, Trash2, MapPin, Clock, DollarSign, BookOpen, Loader2, Users, Star, Sparkles, GraduationCap } from 'lucide-react';

const MyTutorsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isPending && !user) {
      router.push('/login');
      return;
    }

    if (user?.email) {
      fetchMyTutors(user.email);
    }
  }, [user, isPending, router]);

  const fetchMyTutors = async (email) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      const response = await fetch(`${baseUrl}/api/my-tutors/${email}`);
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tutorId) => {
    if (!confirm('Are you sure you want to delete this tutor profile?')) return;
    setDeletingId(tutorId);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      await fetch(`${baseUrl}/api/tutors/${tutorId}`, { method: 'DELETE' });
      setTutors(prev => prev.filter(t => t._id !== tutorId));
    } catch (error) {
      console.error('Error deleting tutor:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (tutorId) => {
    router.push(`/edit-tutor/${tutorId}`);
  };

  /* ── ১. প্রিমিয়াম লাইট/ডার্ক-মোড লোডার স্টেট ── */
  if (isPending || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-slate-50/60 dark:bg-slate-950/60 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-teal-600/10 dark:border-teal-400/20 flex items-center justify-center">
            <Loader2 className="h-7 w-7 text-teal-600 dark:text-teal-400 animate-spin" />
          </div>
          <div className="absolute inset-0 rounded-full border border-teal-600/20 dark:border-teal-400/30 animate-ping opacity-60" />
        </div>
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 animate-pulse mt-2">Loading profiles...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-200 selection:bg-teal-500/20 antialiased relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ডের জন্য হালকা ডেকোরেটিভ গ্লো ইফেক্ট */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/[0.03] dark:bg-teal-500/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── হেডার সেকশন (SaaS Dashboard Layout) ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="space-y-2.5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-600/90 dark:text-teal-400/90 flex items-center gap-2">
              <GraduationCap size={14} />
              Instructor Workspace
            </p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              My Tutors
            </h1>
            
            {/* ইউজার ইনফো ব্যাজ */}
            <div className="flex items-center gap-2.5 mt-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm py-1.5 px-3.5 rounded-xl w-fit">
              <div className="h-5 w-5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <Users size={12} className="text-slate-500 dark:text-slate-400" />
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{user.email}</p>
              {tutors.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-md text-[10px] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase">
                  {tutors.length} {tutors.length === 1 ? 'Profile' : 'Profiles'}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => router.push('/add-tutor')}
            className="group relative flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-emerald-600 transition-all duration-300 hover:opacity-95 shadow-[0_4px_20px_rgba(13,148,136,0.2)] hover:shadow-[0_4px_25px_rgba(13,148,136,0.35)] active:scale-[0.98]"
          >
            <Plus size={18} className="stroke-[2.5]" />
            <span>Add New Tutor</span>
          </button>
        </div>

        {/* ── কন্টেন্ট সেকশন ── */}
        {tutors?.length === 0 ? (
          /* এম্পটি স্টেট */
          <div className="relative flex flex-col items-center justify-center py-28 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 text-center px-4 bg-white dark:bg-slate-900/50 shadow-sm overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal-500/20 dark:via-teal-500/40 to-transparent" />
            
            <div className="relative h-20 w-20 rounded-2xl bg-teal-50/60 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center mb-6 shadow-sm">
              <BookOpen className="h-8 w-8 text-teal-600/90 dark:text-teal-400/90" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1.5 tracking-tight">No tutor profiles published yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm text-sm leading-relaxed font-medium">
              Share your academic expertise and connect with local students searching for guidance.
            </p>
            
            <button
              onClick={() => router.push('/add-tutor')}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500/40 dark:hover:border-teal-500/40 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 active:scale-[0.98] shadow-sm"
            >
              <Sparkles size={16} className="text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
              Create First Profile
            </button>
          </div>
        ) : (
          /* কার্ড গ্রিড */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {tutors.map((tutor) => (
              <div 
                key={tutor._id} 
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-800/70 bg-white dark:bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_16px_35px_rgba(0,0,0,0.4)] hover:border-teal-500/20 dark:hover:border-teal-500/30"
              >
                {/* ইমেজ ও গ্লাসমোরফিজম ব্যাজ */}
                <div className="h-56 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={tutor.photo || 'https://via.placeholder.com/400x300'} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]" 
                  />
                  {/* প্রফেশনাল ইমেজ শ্যাডো ওভারলে */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-black/5" />
                  
                  {/* টিচিং মোড ব্যাজ */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 text-[11px] font-bold rounded-xl shadow-sm uppercase tracking-wider border border-white/50 dark:border-slate-700/50 backdrop-blur-md">
                      {tutor.teachingMode}
                    </span>
                  </div>
                </div>
                
                {/* কার্ড বডি কন্টেন্ট */}
                <div className="p-6 flex-1 flex flex-col">
                  
                  {/* নাম ও সাবজেক্ট এরিয়া */}
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight leading-snug mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {tutor.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 dark:bg-teal-500/10 border border-teal-100/70 dark:border-teal-500/20 text-teal-700 dark:text-teal-400">
                      <Star size={11} fill="currentColor" className="stroke-none" />
                      {tutor.subject}
                    </span>
                  </div>
                  
                  {/* মোডুলার ডাটা রোজ */}
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 flex-1 border-b border-slate-100 dark:border-slate-800/80 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                      </div>
                      <span className="truncate font-medium text-slate-500 dark:text-slate-400">{tutor.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <Clock size={14} className="text-slate-400 dark:text-slate-500" />
                      </div>
                      <span className="truncate font-medium text-slate-500 dark:text-slate-400">{tutor.availableDays} • {tutor.availableTime}</span>
                    </div>

                    {/* ফি এবং স্লট রো */}
                    <div className="flex items-center justify-between pt-1.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-50 dark:bg-teal-500/10 border border-teal-100/40 dark:border-teal-500/20">
                          <DollarSign size={14} className="text-teal-600 dark:text-teal-400" />
                        </div>
                        <span className="text-base font-black text-slate-900 dark:text-white">
                          ৳{tutor.hourlyFee}<span className="text-xs font-normal text-slate-400 dark:text-slate-500 ml-0.5">/hr</span>
                        </span>
                      </div>

                      {/* স্ট্যাটাস ব্যাজ */}
                      <span className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase border ${
                        tutor.remainingSlots > 0 
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/60 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                          : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200/60 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${tutor.remainingSlots > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        {tutor.remainingSlots} Slots Left
                      </span>
                    </div>
                  </div>
                  
                  {/* অ্যাকশন বাটনসমূহ */}
                  <div className="flex gap-3 mt-5">
                    <button 
                      onClick={() => handleEdit(tutor._id)} 
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(tutor._id)} 
                      disabled={deletingId === tutor._id}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600/90 dark:text-rose-400 rounded-xl text-xs font-bold hover:bg-rose-100/80 dark:hover:bg-rose-500/20 hover:text-rose-700 dark:hover:text-rose-300 transition-all duration-300 disabled:opacity-40"
                      title="Delete Profile"
                    >
                      {deletingId === tutor._id ? (
                        <Loader2 size={14} className="animate-spin text-rose-600 dark:text-rose-400" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTutorsPage;