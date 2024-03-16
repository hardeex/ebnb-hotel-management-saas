import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link } from "react-router-dom";

const RoomComponent = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleVerifyStatus = async (hotel) => {
    const newStatus = !hotel.verify;

    setHotels((prevHotels) =>
      prevHotels.map((h) =>
        h.id === hotel.id ? { ...h, verify: newStatus } : h
      )
    );

    try {
      const response = await axios.post(
        `${config.apiUrl}/update-verify-status/${hotel.id}`,
        {
          verify: newStatus,
        }
      );

      setHotels((prevHotels) =>
        prevHotels.map((h) => (h.id === hotel.id ? response.data : h))
      );
    } catch (error) {
      console.error("Error updating hotel verify status:", error);
    }
  };

  const handleDelete = async (hotel) => {
    const shouldDelete = window.confirm("Are you sure you want to delete it?");
    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`${config.apiUrl}/hotels/${hotel.id}`);
      setHotels((prevHotels) => prevHotels.filter((h) => h.id !== hotel.id));
    } catch (error) {
      console.error("Error deleting hotel:", error);
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
                <th>Delete</th>
                <th>Update</th>
                <th>Verify</th>
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
                    <span
                      onClick={() => handleDelete(hotel)}
                      className="status delete"
                    >
                      Delete
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
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={hotel.verify}
                        onChange={() => toggleVerifyStatus(hotel)}
                      />
                      <span className="slider round"></span>
                    </label>
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

export default RoomComponent;
