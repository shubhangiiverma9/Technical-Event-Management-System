const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get vendor items
  router.get('/:id/items', (req, res) => {
    const vendorId = req.params.id;
    db.all(
      'SELECT * FROM Products WHERE vendor_id = ?',
      [vendorId],
      (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
      }
    );
  });

  // Add new item
  router.post('/:id/items', (req, res) => {
    const { name, price, image } = req.body;
    const vendorId = req.params.id;
    db.run(
      'INSERT INTO Products (vendor_id, name, price, image) VALUES (?, ?, ?, ?)',
      [vendorId, name, price, image],
      function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, name, price, image });
      }
    );
  });

  // Delete item
  router.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    db.run(
      'DELETE FROM Products WHERE id = ?',
      [itemId],
      function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true });
      }
    );
  });

  return router;
};
