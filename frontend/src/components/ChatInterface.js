import React, { useState } from 'react';
import './ChatInterface.css';
import './mystyle.css'

const ChatInterface = (props) => {
  const {handleSend,setwhite}=props;
   // Store chat messages (user and bot)
   // Store input field value
   const [input, setInput] = useState('');
  const handleChat=()=>{
    
    setwhite("chatresult");
    handleSend(input);
    setInput('');
  }

  return (
    <div className="chat-interface">
      <div className="chat-input" style={{width:"400px"}}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update the input field
          placeholder="Write any query"
        />
        <button onClick={handleChat}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
