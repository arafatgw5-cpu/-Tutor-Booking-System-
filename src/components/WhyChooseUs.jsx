import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy Booking",
      description: "Book tutors instantly with a smooth, effortless and simple user interface.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Verified Tutors",
      description: "All tutors undergo a strict verification process to ensure premium quality education.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Flexible Scheduling",
      description: "Choose optimal time slots that seamlessly fit into your busy daily routine.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Affordable Pricing",
      description: "Find top-tier competitive tutors that perfectly match your budget easily.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative bg-gray-50/50 dark:bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট লাইট (Silicon Valley Vibe - Dark Mode Compatible) */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-30 dark:opacity-40 pointer-events-none transition-colors duration-300"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-30 dark:opacity-40 pointer-events-none transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* হেডিং সেকশন */}
        <div className="text-center mb-20 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-md mx-auto transition-colors duration-300">
            We provide the ultimate platform for seamless, secure, and smart learning experiences.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 dark:from-teal-400 dark:to-emerald-300 mx-auto rounded-full mt-2"></div>
        </div>
        
        {/* কার্ডস গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 border border-gray-100/80 dark:border-slate-800/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm dark:shadow-[0_2px_15px_rgba(0,0,0,0.1)] hover:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out group"
            >
              {/* মডার্ন আইকন বক্স */}
              <div className="w-14 h-14 bg-emerald-50 dark:bg-teal-500/10 text-emerald-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-emerald-500 group-hover:text-white dark:group-hover:text-white transition-all duration-500 ease-out shadow-sm shadow-emerald-100 dark:shadow-none group-hover:rotate-6">
                {feature.icon}
              </div>
              
              {/* ফিচার টাইটেল */}
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* বর্ণনা */}
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed px-1 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;