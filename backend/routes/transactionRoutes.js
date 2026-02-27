const express = require("express");
const Transaction = require("../models/Transaction");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET all user transactions
router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADD transaction
router.post("/", protect, async (req, res) => {
  try {
    const { amount, category, type, date } = req.body;

    if (!amount || !category || !type) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const transaction = await Transaction.create({
      user: req.user,
      amount,
      category,
      type,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE transaction (ONLY IF OWNER)
router.delete("/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;