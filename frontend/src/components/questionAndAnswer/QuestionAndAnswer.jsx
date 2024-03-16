import "./questionAndAnswer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import config from "../../config.json";
import axios from "axios";

export default function QuestionAndAnswer({ hotel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitFaqForm = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${config.apiUrl}/ask-question`, {
        message: formData.message,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        hotel_id: hotel.id,
      });

      setSuccessMessage("Question submitted successfully");
      setErrorMessage("");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error submitting question. Please try again.");
      console.error("Error submitting question:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <div className="row question-and-answer">
        <p style={{ fontSize: 17 }}>
          Frequently asked questions about the {hotel.name}
        </p>
        <div className="col-12 col-md-4">
          <div className="text-center question-div">
            <div className="mt-4">
              <h3>Ask a question about the</h3>
              <span style={{ display: "block" }}>{hotel.name}</span>
              <span>Typically responds within 30 mins</span>
              <form style={{ width: 300 }} onSubmit={submitFaqForm}>
                <input
                  type="text"
                  name="name"
                  className="form-control my-4"
                  style={{ height: "50px" }}
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  className="form-control mb-4"
                  style={{ height: "50px" }}
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="tel"
                  name="phone"
                  className="form-control mb-4"
                  style={{ height: "50px" }}
                  placeholder="Phone number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control mb-4"
                  name="message"
                  maxLength="250"
                  rows="7"
                  placeholder="Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                <button
                  style={{ background: "#2a2185" }}
                  className="btn btn-primary mb-4"
                  id="submit-faq-btn"
                  type="submit"
                >
                  Submit
                </button>
              </form>

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 ">
          <div className="text-center">
            <span style={{ fontSize: 25, fontWeight: "bold" }}>
              Do you need to know anything about the Autograph Hotel?
            </span>
            <br />
            <span style={{ fontSize: 25 }}>Be the first to ask a question</span>
          </div>
          <div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails1"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span>Can I cancel my booking?</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>

              <div
                id="cancellationDetails1"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  Yes, any cancellation fees are determined by the property and
                  listed in your cancellation policy. You will pay any
                  additional costs to the property.
                </p>
              </div>
            </div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails2"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span>If I need to cancel my booking, will I pay a feey?</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails2"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  Yes – any cancellation fees are determined by the property and
                  listed in your cancellation policy. You&#39;ll pay any
                  additional costs to the property.
                </p>
              </div>
            </div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails3"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span>
                  {" "}
                  Can I cancel or change my dates for a non-refundable booking?
                </span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails3"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  Changing your dates for non-refundable bookings isn&#39;t
                  possible. If you decide to cancel your booking, you may incur
                  charges. Any cancellation fees are determined by the property,
                  and you&#39;ll pay any additional costs to the property.
                </p>
              </div>
            </div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails4"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span>
                  {" "}
                  Where can I find my property&#39;s cancellation policy?
                </span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails4"
                className="collapse custom-collapse mb-2"
              >
                <p>You can find this in your booking confirmation.</p>
              </div>
            </div>

            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails5"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span> How do I know if my booking was canceled?</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails5"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  After you cancel a booking with us, you should get an email
                  confirming the cancellation. Make sure to check your inbox and
                  spam/junk mail folders. If you don’t receive an email within
                  24 hours, contact the property to confirm they got your
                  cancellation.
                </p>
              </div>
            </div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails6"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span>At what time is my room ready for check-in?</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails6"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  Our priority is to reduce your waiting time to the shortest
                  possible! If your room is not occupied the night before your
                  arrival, you can find room ready from the early morning.
                  Otherwise, we will prepare it for you as soon as it is free,
                  with the utmost care for perfect cleaning and a organization
                  of the room. The room must be vacated by 12 o&#39;clock on the
                  day of departure. At 14:00 the latest the room will be
                  prepared and available to you.
                </p>
              </div>
            </div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails7"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span>
                  {" "}
                  Until what time can I use my room on my day of departure?
                </span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails7"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  On the day of departure the room must be vacated by 12.00.
                  Upon request, and subject to availability, it could be
                  possible to use the room for an extended period (e.g. until
                  the evening). This option must be expressly agreed with the
                  reception and may involve an extra cost (Day Use).
                </p>
              </div>
            </div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails8"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span> Can I move my booking to a future date?</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails8"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  Moving your booking to a future date depends on the
                  reservation&#39;s policies. You can also contact the property
                  to ask for a dat change.
                </p>
              </div>
            </div>
            <div>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#cancellationDetails9"
                className="custom-link d-flex justify-content-between align-items-center"
              >
                <span>
                  Will I get charged additionally if I move my reservation to a
                  future date?
                </span>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <div
                id="cancellationDetails9"
                className="collapse custom-collapse mb-2"
              >
                <p>
                  If you change your dates and the property has availability,
                  there may be a difference in price (higher or lower), which
                  could be due to the season or different rates for weekdays
                  versus weekends. If rates are higher, you&#39;ll have to pay
                  the difference between the original price and the one for your
                  new dates. If they&#39;re lower, the price difference will be
                  reflected in your booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
