import { useEffect, useState } from "react";
import "./hotelCategories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

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

export default function HotelCategories() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBuildingTypes() {
      const { data } = await axios.get(
        `${config.apiUrl}/distinct-building-types`
      );
      setHotels(data);
      setLoading(false);
    }
    fetchBuildingTypes();
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
    <div className="hotel-categories container-fluid">
      <div style={{ marginLeft: 70 }}>
        <h3>Hotel & Apartment Categories</h3>
        <p>High rated hotels within and around the country</p>
      </div>
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <Slider {...settings} className="custom-slider">
          {hotels.map((hotel, index) => (
            <div key={index}>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/category/${hotel.building_type}`}
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
                  <img
                    style={{ height: "70%" }}
                    src={`${config.imageUrl}/${hotel.image.image_path}`}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5
                      style={{ fontWeight: "bold", fontSize: 20 }}
                      className="card-title"
                    >
                      {hotel.building_type}
                    </h5>
                    <ul className="custom-ul"></ul>
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
