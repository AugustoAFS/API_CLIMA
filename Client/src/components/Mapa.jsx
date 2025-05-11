import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = ({ coordinates, mapHeight = '500px', isGlobeRotating }) => {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!coordinates) {
      console.log("Coordenadas não fornecidas!");
      return;
    }

    if (!isGlobeRotating) {
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        const newMap = L.map(mapRef.current, {
          center: [coordinates.lat, coordinates.lon],
          zoom: 4,
          scrollWheelZoom: true,
          fadeAnimation: true,
          zoomAnimation: true,
          markerZoomAnimation: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 50,
        }).addTo(newMap);

        const marker = L.marker([coordinates.lat, coordinates.lon], {
          riseOnHover: true,
          riseOffset: 300
        }).addTo(newMap);

        newMap.flyTo([coordinates.lat, coordinates.lon], 13, {
          duration: 2,
          easeLinearity: 0.25
        });

        newMap.invalidateSize();
        mapInstanceRef.current = newMap;
        setIsLoading(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [coordinates, isGlobeRotating]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: mapHeight,
        opacity: isLoading || isGlobeRotating ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      {(isLoading || isGlobeRotating) && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          fontSize: '1.2rem',
          textAlign: 'center'
        }}>
          Carregando mapa...
        </div>
      )}
    </div>
  );
};

export default Mapa;
