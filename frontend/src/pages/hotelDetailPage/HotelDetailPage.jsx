import { RoomProvider } from "../../contexts/RoomContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import QuestionAndAnswer from "../../components/questionAndAnswer/QuestionAndAnswer";
import Reviews from "../../components/reviews/Reviews";
import HotelImageGallery from "../../components/hotelImageGallery/HotelImageGallery";
import ReasonToChooseHotel from "../../components/reasonToChooseHotel/ReasonToChooseHotel";
import ModalComponent from "../../components/modalComponent/ModalComponent";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";
import { useRoom } from "../../contexts/RoomContext";
import "./hotelDetailPage.css";
import MapComponent from "../../components/mapComponent/MapComponent";

export default function HotelDetailPage() {
  return (
    <RoomProvider>
      <HotelDetailContent />
    </RoomProvider>
  );
}

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-prev" onClick={onClick}>
      <div className="arrow-icon left">
        <FontAwesomeIcon icon={icons.faArrowLeft} />
      </div>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-next" onClick={onClick}>
      <div className="arrow-icon right">
        <FontAwesomeIcon icon={icons.faArrowRight} />
      </div>
    </div>
  );
};

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  autoplay: false,
  autoplaySpeed: 2000,
  vertical: true,
  verticalSwiping: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

