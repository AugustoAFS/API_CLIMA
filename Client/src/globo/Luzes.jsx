import React from 'react';

function Luzes({ isDay }) {
  return (
    <>
      {/* Luz ambiente mais forte, mais suave durante a noite */}
      <ambientLight intensity={isDay ? 1.5 : 20} />
      
      {/* Luz direcional mais intensa durante o dia */}
      <directionalLight position={[5, 5, 5]} intensity={isDay ? 2 : 0.5} />
      
      {/* Luz direcional mais suave durante a noite */}
      <directionalLight position={[-5, -5, -5]} intensity={isDay ? 0.7 : 0.2} />
    </>
  );
}

export default Luzes;