<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CheckInRecordMailToHotel extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
  
     public $checkInRecord;
    public $hotelName;

    public function __construct($checkInRecord, $hotelName)
    {
        $this->checkInRecord = $checkInRecord;
        $this->hotelName = $hotelName;
    }
 
    /**
     * Get the message envelope .
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Check-In Notification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content();
    }

    public function build()
    {
        return $this->view('mail.checkin-record-to-hotel')
            ->with([
                'checkInRecord' => $this->checkInRecord,
                'hotelName' => $this->hotelName,
            ]);
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
