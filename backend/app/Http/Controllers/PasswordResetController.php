<?php

namespace App\Http\Controllers;

use App\Mail\TokenVerification;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PasswordResetController extends Controller
{
    protected function validateEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);
    }
    
    public function sendResetLinkEmail(Request $request)
    {
        
        $this->validateEmail($request);
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $resetToken = Str::random(60);
    
       $user->update([
            'reset_password_token' => $resetToken,
            'reset_password_token_expires_at' => now()->addHours(2), 
        ]);
        
        if ($resetToken) {
            try {
                Mail::mailer('smtp')->to($user->email)->send(new TokenVerification($user, $resetToken));
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Verify your token within 2 hours',
                ], 422);
            } catch (\Exception $err) {
                return $err;
                return response()->json([
                    'status' => 500,
                    'message' => 'Could not verify your token',
                ]);
            }
        }
    }

    public function checkTokenValidity(Request $request)
    {
        $token = $request->input('token');

        $user = User::where('reset_password_token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'Token is invalid or has expired'], 400);
        }

        if ($user->reset_password_token_expires_at < now()) {
            return response()->json(['error' => 'Token has expired'], 400);
        }

        return response()->json(['message' => 'Token is valid'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'newPassword' => 'required|min:4',
            'token' => 'required',
        ]);

        $token = $request->input('token');

        $user = User::where('reset_password_token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'Token is invalid or has expired'], 400);
        }

        if ($user->reset_password_token_expires_at < now()) {
            return response()->json(['error' => 'Token has expired'], 400);
        }

        $user->update([
            'password' => bcrypt($request->input('newPassword')),
            'reset_password_token' => null,
            'reset_password_token_expires_at' => null,
        ]);

        return response()->json(['message' => 'Password reset successful'], 200);
    }
    
}
