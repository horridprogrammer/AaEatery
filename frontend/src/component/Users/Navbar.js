import { Link, useNavigate } from "react-router-dom";
import "../../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🍰 CakeShop</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/user/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/user/myOrders">My Orders</Link>
        </li>
        <li>
          <Link to="/user/cart">Cart</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
