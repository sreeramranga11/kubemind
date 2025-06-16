import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'expo-three';

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
  const meshRef = React.useRef<THREE.Mesh>(null);
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

const CubeGroup: React.FC<Cube3DProps> = ({ onFaceSelect, cubeState }) => {
  const [rotation, setRotation] = React.useState<[number, number, number]>([0, 0, 0]);
  const groupRef = React.useRef<THREE.Group>(null);
  // Animate rotation if you want, or remove if not needed
  // React.useEffect(() => { ... });
  // Or useFrame for animation
  // import { useFrame } from '@react-three/fiber';
  // useFrame(() => { ... });

  return (
    <group ref={groupRef} rotation={rotation}>
      {/* Front face */}
      <CubeFace
        position={[0, 0, 0.5]}
        rotation={[0, 0, 0]}
        color={cubeState.front[1][1]}
        onClick={() => onFaceSelect('front')}
      />
      {/* Back face */}
      <CubeFace
        position={[0, 0, -0.5]}
        rotation={[0, Math.PI, 0]}
        color={cubeState.back[1][1]}
        onClick={() => onFaceSelect('back')}
      />
      {/* Top face */}
      <CubeFace
        position={[0, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        color={cubeState.top[1][1]}
        onClick={() => onFaceSelect('top')}
      />
      {/* Bottom face */}
      <CubeFace
        position={[0, -0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        color={cubeState.bottom[1][1]}
        onClick={() => onFaceSelect('bottom')}
      />
      {/* Left face */}
      <CubeFace
        position={[-0.5, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        color={cubeState.left[1][1]}
        onClick={() => onFaceSelect('left')}
      />
      {/* Right face */}
      <CubeFace
        position={[0.5, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        color={cubeState.right[1][1]}
        onClick={() => onFaceSelect('right')}
      />
    </group>
  );
};

const Cube3D: React.FC<Cube3DProps> = (props) => {
  return (
    <Canvas style={{ flex: 1 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CubeGroup {...props} />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
};

export default Cube3D; 