export default function Services() {
  const services = [
    {
      title: "Tutor Booking",
      desc: "Book tutors instantly based on availability and subject.",
    },
    {
      title: "Verified Tutors",
      desc: "All tutors are verified for quality and reliability.",
    },
    {
      title: "Flexible Scheduling",
      desc: "Choose time slots that fit your routine.",
    },
    {
      title: "Online & Offline Classes",
      desc: "Learn anytime, anywhere with flexible modes.",
    },
    {
      title: "Affordable Pricing",
      desc: "Find tutors that match your budget.",
    },
    {
      title: "Instant Support",
      desc: "Get quick help whenever you need assistance.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Our Services</h2>
        <p className="text-gray-500 mt-2">
          Everything you need for better learning experience
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}