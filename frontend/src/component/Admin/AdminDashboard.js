import { useNavigate } from "react-router-dom";
import "../../css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome to Admin Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage your cake shop efficiently with sweet control over products and inventory!
        </p>

        <div className="dashboard-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/admin/product")}
          >
            🍰 Manage Products
          </button>
          <button
            className="dashboard-btn"
            onClick={() => navigate("/admin/addproduct")}
          >
            🎂 Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
