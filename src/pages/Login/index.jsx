import React from "react";
import backgroundImage from "../../images/Login.png"; 
import googleIcon from "../../images/google.png"; 
import appleIcon from '../../images/apple.jpg'; 

const Login = () => {
  return (
    <div className="bg-white flex justify-center items-center min-h-screen w-full">
      <div className="bg-white flex w-[90%] max-w-[1200px] overflow-hidden rounded-lg shadow-md">
        {/* Left Section */}
        <div className="flex flex-col justify-center w-1/2 p-10">
          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your Credentials to access your account
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex justify-between items-center">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700"
              />
              <a
                href="#"
                className="text-sm text-red-700 hover:underline ml-2"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded-sm mr-2"
            />
            <p className="text-sm">Remember for 30 days</p>
          </div>

          {/* Login Button */}
          <button className="w-full h-10 bg-red-700 text-white font-semibold rounded-full mb-6 hover:bg-red-800">
            Login
          </button>

          {/* Divider */}
          <div className="relative w-full flex items-center mb-6">
            <hr className="w-full border-gray-300" />
            <span className="absolute bg-white px-2 text-sm text-gray-500">Or</span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-between w-full mb-6">
            <button className="flex items-center justify-center w-[48%] h-10 border border-gray-300 rounded-md">
              <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>
            <button className="flex items-center justify-center w-[48%] h-10 border border-gray-300 rounded-md">
              <img src={appleIcon} alt="Apple" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sign in with Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 relative">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
            <h1 className="text-3xl font-bold text-red-700">AiUML</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
