const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');
const {
  getDashboard,
  getRevenueReport,
  getOrdersReport,
  getTopProducts,
  getSalesHistory
} = require('../controllers/dashboardController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

router.get('/dashboard', protect, getDashboard);
router.get('/reports/revenue', protect, getRevenueReport);
router.get('/reports/orders', protect, getOrdersReport);
router.get('/reports/top-products', protect, getTopProducts);
router.get('/reports/sales-history', protect, getSalesHistory);

module.exports = router;