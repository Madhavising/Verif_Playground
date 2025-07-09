const path = require("path");
const { spawn } = require("child_process");
const fileModel = require("../models/fileModels");

exports.uploadFile = (req, res) => {
  const inputFilePath = fileModel.getInputFilePath(req.file.originalname);
  const outputFileName = fileModel.getOutputFileName(req.file.originalname);
  const outputFilePath = fileModel.getOutputFilePath(outputFileName);

  const python = spawn("./venv/bin/python", [
    "script.py",
    inputFilePath,
    outputFilePath,
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
        output: "/" + outputFileName,
      });
    } else {
      res.status(500).json({ error: "Python script error" });
    }
  });
};
