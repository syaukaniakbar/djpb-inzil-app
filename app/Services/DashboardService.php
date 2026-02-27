<?php

namespace App\Services;

use App\Models\Borrowing;
use App\Models\VehicleBorrowing;
use App\Models\BookingRoom;
use App\Models\ConsumableBorrowing;
use App\Models\Vehicle;
use App\Models\Room;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    protected $user;
    protected $isAdmin;

    public function __construct()
    {
        $this->user = auth()->user();
        $this->isAdmin = $this->user && ($this->user->role === 'admin' || $this->user->getAttribute('role') === 'admin');
    }

    /**
     * Get dashboard data
     */
    public function getDashboardData()
    {
        return [
            'statusBreakdown' => $this->getStatusBreakdown(),
            'topBorrowedItems' => $this->getTopBorrowedItems(),
            'userActivities' => $this->getUserActivities(),
            'vehicleAvailability' => $this->getVehicleAvailability(),
            'roomAvailability' => $this->getRoomAvailability(),
        ];
    }

    /**
     * Get status breakdown for all categories
     */
    public function getStatusBreakdown()
    {
        // Filter by logged-in user if not admin
        $queryModifier = function ($query) {
            if (!$this->isAdmin) {
                $query->where('user_id', $this->user->id);
            }
        };

        return [
            'borrowings' => [
                'pending' => Borrowing::where('status', 'pending')->tap($queryModifier)->count(),
                'approved' => Borrowing::where('status', 'approved')->tap($queryModifier)->count(),
                'ongoing' => Borrowing::where('status', 'ongoing')->tap($queryModifier)->count(),
                'finished' => Borrowing::where('status', 'finished')->tap($queryModifier)->count(),
                'canceled' => Borrowing::where('status', 'canceled')->tap($queryModifier)->count(),
                'rejected' => Borrowing::where('status', 'rejected')->tap($queryModifier)->count(),
            ],
            'vehicleBorrowings' => [
                'pending' => VehicleBorrowing::where('status', 'pending')->tap($queryModifier)->count(),
                'approved' => VehicleBorrowing::where('status', 'approved')->tap($queryModifier)->count(),
                'ongoing' => VehicleBorrowing::where('status', 'ongoing')->tap($queryModifier)->count(),
                'finished' => VehicleBorrowing::where('status', 'finished')->tap($queryModifier)->count(),
                'canceled' => VehicleBorrowing::where('status', 'canceled')->tap($queryModifier)->count(),
                'rejected' => VehicleBorrowing::where('status', 'rejected')->tap($queryModifier)->count(),
            ],
            'bookingRooms' => [
                'pending' => BookingRoom::where('status', 'pending')->tap($queryModifier)->count(),
                'approved' => BookingRoom::where('status', 'approved')->tap($queryModifier)->count(),
                'ongoing' => BookingRoom::where('status', 'ongoing')->tap($queryModifier)->count(),
                'finished' => BookingRoom::where('status', 'finished')->tap($queryModifier)->count(),
                'canceled' => BookingRoom::where('status', 'canceled')->tap($queryModifier)->count(),
                'rejected' => BookingRoom::where('status', 'rejected')->tap($queryModifier)->count(),
            ],
            'consumableBorrowings' => [
                'pending' => ConsumableBorrowing::where('status', 'pending')->tap($queryModifier)->count(),
                'finished' => ConsumableBorrowing::where('status', 'finished')->tap($queryModifier)->count(),
                'canceled' => ConsumableBorrowing::where('status', 'canceled')->tap($queryModifier)->count(),
                'rejected' => ConsumableBorrowing::where('status', 'rejected')->tap($queryModifier)->count(),
            ],
        ];
    }

    /**
     * Get top borrowed items
     */
    public function getTopBorrowedItems()
    {
        // Top borrowed inventories
        $topInventories = DB::table('borrowing_details')
            ->join('inventories', 'borrowing_details.inventory_id', '=', 'inventories.id')
            ->select('inventories.id', 'inventories.name', 'inventories.category', DB::raw('COUNT(*) as borrow_count'))
            ->groupBy('inventories.id', 'inventories.name', 'inventories.category')
            ->orderByDesc('borrow_count')
            ->limit(5)
            ->get();

        // Top borrowed vehicles
        $topVehicles = DB::table('vehicle_borrowings')
            ->join('vehicles', 'vehicle_borrowings.vehicle_id', '=', 'vehicles.id')
            ->select('vehicles.id', 'vehicles.name', 'vehicles.license_plate', DB::raw('COUNT(*) as borrow_count'))
            ->groupBy('vehicles.id', 'vehicles.name', 'vehicles.license_plate')
            ->orderByDesc('borrow_count')
            ->limit(5)
            ->get();

        // Top booked rooms
        $topRooms = DB::table('room_bookings')
            ->join('rooms', 'room_bookings.room_id', '=', 'rooms.id')
            ->select('rooms.id', 'rooms.name', 'rooms.capacity', DB::raw('COUNT(*) as booking_count'))
            ->groupBy('rooms.id', 'rooms.name', 'rooms.capacity')
            ->orderByDesc('booking_count')
            ->limit(5)
            ->get();

        // Top consumed items
        $topConsumables = DB::table('consumable_borrowings')
            ->join('consumable_items', 'consumable_borrowings.consumable_item_id', '=', 'consumable_items.id')
            ->select('consumable_items.id', 'consumable_items.name', 'consumable_items.sku', DB::raw('SUM(consumable_borrowings.quantity) as total_quantity'))
            ->groupBy('consumable_items.id', 'consumable_items.name', 'consumable_items.sku')
            ->orderByDesc('total_quantity')
            ->limit(5)
            ->get();

        return [
            'inventories' => $topInventories,
            'vehicles' => $topVehicles,
            'rooms' => $topRooms,
            'consumables' => $topConsumables,
        ];
    }

    /**
     * Get user-specific activities
     */
    public function getUserActivities()
    {
        if (!$this->user) {
            return [
                'borrowings' => collect(),
                'vehicleBorrowings' => collect(),
                'bookingRooms' => collect(),
                'consumableBorrowings' => collect(),
            ];
        }

        return [
            'borrowings' => Borrowing::where('user_id', $this->user->id)
                ->with(['user:id,name', 'borrowingDetails.inventory'])
                ->latest()
                ->limit(5)
                ->get(),
            'vehicleBorrowings' => VehicleBorrowing::where('user_id', $this->user->id)
                ->with(['user:id,name', 'vehicle'])
                ->latest()
                ->limit(5)
                ->get(),
            'bookingRooms' => BookingRoom::where('user_id', $this->user->id)
                ->with(['user:id,name', 'room'])
                ->latest()
                ->limit(5)
                ->get(),
            'consumableBorrowings' => ConsumableBorrowing::where('user_id', $this->user->id)
                ->with(['user:id,name', 'consumableItem'])
                ->latest()
                ->limit(5)
                ->get(),
        ];
    }

    /**
     * Get vehicle availability status
     */
    public function getVehicleAvailability()
    {
        $now = now();

        $vehicles = Vehicle::all()->map(function ($vehicle) use ($now) {
            // Find current borrowing: ongoing/approved that hasn't been returned yet
            // Vehicle is unavailable if:
            // 1. Status is ongoing and within time range, OR
            // 2. Status is approved/ongoing but not yet returned (returned_at is null)
            $currentBorrowing = VehicleBorrowing::where('vehicle_id', $vehicle->id)
                ->whereIn('status', ['approved', 'ongoing'])
                ->whereNull('returned_at')
                ->where('start_at', '<=', $now)
                ->with(['user:id,name'])
                ->orderBy('start_at')
                ->first();

            // Vehicle is unavailable if there's an active borrowing that hasn't been returned
            $isCurrentlyOccupied = $currentBorrowing !== null;

            return [
                'id' => $vehicle->id,
                'name' => $vehicle->name,
                'license_plate' => $vehicle->license_plate,
                'isAvailable' => !$isCurrentlyOccupied,
                'borrowing' => $currentBorrowing ? [
                    'borrower' => $currentBorrowing->user->name,
                    'start_at' => $currentBorrowing->start_at,
                    'end_at' => $currentBorrowing->end_at,
                    'purpose' => $currentBorrowing->purpose,
                    'status' => $currentBorrowing->status,
                ] : null,
            ];
        });

        return $vehicles;
    }

    /**
     * Get room availability status
     */
    public function getRoomAvailability()
    {
        $now = now();

        $rooms = Room::all()->map(function ($room) use ($now) {
            // Booking yang sedang atau akan berlangsung (approved/ongoing) dan belum selesai
            $upcomingOrOngoingBooking = BookingRoom::where('room_id', $room->id)
                ->whereIn('status', ['approved', 'ongoing'])
                ->where('end_at', '>=', $now)
                ->orderBy('start_at')
                ->with(['user:id,name'])
                ->first();

            // Ruangan tidak tersedia hanya jika sedang dipakai (ongoing dan waktu sekarang dalam range)
            $isCurrentlyOccupied = BookingRoom::where('room_id', $room->id)
                ->where('status', 'ongoing')
                ->where('start_at', '<=', $now)
                ->where('end_at', '>=', $now)
                ->exists();

            return [
                'id' => $room->id,
                'name' => $room->name,
                'capacity' => $room->capacity,
                'isAvailable' => !$isCurrentlyOccupied,
                'booking' => $upcomingOrOngoingBooking ? [
                    'booker' => $upcomingOrOngoingBooking->user->name,
                    'start_at' => $upcomingOrOngoingBooking->start_at,
                    'end_at' => $upcomingOrOngoingBooking->end_at,
                    'event_name' => $upcomingOrOngoingBooking->event_name ?? null,
                    'status' => $upcomingOrOngoingBooking->status,
                ] : null,
            ];
        });

        return $rooms;
    }
}
