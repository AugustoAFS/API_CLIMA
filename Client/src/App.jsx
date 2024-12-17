import React, { useState, useEffect } from 'react';
import './css/App.css';
import './css/index.css';
import './css/Card.css';
import { Canvas } from '@react-three/fiber';
import Globo from './globo/Globo';
import Luzes from './globo/Luzes';
import Card from './components/Card';
import ToggleButton from './components/ToggleButton';
import { OrbitControls } from '@react-three/drei';

function App() {
  const [isDay, setIsDay] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  

  const toggleImage = () => {
    setIsDay(!isDay);
  };

  useEffect(() => {
    document.body.className = isDay ? 'day-theme' : 'night-theme';
  }, [isDay]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    console.log('Cidade selecionada:', city);
  };

  return (
    <div className="App">     
      <div className="content">
        <h1 className="titulo">API CLIMA</h1>
        <ToggleButton isDay={isDay} onToggle={toggleImage} />
        <div className="card-container">
          <Card onCitySelect={handleCitySelect} />
        </div>
        <div className="canvas-container">
          <Canvas
            camera={{
              position: [0, 0, 3],
              fov: 75,
              near: 0.1,
              far: 100,
            }}
          >
            <Luzes isDay={isDay} />
            <Globo isDay={isDay} selectedCity={selectedCity} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
