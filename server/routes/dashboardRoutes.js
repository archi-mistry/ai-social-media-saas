const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route
router.get("/", protect, (req, res) => {
  res.json({
    message: "Welcome to your dashboard",
    userId: req.user,
  });
});

module.exports = router;
