<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingRoom;
use App\Models\Room;
use Illuminate\Http\Request;

class BookingRoomController extends Controller
{
    public function getAvailableRooms(Request $request)
    {
        try {
            $request->validate([
                'start_at' => 'required|date',
                'end_at' => 'required|date|after:start_at',
            ]);

            $startAt = $request->start_at;
            $endAt = $request->end_at;

            // Get all rooms
            $allRooms = Room::all();

            // Find booked rooms during the specified period with active statuses
            $bookedRoomIds = BookingRoom::where(function ($query) use ($startAt, $endAt) {
                    // Check if the new booking overlaps with existing bookings
                    $query->where('start_at', '<', $endAt)
                          ->where('end_at', '>', $startAt);
                })
                ->whereIn('status', ['pending', 'approved', 'ongoing']) // Only consider active bookings
                ->pluck('room_id');

            // Get available rooms (those not in the booked list)
            $availableRooms = $allRooms->whereNotIn('id', $bookedRoomIds)->values();

            return response()->json([
                'success' => true,
                'rooms' => $availableRooms,
                'filters' => [
                    'start_at' => $startAt,
                    'end_at' => $endAt,
                ],
                'total_available' => $availableRooms->count(),
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching available rooms',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}