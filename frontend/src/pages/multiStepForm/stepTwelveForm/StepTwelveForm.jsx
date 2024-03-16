import PropTypes from "prop-types";

export default function StepTwelveForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const isFormValid = () => {
    const requiredFields = [
      "mobile_police",
      "room_panic_system",
      "warning_alarm",
      "swing_bar_lock",
      "auto_door_guard",
      "chain_door_guard",
      "door_pechole",
      "finger_print_lock",
      "key_card",
      "door_motion_sensor",
    ];

    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div>
      <h2>Step 12 Security Measures</h2>
      <div className="form-group">
        <label htmlFor="mobile_police">Mobile Police:</label>
        <select
          className="form-control"
          name="mobile_police"
          value={formData.mobile_police}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="room_panic_system">Room Panic System:</label>
        <select
          className="form-control"
          name="room_panic_system"
          value={formData.room_panic_system}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="warning_alarm">Warning Alarm:</label>
        <select
          className="form-control"
          name="warning_alarm"
          value={formData.warning_alarm}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="swing_bar_lock">Swing Bar Lock:</label>
        <select
          className="form-control"
          name="swing_bar_lock"
          value={formData.swing_bar_lock}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="auto_door_guard">Auto Door Guard:</label>
        <select
          className="form-control"
          name="auto_door_guard"
          value={formData.auto_door_guard}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="chain_door_guard">Chain Door Guard:</label>
        <select
          className="form-control"
          name="chain_door_guard"
          value={formData.chain_door_guard}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="door_pechole">Door Peephole:</label>
        <select
          className="form-control"
          name="door_pechole"
          value={formData.door_pechole}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="finger_print_lock">Fingerprint Lock:</label>
        <select
          className="form-control"
          name="finger_print_lock"
          value={formData.finger_print_lock}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="key_card">Key Card:</label>
        <select
          className="form-control"
          name="key_card"
          value={formData.key_card}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="door_motion_sensor">Door Motion Sensor:</label>
        <select
          className="form-control"
          name="door_motion_sensor"
          value={formData.door_motion_sensor}
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

StepTwelveForm.propTypes = {
  formData: PropTypes.shape({
    mobile_police: PropTypes.string,
    room_panic_system: PropTypes.string,
    warning_alarm: PropTypes.string,
    swing_bar_lock: PropTypes.string,
    auto_door_guard: PropTypes.string,
    chain_door_guard: PropTypes.string,
    door_pechole: PropTypes.string,
    finger_print_lock: PropTypes.string,
    key_card: PropTypes.string,
    door_motion_sensor: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
