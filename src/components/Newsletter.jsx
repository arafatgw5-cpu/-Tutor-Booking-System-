"use client"; // <-- Add this line at the very top!

import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-serif">
            Get the latest news!
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
            cupiditate quae nam molestias.
          </p>
        </div>

        {/* Right Side: Input Form */}
        <div className="w-full md:w-1/2">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // Add your actual subscription logic here later
            }}
            className="flex w-full border border-gray-200 bg-white shadow-sm"
          >
            <input
              type="email"
              placeholder="john@rhcp.com"
              className="flex-grow py-4 px-4 text-gray-700 outline-none placeholder-gray-400 bg-transparent"
              required
            />
            <button
              type="submit"
              className="bg-[#00bfa5] hover:bg-[#00a690] text-white font-semibold py-4 px-8 transition-colors duration-300 whitespace-nowrap"
            >
              SIGN UP
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;