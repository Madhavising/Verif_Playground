

const express = require("express");
const { createScript, getAllScript, getAllActivity, deleteScript } = require("../controller/scriptController");

const router = express.Router();

router.post("/createScript", createScript);
router.get("/getAllScript", getAllScript);
router.get("/getAllActivity", getAllActivity);
router.delete("/deleteScript/:id", deleteScript);

module.exports = router;
