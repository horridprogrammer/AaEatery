import axios from "axios";
import { useState } from "react";
import "../../css/AddUser.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const response = await axios.post(`${process.env.BACKEND_URL}/api/users`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("User added successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Adding User Error.");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="add-user-container">
      <form className="add-user-form" onSubmit={handleSubmit}>
        <h1 className="add-user-title">Add New User</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g. ADMIN or USER"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
