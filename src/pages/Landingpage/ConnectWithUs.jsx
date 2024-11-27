import React from "react";
import { FaFacebookF, FaInstagram, FaDribbble, FaDiscord } from "react-icons/fa";

const ConnectWithUs = () => {
  return (
    <section className="connect-with-us py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-red-700 text-2xl font-bold mb-4">Connect with us</h2>
          <p className="text-gray-700 mb-6">
            We're here to help and eager to hear from you! Whether you have a question, want
            to learn more about our services, or are interested in collaborating, feel free to
            reach out. Join us on our social platforms for the latest updates, insights, and
            behind-the-scenes content. Let's stay connected!
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 text-2xl text-gray-600">
            <a href="#" aria-label="Discord" className="hover:text-red-700">
              <FaDiscord />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-red-700">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Dribbble" className="hover:text-red-700">
              <FaDribbble />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-red-700">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <form className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Type your message here"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
