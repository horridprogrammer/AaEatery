import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import "../../css/AdminLayout.css";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="admin-layout">
      <SideNavbar isOpen={isOpen} />
      <div className={`admin-content ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? "⬅" : "➡"}
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
