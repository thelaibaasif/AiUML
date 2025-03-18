import React from "react";
import { FaFacebookF, FaInstagram, FaDribbble, FaDiscord } from "react-icons/fa";

const ConnectWithUs = () => {
  return (
    
      <section className="connect-with-us py-16 px-4 bg-white dark:bg-gray-600 dark:text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-red-700 text-5xl font-bold mb-4">Connect with us</h2>
            <p className="dark:text-white text-gray-700 leading-relaxed mb-6">
              We're here to help and eager to hear from you! Whether you have a question, want
              to learn more about our services, or are interested in collaborating, feel free to
              reach out. Join us on our social platforms for the latest updates, insights, and
              behind-the-scenes content. Let's stay connected!
            </p>
            {/* Social Icons */}
            <div className="flex gap-6 text-2xl text-gray-600 dark:bg-gray-800">
              <a href="#" aria-label="Discord" className="hover:text-red-700 transition">
                <FaDiscord />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-red-700 transition">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Dribbble" className="hover:text-red-700 transition">
                <FaDribbble />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-red-700 transition">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <form className="dark:bg-gray-500 dark:text-white bg-gray-100 p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="dark:bg-gray-600 dark:text-white w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="dark:bg-gray-600 dark:text-white w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>
              <div className="mb-6">
                <textarea
                  placeholder="Type your message here"
                  rows="4"
                  className="dark:bg-gray-600 dark:text-white w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
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
