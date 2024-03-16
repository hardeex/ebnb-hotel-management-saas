<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InspectedRoom extends Model
{
    use HasFactory;
    protected $fillable = [
        'room_id',
        'inspection_date',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
