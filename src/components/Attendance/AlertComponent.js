import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io('ws://localhost:3003');

    // Listen for incoming alert messages
    socket.on('message', (message) => {
      // Parse the JSON message
      const newAlert = JSON.parse(message);
      
      // Update the alerts state with the new alert
      setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    });

    // Clean up WebSocket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Only run this effect once, on component mount

  return (
    <div>
      <h1>Alerts</h1>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            <strong>{alert.title}</strong>: {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertComponent;
