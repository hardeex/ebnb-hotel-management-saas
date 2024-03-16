<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Check-in Record Information</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>

    <div class="container">
        <h2>Check-in Record Information</h2>
        <div class="row">
            <div class="col-md-6">
                <div><strong>Address:</strong> {{ $checkInRecord->address }}</div>
                <div><strong>Telephone Number:</strong> {{ $checkInRecord->tel_number }}</div>
                <div><strong>Emergency Number:</strong> {{ $checkInRecord->emergency_number }}</div>
                <div><strong>Identity:</strong> {{ $checkInRecord->identity }}</div>
                <div><strong>ID Number:</strong> {{ $checkInRecord->id_number }}</div>
                <div><strong>Number of People:</strong> {{ $checkInRecord->number_of_people }}</div>
                <div><strong>Nationality:</strong> {{ $checkInRecord->nationality }}</div>
                <div><strong>Country of Residence:</strong> {{ $checkInRecord->country_of_residence }}</div>
                <div><strong>Duration:</strong> {{ $checkInRecord->duration }}</div>
                <div><strong>Price per Night:</strong> ₦{{ $checkInRecord->price_per_night }}</div>
                <div><strong>Email:</strong> {{ $checkInRecord->email }}</div>
                <div><strong>Name:</strong> {{ $checkInRecord->name }}</div>
                
            </div>
            <div class="col-md-6">
                <div><strong>Deposit:</strong> {{ $checkInRecord->deposit }}</div>
                <div><strong>Balance:</strong> {{ $checkInRecord->balance }}</div>
                <div><strong>Check-in Date:</strong> {{ $checkInRecord->check_in_date }}</div>
                <div><strong>Check-in Time:</strong> {{ $checkInRecord->check_in_time }}</div>
                <div><strong>Check-out:</strong> {{ $checkInRecord->check_out }}</div>
                <div><strong>Check-out Date:</strong> {{ $checkInRecord->check_out_date }}</div>
                <div><strong>Check-out Time:</strong> {{ $checkInRecord->check_out_time }}</div>
                <div><strong>Total Amount Paid:</strong> {{ $checkInRecord->total_amount_paid }}</div>
                <div><strong>Restaurant/Bar Bill:</strong> {{ $checkInRecord->restaurant_bar_bill }}</div>
                <div><strong>Travelling From:</strong> {{ $checkInRecord->travelling_from }}</div>
                <div><strong>Travelling To:</strong> {{ $checkInRecord->travelling_to }}</div>
                <div><strong>Additional Facilities:</strong> {{ $checkInRecord->additional_facilities }}</div>
                <div><strong>Other Comments:</strong> {{ $checkInRecord->other_comments }}</div>
                <div><strong>Ref:</strong> {{ $checkInRecord->ref }}</div>
                <div><strong>Room Number:</strong> {{ $checkInRecord->room_number }}</div>
                <div><strong>Hotel Location:</strong> {{ $checkInRecord->hotel_location }}</div>
                <div><strong>Branch Name:</strong> {{ $checkInRecord->branch_name }}</div>
                <div><strong>Signature:</strong> {{ $checkInRecord->signature }}</div>
                <div><strong>Customer Signature:</strong> {{ $checkInRecord->customer_signature }}</div>
                <div><strong>Received By:</strong> {{ $checkInRecord->received_by }}</div>
                <div><strong>Booking Date:</strong> {{ $checkInRecord->booking_date }}</div>
                <div><strong>Payment Method:</strong> {{ $checkInRecord->payment_method }}</div>
                <div><strong>Booking Method:</strong> {{ $checkInRecord->booking_method }}</div>
                <div><strong>Purpose of Visit:</strong> {{ $checkInRecord->purpose_of_visit }}</div>
                <div><strong>Other Purpose of Visit:</strong> {{ $checkInRecord->other_purpose_of_visit }}</div>
                <div><strong>Accommodation Type:</strong> {{ $checkInRecord->accommodation_type }}</div>
                
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</body>
</html>
