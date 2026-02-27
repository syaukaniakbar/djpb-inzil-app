<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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

    public function isAvailableForRange($startAt, $endAt, $excludeBookingId = null): bool
    {
        $overlappingBooking = $this->bookingRooms()
            ->where(function ($query) use ($startAt, $endAt) {
                $query->where('start_at', '<', $endAt)
                    ->where('end_at', '>', $startAt);
            })
            ->whereIn('status', ['pending', 'ongoing', 'approved'])
            ->when($excludeBookingId, function ($query) use ($excludeBookingId) {
                return $query->where('id', '!=', $excludeBookingId);
            })
            ->first();

        return !$overlappingBooking;
    }
}
