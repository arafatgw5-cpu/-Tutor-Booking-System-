"use client";

import Image from "next/image";
import React from "react";
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

export default function AboutTutor() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 relative overflow-hidden bg-white">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন গ্লো */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 order-2 md:order-1">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              About Our <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">Tutors</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"></div>
          </div>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Our platform connects students with highly qualified and experienced tutors.
            Each tutor is carefully verified to ensure quality education and personalized learning experience.
            We aim to make learning easy, flexible, and effective for everyone.
          </p>

          {/* ফিচার লিস্ট বা কার্ড */}
          <div className="space-y-4 pt-2">
            {/* ফিচার ১ */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <FaGraduationCap className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg">Expert & Certified Tutors</h4>
                <p className="text-sm text-gray-500 mt-0.5">Learn from industry professionals and certified educators.</p>
              </div>
            </div>

            {/* ফিচার ২ */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <FaChalkboardTeacher className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg">Interactive Online Teaching</h4>
                <p className="text-sm text-gray-500 mt-0.5">Live sessions with advanced tools for hands-on learning.</p>
              </div>
            </div>

            {/* ফিচার ৩ */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <FaBookOpen className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg">Personalized Learning Plans</h4>
                <p className="text-sm text-gray-500 mt-0.5">Customized curriculum tailored to your unique speed and goals.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="flex justify-center order-1 md:order-2 relative group">
          {/* ছবির পেছনের ডেকোরেটিভ বর্ডার ও শ্যাডো */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-3xl rotate-3 scale-95 opacity-20 group-hover:rotate-6 transition-transform duration-500 ease-out"></div>
          
          <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
              alt="Tutor and Students"
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

      </div>
    </section>
  );
}