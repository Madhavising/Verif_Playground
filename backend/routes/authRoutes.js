

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetailsById,
  getAllUsers,
  uploadImage,
  updateProfile
} = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const upload = require("../middleware/upload")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUserById/:id", authMiddleware, getUserDetailsById);
router.get("/getAllUsers/:userId", authMiddleware, getAllUsers);
router.post("/upload_image", authMiddleware, upload.single("file"), uploadImage);
router.patch("/update_profile", authMiddleware, updateProfile);

module.exports = router;
