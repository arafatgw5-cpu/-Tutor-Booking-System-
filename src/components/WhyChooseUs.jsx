import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy Booking",
      description: "Book tutors instantly with a smooth and simple interface."
    },
    {
      title: "Verified Tutors",
      description: "All tutors are verified to ensure quality education."
    },
    {
      title: "Flexible Scheduling",
      description: "Choose time slots that fit your daily routine."
    },
    {
      title: "Affordable Pricing",
      description: "Find tutors that match your budget easily."
    }
  ];

  return (
    <section className="bg-[#fcfcfc] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-serif tracking-wide">
          Why Choose MediQueue?
        </h2>
        
        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed px-2">
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