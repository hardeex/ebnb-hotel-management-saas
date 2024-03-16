<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HotelImageController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaystackController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CheckInController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Register routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users/{id}', [AuthController::class, 'show']);

// Reset & forgot password routes
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);
Route::get('/reset-password', [PasswordResetController::class, 'checkTokenValidity']);
Route::post('/password/email',  [PasswordResetController::class, 'sendResetLinkEmail']);

// Verify email after register as a partner route
Route::get('/email/verify/{id}', [VerificationController::class, 'verify'])->name("verification.verify");
Route::get('/confirmation-email/{token}', [VerificationController::class, 'confirmationEmail'])->name('confirmation.email');
Route::get('/confirmation-email/id/{id}', [VerificationController::class, 'confirmationEmailById']);

// Hotels routes
Route::get('/hotels', [HotelController::class, 'index']); 
Route::get('/hotels/{id}', [HotelController::class, 'show']); 
Route::get('/hotels-by/{partner_id}', [HotelController::class, 'hotelByPartnerId']); 
Route::post('/hotels', [HotelController::class, 'create']); 
Route::post('/update-hotels/{id}', [HotelController::class, 'update']); 
Route::post('/update-verify-status/{hoteId}', [HotelController::class, 'updateVerify']);
Route::post('/delete-hotels/{id}', [HotelController::class, 'destroy']); 
Route::get('/hotels-locations/count', [HotelController::class, 'getAllLocationsWithImages']);
Route::get('/trending-destinations', [HotelController::class, 'getTrendingDestinationsByLocation']);
Route::get('/hotels-by-location', [HotelController::class, 'hotelByLocation']);
Route::get('/hotels/by-building-type/{buildingType}',[HotelController::class, 'getByBuildingType']);
Route::get('/not-verified', [HotelController::class, 'getNotVerifiedHotels']);
Route::get('/verified-hotels', [HotelController::class, 'getVerifiedHotels']);
Route::get('/get-hotels', [HotelController::class, 'getHotels']);
Route::get('/distinct-building-types',[HotelController::class, 'getDistinctBuildingTypes']);
Route::get('/inspected-hotels', [HotelController::class, 'getInspectedHotels']);

// Rooms routes
Route::get('/rooms/{hotelId}', [RoomController::class, 'index']); 
Route::post('/rooms', [RoomController::class, 'create']); 
Route::post('/room/{id}', [RoomController::class, 'update']); 
Route::post('/delete-room/{id}', [RoomController::class, 'destroy']); 
Route::get('/inspected-rooms', [RoomController::class, 'getInspectedRooms']);
Route::get('/list-available-rooms', [RoomController::class, 'searchHotels']);
Route::get('/all-rooms', [RoomController::class, 'allRooms']);
Route::get('/get-room/{id}', [RoomController::class, 'show']);
Route::get('/rooms-by-hotel/{hotel_id}', [RoomController::class, 'roomsByHotelId']);
Route::post('/inspected-room/move-manually/{roomId}', [RoomController::class, 'moveRoomManually']);
Route::delete('/inspected-room/remove-manually/{roomId}', [RoomController::class, 'removeRoomManually']);


// Bookings routes
Route::post('/bookings', [BookingController::class, 'createBooking']);
Route::post('/bookings-cancel/{bookingId}/cancel', [BookingController::class, 'cancelBooking']);
Route::get('/bookings', [BookingController::class, 'index']);
Route::get('/bookings/by-hotel/{hotelId}', [BookingController::class, 'bookingsByHotel']);
Route::get('/bookings/{bookingId}', [BookingController::class, 'getBookingById']);
Route::get('/nearby-hotels/{hotelId}',[BookingController::class, 'getNearbyHotels']);
Route::get('/booking-confirmations/{id}', [BookingController::class, 'getBookingConfirmation']);
Route::post('/booking-confirmations/{id}', [BookingController::class, 'updateBookingConfirmation']);
Route::get('/booking-confirmations', [BookingController::class, 'indexBookingConfirmations']);
Route::get('/booking-confirmations/by-hotel/{hotelId}', [BookingController::class, 'getBookingConfirmationsByHotelId']);
Route::get('/booked-rooms', [BookingController::class, 'getBookedRooms']);
Route::get('/booked-rooms/{hotel_id}', [BookingController::class, 'getBookedRoomsByHotelId']);
Route::post('/revenue-summary', [BookingController::class, 'getRevenueSummary']);
Route::post('/update-availability', [BookingController::class, 'updateRoomAvailability']);
Route::get('/get-rooms-to-be-available/{hotelId}', [BookingController::class, 'getRoomsToBeAvailable']);

// Payment route
Route::post('/payments/{bookingId}', [PaymentController::class, 'processPayment']);
Route::post('verify-payment', [PaystackController::class, 'verifyTransaction']);

// Reviews routes
Route::post('/reviews', [ReviewController::class, 'create']);
Route::get('/reviews/{hotelId}', [ReviewController::class, 'getReviewsByHotelId']);
Route::get('/all-reviews', [ReviewController::class, 'index']);
Route::put('/reviews/{id}', [ReviewController::class, 'update']); 
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']); 

// Hotel's images route
Route::post('/hotels/{hotelId}/images', [HotelImageController::class, 'upload']);
Route::get('/images/{hotelId}',  [HotelImageController::class, 'findImages']);
Route::post('/put-images/{hotelId}', [HotelImageController::class, 'update']);


// questions routes
Route::post('/ask-question', [QuestionController::class, 'askQuestion']);
Route::get('/questions', [QuestionController::class, 'index']);
Route::get('/question/by-hotel/{hotelId}', [QuestionController::class, 'questionsByHotel']);

// Disconts routes
Route::post('/apply-discount', [DiscountController::class, 'applyDiscount']);
Route::get('/discounts', [DiscountController::class, 'index']);
Route::get('/discounts/{id}', [DiscountController::class, 'show']);
Route::patch('/update-verification/{discountId}', [DiscountController::class, 'updateVerificationStatus']);
Route::get('/discounted-locations', [DiscountController::class, 'getDiscountedLocationsWithImages']);
Route::get('/discounted-hotels-by-location/{location}', [DiscountController::class, 'getDiscountedHotelsByLocation']);

// Likes routes
Route::post('/like', [LikeController::class, 'like']);
Route::get('/likes/{hotelId}', [LikeController::class, 'getLikesCount']);
 
// Checkin and Checkout Controller
Route::post('/check-in-records', [CheckInController::class, 'store']);
Route::get('/check-in-records', [CheckInController::class, 'index']);
Route::get('/check-in-records/{hotelId}', [CheckInController::class, 'findByHotelId']);
Route::get('/checkinrecords/{id}', [CheckInController::class, 'show']);
Route::delete('/check-in-records/{id}', [CheckInController::class, 'destroy'])->name('checkin.destroy');
Route::put('/check-in-records/{checkInRecord}', [CheckInController::class, 'update']);
Route::get('/search-user', [CheckInController::class, 'searchUser']);
Route::post('/checkout/{id}', [CheckInController::class, 'checkout'])->name('checkin.checkout');
Route::get('/check-in/record', [CheckInController::class, 'checkingRecord']);

// Inspected hotels routes
Route::post('/inspected-hotels/{hotelId}', [HotelController::class, 'createInspectedHotels']);
Route::delete('/inspected-hotels/{hotelId}', [HotelController::class, 'removeHotelManually']);
Route::get('/inspected-hotels-by-location', [HotelController::class, 'getInspectedHotelsByLocation']);
Route::get('/inspected-hotels-by-location/{location}', [HotelController::class, 'getInspectedHotelsBySpecificLocation']);