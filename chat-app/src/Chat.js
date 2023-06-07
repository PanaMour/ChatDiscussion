import React, { useState } from 'react';
import './App.css';

const Chat = ({ currentUser, goBack }) => {
  const [message, setMessage] = useState(''); // For the current message
  const [chatHistory, setChatHistory] = useState([]); // To store all the messages

  const handleSend = (event) => {
    event.preventDefault();
    if (message !== '') {
      setChatHistory([...chatHistory, { user: currentUser, text: message }]);
      setMessage('');
    }
  }

  return (
    <div className="container">
      <button onClick={goBack}>Back</button>
      <h1>Chat Screen</h1>

      <div className="chat-history">
      {chatHistory.map((msg, index) => (
  <p key={index}><strong>{msg.user}</strong>: {msg.text}</p>
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
