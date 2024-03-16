import React, { useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const previousLocation = useLocation().state?.from || "/";
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${config.apiUrl}/login`, formData);
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      login(data.user);
      setTimeout(() => {
        navigate(previousLocation);
      }, 1000);
    } catch (error) {
      setErrorMessage("Invalid email or password");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-form">
      <div className="mt-4">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="floating-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="floating-label">
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <Link to="/reset-password">Forgot Your Password?</Link>
          </div>
          <button
            style={{ background: "#2a2185", marginLeft: "4rem" }}
            className="btn btn-primary mb-4"
            id="submit-faq-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
