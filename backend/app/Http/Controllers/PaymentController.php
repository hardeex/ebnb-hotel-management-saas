<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\PaystackController;

class PaymentController extends Controller
{
    public function processPayment(Request $request, $bookingId)
    {
        $booking = Booking::find($bookingId);
    
        if (!$booking) {
            return response()->json(['error' => 'Booking not found'], 404);
        }
    
        $paymentDetails = $request->only(['guest_email', 'payment_amount', 'payment_method', 'payment_option', 'payment_reference']);
        
    
        if ($paymentDetails['payment_option'] === 'pay now') {
            $paystackResponse = PaystackController::initializeTransaction($paymentDetails['guest_email'], $paymentDetails['payment_amount'], $paymentDetails['payment_reference']);

            if ($paystackResponse['status'] === true) {
                
                $booking->update([
                    'payment_amount' => $paymentDetails['payment_amount'],
                    'payment_method' => $paymentDetails['payment_method'],
                    'payment_option' => $paymentDetails['payment_option'],
                    'payment_reference' => $paymentDetails['payment_reference'],
                ]);
            
                return response()->json($paystackResponse);
            } else {
                return response()->json(['error' => 'Payment initiation failed'], 400);
            }
            
        } else if ($paymentDetails['payment_option'] === 'pay at property') {
            $booking->update([
                'payment_option' => $paymentDetails['payment_option'],
                'payment_amount' => $paymentDetails['payment_amount'],
                'payment_method' => $paymentDetails['payment_method'],
                'payment_reference' => $paymentDetails['payment_reference'],
            ]);
    
            return response()->json(['message' => 'Payment processed successfully']);
        } else {
            return response()->json(['error' => 'Invalid payment option'], 400);
        }
    }
}
