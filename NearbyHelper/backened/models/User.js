const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['user', 'provider', 'admin'],
//     default: 'user',
//   },
//   category: {
//     type: String, // e.g., "Electrician", "Plumber"
//     required: function () {
//       return this.role === 'provider';
//     },
//   },
// }, {
//   timestamps: true,
// });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'provider', 'admin'],
    default: 'user',
  },
  category: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.role === 'provider') {
          return typeof value === 'string' && value.trim().length > 0;
        }
        return true;
      },
      message: 'Category is required for providers.',
    },
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;



