import React, { useState, useEffect } from 'react';
import './App.css';

const Chat = ({ currentUser, goBack }) => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    console.log('Fetching users...');
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => {
        console.log('Users fetched:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const fetchChatHistory = (userId1, userId2) => {
    console.log(`Fetching chat history for users ${userId1} and ${userId2}...`);
    fetch(`http://localhost:5000/chats/${userId1}/${userId2}`)
      .then(response => response.json())
      .then(data => {
        console.log('Chat history fetched:', data);
        setChatHistory(data);
      })
      .catch(error => console.error(`Error fetching chat history for users ${userId1} and ${userId2}:`, error));
  };

  const handleUserChange = (selectedUser) => {
    console.log("Selected User:", selectedUser);
    setSelectedUser(selectedUser);
    setChatHistory([]);

    if (selectedUser) {
      fetchChatHistory(currentUser.ID, selectedUser.ID);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() !== '' && selectedUser) {
      console.log(`Sending message "${message}" to user ${selectedUser.ID}...`);
      fetch(`http://localhost:5000/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: currentUser.ID, recipient: selectedUser.ID, text: message }),
      })
      .then(response => {
        if (response.ok) {
          console.log('Message sent successfully');
          setMessage('');
          fetchChatHistory(currentUser.ID, selectedUser.ID);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => console.error('Error sending message:', error));
    }
  };

  return (
    <div className="container">
      <button onClick={goBack}>Back</button>
      <h1>Chat Screen</h1>
      <div className="app-content">
      <div className="sidebar">
        <h2>Users</h2>
        <div className="users-list">
          {users.filter(user => user.ID !== currentUser.ID).map(user => (
            <div 
              key={user.ID} 
              onClick={() => handleUserChange(user)} 
              className={`user-item ${selectedUser && selectedUser.ID === user.ID ? 'user-item-selected' : ''}`}
            >
              {user.UserName}
            </div>
          ))}
        </div>
      </div>

        <div className="chat">
          <div className="chat-history">
            {chatHistory.map((msg, index) => (
              <p key={msg._id && msg._id.$oid ? msg._id.$oid : index} className={`message ${msg.SenderUserId === currentUser.ID ? 'sender' : ''}`}>
                <strong>{msg.SenderUserId === currentUser.ID ? 'You' : selectedUser.UserName}</strong>: {msg.Message}
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
      </div>
    </div>
  );
};

export default Chat;
