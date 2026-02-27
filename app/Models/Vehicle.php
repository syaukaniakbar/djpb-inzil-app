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

    public function isAvailableForRange($startAt, $endAt, $excludeBorrowingId = null): bool
    {
        $overlappingBorrowing = $this->vehicleBorrowings()
            ->where(function ($query) use ($startAt, $endAt) {
                $query->where('start_at', '<', $endAt)
                    ->where('end_at', '>', $startAt);
            })
            ->whereNull('returned_at')
            ->whereIn('status', ['pending', 'ongoing', 'approved'])
            ->when($excludeBorrowingId, function ($query) use ($excludeBorrowingId) {
                return $query->where('id', '!=', $excludeBorrowingId);
            })
            ->first();

        return !$overlappingBorrowing;
    }

}
