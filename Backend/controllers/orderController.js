const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Bakery = require('../models/Bakery');
const generateOrderNumber = require('../utils/generateOrderNumber');
const generateWhatsAppMessage = require('../utils/generateWhatsAppMessage');


// POST /api/orders — public, called by customer at checkout
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      notes,
      items,
      orderType = 'pickup',
      deliveryDistance = 0,
      deliveryFee = 0,
    } = req.body;

    console.log('ORDER PAYLOAD RECEIVED:', JSON.stringify(req.body, null, 2));

    if (!customerName || !phone || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'Name, phone, and at least one item are required' });

    if (orderType === 'delivery' && !address)
      return res.status(400).json({ message: 'Delivery orders require an address' });

    const bakery = await Bakery.findOne();
    if (!bakery) return res.status(500).json({ message: 'Bakery configuration is missing' });

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item' });
    }

    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
  if (!item.productId) {
    return res.status(400).json({ message: 'Each item must have a productId' });
  }
  const productIdStr = item.productId.toString().trim();
  if (!mongoose.isValidObjectId(productIdStr)) {
    return res.status(400).json({ message: `Invalid productId: ${productIdStr}` });
  }
  const product = await Product.findById(productIdStr);
      
      if (!product || !product.available) {
        return res.status(400).json({ message: `Product not found or unavailable: ${item.productId}` });
      }

      let price;
      if (product.sizes && product.sizes.length > 0) {
        const size = product.sizes.find((s) => s.label === item.size);
        if (!size)
          return res.status(400).json({ message: `Invalid size "${item.size}" for product "${product.name}"` });
        price = size.price;
      } else {
        price = product.price;
      }

      if (!item.quantity || item.quantity <= 0)
        return res.status(400).json({ message: `Invalid quantity for product "${product.name}"` });

      subtotal += price * item.quantity;
      validatedItems.push({
        productId: product._id,
        name: product.name,
        size: item.size || null,
        price,
        quantity: item.quantity,
      });
    }

    const orderNumber = await generateOrderNumber();
    const numericDeliveryFee = Number(deliveryFee) || 0;
    const numericDistance = Number(deliveryDistance) || 0;
    const totalAmount = subtotal + numericDeliveryFee;

    const order = await Order.create({
      bakeryId: bakery._id,
      orderNumber,
      customerName,
      phone,
      email,
      address: orderType === 'delivery' ? address : '',
      notes: notes || '',
      items: validatedItems,
      orderType,
      deliveryDistance: numericDistance,
      deliveryFee: numericDeliveryFee,
      subtotal,
      totalAmount,
    });

    const whatsappMessage = generateWhatsAppMessage(order);
    order.whatsappMessage = whatsappMessage;
    await order.save();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappLink = `https://wa.me/${bakery.whatsappNumber}?text=${encodedMessage}`;

    res.status(201).json({ orderNumber, whatsappLink, totalAmount });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/orders — admin, paginated order list with optional status filter
const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(filter)
    ]);

    res.json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/admin/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH /api/admin/orders/:id/status — move order through lifecycle
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Out For Delivery', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status))
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };