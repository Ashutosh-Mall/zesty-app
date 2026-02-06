import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/contact", formData, {
        withCredentials: true,
      });
      setResponseMsg(res.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setResponseMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-orange-500">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or just want to say hello? Fill out the form below or reach out through our contact info.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">Email</h3>
            <p className="text-gray-300">support@zesty.com</p>
          </div>
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">Phone</h3>
            <p className="text-gray-300">+91 9876543210</p>
          </div>
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">Address</h3>
            <p className="text-gray-300">123 Zesty Street, Food City, India</p>
          </div>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-md p-10 rounded-xl max-w-3xl mx-auto shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:border-orange-500 h-32 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition"
            >
              Send Message
            </button>

            {responseMsg && <p className="text-center text-gray-300 mt-4">{responseMsg}</p>}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
