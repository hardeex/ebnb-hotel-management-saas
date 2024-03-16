<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'partner_id',
        'adresse',
        'location',
        'reasons_to_choose',
        'contact',
        'email',
        'whatsapp',
        'website',
        'status',
        'bathroom',
        'food_and_drink',
        'safety_and_security',
        'bedroom',
        'outdoors',
        'internet',
        'general',
        'parking',
        'kitchen',
        'transportation',
        'room_amenities',
        'front_desk',
        'living_area',
        'accessibility',
        'media_and_technology',
        'cleaning_services',
        'health_and_wellness_facilities',
        'business_facilities',
        'languages',
        'building_type',
        'number_of_rooms',
        'checkin_date',
        'checkin_time',
        'price_per_night',
        'managers_phone_number',
        'owners_phone_number',
        'aircondition',
        'living_room',
        'nearby',
        'electricity_24hrs',
        'front_desk_24hrs',
        'guest',
        'heating',
        'bar',
        'restaurant',
        'lounge',
        'terrace',
        'garden',
        'luggage_storage',
        'indoor_poor',
        'outdoor_poor',
        'hot_tub_jacuzzi',
        'sauna',
        'steam_room',
        'spa_wellness_center',
        'hamman',
        'fitness_center_gym',
        'elevator_lift',
        'cctv_cemera_security',
        'security_guard',
        'parking_nearby',
        'mobile_phone_reception',
        'none_smoking_public_area',
        'rooms_facilities_for_disable',
        'valet_parking',
        'safety_deposit_boxes',
        'in_room_safe',
        'fireplace',
        'meeting_banquests_facilities',
        'breakfast',
        'buffet_breakfast',
        'babysitting',
        'laundry',
        'car_hire',
        'room_service_24hrs',
        'room_service_limited_hours',
        'dry_cleaning',
        'business_center',
        'fax',
        'photocopy',
        'concierge_service',
        'airport_suttle',
        'electronic_room_key',
        'pets_allowed',
        'family_rooms',
        'soundproofed_rooms',
        'atm_machine',
        'money_exchange',
        'casino',
        'outdoor_dinning',
        'parking_security',
        'surveillance',
        'tea_facilities',
        'cubicle_shower',
        'bath_tube',
        'flat_screen_tv',
        'wake_up_alarm',
        'services_charge',
        'emergency_exit',
        'hair_dryer',
        'first_aid_box',
        'mobile_police',
        'room_panic_system',
        'warning_alarm',
        'swing_bar_lock',
        'auto_door_guard',
        'chain_door_guard',
        'door_pechole',
        'finger_print_lock',
        'key_card',
        'door_motion_sensor',
        'smoke_detective',
        'individual_room_decoder',
        'smoke_room',
        'bathroom_amenities',
        'twing_bed',
        'room_parlour_suite',
        'account_number',
        'tax_pin_number',
        'registration_number',
        'landmark',
        'gps',
        'managers_name',
        'managers_position',
        'bank_name',
        'account_name',
        'swift_code',
        'payment_accepted',
        'payment_currency',
        'top_attraction',
        'closest_airports',
        'checkout_time',
    ];
    
    protected $casts = [
        'shortlet_service' => 'boolean',
    ];
    
      
    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function images()
    {
        return $this->hasMany(HotelImage::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function likes()
    {
        return $this->hasMany(HotelLike::class, 'hotel_id');
    }

}
