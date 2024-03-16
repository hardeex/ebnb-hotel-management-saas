<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CheckOutNotificationToGuest extends Mailable
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
    public function build()
    {
        return $this->subject('Check Out Notification To Guest')
                    ->view('mail.checkoutNotificationToGuest')
                    ->with(['checkInRecord' => $this->checkInRecord]);
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.checkoutNotificationToGuest',
        );
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
