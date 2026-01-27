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
        try {
            // Update the borrowing status to canceled
            $borrowing->update([
                'status' => 'canceled',
            ]);

            return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }

}