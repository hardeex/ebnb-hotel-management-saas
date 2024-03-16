<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    
    public function discount()
    {
        return $this->hasOne(Discount::class);
    }
    
    protected $fillable = [
        'hotel_id',
        'user_id',
        'discount_percent',
        'verified',
        'review'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
