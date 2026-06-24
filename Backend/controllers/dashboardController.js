const Order = require('../models/Order');
const Product = require('../models/Product');

// ---- Helpers ----

const todayRange = () => {
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date(); end.setHours(23, 59, 59, 999);
  return { $gte: start, $lte: end };
};

const rangeFor = (period) => {
  const now = new Date();
  if (period === 'today') {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    return { $gte: start };
  }
  if (period === 'week') {
    const start = new Date(now); start.setDate(now.getDate() - 7);
    return { $gte: start };
  }
  if (period === 'month') {
    const start = new Date(now); start.setDate(1); start.setHours(0, 0, 0, 0);
    return { $gte: start };
  }
  return {}; // all time
};

// GET /api/admin/dashboard
// Returns all headline stats in one call — avoids 5 separate requests on page load
const getDashboard = async (req, res) => {
  try {
    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      totalRevenue,
      todayRevenue,
      recentOrders,
      totalProducts
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: todayRange() }),
      Order.countDocuments({ status: 'Pending' }),

      Order.aggregate([
        { $match: { status: 'Delivered' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),

      Order.aggregate([
        { $match: { status: 'Delivered', createdAt: todayRange() } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),

      Order.find().sort({ createdAt: -1 }).limit(10),
      Product.countDocuments({ available: true })
    ]);

    res.json({
      totalOrders,
      todayOrders,
      pendingOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      todayRevenue: todayRevenue[0]?.total || 0,
      recentOrders,
      totalProducts
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/reports/revenue?period=today|week|month
const getRevenueReport = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    const revenue = await Order.aggregate([
      { $match: { status: 'Delivered', createdAt: rangeFor(period) } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', orders: 1, revenue: 1, _id: 0 } }
    ]);

    res.json(revenue);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/reports/orders?period=month
const getOrdersReport = async (req, res) => {
  try {
    const statusBreakdown = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } }
    ]);

    res.json(statusBreakdown);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/reports/top-products?limit=10
// Counts product appearances across all delivered orders
const getTopProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const topProducts = await Order.aggregate([
      { $match: { status: 'Delivered' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: limit },
      { $project: { product: '$_id', totalQuantity: 1, totalRevenue: 1, _id: 0 } }
    ]);

    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/reports/sales-history?period=month
const getSalesHistory = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    const history = await Order.aggregate([
      { $match: { createdAt: rangeFor(period) } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalOrders: { $sum: 1 },
          delivered: { $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0] } },
          revenue: { $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, '$totalAmount', 0] } }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', totalOrders: 1, delivered: 1, cancelled: 1, revenue: 1, _id: 0 } }
    ]);

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getDashboard, getRevenueReport, getOrdersReport, getTopProducts, getSalesHistory };