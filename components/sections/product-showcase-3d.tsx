'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CottonBag() {
  const groupRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Bag body — rounded box */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 1.8, 0.5]} />
        <meshStandardMaterial
          color="#e8dcc8"
          roughness={0.85}
          metalness={0.05}
          bumpScale={0.02}
        />
      </mesh>

      {/* Bag opening — slight taper top */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[1.5, 0.15, 0.45]} />
        <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
      </mesh>

      {/* Handles — torus arcs */}
      <mesh ref={handleRef} position={[-0.45, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.04, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#c9b896" roughness={0.8} />
      </mesh>
      <mesh position={[0.45, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.04, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#c9b896" roughness={0.8} />
      </mesh>

      {/* Embroidery accent — small sphere cluster (decorative) */}
      <mesh position={[0, -0.1, 0.26]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial color="#b8732e" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingFibers() {
  const fibersRef = useRef<THREE.Group>(null);
  const count = 60;

  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      arr.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2,
      ]);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (fibersRef.current) {
      fibersRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={fibersRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#f0e6d2" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function ProductShowcase3D() {
  return (
    <div className="relative h-[80vh] w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <spotLight
          position={[3, 5, 3]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, -2, -3]} intensity={0.5} color="#b8732e" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <CottonBag />
        </Float>

        <FloatingFibers />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <Environment preset="dawn" />
      </Canvas>
    </div>
  );
}
