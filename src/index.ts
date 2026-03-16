import express from 'express';
import cors from 'cors';
import { config } from './config';
import weatherRouter from './routes/weather';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'MeteoCi API' });
});

app.use('/api/weather', weatherRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});

app.listen(config.port, () => {
  console.log(`MeteoCi API démarrée sur http://localhost:${config.port}`);
  console.log(`  GET /health`);
  console.log(`  GET /api/weather/:city`);
});
