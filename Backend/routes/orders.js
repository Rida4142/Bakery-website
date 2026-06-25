const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');

// Public — customer checkout
router.post('/', createOrder);

// GET /api/orders/track/:orderNumber — public
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Admin — order management
router.get('/admin', protect, getOrders);
router.get('/admin/:id', protect, getOrderById);
router.patch('/admin/:id/status', protect, updateOrderStatus);

module.exports = router;