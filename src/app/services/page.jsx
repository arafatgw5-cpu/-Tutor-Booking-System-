export default function Services() {
  const services = [
    {
      title: "Tutor Booking",
      desc: "Book tutors instantly based on availability, subject, and your learning goals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
    },
    {
      title: "Verified Tutors",
      desc: "Every tutor is background-checked, certified, and rated by real students.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Flexible Scheduling",
      desc: "Choose time slots that perfectly match your daily routine and pace.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: "Online & Offline Classes",
      desc: "Learn anywhere with seamless video sessions or in-person meetups.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="10" x="2" y="3" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      ),
    },
    {
      title: "Affordable Pricing",
      desc: "Transparent pricing with plans that fit every student's budget.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Instant Support",
      desc: "24/7 dedicated help desk to resolve queries or reschedule classes quickly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-4 bg-gray-50 min-h-screen flex justify-center items-center font-sans">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6 shadow-md shadow-teal-600/20 transform hover:scale-105 transition-transform duration-300">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Premium Learning Services
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need for a seamless, effective, and personalized learning experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className="group relative p-[2px] rounded-[1.5rem] bg-gradient-to-b from-gray-200 to-gray-100 hover:from-teal-400 hover:to-teal-600 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            >
              {/* Card Inner Content */}
              <div className="bg-white rounded-[1.4rem] p-8 h-full relative overflow-hidden z-10 flex flex-col justify-start">
                
                {/* Subtle Teal Background Glow on Hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon Wrapper with Teal Gradient */}
                <div className="relative z-20 flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-600/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out">
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="relative z-20">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base group-hover:text-gray-600 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}