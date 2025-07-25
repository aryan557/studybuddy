const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET /api/buddies/search?interest=math
router.get('/search', async (req, res) => {
  try {
    const { interest, exclude } = req.query;
    const query = interest ? { interests: interest } : {};
    if (exclude) {
      query._id = { $ne: exclude };
    }
    const users = await User.find(query).select('-favorites -buddies');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/buddies/add
router.post('/add', async (req, res) => {
  try {
    const { userId, buddyId } = req.body;
    if (!userId || !buddyId) return res.status(400).json({ error: 'Missing userId or buddyId' });
    // Add buddyId to userId's buddies
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { buddies: buddyId } },
      { new: true }
    );
    // Add userId to buddyId's buddies (bidirectional)
    await User.findByIdAndUpdate(
      buddyId,
      { $addToSet: { buddies: userId } },
      { new: true }
    );
    // Return updated buddies for userId
    const user = await User.findById(userId).populate('buddies', 'name email photo');
    res.json(user.buddies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/buddies/remove
router.post('/remove', async (req, res) => {
  try {
    const { userId, buddyId } = req.body;
    if (!userId || !buddyId) return res.status(400).json({ error: 'Missing userId or buddyId' });
    // Remove buddyId from userId's buddies
    await User.findByIdAndUpdate(
      userId,
      { $pull: { buddies: buddyId } },
      { new: true }
    );
    // Remove userId from buddyId's buddies (bidirectional)
    await User.findByIdAndUpdate(
      buddyId,
      { $pull: { buddies: userId } },
      { new: true }
    );
    // Return updated buddies for userId
    const user = await User.findById(userId).populate('buddies', 'name email photo');
    res.json(user.buddies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/buddies/:userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('buddies', 'name email photo');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.buddies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 