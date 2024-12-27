import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import earthMapDay from '../assets/earth_map_day.jpg';
import earthMapNight from '../assets/earth_map_night.jpg';

function Globo({ isDay, selectedCity }) {
  const texture = useLoader(THREE.TextureLoader, isDay ? earthMapDay : earthMapNight);
  const globeRef = useRef();
  const targetRef = useRef();
  const rotationSpeed = selectedCity ? 0.1 : 0.01;

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += rotationSpeed; 
    }
  });

  const cardinalPoints = [
    { name: 'N', coords: [-90, 0], color: 'blue' },
    { name: 'S', coords: [90, 0], color: 'green' },
    { name: 'E', coords: [0, 90], color: 'yellow' },
    { name: 'W', coords: [0, -90], color: 'orange' },
  ];

  const latLongToPosition = (lat, lon) => {
    const radius = 1;
    const phi = (lat + 90) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
  };

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
      {cardinalPoints.map((point, index) => {
        const [x, y, z] = latLongToPosition(point.coords[0], point.coords[1]);
        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color={point.color} />
            <Text position={[x * 1.1, y * 1.1, z * 1.1]} fontSize={0.05} color={point.color} anchorX="center" anchorY="middle">
              {point.name}
            </Text>
          </mesh>
        );
      })}
    </mesh>
  );
}

export default Globo;
