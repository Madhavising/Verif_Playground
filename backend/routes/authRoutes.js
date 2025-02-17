// const express = require("express");
// const { registerUser, loginUser } = require("../controller/authController");

// const router = express.Router();

// // Register Route
// router.post("/register", registerUser);

// // Login Route
// router.post("/login", loginUser);

// module.exports = router;

const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
