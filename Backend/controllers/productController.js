const Product = require("../models/Product");

// GET /api/products?category=Cakes  OR  GET /api/products
const getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/products  (to add products — admin use)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct };