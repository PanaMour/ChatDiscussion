import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // For all the users
  const [currentUser, setCurrentUser] = useState(null); // The logged-in user
  const [screen, setScreen] = useState("home"); // The current screen

  // Fetch users when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/users') // Replace with your server API
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (screen === "userSelection") {
    return (
      <div className="container">
        <h1>Select User</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (currentUser) {
            setScreen("chat");
          } else {
            alert("Please select a user before proceeding to chat.");
          }
        }}>
          <select onChange={(e) => {
            const selectedUserName = e.target.value;
            const selectedUser = users.find(user => user.UserName === selectedUserName);
            console.log("Selected User:", selectedUser);
            if (selectedUser) {
              setCurrentUser(selectedUser);
            } else {
              console.error('User not found:', selectedUserName);
            }
          }}>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.Id} value={user.UserName}>{user.UserName}</option>
            ))}
          </select>
          <button type="submit">Go to Chat</button>
        </form>
      </div>
    );
  }

  if (screen === "home") {
    return (
      <div className="container">
        <h1>TA Web UI</h1>
        <button onClick={() => setScreen("userSelection")}>Chat/Discussion</button>
      </div>
    );
  }

  if (screen === "chat" && currentUser) {
  return <Chat currentUser={currentUser} goBack={() => setScreen("home")} />;
  }

  

  return null;
}

export default App;
