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

            // Check if this inventory is already being borrowed
            if ($inventory->isBeingBorrowed()) {
                throw ValidationException::withMessages([
                    'inventory_id' => 'Aset ini sedang dipinjam.'
                ]);
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
