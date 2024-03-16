import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./updateStepThreeForm.css";

function UpdateStepThreeForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const {
      living_area,
      accessibility,
      media_and_technology,
      cleaning_services,
      health_and_wellness_facilities,
      business_facilities,
      languages,
      building_type,
      number_of_rooms,
    } = formData;
    const isValid =
      living_area &&
      accessibility &&
      media_and_technology &&
      cleaning_services &&
      health_and_wellness_facilities &&
      business_facilities &&
      languages &&
      building_type &&
      number_of_rooms;
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div>
      <h2>Step 3 General Info</h2>
      <div className="form-group">
        <label htmlFor="living_area" className="floating-label">
          Living Area:
        </label>
        <select
          className="form-control"
          name="living_area"
          value={formData.living_area}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="accessibility" className="floating-label">
          Accessibility:
        </label>
        <select
          className="form-control"
          name="accessibility"
          value={formData.accessibility}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="media_and_technology" className="floating-label">
          Media and Technology:
        </label>
        <select
          className="form-control"
          name="media_and_technology"
          value={formData.media_and_technology}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cleaning_services" className="floating-label">
          Cleaning Services:
        </label>
        <select
          className="form-control"
          name="cleaning_services"
          value={formData.cleaning_services}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label
          htmlFor="health_and_wellness_facilities"
          className="floating-label"
        >
          Health and Wellness Facilities:
        </label>
        <select
          className="form-control"
          name="health_and_wellness_facilities"
          value={formData.health_and_wellness_facilities}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="business_facilities" className="floating-label">
          Business Facilities:
        </label>
        <select
          className="form-control"
          name="business_facilities"
          value={formData.business_facilities}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="languages" className="floating-label">
          Languages:
        </label>
        <select
          className="form-control"
          name="languages"
          value={formData.languages}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="building_type" className="floating-label">
          Building Type:
        </label>
        <select
          className="form-control"
          name="building_type"
          value={formData.building_type}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="number_of_rooms" className="floating-label">
          Number of Rooms:
        </label>
        <select
          className="form-control"
          name="number_of_rooms"
          value={formData.number_of_rooms}
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

UpdateStepThreeForm.propTypes = {
  formData: PropTypes.shape({
    living_area: PropTypes.string,
    accessibility: PropTypes.string,
    media_and_technology: PropTypes.string,
    cleaning_services: PropTypes.string,
    health_and_wellness_facilities: PropTypes.string,
    business_facilities: PropTypes.string,
    languages: PropTypes.string,
    building_type: PropTypes.string,
    number_of_rooms: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UpdateStepThreeForm;
