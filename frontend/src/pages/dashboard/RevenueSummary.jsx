// RevenueSummary.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PieChart from "./PieChart";

const RevenueSummary = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/hotels`);
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }
    fetchHotels();
  }, []);

  const fetchRevenueSummary = async () => {
    try {
      if (!selectedHotel) {
        setError("Please select a hotel");
        return;
      }

      const response = await axios.post(`${config.apiUrl}/revenue-summary`, {
        period: selectedPeriod,
        hotel_id: selectedHotel,
      });
      setRevenueData(response.data);
      setError(null);
      const periodDisplayName = getPeriodDisplayName(selectedPeriod);
      setSuccessMessage(
        `Revenue for ${periodDisplayName} successfully fetched.`
      );
    } catch (error) {
      console.error("Error fetching revenue summary:", error);
      setError("Failed to fetch revenue summary");
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    fetchRevenueSummary();
  }, [selectedHotel, selectedPeriod]);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const getPeriodDisplayName = (period) => {
    switch (period) {
      case "today":
        return "Today";
      case "yesterday":
        return "Yesterday";
      case "this_week":
        return "This Week";
      case "last_week":
        return "Last Week";
      case "this_month":
        return "This Month";
      case "last_month":
        return "Last Month";
      case "last_six_months":
        return "Last Six Months";
      default:
        return period; // return the original value for unknown periods
    }
  };

  return (
    <Container>
      <h2 className="mt-3 mb-3">Revenue Summary</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Select Hotel:</Form.Label>
            <Form.Control as="select" onChange={handleHotelChange}>
              <option value="">Select a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Select Period:</Form.Label>
            <Form.Control
              as="select"
              value={selectedPeriod}
              onChange={handlePeriodChange}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this_week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="last_six_months">Last Six Months</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={fetchRevenueSummary}>
            Fetch Revenue
          </Button>
        </Col>
      </Row>
      {revenueData && (
        <Row className="mt-3">
          <Col>
            <ul>
              <li>Revenue: ₦{revenueData.revenue}</li>
            </ul>
            <PieChart data={revenueData} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RevenueSummary;
