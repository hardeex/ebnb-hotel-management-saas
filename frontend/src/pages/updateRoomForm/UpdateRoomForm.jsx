import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./updateRoom.css";
import { useAuth } from "../../contexts/AuthContext";

export default function UpdateRoomForm() {
  const { user } = useAuth();
  const userId = user?.id;
  const { roomId } = useParams();

  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [image, setImage] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [sizeOfBeds, setSizeOfBeds] = useState("");
  const [isValidUser, setIsValidUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/hotels`);
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${config.apiUrl}/users/${userId}`)
        .then(() => setIsValidUser(true))
        .catch(() => setIsValidUser(false));
    }
  }, [userId]);

  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/get-room/${roomId}`);
        console.log(data);
        const room = data;
        setSelectedHotelId(room.hotel_id);
        setPricePerNight(room.price_per_night);
        setRoomNumber(room.room_number);
        setRoomType(room.room_type);
        setSizeOfBeds(room.size_of_beds);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    }
    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedHotelId ||
      !pricePerNight ||
      !roomNumber ||
      !roomType ||
      !sizeOfBeds
    ) {
      setError("Please fill in all required fields.");
      setIsSuccess(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("hotel_id", selectedHotelId);
      formData.append("room_number", roomNumber);
      formData.append("price_per_night", pricePerNight);
      formData.append("image", image);
      formData.append("room_type", roomType);
      formData.append("size_of_beds", sizeOfBeds);

      await axios.post(`${config.apiUrl}/rooms/${roomId}`, formData);

      setIsSuccess(true);
      setError("");
    } catch (err) {
      setIsSuccess(false);
      setError("Error updating the room. Please try again.");
      console.error("Error updating room:", err);
    }
  };

  const isFormValid = () => {
    return (
      !!selectedHotelId &&
      !!pricePerNight &&
      !!roomNumber &&
      !!roomType &&
      !!sizeOfBeds
    );
  };

  return (
    <div>
      {isValidUser ? (
        <div className="list-property p-5">
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {isSuccess && !loading && (
            <div className="alert alert-success" role="alert">
              Room updated successfully!
            </div>
          )}

          {error && !loading && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="hotel" className="floating-label">
                Select Hotel
              </label>
              <select
                className="form-control"
                name="hotel"
                value={selectedHotelId}
                onChange={(e) => setSelectedHotelId(e.target.value)}
              >
                <option value="">Select a hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price_per_night" className="floating-label">
                Price per night
              </label>
              <input
                type="number"
                className="form-control"
                name="price_per_night"
                value={pricePerNight}
                onChange={(e) => setPricePerNight(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room_number" className="floating-label">
                Room number
              </label>
              <input
                type="number"
                className="form-control"
                name="room_number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image" className="floating-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room_type" className="floating-label">
                Room Type
              </label>
              <select
                className="form-control"
                name="room_type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">Select room type</option>
                <option value="super_executive">Super Executive</option>
                <option value="executive">Executive</option>
                <option value="standard_executive">Standard Executive</option>
                <option value="room_apartment">Room Apartment</option>
                <option value="transit">Transit</option>
                <option value="transit_single">Transit Single</option>
                <option value="transit_budget">Transit Budget</option>
                <option value="transit_standard">Transit Standard</option>
                <option value="standard">Standard</option>
                <option value="executive_suite">Executive Suite</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="size_of_beds" className="floating-label">
                Size of Beds
              </label>
              <select
                className="form-control"
                name="size_of_beds"
                value={sizeOfBeds}
                onChange={(e) => setSizeOfBeds(e.target.value)}
              >
                <option value="">Select bed size</option>
                <option value="3 by 6">3 by 6</option>
                <option value="4 by 6">4 by 6</option>
                <option value="6 by 6">6 by 6</option>
              </select>
            </div>
            <button
              style={{ background: "#2a2185" }}
              disabled={!isFormValid()}
              className="btn btn-primary mb-4"
              type="submit"
            >
              Update Room
            </button>
          </form>
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
