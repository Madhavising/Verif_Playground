const Script = require("../models/script");
const UserCollection = require("../models/User");

const createScript = async (req, res) => {
    try {
        const { fileName, fileType, base64, userId, organization, htmlData, formData } = req.body;
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

        if (htmlData && fileType == "html") {
            scriptData.htmlData = htmlData;
        }

        if (formData && Array.isArray(formData.data)) {
            scriptData.formData = formData;
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

        // Fetch scripts with pagination and organization match
        const scripts = await Script.aggregate([
            {
                $match: {
                    organization: user.companyName
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);

        // Attach username from UserCollection
        const updatedScripts = await Promise.all(
            scripts.map(async (script) => {
                const scriptUser = await UserCollection.findById(script.userId).lean();
                const username = scriptUser
                    ? `${scriptUser.firstName} ${scriptUser.lastName}`
                    : "Unknown User";

                return {
                    ...script,
                    username
                };
            })
        );

        // Count total for pagination
        const total = await Script.countDocuments({
            organization: user.companyName
        });

        const totalPages = Math.ceil(total / limit);

        return res.status(200).json({
            success: true,
            total,
            page,
            totalPages,
            data: updatedScripts
        });
    } catch (error) {
        console.error("Get Script Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error getting scripts"
        });
    }
};


const getAllActivity = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user = req.user;
    try {
        const skip = (page - 1) * limit;

        const scripts = await Script.aggregate([
            {
                '$match': {
                    'organization': user.companyName
                }
            }, {
                '$sort': {
                    'createdAt': -1
                }
            }, {
                '$skip': skip
            }, {
                '$limit': limit
            }
        ])

        // Attach username from UserCollection
        const updatedScripts = await Promise.all(
            scripts.map(async (script) => {
                const scriptUser = await UserCollection.findById(script.userId).lean();
                const username = scriptUser
                    ? `${scriptUser.firstName} ${scriptUser.lastName}`
                    : "Unknown User";

                return {
                    ...script,
                    username
                };
            })
        );
        const total = await Script.countDocuments({ organization: user.companyName });
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            success: true,
            total,
            page,
            totalPages,
            data: updatedScripts
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

const getAllXlsxByUser = async (req, res) => {
    const user = req.user;
    try {
        const scripts = await Script.aggregate([
            {
                '$match': {
                    'organization': user.companyName,
                    'userId': user._id,
                    'fileType': 'xlsx'
                }
            }, {
                '$sort': {
                    'createdAt': -1
                }
            }
        ])
        return res.status(200).json({
            success: true,
            data: scripts
        });
    } catch (error) {
        console.error("Get Script Error:", error.message);
        return res.status(500).json({ message: "Error getting scripts" });
    }
};
const getScriptById = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const scripts = await Script.findOne({ _id: id });
        return res.status(200).json({
            success: true,
            data: scripts
        });
    } catch (error) {
        console.error("Get Script Error:", error.message);
        return res.status(500).json({ message: "Error getting scripts" });
    }
};



module.exports = {
    createScript,
    getAllScript,
    getAllActivity,
    deleteScript,
    getAllXlsxByUser,
    getScriptById
}