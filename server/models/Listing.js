const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  subcategory: String,
  price: {
    value: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    unit: String,
    negotiable: {
      type: Boolean,
      default: true
    }
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  specifications: [{
    key: String,
    value: String
  }],
  minOrderQuantity: {
    value: Number,
    unit: String
  },
  supplyAbility: {
    value: Number,
    unit: String,
    period: String
  },
  deliveryTime: String,
  packagingDetails: String,
  paymentTerms: [String],
  certifications: [String],
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  inquiries: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Text search index
listingSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Listing', listingSchema);
