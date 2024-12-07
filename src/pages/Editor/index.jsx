import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const EditorPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-200 shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="AiUML Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold text-red-700">AiUML</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800">
              Colors
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800">
              Customize
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800">
              Diagram
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800">
              Export
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800">
              Save
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Left Panel */}
        <div className="w-1/3 bg-gray-200 p-6 flex flex-col">
          <h2 className="text-lg font-bold mb-4">AI Chatbot System</h2>
          {/* Menu Tabs */}
          <div className="flex space-x-2 mb-6">
            <button className="bg-red-700 text-white px-4 py-2 rounded-full">
              All
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              History
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              +New
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              Chat
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              Code
            </button>
          </div>
          {/* Chat Input */}
          <textarea
            placeholder="Draw a class diagram of a room in which there is a drawable, furniture (e.g., couch), and some windows and walls around the room."
            className="w-full h-32 p-4 border border-gray-300 rounded-md mb-4"
          ></textarea>
          <button className="bg-red-700 text-white w-full py-2 rounded-md hover:bg-red-800">
            Submit
          </button>
        </div>

        {/* Diagram Panel */}
        <div className="w-2/3 bg-white p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Class Diagram</h2>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              +Reset
            </button>
          </div>
          <div className="bg-gray-50 border border-gray-300 rounded-md flex-1 p-6 flex items-center justify-center">
            <img
              src={logo}
              alt="Diagram Placeholder"
              className="w-48 h-48 opacity-50"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-sm text-gray-600">
          Powered by AiUML | Enhance your system designs with automated
          diagrams.
        </p>
      </footer>
    </div>
  );
};

export default EditorPage;
