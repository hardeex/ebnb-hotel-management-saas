<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body>
    <h1>Booking Confirmation</h1>

    <p>Dear {{ $booking->guest_name }},</p>

    <p>Thank you for choosing {{ $hotel->name }} for your stay! Your booking has been confirmed, and we are excited to welcome you.</p>

    <p>Booking Details:</p>
    <ul>
        <li>Hotel: {{ $hotel->name }}</li>
        <li>Address: {{ $hotel->adresse ?? 'N/A' }}</li>
        <li>Location: {{ $hotel->location ?? 'N/A' }}</li>
        <li>Check-in Date: {{ $booking->checkin_date }}</li>
        <li>Check-out Date: {{ $booking->checkout_date }}</li>
    </ul>

    <p>If you have any questions or need further assistance, feel free to contact us. We look forward to making your stay enjoyable!</p>

    <p>info@ebnb.com <br>+2347000555666</p>
    <p>Best regards,<br>{{ $hotel->name }} Team</p>

</body>
</html>