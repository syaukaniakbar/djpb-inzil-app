<?php

namespace App\Services;

use App\Models\Borrowing;
use App\Models\BorrowingDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class BorrowingService
{
    /**
     * Create a new borrowing with its details.
     * The BorrowingDetail boot() hook prevents double-booking the same inventory
     * for an overlapping date range, so no extra stock check is needed here.
     */
    public function createBorrowing(array $data): Borrowing
    {
        DB::beginTransaction();

        try {
            $borrowing = Borrowing::create([
                'user_id' => Auth::id(),
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'] ?? null,
                'notes' => $data['notes'] ?? null,
                'status' => 'pending',
            ]);

            foreach ($data['items'] as $item) {
                BorrowingDetail::create([
                    'borrowing_id' => $borrowing->id,
                    'inventory_id' => $item['inventory_id'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();

            return $borrowing->refresh()->load([
                'borrowingDetails' => fn($q) => $q->with('inventory'),
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Update an existing borrowing and replace its detail rows.
     * Date-overlap conflicts are caught by the BorrowingDetail boot() hook.
     */
    public function updateBorrowing(Borrowing $borrowing, array $data): Borrowing
    {
        DB::beginTransaction();

        try {
            $borrowing->update([
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            // Delete old details then re-create — the boot() hook
            // will catch any overlap with other borrowings.
            $borrowing->borrowingDetails()->delete();

            foreach ($data['items'] as $item) {
                BorrowingDetail::create([
                    'borrowing_id' => $borrowing->id,
                    'inventory_id' => $item['inventory_id'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();

            return $borrowing->refresh()->load([
                'borrowingDetails' => fn($q) => $q->with('inventory'),
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Cancel a borrowing (only pending status is allowed).
     */
    public function cancelBorrowing(Borrowing $borrowing): bool
    {
        DB::beginTransaction();

        try {
            $notCancelableStatuses = ['approved', 'ongoing', 'finished', 'canceled', 'rejected'];

            if (in_array($borrowing->status, $notCancelableStatuses)) {
                throw new \Exception(
                    'Peminjaman tidak dapat dibatalkan karena status saat ini: ' .
                    strtoupper($borrowing->status)
                );
            }

            $borrowing->update(['status' => 'canceled']);

            DB::commit();
            return true;

        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Mark a borrowing as returned / finished.
     */
    public function returnBorrowing(Borrowing $borrowing): bool
    {
        DB::beginTransaction();

        try {
            if ($borrowing->status !== 'ongoing') {
                throw new \Exception(
                    'Peminjaman tidak dapat dikembalikan karena status saat ini: ' .
                    strtoupper($borrowing->status)
                );
            }

            if ($borrowing->returned_at) {
                throw new \Exception('Peminjaman sudah dikembalikan sebelumnya.');
            }

            $borrowing->update([
                'status' => 'finished',
                'returned_at' => now(),
            ]);

            DB::commit();
            return true;

        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}