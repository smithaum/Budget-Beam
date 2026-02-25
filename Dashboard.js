import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">💰 BudgetBeam</div>
        <div className="nav-buttons">
          <button 
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button 
            className="getstarted-btn"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <h1>
          Manage your money <span>beautifully</span>
        </h1>
        <p>
          A beautiful and intelligent way to manage your money and grow your wealth.
    </p>
    
      </div>

    </div>
  );
}

export default Dashboard;