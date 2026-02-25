import React, { useState } from "react";
import "./Planner.css";

function Planner() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (!desc || !amount) return;

    const newExpense = {
      id: Date.now(),
      desc,
      amount: Number(amount),
    };

    setExpenses([...expenses, newExpense]);
    setDesc("");
    setAmount("");
  };

  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
  const balance = income - totalExpense;

  return (
    <div className="planner-container">
      <h1>Budget Planner</h1>

      <div className="summary">
        <div>Total Income: ₹{income}</div>
        <div>Total Expense: ₹{totalExpense}</div>
        <div>Balance: ₹{balance}</div>
      </div>

      <div className="add-income">
        <input
          type="number"
          placeholder="Set Income"
          onChange={(e) => setIncome(Number(e.target.value))}
        />
      </div>

      <div className="add-expense">
        <input
          type="text"
          placeholder="Expense Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="expense-list">
        {expenses.map((item) => (
          <div key={item.id} className="expense-item">
            <span>{item.desc}</span>
            <span>₹{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;