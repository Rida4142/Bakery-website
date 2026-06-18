const mongoose = require('mongoose');

const bakerySchema = new mongoose.Schema(
  {
    bakeryName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    phone: { type: String },
    whatsappNumber: { type: String, required: true },
    address: { type: String },
    logo: { type: String },
    theme: {
      primaryColor: { type: String, default: '#000000' },
      secondaryColor: { type: String, default: '#ffffff' }
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bakery', bakerySchema);