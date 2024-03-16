const AlreadyConfirmed = () => {
  return (
    <div style={centeredStyle}>
      <h1>Already Confirmed</h1>
      <p>Your booking has already been confirmed.</p>
    </div>
  );
};

export default AlreadyConfirmed;

const centeredStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};
