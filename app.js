const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const basicRoute = require("./routes/basicroute");
const adminRoute = require("./routes/adminroute.js");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbURI = process.env.DBURI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database Connection Error:", err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUrl = req.originalUrl;
  next();
});

app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith("www.")) {
    const newHost = req.headers.host.replace("www.", "");
    return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
  }
  next();
});

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "robots.txt"));
});

// app.get('/BingSiteAuth.xml', (req, res) => {
//   res.sendFile(path.join(__dirname, 'BingSiteAuth.xml'));
// });

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "sitemap.xml"));
});

app.get("/googlef901cafb43e5eedb.html", (req, res) => {
  res.sendFile(path.join(__dirname, "googlef901cafb43e5eedb.html"));
});

app.use("/", basicRoute);
app.use("/admin", adminRoute);

// ⚠️ MUST BE AFTER all your routes
app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    console.error("🧨 Multer error:", err);
    return res.status(400).json({
      success: false,
      message: "Multer upload error",
      error: err.message,
    });
  }

  console.error("🔥 Unexpected error:", err);
  res.status(500).json({
    success: false,
    message: "Unexpected server error",
    error: err.message || "Something went wrong.",
  });
});

app.use((req, res, next) => {
  res.status(404).render("404", { title: "404" });
});
