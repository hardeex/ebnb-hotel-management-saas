<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation as BookingConfirmationMail;
use App\Mail\BookingNotificationToHotel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB; 
use App\Models\BookingConfirmation;
use App\Models\CheckInRecord;
use Carbon\Carbon;
use App\Http\Controllers\Ebulksms;

class BookingController extends Controller
{
    public function createBooking(Request $request)
    {
        DB::beginTransaction();

        $validator = Validator::make($request->all(), [
            'room_id' => 'required|integer|exists:rooms,id',
            'guest_name' => 'required|string',
            'hotel_id' => 'required|integer|exists:hotels,id',
            'guest_email' => 'required|email',
            'guest_phone' => 'nullable|string',
            'checkin_date' => 'required|date',
            'checkout_date' => 'required|date|after:checkin_date',
            'num_adults' => 'integer|nullable',
            'num_children' => 'integer|nullable',
            'payment_amount' => 'required|numeric', 
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $bookingData = $request->only([
            'room_id', 'guest_name', 'hotel_id',
            'guest_email', 'guest_phone', 'checkin_date',
            'checkout_date', 'num_adults', 'num_children', 'payment_amount',
        ]);

        $room = Room::find($bookingData['room_id']);
        $hotel = Hotel::find($bookingData['hotel_id']);

        if (!$hotel || !$room) {
            return response()->json(['error' => 'Hotel or room not found'], 404);
        }

        if (!$room || !$room->isAvailable($bookingData['checkin_date'], $bookingData['checkout_date'])) {
            return response()->json(['error' => 'Room is not available'], 400);
        }

        $checkoutDateFromFrontend = $request->input('checkout_date');
        $booking = Booking::create(array_merge($bookingData, [
            'payment_status' => 'unpaid',
            'status' => 'booked',
            'revenue_date' => $checkoutDateFromFrontend,
            'isBookingConfirm' => false,
        ]));

        $room->markAsunavailable($bookingData['checkin_date'], $bookingData['checkout_date']);
        $hotelPhoneNumber = $hotel->contact;

        try {
            $confirmationToken = Str::random(40);
            BookingConfirmation::create([
                'booking_id' => $booking->id,
                'hotel_id' => $hotel->id,
                'confirmation_token' => $confirmationToken,
                'expires_at' => Carbon::now()->addHour(),
            ]);

            $confirmation = route('confirmation.email', ['token' => $confirmationToken]);
            $messageText = "You have a booking from {$bookingData['checkin_date']} to {$bookingData['checkout_date']} guest {$bookingData['guest_name']} phone number {$bookingData['guest_phone']} for an amount of {$bookingData['payment_amount']}. Confirm or decline now: {$confirmation}. or call us at our main line +2347000555666.";

            Mail::to($bookingData['guest_email'])->send(new BookingConfirmationMail($booking, $hotel));
            Mail::to($hotel->email)->send(new BookingNotificationToHotel($booking, $confirmation));

            
            // Send SMS notification to the hotel
            $smsController = new Ebulksms();
            $json_url = "https://api.ebulksms.com:8080/sendsms.json";
            $username = 'ayussuccess@gmail.com';
            $apikey = 'c1891f9702ef124dc4469531489692ae2184b50c';
            $flash = 0;
            $sendername = 'EBNB'; 

            $confirmationLink = route('confirmation.email', ['token' => $confirmationToken]);
            $messageText = "You have a booking from {$bookingData['checkin_date']} to {$bookingData['checkout_date']} guest {$bookingData['guest_name']} phone number {$bookingData['guest_phone']} for an amount of {$bookingData['payment_amount']}. Confirm or decline now: {$confirmationLink}. or call us at our main line +2347000555666.";

            $recipients = $hotelPhoneNumber;
            $smsController->useHTTPGet($json_url, $username, $apikey, $flash, $sendername, $messageText, $recipients);

            DB::commit();

            return response()->json($booking);
        } catch (\Exception $err) {
            return $err;
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => 'Could not send the sms or email.',
                'error' => $err,
            ]);
        }

        // The return statement should be outside the try-catch block
        return response()->json($booking);
    }

