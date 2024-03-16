import { useEffect, useState } from "react";
import "./hotelImageGallery.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../config.json";

export default function HotelImageGallery({ hotel }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchHotelsImages() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/images/${hotel?.id}`
        );
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching hotel images:", error);
      }
    }
    fetchHotelsImages();
  }, [hotel]);

  const handleOpen = (i) => {
    setSlideIndex(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideIndex;

    if (direction === "l") {
      newSlideIndex = slideIndex === 0 ? photos.length - 1 : slideIndex - 1;
    } else {
      newSlideIndex = slideIndex === photos.length - 1 ? 0 : slideIndex + 1;
    }

    setSlideIndex(newSlideIndex);
  };

  return (
    <div className="hotel-image-gallery col-12 col-md-7 my-5">
      {open && (
        <div className="slider">
          <div className="arrow-prev">
            <div className="arrow-icon left">
              <FontAwesomeIcon
                onClick={() => handleMove("l")}
                icon={faArrowLeft}
              />
            </div>
          </div>
          <FontAwesomeIcon
            onClick={() => setOpen(false)}
            size="2x"
            className="close"
            icon={faCircleXmark}
          />
          <div className="slider-wrapper">
            <img
              src={`${config.imageUrl}/${photos[slideIndex]?.image_path}`}
              alt=""
            />
          </div>
          <div className="arrow-next">
            <div className="arrow-icon right">
              <FontAwesomeIcon
                onClick={() => handleMove("r")}
                icon={faArrowRight}
              />
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between flex-wrap">
        {photos.map((photo, index) => (
          <div key={index} className="hotel-image-wrapper my-2">
            <img
              onClick={() => handleOpen(index)}
              style={{ width: 300, height: 200 }}
              src={`${config.imageUrl}/${photo.image_path}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
