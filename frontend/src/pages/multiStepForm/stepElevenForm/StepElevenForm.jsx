import PropTypes from "prop-types";

export default function StepElevenForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const isFormValid = () => {
    const requiredFields = [
      "survelance",
      "tea_facilities",
      "cubicle_shower",
      "bath_tube",
      "flat_screen_tv",
      "wake_up_alarm",
      "services_charge",
      "emergency_exit",
      "hair_dryer",
      "first_aid_box",
    ];

    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div>
      <h2>Step 11 Additional Facilities</h2>
      <div className="form-group">
        <label htmlFor="survelance">Surveillance:</label>
        <select
          className="form-control"
          name="survelance"
          value={formData.survelance}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tea_facilities">Tea Facilities:</label>
        <select
          className="form-control"
          name="tea_facilities"
          value={formData.tea_facilities}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cubicle_shower">Cubicle Shower:</label>
        <select
          className="form-control"
          name="cubicle_shower"
          value={formData.cubicle_shower}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bath_tube">Bath Tube:</label>
        <select
          className="form-control"
          name="bath_tube"
          value={formData.bath_tube}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="flat_screen_tv">Flat Screen TV:</label>
        <select
          className="form-control"
          name="flat_screen_tv"
          value={formData.flat_screen_tv}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="wake_up_alarm">Wake-up Alarm:</label>
        <select
          className="form-control"
          name="wake_up_alarm"
          value={formData.wake_up_alarm}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="services_charge">Services Charge:</label>
        <select
          className="form-control"
          name="services_charge"
          value={formData.services_charge}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="emergency_exit">Emergency Exit:</label>
        <select
          className="form-control"
          name="emergency_exit"
          value={formData.emergency_exit}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="hair_dryer">Hair Dryer:</label>
        <select
          className="form-control"
          name="hair_dryer"
          value={formData.hair_dryer}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="first_aid_box">First Aid Box:</label>
        <select
          className="form-control"
          name="first_aid_box"
          value={formData.first_aid_box}
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

StepElevenForm.propTypes = {
  formData: PropTypes.shape({
    survelance: PropTypes.string,
    tea_facilities: PropTypes.string,
    cubicle_shower: PropTypes.string,
    bath_tube: PropTypes.string,
    flat_screen_tv: PropTypes.string,
    wake_up_alarm: PropTypes.string,
    services_charge: PropTypes.string,
    emergency_exit: PropTypes.string,
    hair_dryer: PropTypes.string,
    first_aid_box: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