    public function cancelBooking($bookingId)
    {
        $booking = Booking::find($bookingId);
    
        if (!$booking) {
            return response()->json(['error' => 'Booking not found'], 404);
        }
    
        if ($booking->canBeCanceled()) {
            $hotel = optional($booking->room)->hotel;
    
            if ($hotel) {
                $hotel->decrement('length_of_booking');
            }
      
            $room = $booking->room;
    
            if ($room) {
                $room->update(['status' => 'Available']);
                $booking->update([
                    'checkin_date' => null,
                    'checkout_date' => null,
                    'status' => 'canceled',
                ]);
            }
    
            return response()->json(['success' => true, 'message' => 'Booking has been canceled.']);
        } else {
            return response()->json(['error' => 'Booking cannot be canceled at this time.'], 400);
        }
    } 
    
    public function index(Request $request)
    {
        $query = Booking::query();

        if ($request->filled('guest_id')) {
            $query->where('guest_id', $request->input('guest_id'));
        }

        if ($request->filled('room_id')) {
            $query->where('room_id', $request->input('room_id'));
        }

        if ($request->filled('hotel_id')) {
            $query->where('hotel_id', $request->input('hotel_id'));
        }

        $query->whereNotNull('payment_reference');
        $query->latest('created_at'); 

        $bookings = $query->get();

        return response()->json(['bookings' => $bookings]);
    }  
   
    public function bookingsByHotel(Request $request, $hotelId)
    {
        $bookings = Booking::where('hotel_id', $hotelId)->get();

        return response()->json( $bookings);
    }

