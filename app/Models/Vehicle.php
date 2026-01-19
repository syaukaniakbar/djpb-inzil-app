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

    public function vehicleBorrowings()
    {
        return $this->hasMany(VehicleBorrowing::class);
    }


    // Check if vehicle is available for a specific time range
    public function isAvailableForRange($startAt, $endAt): bool
    {
        $overlappingBorrowing = $this->vehicleBorrowings()
            ->where(function ($query) use ($startAt, $endAt) {
                $query->where('start_at', '<', $endAt)  // The new booking starts before the existing one ends
                      ->where('end_at', '>', $startAt);  // The new booking ends after the existing one starts
            })
            ->whereIn('status', ['pending', 'ongoing'])
            ->first();

        return !$overlappingBorrowing;
    }
}
