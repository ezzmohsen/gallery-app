const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'out of stock'],
    default: 'available',
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
