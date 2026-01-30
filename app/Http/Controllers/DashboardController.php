<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Models\VehicleBorrowing;
use App\Models\BookingRoom;
use App\Models\Inventory;
use App\Models\Vehicle;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Data statistik umum (kecuali jumlah pengguna terdaftar)
        $stats = [
            'activeBorrowings' => Borrowing::active()->count(),
            'activeVehicleBorrowings' => VehicleBorrowing::active()->count(),
            'activeBookingRooms' => BookingRoom::active()->count(),
            'totalInventories' => Inventory::count(),
            'totalVehicles' => Vehicle::count(),
            'totalRooms' => Room::count(),
        ];

        // Data aktivitas terbaru
        $recentBorrowings = Borrowing::with(['user', 'borrowingDetails.inventory'])
            ->latest()
            ->limit(5)
            ->get();

        $recentVehicleBorrowings = VehicleBorrowing::with(['user', 'vehicle'])
            ->latest()
            ->limit(5)
            ->get();

        $recentBookingRooms = BookingRoom::with(['user', 'room'])
            ->latest()
            ->limit(5)
            ->get();

        // Data berdasarkan pengguna yang login
        $userBorrowings = $request->user() ?
            Borrowing::where('user_id', $request->user()->id)
                ->with(['borrowingDetails.inventory'])
                ->latest()
                ->limit(5)
                ->get() : collect();

        $userVehicleBorrowings = $request->user() ?
            VehicleBorrowing::where('user_id', $request->user()->id)
                ->with(['vehicle'])
                ->latest()
                ->limit(5)
                ->get() : collect();

        $userBookingRooms = $request->user() ?
            BookingRoom::where('user_id', $request->user()->id)
                ->with(['room'])
                ->latest()
                ->limit(5)
                ->get() : collect();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentBorrowings' => $recentBorrowings,
            'recentVehicleBorrowings' => $recentVehicleBorrowings,
            'recentBookingRooms' => $recentBookingRooms,
            'userBorrowings' => $userBorrowings,
            'userVehicleBorrowings' => $userVehicleBorrowings,
            'userBookingRooms' => $userBookingRooms,
        ]);
    }
}