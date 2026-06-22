const Bakery = require('../models/Bakery');

// GET /api/settings — public, frontend reads this to bootstrap the UI
const getSettings = async (req, res) => {
  try {
    const bakery = await Bakery.findOne();
    if (!bakery) return res.status(404).json({ message: 'Bakery not found' });
    res.json(bakery);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/admin/settings — admin updates name, phone, theme, etc.
const updateSettings = async (req, res) => {
  try {
    const bakery = await Bakery.findOne();
    if (!bakery) return res.status(404).json({ message: 'Bakery not found' });

    const allowed = ['bakeryName', 'phone', 'whatsappNumber', 'address', 'logo', 'theme'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) bakery[field] = req.body[field];
    });

    await bakery.save();
    res.json(bakery);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getSettings, updateSettings };