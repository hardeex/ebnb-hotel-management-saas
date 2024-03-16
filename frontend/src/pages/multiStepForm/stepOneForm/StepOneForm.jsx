import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function StepOneForm({ formData, handleFieldChange, nextStep }) {
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const {
      name,
      adresse,
      location,
      reasons_to_choose,
      contact,
      email,
      whatsapp,
      status,
      bathroom,
    } = formData;
    const isValid =
      name &&
      adresse &&
      location &&
      reasons_to_choose &&
      contact &&
      email &&
      whatsapp &&
      status &&
      bathroom;
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div>
      <h2>Step 1 Basic Info</h2>
      <div className="form-group">
        <label htmlFor="name" className="floating-label">
          Hotel name:
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="adresse" className="floating-label">
          Address:
        </label>
        <input
          type="text"
          className="form-control"
          name="adresse"
          value={formData.adresse}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location" className="floating-label">
          Location:
        </label>
        <input
          type="text"
          className="form-control"
          name="location"
          value={formData.location}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="reasons_to_choose" className="floating-label">
          Reasons to choose your Hotel/Property:
        </label>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          name="reasons_to_choose"
          value={formData.reasons_to_choose}
          maxLength={100}
          onChange={handleFieldChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="contact" className="floating-label">
          Contact:
        </label>
        <input
          type="tel"
          className="form-control"
          name="contact"
          value={formData.contact}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="floating-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="whatsapp" className="floating-label">
          WhatsApp:
        </label>
        <input
          type="tel"
          className="form-control"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="website" className="floating-label">
          Website:
        </label>
        <input
          type="text"
          className="form-control"
          name="website"
          value={formData.website}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status" className="floating-label">
          Status:
        </label>
        <select
          name="status"
          className="form-control"
          value={formData.status}
          onChange={handleFieldChange}
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bathroom" className="floating-label">
          Bathroom:
        </label>
        <select
          className="form-control"
          name="bathroom"
          value={formData.bathroom}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <br />
      <button
        style={{ background: "#2a2185" }}
        className="btn btn-primary mb-2"
        onClick={nextStep}
        disabled={!isFormValid}
      >
        Next
      </button>
    </div>
  );
}

StepOneForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    adresse: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    reasons_to_choose: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    whatsapp: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    bathroom: PropTypes.string.isRequired,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default StepOneForm;
