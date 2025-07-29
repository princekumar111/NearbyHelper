const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String }, // e.g., '💡'
});

module.exports = mongoose.model('Category', categorySchema);
