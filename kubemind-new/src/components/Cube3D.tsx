import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei/native';
import * as THREE from 'three';
import { View, StyleSheet } from 'react-native';

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

const CubeScene: React.FC<{
  cubeState: Cube3DProps['cubeState'];
  onFaceSelect: (face: string) => void;
}> = ({ cubeState, onFaceSelect }) => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotation[0];
      groupRef.current.rotation.y = rotation[1];
      groupRef.current.rotation.z = rotation[2];
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
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
      <OrbitControls enablePan={false} />
    </>
  );
};

const Cube3D: React.FC<Cube3DProps> = ({ onFaceSelect, cubeState }) => {
  return (
    <View style={styles.container}>
      <Canvas>
        <CubeScene cubeState={cubeState} onFaceSelect={onFaceSelect} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Cube3D;