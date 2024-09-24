import React from 'react';
import './mystyle.css'

function ChatResult({ messages }) {
  console.log(messages);
  return (
    <>
      <div className="chat-message w-100 mx-3" style={{ padding: "15px", margin: "15px 0px" }}>
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
