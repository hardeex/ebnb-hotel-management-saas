const ConfirmationSuccess = () => {
  return (
    <div style={centeredStyle}>
      <h1>Confirmation Success!</h1>
      <p>Your booking has been confirmed.</p>
    </div>
  );
};

export default ConfirmationSuccess;

const centeredStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};
