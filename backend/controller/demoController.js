// controllers/demoController.js
const DemoRequest = require('../models/demoModel');

exports.handleDemoRequest = async (req, res) => {
  try {
    const { feature, name, email, company, demoDetails } = req.body;

    if (!feature || !name || !email) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const existingRequest = await DemoRequest.findOne({ email });

    if (existingRequest) {
      return res.status(400).json({ message: "A request with this email already exists." });
    }


    let fileData = null;
    if (req.file) {
      fileData = {
        data: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype
      };
    }

    const newDemo = new DemoRequest({
      feature,
      name,
      email,
      company: company || '',
      demoDetails: demoDetails || '',
      file: fileData
    });

    await newDemo.save();

    res.status(200).json({ message: 'Demo request saved successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
