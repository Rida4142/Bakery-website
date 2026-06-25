const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true }, // snapshot, survives later product edits
  size: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    bakeryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bakery', required: true },
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    notes: { type: String },
    orderType: { type: String, enum: ['pickup', 'delivery'], default: 'pickup' },
    deliveryDistance: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Preparing', 'Out For Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    whatsappMessage: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);