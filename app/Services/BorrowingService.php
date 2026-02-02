<?php

namespace App\Services;

use App\Models\Borrowing;
use App\Models\BorrowingDetail;
use App\Models\Inventory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class BorrowingService
{
    /**
     * Create a new borrowing with its details
     *
     * @param array $data
     * @return \App\Models\Borrowing
     */
    public function createBorrowing(array $data): Borrowing
    {
        DB::beginTransaction();

        try {
            // Validate stock availability before creating borrowing
            foreach ($data['items'] as $item) {
                $inventory = Inventory::findOrFail($item['inventory_id']);

                // Check if requested quantity is available
                if ($inventory->available_quantity < $item['quantity']) {
                    throw new \Exception("Stok tidak mencukupi untuk {$inventory->name}. Tersedia: {$inventory->available_quantity}, Diminta: {$item['quantity']}");
                }
            }

            // Create the borrowing record with pending status
            $borrowing = Borrowing::create([
                'user_id' => Auth::id(),
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'] ?? null,
                'notes' => $data['notes'] ?? null,
                'status' => 'pending', // Default to pending status
            ]);

            // Create borrowing detail records
            foreach ($data['items'] as $item) {
                BorrowingDetail::create([
                    'borrowing_id' => $borrowing->id,
                    'inventory_id' => $item['inventory_id'],
                    'quantity' => $item['quantity'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();

            return $borrowing->refresh()->load([
                'borrowingDetails' => function ($query) {
                    $query->with('inventory');
                }
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Update an existing borrowing with its details
     *
     * @param \App\Models\Borrowing $borrowing
     * @param array $data
     * @return \App\Models\Borrowing
     */
    public function updateBorrowing(Borrowing $borrowing, array $data): Borrowing
    {
        DB::beginTransaction();

        try {
            // Get previous borrowing details to calculate available stock considering this borrowing
            $previousDetails = $borrowing->borrowingDetails()->get();

            // Calculate available stock considering this borrowing will be updated (temporarily add back the current quantities)
            $inventoryStocks = [];
            foreach ($previousDetails as $detail) {
                $inventory = Inventory::findOrFail($detail->inventory_id);
                $availableWithCurrentBorrowing = $inventory->quantity - (
                    $inventory->borrowingDetails()
                        ->whereHas('borrowing', function ($query) use ($borrowing) {
                            $query->whereIn('status', ['pending', 'approved', 'ongoing'])
                                  ->where('borrowings.id', '!=', $borrowing->id); // Exclude current borrowing
                        })
                        ->sum('quantity')
                );

                $inventoryStocks[$detail->inventory_id] = $availableWithCurrentBorrowing + $detail->quantity; // Add back current borrowing quantity
            }

            // Validate stock availability for new items
            foreach ($data['items'] as $item) {
                $inventory = Inventory::findOrFail($item['inventory_id']);

                // Use calculated available stock if we temporarily remove current borrowing quantities
                $availableStock = $inventoryStocks[$inventory->id] ?? $inventory->quantity;

                if ($availableStock < $item['quantity']) {
                    throw new \Exception("Stok tidak mencukupi untuk {$inventory->name}. Tersedia: {$availableStock}, Diminta: {$item['quantity']}");
                }
            }

            // Update the borrowing record
            $borrowing->update([
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            // Delete existing borrowing details
            $borrowing->borrowingDetails()->delete();

            // Create updated borrowing detail records
            foreach ($data['items'] as $item) {
                BorrowingDetail::create([
                    'borrowing_id' => $borrowing->id,
                    'inventory_id' => $item['inventory_id'],
                    'quantity' => $item['quantity'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();

            return $borrowing->refresh()->load([
                'borrowingDetails' => function ($query) {
                    $query->with('inventory');
                }
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Cancel a borrowing by updating its status to canceled
     *
     * @param \App\Models\Borrowing $borrowing
     * @return bool
     */
    public function cancelBorrowing(Borrowing $borrowing): bool
    {
        DB::beginTransaction();

        try {
            // Check if borrowing can be canceled (not already returned or canceled)
            if ($borrowing->status === 'returned' || $borrowing->status === 'canceled') {
                throw new \Exception('Peminjaman tidak dapat dibatalkan karena sudah ' . ($borrowing->status === 'returned' ? 'dikembalikan' : 'dibatalkan'));
            }

            // Update the borrowing status to canceled
            $borrowing->update([
                'status' => 'canceled',
            ]);

            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Return a borrowing by updating its status to returned and restoring stock
     *
     * @param \App\Models\Borrowing $borrowing
     * @return bool
     */
    public function returnBorrowing(Borrowing $borrowing): bool
    {
        DB::beginTransaction();

        try {
            // Check if borrowing can be returned (not already returned or canceled)
            if ($borrowing->status === 'returned') {
                throw new \Exception('Peminjaman sudah dikembalikan');
            }

            if ($borrowing->status === 'canceled') {
                throw new \Exception('Peminjaman sudah dibatalkan dan tidak dapat dikembalikan');
            }

            // Update the borrowing status to returned and set returned_at timestamp
            $borrowing->update([
                'status' => 'returned',
                'returned_at' => now(),
            ]);

            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

}