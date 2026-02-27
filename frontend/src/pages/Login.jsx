import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // RESET PASSWORD
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/reset-password", {
        email,
        newPassword,
      });

      alert("Password updated! Please login.");
      setIsReset(false);
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="glass-card">
        <h2>{isReset ? "Reset Password" : "Welcome Back"}</h2>

        <form onSubmit={isReset ? handleReset : handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isReset && (
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {isReset && (
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          )}

          <button type="submit">
            {isReset ? "Update Password" : "Login"}
          </button>
        </form>

        <p
          className="forgot-link"
          onClick={() => setIsReset(!isReset)}
        >
          {isReset ? "Back to Login" : "Forgot Password?"}
        </p>
      </div>
    </div>
  );
}

export default Login;