const express = require('express');
const db = require('../database');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

// Get all users (for assigning tasks)
router.get('/', (req, res) => {
  db.all(
    'SELECT id, email, full_name, team FROM users ORDER BY full_name',
    [],
    (err, users) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
      res.json(users);
    }
  );
});

// Get current user profile
router.get('/me', (req, res) => {
  db.get(
    'SELECT id, email, full_name, team, created_at FROM users WHERE id = ?',
    [req.user.id],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch user' });
      }
      res.json(user);
    }
  );
});

module.exports = router;
