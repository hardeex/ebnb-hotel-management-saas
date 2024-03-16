import { useEffect, useState } from "react";
import "./hotels.css";
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

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await axios.get(
          `${config.apiUrl}/hotels/by-building-type/hotel`
        );

        setHotels(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }

    fetchHotels();
  }, []);

  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const reviewsData = await Promise.all(
          hotels.map(async (hotel) => {
            const { data } = await axios.get(
              `${config.apiUrl}/reviews/${hotel.id}`
            );
            return { hotelId: hotel.id, reviews: data };
          })
        );

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchAllReviews();
  }, [hotels]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: false,
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
    <div className="hotels container-fluid">
      <div style={{ marginLeft: 70 }}>
        <h3>Hotels</h3>
        <p>High rated hotels within and around the country</p>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Slider {...settings} className="custom-slider">
          {hotels.map((hotel, index) => {
            const hotelReviews =
              reviews.find((review) => review.hotelId === hotel.id)?.reviews ||
              [];

            return (
              <div key={index}>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/hotel/${hotel.id}`}
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
                      src={`${config.imageUrl}/${hotel.image}`}
                      className="card-img-top"
                      alt=""
                    />
                    <div className="card-body">
                      <h5
                        style={{ fontWeight: "bold", fontSize: 20 }}
                        className="card-title"
                      >
                        {hotel.name}
                      </h5>
                      <ul className="custom-ul">
                        <li>{hotel.adresse}</li>
                        <li>Reviews ({hotelReviews.length})</li>
                        <li>{hotel.verify ? "Verified" : "Not Verified"}</li>
                        <li>Price per night ₦{hotel.price_per_night}</li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}
