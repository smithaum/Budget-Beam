import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "15px", background: "#111", color: "#fff" }}>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default DashboardNavbar;