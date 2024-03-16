import { useEffect, useState } from "react";
import "./trandingDestination.css";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

export default function TrandingDetination() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(`${config.apiUrl}/trending-destinations`);

      setData1(data.slice(0, 2));
      setData2(data.slice(2, 5));
    };
    fetchData();
  }, []);

  return (
    <div className="container tranding-destination mb-4">
      <h3>Trending destinations</h3>
      <p>Most popular choices in Nigeria</p>

      <div className="row">
        {data1.map((item, index) => {
          return (
            <div key={index} className="col-12 col-md-6">
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/trend/${item.state}`}
              >
                <div
                  className="my-card col d-flex align-items-center"
                  style={{
                    backgroundImage: `url(${config.imageUrl}/${item.image.image.image_path})`,

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <p className="city-name">
                    ({item.hotelCount}) Hotels and Apartment in {item.state}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="row mt-3">
        {data2.map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <Link
              style={{ textDecoration: "none" }}
              to={`/trend/${item.state}`}
            >
              <div
                className="my-card col d-flex align-items-center"
                style={{
                  backgroundImage: `url(${config.imageUrl}/${item.image.image.image_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="city-name">
                  ({item.hotelCount}) Hotels and Apartment in {item.state}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
