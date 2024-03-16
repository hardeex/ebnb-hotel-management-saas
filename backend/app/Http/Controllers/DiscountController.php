<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class DiscountController extends Controller
{
    public function findImages($hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $images = $hotel->images;

        return $images->pluck('image_path')->toArray();
    }

    public function applyDiscount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'required|integer|exists:hotels,id',
            'user_id' => 'required|integer|exists:users,id',
            'discount_percent' => 'required|numeric|min:0|max:100',
            'expiration_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $hotelId = $request->input('hotel_id');
            $userId = $request->input('user_id');

            Hotel::findOrFail($hotelId);

            $discount = Discount::where('hotel_id', $hotelId)
                ->where('user_id', $userId)
                ->first();

            if (!$discount) {
                $discount = new Discount();
                $discount->hotel_id = $hotelId;
                $discount->user_id = $userId;
            }

            $discount->discount_percent = $request->input('discount_percent');
            $discount->expiration_date = $request->input('expiration_date');
            $discount->save();

            return response()->json(['message' => 'Discount applied successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index(Request $request)
    {
        $hotelId = $request->input('hotel_id');
        $userId = $request->input('user_id');
        $discountPercent = $request->input('discount_percent');

        $discounts = Discount::with([
            'hotel:id,name,location,building_type,adresse,price_per_night',
            'hotel.images:id,hotel_id,image_path',
            'hotel.reviews:id,hotel_id,rating,comment',
        ])
            ->when($hotelId, function ($query) use ($hotelId) {
                $query->where('hotel_id', $hotelId);
            })
            ->when($userId, function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->when($discountPercent, function ($query) use ($discountPercent) {
                $query->where('discount_percent', $discountPercent);
            })
            ->where(function ($query) {
                $query->whereNull('expiration_date')
                    ->orWhere('expiration_date', '>', now());
            })
            ->latest('created_at') 
            ->get(['id', 'hotel_id', 'user_id', 'discount_percent', 'verified', 'expiration_date']);

        $discounts = $discounts->map(function ($discount) {
            $hotel = $discount->hotel;

            $images = $this->findImages($hotel->id);
            $secondImage = !empty($images) ? $images[3] : null;

            $reviews = $hotel->reviews;

            return [
                'id' => $discount->id,
                'hotel_id' => $discount->hotel_id,
                'user_id' => $discount->user_id,
                'discount_percent' => $discount->discount_percent,
                'verified' => $discount->verified,
                'expiration_date' => $discount->expiration_date,
                'hotel' => [
                    'id' => $hotel->id,
                    'name' => $hotel->name,
                    'location' => $hotel->location,
                    'building_type' => $hotel->building_type,
                    'adresse' => $hotel->adresse,
                    'price_per_night' => $hotel->price_per_night,
                    'image_path' => $secondImage,
                    'reviews' => $reviews,
                ],
            ];
        });

        return response()->json($discounts, 200);
    }
    
    public function show($id)
    {
        $discount = Discount::with([
            'hotel:id,name,location,building_type,adresse,price_per_night',
            'hotel.images:id,hotel_id,image_path',
        ])
            ->where('id', $id)
            ->where(function ($query) {
                $query->whereNull('expiration_date')
                    ->orWhere('expiration_date', '>', now());
            })
            ->first(['id', 'hotel_id', 'user_id', 'discount_percent', 'verified', 'expiration_date']);

        if (!$discount) {
            return response()->json(['error' => 'Discount not found'], 404);
        }

        $hotel = $discount->hotel;

        $images = $this->findImages($hotel->id);
        $secondImage = !empty($images) ? $images[3] : null;

        $formattedDiscount = [
            'id' => $discount->id,
            'hotel_id' => $discount->hotel_id,
            'user_id' => $discount->user_id,
            'discount_percent' => $discount->discount_percent,
            'verified' => $discount->verified,
            'expiration_date' => $discount->expiration_date,
            'hotel' => [
                'id' => $hotel->id,
                'name' => $hotel->name,
                'location' => $hotel->location,
                'building_type' => $hotel->building_type,
                'adresse' => $hotel->adresse,
                'price_per_night' => $hotel->price_per_night,
                'image_path' => $secondImage,
            ],
        ];

        return response()->json($formattedDiscount, 200);
    }

    public function updateVerificationStatus(Request $request, $discountId)
    {
        $validator = Validator::make($request->all(), [
            'verified' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $discount = Discount::findOrFail($discountId);

            $discount->verified = $request->input('verified');
            $discount->save();

            return response()->json(['message' => 'Verification status updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getDiscountedLocationsWithImages()
    {
        $locations = Discount::join('hotels', 'discounts.hotel_id', '=', 'hotels.id')
            ->distinct('hotels.location')
            ->pluck('hotels.location');

        $statesWithDiscountedHotels = [];

        foreach ($locations as $state) {
            $discountedHotelsInState = Discount::with([
                'hotel:id,name,location,building_type,adresse,price_per_night',
                'hotel.images:id,hotel_id,image_path',
            ])->whereHas('hotel', function ($query) use ($state) {
                $query->where('location', $state);
            })->get();

            if ($discountedHotelsInState->isNotEmpty()) {
                $hotel = $discountedHotelsInState->first()->hotel;
                $images = $this->findImages($hotel->id);
                $firstImage = !empty($images) ? $images[1] : null;

                $discountPercent = $discountedHotelsInState->first()->discount_percent;

                $statesWithDiscountedHotels[] = [
                    "state" => $state,
                    "image" => $firstImage,
                    "count" => $discountedHotelsInState->count(),
                    "discount_percent" => $discountPercent,
                ];
            }
        }

        return response()->json($statesWithDiscountedHotels, 200);
    }

    public function getDiscountedHotelsByLocation($location)
    { 
        $currentDate = Carbon::now()->toDateString();
    
        $discountedHotels = Discount::with([
            'hotel',
            'hotel.images:id,hotel_id,image_path',
        ])->whereHas('hotel', function ($query) use ($location) {
            $query->where('location', $location);
        })->where('expiration_date', '>=', $currentDate) 
          ->get();
    
        $discountedHotelsData = [];
    
        foreach ($discountedHotels as $discount) {
            $hotel = $discount->hotel;
            $images = $this->findImages($hotel->id);
            $firstImage = !empty($images) ? $images[1] : null;
    
            $discountPercent = $discount->discount_percent;
    
            $hotelProperties = $hotel->toArray();
    
            if ($discount->verified) {
                $discountedHotelsData[] = [
                    "discount_id" => $discount->id,
                    "hotel" => $hotelProperties,
                    "image" => $firstImage,
                    "discount_percent" => $discountPercent,
                    "verified" => $discount->verified,
                ];
            }
        }
    
        return response()->json($discountedHotelsData, 200);
    }
}
