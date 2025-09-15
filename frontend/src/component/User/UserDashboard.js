import { useNavigate } from "react-router-dom";
import "../../css/UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
        <p className="dashboard-subtitle">
          Explore our delicious cakes and brownies! Track your orders and manage your profile easily.
        </p>

        <div className="dashboard-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/products")}
          >
            🍰 Browse Products
          </button>
          <button
            className="dashboard-btn"
            onClick={() => navigate("/orders")}
          >
            🛒 My Orders
          </button>
          <button
            className="dashboard-btn"
            onClick={() => navigate("/profile")}
          >
            👤 Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
