import "./inspectedRoom.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

export default function InspectedRoom() {
  const [inspectedRooms, setInspectedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      let { data } = await axios.get(
        `${config.apiUrl}/inspected-hotels-by-location`
      );
      setInspectedRooms(data);
      setLoading(false);
    }
    fetchRooms();
  }, []);

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
    slidesToShow: 3,
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
    <div className="container my-4 inspected-room">
      <h3>Inspected Hotels</h3>
      <div className="row">
        {loading ? (
          <p></p>
        ) : (
          <Slider {...settings}>
            {inspectedRooms.map((hotel, index) => (
              <div key={index} className="col-12 col-md-4">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/inspected-hotels/${hotel.location}`}
                >
                  <div
                    className="my-card col d-flex mx-1 align-items-center"
                    style={{
                      backgroundImage: `url(${config.imageUrl}/${hotel.image.image_path})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="m-2">
                    <span>{hotel.location}</span> <br />
                    <span>{hotel.count} Properties</span>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
