import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/categories', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  res.json({ categories });
});

router.get('/', (req, res) => {
  const { category, popular, search } = req.query;
  let query = 'SELECT m.*, c.name as category_name, c.slug as category_slug FROM menu_items m JOIN categories c ON m.category_id = c.id WHERE m.available = 1';
  const params = [];

  if (category) {
    query += ' AND c.slug = ?';
    params.push(category);
  }
  if (popular === '1') {
    query += ' AND m.is_popular = 1';
  }
  if (search) {
    query += ' AND (m.name LIKE ? OR m.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY c.sort_order, m.is_popular DESC, m.name';
  const items = db.prepare(query).all(...params);
  res.json({ items });
});

router.get('/:id', (req, res) => {
  const item = db.prepare('SELECT m.*, c.name as category_name FROM menu_items m JOIN categories c ON m.category_id = c.id WHERE m.id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json({ item });
});

router.get('/full/organized', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  const menu = categories.map(cat => {
    const items = db.prepare('SELECT * FROM menu_items WHERE category_id = ? AND available = 1 ORDER BY is_popular DESC, name').all(cat.id);
    return { ...cat, items };
  });
  res.json({ menu });
});

export default router;