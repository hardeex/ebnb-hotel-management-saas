<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\HotelImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HotelImageController extends Controller
{

    public function upload(Request $request, $hotelId)
    {
        try {
            $hotel = Hotel::findOrFail($hotelId);
            $imagePaths = [];
    
            if ($request->hasFile('images')) {
                $images = $request->file('images');
                $limit = min(count($images), 6);
    
                for ($i = 0; $i < $limit; $i++) {
                    $image = $images[$i];
                    $imagePath = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('images'), $imagePath);
                    $imagePaths[] = $imagePath;
                }
            }
    
            foreach ($imagePaths as $imagePath) {
                $hotelImage = new HotelImage();
                $hotelImage->image_path = $imagePath;
                $hotel->images()->save($hotelImage);
            }
    
            return response()->json(['message' => 'Images uploaded successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function findImages($hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $images = $hotel->images;

        return response()->json($images, 200);
    }

    public function update(Request $request, $hotelId)
    {
        try {
            $hotel = Hotel::findOrFail($hotelId);

            if ($request->hasFile('images')) {
                $imagePaths = [];
                $images = $request->file('images');
                $limit = min(count($images), 6);

                for ($i = 0; $i < $limit; $i++) {
                    $image = $images[$i];
                    $imagePath = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('images'), $imagePath);
                    $imagePaths[] = $imagePath;

                    if ($i < $hotel->images->count()) {
                        $hotelImage = $hotel->images[$i];
                        $hotelImage->image_path = $imagePath;
                        $hotelImage->save();
                    } else {
                        $hotelImage = new HotelImage();
                        $hotelImage->image_path = $imagePath;
                        $hotel->images()->save($hotelImage);
                    }
                }

                if (count($hotel->images) > $limit) {
                    $hotel->images->slice($limit)->each(function ($image) {
                        $image->delete();
                    });
                }
            }

            return response()->json(['message' => 'Hotel updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
}
