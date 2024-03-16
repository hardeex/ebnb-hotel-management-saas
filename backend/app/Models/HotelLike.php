<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelLike extends Model
{
    use HasFactory;

    protected $table = 'hotel_likes';

    protected $fillable = [
        'user_id',
        'hotel_id',
        'liked',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotel_id');
    }
}
