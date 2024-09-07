import React from 'react';
import './mystyle.css'

function ChatResult({ messages }) {
  return (
    <>
      <div className="chat-message" style={{ padding: "5px", margin: "15px 0px" }}>
        {messages && messages.length > 0 && messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatResult;
