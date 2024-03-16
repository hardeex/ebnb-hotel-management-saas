<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Check-Out Notification</title>
</head>
<body>
    <h2>Check-Out Notification</h2>
    
    <p>Your guest has checked out. Here are the details:</p>

    <ul>
        <li><strong>Guest Name:</strong> {{ $checkInRecord->name }}</li>
        <li><strong>Room Number:</strong> {{ $checkInRecord->room_number }}</li>
        <li><strong>Check-out Date:</strong> {{ $checkInRecord->check_out_date }}</li>
        <li><strong>Room Type:</strong> {{ $checkInRecord->accommodation_type }}</li>
        <li><strong>Total Amount Paid:</strong> ₦{{ $checkInRecord->total_amount_paid }}</li>
    </ul>

    <p>Thank you for using our services!</p>
</body>
</html>
