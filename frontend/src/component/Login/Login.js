import { useState } from "react";
import axios from "axios";
import "../../css/Login.css"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      console.log("Token:", localStorage.getItem("token"));
      console.log("Role:", localStorage.getItem("role"));
      console.log("Email:",localStorage.getItem("email"));
      

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "USER") {
        navigate("/user/dashboard");
      } else {
        alert("Unknown role!");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login Error. Check credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ textAlign: "center", color: "#d2691e", marginBottom: "20px" }}>
        Welcome Back!
      </h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="submit" 
          value="Login" 
        />
      </form>
    </div>
  );
};

export default Login;
