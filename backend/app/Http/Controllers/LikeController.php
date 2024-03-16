<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\HotelLike;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function like(Request $request)
    {
       try {
        $userId = $request->input('user_id');
        $hotelId = $request->input('hotel_id');
        $hotel = Hotel::find($hotelId);

        $userAlreadyLiked = $hotel->likes()->where('user_id', $userId)->where('liked', true)->exists();

        if ($userAlreadyLiked) {
            return response()->json(['message' => 'You have already liked this hotel.'], 400);
        }

        HotelLike::create([
            'user_id' => $userId,
            'hotel_id' => $hotelId,
            'liked' => true,
        ]);

        return response()->json(['message' => 'Hotel liked successfully']);
       } catch (\Throwable $th) {
        return response()->json(['error' => 'You cannot like this hotel now']);
       }
    }

    public function getLikesCount($hotelId)
    {
       try {
        $hotel = Hotel::find($hotelId);

        if ($hotel) {
            $likesCount = $hotel->likes()->where('liked', true)->count();

            return response()->json($likesCount);
        } else {
            return response()->json(['message' => 'Hotel not found'], 404);
        }
       } catch (\Throwable $th) {
        return response()->json(['message' => 'An error occurred'], 500);
       }
    }

}
