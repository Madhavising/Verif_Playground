const express = require("express");
const multer = require("multer");
const { createScript, getAllScript, getAllActivity, deleteScript } = require("../controller/scriptController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/createScript", upload.single("file"), createScript);

router.get("/getAllScript", authMiddleware, getAllScript);
router.get("/getAllActivity", authMiddleware, getAllActivity);
router.delete("/deleteScript/:id", deleteScript);

module.exports = router;
