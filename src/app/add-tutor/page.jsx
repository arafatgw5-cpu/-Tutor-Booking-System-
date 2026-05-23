"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client"; // Better Auth
import { 
  User, Image, BookOpen, Calendar, Clock, 
  DollarSign, Layers, GraduationCap, Briefcase, 
  MapPin, Video, Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react';

const AddTutor = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    subject: '',
    availableDays: '',
    availableTime: '',
    hourlyFee: '',
    totalSlots: '',
    sessionStartDate: '',
    institution: '',
    experience: '',
    location: '',
    teachingMode: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.push('/login');
    }
  }, [user, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      setError("Please login first to submit the form.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const tutorData = {
        ...formData,
        email: user.email,
        hourlyFee: Number(formData.hourlyFee),
        totalSlots: Number(formData.totalSlots),
        sessionStartDate: new Date(formData.sessionStartDate).toISOString(),
        fee: Number(formData.hourlyFee),
        feeUnit: "hr",
        availableDays: `${formData.availableDays} ${formData.availableTime}`,
        remainingSlots: Number(formData.totalSlots)
      };

      // Use relative URL for Next.js API route
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      const response = await fetch(`${baseUrl}/api/tutors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutorData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/my-tutors');
        }, 1500);
      } else {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Failed to add tutor! Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error! Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-3 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
        <Loader2 className="h-10 w-10 text-teal-600 dark:text-teal-500 animate-spin" />
        <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
          {isPending ? 'Verifying authentication...' : 'Redirecting to login...'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-10 sm:px-10 text-center sm:text-left relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.9,-18,97.4,-2.2C97.9,13.6,92.8,29.7,83.1,43.2C73.4,56.7,59.1,67.6,43.2,74.5C27.3,81.4,9.8,84.3,-6.5,82.8C-22.8,81.3,-38,75.4,-51.7,66.3C-65.4,57.2,-77.6,44.9,-84.6,29.9C-91.6,14.9,-93.4,-2.8,-88.7,-19.1C-84,-35.4,-72.8,-50.3,-58.5,-58.9C-44.2,-67.5,-26.8,-69.8,-11.1,-70.6C4.6,-71.4,20.3,-70.7,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight text-white">Create Tutor Profile</h1>
            <p className="text-teal-50 mt-2 text-sm sm:text-base font-medium">
              Share your expertise and start reaching thousands of prospective students.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
          
          {/* Status Notifications */}
          {success && (
            <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400 px-5 py-4 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
              <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 shrink-0" size={22} />
              <p className="text-sm font-semibold">Tutor added successfully! Redirecting to dashboard...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-800 dark:text-rose-400 px-5 py-4 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
              <AlertCircle className="text-rose-500 dark:text-rose-400 shrink-0" size={22} />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* SECTION 1: Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2">
              <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm">01</span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Tutor Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Rahim Ahmed" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Avatar / Photo URL</label>
                <div className="relative">
                  <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="url" name="photo" value={formData.photo} onChange={handleChange} required placeholder="https://images.unsplash.com/..." className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Tuition Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2">
              <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm">02</span>
              Tuition & Availability Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Subject Expertise</label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-slate-800 dark:text-slate-200 appearance-none">
                    <option value="" disabled className="text-slate-400">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="Bangla">Bangla</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Teaching Mode</label>
                <div className="relative">
                  <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <select name="teachingMode" value={formData.teachingMode} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-slate-800 dark:text-slate-200 appearance-none">
                    <option value="" disabled>Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Available Days</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="text" name="availableDays" value={formData.availableDays} onChange={handleChange} required placeholder="e.g. Sat, Mon, Wed" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="text" name="availableTime" value={formData.availableTime} onChange={handleChange} required placeholder="e.g. 4:00 PM - 6:00 PM" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Hourly Remuneration (৳)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="number" name="hourlyFee" value={formData.hourlyFee} onChange={handleChange} required placeholder="500" min="0" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Total Batches / Student Slots</label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="number" name="totalSlots" value={formData.totalSlots} onChange={handleChange} required placeholder="5" min="1" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Session Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="date" name="sessionStartDate" value={formData.sessionStartDate} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-slate-800 dark:text-slate-200" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Academic background */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2">
              <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm">03</span>
              Academic & Professional Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Current / Last Institution</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                  <input type="text" name="institution" value={formData.institution} onChange={handleChange} required placeholder="e.g. Dhaka University" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Teaching Experience</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="text" name="experience" value={formData.experience} onChange={handleChange} required placeholder="e.g. 3+ Years" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Location / Area</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Mirpur, Dhaka" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:opacity-95 transition-all shadow-lg shadow-teal-600/20 dark:shadow-teal-900/30 disabled:opacity-50 disabled:cursor-not-allowed text-base tracking-wide"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Publishing Profile...
                </>
              ) : (
                'Submit & Launch Profile'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTutor;