const mongoose = require("mongoose");

const CryptoDonationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  payment_receipts: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("CryptoDonation", CryptoDonationSchema);