function HotelDetailContent() {
  const isDiscountHotelPage = location.pathname.includes("discount/hotel");
  const { id, discountId } = useParams();
  const { user } = useAuth();
  const { state, dispatch } = useRoom();

  const [show, setShow] = useState(false);
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoomPrice, setSelecteRoomPrice] = useState(null);
  const [percent, setPercent] = useState(null);
  const [displayedIcons, setDisplayedIcons] = useState(10);
  const [Loading, setLoading] = useState(true);
  const [totalRooms, setTotalRooms] = useState(0);

  const amenitiesList = [
    {
      key: "front_desk_24hrs",
      label: "24hr Front Desk",
      icon: icons.faReception,
    },
    {
      key: "electricity_24hrs",
      label: "24hr Electricity",
      icon: icons.faPowerOff,
    },
    { key: "aircondition", label: "Air Condition", icon: icons.faWind },
    { key: "internet", label: "Internet", icon: icons.faWifi },
    { key: "bar", label: "Bar", icon: icons.faGlassMartiniAlt },
    { key: "restaurant", label: "Restaurant", icon: icons.faUtensil },
    { key: "garden", label: "Garden", icon: icons.faLeaf },
    { key: "outdoor_poor", label: "Outdoor Pool", icon: icons.faSwimmingPool },
    {
      key: "fitness_center_gym",
      label: "Fitness Center/Gym",
      icon: icons.faDumbbell,
    },
    { key: "elevator_lift", label: "Elevator/Lift", icon: icons.faArrowsAltV },
    { key: "money_exchange", label: "Money Exchange", icon: icons.faMoneyBill },
    {
      key: "airport_suttle",
      label: "Airport Shuttle",
      icon: icons.faPlaneDeparture,
    },
    {
      key: "business_center",
      label: "Business Center",
      icon: icons.faBriefcase,
    },
    {
      key: "room_service_limited_hours",
      label: "Room Service Limited Hours",
      icon: icons.faBell,
    },
    {
      key: "room_service_24hrs",
      label: "Room Service 24hrs",
      icon: icons.faBell,
    },
    {
      key: "buffet_breakfast",
      label: "Buffet Breakfast",
      icon: icons.faCoffee,
    },
    { key: "breakfast", label: "Breakfast", icon: icons.faCoffee },
    {
      key: "meeting_banquests_facilities",
      label: "Meeting/Banquets Facilities",
      icon: icons.faUsers,
    },
    { key: "surveillance", label: "Surveillance", icon: icons.faVideo },
    { key: "flat_screen_tv", label: "Flat Screen TV", icon: icons.faTv },
    { key: "emergency_exit", label: "Emergency Exit", icon: icons.faDoorOpen },
    { key: "first_aid_box", label: "First Aid Box", icon: icons.faFirstAid },
    { key: "kitchen", label: "Kitchen", icon: icons.faUtensils },
    { key: "living_room", label: "Living Room", icon: icons.faTv },
    { key: "bedroom", label: "Bedroom", icon: icons.faBed },
    { key: "bathroom", label: "Bathroom", icon: icons.faBath },
    { key: "food_and_drink", label: "Food and Drink", icon: icons.faUtensils },
    {
      key: "safety_and_security",
      label: "Safety and Security",
      icon: icons.faShieldAlt,
    },
    { key: "outdoors", label: "Outdoors", icon: icons.faTree },
    { key: "general", label: "General", icon: icons.faInfoCircle },
    { key: "parking", label: "Parking", icon: icons.faParking },
    { key: "transportation", label: "Transportation", icon: icons.faBus },
    { key: "room_amenities", label: "Room Amenities", icon: icons.faBed },
    { key: "front_desk", label: "Front Desk", icon: icons.faHotel },
    { key: "living_area", label: "Living Area", icon: icons.faWheelchair },
    {
      key: "media_and_technology",
      label: "Media and Technology",
      icon: icons.faTv,
    },
    {
      key: "cleaning_services",
      label: "Cleaning Services",
      icon: icons.faSyringe,
    },
    {
      key: "health_and_wellness_facilities",
      label: "Health and Wellness Facilities",
      icon: icons.faHeartbeat,
    },
    {
      key: "business_facilities",
      label: "Business Facilities",
      icon: icons.faBriefcase,
    },
    { key: "bedroom", label: "Bedroom", icon: icons.faBed },
    { key: "living_room", label: "Living Room", icon: icons.faTv },
    { key: "kitchen", label: "Kitchen", icon: icons.faUtensils },
    { key: "bathroom", label: "Bathroom", icon: icons.faBath },
    { key: "food_and_drink", label: "Food and Drink", icon: icons.faUtensils },
    {
      key: "safety_and_security",
      label: "Safety and Security",
      icon: icons.faShieldAlt,
    },
    { key: "outdoors", label: "Outdoors", icon: icons.faTree },
    { key: "general", label: "General", icon: icons.faInfoCircle },
    { key: "parking", label: "Parking", icon: icons.faParking },
    { key: "transportation", label: "Transportation", icon: icons.faBus },
    { key: "room_amenities", label: "Room Amenities", icon: icons.faBed },
    { key: "front_desk", label: "Front Desk", icon: icons.faHotel },
    { key: "living_area", label: "Living Area", icon: icons.faWheelchair },
    {
      key: "media_and_technology",
      label: "Media and Technology",
      icon: icons.faTv,
    },
    {
      key: "cleaning_services",
      label: "Cleaning Services",
      icon: icons.faSyringe,
    },
    {
      key: "health_and_wellness_facilities",
      label: "Health and Wellness Facilities",
      icon: icons.faHeartbeat,
    },
    {
      key: "business_facilities",
      label: "Business Facilities",
      icon: icons.faBriefcase,
    },
    { key: "living_area", label: "Living Area", icon: icons.faWheelchair },
    {
      key: "media_and_technology",
      label: "Media and Technology",
      icon: icons.faTv,
    },
    {
      key: "cleaning_services",
      label: "Cleaning Services",
      icon: icons.faSyringe,
    },
    {
      key: "health_and_wellness_facilities",
      label: "Health and Wellness Facilities",
      icon: icons.faHeartbeat,
    },
    {
      key: "business_facilities",
      label: "Business Facilities",
      icon: icons.faBriefcase,
    },
    { key: "guest", label: "Guest Services", icon: icons.faUser },
    { key: "heating", label: "Heating", icon: icons.faFire },
    { key: "lounge", label: "Lounge", icon: icons.faCouch },
    { key: "terrace", label: "Terrace", icon: icons.faGlobe },
    {
      key: "luggage_storage",
      label: "Luggage Storage",
      icon: icons.faSuitcase,
    },
    { key: "indoor_poor", label: "Indoor Pool", icon: icons.faSwimmingPool },
    { key: "hot_tub_jacuzzi", label: "Hot Tub/Jacuzzi", icon: icons.faHotTub },
    { key: "sauna", label: "Sauna", icon: icons.faHotTub },
    { key: "steam_room", label: "Steam Room", icon: icons.faHotTub },
    {
      key: "spa_welness_center",
      label: "Spa/Wellness Center",
      icon: icons.faHotTub,
    },
    { key: "hamman", label: "Hamman", icon: icons.faHotTub },
    {
      key: "cctv_cemera_security",
      label: "CCTV/Camera Security",
      icon: icons.faVideo,
    },
    { key: "security_guard", label: "Security Guard", icon: icons.faSecurity },
    { key: "parking_nearby", label: "Parking Nearby", icon: icons.faParking },
    {
      key: "mobile_phone_reception",
      label: "Mobile Phone Reception",
      icon: icons.faMobileAlt,
    },
    {
      key: "none_smoking_public_area",
      label: "Non-Smoking Public Area",
      icon: icons.faSmokingBan,
    },
    {
      key: "rooms_facilities_for_disable",
      label: "Rooms Facilities for Disable",
      icon: icons.faAccessibleIcon,
    },
    { key: "valet_parking", label: "Valet Parking", icon: icons.faCar },
    {
      key: "safety_deposit_boxes",
      label: "Safety Deposit Boxes",
      icon: icons.faLock,
    },
    { key: "in_room_safe", label: "In-Room Safe", icon: icons.faSafe },
    { key: "fireplace", label: "Fireplace", icon: icons.faFire },
    { key: "babysitting", label: "Babysitting", icon: icons.faBaby },
    { key: "laundry", label: "Laundry", icon: icons.faTshirt },
    { key: "car_hire", label: "Car Hire", icon: icons.faCar },
    { key: "fax", label: "Fax", icon: icons.faFax },
    { key: "photocopy", label: "Photocopy", icon: icons.faCopy },
    {
      key: "concierge_service",
      label: "Concierge Service",
      icon: icons.faHandHolding,
    },
    {
      key: "electronic_room_key",
      label: "Electronic Room Key",
      icon: icons.faKey,
    },
    { key: "pets_allowed", label: "Pets Allowed", icon: icons.faDog },
    { key: "family_rooms", label: "Family Rooms", icon: icons.faUsers },
    {
      key: "soundproofed_rooms",
      label: "Soundproofed Rooms",
      icon: icons.faVolumeMute,
    },
    { key: "atm_machine", label: "ATM Machine", icon: icons.faMoneyBill },
    { key: "money_exchange", label: "Money Exchange", icon: icons.faMoneyBill },
    { key: "casino", label: "Casino", icon: "faDice" },
    { key: "outdoor_dinning", label: "Outdoor Dining", icon: icons.faUtensils },
    {
      key: "parking_security",
      label: "Parking Security",
      icon: icons.faSecurity,
    },
    { key: "surveillance", label: "Surveillance", icon: icons.faVideo },
    { key: "tea_facilities", label: "Tea Facilities", icon: icons.faMugHot },
    { key: "cubicle_shower", label: "Cubicle Shower", icon: icons.faShower },
    { key: "bath_tube", label: "Bath Tub", icon: icons.faBath },
    { key: "flat_screen_tv", label: "Flat Screen TV", icon: icons.faTv },
    { key: "wake_up_alarm", label: "Wake Up Alarm", icon: icons.faBell },
    {
      key: "services_charge",
      label: "Services Charge",
      icon: icons.faMoneyBill,
    },
    { key: "emergency_exit", label: "Emergency Exit", icon: icons.faDoorOpen },
    { key: "hair_dryer", label: "Hair Dryer", icon: icons.faBlowDryer },
    { key: "first_aid_box", label: "First Aid Box", icon: icons.faFirstAid },
    { key: "mobile_police", label: "Mobile Police", icon: icons.faPolice },
    {
      key: "room_panic_system",
      label: "Room Panic System",
      icon: icons.faExclamationTriangle,
    },
    {
      key: "warning_alarm",
      label: "Warning Alarm",
      icon: icons.faExclamationTriangle,
    },
    { key: "swing_bar_lock", label: "Swing Bar Lock", icon: icons.faLock },
    { key: "auto_door_guard", label: "Auto Door Guard", icon: icons.faLock },
    { key: "chain_door_guard", label: "Chain Door Guard", icon: icons.faLock },
    { key: "door_pechole", label: "Door Peephole", icon: icons.faEye },
    {
      key: "finger_print_lock",
      label: "Fingerprint Lock",
      icon: icons.faFingerprint,
    },
    { key: "key_card", label: "Key Card", icon: icons.faKey },
    {
      key: "door_motion_sensor",
      label: "Door Motion Sensor",
      icon: icons.faRunning,
    },
    { key: "smoke_detective", label: "Smoke Detector", icon: icons.faBell },
    {
      key: "individual_room_decoder",
      label: "Individual Room Decoder",
      icon: icons.faDesktop,
    },
    { key: "smoke_room", label: "Smoke Room", icon: icons.faSmoking },
    {
      key: "bathroom_amenities",
      label: "Bathroom Amenities",
      icon: icons.faSoap,
    },
    { key: "twin_bed", label: "Twin Bed", icon: icons.faBed },
    {
      key: "room_parlour_suite",
      label: "Room Parlour Suite",
      icon: icons.faBed,
    },
  ];

  const removeDuplicates = (arr) => {
    const seenKeys = new Set();
    return arr.filter((amenity) => {
      if (seenKeys.has(amenity.key)) {
        return false;
      }
      seenKeys.add(amenity.key);
      return true;
    });
  };

  const renderAmenities = () => {
    const uniqueAmenitiesList = removeDuplicates(amenitiesList);
    const displayedAmenities = uniqueAmenitiesList.slice(0, displayedIcons);

    return displayedAmenities.map((amenity, index) => (
      <li key={index}>
        <FontAwesomeIcon icon={amenity.icon} /> {amenity.label}{" "}
        {hotel[amenity.key]?.toLowerCase() === "yes" ? (
          <FontAwesomeIcon color="green" icon={icons.faCheck} />
        ) : (
          <FontAwesomeIcon color="red" icon={icons.faTimes} />
        )}
      </li>
    ));
  };

  const handleShow = (roomId, roomPrice) => {
    setShow(true);
    setSelectedRoomId(roomId);
    setSelecteRoomPrice(roomPrice);
  };

  const formatTime = (time) => {
    const parsedTime = new Date(`2021-01-01T${time}`);
    return parsedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    async function fetchHoteldeal() {
      const { data } = await axios.get(
        `${config.apiUrl}/discounts/${discountId}`
      );
      setPercent(data.discount_percent);
    }
    if (isDiscountHotelPage) fetchHoteldeal();
  }, [discountId, isDiscountHotelPage]);

  useEffect(() => {
    async function fetchHotel() {
      const { data } = await axios.get(`${config.apiUrl}/hotels/${id}`);
      setHotel(data);
    }
    fetchHotel();
  }, [id]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/rooms/${hotel.id}`);
        setRooms(data);
        setLoading(false);
        setTotalRooms(data.length);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    if (hotel.id) {
      fetchRooms();
    }
  }, [hotel.id]);

  const handleSeeMore = () => {
    setDisplayedIcons(amenitiesList.length);
  };

  const handleSeeLess = () => {
    setDisplayedIcons(10);
  };

  return (
    <>
      <div className="container mb-5 hotel-detail-page">
        <div className="row ">
          <HotelImageGallery hotel={hotel} />
          <div className="col-12 col-md-5 my- text-center">
            <div style={{ fontSize: 17, fontWeight: "bold" }}>
              Choose your room
              <p style={{ fontSize: 17 }}>
                Terms and Conditions about {hotel.name} <br />{" "}
                <FontAwesomeIcon icon={icons.faMapMarkerAlt} /> {hotel.adresse},{" "}
                {hotel.location}
              </p>
              {Loading ? null : (
                <>
                  {totalRooms > 0 ? (
                    <>
                      <h3>Available Rooms: {totalRooms}</h3>
                      <div className="d-flex justify-content-between">
                        <p>
                          Check-in Time
                          <br />
                          {formatTime(hotel.checkin_time)}
                        </p>
                        <p>
                          Check-out Time
                          <br />
                          {formatTime(hotel.checkout_time)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <h4>
                      No available rooms at the moment. Please check back later.
                    </h4>
                  )}
                </>
              )}
            </div>

            {Loading ? (
              <div className="loading-indicator">Loading...</div>
            ) : (
              <Slider {...settings}>
                {rooms.map((room, index) => (
                  <div
                    key={index}
                    className="room-list d-flex align-items-center"
                  >
                    <img
                      style={{ maxHeight: 100 }}
                      className="room-image"
                      src={`${config.roomImageUrl}/${room.image}`}
                      alt={`Room ${index + 1}`}
                    />
                    <div>
                      {room.price_per_night ? (
                        <>
                          <span>Total Price ₦{room.price_per_night}</span>

                          <button
                            style={{ background: "#2a2185" }}
                            className="ms-2 btn btn-primary"
                            onClick={() =>
                              dispatch({
                                type: "SELECT_ROOM",
                                payload: {
                                  roomId: room.id,
                                  roomPrice: room.price_per_night,
                                  roomCounter: 1,
                                },
                              })
                            }
                          >
                            Select Room
                          </button>
                          {state.selectedRoomId === room.id && (
                            <div className="counter">
                              {isDiscountHotelPage ? (
                                <span>
                                  Discounted Price ₦
                                  {calculateDiscountedPrice(
                                    state.selectedRoomPrice,
                                    percent
                                  )}
                                </span>
                              ) : (
                                <p>Total price ₦{state.selectedRoomPrice}</p>
                              )}
                              <button
                                className="counter-btn"
                                disabled={state.roomCounter === 0}
                                onClick={() =>
                                  dispatch({
                                    type: "DECREMENT_COUNTER",
                                  })
                                }
                              >
                                <FontAwesomeIcon icon={icons.faMinus} />
                              </button>
                              <span className="counter-value m-1">
                                Click to select how many rooms{" "}
                                {state.roomCounter}
                              </span>
                              <button
                                disabled={
                                  state.roomCounter === hotel.number_of_rooms
                                }
                                className="counter-btn"
                                onClick={() =>
                                  dispatch({
                                    type: "INCREMENT_COUNTER",
                                  })
                                }
                              >
                                <FontAwesomeIcon icon={icons.faPlus} />
                              </button>
                              {state.roomCounter > 0 && (
                                <button
                                  className="ms-2 btn btn-success"
                                  onClick={() =>
                                    handleShow(room.id, state.selectedRoomPrice)
                                  }
                                >
                                  Book
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center">
                          <p>Loading price...</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            )}

            <div className="mt-3">
              <button
                style={{ background: "#2a2185" }}
                className="ms-2 btn btn-primary"
              >
                Hotel Type
              </button>
              <p>{hotel.building_type}</p>

              <button
                style={{ background: "#2a2185" }}
                className="ms-2 btn btn-primary"
              >
                Number of Rooms
              </button>
              <p>{hotel.number_of_rooms}</p>

              <button
                style={{ background: "#2a2185" }}
                className="ms-2 btn btn-primary"
              >
                Nearby
              </button>
              <p>{hotel.nearby}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h3>Facilities at {hotel?.name}</h3>
            <ul className="horizontal-list">{renderAmenities()}</ul>
            {displayedIcons < amenitiesList.length && (
              <button
                style={{ background: "#2a2185" }}
                className="btn btn-primary mb-2"
                onClick={handleSeeMore}
              >
                See More
              </button>
            )}
            {displayedIcons === amenitiesList.length && (
              <button
                style={{ background: "#2a2185" }}
                className="btn btn-primary mb-2"
                onClick={handleSeeLess}
              >
                See Less
              </button>
            )}
          </div>
        </div>

        <div className="row">
          <QuestionAndAnswer hotel={hotel} />
          <Reviews hotel={hotel} />
          <MapComponent hotel={hotel} />
          <ReasonToChooseHotel hotel={hotel} />
        </div>
        <ModalComponent
          show={show}
          setShow={setShow}
          user={user}
          hotel={hotel}
          roomId={selectedRoomId}
          roomPrice={selectedRoomPrice}
        />
      </div>
    </>
  );
}

const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  const discountAmount = (originalPrice * discountPercent) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice.toFixed(2);
};
