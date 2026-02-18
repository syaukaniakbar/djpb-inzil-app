<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\ValidationException;

class BorrowingDetail extends Model
{
    protected $fillable = [
        'borrowing_id',
        'inventory_id',
        'quantity',
        'notes',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($borrowingDetail) {
            $inventory = Inventory::find($borrowingDetail->inventory_id);
            
            if (!$inventory) {
                throw ValidationException::withMessages(['inventory_id' => 'Aset yang dipilih tidak ditemukan.']);
            }

            // Check if this is a new record or if the inventory/quantity has changed
            if (!$borrowingDetail->exists || 
                $borrowingDetail->isDirty(['inventory_id', 'quantity'])) {
                
                // If updating an existing record, we need to account for the current quantity
                if ($borrowingDetail->exists) {
                    // Load the borrowing relationship to ensure it's available
                    $borrowingDetail->load('borrowing');
                    // Calculate available quantity excluding this borrowing's original quantity
                    $availableQuantity = $inventory->getAvailableQuantityExcludingBorrowing($borrowingDetail->borrowing) + $borrowingDetail->quantity;
                } else {
                    // For new records, use the standard available quantity
                    $availableQuantity = $inventory->getAvailableQuantityAttribute();
                }
                
                if ($borrowingDetail->quantity > $availableQuantity) {
                    throw ValidationException::withMessages([
                        'quantity' => "Jumlah yang diminta melebihi jumlah aset yang tersedia. Tersedia: {$availableQuantity}"
                    ]);
                }
            }
        });
    }

    public function borrowing(): BelongsTo
    {
        return $this->belongsTo(Borrowing::class);
    }

    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class);
    }
}
