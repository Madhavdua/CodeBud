import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import VoiceAssistant from "./components/VoiceAssistant";
import ChatInterface from "./components/ChatInterface";
import "./App.css";
import SaveCode from "./components/SaveCode";
import PickFile from "./components/PickFile";
import RunCode from "./components/RunCode";
import ChatResult from "./components/ChatResult";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [code, setCode] = useState("");
  const [fileName, setfileName] = useState("MyCode.txt");
  const [messages, setMessages] = useState([]);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSend = async (q) => {
    // Add user's message to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: q, sender: "user" }
    ]);

    try {
      // Send user's input to the backend
      const response = await fetch(`http://localhost:5000/api/query/${q}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: q }), // Send the input as the prompt
      });

      const data = await response.json(); // Convert the response to JSON

      // Extract the generated text from the backend response
      const botMessage =
        data.generations[0]?.text || "Error: No response from server";

      // Add the bot's response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: "bot" }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      // Handle the error by showing an error message from the bot
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Error: Failed to get response from the server.",
          sender: "bot",
        },
      ]);
    }
  };

  const handleLearningMode = () => {
    handleSend("I want to learn coding, ask me the technology.");
  };

  const handleDevelopmentMode = () => {
    handleSend("Help me develop a project, ask me about the project.");
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <div className="content">
        <div className="editor-container">
          <CodeEditor code={code} setCode={setCode} />
        </div>
        <div className="chat-interface ">
          <ChatResult messages={messages} />
          <ChatInterface handleSend={handleSend} />
          <div className="button-container">
            <button className="mode-button" onClick={handleLearningMode}>
              Learning Mode
            </button>
            <button className="mode-button" onClick={handleDevelopmentMode}>
              Development Mode
            </button>
          </div>
          <SaveCode code={code} fileName={fileName} setfileName={setfileName} />
          <PickFile code={code} setCode={setCode} />
          {/* <RunCode code={code} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;

