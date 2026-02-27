import React, { useState, useEffect, useContext } from "react";
import Insights from "../components/Insights";
import PrivateNavbar from "../components/PrivateNavbar";
import "../styles/Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const { user, token } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  // ✅ Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${API}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (user && token) {
      fetchTransactions();
    }
  }, [user, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add transaction
  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/transactions`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTransactions([...transactions, res.data]);
      setForm({ amount: "", category: "", type: "expense", date: "" });
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ✅ Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const expenseCategories = transactions.filter(
    (t) => t.type === "expense"
  );

  const categoryTotals = {};
  expenseCategories.forEach((t) => {
    categoryTotals[t.category] =
      (categoryTotals[t.category] || 0) + Number(t.amount);
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#6366f1",
          "#8b5cf6",
          "#ec4899",
          "#f59e0b",
          "#06b6d4",
        ],
      },
    ],
  };

  return (
    <>
      {/* ✅ Navbar handles greeting + logout */}
      <PrivateNavbar />

      <div className="dashboard">

        {/* ✅ Summary Cards */}
        <div className="summary">
          <div className="card balance">
            <h3>Balance</h3>
            <p>₹{balance}</p>
          </div>

          <div className="card income">
            <h3>Income</h3>
            <p>₹{income}</p>
          </div>

          <div className="card expense">
            <h3>Expenses</h3>
            <p>₹{expense}</p>
          </div>
        </div>

        {/* ✅ Add Transaction Form */}
        <form className="form" onSubmit={addTransaction}>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Enter Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <button type="submit">Add</button>
        </form>

        {/* ✅ Charts */}
        <div className="charts">
          <div className="chart-box">
            <h3>Income vs Expense</h3>
            <Bar data={barData} />
          </div>

          <div className="chart-box">
            <h3>Expense Distribution</h3>
            {expense > 0 ? (
              <Pie data={pieData} />
            ) : (
              <p>No expense data yet</p>
            )}
          </div>
        </div>

        {/* ✅ Transactions Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id}>
                  <td>{t.date?.split("T")[0]}</td>
                  <td>{t.category}</td>
                  <td>{t.type}</td>
                  <td className={t.type === "income" ? "green" : "red"}>
                    ₹{t.amount}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTransaction(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Charts */}
<div className="charts">
  <div className="chart-box">
    <h3>Income vs Expense</h3>
    <Bar data={barData} />
  </div>

  <div className="chart-box">
    <h3>Expense Distribution</h3>
    {expense > 0 ? (
      <Pie data={pieData} />
    ) : (
      <p>No expense data yet</p>
    )}
  </div>
</div>

{/* ✅ AI Insights */}
<div className="insights-section">
  <Insights userId={user._id} />
</div>

      </div>
    </>
  );
}

export default Dashboard;
