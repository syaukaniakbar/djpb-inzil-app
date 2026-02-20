<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inventory extends Model
{
    protected $fillable = [
        'name',
        'serial_number',
        'description',
        'category',
    ];

    protected $casts = [

    ];

    public function borrowingDetails(): HasMany
    {
        return $this->hasMany(BorrowingDetail::class);
    }

    /**
     * Check if inventory is currently being borrowed
     */
    public function isBeingBorrowed(): bool
    {
        return $this->borrowingDetails()
            ->whereHas('borrowing', function ($query) {
                $query->whereIn('status', ['pending', 'approved', 'ongoing']);
            })
            ->exists();
    }
}
