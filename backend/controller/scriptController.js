const Script = require("../models/script");

const createScript = async (req, res) => {
    try {
        const { fileName, fileType, base64, userId, organization, htmlData } = req.body;
        const file = req.file;



        if (!fileName || !fileType || !userId || !organization) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const scriptData = {
            fileName,
            fileType,
            userId,
            organization,
        };

        if (base64 && fileType === "base64") {
            scriptData.base64 = base64;
        }

        if (htmlData && fileType == "html"){
            scriptData.htmlData = htmlData;
        }

        if (file && file.path && !["pdf", "xlsx", "doc", "docx", "html"].includes(fileType)) {
            scriptData.fileData = file.path;
        }


        const script = await Script.create(scriptData);

        res.status(201).json({ data: script });
    } catch (error) {
        console.error("Script Error:", error.message);
        res.status(500).json({ message: "Error creating script" });
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