const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  contact: {
    type: String,
    required: true,
  },
   status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending', // New providers are pending by default
  },
   image: {
    type: String,
    default: '', // Or a default image URL if you prefer
  },
}, {
  timestamps: true,
});

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

module.exports = ServiceProvider;
