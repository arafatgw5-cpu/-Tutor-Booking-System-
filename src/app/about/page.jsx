"use client";

import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

export default function AboutTutor() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About Our Tutors
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Our platform connects students with highly qualified and experienced tutors.
            Each tutor is carefully verified to ensure quality education and personalized learning experience.
            We aim to make learning easy, flexible, and effective for everyone.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <FaGraduationCap className="text-blue-600 text-xl" />
              <span className="text-gray-700">Expert & Certified Tutors</span>
            </div>

            <div className="flex items-center gap-3">
              <FaChalkboardTeacher className="text-blue-600 text-xl" />
              <span className="text-gray-700">Interactive Online Teaching</span>
            </div>

            <div className="flex items-center gap-3">
              <FaBookOpen className="text-blue-600 text-xl" />
              <span className="text-gray-700">Personalized Learning Plans</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Tutor"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}