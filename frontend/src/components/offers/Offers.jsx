import "./offers.css";

export default function Offers() {
  return (
    <div className="container offers-component mb-4">
      <h3>Offers</h3>
      <p>Promotions, deals, and special offers for you</p>

      <div className="row">
        <div className="col-12 col-md-6 d-flex">
          <div className="offer-card-primary col-8 d-flex align-items-center">
            <div className="ms-3">
              <p className="vacation">Take your longest vacation yet</p>
              <p className="properties">Browse properties offering long-term</p>
              {/* <p className="rates">stays, many at reduced monthly rates.</p> */}
              <button
                style={{ background: "#2a2185" }}
                className="btn btn-primary"
              >
                Find a stay
              </button>
            </div>
          </div>
          <div
            className="offer-card-secondary col-4 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage: `url('../images/220031205.jpeg')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div
          className="offer-card-other col-12 col-md-6 d-flex"
          style={{
            backgroundImage: `url('../images/261387541.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <p className="escape">Save 15% with Late Escape Deals</p>
            <p className="explore">Explore thousands of destinations</p>
            <p className="save">worldwide and save 15% or more</p>

            <button
              style={{ background: "#2a2185" }}
              className="btn btn-primary"
            >
              Find Late Escape Deals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
