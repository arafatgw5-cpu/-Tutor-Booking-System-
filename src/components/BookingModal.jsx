"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; // 🚀 Better Auth Added

const BookingModal = ({ isOpen, onClose, tutor }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // 🚀 Auto-fill exactly matching logged-in user details
  useEffect(() => {
    if (isOpen && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "", // Sets exact email from DB
      }));
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const bookingData = {
        ...formData,
        studentName: formData.name, // Ensure backend gets the correct field name
        studentEmail: formData.email,
        tutorId: tutor._id,
        tutorName: tutor.name,
        tutorSubject: tutor.subject,
        tutorPhoto: tutor.photo,
        hourlyFee: tutor.hourlyFee,
        feeUnit: tutor.feeUnit || "hr",
        teachingMode: tutor.teachingMode,
        status: "Pending", // Auto-generated status
      };

      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      const response = await fetch(`${baseUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          router.push("/booked-sessions");
        }, 2000);
      } else {
        setError(result.error || "Booking failed.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !tutor) return null;

  // 🚀 Bulletproof Slot Logic (Handles String, Number, and Old undefined Data)
  const total = tutor.totalSlot !== undefined ? Number(tutor.totalSlot) : null;
  const remaining = tutor.remainingSlots !== undefined ? Number(tutor.remainingSlots) : null;

  // যদি পুরাতন ডাটা হয় (স্লট না থাকে), তাহলে বাই-ডিফল্ট ট্রু। আর থাকলে চেক করবে ০ এর চেয়ে বড় কিনা।
  const slotsAvailable = (total === null && remaining === null) ? true : (total > 0 || remaining > 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm rounded-t-3xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">Book Session</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {!slotsAvailable ? (
            /* No Slots Available Warning */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Blocked</h3>
              <p className="text-red-600 font-medium">No available slots left for this tutor.</p>
              <button 
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors w-full cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : success ? (
            /* Success Message */
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-2">Booking Successful!</h3>
              <p className="text-gray-500 mt-2 font-medium">Redirecting to your sessions...</p>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Auto-filled Tutor Info Banner */}
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <p className="text-xs text-teal-600 font-bold uppercase tracking-wider mb-1">Booking With</p>
                  <p className="text-gray-800 font-bold">{tutor.name}</p>
                  <p className="text-sm text-gray-500">{tutor.subject} • ৳{tutor.hourlyFee}/hr</p>
                </div>
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Student Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly // 🚀 Email cannot be changed
                  className="w-full px-4 py-2.5 bg-gray-50 text-gray-500 border border-gray-200 rounded-xl outline-none cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition-all"
                  placeholder="e.g. 017XXXXXXXX"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date *</label>
                  <input 
                    type="date" 
                    name="preferredDate" 
                    required
                    value={formData.preferredDate} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time *</label>
                  <input 
                    type="time" 
                    name="preferredTime" 
                    required
                    value={formData.preferredTime} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl outline-none transition-all" 
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium text-center">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="flex-1 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`flex-1 px-4 py-3 text-white font-bold rounded-xl transition-all shadow-md ${
                    loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 hover:shadow-lg cursor-pointer"
                  }`}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;