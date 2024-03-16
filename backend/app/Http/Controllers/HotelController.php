<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\InspectedHotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HotelController extends Controller
{
    public function create(Request $request)
    {
        
        $rules = [
            'name' => 'required|string|max:255',
            'partner_id' => 'required|integer|exists:users,id',
            'adresse' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'reasons_to_choose' => 'string|max:255|nullable',
            'contact' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'required|string|max:255',
            'website' => 'url|max:255|nullable',
            'status' => 'required|in:Open,Closed',
            'bathroom' => 'string|max:255|nullable',
            'food_and_drink' => 'string|max:255|nullable',
            'safety_and_security' => 'string|max:255|nullable',
            'bedroom' => 'string|max:255|nullable',
            'outdoors' => 'string|max:255|nullable',
            'internet' => 'string|max:255|nullable',
            'general' => 'string|max:255|nullable',
            'parking' => 'string|max:255|nullable',
            'kitchen' => 'string|max:255|nullable',
            'transportation' => 'string|max:255|nullable',
            'room_amenities' => 'string|max:255|nullable',
            'front_desk' => 'string|max:255|nullable',
            'living_area' => 'string|max:255|nullable',
            'accessibility' => 'string|max:255|nullable',
            'media_and_technology' => 'string|max:255|nullable',
            'cleaning_services' => 'string|max:255|nullable',
            'health_and_wellness_facilities' => 'string|max:255|nullable',
            'business_facilities' => 'string|max:255|nullable',
            'languages' => 'string|max:255|nullable',
            'building_type' => 'string|max:255|nullable',
            'number_of_rooms' => 'integer|nullable',
            'checkin_date' => 'nullable|date_format:Y-m-d',
            'checkin_time' => 'nullable|date_format:H:i:s',
            'price_per_night' => 'required|numeric',
            // 'latitude' => 'required|numeric',
            // 'longitude' => 'required|numeric',
            'aircondition' => 'string|max:255|nullable',
            'living_room' => 'string|max:255|nullable',
            'nearby' => 'string|max:255|nullable',
            'electricity_24hrs' => 'string|max:255|nullable',
            'front_desk_24hrs' => 'string|max:255|nullable',
            'guest' => 'string|max:255|nullable',
            'heating' => 'string|max:255|nullable',
            'bar' => 'string|max:255|nullable',
            'restaurant' => 'string|max:255|nullable',
            'lounge' => 'string|max:255|nullable',
            'terrace' => 'string|max:255|nullable',
            'garden' => 'string|max:255|nullable',
            'luggage_storage' => 'string|max:255|nullable',
            'indoor_poor' => 'string|max:255|nullable',
            'outdoor_poor' => 'string|max:255|nullable',
            'hot_tub_jacuzzi' => 'string|max:255|nullable',
            'sauna' => 'string|max:255|nullable',
            'steam_room' => 'string|max:255|nullable',
            'spa_wellness_center' => 'string|max:255|nullable',
            'hamman' => 'string|max:255|nullable',
            'fitness_center_gym' => 'string|max:255|nullable',
            'elevator_lift' => 'string|max:255|nullable',
            'cctv_cemera_security' => 'string|max:255|nullable',
            'security_guard' => 'string|max:255|nullable',
            'parking_nearby' => 'string|max:255|nullable',
            'mobile_phone_reception' => 'string|max:255|nullable',
            'none_smoking_public_area' => 'string|max:255|nullable',
            'rooms_facilities_for_disable' => 'string|max:255|nullable',
            'valet_parking' => 'string|max:255|nullable',
            'safety_deposit_boxes' => 'string|max:255|nullable',
            'in_room_safe' => 'string|max:255|nullable',
            'fireplace' => 'string|max:255|nullable',
            'meeting_banquests_facilities' => 'string|max:255|nullable',
            'breakfast' => 'string|max:255|nullable',
            'buffet_breakfast' => 'string|max:255|nullable',
            'babysitting' => 'string|max:255|nullable',
            'laundry' => 'string|max:255|nullable',
            'car_hire' => 'string|max:255|nullable',
            'room_service_24hrs' => 'string|max:255|nullable',
            'room_service_limited_hours' => 'string|max:255|nullable',
            'dry_cleaning' => 'string|max:255|nullable',
            'business_center' => 'string|max:255|nullable',
            'fax' => 'string|max:255|nullable',
            'photocopy' => 'string|max:255|nullable',
            'concierge_service' => 'string|max:255|nullable',
            'airport_suttle' => 'string|max:255|nullable',
            'electronic_room_key' => 'string|max:255|nullable',
            'pets_allowed' => 'string|max:255|nullable',
            'family_rooms' => 'string|max:255|nullable',
            'soundproofed_rooms' => 'string|max:255|nullable',
            'atm_machine' => 'string|max:255|nullable',
            'money_exchange' => 'string|max:255|nullable',
            'casino' => 'string|max:255|nullable',
            'outdoor_dinning' => 'string|max:255|nullable',
            'parking_security' => 'string|max:255|nullable',
            'surveillance' => 'string|max:255|nullable',
            'tea_facilities' => 'string|max:255|nullable',
            'cubicle_shower' => 'string|max:255|nullable',
            'bath_tube' => 'string|max:255|nullable',
            'flat_screen_tv' => 'string|max:255|nullable',
            'wake_up_alarm' => 'string|max:255|nullable',
            'services_charge' => 'string|max:255|nullable',
            'emergency_exit' => 'string|max:255|nullable',
            'hair_dryer' => 'string|max:255|nullable',
            'first_aid_box' => 'string|max:255|nullable',
            'mobile_police' => 'string|max:255|nullable',
            'room_panic_system' => 'string|max:255|nullable',
            'warning_alarm' => 'string|max:255|nullable',
            'swing_bar_lock' => 'string|max:255|nullable',
            'auto_door_guard' => 'string|max:255|nullable',
            'chain_door_guard' => 'string|max:255|nullable',
            'door_peephole' => 'string|max:255|nullable',
            'finger_print_lock' => 'string|max:255|nullable',
            'key_card' => 'string|max:255|nullable',
            'door_motion_sensor' => 'string|max:255|nullable',
            'smoke_detective' => 'string|max:255|nullable',
            'individual_room_decoder' => 'string|max:255|nullable',
            'smoke_room' => 'string|max:255|nullable',
            'bathroom_amenities' => 'string|max:255|nullable',
            'twin_bed' => 'string|max:255|nullable',
            'room_parlour_suite' => 'string|max:255|nullable',
            'account_number' => 'string|max:255|nullable',
            'tax_pin_number' => 'string|max:255|nullable',
            'registration_number' => 'string|max:255|nullable',
            'landmark' => 'string|max:255|nullable',
            'gps' => 'string|max:255|nullable',
            'managers_name' => 'string|max:255|nullable',
            'managers_position' => 'string|max:255|nullable',
            'bank_name' => 'string|max:255|nullable',
            'account_name' => 'string|max:255|nullable',
            'swift_code' => 'string|max:255|nullable',
            'payment_accepted' => 'in:cash,credit_card,debit_card,online_payment,cheque,other',
            'payment_currency' => 'in:ngn,usd,eur,gbp,other',
            'top_attraction' => 'string|max:255|nullable',
            'closest_airports' => 'string|max:255|nullable',
        ];  
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $hotel = new Hotel;
        $hotel->fill($request->all());
        
        $hotel->save();
    
        return response()->json($hotel, 201);
    }
    
    public function update(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);
        
        $rules = [
            'name' => 'required|string|max:255',
            'partner_id' => 'required|integer|exists:users,id',
            'adresse' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'reasons_to_choose' => 'string|max:255|nullable',
            'contact' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'required|string|max:255',
            'website' => 'url|max:255|nullable',
            'status' => 'required|in:Open,Closed',
            'bathroom' => 'string|max:255|nullable',
            'food_and_drink' => 'string|max:255|nullable',
            'safety_and_security' => 'string|max:255|nullable',
            'bedroom' => 'string|max:255|nullable',
            'outdoors' => 'string|max:255|nullable',
            'internet' => 'string|max:255|nullable',
            'general' => 'string|max:255|nullable',
            'parking' => 'string|max:255|nullable',
            'kitchen' => 'string|max:255|nullable',
            'transportation' => 'string|max:255|nullable',
            'room_amenities' => 'string|max:255|nullable',
            'front_desk' => 'string|max:255|nullable',
            'living_area' => 'string|max:255|nullable',
            'accessibility' => 'string|max:255|nullable',
            'media_and_technology' => 'string|max:255|nullable',
            'cleaning_services' => 'string|max:255|nullable',
            'health_and_wellness_facilities' => 'string|max:255|nullable',
            'business_facilities' => 'string|max:255|nullable',
            'languages' => 'string|max:255|nullable',
            'building_type' => 'string|max:255|nullable',
            'number_of_rooms' => 'integer|nullable',
            'checkin_date' => 'nullable|date_format:Y-m-d',
            'checkin_time' => 'nullable|date_format:H:i:s',
            'price_per_night' => 'required|numeric',
            // 'latitude' => 'required|numeric',
            // 'longitude' => 'required|numeric',
            'aircondition' => 'string|max:255|nullable',
            'living_room' => 'string|max:255|nullable',
            'nearby' => 'string|max:255|nullable',
            'electricity_24hrs' => 'string|max:255|nullable',
            'front_desk_24hrs' => 'string|max:255|nullable',
            'guest' => 'string|max:255|nullable',
            'heating' => 'string|max:255|nullable',
            'bar' => 'string|max:255|nullable',
            'restaurant' => 'string|max:255|nullable',
            'lounge' => 'string|max:255|nullable',
            'terrace' => 'string|max:255|nullable',
            'garden' => 'string|max:255|nullable',
            'luggage_storage' => 'string|max:255|nullable',
            'indoor_poor' => 'string|max:255|nullable',
            'outdoor_poor' => 'string|max:255|nullable',
            'hot_tub_jacuzzi' => 'string|max:255|nullable',
            'sauna' => 'string|max:255|nullable',
            'steam_room' => 'string|max:255|nullable',
            'spa_wellness_center' => 'string|max:255|nullable',
            'hamman' => 'string|max:255|nullable',
            'fitness_center_gym' => 'string|max:255|nullable',
            'elevator_lift' => 'string|max:255|nullable',
            'cctv_cemera_security' => 'string|max:255|nullable',
            'security_guard' => 'string|max:255|nullable',
            'parking_nearby' => 'string|max:255|nullable',
            'mobile_phone_reception' => 'string|max:255|nullable',
            'none_smoking_public_area' => 'string|max:255|nullable',
            'rooms_facilities_for_disable' => 'string|max:255|nullable',
            'valet_parking' => 'string|max:255|nullable',
            'safety_deposit_boxes' => 'string|max:255|nullable',
            'in_room_safe' => 'string|max:255|nullable',
            'fireplace' => 'string|max:255|nullable',
            'meeting_banquests_facilities' => 'string|max:255|nullable',
            'breakfast' => 'string|max:255|nullable',
            'buffet_breakfast' => 'string|max:255|nullable',
            'babysitting' => 'string|max:255|nullable',
            'laundry' => 'string|max:255|nullable',
            'car_hire' => 'string|max:255|nullable',
            'room_service_24hrs' => 'string|max:255|nullable',
            'room_service_limited_hours' => 'string|max:255|nullable',
            'dry_cleaning' => 'string|max:255|nullable',
            'business_center' => 'string|max:255|nullable',
            'fax' => 'string|max:255|nullable',
            'photocopy' => 'string|max:255|nullable',
            'concierge_service' => 'string|max:255|nullable',
            'airport_suttle' => 'string|max:255|nullable',
            'electronic_room_key' => 'string|max:255|nullable',
            'pets_allowed' => 'string|max:255|nullable',
            'family_rooms' => 'string|max:255|nullable',
            'soundproofed_rooms' => 'string|max:255|nullable',
            'atm_machine' => 'string|max:255|nullable',
            'money_exchange' => 'string|max:255|nullable',
            'casino' => 'string|max:255|nullable',
            'outdoor_dinning' => 'string|max:255|nullable',
            'parking_security' => 'string|max:255|nullable',
            'surveillance' => 'string|max:255|nullable',
            'tea_facilities' => 'string|max:255|nullable',
            'cubicle_shower' => 'string|max:255|nullable',
            'bath_tube' => 'string|max:255|nullable',
            'flat_screen_tv' => 'string|max:255|nullable',
            'wake_up_alarm' => 'string|max:255|nullable',
            'services_charge' => 'string|max:255|nullable',
            'emergency_exit' => 'string|max:255|nullable',
            'hair_dryer' => 'string|max:255|nullable',
            'first_aid_box' => 'string|max:255|nullable',
            'mobile_police' => 'string|max:255|nullable',
            'room_panic_system' => 'string|max:255|nullable',
            'warning_alarm' => 'string|max:255|nullable',
            'swing_bar_lock' => 'string|max:255|nullable',
            'auto_door_guard' => 'string|max:255|nullable',
            'chain_door_guard' => 'string|max:255|nullable',
            'door_peephole' => 'string|max:255|nullable',
            'finger_print_lock' => 'string|max:255|nullable',
            'key_card' => 'string|max:255|nullable',
            'door_motion_sensor' => 'string|max:255|nullable',
            'smoke_detective' => 'string|max:255|nullable',
            'individual_room_decoder' => 'string|max:255|nullable',
            'smoke_room' => 'string|max:255|nullable',
            'bathroom_amenities' => 'string|max:255|nullable',
            'twin_bed' => 'string|max:255|nullable',
            'room_parlour_suite' => 'string|max:255|nullable',
            'account_number' => 'string|max:255|nullable',
            'tax_pin_number' => 'string|max:255|nullable',
            'registration_number' => 'string|max:255|nullable',
            'landmark' => 'string|max:255|nullable',
            'gps' => 'string|max:255|nullable',
            'managers_name' => 'string|max:255|nullable',
            'managers_position' => 'string|max:255|nullable',
            'bank_name' => 'string|max:255|nullable',
            'account_name' => 'string|max:255|nullable',
            'swift_code' => 'string|max:255|nullable',
            'payment_accepted' => 'in:cash,credit_card,debit_card,online_payment,cheque,other',
            'payment_currency' => 'in:ngn,usd,eur,gbp,other',
            'top_attraction' => 'string|max:255|nullable',
            'closest_airports' => 'string|max:255|nullable',
        ];    
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $request->merge(['verify' => false]);
        
        $data = $request->all();
        $hotel->update($data);
    
        return response()->json($hotel, 200);
    }

    public function updateVerify(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'verify' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $hotel->update(['verify' => $request->input('verify')]);

        return response()->json($hotel, 200);
    }

    public function getVerifiedHotels()
    {
        $verifiedHotels = Hotel::where('verify', true)->get();

        return response()->json($verifiedHotels, 200);
    }

    public function index(Request $request)
    {
        $paidHotels = Hotel::where('payment_status', 'Paid')->get();
        $notPaidHotels = Hotel::where('payment_status', '!=', 'Paid')->get();
        $hotels = $paidHotels->concat($notPaidHotels);
    
        if ($hotels->isEmpty()) {
            return response()->json([], 404);
        }
    
        foreach ($hotels as $hotel) {
            $images = $this->findImages($hotel->id);
    
            // Check if $images is not empty before accessing its first element
            if ($images->isNotEmpty()) {
                $hotel->image = $images[0];
            }
        }
    
        return response()->json($hotels, 200);
    }

    public function getNotVerifiedHotels()
    {
        $notVerifiedHotels = Hotel::where('verify', false)->get();

        return response()->json($notVerifiedHotels, 200);
    }

    public function show($id)
    {
        try {
            $hotel = Hotel::with('rooms')->findOrFail($id);
            return response()->json($hotel, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Hotel not found'], 404);
        }
    }
 
    public function destroy($id)
    {
        $hotel = Hotel::find($id);

        if (!$hotel) {
            return response()->json(['message' => 'Hotel not found'], 404);
        }

        $hotel->delete();

        return response()->json(['message' => 'Hotel deleted'], 204);
    }

    public function getNearbyHotels(Request $request, $hotelId)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');
        $radius = 10;
    
        $nearbyHotels = Hotel::select('*')
            ->selectRaw(
                '(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude))) AS distance',
                [$latitude, $longitude, $latitude]
            )
            ->where('id', '!=', $hotelId) 
            ->whereRaw('distance < ?', [$radius])
            ->orderBy('distance')
            ->get();
    
        return response()->json(['nearby_hotels' => $nearbyHotels]);
    }

    public function hotelByLocation()
    {
        $location = request('location');

        
        $paidHotels = Hotel::where('location', $location)
            ->where('payment_status', 'Paid')
            ->get();

        $notPaidHotels = Hotel::where('location', $location)
            ->where('payment_status', '!=', 'Paid')
            ->get();

        $hotels = $paidHotels->concat($notPaidHotels);

        if ($hotels->isEmpty()) {
            return response()->json(['message' => 'No hotels found for the specified location'], 404);
        }

        $hotelsWithImages = [];
        foreach ($hotels as $hotel) {
            $images = $this->findImages($hotel->id);

            if ($images->isNotEmpty()) {
                $randomImage = $images->random();
                $hotelData = $hotel->toArray();
                $hotelData['image'] = $randomImage->image_path;
                $hotelsWithImages[] = $hotelData;
            } else {
                $hotelsWithImages[] = $hotel->toArray();
            }
        }

        return response()->json($hotelsWithImages, 200);
    }

    public function hotelByPartnerId($partner_id)
    {
        $hotels = Hotel::where('partner_id', $partner_id)
            ->with('rooms')
            ->get();

        if ($hotels->isEmpty()) {
            return response()->json([], 404);
        }

        return response()->json($hotels, 200);
    }

    public function getByBuildingType(Request $request, $buildingType)
    {
        $rules = [
            'building_type' => 'required|string|max:255',
        ];
    
        $validator = Validator::make(['building_type' => $buildingType], $rules);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $selectedLocation = $request->query('location'); 
    
        $paidHotelsQuery = Hotel::where('building_type', $buildingType)
            ->where('payment_status', 'Paid');
    
        $notPaidHotelsQuery = Hotel::where('building_type', $buildingType)
            ->where('payment_status', '!=', 'Paid');
    
        // Check if a location is selected, and filter hotels accordingly
        if ($selectedLocation) {
            $paidHotelsQuery->where('location', $selectedLocation);
            $notPaidHotelsQuery->where('location', $selectedLocation);
        }
    
        $paidHotels = $paidHotelsQuery->get();
        $notPaidHotels = $notPaidHotelsQuery->get();
    
        $hotels = $paidHotels->concat($notPaidHotels);
    
        $hotelsWithImages = [];
    
        foreach ($hotels as $hotel) {
            $images = $this->findImages($hotel->id);
    
            $hotelData = $hotel->toArray();
    
            if ($images->isNotEmpty()) {
                $randomImage = $images[2];
                $hotelData['image'] = $randomImage->image_path;
            }
    
            if ($hotel->location) {
                $hotelData['location'] = $hotel->location;
            }
    
            $hotelsWithImages[] = $hotelData;
        }
    
        return response()->json($hotelsWithImages, 200);
    }

    public function findImages($hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $images = $hotel->images;
        return $images;
    }

    public function getAllLocationsWithImages()
    {
        $locations = Hotel::distinct('location')->pluck('location');

        $statesWithHotels = [];
        foreach ($locations as $state) {
            $count = Hotel::where('location', $state)->count();

            if ($count > 0) {
                
                $hotel = Hotel::where('location', $state)->first();
                $images = $this->findImages($hotel->id);
                $firstImage = !empty($images) ? $images[1] : null;

                $statesWithHotels[] = [
                    "state" => $state,
                    "image" => $firstImage, 
                    "count" => $count,
                ];
            }
        }

        return response()->json($statesWithHotels, 200);
    } 
   
    public function getTrendingDestinationsByLocation()
    {
        $statesWithHotels = [];
        $locations = Hotel::distinct('location')->pluck('location');
        
        foreach ($locations as $state) {
            $hotelsInState = Hotel::where('location', $state)->get();
    
            if ($hotelsInState->isNotEmpty()) {
                $firstHotel = $hotelsInState->first();
                $firstImage = $this->findImages($firstHotel->id);
                $firstImage = !empty($firstImage) ? $firstImage[2] : null;
    
                $statesWithHotels[] = [
                    'state' => $state,
                    'hotelCount' => $hotelsInState->count(),
                    'hotels' => $hotelsInState,
                    'image' => [
                        'hotelId' => $firstHotel->id,
                        'image' => $firstImage,
                    ],
                ];
            }
        }
    
        return response()->json( $statesWithHotels, 200);
    }

    public function getDistinctBuildingTypes()
    {
        $distinctBuildingTypes = Hotel::distinct('building_type')->pluck('building_type');
    
        $buildingTypesWithImages = [];
    
        foreach ($distinctBuildingTypes as $buildingType) {
            $hotel = Hotel::with('images')->where('building_type', $buildingType)->first();
    
            if ($hotel && $hotel->images->isNotEmpty()) {
                $randomImage = $hotel->images->random();
    
                $buildingTypesWithImages[] = [
                    'building_type' => $buildingType,
                    'image' => $randomImage,
                ];
            }
        }
    
        return response()->json($buildingTypesWithImages);
    }

    public function createInspectedHotels(Request $request, $hotelId)
    {
        $hotel = Hotel::find($hotelId);
        
        if ($hotel) {
            $inspectedHotel = InspectedHotel::where('hotel_id', $hotel->id)->first();
    
            if (!$inspectedHotel) {
                
                InspectedHotel::create([
                    'hotel_id' => $hotel->id,
                    'inspection_date' => now(),
                ]);
    
                $hotel->update(['isInspected' => true]);
                
                return response()->json(['message' => 'Hotel moved to inspected hotels manually.']);
            } else {
                return response()->json(['message' => 'Hotel is already in inspected hotels.']);
            }
        } else {
            return response()->json(['error' => 'Hotel not found.'], 404);
        }
    }
    
    public function removeHotelManually($hotelId)
    {
        $inspectedHotel = InspectedHotel::where('hotel_id', $hotelId)->first();
    
        if ($inspectedHotel) {
            $inspectedHotel->delete();
    
            
            $hotel = Hotel::find($hotelId);
            if ($hotel) {
                $hotel->update(['isInspected' => false]);
            }
    
            return response()->json(['message' => 'Hotel removed from inspected hotels.']);
        } else {
            return response()->json(['error' => 'Inspected hotel not found for the given hotel ID.'], 404);
        }
    }
    
    public function getInspectedHotelsByLocation()
    {
        $locations = InspectedHotel::with('hotel')->get()->pluck('hotel.location')->unique();

        $inspectedHotelsByLocation = [];
        foreach ($locations as $location) {
            $count = InspectedHotel::whereHas('hotel', function ($query) use ($location) {
                $query->where('location', $location);
            })->count();

            if ($count > 0) {
                $inspectedHotel = InspectedHotel::whereHas('hotel', function ($query) use ($location) {
                    $query->where('location', $location);
                })->first();

                $hotel = $inspectedHotel->hotel;
                $images = $this->findImages($hotel->id);
                $firstImage = !empty($images) ? $images[2] : null;

                $inspectedHotelsByLocation[] = [
                    "location" => $location,
                    "image" => $firstImage,
                    "count" => $count,
                ];
            }
        }

        return response()->json($inspectedHotelsByLocation, 200);
    }

    public function getInspectedHotelsBySpecificLocation($location)
    {
        $inspectedHotels = InspectedHotel::with(['hotel'])
            ->whereHas('hotel', function ($query) use ($location) {
                $query->where('location', $location);
            })
            ->get();

        $formattedHotels = $inspectedHotels->map(function ($inspectedHotel) {
            $hotel = $inspectedHotel->hotel;
            $images = $this->findImages($hotel->id);
            $firstImage = !empty($images) ? $images[3] : null;

            return [
                'id' => $inspectedHotel->id,
                'hotel_id' => $inspectedHotel->hotel_id,
                'inspection_date' => $inspectedHotel->inspection_date,
                'created_at' => $inspectedHotel->created_at,
                'updated_at' => $inspectedHotel->updated_at,
                'hotel' => [
                    'id' => $hotel->id,
                    'name' => $hotel->name,
                    'location' => $hotel->location,
                    'adresse' => $hotel->adresse,
                    'price' => $hotel->price_per_night,
                    'image' => $firstImage,
                ],
            ];
        });

        return response()->json($formattedHotels, 200);
    }


}
