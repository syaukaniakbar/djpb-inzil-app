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
     * Validate borrowing data
     *
     * @param array $data
     * @return array
     */
    private function validateBorrowingData(array $data): array
    {
        $validatedData = validator($data, [
            'start_at' => 'required|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'notes' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.inventory_id' => 'required|exists:inventories,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string|max:255'
        ])->validate();

        return $validatedData;
    }

    /**
     * Create a new borrowing with its details
     *
     * @param array $data
     * @return \App\Models\Borrowing
     */
    public function createBorrowing(array $data): Borrowing
    {
        $validatedData = $this->validateBorrowingData($data);

        DB::beginTransaction();

        try {
            // Create the borrowing record with pending status
            $borrowing = Borrowing::create([
                'user_id' => Auth::id(),
                'start_at' => $validatedData['start_at'],
                'end_at' => $validatedData['end_at'] ?? null,
                'notes' => $validatedData['notes'] ?? null,
                'status' => 'pending', // Default to pending status
            ]);

            // Create borrowing detail records
            foreach ($validatedData['items'] as $item) {
                BorrowingDetail::create([
                    'borrowing_id' => $borrowing->id,
                    'inventory_id' => $item['inventory_id'],
                    'quantity' => $item['quantity'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();

            return $borrowing->refresh()->load(['borrowingDetails' => function($query) {
                $query->with('inventory');
            }]);
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
        $validatedData = $this->validateBorrowingData($data);

        DB::beginTransaction();

        try {
            // Update the borrowing record
            $borrowing->update([
                'start_at' => $validatedData['start_at'],
                'end_at' => $validatedData['end_at'] ?? null,
                'notes' => $validatedData['notes'] ?? null,
            ]);

            // Delete existing borrowing details
            $borrowing->borrowingDetails()->delete();

            // Create updated borrowing detail records
            foreach ($validatedData['items'] as $item) {
                BorrowingDetail::create([
                    'borrowing_id' => $borrowing->id,
                    'inventory_id' => $item['inventory_id'],
                    'quantity' => $item['quantity'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();

            return $borrowing->refresh()->load(['borrowingDetails' => function($query) {
                $query->with('inventory');
            }]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Delete a borrowing and its related details
     *
     * @param \App\Models\Borrowing $borrowing
     * @return bool
     */
    public function deleteBorrowing(Borrowing $borrowing): bool
    {
        DB::beginTransaction();

        try {
            // Delete all borrowing details first
            $borrowing->borrowingDetails()->delete();

            // Then delete the borrowing record
            $borrowing->delete();

            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }




}