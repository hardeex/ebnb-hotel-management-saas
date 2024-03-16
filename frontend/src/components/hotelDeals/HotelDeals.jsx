import { useEffect, useState } from "react";
import "./hotelDeals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-prev" onClick={onClick}>
      <div className="arrow-icon left">
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-next" onClick={onClick}>
      <div className="arrow-icon right">
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function HotelDeals() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoteldeals = async () => {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/discounted-locations`
        );
        setHotels(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel deals:", error);
        setLoading(false);
      }
    };

    fetchHoteldeals();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="hotel-categories container-fluid mt-5">
      <div style={{ marginLeft: 70 }}>
        <h3>Hotel Deals</h3>
      </div>
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <Slider {...settings} className="custom-slider">
          {hotels.map((hotel, index) => (
            <div key={index}>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/discount/hotel/${hotel.state}`}
              >
                <div
                  className="card mb-5"
                  style={{
                    width: "18rem",
                    height: "25rem",
                    border: "none",
                    boxShadow: "0px 0px 6px 1px rgba(6, 6, 9, 0.1)",
                  }}
                >
                  <span
                    className="overlay-text"
                    style={{
                      position: "absolute",
                      top: "6%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 180,
                      color: "white",
                      background: "purple",
                      padding: "10px",
                      borderRadius: "5px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Get up{" "}
                    <span style={{ fontSize: 14 }}>
                      {hotel.discount_percent}{" "}
                    </span>
                    off Discount
                  </span>
                  <img
                    style={{ height: "70%" }}
                    src={`${config.imageUrl}/${hotel.image}`}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5
                      style={{ fontWeight: "bold", fontSize: 20 }}
                      className="card-title"
                    ></h5>
                    <ul className="custom-ul">
                      <li>{hotel.state}</li>
                      <li>{`(${hotel.count}) Hotels and Apertments`}</li>
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
