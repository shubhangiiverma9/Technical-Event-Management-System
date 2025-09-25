const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(
      "SELECT * FROM Users WHERE email = ? AND password = ?",
      [email, password],
      (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (user) {
          res.json({ success: true, role: user.role, userId: user.id });
        } else {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      }
    );
  });

  return router;
};
