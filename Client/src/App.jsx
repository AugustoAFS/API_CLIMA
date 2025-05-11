import React, { useState, useEffect } from 'react';
import './css/App.css';
import './css/index.css';
import './css/Card.css';
import { Canvas } from '@react-three/fiber';
import Globo from './globo/Globo';
import Luzes from './globo/Luzes';
import Card from './components/Card';
import Mapa from './components/Mapa';
import ToggleButton from './components/ToggleButton';
import SpaceBackground from './components/SpaceBackground';
import { OrbitControls } from '@react-three/drei';
import 'leaflet/dist/leaflet.css';

function App() {
  const [isDayTheme, setIsDayTheme] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isGlobeVisible, setIsGlobeVisible] = useState(true);
  const [isGlobeRotating, setIsGlobeRotating] = useState(false);

  const toggleTheme = () => {
    setIsDayTheme(!isDayTheme);
  };

  useEffect(() => {
    document.body.className = isDayTheme ? 'day-theme' : 'night-theme';
  }, [isDayTheme]);

  useEffect(() => {
    if (selectedCity) {
      setShowMap(true);
    }
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setIsSearching(true);
    setShowMap(false);
    setSelectedCity(city);
    setIsGlobeRotating(true);

    setTimeout(() => {
      setIsSearching(false);
    }, 3000);
  };

  const handleGlobeRotationComplete = () => {
    setIsGlobeRotating(false);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="App">
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'transparent'
        }}
        camera={{
          position: [0, 0, 40],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <SpaceBackground />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          minDistance={5}
          maxDistance={50}
          target={[0, 0, 0]}
          makeDefault={true}
        />
      </Canvas>

      <div className="content">
        <header>
          <nav>
            <h1 className={`titulo ${!isDayTheme ? 'night' : ''}`}>API CLIMA</h1>
            <ToggleButton isDay={isDayTheme} onToggle={toggleTheme} />
          </nav>
        </header>

        <div className="card-container">
          <Card onCitySelect={handleCitySelect} />
        </div>

        <div className="canvas-container">
          {selectedCity && (
            <button
              onClick={toggleMap}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1000,
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              {showMap ? 'Esconder Mapa' : 'Mostrar Mapa'}
            </button>
          )}

          <div style={{ 
            position: 'relative',
            width: '100%',
            height: '100%'
          }}>
            {/* Canvas do globo */}
            <Canvas
              id='globe-canvas'
              camera={{
                position: [0, 0, 3],
                fov: 75,
                near: 0.1,
                far: 1000,
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: showMap ? 'none' : 'auto',
                zIndex: 1,
                background: 'transparent'
              }}
            >
              <Luzes isDay={isDayTheme} />
              <Globo
                isDay={isDayTheme}
                selectedCity={selectedCity}
                isSearching={isSearching}
                onRotationComplete={handleGlobeRotationComplete}
              />
              <OrbitControls 
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.6}
                panSpeed={0.5}
                rotateSpeed={0.4}
                minDistance={2}
                maxDistance={10}
                target={[0, 0, 0]}
                makeDefault={true}
              />
            </Canvas>

            {selectedCity && (
              <div 
                className={`Mapa-Container ${showMap ? 'show' : 'hide'}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 2,
                  opacity: showMap ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                  pointerEvents: showMap ? 'auto' : 'none'
                }}
              >
                <Mapa coordinates={selectedCity} isGlobeRotating={isGlobeRotating} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
