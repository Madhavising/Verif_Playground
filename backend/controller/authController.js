const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, companyName, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Create and save new user
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, // Password is hashed by the schema middleware
      companyName,
    });


    if (role === "admin") {
      newUser.role = "admin"
    }

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);

    // Show validation errors clearly (e.g., password or email issues)
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors.join(", ") });
    }

    res.status(500).json({ message: "Error registering user", error: err.message });
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
      expiresIn: "12h",
    });

    res.status(200).json({
      status: true,
      token
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Get User Details By ID
const getUserDetailsById = async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findById(userID).lean().exec();
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error getting user:", error.message);
    res.status(500).json({ message: "Error getting user", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).lean().exec();

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const allUsers = await User.find({ companyName: user.companyName }).sort({ createdAt: -1 }).lean().exec();

    return res.status(200).json({ status: true, data: allUsers });
  } catch (error) {
    console.error("Error getting user:", error.message);
    return res.status(500).json({ message: "Error getting user", error: error.message });
  }
};


module.exports = { registerUser, loginUser, getUserDetailsById, getAllUsers };
