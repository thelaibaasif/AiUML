import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo.png";
import diagramImage from "../../images/diagram.png"; // Replace with your actual diagram image path.

const EnhancedEditor = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    alert("Submitted: " + inputText);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-gray-300 p-4 shadow-md">
        <div className="flex items-center space-x-4">
          <FaBars className="text-xl text-gray-700" />
          <h1 className="text-lg font-bold text-gray-700">AI chatbot System</h1>
        </div>
        <img src={logo} alt="AiUML Logo" className="w-16" />
        <div className="flex space-x-2">
          <button className="px-4 py-1 bg-red-700 text-white rounded-md hover:bg-gray-400">
            Colors
          </button>
          <button className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Customize
          </button>
          <button className="px-4 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800">
            Diagram
          </button>
          <button className="px-4 py-1 bg-gray-900 text-white rounded-md hover:bg-black">
            Export
          </button>
          <button className="px-4 py-1 bg-red-700 text-white rounded-md hover:bg-gray-400">
            Save
          </button>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-1/3 bg-gray-200 p-4">
          <h2 className="font-bold text-gray-700 mb-4">Draw a class diagram</h2>
          <div className="bg-gray-300 p-3 rounded-md text-sm text-gray-700">
            Draw a class diagram of a room in which there is a drawable, furniture (e.g., a couch),
            and some windows and walls around the room.
          </div>
        </aside>

        {/* Diagram Section */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Class Diagram</h2>
          <img
            src={diagramImage}
            alt="Class Diagram"
            className="w-3/4 h-auto border border-gray-300 shadow-md"
          />
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md mt-4 hover:bg-gray-700">
            + Reset
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 w-2/3">
          <input
            type="text"
            placeholder="Type here ..."
            value={inputText}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Submit
          </button>
        </div>
        <div className="text-sm text-gray-700 text-right">
          Edit with AI. For example: Add a database to this diagram.
        </div>
      </footer>
    </div>
  );
};

export default EnhancedEditor;
