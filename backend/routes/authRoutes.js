

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetailsById,
  getAllUsers,
} = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUserById/:id", authMiddleware, getUserDetailsById);
router.get("/getAllUsers/:userId", authMiddleware, getAllUsers);

module.exports = router;
