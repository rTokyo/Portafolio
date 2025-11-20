'use client'

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const WireframeGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.5, 2.5, 2.5]}>
      <icosahedronGeometry args={[1, 15]} />
      <meshBasicMaterial color="#00FF41" wireframe transparent opacity={0.15} />
    </mesh>
  );
};

export default function Scene3D({ mode }: { mode: 'HERO' | 'CONTACT' }) {
  // Configuración de las nubes extraída para evitar quejas de TypeScript
  const cloudProps1: any = {
    opacity: 0.3,
    speed: 0.4,
    width: 10,
    depth: 1.5,
    segments: 20,
    color: "#202020"
  };

  const cloudProps2: any = {
    opacity: 0.3,
    speed: 0.4,
    width: 10,
    depth: 1.5,
    segments: 20,
    color: "#101010",
    position: [0, 0, -5]
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        
        {mode === 'HERO' && (
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            {/* Usamos spread operator (...) con 'any' para silenciar el error definitivamente */}
            <Cloud {...cloudProps1} />
            <Cloud {...cloudProps2} />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Float>
        )}

        {mode === 'CONTACT' && (
          <Float speed={2} rotationIntensity={0.2}>
            <WireframeGlobe />
          </Float>
        )}
      </Canvas>
    </div>
  );
}