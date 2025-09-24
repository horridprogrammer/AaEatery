import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../../css/UserLayout.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Navbar />
      <main className="user-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
