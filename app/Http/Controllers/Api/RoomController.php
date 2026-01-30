<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function getAvailableRooms(Request $request)
    {
        $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
        ]);

        $startAt = $request->start_at;
        $endAt = $request->end_at;

        $availableRooms = Room::all()->filter(function ($room) use ($startAt, $endAt) {
            return $room->isAvailableForRange($startAt, $endAt);
        })->values();

        return response()->json([
            'success' => true,
            'rooms' => $availableRooms,
            'total_available' => $availableRooms->count(),
            'filters' => compact('startAt', 'endAt'),
        ]);
    }

}