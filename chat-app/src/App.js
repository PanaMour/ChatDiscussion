import React, { useState } from "react";
import Chat from "./Chat";
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState("home");

  if (screen === "userSelection") {
    return (
      <div className="container">
        <h1>Select User</h1>
        <form onSubmit={(e) => { e.preventDefault(); setScreen("chat"); }}>
          <input 
            type="text" 
            onChange={(e) => setCurrentUser(e.target.value)}
            placeholder="Enter your name..."
          />
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
