import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import Illustration from "../../images/Illustration.png";

const Header = () => {
  return (
    <div className="bg-light-blue">
      {/* Header Section */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AiUML Logo"
              className="w-14 h-14"
            />
            <h1 className="text-2xl font-bold text-red-700">AiUML</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-600 hover:text-red-700">
              Home
            </a>
            <a href="#about" className="text-gray-600 hover:text-red-700">
              About us
            </a>
            <a href="#features" className="text-gray-600 hover:text-red-700">
              Features
            </a>
            <a href="#contact" className="text-gray-600 hover:text-red-700">
              Contact
            </a>
            <Link to="/signup" className="text-gray-600 hover:text-red-700">
              SignUp
            </Link>
          </nav>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-red-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-800"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative">
        <div className="container mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center max-w-7xl">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-red-700 mb-4">
              AI Powered
            </h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Automated Generation of UML Diagrams.
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Enjoy and streamline your software development with our AI-driven
              tool that automatically generates precise UML diagrams from textual
              requirements, enhancing accuracy and efficiency in system design.
            </p>
            <button className="bg-red-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-800 text-lg">
              Get Started <span className="ml-2">➡</span>
            </button>
          </div>

          {/* Illustration */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img
              src={Illustration}
              alt="UML Illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 right-0 left-0 bg-light-blue transform translate-y-1/2 rounded-t-[100px] lg:rounded-t-[200px] "></div>
      </section>
    </div>
  );
};

export default Header;
