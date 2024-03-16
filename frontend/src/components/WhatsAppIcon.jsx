import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppIcon.css";

const WhatsAppIcon = () => {
  const phoneNumber = "+2348100680153";

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phoneNumber
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="whatsapp-icon-container" onClick={handleWhatsAppClick}>
      <FaWhatsapp />
    </div>
  );
};

export default WhatsAppIcon;
