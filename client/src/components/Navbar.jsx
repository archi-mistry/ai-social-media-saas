import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";

export default function Navbar() {
  const token = getToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link className="logo" to="/">AI SaaS</Link>
        </div>

        <div className="nav-right">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-outline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
