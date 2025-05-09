const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

// Ensure directories exist
const uploadsDir = path.join(__dirname, "Uploads");
const outputDir = path.join(__dirname, "Generated Output");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Multer configuration
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with original filename
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.static(outputDir));

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(uploadsDir, req.file.originalname);
  const outputFileName = req.file.originalname.replace(/\.[^/.]+$/, ".html");
  const outputPath = path.join(outputDir, outputFileName);

  // Run the Python script
  const python = spawn("./venv/Scripts/python.exe", [
    "script.py",
    filePath,
    outputPath,
  ]);

  python.stdout.on("data", (data) => {
    console.log(`Python output: ${data}`);
  });

  python.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  python.on("close", (code) => {
    if (code === 0) {
      res.json({
        message: "File processed successfully",
        output: `/` + outputFileName,
      });
    } else {
      res.status(500).json({ error: "Error in Python script" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
