const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  image: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Regex updated to include at least one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  },
  workPhone: { type: String },
  personalMobile : {type : String},
  extension : {type : String},
  department : {type : String},
  designation : {type : String},
  reportingTo : {type : String},
  seatingLocation : {type : String},
  companyName: { type: String }, // Optional field
  role: {
    type: String,
    enum: ["admin", "superadmin", "user"],
    default: "user",
  },
}, {
  versionKey: false,
  timestamps: true
});

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
