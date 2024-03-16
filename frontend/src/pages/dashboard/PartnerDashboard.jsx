import "./partnerDashboard.css";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faBed,
  faBook,
  faQuestionCircle,
  faPercent,
  faUserCheck,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Dashboard() {
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

  return (
    <div className="partneer-dashbord">
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
            <Link to="/dashboard/hotels">
              <span className="icon">
                <FontAwesomeIcon icon={faHotel} />
              </span>
              <span className="title">Hotels</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/rooms">
              <span className="icon">
                <FontAwesomeIcon icon={faBed} />
              </span>
              <span className="title">Rooms</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/bookings">
              <span className="icon">
                <FontAwesomeIcon icon={faBook} />
              </span>
              <span className="title">Bookings</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/questions">
              <span className="icon">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
              <span className="title">Questions</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/discount">
              <span className="icon">
                <FontAwesomeIcon icon={faPercent} />
              </span>
              <span className="title">Discount form</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/check-in">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCheck} />
              </span>
              <span className="title">Check in form</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/check-in-list">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCheck} />
              </span>
              <span className="title">checkout</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/confirm-booking">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCheck} />
              </span>
              <span className="title">Booking Confirmation</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/revenue">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Check Revenue</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/short-stay">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Short Stay</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/guest-record">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Check Guest Record</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/room-availality">
              <span className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
              <span className="title">Update Room</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* <!-- ========================= Main ==================== --> */}
      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </div>

        {/* <!-- ================ Order Details List ================= --> */}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader"></div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
