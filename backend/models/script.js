const mongoose = require("mongoose");

const scriptSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, enum: ["pdf", "xlsx", "doc", "docx", "base64","html"], required: true },
    base64: { type: String },
    fileData: { type: String },
    htmlData: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    organization: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("script", scriptSchema);
