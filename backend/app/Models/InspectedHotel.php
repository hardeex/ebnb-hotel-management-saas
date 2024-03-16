<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InspectedHotel extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'hotel_id',
        'inspection_date',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

}
