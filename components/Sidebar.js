import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">Budget Beam</h2>

      <ul>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/login")}>Login</li>
        <li onClick={() => navigate("/signup")}>Sign Up</li>
        <li onClick={() => navigate("/about")}>About</li>
      </ul>
    </div>
  );
}

export default Sidebar;