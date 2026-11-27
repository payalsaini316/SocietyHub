import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showError, showSuccess } from "../utils/alert";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { loginUser, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      await showSuccess("Login successful!");

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "guard") {
        navigate("/guard/dashboard");
      } else {
        navigate("/resident/dashboard");
      }
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">SH</div>

        <h1>Welcome Back!</h1>
        <p className="login-subtitle">
          Login to your SocietyHub account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="login-register">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;