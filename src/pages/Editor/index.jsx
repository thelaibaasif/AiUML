import React, { useState } from "react";

const Editor = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    alert("Submitted: " + inputText);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="flex items-center justify-between bg-gray-100 p-4">
        <h1 className="text-lg font-bold">AI chatbot System</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-1 bg-red-700 text-white rounded-md">All</button>
          <button className="px-4 py-1 bg-gray-400 text-white rounded-md">History</button>
          <button className="px-4 py-1 bg-pink-700 text-white rounded-md">+ New</button>
          <button className="px-4 py-1 bg-gray-500 text-white rounded-md">Chat</button>
          <button className="px-4 py-1 bg-gray-600 text-white rounded-md">Code</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/3 bg-gray-200 p-4">
          <h2 className="font-semibold mb-4">Draw a class diagram</h2>
          <p className="text-gray-600 text-sm">
            Draw a class diagram of a room in which there is a drawable, furniture i.e., a couch, and some windows and walls around the room.
          </p>
        </aside>

        {/* Editor and Diagram */}
        <main className="flex-1 bg-gray-50 p-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Class Diagram</h2>
            <button className="px-4 py-1 bg-gray-500 text-white rounded-md">+ Reset</button>
          </div>
          <div className="border border-gray-300 bg-white rounded-lg p-4 mt-4 flex-1">
            <img
              src="/path-to-your-diagram.png"
              alt="Class Diagram"
              className="w-full h-auto object-contain"
            />
          </div>
        </main>
      </div>

      {/* Footer Section */}
      <footer className="p-4 bg-white border-t border-gray-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type here ..."
            value={inputText}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
        <div className="text-gray-500 text-sm">
          Edit with AI, Type anything here. For example: Add a database to this diagram.
        </div>
      </footer>
    </div>
  );
};

export default Editor;
