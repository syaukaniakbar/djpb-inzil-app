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

    // Check if room is available for a specific time range
    public function isAvailableForRange($startAt, $endAt): bool
    {
        $overlappingBooking = $this->bookingRooms()
            ->where(function ($query) use ($startAt, $endAt) {
                $query->where('start_at', '<', $endAt)  // The new booking starts before the existing one ends
                      ->where('end_at', '>', $startAt);  // The new booking ends after the existing one starts
            })
            ->whereIn('status', ['pending', 'ongoing'])
            ->first();

        return !$overlappingBooking;
    }
}
