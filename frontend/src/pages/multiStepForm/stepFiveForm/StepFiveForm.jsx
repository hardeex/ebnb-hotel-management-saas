import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function StepFiveForm({ formData, handleFieldChange, prevStep, nextStep }) {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      formData.guest !== "" &&
        formData.heating !== "" &&
        formData.bar !== "" &&
        formData.restaurant !== "" &&
        formData.lounge !== "" &&
        formData.terrace !== "" &&
        formData.garden !== "" &&
        formData.luggage_storage !== "" &&
        formData.indoor_poor !== "" &&
        formData.outdoor_poor !== ""
    );
  }, [formData]);

  return (
    <div>
      <h2>Step 5 Property Type</h2>

      <div className="form-group">
        <label htmlFor="guest">Guest:</label>
        <select
          className="form-control"
          name="guest"
          value={formData.guest}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="heating">Heating:</label>
        <select
          className="form-control"
          name="heating"
          value={formData.heating}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bar">Bar:</label>
        <select
          className="form-control"
          name="bar"
          value={formData.bar}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="restaurant">Restaurant:</label>
        <select
          className="form-control"
          name="restaurant"
          value={formData.restaurant}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="lounge">Lounge:</label>
        <select
          className="form-control"
          name="lounge"
          value={formData.lounge}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="terrace">Terrace:</label>
        <select
          className="form-control"
          name="terrace"
          value={formData.terrace}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="garden">Garden:</label>
        <select
          className="form-control"
          name="garden"
          value={formData.garden}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="luggage_storage">Luggage Storage:</label>
        <select
          className="form-control"
          name="luggage_storage"
          value={formData.luggage_storage}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="indoor_poor">Indoor Pool:</label>
        <select
          className="form-control"
          name="indoor_poor"
          value={formData.indoor_poor}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="outdoor_poor">Outdoor Pool:</label>
        <select
          className="form-control"
          name="outdoor_poor"
          value={formData.outdoor_poor}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="d-flex justify-content-between mb-2">
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

StepFiveForm.propTypes = {
  formData: PropTypes.shape({
    guest: PropTypes.string,
    heating: PropTypes.string,
    bar: PropTypes.string,
    restaurant: PropTypes.string,
    lounge: PropTypes.string,
    terrace: PropTypes.string,
    garden: PropTypes.string,
    luggage_storage: PropTypes.string,
    indoor_poor: PropTypes.string,
    outdoor_poor: PropTypes.string,
  }).isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default StepFiveForm;
