<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleBorrowing extends Model
{
    protected $table = 'vehicle_borrowings';

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'start_at',
        'end_at',
        'purpose',
        'destination',
        'status',
    ];
}
