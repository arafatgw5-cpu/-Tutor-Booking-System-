"use client";

import React from "react";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-gray-950 text-slate-600 dark:text-gray-400 pt-16 pb-8 relative overflow-hidden border-t border-slate-200 dark:border-gray-900 transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন গ্লো */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/50 dark:bg-teal-900/10 rounded-full blur-3xl opacity-50 -z-10 transition-colors duration-300"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50 -z-10 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* টপ সেকশন: ৪টি কলাম গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* কলাম ১: ব্র্যান্ড ইনফো */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                Medi<span className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">Queue</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-gray-500 transition-colors duration-300">
              Connecting eager learners with expert tutors. We make finding and booking personalized education simple, flexible, and efficient.
            </p>
            {/* সোশ্যাল আইকনস */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 bg-white dark:bg-gray-900 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-400 dark:text-gray-400 hover:text-white dark:hover:text-white rounded-xl transition-all duration-300 shadow-sm border border-slate-100 dark:border-transparent">
                <FiFacebook className="text-base" />
              </a>
              <a href="#" className="p-2.5 bg-white dark:bg-gray-900 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-400 dark:text-gray-400 hover:text-white dark:hover:text-white rounded-xl transition-all duration-300 shadow-sm border border-slate-100 dark:border-transparent">
                <FiTwitter className="text-base" />
              </a>
              <a href="#" className="p-2.5 bg-white dark:bg-gray-900 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-400 dark:text-gray-400 hover:text-white dark:hover:text-white rounded-xl transition-all duration-300 shadow-sm border border-slate-100 dark:border-transparent">
                <FiInstagram className="text-base" />
              </a>
              <a href="#" className="p-2.5 bg-white dark:bg-gray-900 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-400 dark:text-gray-400 hover:text-white dark:hover:text-white rounded-xl transition-all duration-300 shadow-sm border border-slate-100 dark:border-transparent">
                <FiLinkedin className="text-base" />
              </a>
            </div>
          </div>

          {/* কলাম ২: কুইক লিংকস */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider transition-colors duration-300">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-gray-400">
              <li>
                <Link href="/tutors" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 block py-0.5">Find Tutors</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 block py-0.5">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 block py-0.5">Contact Us</Link>
              </li>
              <li>
                <Link href="/become-tutor" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 block py-0.5">Join as a Tutor</Link>
              </li>
            </ul>
          </div>

          {/* কলাম ৩: কন্টাক্ট ইনফো */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider transition-colors duration-300">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-teal-600 dark:text-teal-400 text-base mt-0.5 flex-shrink-0 transition-colors duration-300" />
                <span className="text-slate-500 dark:text-gray-500 transition-colors duration-300">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-teal-600 dark:text-teal-400 text-base flex-shrink-0 transition-colors duration-300" />
                <span className="text-slate-500 dark:text-gray-500 transition-colors duration-300">support@mediqueue.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-teal-600 dark:text-teal-400 text-base flex-shrink-0 transition-colors duration-300" />
                <span className="text-slate-500 dark:text-gray-500 transition-colors duration-300">+880 1XXXXXXXXX</span>
              </li>
            </ul>
          </div>

          {/* কলাম ৪: নিউজলেটার সাবস্ক্রিপশন */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider transition-colors duration-300">Newsletter</h4>
            <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed transition-colors duration-300">
              Subscribe to get latest updates, offers and educational resources.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl text-sm text-slate-800 dark:text-gray-300 placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/10 transition-all"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 dark:from-teal-500 dark:to-emerald-500 dark:hover:from-teal-400 dark:hover:to-emerald-400 text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* বটম সেকশন: কপিরাইট ও লিগ্যাল */}
        <div className="pt-8 border-t border-slate-200 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-gray-600 transition-colors duration-300">
          <p>© {new Date().getFullYear()} MediQueue. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-600 dark:hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600 dark:hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}