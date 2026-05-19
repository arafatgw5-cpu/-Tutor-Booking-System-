"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AllTutors = () => {
  const router = useRouter();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      // এখানে limit=8 করে দেওয়া হয়েছে ৮টা ডাটা আনার জন্য
      const response = await fetch("/api/tutors?limit=8");
      const data = await response.json();

      if (Array.isArray(data)) {
        setTutors(data);
      } else {
        console.error("Expected an array but received:", data);
        setTutors([]);
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
      setTutors([]);
    } finally {
      loading && setLoading(false);
    }
  };

  const handleBookSession = (tutorId) => {
    router.push(`/tutors/${tutorId}`);
  };

  // কঙ্কাল লোডার (Skeleton Loader Component)
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4 animate-pulse shadow-sm">
      <div className="w-full h-52 bg-gray-200 rounded-2xl"></div>
      <div className="h-6 bg-gray-200 rounded-full w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
      <div className="space-y-3 pt-2">
        <div className="h-4 bg-gray-200 rounded-full w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-full w-4/5"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-full pt-4"></div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন গ্লো */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-40 -z-10 animate-blob"></div>
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40 -z-10 animate-blob animation-delay-2000"></div>

      {/* হেডিং সেকশন */}
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">
          All Available Tutors
        </h2>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Explore all our professional tutors and start your learning journey today.
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 mx-auto rounded-full mt-2"></div>
      </div>

      {/* লোডিং অবস্থা (৮টি স্কেলিটন কার্ড দেখাবে) */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      )}

      {/* টিউটর গ্রিড */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tutors?.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out group flex flex-col justify-between"
            >
              <div>
                {/* টিউটর ছবি ও ব্যাজ */}
                <div className="relative w-full h-52 bg-gray-50 overflow-hidden">
                  <Image
                    src={
                      tutor.photo?.startsWith("http")
                        ? tutor.photo
                        : "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={tutor.name || "Tutor"}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* টিচিং মোড ব্যাজ */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-teal-100 uppercase tracking-wider">
                    {tutor.teachingMode || "Online"}
                  </span>
                </div>

                {/* টিউটর ইনফো */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors duration-300">
                    {tutor.name}
                  </h3>

                  <p className="inline-block bg-teal-50 text-teal-700 font-semibold text-xs px-2.5 py-1 rounded-md mb-4">
                    {tutor.subject}
                  </p>

                  <div className="space-y-3 text-sm text-gray-600">
                    {/* এভেইলেবল টাইম */}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="truncate">
                        <strong className="text-gray-700">Available:</strong> {tutor.availableDays} ({tutor.availableTime})
                      </span>
                    </div>

                    {/* ইন্সটিটিউশন */}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      <span className="truncate">
                        <strong className="text-gray-700">Institution:</strong> {tutor.institution}
                      </span>
                    </div>

                    {/* এক্সপেরিয়েন্স */}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <span>
                        <strong className="text-gray-700">Experience:</strong> {tutor.experience}
                      </span>
                    </div>

                    {/* লোকেশন */}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span>
                        <strong className="text-gray-700">Location:</strong> {tutor.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ফি এবং বুকিং বাটন */}
              <div className="p-6 pt-0 border-t border-gray-50 bg-gray-50/50 rounded-b-3xl">
                <div className="flex items-baseline justify-between mb-4 pt-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hourly Fee</span>
                  <p className="text-2xl font-black text-teal-600">
                    ৳{tutor.hourlyFee}
                    <span className="text-xs font-medium text-gray-400">/hr</span>
                  </p>
                </div>

                <button
                  onClick={() => handleBookSession(tutor._id)}
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-teal-200 hover:shadow-lg active:scale-[0.98] cursor-pointer text-center"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ফাকা অবস্থা (Empty State) */}
      {tutors.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 max-w-lg mx-auto shadow-sm animate-fadeIn">
          <div className="w-16 h-16 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700">No Tutors Found</h3>
          <p className="text-gray-400 mt-2 px-6">We couldn't find any available tutors at the moment. Please check back later!</p>
        </div>
      )}
    </section>
  );
};

export default AllTutors;