import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRoomAvailability = () => {
  const { user } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    hotel_id: "",
    room_id: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateAvailability = async () => {
    try {
      const { hotel_id, room_id } = formData;

      if (!room_id) {
        alert("Please select a room before updating availability.");
        return;
      }

      await axios.post(`${config.apiUrl}/update-availability`, {
        hotel_id,
        room_id,
      });

      // Show success toast
      toast.success("Room availability updated successfully");

      console.log("Room availability updated successfully");
    } catch (error) {
      console.error("Error updating room availability:", error);
    }
  };

  useEffect(() => {
    async function fetchHotels() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/hotels`);
        setHotels(data.filter((hotel) => hotel.partner_id === user.id));
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }
    fetchHotels();
  }, [user.id]);

  useEffect(() => {
    async function fetchAvailableRooms() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/get-rooms-to-be-available/${formData.hotel_id}`
        );

        setRooms(data.result);
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    }

    if (formData.hotel_id) {
      fetchAvailableRooms();
    }
  }, [formData.hotel_id]); // Trigger when the hotel selection changes

  return (
    <div className="row">
      <div className="col-12 col-md-6">
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

      <div className="col-12 col-md-6">
        <label htmlFor="room_id" className="form-label">
          Select Room Number
        </label>
        <select
          className="form-select"
          id="room_id"
          name="room_id"
          value={formData.room_id}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Choose a room
          </option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.room_number}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <button className="btn btn-primary" onClick={handleUpdateAvailability}>
          Update Room Availability
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateRoomAvailability;
