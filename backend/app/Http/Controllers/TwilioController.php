<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client; 

class TwilioController extends Controller
{
    protected $twilioService; 


    public function sendSms($to, $message)
    {
        $twilioSid = env('TWILIO_SID');
        $twilioAuthToken = env('TWILIO_AUTH_TOKEN');
        $twilioPhoneNumber = env('TWILIO_PHONE_NUMBER');

        $twilio = new Client($twilioSid, $twilioAuthToken);

        try {
            $message = $twilio->messages->create(
                $to,
                [
                    'from' => $twilioPhoneNumber,
                    'body' => $message,
                ]
            );

            echo "SMS sent successfully to $to\n";
        } catch (\Exception $e) {
            echo "Error sending SMS: " . $e->getMessage() . "\n";
        }
    }
    
}
