import React, { useState, useEffect } from 'react';
import './App.css';

const Chat = ({ currentUser, goBack }) => {
  const [message, setMessage] = useState(''); // For the current message
  const [chatHistory, setChatHistory] = useState([]); // To store all the messages
  const [users, setUsers] = useState([]); // For all the users
  const [selectedUser, setSelectedUser] = useState(null); // For the selected user

  useEffect(() => {
    fetch('http://localhost:5000/users') // Replace with your server API
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        // Log the detailed error
        console.error('Error:', error);
      });      
  }, []);  // Empty dependency array means this effect runs once on mount

  const handleSend = (event) => {
    event.preventDefault();
    if (message !== '' && selectedUser) {
      setChatHistory([...chatHistory, { user: currentUser, text: message, recipient: selectedUser }]);
      setMessage('');
    }
  }

  return (
    <div className="container">
      <button onClick={goBack}>Back</button>
      <h1>Chat Screen</h1>

      <select onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select user to chat with</option>
        {users.map(user => (
          <option key={user.Id} value={user.UserName}>{user.UserName}</option>
        ))}
      </select>

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
