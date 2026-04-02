import { Router } from 'express';
import db from '../db.js';
import { authenticate } from './auth.js';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, phone, date, time, guests, occasion, notes, user_id } = req.body;
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Name, phone, date, time, and guests are required' });
  }
  try {
    const result = db.prepare(
      'INSERT INTO reservations (user_id, name, email, phone, date, time, guests, occasion, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(user_id || null, name, email, phone, date, time, guests, occasion, notes);
    res.json({ success: true, reservationId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

router.get('/my', authenticate, (req, res) => {
  const reservations = db.prepare('SELECT * FROM reservations WHERE user_id = ? ORDER BY date DESC, time DESC').all(req.user.id);
  res.json({ reservations });
});

router.put('/:id/cancel', authenticate, (req, res) => {
  db.prepare('UPDATE reservations SET status = ? WHERE id = ? AND user_id = ?').run('cancelled', req.params.id, req.user.id);
  res.json({ success: true });
});

export default router;