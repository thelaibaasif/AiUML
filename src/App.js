import React, { useState, useEffect } from "react"; // ✅ Add useState
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup/index.jsx";
import Login from "./pages/Login/index.jsx";
import Editor from "./pages/Editor/index.jsx";
import LandingPage from "./pages/Landingpage/index.jsx";
import Features from "./pages/Landingpage/Features.jsx";
import Profile from "./components/Profile"; 
import Feedback from "./components/Feedback";
import BusinessPlanPage from "./components/BusinessPlanPage";




function App() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <div className={isDark ? "dark" : ""}> {/* ✅ Toggle dark class */}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/EnhancedEditor" element={<Editor />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plans" element={<BusinessPlanPage />} />
        <Route path="/" element={<LandingPage setIsDark={setIsDark} />} /> {/* ✅ Pass setter */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
