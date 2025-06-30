const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function newsLetterMail(to, firstname) {
  const subject = "Subscription to Save the Children Initiative";
  const html = `
    <div>
      <div style="background-color: yellow; padding: 10px;">
        <h1>Save the Children Initiative</h1>
      </div>
      <div style="padding: 20px;">
        <p>Dear ${firstname},</p>
        <p>Thank you for subscribing to the Save the Children Initiative newsletter. We are excited to have you with us!</p>
      </div>
      <div style="background-color: yellow; padding: 10px; text-align: center;">
        <small>© 2025 Save the Children Initiative. All rights reserved.</small>
      </div>
    </div>
  `;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

async function cryptoMail(to, cryptoData) {
  const subject = "Thank You for Your Crypto Donation";
  const html = `
    <div>
      <div style="background-color: #facc15; padding: 10px;">
        <h1 style="margin: 0;">Save the Children Initiative</h1>
      </div>
      <div style="padding: 20px;">
        <p>Dear ${cryptoData.fullname},</p>
        <p>Thank you for your generous crypto donation of <strong>$${cryptoData.amount}</strong> to the Save the Children Initiative.</p>
        <p>Your support helps us make a difference in the lives of children in need.</p>
      </div>
      <div style="background-color: #facc15; padding: 10px; text-align: center;">
        <small>© 2025 Save the Children Initiative. All rights reserved.</small>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Save The Children Initiative" <${process.env.MAIL_USER}>`,
    to: to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 User mail sent:", info.messageId);
  } catch (err) {
    console.error("📧 cryptoMail sending failed:", err);
  }
}

function giftCardMail(to, giftCardData) {
  const subject = "Thank You for Your Gift Card Donation";
  const html = `
    <div>
      <div style="background-color: yellow; padding: 10px;">
        <h1>Save the Children Initiative</h1>
      </div>
      <div style="padding: 20px;">
        <p>Dear ${giftCardData.fullname},</p>
        <p>Thank you for your generous gift card donation of $${giftCardData.amount} (Category: ${giftCardData.category}) to the Save the Children Initiative.</p>
        <p>Your support helps us make a difference in the lives of children in need.</p>
      </div>
      <div style="background-color: yellow; padding: 10px; text-align: center;">
        <small>© 2025 Save the Children Initiative. All rights reserved.</small>
      </div>
    </div>
  `;
  const mailOptions = {
    from: `"Save The Children Initiative" <${process.env.MAIL_USER}>`,
    to: to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

function adminNewsletter(to, newsletterData) {
  const subject = "New Newsletter Subscription";
  const html = `
    <div>
      <div style="background-color: yellow; padding: 10px;">
        <h1>Save the Children Initiative - Admin Notification</h1>
      </div>
      <div style="padding: 20px;">
        <p>New subscriber: ${newsletterData.firstname} (${newsletterData.email}) has joined the newsletter.</p>
      </div>
      <div style="background-color: yellow; padding: 10px; text-align: center;">
        <small>© 2025 Save the Children Initiative. All rights reserved.</small>
      </div>
    </div>
  `;
  const mailOptions = {
    from: `"Save The Children Initiative" <${process.env.MAIL_USER}>`,
    to: to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

function adminMessage(to, messageData) {
  const subject = "New Message Received";
  const html = `
    <div>
      <div style="background-color: yellow; padding: 10px;">
        <h1>Save the Children Initiative - Admin Notification</h1>
      </div>
      <div style="padding: 20px;">
        <p>New message from ${messageData.name} (${messageData.email}):</p>
        <blockquote>${messageData.message}</blockquote>
      </div>
      <div style="background-color: yellow; padding: 10px; text-align: center;">
        <small>© 2025 Save the Children Initiative. All rights reserved.</small>
      </div>
    </div>
  `;
  const mailOptions = {
    from: `"Save The Children Initiative" <${process.env.MAIL_USER}>`,
    to: to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

function adminCrypto(to, cryptoData) {
  const subject = "New Crypto Donation Received";
  const html = `
    <div>
      <div style="background-color: yellow; padding: 10px;">
        <h1>Save the Children Initiative - Admin Notification</h1>
      </div>
      <div style="padding: 20px;">
        <p>New crypto donation from ${cryptoData.email} <br> ${cryptoData.fullname} <br> <br>made a donation of $${cryptoData.amount}.</p>
      </div>
      <div style="background-color: yellow; padding: 10px; text-align: center;">
        <small>© 2025 Save the Children Initiative. All rights reserved.</small>
      </div>
    </div>
  `;
  const mailOptions = {
    from: `"Save The Children Initiative" <${process.env.MAIL_USER}>`,
    to: to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

function adminGiftCard(to, giftCardData) {
  const subject = "New Gift Card Donation Received";
  const html = `
    <div>
      <div style="background-color: yellow; padding: 10px;">
        <h1>Save the Children Initiative - Admin Notification</h1>
      </div>
      <div style="padding: 20px;">
        <p>New gift card donation from  ${giftCardData.email} <br> ${giftCardData.fullname} <br><br> made a donation of $${giftCardData.amount} with ${giftCardData.category} gift card.</p>
      </div>
      <div style="background-color: yellow; padding: 10px; text-align: center;">
        <small>© 2025 Save the Children Initiative. All rights reserved.</small>
      </div>
    </div>
  `;
  const mailOptions = {
    from: `"Save The Children Initiative" <${process.env.MAIL_USER}>`,
    to: to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  newsLetterMail,
  cryptoMail,
  giftCardMail,
  adminNewsletter,
  adminMessage,
  adminCrypto,
  adminGiftCard,
};
