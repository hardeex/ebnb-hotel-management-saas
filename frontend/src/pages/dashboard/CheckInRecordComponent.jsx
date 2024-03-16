import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";

const CheckInRecordComponent = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [bookingRecords, setBookingRecords] = useState(null);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/check-in/record?search_term=${searchTerm}&hotel_id=${hotelId}`
      );
      setBookingRecords(response.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching data:", error.message);

      if (error.response && error.response.status === 404) {
        setMessage("No users found for the specified hotel.");
      }
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setHotelId("");
    setBookingRecords(null);
    setMessage("");
  };

  useEffect(() => {
    async function fetchHotel() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/hotels-by/${user?.id}`
        );
        setHotels(data);
        setLoadingHotels(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoadingHotels(false);
      }
    }

    fetchHotel();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Check-In Record </h2>
      <div className="mb-4">
        <label className="form-label">
          Hotel:
          {loadingHotels ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <select
              className="form-select"
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
            >
              <option value="">Select a Hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          )}
        </label>
        <label className="form-label">
          Search Term:
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <button className="btn btn-primary mx-3" onClick={handleSearch}>
          Search
        </button>
        {bookingRecords && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>
      {message && <p className="text-danger">{message}</p>}
      {bookingRecords && bookingRecords.data.length > 0 && (
        <div>
          <h3 className="mb-3">Booking Records</h3>
          <ul className="list-group">
            {bookingRecords.data.map((record) => (
              <li key={record.id} className="list-group-item">
                <p>ID: {record.id}</p>
                <p>Hotel Name: {record.hotel_name}</p>
                <p>Room Number: {record.room_number}</p>
                <p>Check-In Date: {record.check_in_date}</p>
                <p>Check-Out Date: {record.check_out}</p>
                {record.selfie && (
                  <div>
                    <p>Selfie:</p>
                    <img
                      src={`${config.selfiesImages}/${record.selfie}`}
                      alt="Selfie"
                      className="img-fluid"
                    />
                  </div>
                )}
                <p>Total Amount Paid: ${record.total_amount_paid}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Total Amount spent: ${bookingRecords.total_amount_paid}
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckInRecordComponent;
