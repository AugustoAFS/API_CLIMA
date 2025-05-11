import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

import mercuryTexture from '../assets/mercury.jpg';
import venusTexture from '../assets/venus.jpg';
import earthTexture from '../assets/earth_map_day.jpg';
import marsTexture from '../assets/mars.jpg';
import jupiterTexture from '../assets/jupiter.jpg';
import saturnTexture from '../assets/saturn.jpg';
import uranusTexture from '../assets/uranus.jpg';
import neptuneTexture from '../assets/neptune.jpg';

function SpaceBackground() {
  const textureLoader = new TextureLoader();
  const planetsRef = useRef([]);

  const mercuryTextureMap = useMemo(() => textureLoader.load(mercuryTexture), []);
  const venusTextureMap = useMemo(() => textureLoader.load(venusTexture), []);
  const earthTextureMap = useMemo(() => textureLoader.load(earthTexture), []);
  const marsTextureMap = useMemo(() => textureLoader.load(marsTexture), []);
  const jupiterTextureMap = useMemo(() => textureLoader.load(jupiterTexture), []);
  const saturnTextureMap = useMemo(() => textureLoader.load(saturnTexture), []);
  const uranusTextureMap = useMemo(() => textureLoader.load(uranusTexture), []);
  const neptuneTextureMap = useMemo(() => textureLoader.load(neptuneTexture), []);

  const planets = useMemo(() => [
    { name: 'Mercúrio', size: 0.4, distance: 5, speed: 0.04, texture: mercuryTextureMap, tilt: 0.034 },
    { name: 'Vênus', size: 0.9, distance: 7, speed: 0.015, texture: venusTextureMap, tilt: 0.001 },
    { name: 'Terra', size: 1, distance: 9, speed: 0.01, texture: earthTextureMap, tilt: 0.409 },
    { name: 'Marte', size: 0.5, distance: 11, speed: 0.008, texture: marsTextureMap, tilt: 0.439 },
    { name: 'Júpiter', size: 2.5, distance: 15, speed: 0.002, texture: jupiterTextureMap, tilt: 0.055 },
    { name: 'Saturno', size: 2.2, distance: 19, speed: 0.0009, texture: saturnTextureMap, tilt: 0.466 },
    { name: 'Urano', size: 1.8, distance: 22, speed: 0.0004, texture: uranusTextureMap, tilt: 1 },
    { name: 'Netuno', size: 1.7, distance: 25, speed: 0.0001, texture: neptuneTextureMap, tilt: 0.494 }
  ], [mercuryTextureMap, venusTextureMap, earthTextureMap, marsTextureMap, jupiterTextureMap, saturnTextureMap, uranusTextureMap, neptuneTextureMap]);

  const stars = useMemo(() => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
      transparent: true
    });

    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    return new THREE.Points(starsGeometry, starsMaterial);
  }, []);

  useFrame((state, delta) => {
    if (stars) {
      stars.rotation.y += 0.0001;
    }

    planets.forEach((planet, index) => {
      if (planetsRef.current[index]) {
        planetsRef.current[index].rotation.y += planet.speed;
      }
    });
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={50} />
      
      <primitive object={stars} />
      
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color={0xffff00} />
      </mesh>

      {planets.map((planet, index) => (
        <group 
          key={planet.name} 
          ref={el => planetsRef.current[index] = el}
          rotation={[0, 0, planet.tilt]}
        >
          <mesh position={[planet.distance, 0, 0]}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshStandardMaterial 
              map={planet.texture}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
          {planet.name === 'Saturno' && (
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[planet.distance, 0, 0]}>
              <ringGeometry args={[planet.size + 0.2, planet.size + 0.5, 64]} />
              <meshStandardMaterial 
                color={0xffffff}
                transparent={true}
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

export default SpaceBackground;