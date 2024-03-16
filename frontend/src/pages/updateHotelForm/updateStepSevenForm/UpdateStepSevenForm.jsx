import PropTypes from "prop-types";

function UpdateStepSevenForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const isFormValid = () => {
    const requiredFields = [
      "hot_tub_jacuzzi",
      "sauna",
      "steam_room",
      "spa_wellness_center",
      "hamman",
      "fitness_center_gym",
      "elevator_lift",
      "cctv_cemera_security",
      "security_guard",
      "parking_nearby",
    ];

    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div>
      <h2>Step 7 Additional Facilities</h2>
      <div className="form-group pt-3">
        <label htmlFor="hot_tub_jacuzzi">Hot Tub/Jacuzzi:</label>
        <select
          name="hot_tub_jacuzzi"
          className="form-control"
          value={formData.hot_tub_jacuzzi}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sauna">Sauna:</label>
        <select
          name="sauna"
          className="form-control"
          value={formData.sauna}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="steam_room">Steam Room:</label>
        <select
          name="steam_room"
          className="form-control"
          value={formData.steam_room}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="spa_wellness_center">Spa/Wellness Center:</label>
        <select
          name="spa_wellness_center"
          className="form-control"
          value={formData.spa_wellness_center}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="hamman">Hamman:</label>
        <select
          name="hamman"
          className="form-control"
          value={formData.hamman}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fitness_center_gym">Fitness Center/Gym:</label>
        <select
          name="fitness_center_gym"
          className="form-control"
          value={formData.fitness_center_gym}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="elevator_lift">Elevator/Lift:</label>
        <select
          name="elevator_lift"
          className="form-control"
          value={formData.elevator_lift}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cctv_cemera_security">CCTV/Camera Security:</label>
        <select
          name="cctv_cemera_security"
          className="form-control"
          value={formData.cctv_cemera_security}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="security_guard">Security Guard:</label>
        <select
          name="security_guard"
          className="form-control"
          value={formData.security_guard}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="parking_nearby">Parking Nearby:</label>
        <select
          name="parking_nearby"
          className="form-control"
          value={formData.parking_nearby}
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

UpdateStepSevenForm.propTypes = {
  formData: PropTypes.shape({
    hot_tub_jacuzzi: PropTypes.string,
    sauna: PropTypes.string,
    steam_room: PropTypes.string,
    spa_wellness_center: PropTypes.string,
    hamman: PropTypes.string,
    fitness_center_gym: PropTypes.string,
    elevator_lift: PropTypes.string,
    cctv_cemera_security: PropTypes.string,
    security_guard: PropTypes.string,
    parking_nearby: PropTypes.string,
  }).isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UpdateStepSevenForm;
