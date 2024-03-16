<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckInRecord extends Model
{
    use HasFactory;

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class); 
    }

    protected $table = 'check_in_records';
    

    protected $fillable = [
        'address',
        'selfie',
        'hotel_id',
        'tel_number',
        'emergency_number',
        'identity',
        'id_number',
        'number_of_people',
        'nationality',
        'country_of_residence',
        'duration',
        'price_per_night',
        'email',
        'name',
        'deposit',
        'balance',
        'check_in_date',
        'check_in_time',
        'check_out',
        'check_out_date',
        'check_out_time',
        'total_amount_paid',
        'restaurant_bar_bill',
        'travelling_from',
        'travelling_to',
        'additional_facilities',
        'other_comments',
        'ref',
        'hotel_location',
        'branch_name',
        'signature',
        'customer_signature',
        'received_by',
        'booking_date',
        'payment_method',
        'booking_method',
        'purpose_of_visit',
        'other_purpose_of_visit',
        'room_number',
        'accommodation_type',
        'room_id',
        'is_checkout',
        'is_discount', 
        'discount_price', 
        'status',
        'revenue_date',
        'total_amount'
    ];
    
}
