import React from "react";
import googleLogo from "../../images/icons8-google-1.svg"; 
import appleLogo from "../../images/icons8-apple-logo-1.svg"; 
import backgroundImg from "../../images/chris-lee-70l1tdai6rm-unsplash-1.png"; 
import logoImg from '../../images/logo.png';


export const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-md overflow-hidden rounded-lg w-[80%] max-w-5xl">
        {/* Left Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6">Get Started Now</h1>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {/* Terms & Conditions */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded-sm mr-2 focus:ring-red-500"
            />
            <label className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                terms & policy
              </a>
            </label>
          </div>
          {/* Create Account Button */}
          <button className="w-full py-2 bg-red-700 text-white font-semibold rounded-full mb-6 hover:bg-red-600">
            Create Account
          </button>
          {/* Or Divider */}
          <div className="flex items-center mb-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-sm">Or</span>
            <hr className="w-full border-gray-300" />
          </div>
          {/* Social Buttons */}
          <div className="flex justify-between mb-4">
            <button className="flex items-center justify-center w-[48%] py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>
            <button className="flex items-center justify-center w-[48%] py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <img src={appleLogo} alt="Apple" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sign in with Apple</span>
            </button>
          </div>
          {/* Sign In Link */}
          <p className="text-sm text-center">
            Have an account?{" "}
            <a href="#" className="text-blue-500 underline">
              Sign In
            </a>
          </p>
        </div>
        {/* Right Section */}
        <div className="w-1/2 relative">
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <img
            src={logoImg}
            alt="Logo"
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-36"
          />
        </div>
      </div>
    </div>
  );
};
