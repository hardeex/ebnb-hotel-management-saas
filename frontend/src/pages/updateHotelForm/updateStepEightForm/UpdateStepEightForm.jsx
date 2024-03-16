import PropTypes from "prop-types";

export default function UpdateStepEightForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const isFormValid = () => {
    const requiredFields = [
      "mobile_phone_reception",
      "none_smoking_public_area",
      "rooms_facilities_for_disable",
      "valet_parking",
      "safety_deposit_boxes",
      "in_room_safe",
      "fireplace",
      "meeting_banquests_facilities",
      "breakfast",
      "buffet_breakfast",
    ];

    return requiredFields.every((field) => formData[field] !== "");
  };
  return (
    <div>
      <h2>Step 8 Additional Services</h2>
      <div className="form-group">
        <label htmlFor="mobile_phone_reception" className="floating-label">
          Reception's phone number
        </label>
        <input
          type="text"
          className="form-control"
          name="mobile_phone_reception"
          value={formData.mobile_phone_reception}
          onChange={handleFieldChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="none_smoking_public_area">
          Non-Smoking Public Area:
        </label>
        <select
          className="form-control"
          name="none_smoking_public_area"
          value={formData.none_smoking_public_area}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="rooms_facilities_for_disable">
          Rooms Facilities for Disable:
        </label>
        <select
          className="form-control"
          name="rooms_facilities_for_disable"
          value={formData.rooms_facilities_for_disable}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="valet_parking">Valet Parking:</label>
        <select
          className="form-control"
          name="valet_parking"
          value={formData.valet_parking}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="safety_deposit_boxes">Safety Deposit Boxes:</label>
        <select
          className="form-control"
          name="safety_deposit_boxes"
          value={formData.safety_deposit_boxes}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="in_room_safe">In-Room Safe:</label>
        <select
          className="form-control"
          name="in_room_safe"
          value={formData.in_room_safe}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fireplace">Fireplace:</label>
        <select
          className="form-control"
          name="fireplace"
          value={formData.fireplace}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="meeting_banquests_facilities">
          Meeting/Banquets Facilities:
        </label>
        <select
          className="form-control"
          name="meeting_banquests_facilities"
          value={formData.meeting_banquests_facilities}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="breakfast">Breakfast:</label>
        <select
          className="form-control"
          name="breakfast"
          value={formData.breakfast}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="buffet_breakfast">Buffet Breakfast:</label>
        <select
          className="form-control"
          name="buffet_breakfast"
          value={formData.buffet_breakfast}
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
          disabled={!isFormValid()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

UpdateStepEightForm.propTypes = {
  formData: PropTypes.shape({
    mobile_phone_reception: PropTypes.string,
    none_smoking_public_area: PropTypes.string,
    rooms_facilities_for_disable: PropTypes.string,
    valet_parking: PropTypes.string,
    safety_deposit_boxes: PropTypes.string,
    in_room_safe: PropTypes.string,
    fireplace: PropTypes.string,
    meeting_banquests_facilities: PropTypes.string,
    breakfast: PropTypes.string,
    buffet_breakfast: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
