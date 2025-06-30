const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ✅ Configure Cloudinary from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
  api_key: process.env.CLOUDINARY_API_KEY.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
});

// ✅ Sanitize filename for public_id
const sanitizeFileName = (filename) => {
  const baseName = filename.split(".")[0];
  return baseName
    .trim()
    .replace(/\s+/g, "-")             // Replace spaces with dashes
    .replace(/[^a-zA-Z0-9-_]/g, "")   // Remove special characters
    .toLowerCase();                   // Optional: lowercase for consistency
};

// ✅ Define storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const timestamp = Date.now();
    const sanitized = sanitizeFileName(file.originalname);
    const publicId = `${timestamp}-${sanitized}`;

    console.log("📸 Uploading file:", publicId);

    return {
      folder: "charity",
      allowed_formats: ["jpeg", "jpg", "png", "gif", "webp"],
      public_id: publicId,
    };
  },
});

module.exports = { cloudinary, storage };
