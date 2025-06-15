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
import { XMarkIcon, RectangleStackIcon, UsersIcon, ServerIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ProfileIcon from "../../components/ProfileIcon"; // Adjust path if needed

//import Header from "./pages/Landingpage/Header.jsx";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-chrome";
//import TokenLimitedInput from "../../components/TokenLimitedInput";

//deployment urls
//const LOCAL_URL = "http://localhost:8000";
//const DEPLOYED_URL = "https://aiuml-backend.onrender.com";
const BASE_URL = "https://aiuml-backend.onrender.com";

const EditorPage = ({isGuest}) => {
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
  const [output, setOutput] = useState(""); //for plantuml code
  const [javaCode, setJavaCode] = useState(""); // For Java code
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
  const [, setSessionId] = useState(null); //  Just defining setter
  const [, setChatId] = useState(null); //  Same for chat ID
  const hasCreatedGuestSession = useRef(false);
  const textRef = useRef(null); // For input Field
  
// -------------------------- Checking if the user is guest or not ---------------------------------------------- //

  useEffect(() => {
    const sessionAlreadyExists = sessionStorage.getItem("sessionId");
    const chatAlreadyExists = sessionStorage.getItem("chatId");

    const createGuestSession = async () => {
      if (hasCreatedGuestSession.current || sessionAlreadyExists || !isGuest) return;
      if (isGuest) {
        hasCreatedGuestSession.current = true;
        console.log("Guest session starting...");
  
        // Create session for guest (without user ID)
        const sessionRef = push(ref(realTimeDb, `guest_sessions/`));
        console.log("Guest Session Ref:", sessionRef);
  
        await set(sessionRef, { createdAt: Date.now() })
          .then(async () => {
            console.log("Guest Session Created:", sessionRef.key);
            sessionStorage.setItem("sessionId", sessionRef.key);
  
            // Create chat for guest session
            const chatRef = push(ref(realTimeDb, `guest_sessions/${sessionRef.key}`));
            await set(chatRef, { createdAt: Date.now() })
              .then(() => {
                console.log("Guest Chat Created:", chatRef.key);
                sessionStorage.setItem("chatId", chatRef.key);
              })
              .catch((error) => console.error("Error creating guest chat:", error));
          })
          .catch((error) => console.error("Error creating guest session:", error));
      }
    };
  
    createGuestSession();
  }, [isGuest]);

  // useEffect(() => {
  //   const user = auth.currentUser;
  //   const userId = user ? user.uid : "guest"; // Use "guest" for guest users
  //   const existingSessionId = sessionStorage.getItem("sessionId");
  //   const existingChatId = sessionStorage.getItem("chatId");
  
  //   // Only create session and chat if none exists for guests
  //   if (userId === "guest" && (!existingSessionId || !existingChatId)) {
  //     console.log("No existing session/chat for guest — creating new session and chat...");
  //     createSession(); //Create session for guest
  //   }
  // }, []);

// ------------------------------------ Getting user data from db -------------------------------------------- //

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
      setActiveDiagram((prev) => ({
        ...prev,
        image: activeDiagram.image,
        name: activeDiagram.name,
      }));
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
  
// ---------------------------------------- Text input field -----------------------------------------------------//
const handleInputResize = () => {
  const el = textRef.current;
  if (el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 150) + "px";
  }
};

  //handle chat submit and loading
const handleChatSubmit = async () => {
  if (!inputText.trim()) return; // Prevent empty submissions
  
  // First add the user message to chat immediately
  setChatMessages((prev) => [
    ...prev,
    { type: "user", text: inputText.trim() }
  ]);
  
  // Store current input before clearing
  const currentInput = inputText.trim();
  
  // Clear input field right away
  setInputText("");
  
  // Then set loading state and process the submission
  setIsLoading(true);
  try {
    await handleSubmit();
  } catch (error) {
    console.error("Submission error:", error);
  } finally {
    setIsLoading(false);
  }
  
  // Fake response from AI (optional)
  setTimeout(() => {
    setChatMessages((prev) => [
      ...prev,
      { type: "ai", text: `I've analyzed your request for a ${activeDiagram.name.toLowerCase()}. Generating diagram with the key components you described. The diagram has been rendered based on your specifications. You can view it in the main panel, or switch to the Code tab to see and edit the underlying PlantUML.` }
    ]);
  }, 1000);
};  
// ----------------------------------- Submit Button(Input the prompt) ----------------------------------- //
   // Function to handle submission
   const handleSubmit = async () => {
    if (!inputText.trim()) return; // Avoid empty submissions
   try {
     const response = await fetch(`${BASE_URL}/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, skip_model: false, diagram_type: activeDiagram.name }),
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
              name: activeDiagram.name, 
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

// --------------------------------------- Saving Prompt to DB ---------------------------------------- //

  const sendMessage = async () => {
    console.log("Send Message Triggered");
    const user = auth.currentUser;
    console.log("User:", user);
  
    if (isGuest){
      console.log("Session ID:", sessionId);
      console.log("Chat ID:", chatId);
      console.log("Message:", message);

      // Reference for storing messages
      const messageRef = push(ref(realTimeDb, `guest_sessions/${sessionId}/${chatId}`))

      // Store message
      await set(messageRef, {
        text: message,
        sender: "Guest",
        timestamp: Date.now(),
      })
        .then(() => {
          console.log("Message sent successfully!");
          setMessage(""); // Clear input field
        })
        .catch((error) => console.error("Error sending message:", error));
    }
    else if (user && sessionId && chatId && message.trim()) {
      console.log("Session ID:", sessionId);
      console.log("Chat ID:", chatId);
      console.log("Message:", message);
      console.log("Profile Data", profileData)
  
      // Reference for storing messages
      const messageRef = push(ref(realTimeDb, `chats/${user.uid}/${sessionId}/${chatId}`));
      
      // Store message
      await set(messageRef, {
        text: message,
        sender: profileData?.name || "Unknown",
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

// ------------------------------------------ Saving Edited Code (Edit) --------------------------------------- //

  const saveEditedCode = async() => {
    try {
      if (!output.trim()) return;

      console.log("Sending edited code...");

      const response = await fetch(`${BASE_URL}/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: output, skip_model: true, diagram_type: activeDiagram.name }), // Skip model when editing
      });

      const data = await response.json();

      if (data.generated_code) {
        console.log("Edited Code Saved:", data.generated_code);

        if (isGuest) {

          const sessionId = sessionStorage.getItem("sessionId");
          const chatId = sessionStorage.getItem("chatId");
          const messageId = sessionStorage.getItem("messageId");
          if (sessionId && chatId && messageId) {
            const existingMessageRef = ref(realTimeDb, `guest_sessions/${sessionId}/${chatId}/${messageId}`);
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
              name: activeDiagram.name,
            }));
          } else {
            console.error("Missing user, session, or chat ID");
          }
        } else {

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
              name: activeDiagram.name,
            }));
          } else {
            console.error("Missing user, session, or chat ID");
          }
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
    } else if (activeTab === "Code") {
      console.log("Saving edited code...");
      saveEditedCode();
    }
  };

