import { useEffect, useState } from "react";
import config from "../../config.json";
import axios from "axios";
import { Link } from "react-router-dom";
import PrintButton from "./PrintButton";
import { useAuth } from "../../contexts/AuthContext";

export default function CheckInList() {
  const { user } = useAuth();
  const [checkInLists, setCheckInLists] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (checkIn) => {
    const shouldDelete = window.confirm("Are you sure you want to delete it?");
    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`${config.apiUrl}/check-in-records/${checkIn.id}`);
      setCheckInLists((prevCheckIns) =>
        prevCheckIns.filter((ci) => ci.id !== checkIn.id)
      );
    } catch (error) {
      console.error("Error deleting checkIn:", error);
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
        console.error("Error fetching hotels:", error);
      }
    }

    fetchHotel();
  }, [user]);

  useEffect(() => {
    async function fetchCheckInsForHotels() {
      const allCheckIns = [];

      try {
        for (const hotel of hotels) {
          try {
            const { data } = await axios.get(
              `${config.apiUrl}/check-in-records/${hotel.id}`
            );
            allCheckIns.push(...data);
          } catch (error) {
            console.error(
              `Error fetching check-ins for hotel ${hotel.id}:`,
              error
            );
          }
        }
      } catch (error) {
        console.error("Error fetching check-ins for all hotels:", error);
      } finally {
        setCheckInLists(allCheckIns);
        setLoading(false);
      }
    }

    if (hotels.length > 0) {
      fetchCheckInsForHotels();
    } else {
      setLoading(false);
    }
  }, [hotels]);

  return (
    <>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2>Reservation Table</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Check-in Date</th>
                <th>Check-in Time</th>
                <th>Check-out Date</th>
                <th>Total Amount Paid</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Print</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {checkInLists.map((checkIn) => (
                <tr key={checkIn.id}>
                  <td>{checkIn.id}</td>
                  <td>{checkIn.name}</td>
                  <td>{checkIn.status === "closed" ? "Closed" : "Open"}</td>
                  <td>{checkIn.check_in_date}</td>
                  <td>{checkIn.check_in_time}</td>
                  <td>{checkIn.check_out}</td>
                  <td>{checkIn.total_amount_paid}</td>
                  <td>
                    <span
                      onClick={() => handleDelete(checkIn)}
                      className="status delete"
                    >
                      Delete
                    </span>
                  </td>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/checkIn/update/${checkIn.id}`}
                    >
                      <span className="status update">Update</span>
                    </Link>
                  </td>
                  <td>
                    <PrintButton checkIn={checkIn} />
                  </td>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/checkIn-details/${checkIn.id}`}
                    >
                      <span className="status">Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
