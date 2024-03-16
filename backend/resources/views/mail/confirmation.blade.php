<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body>
    <h1>Booking Confirmation</h1>
    <p>The hotel "{{ $hotel->name }}" has confirmed the booking.</p>
    
    <p>Booking Details:</p>
    <ul>
        <li>Id: {{ $booking->id }}</li>
        <li>Guest Name: {{ $booking->guest_name }}</li>
        <li>Guest Phone Number: {{ $booking->guest_phone }}</li>
        <li>Check-in Date: {{ $booking->checkin_date }}</li>
        <li>Check-out Date: {{ $booking->checkout_date }}</li>
    </ul>
</body>
</html>
