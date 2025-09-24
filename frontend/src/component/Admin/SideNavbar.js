import { NavLink } from "react-router-dom";
import "../../css/AdminSidebar.css";

const SideNavbar = ({ isOpen }) => {
  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        {isOpen && <h2>Admin Panel</h2>}
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
          {isOpen ? "Dashboard" : "🏠"}
        </NavLink>
        <NavLink to="/admin/product" className={({ isActive }) => (isActive ? "active-link" : "")}>
          {isOpen ? "Products" : "📦"}
        </NavLink>
        <NavLink to="/admin/addproduct" className={({ isActive }) => (isActive ? "active-link" : "")}>
          {isOpen ? "Add Product" : "➕"}
        </NavLink>
        <NavLink to="/admin/adduser" className={({ isActive }) => (isActive ? "active-link" : "")}>
          {isOpen ? "Add User" : "👤"}
        </NavLink>
        <NavLink to="/" onClick={() => localStorage.clear()}>
          {isOpen ? "Logout" : "🔓"}
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideNavbar;
