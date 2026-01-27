<?php

namespace App\Http\Controllers;

use App\Models\VehicleBorrowing;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VehicleBorrowingController extends Controller
{
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'purpose' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'vehicle_id' => 'required|exists:vehicles,id',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'pending'; // Default status

        VehicleBorrowing::create($validated);

        return redirect()->route('vehicle-borrowings.index')->with('success', 'Peminjaman kendaraan berhasil diajukan.');
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

    public function update(Request $request, VehicleBorrowing $vehicleBorrowing)
    {
        // Ensure the user can only update their own borrowings
        if ($vehicleBorrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this borrowing');
        }

        $validated = $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'purpose' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'vehicle_id' => 'required|exists:vehicles,id',
        ]);

        $vehicleBorrowing->update($validated);

        return redirect()->route('vehicle-borrowings.index')->with('success', 'Peminjaman kendaraan berhasil diperbarui.');
    }

    public function destroy(VehicleBorrowing $vehicleBorrowing)
    {
        // Ensure the user can only delete their own borrowings
        if ($vehicleBorrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to delete this borrowing');
        }

        $vehicleBorrowing->delete();

        return redirect()->back()->with('success', 'Peminjaman kendaraan berhasil dihapus.');
    }
}
