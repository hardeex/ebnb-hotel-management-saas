<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Check-In Notification</title>
</head>
<body>
    <p>Dear {{ $hotelName }},</p>

    <p>You have received a new booking.</p>

    <p>Your guest, {{ $checkInRecord->name }}, checks in soon.</p>
    <p>Check-in date: {{ $checkInRecord->check_in_date }}</p>
    <p>Check-out date: {{ $checkInRecord->check_out }}</p>
    <p>Room type: {{ $checkInRecord->accommodation_type }}</p>
    <p>Amount: ₦{{ $checkInRecord->total_amount_paid }}</p>
    <p>Help phone number: +2347000555666</p>

    <p>Thank you for providing excellent service!</p>

    <p>Best regards,<br>
    {{ $hotelName }}</p>
</body> 
</html>
