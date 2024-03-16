<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CheckInRecord;
use Illuminate\Support\Facades\Mail;
use App\Models\Room;
use App\Http\Controllers\Ebulksms;
use App\Mail\CheckInRecordMailToGuest;
use App\Mail\CheckInRecordMailToHotel;
use App\Mail\CheckInSummaryMailToHotel;
use App\Mail\CheckOutNotificationToGuest;
use App\Mail\CheckOutNotificationToHotel;
use App\Models\Hotel;
use Carbon\Carbon;
use App\Models\User;


class CheckInController extends Controller
{
 

    public function store(Request $request)
    { 
        try {
            $request->merge(['booking_date' => now()]);

            $validatedData = $request->validate([
                'hotel_id' => 'required|exists:hotels,id',
                'room_id' => 'required',
                'selfie' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'address' => 'nullable|string',
                'tel_number' => 'nullable|string',
                'emergency_number' => 'nullable|string',
                'identity' => 'nullable|string',
                'id_number' => 'nullable|string',
                'number_of_people' => 'nullable|string',
                'nationality' => 'nullable|string',
                'country_of_residence' => 'nullable|string',
                'duration' => 'nullable|string',
                'price_per_night' => 'nullable|numeric',
                'email' => 'nullable|email',
                'name' => 'nullable|string',
                'check_in_date' => 'nullable|date',
                'check_in_time' => 'nullable|date_format:H:i:s',
                'check_out' => 'nullable|date|after_or_equal:' . now()->toDateString(),
                'check_out_date' => 'nullable|date',
                'check_out_time' => 'nullable|date_format:H:i:s',
                'total_amount_paid' => 'nullable|numeric',
                'restaurant_bar_bill' => 'nullable|numeric',
                'travelling_from' => 'nullable|string',
                'travelling_to' => 'nullable|string',
                'additional_facilities' => 'nullable|string',
                'other_comments' => 'nullable|string',
                'ref' => 'nullable|string',
                'hotel_location' => 'nullable|string',
                'branch_name' => 'nullable|string',
                'signature' => 'nullable|string',
                'customer_signature' => 'nullable|string',
                'received_by' => 'nullable|string',
                'booking_date' => 'required|date',
                'payment_method' => 'required|in:cash,cheque,card,transfer',
                'booking_method' => 'required|in:phone,internet,agent,in_person',
                'purpose_of_visit' => 'required|in:holiday,business,others',
                'other_purpose_of_visit' => 'nullable|string',
                'room_number' => 'nullable|string', 
                'accommodation_type' => 'nullable|string', 
                'is_discount' => 'nullable|in:yes,no',
            ]);

            if ($request->hasFile('selfie')) {
                $file = $request->file('selfie');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('selfies'), $fileName);
                $validatedData['selfie'] = 'selfies/' . $fileName;
            }
            $validatedData['status'] = 'closed'; 
            $checkoutDateFromFrontend = $request->input('check_out');
            $validatedData['revenue_date'] = $checkoutDateFromFrontend;
            
            $checkInRecord = CheckInRecord::create($validatedData);
            $room = Room::where('id', $validatedData['room_id'])->first();
            $hotel = Hotel::findOrFail($validatedData['hotel_id']);
            
            if ($room) {
                $checkOutDate = $validatedData['check_out'] ?? now();
                $room->markAsUnavailable($validatedData['check_in_date'], $checkOutDate);

                 // Trigger SMS Notification to Hotel
             $this->sendSmsNotificationToHotel(
                $hotel->contact,
                $validatedData['name'],
                $validatedData['room_number'],
                $validatedData['check_in_date'],
                $validatedData['check_out'],
                $validatedData['accommodation_type'],
                $validatedData['total_amount_paid'],
                '+2347000555666'
            );

                // Trigger Email Notification to Guest
                $this->sendEmailNotificationToGuest($validatedData['email'], $checkInRecord);

                // Trigger Email Notification to Hotel
                    // Calculate number of bookings and total amount earned for today
                $todayBookings = CheckInRecord::whereDate('created_at', today())->count();
                $todayTotalAmount = CheckInRecord::whereDate('created_at', today())->sum('total_amount_paid');

                // Send email to hotel with booking information
                $this->sendEmailNotificationToHotel(
                    $hotel->email,
                    $validatedData['name'],
                    $validatedData['room_number'],
                    $validatedData['check_in_date'],
                    $validatedData['check_out'],
                    $validatedData['accommodation_type'],
                    $validatedData['total_amount_paid'],
                    '+2347000555666'
                );

              $this->sendEmailSummaryToHotel(
                    $hotel->email,
                    $hotel->name,
                    $todayBookings,
                    $todayTotalAmount,
                    $validatedData['room_number'],
                    $validatedData['total_amount_paid'],
                    $validatedData['payment_method'],
                    
                );

              // Trigger SMS Notification to Guest
            $this->sendSmsNotificationToGuest(
                $validatedData['tel_number'],
                $validatedData['name'],
                $validatedData['check_in_date'],
                $validatedData['check_out'],
                $validatedData['room_number'],
                $validatedData['accommodation_type'],
                $validatedData['total_amount_paid'],
                '+2347000555666',
                $hotel->name,
            );
            
              // Trigger Daily Summary SMS
        $this->sendDailySummarySms(
            $hotel->contact,
            $hotel->name,
            $validatedData['check_in_date'],
            $validatedData['check_out'],
            $validatedData['room_number'],
            $validatedData['accommodation_type'],
            $validatedData['total_amount_paid']
        );

                return response()->json(['message' => $checkInRecord], 200);
            }
            
            return response()->json(['message' => 'Room was not found',], 400);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Check-in record creation failed', 'error' => $th->getMessage()], 400);
        }
    }

    function sendDailySummarySms(
        $hotelPhoneNumber,
        $hotelName,
        $checkInDate,
        $checkOutDate,
        $roomNumber,
        $accommodationType,
        $totalAmountPaid
    ) {
        try {
            // Calculate total amount for each payment method
            $cashTotal = CheckInRecord::where('payment_method', 'cash')->whereDate('created_at', today())->sum('total_amount_paid');
            $chequeTotal = CheckInRecord::where('payment_method', 'cheque')->whereDate('created_at', today())->sum('total_amount_paid');
            $cardTotal = CheckInRecord::where('payment_method', 'card')->whereDate('created_at', today())->sum('total_amount_paid');
            $transferTotal = CheckInRecord::where('payment_method', 'transfer')->whereDate('created_at', today())->sum('total_amount_paid');
    
            // Calculate number of bookings and total amount earned for today
            $todayBookings = CheckInRecord::whereDate('created_at', today())->count();
            $todayTotalAmount = CheckInRecord::whereDate('created_at', today())->sum('total_amount_paid');
    
            // Create the SMS message
            $smsMessage = "Daily Summary:\n";
            $smsMessage .= "Cash : ₦{$cashTotal}\n";
            $smsMessage .= "Cheque : ₦{$chequeTotal}\n";
            $smsMessage .= "POS : ₦{$cardTotal}\n";
            $smsMessage .= "Transfer : ₦{$transferTotal}\n";
            $smsMessage .= "Total Bookings: {$todayBookings}\n";
            $smsMessage .= "Total Amount Earned: ₦{$todayTotalAmount}\n";
    
            // Continue with sending the SMS using $smsMessage
            $smsController = new Ebulksms();
            $json_url = "https://api.ebulksms.com:8080/sendsms.json";
            $username = 'ayussuccess@gmail.com';
            $apikey = 'c1891f9702ef124dc4469531489692ae2184b50c';
            $flash = 0;
            $sendername = $hotelName;
    
            $messageText = "{$accommodationType}, {$roomNumber},\nAmount Paid: ₦{$totalAmountPaid}.\nFor info, call {$hotelPhoneNumber}.\n\n{$smsMessage}";
    
            $recipients = $hotelPhoneNumber;
            $smsController->useHTTPGet($json_url, $username, $apikey, $flash, $sendername, $messageText, $recipients);
    
            return response()->json(['message' => 'SMS notification sent successfully'], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => 'Error sending SMS notification', 'error' => $exception->getMessage()], 500);
        }
    }
    

    private function sendSmsNotificationToGuest($phoneNumber, $guestName, $checkInDate, $checkOutDate, $roomNumber, $accommodationType, $totalAmountPaid, $hotelPhoneNumber, $hotelName)
    {
        try {
            $smsController = new Ebulksms();
            $json_url = "https://api.ebulksms.com:8080/sendsms.json";
            $username = 'ayussuccess@gmail.com';
            $apikey = 'c1891f9702ef124dc4469531489692ae2184b50c';
            $flash = 0;
            $sendername = $hotelName;

            $messageText = "Receipt {$guestName}
                Check-in Date: {$checkInDate}, 
                Check-out: {$checkOutDate}, 
                Room Type: {$accommodationType}, Room: {$roomNumber}, 
                Amount Paid: {$totalAmountPaid}. 
                For info, call {$hotelPhoneNumber}.";

            $recipients = $phoneNumber;
            $smsController->useHTTPGet($json_url, $username, $apikey, $flash, $sendername, $messageText, $recipients);
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Failed to send SMS to guest', $exception], 500);
        }
    }
 
    private function sendSmsNotificationToHotel($phoneNumber, $guestName, $roomNumber, $checkInDate, $checkOutDate, $accommodationType, $amountPaid, $mainLine)
    {
        $smsController = new Ebulksms();
        $json_url = "https://api.ebulksms.com:8080/sendsms.json";
        $username = 'ayussuccess@gmail.com';
        $apikey = 'c1891f9702ef124dc4469531489692ae2184b50c';
        $flash = 0;
        $sendername = 'EBNB';

        $messageText = "New Check-in: {$guestName} booked room {$roomNumber} from {$checkInDate} to {$checkOutDate} ({$accommodationType}) paid {$amountPaid}. Contact: {$phoneNumber} or our main line {$mainLine}.";

        $recipients = $phoneNumber;
       $resilt = $smsController->useHTTPGet($json_url, $username, $apikey, $flash, $sendername, $messageText, $recipients);
       return $resilt;
    }

    protected function sendEmailNotificationToHotel($hotelEmail, $hotelName, $checkInRecord)
    {
        try {
            $mailData = [
                'name' => $checkInRecord->name,
                'room_number' => $checkInRecord->room_number,
                'check_in_date' => $checkInRecord->check_in_date,
                'check_out' => $checkInRecord->check_out,
                'accommodation_type' => $checkInRecord->accommodation_type,
                'total_amount_paid' => $checkInRecord->total_amount_paid,
                'contact_number' => '+2347000555666',
            ];

            Mail::to($hotelEmail)->send(new CheckInRecordMailToHotel($mailData, $hotelName));
            return response()->json(['message' => "Email notification sent successfully to $hotelEmail"], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error sending email notification to hotel', 'error' => $e->getMessage()], 500);
        }
    }

    protected function sendEmailSummaryToHotel(
        $hotelEmail,
        $hotelName,
        $todayBookings,
        $todayTotalAmount,
        $roomNumber,
        $todayTotalAmountPaid,
        $todayPaymentMethod,
    ) {
        try {
            // Calculate total amount for each payment method
            $cashTotal = CheckInRecord::where('payment_method', 'cash')->whereDate('created_at', today())->sum('total_amount_paid');
            $chequeTotal = CheckInRecord::where('payment_method', 'cheque')->whereDate('created_at', today())->sum('total_amount_paid');
            $cardTotal = CheckInRecord::where('payment_method', 'card')->whereDate('created_at', today())->sum('total_amount_paid');
            $transferTotal = CheckInRecord::where('payment_method', 'transfer')->whereDate('created_at', today())->sum('total_amount_paid');
    
            // Pass the payment method to the mailer
            Mail::to($hotelEmail)->send(new CheckInSummaryMailToHotel(
                $hotelName, 
                $todayBookings, 
                $todayTotalAmount, 
                $roomNumber, 
                $todayPaymentMethod,
                $todayTotalAmountPaid,
                $cashTotal, 
                $chequeTotal, 
                $cardTotal, 
                $transferTotal, 
            ));
    
            return response()->json(['message' => "Summary Email notification sent successfully to $hotelEmail"], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error sending summary email notification to hotel', 'error' => $e->getMessage()], 500);
        }
    } 
    
    protected function sendEmailNotificationToGuest($guestEmail, CheckInRecord $checkInRecord)
    {
        try {
            Mail::to($guestEmail)->send(new CheckInRecordMailToGuest($checkInRecord));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error sending email notification to guest', 'error' => $e->getMessage()], 500);
        }
    } 

    public function update(Request $request, CheckInRecord $checkInRecord)
    {
        $validatedData = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'room_id' => 'required',
            'selfie' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'nullable|string',
            'tel_number' => 'nullable|string',
            'emergency_number' => 'nullable|string',
            'identity' => 'nullable|string',
            'id_number' => 'nullable|string',
            'number_of_people' => 'nullable|string',
            'nationality' => 'nullable|string',
            'country_of_residence' => 'nullable|string',
            'duration' => 'nullable|string',
            'price_per_night' => 'nullable|numeric',
            'email' => 'nullable|email',
            'name' => 'nullable|string',
            'deposit' => 'nullable|numeric',
            'balance' => 'nullable|numeric',
            'check_in_date' => 'nullable|date',
            'check_in_time' => 'nullable|date_format:H:i:s',
            'check_out' => 'nullable|date',
            'check_out_date' => 'nullable|date',
            'check_out_time' => 'nullable|date_format:H:i:s',
            'total_amount_paid' => 'nullable|numeric',
            'restaurant_bar_bill' => 'nullable|numeric',
            'travelling_from' => 'nullable|string',
            'travelling_to' => 'nullable|string',
            'additional_facilities' => 'nullable|string',
            'other_comments' => 'nullable|string',
            'ref' => 'nullable|string',
            'hotel_location' => 'nullable|string',
            'branch_name' => 'nullable|string',
            'signature' => 'nullable|string',
            'customer_signature' => 'nullable|string',
            'received_by' => 'nullable|string',
            'booking_date' => 'required|date',
            'payment_method' => 'required|in:cash,cheque,card,transfer',
            'booking_method' => 'required|in:phone,internet,agent,in_person',
            'purpose_of_visit' => 'required|in:holiday,business,others',
            'other_purpose_of_visit' => 'nullable|string',
            'room_number' => 'nullable|string', 
            'accommodation_type' => 'nullable|string', 
            'is_discount' => 'nullable|boolean',
            'discount_price' => 'nullable|numeric',
        ]);
    
        if ($request->hasFile('selfie')) {
            $file = $request->file('selfie');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('selfies'), $fileName);
    
            $checkInRecord->selfie = 'selfies/' . $fileName;
            $checkInRecord->save();
        }
    
        $checkInRecord->update($validatedData);
    
        $hotel = $checkInRecord->hotel;
        $room = $checkInRecord->room;
    
        if ($hotel && $room) {
            $room->markAsUnavailable($checkInRecord->check_in_date, $checkInRecord->check_out_date);
    
            // Trigger SMS Notification to Hotel
            $this->sendSmsNotificationToHotel(
                $hotel->contact,
                $validatedData['name'],
                $validatedData['room_number'],
                $validatedData['check_in_date'],
                $validatedData['check_out_date'],
                $validatedData['accommodation_type'],
                $validatedData['total_amount_paid'],
                '08100680153'
            );
    
            $this->sendEmailNotificationToHotel(
                $hotel->email,
                $checkInRecord->name,
                $checkInRecord->check_in_date,
                $checkInRecord->check_out_date,
                $checkInRecord->accommodation_type,
                $checkInRecord->total_amount_paid,
                $checkInRecord->customer_to_pay,
                '08100680153'
            );
    
            $this->sendEmailNotificationToGuest($checkInRecord->email, $checkInRecord);
        }
    
        return response()->json(['message' => 'Check-in record updated successfully', 'data' => $checkInRecord], 200);
    }

    public function index()
    {
        try {
            $checkInRecords = CheckInRecord::latest('created_at')->get();
    
            return response()->json($checkInRecords, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving check-in records', 'error' => $e->getMessage()], 500);
        }
    }    

    public function findByHotelId($hotelId)
    {
        try {
            $checkInRecords = CheckInRecord::where('hotel_id', $hotelId)
                ->latest('created_at')
                ->get();
    
            return response()->json($checkInRecords, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving check-in records by hotel ID', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $checkInRecord = CheckInRecord::findOrFail($id);

            return response()->json($checkInRecord, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Check-in record not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }
    
    public function destroy($id)
    {
        try {
            $checkInRecord = CheckInRecord::findOrFail($id);
            $checkInRecord->delete();

            return response()->json(['message' => 'Check-in record deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Check-in record not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }

    public function checkout(Request $request, $id)
    {
        try {
            $checkInRecord = CheckInRecord::with('hotel')->findOrFail($id);
            
            if ($checkInRecord->is_checkout) {
                return response()->json(['message' => 'Already checked out'], 200);
            }

            $checkOutDateTime = now();
            $checkInRecord->update([
                'check_out' => $checkOutDateTime,
                'is_checkout' => true,
                'status' => 'open',
            ]);
            

            $room = Room::find($checkInRecord->room_id);

            if ($room) {
                $room->update(['status' => 'Available']);
            }

            // Trigger Email Notification to Hotel for checkout
             $this->sendEmailNotificationOnCheckoutToHotel(
                $checkInRecord->hotel->email,
                $checkInRecord->guest_name,
                $checkInRecord->check_out,
                '+2347000555666',
                $checkInRecord
            );

            // Trigger Email Notification to Guest for checkout
            $hotelEmail = $this->sendEmailNotificationOnCheckoutToGuest($checkInRecord->email, $checkInRecord);

            return response()->json(['message' => 'Checkout process completed successfully', $hotelEmail ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Checkout process failed', 'message' => $e->getMessage()], 500);
        }
    }
    
    protected function sendEmailNotificationOnCheckoutToHotel($hotelEmail, $guestName, $checkOutDate, $helpPhoneNumber, CheckInRecord $checkInRecord)
    {
        try {
            Mail::to($hotelEmail)->send(new CheckOutNotificationToHotel($checkInRecord));
            return response()->json(['message' => "Email notification sent successfully to $hotelEmail"], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error sending email notification on checkout to hotel', 'error' => $e->getMessage()], 500);
        }
    }

    protected function sendEmailNotificationOnCheckoutToGuest($guestEmail, CheckInRecord $checkInRecord)
    {
        try {
            Mail::to($guestEmail)->send(new CheckOutNotificationToGuest($checkInRecord));
            return response()->json(['message' => 'Email notification sent successfully to guest'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error sending email notification on checkout to guest', 'error' => $e->getMessage()], 500);
        }
    } 

    public function searchUser(Request $request)
    {
    try {
        $searchTerm = $request->input('search_term');
        $hotelId = $request->input('hotel_id');

        // Search for a user based on email, name, or telephone number within a specific hotel
        $user = CheckInRecord::where('hotel_id', $hotelId)
            ->where(function ($query) use ($searchTerm) {
                $query->where('email', $searchTerm)
                    ->orWhere('name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('tel_number', $searchTerm);
            })
            ->first();

        if (!$user) {
            return response()->json(['message' => 'User not found for the specified hotel'], 404);
        }

        $responseData = [
            'hotel_id' => optional($user->hotel)->id, 
            'address' => $user->address,
            'tel_number' => $user->tel_number,
            'emergency_number' => $user->emergency_number,
            'identity' => $user->identity,
            'id_number' => $user->id_number,
            'nationality' => $user->nationality,
            'country_of_residence' => $user->country_of_residence,
            'email' => $user->email,
            'name' => $user->name,
            'restaurant_bar_bill' => $user->restaurant_bar_bill,
            'selfie' => $user->selfie,
        ];

        return response()->json($responseData, 200);
    } catch (\Throwable $th) {
        return response()->json(['message' => 'Search failed', 'error' => $th->getMessage()], 500);
    }
    }

    public function checkingRecord(Request $request)
    {
        try {
            $searchTerm = $request->input('search_term');
            $hotelId = $request->input('hotel_id');

            // Search for users based on email, name, or telephone number within a specific hotel
            $users = CheckInRecord::where('hotel_id', $hotelId)
                ->where(function ($query) use ($searchTerm) {
                    $query->where('email', $searchTerm)
                        ->orWhere('name', 'like', '%' . $searchTerm . '%')
                        ->orWhere('tel_number', $searchTerm);
                })
                ->get();

            $responseData = [];
            $totalAmountPaid = 0;

            if ($users->isNotEmpty()) {
                foreach ($users as $user) {
                    $responseData[] = [
                        'id' => $user->id,
                        'hotel_id' => optional($user->hotel)->id,
                        'hotel_name' => optional($user->hotel)->name,
                        'room_number' => $user->room_number,
                        'check_in_date' => $user->check_in_date,
                        'check_out' => $user->check_out,
                        'selfie' => $user->selfie,
                        'total_amount_paid' => $user->total_amount_paid,
                    ];

                    $totalAmountPaid += $user->total_amount_paid;
                }

                return response()->json([
                    'data' => $responseData,
                    'total_amount_paid' => $totalAmountPaid,
                ], 200);
            } else {
                return response()->json(['data' => [], 'total_amount_paid' => 0], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Search failed', 'error' => $th->getMessage()], 500);
        }
    }

    
}
