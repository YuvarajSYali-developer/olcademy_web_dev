const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['men', 'women', 'unisex'],
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [{
    type: String
  }],
  fragranceNotes: {
    top: [String],
    middle: [String],
    base: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
