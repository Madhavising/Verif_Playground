// routes/demoRoutes.js
const express = require('express');
const router = express.Router();
const demoController = require('../controller/demoController');

router.post('/request-demo', demoController.handleDemoRequest);

module.exports = router;
