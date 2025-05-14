const express = require('express');
const cors = require("cors");
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());
// Ensure directories exist
const uploadsDir = path.join(__dirname, 'Uploads');
const outputDir = path.join(__dirname, 'Generated Output');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Multer config
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.static(outputDir)); // Serve PNG files directly

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const inputFilePath = path.join(uploadsDir, req.file.originalname);
  const outputFileName = req.file.originalname.replace(/\.[^/.]+$/, ".png");
  const outputFilePath = path.join(outputDir, outputFileName);

  // Call the updated Python script
  const python = spawn('./venv/Scripts/python.exe', ['script.py', inputFilePath, outputFilePath]);

  python.stdout.on('data', (data) => {
    console.log(`Python output: ${data}`);
  });

  python.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  python.on('close', (code) => {
    if (code === 0) {
      res.json({
        message: 'File processed successfully',
        output: '/' + outputFileName // Accessible via static route
      });
    } else {
      res.status(500).json({ error: 'Python script error' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});