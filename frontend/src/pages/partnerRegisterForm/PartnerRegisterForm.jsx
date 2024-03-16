import React, { useState } from "react";
import axios from "axios";
import config from "../../config.json";
import "./partnerRegisterForm.css";

export default function PartnerRegisterForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "partner",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== cPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axios.post(`${config.apiUrl}/register`, formData);
      setSuccessMessage(
        "We sent you an email with a verification link to your email. To confirm your account, follow the link in the email we just sent."
      );
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.data.status === 401) {
        setError(
          "This email is already registered. Please log in or use a different email."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword((prevShowCPassword) => !prevShowCPassword);
  };

  return (
    <div className="center-container">
      <div className="mt-">
        <div className="d-flex jsutify-content-center">
          <p style={{ fontWeight: "bold", textAlign: "center" }}>
            Welcome to the ebnb family! Get started by opening your account with
            us.
          </p>
        </div>

        {successMessage ? (
          <div>
            <h2>Verify your account</h2>
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="fName" className="floating-label">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="floating-label">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                className="form-control"
                value={formData.phone_number}
                onChange={handleChange}
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
                  onChange={handleChange}
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
              <label htmlFor="cPassword" className="floating-label">
                Confirm Password
              </label>
              <div className="password-input">
                <input
                  type={showCPassword ? "text" : "password"}
                  name="cPassword"
                  className="form-control"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={toggleCPasswordVisibility}
                >
                  {showCPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formData.password !== cPassword && (
                <div className="alert alert-danger mt-2">
                  Password and Confirm Password do not match
                </div>
              )}
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
                "Register"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
