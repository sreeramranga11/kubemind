import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import CubeFace from './components/CubeFace';

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

function App() {
  const [cubeState, setCubeState] = useState<CubeState>(initialCubeState);
  const [currentFace, setCurrentFace] = useState<string>('front');
  const [solution, setSolution] = useState<string[]>([]);

  const handleFaceComplete = (face: string, colors: string[][]) => {
    setCubeState(prev => ({
      ...prev,
      [face]: colors,
    }));
  };

  const handleSolve = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cube/solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cubeState),
      });
      const data = await response.json();
      setSolution(data.solution || ['Solution will be implemented with ML model']);
    } catch (error) {
      console.error('Error getting solution:', error);
      setSolution(['Error getting solution. Please try again.']);
    }
  };

  const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Rubik's Cube Solver
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {faces.map(face => (
            <CubeFace
              key={face}
              faceName={face}
              onFaceComplete={(colors) => handleFaceComplete(face, colors)}
            />
          ))}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSolve}
          >
            Solve Cube
          </Button>
        </Box>

        {solution.length > 0 && (
          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Solution Steps:
            </Typography>
            {solution.map((step, index) => (
              <Typography key={index} paragraph>
                {index + 1}. {step}
              </Typography>
            ))}
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App;
