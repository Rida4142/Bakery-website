const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Bakery = require('../models/Bakery');

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required' });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, bakeryId: user.bakeryId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/auth/create-admin
// Run this ONCE to create the first admin for this bakery deployment.
// After that, protect or remove this route so strangers can't create admins.
const createAdmin = async (req, res) => {
  try {
    const { username, password, role = 'admin' } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'Username already taken' });

    const bakery = await Bakery.findOne();
    if (!bakery)
      return res.status(400).json({ message: 'No bakery found — run seed.js first' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ bakeryId: bakery._id, username, passwordHash, role });

    res.status(201).json({
      message: 'Admin created',
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/auth/me — verify token and return current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { login, createAdmin, getMe };