const Category = require('../models/Category');

// GET /api/categories — public, returns active categories for the menu
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ active: true }).sort('sortOrder');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/categories — admin, returns ALL categories including hidden
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort('sortOrder');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/admin/categories
const createCategory = async (req, res) => {
  try {
    const { name, image, sortOrder } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    const bakeryId = req.user.bakeryId;
    const category = await Category.create({ bakeryId, name, image, sortOrder });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/admin/categories/:id
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/admin/categories/:id
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCategories, getAllCategories, createCategory, updateCategory, deleteCategory };