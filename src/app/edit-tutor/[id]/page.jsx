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
        // NEXT_PUBLIC_URL না থাকলে সরাসরি রিলেটিভ পাথ ব্যবহার করবে
        const baseUrl = process.env.NEXT_PUBLIC_URL || "";
        const res = await fetch(`${baseUrl}/api/tutors/${tutorId}`);
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
  }, [tutorId]);

  // handle input change (Number conversion fixed here)
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({ 
      ...prev, 
      // ইনপুট টাইপ নাম্বার হলে সেটাকে Number-এ কনভার্ট করবে, ফাঁকা থাকলে ফাঁকাই রাখবে
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value 
    }));
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(""); // রিকোয়েস্ট পাঠানোর আগে আগের এরর ক্লিয়ার করা ভালো
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      // নোট: ব্যাকএন্ডে PUT নাকি PATCH ব্যবহার করেছেন তা নিশ্চিত হয়ে নিন
      const res = await fetch(`${baseUrl}/api/tutors/${tutorId}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-3">
        <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
        <p className="text-lg font-medium text-slate-600">Loading Tutor Data...</p>
      </div>
    );
  }

  // Not Found State
  if (error && !formData.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl max-w-md w-full border border-rose-100">
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.back()} 
            className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-lg font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button & Title */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4 font-medium"
          >
            <ArrowLeft size={18} /> Back to My Tutors
          </button>
          <h1 className="text-3xl font-black text-slate-800">
            Edit Profile
          </h1>
          <p className="text-slate-500 mt-1">Updating information for <span className="font-semibold text-teal-600">{formData.name}</span></p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
          
          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tutor Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Subject</label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Fee Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Hourly Fee (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  name="hourlyFee"
                  value={formData.hourlyFee}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-colors border border-slate-200"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-teal-600/20 disabled:opacity-50"
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