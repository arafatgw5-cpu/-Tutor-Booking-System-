"use client"; // <-- Add this line at the very top!

import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Main Container - Card Style */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row items-center justify-between p-8 sm:p-12 gap-10">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight font-serif">
              Get the latest news!
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Subscribe to our newsletter and stay updated. We promise not to spam your inbox, only good vibes and great updates.
            </p>
          </div>

          {/* Right Side: Input Form */}
          <div className="w-full lg:w-1/2">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                // Add your actual subscription logic here later
                alert('Thank you for subscribing!');
              }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto lg:mx-0"
            >
              {/* Input Field with Icon */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg 
                    className="h-5 w-5 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#00bfa5] focus:ring-4 focus:ring-[#00bfa5]/10 transition-all duration-300"
                  required
                />
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#00bfa5] hover:bg-[#00a690] active:bg-[#008f7a] text-white font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
              >
                SIGN UP
              </button>
            </form>
            
            {/* Privacy Note */}
            <p className="text-xs text-gray-400 mt-4 text-center lg:text-left">
              We care about your data. Read our{' '}
              <a href="#" className="underline hover:text-gray-600 transition-colors">
                Privacy Policy
              </a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;