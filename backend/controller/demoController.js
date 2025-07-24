// controllers/demoController.js
const DemoRequest = require('../models/demoModel');

exports.handleDemoRequest = async (req, res) => {
  try {
    const { phone, name, email, company, demoDetails } = req.body;
    console.log(req.body)

    if (!phone || !name || !email || !company) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

   const existingEntry = await DemoRequest.findOne({
  $or: [{ email }, { phone }]
});

    if (existingEntry) {
      return res.status(400).json({ message: "A request with this email or phone already exists." });
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
