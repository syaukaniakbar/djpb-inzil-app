<?php

namespace App\Http\Controllers;

use App\Models\BookingRoom;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingRoomController extends Controller
{
    public function index()
    {
        $bookings = BookingRoom::with([
            'user',
            'room',
        ])
        ->where('user_id', Auth::id())  // Hanya ambil booking milik user yang login
        ->latest()
        ->paginate(10);

        return inertia('BookingRooms/index', [
            'bookings' => $bookings,
        ]);
    }

    public function create()
    {
        $rooms = Room::all();

        return inertia('BookingRooms/create', [
            'rooms' => $rooms,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'event_mode' => 'required|string|max:255',
            'event_name' => 'required|string|max:255',
            'room_id' => 'required|exists:rooms,id',
            'admin_note' => 'nullable|string|max:500',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'pending'; // Default status

        BookingRoom::create($validated);

        return redirect()->route('booking-rooms.index')->with('success', 'Peminjaman ruangan berhasil diajukan.');
    }

    public function show(BookingRoom $bookingRoom)
    {
        // Ensure the user can only view their own bookings
        if ($bookingRoom->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to view this booking');
        }

        return inertia('BookingRooms/view', [
            'booking' => $bookingRoom->load(['user', 'room']),
        ]);
    }

    public function edit(BookingRoom $bookingRoom)
    {
        // Ensure the user can only edit their own bookings
        if ($bookingRoom->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to edit this booking');
        }

        $rooms = Room::all();

        return inertia('BookingRooms/edit', [
            'booking' => $bookingRoom->load(['user', 'room']),
            'rooms' => $rooms,
        ]);
    }

    public function update(Request $request, BookingRoom $bookingRoom)
    {
        // Ensure the user can only update their own bookings
        if ($bookingRoom->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this booking');
        }

        $validated = $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'event_mode' => 'required|string|max:255',
            'event_name' => 'required|string|max:255',
            'room_id' => 'required|exists:rooms,id',
            'admin_note' => 'nullable|string|max:500',
        ]);

        $bookingRoom->update($validated);

        return redirect()->route('booking-rooms.index')->with('success', 'Peminjaman ruangan berhasil diperbarui.');
    }

    public function destroy(BookingRoom $bookingRoom)
    {
        // Ensure the user can only delete their own bookings
        if ($bookingRoom->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to delete this booking');
        }

        $bookingRoom->delete();

        return redirect()->back()->with('success', 'Peminjaman ruangan berhasil dihapus.');
    }
}
