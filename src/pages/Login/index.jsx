import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import backgroundImage from "../../images/Login.png";
import googleIcon from "../../images/google.png";
import appleIcon from "../../images/apple.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@$!%*?&]/.test(password);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) ? "" : "Invalid email format." });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value)
          ? ""
          : "Password must include uppercase, lowercase, number, and special character.",
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    if (validateEmail(formData.email) && validatePassword(formData.password)) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        const user = userCredential.user;
        console.log("User logged in:", user);

        console.log("User logged in:", userCredential.user);
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User data from Firestore:", userData);

          sessionStorage.setItem("user", JSON.stringify(userData));

        alert(`Welcome back, ${userData.name}!`);
        }
        alert("Login successful!");
        navigate("/EnhancedEditor");
      } catch (err) {
        alert("Authentication failed: " + err.message);
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
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-[90%] md:w-full max-w-5xl h-auto md:h-[95%] shadow-md border rounded-lg overflow-hidden">

        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">

          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-sm text-gray-600 mb-4">
            Enter your Credentials to access your account
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="text-sm font-medium">Email address</label>
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

            <div className="mb-4">
              <label className="text-sm font-medium">Password</label>
              <div className="flex justify-between items-center">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700"
                />
                <a href="#" className="text-sm text-red-700 hover:underline ml-2">
                  Forgot?
                </a>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span className="text-sm">Remember for 30 days</span>
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-red-700 text-white rounded-full hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleSignInClick("google")}
              className="flex items-center justify-center w-1/2 h-10 border border-gray-300 rounded-md"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm">Google</span>
            </button>
            <button
              onClick={() => handleSignInClick("apple")}
              className="flex items-center justify-center w-1/2 h-10 border border-gray-300 rounded-md"
            >
              <img src={appleIcon} alt="Apple" className="w-5 h-5 mr-2" />
              <span className="text-sm">Apple</span>
            </button>
          </div>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/signup")}
              className="text-blue-600 underline"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2 relative">

          <img
            src={backgroundImage}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold text-red-700">AiUML</h1>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-[90%]">
            <h2 className="text-lg font-semibold mb-2">{modalContent}</h2>
            <p className="text-sm text-gray-600 mb-4">
              By continuing, you agree to our terms and conditions.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2"
                onChange={() => setIsAgreed(!isAgreed)}
              />
              <label className="text-sm">I agree to the terms</label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 border rounded-md text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleModalAgree}
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600"
              >
                Agree & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
