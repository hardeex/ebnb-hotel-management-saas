// UpdateStepFourForm.js
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./updateStepFourForm.css";

function UpdateStepFourForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      formData.checkin_time !== "" &&
        formData.checkout_time !== "" &&
        formData.price_per_night !== "" &&
        formData.managers_phone_number !== "" &&
        formData.owners_phone_number !== "" &&
        formData.aircondition !== "" &&
        formData.living_room !== "" &&
        formData.nearby !== "" &&
        formData.electricity_24hrs !== "" &&
        formData.front_desk_24hrs !== ""
    );
  }, [formData]);

  return (
    <div className="update-step-four-form">
      <h2>Step 4 Wellness and Business</h2>
      <div className="form-group">
        <label htmlFor="checkin_time">Check-in Time:</label>
        <input
          type="time"
          name="checkin_time"
          value={formData.checkin_time}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkout_time">Check-out Time:</label>
        <input
          type="time"
          name="checkout_time"
          value={formData.checkout_time}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price_per_night">Price per Night:</label>
        <input
          type="number"
          name="price_per_night"
          value={formData.price_per_night}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="managers_phone_number">Manager's Phone Number:</label>
        <input
          type="text"
          name="managers_phone_number"
          value={formData.managers_phone_number}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="owners_phone_number">Owner's Phone Number:</label>
        <input
          type="text"
          name="owners_phone_number"
          value={formData.owners_phone_number}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="aircondition">Aircondition:</label>
        <select
          className="form-control"
          name="aircondition"
          value={formData.aircondition}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="living_room">Living Room:</label>
        <select
          className="form-control"
          name="living_room"
          value={formData.living_room}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nearby">Nearby:</label>
        <input
          type="text"
          name="nearby"
          value={formData.nearby}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="electricity_24hrs">Electricity 24hrs:</label>
        <select
          className="form-control"
          name="electricity_24hrs"
          value={formData.electricity_24hrs}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="front_desk_24hrs">Front Desk 24hrs:</label>
        <select
          className="form-control"
          name="front_desk_24hrs"
          value={formData.front_desk_24hrs}
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

UpdateStepFourForm.propTypes = {
  formData: PropTypes.shape({
    checkin_time: PropTypes.string,
    checkout_time: PropTypes.string,
    price_per_night: PropTypes.string,
    managers_phone_number: PropTypes.string,
    owners_phone_number: PropTypes.string,
    aircondition: PropTypes.string,
    living_room: PropTypes.string,
    nearby: PropTypes.string,
    electricity_24hrs: PropTypes.string,
    front_desk_24hrs: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UpdateStepFourForm;
