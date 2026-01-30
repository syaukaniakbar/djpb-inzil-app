<?php

namespace App\Http\Controllers;

use App\Models\BookingRoom;
use App\Models\Room;
use App\Services\BookingRoomService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\BookingRoomRequest;

class BookingRoomController extends Controller
{
    protected BookingRoomService $bookingRoomService;

    public function __construct(BookingRoomService $bookingRoomService)
    {
        $this->bookingRoomService = $bookingRoomService;
    }

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

    public function store(BookingRoomRequest $request)
    {
        try {
            $this->bookingRoomService->createBookingRoom(
                $request->validated()
            );

            return redirect()
                ->route('booking-rooms.index')
                ->with('success', 'Peminjaman ruangan berhasil diajukan');

        } catch (\Throwable $e) {
            return back()
                ->withInput()
                ->withErrors([
                    'general' => $e->getMessage(),
                ]);
        }
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

    public function update(BookingRoomRequest $request, BookingRoom $bookingRoom)
    {
        // Ensure the user can only update their own bookings
        if ($bookingRoom->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this booking');
        }

        try {
            $this->bookingRoomService->updateBookingRoom(
                $bookingRoom,
                $request->validated()
            );

            return redirect()
                ->route('booking-rooms.index')
                ->with('success', 'Peminjaman ruangan berhasil diperbarui');

        } catch (\Throwable $e) {
            return back()
                ->withInput()
                ->withErrors([
                    'general' => $e->getMessage(),
                ]);
        }
    }

    public function cancel(BookingRoom $bookingRoom)
    {
        // Ensure the user can only cancel their own bookings
        if ($bookingRoom->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to cancel this booking');
        }

        try {
            $this->bookingRoomService->cancelBookingRoom($bookingRoom);

            return redirect()
                ->route('booking-rooms.index')
                ->with('success', 'Peminjaman ruangan berhasil dibatalkan');

        } catch (\Throwable $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }
}
