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
      // eslint-disable-next-line
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
        tutorId: tutor._id,
        tutorName: tutor.name,
        tutorSubject: tutor.subject,
        tutorPhoto: tutor.photo,
        hourlyFee: tutor.hourlyFee,
        feeUnit: tutor.feeUnit || "hr",
        teachingMode: tutor.teachingMode,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings`, {
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
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">Book Session</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-green-600 mb-2">Booking Successful! 🎉</h3>
              <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly // 🚀 Email cannot be changed to prevent mismatch
                  className="w-full px-4 py-2.5 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                  placeholder="017XXXXXXXX"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none" />
                </div>
              </div>

              {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border text-gray-700 rounded-lg cursor-pointer">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg cursor-pointer">
                  {loading ? "Booking..." : "Confirm"}
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