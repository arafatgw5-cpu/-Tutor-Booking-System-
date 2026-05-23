"use client";

import React from 'react';

const Newsletter = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট গ্লো ইফেক্ট (ডার্ক মোডেও মানানসই করা হয়েছে) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-teal-50 dark:bg-teal-900/20 rounded-full blur-3xl opacity-60 dark:opacity-40 -z-10 animate-blob transition-colors duration-300"></div>
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-60 dark:opacity-40 -z-10 animate-blob animation-delay-2000 transition-colors duration-300"></div>

      <div className="max-w-5xl mx-auto relative">
        {/* মেইন কার্ড কন্টেইনার */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl dark:shadow-2xl dark:shadow-teal-900/10 border border-gray-100/80 dark:border-slate-800 p-8 sm:p-12 lg:p-16 relative overflow-hidden group transition-colors duration-300">
          
          {/* কার্ডের ভিতরের ডানদিকের হালকা গ্রেডিয়েন্ট সার্কেল */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full opacity-50 -z-10 group-hover:scale-110 transition-transform duration-700"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* বাম পাশ: টেক্সট কন্টেন্ট */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight transition-colors duration-300">
                Get the latest news!
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 transition-colors duration-300">
                Subscribe to our newsletter and stay updated. We promise not to spam your inbox—only good vibes and great updates.
              </p>
            </div>

            {/* ডান পাশ: ইনপুট ফর্ম */}
            <div className="w-full lg:w-1/2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing!');
                }}
                className="flex flex-col sm:flex-row gap-3.5 w-full max-w-md mx-auto lg:mx-0"
              >
                {/* ইনপুট ফিল্ড উইথ আইকন */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg 
                      className="h-5 w-5 text-teal-500/70 dark:text-teal-400/80 transition-colors duration-300" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full py-4 pl-12 pr-4 text-gray-700 dark:text-white bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 rounded-2xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10 dark:focus:ring-teal-400/10 transition-all duration-300 placeholder-gray-400 dark:placeholder-slate-500 font-medium shadow-inner dark:shadow-none"
                    required
                  />
                </div>
                
                {/* সাবমিট বাটন */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 dark:from-teal-500 dark:to-emerald-500 dark:hover:from-teal-400 dark:hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-2xl shadow-md hover:shadow-teal-100 dark:hover:shadow-teal-900/40 hover:shadow-xl active:scale-[0.98] transition-all duration-300 flex-shrink-0 cursor-pointer tracking-wide uppercase text-sm"
                >
                  Sign Up
                </button>
              </form>
               
              {/* প্রাইভেসি নোট */}
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-4 text-center lg:text-left tracking-wide transition-colors duration-300">
                We care about your data. Read our{' '}
                <a href="#" className="underline hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
                  Privacy Policy
                </a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;