

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const dbConnection = require("./db/dbCoonection");
const cors = require("cors");
const executeRoutes = require("./routes/executeRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", executeRoutes);

// Get Execution Stats
app.get("/api/stats", (req, res) => {
  const successCount = executionHistory.filter((item) => !item.output.includes("Error")).length;
  const errorCount = executionHistory.length - successCount;

  res.json({ total: executionHistory.length, success: successCount, errors: errorCount });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnection();
});
