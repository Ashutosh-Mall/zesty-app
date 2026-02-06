import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-orange-500">
            About Zesty
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Zesty is an innovative food delivery platform connecting food
            lovers, restaurant owners, and delivery partners with speed,
            reliability, and delight. Our goal is to make food ordering
            effortless, accessible, and enjoyable for everyone.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800/70 backdrop-blur-md p-8 rounded-xl text-center hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">
              Mission
            </h3>
            <p className="text-gray-300 text-base sm:text-lg">
              To make food delivery simple, fast, and delightful for everyone.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-md p-8 rounded-xl text-center hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">
              Vision
            </h3>
            <p className="text-gray-300 text-base sm:text-lg">
              To become the most trusted and loved food delivery platform
              worldwide.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-md p-8 rounded-xl text-center hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">
              Values
            </h3>
            <p className="text-gray-300 text-base sm:text-lg">
              Quality, speed, trust, and customer delight are at the core of
              everything we do.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-orange-500">
            Why Choose Zesty?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Fast Delivery",
                desc: "Get your food delivered hot and fresh in record time.",
              },
              {
                title: "Trusted Partners",
                desc: "We collaborate only with verified restaurants and delivery partners.",
              },
              {
                title: "Easy to Use",
                desc: "Our platform is designed for a seamless experience on web and mobile.",
              },
              {
                title: "Customer Support",
                desc: "24/7 support to assist you with your orders and queries.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition transform"
              >
                <h3 className="text-xl font-semibold mb-2 text-orange-500">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-orange-500">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                name: "Alice Johnson",
                role: "Founder & CEO",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Mark Smith",
                role: "CTO",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Sophie Lee",
                role: "Head of Operations",
                img: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "John Doe",
                role: "Lead Designer",
                img: "https://randomuser.me/api/portraits/men/12.jpg",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition transform"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-2 border-orange-500"
                />
                <h3 className="text-xl font-semibold text-orange-500">
                  {member.name}
                </h3>
                <p className="text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
