<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Symfony\Component\HttpKernel\Log\Logger;

class PaymentConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $booking;
    public $hotel;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $booking, $hotel)
    {
        $this->user = $user;
        $this->booking = $booking;
        $this->hotel = $hotel;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Confirmation',
        );
    }

    public function build()
    {
       
        return $this->view('mail.payment_confirmation')
                    ->with(['booking' => $this->booking, 'user' => $this->user, 'hotel' => $this->hotel]);
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            
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
