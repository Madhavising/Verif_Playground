const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadController = require('../controller/uploadController');
const fileModel = require('../models/fileModels');

// Multer config
const storage = multer.diskStorage({
  destination: fileModel.uploadsDir,
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadController.uploadFile);

module.exports = router;
