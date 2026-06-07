const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  company: String,
  status: { type: String, enum: ['Lead', 'Active', 'Inactive'], default: 'Lead' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
