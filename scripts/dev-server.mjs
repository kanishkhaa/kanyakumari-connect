import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

const chatHandler = (await import('../dist-api/chat.mjs')).default;
const nearbyHandler = (await import('../dist-api/nearby.mjs')).default;
const itineraryHandler = (await import('../dist-api/itinerary.mjs')).default;
app.post('/api/itinerary', (req, res) => itineraryHandler(req, res));
app.post('/api/chat', (req, res) => chatHandler(req, res));
app.get('/api/nearby', (req, res) => nearbyHandler(req, res));

const PORT = 3001;
app.listen(PORT, () => console.log(`Local API server running at http://localhost:${PORT}`));