// --------------------------------------------- Saving Code to DB -------------------------------------------- //

  const saveCode = async () => {

    if (isGuest)
    { 
      const sessionId = sessionStorage.getItem("sessionId");
      const chatId = sessionStorage.getItem("chatId");
      if (sessionId && chatId && output) {
        const messageRef = ref(realTimeDb, `guest_sessions/${sessionId}/${chatId}`);
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
    } 
    else {
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
    }
  };
  

const handleExport = async (format) => {
  if (!activeDiagram?.image) {
    console.error("No diagram to export.");
    return;
  }
  // const testimage = "https://www.plantuml.com/plantuml/svg/dLF1hjem4BpxAtphAOVU4IAGegBIj4hu0ITP4PV4ZjPhA4BzzygEOndAeNgNnBEhyOp7wuqXWTJse1WeadJdts5i0Fc3SSu3E1HyjRh0VRtsnRek_NylqL0fHl3eA1Am4-DaJTvr2CRuobSzGef_zbf1QTtsYPBfvNIwJyics7tvFKaK9BKg1CtbWybRabTWVzZYUQlr9JW-rDlooUr9qZ0JSqkzdjLgs_o2bd84uN41faKvEPqWhRPm14L1iHAOwXsrK47FBPDyNaBRVmkrO2lYNG_jHLkAfoein7K5P34zy8yhO6UV7CW61Sfe8-8NB_56AZsa_9qWCUXpO0UKSbFF7qmoaQjWbAgBOxN0_mYkr2JRD1e5Dp4uxBP76FnmkBdXZKRKDyCV_tH6eSGPtdNQ-UJlMj8Okt0-yIff6HOUILPcYofRrBFFcHyAvZuUkUbayO8yAHXwgIvcc6DuQgYaWi4Nypyl5-DaR0EgSu_vBm00";
  // const exportUrl = testimage.replace("/svg/", `/${format}/`);

  const exportUrl = activeDiagram.image.replace("/svg/", `/${format}/`);

  try {
    const response = await fetch(exportUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

    const blob = await response.blob(); 
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `diagram.${format}`; // Extension set dynamically
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
    console.log(`${format.toUpperCase()} exported successfully.`);
  } catch (error) {
    console.error(`Failed to export ${format}:`, error);
  }
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
  
  const enhanceDiagram = async () => {
    if (!output) {
      console.log("No diagram to enhance");
      return;
    }
  
    console.log("Enhancing diagram...");
  
    try {
      const response = await fetch(`${BASE_URL}/enhance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: output, diagram_type: activeDiagram.name }),
      });
  
      const data = await response.json();

      console.log("Generated code:", data.enhanced_code);

      if (isGuest) {

        const sessionId = sessionStorage.getItem("sessionId");
        const chatId = sessionStorage.getItem("chatId");
        const messageId = sessionStorage.getItem("messageId");
        if (sessionId && chatId && messageId) {
          const existingMessageRef = ref(realTimeDb, `guest_sessions/${sessionId}/${chatId}/${messageId}`);
          await set(existingMessageRef, {
            text: data.enhanced_code,
            sender: "AiUML",
            timestamp: Date.now(),
          });

          console.log("Updated code saved to DB");

          if (data.enhanced_code) {
            setOutput(data.enhanced_code);
            const newUrl = data.diagram_url;
            setActiveDiagram((prev) => ({
              ...prev,
              image: newUrl,
              name: activeDiagram.name,
            }));
          } else {
            console.error("Error enhancing diagram:", data.error);
          }
      
            console.log("Enhanced code saved:", data.enhanced_code);
          } else {
            console.error("Missing user, session, or chat ID");
          }
      } else {

        //  Update chat in Realtime Database
        const user = auth.currentUser;
        const sessionId = sessionStorage.getItem("sessionId");
        const chatId = sessionStorage.getItem("chatId");
        const messageId = sessionStorage.getItem("messageId");
        if (user && sessionId && chatId && messageId) {
          const existingMessageRef = ref(realTimeDb, `chats/${user.uid}/${sessionId}/${chatId}/${messageId}`);
          await set(existingMessageRef, {
            text: data.enhanced_code,
            sender: "AiUML",
            timestamp: Date.now(),
          });

          console.log("Updated code saved to DB");
    
          if (data.enhanced_code) {
            setOutput(data.enhanced_code);
            const newUrl = data.diagram_url;
            setActiveDiagram((prev) => ({
              ...prev,
              image: newUrl,
              name: activeDiagram.name,
            }));
          } else {
            console.error("Error enhancing diagram:", data.error);
            
          }
    
          console.log("Enhanced code saved:", data.enhanced_code);
        } else {
          console.error("Missing user, session, or chat ID");
        }
      }
    } catch (error) {
      console.error("Error enhancing diagram:", error);
    }
  };

  const handleThemeSelect = async (theme) => {
    console.log("Applying theme:", theme);
  
    try {
      console.log("Applying theme:", theme);
      const response = await fetch(`${BASE_URL}/apply-theme`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: output, // Existing diagram code
          theme: theme, //  Send theme to backend
        }),
      });
  
      const data = await response.json();
  
      if (data.updated_code) {
        setOutput(data.updated_code);
        setActiveDiagram((prev) => ({
          ...prev,
          image: data.diagram_url,
        }));
      }
    } catch (error) {
      console.error("Error applying theme:", error);
    }  
  };
  
  //function to handle Java code generation
  const handleJavaCode = async () => {
  if (!output.trim()) return; // Avoid empty submissions

  try {
    const response = await fetch(`${BASE_URL}/generate_programming_code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: output, // Plantuml code as input
        diagram_type: activeDiagram.name, // Diagram type (e.g., "Class Diagram")
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Error from backend:", data.error);
      alert(`Error: ${data.error}`);
      return;
    }

    console.log("Generated Java Code:", data.generated_code);

    // Update the editor with the generated code
    setJavaCode(data.generated_code); // Update Java code
    if (aceEditorRef.current) {
      aceEditorRef.current.editor.setValue(data.generated_code);
    }
  } catch (error) {
    console.error("Error generating java code", error);
    setOutput("An error occurred while generating java code. Please try again.");
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
        <div className="flex items-center gap-2">
  <button
    className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center space-x-2"
    onClick={handleSignOut}
  >
    <svg
      className="w-5 h-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
      />
    </svg>
    <span>Sign Out</span>
    
  </button>
  
  <ProfileIcon />

</div>


      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-100 w-1/3 px-4 py-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Diagram Generator</h2>
            <div className="flex space-x-2 mb-6">
            {[
  {
    tab: "Recent",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
      </svg>
    ),
  },
  {
    tab: "New",
  icon: (
    <svg
      className="w-5 h-5 text-white dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    ),
  },
  {
    tab: "Chat",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h6m-6 4h8M5 21l2-2a9 9 0 1 0-2-2" />
      </svg>
    ),
  },
  {
    tab: "Code",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
      </svg>
    ),
  },
  {
    tab: "Generate Code",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
      </svg>
    ),
  },
].map(({ tab, icon }) => (

                <button
                  key={tab}
                  onClick={() => {
                    if (tab === "New") {
                      setChatMessages([]);   // clear previous messages
                      setInputText("");      // reset input
                      setActiveTab("Chat");  // switch to Code tab
                      setOutput("");
                      setActiveDiagram((prev) => ({
                        ...prev,
                        image: classDiagram,
                        name: "Class Diagram",
                      }));
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
                  <span className="flex items-center">
    {icon}
    {tab}
  </span>
                </button>
              ))}
            </div>
            <div className="">
  {activeTab === "Chat" ? (
    <>
{/* CHAT MESSAGES AREA */}
<div className="bg-white border border-gray-300 rounded-md mb-4 w-full h-80 overflow-y-auto p-4 shadow-inner"
style={{ height: "500px" }}
>
  {chatMessages.map((msg, index) => (
    <div
      key={index}
      className={`mb-2 p-2 rounded-md ${
        msg.type === "user"
          ? "bg-red-100 text-gray-800 text-left"
          : "bg-gray-100 text-gray-800 text-left"
      }`}
    >
      {msg.text}
    </div>
  ))}
</div>



    </>
  ) : activeTab === "Code" ? (
    <AceEditor
    mode="text"
    theme="github"
    name="plantuml-editor"
    value={output}
    onChange={newValue => setOutput(newValue)}
    width="100%"
    height="500px"
    fontSize={14}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      highlightActiveLine: true,
      showLineNumbers: true,
      tabSize: 2,
    }}
  />

  ) : activeTab === "Recent" ? (
    <div className="text-sm text-black">
      
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
      <tr key={index} className="border-t border-gray-200 text-center">
        <td className="py-4">{title}</td>
        <td className="py-4">1/2/21</td>

        {/* Restore Button Column */}
        <td className="py-4">
          <button className="bg-red-700 p-2 rounded-full">
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
              />
            </svg>
          </button>
        </td>

        {/* Delete Button Column */}
        <td className="py-4">
          <button
            onClick={() => {
              const updated = historyData.filter((_, i) => i !== index);
              setHistoryData(updated);
            }}
            className="bg-red-700 p-2 rounded-full "
          >
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </td>
      </tr>
    ))}
</tbody>

      </table>
    </div>
  ) : activeTab === "Generate Code" ? (
    <AceEditor
    mode="java"
    theme="chrome"
    name="java-editor"
    value={javaCode}
    onChange={newValue => setJavaCode(newValue)}
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
  ) : null}
