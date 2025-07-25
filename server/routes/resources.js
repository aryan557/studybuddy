const express = require('express');
const Resource = require('../models/Resource');
const User = require('../models/User');
const router = express.Router();

// POST /api/resources - add a resource
router.post('/', async (req, res) => {
  try {
    const { name, link, description, owner, sharedWith } = req.body;
    if (!name || !link || !owner) return res.status(400).json({ error: 'Missing required fields' });
    const resource = await Resource.create({ name, link, description, owner, sharedWith });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/resources/:userId - get all resources for user and their buddies
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('buddies');
    if (!user) return res.status(404).json({ error: 'User not found' });
    const buddyIds = user.buddies.map(b => b._id);
    const resources = await Resource.find({
      $or: [
        { owner: user._id },
        { owner: { $in: buddyIds } },
        { sharedWith: user._id }
      ]
    }).populate('owner', 'name email photo');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/resources/search/:userId?name=... - search resources by name for user and buddies
router.get('/search/:userId', async (req, res) => {
  try {
    const { name } = req.query;
    const user = await User.findById(req.params.userId).populate('buddies');
    if (!user) return res.status(404).json({ error: 'User not found' });
    const buddyIds = user.buddies.map(b => b._id);
    const query = {
      $or: [
        { owner: user._id },
        { owner: { $in: buddyIds } },
        { sharedWith: user._id }
      ]
    };
    if (name) query.name = { $regex: name, $options: 'i' };
    const resources = await Resource.find(query).populate('owner', 'name email photo');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 