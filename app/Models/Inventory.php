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
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function borrowingDetails(): HasMany
    {
        return $this->hasMany(BorrowingDetail::class);
    }

    /**
     * Get the available quantity of the inventory item
     * Available = Total quantity - Quantity currently borrowed
     */
    public function getAvailableQuantityAttribute(): int
    {
        $borrowedQuantity = $this->borrowingDetails()
            ->whereHas('borrowing', function ($query) {
                $query->whereIn('status', ['pending', 'approved', 'ongoing']);
            })
            ->sum('quantity');

        return max(0, $this->quantity - $borrowedQuantity);
    }

    /**
     * Get the available quantity excluding a specific borrowing
     * Useful when editing an existing borrowing
     */
    public function getAvailableQuantityExcludingBorrowing(Borrowing $borrowing): int
    {
        $borrowedQuantity = $this->borrowingDetails()
            ->whereHas('borrowing', function ($query) use ($borrowing) {
                $query->whereIn('status', ['pending', 'approved', 'ongoing'])
                      ->where('borrowings.id', '!=', $borrowing->id); // Exclude current borrowing
            })
            ->sum('quantity');

        return max(0, $this->quantity - $borrowedQuantity);
    }
}
