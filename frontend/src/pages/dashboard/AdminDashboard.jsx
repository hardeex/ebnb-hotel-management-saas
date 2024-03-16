import "./adminDashboard.css";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faBook,
  faQuestionCircle,
  faExclamationTriangle,
  faCheckCircle,
  faPercent,
  faUserCheck,
  faPlus,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import config from "../../config.json";
import axios from "axios";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hotels, setHotels] = useState([]);

  const filteredItems = hotels.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedItems = isSearching ? filteredItems : hotels;

  useEffect(() => {
    async function fetchHotels() {
      const { data } = await axios.get(`${config.apiUrl}/hotels`);
      setHotels(data);
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    let list = document.querySelectorAll(".navigation li");

    function activateLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("click", activateLink));

    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };
  }, []);

  const handleDelete = async (hotel) => {
    const shouldDelete = window.confirm("Are you sure you want to delete it?");
    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`${config.apiUrl}/hotels/${hotel.id}`);
      setHotels((prevHotels) => prevHotels.filter((h) => h.id !== hotel.id));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const toggleVerifyStatus = async (hotel) => {
    const newStatus = !hotel.verify;

    setHotels((prevHotels) =>
      prevHotels.map((h) =>
        h.id === hotel.id ? { ...h, verify: newStatus } : h
      )
    );

    try {
      const response = await axios.put(
        `${config.apiUrl}/update-verify-status/${hotel.id}`,
        {
          verify: newStatus,
        }
      );

      setHotels((prevHotels) =>
        prevHotels.map((h) => (h.id === hotel.id ? response.data : h))
      );
    } catch (error) {
      console.error("Error updating hotel verify status:", error);
    }
  };

  return (
    <div className="admin-dashbord">
      <div className="navigation">
        <ul>
          <li>
            <Link style={{ cursor: "pointer" }} to="/">
              <img
                className="icon img-fluid"
                style={{ width: 100 }}
                src="../../images/ebnb-logo.png"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/hotels">
              <span className="icon">
                <FontAwesomeIcon icon={faHotel} />
              </span>
              <span className="title">Hotels</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/bookings">
              <span className="icon">
                <FontAwesomeIcon icon={faBook} />
              </span>
              <span className="title">Bookings</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/verified-hotels">
              <span className="icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
              <span className="title">Verified Hotels</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/not-verified-hotels">
              <span className="icon">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
              <span className="title">Not Verified Hotels</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/questions">
              <span className="icon">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
              <span className="title">Questions</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/discount">
              <span className="icon">
                <FontAwesomeIcon icon={faPercent} />
              </span>
              <span className="title">Discount form</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/discount-lists">
              <span className="icon">
                <FontAwesomeIcon icon={faPercent} />
              </span>
              <span className="title">Discounts</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/check-in">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCheck} />
              </span>
              <span className="title">Check in form</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/check-in-list">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCheck} />
              </span>
              <span className="title">checkout</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/add-inspected">
              <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="title">Create Inspected hotel</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/confirm-booking">
              <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="title">Booking confirmation</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/revenue">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Check Revenue</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/short-stay">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Short Stay</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/guest-record">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Check Guest Record</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/room-availality">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Update Room</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <div className="search">
            <label>
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(!!e.target.value);
                }}
              />
            </label>
          </div>
          <div className="user"></div>
        </div>
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader"></div>
            {isSearching ? (
              <>
                <h2>Hotel Table</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Property</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Delete</th>
                      <th>Update</th>
                      <th>Verify</th>
                      <td>Location</td>
                      <td>Address</td>
                      <td>Details</td>
                    </tr>
                  </thead>

                  <tbody>
                    {displayedItems.map((hotel) => (
                      <tr key={hotel.id}>
                        <td>{hotel.id}</td>
                        <td>{hotel.name}</td>
                        <td>{hotel.building_type}</td>
                        <td>₦{hotel.price_per_night}</td>
                        <td>
                          <span
                            className={`status ${
                              hotel.verify ? "published" : "isPublish"
                            }`}
                          >
                            {hotel.verify ? "Verified" : "Not Verified"}
                          </span>
                        </td>
                        <td>
                          <span
                            onClick={() => handleDelete(hotel)}
                            className="status delete"
                          >
                            Delete
                          </span>
                        </td>
                        <td>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/hotel-update/${hotel.id}`}
                          >
                            <span className="status update">Update</span>
                          </Link>
                        </td>
                        <td>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={hotel.verify}
                              onChange={() => toggleVerifyStatus(hotel)}
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>{hotel.location}</td>
                        <td>{hotel.adresse}</td>
                        <td>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/hotel-details/${hotel.id}`}
                          >
                            <span className="status ">More</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
