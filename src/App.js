import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import AnimatedNumber from 'react-animated-number';
import './App.css'

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
    <div className='container'>
      <AnimatedNumber
        component="text"
        value={number}
        style={{
          transition: '0.8s ease-out',
          fontSize: 96,
          transitionProperty:
            'background-color, color, opacity'
        }}
        duration={300}
        stepPrecision={1}
      />

      <button onClick={() => sendMessage("Sent from button")} >
        Test Animation
      </button>
    </div>
  );
}

export default App;
