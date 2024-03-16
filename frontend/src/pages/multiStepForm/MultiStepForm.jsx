import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";
import StepOneForm from "./stepOneForm/StepOneForm";
import StepTwoForm from "./stepTwoForm/StepTwoForm";
import StepThreeForm from "./stepThreeForm/StepThreeForm";
import StepFourForm from "./stepFourForm/StepFourForm";
import StepFiveForm from "./stepFiveForm/StepFiveForm";
import StepSixForm from "./stepSixForm/StepSixForm";
import StepSevenForm from "./stepSevenForm/StepSevenForm";
import StepEightForm from "./stepEightForm/StepEightForm";
import StepNineForm from "./stepNineForm/StepNineForm";
import StepTenForm from "./stepTenForm/StepTenForm";
import StepElevenForm from "./stepElevenForm/StepElevenForm";
import StepTwelveForm from "./stepTwelveForm/StepTwelveForm";
import StepThirteenForm from "./stepThirteenForm/StepThirteenForm";
import StepFourteenForm from "./stepFourteenForm/StepFourteenForm";
import "./multiStepForm.css";

function MultiStepForm() {
  const { login } = useAuth();
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState(1);
  const [isValidUser, setIsValidUser] = useState(false);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    partner_id: userId,
    adresse: "",
    location: "",
    reasons_to_choose: "",
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
    electricity_24hrs: "",
    front_desk_24hrs: "",
    guest: "",
    heating: "",
    bar: "",
    restaurant: "",
    lounge: "",
    terrace: "",
    garden: "",
    luggage_storage: "",
    indoor_poor: "",
    outdoor_poor: "",
    hot_tub_jacuzzi: "",
    sauna: "",
    steam_room: "",
    spa_wellness_center: "",
    hamman: "",
    fitness_center_gym: "",
    elevator_lift: "",
    cctv_cemera_security: "",
    security_guard: "",
    parking_nearby: "",
    mobile_phone_reception: "",
    none_smoking_public_area: "",
    rooms_facilities_for_disable: "",
    valet_parking: "",
    safety_deposit_boxes: "",
    in_room_safe: "",
    fireplace: "",
    meeting_banquests_facilities: "",
    breakfast: "",
    buffet_breakfast: "",
    babysitting: "",
    laundry: "",
    car_hire: "",
    room_service_24hrs: "",
    room_service_limited_hours: "",
    dry_cleaning: "",
    business_center: "",
    fax: "",
    photocopy: "",
    concierge_service: "",
    airport_suttle: "",
    electronic_room_key: "",
    pets_allowed: "",
    family_rooms: "",
    soundproofed_rooms: "",
    atm_machine: "",
    money_exchange: "",
    casino: "",
    outdoor_dinning: "",
    parking_security: "",
    survelance: "",
    tea_facilities: "",
    cubicle_shower: "",
    bath_tube: "",
    flat_screen_tv: "",
    wake_up_alarm: "",
    services_charge: "",
    emergency_exit: "",
    hair_dryer: "",
    first_aid_box: "",
    mobile_police: "",
    room_panic_system: "",
    warning_alarm: "",
    swing_bar_lock: "",
    auto_door_guard: "",
    chain_door_guard: "",
    door_pechole: "",
    finger_print_lock: "",
    key_card: "",
    door_motion_sensor: "",
    smoke_detective: "",
    invividual_room_decoder: "",
    smoke_room: "",
    bathroom_amenities: "",
    twing_bed: "",
    room_parlour_suite: "",
    account_number: "",
    tax_pin_number: "",
    registration_number: "",
    landmark: "",
    gps: "",
    managers_name: "",
    managers_position: "",
    bank_name: "",
    account_name: "",
    swift_code: "",
    payment_accepted: "cash",
    payment_currency: "ngn",
    top_attraction: "",
    closest_airports: "",
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`${config.apiUrl}/users/${userId}`)
        .then(({ data }) => {
          if (data?.user.role === "partner" || data?.user.role === "admin") {
            login(data.user);
            setIsValidUser(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsValidUser(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const createHotelResponse = await axios.post(
        `${config.apiUrl}/hotels`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const hotelId = createHotelResponse.data.id;

      if (images.length > 0) {
        const formDataImages = new FormData();

        images.forEach((image, index) => {
          formDataImages.append(`images[${index}]`, image);
        });

        await axios.post(
          `${config.apiUrl}/hotels/${hotelId}/images`,
          formDataImages,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setSuccess("Hotel created successfully!");
      setFormData({
        name: "",
        partner_id: userId,
        adresse: "",
        location: "",
        reasons_to_choose: "",
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
        electricity_24hrs: "",
        front_desk_24hrs: "",
        guest: "",
        heating: "",
        bar: "",
        restaurant: "",
        lounge: "",
        terrace: "",
        garden: "",
        luggage_storage: "",
        indoor_poor: "",
        outdoor_poor: "",
        hot_tub_jacuzzi: "",
        sauna: "",
        steam_room: "",
        spa_wellness_center: "",
        hamman: "",
        fitness_center_gym: "",
        elevator_lift: "",
        cctv_cemera_security: "",
        security_guard: "",
        parking_nearby: "",
        mobile_phone_reception: "",
        none_smoking_public_area: "",
        rooms_facilities_for_disable: "",
        valet_parking: "",
        safety_deposit_boxes: "",
        in_room_safe: "",
        fireplace: "",
        meeting_banquests_facilities: "",
        breakfast: "",
        buffet_breakfast: "",
        babysitting: "",
        laundry: "",
        car_hire: "",
        room_service_24hrs: "",
        room_service_limited_hours: "",
        dry_cleaning: "",
        business_center: "",
        fax: "",
        photocopy: "",
        concierge_service: "",
        airport_suttle: "",
        electronic_room_key: "",
        pets_allowed: "",
        family_rooms: "",
        soundproofed_rooms: "",
        atm_machine: "",
        money_exchange: "",
        casino: "",
        outdoor_dinning: "",
        parking_security: "",
        survelance: "",
        tea_facilities: "",
        cubicle_shower: "",
        bath_tube: "",
        flat_screen_tv: "",
        wake_up_alarm: "",
        services_charge: "",
        emergency_exit: "",
        hair_dryer: "",
        first_aid_box: "",
        mobile_police: "",
        room_panic_system: "",
        warning_alarm: "",
        swing_bar_lock: "",
        auto_door_guard: "",
        chain_door_guard: "",
        door_pechole: "",
        finger_print_lock: "",
        key_card: "",
        door_motion_sensor: "",
        smoke_detective: "",
        invividual_room_decoder: "",
        smoke_room: "",
        bathroom_amenities: "",
        twing_bed: "",
        room_parlour_suite: "",
        account_number: "",
        tax_pin_number: "",
        registration_number: "",
        landmark: "",
        gps: "",
        managers_name: "",
        managers_position: "",
        bank_name: "",
        account_name: "",
        swift_code: "",
        payment_accepted: "cash",
        payment_currency: "ngn",
        top_attraction: "",
        closest_airports: "",
      });

      setImages([]);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setError(
          `Validation Error: ${Object.values(error.response.data.errors)
            .flat()
            .join(", ")}`
        );
        console.error("Validation Error:", error.response.data.errors);
      } else if (error.response && error.response.data.message) {
        // The server responded with an error message
        setError(`Server Error: ${error.response.data.message}`);
        console.error("Server Error:", error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
        console.error("No response from the server:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    if (["checkin_time", "checkout_time"].includes(name)) {
      const formattedTime = value + ":00";

      setFormData({
        ...formData,
        [name]: formattedTime,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const nextStep = () => {
    setStep((prevStep) => {
      return prevStep + 1;
    });
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOneForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <StepTwoForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <StepThreeForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <StepFourForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <StepFiveForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 6:
        return (
          <StepSixForm
            setImages={setImages}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 7:
        return (
          <StepSevenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 8:
        return (
          <StepEightForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 9:
        return (
          <StepNineForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 10:
        return (
          <StepTenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 11:
        return (
          <StepElevenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 12:
        return (
          <StepTwelveForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 13:
        return (
          <StepThirteenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 14:
        return (
          <StepFourteenForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            prevStep={prevStep}
            loading={loading}
            success={success}
            userId={userId}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {isValidUser ? (
        <div className="list-property p-5">
          {error && <div className="alert alert-danger">{error}</div>}

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

export default MultiStepForm;
