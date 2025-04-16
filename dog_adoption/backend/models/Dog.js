const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  description: { type: String },
  adopted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Dog', dogSchema);
