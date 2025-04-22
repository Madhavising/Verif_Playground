const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, companyName } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists." });

    // Create and save new user
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, // No manual hashing here
      companyName,
      role: "User"
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res
        .status(500)
        .json({ message: "Server configuration error: JWT secret missing." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// User Details By Id
const getUserDetailsById = async (req, res) => {
  const userID = req.params.id;
  try {
    let user = await User.findById(userID).lean().exec();

    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error getting user:", error.message);
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserDetailsById };
