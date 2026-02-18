<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

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
     * Accessor to get name with serial number
     */
    public function nameWithSerial(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->name . ' (' . $this->serial_number . ')',
        );
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
     * Accessor for available quantity
     */
    public function availableQuantity(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getAvailableQuantityAttribute(),
        );
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