</div>

          </div>
          {/* Only show chat input if not on History tab */}
{activeTab !== "Recent" && (
  <div>
    <div className="flex items-center space-x-2 mb-4">
      <textarea
        ref={textRef}
        type="text"
        placeholder="Type here..."
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setMessage(e.target.value);
          handleInputResize();
        }}
        className="flex-grow px-4 py-2 rounded-md border border-gray-300"
      />
    </div>

    <button
      onClick={
        activeTab === "Chat"
          ? handleCombinedSubmit // Submit message in Chat tab
          : activeTab === "Code"
          ? saveEditedCode // Save edited code in Code tab
          : activeTab === "Generate Code"
          ? handleJavaCode // Generate code in Generate Code tab
          : null
      }
      disabled={isLoading}
      className={`w-full py-2 text-white rounded-md flex items-center justify-center gap-2 ${
        isLoading ? "opacity-50 cursor-not-allowed" : "bg-red-700 hover:bg-gray-800"
      }`}
    >
      {activeTab === "Chat" ? (
        <>
          Submit
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
              clipRule="evenodd"
            />
          </svg>
        </>
      ) : activeTab === "Code" ? (
        <>
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
          Draw Diagram
        </>
      ) : activeTab === "Generate Code" ? (
        <>
          Generate Code
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </>
      ) : null}
    </button>
  </div>
)}
        </aside>

        <main className="flex-1 bg-white px-6 py-6 relative">
          <div className="flex space-x-4 mb-6 relative">
            {[{ label: "Colors", state: showColorsDropdown, setState: setShowColorsDropdown }, { label: "Customize", state: showCustomizeDropdown, setState: setShowCustomizeDropdown }, { label: "Diagram", state: showDiagramDropdown, setState: setShowDiagramDropdown }].map(({ label, state, setState }) => (
              <div key={label} className="relative">
                <button
  className={`${activeButton === label ? "bg-gray-700" : "bg-red-700 hover:bg-gray-800"} text-white px-4 py-2 rounded-full transition flex items-center space-x-2`}
  onClick={() => setState(!state)}
>
  {label === "Colors" && (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m6.08169 15.9817 1.57292-4m-1.57292 4h-1.1m1.1 0h1.65m-.07708-4 2.72499-6.92967c.0368-.09379.1673-.09379.2042 0l2.725 6.92967m-5.65419 0h-.00607m.00607 0h5.65419m0 0 .6169 1.569m5.1104 4.453c0 1.1025-.8543 1.9963-1.908 1.9963s-1.908-.8938-1.908-1.9963c0-1.1026 1.908-4.1275 1.908-4.1275s1.908 3.0249 1.908 4.1275Z"/>
    </svg>
  )}
  {label === "Customize" && (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"/>
    </svg>
  )}
  {label === "Diagram" && (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"/>
    </svg>
  )}
  <span>{label}</span>
</button>

                {label === "Colors" && state && (
  <div ref={colorsRef} className="absolute mt-12 bg-white shadow-md rounded-md p-6 z-10 w-58">
    <h3 className="font-bold mb-3 text-center">Pick Any Color:</h3>
    <div className="flex justify-center">
      <input
        type="color"
        onChange={async (e) => {
          const pickedColor = e.target.value;
          console.log("Picked color:", pickedColor);
        
          try {
            const response = await fetch(`${BASE_URL}/set-color`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: output, color: pickedColor }),
            });
        
            const data = await response.json();
        
            if (data.generated_code) {
              setOutput(data.generated_code); //  Update code state
              setActiveDiagram((prev) => ({
                ...prev,
                image: data.diagram_url, //  Update diagram preview
              }));
            }
          } catch (error) {
            console.error("Failed to apply color:", error);
          }
        }}
        
        className="w-20 h-20 border-2 border-gray-300 rounded-full shadow-md cursor-pointer"
      />
    </div>
  </div>
)}

