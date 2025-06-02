const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
const outputDir = path.join(__dirname, '..', 'generated-output');

// Ensure directories exist
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

exports.getInputFilePath = (filename) => path.join(uploadsDir, filename);

exports.getOutputFileName = (filename) => filename.replace(/\.[^/.]+$/, ".png");

exports.getOutputFilePath = (outputFileName) => path.join(outputDir, outputFileName);

exports.uploadsDir = uploadsDir;
exports.outputDir = outputDir;
