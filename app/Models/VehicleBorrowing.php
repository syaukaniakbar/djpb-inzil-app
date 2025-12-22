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

    protected $casts = [
        'start_at' => 'datetime',
        'end_at'   => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