{label === "Customize" && state && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
  <div ref={customizeRef}>
  <ThemeSelector
  onSelectTheme={(theme) => {
    console.log("Selected theme:", theme);
    handleThemeSelect(theme); //  Apply theme
    setShowCustomizeDropdown(false); //  Close dropdown after selection
  }}
/>
  </div>
  </div>
)}


{label === "Diagram" && state && (
  <div ref={diagramRef} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowDiagramDropdown(false)}>
  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-[90%] relative"
    role="dialog"
    aria-modal="true"
  >
    <button
      className="absolute top-3 right-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
      onClick={() => setShowDiagramDropdown(false)}
      aria-label="Close"
    >
      <XMarkIcon className="h-5 w-5" />
    </button>
    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-4">Select Diagram Type</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        onClick={() => {
          setActiveDiagram({ name: 'Class Diagram', image: classDiagram });
          setShowDiagramDropdown(false);
        }}
        className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <RectangleStackIcon className="h-6 w-6 text-red-700 dark:text-indigo-400 mb-2" />
        <span className="text-sm font-medium text-gray-700 dark:text-white">Class Diagram</span>
      </button>

      <button
        onClick={() => {
          setActiveDiagram({ name: 'Use Case Diagram', image: useCaseDiagram });
          setShowDiagramDropdown(false);
        }}
        className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <UsersIcon className="h-6 w-6 text-red-700 dark:text-indigo-400 mb-2" />
        <span className="text-sm font-medium text-gray-700 dark:text-white">Use Case Diagram</span>
      </button>

      <button
        onClick={() => {
          setActiveDiagram({ name: 'ERD', image: erdDiagram });
          setShowDiagramDropdown(false);
        }}
        className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ServerIcon className="h-6 w-6 text-red-700 dark:text-indigo-400 mb-2" />
        <span className="text-sm font-medium text-gray-700 dark:text-white">ERD</span>
      </button>

      <button
        onClick={() => {
          setActiveDiagram({ name: 'Sequence Diagram', image: sequenceDiagram });
          setShowDiagramDropdown(false);
        }}
        className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ArrowPathIcon className="h-6 w-6 text-red-700 dark:text-indigo-400 mb-2" />
        <span className="text-sm font-medium text-gray-700 dark:text-white">Sequence Diagram</span>
      </button>
    </div>
  </div>
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
            <button
  className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-gray-800 flex items-center gap-2"
  onClick={() => setShowSaveModal(true)}
