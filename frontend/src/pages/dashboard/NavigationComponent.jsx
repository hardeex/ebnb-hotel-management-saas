import { Link } from "react-router-dom";

const NavigationComponent = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link style={{ cursor: "pointer" }} to="/">
            <img
              className="icon img-fluid"
              style={{ width: 100 }}
              src="../../images/ebnb-logo.png"
              alt=""
            />
          </Link>
        </li>
        <li>
          <Link to="/hotels">
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="title">Hotels</span>
          </Link>
        </li>
        <li>
          <Link to="/rooms">
            <span className="icon">
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span className="title">Rooms</span>
          </Link>
        </li>
        <li>
          <Link to="/messages">
            <span className="icon">
              <ion-icon name="chatbubble-outline"></ion-icon>
            </span>
            <span className="title">Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/help">
            <span className="icon">
              <ion-icon name="help-outline"></ion-icon>
            </span>
            <span className="title">Help</span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <span className="icon">
              <ion-icon name="settings-outline"></ion-icon>
            </span>
            <span className="title">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/sign-out">
            <span className="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span className="title">Sign Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationComponent;
