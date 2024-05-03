import React, { useState } from "react";
import PropTypes from "prop-types";

function SelectedImage({ file, index, removeImage }) {
  return (
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
  );
}

function StepSixForm({ setImages, nextStep, prevStep }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    const { files } = event.target;
    const allowedFileSize = 2048 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"]; // Add more if needed
    const newlySelectedImages = Array.from(files).filter(
      (file) => file.size <= allowedFileSize && allowedTypes.includes(file.type)
    );

    if (selectedImages.length + newlySelectedImages.length > 6) {
      alert("You can only select up to 6 images.");
      return;
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

  const isNextButtonDisabled = selectedImages.length !== 6 || selectedImages.length === 0;

  return (
    <div>
      <h2>Step 6: Select up to six images</h2>
      <div className="form-group">
        <label htmlFor="images" className="floating-label">
          Images:
        </label>
        <input
          type="file"
          id="images"
          className="form-control"
          name="images"
          multiple
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
      </div>

      {selectedImages.length > 0 && (
        <div>
          <h3>Selected Images:</h3>
          <div className="row">
            {selectedImages.map((file, index) => (
              <SelectedImage
                key={index}
                file={file}
                index={index}
                removeImage={removeImage}
              />
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
         // disabled={isNextButtonDisabled}
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
