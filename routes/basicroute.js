const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const CryptoDonation = require("../models/crypto");
const GiftCardDonation = require("../models/giftcard")
const admincrypto = require("../models/admincrypto");
const MessageUser = require("../models/message")
const Newsletter = require("../models/newsletter")

router.get("/", async (req, res) => {
  const wallets = await admincrypto.find().sort({createdAt: -1});
  res.render("user/index", {wallets});
});

router.post(
  "/donate/crypto",
  upload.array("payment_receipt", 70),
  async (req, res) => {
    try {
      const { fullname, email, amount } = req.body;
      const filePaths = req.files.map((file) => file.path);

      const newDonation = new CryptoDonation({
        fullname,
        email,
        amount,
        payment_receipts: filePaths,
      });

      await newDonation.save();
      res
        .status(200)
        .json({ success: true, message: "Thank you for your donation!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  }
);

router.post(
  "/donate/giftcard",
  upload.array("payment_receipt", 70),
  async (req, res) => {
    try {
      const { fullname, email, category, code, amount } = req.body;
      const filePaths = req.files.map((file) => file.path);

      const newDonationGift = new GiftCardDonation({
        fullname,
        email,
        category,
        code,
        amount,
        activated_gift_card: filePaths,
      });

      await newDonationGift.save();
      res
        .status(200)
        .json({ success: true, message: "Thank you for your donation!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  }
);

router.post("/message", upload.none(), async (req, res) => {
  try {
    const { name, email, message, security_code } = req.body;

    const newMessage = new MessageUser({
      name,
      email,
      message,
      security_code,
    });

    await newMessage.save();
    res.status(200).json({ success: true, message: "Message delivered!" });
  } catch (error) {
    console.error("❌ Save failed:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});

router.post("/newsletter", upload.none(), async (req, res) => {
  try {
    const { firstname, email } = req.body;

    const newNewsletter = new Newsletter({
      firstname,
      email,
    });

    await newNewsletter.save();
    res.status(200).json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error("❌ Save failed:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});

module.exports = router;
