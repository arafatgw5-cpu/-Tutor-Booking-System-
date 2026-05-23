"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save, User, BookOpen, DollarSign } from "lucide-react";

const EditTutorPage = ({ params }) => {
  const router = useRouter();

  // unwrapping params for Next.js 15
  const unwrappedParams = use(params);
  const tutorId = unwrappedParams.id;

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    hourlyFee: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // fetch tutor data
  useEffect(() => {
    const fetchSingleTutor = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_URL || "";
        
        // LocalStorage থেকে JWT টোকেন নেওয়া হচ্ছে
        const token = localStorage.getItem("token"); 

        const res = await fetch(`${baseUrl}/api/tutors/${tutorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // JWT হেডার যুক্ত করা হলো
          },
        });

        if (res.status === 401 || res.status === 403) {
          router.push("/login"); // টোকেন না থাকলে বা এক্সপায়ার হলে লগইন পেজে পাঠাবে
          return;
        }

        if (!res.ok) throw new Error("Tutor not found");
        
        const data = await res.json();
        setFormData({
          name: data.name || "",
          subject: data.subject || "",
          hourlyFee: data.hourlyFee || "",
        });
      } catch (error) {
        console.error("Error fetching tutor:", error);
        setError("Could not load tutor data.");
      } finally {
        setLoading(false);
      }
    };

    if (tutorId) fetchSingleTutor();
  }, [tutorId, router]);

  // handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value 
    }));
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      
      // LocalStorage থেকে JWT টোকেন নেওয়া হচ্ছে
      const token = localStorage.getItem("token");

      const res = await fetch(`${baseUrl}/api/tutors/${tutorId}`, {
        method: "PUT", 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // JWT হেডার যুক্ত করা হলো
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401 || res.status === 403) {
        router.push("/login"); // টোকেন ইনভ্যালিড হলে লগইন পেজে পাঠাবে
        return;
      }

      if (res.ok) {
        router.push("/my-tutors");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update tutor");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError("Network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-3 bg-slate-50/50 dark:bg-slate-950">
        <Loader2 className="h-10 w-10 text-teal-600 dark:text-teal-500 animate-spin" />
        <p className="text-lg font-medium text-slate-600 dark:text-slate-400">Loading Tutor Data...</p>
      </div>
    );
  }

  // Not Found State
  if (error && !formData.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-slate-50/50 dark:bg-slate-950">
        <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-6 rounded-2xl max-w-md w-full border border-rose-100 dark:border-rose-500/20">
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.back()} 
            className="mt-6 px-6 py-2 bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button & Title */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-4 font-medium"
          >
            <ArrowLeft size={18} /> Back to My Tutors
          </button>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">
            Edit Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Updating information for <span className="font-semibold text-teal-600 dark:text-teal-400">{formData.name}</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-200">
          
          {error && (
            <div className="mb-6 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Tutor Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Subject</label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Fee Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Hourly Fee (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="number"
                  name="hourlyFee"
                  value={formData.hourlyFee}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/40 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-teal-600/20 dark:shadow-teal-900/20 disabled:opacity-50"
              >
                {saving ? (
                  <><Loader2 className="animate-spin" size={20} /> Saving Changes...</>
                ) : (
                  <><Save size={20} /> Update Profile</>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EditTutorPage;