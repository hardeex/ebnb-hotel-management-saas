import PropTypes from "prop-types";

export default function StepThirteenForm({
  formData,
  handleFieldChange,
  prevStep,
  nextStep,
}) {
  const isFormValid = () => {
    const requiredFields = [
      "smoke_detective",
      "invividual_room_decoder",
      "smoke_room",
      "bathroom_amenities",
      "twing_bed",
      "room_parlour_suite",
      "account_number",
      "tax_pin_number",
      "registration_number",
      "landmark",
    ];

    return requiredFields.every((field) => formData[field] !== "");
  };

  return (
    <div>
      <h2>Step 13</h2>
      <div className="form-group">
        <label htmlFor="smoke_detective" className="floating-label">
          Smoke Detective:
        </label>
        <select
          className="form-control"
          name="smoke_detective"
          value={formData.smoke_detective}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="invividual_room_decoder" className="floating-label">
          Individual Room Decoder:
        </label>
        <select
          className="form-control"
          name="invividual_room_decoder"
          value={formData.invividual_room_decoder}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="smoke_room" className="floating-label">
          Smoke Room:
        </label>
        <select
          className="form-control"
          name="smoke_room"
          value={formData.smoke_room}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bathroom_amenities" className="floating-label">
          Bathroom Amenities:
        </label>
        <input
          type="text"
          name="bathroom_amenities"
          value={formData.bathroom_amenities}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="twing_bed" className="floating-label">
          Twing Bed:
        </label>
        <select
          className="form-control"
          name="twing_bed"
          value={formData.twing_bed}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="room_parlour_suite" className="floating-label">
          Room Parlour Suite:
        </label>
        <select
          className="form-control"
          name="room_parlour_suite"
          value={formData.room_parlour_suite}
          onChange={handleFieldChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="account_number" className="floating-label">
          Account Number:
        </label>
        <input
          type="text"
          name="account_number"
          value={formData.account_number}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tax_pin_number" className="floating-label">
          Tax PIN Number:
        </label>
        <input
          type="text"
          name="tax_pin_number"
          value={formData.tax_pin_number}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="registration_number" className="floating-label">
          Registration Number:
        </label>
        <input
          type="text"
          name="registration_number"
          value={formData.registration_number}
          className="form-control"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="landmark" className="floating-label">
          Landmark:
        </label>
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          className="form-control"
          onChange={handleFieldChange}
        />
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

StepThirteenForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
