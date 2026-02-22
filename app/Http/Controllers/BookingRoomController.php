<?php

namespace App\Http\Controllers;

use App\Models\BookingRoom;
use App\Services\BookingRoomService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\BookingRoomRequest;
use App\Models\User;

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
            ->search(request(['search', 'status', 'event_mode', 'start_at_from', 'start_at_to']))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $admin = User::where('role', 'admin')
            ->select('id', 'name', 'phone')
            ->first();

        return inertia('BookingRooms/index', [
            'bookings' => $bookings,
            'admin' => $admin,
            'filters' => request(['search', 'status', 'event_mode', 'start_at_from', 'start_at_to']),
        ]);
    }

    public function create()
    {
        return inertia('BookingRooms/create');
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

        return inertia('BookingRooms/edit', [
            'booking' => $bookingRoom->load(['user', 'room']),
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
