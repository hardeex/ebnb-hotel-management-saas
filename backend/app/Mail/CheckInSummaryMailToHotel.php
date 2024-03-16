<?php

namespace App\Mail;

use App\Models\CheckInRecord;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CheckInSummaryMailToHotel extends Mailable
{
    use Queueable, SerializesModels;

    public $hotelName;
    public $todayBookings;
    public $todayTotalAmount;
    public $roomNumber;
    public $todayPaymentMethod;
    public $todayTotalAmountPaid;
    public $cashTotal;
    public $chequeTotal;
    public $cardTotal;
    public $transferTotal;
    public $roomDetails; 

    public function __construct(
        $hotelName, 
        $todayBookings, 
        $todayTotalAmount, 
        $roomNumber, 
        $todayPaymentMethod,
        $todayTotalAmountPaid,
        $cashTotal, 
        $chequeTotal, 
        $cardTotal, 
        $transferTotal
    ) {
        $this->hotelName = $hotelName;
        $this->todayBookings = $todayBookings;
        $this->todayTotalAmount = $todayTotalAmount;
        $this->roomNumber = $roomNumber;
        $this->todayPaymentMethod = $todayPaymentMethod;
        $this->todayTotalAmountPaid = $todayTotalAmountPaid; 
        $this->cashTotal = $cashTotal;
        $this->chequeTotal = $chequeTotal;
        $this->cardTotal = $cardTotal;
        $this->transferTotal = $transferTotal;

          // Fetch room details with their prices
          $this->roomDetails = CheckInRecord::select('room_number', 'total_amount_paid')
          ->whereDate('created_at', today())
          ->get();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Check In Summary Mail To Hotel',
        );
    }

    public function content(): Content
    {
        return new Content();
    }

    public function build()
    {
        return $this->view('mail.checkin-summary-to-hotel')
            ->with([
                'hotelName' => $this->hotelName,
                'todayBookings' => $this->todayBookings,
                'todayTotalAmount' => $this->todayTotalAmount,
                'roomNumber' => $this->roomNumber,
                'todayPaymentMethod' => $this->todayPaymentMethod,
                'totalAmountPaid' => $this->todayTotalAmountPaid,
                'chequeTotal' => $this->chequeTotal,
                'cardTotal' => $this->cardTotal,
                'transferTotal' => $this->transferTotal,
                'roomDetails' => $this->roomDetails,
            ]);
    }

    public function attachments(): array
    {
        return [];
    }
}
