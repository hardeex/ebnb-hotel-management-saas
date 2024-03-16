import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";

const ListOfDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleVerifyStatus = async (discount) => {
    const newStatus = !discount.verified;

    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((d) =>
        d.id === discount.id ? { ...d, verified: newStatus } : d
      )
    );

    try {
      await axios.patch(`${config.apiUrl}/update-verification/${discount.id}`, {
        verified: newStatus,
      });
    } catch (error) {
      console.error("Error updating discount verify status:", error);
    }
  };

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/discounts`);
        setDiscounts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDiscounts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Building Type</th>
              <th>Price per Night</th>
              <th>Discount Percent</th>
              <th>Status</th>
              <th>Expiration Date</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>{discount.id}</td>
                <td>{discount.hotel.name}</td>
                <td>{discount.hotel.location}</td>
                <td>{discount.hotel.building_type}</td>
                <td>₦{discount.hotel.price_per_night}</td>
                <td>{discount.discount_percent}%</td>
                <td>
                  <span
                    className={`status ${
                      discount.verified ? "published" : "isPublish"
                    }`}
                  >
                    {discount.verified ? "Verified" : "Not Verified"}
                  </span>
                </td>
                <td>{discount.expiration_date || "N/A"}</td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={discount.verified}
                      onChange={() => toggleVerifyStatus(discount)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListOfDiscount;
