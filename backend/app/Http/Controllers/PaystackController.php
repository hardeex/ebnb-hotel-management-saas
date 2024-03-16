<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Booking;
use Illuminate\Support\Facades\Mail;
use App\Mail\PaymentConfirmation;

class PaystackController extends Controller
{
    public static function initializeTransaction($email, $amount, $reference)
    {
        $url = "https://api.paystack.co/transaction/initialize";
        
        $paymentAmountInKobo = $amount * 100;

        $response = Http::withToken('sk_test_f0582fdebee7b1e2ac507b2540ab733e491be377')
            ->post($url, [
                'email' => $email,
                'amount' => $paymentAmountInKobo,
                'reference' => $reference,
                'currency' => 'NGN',
                'callback_url' => 'http://localhost:5173/successfuly',
            ]);

        return $response->json();
    }

    public function verifyTransaction(Request $request)
    {
        $response = Http::withToken('sk_test_f0582fdebee7b1e2ac507b2540ab733e491be377')
            ->get("https://api.paystack.co/transaction/verify/{$request->reference}");

        $paystackResponse = $response->json();

        if ($paystackResponse['status'] === true && $paystackResponse['data']['status'] === 'success') {
            $booking = Booking::where('payment_reference', $request->reference)->first();

            if ($booking && $booking->payment_status !== 'paid') {
                $booking->update([
                    'payment_status' => 'paid',
                ]);

                $user = $booking['guest_name'];
                $hotel = $booking['hotel'];

                try {
                    Mail::to($booking['guest_email'])->send(new PaymentConfirmation($user, $booking, $hotel));
                    $room = $booking->room;
                    
                    $room->markAsUnavailable($booking->checkin_date, $booking->checkout_date);
                } catch (\Exception $err) {
                    return response()->json([
                        'status' => 500,
                        'message' => 'Could not send the payment confirmation email.',
                        'error' => $err,
                    ]);
                }

                return response()->json(['message' => 'Payment processed successfully']);
            } else {
                return response()->json(['message' => 'Payment already processed']);
            }
        }

        return response()->json(['error' => 'Payment verification failed'], 400);
    }

}

