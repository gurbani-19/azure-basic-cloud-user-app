const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Invalid name' });
    }

    const user = new User({ name });
    await user.save();

    res.json({ message: 'User created', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

module.exports = router;
