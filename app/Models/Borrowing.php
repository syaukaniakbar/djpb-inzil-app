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

    // Scope to get active borrowings (not yet returned)
    public function scopeActive($query)
    {
        return $query->whereNull('returned_at');
    }

    // Scope to get completed borrowings
    public function scopeCompleted($query)
    {
        return $query->whereNotNull('returned_at');
    }

    // Check if borrowing is currently active
    public function isActive(): bool
    {
        return is_null($this->returned_at);
    }
}
