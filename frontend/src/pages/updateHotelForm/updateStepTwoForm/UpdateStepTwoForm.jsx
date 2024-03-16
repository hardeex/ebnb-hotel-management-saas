import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./updateStepTwoForm.css";

function UpdateStepTwoForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const {
      food_and_drink,
      safety_and_security,
      bedroom,
      outdoors,
      internet,
      parking,
      kitchen,
      transportation,
      room_amenities,
    } = formData;
    const isValid =
      food_and_drink &&
      safety_and_security &&
      bedroom &&
      outdoors &&
      internet &&
      parking &&
      kitchen &&
      transportation &&
      room_amenities;
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div>
      <h2>Step 2 Facilities</h2>
      <div className="form-group">
        <label htmlFor="food_and_drink" className="floating-label">
          Food and Drink:
        </label>
        <select
          className="form-control"
          name="food_and_drink"
          value={formData.food_and_drink}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="safety_and_security" className="floating-label">
          Safety and Security:
        </label>
        <select
          className="form-control"
          name="safety_and_security"
          value={formData.safety_and_security}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bedroom" className="floating-label">
          Bedroom:
        </label>
        <select
          className="form-control"
          name="bedroom"
          value={formData.bedroom}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="outdoors" className="floating-label">
          Outdoors:
        </label>
        <select
          className="form-control"
          name="outdoors"
          value={formData.outdoors}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="internet" className="floating-label">
          Internet:
        </label>
        <select
          className="form-control"
          name="internet"
          value={formData.internet}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="parking" className="floating-label">
          Parking:
        </label>
        <select
          className="form-control"
          name="parking"
          value={formData.parking}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="kitchen" className="floating-label">
          Kitchen:
        </label>
        <select
          className="form-control"
          name="kitchen"
          value={formData.kitchen}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="transportation" className="floating-label">
          Transportation:
        </label>
        <select
          className="form-control"
          name="transportation"
          value={formData.transportation}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="room_amenities" className="floating-label">
          Room Amenities:
        </label>
        <select
          className="form-control"
          name="room_amenities"
          value={formData.room_amenities}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Previous
        </button>
        <button
          style={{ background: "#2a2185" }}
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!isFormValid}
        >
          Next
        </button>
      </div>
    </div>
  );
}

UpdateStepTwoForm.propTypes = {
  formData: PropTypes.shape({
    food_and_drink: PropTypes.string,
    safety_and_security: PropTypes.string,
    bedroom: PropTypes.string,
    outdoors: PropTypes.string,
    internet: PropTypes.string,
    parking: PropTypes.string,
    kitchen: PropTypes.string,
    transportation: PropTypes.string,
    room_amenities: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UpdateStepTwoForm;
