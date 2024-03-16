import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

const HotelInformation = () => {
  const { hotelId } = useParams();
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/hotels/${hotelId}`);
        setHotelData(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotel();
  }, [hotelId]);

  const excludedProperties = ["id", "partner_id", "created_at", "updated_at"];

  return (
    <div className="container my-5">
      <h2 className="mb-4">Hotel Information</h2>

      {hotelData ? (
        <div className="row mt-5">
          {Object.keys(hotelData)
            .filter((property) => !excludedProperties.includes(property))
            .map((property) => (
              <div className="col-6 col-md-3" key={property}>
                <strong>
                  {property.charAt(0).toUpperCase() + property.slice(1)}:
                </strong>{" "}
                {typeof hotelData[property] === "object"
                  ? ""
                  : hotelData[property]}
              </div>
            ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <p>Loading hotel information...</p>
        </div>
      )}
    </div>
  );
};

export default HotelInformation;
