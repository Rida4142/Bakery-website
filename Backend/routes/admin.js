const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getDashboard,
  getRevenueReport,
  getOrdersReport,
  getTopProducts,
  getSalesHistory
} = require('../controllers/dashboardController');

router.get('/dashboard', protect, getDashboard);
router.get('/reports/revenue', protect, getRevenueReport);
router.get('/reports/orders', protect, getOrdersReport);
router.get('/reports/top-products', protect, getTopProducts);
router.get('/reports/sales-history', protect, getSalesHistory);

module.exports = router;