import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import sampleDiagram from "../../images/classdiagram.jpeg";
import sampleCodeImage from "../../images/plantuml_code.png"; // Add your code image

const EditorPage = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDiagramDropdown, setShowDiagramDropdown] = useState(false);
  const [showCustomizeDropdown, setShowCustomizeDropdown] = useState(false);
  const [showColorsDropdown, setShowColorsDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat");

  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Top Gray Bar */}
      <header className="bg-gray-300 flex items-center justify-between px-4 py-2">
        <button className="text-gray-600 hover:text-black text-2xl">
          &#9776;
        </button>
        <h1 className="text-2xl font-bold text-red-700 flex items-center">
          <img src={logo} alt="AiUML Logo" className="w-25 h-20 mr-2" />
        </h1>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          onClick={() => navigate("/")}
        >
          Sign Out
        </button>
      </header>

      <div className="flex flex-1">
        {/* Left Panel */}
        <aside className="bg-gray-200 w-1/3 px-4 py-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-black mb-6">
              AI Chatbot System
            </h2>

            {/* Tabs */}
            <div className="flex space-x-2 mb-6">
              {["All", "History", "+New", "Chat", "Code"].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-white font-semibold ${
                    activeTab === tab ? "bg-red-700" : "bg-gray-700"
                  } hover:bg-gray-800`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Chatbox or Code Section */}
            <div className="bg-gray-400 text-white p-4 rounded-md mb-4 shadow">
              {activeTab === "Chat" ? (
                <>
                  Draw a class diagram of a room in which there is a drawable,
                  furniture (e.g., couch), and some windows and walls around the
                  room
                </>
              ) : activeTab === "Code" ? (
                <img
                  src={sampleCodeImage}
                  alt="Sample Code"
                  className="max-w-full h-auto"
                />
              ) : null}
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Type here..."
                className="w-4/5 px-3 py-3 text-lg border border-gray-400 rounded-md focus:outline-none"
              />
              <button className="bg-gray-500 text-white px-3 py-3 rounded-md">
                &#9654;
              </button>
            </div>
            {activeTab === "Chat" ? (
              <button className="w-40 bg-red-700 text-white py-2 rounded-md hover:bg-red-800">
                Submit
              </button>
            ) : activeTab === "Code" ? (
              <button className="w-40 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800">
                Edit
              </button>
            ) : null}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white px-6 py-6 relative">
          {/* Buttons above Diagram */}
          <div className="flex space-x-4 mb-6 relative">
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 relative"
              onClick={() => setShowColorsDropdown(!showColorsDropdown)}
            >
              Colors
            </button>
            {showColorsDropdown && (
              <div className="absolute mt-12 bg-white shadow-md rounded-md p-4">
                <h3 className="font-bold mb-2">Select Color Scheme:</h3>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-red-700 rounded-full cursor-pointer"></div>
                  <div className="w-8 h-8 bg-blue-700 rounded-full cursor-pointer"></div>
                  <div className="w-8 h-8 bg-green-700 rounded-full cursor-pointer"></div>
                </div>
              </div>
            )}

            {/* Customize Dropdown */}
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 relative"
              onClick={() => setShowCustomizeDropdown(!showCustomizeDropdown)}
            >
              Customize
            </button>
            {showCustomizeDropdown && (
              <div className="absolute mt-12 bg-white shadow-md rounded-md p-4">
                <h3 className="font-bold mb-2">Select Theme:</h3>
                <ul>
                  <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                    Light Theme
                  </li>
                  <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                    Dark Theme
                  </li>
                  <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                    High Contrast
                  </li>
                </ul>
              </div>
            )}

            {/* Diagram Dropdown */}
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 relative"
              onClick={() => setShowDiagramDropdown(!showDiagramDropdown)}
            >
              Diagram
            </button>
            {showDiagramDropdown && (
              <div className="absolute mt-12 bg-white shadow-md rounded-md p-4">
                <h3 className="font-bold mb-2">Select Diagram Type:</h3>
                <ul>
                  <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                    Class Diagram
                  </li>
                  <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                    Use Case Diagram
                  </li>
                  <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                    ERD
                  </li>
                  <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                    Sequence Diagram
                  </li>
                </ul>
              </div>
            )}

            {/* Other Buttons */}
            {["Export", "Save"].map((btn, index) => (
              <button
                key={index}
                className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800"
                onClick={() => btn === "Save" && setShowSaveModal(true)}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Diagram Section */}
          <div className="border border-gray-300 rounded-md bg-gray-50 p-4">
            <h2 className="text-lg font-bold text-center mb-4">Class Diagram</h2>
            <div className="flex justify-center items-center">
              <img
                src={sampleDiagram}
                alt="Sample Diagram"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Reset Button */}
          <button className="absolute bottom-4 right-6 bg-gray-700 text-white px-4 py-2 rounded-md">
            + Reset
          </button>
        </main>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4 text-center">Save Options</h3>
            <div className="flex flex-col items-center">
              <button className="border border-gray-500 px-6 py-2 rounded-md text-gray-700 mb-4 hover:bg-gray-100">
                Download SVG
              </button>
              <button className="border border-gray-500 px-6 py-2 rounded-md text-gray-700 mb-4 hover:bg-gray-100">
                Download PNG
              </button>
              <div className="flex items-center space-x-4">
                <label>
                  <input type="radio" name="size" className="mr-2" /> Auto
                </label>
                <label>
                  <input
                    type="radio"
                    name="size"
                    className="mr-2"
                    defaultChecked
                  />{" "}
                  Customize
                </label>
              </div>
              <div className="flex space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="200"
                  className="border border-gray-400 px-2 py-1 rounded-md w-20"
                />
                <span>px</span>
                <input
                  type="number"
                  placeholder="300"
                  className="border border-gray-400 px-2 py-1 rounded-md w-20"
                />
                <span>px</span>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
                onClick={() => setShowSaveModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        Powered by AiUML | Enhance your system designs with automated diagrams.
      </footer>
    </div>
  );
};

export default EditorPage;
