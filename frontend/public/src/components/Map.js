import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const Map = ({ routes }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {routes.map((route, index) => (
        <Polyline key={index} positions={route.map(coord => [coord.lat, coord.lng])} />
      ))}
    </MapContainer>
  );
};

export default Map;
