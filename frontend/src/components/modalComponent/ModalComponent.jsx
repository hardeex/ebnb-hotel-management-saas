import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import config from "../../config.json";
import axios from "axios";
import "./modalComponent.css";
import { useNavigate } from "react-router-dom";

export default function ModalComponent({
  show,
  setShow,
  roomId,
  roomPrice,
  hotel,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [checkinDate, setCheckinDate] = useState(
    today.toISOString().split("T")[0]
  );
  const [checkoutDate, setCheckoutDate] = useState(
    tomorrow.toISOString().split("T")[0]
  );
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckoutDate(nextDay.toISOString().split("T")[0]);
  }, [checkinDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(`${config.apiUrl}/bookings`, {
        hotel_id: hotel.id,
        room_id: roomId,
        guest_name: name,
        guest_email: email,
        guest_phone: phoneNumber,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        num_adults: numAdults,
        num_children: numChildren,
        payment_amount: roomPrice,
      });

      if (response.status === 200) {
        setLoading(false);
        navigate(
          `/hotel-checkout?&roomId=${roomId}&roomPrice=${roomPrice}&bookingId=${response.data.id}`
        );
      } else {
        console.error("Booking failed. Server returned:", response.data);
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);

      // Check if the server response contains an error message
      if (error.response && error.response.data && error.response.data.error) {
        // Update the UI to display the error message
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <>
        <Modal.Header closeButton>
          <Modal.Title>
            Complete your booking
            <br />
            Total price: {roomPrice}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="d-flex align-items-center justify-content-center mt-2">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                  style={{ textTransform: "lowercase" }}
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCheckinDate">
                <Form.Label>Check-in Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={checkinDate}
                  onChange={(e) => setCheckinDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCheckoutDate">
                <Form.Label>Check-out Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={checkoutDate}
                  onChange={(e) => setCheckoutDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNumAdults">
                <Form.Label>Number of Adults</Form.Label>
                <Form.Control
                  type="number"
                  value={numAdults}
                  onChange={(e) => setNumAdults(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formNumChildren">
                <Form.Label>Number of Children</Form.Label>
                <Form.Control
                  type="number"
                  value={numChildren}
                  onChange={(e) => setNumChildren(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex align-items-center justify-content-center mt-2">
                <button className="btn btn-primary" disabled={loading}>
                  Book
                </button>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <p>
            You are booking at {hotel.name} located in {hotel.location} with
            address: {hotel.adresse}. Enjoy your stay!
          </p>
        </Modal.Footer>
      </>
    </Modal>
  );
}
