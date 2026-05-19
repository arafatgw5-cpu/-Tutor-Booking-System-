import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Search Tutor",
      description: "Browse experienced tutors by subject, institution, and availability.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Select Slot",
      description: "Choose your preferred schedule that matches perfectly with yours.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Book Session",
      description: "Confirm your booking instantly with just a single click.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Start Learning",
      description: "Join your interactive session and accelerate your skills.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন গ্লো (Silicon Valley Tech Vibe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative">
        
        {/* হেডিং সেকশন */}
        <div className="text-center mb-20 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Get started in minutes with our simple, transparent four-step process.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 mx-auto rounded-full mt-2"></div>
        </div>
        
        {/* কার্ডস গ্রিড কন্টেইনার */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* কানেক্টিং লাইন (শুধুমাত্র বড় স্ক্রিনের জন্য) */}
          <div className="hidden lg:block absolute top-1/4 left-[10%] right-[10%] h-[2px] bg-dashed bg-gradient-to-r from-teal-100 via-emerald-200 to-teal-100 -z-10 border-t-2 border-dashed border-teal-100"></div>

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out group relative"
            >
              {/* স্টেপ নাম্বার ব্যাজ */}
              <span className="absolute top-4 right-5 text-xs font-black text-teal-200 group-hover:text-teal-400 transition-colors duration-300 tracking-widest">
                {step.number}
              </span>

              {/* আইকন বক্স */}
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-emerald-500 group-hover:text-white transition-all duration-500 ease-out shadow-sm shadow-teal-100">
                {step.icon}
              </div>
              
              {/* কার্ড টাইটেল */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                {step.title}
              </h3>
              
              {/* বর্ণনা */}
              <p className="text-gray-500 text-sm leading-relaxed px-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;