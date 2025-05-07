import React, { useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import earthMapDay from '../assets/earth_map_day.jpg';
import earthMapNight from '../assets/earth_map_night.jpg';
import './Globo.css';

function Globo({ isDay, selectedCity, onRotationComplete }) {
  const texture = useLoader(THREE.TextureLoader, isDay ? earthMapDay : earthMapNight);
  const globeRef = useRef();
  const [scale, setScale] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [targetPosition, setTargetPosition] = useState([0, 0, 3]);

  useEffect(() => {
    if (selectedCity) {
      // Calcula a posição do ponto no globo
      const [x, y, z] = latLongToPosition(selectedCity.lat, selectedCity.lon);
      
      // Calcula o ângulo de rotação baseado na longitude
      const targetAngle = -(selectedCity.lon * Math.PI) / 180;
      setTargetRotation(targetAngle);
      setIsRotating(true);
      
      // Ajusta a posição da câmera para centralizar o ponto
      const distance = 2.5;
      const rightOffset = 2.5;
      const upOffset = 0.2;
      setTargetPosition([
        x * distance + rightOffset,
        y * distance + upOffset,
        z * distance
      ]);
      
      // Inicia a animação de zoom
      setIsZooming(true);
      setScale(1.2);
      
      // Após 4 segundos, retorna ao tamanho normal
      const zoomTimer = setTimeout(() => {
        setScale(1.2);
        setIsZooming(false);
        setIsRotating(false);
        if (onRotationComplete) {
          onRotationComplete();
        }
      }, 3000);
      
      return () => {
        clearTimeout(zoomTimer);
      };
    }
  }, [selectedCity, onRotationComplete]);

  useFrame(({ camera }) => {
    if (globeRef.current) {
      if (isRotating) {
        // Rotação suave até o ponto de referência
        const currentRotation = globeRef.current.rotation.y;
        const newRotation = THREE.MathUtils.lerp(
          currentRotation,
          targetRotation,
          0.05
        );
        globeRef.current.rotation.y = newRotation;

        // Suaviza o movimento da câmera
        camera.position.lerp(new THREE.Vector3(...targetPosition), 0.05);
        camera.lookAt(0, 0, 0);
      } else if (!selectedCity) {
        // Rotação contínua normal apenas quando não há cidade selecionada
        globeRef.current.rotation.y += 0.01;
      }
      
      // Suaviza a escala
      globeRef.current.scale.setScalar(
        THREE.MathUtils.lerp(globeRef.current.scale.x, scale, 0.05)
      );
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
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
  };

  return (
    <mesh ref={globeRef} className={`globe ${selectedCity ? 'selected' : ''}`}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
      
      {selectedCity && (
        <group>
          <mesh position={latLongToPosition(selectedCity.lat, selectedCity.lon)}>
            <sphereGeometry args={[0.02, 32, 32]} />
            <meshBasicMaterial color="red" />
          </mesh>
          <Text
            position={latLongToPosition(selectedCity.lat, selectedCity.lon).map(coord => coord * 1.1)}
            fontSize={0.05}
            color="red"
            anchorX="center"
            anchorY="middle"
          >
            {selectedCity.name}
          </Text>
        </group>
      )}

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
