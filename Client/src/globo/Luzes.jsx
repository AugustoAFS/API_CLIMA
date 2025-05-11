import React from 'react';

function Luzes({ isDay }) {
  return (
    <>
      <ambientLight intensity={isDay ? 1.5 : 20} />
      
      <directionalLight position={[5, 5, 5]} intensity={isDay ? 2 : 0.5} />
      
      <directionalLight position={[-5, -5, -5]} intensity={isDay ? 0.7 : 0.2} />
    </>
  );
}

export default Luzes;