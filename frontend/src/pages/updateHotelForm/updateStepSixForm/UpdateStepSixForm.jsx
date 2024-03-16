import { useState } from "react";
import PropTypes from "prop-types";

function UpdateStepSixForm({ setImages, nextStep, prevStep }) {
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

    const combinedImages = [...selectedImages, ...newlySelectedImages];

    const limitedImages = combinedImages.slice(0, 6);

    setSelectedImages(limitedImages);
    setImages(limitedImages);
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    setImages(updatedImages);
  };

  const handlePrevStep = () => {
    prevStep();
  };

  const isNextButtonDisabled =
    selectedImages.length > 0 && selectedImages.length !== 6;

  return (
    <div>
      <h2>Update Step 6: Select up to six images (optional)</h2>

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

UpdateStepSixForm.propTypes = {
  setImages: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  hotelId: PropTypes.string.isRequired,
};

export default UpdateStepSixForm;
