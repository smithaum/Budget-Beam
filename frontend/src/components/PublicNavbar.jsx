import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">BudgetBeam</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;