import React, { useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import mapaTerraDia from '../assets/earth_map_day.jpg'; // Renomeado para melhor legibilidade
import mapaTerraNoite from '../assets/earth_map_night.jpg'; // Renomeado para melhor legibilidade

function Globo({ isDay, selectedCity }) {
  const textura = useLoader(THREE.TextureLoader, isDay ? mapaTerraDia : mapaTerraNoite);
  const globoRef = useRef();
  const marcadorRef = useRef();
  const [rotacaoAlvo, setRotacaoAlvo] = useState(0);
  const [estaRodando, setEstaRodando] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      const { lat, lng } = selectedCity;
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {

        const longitudeAlvo = THREE.MathUtils.radToDeg(Math.atan2(marcadorRef.current.position.x, marcadorRef.current.position.z));

        setRotacaoAlvo(longitudeAlvo * -1); // Define a rotação alvo

        setEstaRodando(true); // Inicia a rotação
      }
    }
  }, [selectedCity]);

  useFrame(() => {
    if (globoRef.current) {
      if (!selectedCity) {
        globoRef.current.rotation.y += 0.002; // Rotação lenta quando nenhuma cidade está selecionada
      } else if (estaRodando) {
        const rotacaoAtual = THREE.MathUtils.radToDeg(globoRef.current.rotation.y);
        let diffRotacao = rotacaoAlvo - rotacaoAtual;
        let rotacaoAjustada = rotacaoAtual + diffRotacao * 0.04;


          if (Math.abs(diffRotacao) > 1) {

            globoRef.current.rotation.y = THREE.MathUtils.degToRad(rotacaoAjustada);

        } else {
          setEstaRodando(false); // Para a rotação quando próximo o suficiente
        }
      }
    }

    if (selectedCity && globoRef.current) {
      const { lat, lng } = selectedCity;

      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        const latRad = THREE.MathUtils.degToRad(90 - lat);
        const lngRad = THREE.MathUtils.degToRad(lng);
        const raio = 1.02;

        if (marcadorRef.current) {
          const x = raio * Math.sin(latRad) * Math.cos(lngRad);
          const y = raio * Math.cos(latRad);
          const z = raio * Math.sin(latRad) * Math.sin(lngRad);

          marcadorRef.current.position.set(x, y, z);
        }
      } else {
        console.error('Coordenadas inválidas:', { lat, lng });
      }
    }
  });

  return (
    <group>
      <mesh ref={globoRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={textura} />
      </mesh>

      {selectedCity && (
        <mesh ref={marcadorRef}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}
    </group>
  );
}

export default Globo;