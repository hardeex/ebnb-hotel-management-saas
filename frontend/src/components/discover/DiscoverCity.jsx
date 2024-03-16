import { useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./discoverCity.css";

export default function DiscoverCity() {
  const [data] = useState([
    {
      imageUrl: "../images/family-fun.jpg",
      title: " Family & Fun",
      property: 22,
    },
    {
      imageUrl: "../images/event-centers.jpg",
      title: "Event Center",
      property: 22,
    },
    {
      imageUrl: "../images/gym.jpg",
      title: "Gym & Sport Centre",
    },
    {
      imageUrl: "../images/beachs.jpg",
      title: "Gym & Sport Centre",
    },
    {
      imageUrl: "../images/night-club.jpg",
      title: "Gym & Sport Centre",
    },
    {
      imageUrl: "../images/shopping-center.jpg",
      title: "Gym & Sport Centre",
    },
    {
      imageUrl: "../images/event-centers.jpg",
      title: "Cinema Centre",
      property: 22,
    },
    {
      imageUrl: "../images/restaurant.jpg",
      title: "Cinema Centre",
      property: 22,
    },
    {
      imageUrl: "../images/cinema.jpg",
      title: "Cinema Centre",
      property: 22,
    },
  ]);

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
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

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
    <div className="container discover-city mb-5">
      <h3 className="text-center">
        Discover the <span className="city-text">city around you</span>
      </h3>
      <h3 className="text-center">
        Discover great titles around your destination
      </h3>

      <Slider {...settings}>
        {data.map((item, index) => {
          return (
            <div key={index} className="col-12 col-md-2">
              <div
                className="my-card m-2 col d-flex align-items-center"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <span>{item.title}</span> <br />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
