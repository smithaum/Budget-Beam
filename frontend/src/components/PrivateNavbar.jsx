import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

function PrivateNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      
      {/* LEFT */}
      <div className="nav-left">
        💰 Budget Tracker
      </div>

      {/* CENTER */}
      <div className="nav-center">
        Welcome back, <strong>{user?.name}</strong> ✨
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button
          className="edit-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default PrivateNavbar;