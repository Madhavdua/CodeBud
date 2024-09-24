import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import "./App.css";
import Navbar from "./components/Navbar";
import White from "./components/White";

function App() {
const serverUrl="https://codebud-65bv.onrender.com";
// for localserver -> http://localhost:5000


  const [darkMode, setDarkMode] = useState(false);
  const [code, setCode] = useState("");
  
  const [messages, setMessages] = useState([]);
  const [white, setwhite] = useState(null);
  const [output, setoutput] = useState(null);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSend = async (q) => {
    
    setMessages([{text:"Getting response....."}]);
    // Add user's message to the messages array
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { text: q, sender: "user" }
    // ]);

    try {
      // Send user's input to the backend
      const response = await fetch(`${serverUrl}/api/query/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q }), // Send the input as the prompt
      });

      const data = await response.json(); // Convert the response to JSON

      // Extract the generated text from the backend response
      const botMessage =
        data.generations[0]?.text || "Error: No response from server";

      // Add the bot's response to the messages array
      setMessages((prevMessages) => [
        // ...prevMessages,
        { text: botMessage, sender: "bot" }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      // Handle the error by showing an error message from the bot
      setMessages((prevMessages) => [
        // ...prevMessages,
        {
          text: "Error: Failed to get response from the server.",
          sender: "bot",
        },
      ]);
    }
  };
  

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <div className="content">
        <Navbar handleSend={handleSend} code={code} setoutput={setoutput} setwhite={setwhite} setMessages={setMessages}/>
        <div className="">
          <CodeEditor code={code} setCode={setCode} />
        </div>
        <div className="chat-interface ">
          {/* <ChatResult messages={messages} /> */}
          {/* <ChatInterface handleSend={handleSend} /> */}
          {/* <SaveCode code={code} fileName={fileName} setfileName={setfileName} /> */}
          {/* <PickFile code={code} setCode={setCode} /> */}
          {/* <RunCode code={code} /> */}
          {white!==null && <White output={output} setwhite={setwhite} messages={messages} white={white} code={code} setCode={setCode} />}
        </div>
      </div>
    </div>
  );
}

export default App;

