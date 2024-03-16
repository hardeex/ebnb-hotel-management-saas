import PropTypes from "prop-types";

export default function StepNineForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const isFormValid = () => {
    // Check if all required fields are filled
    const requiredFields = [
      "babysitting",
      "laundry",
      "car_hire",
      "room_service_24hrs",
      "room_service_limited_hours",
      "dry_cleaning",
      "business_center",
      "fax",
      "photocopy",
      "concierge_service",
    ];

    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div>
      <h2>Step 9 Services</h2>
      <div className="form-group">
        <label htmlFor="babysitting">Babysitting:</label>
        <select
          className="form-control"
          name="babysitting"
          value={formData.babysitting}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="laundry">Laundry:</label>
        <select
          className="form-control"
          name="laundry"
          value={formData.laundry}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="car_hire">Car Hire:</label>
        <select
          className="form-control"
          name="car_hire"
          value={formData.car_hire}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="room_service_24hrs">Room Service 24hrs:</label>
        <select
          className="form-control"
          name="room_service_24hrs"
          value={formData.room_service_24hrs}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="room_service_limited_hours">
          Room Service Limited Hours:
        </label>
        <select
          className="form-control"
          name="room_service_limited_hours"
          value={formData.room_service_limited_hours}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dry_cleaning">Dry Cleaning:</label>
        <select
          className="form-control"
          name="dry_cleaning"
          value={formData.dry_cleaning}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="business_center">Business Center:</label>
        <select
          className="form-control"
          name="business_center"
          value={formData.business_center}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fax">Fax:</label>
        <select
          className="form-control"
          name="fax"
          value={formData.fax}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="photocopy">Photocopy:</label>
        <select
          className="form-control"
          name="photocopy"
          value={formData.photocopy}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="concierge_service">Concierge Service:</label>
        <select
          className="form-control"
          name="concierge_service"
          value={formData.concierge_service}
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

StepNineForm.propTypes = {
  formData: PropTypes.shape({
    babysitting: PropTypes.string,
    laundry: PropTypes.string,
    car_hire: PropTypes.string,
    room_service_24hrs: PropTypes.string,
    room_service_limited_hours: PropTypes.string,
    dry_cleaning: PropTypes.string,
    business_center: PropTypes.string,
    fax: PropTypes.string,
    photocopy: PropTypes.string,
    concierge_service: PropTypes.string,
  }).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
