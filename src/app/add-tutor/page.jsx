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

      const response = await fetch('/api/tutors', {
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
        setError("Failed to add tutor! Please try again.");
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
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-3">
        <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
        <p className="text-lg font-medium text-gray-600">
          {isPending ? 'Verifying authentication...' : 'Redirecting to login...'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-8 sm:px-10 text-center sm:text-left">
          <h1 className="text-3xl font-black tracking-tight text-white">Create Tutor Profile</h1>
          <p className="text-teal-100 mt-2 text-sm sm:text-base">
            Share your expertise and start reaching thousands of prospective students.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
          
          {/* Status Notifications */}
          {success && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-2xl">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={22} />
              <p className="text-sm font-semibold">Tutor added successfully! Redirecting to dashboard...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 rounded-2xl">
              <AlertCircle className="text-rose-500 shrink-0" size={22} />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* SECTION 1: Basic Information */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">
              01. Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tutor Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Rahim Ahmed" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Avatar / Photo URL</label>
                <div className="relative">
                  <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="url" name="photo" value={formData.photo} onChange={handleChange} required placeholder="https://images.unsplash.com/..." className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Tuition Details */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">
              02. Tuition & Availability Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Subject Expertise</label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-white text-slate-800 appearance-none">
                    <option value="" className="text-slate-400">Select Subject</option>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Teaching Mode</label>
                <div className="relative">
                  <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select name="teachingMode" value={formData.teachingMode} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-white text-slate-800 appearance-none">
                    <option value="">Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Available Days</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" name="availableDays" value={formData.availableDays} onChange={handleChange} required placeholder="e.g. Sat, Mon, Wed" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" name="availableTime" value={formData.availableTime} onChange={handleChange} required placeholder="e.g. 4:00 PM - 6:00 PM" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Hourly Remuneration (৳)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="number" name="hourlyFee" value={formData.hourlyFee} onChange={handleChange} required placeholder="500" min="0" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Total Batches / Student Slots</label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="number" name="totalSlots" value={formData.totalSlots} onChange={handleChange} required placeholder="5" min="1" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Session Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="date" name="sessionStartDate" value={formData.sessionStartDate} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-800" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Academic background */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">
              03. Academic & Professional Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Current / Last Institution</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" name="institution" value={formData.institution} onChange={handleChange} required placeholder="e.g. Dhaka University" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Teaching Experience</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" name="experience" value={formData.experience} onChange={handleChange} required placeholder="e.g. 3+ Years" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Location / Area</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Mirpur, Dhaka" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-800" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:opacity-95 transition-all shadow-lg shadow-teal-600/15 disabled:opacity-50 disabled:cursor-not-allowed text-base tracking-wide"
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