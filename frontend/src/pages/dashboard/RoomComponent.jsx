import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link } from "react-router-dom";

const RoomComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (article) => {
    const shouldDelete = window.confirm("Are you sure you want to delete it?");
    if (!shouldDelete) {
      return;
    }

    const originalArticles = [];
    try {
      const updatedArticles = originalArticles.filter(
        (a) => a.id !== article.id
      );
      setRooms(updatedArticles);
      await axios.get(config.apiUrl + "/delete-articles/" + article.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("This post has already been deleted.");
      }
      setRooms(originalArticles);
    }
  };

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/all-rooms`);
        setRooms(data);
        setIsLoading(false); // Update isLoading to false after data is loaded
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching rooms:", error);
        setIsLoading(false); // Make sure to handle errors and still set isLoading to false
      }
    }
    fetchRooms();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {" "}
          <h2>Room Table</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Price</th>
                <th>Delete action</th>
                <th>Update action</th>
                <th>Hotel that room belongs to</th>
                <th>Room number</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.room?.id}>
                  <td>{room.room?.id}</td>
                  <td>₦{room.room?.price_per_night}</td>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/update-room/${room.room?.id}`}
                    >
                      <span className="status update">Update</span>
                    </Link>
                  </td>
                  <td>
                    <span
                      onClick={() => handleDelete(room)}
                      className="status delete"
                    >
                      Delete
                    </span>
                  </td>
                  <td>{room.room?.hotel?.name}</td>
                  <td>{room.room?.room_number}</td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </>
      )}
    </>
  );
};

export default RoomComponent;
