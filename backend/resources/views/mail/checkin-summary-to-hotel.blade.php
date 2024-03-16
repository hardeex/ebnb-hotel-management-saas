<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Check-In Summary Notification</title>
</head>
<body>
    <p>Dear {{ $hotelName }},</p>

    <p>You have received a summary of today's check-ins.</p>
    <p>Number of bookings today: {{ $todayBookings }}</p>
    <p>Total Amount Paid for this booking: ₦{{ $todayTotalAmountPaid }}</p>
    
    <p>Room Number: {{ $roomNumber }}</p>
    <p>Room Details:</p>
    <ul>
        @foreach($roomDetails as $room)
            <li>Room {{ $room->room_number }} - Price: ₦{{ $room->total_amount_paid }}</li>
        @endforeach
    </ul>
    
    <p>Payment Method Details:</p>
    <ul>
        <li>Cash: ₦{{ $cashTotal }}</li>
        <li>Cheque: ₦{{ $chequeTotal }}</li>
        <li>POS: ₦{{ $cardTotal }}</li>
        <li>Transfer: ₦{{ $transferTotal }}</li>
    </ul>
    <p>Total amount earned today: ₦{{ $todayTotalAmount }}</p>
    <p>Thank you for providing excellent service!</p>
    <p>Best regards,<br>[Your Sender's Name]</p>
</body>
</html>
