const mongoose = require("mongoose");

const AdminCryptoSchema = new mongoose.Schema(
  {
    crypto_details: {
      type: String,
      required: true,
    },
    crypto_qrcode: {
      type: String,
      required: true,
    },
    crypto_network: {
      type: String,
      required: true,
    },
    wallet_address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminCrypto", AdminCryptoSchema);
