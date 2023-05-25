import React, { useState } from "react";
import Chat from "./Chat";
import './App.css';

function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "home") {
    return (
      <div className="container">
        <h1>TA Web UI</h1>
        <button onClick={() => setScreen("chat")}>Chat/Discussion</button>
      </div>
    );
  }

  if (screen === "chat") {
    return <Chat goBack={() => setScreen("home")} />;
  }

  return null;
}

export default App;
