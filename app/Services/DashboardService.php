<?php

namespace App\Services;

use App\Models\Borrowing;
use App\Models\VehicleBorrowing;
use App\Models\BookingRoom;
use App\Models\ConsumableBorrowing;
use App\Models\Department;
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
}
