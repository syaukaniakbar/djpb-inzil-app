<?php

namespace App\Http\Controllers;

use App\Models\VehicleBorrowing;
use App\Models\Vehicle;
use App\Services\VehicleBorrowingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\VehicleBorrowingRequest;

class VehicleBorrowingController extends Controller
{
    protected VehicleBorrowingService $vehicleBorrowingService;

    public function __construct(VehicleBorrowingService $vehicleBorrowingService)
    {
        $this->vehicleBorrowingService = $vehicleBorrowingService;
    }

    public function index()
    {
        $borrowings = VehicleBorrowing::with([
            'user',
            'vehicle',
        ])
            ->where('user_id', Auth::id())  // Hanya ambil borrowing milik user yang login
            ->latest()
            ->paginate(10);

        return inertia('VehicleBorrowings/index', [
            'borrowings' => $borrowings,
        ]);
    }

    public function create()
    {
        $vehicles = Vehicle::all();

        return inertia('VehicleBorrowings/create', [
            'vehicles' => $vehicles,
        ]);
    }

    public function store(VehicleBorrowingRequest $request)
    {
        try {
            $this->vehicleBorrowingService->createVehicleBorrowing(
                $request->validated()
            );

            return redirect()
                ->route('vehicle-borrowings.index')
                ->with('success', 'Peminjaman kendaraan berhasil diajukan');

        } catch (\Throwable $e) {
            return back()
                ->withInput()
                ->withErrors([
                    'general' => $e->getMessage(),
                ]);
        }
    }

    public function show(VehicleBorrowing $vehicleBorrowing)
    {
        // Ensure the user can only view their own borrowings
        if ($vehicleBorrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to view this borrowing');
        }

        return inertia('VehicleBorrowings/view', [
            'borrowing' => $vehicleBorrowing->load(['user', 'vehicle']),
        ]);
    }

    public function edit(VehicleBorrowing $vehicleBorrowing)
    {
        // Ensure the user can only edit their own borrowings
        if ($vehicleBorrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to edit this borrowing');
        }

        $vehicles = Vehicle::all();

        return inertia('VehicleBorrowings/edit', [
            'borrowing' => $vehicleBorrowing->load(['user', 'vehicle']),
            'vehicles' => $vehicles,
        ]);
    }

    public function update(VehicleBorrowingRequest $request, VehicleBorrowing $vehicleBorrowing)
    {
        // Ensure the user can only update their own borrowings
        if ($vehicleBorrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this borrowing');
        }

        try {
            $this->vehicleBorrowingService->updateVehicleBorrowing(
                $vehicleBorrowing,
                $request->validated()
            );

            return redirect()
                ->route('vehicle-borrowings.index')
                ->with('success', 'Peminjaman kendaraan berhasil diperbarui');

        } catch (\Throwable $e) {
            return back()
                ->withInput()
                ->withErrors([
                    'general' => $e->getMessage(),
                ]);
        }
    }

    public function cancel(VehicleBorrowing $vehicleBorrowing)
    {
        // Ensure the user can only cancel their own borrowings
        if ($vehicleBorrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to cancel this borrowing');
        }

        try {
            $this->vehicleBorrowingService->cancelVehicleBorrowing($vehicleBorrowing);

            return redirect()
                ->route('vehicle-borrowings.index')
                ->with('success', 'Peminjaman kendaraan berhasil dibatalkan');

        } catch (\Throwable $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }

    public function return(VehicleBorrowing $vehicleBorrowing)
    {
        // Ensure the user can only return their own borrowings
        if ($vehicleBorrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to return this borrowing');
        }

        try {
            $this->vehicleBorrowingService->returnVehicleBorrowing($vehicleBorrowing);

            return redirect()
                ->route('vehicle-borrowings.index')
                ->with('success', 'Kendaraan berhasil dikembalikan');

        } catch (\Throwable $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }
}
