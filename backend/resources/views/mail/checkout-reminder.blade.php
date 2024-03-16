<!DOCTYPE html>
<html>
<head>
    <title>Check-Out Reminder</title>
</head>
<body>
    <p>Dear hotel,</p>
    <p>A guest is checking out soon. Here are the details:</p>

    <p>Booking ID: {{ $booking->id }}</p>
    <p>Guest: {{ $booking->guest_name }}</p>
    <p>Check-out date: {{ $booking->checkout_date }}</p>
    <p>Thank you for using our service!</p>
</body>
</html>
