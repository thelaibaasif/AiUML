import React, { useState } from "react";
import { auth } from "../../firebase"; // Import Firebase auth
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import classDiagram from "../../images/classdiagram.jpeg";
import useCaseDiagram from "../../images/usecasediagram.png";
import erdDiagram from "../../images/erddiagram.png";
import sequenceDiagram from "../../images/sequencediagram.png";
import sampleCodeImage from "../../images/plantuml_code.png";
import Loader from "../../components/Loader";
import MenuButton from "../../components/MenuButton";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-github";
//import TokenLimitedInput from "../../components/TokenLimitedInput";

const EditorPage = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDiagramDropdown, setShowDiagramDropdown] = useState(false);
  const [showCustomizeDropdown, setShowCustomizeDropdown] = useState(false);
  const [showColorsDropdown, setShowColorsDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat");
  const [activeDiagram, setActiveDiagram] = useState({
    name: "Class Diagram",
    image: classDiagram,
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();
  const aceEditorRef = React.useRef(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  //handle chat submit and loading
  const handleChatSubmit = async () => {
    if (!inputText.trim()) return; // Prevent empty submissions
    setIsLoading(true);
    try {
      await handleSubmit();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };  

   // Function to handle submission
   const handleSubmit = async () => {
    if (!inputText.trim()) return; // Avoid empty submissions
    try {
      const response = await fetch("http://localhost:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      console.log("Full Response:", JSON.stringify(data));
      setOutput(data.generated_code);
      if(aceEditorRef.current) {
        aceEditorRef.current.editor.setValue(data.generated_code);
      }
      //output = data.generated_code;
      setActiveDiagram((prev) => ({
        ...prev,
        image: data.diagram_url,
        name: "Generated Diagram", 
      }));
    } catch (error) {
      console.error("Error processing the text:", error);
      setOutput("An error occurred. Please try again.");
    }
  };

  // Fuction to handle signout
  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      sessionStorage.removeItem("user");
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-gray-300 flex items-center justify-between px-4 py-2">
        <MenuButton />
        <div className="flex items-center">
          <img src={logo} alt="AiUML Logo" className="w-34 h-auto mr-2" />
        </div>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-100 w-1/3 px-4 py-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-black mb-6">AI Chatbot System</h2>
            <div className="flex space-x-2 mb-6">
              {["All", "History", "+New chat", "Chat", "Code"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md font-semibold text-white transition duration-150 ${
                    activeTab === tab ? "bg-gray-700" : "bg-red-700"
                  } hover:bg-gray-800`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-gray-400 text-white p-4 rounded-md mb-4 shadow">
  {activeTab === "Chat" ? (
    <>
      Draw a class diagram of a room in which there is a drawable,
      furniture (e.g., couch), and some windows and walls around the
      room
    </>
  ) : activeTab === "Code" ? (
    <AceEditor
    mode="text"
    theme="github"
    name="plantuml-editor"
    value={output}
    onChange={newValue => setOutput(newValue)}
    width="100%"
    height="400px"
    fontSize={14}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      highlightActiveLine: true,
      showLineNumbers: true,
      tabSize: 2,
    }}
  />

  ) : activeTab === "History" ? (
    <div className="text-sm text-black">
      <h3 className="text-xl font-bold text-red-700 mb-4">History</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-red-700 font-semibold">
            <th className="pb-2">Title</th>
            <th className="pb-2">Created</th>
            <th className="pb-2">Restore</th>
            <th className="pb-2">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-900">
          {[
            "UseCase Diagram @123",
            "Class Diagram @123",
            "Sequence Diagram @123",
            "ERD Diagram @123",
          ].map((title, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2">{title}</td>
              <td className="py-2">1/2/21</td>
              <td className="py-2">
                <button className="bg-red-700 p-2 rounded-full">
                  <span role="img" aria-label="restore">🔄</span>
                </button>
              </td>
              <td className="py-2">
                <button className="text-red-700 bg-red-700 p-2 rounded-full" >
                  <span role="img" aria-label="delete">🗑️</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null}
</div>

          </div>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Type here...(0/3000)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow px-4 py-2 rounded-md border border-gray-300"
              />
              
            </div>
          <button
            onClick={handleChatSubmit}
            disabled={isLoading}
            className=
            {`w-full py-2 text-white rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : "bg-red-700 hover:bg-red-800"}`}
          >
            {activeTab === "Chat" ? "Submit" : "Edit"}
          </button>
          </div>
        </aside>

        <main className="flex-1 bg-white px-6 py-6 relative">
          <div className="flex space-x-4 mb-6 relative">
            {[{ label: "Colors", state: showColorsDropdown, setState: setShowColorsDropdown }, { label: "Customize", state: showCustomizeDropdown, setState: setShowCustomizeDropdown }, { label: "Diagram", state: showDiagramDropdown, setState: setShowDiagramDropdown }].map(({ label, state, setState }) => (
              <div key={label} className="relative">
                <button
                  className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800"
                  onClick={() => setState(!state)}
                >
                  {label}
                </button>
                {label === "Colors" && state && (
                  <div className="absolute mt-12 bg-white shadow-md rounded-md p-4 z-10">
                    <h3 className="font-bold mb-2">Select Color Scheme:</h3>
                    <div className="flex space-x-4">
                      <div className="w-8 h-8 bg-red-700 rounded-full cursor-pointer"></div>
                      <div className="w-8 h-8 bg-blue-700 rounded-full cursor-pointer"></div>
                      <div className="w-8 h-8 bg-green-700 rounded-full cursor-pointer"></div>
                    </div>
                  </div>
                )}
                {label === "Customize" && state && (
                  <div className="absolute mt-12 bg-white shadow-md rounded-md p-4 z-10">
                    <h3 className="font-bold mb-2">Select Theme:</h3>
                    <ul>
                      <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">Light Theme</li>
                      <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">Dark Theme</li>
                      <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">High Contrast</li>
                    </ul>
                  </div>
                )}
                {label === "Diagram" && state && (
                  <div className="absolute mt-12 bg-white shadow-md rounded-md p-4 z-10">
                    <h3 className="font-bold mb-2">Select Diagram Type:</h3>
                    <ul>
                      {["Class Diagram", "Use Case Diagram", "ERD", "Sequence Diagram"].map((name) => (
                        <li
                          key={name}
                          className="hover:bg-gray-100 px-2 py-1 cursor-pointer"
                          onClick={() => {
                            const image =
                              name === "Class Diagram"
                                ? classDiagram
                                : name === "Use Case Diagram"
                                ? useCaseDiagram
                                : name === "ERD"
                                ? erdDiagram
                                : sequenceDiagram;
                            setActiveDiagram({ name, image });
                            setShowDiagramDropdown(false);
                          }}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800"
              onClick={() => setShowSaveModal(true)}
            >
              Save
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800">
              Export
            </button>
          </div>

          <div className="border border-gray-300 rounded-md bg-white p-4 relative min-h-[400px]">
            <h2 className="text-lg font-bold text-center mb-4">
              {activeDiagram.name}
            </h2>
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center z-50">
                <Loader />
              </div>
            )}
            <div
              className={`flex justify-center items-center transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center",
              }}
            >
              <img
                src={activeDiagram.image}
                alt={activeDiagram.name}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <div className="absolute bottom-4 right-6 flex space-x-2">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
              onClick={handleZoomIn}
            >
              +
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
              onClick={handleResetZoom}
            >
              Reset
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
              onClick={handleZoomOut}
            >
              -
            </button>
          </div>
        </main>
      </div>

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
                  <input type="radio" name="size" className="mr-2" defaultChecked /> Customize
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

      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        Powered by AiUML | Enhance your system designs with automated diagrams.
      </footer>
    </div>
  );
};

export default EditorPage;
