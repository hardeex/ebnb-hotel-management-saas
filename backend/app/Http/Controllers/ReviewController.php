<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required',
            'hotel_id' => 'required',
            'comment' => 'required',
        ]);
        
        $review = Review::create($data);
        return response()->json($review, 201);
    }

    public function show($id)
    {
        $review = Review::findOrFail($id);
        return response()->json($review);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'user_id' => 'required',
            'hotel_id' => 'required',
            'comment' => 'required',
        ]);

        $review = Review::findOrFail($id);
        $review->update($data);
        return response()->json($review, 200);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(null, 204);
    }

    public function index()
    {
        $reviews = Review::latest('created_at')->get();
    
        return response()->json($reviews);
    }

    public function getReviewsByHotelId($hotelId)
    {
        $reviews = Review::with('user')
            ->where('hotel_id', $hotelId)
            ->latest('created_at')
            ->get();
    
        return response()->json($reviews, 200);
    }
    


}
