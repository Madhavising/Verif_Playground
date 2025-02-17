const { spawn } = require("child_process");

const executeCode = (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  const process = spawn("node", ["-e", code]);

  let output = "";
  process.stdout.on("data", (data) => (output += data.toString()));
  process.stderr.on("data", (data) => (output += data.toString()));

  process.on("close", () => res.json({ output }));
};

module.exports = { executeCode };
