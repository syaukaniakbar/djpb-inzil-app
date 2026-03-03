<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
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

    public function scopeAvailableForRange(Builder $query, $startAt, $endAt, $excludeBorrowingId = null): Builder
    {
        return $query->whereDoesntHave('vehicleBorrowings', function ($query) use ($startAt, $endAt, $excludeBorrowingId) {
            $query->where(function ($query) use ($startAt, $endAt) {
                $query->where(function ($query) use ($startAt, $endAt) {
                    // Borrowing starts during the requested period
                    $query->whereBetween('start_at', [$startAt, $endAt])
                        // Borrowing ends during the requested period
                        ->orWhereBetween('end_at', [$startAt, $endAt])
                        // Borrowing completely encompasses the requested period
                        ->orWhere(function ($query) use ($startAt, $endAt) {
                            $query->where('start_at', '<=', $startAt)
                                ->where('end_at', '>=', $endAt);
                        });
                });
            })
            ->whereNull('returned_at')
            ->whereIn('status', ['pending', 'approved', 'ongoing'])
            ->when($excludeBorrowingId, function ($query) use ($excludeBorrowingId) {
                return $query->where('id', '!=', $excludeBorrowingId);
            });
        });
    }

    public function isAvailableForRange($startAt, $endAt, $excludeBorrowingId = null): bool
    {
        return $this->scopeAvailableForRange(
            static::query(),
            $startAt,
            $endAt,
            $excludeBorrowingId
        )->where('id', $this->id)->exists();
    }
}
