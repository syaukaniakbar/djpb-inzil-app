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

            // Load the parent borrowing to get the date range
            $borrowing = Borrowing::find($borrowingDetail->borrowing_id);

            if (!$borrowing) {
                throw ValidationException::withMessages(['borrowing_id' => 'Data peminjaman tidak ditemukan.']);
            }

            // Check if this inventory overlaps with another active borrowing period.
            // Exclude the current borrowing_id so that editing the same record doesn't
            // falsely flag itself as a conflict.
            if (
                $inventory->isBeingBorrowedDuring(
                    $borrowing->start_at,
                    $borrowing->end_at,
                    $borrowingDetail->borrowing_id
                )
            ) {
                throw ValidationException::withMessages([
                    'inventory_id' => 'Aset ini sedang dipinjam pada periode yang sama.',
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

