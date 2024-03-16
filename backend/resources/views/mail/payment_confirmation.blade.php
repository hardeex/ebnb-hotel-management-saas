<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
</head>
<body>
    <p>Hello {{ $user }},</p>
    <p>Your payment has been successfully confirmed.</p>
    <p>Hotel : {{ $hotel->name }}</p>
    <p>Address: {{ $hotel->adresse ?? 'N/A' }}</p>
    <p>Location: {{ $hotel->location ?? 'N/A' }}</p>
    <p>Booking ID: {{ $booking->id }}</p>
    <p>Check-in Date: {{ $booking->checkin_date }}</p>
    <p>Check-out Date: {{ $booking->checkout_date }}</p>
    <p>Total Payment: ₦{{ $booking->payment_amount }}</p>
    <p>Thank you for choosing our service!</p>
    <p>info@ebnb.com <br> +2347000555666</p>
</body>
</html>
