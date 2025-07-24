// models/demoModel.js
const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
  feature: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String },
  demoDetails: { type: String },
  file: {
    data: { type: String }, // base64 encoded string
    contentType: { type: String, default: 'application/pdf' }
  },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DemoRequest', demoSchema);
