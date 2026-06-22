const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCategories, getAllCategories, createCategory, updateCategory, deleteCategory
} = require('../controllers/categoryController');
const {
  getProducts, getProductById, getAllProducts,
  createProduct, updateProduct, deleteProduct, toggleAvailability
} = require('../controllers/productController');
const { getSettings, updateSettings } = require('../controllers/settingsController');

// ---- PUBLIC ROUTES (no token needed — customer-facing menu) ----
router.get('/settings', getSettings);
router.get('/categories', getCategories);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// ---- ADMIN ROUTES (JWT required) ----
router.get('/admin/categories', protect, getAllCategories);
router.post('/admin/categories', protect, createCategory);
router.put('/admin/categories/:id', protect, updateCategory);
router.delete('/admin/categories/:id', protect, deleteCategory);

router.get('/admin/products', protect, getAllProducts);
router.post('/admin/products', protect, createProduct);
router.put('/admin/products/:id', protect, updateProduct);
router.delete('/admin/products/:id', protect, deleteProduct);
router.patch('/admin/products/:id/toggle', protect, toggleAvailability);

router.put('/admin/settings', protect, updateSettings);

module.exports = router;