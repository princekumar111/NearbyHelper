// const mongoose = require('mongoose');

// const serviceProviderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   availability: {
//     type: Boolean,
//     default: true,
//   },
//   //add location model
//   location: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       default: "Point"
//     },
//     coordinates: {
//       type: [Number], // [lng, lat]
//       required: true
//     }
//   },
//   contact: {
//     type: String,
//     required: true,
//   },
//    status: {
//     type: String,
//     enum: ['pending', 'approved', 'rejected'],
//     default: 'pending', // New providers are pending by default
//   },
//    image: {
//     type: String,
//     default: '', // Or a default image URL if you prefer
//   },
// }, {
//   timestamps: true,
// });
// serviceProviderSchema.index({ location: "2dsphere" });

// const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

// module.exports = ServiceProvider;







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

  // ✔ GEOJSON LOCATION (needed for nearest search)
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],   // [lng, lat]
      required: true
    }
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
    default: 'pending',
  },

  image: {
    type: String,
    default: '',
  },
  
}, {
  timestamps: true,
});

// IMPORTANT: enable geo-search
serviceProviderSchema.index({ location: "2dsphere" });

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

module.exports = ServiceProvider;
