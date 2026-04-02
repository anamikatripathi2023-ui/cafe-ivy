import { Router } from 'express';
import db from '../db.js';
import { authenticate } from './auth.js';

const router = Router();

router.get('/', (req, res) => {
  const reviews = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 50').all();
  const avg = db.prepare('SELECT AVG(rating) as average, COUNT(*) as total FROM reviews').get();
  res.json({ reviews, average: avg.average?.toFixed(1) || '0', total: avg.total });
});

router.post('/', authenticate, (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }
  const result = db.prepare('INSERT INTO reviews (user_id, name, rating, comment) VALUES (?, ?, ?, ?)').run(req.user.id, req.user.name, rating, comment);
  res.json({ success: true, reviewId: result.lastInsertRowid });
});

export default router;