<?php

namespace App\Http\Controllers;

use App\Mail\UserVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Ebulksms;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'password' => 'required',
            'phone_number' => 'required',
            'email' => 'required|email|unique:users',
            'role' => 'required|in:partner,guest', 
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'errors' => $validator->errors(),
            ], 422);
        }
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]); 
    
        if ($user) {
            
            if ($request->role === 'partner') {
                try {
                    Mail::mailer('smtp')->to($user->email)->send(new UserVerification($user));
                    $smsController = new Ebulksms();
                    $json_url = "https://api.ebulksms.com:8080/sendsms.json";
                    $username = 'ayussuccess@gmail.com';
                    $apikey = 'c1891f9702ef124dc4469531489692ae2184b50c';
                    $flash = 0;
                    $sendername = 'EBNB';

                    // Customize the SMS content to include the verification link
                    $verificationLink = route('verification.verify', ['id' => $user->id]);
                    $messageText = "Thank you for registering with us. Please verify your account: {$verificationLink}";

                    $recipients = $user->phone_number;
                    $smsController->useHTTPGet($json_url, $username, $apikey, $flash, $sendername, $messageText, $recipients);
     
                    return response()->json([
                        'status' => 200,
                        'message' => 'Verify your account within 2 days',
                        'user' => $user
                    ], 200);
                } catch (\Exception $err) {
                    $user->delete();
                    return $err;
                    return response()->json([
                        'status' => 500,
                        'message' => 'Could not verify your account',
                    ]);
                }
            }
    
            return response()->json([
                'status' => 200,
                'message' => 'Registration successful',
                'user' => $user,
            ],200);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = $request->user();

        
        $response = [
            'user' => $user,
            'role' => $user->role, 
            'message' => 'Login successful',
        ];

        return response()->json($response);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'user' => $user,
        ], 200);
    }
}
