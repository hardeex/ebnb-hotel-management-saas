<?php

namespace App\Console\Commands;

use App\Http\Controllers\TwilioController;
use App\Models\Booking;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\CheckOutReminderMail;

class SendCheckOutReminders extends Command
{
    protected $signature = 'app:send-check-out-reminders';
    protected $description = 'Send check-out reminders to hotels';

    protected $twilioController;

    public function __construct(TwilioController $twilioController)
    {
        parent::__construct();
        $this->twilioController = $twilioController;
    }

    public function handle()
    {
        $oneDayAhead = now()->addDay();
        $bookings = Booking::where('checkout_date', $oneDayAhead)->get();

        foreach ($bookings as $booking) {
            $hotelPhoneNumber = $booking->hotel->contact;

            if (substr($hotelPhoneNumber, 0, 3) !== '234') {
                $hotelPhoneNumber = ltrim($hotelPhoneNumber, '0');
                $hotelPhoneNumber = '234' . $hotelPhoneNumber;
            }

            $reminderMessage = "Dear hotel, a guest is checking out soon. Booking ID: {$booking->id}, Guest: {$booking->guest_name}, Check-out date: {$booking->checkout_date}";

            // Send SMS
            $this->twilioController->sendSms($hotelPhoneNumber, $reminderMessage);

            // Send Email
            $this->sendCheckOutReminderEmail($booking);
        }

        $this->info('Check-out reminders sent successfully.');
    }

    protected function sendCheckOutReminderEmail(Booking $booking)
    {
        try {
            $recipientEmail = $booking->hotel->email;

            Mail::to($recipientEmail)->send(new CheckOutReminderMail($booking));

            $this->info("Check-out reminder email sent to $recipientEmail");
        } catch (\Exception $e) {
            $this->error("Error sending email: " . $e->getMessage());
        }
    }
}
