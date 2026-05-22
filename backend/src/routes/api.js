const express = require("express");
const multer = require("multer");
const { uploadPDF, chat } = require("../controllers/apiController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadPDF);
router.post("/chat", chat);

module.exports = router;
