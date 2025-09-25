const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get user cart
  router.get('/:id/cart', (req, res) => {
    const userId = req.params.id;
    db.all(
      `SELECT Orders.id, Products.id as productId, Products.name, Products.price, Orders.quantity, Products.image
       FROM Orders
       JOIN Products ON Orders.product_id = Products.id
       WHERE Orders.user_id = ? AND Orders.status = 'Pending'`,
      [userId],
      (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
      }
    );
  });

  // Add to cart
  router.post('/:id/cart', (req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;
    db.run(
      'INSERT INTO Orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity],
      function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true, orderId: this.lastID });
      }
    );
  });

  // Remove from cart
  router.delete('/cart/:id', (req, res) => {
    const orderId = req.params.id;
    db.run(
      'DELETE FROM Orders WHERE id = ?',
      [orderId],
      function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true });
      }
    );
  });

  // Get user orders
  router.get('/:id/orders', (req, res) => {
    const userId = req.params.id;
    db.all(
      `SELECT Orders.id, Products.name, Products.price, Orders.quantity, Orders.status, Products.image
       FROM Orders
       JOIN Products ON Orders.product_id = Products.id
       WHERE Orders.user_id = ? AND Orders.status != 'Pending'`,
      [userId],
      (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
      }
    );
  });

  // Checkout
  router.post('/:id/checkout', (req, res) => {
    const userId = req.params.id;
    db.run(
      'UPDATE Orders SET status = "Processing" WHERE user_id = ? AND status = "Pending"',
      [userId],
      function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true });
      }
    );
  });

  return router;
};
