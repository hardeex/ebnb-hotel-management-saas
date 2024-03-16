import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingForm.css";

function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    budget: "1000-2000",
    propertyType: "Hotel",
    location: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      location: formData.location,
      propertyType: formData.propertyType,
      budget: formData.budget,
      hotelName: formData.name,
    });

    navigate(`/search-results?${queryParams.toString()}`);
  };

  const handleCheck = (propertyType) => {
    setFormData({ ...formData, propertyType });
  };

  return (
    <div className="booking-form">
      <div>
        <img
          className="img-fluid"
          src="../images/marina-byblos-hotel-room-1_egpqlh_c_scale,w_2000.jpg"
          alt=""
        />
      </div>

      <p>Welcome to EBNB HOME</p>
      <div className="booking-search-form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6 col-md-2">
              <label htmlFor="search-input">Location</label>
              <br />
              <input
                id="search-input"
                className="custom-input pe-1"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Enter location"
              />
            </div>
            <div className="col-6 col-md-2">
              <label htmlFor="name">Hotel Name</label>
              <br />
              <input
                id="name"
                className="custom-input pe-1"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter hotel name"
              />
            </div>

            <div className="col-6 col-md-2">
              <label style={{ width: 150 }} htmlFor="">
                Hotel/Apartment
              </label>
              <br />
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {formData.propertyType}
                </button>
                <ul className="dropdown-menu">
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Hotel")}
                  >
                    Hotel
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Shortlet apartment")}
                  >
                    Shortlet apartment
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Top notch hotels")}
                  >
                    Top notch hotels
                  </li>

                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Last minute weekend deals")}
                  >
                    Last minute weekend deals
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Recent listing")}
                  >
                    Recent listing
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Budget hotel")}
                  >
                    Budget hotel
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Short stay")}
                  >
                    Short stay
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCheck("Event venue")}
                  >
                    Event venue
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleCheck("Last minute daily/midnight deals")
                    }
                  >
                    Last minute daily/midnight deals
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleCheck("Travelers airport transit deals")
                    }
                  >
                    Travelers airport transit deals
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-6 col-md-2">
              <label style={{ width: 130 }} htmlFor="budget">
                Budget per Night
              </label>
              <br />
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="1000-2000">₦5,000 - ₦20,000</option>
                <option value="2000-3000">₦20,000 - ₦40,000</option>
                <option value="40000-60000">₦40,000 - ₦60,000</option>
                <option value="60000-80000">₦60,000 - ₦80,000</option>
                <option value="80000">₦80,000 & Above</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <button
                type="submit"
                className="btn btn-primary custom-button mt-4"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

BookingForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default BookingForm;
