import React, { useState } from 'react';
import './App.css';

const Chat = ({ goBack }) => {
  const [message, setMessage] = useState(''); // For the current message
  const [chatHistory, setChatHistory] = useState([]); // To store all the messages

  const handleSend = (event) => {
    event.preventDefault();
    if (message !== '') {
      setChatHistory([...chatHistory, message]);
      setMessage('');
    }
  }

  return (
    <div className="container">
      <button onClick={goBack}>Back</button>
      <h1>Chat Screen</h1>

      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
