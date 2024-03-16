<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
// use Illuminate\Mail\Mailables\Content;
// use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CheckOutNotificationToHotel extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $checkInRecord;


    public function __construct($checkInRecord)
    {
        $this->checkInRecord = $checkInRecord;
    }

    /**
     * Get the message envelope.
     */
   

    /**
     * Get the message content definition.
     */
    public function build()
    {
        return $this->subject('Check-Out Notification')->view('mail.checkoutNotificationToHotel');
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
