

const express = require("express");
const { createScript, getAllScript, getAllActivity, deleteScript } = require("../controller/scriptController");
const { authMiddleware } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/createScript", createScript);
router.get("/getAllScript", authMiddleware, getAllScript);
router.get("/getAllActivity", authMiddleware, getAllActivity);
router.delete("/deleteScript/:id", deleteScript);

module.exports = router;
