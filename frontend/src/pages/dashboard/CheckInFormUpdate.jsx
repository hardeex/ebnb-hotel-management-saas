import { useEffect, useState } from "react";
import config from "../../config.json";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CheckInFormUpdate = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    address: "",
    hotel_id: "",
    tel_number: "",
    emergency_number: "",
    identity: "",
    id_number: "",
    number_of_people: "",
    room_id: "",
    nationality: "",
    country_of_residence: "",
    duration: "",
    price_per_night: "",
    email: "",
    name: "",
    deposit: "",
    balance: "",
    check_in_date: "",
    check_in_time: "",
    check_out: "",
    total_amount_paid: "",
    restaurant_bar_bill: "",
    travelling_from: "",
    travelling_to: "",
    additional_facilities: "",
    other_comments: "",
    ref: "",
    room_number: "",
    booking_date: "",
    payment_method: "cash",
    booking_method: "phone",
    purpose_of_visit: "holiday",
    other_purpose_of_visit: "",
    accommodation_type: "",
  });
  const [rooms, setRooms] = useState([]);

  const [message, setMessage] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCheckInRecord() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/checkinrecords/${id}`
        );
        data.booking_date = data.booking_date
          ? data.booking_date.split(" ")[0]
          : null;

        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCheckInRecord();
  }, [id]);

  useEffect(() => {
    async function fetchHotel() {
      const { data } = await axios.get(
        `${config.apiUrl}/hotels-by/${user?.id}`
      );
      setHotels(data);
    }
    fetchHotel();
  }, [user]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/rooms/${formData.hotel_id}`
        );
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    if (formData.hotel_id) {
      fetchRooms();
    }
  }, [formData.hotel_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${config.apiUrl}/check-in-records/${id}`, formData);
      setLoading(false);
      setMessage({ type: "success", text: "Form submitted successfully!" });
    } catch (error) {
      setLoading(false);
      setMessage({
        type: "danger",
        text: "Error submitting the form. Please try again later.",
      });
      console.log(error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="text-center my-4">
        <h2 className="mb-3">Terms and Conditions</h2>
        <p className="mb-4">
          2 Adults in a room maximum. Check-in from 11a.m. Checkout time is
          12p.m.
          <br />
          Payment can be made with Cash, POS, or Transfer. No smoking in the
          room or environment.
        </p>
        <h3 className="mb-4">RESERVATION FORM</h3>
      </div>

      <div className="row">
        <div className="col-12 col-md-3">
          <label htmlFor="hotel_id" className="form-label">
            Select Hotel
          </label>
          <select
            className="form-select"
            id="hotel_id"
            name="hotel_id"
            value={formData.hotel_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose a hotel
            </option>
            {hotels
              .filter((hotel) => hotel.partner_id === user.id)
              .map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="room_id" className="form-label">
            Select Room Number
          </label>
          <select
            className="form-select"
            id="room_id"
            name="room_id"
            value={formData.room_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose a room
            </option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_number}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="tel_number" className="form-label">
            Telephone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="tel_number"
            name="tel_number"
            value={formData.tel_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="emergency_number" className="form-label">
            Emergency Number
          </label>
          <input
            type="text"
            className="form-control"
            id="emergency_number"
            name="emergency_number"
            value={formData.emergency_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="identity" className="form-label">
            Identity
          </label>
          <input
            type="text"
            className="form-control"
            id="identity"
            name="identity"
            value={formData.identity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="id_number" className="form-label">
            ID Number
          </label>
          <input
            type="text"
            className="form-control"
            id="id_number"
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="number_of_people" className="form-label">
            Number of People
          </label>
          <input
            type="text"
            className="form-control"
            id="number_of_people"
            name="number_of_people"
            value={formData.number_of_people}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="nationality" className="form-label">
            Nationality
          </label>
          <input
            type="text"
            className="form-control"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </div>
        {message && (
          <div className={`alert alert-${message.type} mt-3`} role="alert">
            {message.text}
          </div>
        )}
        <div className="col-6 col-md-3">
          <label htmlFor="country_of_residence" className="form-label">
            Country of Residence
          </label>
          <input
            type="text"
            className="form-control"
            id="country_of_residence"
            name="country_of_residence"
            value={formData.country_of_residence}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="price_per_night" className="form-label">
            Price Per Night
          </label>
          <input
            type="number"
            className="form-control"
            id="price_per_night"
            name="price_per_night"
            value={formData.price_per_night}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="deposit" className="form-label">
            Deposit
          </label>
          <input
            type="text"
            className="form-control"
            id="deposit"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="balance" className="form-label">
            Balance
          </label>
          <input
            type="number"
            className="form-control"
            id="balance"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="check_in_date" className="form-label">
            Check-in Date
          </label>
          <input
            type="date"
            className="form-control"
            id="check_in_date"
            name="check_in_date"
            value={formData.check_in_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="check_in_time" className="form-label">
            Check-in Time
          </label>
          <input
            type="time"
            className="form-control"
            id="check_in_time"
            name="check_in_time"
            value={formData.check_in_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="check_out" className="form-label">
            Check-out Date and Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="check_out"
            name="check_out"
            value={formData.check_out}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="total_amount_paid" className="form-label">
            Total Amount Paid
          </label>
          <input
            type="number"
            className="form-control"
            id="total_amount_paid"
            name="total_amount_paid"
            value={formData.total_amount_paid}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="restaurant_bar_bill" className="form-label">
            Restaurant/Bar Bill
          </label>
          <input
            type="text"
            className="form-control"
            id="restaurant_bar_bill"
            name="restaurant_bar_bill"
            value={formData.restaurant_bar_bill}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="travelling_from" className="form-label">
            Travelling From
          </label>
          <input
            type="text"
            className="form-control"
            id="travelling_from"
            name="travelling_from"
            value={formData.travelling_from}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="travelling_to" className="form-label">
            Travelling To
          </label>
          <input
            type="text"
            className="form-control"
            id="travelling_to"
            name="travelling_to"
            value={formData.travelling_to}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="additional_facilities" className="form-label">
            Additional Facilities
          </label>
          <input
            type="text"
            className="form-control"
            id="additional_facilities"
            name="additional_facilities"
            value={formData.additional_facilities}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="other_comments" className="form-label">
            Other Comments
          </label>
          <textarea
            className="form-control"
            id="other_comments"
            name="other_comments"
            value={formData.other_comments}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="ref" className="form-label">
            Reference
          </label>
          <input
            type="text"
            className="form-control"
            id="ref"
            name="ref"
            value={formData.ref}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="room_number" className="form-label">
            Room Number
          </label>
          <input
            type="text"
            className="form-control"
            id="room_number"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="booking_date" className="form-label">
            Booking Date
          </label>
          <input
            type="date"
            className="form-control"
            id="booking_date"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="payment_method" className="form-label">
            Payment Method
          </label>
          <select
            className="form-select"
            id="payment_method"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
          >
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="card">Card</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="booking_method" className="form-label">
            Booking Method
          </label>
          <select
            className="form-select"
            id="booking_method"
            name="booking_method"
            value={formData.booking_method}
            onChange={handleChange}
            required
          >
            <option value="phone">Phone</option>
            <option value="internet">Internet</option>
            <option value="agent">Agent</option>
            <option value="in_person">In Person</option>
          </select>
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="purpose_of_visit" className="form-label">
            Purpose of Visit
          </label>
          <select
            className="form-select"
            id="purpose_of_visit"
            name="purpose_of_visit"
            value={formData.purpose_of_visit}
            onChange={handleChange}
            required
          >
            <option value="holiday">Holiday</option>
            <option value="business">Business</option>
            <option value="others">Others</option>
          </select>
        </div>

        {formData.purpose_of_visit === "others" && (
          <div className="col-6 col-md-3">
            <label htmlFor="other_purpose_of_visit" className="form-label">
              Specify Other Purpose
            </label>
            <input
              type="text"
              className="form-control"
              id="other_purpose_of_visit"
              name="other_purpose_of_visit"
              value={formData.other_purpose_of_visit}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="col-6 col-md-3">
          <label htmlFor="hotel_location" className="form-label">
            Hotel Location
          </label>
          <input
            type="text"
            className="form-control"
            id="hotel_location"
            name="hotel_location"
            value={formData.hotel_location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-6 col-md-3">
          <label htmlFor="branch_name" className="form-label">
            Branch Name
          </label>
          <input
            type="text"
            className="form-control"
            id="branch_name"
            name="branch_name"
            value={formData.branch_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-6 col-md-3">
          <label htmlFor="branch_name" className="form-label">
            Accommodation Type
          </label>
          <input
            type="text"
            className="form-control"
            id="accommodation_type"
            name="accommodation_type"
            value={formData.accommodation_type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex">
          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <button className="m-2 btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CheckInFormUpdate;
