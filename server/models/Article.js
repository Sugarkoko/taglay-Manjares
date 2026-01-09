const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: false },
  content: { type: [String], required: true },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);