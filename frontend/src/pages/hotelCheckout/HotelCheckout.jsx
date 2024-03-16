import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const HotelCheckout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomPrice = searchParams.get("roomPrice");
  const bookingId = searchParams.get("bookingId");
  const [loading, setLoading] = useState(false);

  const handlePayNow = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("payment_amount", roomPrice);
    formData.append("payment_method", "paystack");
    formData.append("payment_reference", "PAY_" + Date.now());
    formData.append("payment_option", "pay now");
    formData.append("guest_email", user?.email);

    try {
      const { data } = await axios.post(
        `${config.apiUrl}/payments/${bookingId}`,
        formData
      );
      window.location.href = data.data.authorization_url;
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayAtProperty = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(`${config.apiUrl}/payments/${bookingId}`, {
        guest_email: user?.email,
        payment_amount: roomPrice,
        payment_method: "cash",
        payment_option: "pay at property",
        payment_reference: "",
      });

      navigate("/success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ marginTop: "200px" }}
      className="d-flex flex-column align-items-center"
    >
      <p className="mb-4">Choose your payment method:</p>
      <div className="d-flex justify-content-between">
        <form onSubmit={handlePayAtProperty}>
          <button className="btn btn-success" type="submit" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Pay at Hotel"
            )}
          </button>
        </form>
        <button
          className="btn btn-success ms-3"
          onClick={handlePayNow}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default HotelCheckout;
