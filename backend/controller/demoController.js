// controllers/demoController.js
const DemoRequest = require('../models/demoModel');

exports.handleDemoRequest = async (req, res) => {
  try {
    const { phone, name, email, company, demoDetails } = req.body;

    if (!phone || !name || !email) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const existingEmail = await DemoRequest.findOne({ email });
    const existingPhone = await DemoRequest.findOne({ phone });

    if (existingEmail) {
      return res.status(400).json({ message: "A request with this email already exists." });
    }

    if (existingPhone) {
      return res.status(400).json({ message: "A request with this phone number already exists." });
    }

    const newDemo = new DemoRequest({
      name,
      email,
      phone,
      company: company || '',
      demoDetails: demoDetails || ''
    });

    await newDemo.save();

    res.status(200).json({ message: 'Demo request saved successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
