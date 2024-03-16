import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";

const DiscountForm = () => {
  const { user } = useAuth();

  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    hotel_id: "",
    user_id: user?.id,
    discount_percent: "",
    expiration_date: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.apiUrl}/apply-discount`,
        formData
      );
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    async function fetchHotels() {
      const { data } = await axios.get(`${config.apiUrl}/hotels`);
      setHotels(data);
    }
    fetchHotels();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="mb-3">
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
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="discount_percent" className="form-label">
          Discount Percent: {formData.discount_percent}%
        </label>
        <input
          type="range"
          className="form-range"
          id="discount_percent"
          name="discount_percent"
          min="0"
          max="100"
          value={formData.discount_percent}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="expiration_date" className="form-label">
          Expiration Date
        </label>
        <input
          type="date"
          className="form-control"
          id="expiration_date"
          name="expiration_date"
          value={formData.expiration_date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Apply Discount
      </button>
    </form>
  );
};

export default DiscountForm;
