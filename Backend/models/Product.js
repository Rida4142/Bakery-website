const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  label: { type: String, required: true }, // "S", "M", "L", "XL", "1lb", "2lb"
  price: { type: Number, required: true }
});

const productSchema = new mongoose.Schema(
  {
    bakeryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bakery', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    sizes: [sizeSchema],
    price: { type: Number }, // used only when sizes is empty
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

productSchema.pre('validate', function () {
  const hasSizes = this.sizes && this.sizes.length > 0;
  const hasFlatPrice = this.price !== undefined && this.price !== null;
  if (!hasSizes && !hasFlatPrice) {
    throw new Error(`Product "${this.name}" needs either a sizes array or a flat price`);
  }
});

module.exports = mongoose.model('Product', productSchema);