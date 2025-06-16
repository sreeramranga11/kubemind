import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Cube state endpoint
app.post('/api/cube/state', (req, res) => {
  // TODO: Implement cube state processing
  res.json({ message: 'Cube state received' });
});

// Solution endpoint
app.get('/api/cube/solution', (req, res) => {
  // TODO: Implement solution generation
  res.json({ message: 'Solution endpoint' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 