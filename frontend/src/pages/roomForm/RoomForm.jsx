import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RoomForm() {
  const { userId } = useParams();

  const [isValidUser, setIsValidUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hotels, setHotels] = useState([]);
  const [room_number, setRoomNumber] = useState("");
  const [price_per_night, setPricePerNight] = useState("");
  const [image, setImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [room_type, setRoomType] = useState("");
  const [size_of_beds, setSizeOfBeds] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`${config.apiUrl}/users/${userId}`)
        .then((response) => {
          setIsValidUser(true);
        })
        .catch((err) => {
          console.log(err);
          setIsValidUser(false);
        });
    }
  }, [userId]);

  useEffect(() => {
    async function fetchHotel() {
      const { data } = await axios.get(`${config.apiUrl}/hotels-by/${userId}`);
      setHotels(data);
    }
    fetchHotel();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("hotel_id", selectedHotelId);
    formData.append("room_number", room_number);
    formData.append("price_per_night", price_per_night);
    formData.append("image", image);
    formData.append("size_of_beds", size_of_beds);
    formData.append("room_type", room_type);

    try {
      await axios.post(`${config.apiUrl}/rooms`, formData);
      setIsSuccess(true);
      setError("");
      setImage(null);
      setPricePerNight("");
      setRoomNumber("");
      setSelectedHotelId("");
      setRoomType("");
      setSizeOfBeds("");
    } catch (err) {
      setIsSuccess(false);
      if (err.response && err.response.data.errors) {
        // If the server provides validation errors
        setError(
          `Validation Error: ${Object.values(err.response.data.errors)
            .flat()
            .join(", ")}`
        );
      } else if (err.response && err.response.data.message) {
        // If the server provides a specific error message
        setError(`Server Error: ${err.response.data.message}`);
      } else {
        // If there's an unexpected error
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      !!selectedHotelId &&
      !!room_number &&
      !!price_per_night &&
      !!image &&
      !!size_of_beds
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
              Room created successfully!
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
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
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
                value={price_per_night}
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
                value={room_number}
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
                value={room_type}
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
                value={size_of_beds}
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
              disabled={!isFormValid() || loading}
              className="btn btn-primary mb-4"
              type="submit"
            >
              {loading ? "Creating Room..." : "Create Room"}
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
