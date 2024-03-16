<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    public function create(Request $request)
    {
        $rules = [
            'hotel_id' => 'required|integer',
            'price_per_night' => 'required',
            'room_number' => 'required|string|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            'size_of_beds' => 'required|in:3 by 6,4 by 6,6 by 6',
            'room_type' => 'required|string|in:super_executive,executive,standard_executive,room_apartment,transit,transit_single,transit_budget,transit_standard,standard,executive_suite',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $roomData = $request->only(['hotel_id', 'room_number', 'price_per_night', 'size_of_beds', 'room_type']);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('room_images'), $imagePath);
            $roomData['image'] = $imagePath;
        }

        $room = Room::create($roomData);

        return response()->json($room, 201);
    }

    public function update(Request $request, $id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $rules = [
            'hotel_id' => 'required|integer',
            'price_per_night' => 'required',
            'room_number' => 'required|string|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            'size_of_beds' => 'required|in:3 by 6,4 by 6,6 by 6',
            'room_type' => 'required|string|in:super_executive,executive,standard_executive,room_apartment,transit,transit_single,transit_budget,transit_standard,standard,executive_suite',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $oldImagePath = $room->image;

        // Fill the room model with request data including room_type
        $room->fill($request->only(['hotel_id', 'room_number', 'price_per_night', 'size_of_beds', 'room_type']));

        if ($request->hasFile('image')) {
            if ($oldImagePath) {
                // Delete the old image
                Storage::delete('room_images/' . $oldImagePath);
            }

            // Upload the new image
            $image = $request->file('image');
            $imagePath = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('room_images'), $imagePath);
            $room->image = $imagePath;
        }

        $room->save();

        return response()->json($room, 200);
    }
    
    public function show($id)
    {
        $room = Room::find($id);
    
        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }
         $room->hotel;

         return response()->json($room, 200);
    }

    public function destroy($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->delete();

        return response()->json(['message' => 'Room deleted'], 204);
    }
     
    public function index($hotelId)
    {
        $availableRooms = Room::where('hotel_id', $hotelId)
                            ->where('status', 'Available')
                            ->latest('created_at')
                            ->get();

        return response()->json($availableRooms, 200);
    }

    public function allRooms()
    {
        $allRooms = Room::latest('created_at')->get();
        $uniqueHotels = [];
        $roomWithHotel = [];

        foreach ($allRooms as $room) {
            $hotel = $room->hotel;

            $hotelId = $hotel ? $hotel->id : null;
            if (!in_array($hotelId, $uniqueHotels)) {
                $uniqueHotels[] = $hotelId;

                $roomWithHotel[] = ['room' => $room ];
            }
        }

        return response()->json($roomWithHotel, 200);
    }

    public function roomsByHotelId($hotelId)
    {
        $rooms = Room::where('hotel_id', $hotelId)->get();
    
        if ($rooms->isEmpty()) {
            return response()->json([], 404);
        }
    
        $uniqueHotel = null;
        $roomsWithHotel = [];
    
        foreach ($rooms as $room) {
            if (!$uniqueHotel) {
                $uniqueHotel = $room->hotel;
            }
    
            $roomsWithHotel[] = [ 'room' => $room ];
        }
    
        return response()->json($roomsWithHotel, 200);
    }
    
    public function findImages($hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $images = $hotel->images;

        return $images->pluck('image_path')->toArray();
    }

    public function searchHotels(Request $request)
    {
        $validatedData = $request->validate([
            'location' => 'nullable|string',
            'name' => 'nullable|string',
            'building_type' => 'nullable|string',
            'price' => 'nullable|integer',
        ]);
    
        $availableHotels = Hotel::where(function ($query) use ($validatedData) {
            if (!empty($validatedData['building_type'])) {
                $query->where('building_type', $validatedData['building_type']);
            }
            if (!empty($validatedData['location'])) {
                $query->where('location', $validatedData['location']);
            }
            if (!empty($validatedData['name'])) {
                $query->where('name', 'like', '%' . $validatedData['name'] . '%');
            }
        });
    
        $availableHotels->with(['rooms' => function ($query) use ($validatedData) {
            $this->applyFilter($query, 'price_per_night', $validatedData['price'] ?? null, '<=');
        }]);
    
        $filteredAvailableHotels = $availableHotels->get();
    
        foreach ($filteredAvailableHotels as $hotel) {
            $hotelId = $hotel->id;
    
            $images = $this->findImages($hotelId);
            $image = !empty($images) ? $images[1] : null;
            $hotel->image = $image;
        }
    
        return response()->json($filteredAvailableHotels);
    }
    
    private function applyFilter($query, $column, $value, $operator)
    {
        if (!is_null($value)) {
            $query->where($column, $operator, $value);
        }
    }
    
}
