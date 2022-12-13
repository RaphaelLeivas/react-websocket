import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import './App.css'

const WS_SERVER_IP_CASA = '192.168.0.71'
const WS_SERVER_PORT = '3001'

function App() {
  const [number, setNumber] = useState(0)
  const { sendMessage } = useWebSocket(`ws://${WS_SERVER_IP_CASA}:${WS_SERVER_PORT}/`, {
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
      <p className='counter'>{number}</p>

      <div className='buttonsContainer'>
        <button className='button' onClick={() => sendMessage("Sent from button")} >
          Simulate
        </button>

        <button className='button' onClick={() => setNumber(prev => prev + 1)} >
          Increase Counter
        </button>

        <button className='button' onClick={() => setNumber(0)} >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
