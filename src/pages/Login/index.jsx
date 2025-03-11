import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";  // Use '../../' to go up two levels from 'pages' folder
import backgroundImage from "../../images/Login.png";
import googleIcon from "../../images/google.png";
import appleIcon from "../../images/apple.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  // Validation functions
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

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update errors
    switch (name) {
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
            : "Password must include uppercase, lowercase, number, and special character.",
        });
        break;
      default:
        break;
    }
    
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log("Login button clicked");
    if (validateEmail(formData.email) && validatePassword(formData.password)) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("User logged in:", userCredential.user);
        alert("Login successful!");
        navigate("/EnhancedEditor");
      } catch (err) {
        console.error("Firebase Error Code:", err.code);
      console.error("Firebase Error Message:", err.message);

      switch (err.code) {
        case "auth/user-not-found":
          setErrors({ ...errors, email: "No user found with this email." });
          break;
        case "auth/wrong-password":
          setErrors({ ...errors, password: "Incorrect password." });
          break;
        case "auth/invalid-email":
          setErrors({ ...errors, email: "Invalid email format." });
          break;
        case "auth/too-many-requests":
          alert("Too many login attempts. Please try again later.");
          break;
        default:
          alert("Login failed. Please try again.");
          break;
        setErrors(err.message);
      }
    }
      
    } else {
      alert("Please fix the errors before submitting.");
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

  const handleModalAgree = () => {
    if (isAgreed) {
      alert("Sign-in successful!");
      navigate("/EnhancedEditor");
      setShowModal(false);
    } else {
      alert("You must agree to the terms and conditions to continue.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsAgreed(false);
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen w-full">
      <div className="bg-white flex w-[90%] max-w-[1200px] overflow-hidden rounded-lg shadow-md">
        {/* Left Section */}
        <div className="flex flex-col justify-center w-1/2 p-10">
          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your Credentials to access your account
          </p>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="flex justify-between items-center">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
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
            <button
              type="submit"
              className="w-full h-10 bg-red-700 text-white font-semibold rounded-full mb-6 hover:bg-red-800"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative w-full flex items-center mb-6">
            <hr className="w-full border-gray-300" />
            <span className="absolute bg-white px-2 text-sm text-gray-500">Or</span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-between w-full mb-6">
            <button
              onClick={() => handleSignInClick("google")}
              className="flex items-center justify-center w-[48%] h-10 border border-gray-300 rounded-md"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>
            <button
              onClick={() => handleSignInClick("apple")}
              className="flex items-center justify-center w-[48%] h-10 border border-gray-300 rounded-md"
            >
              <img src={appleIcon} alt="Apple" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Sign in with Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/signup")}
              className="text-blue-500 underline"
            >
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{modalContent}</h2>
            <p className="text-sm text-gray-600 mb-6">
              By continuing, you agree to the terms and conditions of using this application.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded-sm mr-2"
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

export default Login;
