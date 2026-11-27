import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showError, showSuccess } from "../utils/alert";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    flatNumber: ""
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
      await registerUser(formData);

      await showSuccess("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-logo">SH</div>

        <h1>Create Account</h1>
        <p className="register-subtitle">
          Join your SocietyHub community
        </p>

        <form onSubmit={handleSubmit}>
          <div className="register-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-field">
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

          <div className="register-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="register-field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-field">
            <label>Flat Number</label>
            <input
              type="text"
              name="flatNumber"
              placeholder="Example: A-101"
              value={formData.flatNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="register-login">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;