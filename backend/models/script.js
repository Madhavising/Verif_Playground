const mongoose = require("mongoose");

const scriptSchema = new mongoose.Schema({
    name: { type: String },
    file: { type: String },
    fileName: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    organization: String
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("script", scriptSchema);
