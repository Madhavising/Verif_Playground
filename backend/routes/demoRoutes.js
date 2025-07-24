// routes/demoRoutes.js
const express = require('express');
const router = express.Router();
const demoController = require('../controller/demoController');
const multer = require('multer');

// Use memory storage to convert file to base64
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  file.mimetype === 'application/pdf'
    ? cb(null, true)
    : cb(new Error('Only PDF files allowed'), false);
};

const upload = multer({ storage, fileFilter });

router.post('/request-demo', upload.single('sampleSpec'), demoController.handleDemoRequest);

module.exports = router;
