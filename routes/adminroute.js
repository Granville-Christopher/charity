const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const GiftCardDonation = require("../models/giftcard");
const CryptoDonation = require("../models/crypto");
const AdminCrypto = require("../models/admincrypto");
const Newsletter = require("../models/newsletter");
const Message = require("../models/message");
const upload = require("../middlewares/upload");
const Admin = require("../models/signup");

router.get("/", async (req, res) => {
  if (!req.session.adminId) {
    return res.redirect("/admin/login");
  }
  try {
    console.log("🔍 Fetching admin page data...");
    const giftcards = await GiftCardDonation.find().sort({ createdAt: -1 });
    const cryptos = await CryptoDonation.find().sort({ createdAt: -1 });
    const messages = await Message.find().sort({ createdAt: -1 });
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });

    console.log("✅ Data fetched successfully");
    res.render("admin/admin", { giftcards, cryptos, messages, newsletters });
  } catch (error) {
    console.error("❌ Admin page error:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/signup", (req, res) => {
  res.render("admin/signup");
});
router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.post(
  "/upload-crypto-details",
  upload.single("crypto_qrcode"),
  async (req, res) => {
    try {
      const { crypto_details, crypto_network, wallet_address } = req.body;
      const crypto_qrcode = req.file ? req.file.path : null;

      const newCrypto = new AdminCrypto({
        crypto_details,
        crypto_qrcode,
        crypto_network,
        wallet_address,
      });

      console.log("Saving to DB:", {
        crypto_details,
        crypto_qrcode,
        crypto_network,
        wallet_address,
      });

      await newCrypto.save();

      res.status(200).json({
        success: true,
        message: "Details Uploaded Successfully!",
      });
    } catch (err) {
      console.error("❌ Upload error:", err);
      res
        .status(500)
        .json({ success: false, error: "Failed to upload crypto details" });
    }
  }
);

router.post("/signup", upload.none(), async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists with this email.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = new Admin({
      fullname,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(200).json({ success: true, message: "Admin account created!" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.post("/login", async (req, res) => {
  console.log("📩 /admin/login route hit");
  console.log("Body received:", req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    req.session.adminId = admin._id;
    req.session.adminEmail = admin.email;
    req.session.adminName = admin.fullname;

    res.status(200).json({ success: true, message: "Login successful." });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
