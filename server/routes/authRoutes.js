const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    // 1️⃣ Get data from request body
    const { name, email, password } = req.body;

    // 2️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6️⃣ Send success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
