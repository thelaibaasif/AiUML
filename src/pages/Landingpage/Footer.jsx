import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4 sm:px-8">

<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Contact Section */}
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> AiUML@gmail.com
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2" /> +92 1234567890
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Islamabad, Pakistan
            </li>
          </ul>
        </div>

        {/* Navigation Section */}
        <div>
          <h4 className="font-bold mb-4">Home</h4>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Our Diagrams</li>
            <li>Our Customers</li>
            <li>Our FAQ</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">About Us</h4>
          <ul className="space-y-2">
            <li>Company</li>
            <li>Achievements</li>
            <li>Our Goals</li>
          </ul>
        </div>

        {/* Social Profiles Section */}
        <div>
          <h4 className="font-bold mb-4">Social Profiles</h4>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-gray-200 rounded-full">
              <FaFacebook />
            </a>
            <a href="#" className="p-2 bg-gray-200 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-200 rounded-full">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="text-center border-t border-gray-300 mt-8 pt-4 text-sm">
        © 2024 AiUML. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
