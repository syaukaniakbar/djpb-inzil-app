<?php

namespace App\Services;

use App\Models\ConsumableBorrowing;
use App\Models\ConsumableItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ConsumableBorrowingService
{
    /**
     * Create a new consumable borrowing.
     */
    public function createBorrowing(array $data): ConsumableBorrowing
    {
        return DB::transaction(function () use ($data) {
            $consumableItem = ConsumableItem::findOrFail($data['consumable_item_id']);

            // Stock check is also in the model hook, but we handle it here for better error reporting in controller context if needed
            // However, the model hook throws ValidationException which is caught by Laravel.

            return ConsumableBorrowing::create([
                'user_id' => Auth::id(),
                'consumable_item_id' => $data['consumable_item_id'],
                'quantity' => $data['quantity'],
                'borrowed_at' => $data['borrowed_at'],
                'notes' => $data['notes'] ?? null,
                'status' => 'pending',
            ]);
        });
    }

    /**
     * Update an existing consumable borrowing.
     */
    public function updateBorrowing(ConsumableBorrowing $borrowing, array $data): ConsumableBorrowing
    {
        return DB::transaction(function () use ($borrowing, $data) {
            if (!$borrowing->isPending()) {
                throw ValidationException::withMessages([
                    'status' => 'Hanya peminjaman dengan status pending yang dapat diubah.',
                ]);
            }

            $oldItem = $borrowing->consumableItem;
            $newItem = ConsumableItem::findOrFail($data['consumable_item_id']);

            // Stock check
            $availableForNew = $newItem->quantity;
            if ($oldItem->id === $newItem->id) {
                $availableForNew += $borrowing->quantity;
            }

            if ($data['quantity'] > $availableForNew) {
                throw ValidationException::withMessages([
                    'quantity' => "Jumlah yang diminta melebihi stok yang tersedia. Tersedia: {$availableForNew}",
                ]);
            }

            // Adjust stock
            $oldItem->increment('quantity', $borrowing->quantity);
            $newItem->refresh(); // Refresh in case it was the same item
            $newItem->decrement('quantity', $data['quantity']);

            $borrowing->update($data);

            return $borrowing;
        });
    }

    /**
     * Cancel a consumable borrowing.
     */
    public function cancelBorrowing(ConsumableBorrowing $borrowing): bool
    {
        if (!$borrowing->isPending()) {
            throw ValidationException::withMessages([
                'status' => 'Hanya peminjaman dengan status pending yang dapat dibatalkan.',
            ]);
        }

        return $borrowing->markAsCanceled();
    }

    /**
     * Mark a consumable borrowing as finished.
     */
    public function finishBorrowing(ConsumableBorrowing $borrowing): bool
    {
        if (!in_array($borrowing->status, ['ongoing', 'pending'])) {
            throw ValidationException::withMessages([
                'status' => 'Peminjaman harus dalam status pending atau ongoing untuk diselesaikan.',
            ]);
        }

        return $borrowing->markAsFinished();
    }
}
