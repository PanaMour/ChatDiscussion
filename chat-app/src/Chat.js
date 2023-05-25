import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Chat = () => {
  const externalWindow = useRef(null);
  const containerDiv = useRef(null);

  useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200');

    if (!externalWindow.current) {
      // Popup blocked
      alert('Please allow pop-ups');
      return;
    }

    externalWindow.current.onload = () => {
      containerDiv.current = externalWindow.current.document.createElement('div');
      externalWindow.current.document.body.appendChild(containerDiv.current);
    }

    return () => {
      if (externalWindow.current) {
        externalWindow.current.close();
      }
    };
  }, []);

  if (containerDiv.current) {
    return ReactDOM.createPortal(
      <div>
        <h1>Chat Screen</h1>
      </div>,
      containerDiv.current
    );
  } else {
    return null;
  }
};

export default Chat;
