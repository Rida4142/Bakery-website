const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    bakeryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bakery', required: true },
    name: { type: String, required: true },
    image: { type: String },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);