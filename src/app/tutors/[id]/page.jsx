"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import BookingModal from "@/components/BookingModal"; 

export default function TutorDetails() {
  const { id } = useParams(); 
  const router = useRouter();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tutors/${id}`);
        const data = await response.json();
        
        if (response.ok && data && !data.error) {
          setTutor(data);
        } else {
          setTutor(null);
        }
      } catch (error) {
        console.error("Error fetching tutor:", error);
        setTutor(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTutorDetails();
    }
  }, [id]);

  const handleBookClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-2xl text-teal-600 dark:text-teal-400 animate-pulse font-semibold">Loading Details...</div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 gap-4 transition-colors duration-300">
        <div className="text-2xl text-red-600 dark:text-red-400 font-semibold">Tutor not found!</div>
        <button 
          onClick={() => router.push("/")}
          className="px-5 py-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-lg text-sm transition-colors duration-300 shadow-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium flex items-center gap-2 cursor-pointer transition-colors"
        >
          ← Back to Tutors
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-black/20 border border-transparent dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            
            {/* Tutor Image */}
            <div className="rounded-xl overflow-hidden relative min-h-[300px] bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
              <Image
                src={
                  tutor.photo?.startsWith("http")
                    ? tutor.photo
                    : "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={tutor.name || "Tutor"}
                fill
                unoptimized 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tutor Details */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">{tutor.name}</h1>
              <p className="text-teal-600 dark:text-teal-400 text-lg font-medium">{tutor.subject}</p>

              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <p><span className="font-semibold text-gray-900 dark:text-gray-100">Institution:</span> {tutor.institution || "N/A"}</p>
                <p><span className="font-semibold text-gray-900 dark:text-gray-100">Experience:</span> {tutor.experience || "N/A"}</p>
                <p><span className="font-semibold text-gray-900 dark:text-gray-100">Location:</span> {tutor.location || "N/A"}</p>
                <p><span className="font-semibold text-gray-900 dark:text-gray-100">Mode:</span> {tutor.teachingMode || "N/A"}</p>
                <p><span className="font-semibold text-gray-900 dark:text-gray-100">Available:</span> {tutor.availableDays || "N/A"} - {tutor.availableTime || "N/A"}</p>
                <p><span className="font-semibold text-gray-900 dark:text-gray-100">Hourly Fee:</span> ৳{tutor.hourlyFee}/{tutor.feeUnit || "hr"}</p>
                <p><span className="font-semibold text-gray-900 dark:text-gray-100">Remaining Slots:</span> {tutor.remainingSlots ?? 50}</p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Session Start:</span>{" "}
                  {tutor.sessionStartDate 
                    ? new Date(tutor.sessionStartDate).toLocaleDateString() 
                    : "N/A"}
                </p>
              </div>

              {/* Book Session Button */}
              <button
                onClick={handleBookClick}
                className="w-full md:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg mt-6 cursor-pointer"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          tutor={tutor}
        />
      )}
    </div>
  );
}