<?php

namespace App\Services;

use App\Models\BookingRoom;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingRoomService
{
    /**
     * Create a new booking room
     *
     * @param array $data
     * @return \App\Models\BookingRoom
     */
    public function createBookingRoom(array $data): BookingRoom
    {
        DB::beginTransaction();

        try {
            // Double-check room availability within the transaction to prevent race conditions
            $existingBooking = BookingRoom::where('room_id', $data['room_id'])
                ->where(function ($query) use ($data) {
                    $query->where('start_at', '<', $data['end_at'])
                        ->where('end_at', '>', $data['start_at']);
                })
                ->whereIn('status', ['pending', 'approved', 'ongoing'])
                ->lockForUpdate() // Lock the rows to prevent concurrent modifications
                ->first();

            if ($existingBooking) {
                throw new \Exception('Ruangan ini sudah dipesan untuk periode yang dipilih.');
            }

            // Create the booking room record
            $bookingRoom = BookingRoom::create([
                'user_id' => Auth::id(),
                'room_id' => $data['room_id'],
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'],
                'event_mode' => $data['event_mode'],
                'event_name' => $data['event_name'],
                'admin_note' => $data['admin_note'] ?? null,
                'status' => 'pending', // Default to pending status
            ]);

            DB::commit();

            return $bookingRoom->refresh()->load(['user', 'room']);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Update an existing booking room
     *
     * @param \App\Models\BookingRoom $bookingRoom
     * @param array $data
     * @return \App\Models\BookingRoom
     */
    public function updateBookingRoom(BookingRoom $bookingRoom, array $data): BookingRoom
    {
        DB::beginTransaction();

        try {
            // Check if the room is available for the new time range (excluding current booking)
            $existingBooking = BookingRoom::where('room_id', $data['room_id'])
                ->where('id', '!=', $bookingRoom->id) // Exclude current booking
                ->where(function ($query) use ($data) {
                    $query->where('start_at', '<', $data['end_at'])
                        ->where('end_at', '>', $data['start_at']);
                })
                ->whereIn('status', ['pending', 'approved', 'ongoing'])
                ->lockForUpdate() // Lock the rows to prevent concurrent modifications
                ->first();

            if ($existingBooking) {
                throw new \Exception('Ruangan ini sudah dipesan untuk periode yang dipilih.');
            }

            // Update the booking room record
            $bookingRoom->update([
                'room_id' => $data['room_id'],
                'start_at' => $data['start_at'],
                'end_at' => $data['end_at'],
                'event_mode' => $data['event_mode'],
                'event_name' => $data['event_name'],
                'admin_note' => $data['admin_note'] ?? null,
            ]);

            DB::commit();

            return $bookingRoom->refresh()->load(['user', 'room']);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Cancel a booking room by updating its status to canceled
     *
     * @param \App\Models\BookingRoom $bookingRoom
     * @return bool
     */
    public function cancelBookingRoom(BookingRoom $bookingRoom): bool
    {
        DB::beginTransaction();

        try {
            // Check if booking room can be canceled (not already finished, canceled, or ongoing)
            if (in_array($bookingRoom->status, ['finished', 'canceled', 'ongoing', 'used'])) {
                throw new \Exception('Peminjaman ruangan tidak dapat dibatalkan karena sudah ' .
                    ($bookingRoom->status === 'finished' ? 'selesai' :
                        ($bookingRoom->status === 'canceled' ? 'dibatalkan' :
                            ($bookingRoom->status === 'ongoing' ? 'sedang berlangsung' : 'telah digunakan'))));
            }

            // Update the booking room status to canceled
            $bookingRoom->update([
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