>
  <svg
    className="w-5 h-5 text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
    />
  </svg>
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

          <div className="absolute bottom-4 right-6 flex space-x-2 items-center">

            {/* Insert EditWithAI Button here */}
            <div className="flex items-center">
            <EditWithAI onEnhance={enhanceDiagram} />
            </div>
            
            <button
  className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800"
  onClick={handleZoomIn}
  title="Zoom In"
>
  <svg
    className="w-5 h-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M10 7v6m-3-3h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
  </svg>
</button>

<button
  className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800"
  onClick={handleResetZoom}
  title="Reset Zoom"
>
  <svg
    className="w-5 h-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
  </svg>
</button>

<button
  className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800"
  onClick={handleZoomOut}
  title="Zoom Out"
>
  <svg
    className="w-5 h-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M7 10h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
  </svg>
</button>

          </div>
        </main>
      </div>
      
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-md shadow-md p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4 text-center">Export Options</h3>
            <div className="flex flex-col items-center">
            <button
          onClick={() => handleExport("svg")}
          className="border border-gray-500 px-6 py-2 rounded-md text-gray-700 mb-4 hover:bg-gray-100 text-center"
        >
          Download SVG
        </button>
        <button
          onClick={() => handleExport("png")}
          className="border border-gray-500 px-6 py-2 rounded-md text-gray-700 mb-4 hover:bg-gray-100 text-center"
        >
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
