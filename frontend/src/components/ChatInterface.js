import React, { useState } from 'react';
import './ChatInterface.css';
import './mystyle.css'

const ChatInterface = (props) => {
   // Store chat messages (user and bot)
   // Store input field value
   const [input, setInput] = useState('');
  const handleChat=()=>{
    props.handleSend(input);
    setInput('');
  }

  return (
    <div className="chat-interface">
      {/* Chat window displaying user and bot messages */}
      
      {/* Input area to type new messages */}
      <div className="chat-input" style={{width:"400px"}}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update the input field
          placeholder="Type a message..."
        />
        <button onClick={handleChat}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
