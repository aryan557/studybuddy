const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET /api/profile/:userId - public profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-favorites -buddies');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/profile/:userId - update own profile
router.put('/:userId', async (req, res) => {
  try {
    const { name, interests, photo } = req.body;
    const update = {};
    if (name) update.name = name;
    if (Array.isArray(interests)) update.interests = interests;
    if (photo) update.photo = photo;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: update },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 