const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    bakeryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bakery', required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'owner'], default: 'admin' }
  },
  { timestamps: true }
);

// Same username could exist across different bakeries — uniqueness scoped per bakery, not global
userSchema.index({ bakeryId: 1, username: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);