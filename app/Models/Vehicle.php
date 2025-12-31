<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\VehicleBorrowing;

class Vehicle extends Model
{
    protected $fillable = [
        'name',
        'license_plate',
        'brand',
        'model',
        'color',
        'fuel_type',
        'registration_expiry',
        'year',
    ];

    public function activeBorrowing()
    {
        return $this->hasOne(VehicleBorrowing::class)
            ->whereNull('returned_at')
            ->whereIn('status', ['ongoing', 'pending']);
    }

    public function vehicleBorrowings()
    {
        return $this->hasMany(VehicleBorrowing::class);
    }

    // Check if vehicle is currently available for borrowing
    public function isAvailable(): bool
    {
        $activeBorrowing = $this->activeBorrowing()->first();
        return !$activeBorrowing;
    }
}