    public function updateBookingConfirmation(Request $request, $id)
    {
        $bookingConfirmation = BookingConfirmation::find($id);

        if (!$bookingConfirmation) {
            return response()->json(['error' => 'BookingConfirmation not found'], 404);
        }

        // Validate and update fields as needed
        $validator = Validator::make($request->all(), [
            // Add validation rules for fields you want to update
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Update the fields
        $bookingConfirmation->update($request->all());

        return response()->json(['message' => 'BookingConfirmation updated successfully']);
    }

    public function getBookingConfirmation($id)
    {
        $bookingConfirmation = BookingConfirmation::with(['booking', 'hotel'])
            ->find($id);
    
        if (!$bookingConfirmation) {
            return response()->json(['error' => 'BookingConfirmation not found'], 404);
        }
    
        $booking = $bookingConfirmation->booking;
        $hotel = $bookingConfirmation->hotel;
    
        $checkinDate = $booking->checkin_date;
        $checkoutDate = $booking->checkout_date;
        $hotelName = $hotel->name;
        $hotelContact = $hotel->contact;
    
        return response()->json([
            'id' => $bookingConfirmation->id,
            'is_confirmed' => $bookingConfirmation->is_confirmed,
            'expires_at' => $bookingConfirmation->expires_at,
            'checkin_date' => $checkinDate,
            'checkout_date' => $checkoutDate,
            'hotel_name' => $hotelName,
            'hotel_contact' => $hotelContact,  
        ]);
    }

    public function indexBookingConfirmations()
    {
        $bookingConfirmations = BookingConfirmation::with(['booking', 'hotel'])
            ->latest('created_at')
            ->get();
    
        $result = $bookingConfirmations->map(function ($confirmation) {
            return [
                'id' => $confirmation->id,
                'is_confirmed' => $confirmation->is_confirmed,
                'expires_at' => $confirmation->expires_at,
                'checkin_date' => optional($confirmation->booking)->checkin_date,
                'checkout_date' => optional($confirmation->booking)->checkout_date,
                'hotel_id' => $confirmation->hotel->id, // Include hotel_id
                'hotel_name' => $confirmation->hotel->name,
                'hotel_contact' => $confirmation->hotel->contact,
            ];
        });
    
        return response()->json($result);
    }
    

    public function getBookedRooms(Request $request)
    {
        try {
            $request->validate([
                'hotel_id' => 'required|exists:hotels,id',
                'end_date' => 'required|date',
            ]);

            $hotelId = $request->input('hotel_id');
            $endDate = Carbon::parse($request->input('end_date'));

            $checkInBookedRooms = CheckInRecord::where('hotel_id', $hotelId)
            ->whereDate('check_out', '=', $endDate->toDateString())
            // ->orWhereDate('check_in_date', '=', $endDate->toDateString()) // Exact match on check_in_date
            ->get();
        
        $bookingBookedRooms = Booking::where('hotel_id', $hotelId)
            ->whereDate('checkout_date', '=', $endDate->toDateString())
            // ->orWhereDate('checkin_date', '=', $endDate->toDateString()) // Exact match on checkin_date
            ->get();
        
            $allBookedRooms = $checkInBookedRooms->merge($bookingBookedRooms);

            $roomDetails = $allBookedRooms->map(function ($item) {
                if ($item->room->status === 'Unavailable') {
                    return [
                        'id' => $item->room->id,
                        'room_number' => $item->room->room_number,
                        'check_in_date' => $item->checkin_date ?? $item->check_in_date, 
                        'checkout_date' => $item->checkout_date ?? $item->check_out, 
                    ];
                } else {
                    return null;
                }
            })->filter();

            return response()->json($roomDetails);
        } catch (\Exception $exception) {
            return response()->json(['error' => "Please select a valid date to check room availability."], 500);
        }
    }

    public function getBookedRoomsByHotelId(Request $request, $hotelId)
    {
    try {
    $checkInBookedRooms = CheckInRecord::where('hotel_id', $hotelId)
        ->get();

    $bookingBookedRooms = Booking::where('hotel_id', $hotelId)
        ->get();

    $allBookedRooms = $checkInBookedRooms->merge($bookingBookedRooms);

    $roomDetails = $allBookedRooms->filter(function ($item) {
        return $item->room->status === 'Unavailable';
    })->groupBy(function ($item) {
        return $item->room->room_type;
    })->map(function ($rooms, $roomType) {
        return [
            'roomtype' => $roomType,
            'typeCount' => count($rooms),
        ];
    })->values()->toArray();

    $result = ['result' => $roomDetails];

    return response()->json($result);
    } catch (\Exception $exception) {
        return response()->json(['error' => "Failed to retrieve booked rooms."], 500);
    }
    }
    

    private function calculateRevenueForPeriod($hotelId, $startDate, $endDate)
    {   
        // Check-in records
        $checkInBookedRooms = CheckInRecord::where('hotel_id', $hotelId)
            ->whereBetween('revenue_date', [$startDate, $endDate])
            ->get();
    
        // Confirmed Bookings
        $confirmedBookingBookedRooms = Booking::where('hotel_id', $hotelId)
            ->whereBetween('revenue_date', [$startDate, $endDate])
            ->where('isBookingConfirm', true)
            ->get();
    
        // Merge both collections
        $allBookedRooms = $checkInBookedRooms->merge($confirmedBookingBookedRooms);
    
        // Calculate total revenue
        $totalRevenue = $allBookedRooms->sum(function ($room) {
            if ($room instanceof CheckInRecord) {
                return $room->total_amount_paid;
            } elseif ($room instanceof Booking) {
                return $room->payment_amount;
            }
            return 0;
        });
    
        return $totalRevenue;
    }
    
    
    public function getRevenueSummary(Request $request)
    {
        try {
            $request->validate([
                'hotel_id' => 'required|exists:hotels,id',
                'period' => 'required|in:today,yesterday,this_week,last_week,this_month,last_month,last_six_months',
            ]);
    
            $hotelId = $request->input('hotel_id');
            $period = $request->input('period');
    
            // Calculate date ranges based on the selected period
            $today = Carbon::today();
            $startDate = $endDate = null;
    
            switch ($period) {
                case 'today':
                    $startDate = $endDate = $today;
                    break;
                case 'yesterday':
                    $startDate = Carbon::yesterday()->startOfDay();
                    $endDate = Carbon::yesterday()->endOfDay();
                    break;
                case 'this_week':
                    $startDate = $today->startOfWeek();
                    $endDate = $today;
                    break;
                case 'last_week':
                    $startDate = $today->startOfWeek()->subWeek();
                    $endDate = $today->startOfWeek()->subDay();
                    break;
                case 'this_month':
                    $startDate = $today->startOfMonth();
                    $endDate = $today;
                    break;
                case 'last_month':
                    $startDate = $today->startOfMonth()->subMonth();
                    $endDate = $today->startOfMonth()->subDay();
                    break;
                case 'last_six_months':
                    $startDate = $today->subMonths(5)->startOfMonth();
                    $endDate = $today;
                    break;
            }
            
            
    
            // Calculate revenue for the selected period
            $revenue = $this->calculateRevenueForPeriod($hotelId, $startDate, $endDate);
    
            $result = [
                'revenue' => $revenue,
            ];
    
            return response()->json($result);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }
    


}




