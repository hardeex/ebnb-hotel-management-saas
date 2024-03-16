import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const RoomComponent = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (room) => {
    const shouldDelete = window.confirm("Are you sure you want to delete it?");
    if (!shouldDelete || !room.room) {
      return;
    }

    const originalRooms = [...rooms];
    const roomId = room.room.id;

    try {
      const updatedRooms = originalRooms.filter((r) => r.room.id !== roomId);
      setRooms(updatedRooms);
      await axios.post(`${config.apiUrl}/delete-room/${roomId}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("This room has already been deleted.");
      }
      setRooms(originalRooms);
    }
  };

  useEffect(() => {
    async function fetchHotel() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/hotels-by/${user?.id}`
        );
        setHotels(data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching hotels:", error);
      }
    }

    fetchHotel();
  }, [user]);

  useEffect(() => {
    async function fetchRooms() {
      const allRooms = [];

      for (const hotel of hotels) {
        try {
          const { data } = await axios.get(
            `${config.apiUrl}/rooms-by-hotel/${hotel.id}`
          );
          allRooms.push(...data);
        } catch (error) {
          console.error(`Error fetching rooms for hotel ${hotel.id}:`, error);
        }
      }

      setRooms(allRooms);
      setIsLoading(false);
    }

    if (hotels.length > 0) {
      fetchRooms();
    }
  }, [hotels]);

  return (
    <>
      <h2>Room Table</h2>

      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Price</th>
              <th>Update action</th>
              <th>Delete action</th>
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
        </table>
      )}
    </>
  );
};

export default RoomComponent;
