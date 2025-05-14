

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const dbConnection = require("./db/dbCoonection");
const cors = require("cors");
const executeRoutes = require("./routes/executeRoutes");
const scriptRouter = require("./routes/scriptRoutes");
const path = require('path');
const fileModel = require('./models/fileModels');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api", executeRoutes);
app.use("/api", scriptRouter);
app.use(express.static(fileModel.outputDir));
app.use('/waveform', uploadRoutes);

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
