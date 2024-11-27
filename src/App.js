import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/Signup";
import Login from "./pages/Login"; 
import Editor from "./pages/Editor";
import LandingPage from "./pages/Landingpage"; 

function App() {
  return (
   
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  
  );
}

export default App;
