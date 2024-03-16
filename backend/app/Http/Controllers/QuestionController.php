<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function askQuestion(Request $request)
    {
        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $question = Question::create($request->all());

        return response()->json(['question' => $question]);
    }

    public function index()
    {
        $questions = Question::latest('created_at')->get();
    
        return response()->json(['questions' => $questions]);
    }
    
    public function questionsByHotel($hotelId)
    {
        $questions = Question::where('hotel_id', $hotelId)
            ->latest('created_at')
            ->get();

        return response()->json(['questions' => $questions]);
    }


}
