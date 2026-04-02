import { Router } from 'express';
import db from '../db.js';
import { authenticate } from './auth.js';

const router = Router();

router.post('/', (req, res) => {
  const { items, customer_name, customer_phone, notes, user_id } = req.body;
  if (!items?.length) return res.status(400).json({ error: 'No items in order' });

  const insertOrder = db.prepare('INSERT INTO orders (user_id, customer_name, customer_phone, total, notes) VALUES (?, ?, ?, ?, ?)');
  const insertItem = db.prepare('INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)');

  try {
    const transaction = db.transaction(() => {
      let total = 0;
      const menuItemIds = items.map(i => i.menu_item_id);
      const placeholders = menuItemIds.map(() => '?').join(',');
      const menuItems = db.prepare(`SELECT id, price FROM menu_items WHERE id IN (${placeholders})`).all(...menuItemIds);
      const priceMap = Object.fromEntries(menuItems.map(m => [m.id, m.price]));

      for (const item of items) {
        const price = priceMap[item.menu_item_id];
        if (!price) throw new Error(`Menu item ${item.menu_item_id} not found`);
        total += price * item.quantity;
      }

      const orderResult = insertOrder.run(user_id || null, customer_name, customer_phone, total.toFixed(2), notes);
      for (const item of items) {
        insertItem.run(orderResult.lastInsertRowid, item.menu_item_id, item.quantity, priceMap[item.menu_item_id]);
      }

      return { orderId: orderResult.lastInsertRowid, total: total.toFixed(2) };
    });

    const result = transaction();
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/my', authenticate, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json({ orders });
});

router.get('/:id', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const items = db.prepare(`
    SELECT oi.*, m.name, m.image FROM order_items oi 
    JOIN menu_items m ON oi.menu_item_id = m.id 
    WHERE oi.order_id = ?
  `).all(req.params.id);
  res.json({ order, items });
});

export default router;