<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class VehicleBorrowing extends Model
{
    protected $table = 'vehicle_borrowings';

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'start_at',
        'end_at',
        'returned_at',
        'purpose',
        'destination',
        'status',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at'   => 'datetime',
        'returned_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    // Scope to get active borrowings (not yet returned)
    public function scopeActive($query)
    {
        return $query->whereNull('returned_at')->whereIn('status', ['ongoing', 'pending']);
    }

    // Scope to get completed borrowings
    public function scopeCompleted($query)
    {
        return $query->whereNotNull('returned_at');
    }

    // Check if borrowing is currently active
    public function isActive(): bool
    {
        return is_null($this->returned_at) && in_array($this->status, ['ongoing', 'pending']);
    }

    // Check if borrowing is overdue
    public function isOverdue(): bool
    {
        return !$this->isActive() && $this->end_at < now();
    }
}
