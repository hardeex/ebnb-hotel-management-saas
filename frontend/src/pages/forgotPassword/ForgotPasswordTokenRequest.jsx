import { useState } from "react";
import axios from "axios";
import config from "../../config.json";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = (e) => {
    e.preventDefault();
    axios
      .post(`${config.apiUrl}/password/email`, { email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setEmail("");
    setEmailSent(true);
  };

  return (
    <div className="center-container">
      <div className="mt-4">
        <h4>Enter your email to reset your password</h4>
        {emailSent && (
          <div className="alert alert-success">
            Email sent successfully. Check your inbox for instructions.
          </div>
        )}
        <form onSubmit={handleSendEmail}>
          <div className="form-group">
            <label className="floating-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group"></div>
          <button
            style={{ background: "#2a2185" }}
            className="btn btn-primary mb-4"
            id="submit-faq-btn"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
