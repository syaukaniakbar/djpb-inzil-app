<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Borrowing extends Model
{
    protected $fillable = [
        'user_id',
        'start_at',
        'end_at',
        'returned_at',
        'status',
        'notes',
        'admin_note'
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'returned_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function borrowingDetails(): HasMany
    {
        return $this->hasMany(BorrowingDetail::class);
    }

    public function inventories()
    {
        return $this->belongsToMany(Inventory::class, 'borrowing_details')
            ->withPivot('quantity', 'notes')
            ->withTimestamps();
    }

    public function scopeActive($query)
    {
        return $query->whereNull('returned_at')
            ->whereIn('status', ['approved', 'ongoing']);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCanceled($query)
    {
        return $query->where('status', 'canceled');
    }
}
