<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingRoom extends Model
{
    protected $table = 'room_bookings';

    protected $fillable = [
        'user_id',
        'room_id',
        'start_at',
        'end_at',
        'event_mode',
        'event_name',
        'status',
        'admin_note'
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['pending', 'approved', 'ongoing']);
    }

}
