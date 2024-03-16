import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow, addDays } from "date-fns";
import config from "../../config.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";

const BookingConfirmation = () => {
  const { user } = useAuth();
  const [bookingConfirmations, setBookingConfirmations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [apiMessage, setApiMessage] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchBookingConfirmations() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/booking-confirmations`
        );

        // Filter booking confirmations based on hotel_id
        const filteredConfirmations = data.filter((confirmation) => {
          return hotels.some((hotel) => hotel.id === confirmation.hotel_id);
        });

        setBookingConfirmations(filteredConfirmations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching booking confirmations:", error);
        setIsLoading(false);
      }
    }

    fetchBookingConfirmations();
  }, [hotels]);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/hotels-by/${user?.id}`
        );
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }

    if (user?.id) {
      fetchHotel();
    }
  }, [user]);

  const handleConfirmation = async (id) => {
    try {
      setConfirmingId(id);

      const response = await axios.post(
        `${config.apiUrl}/booking-confirmations/${id}`
      );

      setApiMessage(response.data.message);

      setBookingConfirmations((prevConfirmations) => {
        return prevConfirmations.map((confirmation) => {
          if (confirmation.id === id) {
            return { ...confirmation, is_confirmed: true };
          }
          return confirmation;
        });
      });

      setConfirmMessage(null);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error confirming booking. Please try again.");
      setConfirmMessage(null);
      setApiMessage(null);

      console.error("Error confirming booking:", error);
    } finally {
      setConfirmingId(null);
    }
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return formatDistanceToNow(date, { addSuffix: true });
    }
  };

  const rowStyles = {
    confirmed: {
      color: "green",
    },
    notConfirmed: {
      color: "red",
    },
  };

  return (
    <>
      <div
        id="bookingToastContainer"
        style={{ position: "fixed", top: "20px", right: "20px" }}
      >
        {confirmMessage && (
          <div className="alert alert-success" role="alert">
            {confirmMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {apiMessage && (
          <div className="alert alert-info" role="alert">
            {apiMessage}
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2>Booking Confirmation Table</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Is Confirmed</th>
                <th>Expires At</th>
                <th>Checkin Date</th>
                <th>Checkout Date</th>
                <th>Hotel Name</th>
                <th>Hotel Contact</th>
                <th>Confirm</th>
              </tr>
            </thead>

            <tbody>
              {bookingConfirmations.map((confirmation) => (
                <tr key={confirmation.id}>
                  <td>{confirmation.id}</td>
                  <td
                    style={
                      confirmation.is_confirmed
                        ? rowStyles.confirmed
                        : rowStyles.notConfirmed
                    }
                  >
                    {confirmation.is_confirmed ? "Yes" : "No"}
                  </td>
                  <td>{formatDate(new Date(confirmation.expires_at))}</td>
                  <td>{formatDate(new Date(confirmation.checkin_date))}</td>
                  <td>{formatDate(new Date(confirmation.checkout_date))}</td>
                  <td>{confirmation.hotel_name}</td>
                  <td>{confirmation.hotel_contact}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleConfirmation(confirmation.id)}
                      disabled={confirmingId === confirmation.id}
                    >
                      {confirmingId === confirmation.id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </>
      )}
    </>
  );
};

export default BookingConfirmation;
