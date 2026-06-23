const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');

// Public — customer checkout
router.post('/', createOrder);

// Admin — order management
router.get('/admin', protect, getOrders);
router.get('/admin/:id', protect, getOrderById);
router.patch('/admin/:id/status', protect, updateOrderStatus);

module.exports = router;