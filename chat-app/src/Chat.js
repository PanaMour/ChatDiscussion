import React, { useState, useEffect } from 'react';
import './App.css';

const Chat = ({ currentUser, goBack }) => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const fetchChatHistory = (userId1, userId2) => {
    fetch(`http://localhost:5000/chats/${userId1}/${userId2}`)
      .then(response => response.json())
      .then(data => setChatHistory(data))
      .catch(error => console.error('Error:', error));
  };

  const handleUserChange = (e) => {
    const userId = Number(e.target.value);
    const selectedUser = users.find(user => user.Id === userId);
    setSelectedUser(selectedUser);
    setChatHistory([]);
    if (selectedUser) {
      console.log("Selected User:", selectedUser);
      fetchChatHistory(currentUser, selectedUser.Id);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() !== '' && selectedUser) {
      fetch(`http://localhost:5000/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: currentUser, recipient: selectedUser.Id, text: message }),
      })
      .then(response => {
        if (response.ok) {
          setMessage('');
          fetchChatHistory(currentUser, selectedUser.Id);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div className="container">
      <button onClick={goBack}>Back</button>
      <h1>Chat Screen</h1>

      <select onChange={handleUserChange}>
        <option value="">Select user to chat with</option>
        {users.map(user => (
          <option key={user.Id} value={user.Id}>{user.UserName}</option>
        ))}
      </select>

      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <p key={index}>
            <strong>{msg.SenderUserId === currentUser ? 'You' : selectedUser.UserName}</strong>: {msg.Message}
          </p>
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
