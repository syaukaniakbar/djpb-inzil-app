<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Models\BookingRoom;

class Room extends Model
{
    protected $fillable = [
        'name',
        'capacity',
    ];

    public function bookingRooms()
    {
        return $this->hasMany(BookingRoom::class);
    }

    public function scopeAvailableForRange(Builder $query, $startAt, $endAt, $excludeBookingId = null): Builder
    {
        return $query->whereDoesntHave('bookingRooms', function ($query) use ($startAt, $endAt, $excludeBookingId) {
            $query->where(function ($query) use ($startAt, $endAt) {
                $query->where('start_at', '<', $endAt)
                    ->where('end_at', '>', $startAt);
            })
            ->whereIn('status', ['pending', 'ongoing', 'approved'])
            ->when($excludeBookingId, function ($query) use ($excludeBookingId) {
                return $query->where('id', '!=', $excludeBookingId);
            });
        });
    }

    public function isAvailableForRange($startAt, $endAt, $excludeBookingId = null): bool
    {
        return $this->scopeAvailableForRange(
            static::query(),
            $startAt,
            $endAt,
            $excludeBookingId
        )->where('id', $this->id)->exists();
    }
}
