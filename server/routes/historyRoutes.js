const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("history route working");
});
const History = require("../models/History");
const protect = require("../middleware/authMiddleware");

// Save generated content to history
router.post("/", protect, async (req, res) => {
  try {
    const { prompt, platform, style, output } = req.body;

    if (!output || !output.hook) {
      return res.status(400).json({ message: "Invalid history data" });
    }

    const history = await History.create({
      user: req.user._id,
      prompt,
      platform,
      style,
      output,
    });

    res.status(201).json(history);
  } catch (error) {
    console.error("SAVE HISTORY ERROR:", error);
    res.status(500).json({ message: "Failed to save history" });
  }
});
// Get logged-in user's history
router.get("/", protect, async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);
  } catch (error) {
    console.error("FETCH HISTORY ERROR:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

module.exports = router;
