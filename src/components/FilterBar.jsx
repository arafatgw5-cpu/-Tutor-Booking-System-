"use client";
import React from "react";

const FilterBar = ({ 
  searchName, 
  setSearchName, 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate, 
  handleResetFilters 
}) => {
  return (
    <div className="mb-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-5 items-end transition-colors duration-300">
      
      {/* Search Tutor */}
      <div className="w-full flex-1">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Search Tutor
        </label>
        <input
          type="text"
          placeholder="Search tutor by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder-gray-400"
        />
      </div>

      {/* Start Date */}
      <div className="w-full flex-1">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
        />
      </div>

      {/* End Date */}
      <div className="w-full flex-1">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
        />
      </div>

      {/* Reset Filters Button */}
      <div className="w-full md:w-auto">
        <button
          onClick={handleResetFilters}
          className="w-full md:w-auto px-8 py-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm active:scale-95"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;