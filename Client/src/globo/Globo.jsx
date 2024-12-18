import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import earthMapDay from '../assets/earth_map_day.jpg';
import earthMapNight from '../assets/earth_map_night.jpg';

function Globo({ isDay }) {
  const texture = useLoader(THREE.TextureLoader, isDay ? earthMapDay : earthMapNight);
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.00001;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Globo;
