import React, { useState, useRef, useEffect } from "react";
import { auth, db } from "../../firebase"; // Import Firebase auth
import { doc, getDoc } from "firebase/firestore";
import { ref, push, set, update } from "firebase/database";
import {  realTimeDb } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import classDiagram from "../../images/classdiagram.jpeg";
import useCaseDiagram from "../../images/usecasediagram.png";
import erdDiagram from "../../images/erddiagram.png";
import sequenceDiagram from "../../images/sequencediagram.png";
import Loader from "../../components/Loader";
import MenuButton from "../../components/MenuButton";
import EditWithAI from "../../components/EditWithAI";
import ThemeSelector from "./ThemeSelector";


//import Header from "./pages/Landingpage/Header.jsx";
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
  const [chatMessages, setChatMessages] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [activeDiagram, setActiveDiagram] = useState({
    name: "Class Diagram",
    image: classDiagram,
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [historyData, setHistoryData] = useState([
    "UseCase Diagram @123",
    "Class Diagram @123",
    "Sequence Diagram @123",
    "ERD Diagram @123",
  ]);
  const colorsRef = useRef(null);
  const customizeRef = useRef(null);
  const diagramRef = useRef(null);
  const navigate = useNavigate();
  const aceEditorRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoomLevel(1);
  const sessionId = sessionStorage.getItem("sessionId");
  const chatId = sessionStorage.getItem("chatId");
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState(null);
  


  
   useEffect(() => {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User data from Firestore:", userData);
    
            // Update state with user data
            setProfileData(userData);
          } else {
            console.log("No user data found");
          }
        }
      };
    
      fetchUserData();
    }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorsRef.current && !colorsRef.current.contains(event.target)) {
        setShowColorsDropdown(false);
      }
      if (customizeRef.current && !customizeRef.current.contains(event.target)) {
        setShowCustomizeDropdown(false);
      }
      if (diagramRef.current && !diagramRef.current.contains(event.target)) {
        setShowDiagramDropdown(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleSaveProject = async () => {
    const diagramState = {
      diagram: activeDiagram,
      zoom: zoomLevel,
      messages: chatMessages,
    };
  
    localStorage.setItem("savedDiagramState", JSON.stringify(diagramState));
    if (output) {
      await saveCode();
      alert("Diagram state and generated code saved successfully!");
    } else {
      alert("No generated code to save.");
    }
  };
  const getButtonClass = (label) => {
    return `${
      activeButton === label ? "bg-gray-700" : "bg-red-700 hover:bg-gray-800"
    } text-white px-4 py-2 rounded-full transition`;
  };
  
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

    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: inputText.trim() }
    ]);
    setInputText("");
    setIsLoading(true);
  
    // Fake response from AI (optional)
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { type: "ai", text: "This is a mock AI response for: " + inputText.trim() }
      ]);
      setIsLoading(false);
    }, 1000);
  
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
        body: JSON.stringify({ text: inputText, skip_model: false }),
      });
      const data = await response.json();
      console.log("Full Response:", JSON.stringify(data));
      setOutput(data.generated_code);
      if(aceEditorRef.current) {
        aceEditorRef.current.editor.setValue(data.generated_code);
      }

      setOutput(data.generated_code);
            setActiveDiagram((prev) => ({
              ...prev,
              image: data.diagram_url,
              name: "Generated Diagram", 
            }));
     
        // const fakeResponse = {
        //   generated_code: "class Diagram { \n  constructor() { }\n}",
        //   diagram_url: "https://example.com/fake-diagram.png",
        // };
        // if(aceEditorRef.current) {
        //   aceEditorRef.current.editor.setValue(fakeResponse.generated_code);
        // }
        // setActiveDiagram((prev) => ({
        //   ...prev,
        //   image: fakeResponse.diagram_url,
        //   name: "Generated Diagram", 
        // }));

    } catch (error) {
      console.error("Error processing the text:", error);
      setOutput("An error occurred. Please try again.");
    }
  };

  const sendMessage = async () => {
    console.log("Send Message Triggered");
    const user = auth.currentUser;
    console.log("User:", user);
  
    if (user && sessionId && chatId && message.trim()) {
      console.log("Session ID:", sessionId);
      console.log("Chat ID:", chatId);
      console.log("Message:", message);
  
      // Reference for storing messages
      const messageRef = push(ref(realTimeDb, `chats/${user.uid}/${sessionId}/${chatId}`));
      
      // Store message
      await set(messageRef, {
        text: message,
        sender: profileData.name || "Unknown",
        timestamp: Date.now(),
      })
        .then(() => {
          console.log("Message sent successfully!");
          setMessage(""); // Clear input field
        })
        .catch((error) => console.error("Error sending message:", error));
    } else {
      console.log("Condition check failed — some values are missing.");
    }
  };

  const saveEditedCode = async() => {
    try {
      if (!output.trim()) return;

      console.log("Sending edited code...");

      const response = await fetch("http://localhost:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: output, skip_model: true }), // Skip model when editing
      });

      const data = await response.json();

      if (data.generated_code) {
        console.log("Edited Code Saved:", data.generated_code);

        //  Update chat in Realtime Database
        const user = auth.currentUser;
        const sessionId = sessionStorage.getItem("sessionId");
        const chatId = sessionStorage.getItem("chatId");
        const messageId = sessionStorage.getItem("messageId");
        if (user && sessionId && chatId && messageId) {
          const existingMessageRef = ref(realTimeDb, `chats/${user.uid}/${sessionId}/${chatId}/${messageId}`);
          await set(existingMessageRef, {
            text: data.generated_code,
            sender: "AiUML",
            timestamp: Date.now(),
          });

          console.log("Updated code saved to DB");

          //  Update frontend state
          setOutput(data.generated_code);
          setActiveDiagram((prev) => ({
            ...prev,
            image: data.diagram_url,
            name: "Updated Diagram",
          }));
        } else {
          console.error("Missing user, session, or chat ID");
        }
      }
    } catch (error) {
      console.error("Error updating code:", error);
    }
  };
  
  const handleCombinedSubmit = async () => {
    if (activeTab === "Chat") {
      console.log("Submitting new message...");
      await sendMessage(); // Then send message using updated state
    handleChatSubmit(); // Ensure state updates before sending
    } else if (activeTab === "<> Code") {
      console.log("Saving edited code...");
      saveEditedCode();
    }
  };

  const saveCode = async () => {
    const user = auth.currentUser;
    if (user && sessionId && chatId && output) {
      const messageRef = ref(realTimeDb, `chats/${user.uid}/${sessionId}/${chatId}`);
      const newMessageRef = push(messageRef);
      const messageId = newMessageRef.key;
      await set(newMessageRef, {
        text: output, // Saving the code here
        sender: "AiUML",
        timestamp: Date.now(),
      });
      sessionStorage.setItem("messageId", messageId);
      console.log("Generated code saved:", output);
    }
  };
  

  const handleExport = async (format) => {
    if (format === "png") {
      // Directly download the PNG (this works fine)
      const link = document.createElement("a");
      link.href = activeDiagram.image;
      link.download = "diagram.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "svg") {
      // Get the SVG element (if it's rendered in the DOM)
      const svgElement = document.querySelector("svg"); // Make sure the SVG is present in the DOM
      if (svgElement) {
        const serializer = new XMLSerializer();
        console.log(new XMLSerializer().serializeToString(svgElement));
        const svgBlob = new Blob([serializer.serializeToString(svgElement)], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        // Force download
        const link = document.createElement("a");
        link.href = url;
        link.download = "diagram.svg";
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        console.error("SVG element not found.");
      }
    }

     /* if (activeDiagram.image) {
        try {
          const response = await fetch(activeDiagram.image); // Fetch the image content
          if (!response.ok) throw new Error("Failed to fetch image");
    
          const blob = await response.blob(); // Convert to blob
          const url = URL.createObjectURL(blob);
    
          const link = document.createElement("a");
          link.href = url;
          link.download = `diagram.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    
          URL.revokeObjectURL(url); // Clean up memory
        } catch (error) {
          console.error(`Error downloading ${format} file:`, error);
        }
      }*/
  };

  const createNewChat = async () => {
    console.log("Creating New Chat...");
    const user = auth.currentUser;
    if (user && sessionId) {
      const chatRef = push(ref(realTimeDb, `chats/${user.uid}/${sessionId}`));
      await set(chatRef, {
        createdAt: Date.now(),
      });
      console.log("Chat Created:", chatRef.key);
  
      // Store the new chat ID in session storage
      sessionStorage.setItem("chatId", chatRef.key);
      console.log("New Chat ID Set:", chatRef.key);
    } else {
      console.log("User or session missing");
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
        <Link to="/" className="flex items-center">
          <img src={logo} alt="AiUML Logo" className="w-34 h-auto mr-2 cursor-pointer" />
        </Link>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-100 w-1/3 px-4 py-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Diagram Generator</h2>
            <div className="flex space-x-2 mb-6">
              {["♺ Recent", "+ New", "Chat", "<> Code"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    if (tab === "+ New") {
                      setChatMessages([]);   // clear previous messages
                      setInputText("");      // reset input
                      setActiveTab("Chat");  // switch to Code tab
                      //setActiveTab("Code");
                      createNewChat();  
                    } else {
                      setActiveTab(tab);     // normal tab switch
                    }
                  }}
                  
                  
                  className={`px-4 py-2 rounded-md font-semibold text-white transition duration-150 ${
                    activeTab === tab ? "bg-gray-700" : "bg-red-700"
                  } hover:bg-gray-800`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="">
  {activeTab === "Chat" ? (
    <>
{/* CHAT MESSAGES AREA */}
<div className="bg-white border border-gray-300 rounded-md mb-4 w-full h-80 overflow-y-auto p-4 shadow-inner">
  {chatMessages.map((msg, index) => (
    <div
      key={index}
      className={`mb-2 p-2 rounded-md ${
        msg.type === "user"
          ? "bg-red-100 text-gray-800 text-right"
          : "bg-gray-100 text-gray-800 text-left"
      }`}
    >
      {msg.text}
    </div>
  ))}
</div>



    </>
  ) : activeTab === "<> Code" ? (
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

  ) : activeTab === "♺ Recent" ? (
    <div className="text-sm text-black">
      <h3 className="text-xl font-bold text-red-700 mb-4">♺ Recent</h3>
      {/* 🔍 Search Input */}
    <input
      type="text"
      placeholder="Search by title..."
      className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
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
        {historyData
  .filter((title) =>
    title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .map((title, index) => (


            <tr key={index} className="border-t border-gray-200">
              <td className="py-2">{title}</td>
              <td className="py-2">1/2/21</td>
              <td className="py-2">
                <button className="bg-red-700 p-2 rounded-full">
                  <span role="img" aria-label="restore">🔄</span>
                </button>
              </td>
              <td className="py-2">
              <button
  onClick={() => {
    const updated = historyData.filter((_, i) => i !== index);
    setHistoryData(updated);
  }}
  className="text-red-700 bg-red-700 p-2 rounded-full"
>
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
          {/* Only show chat input if not on History tab */}
{activeTab !== "♺ Recent" && (
  <div>
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        placeholder="Type here..."
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setMessage(e.target.value);
          }
        }
        className="flex-grow px-4 py-2 rounded-md border border-gray-300"
      />
    </div>

    <button
      onClick={handleCombinedSubmit}
      disabled={isLoading}
      className={`w-full py-2 text-white rounded-md ${
        isLoading ? "opacity-50 cursor-not-allowed" : "bg-red-700 hover:bg-gray-800"
      }`}
    >
      {activeTab === "Chat" ? "Submit" : "Edit"}
    </button>
  </div>
)}

        </aside>

        <main className="flex-1 bg-white px-6 py-6 relative">
          <div className="flex space-x-4 mb-6 relative">
            {[{ label: "Colors", state: showColorsDropdown, setState: setShowColorsDropdown }, { label: "Customize", state: showCustomizeDropdown, setState: setShowCustomizeDropdown }, { label: "Diagram", state: showDiagramDropdown, setState: setShowDiagramDropdown }].map(({ label, state, setState }) => (
              <div key={label} className="relative">
                <button
                  className={`${activeButton === label ? "bg-gray-700" : "bg-red-700 hover:bg-gray-800"} text-white px-4 py-2 rounded-full transition`}
                  onClick={() => setState(!state)}
                  
                >
                  {label}
                </button>
                {label === "Colors" && state && (
  <div ref={colorsRef} className="absolute mt-12 bg-white shadow-md rounded-md p-6 z-10 w-58">
    <h3 className="font-bold mb-3 text-center">Pick Any Color:</h3>
    <div className="flex justify-center">
      <input
        type="color"
        onChange={(e) => {
          const pickedColor = e.target.value;
          document.documentElement.style.setProperty('--tw-bg-opacity', '1');
          document.documentElement.style.setProperty('--tw-text-opacity', '1');
          document.documentElement.style.setProperty('--tw-bg-color', pickedColor);
        }}
        className="w-20 h-20 border-2 border-gray-300 rounded-full shadow-md cursor-pointer"
      />
    </div>
  </div>
)}

{label === "Customize" && state && (
  <div ref={customizeRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <ThemeSelector
      onSelectTheme={(theme) => {
        console.log("Selected theme:", theme); // Replace this with actual usage
        setShowCustomizeDropdown(false);
      }}
   />
  </div>
)}


{label === "Diagram" && state && (
  <div ref={diagramRef} className="absolute mt-12 bg-white shadow-md rounded-md p-4 z-10">
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
              className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-gray-800"
              onClick={handleSaveProject}
            >
              Save
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-gray-800"
            onClick={() => setShowSaveModal(true)}
            >
              Export
            </button>
          </div>

          <div className="border border-gray-300 rounded-md bg-white p-4 relative min-h-[400px] overflow-auto">
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

          <div className="absolute bottom-4 right-6 flex space-x-5">
            {/* Insert EditWithAI Button here */}
            <div className="flex items-center">
              <EditWithAI />
            </div>
            
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
              onClick={handleZoomIn}
            >
              +
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
              onClick={handleResetZoom}
            >
              Reset
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
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
            <h3 className="text-lg font-bold mb-4 text-center">Export Options</h3>
            <div className="flex flex-col items-center">
           
            {/* PNG Export */}
            <button
                onClick={() => handleExport("png")}
                className="border border-gray-500 px-6 py-2 rounded-md text-gray-700 mb-4 hover:bg-gray-100 text-center"
              >
                Download PNG
            </button>

            {/* SVG Export */}
              <button
                onClick={() => handleExport("svg")}
                className="border border-gray-500 px-6 py-2 rounded-md text-gray-700 mb-4 hover:bg-gray-100 text-center"
              >
                Download SVG
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
                className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
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
