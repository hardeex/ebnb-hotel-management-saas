import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const RoomComponent = () => {
  const [hotels, setHotels] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (hotel) => {
    const shouldDelete = window.confirm("Are you sure you want to delete it?");
    if (!shouldDelete) {
      return;
    }

    const originalHotels = [...hotels];
    try {
      const updatedHotels = originalHotels.filter((h) => h.id !== hotel.id);
      setHotels(updatedHotels);
      await axios.post(`${config.apiUrl}/delete-hotels/${hotel.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("This hotel has already been deleted.");
      }
      setHotels(originalHotels);
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/hotels-by/${user?.id}`
        );
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [user]);

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
                <td>Location</td>
                <td>Address</td>
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

                  <td>{hotel.location}</td>
                  <td>{hotel.adresse}</td>
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
