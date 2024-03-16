import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link } from "react-router-dom";

const VerifiedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/verified-hotels`);
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching not-verified:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2>Verified Hotel Table</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Property</th>
                <th>Price</th>
                <th>Status</th>
                <td>Location</td>
                <td>Address</td>
                <td>Details</td>
              </tr>
            </thead>

            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.building_type}</td>
                  <td>₦{hotel.price_per_night}</td>
                  <td>
                    <span
                      className={`status ${
                        hotel.verify ? "published" : "isPublish"
                      }`}
                    >
                      {hotel.verify ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td>{hotel.location}</td>
                  <td>{hotel.adresse}</td>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/hotel-details/${hotel.id}`}
                    >
                      <span className="status ">More</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default VerifiedHotels;
