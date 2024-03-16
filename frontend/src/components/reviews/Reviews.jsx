import "./reviews.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import config from "../../config.json";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function Reviews({ hotel }) {
  const { user } = useAuth();
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${config.apiUrl}/reviews`, {
        comment: review,
        user_id: user.id,
        hotel_id: hotel.id,
      });

      setSuccessMessage("Review submitted successfully");
      setErrorMessage("");
      setReview("");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error submitting review. Please try again.");
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/reviews/${hotel?.id}`
        );
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, [hotel]);

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
    <div className="mt-3">
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <h6>Reviews {reviews.length}</h6>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div className="review-list" key={index}>
            <div className="m-3 d-flex align-items-center">
              <FontAwesomeIcon size="3x" icon={faUser} />{" "}
              <span className="ms-2">{review.user.name}</span>
            </div>
            <p className="text-center m-3">
              {review.comment.length > 150
                ? review.comment.slice(0, 150) + "..."
                : review.comment}
            </p>
          </div>
        ))}
      </Slider>
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="form-control my-2"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px", width: 300 }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Write a review</label>
        </div>
        <button
          style={{ background: "#2a2185" }}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
