import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Importando texturas do globo (dia e noite)
import earthMapDay from '../assets/earth_map_day.jpg';
import earthMapNight from '../assets/earth_map_night.jpg';

function Globo({ isDay }) {
  // Carregando a textura com base no estado do dia ou noite
  const texture = useLoader(THREE.TextureLoader, isDay ? earthMapDay : earthMapNight);

  // Referência para o globo para controlar a rotação
  const globeRef = useRef();

  // Animação do globo - rotação contínua
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.01; // Incremento de rotação no eixo Y
    }
  });

  return (
    <mesh ref={globeRef}>
      {/* Geometria da esfera representando o globo */}
      <sphereGeometry args={[1, 32, 32]} />
      
      {/* Material do globo usando a textura carregada */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Globo;
