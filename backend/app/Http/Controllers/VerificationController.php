<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ConfirmationEmail;
use App\Models\BookingConfirmation;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request){

        if(!$request->hasValidSignature()){
            return response()->json(['msg' => 'Invalid/Expired url provided'],401);
        }

        $user = User::findOrFail($user_id);
        
        if(!$user->hasVerifiedEmail()){
            $user->markEmailAsVerified();
        }

        else{
            return response()->json([
                'status' => 400,
                'message' => "Email has already verified"
            ],400);
        }

        $redirectUrl = 'https://ebnb.essential.ng/list-property/' . $user_id;

        return redirect($redirectUrl);

    }

    protected function isBookingConfirmationExpired($confirmation)
    {
        return now()->greaterThanOrEqualTo($confirmation->expires_at);
    }

    public function confirmationEmail($token)
    {
        try {
            $confirmation = BookingConfirmation::where('confirmation_token', $token)->first();
    
            if ($confirmation) {
                if (!$this->isBookingConfirmationExpired($confirmation) && !$confirmation->is_confirmed) {
                    $booking = $confirmation->booking;
    
                    if ($booking) {
                        // Update Booking record
                        $booking->update(['isBookingConfirm' => true]);
    
                        // Update BookingConfirmation record
                        $confirmation->update(['is_confirmed' => true]);
    
                        $hotel = Hotel::find($confirmation->hotel_id);
                        $booking = $confirmation->booking;
    
                        if ($hotel && $booking) {
                            Mail::mailer('smtp')->to('mustaphamubarakmustapha@gmail.com')->send(new ConfirmationEmail($hotel, $booking));
                            return redirect('https://ebnb.essential.ng/confirmation-success');
                        } else {
                            return response()->json([
                                'status' => 404,
                                'message' => 'Hotel or booking not found.',
                            ]);
                        }
                    } else {
                        return response()->json([
                            'status' => 404,
                            'message' => 'Booking not found.',
                        ]);
                    }
                } elseif ($confirmation->is_confirmed) {
                    return redirect('https://ebnb.essential.ng/already-confirmed');
                } elseif ($this->isBookingConfirmationExpired($confirmation)) {
                    return redirect('https://ebnb.essential.ng/booking-expired');
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Booking confirmation not found.',
                ]);
            }
        } catch (\Exception $err) {
            return response()->json([
                'status' => 500,
                'message' => 'Could not process the booking confirmation.',
                'error' => $err,
            ]);
        }
    }

    public function confirmationEmailById($id)
    {
        try {
            $confirmation = BookingConfirmation::findOrFail($id);

            if (!$this->isBookingConfirmationExpired($confirmation) && !$confirmation->is_confirmed) {
                $hotel = Hotel::find($confirmation->hotel_id);
                $booking = $confirmation->booking;

                if ($hotel && $booking) {
                    $confirmation->update(['is_confirmed' => true]);
                    $booking->update(['isBookingConfirm' => true]);
                    $hotelContactEmail = $hotel->email;
                    Mail::mailer('smtp')->to($hotelContactEmail)->send(new ConfirmationEmail($hotel, $booking));
                    
                    return response()->json([
                        'status' => 200,
                        'message' => 'Confirmation email sent successfully.',
                    ]);
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Hotel or booking not found.',
                    ]);
                }
            } elseif ($confirmation->is_confirmed) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Booking already confirmed.',
                ]);
            } elseif ($this->isBookingConfirmationExpired($confirmation)) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Booking confirmation expired.',
                ]);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Booking confirmation not found.',
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'status' => 500,
                'message' => 'Could not process the booking confirmation.',
                'error' => $err->getMessage(),
            ]);
        }
    }
   
}
