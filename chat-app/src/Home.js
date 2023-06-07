import React from 'react';
import './App.css';

const Home = ({ onChatClick }) => {
  return (
    <div className="container">
      <h1>Welcome to TA Web UI</h1>
      <button onClick={() => setScreen("userSelection")}>Chat/Discussion</button>
    </div>
  );
};

export default Home;
