import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Cube3DProps {
  onFaceSelect: (face: string) => void;
  cubeState: {
    front: string[][];
    back: string[][];
    top: string[][];
    bottom: string[][];
    left: string[][];
    right: string[][];
  };
}

const CubeFace: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  onClick: () => void;
}> = ({ position, rotation, color, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={onClick}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Cube3D: React.FC<Cube3DProps> = ({ onFaceSelect, cubeState }) => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotation[0];
      groupRef.current.rotation.y = rotation[1];
      groupRef.current.rotation.z = rotation[2];
    }
  });

  const handleFaceClick = (face: string) => {
    onFaceSelect(face);
  };

  return (
    <Canvas style={{ flex: 1 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
        {/* Front face */}
        <CubeFace
          position={[0, 0, 0.5]}
          rotation={[0, 0, 0]}
          color={cubeState.front[1][1]}
          onClick={() => handleFaceClick('front')}
        />
        {/* Back face */}
        <CubeFace
          position={[0, 0, -0.5]}
          rotation={[0, Math.PI, 0]}
          color={cubeState.back[1][1]}
          onClick={() => handleFaceClick('back')}
        />
        {/* Top face */}
        <CubeFace
          position={[0, 0.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color={cubeState.top[1][1]}
          onClick={() => handleFaceClick('top')}
        />
        {/* Bottom face */}
        <CubeFace
          position={[0, -0.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color={cubeState.bottom[1][1]}
          onClick={() => handleFaceClick('bottom')}
        />
        {/* Left face */}
        <CubeFace
          position={[-0.5, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          color={cubeState.left[1][1]}
          onClick={() => handleFaceClick('left')}
        />
        {/* Right face */}
        <CubeFace
          position={[0.5, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          color={cubeState.right[1][1]}
          onClick={() => handleFaceClick('right')}
        />
      </group>
      <OrbitControls enablePan={false} />
    </Canvas>
  );
};

export default Cube3D; 