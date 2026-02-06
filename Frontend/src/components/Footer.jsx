import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-orange-500 font-serif">
            Zesty
          </h2>
          <p className="mt-4 text-orange-100 text-sm leading-relaxed">
            Delivering fresh, hot meals straight to your door. Fast, reliable,
            and always delicious.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-orange-100 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Home</li>
            <li className="hover:text-orange-400 cursor-pointer">Menu</li>
            <li className="hover:text-orange-400 cursor-pointer">Offers</li>
            <li className="hover:text-orange-400 cursor-pointer">Reviews</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-orange-100 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-orange-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-orange-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 text-orange-100">
            <span className="hover:text-orange-400 cursor-pointer">
              Instagram
            </span>
            <span className="hover:text-orange-400 cursor-pointer">
              Twitter
            </span>
            <span className="hover:text-orange-400 cursor-pointer">
              Facebook
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-orange-100 text-sm">
        © {new Date().getFullYear()} Zesty. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
