const express = require('express');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/google
// Receives Google user info from frontend and upserts user in DB
router.post('/google', async (req, res) => {
  try {
    const { googleId, name, email, photo } = req.body;
    if (!googleId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await User.findOneAndUpdate(
      { googleId },
      { name, email, photo },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 