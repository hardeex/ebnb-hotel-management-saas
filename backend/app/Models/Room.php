<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
     public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function isAvailable($checkIn, $checkOut)
    {
        $bookings = $this->bookings()->where(function ($query) use ($checkIn, $checkOut) {
            $query->where('checkin_date', '<', $checkOut)
                  ->where('checkout_date', '>', $checkIn);
        })->get();
    
        return $bookings->isEmpty();
    }

     public function availability()
    {
        return $this->hasMany(RoomAvailability::class);
    }

    public function markAsUnavailable($checkIn, $checkOut)
    {
        $this->update([
            'status' => 'Unavailable'
        ]);

        $this->availability()->create([
            'checkin_date' => $checkIn,
            'checkout_date' => $checkOut,
        ]);
    }

    public function checkInRecords()
    {
        return $this->hasMany(CheckInRecord::class);
    }

    public function checkInRecord()
    {
        return $this->hasOne(CheckInRecord::class, 'room_id');
    }


    public function markAsAvailable($checkinDate, $checkoutDate)
    {
        $this->update(['status' => 'Available']);

        $this->availability()->where(function ($query) use ($checkinDate, $checkoutDate) {
            $query->where('checkin_date', '>=', $checkinDate)
                ->where('checkout_date', '<=', $checkoutDate);
        })->delete();
    }
    

    protected $fillable = [
        'hotel_id',
        'price_per_night',
        'room_number',
        'image',
        'isPublish',
        'status',
        'room_name',
        'room_type1',
        'room_type2',
        'room_type3',
        'breakfast',
        'lunch',
        'dinner',
        'size_of_beds',
    ];
    
    
}
