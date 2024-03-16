import PropTypes from "prop-types";

export default function StepTenForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const isFormValid = () => {
    // Check if all required fields are filled
    const requiredFields = [
      "airport_suttle",
      "electronic_room_key",
      "pets_allowed",
      "family_rooms",
      "soundproofed_rooms",
      "atm_machine",
      "money_exchange",
      "casino",
      "outdoor_dinning",
      "parking_security",
    ];

    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div>
      <h2>Step 10 Additional Amenities</h2>
      <div className="form-group">
        <label htmlFor="airport_suttle">Airport Shuttle:</label>
        <select
          className="form-control"
          name="airport_suttle"
          value={formData.airport_suttle}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="electronic_room_key">Electronic Room Key:</label>
        <select
          className="form-control"
          name="electronic_room_key"
          value={formData.electronic_room_key}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="pets_allowed">Pets Allowed:</label>
        <select
          className="form-control"
          name="pets_allowed"
          value={formData.pets_allowed}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="family_rooms">Family Rooms:</label>
        <select
          className="form-control"
          name="family_rooms"
          value={formData.family_rooms}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="soundproofed_rooms">Soundproofed Rooms:</label>
        <select
          className="form-control"
          name="soundproofed_rooms"
          value={formData.soundproofed_rooms}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="atm_machine">ATM Machine:</label>
        <select
          className="form-control"
          name="atm_machine"
          value={formData.atm_machine}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="money_exchange">Money Exchange:</label>
        <select
          className="form-control"
          name="money_exchange"
          value={formData.money_exchange}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="casino">Casino:</label>
        <select
          className="form-control"
          name="casino"
          value={formData.casino}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="outdoor_dinning">Outdoor Dining:</label>
        <select
          className="form-control"
          name="outdoor_dinning"
          value={formData.outdoor_dinning}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="parking_security">Parking Security:</label>
        <select
          className="form-control"
          name="parking_security"
          value={formData.parking_security}
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

StepTenForm.propTypes = {
  formData: PropTypes.shape({
    airport_suttle: PropTypes.string,
    electronic_room_key: PropTypes.string,
    pets_allowed: PropTypes.string,
    family_rooms: PropTypes.string,
    soundproofed_rooms: PropTypes.string,
    atm_machine: PropTypes.string,
    money_exchange: PropTypes.string,
    casino: PropTypes.string,
    outdoor_dinning: PropTypes.string,
    parking_security: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
