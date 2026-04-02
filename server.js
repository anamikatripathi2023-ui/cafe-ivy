import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import reservationRoutes from './routes/reservations.js';
import reviewRoutes from './routes/reviews.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', name: 'Café Ivy API' }));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);

const frontendPath = path.join(__dirname, 'public');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`☕ Café Ivy server running on http://0.0.0.0:${PORT}`);
});