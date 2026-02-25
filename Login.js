import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();   // prevent page reload
    navigate("/planner"); // go to planner after login
  };

  return (
    <div className="login-wrapper">
      <div className="glass-card">
        <h2>Welcome Back</h2>
        <p>Login to continue your journey</p>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;