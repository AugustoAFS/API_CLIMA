import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = ({ coordinates, mapHeight = '500px' }) => {
  useEffect(() => {
    if (!coordinates) {
      console.log("Coordenadas não fornecidas!");
      return;
    }
    const map = L.map('mapContainer', {
      center: [coordinates.lat, coordinates.lon],
      zoom: 12,
      scrollWheelZoom: true,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 50,
    }).addTo(map);
    L.marker([coordinates.lat, coordinates.lon]).addTo(map);
    map.invalidateSize();
    return () => {
      if (map) map.remove();
    };
  }, [coordinates]);

  return (
    <div
      id="mapContainer"
      style={{
        width: '100%',
        height: mapHeight,
      }}
    ></div>
  );
};

export default Mapa;
