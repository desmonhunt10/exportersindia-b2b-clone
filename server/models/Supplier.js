const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [{
    type: String,
    required: true
  }],
  products: [{
    type: String
  }],
  yearEstablished: Number,
  employeeCount: String,
  website: String,
  contactInfo: {
    email: String,
    phone: String,
    mobile: String,
    fax: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  businessType: {
    type: String,
    enum: ['Manufacturer', 'Exporter', 'Supplier', 'Wholesaler', 'Retailer', 'Service Provider']
  },
  certifications: [{
    name: String,
    issuedBy: String,
    validUntil: Date
  }],
  logo: String,
  images: [String],
  verified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  totalInquiries: {
    type: Number,
    default: 0
  },
  responseRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  premiumExpiry: Date,
  lastActive: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for searching
supplierSchema.index({ companyName: 'text', description: 'text', categories: 'text' });

module.exports = mongoose.model('Supplier', supplierSchema);
