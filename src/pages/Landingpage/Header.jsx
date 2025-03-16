import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import Illustration from '../../images/Illustration.png';
import Switch from '../../components/DayNight';

const Header = ({ setIsDark }) => {
  return (
    <div className="bg-white dark:bg-gray-900 w-full text-black dark:text-white">
      {/* Navigation Header */}
      <header className="shadow-md sticky top-0 z-50 w-full bg-white dark:bg-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-4 space-y-4 md:space-y-0">
          {/* Logo & Day/Night Toggle */}
          <div className="flex items-center space-x-3 flex-wrap sm:flex-nowrap">

            <img src={logo} alt="AiUML Logo" className="w-36 h-auto" />
            <Switch setIsDark={setIsDark} />
          </div>

          {/* Navigation + Login */}
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-6 text-lg font-medium">
              <a href="#home" className="hover:text-red-700">Home</a>
              <a href="#about" className="hover:text-red-700">About us</a>
              <Link to="/Features" className="hover:text-red-700">Features</Link>
              <a href="#contact" className="hover:text-red-700">Contact</a>
              <Link to="/signup" className="hover:text-red-700">SignUp</Link>
            </nav>
            <Link
              to="/login"
              className="bg-red-700 text-white px-5 py-2 text-lg rounded-full font-semibold hover:bg-gray-800"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-light-blue dark:bg-gray-700 rounded-br-[200px] overflow-hidden w-full"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 py-16 md:py-24 gap-10 md:gap-16 lg:gap-20 w-full">
          {/* Text Content */}
          <div className="lg:w-1/2 text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-red-700 mb-6 leading-tight">

              AI Powered
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-8">

              Automated Generation of UML Diagrams.
            </h2>
            <p className="text-base sm:text-lg md:text-xl xl:text-2xl mb-10 leading-relaxed">

              Enjoy and streamline your software development with our AI-driven tool that
              automatically generates precise UML diagrams from textual requirements,
              enhancing accuracy and efficiency in system design.
            </p>
            <Link
              to="/EnhancedEditor"
              className="inline-block bg-red-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-800 text-base sm:text-lg md:text-xl"

            >
              Get Started <span className="ml-2">✨</span>
            </Link>
          </div>

          {/* Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={Illustration}
              alt="UML Illustration"
              className="w-full max-w-[600px] h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
