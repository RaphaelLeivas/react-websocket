import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

function App() {
  const [number, setNumber] = useState(0)
  const { sendMessage } = useWebSocket('ws://localhost:3001/', {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: () => {
      setNumber(prev => prev + 1)
    },
    queryParams: { 'token': '123456' },
    onError: (event) => { console.error(event); },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000,
  });

  return (
    <div>
      Hello World!

      <button onClick={() => sendMessage("Sent from button")} >
        Test Animation
      </button>

      {number}
    </div>
  );
}

export default App;
