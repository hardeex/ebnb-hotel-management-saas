import "./reasonToChooseHotel.css";

export default function ReasonToChooseHotel({ hotel }) {
  return (
    <div className="col-12 reson-to-choose-hotel">
      <hr />
      <h3>Reasons to choose {hotel.name}</h3>
      <span className="not-listed">{hotel.reasons_to_choose}</span>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <h3>What is nearby</h3>
          <span className="not-listed">Nearby object was not listed yet</span>
          <span className="not-listed">{hotel?.nearby}</span>
        </div>
        <div>
          <h3>Top attraction</h3>
          <span className="not-listed">Top attraction was not listed yet</span>
          <span className="not-listed">{hotel?.top_attraction}</span>
        </div>
        <div>
          <h3>Closest Airports</h3>
          <span className="not-listed">{hotel?.closest_airports}</span>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <h3>Nearby Hotels to Festus Apartment in Ogun</h3>
        <a href="#" style={{ textDecoration: "none" }}>
          View other hotels in Ogun
        </a>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <h3>Similar properties to Festus Apartment</h3>
        <a href="#" style={{ textDecoration: "none" }}>
          View other hotels in Ogun
        </a>
      </div>
    </div>
  );
}
