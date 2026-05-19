import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Search Tutor",
      description: "Browse tutors by subject and availability."
    },
    {
      number: "02",
      title: "Select Slot",
      description: "Choose your preferred date and time."
    },
    {
      number: "03",
      title: "Book Session",
      description: "Confirm booking with one click."
    },
    {
      number: "04",
      title: "Start Learning",
      description: "Join your session and begin learning."
    }
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-serif tracking-wide">
          How It Works
        </h2>
        
        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
              {/* Blue Step Number */}
              <span className="text-[#1a56db] font-bold text-xl mb-3">
                {step.number}
              </span>
              
              {/* Card Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              
              {/* Card Description */}
              <p className="text-gray-500 text-sm leading-relaxed px-2">
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