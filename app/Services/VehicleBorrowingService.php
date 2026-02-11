<?php

namespace App\Services;

use App\Models\VehicleBorrowing;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VehicleBorrowingService
{
    /**
     * Create a new vehicle borrowing
     *
     * @param array $data
     * @return \App\Models\VehicleBorrowing
     */
    public function createVehicleBorrowing(array $data): VehicleBorrowing
    {
        DB::beginTransaction();

        try {
            // Create the vehicle borrowing record
            $vehicleBorrowing = VehicleBorrowing::create([
                'user_id' => Auth::id(),
                'vehicle_id' => $data['vehicle_id'],
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'],
                'purpose' => $data['purpose'],
                'destination' => $data['destination'],
                'admin_note' => $data['admin_note'] ?? null,
                'status' => 'pending', // Default to pending status
            ]);

            DB::commit();

            return $vehicleBorrowing->refresh()->load(['user', 'vehicle']);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Update an existing vehicle borrowing
     *
     * @param \App\Models\VehicleBorrowing $vehicleBorrowing
     * @param array $data
     * @return \App\Models\VehicleBorrowing
     */
    public function updateVehicleBorrowing(VehicleBorrowing $vehicleBorrowing, array $data): VehicleBorrowing
    {
        DB::beginTransaction();

        try {
            // Update the vehicle borrowing record
            $vehicleBorrowing->update([
                'vehicle_id' => $data['vehicle_id'],
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'],
                'purpose' => $data['purpose'],
                'destination' => $data['destination'],
                'admin_note' => $data['admin_note'] ?? null,
            ]);

            DB::commit();

            return $vehicleBorrowing->refresh()->load(['user', 'vehicle']);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Cancel a vehicle borrowing by updating its status to canceled
     *
     * @param \App\Models\VehicleBorrowing $vehicleBorrowing
     * @return bool
     */
    public function cancelVehicleBorrowing(VehicleBorrowing $vehicleBorrowing): bool
    {
        DB::beginTransaction();

        try {
            // Status yang tidak boleh dibatalkan
            $notCancelableStatuses = [
                'approved',
                'ongoing',
                'finished',
                'canceled',
                'rejected',
            ];

            if (in_array($vehicleBorrowing->status, $notCancelableStatuses)) {
                throw new \Exception(
                    'Peminjaman kendaraan tidak dapat dibatalkan karena status saat ini: ' .
                    strtoupper($vehicleBorrowing->status)
                );
            }

            // Hanya pending yang boleh dibatalkan
            $vehicleBorrowing->update([
                'status' => 'canceled',
            ]);

            DB::commit();
            return true;

        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }


    /**
     * Return a vehicle by updating its status to finished and setting returned_at timestamp
     *
     * @param \App\Models\VehicleBorrowing $vehicleBorrowing
     * @return bool
     */
    public function returnVehicleBorrowing(VehicleBorrowing $vehicleBorrowing): bool
    {
        DB::beginTransaction();

        try {
            // Hanya boleh return jika sedang ongoing
            if ($vehicleBorrowing->status !== 'ongoing') {
                throw new \Exception(
                    'Peminjaman kendaraan tidak dapat dikembalikan karena status saat ini: ' .
                    strtoupper($vehicleBorrowing->status)
                );
            }

            // Cegah double return
            if ($vehicleBorrowing->returned_at) {
                throw new \Exception('Kendaraan sudah dikembalikan sebelumnya.');
            }

            $vehicleBorrowing->update([
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