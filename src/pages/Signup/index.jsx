import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";  // Use '../../' to go up two levels from 'pages' folder
import googleLogo from "../../images/icons8-google-1.svg";
import appleLogo from "../../images/icons8-apple-logo-1.svg";
import backgroundImg from "../../images/chris-lee-70l1tdai6rm-unsplash-1.png";
import logoImg from "../../images/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isAgreed, setIsAgreed] = useState(false); // Add this state

  const validateName = (name) => name.trim().length > 2;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[@$!%*?&]/.test(password)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "name":
        setErrors({
          ...errors,
          name: validateName(value) ? "" : "Name must be at least 3 characters.",
        });
        break;
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Invalid email format.",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value)
            ? ""
            : "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      validateName(formData.name) &&
      validateEmail(formData.email) &&
      validatePassword(formData.password)
    ) {
      alert("Account created successfully!");
    } else {
      alert("Please fix the errors in the form before submitting.");
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Signup successful!");
      navigate("/EnhancedEditor");
    } catch (err) {
      setErrors(err.message);
    }

  };

  const handleSignInClick = (type) => {
    setModalContent(
      type === "google"
        ? "Allow Google to sign you in to this app."
        : "Allow Apple to sign you in to this app."
    );
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsAgreed(false); // Reset the checkbox when modal is closed
  };

  const handleModalAgree = () => {
    if (isAgreed) {
      setShowModal(false);
      alert("You have successfully signed in!");
    } else {
      alert("You must agree to the terms and conditions to continue.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-md overflow-hidden rounded-lg w-[90%] max-w-5xl">
        {/* Left Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Get Started Now</h1>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            {/* Terms & Conditions */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                required
                className="w-4 h-4 border-gray-300 rounded-sm mr-2 focus:ring-red-700"
              />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-500 underline">
                  terms & policy
                </a>
              </label>
            </div>
            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-2 bg-red-700 text-white font-semibold rounded-full mb-6 hover:bg-red-600"
            >
              Create Account
            </button>
          </form>
          {/* Or Divider */}
          <div className="flex items-center mb-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-sm text-gray-600">Or</span>
            <hr className="w-full border-gray-300" />
          </div>
          {/* Social Buttons */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleSignInClick("google")}
              className="flex items-center justify-center w-[48%] py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-gray-600">
                Sign in with Google
              </span>
            </button>
            <button
              onClick={() => handleSignInClick("apple")}
              className="flex items-center justify-center w-[48%] py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <img src={appleLogo} alt="Apple" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-gray-600">
                Sign in with Apple
              </span>
            </button>
          </div>
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
            className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20"
          />
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {modalContent}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              By continuing, you agree to the terms and conditions of using this application. Please ensure you read and accept our{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded-sm mr-2 focus:ring-red-700"
                onChange={() => setIsAgreed(!isAgreed)}
              />
              <label className="text-sm text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleModalClose}
                className="py-2 px-4 border rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleModalAgree}
                className="py-2 px-4 bg-red-700 text-white rounded-md hover:bg-red-600"
              >
                Agree and Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
