import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import Cube3D from './src/components/Cube3D';
import CameraScanner from './src/components/CameraScanner';

interface CubeState {
  front: string[][];
  back: string[][];
  top: string[][];
  bottom: string[][];
  left: string[][];
  right: string[][];
}

const initialCubeState: CubeState = {
  front: Array(3).fill(Array(3).fill('white')),
  back: Array(3).fill(Array(3).fill('white')),
  top: Array(3).fill(Array(3).fill('white')),
  bottom: Array(3).fill(Array(3).fill('white')),
  left: Array(3).fill(Array(3).fill('white')),
  right: Array(3).fill(Array(3).fill('white')),
};

export default function App() {
  const [cubeState, setCubeState] = useState<CubeState>(initialCubeState);
  const [selectedFace, setSelectedFace] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [solution, setSolution] = useState<string[]>([]);

  const handleFaceSelect = (face: string) => {
    setSelectedFace(face);
    setShowCamera(true);
  };

  const handleFaceScanned = (colors: string[][]) => {
    if (selectedFace) {
      setCubeState(prev => ({
        ...prev,
        [selectedFace]: colors,
      }));
    }
    setShowCamera(false);
    setSelectedFace(null);
  };

  const handleSolve = async () => {
    // TODO: Implement solution generation
    setSolution(['Solution will be implemented with ML model']);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rubik's Cube Solver</Text>
      
      <View style={styles.cubeContainer}>
        <Cube3D
          cubeState={cubeState}
          onFaceSelect={handleFaceSelect}
        />
      </View>

      <TouchableOpacity
        style={styles.solveButton}
        onPress={handleSolve}
      >
        <Text style={styles.buttonText}>Solve Cube</Text>
      </TouchableOpacity>

      {solution.length > 0 && (
        <View style={styles.solutionContainer}>
          <Text style={styles.solutionTitle}>Solution Steps:</Text>
          {solution.map((step, index) => (
            <Text key={index} style={styles.solutionStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      )}

      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <CameraScanner
          onFaceScanned={handleFaceScanned}
          onClose={() => setShowCamera(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  cubeContainer: {
    flex: 1,
    aspectRatio: 1,
    marginVertical: 20,
  },
  solveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  solutionContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  solutionStep: {
    fontSize: 16,
    marginVertical: 5,
  },
});
