// PaymentOptionsComponent.js
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function PaymentOptionsComponent({ handlePayAtProperty, handlePayNow }) {
//   const navigate = useNavigate();

//   const handlePayNowClick = () => {
//     navigate("/hotel-checkout?paymentOption=payNow");
//   };

//   return (
//     <div className="d-flex justify-content-between">
//       <form onSubmit={handlePayAtProperty}>
//         <button
//           type="submit"
//           className="btn btn-success"
//           onClick={handlePayAtProperty}
//         >
//           Pay at Property
//         </button>
//       </form>
//       <button className="btn btn-success" onClick={handlePayNowClick}>
//         Pay Now
//       </button>
//     </div>
//   );
// }



// Adewale code change-- passing the booking ID to the function
// PaymentOptionsComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentOptionsComponent({ bookingId, handlePayAtProperty, handlePayNow }) {
  const navigate = useNavigate();

  const handlePayNowClick = () => {
    navigate(`/hotel-checkout?paymentOption=payNow&bookingId=${bookingId}`);
  };

  return (
    <div className="d-flex justify-content-between">
      <form onSubmit={handlePayAtProperty}>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handlePayAtProperty}
        >
          Pay at Property
        </button>
      </form>
      <button className="btn btn-success" onClick={handlePayNowClick}>
        Pay Now
      </button>
    </div>
  );
}
