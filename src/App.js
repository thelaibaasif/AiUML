import React from "react";
import { Routes, Route } from "react-router-dom"; // Use Routes only
import SignUp from "./pages/Signup/index.jsx";
import Login from "./pages/Login/index.jsx";
import Editor from "./pages/Editor/index.jsx";
import LandingPage from "./pages/Landingpage/index.jsx";
import Features from "./pages/Landingpage/Features.jsx";
import Profile from "./components/Profile"; 
import Feedback from "./components/Feedback";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/features" element={<Features />} />
      <Route path="/EnhancedEditor" element={<Editor />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
