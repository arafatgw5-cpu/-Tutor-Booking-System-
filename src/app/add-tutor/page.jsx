"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client"; // ✅ Better Auth থেকে session

const AddTutor = () => {
  const router = useRouter();
  
  // ✅ Better Auth session ব্যবহার
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

  // ✅ Redirect if not logged in
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
      alert("Please login first!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // ✅ Database এ পাঠানোর জন্য ডাটা প্রস্তুত
      const tutorData = {
        ...formData,
        email: user.email, // ✅ Better Auth থেকে ইমেইল
        hourlyFee: Number(formData.hourlyFee),
        totalSlots: Number(formData.totalSlots),
        sessionStartDate: new Date(formData.sessionStartDate).toISOString(),
        fee: Number(formData.hourlyFee),
        feeUnit: "hr",
        availableDays: `${formData.availableDays} ${formData.availableTime}`,
        remainingSlots: Number(formData.totalSlots)
      };

      // ✅ Proxy ব্যবহার: '/api' দিয়ে কল
      const response = await fetch('/api/tutors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutorData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/my-tutors'); // ✅ My Tutors পেজে রিডাইরেক্ট
        }, 1500);
      } else {
        alert("Failed to add tutor!");
      }
    } catch (err) {
      console.error(err);
      alert("Network error!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-teal-600 animate-pulse">
          {isPending ? 'Checking login...' : 'Please login to continue'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        <div className="bg-teal-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Add New Tutor</h1>
          <p className="text-teal-100 mt-1">Fill in the details to add a new tutor.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              ✅ Tutor added successfully! Redirecting...
            </div>
          )}

          {/* Tutor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tutor Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Rahim Ahmed" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input type="url" name="photo" value={formData.photo} onChange={handleChange} required placeholder="https://i.ibb.co/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          {/* Subject & Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                <option value="">Select Subject</option>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Mode</label>
              <select name="teachingMode" value={formData.teachingMode} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>

          {/* Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
              <input type="text" name="availableDays" value={formData.availableDays} onChange={handleChange} required placeholder="e.g. Sun - Thu" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
              <input type="text" name="availableTime" value={formData.availableTime} onChange={handleChange} required placeholder="e.g. 5:00 PM - 8:00 PM" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>

          {/* Fee & Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Fee (৳)</label>
              <input type="number" name="hourlyFee" value={formData.hourlyFee} onChange={handleChange} required placeholder="500" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Slots</label>
              <input type="number" name="totalSlots" value={formData.totalSlots} onChange={handleChange} required placeholder="20" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Start Date</label>
            <input type="date" name="sessionStartDate" value={formData.sessionStartDate} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          {/* Institution & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input type="text" name="institution" value={formData.institution} onChange={handleChange} required placeholder="e.g. Dhaka University" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} required placeholder="e.g. 4 years" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Dhanmondi, Dhaka" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Submit Tutor'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTutor;