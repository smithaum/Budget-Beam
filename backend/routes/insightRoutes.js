const express = require("express");
const Transaction = require("../models/Transaction");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId } = req.body;

  try {
    // 1. Fetch all transactions for this user
    const transactions = await Transaction.find({ user: userId });

    if (transactions.length < 2) {
      return res.json({ insight: "Add more transactions to see insights." });
    }

    // 2. Aggregate totals
    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // 3. Category breakdown
    const categoryTotals = {};
    transactions.forEach(t => {
      if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
      categoryTotals[t.category] += t.amount;
    });

    // 4. Prepare prompt for Hugging Face
    const prompt = `
    Analyze this financial data:
    - Total Income: ${totalIncome}
    - Total Expenses: ${totalExpense}
    - Category Breakdown: ${JSON.stringify(categoryTotals)}

    Provide insights about spending habits, savings opportunities, and trends.
    `;

    // 5. Call Hugging Face API
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.HF_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();
    res.json({ insight: data[0]?.generated_text || "No insight available." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

module.exports = router;
