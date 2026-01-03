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
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at'   => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    // Scope to get active bookings (ongoing, used)
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['ongoing', 'used']);
    }

    // Scope to get completed bookings
    public function scopeCompleted($query)
    {
        return $query->where('status', 'finished');
    }

    // Check if booking is currently active
    public function isActive(): bool
    {
        return in_array($this->status, ['ongoing', 'used']);
    }

    // Check if booking is overdue
    public function isOverdue(): bool
    {
        return !$this->isActive() && $this->end_at < now() && $this->status !== 'finished';
    }
}
