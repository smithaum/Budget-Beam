const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ============================
// Generate JWT
// ============================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ============================
// REGISTER
// ============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: "",
    });

    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// LOGIN
// ============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// EDIT PROFILE (Name + Avatar)
// ============================
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.log("PROFILE UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// RESET PASSWORD
// ============================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Please provide email and new password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.log("RESET PASSWORD ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// DELETE ACCOUNT
// ============================
router.delete("/delete", protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;