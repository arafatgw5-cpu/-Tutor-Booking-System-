"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client"; 

export default function BookedSessions() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 ডেটাবেজ থেকে রিয়েল-টাইম ডেটা লোডের জন্য cache: 'no-store' যুক্ত করা হয়েছে
  const fetchBookings = useCallback(async (email) => {
    try {
      setLoading(true);
      const { token } = await authClient.token(); // API সিকিউরিটির জন্য টোকেন অ্যাড করা হলো
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/booked-sessions/${email}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        cache: 'no-store' 
      });
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login"); // Client-side routing ব্যবহার করা হলো
      return;
    }

    if (user?.email) {
      fetchBookings(user.email);
    }
  }, [user, isPending, router, fetchBookings]);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const { token } = await authClient.token();
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        alert("Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
      confirmed: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
      completed: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
      cancelled: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
  };

  const formatDate = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (isPending || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-medium text-teal-600 dark:text-teal-400 animate-pulse">Loading your bookings...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-10 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">My Booked Sessions</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your ongoing tutoring sessions</p>
          </div>
          <button
            onClick={() => router.push("/tutors")}
            className="w-full sm:w-auto px-5 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 dark:hover:bg-teal-500 transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <span>📅</span> Book New Tutor
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 transition-colors">
            <div className="text-7xl mb-4">🗓️</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Bookings Found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
              You haven't booked any sessions yet or check if your email matches.
            </p>
            <button
              onClick={() => fetchBookings(user.email)}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors shadow-sm cursor-pointer"
            >
              🔄 Refresh List
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 md:p-6 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Tutor Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 flex-shrink-0">
                      <img src={booking.tutorPhoto || "https://via.placeholder.com/100"} alt={booking.tutorName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg">{booking.tutorName}</h3>
                      <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">{booking.tutorSubject}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">৳{booking.hourlyFee}/{booking.feeUnit} • 💻 {booking.teachingMode}</p>
                    </div>
                  </div>

                  {/* Status & Timing */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(booking.status)}`}>
                      {booking.status || "PENDING"}
                    </span>
                    <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                      <p>Booked: {formatDate(booking.bookedAt)}</p>
                      {booking.preferredDate && (
                        <p className="font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                          🗓️ {formatDate(booking.preferredDate)} at {booking.preferredTime || "Anytime"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Summary */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><span className="font-semibold text-gray-700 dark:text-gray-200">Student:</span> {booking.name} ({booking.email})</p>
                  {booking.phone && <p><span className="font-semibold text-gray-700 dark:text-gray-200">Phone:</span> {booking.phone}</p>}
                  {booking.message && <p className="mt-2 bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-600 italic">"{booking.message}"</p>}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={() => router.push(`/tutors/${booking.tutorId}`)} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                    View Tutor Profile
                  </button>
                  {booking.status?.toLowerCase() === "pending" && (
                    <button onClick={() => handleCancelBooking(booking._id)} className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer">
                      Cancel Booking
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}