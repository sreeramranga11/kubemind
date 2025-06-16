import React, { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

interface CubeFaceProps {
  faceName: string;
  onFaceComplete: (colors: string[][]) => void;
}

const CubeFace: React.FC<CubeFaceProps> = ({ faceName, onFaceComplete }) => {
  const [colors, setColors] = useState<string[][]>(
    Array(3).fill(Array(3).fill('white'))
  );

  const handleCellClick = (row: number, col: number) => {
    const colorOptions = ['white', 'yellow', 'red', 'orange', 'blue', 'green'];
    const newColors = colors.map(row => [...row]);
    const currentColorIndex = colorOptions.indexOf(newColors[row][col]);
    const nextColorIndex = (currentColorIndex + 1) % colorOptions.length;
    newColors[row][col] = colorOptions[nextColorIndex];
    setColors(newColors);
    onFaceComplete(newColors);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {faceName} Face
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, width: 300 }}>
        {colors.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <Paper
              key={`${rowIndex}-${colIndex}`}
              sx={{
                height: 80,
                backgroundColor: color,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default CubeFace; 