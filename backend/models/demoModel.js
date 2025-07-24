// models/demoModel.js
const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {type: Number, required: true, unique: true },
  company: { type: String },
  demoDetails: { type: String },
},
{
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('DemoRequest', demoSchema);
