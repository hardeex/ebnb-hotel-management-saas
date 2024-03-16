import { useEffect, useState } from "react";
import config from "../../config.json";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CheckInDetailsComponent = () => {
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState({});
  const [checkoutMessage, setCheckoutMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCheckInRecord() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/checkinrecords/${id}`
        );
        data.booking_date = data.booking_date
          ? data.check_in_date.split(" ")[0]
          : null;
        data.check_out = data.check_out ? data.check_out.split(" ")[0] : null;
        console.log(data);
        setCheckIn(data);
      } catch (error) {
        console.error("Error fetching check-in record:", error);
      } finally {
        setIsLoading(false); // Ensure loading state is set to false even in case of an error
      }
    }
    fetchCheckInRecord();
  }, [id]);

  const excludedProperties = [
    "updated_at",
    "hotel_id",
    "id",
    "created_at",
    "received_by",
    "signature",
    "selfie",
  ];

  const handleCheckOut = async () => {
    try {
      setIsLoading(true); // Set loading to true before the request
      const response = await axios.post(`${config.apiUrl}/checkout/${id}`);
      console.log("Checkout successful:", response.data);
      setCheckoutMessage(response.data.message || "Checkout successful");

      // Navigate to "admin-dashboard/check-in-list" after successful check-out
      setTimeout(() => {
        navigate("/admin-dashboard/check-in-list");
      }, 2000);
    } catch (error) {
      console.error("Checkout failed:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
      setCheckoutMessage(error.response?.data?.message || "Checkout failed");
    } finally {
      setIsLoading(false); // Set loading to false after the request, regardless of success or failure
    }
  };

  return (
    <div className="container" style={{ marginTop: 100 }}>
      <h2>Check-in Details</h2>
      {checkoutMessage && (
        <div
          className={`alert ${
            checkoutMessage === "Checkout successful"
              ? "alert-success"
              : "alert-danger"
          }`}
          role="alert"
        >
          {checkoutMessage}
        </div>
      )}
      <div className="row">
        {Object.keys(checkIn)
          .filter((property) => !excludedProperties.includes(property))
          .map((property) => (
            <div className="col-6 col-md-3" key={property}>
              <strong>
                {property.charAt(0).toUpperCase() + property.slice(1)}:
              </strong>{" "}
              {checkIn[property]}
            </div>
          ))}
        <button
          className="btn btn-primary"
          onClick={handleCheckOut}
          disabled={isLoading}
        >
          {isLoading ? "Checking Out..." : "Check Out"}
        </button>
      </div>
    </div>
  );
};

export default CheckInDetailsComponent;
