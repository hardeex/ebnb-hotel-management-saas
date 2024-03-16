<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Notification</title>
</head>
<body>
    <div>
        <h2>Booking Notification</h2>
        <p>You have a new booking at your hotel:</p>

        <p>You have a booking from {{ $booking->checkin_date }} to {{ $booking->checkout_date }} guest {{ $booking->guest_name }} phone number {{ $booking->guest_phone }} for an amount of {{ $booking->payment_amount }}. Confirm or decline now: {{ $confirmationLink }}. or call us at our main line +2347000555666.</p>

        <p>Please confirm or decline the booking through the <a href="{{ $confirmationLink }}">confirmation link</a> or contact the guest for further details.</p>

        <p>If you have any questions, feel free to contact the guest at the provided phone number.</p>

        <p>+2347000555666</p>
        <p>Thank you!</p>
    </div>
</body>
</html>
