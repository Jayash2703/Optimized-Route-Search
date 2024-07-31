import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Home = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    socket.on('trafficUpdate', (data) => {
      console.log('Traffic update:', data);
      // Update routes based on real-time traffic data
    });

    return () => {
      socket.off('trafficUpdate');
    };
  }, []);

  const handleOptimizeRoute = async () => {
    const response = await axios.post('http://localhost:5000/api/routes/optimize', {
      start: { lat: 51.505, lng: -0.09 },
      end: { lat: 51.52, lng: -0.12 },
      robots: [/* robot data here */],
    });
    setRoutes(response.data.path);
  };

  return (
    <div>
      <button onClick={handleOptimizeRoute}>Optimize Route</button>
      <Map routes={routes} />
    </div>
  );
};

export default Home;
