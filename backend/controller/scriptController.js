const Script = require("../models/script");

const createScript = async (req, res) => {
    try {
        const { file, name, userId, organization, fileName } = req.body;

        const script = await Script.create({
            file,
            name,
            fileName,
            userId,
            organization
        });

        res.status(201).json({ data: script });
    } catch (error) {
        console.error("Script Error:", error.message);
        return res.status(500).json({ message: "Error creating script" });
    }
};

const getAllScript = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user = req.user;
    try {

        const skip = (page - 1) * limit;

        const scripts = await Script.find({ organization: user.companyName }).skip(skip).limit(limit);
        const total = await Script.countDocuments({ organization: user.companyName });
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            success: true,
            total,
            page,
            totalPages,
            data: scripts
        });
    } catch (error) {
        console.error("Get Script Error:", error.message);
        return res.status(500).json({ message: "Error getting scripts" });
    }
};

const getAllActivity = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user = req.user;
    try {
        const skip = (page - 1) * limit;

        const scripts = await Script.find({ organization: user.companyName }).sort("-1").skip(skip).limit(limit);
        const total = await Script.countDocuments({ organization: user.companyName });
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            success: true,
            total,
            page,
            totalPages,
            data: scripts
        });
    } catch (error) {
        console.error("Get Script Error:", error.message);
        return res.status(500).json({ message: "Error getting scripts" });
    }
};

const deleteScript = async (req, res) => {
    const { id } = req.params;
    try {
        await Script.findByIdAndDelete({ _id: id })
        return res.status(200).json({ success: true, data: "scripts" });
    } catch (error) {
        console.error("Get Script Error:", error.message);
        return res.status(500).json({ message: "Error getting scripts" });
    }
};



module.exports = {
    createScript,
    getAllScript,
    getAllActivity,
    deleteScript
}