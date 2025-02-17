// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Register a new user
// const registerUser = async (req, res) => {
//   const { firstName, lastName, email, password, companyName } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser)
//       return res.status(400).json({ message: "Email already exists." });

//     // Hash password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create and save new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       companyName,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Error registering user:", err.message); // Log error for debugging
//     res
//       .status(500)
//       .json({ message: "Error registering user", error: err.message });
//   }
// };

// // Login an existing user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(404).json({ message: "User not found." });

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials." });

//     // Generate JWT
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not defined in the environment variables.");
//       return res
//         .status(500)
//         .json({ message: "Server configuration error: JWT secret missing." });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         firstName: user.firstName,
//       },
//     });
//   } catch (err) {
//     console.error("Error logging in:", err.message); // Log error for debugging
//     res.status(500).json({ message: "Error logging in", error: err.message });
//   }
// };

// module.exports = { registerUser, loginUser };

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
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found." });

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).json({ message: "Server configuration error: JWT secret missing." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
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

module.exports = { registerUser, loginUser };