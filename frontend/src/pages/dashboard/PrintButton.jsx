import React from "react";

const PrintButton = ({ checkIn }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Check-In Details</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <h1 class="mt-4">Check-In Details</h1>
          <div class="row">
            <div class="col-12 col-md-3"><p>ID: ${checkIn.id}</p></div>
            <div class="col-12 col-md-3"><p>Hotel ID: ${
              checkIn.hotel_id
            }</p></div>
            <div class="col-12 col-md-3"><p>Address: ${
              checkIn.address
            }</p></div>
            <div class="col-12 col-md-3"><p>Tel Number: ${
              checkIn.tel_number
            }</p></div>
            <div class="col-12 col-md-3"><p>Emergency Number: ${
              checkIn.emergency_number
            }</p></div>
            <div class="col-12 col-md-3"><p>Identity: ${
              checkIn.identity
            }</p></div>
            <div class="col-12 col-md-3"><p>ID Number: ${
              checkIn.id_number
            }</p></div>
            <div class="col-12 col-md-3"><p>Number of People: ${
              checkIn.number_of_people
            }</p></div>
            <div class="col-12 col-md-3"><p>Nationality: ${
              checkIn.nationality
            }</p></div>
            <div class="col-12 col-md-3"><p>Country of Residence: ${
              checkIn.country_of_residence
            }</p></div>
            <div class="col-12 col-md-3"><p>Duration: ${
              checkIn.duration
            }</p></div>
            <div class="col-12 col-md-3"><p>Price per Night: ${
              checkIn.price_per_night
            }</p></div>
            <div class="col-12 col-md-3"><p>Email: ${checkIn.email}</p></div>
            <div class="col-12 col-md-3"><p>Name: ${checkIn.name}</p></div>
            <div class="col-12 col-md-3"><p>Deposit: ${
              checkIn.deposit
            }</p></div>
            <div class="col-12 col-md-3"><p>Balance: ${
              checkIn.balance
            }</p></div>
            <div class="col-12 col-md-3"><p>Check-In Date: ${
              checkIn.check_in_date
            }</p></div>
            <div class="col-12 col-md-3"><p>Check-In Time: ${
              checkIn.check_in_time
            }</p></div>
            <div class="col-12 col-md-3"><p>Check-Out: ${
              checkIn.check_out
            }</p></div>
            <div class="col-12 col-md-3"><p>Check-Out Date: ${
              checkIn.check_out_date
            }</p></div>
            <div class="col-12 col-md-3"><p>Check-Out Time: ${
              checkIn.check_out_time
            }</p></div>
            <div class="col-12 col-md-3"><p>Total Amount Paid: ${
              checkIn.total_amount_paid
            }</p></div>
            <div class="col-12 col-md-3"><p>Restaurant/Bar Bill: ${
              checkIn.restaurant_bar_bill
            }</p></div>
            <div class="col-12 col-md-3"><p>Travelling From: ${
              checkIn.travelling_from
            }</p></div>
            <div class="col-12 col-md-3"><p>Travelling To: ${
              checkIn.travelling_to
            }</p></div>
            <div class="col-12 col-md-3"><p>Additional Facilities: ${
              checkIn.additional_facilities
            }</p></div>
            <div class="col-12 col-md-3"><p>Other Comments: ${
              checkIn.other_comments
            }</p></div>
            <div class="col-12 col-md-3"><p>Ref: ${checkIn.ref}</p></div>
            <div class="col-12 col-md-3"><p>Room Number: ${
              checkIn.room_number
            }</p></div>
            <div class="col-12 col-md-3"><p>Hotel Location: ${
              checkIn.hotel_location
            }</p></div>
            <div class="col-12 col-md-3"><p>Branch Name: ${
              checkIn.branch_name
            }</p></div>
            <div class="col-12 col-md-3"><p>Signature: ${
              checkIn.signature
            }</p></div>
            <div class="col-12 col-md-3"><p>Customer Signature: ${
              checkIn.customer_signature
            }</p></div>
            <div class="col-12 col-md-3"><p>Received By: ${
              checkIn.received_by
            }</p></div>
            <div class="col-12 col-md-3"><p>Booking Date: ${
              checkIn.booking_date
            }</p></div>
            <div class="col-12 col-md-3"><p>Payment Method: ${
              checkIn.payment_method
            }</p></div>
            <div class="col-12 col-md-3"><p>Booking Method: ${
              checkIn.booking_method
            }</p></div>
            <div class="col-12 col-md-3"><p>Purpose of Visit: ${
              checkIn.purpose_of_visit
            }</p></div>
            ${
              checkIn.other_purpose_of_visit
                ? `
            <div class="col-12 col-md-3"><p>Other Purpose of Visit: ${checkIn.other_purpose_of_visit}</p></div>
          `
                : ""
            }
            <div class="col-12 col-md-3"><p>Accommodation Type: ${
              checkIn.accommodation_type
            }</p></div>
          </div>
        </div>
  
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = function () {
      printWindow.close();
    };
  };

  return (
    <button onClick={handlePrint} className="status print">
      Print
    </button>
  );
};

export default PrintButton;
