import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link } from "react-router-dom";

const InspectedHotelsForm = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleInspected = async (hotel) => {
    try {
      if (hotel.isInspected) {
        await axios.delete(`${config.apiUrl}/inspected-hotels/${hotel.id}`);
      } else {
        await axios.post(`${config.apiUrl}/inspected-hotels/${hotel.id}`);
      }

      setHotels((prevHotels) =>
        prevHotels.map((h) =>
          h.id === hotel.id ? { ...h, isInspected: !h.isInspected } : h
        )
      );
    } catch (error) {
      console.error("Error toggling inspected status:", error);
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/hotels`);
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
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
          <h2>Hotel Table</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Property</th>
                <th>Price</th>
                <th>Status</th>
                <th>Verify</th>
                <th>Inspected</th>
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

                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/hotel-update/${hotel.id}`}
                    >
                      <span className="status update">Update</span>
                    </Link>
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      checked={hotel.isInspected}
                      onChange={() => handleToggleInspected(hotel)}
                    />
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

export default InspectedHotelsForm;
