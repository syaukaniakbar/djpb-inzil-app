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
            // Check if vehicle borrowing can be canceled (not already finished, canceled, or ongoing)
            if (in_array($vehicleBorrowing->status, ['finished', 'canceled', 'ongoing'])) {
                throw new \Exception('Peminjaman kendaraan tidak dapat dibatalkan karena sudah ' . 
                    ($vehicleBorrowing->status === 'finished' ? 'selesai' : 
                     ($vehicleBorrowing->status === 'canceled' ? 'dibatalkan' : 
                      'sedang berlangsung')));
            }

            // Update the vehicle borrowing status to canceled
            $vehicleBorrowing->update([
                'status' => 'canceled',
            ]);

            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}