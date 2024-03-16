import { useState } from "react";
import PropTypes from "prop-types";

function StepSixForm({ setImages, nextStep, prevStep }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    const { files } = event.target;
    const allowedFileSize = 2048 * 1024;
    const newlySelectedImages = Array.from(files).filter(
      (file) => file.size <= allowedFileSize
    );

    if (newlySelectedImages.length < files.length) {
      alert(
        "Some selected files are too large (greater than 2MB) and will be ignored."
      );
    }

    setSelectedImages((prevImages) => [...prevImages, ...newlySelectedImages]);
    setImages((prevImages) => [...prevImages, ...newlySelectedImages]);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handlePrevStep = () => {
    prevStep();
  };

  const isNextButtonDisabled = selectedImages.length !== 6;

  return (
    <div>
      <h2>Step 6 Select six images</h2>

      <div className="form-group">
        <label htmlFor="images" className="floating-label">
          Images:
        </label>
        <input
          type="file"
          className="form-control"
          name="images"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {selectedImages.length > 0 && (
        <div>
          <h3>Selected Images:</h3>
          <div className="row">
            {selectedImages.map((file, index) => (
              <div key={index} className="col-sm-4">
                <div className="image-thumbnail">
                  <img
                    style={{ width: 300, height: 150 }}
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index}`}
                    className="img-fluid"
                  />
                  <br />
                  <button
                    className="btn btn-danger btn-sm mb-3"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={handlePrevStep}>
          Previous
        </button>
        <button
          style={{ background: "#2a2185" }}
          className="btn btn-primary"
          onClick={nextStep}
          disabled={isNextButtonDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}

StepSixForm.propTypes = {
  setImages: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default StepSixForm;
