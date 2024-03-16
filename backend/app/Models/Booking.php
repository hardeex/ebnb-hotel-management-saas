<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
    protected $fillable = [
        'room_id',
        'hotel_id',
        'guest_name', 
        'guest_email', 
        'checkin_date',
        'checkout_date',
        'num_adults',
        'num_children',
        'status',
        'payment_status',
        'guest_phone',
        'payment_option',
        'payment_amount',
        'payment_reference',
        'payment_method',
        'revenue_date',
        'isBookingConfirm'
    ];

    public function canBeCanceled()
    {
        return $this->checkout_date > now();
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotel_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'guest_id');
    }

    public function bookingConfirmation()
{
    return $this->hasOne(BookingConfirmation::class);
}

    
}
