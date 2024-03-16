import { useState } from "react";
import "./mapComponent.css";

const MapComponent = ({ hotel }) => {
  const [hotelAddress, setHotelAddress] = useState(hotel.adresse || "");

  const handleAddressChange = (event) => {
    setHotelAddress(event.target.value);
  };

  const formattedAddress = encodeURIComponent(hotelAddress);

  const markerIconURL = encodeURIComponent(
    "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
  );

  const iframeURL = `https://www.google.com/maps/embed?pb=!4v39.719644,-104.962545!&q=${formattedAddress}&zoom=14&markers=icon:${markerIconURL}|${formattedAddress}`;

  return (
    <div className="map-container">
      <input type="text" value={hotelAddress} onChange={handleAddressChange} />
      <iframe
        src={iframeURL}
        width="100%"
        height="400"
        style={{ border: 0 }}
        title="Hotel Location"
      ></iframe>
    </div>
  );
};

export default MapComponent;
