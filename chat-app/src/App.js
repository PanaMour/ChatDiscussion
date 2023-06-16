import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // For all the users
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState("home");

  useEffect(() => {
    fetch('http://localhost:5000/users') // Replace with your server API
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });
  }, []);  // Empty dependency array means this effect runs once on mount

  if (screen === "userSelection") {
    return (
      <div className="container">
        <h1>Select User</h1>
        <form onSubmit={(e) => { e.preventDefault(); setScreen("chat"); }}>
          <select onChange={(e) => setCurrentUser(e.target.value)}>
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

  if (screen === "chat") {
    return <Chat currentUser={currentUser} goBack={() => setScreen("home")} />;
  }
  
  return null;
}

export default App;
