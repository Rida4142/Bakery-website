const Product = require('../models/Product');

// GET /api/products — public, returns available products grouped usably
const getProducts = async (req, res) => {
  try {
    const filter = { available: true };
    if (req.query.category) filter.categoryId = req.query.category;

    const products = await Product.find(filter)
      .populate('categoryId', 'name sortOrder')
      .sort({ 'categoryId.sortOrder': 1, name: 1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/products/:id — public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/products — admin, returns ALL products including unavailable
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('categoryId', 'name sortOrder')
      .sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/admin/products
const createProduct = async (req, res) => {
  try {
    const bakeryId = req.user.bakeryId;
    const product = await Product.create({ bakeryId, ...req.body });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/admin/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/admin/products/:id
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH /api/admin/products/:id/toggle — quick hide/show without full edit
const toggleAvailability = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.available = !product.available;
    await product.save();
    res.json({ message: `Product is now ${product.available ? 'available' : 'hidden'}`, product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getProducts, getProductById, getAllProducts, createProduct, updateProduct, deleteProduct, toggleAvailability };