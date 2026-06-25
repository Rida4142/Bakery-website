const Order = require('../models/Order');

const generateOrderNumber = async () => {
  const prefix = 'ORD';
  const timestamp = Date.now();
  const random = Math.floor(100 + Math.random() * 900);
  const orderNumber = `${prefix}-${timestamp}-${random}`;

  const exists = await Order.findOne({ orderNumber });
  if (exists) {
    return generateOrderNumber();
  }

  return orderNumber;
};

module.exports = generateOrderNumber;
