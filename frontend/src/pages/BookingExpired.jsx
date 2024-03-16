const BookingExpired = () => {
  return (
    <div style={centeredStyle}>
      <h1>Booking Expired</h1>
      <p>Sorry, the booking confirmation has expired.</p>
    </div>
  );
};

export default BookingExpired;

const centeredStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};
