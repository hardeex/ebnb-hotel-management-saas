import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";
import UpdateStepOneForm from "./updateStepOneForm/UpdateStepOneForm";
import UpdateStepTwoForm from "./updateStepTwoForm/UpdateStepTwoForm";
import UpdateStepThreeForm from "./updateStepThreeForm/UpdateStepThreeForm";
import UpdateStepFourForm from "./updateStepFourForm/UpdateStepFourForm";
import UpdateStepFiveForm from "./updateStepFiveForm/UpdateStepFiveForm";
import UpdateStepSixForm from "./updateStepSixForm/UpdateStepSixForm";
import UpdateStepSevenForm from "./updateStepSevenForm/UpdateStepSevenForm";
import UpdateStepEightForm from "./updateStepEightForm/UpdateStepEightForm";
import UpdateStepNineForm from "./updateStepNineForm/UpdateStepNineForm";
import UpdateStepTenForm from "./updateStepTenForm/UpdateStepTenForm";
import UpdateStepElevenForm from "./updateStepElevenForm/UpdateStepElevenForm";
import UpdateStepTwelveForm from "./updateStepTwelveForm/UpdateStepTwelveForm";
import UpdateStepThirteenForm from "./updateStepThirteenForm/UpdateStepThirteenForm";
import UpdateStepFourteenForm from "./updateStepFourteenForm/UpdateStepFourteenForm";
import "./updateHotelForm.css";

function UpdateHotelForm() {
  const { user } = useAuth();
  const { hotelId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState(1);
  const [isValidUser, setIsValidUser] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    partner_id: user?.id,
    adresse: "",
    location: "",
    description: "",
    contact: "",
    email: "",
    whatsapp: "",
    website: "",
    status: "Open",
    bathroom: "",
    food_and_drink: "",
    safety_and_security: "",
    bedroom: "",
    outdoors: "",
    internet: "",
    general: "",
    parking: "",
    kitchen: "",
    transportation: "",
    room_amenities: "",
    front_desk: "",
    living_area: "",
    accessibility: "",
    media_and_technology: "",
    cleaning_services: "",
    health_and_wellness_facilities: "",
    business_facilities: "",
    languages: "",
    building_type: "",
    number_of_rooms: "",
    checkin_date: "",
    checkin_time: "",
    price_per_night: "",
    latitude: null,
    longitude: null,
    managers_phone_number: "",
    owners_phone_number: "",
    aircondition: "",
    living_room: "",
    nearby: "",
  });

  useEffect(() => {
    if (user) {
      setIsValidUser(true);

      fetchHotelData();
    } else {
      setIsValidUser(false);
    }
  }, [user, hotelId]);

  const fetchHotelData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/hotels/${hotelId}`);
      const hotelData = response.data;
      setFormData(hotelData);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  const handleImageUpload = async () => {
    if (images.length > 0) {
      const formDataImages = new FormData();

      images.forEach((image, index) => {
        formDataImages.append(`images[${index}]`, image);
      });

      await axios.post(
        `${config.apiUrl}/put-images/${hotelId}`,
        formDataImages,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.post(`${config.apiUrl}/update-hotels/${hotelId}`, formData);
      await handleImageUpload();
      setSuccess("Hotel updated successfully!");
    } catch (error) {
      setError("Error updating the hotel. Please try again.");
      console.error("Error updating the hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UpdateStepOneForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <UpdateStepTwoForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <UpdateStepThreeForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <UpdateStepFourForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <UpdateStepFiveForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 6:
        return (
          <UpdateStepSixForm
            hotelId={hotelId}
            setImages={setImages}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 7:
        return (
          <UpdateStepSevenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 8:
        return (
          <UpdateStepEightForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 9:
        return (
          <UpdateStepNineForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 10:
        return (
          <UpdateStepTenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 11:
        return (
          <UpdateStepElevenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 12:
        return (
          <UpdateStepTwelveForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 13:
        return (
          <UpdateStepThirteenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 14:
        return (
          <UpdateStepFourteenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  const renderSteps = () => {
    const steps = [
      "Step 1",
      "Step 2",
      "Step 3",
      "Step 4",
      "Step 5",
      "Step 6",
      "Step 7",
      "Step 8",
      "Step 9",
      "Step 10",
      "Step 11",
      "Step 12",
      "Step 13",
      "Step 14",
    ];

    return (
      <div>
        <hr
          className="step-line"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    );
  };

  return (
    <div>
      {isValidUser ? (
        <div className="update-hotel-form p-5">
          {renderSteps()}
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {renderStep()}
        </div>
      ) : (
        <div
          className="container d-flex justify-content-center"
          style={{ marginTop: 100 }}
        >
          <p>
            Sorry, you are not a valid user. Please contact support for
            assistance.
          </p>
        </div>
      )}
    </div>
  );
}

export default UpdateHotelForm;
