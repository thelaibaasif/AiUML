import React from 'react';

const Header = () => {
    return (
      <div className="bg-light-blue min-h-screen">
        {/* Header Section */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-8 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/path-to-logo.png" // Replace with the actual logo path
                alt="AiUML Logo"
                className="w-10 h-10"
              />
              <h1 className="text-lg font-bold text-red-700">AiUML</h1>
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
              <a href="#signup" className="text-gray-600 hover:text-red-700">
                SignUp
              </a>
            </nav>
  
            {/* Login Button */}
            <a
              href="/login"
              className="bg-red-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-800"
            >
              Login
            </a>
          </div>
        </header>
  
        {/* Hero Section */}
        <section className="container mx-auto px-8 py-16 flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              AI Powered
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Automated Generation of UML Diagrams.
            </h2>
            <p className="text-gray-600 mb-8">
              Enjoy and streamline your software development with our AI-driven
              tool that automatically generates precise UML diagrams from textual
              requirements, enhancing accuracy and efficiency in system design.
            </p>
            <button className="bg-red-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-800">
              Get Started <span className="ml-2">➡</span>
            </button>
          </div>
  
          {/* Illustration */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img
              src="/path-to-uml-image.png" // Replace with the actual image path
              alt="UML Illustration"
              className="w-full h-auto"
            />
          </div>
        </section>
      </div>
    );
  };
  export default Header;