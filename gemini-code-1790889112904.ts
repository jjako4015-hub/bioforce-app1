import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Rotating 3D Emerald Star
function RotatingStar() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 1.2;
    meshRef.current.rotation.x += delta * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, -1.2, 0]}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color="#10b981"
        emissive="#059669"
        emissiveIntensity={0.8}
        wireframe={false}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// Interactive 3D Platform/Placeholder Avatar
function AvatarPlatform({ characterName }: { characterName: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Platform Base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.3, 32]} />
        <meshStandardMaterial color="#064e3b" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Futuristic Hologram Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0.2, 0]}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <MeshWobbleMaterial
            color="#34d399"
            factor={0.3}
            speed={1.5}
            roughness={0.1}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

interface Props {
  characterName: string;
}

export const CharacterViewer: React.FC<Props> = ({ characterName }) => {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#34d399" />

        <AvatarPlatform characterName={characterName} />
        <RotatingStar />

        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};