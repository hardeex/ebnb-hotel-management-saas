import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchBookings() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/bookings`);
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!userConfirmed) {
      return;
    }

    try {
      await axios.put(`${config.apiUrl}/bookings/${bookingId}/cancel`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      showToast("Booking canceled successfully", "bg-success");
    } catch (error) {
      console.error("Error canceling booking:", error);
      showToast("Booking cannot be canceled at this time.", "bg-danger");
    }
  };

  const showToast = (message, className) => {
    const toastContainer = document.getElementById("bookingToastContainer");
    const toast = document.createElement("div");
    toast.classList.add("toast", "show", className);
    toast.innerHTML = `<div class="toast-body">${message}</div>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return (
    <>
      <div
        id="bookingToastContainer"
        style={{ position: "fixed", top: "20px", right: "20px" }}
      ></div>
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2>Booking Table</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest name</th>
                <th>Guest phone</th>
                <th>Status</th>
                <th>Guest email</th>
                <th>Checkin date</th>
                <th>Checkout date</th>
                <th>Payment amount</th>
                <th>Payment status</th>
                <th>Payment method</th>
                <th>Cancel</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.guest_name}</td>
                  <td>{booking.guest_phone}</td>
                  <td>{booking.status}</td>
                  <td>{booking.guest_email}</td>
                  <td>{booking.checkin_date}</td>
                  <td>{booking.checkout_date}</td>
                  <td>₦{booking.payment_amount}</td>
                  <td>{booking.payment_status}</td>
                  <td>{booking.payment_method}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
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

export default BookingComponent;
