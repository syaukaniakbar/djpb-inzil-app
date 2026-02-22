<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Models\VehicleBorrowing;
use App\Models\BookingRoom;
use App\Models\Inventory;
use App\Models\Vehicle;
use App\Models\Room;
use App\Models\ConsumableBorrowing;
use App\Models\ConsumableItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user && ($user->role === 'admin' || $user->getAttribute('role') === 'admin');

        $activeBorrowings = Borrowing::active()->count();
        $activeVehicleBorrowings = VehicleBorrowing::active()->count();
        $activeBookingRooms = BookingRoom::active()->count();

        $totalInventories = Inventory::count();
        $totalVehicles = Vehicle::count();
        $totalRooms = Room::count();
        $totalConsumables = ConsumableItem::count();

        $stats = [
            'activeBorrowings' => $activeBorrowings,
            'activeVehicleBorrowings' => $activeVehicleBorrowings,
            'activeBookingRooms' => $activeBookingRooms,
            'totalInventories' => $totalInventories,
            'totalVehicles' => $totalVehicles,
            'totalRooms' => $totalRooms,
            'totalConsumables' => $totalConsumables,
            'availableInventories' => max(0, $totalInventories - $activeBorrowings),
            'availableVehicles' => max(0, $totalVehicles - $activeVehicleBorrowings),
            'availableRooms' => max(0, $totalRooms - $activeBookingRooms),
            'lowStockConsumables' => ConsumableItem::lowStock()->count(),
        ];

        // Pending Approvals (for Admin)
        $pendingApprovalsCount = $isAdmin ? (
            Borrowing::pending()->count() +
            VehicleBorrowing::pending()->count() +
            BookingRoom::pending()->count() +
            ConsumableBorrowing::pending()->count()
        ) : 0;

        // Overdue items (Approved but past end date)
        $now = now();
        $overdueCount =
            Borrowing::where('status', 'approved')->where('end_at', '<', $now)->whereNull('returned_at')->count() +
            VehicleBorrowing::where('status', 'approved')->where('end_at', '<', $now)->whereNull('returned_at')->count() +
            BookingRoom::where('status', 'approved')->where('end_at', '<', $now)->count();

        $recentBorrowings = Borrowing::with(['user:id,name', 'borrowingDetails.inventory'])
            ->latest()
            ->limit(5)
            ->get();

        $recentVehicleBorrowings = VehicleBorrowing::with(['user:id,name', 'vehicle'])
            ->latest()
            ->limit(5)
            ->get();

        $recentBookingRooms = BookingRoom::with(['user:id,name', 'room'])
            ->latest()
            ->limit(5)
            ->get();

        $recentConsumableBorrowings = ConsumableBorrowing::with(['user:id,name', 'consumableItem'])
            ->latest()
            ->limit(5)
            ->get();

        $userBorrowings = $user ?
            Borrowing::where('user_id', $user->id)
                ->with(['user:id,name', 'borrowingDetails.inventory'])
                ->latest()
                ->limit(5)
                ->get() : collect();

        $userVehicleBorrowings = $user ?
            VehicleBorrowing::where('user_id', $user->id)
                ->with(['user:id,name', 'vehicle'])
                ->latest()
                ->limit(5)
                ->get() : collect();

        $userBookingRooms = $user ?
            BookingRoom::where('user_id', $user->id)
                ->with(['user:id,name', 'room'])
                ->latest()
                ->limit(5)
                ->get() : collect();

        $userConsumableBorrowings = $user ?
            ConsumableBorrowing::where('user_id', $user->id)
                ->with(['user:id,name', 'consumableItem'])
                ->latest()
                ->limit(5)
                ->get() : collect();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'pendingApprovalsCount' => $pendingApprovalsCount,
            'overdueCount' => $overdueCount,
            'recentBorrowings' => $recentBorrowings,
            'recentVehicleBorrowings' => $recentVehicleBorrowings,
            'recentBookingRooms' => $recentBookingRooms,
            'recentConsumableBorrowings' => $recentConsumableBorrowings,
            'userBorrowings' => $userBorrowings,
            'userVehicleBorrowings' => $userVehicleBorrowings,
            'userBookingRooms' => $userBookingRooms,
            'userConsumableBorrowings' => $userConsumableBorrowings,
        ]);
    }
}