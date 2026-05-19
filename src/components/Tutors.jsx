"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/tutors?limit=4"
      );

      const data = await response.json();

      setTutors(data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = (tutorId) => {
    console.log("Booking session for tutor:", tutorId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold text-teal-600 animate-pulse">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Available Tutors
        </h2>

        <p className="text-gray-500 mt-3">
          Find experienced tutors and book your session easily.
        </p>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            {/* Tutor Image */}
            <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
              <Image
                src={
                  tutor.photo?.startsWith("http")
                    ? tutor.photo
                    : "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={tutor.name || "Tutor"}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Tutor Info */}
            <div className="p-5">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {tutor.name}
              </h3>

              <p className="text-teal-600 font-semibold text-lg mb-4">
                {tutor.subject}
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">
                    Available:
                  </span>{" "}
                  {tutor.availableDays} | {tutor.availableTime}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Start Date:
                  </span>{" "}
                  {tutor.sessionStartDate}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Institution:
                  </span>{" "}
                  {tutor.institution}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Experience:
                  </span>{" "}
                  {tutor.experience}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Location:
                  </span>{" "}
                  {tutor.location}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Mode:
                  </span>{" "}
                  {tutor.teachingMode}
                </p>

                <p className="text-xl font-bold text-gray-900 pt-2">
                  ৳ {tutor.hourlyFee}
                  <span className="text-base font-medium text-gray-500">
                    /hour
                  </span>
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => handleBookSession(tutor._id)}
                className="w-full mt-5 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {tutors.length === 0 && !loading && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-700">
            No Tutors Available
          </h3>

          <p className="text-gray-500 mt-2">
            Please check again later.
          </p>
        </div>
      )}
    </section>
  );
};

export default Tutors;