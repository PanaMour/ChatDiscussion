import React, { useState } from 'react';
import Home from './Home';
import Chat from './Chat';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(true);
  };

  return (
    <div>
      {isChatOpen ? <Chat /> : <Home onChatClick={handleChatClick} />}
    </div>
  );
};

export default App;
