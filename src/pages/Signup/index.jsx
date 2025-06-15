import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { ref, push, set } from "firebase/database";
import {  realTimeDb } from "../../firebase";
import googleLogo from "../../images/icons8-google-1.svg";
import appleLogo from "../../images/icons8-apple-logo-1.svg";
import backgroundImg from "../../images/chris-lee-70l1tdai6rm-unsplash-1.png";
import logoImg from "../../images/logo.png";
import GoBack from "../../components/GoBack";

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
  const [isAgreed, setIsAgreed] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const newSessionId = useRef(null);
  const newChatId = useRef(null);
  const [isGuest, setIsGuest] = useState(false);

  const validateName = (name) => name.trim().length > 2;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@$!%*?&]/.test(password);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "name":
        setErrors({ ...errors, name: validateName(value) ? "" : "Name must be at least 3 characters." });
        break;
      case "email":
        setErrors({ ...errors, email: validateEmail(value) ? "" : "Invalid email format." });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value)
            ? ""
            : "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateName(formData.name) && validateEmail(formData.email) && validatePassword(formData.password)) {
      try {
        console.log("Attempting to create user...");
        const userCredentials = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  
        const user = userCredentials.user;
        console.log("User created:", user);
  
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date()
        });
  
  
        console.log("User registered with UID:", user.uid);
  
        // Creating session for storage in realtime db
        createSession(); 
  
        alert("Signup successful!");
        navigate("/EnhancedEditor");
  
      } catch (err) {
        console.error("Signup failed:", err.message);
        alert(err.message);
      }
  
    } else {
      alert("Please fix the errors before submitting.");
    }

   
  };

  // Function for session creation in rrealtime db
    const createSession = async () => {
      console.log("Removing guest session if exists...");
      setIsGuest(false);
      sessionStorage.removeItem("isGuest");
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("chatId");
      console.log("Creating Session...");
      const user = auth.currentUser;
      if (user) {
        console.log("User ID:", user.uid);
        const sessionRef = push(ref(realTimeDb, `chats/${user.uid}`)); // Create a new session reference
        console.log("Session Ref:", sessionRef);
        
        await set(sessionRef, { createdAt: Date.now() })
          .then(async () => {
            console.log("Session Created:", sessionRef.key);
            newSessionId.current = sessionRef.key;
            setSessionId(newSessionId.current);
            console.log("New Session ID Set:", newSessionId.current);
            // Storing the session id in storage for use in editor page through get function
            sessionStorage.setItem("sessionId", newSessionId.current);

            await createChat(newSessionId.current);
          })
          .catch((error) => console.error("Error setting session data:", error));
      } else {
        console.log("User not logged in.");
      }
    };

    // Creating/ Initializing the chat node under newly created session
    const createChat = async (sessionId) => {
      console.log("Creating Chat...");
      const user = auth.currentUser;
      if (user && sessionId) {
        const chatRef = push(ref(realTimeDb, `chats/${user.uid}/${sessionId}`));
        
        await set(chatRef, { createdAt: Date.now() })
          .then(() => {
            console.log("Chat Created:", chatRef.key);
            newChatId.current = chatRef.key;
            setChatId(newChatId.current);
            console.log("New Chat ID Set:", newChatId.current);
            // Storing the chat id in storage for use in editor page through get function
            sessionStorage.setItem("chatId", newChatId.current);
          })
          .catch((error) => console.error("Error setting chat data:", error));
      } else {
        console.log("User/session info missing");
      }
    };

  const handleSignInClick = (type) => {
    setModalContent(type === "google" ? "Allow Google to sign you in to this app." : "Allow Apple to sign you in to this app.");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsAgreed(false);
  };

  const handleModalAgree = () => {
    if (isAgreed) {
      alert("You have successfully signed in!");
      setShowModal(false);
    } else {
      alert("You must agree to the terms and conditions to continue.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-white w-full">
      <div className="flex flex-col md:flex-row bg-white shadow-md overflow-hidden rounded-lg w-[95%] max-w-6xl">
      <div className="absolute top-4 left-4 z-10">
    <GoBack onClick={() => navigate(-1)} />
  </div>

        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10">

          <h1 className="text-4xl font-bold mb-6 text-gray-800">Get Started Now</h1>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-center mb-4">
              <input type="checkbox" required className="w-4 h-4 border-gray-300 rounded-sm mr-2 focus:ring-red-700" />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-500 underline">
                  terms & policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
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
              <span className="text-sm font-medium text-gray-600">Sign in with Google</span>
            </button>
            <button
              onClick={() => handleSignInClick("apple")}
              className="flex items-center justify-center w-[48%] py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <img src={appleLogo} alt="Apple" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium text-gray-600">Sign in with Apple</span>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2 relative">

          <img src={backgroundImg} alt="Background" className="w-full h-full object-cover" />
          <img src={logoImg} alt="Logo" className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20" />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{modalContent}</h2>
            <p className="text-sm text-gray-600 mb-6">
              By continuing, you agree to the terms and conditions of using this application.
              <br />
              Please ensure you read our{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>
              .
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded-sm mr-2 focus:ring-red-700"
                onChange={() => setIsAgreed(!isAgreed)}
              />
              <label className="text-sm text-gray-600">I agree to the terms and conditions</label>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={handleModalClose} className="py-2 px-4 border rounded-md text-gray-600 hover:bg-gray-100">
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
