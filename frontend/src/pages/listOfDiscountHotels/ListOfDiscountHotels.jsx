import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCocktail,
  faSwimmingPool,
  faUtensils,
  faWifi,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import config from "../../config.json";

export default function ListOfDiscountHotels() {
  const { location: urlLocation } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedState, setSelectedState] = useState(urlLocation || "");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/discounted-hotels-by-location/${selectedState}`
        );

        setHotels(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [urlLocation, selectedState]);

  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const reviewsData = await Promise.all(
          hotels.map(async (hotel) => {
            const { data } = await axios.get(
              `${config.apiUrl}/reviews/${hotel.hotel.id}`
            );
            return { hotelId: hotel.hotel.id, reviews: data };
          })
        );

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchAllReviews();
  }, [hotels]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotels
    .filter((hotel) => {
      const amenitiesFilter =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => hotel.hotel[amenity] === "Yes");

      const locationFilter =
        selectedState === "" ||
        hotel.hotel.location.toLowerCase() === selectedState.toLowerCase();

      return amenitiesFilter && locationFilter;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const amenitiesList = [
    { key: "bar_lounge", label: "Bar and Lounge", icon: faCocktail },
    { key: "swimming_pool", label: "Swimming Pool", icon: faSwimmingPool },
    { key: "restaurants", label: "Restaurants", icon: faUtensils },
    { key: "internet", label: "Internet", icon: faWifi },
    { key: "gym", label: "Gym", icon: faDumbbell },
  ];

  const handleAmenityChange = (key) => {
    if (selectedAmenities.includes(key)) {
      setSelectedAmenities((prevSelected) =>
        prevSelected.filter((item) => item !== key)
      );
    } else {
      setSelectedAmenities((prevSelected) => [...prevSelected, key]);
    }
  };

  const renderStatesDropdown = () => (
    <div className="states-dropdown">
      <label
        htmlFor="location"
        style={{
          marginRight: "10px",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        Select Location:
      </label>
      <select
        id="location"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        style={{
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "5px",
          width: 200,
        }}
      >
        <option value="">All Locations</option>
        <option value="Lagos">Lagos</option>
        <option value="Abuja">Abuja</option>
        <option value="Kano">Kano</option>
      </select>
    </div>
  );

  const renderAmenities = () => {
    return amenitiesList.map((amenity, index) => (
      <li key={index}>
        <input
          type="checkbox"
          id={amenity.key}
          checked={selectedAmenities.includes(amenity.key)}
          onChange={() => handleAmenityChange(amenity.key)}
        />
        <label htmlFor={amenity.key}>
          <FontAwesomeIcon icon={amenity.icon} /> {amenity.label}
        </label>
      </li>
    ));
  };

  return (
    <div style={{ marginTop: 150 }} className="container-fluid category-list">
      {renderStatesDropdown()}
      <h3>
        Select & book from {hotels.length}{" "}
        {hotels[0]?.hotel.building_type || "Hotels"}
      </h3>
      <div className="amenities">
        <div className="row">
          <div className="col-12">
            <h3>Filter by amenities</h3>
            <ul className="horizontal-list">{renderAmenities()}</ul>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : currentItems.length === 0 ? (
        <div className="alert alert-info mt-3">
          No hotels found in the selected location and amenities.
        </div>
      ) : (
        <div className="row">
          {currentItems.map((hotel, index) => (
            <div key={index} className="category-col col-12 col-sm-6 col-md-3">
              <Link
                to={`/discount/hotel/${hotel.hotel.id}/${hotel.discount_id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card mb-5"
                  style={{
                    width: "18rem",
                    height: "25rem",
                    border: "none",
                    boxShadow: "0px 0px 6px 1px rgba(6, 6, 9, 0.1)",
                  }}
                >
                  <img
                    style={{ height: "70%" }}
                    src={`${config.imageUrl}/${hotel.image}`}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">{hotel.hotel.name}</h5>
                    <ul className="custom-ul">
                      <li>
                        <FontAwesomeIcon icon={faLocationDot} />{" "}
                        {hotel.hotel.location}
                      </li>
                      <li>{hotel.hotel.adresse}</li>
                      <li>Reviews ({reviews.length})</li>
                      <li>Verified</li>
                      <li>Price per Night ₦{hotel.hotel.price_per_night}</li>
                      <li>Discount ₦{hotel.discount_percent}</li>
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <nav>
        <ul className="pagination">
          {Array.from({
            length: Math.ceil(currentItems.length / itemsPerPage),
          }).map((item, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <span className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
