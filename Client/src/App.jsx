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
import { OrbitControls } from '@react-three/drei';
import 'leaflet/dist/leaflet.css';

function App() {
  const [isDayTheme, setIsDayTheme] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isGlobeVisible, setIsGlobeVisible] = useState(true);

  const toggleTheme = () => {
    setIsDayTheme(!isDayTheme);
  };

  useEffect(() => {
    document.body.className = isDayTheme ? 'day-theme' : 'night-theme';
  }, [isDayTheme]);

  useEffect(() => {
    if (selectedCity) {
      setShowMap(true);
      setIsGlobeVisible(false);
    } else {
      setShowMap(false);
      setIsGlobeVisible(true);
    }
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setIsSearching(true);
    setShowMap(false);

    setTimeout(() => {
      setSelectedCity({
        lat: city.lat,
        lon: city.lon,
      });
      setIsSearching(false);
    }, 3000);
  };

  const handleSearchReset = () => {
    setShowMap(false);
    setTimeout(() => {
      setShowMap(true);
    }, 2000);
  };

  return (
    <div className="App">
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
          <Canvas id='canvas'
            camera={{
              position: [0, 0, 3],
              fov: 75,
              near: 0.1,
              far: 100,
            }}
          >
            <Luzes isDay={isDayTheme} />
            <Globo
              isDay={isDayTheme}
              selectedCity={selectedCity}
              isSearching={isSearching}
            />
            <OrbitControls />
          </Canvas>

          <div className={`Mapa-Container ${showMap ? 'show' : 'hide'}`}>
            {isSearching ? (
              <p>Carregando mapa...</p>
            ) : selectedCity ? (
              <Mapa coordinates={selectedCity} />
            ) : (
              <p className="no-city-message">Selecione uma cidade para visualizar o mapa.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
