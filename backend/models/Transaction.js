const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  category: String,
  type: String,   // "income" or "expense"
  date: String,   // stored as string
});

module.exports = mongoose.model("Transaction", transactionSchema);
