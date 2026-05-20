"use client";

import React, { useState } from "react";
import { FiMapPin, FiMail, FiPhone, FiSend } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 relative overflow-hidden bg-white">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন গ্লো */}
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-60 -z-10 animate-blob"></div>
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-60 -z-10 animate-blob animation-delay-2000"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Info Column */}
        <div className="space-y-6 order-2 md:order-1">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Get In <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"></div>
          </div>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Have any questions about tutors or booking sessions? Feel free to reach out. 
            Our dedicated team usually replies within 24 hours.
          </p>

          {/* কন্টাক্ট ইনফো কার্ডস */}
          <div className="space-y-4 pt-4">
            {/* ঠিকানা */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="p-3.5 bg-teal-50 text-teal-600 rounded-xl">
                <FiMapPin className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Our Location</p>
                <p className="text-gray-700 font-bold mt-0.5">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* ইমেইল */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="p-3.5 bg-teal-50 text-teal-600 rounded-xl">
                <FiMail className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</p>
                <p className="text-gray-700 font-bold mt-0.5">support@mediqueue.com</p>
              </div>
            </div>

            {/* ফোন */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="p-3.5 bg-teal-50 text-teal-600 rounded-xl">
                <FiPhone className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call Us</p>
                <p className="text-gray-700 font-bold mt-0.5">+880 1XXXXXXXXX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="order-1 md:order-2 relative group">
          {/* ফর্মের পেছনের ডেকোরেটিভ বর্ডার গ্লো */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-3xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500"></div>
          
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-5"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">Send us a Message</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Message</label>
              <textarea
                name="message"
                placeholder="Type your question or feedback here..."
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-teal-100 hover:shadow-lg active:scale-[0.98] cursor-pointer text-center"
            >
              <FiSend className="text-base" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}