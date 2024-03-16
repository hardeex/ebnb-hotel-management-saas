import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const locationValue = queryParams.get("location");
  const propertyTypeValue = queryParams.get("propertyType");
  const hotelName = queryParams.get("hotelName");
  const budgetValue = queryParams.get("budget");

  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  useEffect(() => {
    const apiUrl = `${config.apiUrl}/list-available-rooms`;

    axios
      .get(apiUrl, {
        params: {
          location: selectedLocation || locationValue,
          propertyType: propertyTypeValue,
          budget: budgetValue,
          name: hotelName,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  }, [
    selectedLocation,
    locationValue,
    propertyTypeValue,
    hotelName,
    budgetValue,
  ]);

  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const reviewsData = await Promise.all(
          searchResults.map(async (hotel) => {
            const { data } = await axios.get(
              `${config.apiUrl}/reviews/${hotel.id}`
            );
            return { hotelId: hotel.id, reviews: data };
          })
        );

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchAllReviews();
  }, [searchResults]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults
    .filter((result) =>
      selectedAmenities.every((amenity) => result[amenity] === "Yes")
    )
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

  const renderLocationFilter = () => (
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
        value={selectedLocation}
        onChange={handleLocationChange}
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
        {/* Add more locations as needed */}
      </select>
    </div>
  );

  const renderNoResultsMessage = () => {
    return (
      <div className="alert alert-info mt-3">
        No hotels found based on the selected criteria.
      </div>
    );
  };

  return (
    <div className="container-fluid category-list">
      <h3>Category list of {locationValue}</h3>

      {renderLocationFilter()}

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
      ) : searchResults.length === 0 ? (
        renderNoResultsMessage()
      ) : (
        <div className="row">
          {currentItems.map((result, index) => (
            <div key={index} className="col-12 col-md-3">
              <Link
                to={`/hotel/${result.building_type}/${result.id}`}
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
                    src={`${config.imageUrl}/${result.image}`}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">{result.name}</h5>
                    <ul className="custom-ul">
                      <li>
                        <FontAwesomeIcon icon={faLocationDot} />{" "}
                        {result.location}
                      </li>
                      <li>{result.adresse}</li>
                      <li>
                        Reviews (
                        {reviews.find((r) => r.hotelId === result.id)?.reviews
                          .length || 0}
                        )
                      </li>
                      <li>{result.verify ? "Verified" : "Not Verified"}</li>
                      <li>Price per Night ₦{result.price_per_night}</li>
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {searchResults.length > 0 && (
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
      )}
    </div>
  );
}

export default SearchResults;
