import { useState, useEffect } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../config.json";
import "./explore.css";
import { Link } from "react-router-dom";

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

export default function Explore() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchHotelswithTheirState() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/hotels-locations/count`
        );
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        console.log(error);
      }
    }
    fetchHotelswithTheirState();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
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
    <div className="container explore">
      <h3>Explore</h3>
      <p>These popular destinations have a lot to offer</p>

      <Slider {...settings}>
        {hotels.map((hotel, index) => (
          <div key={index} className="col-12 col-md-2 col-6">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/explore/${hotel.state}`}
            >
              <div
                className="my-card m-2 col d-flex align-items-center"
                style={{
                  backgroundImage: `url(${config.imageUrl}/${hotel.image.image_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="m-2">
                {" "}
                <span>{hotel.state}</span> <br />
                <span>{hotel.count} Properties</span>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
